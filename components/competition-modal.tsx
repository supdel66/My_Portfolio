"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Target, ChevronLeft, ChevronRight, ExternalLink, Github, Mail, X, Star } from "lucide-react"

interface CompetitionModalProps {
  competition: any
  isOpen: boolean
  onClose: () => void
}

export default function CompetitionModal({ competition, isOpen, onClose }: CompetitionModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!competition || !isOpen) return null

  const nextImage = () => {
    if (competition.images && competition.images.length > 1) {
      setCurrentImageIndex((prev: number) => (prev + 1) % competition.images.length)
    }
  }

  const prevImage = () => {
    if (competition.images && competition.images.length > 1) {
      setCurrentImageIndex((prev: number) => (prev - 1 + competition.images.length) % competition.images.length)
    }
  }

  const getResultStyle = (result: string) => {
    if (result.includes("Runner Up") || result.includes("Top") || result.includes("Finalist") || result.includes("Best")) {
      return "bg-pink-500/15 text-pink-400 border-pink-500/25"
    }
    return "bg-white/5 text-white/60 border-white/10"
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6"
        style={{
          background: "rgba(15, 15, 20, 0.95)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-white/50 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white/90 mb-6 pr-12">{competition.name}</h2>

        {/* Image Carousel */}
        {competition.images && competition.images.length > 0 && (
          <div className="relative mb-6">
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <img
                src={competition.images[currentImageIndex]?.url || "/placeholder.svg"}
                alt={competition.images[currentImageIndex]?.caption || competition.name}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {competition.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-white/80 hover:text-white transition-all"
                    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-white/80 hover:text-white transition-all"
                    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            {competition.images[currentImageIndex]?.caption && (
              <p className="text-sm text-white/40 mt-2 text-center">
                {competition.images[currentImageIndex].caption}
              </p>
            )}

            {/* Dots */}
            {competition.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-3">
                {competition.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-pink-400" : "bg-white/20"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white/70 mb-3">Event Details</h3>
              <div className="space-y-2">
                {competition.venue && (
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <MapPin className="h-4 w-4 text-pink-400/60" />
                    <span>{competition.venue}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Calendar className="h-4 w-4 text-pink-400/60" />
                  <span>{competition.date}</span>
                </div>
                {competition.teamSize && (
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Users className="h-4 w-4 text-pink-400/60" />
                    <span>{competition.teamSize}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white/70 mb-2">Achievement</h3>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getResultStyle(competition.result)}`}>
                <Star className="h-3 w-3" />
                {competition.result}
              </span>
            </div>

            {competition.teamName && (
              <div>
                <h3 className="text-sm font-semibold text-white/70 mb-2">Team</h3>
                <span className="glass-badge">{competition.teamName}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {competition.project && (
              <div>
                <h3 className="text-sm font-semibold text-white/70 mb-2 flex items-center gap-1">
                  <Target className="h-3.5 w-3.5 text-pink-400" />
                  Project
                </h3>
                <p className="text-white/80 text-sm font-medium">{competition.project}</p>
              </div>
            )}

            {competition.technologies && competition.technologies.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white/70 mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-1.5">
                  {competition.technologies.map((tech: string, index: number) => (
                    <span key={index} className="tag text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {competition.status && (
              <div>
                <h3 className="text-sm font-semibold text-white/70 mb-2">Status</h3>
                <span className="glass-badge" style={{ borderColor: "rgba(251,146,60,0.3)", color: "rgb(251,146,60)" }}>
                  {competition.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/70 mb-2">About the Project</h3>
          <p className="text-white/45 text-sm leading-relaxed">{competition.description}</p>
        </div>

        {/* Links */}
        {competition.links && competition.links.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-white/70 mb-3">Project Links</h3>
            <div className="flex flex-wrap gap-2">
              {competition.links.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button inline-flex items-center gap-2 text-sm"
                >
                  {link.type === "github" && <Github className="h-4 w-4" />}
                  {link.type === "pitch" && <ExternalLink className="h-4 w-4" />}
                  {link.type === "email" && <Mail className="h-4 w-4" />}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
