"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Database, Award, Calendar, MapPin } from "lucide-react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number; type: "star" | "heart" }>>([])

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

  const skills = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Machine Learning",
      description: "Working with Python, NumPy, PyTorch, and scikit-learn.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Web Development",
      description: "Familiarity with React, Next.js, HTML, CSS, and JavaScript.",
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Backend",
      description: "Attained knowledge of Supabase and Flask, did basic Node.js.",
    },
  ]

  const timeline = [
    {
      year: "2024",
      title: "ML Journey Begins",
      description: "Started focusing on machine learning and data science",
      icon: <Award className="h-5 w-5" />,
    },
    {
      year: "2023",
      title: "Web Development",
      description: "Built multiple web applications and learned modern frameworks",
      icon: <Code className="h-5 w-5" />,
    },
    {
      year: "2022",
      title: "Tech Exploration",
      description: "Began exploring various programming languages and technologies",
      icon: <Lightbulb className="h-5 w-5" />,
    },
  ]

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-black/40 py-20 relative overflow-hidden">
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
          <div className="section-indicator mx-auto text-center">🚀 My Journey</div>
          <h2 className="about-heading">About Me</h2>
          <p className="section-subtitle">Get to know more about me and my journey in the tech world</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Image and Info */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="image-frame relative w-full h-[400px] overflow-hidden">
                  <Image
                    src="/images/profile2.png"
                    alt="Supriya"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl opacity-20 -z-10" />
            </div>

            {/* Personal Info */}
            <Card className="card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Personal Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Bhaktapur, Nepal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Available for opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Content */}
          <div
            className={`space-y-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            {/* Story */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">My Tech Journey</h3>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  Hello! I'm Supriya, a growing person in tech who started with web dev but then found comfort in the
                  machine learning models.
                </p>
                <p>
                  My background in web development has given me a solid foundation in creating user-friendly interfaces,
                  while my growing expertise in machine learning allows me to work on data-driven solutions that make a
                  real impact.
                </p>
                <p>
                  I believe in continuous learning and love taking on challenges that push me to grow both technically
                  and personally.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-8">Skills & Expertise</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <Card
                    key={index}
                    className={`card card-hover transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="project-icon">{skill.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-foreground mb-2">{skill.title}</h4>
                          <p className="text-muted-foreground">{skill.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-8">Journey Timeline</h3>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${1.0 + index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary">{item.year}</div>
                      <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
