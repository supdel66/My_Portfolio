"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
      case "hackathon": return "bg-blue-500/15 text-blue-400 border-blue-500/25"
      case "achievement": return "bg-orange-500/15 text-orange-400 border-orange-500/25"
      case "competition": return "bg-purple-500/15 text-purple-400 border-purple-500/25"
      case "robotics": return "bg-green-500/15 text-green-400 border-green-500/25"
      case "organization": return "bg-pink-500/15 text-pink-400 border-pink-500/25"
      default: return "bg-white/5 text-white/50 border-white/10"
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-xl text-white/50 hover:text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-xl text-white/70 hover:text-white transition-all"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-xl text-white/70 hover:text-white transition-all"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center p-8 relative" onClick={(e) => e.stopPropagation()}>
        <div className="relative max-w-5xl max-h-full">
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.title}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain rounded-xl"
            priority
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>

      {/* Image Info */}
      <div
        className="relative p-6"
        style={{
          background: "rgba(10,10,15,0.9)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-bold text-white/90 mb-1">{currentImage.title}</h3>
              <p className="text-white/45 text-sm">{currentImage.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`${getCategoryColor(currentImage.category)} border text-xs px-2.5 py-0.5 rounded-full font-medium`}>
                {currentImage.category}
              </span>
              <span className="glass-badge">{currentImage.year}</span>
            </div>
          </div>

          {/* Thumbnails + counter */}
          {images.length > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-white/30 text-sm">
                {currentIndex + 1} of {images.length}
              </p>
              <div className="flex gap-2 overflow-x-auto max-w-md">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all ${index === currentIndex
                        ? "ring-2 ring-pink-400 opacity-100"
                        : "opacity-40 hover:opacity-70"
                      }`}
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
