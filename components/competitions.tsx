"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Award, Trophy, Code, ExternalLink, Github, Mail, Star, Target, Eye, Bot } from "lucide-react"
import CompetitionModal from "./competition-modal"

export default function Competitions() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
        {
          url: "/images/turboline-presentation.jpg",
          caption: "Team presenting MatchTrix project during the pitch session",
        },
        {
          url: "/images/turboline-team.jpg",
          caption: "Team photo at the Turboline x IIMS Hackathon 2025",
        },
        {
          url: "/images/turboline-certificates.jpg",
          caption: "Receiving certificates of participation with the full team",
        },
      ],
      thumbnail: "/images/turboline-team.jpg",
      icon: <Trophy className="h-6 w-6" />,
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
      images: [
        {
          url: "/images/hack-business-team.jpg",
          caption: "Team relaxing outside Kathmandu University during the hackathon",
        },
        {
          url: "/images/hack-business-group.jpg",
          caption: "Group photo of all Hack for Business participants with mountain backdrop",
        },
      ],
      thumbnail: "/images/hack-business-team.jpg",
      icon: <Code className="h-6 w-6" />,
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
        {
          url: "/images/hult-prize-presentation.jpg",
          caption: "Team presenting our sustainable bus system solution at Hult Prize competition",
        },
        {
          url: "/images/hult-prize-certificates.jpg",
          caption: "Team celebrating with Hult Prize participation certificates",
        },
      ],
      thumbnail: "/images/hult-prize-certificates.jpg",
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
        {
          url: "/images/codeyatra-badges.jpg",
          caption: "Codeyatra 2025 participant badges and event materials",
        },
        {
          url: "/images/codeyatra-fun.jpg",
          caption: "Having fun at Codeyatra with branded sunglasses and peace sign",
        },
      ],
      thumbnail: "/images/codeyatra-fun.jpg",
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
      technologies: ["React", "Maps API", "Routing Algorithms", "Real-time Updates", "Location Services"],
      teamSize: "Team",
      images: [
        {
          url: "/images/hack-circle-badges.jpg",
          caption: "Team Clueless Coders participant badges for Hack the Circle competition",
        },
        {
          url: "/images/hack-circle-award.jpg",
          caption: "Team celebrating 2nd Runner Up achievement at Hack the Circle award ceremony",
        },
      ],
      thumbnail: "/images/hack-circle-award.jpg",
      teamName: "Clueless Coders",
      icon: <Trophy className="h-6 w-6" />,
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
        {
          url: "/images/robotics-certificate.jpg",
          caption: "Certificate and trophy for Best Female Team in CHAKRABYUH competition",
        },
        {
          url: "/images/robotics-robot.jpg",
          caption: "Our maze-following robot with left-wall-following algorithm",
        },
        {
          url: "/images/robotics-ceremony.jpg",
          caption: "Award ceremony at Khwopa College of Engineering",
        },
        {
          url: "/images/robotics-team.jpg",
          caption: "Team Deainira celebrating our Best Female Group award",
        },
      ],
      thumbnail: "/images/robotics-team.jpg",
      icon: <Bot className="h-6 w-6" />,
      type: "robotics",
      teamName: "Team Deainira",
    },
  ]

  const getResultBadgeVariant = (result: string) => {
    if (
      result.includes("Runner Up") ||
      result.includes("Top") ||
      result.includes("Finalist") ||
      result.includes("Best")
    ) {
      return "default"
    }
    return "secondary"
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
          <div className="section-indicator mx-auto text-center">🏆 My Achievements</div>
          <h2 className="projects-heading">Competitions & Hackathons</h2>
          <p className="section-subtitle">
            My competitive journey through hackathons, business competitions, robotics challenges, and tech events that
            have pushed my limits and expanded my skills
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="space-y-12">
          {competitions.map((comp, index) => (
            <Card
              key={index}
              className={`card card-hover transition-all duration-700 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
              onClick={() => openModal(comp)}
            >
              <CardHeader className="flex flex-row items-start space-x-4">
                {/* Thumbnail Image */}
                {comp.thumbnail && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={comp.thumbnail || "/placeholder.svg"}
                      alt={comp.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}

                <div className="project-icon">{comp.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-foreground">{comp.name}</CardTitle>

                  {comp.venue && (
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">{comp.venue}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge variant={getResultBadgeVariant(comp.result)} className="text-sm font-semibold px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      {comp.result}
                    </Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">{comp.date}</span>
                    </div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {comp.type}
                    </Badge>
                    {comp.status && (
                      <Badge
                        variant="outline"
                        className="text-xs font-medium border-orange-200 text-orange-600 dark:border-orange-800 dark:text-orange-400"
                      >
                        {comp.status}
                      </Badge>
                    )}
                    {comp.teamName && (
                      <Badge
                        variant="outline"
                        className="text-xs font-medium border-purple-200 text-purple-600 dark:border-purple-800 dark:text-purple-400"
                      >
                        {comp.teamName}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {comp.project && (
                  <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2 text-primary" />
                      Project: {comp.project}
                    </h4>
                  </div>
                )}

                <p className="text-muted-foreground leading-relaxed text-lg">{comp.description}</p>

                <div className="flex items-center justify-between">
                  {comp.links && comp.links.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {comp.links.slice(0, 2).map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium shadow-md hover:shadow-lg ${
                            link.type === "github"
                              ? "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                              : link.type === "pitch"
                                ? "bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300"
                                : "bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/20 dark:hover:bg-green-900/30 dark:text-green-300"
                          }`}
                        >
                          {link.type === "github" && <Github className="h-4 w-4" />}
                          {link.type === "pitch" && <ExternalLink className="h-4 w-4" />}
                          {link.type === "email" && <Mail className="h-4 w-4" />}
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Summary */}
        <div className="mt-20 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-10">
              <Trophy className="h-20 w-20 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-4">Competition Highlights</h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Through these competitions, I've developed technical skills, teamwork abilities, and problem-solving
                expertise while working on innovative solutions for real-world challenges.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{competitions.length}+</div>
                  <div className="text-sm text-muted-foreground">Competitions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {
                      competitions.filter(
                        (comp) =>
                          comp.result.includes("Runner Up") ||
                          comp.result.includes("Top") ||
                          comp.result.includes("Finalist") ||
                          comp.result.includes("Best"),
                      ).length
                    }
                    +
                  </div>
                  <div className="text-sm text-muted-foreground">Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {competitions.filter((comp) => comp.project).length}+
                  </div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2+</div>
                  <div className="text-sm text-muted-foreground">Years Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Competition Modal */}
      <CompetitionModal competition={selectedCompetition} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
