"use client"

import { useState, useEffect } from "react"
import { Users, Heart, Award, Calendar } from "lucide-react"

export default function Organizations() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const organizations = [
    {
      name: "Rotaract Club of Pashupati Kathmandu",
      role: "General Member",
      period: "July 2025 - Present",
      description:
        "Participating in community service projects and leadership development activities focused on making a positive impact in the community.",
      icon: <Users className="h-5 w-5 text-pink-400" />,
      type: "service",
      thumbnail: "/images/rotaract-breastfeeding-week.png",
    },
    {
      name: "Student Quality Circle",
      role: "Vice Coordinator",
      period: "June 2024 - Present",
      description:
        "Leading quality improvement initiatives and coordinating student activities to enhance educational standards and student engagement.",
      icon: <Award className="h-5 w-5 text-purple-400" />,
      type: "leadership",
    },
    {
      name: "Leo Club",
      role: "Active Member",
      period: "2023 - 2024",
      description:
        "Engaged in community service activities and youth leadership development programs, contributing to various social causes and community welfare projects.",
      icon: <Heart className="h-5 w-5 text-blue-400" />,
      type: "service",
    },
  ]

  return (
    <section className="min-h-screen py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="section-indicator">🏢 My Organizations</div>
          <h2 className="projects-heading">Organizations & Clubs</h2>
          <p className="section-subtitle">
            My journey through various organizations, clubs, and leadership roles that have shaped my personal and
            professional growth
          </p>
        </div>

        {/* Organizations */}
        <div className="space-y-4">
          {organizations.map((org, index) => (
            <div
              key={index}
              className={`glass-card glass-card-hover p-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                {org.thumbnail && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                    <img
                      src={org.thumbnail}
                      alt={org.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}

                <div className="project-icon flex-shrink-0">{org.icon}</div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{org.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="glass-badge">{org.role}</span>
                    <div className="flex items-center gap-1 text-white/40 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>{org.period}</span>
                    </div>
                    <span className="glass-badge">{org.type}</span>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed mb-4">{org.description}</p>

                  <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <h4 className="font-semibold text-white/70 mb-1 flex items-center text-xs">
                      <Award className="h-3 w-3 mr-1.5 text-pink-400" />
                      Key Contributions
                    </h4>
                    <div className="text-xs text-white/35">
                      {org.type === "service"
                        ? "Community service projects, volunteer coordination, social impact initiatives"
                        : org.type === "leadership"
                          ? "Team leadership, project management, quality improvement processes"
                          : "Active participation, event organization, member engagement"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card max-w-2xl mx-auto p-8">
            <Users className="h-12 w-12 text-pink-400/60 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white/90 mb-3">Join the Journey</h3>
            <p className="text-white/40 mb-5 text-sm">
              I'm always looking for new opportunities to contribute to meaningful organizations and causes. Let's
              connect and make a positive impact together!
            </p>
            <div className="flex justify-center gap-2">
              <span className="glass-badge">Leadership</span>
              <span className="glass-badge">Community Service</span>
              <span className="glass-badge">Collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
