import Link from "next/link"
import { Heart } from "lucide-react"
import Script from "next/script"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Supriya Poudel",
    url: "https://supriyapoudel.com.np",
    image: "https://supriyapoudel.com.np/images/profile1.png",
    sameAs: [
      "https://www.linkedin.com/in/supriya-poudel-38ba13347/",
      "https://github.com/supdel66",
      "https://www.instagram.com/supriya.6.poudel/",
    ],
    jobTitle: "Tech Enthusiast",
    worksFor: {
      "@type": "Organization",
      name: "Self",
    },
    description: "Based in Kathmandu, Nepal, with interests in machine learning and web development.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "Nepal",
    },
  }

  return (
    <footer className="footer-gradient py-8 relative overflow-hidden">
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold font-poppins gradient-text">
              Supriya Poudel
            </Link>
            <p className="text-sm text-muted-foreground mt-1">Kathmandu, Nepal</p>
          </div>

          <nav className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link href="#home" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-sm hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#ministries" className="text-sm hover:text-primary transition-colors">
              Clubs & Organizations
            </Link>
            <Link href="#contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="border-t border-border mt-6 pt-6 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Supriya Poudel. All rights reserved.</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center mt-2">
            Made with <Heart className="h-4 w-4 text-primary mx-1 animate-pulse-slow" /> by Supriya Poudel
          </p>
        </div>
      </div>
    </footer>
  )
}
