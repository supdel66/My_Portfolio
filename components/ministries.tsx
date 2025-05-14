import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Award, Users, BookOpen, MapPin, Rocket, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const organizations = [
  {
    title: "Student Quality Circle KHCE",
    description: "Work for improving quality, organizing events and representing students in programs at Khwopa College of Engineering, Libali, Bhaktapur.",
    icon: <Users className="h-10 w-10 text-primary" />,
    period: "April 2025 - Present",
  },
  {
    title: "Leo Club",
    description: "Attained the  Lions International Leo Lion batch.",
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    period: "2022 - 2023",
  },
]

const hackathons = [
  {
    title: "Bhaktpur Navigator Hackathon",
    description:
      "Created a Bhaktpur Navigator where users could select a radius and view temples and food places within that area. The app showed the shortest path between selected locations and included a real-time blogspot for everyone.",
    icon: <MapPin className="h-10 w-10 text-primary" />,
    period: "December 6-8, 2024",
    achievement: "2nd Runner Up",
    links: [],
  },
  {
    title: "WebCraft Business Website Builder",
    description:
      "Developed a website builder for businesses with a simple form-filling interface that generates custom websites based on user inputs.",
    icon: <Rocket className="h-10 w-10 text-primary" />,
    period: "February 9-11, 2025",
    achievement: "Participant",
    links: [
      { label: "Live Demo", url: "https://rover-theta.vercel.app" },
      { label: "Project Details", url: "https://devpost.com/software/webcraft-jnbzld" },
    ],
  },
  {
    title: "Hult Prize Competition",
    description:
      "Finalist at Hult Prize Khwopa College of Engineering competition. Proposed a bus system with automated sensors and purifiers for air health improvement in urban environments.",
    icon: <Award className="h-10 w-10 text-primary" />,
    period: "2024",
    achievement: "Finalist",
    links: [],
  },
]

export default function Ministries() {
  return (
    <section id="ministries" className="section-ministries section-padding relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-40 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1.8s" }}
      ></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="section-indicator mx-auto text-center">🤝 Community Involvement</div>
        <h2 className="ministries-heading">Clubs & Organizations</h2>
        <p className="section-subtitle">Organizations and initiatives I've been involved with</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organizations.map((org, index) => (
            <Card
              key={index}
              className="card-hover animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-2">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">{org.icon}</div>
                <CardTitle className="text-foreground">{org.title}</CardTitle>
                <span className="text-sm text-muted-foreground">{org.period}</span>
              </CardHeader>
              <CardContent>
                <CardDescription>{org.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="section-indicator mx-auto text-center mt-16">🏆 Competitions & Events</div>
        <h2 className="ministries-heading">Hackathons & Events</h2>
        <p className="section-subtitle">Competitions and tech events I've participated in</p>

        <div className="grid grid-cols-1 gap-6">
          {hackathons.map((hackathon, index) => (
            <Card
              key={index}
              className="card-hover animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="relative">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">{hackathon.icon}</div>
                  <div>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      {hackathon.title}
                      {hackathon.achievement && <span className="achievement-badge">{hackathon.achievement}</span>}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{hackathon.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{hackathon.description}</p>
              </CardContent>
              {hackathon.links.length > 0 && (
                <CardFooter className="flex gap-2">
                  {hackathon.links.map((link, linkIndex) => {
                    // Determine if this is a "Live Demo" or "Code" link
                    const isLiveDemo = link.label.includes("Demo")
                    return (
                      <Button
                        key={linkIndex}
                        size="sm"
                        variant={isLiveDemo ? "default" : "outline"}
                        asChild
                        className="button-glow"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {isLiveDemo ? (
                            <>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </>
                          ) : (
                            <>
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </>
                          )}
                        </a>
                      </Button>
                    )
                  })}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
