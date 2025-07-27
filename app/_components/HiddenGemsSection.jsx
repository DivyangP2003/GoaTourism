"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HiddenGemsSection({
  hiddenGems,
  title = "Hidden Gems",
  subtitle = "Places to visit on your next trip to Goa",
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [screenSize, setScreenSize] = useState("lg")

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("sm")
      } else if (window.innerWidth < 1024) {
        setScreenSize("md")
      } else {
        setScreenSize("lg")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hiddenGems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + hiddenGems.length) % hiddenGems.length)
  }

  // Auto-scroll
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, hiddenGems.length])

  // Dynamic visible items
  const getVisibleItems = () => {
    const numVisible = screenSize === "lg" ? 5 : 3
    const items = []
    for (let i = 0; i < numVisible; i++) {
      const index = (currentIndex + i - Math.floor(numVisible / 2) + hiddenGems.length) % hiddenGems.length
      items.push({
        ...hiddenGems[index],
        position: i,
        isCenter: i === Math.floor(numVisible / 2),
        actualIndex: index,
      })
    }
    return items
  }

  const visibleItems = getVisibleItems()

  const handleImageClick = (item) => {
    if (item.isCenter) {
      window.open(`/hiddenGems/${item.actualIndex}`, "_blank")
    } else {
      const steps = item.position - Math.floor(visibleItems.length / 2)
      setCurrentIndex((prev) => (prev + steps + hiddenGems.length) % hiddenGems.length)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Carousel */}
        <div
          className="relative h-[420px] flex items-end justify-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="flex items-end justify-center w-full gap-2 md:gap-4 lg:gap-6">
            {visibleItems.map((item) => {
              // Set size based on position and screen
              const isEdge = item.position === 0 || item.position === visibleItems.length - 1
              const classMap = {
                sm: item.isCenter ? "w-64 h-80 z-20" : "w-40 h-60 z-10",
                md: item.isCenter ? "w-72 h-88 z-20" : "w-52 h-70 z-15",
                lg: item.isCenter
                  ? "w-80 h-96 z-20"
                  : isEdge
                  ? "w-48 h-64 z-10"
                  : "w-64 h-80 z-15",
              }
              const sizeClass = classMap[screenSize] || "w-64 h-80"

              return (
                <motion.div
                  key={`${item.actualIndex}-${item.position}-${currentIndex}`}
                  className={`relative cursor-pointer ${sizeClass}`}
                  initial={false}
                  animate={{
                    scale: item.isCenter ? 1.1 : isEdge ? 0.9 : 1,
                    opacity: isEdge ? 0.8 : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    scale: item.isCenter ? 1.15 : 1.05,
                    y: -5,
                  }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleImageClick(item)}
                >
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-lg group">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={item.isCenter}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className={`font-bold mb-1 ${item.isCenter ? "text-xl" : "text-lg"}`}>{item.title}</h3>
                      <p className={`text-gray-200 mb-2 ${item.isCenter ? "text-sm" : "text-xs"}`}>{item.subtitle}</p>
                      {item.isCenter && hoveredCard === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-sm mb-3 line-clamp-2">{item.description}</p>
                          <motion.button
                            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Explore Now
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                    {!item.isCenter && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Click to view
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-30 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-30 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

{/* Progress Dots - Show only 5 centered dots */}
<div className="flex justify-center mt-8 space-x-2">
  {Array.from({ length: 5 }).map((_, i) => {
    const middle = Math.floor(5 / 2);
    const offset = i - middle;
    const index = (currentIndex + offset + hiddenGems.length) % hiddenGems.length;

    return (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentIndex
            ? "bg-primary scale-125"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      />
    );
  })}
</div>


        {/* Discover More */}
        <div className="text-center mt-8">
          <Link href="/hiddenGems">
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105">
              Discover More
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
