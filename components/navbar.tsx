"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "navbar-glass py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="text-xl font-bold font-poppins gradient-text">
            Supriya
          </Link>
          <div className="flex items-center">
            <Link href="/visitors" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Visitors Globe
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
