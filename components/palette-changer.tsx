"use client"

import { useState, useRef, useEffect } from "react"
import { Palette, Upload, X, Loader2, RotateCcw } from "lucide-react"

// ===================== Color Utilities =====================

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace("#", "")
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360 * 10) / 10,
    s: Math.round(s * 100 * 10) / 10,
    l: Math.round(l * 100 * 10) / 10,
  }
}

function getLuminance(hex: string): number {
  hex = hex.replace("#", "")
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function getSaturation(hex: string): number {
  return hexToHSL(hex).s
}

function hsl(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`
}

function hexToRGB(hex: string): { r: number; g: number; b: number } {
  hex = hex.replace("#", "")
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  }
}

// Hue distance on the circular 0-360 scale
function hueDist(h1: number, h2: number): number {
  const d = Math.abs(h1 - h2)
  return Math.min(d, 360 - d)
}

// Pick 3 maximally-diverse colors by hue from the palette
function pickDiverseColors(hexColors: string[]): [string, string, string] {
  const hsls = hexColors.map((h) => ({ hex: h, ...hexToHSL(h), lum: getLuminance(h) }))

  // 1) Primary = most saturated color with reasonable luminance (not too dark/light)
  const candidates = hsls
    .filter((c) => c.lum > 0.1 && c.lum < 0.85)
    .sort((a, b) => b.s - a.s)
  const primary = candidates.length > 0 ? candidates[0] : hsls.sort((a, b) => b.s - a.s)[0]

  // 2) Accent = most different hue from primary (excluding primary)
  const rest = hsls.filter((c) => c.hex !== primary.hex)
  const accent = rest.sort((a, b) => {
    const distA = hueDist(a.h, primary.h) + a.s * 0.3
    const distB = hueDist(b.h, primary.h) + b.s * 0.3
    return distB - distA
  })[0]

  // 3) Third = most different from BOTH primary and accent
  const rest2 = rest.filter((c) => c.hex !== accent.hex)
  const third = rest2.sort((a, b) => {
    const scoreA = Math.min(hueDist(a.h, primary.h), hueDist(a.h, accent.h)) + a.s * 0.2
    const scoreB = Math.min(hueDist(b.h, primary.h), hueDist(b.h, accent.h)) + b.s * 0.2
    return scoreB - scoreA
  })[0] || primary

  return [primary.hex, accent.hex, third.hex]
}

// Build full CSS override for both light and dark modes from 6 palette colors
function buildThemeCSS(hexColors: string[]): string {
  // Sort by luminance: c[0]=darkest ... c[5]=lightest
  const sorted = [...hexColors].sort((a, b) => getLuminance(a) - getLuminance(b))
  const c = sorted.map(hexToHSL)

  // Pick 3 maximally diverse colors by hue
  const [primaryHex, accentHex, thirdHex] = pickDiverseColors(hexColors)

  const primary = hexToHSL(primaryHex)
  const accent = hexToHSL(accentHex)
  const third = hexToHSL(thirdHex)

  // All 6 palette colors as RGB for varied use
  const allRGB = hexColors.map(hexToRGB)
  const primaryRGB = hexToRGB(primaryHex)
  const accentRGB = hexToRGB(accentHex)
  const thirdRGB = hexToRGB(thirdHex)

  // Remaining 3 colors not already picked
  const remaining = hexColors
    .filter((h) => h !== primaryHex && h !== accentHex && h !== thirdHex)
    .map(hexToRGB)
  const c4RGB = remaining[0] || primaryRGB
  const c5RGB = remaining[1] || accentRGB
  const c6RGB = remaining[2] || thirdRGB

  const primaryFgL = primary.l > 55 ? 5 : 98
  const primaryL = Math.max(Math.min(primary.l, 55), 30)
  const accentL = Math.max(Math.min(accent.l, 55), 30)
  const thirdL = Math.max(Math.min(third.l, 55), 30)

  const rgb = (c: { r: number; g: number; b: number }) => `${c.r}, ${c.g}, ${c.b}`

  return `
    :root {
      --background: ${hsl(c[5].h, Math.min(c[5].s, 30), 97)};
      --foreground: ${hsl(c[0].h, Math.min(c[0].s, 20), 8)};
      --card: ${hsl(c[4].h, Math.min(c[4].s, 25), 96)};
      --card-foreground: ${hsl(c[0].h, Math.min(c[0].s, 20), 8)};
      --popover: ${hsl(c[4].h, Math.min(c[4].s, 25), 96)};
      --popover-foreground: ${hsl(c[0].h, Math.min(c[0].s, 20), 8)};
      --primary: ${hsl(primary.h, Math.max(primary.s, 50), primaryL)};
      --primary-foreground: ${hsl(primary.h, 100, primaryFgL)};
      --secondary: ${hsl(accent.h, Math.max(Math.min(accent.s, 50), 20), 90)};
      --secondary-foreground: ${hsl(c[0].h, Math.min(c[0].s, 15), 12)};
      --muted: ${hsl(third.h, Math.min(third.s, 20), 92)};
      --muted-foreground: ${hsl(c[2].h, Math.min(c[2].s, 30), 40)};
      --accent: ${hsl(accent.h, Math.max(Math.min(accent.s, 40), 18), 89)};
      --accent-foreground: ${hsl(c[0].h, Math.min(c[0].s, 15), 12)};
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 0 0% 98%;
      --border: ${hsl(third.h, Math.min(third.s, 18), 85)};
      --input: ${hsl(third.h, Math.min(third.s, 18), 85)};
      --ring: ${hsl(accent.h, Math.max(accent.s, 50), accentL)};
      --theme-primary: ${rgb(primaryRGB)};
      --theme-accent: ${rgb(accentRGB)};
      --theme-secondary: ${rgb(thirdRGB)};
    }
    .dark {
      --background: ${hsl(c[0].h, Math.min(c[0].s, 25), 5)};
      --foreground: ${hsl(c[5].h, Math.min(c[5].s, 15), 96)};
      --card: ${hsl(c[1].h, Math.min(c[1].s, 20), 8)};
      --card-foreground: ${hsl(c[5].h, Math.min(c[5].s, 15), 96)};
      --popover: ${hsl(c[1].h, Math.min(c[1].s, 20), 8)};
      --popover-foreground: ${hsl(c[5].h, Math.min(c[5].s, 15), 96)};
      --primary: ${hsl(primary.h, Math.max(primary.s, 50), primaryL)};
      --primary-foreground: ${hsl(primary.h, 100, primaryFgL)};
      --secondary: ${hsl(accent.h, Math.min(accent.s, 25), 15)};
      --secondary-foreground: ${hsl(c[5].h, Math.min(c[5].s, 15), 96)};
      --muted: ${hsl(third.h, Math.min(third.s, 15), 16)};
      --muted-foreground: ${hsl(c[3].h, Math.min(c[3].s, 20), 62)};
      --accent: ${hsl(accent.h, Math.min(accent.s, 25), 15)};
      --accent-foreground: ${hsl(c[5].h, Math.min(c[5].s, 15), 96)};
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 0 0% 98%;
      --border: ${hsl(c[2].h, Math.min(c[2].s, 15), 18)};
      --input: ${hsl(c[2].h, Math.min(c[2].s, 15), 18)};
      --ring: ${hsl(accent.h, Math.max(accent.s, 50), accentL)};
      --theme-primary: ${rgb(primaryRGB)};
      --theme-accent: ${rgb(accentRGB)};
      --theme-secondary: ${rgb(thirdRGB)};
    }

    /* ===== Gradient text — uses all 3 diverse colors ===== */
    .gradient-text {
      background: linear-gradient(to right, rgb(${rgb(primaryRGB)}), rgb(${rgb(accentRGB)}), rgb(${rgb(thirdRGB)})) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-size: 300% 300% !important;
    }

    /* ===== Section headings — primary to accent gradient ===== */
    .about-heading, .projects-heading, .ministries-heading, .contact-heading {
      background: linear-gradient(135deg, rgb(${rgb(primaryRGB)}), rgb(${rgb(accentRGB)})) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-size: 200% 200% !important;
    }

    /* ===== Gradient text variants ===== */
    .gradient-text-blue {
      background: linear-gradient(to right, rgb(${rgb(accentRGB)}), rgb(${rgb(thirdRGB)}), rgb(${rgb(primaryRGB)})) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-size: 300% 300% !important;
    }
    .gradient-text-green {
      background: linear-gradient(to right, rgb(${rgb(thirdRGB)}), rgb(${rgb(primaryRGB)}), rgb(${rgb(accentRGB)})) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-size: 300% 300% !important;
    }

    /* ===== Card tints — use accent color for visible difference ===== */
    .card {
      background: rgba(${rgb(accentRGB)}, 0.04) !important;
      border-color: rgba(${rgb(primaryRGB)}, 0.12) !important;
    }
    .dark .card {
      background: rgba(${rgb(accentRGB)}, 0.07) !important;
      border-color: rgba(${rgb(primaryRGB)}, 0.15) !important;
    }

    /* ===== Navbar glass — accent tint ===== */
    .navbar-glass {
      border-bottom-color: rgba(${rgb(accentRGB)}, 0.15) !important;
    }
    .dark .navbar-glass {
      border-bottom-color: rgba(${rgb(accentRGB)}, 0.2) !important;
    }

    /* ===== Text color overrides — spread 3 colors ===== */
    .text-primary { color: hsl(${primary.h}, ${Math.max(primary.s, 50)}%, ${primaryL}%) !important; }
    .text-pink-400, .text-pink-500 { color: rgb(${rgb(primaryRGB)}) !important; }
    .text-purple-400, .text-purple-500 { color: rgb(${rgb(accentRGB)}) !important; }
    .text-rose-400, .text-rose-500 { color: rgb(${rgb(thirdRGB)}) !important; }
    .text-blue-400, .text-blue-500 { color: rgb(${rgb(accentRGB)}) !important; }
    .text-cyan-400, .text-cyan-500 { color: rgb(${rgb(thirdRGB)}) !important; }
    .text-yellow-400 { color: rgb(${rgb(thirdRGB)}) !important; }

    /* ===== Background solid overrides — each gets a different color ===== */
    .bg-primary { background-color: hsl(${primary.h}, ${Math.max(primary.s, 50)}%, ${primaryL}%) !important; }
    .bg-pink-500 { background-color: rgb(${rgb(primaryRGB)}) !important; }
    .bg-purple-500 { background-color: rgb(${rgb(accentRGB)}) !important; }

    /* ===== Gradient from/to — spread all 3 colors ===== */
    .from-primary { --tw-gradient-from: hsl(${primary.h}, ${Math.max(primary.s, 50)}%, ${primaryL}%) !important; }
    .to-primary { --tw-gradient-to: hsl(${accent.h}, ${Math.max(accent.s, 50)}%, ${accentL}%) !important; }
    .from-pink-500 { --tw-gradient-from: rgb(${rgb(primaryRGB)}) !important; }
    .to-pink-500 { --tw-gradient-to: rgb(${rgb(accentRGB)}) !important; }
    .via-purple-500 { --tw-gradient-stops: var(--tw-gradient-from), rgb(${rgb(thirdRGB)}), var(--tw-gradient-to) !important; }
    .from-purple-500\\/20 { --tw-gradient-from: rgba(${rgb(accentRGB)}, 0.2) !important; }
    .to-pink-500\\/20 { --tw-gradient-to: rgba(${rgb(primaryRGB)}, 0.2) !important; }

    /* ===== Border overrides — mix primary & accent ===== */
    .border-primary\\/20 { border-color: rgba(${rgb(primaryRGB)}, 0.2) !important; }
    .border-primary\\/30 { border-color: rgba(${rgb(primaryRGB)}, 0.3) !important; }
    .border-primary\\/50 { border-color: rgba(${rgb(primaryRGB)}, 0.5) !important; }
    .border-pink-500\\/30 { border-color: rgba(${rgb(accentRGB)}, 0.3) !important; }
    .border-purple-500\\/30 { border-color: rgba(${rgb(thirdRGB)}, 0.3) !important; }

    /* ===== Background opacity — alternate between primary & accent ===== */
    .bg-primary\\/5 { background-color: rgba(${rgb(primaryRGB)}, 0.05) !important; }
    .bg-primary\\/10 { background-color: rgba(${rgb(primaryRGB)}, 0.1) !important; }
    .bg-primary\\/20 { background-color: rgba(${rgb(primaryRGB)}, 0.2) !important; }
    .bg-primary\\/30 { background-color: rgba(${rgb(accentRGB)}, 0.3) !important; }
    .bg-pink-500\\/20 { background-color: rgba(${rgb(accentRGB)}, 0.2) !important; }
    .bg-purple-500\\/20 { background-color: rgba(${rgb(thirdRGB)}, 0.2) !important; }

    /* ===== Shadow overrides — use accent for contrast ===== */
    .shadow-primary\\/30 { --tw-shadow-color: rgba(${rgb(accentRGB)}, 0.3) !important; }
    .hover\\:shadow-primary\\/30:hover { --tw-shadow-color: rgba(${rgb(primaryRGB)}, 0.3) !important; }

    /* ===== Ring ===== */
    .ring-primary\\/20 { --tw-ring-color: rgba(${rgb(accentRGB)}, 0.2) !important; }

    /* ===== Hero highlight card borders — each card gets a DIFFERENT color ===== */
    .border-blue-500\\/30 { border-color: rgba(${rgb(primaryRGB)}, 0.35) !important; }
    .border-purple-500\\/30 { border-color: rgba(${rgb(accentRGB)}, 0.35) !important; }
    .border-yellow-500\\/30 { border-color: rgba(${rgb(thirdRGB)}, 0.35) !important; }
    .border-green-500\\/30 { border-color: rgba(${rgb(c4RGB)}, 0.35) !important; }

    /* ===== Hero highlight card gradients — each card gets a DIFFERENT pair ===== */
    .from-blue-500\\/20 { --tw-gradient-from: rgba(${rgb(primaryRGB)}, 0.2) !important; }
    .to-cyan-500\\/20 { --tw-gradient-to: rgba(${rgb(accentRGB)}, 0.15) !important; }
    .from-purple-500\\/20 { --tw-gradient-from: rgba(${rgb(accentRGB)}, 0.2) !important; }
    .to-pink-500\\/20 { --tw-gradient-to: rgba(${rgb(thirdRGB)}, 0.15) !important; }
    .from-yellow-500\\/20 { --tw-gradient-from: rgba(${rgb(thirdRGB)}, 0.2) !important; }
    .to-orange-500\\/20 { --tw-gradient-to: rgba(${rgb(c4RGB)}, 0.15) !important; }
    .from-green-500\\/20 { --tw-gradient-from: rgba(${rgb(c4RGB)}, 0.2) !important; }
    .to-emerald-500\\/20 { --tw-gradient-to: rgba(${rgb(c5RGB)}, 0.15) !important; }

    /* ===== Focus ring ===== */
    *:focus-visible {
      outline-color: rgb(${rgb(accentRGB)}) !important;
    }

    /* ===== Selection ===== */
    ::selection {
      background: rgba(${rgb(accentRGB)}, 0.35) !important;
    }
  `
}

function injectPaletteCSS(css: string) {
  let el = document.getElementById("custom-palette-style")
  if (!el) {
    el = document.createElement("style")
    el.id = "custom-palette-style"
    document.head.appendChild(el)
  }
  el.textContent = css
}

function removePaletteCSS() {
  const el = document.getElementById("custom-palette-style")
  if (el) el.remove()
}

// ===================== Component =====================

export default function PaletteChanger() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [palette, setPalette] = useState<string[] | null>(null)
  const [isApplied, setIsApplied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectedFileRef = useRef<File | null>(null)

  // Auto-hide tooltip after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  // Restore palette from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("customPalette")
    if (saved) {
      try {
        const colors: string[] = JSON.parse(saved)
        setPalette(colors)
        setIsApplied(true)
        injectPaletteCSS(buildThemeCSS(colors))
      } catch {
        // ignore
      }
    }
  }, [])

  const handleFileSelect = (file: File) => {
    selectedFileRef.current = file
    setPreviewUrl(URL.createObjectURL(file))
    setPalette(null)
    setError(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file)
    }
  }

  const generatePalette = async () => {
    if (!selectedFileRef.current) return

    setIsLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append("image", selectedFileRef.current)
      formData.append("num_colors", "6")

      const res = await fetch("/api/palette", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to generate palette")

      const data = await res.json()
      if (data.palette && Array.isArray(data.palette)) {
        setPalette(data.palette)
      } else {
        throw new Error("Invalid response")
      }
    } catch {
      setError("Failed to generate palette. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const applyPalette = () => {
    if (!palette) return
    const css = buildThemeCSS(palette)
    injectPaletteCSS(css)
    sessionStorage.setItem("customPalette", JSON.stringify(palette))
    setIsApplied(true)
    setIsModalOpen(false)
  }

  const resetPalette = () => {
    removePaletteCSS()
    sessionStorage.removeItem("customPalette")
    setPalette(null)
    setIsApplied(false)
    setPreviewUrl(null)
    selectedFileRef.current = null
  }

  return (
    <>
      {/* ====== Floating Button (Top Right) ====== */}
      <button
        onClick={() => {
          setShowTooltip(false)
          setIsModalOpen(true)
        }}
        className="fixed top-20 right-6 z-50 group"
        title="Change Color Theme"
      >
        <div className="relative">
          {/* Click me tooltip */}
          {showTooltip && (
            <div className="absolute -left-44 top-1/2 -translate-y-1/2 animate-bounce">
              
            </div>
          )}
          
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl ${
              isApplied
                ? "bg-gradient-to-br from-primary to-pink-500"
                : "bg-card/90 backdrop-blur-md border-2 border-primary/30"
            }`}
          >
            <Palette
              className={`w-5 h-5 transition-colors ${
                isApplied ? "text-white" : "text-primary"
              }`}
            />
          </div>

          {/* Hover label */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-card/95 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-primary/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none">
            🎨 Change Palette
          </span>

          {/* Attention pulse when not yet applied */}
          {!isApplied && (
            <div className="absolute inset-0 border-2 border-primary/40 rounded-full animate-ping" />
          )}
        </div>
      </button>

      {/* ====== Modal ====== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-md">
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl opacity-50 animate-pulse" />

            <div className="relative bg-card/95 backdrop-blur-xl border-2 border-primary/30 rounded-3xl p-8 shadow-2xl">
              {/* Close */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/50 flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative dots */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full animate-bounce" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-500 rounded-full animate-pulse" />

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-ping" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center mb-2 gradient-text">
                Custom Theme 🎨
              </h2>
              <p className="text-center text-muted-foreground mb-6 text-sm">
                Upload an image and I&apos;ll generate a beautiful color palette for your theme!
              </p>

              {/* Upload Area */}
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative mb-5 border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 group overflow-hidden ${
                  isDragging
                    ? "border-primary bg-primary/10 scale-[1.02]"
                    : "border-primary/30 hover:border-primary/60"
                }`}
              >
                {previewUrl ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium">
                        Click to change image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Drag &amp; drop an image here
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      or click to browse
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileSelect(file)
                  }}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">
                  {error}
                </p>
              )}

              {/* Generate Button (show when image uploaded but no palette yet) */}
              {previewUrl && !palette && (
                <button
                  onClick={generatePalette}
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary to-pink-500 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-4 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating palette...
                    </>
                  ) : (
                    "Generate Palette ✨"
                  )}
                </button>
              )}

              {/* Palette Preview + Actions */}
              {palette && (
                <div className="mb-2">
                  <p className="text-sm text-muted-foreground text-center mb-3">
                    Your Generated Palette
                  </p>

                  {/* Color Swatches */}
                  <div className="flex gap-2.5 justify-center mb-6">
                    {palette.map((color, i) => (
                      <div key={i} className="group/swatch relative">
                        <div
                          className="w-11 h-11 rounded-xl shadow-md border-2 border-white/20 hover:scale-125 transition-all duration-300 cursor-pointer"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover/swatch:opacity-100 transition-opacity whitespace-nowrap font-mono">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Apply / Retry Buttons */}
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={applyPalette}
                      className="flex-1 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary to-pink-500 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                      Apply Theme 🚀
                    </button>
                    <button
                      onClick={() => {
                        setPalette(null)
                        setPreviewUrl(null)
                        selectedFileRef.current = null
                      }}
                      className="px-5 py-3.5 rounded-2xl font-semibold border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Reset to default (only shown when a palette is currently applied) */}
              {isApplied && (
                <button
                  onClick={() => {
                    resetPalette()
                    setIsModalOpen(false)
                  }}
                  className="w-full mt-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center justify-center gap-2 rounded-xl hover:bg-muted/50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to default theme
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
