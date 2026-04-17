"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, MapPin, Send, Github, Linkedin, Instagram, AlertCircle, Bell } from "lucide-react"
import { submitContactForm } from "@/actions/contact"
import { submitSubscribe } from "@/actions/subscribe"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [subscribeData, setSubscribeData] = useState({ name: "", email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string }>({})
  const [subscribeStatus, setSubscribeStatus] = useState<{ success?: boolean; message?: string }>({})

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubscribeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSubscribeData((prev) => ({ ...prev, [name]: value }))
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

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    setSubscribeStatus({})

    try {
      const formDataObj = new FormData()
      formDataObj.append("name", subscribeData.name)
      formDataObj.append("email", subscribeData.email)

      const result = await submitSubscribe(formDataObj)
      setSubscribeStatus(result)

      if (result.success) {
        setSubscribeData({ name: "", email: "" })
        setTimeout(() => setSubscribeStatus({}), 5000)
      }
    } catch (error) {
      console.log(error)
      setSubscribeStatus({
        success: false,
        message: "An error occurred. Please try again.",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "mail@supriyapoudel.com.np",
      href: "mailto:mail@supriyapoudel.com.np",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      value: "Kaushaltar, Bhaktapur, Nepal",
      href: "#",
    },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, name: "GitHub", href: "https://github.com/supdel66" },
    { icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn", href: "https://www.linkedin.com/in/supriya-poudel-38ba13347/" },
    { icon: <Instagram className="h-5 w-5" />, name: "Instagram", href: "https://www.instagram.com/supriya.6.poudel/" },
  ]

  return (
    <section className="min-h-screen py-24 relative overflow-hidden" data-section="contact">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="section-indicator">📬 Get in Touch</div>
          <h2 className="contact-heading">Let's Connect</h2>
          <p className="section-subtitle">Have a question or want to connect? Feel free to reach out!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white/90 mb-4">Contact Information</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-6">
                I'm always open to new opportunities and connections. Feel free to reach out through any of the
                following channels.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className={`glass-card glass-card-hover flex items-center gap-4 p-4 group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="contact-icon">{info.icon}</div>
                  <div>
                    <h4 className="font-semibold text-white/80 text-sm group-hover:text-pink-400 transition-colors duration-300">
                      {info.title}
                    </h4>
                    <p className="text-white/40 text-sm">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white/80 mb-3">Connect with me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    style={{
                      background: "rgba(236,72,153,0.1)",
                      border: "1px solid rgba(236,72,153,0.15)",
                      transitionDelay: `${0.8 + index * 0.1}s`,
                    }}
                  >
                    <div className="text-pink-400/80">{social.icon}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div
            className={`space-y-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            style={{ transitionDelay: "0.4s" }}
          >
            {/* Contact Form */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white/90 mb-5">Send Me a Message</h3>
              {formStatus.success ? (
                <div className="p-4 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <p className="text-green-400 text-sm">{formStatus.message || "Thank you for your message! I'll get back to you soon."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-white/50 mb-1.5">Name</label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="glass-input w-full px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-white/50 mb-1.5">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="glass-input w-full px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-white/50 mb-1.5">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={4}
                      required
                      className="glass-input w-full px-3.5 py-2.5 text-sm resize-none"
                    />
                  </div>
                  {formStatus.message && !formStatus.success && (
                    <div className="flex items-start gap-2 text-red-400 text-sm p-3 rounded-lg"
                      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{formStatus.message}</span>
                    </div>
                  )}
                  <button type="submit" className="glass-button-primary w-full py-2.5 flex items-center justify-center text-sm" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                  <p className="text-xs text-white/30">
                    You can also email me directly at{" "}
                    <a href="mailto:mail@supriyapoudel.com.np" className="text-pink-400/70 hover:underline">
                      mail@supriyapoudel.com.np
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* Subscribe Form */}
            <div className="glass-card p-6" style={{ borderColor: "rgba(236,72,153,0.15)" }}>
              <h3 className="text-lg font-bold text-white/90 mb-1 flex items-center gap-2">
                <Bell className="h-4 w-4 text-pink-400" />
                Subscribe for Updates
              </h3>
              {subscribeStatus.success ? (
                <div className="p-4 rounded-xl mt-4" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <p className="text-green-400 text-sm">{subscribeStatus.message || "Thank you for subscribing!"}</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit} className="space-y-3 mt-4">
                  <p className="text-xs text-white/35">Get notified about my latest projects, achievements, and updates!</p>
                  <input
                    id="sub-name"
                    name="name"
                    value={subscribeData.name}
                    onChange={handleSubscribeChange}
                    placeholder="Your name"
                    required
                    className="glass-input w-full px-3.5 py-2.5 text-sm"
                  />
                  <input
                    id="sub-email"
                    name="email"
                    type="email"
                    value={subscribeData.email}
                    onChange={handleSubscribeChange}
                    placeholder="your.email@example.com"
                    required
                    className="glass-input w-full px-3.5 py-2.5 text-sm"
                  />
                  {subscribeStatus.message && !subscribeStatus.success && (
                    <div className="flex items-start gap-2 text-red-400 text-sm p-3 rounded-lg"
                      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{subscribeStatus.message}</span>
                    </div>
                  )}
                  <button type="submit" className="glass-button-primary w-full py-2.5 flex items-center justify-center text-sm" disabled={isSubscribing}>
                    {isSubscribing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Subscribing...
                      </div>
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Subscribe Me
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
