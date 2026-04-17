"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Github, Database, Code, Utensils } from "lucide-react"

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      title: "Customer Churn Prediction",
      description:
        "A machine learning model that predicts customer churn based on historical data for subscription-based services.",
      tags: ["Python", "Scikit-learn", "Data Analysis", "Machine Learning"],
      github: "https://github.com/supdel66/Customer-Churn-Prediction",
      demo: "#",
      icon: <Database className="h-8 w-8 text-pink-400/60" />,
    },
    {
      title: "Recipe Finder",
      description:
        "Web application that helps users find recipes based on available ingredients and dietary preferences.",
      tags: ["JavaScript", "API", "CSS", "HTML"],
      github: "https://github.com/supdel66/Recipe-Finder",
      demo: "https://supdel66.github.io/Recipe-Finder/",
      icon: <Utensils className="h-8 w-8 text-purple-400/60" />,
    },
    {
      title: "Mini JS Projects",
      description:
        "Collection of small JavaScript projects showcasing various web development concepts and techniques.",
      tags: ["JavaScript", "HTML", "CSS", "DOM Manipulation"],
      github: "https://github.com/supdel66/js_projects",
      demo: "https://supdel66.github.io/js_projects/",
      icon: <Code className="h-8 w-8 text-blue-400/60" />,
    },
    {
      title: "Illumination Graphics Project",
      description: "A 3D animated scene demonstrating ambient, diffuse, and specular lighting models with reflections.",
      tags: ["WebGL", "3D Animation", "Lighting Models", "Graphics"],
      github: "https://github.com/supdel66/illumination-graphics",
      demo: "https://graphics.supriyapoudel.com.np",
      icon: <Code className="h-8 w-8 text-cyan-400/60" />,
    },
  ]

  return (
    <section className="min-h-screen py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="section-indicator">💻 My Work</div>
          <h2 className="projects-heading">My Projects</h2>
          <p className="section-subtitle">Here are some of the projects I've been working on during my tech journey</p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`glass-card glass-card-hover p-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="project-icon">{project.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white/90 mb-1">{project.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button inline-flex items-center text-sm"
                >
                  <Github className="mr-2 h-3.5 w-3.5" />
                  Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button-primary inline-flex items-center text-sm"
                >
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
