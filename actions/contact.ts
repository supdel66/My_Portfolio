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
// You'll need to add RESEND_API_KEY to your environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  try {
    // Extract and validate the form data
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    const validatedData = ContactSchema.parse(data)

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>", // You can customize this after verifying your domain
      to: "mail@supriyapoudel.com.np",
      subject: `New contact form submission from ${validatedData.name}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}
      `,
      // You can also use HTML for a nicer email
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<h3>Message:</h3>
<p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Email sending error:", error)
      return { success: false, message: "Failed to send message. Please try again." }
    }

    return { success: true, message: "Message sent successfully! I'll get back to you soon." }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      message: error instanceof z.ZodError ? error.errors[0].message : "Failed to send message. Please try again.",
    }
  }
}
