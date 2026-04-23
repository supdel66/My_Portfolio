"use client"

import { useEffect, useState } from "react"
import { Globe, Users } from "lucide-react"

// Minimal custom CSS animation for reverse spin
const reverseSpin = `
  @keyframes spin-reverse {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  .animate-spin-reverse {
    animation: spin-reverse 30s linear infinite;
  }
  .animate-spin-slow {
    animation: spin 30s linear infinite;
  }
`;

export default function RevolvingGlobe({ visitors }: { visitors: string[] }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Add custom styles for the reverse spin
        const style = document.createElement("style");
        style.innerHTML = reverseSpin;
        document.head.appendChild(style);
        setMounted(true)
        return () => { document.head.removeChild(style); }
    }, [])

    if (!mounted) return null;

    if (visitors.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-[60vh] space-y-6">
                <div className="w-32 h-32 rounded-full border border-white/10 bg-white/5 flex items-center justify-center relative shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                    <Globe className="w-16 h-16 text-white/40" />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-white mb-2">The Globe is Empty</h2>
                    <p className="text-white/50 text-sm max-w-sm">Be the first to upload your photo from the home page and claim the center of the universe!</p>
                </div>
            </div>
        )
    }

    // The newest goes in the center
    const centerVisitor = visitors[visitors.length - 1]
    // The rest orbit around
    const orbitingVisitors = visitors.slice(0, visitors.length - 1)

    return (
        <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden py-20">

            {/* Dynamic background lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Orbit Rings container */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">

                {/* Orbit Path 1 */}
                <div className="absolute w-full h-full rounded-full border border-white/5 border-dashed" />
                {/* Orbit Path 2 */}
                <div className="absolute w-[70%] h-[70%] rounded-full border border-white/5 border-dashed" />

                {/* Center Object */}
                <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full ring-2 ring-white/20 p-2 bg-black/50 backdrop-blur-md shadow-[0_0_100px_rgba(255,255,255,0.3)] animate-pulse-slow">
                    <img
                        src={centerVisitor}
                        alt="Center Visitor"
                        className="w-full h-full object-cover rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-widest text-white/60 bg-black/40 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap shadow-lg">
                        LATEST VISITOR
                    </div>
                </div>

                {/* Orbiting Objects */}
                {orbitingVisitors.map((url, i) => {
                    const total = orbitingVisitors.length
                    const angle = (i / total) * (Math.PI * 2)

                    // Distribute on two orbital rings alternatively
                    const isOuterRing = i % 2 === 0
                    // Expanded radius to accommodate larger images
                    const radius = isOuterRing ? 300 : 210 // px distance from center

                    const spinDuration = isOuterRing ? 45 : 30 // Variable speed
                    const direction = isOuterRing ? 'normal' : 'reverse'

                    return (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center pointer-events-none"
                            style={{
                                animation: `spin ${spinDuration}s linear infinite ${direction}`,
                                transform: `rotate(${angle}rad)`, // Initial angle offset
                            }}
                        >
                            <div
                                className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-white/20 shadow-2xl pointer-events-auto hover:scale-125 hover:z-20 transition-transform duration-300 backdrop-blur-md bg-black/20 group"
                                style={{
                                    transform: `translateX(${radius}px)`,
                                }}
                            >
                                <div
                                    className="w-full h-full relative"
                                    style={{
                                        animation: `spin ${spinDuration}s linear infinite ${direction === 'normal' ? 'reverse' : 'normal'}`,
                                    }}
                                >
                                    {/* Subtle inner glow for photos */}
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(255,255,255,0.1)] z-10 pointer-events-none" />
                                    <img
                                        src={url}
                                        alt="Visitor"
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-sm text-base font-medium">
                <Users className="w-5 h-5 text-teal-400" />
                <span>{visitors.length} {visitors.length === 1 ? 'Soul' : 'Souls'} in the universe</span>
            </div>
        </div>
    )
}
