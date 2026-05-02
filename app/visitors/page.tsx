import { supabase } from "@/lib/supabase"
import RevolvingGlobe from "@/components/RevolvingGlobe"

export const revalidate = 0 // Disable caching so it always shows freshest data immediately
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export const metadata = {
    title: "Visitors | My Portfolio",
    description: "See everyone who has visited and left their mark.",
}

export default async function VisitorsPage() {
    let urls: string[] = []

    try {
        let allFiles: any[] = []
        let offset = 0
        const limit = 100
        let hasMore = true

        while (hasMore) {
            const { data: files, error } = await supabase.storage.from("visitors").list(undefined, {
                limit: limit,
                offset: offset,
                sortBy: { column: 'created_at', order: 'asc' }
            })

            if (error) {
                console.error("Error fetching visitors:", error)
                break
            }

            if (files && files.length > 0) {
                allFiles = [...allFiles, ...files]
                if (files.length < limit) {
                    hasMore = false
                } else {
                    offset += limit
                }
            } else {
                hasMore = false
            }
        }

        // Filter out any system/hidden files like .emptyFolderPlaceholder
        const imageFiles = allFiles.filter(f => f.name && !f.name.startsWith("."))

        urls = imageFiles.map((file) => {
            const { data: { publicUrl } } = supabase.storage.from("visitors").getPublicUrl(file.name)
            return publicUrl
        })
    } catch (err) {
        console.error("Failed to load visitors", err)
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative selection:bg-white/30 pt-24">
            {/* Ambient background blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
                        The Visitors Globe
                    </h1>
                    <p className="text-white/50 text-lg">
                        A constellation of amazing people who stopped by. Leave your mark from the home page.
                    </p>
                </div>

                <div className="w-full">
                    <RevolvingGlobe visitors={urls} />
                </div>
            </div>
        </div>
    )
}
