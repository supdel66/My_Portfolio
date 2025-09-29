"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, Calendar } from "lucide-react"
import ImageModal from "./image-modal"

interface GalleryImage {
  src: string
  title: string
  description: string
  category: string
  year: number
}

interface GalleryGroup {
  title: string
  description: string
  category: string
  year: number
  images: GalleryImage[]
}

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState<number>(2025)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<GalleryImage[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const galleryData: GalleryGroup[] = [
    {
      title: "Rotaract Club of Pashupati Kathmandu",
      description: "Community service activities and social impact initiatives with fellow Rotaractors",
      category: "Organization",
      year: 2025,
      images: [
        {
          src: "/images/rotaract-breastfeeding-week.png",
          title: "World Breastfeeding Week Awareness Session",
          description:
            "Breastfeeding awareness and training session organized at HPN Clinic, Suryabinyak on August 6, 2025, featuring expert counseling by Rtn. Dr. Archana KC",
          category: "Organization",
          year: 2025,
        },
      ],
    },
    {
      title: "Turboline x IIMS International Hackathon",
      description: "Team presentation, group photo, and achievement certificates from the international hackathon",
      category: "Hackathon",
      year: 2025,
      images: [
        {
          src: "/images/turboline-presentation.jpg",
          title: "Team Presentation",
          description: "Presenting our solution at Turboline x IIMS International Hackathon",
          category: "Hackathon",
          year: 2025,
        },
        {
          src: "/images/turboline-team.jpg",
          title: "Team Photo",
          description: "Our team at the Turboline x IIMS International Hackathon venue",
          category: "Hackathon",
          year: 2025,
        },
        {
          src: "/images/turboline-certificates.jpg",
          title: "Achievement Certificates",
          description: "Certificates received from Turboline x IIMS International Hackathon",
          category: "Achievement",
          year: 2025,
        },
      ],
    },
    {
      title: "Hack for Business",
      description: "Team moments and group photos from the business-focused hackathon at KUSOM",
      category: "Hackathon",
      year: 2025,
      images: [
        {
          src: "/images/hack-business-team.jpg",
          title: "Team at KUSOM",
          description: "Our team during Hack for Business at Kathmandu University School of Management",
          category: "Hackathon",
          year: 2025,
        },
        {
          src: "/images/hack-business-group.jpg",
          title: "Group Photo",
          description: "Group photo with other participants at Hack for Business",
          category: "Hackathon",
          year: 2025,
        },
      ],
    },
    {
      title: "Hult Prize At Khwopa College of Engineering 2025",
      description: "Presentation moments and certificates from the prestigious Hult Prize competition",
      category: "Competition",
      year: 2025,
      images: [
        {
          src: "/images/hult-prize-presentation.jpg",
          title: "Presentation Moment",
          description: "Presenting our social impact solution at Hult Prize competition",
          category: "Competition",
          year: 2025,
        },
        {
          src: "/images/hult-prize-certificates.jpg",
          title: "Achievement Certificates",
          description: "Certificates received from Hult Prize At Khwopa College of Engineering 2025",
          category: "Achievement",
          year: 2025,
        },
      ],
    },
    {
      title: "Codeyatra 2025",
      description: "Fun moments and achievement badges from the coding journey event",
      category: "Competition",
      year: 2025,
      images: [
        {
          src: "/images/codeyatra-badges.jpg",
          title: "Achievement Badges",
          description: "Collection of badges earned during Codeyatra 2025",
          category: "Achievement",
          year: 2025,
        },
        {
          src: "/images/codeyatra-fun.jpg",
          title: "Fun Moment",
          description: "Enjoying the coding challenges and networking at Codeyatra 2025",
          category: "Competition",
          year: 2025,
        },
      ],
    },
    {
      title: "Hack the Circle",
      description: "Team badges and victory celebration from the 2nd Runner Up achievement",
      category: "Hackathon",
      year: 2024,
      images: [
        {
          src: "/images/hack-circle-badges.jpg",
          title: "Team Badges",
          description: "Clueless Coders team participant badges for Hack the Circle",
          category: "Hackathon",
          year: 2024,
        },
        {
          src: "/images/hack-circle-award.jpg",
          title: "Award Ceremony",
          description: "Celebrating our 2nd Runner Up achievement at Hack the Circle",
          category: "Achievement",
          year: 2024,
        },
      ],
    },
    {
      title: "CHAKRABYUH Robotics Competition",
      description: "Complete journey from robot building to victory celebration",
      category: "Robotics",
      year: 2024,
      images: [
        {
          src: "/images/robotics-certificate.jpg",
          title: "Winner Certificate",
          description: "1st Place certificate from CHAKRABYUH Robotics Competition",
          category: "Achievement",
          year: 2024,
        },
        {
          src: "/images/robotics-robot.jpg",
          title: "Our Robot",
          description: "The maze-following robot we built for the competition",
          category: "Robotics",
          year: 2024,
        },
        {
          src: "/images/robotics-ceremony.jpg",
          title: "Award Ceremony",
          description: "Receiving the 1st place award at the robotics competition",
          category: "Achievement",
          year: 2024,
        },
        {
          src: "/images/robotics-team.jpg",
          title: "Team Celebration",
          description: "Team photo celebrating our robotics competition victory",
          category: "Robotics",
          year: 2024,
        },
      ],
    },
  ]

  const years = [...new Set(galleryData.map((group) => group.year))].sort((a, b) => b - a)
  const filteredGroups = galleryData.filter((group) => group.year === selectedYear)

  const totalImages = galleryData.reduce((total, group) => total + group.images.length, 0)
  const totalEvents = galleryData.length

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "hackathon":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "achievement":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "competition":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "robotics":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "organization":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const openImageModal = (images: GalleryImage[], index: number) => {
    setSelectedImages(images)
    setSelectedImageIndex(index)
    setModalOpen(true)
  }

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-indicator">📸 Gallery</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center font-sans text-foreground">Visual Journey</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-16 leading-relaxed">
            A collection of memorable moments from competitions, hackathons, and achievements. {totalImages} photos
            documenting {totalEvents} events across my tech journey.
          </p>
        </div>

        {/* Year Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-2 bg-card rounded-2xl border shadow-lg">
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "ghost"}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedYear === year
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {year}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Groups */}
        <div className="space-y-16">
          {filteredGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="animate-fade-in">
              {/* Group Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <Badge className={`${getCategoryColor(group.category)} border text-sm px-4 py-2`}>
                    {group.category}
                  </Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{group.title}</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">{group.description}</p>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.images.map((image, imageIndex) => (
                  <Card
                    key={imageIndex}
                    className="group cursor-pointer overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur-sm"
                    onClick={() => openImageModal(group.images, imageIndex)}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Camera className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm font-medium">Click to view</p>
                          </div>
                        </div>
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className={`${getCategoryColor(image.category)} border text-xs`}>
                            {image.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-foreground mb-2 line-clamp-1">{image.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No photos yet</h3>
            <p className="text-muted-foreground">Check back later for photos from {selectedYear}!</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={selectedImages}
        initialIndex={selectedImageIndex}
      />
    </section>
  )
}
