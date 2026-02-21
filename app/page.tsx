import Hero from "@/components/hero"

export const metadata = {
  title: "Home | My Portfolio",
  description: "Welcome to my portfolio",
}

export default function Home() {
  return (
    <div className="transition-all duration-1000 ease-in-out transform">
      <Hero />
    </div>
  )
}
