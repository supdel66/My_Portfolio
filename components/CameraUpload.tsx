"use client"

import { useState, useRef } from "react"
import { Camera, Upload, CheckCircle2, Loader2, XCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button" // Assuming standard shadcn/ui
import { toast } from "sonner" // For notifications, assuming it exists based on package.json
import { useRouter } from "next/navigation"

export default function CameraUpload() {
    const router = useRouter()
    const [isUploading, setIsUploading] = useState(false)
    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const compressAndUpload = async (file: File) => {
        setIsUploading(true)
        setStatus("uploading")

        try {
            // Create an image element to draw the file to canvas
            const img = new Image()
            const objectUrl = URL.createObjectURL(file)

            await new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
                img.src = objectUrl
            })

            URL.revokeObjectURL(objectUrl)

            // Start with Full HD width for maximum clarity
            let maxWidth = 1080
            let quality = 0.9
            let blob: Blob | null = null

            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")

            if (!ctx) throw new Error("Could not get canvas context")

            // Iteratively compress only if massive (Target: 1MB for crystal clear quality)
            while (true) {
                const scale = maxWidth / img.width
                const targetHeight = img.height * scale

                canvas.width = maxWidth
                canvas.height = targetHeight

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

                blob = await new Promise<Blob | null>((resolve) => {
                    canvas.toBlob(
                        (b) => resolve(b),
                        "image/webp",
                        quality
                    )
                })

                if (!blob) throw new Error("Failed to compress image")

                // Target: 1MB (1048576 bytes) - virtually lossless for these scales
                if (blob.size <= 1048576) {
                    break
                }

                // Only reduce if still over 1MB
                if (quality > 0.6) {
                    quality -= 0.1
                } else if (maxWidth > 600) {
                    maxWidth -= 200
                } else {
                    break
                }
            }

            if (!blob || blob.size > 2097152) { // 2MB hard limit
                toast.error(`Photo is too large to process. Please try a different one.`)
                setStatus("error")
                return
            }

            // Upload to Supabase
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`
            const { data, error } = await supabase.storage
                .from("visitors")
                .upload(fileName, blob, {
                    contentType: "image/webp",
                    upsert: false,
                })

            if (error) {
                console.error("Supabase upload error:", error)
                throw error
            }

            setStatus("success")
            toast.success("Photo added to the globe successfully!")

            // Redirect to visitors page so they can see themselves
            setTimeout(() => {
                router.push("/visitors")
            }, 1000)

            // Reset after a bit
            setTimeout(() => {
                setStatus("idle")
            }, 3000)
        } catch (err) {
            console.error(err)
            toast.error("Failed to upload image. Please try again.")
            setStatus("error")
            setTimeout(() => setStatus("idle"), 3000)
        } finally {
            setIsUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            compressAndUpload(e.target.files[0])
        }
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    return (
        <div
            onClick={handleUploadClick}
            className="glass-card glass-card-hover col-span-1 row-span-1 p-5 flex flex-col items-center justify-center gap-3 group relative overflow-hidden cursor-pointer"
        >
            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

            <input
                type="file"
                accept="image/*"
                capture="user"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            <div className="p-3 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400 group-hover:scale-110 transition-transform duration-300 relative flex items-center justify-center">
                {status === "idle" && <Camera className="h-6 w-6" />}
                {status === "uploading" && <Loader2 className="h-6 w-6 animate-spin" />}
                {status === "success" && <CheckCircle2 className="h-6 w-6 text-green-400" />}
                {status === "error" && <XCircle className="h-6 w-6 text-red-500" />}
            </div>

            <span className="text-sm font-semibold text-white/80 group-hover:text-white text-center transition-colors">
                {status === "uploading" ? "Saving..." : status === "success" ? "Added!" : "Leave Mark"}
            </span>
        </div>
    )
}
