import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const tools = [
  {
    name: "Python",
    image: "/placeholder.svg?height=60&width=60",
    level: 75,
  },
  {
    name: "TensorFlow",
    image: "/placeholder.svg?height=60&width=60",
    level: 65,
  },
  {
    name: "PyTorch",
    image: "/placeholder.svg?height=60&width=60",
    level: 60,
  },
  {
    name: "Scikit-learn",
    image: "/placeholder.svg?height=60&width=60",
    level: 70,
  },
  {
    name: "Pandas",
    image: "/placeholder.svg?height=60&width=60",
    level: 80,
  },
  {
    name: "Jupyter",
    image: "/placeholder.svg?height=60&width=60",
    level: 85,
  },
]

export default function MLTools() {
  return (
    <section id="ml-tools" className="section-padding">
      <div className="container px-4 mx-auto">
        <h2 className="section-title">ML Tools & Technologies</h2>
        <p className="section-subtitle">Technologies and frameworks I'm learning and working with</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-3">
                  <Image src={tool.image || "/placeholder.svg"} alt={tool.name} width={60} height={60} />
                </div>
                <h4 className="font-medium mb-2">{tool.name}</h4>
                <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${tool.level}%` }}
                    aria-valuenow={tool.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{tool.level}%</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
