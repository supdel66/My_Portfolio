import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Supriya Poudel | Portfolio",
  description: "I'm Supriya, based in Kathmandu, Nepal, with interests in machine learning and web development.",
  keywords: [
    "Supriya Poudel",
    "Machine Learning",
    "Data Science",
    "React",
    "Next.js",
    "Supabase",
    "Flask",
    "Portfolio",
    "Nepal",
    "Kathmandu",
  ],
  authors: [{ name: "Supriya Poudel" }],
  creator: "Supriya Poudel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://supriyapoudel.com.np",
    title: "Supriya Poudel | Portfolio",
    description: "I'm Supriya, based in Kathmandu, Nepal, with interests in machine learning and web development.",
    siteName: "Supriya Poudel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supriya Poudel | Portfolio",
    description: "I'm Supriya, based in Kathmandu, Nepal, with interests in machine learning and web development.",
    creator: "@supriyapoudel",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://supriyapoudel.com.np" />
        <meta name="google-site-verification" content="your-verification-code-here" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
