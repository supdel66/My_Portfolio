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

    // 1. Send the notification email to you
    const { error: notificationError } = await resend.emails.send({
      from: "Portfolio Contact Form <contact@supriyapoudel.com.np>",
      to: "mail@supriyapoudel.com.np",
      reply_to: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.name}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}
      `,
      html: `
<h2>New Portfolio Contact Form Submission</h2>
<hr>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<h3>Message:</h3>
<p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (notificationError) {
      console.error("Notification email error:", notificationError)
      return { success: false, message: "Failed to send message. Please try again." }
    }

    // 2. Send the auto-reply email to the sender
    const { error: autoReplyError } = await resend.emails.send({
      from: "Supriya Poudel <contact@supriyapoudel.com.np>",
      to: validatedData.email,
      subject: "Thank you for contacting me!",
      text: `
Hello ${validatedData.name},

Thank you for reaching out to me. I've received your message and will get back to you as soon as possible.

Here's a copy of your message:

"${validatedData.message}"

Best regards,
Supriya Poudel
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .container {
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 5px;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .message {
      background-color: #f9f9f9;
      padding: 15px;
      border-left: 4px solid #ec4899;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Thank You for Contacting Me!</h2>
    </div>
    
    <p>Hello ${validatedData.name},</p>
    
    <p>Thank you for reaching out to me through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
    
    <p>Here's a copy of your message:</p>
    
    <div class="message">
      "${validatedData.message.replace(/\n/g, "<br>")}"
    </div>
    
    <p>Best regards,<br>
    Supriya Poudel</p>
    
    <div class="footer">
      <p>This is an automated response. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
      `,
    })

    if (autoReplyError) {
      console.error("Auto-reply email error:", autoReplyError)
      // We'll still return success even if the auto-reply fails
      // since the main notification was sent successfully
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
