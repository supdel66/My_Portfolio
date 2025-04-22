"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/actions/contact"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name)
      formDataObj.append("email", formData.email)
      formDataObj.append("message", formData.message)

      const result = await submitContactForm(formDataObj)

      setFormStatus(result)

      if (result.success) {
        setFormData({ name: "", email: "", message: "" })
        // Reset success message after 5 seconds
        setTimeout(() => setFormStatus({}), 5000)
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again or email me directly at mail@supriyapoudel.com.np",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-contact section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-40 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="section-indicator mx-auto text-center">📬 Get in Touch</div>
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-subtitle">Have a question or want to connect? Feel free to reach out!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 animate-fade-in">
            <h3 className="text-2xl font-bold font-poppins">Contact Information</h3>
            <p className="text-muted-foreground">
              I'm always open to new opportunities and connections. Feel free to reach out through any of the following
              channels.
            </p>

            <div className="space-y-4">
              <div className="contact-card hover-scale">
                <div className="contact-icon animate-pulse-slow">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <div className="space-y-1">
                    <a
                      href="mailto:supepoudel2005@gmail.com"
                      className="text-muted-foreground hover:text-primary block"
                    >
                      supepoudel2005@gmail.com
                    </a>
                    <a
                      href="mailto:mail@supriyapoudel.com.np"
                      className="text-muted-foreground hover:text-primary block"
                    >
                      mail@supriyapoudel.com.np
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-card hover-scale">
                <div className="contact-icon animate-pulse-slow" style={{ animationDelay: "0.5s" }}>
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a href="tel:+9779869835025" className="text-muted-foreground hover:text-primary">
                    +977-9869835025
                  </a>
                </div>
              </div>

              <div className="contact-card hover-scale">
                <div className="contact-icon animate-pulse-slow" style={{ animationDelay: "1s" }}>
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-3">Connect with me</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/supriya-poudel-38ba13347/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors animate-float"
                  style={{ animationDelay: "0s" }}
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a
                  href="https://github.com/supdel66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors animate-float"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Github className="h-5 w-5 text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/supriya.6.poudel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors animate-float"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div className="animate-slide-up">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 font-poppins">Send Me a Message</h3>
                {formStatus.success ? (
                  <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md">
                    {formStatus.message || "Thank you for your message! I'll get back to you soon."}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={5}
                        required
                        className="bg-background/50"
                      />
                    </div>
                    {formStatus.message && !formStatus.success && (
                      <div className="flex items-start gap-2 text-red-500 text-sm p-3 bg-red-50 dark:bg-red-900/10 rounded-md">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>{formStatus.message}</span>
                      </div>
                    )}
                    <Button type="submit" className="w-full button-glow" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
