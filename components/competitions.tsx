"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Award, Trophy, Code, ExternalLink, Github, Mail, Star, Target, Eye, Bot } from "lucide-react"
import CompetitionModal from "./competition-modal"

export default function Competitions() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const competitions = [
    {
      name: "Turboline x IIMS International Hackathon",
      venue: "IIMS College, Naxal",
      result: "Top 10 out of 57 teams",
      date: "July 10-12, 2025",
      project: "MatchTrix",
      description:
        "Our model converts a 2D captured video into 3D interactive playground adding a whole new line of creativity. Used YOLO, Blender, Homography techniques, and computer vision.",
      technologies: ["YOLO", "Blender", "Computer Vision", "Python", "3D Modeling", "Video Processing"],
      teamSize: "4 members",
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
      images: [
        { url: "/images/turboline-presentation.jpg", caption: "Team presenting MatchTrix project during the pitch session" },
        { url: "/images/turboline-team.jpg", caption: "Team photo at the Turboline x IIMS Hackathon 2025" },
        { url: "/images/turboline-certificates.jpg", caption: "Receiving certificates of participation with the full team" },
      ],
      thumbnail: "/images/turboline-team.jpg",
      icon: <Trophy className="h-5 w-5" />,
      type: "hackathon",
      status: "Work in Progress",
    },
    {
      name: "Hack for Business",
      venue: "KUSOM, KU",
      result: "Participant",
      date: "June 21-23, 2025",
      project: "Stockwise",
      description:
        "Made a complete website for local business owners where customers could enter items and radius to find shops. Business owners can track unpaid amounts and manage inventory using object detection YOLO with receipt generation.",
      technologies: ["React", "Node.js", "YOLO", "Object Detection", "MongoDB", "Express"],
      teamSize: "3 members",
      links: [
        { type: "github", url: "https://github.com/ShailajDahal-khwopa/Pacman_HackForBusiness", label: "GitHub" },
        {
          type: "pitch",
          url: "https://www.canva.com/design/DAGrGm34l9w/rYZXv8JITqL5tBN9XYTxSQ/edit?utm_content=DAGrGm34l9w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
          label: "Canva Pitch & Demo",
        },
      ],
      images: [
        { url: "/images/hack-business-team.jpg", caption: "Team relaxing outside Kathmandu University during the hackathon" },
        { url: "/images/hack-business-group.jpg", caption: "Group photo of all Hack for Business participants with mountain backdrop" },
      ],
      thumbnail: "/images/hack-business-team.jpg",
      icon: <Code className="h-5 w-5" />,
      type: "hackathon",
    },
    {
      name: "Hult Prize At Khwopa College of Engineering 2025",
      venue: "Khwopa College of Engineering",
      result: "Finalist",
      date: "2025",
      description:
        "Proposed a bus system with automated sensors and purifiers for air health improvement in urban environments.",
      technologies: ["IoT", "Environmental Sensors", "Business Strategy", "Sustainability"],
      teamSize: "4 members",
      images: [
        { url: "/images/hult-prize-presentation.jpg", caption: "Team presenting our sustainable bus system solution at Hult Prize competition" },
        { url: "/images/hult-prize-certificates.jpg", caption: "Team celebrating with Hult Prize participation certificates" },
      ],
      thumbnail: "/images/hult-prize-certificates.jpg",
      icon: <Award className="h-5 w-5" />,
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
      technologies: ["React", "Node.js", "Website Builder", "Form Processing", "Template Engine"],
      teamSize: "Individual",
      links: [
        {
          type: "pitch",
          url: "https://www.canva.com/design/DAGesvS4BSo/mRTLYxY0m1yju9o0_c5Efg/edit?utm_content=DAGesvS4BSo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
          label: "Canva Pitch",
        },
      ],
      images: [
        { url: "/images/codeyatra-badges.jpg", caption: "Codeyatra 2025 participant badges and event materials" },
        { url: "/images/codeyatra-fun.jpg", caption: "Having fun at Codeyatra with branded sunglasses and peace sign" },
      ],
      thumbnail: "/images/codeyatra-fun.jpg",
      icon: <Code className="h-5 w-5" />,
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
      technologies: ["React", "Maps API", "Routing Algorithms", "Real-time Updates", "Location Services"],
      teamSize: "Team",
      images: [
        { url: "/images/hack-circle-badges.jpg", caption: "Team Clueless Coders participant badges for Hack the Circle competition" },
        { url: "/images/hack-circle-award.jpg", caption: "Team celebrating 2nd Runner Up achievement at Hack the Circle award ceremony" },
      ],
      thumbnail: "/images/hack-circle-award.jpg",
      teamName: "Clueless Coders",
      icon: <Trophy className="h-5 w-5" />,
      type: "hackathon",
    },
    {
      name: "Maze-Following Robot Competition - CHAKRABYUH",
      venue: "Khwopa College of Engineering",
      result: "Best Female Group",
      date: "December 17, 2024",
      project: "Team Deainira Robot",
      description:
        "Team Deainira built a basic left-wall-following robot — simple in logic, but challenging to get just right. From wiring the circuits to debugging movement issues, every small success felt like a huge win. While our bot didn't have complex pathfinding, we learned so much about sensor calibration, motor control, real-time debugging, and team coordination under pressure.",
      technologies: ["Arduino", "Ultrasonic Sensors", "Motor Control", "C++", "Circuit Design", "Robotics"],
      teamSize: "4 members (Female Team)",
      images: [
        { url: "/images/robotics-certificate.jpg", caption: "Certificate and trophy for Best Female Team in CHAKRABYUH competition" },
        { url: "/images/robotics-robot.jpg", caption: "Our maze-following robot with left-wall-following algorithm" },
        { url: "/images/robotics-ceremony.jpg", caption: "Award ceremony at Khwopa College of Engineering" },
        { url: "/images/robotics-team.jpg", caption: "Team Deainira celebrating our Best Female Group award" },
      ],
      thumbnail: "/images/robotics-team.jpg",
      icon: <Bot className="h-5 w-5" />,
      type: "robotics",
      teamName: "Team Deainira",
    },
  ]

  const getResultStyle = (result: string) => {
    if (result.includes("Runner Up") || result.includes("Top") || result.includes("Finalist") || result.includes("Best")) {
      return "bg-pink-500/15 text-pink-400 border-pink-500/25"
    }
    return "bg-white/5 text-white/60 border-white/10"
  }

  const openModal = (competition: any) => {
    setSelectedCompetition(competition)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCompetition(null)
  }

  return (
    <section className="min-h-screen py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="section-indicator">🏆 My Achievements</div>
          <h2 className="projects-heading">Competitions & Hackathons</h2>
          <p className="section-subtitle">
            My competitive journey through hackathons, business competitions, robotics challenges, and tech events
          </p>
        </div>

        {/* Competitions */}
        <div className="space-y-4">
          {competitions.map((comp, index) => (
            <div
              key={index}
              className={`glass-card glass-card-hover p-6 cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onClick={() => openModal(comp)}
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                {comp.thumbnail && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                    <img
                      src={comp.thumbnail}
                      alt={comp.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}

                <div className="project-icon flex-shrink-0">{comp.icon}</div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white/90 mb-1">{comp.name}</h3>

                  {comp.venue && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="h-3 w-3 text-white/30" />
                      <span className="text-xs text-white/35">{comp.venue}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getResultStyle(comp.result)}`}>
                      <Star className="h-2.5 w-2.5" />
                      {comp.result}
                    </span>
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {comp.date}
                    </span>
                    <span className="glass-badge">{comp.type}</span>
                    {comp.status && (
                      <span className="glass-badge" style={{ borderColor: "rgba(251,146,60,0.3)", color: "rgb(251,146,60)" }}>
                        {comp.status}
                      </span>
                    )}
                    {comp.teamName && (
                      <span className="glass-badge" style={{ borderColor: "rgba(168,85,247,0.3)", color: "rgb(168,85,247)" }}>
                        {comp.teamName}
                      </span>
                    )}
                  </div>

                  {comp.project && (
                    <div className="p-2 rounded-lg mb-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-xs font-semibold text-white/60 flex items-center gap-1">
                        <Target className="h-3 w-3 text-pink-400" />
                        Project: {comp.project}
                      </span>
                    </div>
                  )}

                  <p className="text-white/40 text-sm leading-relaxed mb-3 line-clamp-2">{comp.description}</p>

                  <div className="flex items-center justify-between">
                    {comp.links && comp.links.length > 0 && (
                      <div className="flex gap-2">
                        {comp.links.slice(0, 2).map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="glass-button inline-flex items-center text-xs py-1.5 px-3"
                          >
                            {link.type === "github" && <Github className="h-3 w-3 mr-1.5" />}
                            {link.type === "pitch" && <ExternalLink className="h-3 w-3 mr-1.5" />}
                            {link.type === "email" && <Mail className="h-3 w-3 mr-1.5" />}
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}

                    <button className="glass-button inline-flex items-center text-xs py-1.5 px-3 ml-auto">
                      <Eye className="h-3 w-3 mr-1.5" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-16 text-center">
          <div className="glass-card max-w-3xl mx-auto p-8">
            <Trophy className="h-14 w-14 text-pink-400/50 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white/90 mb-3">Competition Highlights</h3>
            <p className="text-white/40 mb-6 text-sm">
              Through these competitions, I've developed technical skills, teamwork abilities, and problem-solving
              expertise while working on innovative solutions for real-world challenges.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: `${competitions.length}+`, label: "Competitions" },
                { value: `${competitions.filter(c => c.result.includes("Runner Up") || c.result.includes("Top") || c.result.includes("Finalist") || c.result.includes("Best")).length}+`, label: "Awards" },
                { value: `${competitions.filter(c => c.project).length}+`, label: "Projects" },
                { value: "2+", label: "Years Active" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-bold text-pink-400/80">{stat.value}</div>
                  <div className="text-xs text-white/35">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CompetitionModal competition={selectedCompetition} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
