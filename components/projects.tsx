import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Database, Code, Utensils } from "lucide-react"

const projects = [
  {
    title: "Customer Churn Prediction",
    description:
      "A machine learning model that predicts customer churn based on historical data for subscription-based services.",
    tags: ["Python", "Scikit-learn", "Data Analysis", "Machine Learning"],
    github: "https://github.com/supdel66/Customer-Churn-Prediction",
    demo: "#",
    icon: <Database className="h-10 w-10 text-primary/60" />,
  },
  {
    title: "Recipe Finder",
    description:
      "Web application that helps users find recipes based on available ingredients and dietary preferences.",
    tags: ["JavaScript", "API", "CSS", "HTML"],
    github: "https://github.com/supdel66/Recipe-Finder",
    demo: "#",
    icon: <Utensils className="h-10 w-10 text-primary/60" />,
  },
  {
    title: "Mini JS Projects",
    description: "Collection of small JavaScript projects showcasing various web development concepts and techniques.",
    tags: ["JavaScript", "HTML", "CSS", "DOM Manipulation"],
    github: "https://github.com/supdel66/js_projects",
    demo: "#",
    icon: <Code className="h-10 w-10 text-primary/60" />,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-projects section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="circle-decoration circle-1 animate-rotate" style={{ animationDuration: "35s" }}></div>
      <div
        className="circle-decoration circle-2 animate-rotate"
        style={{ animationDuration: "40s", animationDirection: "reverse" }}
      ></div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-40 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1.2s" }}
      ></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="inline-block p-2 px-4 bg-rose-500/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 mx-auto text-center">
          💻 My Work
        </div>
        <h2 className="section-title gradient-text">My Projects</h2>
        <p className="section-subtitle">Here are some of the projects I've been working on during my tech journey</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="card-hover animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-amber-500/5 z-0"></div>
              <CardHeader className="flex flex-row items-start space-x-4 relative z-10">
                <div className="p-3 rounded-full bg-rose-500/10">{project.icon}</div>
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 relative z-10">
                <Button variant="outline" size="sm" asChild className="button-glow">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button size="sm" asChild className="button-glow">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="section-divider mt-16"></div>
    </section>
  )
}
