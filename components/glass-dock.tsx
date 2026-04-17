"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, User, Users, Trophy, Code, Camera, Mail } from "lucide-react"

const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: User },
    { path: "/projects", label: "Projects", icon: Code },
    { path: "/organizations", label: "Orgs", icon: Users },
    { path: "/competitions", label: "Awards", icon: Trophy },
    { path: "/gallery", label: "Gallery", icon: Camera },
    { path: "/contact", label: "Contact", icon: Mail },
]

export default function GlassDock() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div
                className="flex items-center gap-1 px-3 py-2.5 rounded-2xl"
                style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.path
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`relative flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-300 group ${isActive
                                ? "text-white"
                                : "text-white/40 hover:text-white/70"
                                }`}
                            title={item.label}
                        >
                            {/* Active background glow */}
                            {isActive && (
                                <div
                                    className="absolute inset-0 rounded-xl"
                                    style={{
                                        background: "rgba(236, 72, 153, 0.15)",
                                        border: "1px solid rgba(236, 72, 153, 0.25)",
                                    }}
                                />
                            )}

                            <Icon className="relative z-10 h-5 w-5" strokeWidth={isActive ? 2.2 : 1.5} />

                            <span className={`relative z-10 text-[10px] mt-0.5 font-medium transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                                }`}>
                                {item.label}
                            </span>

                            {/* Active dot indicator */}
                            {isActive && (
                                <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-pink-400" />
                            )}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
