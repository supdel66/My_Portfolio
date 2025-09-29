"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Database, Code, Utensils } from "lucide-react"

export default function Projects() {
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

  const projects = [
    {
      title: "Customer Churn Prediction",
      description:
        "A machine learning model that predicts customer churn based on historical data for subscription-based services.",
      tags: ["Python", "Scikit-learn", "Data Analysis", "Machine Learning"],
      github: "https://github.com/supdel66/Customer-Churn-Prediction",
      demo: "#",
      icon: <Database className="h-10 w-10 text-primary/60" />,
    },
    {
      title: "Recipe Finder",
      description:
        "Web application that helps users find recipes based on available ingredients and dietary preferences.",
      tags: ["JavaScript", "API", "CSS", "HTML"],
      github: "https://github.com/supdel66/Recipe-Finder",
      demo: "https://supdel66.github.io/Recipe-Finder/",
      icon: <Utensils className="h-10 w-10 text-primary/60" />,
    },
    {
      title: "Mini JS Projects",
      description:
        "Collection of small JavaScript projects showcasing various web development concepts and techniques.",
      tags: ["JavaScript", "HTML", "CSS", "DOM Manipulation"],
      github: "https://github.com/supdel66/js_projects",
      demo: "https://supdel66.github.io/js_projects/",
      icon: <Code className="h-10 w-10 text-primary/60" />,
    },
    {
      title: "Illumination Graphics Project",
      description: "A 3D animated scene demonstrating ambient, diffuse, and specular lighting models with reflections.",
      tags: ["WebGL", "3D Animation", "Lighting Models", "Graphics"],
      github: "https://github.com/supdel66/illumination-graphics",
      demo: "https://graphics.supriyapoudel.com.np",
      icon: <Code className="h-10 w-10 text-primary/60" />,
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
          <div className="section-indicator mx-auto text-center">💻 My Work</div>
          <h2 className="projects-heading">My Projects</h2>
          <p className="section-subtitle">Here are some of the projects I've been working on during my tech journey</p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`card card-hover transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="flex flex-row items-start space-x-4">
                <div className="project-icon">{project.icon}</div>
                <div>
                  <CardTitle className="text-foreground">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="button-glow bg-transparent">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild className="button-glow">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
