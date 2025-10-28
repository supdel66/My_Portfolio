"use server"

import { z } from "zod"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Form validation schema
const SubscribeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
})

// Create Supabase client
async function getSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Handle cookie setting errors
        }
      },
    },
  })
}

export async function submitSubscribe(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    return {
      success: false,
      message: "Please fill out all required fields",
    }
  }

  try {
    // Validate form data with Zod
    try {
      SubscribeSchema.parse({ name, email })
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return {
          success: false,
          message: validationError.errors[0].message,
        }
      }
      return {
        success: false,
        message: "Invalid form data. Please check your inputs and try again.",
      }
    }

    const supabase = await getSupabaseClient()

    const { data: existingSubscriber, error: checkError } = await supabase
      .from("subscribers")
      .select("email")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("[v0] Error checking subscriber:", checkError)
      return {
        success: false,
        message: "Failed to check subscription status. Please try again.",
      }
    }

    if (existingSubscriber) {
      return {
        success: false,
        message: "This email is already subscribed!",
      }
    }

    // Insert new subscriber
    const { error } = await supabase.from("subscribers").insert([
      {
        name,
        email,
      },
    ])

    if (error) {
      console.error("[v0] Supabase error:", error)
      return {
        success: false,
        message: "Failed to subscribe. Please try again.",
      }
    }

    return {
      success: true,
      message: "Thank you for subscribing! I'll keep you updated with my latest projects and achievements.",
    }
  } catch (error) {
    console.error("[v0] Subscribe error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}

export async function getSubscribers() {
  try {
    const supabase = await getSupabaseClient()
    const { data, error } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching subscribers:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("[v0] Error:", error)
    return []
  }
}
