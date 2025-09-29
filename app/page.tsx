"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Organizations from "@/components/organizations"
import Competitions from "@/components/competitions"
import Contact from "@/components/contact"
import CircularNavigation from "@/components/circular-navigation"
import Gallery from "@/components/gallery"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  const sections = {
    home: <Hero />,
    about: <About />,
    clubs: <Organizations />,
    competitions: <Competitions />,
    projects: <Projects />,
    gallery: <Gallery />,
    contact: <Contact />,
  }

  return (
    <div className="relative overflow-hidden">
      {/* Circular Navigation */}
      <CircularNavigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content with Transitions */}
      <div className="transition-all duration-1000 ease-in-out transform">
        {sections[activeSection as keyof typeof sections]}
      </div>
    </div>
  )
}
