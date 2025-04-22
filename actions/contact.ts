"use server"

import { Resend } from "resend"
import { z } from "zod"

// Form validation schema
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Initialize Resend with your API key
const resendApiKey = process.env.RESEND_API_KEY || ""

export async function submitContactForm(formData: FormData) {
  // Extract form data first to avoid validation errors
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Basic validation before using Zod
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill out all required fields",
    }
  }

  try {
    // Check if API key is available
    if (!resendApiKey) {
      return {
        success: false,
        message: "Email service is not configured. Please contact me directly at mail@supriyapoudel.com.np",
      }
    }

    // Validate form data with Zod
    try {
      ContactSchema.parse({ name, email, message })
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

    // Initialize Resend inside the try block
    const resend = new Resend(resendApiKey)

    // Send notification email
    try {
      await resend.emails.send({
        from: "Portfolio Contact <contact@supriyapoudel.com.np>",
        to: "mail@supriyapoudel.com.np",
        reply_to: email,
        subject: `Portfolio Contact: ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `,
      })

      // Try to send auto-reply (but don't fail if it doesn't work)
      try {
        await resend.emails.send({
          from: "Supriya Poudel <contact@supriyapoudel.com.np>",
          to: email,
          subject: "Thank you for contacting me!",
          text: `
Hello ${name},

Thank you for reaching out to me. I've received your message and will get back to you as soon as possible.

Here's a copy of your message:

"${message}"

Best regards,
Supriya Poudel
          `,
        })
      } catch (autoReplyError) {
        // Ignore auto-reply errors
        console.error("Auto-reply failed, but main message was sent")
      }

      return {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      }
    } catch (emailError) {
      return {
        success: false,
        message: "Failed to send email. Please try again or contact me directly at mail@supriyapoudel.com.np",
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again or email me directly at mail@supriyapoudel.com.np",
    }
  }
}
