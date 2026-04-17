"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Code, Lightbulb, Database, Award, Calendar, MapPin } from "lucide-react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const skills = [
    {
      icon: <Code className="h-5 w-5 text-pink-400" />,
      title: "Machine Learning",
      description: "Working with Python, NumPy, PyTorch, and scikit-learn.",
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-purple-400" />,
      title: "Web Development",
      description: "Familiarity with React, Next.js, HTML, CSS, and JavaScript.",
    },
    {
      icon: <Database className="h-5 w-5 text-blue-400" />,
      title: "Backend",
      description: "Attained knowledge of Supabase and Flask, did basic Node.js.",
    },
  ]

  const timeline = [
    {
      year: "2024",
      title: "ML Journey Begins",
      description: "Started focusing on machine learning and data science",
      icon: <Award className="h-4 w-4" />,
    },
    {
      year: "2023",
      title: "Web Development",
      description: "Built multiple web applications and learned modern frameworks",
      icon: <Code className="h-4 w-4" />,
    },
    {
      year: "2022",
      title: "Tech Exploration",
      description: "Began exploring various programming languages and technologies",
      icon: <Lightbulb className="h-4 w-4" />,
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
          <div className="section-indicator">🚀 My Journey</div>
          <h2 className="about-heading">About Me</h2>
          <p className="section-subtitle">Get to know more about me and my journey in the tech world</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image and Info */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            style={{ transitionDelay: "0.2s" }}
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="image-frame relative w-full h-[380px] overflow-hidden">
                  <Image
                    src="/images/profile2.png"
                    alt="Supriya"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white/90 mb-4">Personal Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-pink-400" />
                  <span className="text-white/50 text-sm">Bhaktapur, Nepal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-pink-400" />
                  <span className="text-white/50 text-sm">Available for opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`space-y-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            style={{ transitionDelay: "0.4s" }}
          >
            {/* Story */}
            <div>
              <h3 className="text-2xl font-bold text-white/90 mb-4">My Tech Journey</h3>
              <div className="space-y-3 text-white/55 leading-relaxed text-sm">
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
              <h3 className="text-2xl font-bold text-white/90 mb-6">Skills & Expertise</h3>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`glass-card glass-card-hover p-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="project-icon">{skill.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-white/85 mb-1">{skill.title}</h4>
                        <p className="text-white/45 text-sm">{skill.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-2xl font-bold text-white/90 mb-6">Journey Timeline</h3>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                      }`}
                    style={{ transitionDelay: `${1.0 + index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white/80"
                      style={{ background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.25)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-pink-400/80">{item.year}</div>
                      <h4 className="text-sm font-semibold text-white/85">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.description}</p>
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
