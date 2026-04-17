"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Code, User, Trophy, Camera, Users, Mail, MapPin, Clock, ArrowRight, Github, Linkedin, ExternalLink } from "lucide-react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    setTime(new Date())

    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--"
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getGreeting = () => {
    if (!time) return "Welcome"
    const hour = time.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  const getDate = (date: Date | null) => {
    if (!date) return "---"
    return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center pt-20 pb-32 px-4 md:px-8">
      <div className="max-w-6xl w-full mx-auto relative z-10 transition-all duration-1000 ease-out"
        style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? "translateY(0)" : "translateY(20px)" }}>

        {/* Dashboard Header */}
        <div className="mb-10 text-left">
          <h2 className="text-xl md:text-2xl font-medium text-white/70 mb-2">
            {getGreeting()}, Traveler!
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            Supriya Poudel <span className="text-white/40 font-light">| Digital Hub</span>
          </h1>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 auto-rows-[140px]">

          {/* 1. PROFILE WIDGET (Large - 2x2) */}
          <Link href="/about" className="glass-card glass-card-hover group relative overflow-hidden col-span-2 md:col-span-2 row-span-2 flex flex-col justify-end p-6">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/profile1.png"
                alt="Supriya"
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 w-full flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="glass-badge bg-pink-500/30 border-pink-500/50 text-white">About Me</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">Aspiring AI/ML <br />Engineer</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <ArrowRight className="h-5 w-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          {/* 2. CLOCK & WEATHER (Wide - 2x1) */}
          <div className="glass-card col-span-2 md:col-span-2 lg:col-span-2 row-span-1 p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="h-24 w-24" />
            </div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <h3 className="text-4xl md:text-5xl font-light text-white tracking-widest">{formatTime(time)}</h3>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-white/50 mb-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Kathmandu</span>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-white/60">{getDate(time)}</p>
            </div>
          </div>

          {/* 3. PROJECTS WIDGET (Square - 1x1) */}
          <Link href="/projects" className="glass-card glass-card-hover col-span-1 row-span-1 p-5 flex flex-col items-center justify-center gap-3 group relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <Code className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Projects</span>
          </Link>

          {/* 4. GALLERY WIDGET (Square - 1x1) */}
          <Link href="/gallery" className="glass-card glass-card-hover col-span-1 row-span-1 p-5 flex flex-col items-center justify-center gap-3 group relative overflow-hidden">
            <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 rounded-2xl bg-pink-500/20 border border-pink-500/30 text-pink-400 group-hover:scale-110 transition-transform duration-300">
              <Camera className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Gallery</span>
          </Link>

          {/* 5. COMPETITIONS WIDGET (Wide - 2x1) */}
          <Link href="/competitions" className="glass-card glass-card-hover col-span-2 row-span-1 p-5 flex justify-between items-center group relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="z-10">
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">Awards / Awards</h3>
              <p className="text-xs text-white/50 font-medium">Turboline, Hult Prize, Hackathons</p>
            </div>
            <div className="z-10 h-12 w-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Trophy className="h-5 w-5 text-orange-400" />
            </div>
          </Link>

          {/* 6. SOCIAL LINKS (Square - 1x1) */}
          <Link href="/contact" className="glass-card glass-card-hover col-span-1 row-span-1 p-5 flex flex-col items-center justify-center gap-4 group">
            <div className="flex gap-3">
              <Github className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
              <Linkedin className="h-5 w-5 text-white/70 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">Connect</span>
          </Link>

          {/* 7. ORGANIZATIONS WIDGET (Square - 1x1) */}
          <Link href="/organizations" className="glass-card glass-card-hover col-span-1 row-span-1 p-5 flex flex-col items-center justify-center gap-3 group relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Clubs</span>
          </Link>

          {/* 8. MINI PLAYER / STATUS WIDGET (Wide - 2x1) */}
          <div className="glass-card col-span-2 md:col-span-4 lg:col-span-2 row-span-1 p-5 flex items-center gap-4 relative overflow-hidden group">
            <div className="h-full aspect-square rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg relative overflow-hidden">
              {/* Spinner animation to look like playing music */}
              <div className="absolute inset-0 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
              <div className="h-4 w-4 rounded-full bg-white relative z-10" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">Current Status</p>
              <h3 className="text-sm font-medium text-white truncate group-hover:text-pink-200 transition-colors">Exams and exams..</h3>
            </div>
            <div className="hidden md:flex gap-2">
              <div className="h-2 w-1 bg-white/40 rounded-full animate-pulse-slow" style={{ animationDelay: "0s" }} />
              <div className="h-4 w-1 bg-white/60 rounded-full animate-pulse-slow" style={{ animationDelay: "0.2s" }} />
              <div className="h-3 w-1 bg-white/80 rounded-full animate-pulse-slow" style={{ animationDelay: "0.4s" }} />
              <div className="h-5 w-1 bg-white rounded-full animate-pulse-slow" style={{ animationDelay: "0.6s" }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
