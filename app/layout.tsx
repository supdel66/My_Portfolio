import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import GlassDock from "@/components/glass-dock"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Supriya | Tech Enthusiast",
  description: "Personal portfolio of Supriya, a tech enthusiast and newbie developer",
  generator: "v0.dev",
  icons: {
    icon: "/profile2.jpg",
    apple: "/profile2.jpg",
    shortcut: "/profile2.jpg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Supriya",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {/* Ambient background */}
          <div className="ambient-bg" />

          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-24">{children}</main>
          </div>

          {/* <GlassDock /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
