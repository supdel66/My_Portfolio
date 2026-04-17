"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const glareRef = useRef<HTMLDivElement>(null)
  const trailContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    let trailId = 0
    const MAX_TRAILS = 8

    const handleMouseMove = (e: MouseEvent) => {
      const newX = (e.clientX / window.innerWidth) * 100
      const newY = (e.clientY / window.innerHeight) * 100

      // Update glare position directly via DOM — no React re-render
      if (glareRef.current) {
        glareRef.current.style.left = `${newX}%`
        glareRef.current.style.top = `${newY}%`
      }

      // Create trail element directly in the DOM — no React re-render
      if (trailContainerRef.current) {
        const el = document.createElement("div")
        el.className = "absolute text-yellow-400 animate-ping"
        el.style.left = `${e.clientX}px`
        el.style.top = `${e.clientY}px`
        el.style.transform = "translate(-50%, -50%)"
        el.style.fontSize = "14px"
        el.style.animationDuration = "0.8s"
        el.style.pointerEvents = "none"
        el.textContent = Math.random() > 0.5 ? "✨" : "💖"
        trailContainerRef.current.appendChild(el)

        // Remove after animation
        setTimeout(() => {
          el.remove()
        }, 800)

        // Cap total trail elements
        const container = trailContainerRef.current
        while (container.childNodes.length > MAX_TRAILS) {
          container.removeChild(container.firstChild!)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Data arrays for dynamic counting
  const projects = ["Customer Churn Prediction", "Recipe Finder", "Mini JS Projects", "Illumination Graphics Project"]

  const organizations = ["Rotaract Club of Pashupati Kathmandu", "Student Quality Circle", "Leo Club"]

  const competitions = [
    "Turboline x IIMS International Hackathon",
    "Hack for Business",
    "Hult Prize At Khwopa College of Engineering 2025",
    "Codeyatra 2025",
    "Hack the Circle",
  ]

  // Calculate years of experience (assuming started in 2023)
  const startYear = 2022
  const currentYear = new Date().getFullYear()
  const yearsActive = currentYear - startYear

  const highlights = [
    {
      number: `${projects.length}+`,
      label: "Projects",
      icon: "💻",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
    },
    {
      number: `${organizations.length}+`,
      label: "Organizations",
      icon: "🏢",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
    },
    {
      number: `${competitions.length}+`,
      label: "Competitions",
      icon: "🏆",
      gradient: "from-yellow-500/20 to-orange-500/20",
      border: "border-yellow-500/30",
    },
    {
      number: `${yearsActive}+`,
      label: "Years Active",
      icon: "⭐",
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
    },
  ]

  return (
    <section className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center">
      {/* Mouse Glare Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={glareRef}
          className="absolute w-96 h-96 rounded-full opacity-20 transition-all duration-300 ease-out"
          style={{
            left: "0%",
            top: "0%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(236, 72, 153, 0.2) 30%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Shooting Star Trails */}
      <div ref={trailContainerRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto">


          <div className="grid lg:grid-cols-2 gap-8 items-center mb-20">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-8">
              {/* Welcome Message */}
              <div
                className={`transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <h1 className="text-3xl md:text-5xl font-semibold text-foreground text-left">
                  <div className="section-indicator">⭐Welcome to my Digital Space</div>
                </h1>
              </div>

              {/* Main Message */}
              <div
                className={`transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "0.4s" }}
              >
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Hey, glad you made it here. It's me, your tourguide in the website. Without further ado click on that
                  tempting click me circle on the side. Hope you enjoy and reach out to me.
                </p>
              </div>

              {/* Signature */}
              <div
                className={`transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <p className="text-xl font-semibold gradient-text">XOXO Supriya.</p>
              </div>
            </div>

            {/* Right Content - Profile Image (More Centered) */}
            <div className="flex justify-center">
              <div
                className={`relative transition-all duration-1500 ease-out ${isLoaded ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 rotate-12"
                  }`}
                style={{ transitionDelay: "0.3s" }}
              >
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />

                {/* Image Container */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-border shadow-2xl">
                  <Image
                    src="/images/profile1.png"
                    alt="Supriya Poudel"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 450px"
                  />
                </div>

                {/* Floating Ring */}
                <div className="absolute -inset-4 border border-primary/30 rounded-full animate-pulse-slow" />
              </div>
            </div>
          </div>

          {/* Creative Highlights Section */}
          <div
            className={`transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "0.8s" }}
          >
            {/* Main Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">✨ Quick Overview</h2>
              <p className="text-muted-foreground">My journey in numbers</p>
            </div>

            {/* Creative Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${highlight.border} border-2 bg-gradient-to-br ${highlight.gradient} backdrop-blur-sm`}
                  style={{
                    animationDelay: `${0.9 + index * 0.1}s`,
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-2 right-2 text-4xl opacity-20">{highlight.icon}</div>
                    <div className="absolute bottom-2 left-2 text-2xl opacity-10">{highlight.icon}</div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {highlight.icon}
                    </div>

                    {/* Number */}
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {highlight.number}
                    </div>

                    {/* Label */}
                    <div className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {highlight.label}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-white to-transparent" />
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
