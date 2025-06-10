import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="section-hero pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="hero-name">Supriya Poudel</h1>
            <div className="section-indicator">✨ Welcome to my digital space</div>

            <p className="text-lg text-foreground max-w-md">
              Whether I'm solving a classification problem or debugging a front-end glitch, I remind myself that it all
              comes down to the same thing: 0s and 1s, waiting to be shaped into something meaningful.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="rounded-full button-glow hover-scale">
                <a href="#about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center animate-slide-in-right">
            <div className="profile-image w-64 h-64 md:w-80 md:h-80 animate-float relative">
              <Image
                src="/images/profile1.png"
                alt="Supriya Poudel"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
