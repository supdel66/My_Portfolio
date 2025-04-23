import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, BookOpen } from "lucide-react"

const skills = [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "Machine Learning",
    description: "Just started learning Python and ML basics. Excited to explore this field further!",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "Web Development",
    description: "Have some experience with HTML, CSS, and JavaScript for building simple websites.",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Data Science",
    description: "Recently started exploring data analysis and visualization techniques.",
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
        <h2 className="section-title">About Me</h2>
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
            <h3 className="text-2xl font-bold font-poppins">Tech Newbie with a Passion for Machine Learning</h3>
            <p className="text-muted-foreground">
              Hello! I'm Supriya, a tech enthusiast who has recently developed a strong interest in machine learning and
              data science. I'm at the beginning of my journey in this exciting field and eager to learn more every day.
            </p>
            <p className="text-muted-foreground">
              Before diving into data science, I spent some time exploring web development, which gave me a solid
              foundation in programming concepts. Now, I'm focusing on building my skills in machine learning and data
              analysis, starting with small projects and gradually taking on more complex challenges.
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
                    <h4 className="font-medium mb-2">{skill.title}</h4>
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
