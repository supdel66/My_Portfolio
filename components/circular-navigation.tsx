"use client"

import { useState, useEffect } from "react"
import { Home, User, Users, Trophy, Code, Mail, Camera } from "lucide-react"

interface CircularNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function CircularNavigation({ activeSection, setActiveSection }: CircularNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="h-4 w-4" />, angle: 0 },
    { id: "about", label: "About Me", icon: <User className="h-4 w-4" />, angle: 51.4 },
    { id: "clubs", label: "Organizations", icon: <Users className="h-4 w-4" />, angle: 102.8 },
    { id: "competitions", label: "Competitions", icon: <Trophy className="h-4 w-4" />, angle: 154.2 },
    { id: "projects", label: "Projects", icon: <Code className="h-4 w-4" />, angle: 205.6 },
    { id: "gallery", label: "Gallery", icon: <Camera className="h-4 w-4" />, angle: 257 },
    { id: "contact", label: "Contact Me", icon: <Mail className="h-4 w-4" />, angle: 308.4 },
  ]

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Navigation Toggle Button - Fixed on right middle with animation */}
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-50">
        <div className="relative">
          {/* Click Me Animation */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="animate-bounce text-xs font-medium text-primary bg-card px-2 py-1 rounded-full shadow-lg border border-primary/20">
              Click Me!
            </div>
          </div>

          {/* Pulsing Ring Animation */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-primary/20 animate-pulse" />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 bg-card border-2 border-primary/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
            }}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 border-primary transition-all duration-500 ${
                isOpen ? "rotate-180 scale-75" : "rotate-0 scale-100"
              }`}
            >
              <div className="w-full h-full rounded-full border border-primary/50 animate-pulse-slow" />
            </div>
          </button>
        </div>
      </div>

      {/* Circular Navigation Menu - Centered on page when open */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-40 transition-all duration-700 ease-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
        }`}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

        {/* Navigation Container */}
        <div className="relative">
          {/* Background Circle */}
          <div className="absolute inset-0 w-80 h-80 -translate-x-40 -translate-y-40">
            <div className="w-full h-full rounded-full bg-card/90 backdrop-blur-md border border-primary/20 shadow-2xl" />
          </div>

          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const radius = 120
            const angleRad = (item.angle * Math.PI) / 180
            const x = Math.cos(angleRad) * radius
            const y = Math.sin(angleRad) * radius
            const isActive = activeSection === item.id

            return (
              <div
                key={item.id}
                className={`absolute transition-all duration-700 ease-out ${
                  isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  transform: `translate(${x - 24}px, ${y - 24}px)`,
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {/* Connection Line */}
                <div
                  className="absolute w-px bg-primary/30 origin-bottom"
                  style={{
                    height: `${radius}px`,
                    transform: `rotate(${item.angle + 180}deg)`,
                    left: "50%",
                    top: "50%",
                  }}
                />

                {/* Menu Item Button */}
                <button
                  onClick={() => handleSectionChange(item.id)}
                  className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 group hover:scale-125 ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-lg"
                      : "bg-card text-foreground border-primary/30 hover:border-primary hover:bg-primary/10"
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center justify-center w-full h-full">{item.icon}</div>

                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-card border border-primary/20 rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap shadow-lg">
                      {item.label}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -inset-1 rounded-full border-2 border-primary animate-pulse-slow" />
                  )}
                </button>
              </div>
            )
          })}

          {/* Center Hub */}
          <div className="absolute w-10 h-10 -translate-x-5 -translate-y-5 bg-primary/20 rounded-full border-2 border-primary/40 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse-slow" />
          </div>
        </div>
      </div>
    </>
  )
}
