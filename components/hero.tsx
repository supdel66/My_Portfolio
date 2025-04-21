import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container px-4 mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins">
              Hiies, I'm <span className="gradient-text">Supriya</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">Tech Newbie & ML Enthusiast</h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Welcome to my portfolio! I'm a beginner exploring the exciting world of machine learning and data science,
              documenting my journey as I learn and grow in this field.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="rounded-full animate-glow hover-scale">
                <a href="#about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center animate-slide-in-right">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl animate-float warm-glow">
              <Image src="/images/profile1.png" alt="Supriya" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
