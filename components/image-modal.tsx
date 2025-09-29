"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  src: string
  title: string
  description: string
  category: string
  year: number
}

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: GalleryImage[]
  initialIndex: number
}

export default function ImageModal({ isOpen, onClose, images, initialIndex }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
          break
        case "ArrowRight":
          event.preventDefault()
          setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
          break
        case "Escape":
          event.preventDefault()
          onClose()
          break
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, images.length, onClose])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

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
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex flex-col">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white border-white/20"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white border-white/20"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white border-white/20"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative max-w-5xl max-h-full">
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Image Info */}
          <div className="bg-black/80 backdrop-blur-sm p-6 border-t border-white/10">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentImage.title}</h3>
                  <p className="text-gray-300 text-lg">{currentImage.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getCategoryColor(currentImage.category)} border`}>{currentImage.category}</Badge>
                  <Badge variant="outline" className="text-white border-white/30">
                    {currentImage.year}
                  </Badge>
                </div>
              </div>

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">
                    {currentIndex + 1} of {images.length}
                  </p>

                  {/* Thumbnail Navigation */}
                  <div className="flex gap-2 overflow-x-auto max-w-md">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                          index === currentIndex ? "border-white shadow-lg" : "border-white/30 hover:border-white/60"
                        }`}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
