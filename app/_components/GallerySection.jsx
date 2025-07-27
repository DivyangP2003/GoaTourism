"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function GallerySection({ images = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredImage, setHoveredImage] = useState(null)

  const categories = ["All", ...new Set(images.map((img) => img.category))]
  const filteredImages = selectedCategory === "All" ? images : images.filter((img) => img.category === selectedCategory)
  const visibleImages = filteredImages.slice(0, 8)

  if (!images || images.length === 0) {
    return <div className="text-center py-16">No images available.</div>
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide">GALLERY</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the beauty of Goa through our curated collection
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative h-64 transform transition-all duration-300 group-hover:scale-110">
                <Image src={image.image || "/placeholder.svg"} alt={image.title} fill className="object-cover" />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                    hoveredImage === image.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-300 ${
                    hoveredImage === image.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <span className="inline-block bg-primary/80 text-white px-3 py-1 rounded-full text-sm">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {filteredImages.length > 8 && (
          <div className="text-center mt-10">
            <Link href="/gallery">
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-200">
                View More
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
