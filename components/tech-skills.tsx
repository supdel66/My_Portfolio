import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const frontendSkills = [
  { name: "React.js", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "HTML/CSS", level: 90 },
  { name: "Tailwind CSS", level: 85 },
]

const backendSkills = [
  { name: "Node.js", level: 75 },
  { name: "Supabase", level: 70 },
  { name: "Express", level: 65 },
  { name: "REST APIs", level: 80 },
]

const mlSkills = [
  { name: "Python", level: 85 },
  { name: "TensorFlow", level: 70 },
  { name: "scikit-learn", level: 75 },
  { name: "Data Analysis", level: 80 },
]

export default function TechSkills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container px-4 mx-auto">
        <div className="section-indicator mx-auto text-center">💻 Technical Proficiency</div>
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">Technologies and frameworks I work with</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="card-hover animate-fade-in">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Frontend Development</h3>
              <div className="space-y-4">
                {frontendSkills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Backend Development</h3>
              <div className="space-y-4">
                {backendSkills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Machine Learning</h3>
              <div className="space-y-4">
                {mlSkills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
