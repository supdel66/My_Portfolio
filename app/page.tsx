import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Ministries from "@/components/ministries"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <About />
      <Projects />
      <Ministries />
      <Contact />
    </div>
  )
}
