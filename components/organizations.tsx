"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Award, Calendar } from "lucide-react"

export default function Organizations() {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTrails((prev) => prev.slice(1))
    }, 150)

    return () => clearInterval(timer)
  }, [])

  const organizations = [
    {
      name: "Rotaract Club of Pashupati Kathmandu",
      role: "General Member",
      period: "July 2025 - Present",
      description:
        "Participating in community service projects and leadership development activities focused on making a positive impact in the community.",
      icon: <Users className="h-6 w-6" />,
      type: "service",
      thumbnail: "/images/rotaract-breastfeeding-week.png",
    },
    {
      name: "Student Quality Circle",
      role: "Vice Coordinator",
      period: "June 2024 - Present",
      description:
        "Leading quality improvement initiatives and coordinating student activities to enhance educational standards and student engagement.",
      icon: <Award className="h-6 w-6" />,
      type: "leadership",
    },
    {
      name: "Leo Club",
      role: "Active Member",
      period: "2023 - 2024",
      description:
        "Engaged in community service activities and youth leadership development programs, contributing to various social causes and community welfare projects.",
      icon: <Heart className="h-6 w-6" />,
      type: "service",
    },
  ]

  return (
    <section className="min-h-screen bg-background py-20 relative overflow-hidden">
      {/* Mouse Glare Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-30 transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(236, 72, 153, 0.3) 30%, transparent 70%)`,
            filter: "blur(25px)",
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
              fontSize: `${14 + index * 2}px`,
              animationDuration: "1s",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {trail.type === "star" ? "✨" : "💖"}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="section-indicator mx-auto text-center">🏢 My Organizations</div>
          <h2 className="projects-heading">Organizations & Clubs</h2>
          <p className="section-subtitle">
            My journey through various organizations, clubs, and leadership roles that have shaped my personal and
            professional growth
          </p>
        </div>

        {/* Organizations Grid */}
        <div className="space-y-12">
          {organizations.map((org, index) => (
            <Card
              key={index}
              className={`card card-hover transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="flex flex-row items-start space-x-4">
                {/* Thumbnail Image */}
                {org.thumbnail && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={org.thumbnail || "/placeholder.svg"}
                      alt={org.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}

                <div className="project-icon">{org.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-foreground">{org.name}</CardTitle>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">
                      {org.role}
                    </Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">{org.period}</span>
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {org.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">{org.description}</p>

                {/* Achievement Highlights */}
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    Key Contributions
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    {org.type === "service"
                      ? "Community service projects, volunteer coordination, social impact initiatives"
                      : org.type === "leadership"
                        ? "Team leadership, project management, quality improvement processes"
                        : "Active participation, event organization, member engagement"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <Users className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Join the Journey</h3>
              <p className="text-muted-foreground mb-6">
                I'm always looking for new opportunities to contribute to meaningful organizations and causes. Let's
                connect and make a positive impact together!
              </p>
              <div className="flex justify-center space-x-4">
                <Badge variant="secondary" className="px-4 py-2">
                  Leadership
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  Community Service
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  Team Collaboration
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
