"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Music, ChevronDown } from "lucide-react"

interface MoodSelectorProps {
  onMoodSelected: (mood: string) => void
}

const moods = [
  { id: "happy", label: "😊 Happy & Energetic", emoji: "😊" },
  { id: "chill", label: "😌 Chill & Relaxed", emoji: "😌" },
  { id: "focused", label: "🎯 Focused & Productive", emoji: "🎯" },
  { id: "sad", label: "😢 Sad & Emotional", emoji: "😢" },
  { id: "romantic", label: "💕 Romantic & Dreamy", emoji: "💕" },
  { id: "energetic", label: "⚡ Hyped & Motivated", emoji: "⚡" },
]

// Trendy songs - Using direct MP3 links from popular tracks
// Note: These are placeholder URLs - Replace with your own hosted MP3 files or use a music API
const moodPlaylists: Record<string, { title: string; artist: string; url: string }[]> = {
  happy: [
    { title: "Happy Upbeat", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3" },
    { title: "Fun Day", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3" },
  ],
  chill: [
    { title: "Acoustic Breeze", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3" },
    { title: "Sweet Dreams", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-dreams.mp3" },
  ],
  focused: [
    { title: "Deep Focus", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3" },
    { title: "Creative Minds", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3" },
  ],
  sad: [
    { title: "Sad Day", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-sadday.mp3" },
    { title: "Memories", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-memories.mp3" },
  ],
  romantic: [
    { title: "Love", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-love.mp3" },
    { title: "Tenderness", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-tenderness.mp3" },
  ],
  energetic: [
    { title: "Energy", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-energy.mp3" },
    { title: "Punky", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-punky.mp3" },
  ],
}

export function MoodSelector({ onMoodSelected }: MoodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId)
    setIsDropdownOpen(false)
  }

  const handleContinue = () => {
    if (selectedMood) {
      onMoodSelected(selectedMood)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    // Check if user has already selected mood in this session
    const hasSelectedMood = sessionStorage.getItem("moodSelected")
    if (!hasSelectedMood) {
      setIsOpen(true)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-md">
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl opacity-50 animate-pulse" />
        
        <div className="relative bg-card/95 backdrop-blur-xl border-2 border-primary/30 rounded-3xl p-8 shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full animate-bounce" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-500 rounded-full animate-pulse" />
          
          {/* Music Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <Music className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-ping" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2 gradient-text">
            Hey there! 👋
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            What's your mood today? I'll play some music to match your vibe! 🎵
          </p>

          {/* Dropdown */}
          <div className="relative mb-6">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-4 bg-background/50 border-2 border-primary/30 rounded-2xl flex items-center justify-between hover:border-primary/50 transition-all duration-300 group"
            >
              <span className={selectedMood ? "text-foreground" : "text-muted-foreground"}>
                {selectedMood 
                  ? moods.find(m => m.id === selectedMood)?.label 
                  : "Select your mood..."}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-primary/30 rounded-2xl overflow-hidden shadow-xl z-20">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-primary/10 transition-all duration-200 flex items-center gap-3 ${
                      selectedMood === mood.id ? "bg-primary/20" : ""
                    }`}
                  >
                    <span className="text-xl">{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedMood}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 ${
              selectedMood
                ? "bg-gradient-to-r from-primary to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                : "bg-gray-500 cursor-not-allowed opacity-50"
            }`}
          >
            Let's Go! 🚀
          </button>

          {/* Skip Option */}
          <button
            onClick={() => {
              sessionStorage.setItem("moodSelected", "skipped")
              setIsOpen(false)
            }}
            className="w-full mt-3 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}

export function MusicPlayer({ mood }: { mood: string | null }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState<{ title: string; artist: string } | null>(null)

  useEffect(() => {
    if (mood && moodPlaylists[mood]) {
      const songs = moodPlaylists[mood]
      const randomSong = songs[Math.floor(Math.random() * songs.length)]
      
      setCurrentSong({ title: randomSong.title, artist: randomSong.artist })
      
      if (audioRef.current) {
        audioRef.current.src = randomSong.url
        audioRef.current.volume = 0.02
        audioRef.current.loop = true
        
        // Try to play (may be blocked by browser autoplay policy)
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked, user needs to interact
            setIsPlaying(false)
          })
      }
    }
  }, [mood])

  const toggleMute = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setIsMuted(false)
          })
          .catch(console.error)
      } else {
        audioRef.current.muted = !audioRef.current.muted
        setIsMuted(!isMuted)
      }
    }
  }

  if (!mood) return null

  return (
    <>
      <audio ref={audioRef} />
      
      {/* Floating Music Control Button - Like Instagram */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-card/90 backdrop-blur-md border-2 border-primary/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
        title={isMuted || !isPlaying ? "Unmute" : "Mute"}
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary animate-pulse" />
        )}
        
        {/* Pulsing ring when playing */}
        {isPlaying && !isMuted && (
          <div className="absolute inset-0 border-2 border-primary/50 rounded-full animate-ping" />
        )}
      </button>

      {/* Music indicator text */}
      {isPlaying && !isMuted && currentSong && (
        <div className="fixed bottom-20 left-6 z-50 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-muted-foreground border border-primary/20">
          🎵 {currentSong.title} - {currentSong.artist}
        </div>
      )}
    </>
  )
}

export default MoodSelector
