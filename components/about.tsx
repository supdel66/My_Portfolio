import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Database } from "lucide-react"

const skills = [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "Machine Learning",
    description: "Working with Python, NumPy, PyTorch, and scikit-learn.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "Web Development",
    description: "Familiarity with React, Next.js, HTML, CSS, and JavaScript.",
  },
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    title: "Backend",
    description: "Attained knowledge of Supabase and Flask, did basic Node.js.",
  },
]

export default function About() {
  return (
    <section id="about" className="section-about section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="section-indicator mx-auto text-center">🚀 My Journey</div>
        <h2 className="about-heading">About Me</h2>
        <p className="section-subtitle">Get to know more about me and my journey in the tech world</p>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-2/5 animate-fade-in">
            <div className="image-frame relative w-full h-[400px] overflow-hidden">
              <Image
                src="/images/profile2.png"
                alt="Supriya"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          <div className="w-full md:w-3/5 space-y-6 animate-slide-up">
            <h3 className="text-2xl font-bold font-poppins text-foreground">My Tech Journey</h3>
            <p className="text-foreground">
              Hello! I'm Supriya, a growing person in tech who started with web dev but then found comfort in the
              machine learning models.
            </p>
            <p className="text-foreground">
              My background in web development has given me a solid foundation in creating user-friendly interfaces,
              while my growing expertise in machine learning allows me to work on data-driven solutions that make a real
              impact.
            </p>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <Card key={index} className="card-hover" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div
                      className="mb-4 p-3 bg-primary/10 rounded-full animate-pulse-slow"
                      style={{ animationDelay: `${index * 0.3}s` }}
                    >
                      {skill.icon}
                    </div>
                    <h4 className="font-medium mb-2 text-foreground">{skill.title}</h4>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
