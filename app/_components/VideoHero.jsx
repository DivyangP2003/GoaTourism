"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react" // 🎵 Icon package (Lucide)

export default function VideoHero() {
  const videoRef = useRef(null)
  const [showText, setShowText] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowText(false), 1000)

    // Try autoplay muted (allowed in browsers)
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => setVideoError(true))
    }

    return () => clearTimeout(timer)
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loop
          playsInline
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/fallback.jpg"
          alt="Goa Fallback"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay Text */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          showText ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 font-serif">Welcome to YUGAANTAR</h1>
          <p className="text-xl mb-8">Discover Goa's Rich Heritage & Hidden Treasures</p>
        </div>
      </div>

      {/* 🔊 Mute/Unmute Button Bottom-Left */}
      {!videoError && (
        <button
          onClick={toggleMute}
          className="absolute bottom-16 right-4 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}
    </section>
  )
}
