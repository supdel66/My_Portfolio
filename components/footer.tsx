import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-gradient py-8 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold font-poppins gradient-text">
              Supriya
            </Link>
            <p className="text-sm text-muted-foreground mt-1">Tech Enthusiast & Newbie Developer</p>
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
              Ministries
            </Link>
            <Link href="#contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="border-t border-border mt-6 pt-6 text-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Supriya. All rights reserved.</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center mt-2">
            Made with <Heart className="h-4 w-4 text-primary mx-1 animate-pulse-slow" /> by Supriya
          </p>
        </div>
      </div>
    </footer>
  )
}
