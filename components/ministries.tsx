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
    <section id="ministries" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <h2 className="section-title">Ministries & Organizations</h2>
        <p className="section-subtitle">Organizations and initiatives I've been involved with</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => (
            <Card
              key={index}
              className="card-hover animate-slide-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <CardHeader className="pb-2">
                <div className="mb-4">{ministry.icon}</div>
                <CardTitle>{ministry.title}</CardTitle>
                <span className="text-sm text-muted-foreground">{ministry.period}</span>
              </CardHeader>
              <CardContent>
                <CardDescription>{ministry.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="section-title mt-16">Hackathons & Events</h2>
        <p className="section-subtitle">Competitions and tech events I've participated in</p>

        <div className="grid grid-cols-1 gap-6">
          {hackathons.map((hackathon, index) => (
            <Card
              key={index}
              className="card-hover animate-slide-up overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60 z-0"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">{hackathon.icon}</div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {hackathon.title}
                      {hackathon.achievement && (
                        <span className="text-xs font-normal px-2 py-1 bg-primary/20 text-primary rounded-full">
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
                    <Button key={linkIndex} size="sm" variant="outline" asChild>
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
    </section>
  )
}
