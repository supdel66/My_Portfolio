"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Target, ChevronLeft, ChevronRight, ExternalLink, Github, Mail } from "lucide-react"

interface CompetitionModalProps {
  competition: any
  isOpen: boolean
  onClose: () => void
}

export default function CompetitionModal({ competition, isOpen, onClose }: CompetitionModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!competition) return null

  const nextImage = () => {
    if (competition.images && competition.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % competition.images.length)
    }
  }

  const prevImage = () => {
    if (competition.images && competition.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + competition.images.length) % competition.images.length)
    }
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{competition.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Carousel */}
          {competition.images && competition.images.length > 0 && (
            <div className="relative">
              <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
                <img
                  src={competition.images[currentImageIndex]?.url || "/placeholder.svg"}
                  alt={competition.images[currentImageIndex]?.caption || competition.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {competition.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Image Caption */}
              {competition.images[currentImageIndex]?.caption && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {competition.images[currentImageIndex].caption}
                </p>
              )}

              {/* Dots Indicator */}
              {competition.images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {competition.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Competition Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                <div className="space-y-2">
                  {competition.venue && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{competition.venue}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{competition.date}</span>
                  </div>
                  {competition.teamSize && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{competition.teamSize}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Achievement</h3>
                <Badge variant={getResultBadgeVariant(competition.result)} className="text-sm font-semibold">
                  {competition.result}
                </Badge>
              </div>

              {competition.teamName && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Team</h3>
                  <Badge variant="outline" className="text-sm">
                    {competition.teamName}
                  </Badge>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {competition.project && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Project
                  </h3>
                  <p className="text-sm font-medium">{competition.project}</p>
                </div>
              )}

              {competition.technologies && competition.technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {competition.technologies.map((tech: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {competition.status && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Status</h3>
                  <Badge variant="outline" className="text-sm border-orange-200 text-orange-600">
                    {competition.status}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About the Project</h3>
            <p className="text-muted-foreground leading-relaxed">{competition.description}</p>
          </div>

          {/* Links */}
          {competition.links && competition.links.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Project Links</h3>
              <div className="flex flex-wrap gap-3">
                {competition.links.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
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
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
