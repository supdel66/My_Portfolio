import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Award, Users, BookOpen, Code, MapPin, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

const ministries = [
  {
    title: "Tech Community Volunteer",
    description: "Helping organize local tech meetups and workshops for beginners.",
    icon: <Users className="h-10 w-10 text-primary" />,
    period: "2022 - Present",
  },
  {
    title: "Youth Mentorship Program",
    description: "Mentoring high school students interested in pursuing careers in technology.",
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    period: "2021 - Present",
  },
  {
    title: "Digital Literacy Initiative",
    description: "Teaching basic computer skills to underserved communities.",
    icon: <Code className="h-10 w-10 text-primary" />,
    period: "2020 - 2022",
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
    description: "Finalist at Hult Khwopa College of Engineering competition.",
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
      <div className="circle-decoration circle-1 animate-rotate" style={{ animationDuration: "28s" }}></div>
      <div
        className="circle-decoration circle-2 animate-rotate"
        style={{ animationDuration: "32s", animationDirection: "reverse" }}
      ></div>

      <div className="absolute top-40 left-40 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1.8s" }}
      ></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="inline-block p-2 px-4 bg-purple-500/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 mx-auto text-center">
          🤝 Community Involvement
        </div>
        <h2 className="section-title gradient-text-blue">Ministries & Organizations</h2>
        <p className="section-subtitle">Organizations and initiatives I've been involved with</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => (
            <Card
              key={index}
              className="card-hover animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 z-0"></div>
              <CardHeader className="pb-2 relative z-10">
                <div className="mb-4 p-3 bg-purple-500/10 rounded-full">{ministry.icon}</div>
                <CardTitle>{ministry.title}</CardTitle>
                <span className="text-sm text-muted-foreground">{ministry.period}</span>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription>{ministry.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="inline-block p-2 px-4 bg-blue-500/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 mx-auto text-center mt-16">
          🏆 Competitions & Events
        </div>
        <h2 className="section-title gradient-text-blue">Hackathons & Events</h2>
        <p className="section-subtitle">Competitions and tech events I've participated in</p>

        <div className="grid grid-cols-1 gap-6">
          {hackathons.map((hackathon, index) => (
            <Card
              key={index}
              className="card-hover animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 z-0"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-full">{hackathon.icon}</div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {hackathon.title}
                      {hackathon.achievement && (
                        <span className="text-xs font-normal px-2 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full">
                          {hackathon.achievement}
                        </span>
                      )}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">{hackathon.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-muted-foreground">{hackathon.description}</p>
              </CardContent>
              {hackathon.links.length > 0 && (
                <CardFooter className="flex gap-2 relative z-10">
                  {hackathon.links.map((link, linkIndex) => (
                    <Button key={linkIndex} size="sm" variant="outline" asChild className="button-glow">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div className="section-divider mt-16"></div>
    </section>
  )
}
