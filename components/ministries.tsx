"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Award, Trophy, Code, ExternalLink, Github, Mail } from "lucide-react"

export default function Ministries() {
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

  const organizations = [
    {
      name: "Student Quality Circle",
      role: "Vice Coordinator",
      period: "Present",
      description: "Leading quality improvement initiatives and coordinating student activities.",
      icon: <Users className="h-6 w-6" />,
      type: "leadership",
    },
    {
      name: "Rotaract Club of Pashupati Kathmandu",
      role: "General Member",
      period: "July 2025 - Present",
      description: "Participating in community service projects and leadership development activities.",
      icon: <Users className="h-6 w-6" />,
      type: "service",
    },
  ]

  const competitions = [
    {
      name: "Hult Prize At Khwopa College of Engineering 2025",
      result: "Finalist",
      date: "2025",
      description:
        "Proposed a bus system with automated sensors and purifiers for air health improvement in urban environments.",
      icon: <Award className="h-6 w-6" />,
      type: "business",
    },
    {
      name: "Codeyatra 2025",
      venue: "Himalayan College of Engineering",
      result: "Participant",
      date: "February 9-11, 2025",
      project: "Webcraft",
      description:
        "Developed a website builder for businesses with a simple form-filling interface that generates custom websites based on user inputs.",
      links: [
        {
          type: "pitch",
          url: "https://www.canva.com/design/DAGesvS4BSo/mRTLYxY0m1yju9o0_c5Efg/edit?utm_content=DAGesvS4BSo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
          label: "Canva Pitch",
        },
      ],
      icon: <Code className="h-6 w-6" />,
      type: "hackathon",
    },
    {
      name: "Hack the Circle",
      venue: "Khwopa College of Engineering",
      result: "2nd Runner Up",
      date: "December 6-8, 2024",
      project: "Bhaktapur Navigator Website",
      description:
        "Created a website where users could select a radius and view temples and food places within that area. The app showed the shortest path between selected locations and included a real-time blogspot.",
      icon: <Trophy className="h-6 w-6" />,
      type: "hackathon",
    },
    {
      name: "Hack for Business",
      venue: "KUSOM, KU",
      result: "Participant",
      date: "June 21-23, 2025",
      description:
        "Made a complete website for local business owners where customers could enter items and radius to find shops. Business owners can track unpaid amounts and manage inventory using object detection YOLO with receipt generation.",
      links: [
        {
          type: "github",
          url: "https://github.com/ShailajDahal-khwopa/Pacman_HackForBusiness",
          label: "GitHub",
        },
        {
          type: "pitch",
          url: "https://www.canva.com/design/DAGrGm34l9w/rYZXv8JITqL5tBN9XYTxSQ/edit?utm_content=DAGrGm34l9w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
          label: "Canva Pitch & Demo",
        },
      ],
      icon: <Code className="h-6 w-6" />,
      type: "hackathon",
    },
    {
      name: "Turboline x IIMS International Hackathon",
      venue: "IIMS College, Naxal",
      result: "Top 10 out of 57 teams",
      date: "July 10-12, 2025",
      project: "MatchTrix",
      description:
        "Our model converts a 2D captured video into 3D interactive playground adding a whole new line of creativity. Used YOLO, Blender, Homography techniques, and computer vision.",
      links: [
        {
          type: "pitch",
          url: "https://www.canva.com/design/DAGzmAZ_Dhw/qVUXNZ-z7IlFDfBUSdzKXw/edit?utm_content=DAGzmAZ_Dhw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
          label: "Canva Pitch & Demo",
        },
        {
          type: "email",
          url: "mailto:mail@supriyapoudel.com.np",
          label: "Mail for Code",
        },
      ],
      icon: <Trophy className="h-6 w-6" />,
      type: "hackathon",
      status: "Work in Progress",
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
          <div className="section-indicator mx-auto text-center">🏆 My Journey</div>
          <h2 className="section-title">Organizations & Competitions</h2>
          <p className="section-subtitle">My involvement in organizations and competitive achievements</p>
        </div>

        {/* Organizations Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Organizations</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {organizations.map((org, index) => (
              <Card
                key={index}
                className={`card card-hover transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="project-icon">{org.icon}</div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground">{org.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {org.role}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{org.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{org.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitions Section */}
        <div>
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Competitions</h3>
          <div className="space-y-8">
            {competitions.map((comp, index) => (
              <Card
                key={index}
                className={`card card-hover transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="project-icon">{comp.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-foreground">{comp.name}</CardTitle>
                        {comp.venue && (
                          <div className="flex items-center space-x-1 mt-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{comp.venue}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge
                            variant={
                              comp.result.includes("Runner Up") ||
                              comp.result.includes("Top") ||
                              comp.result.includes("Finalist")
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {comp.result}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{comp.date}</span>
                          </div>
                          {comp.status && (
                            <Badge variant="outline" className="text-xs">
                              {comp.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comp.project && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Project: {comp.project}</h4>
                    </div>
                  )}
                  <p className="text-muted-foreground">{comp.description}</p>

                  {comp.links && comp.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {comp.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors duration-300 text-sm"
                        >
                          {link.type === "github" && <Github className="h-4 w-4" />}
                          {link.type === "pitch" && <ExternalLink className="h-4 w-4" />}
                          {link.type === "email" && <Mail className="h-4 w-4" />}
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
