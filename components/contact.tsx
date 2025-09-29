"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Send, Github, Linkedin, Instagram, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/actions/contact"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number; type: "star" | "heart" }>>([])
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

  useEffect(() => {
    setIsVisible(true)

    let trailId = 0
    const handleMouseMove = (e: MouseEvent) => {
      const newX = (e.clientX / window.innerWidth) * 100
      const newY = (e.clientY / window.innerHeight) * 100

      setMousePosition({ x: newX, y: newY })

      // Add new trail element
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
        type: Math.random() > 0.5 ? "star" : ("heart" as "star" | "heart"),
      }

      setTrails((prev) => [...prev.slice(-8), newTrail])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Clean up old trails
  useEffect(() => {
    const timer = setInterval(() => {
      setTrails((prev) => prev.slice(1))
    }, 150)

    return () => clearInterval(timer)
  }, [])

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
        setTimeout(() => setFormStatus({}), 5000)
      }
    } catch (error) {
      console.log(error)
      setFormStatus({
        success: false,
        message: "An error occurred. Please email me directly at mail@supriyapoudel.com.np",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "mail@supriyapoudel.com.np",
      href: "mailto:mail@supriyapoudel.com.np",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Kaushaltar, Bhaktapur, Nepal",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      name: "GitHub",
      href: "https://github.com/supdel66",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/supriya-poudel-38ba13347/",
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      name: "Instagram",
      href: "https://www.instagram.com/supriya.6.poudel/",
    },
  ]

  return (
    <section className="min-h-screen bg-background py-20 relative overflow-hidden">
      {/* Mouse Glare Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(236, 72, 153, 0.2) 30%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Shooting Star Trails */}
      <div className="absolute inset-0 pointer-events-none">
        {trails.map((trail, index) => (
          <div
            key={trail.id}
            className="absolute text-yellow-400 animate-ping"
            style={{
              left: trail.x,
              top: trail.y,
              transform: "translate(-50%, -50%)",
              opacity: (index + 1) / trails.length,
              fontSize: `${12 + index * 2}px`,
              animationDuration: "0.8s",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {trail.type === "star" ? "✨" : "💖"}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="section-indicator mx-auto text-center">📬 Get in Touch</div>
          <h2 className="contact-heading">Let's Connect</h2>
          <p className="section-subtitle">Have a question or want to connect? Feel free to reach out!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">Contact Information</h3>
              <p className="text-foreground leading-relaxed mb-8">
                I'm always open to new opportunities and connections. Feel free to reach out through any of the
                following channels.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`contact-card hover-scale transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                >
                  <a href={info.href} className="flex items-center space-x-4 group">
                    <div className="contact-icon animate-pulse-slow" style={{ animationDelay: `${index * 0.3}s` }}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-all duration-300 hover:scale-110 animate-float ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${0.8 + index * 0.1}s`, animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="text-primary">{social.icon}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {formStatus.success ? (
                  <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md">
                    {formStatus.message || "Thank you for your message! I'll get back to you soon."}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
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
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
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
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      You can also email me directly at{" "}
                      <a href="mailto:mail@supriyapoudel.com.np" className="text-primary hover:underline">
                        mail@supriyapoudel.com.np
                      </a>
                    </p>
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
