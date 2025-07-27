"use client"

import { useEffect, useRef } from "react"

export default function VideoHero() {
  const videoRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" muted loop playsInline>
        <source src="/placeholder-video.mp4" type="video/mp4" />
        Fallback image
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-red-100 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Welcome to Goa</h1>
            <p className="text-xl">Discover the Pearl of the Orient</p>
          </div>
        </div>
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 font-serif">Welcome to YUGAANTAR</h1>
          <p className="text-xl mb-8">Discover Goa's Rich Heritage & Hidden Treasures</p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200">
            Explore Now
          </button>
        </div>
      </div>
    </section>
  )
}
