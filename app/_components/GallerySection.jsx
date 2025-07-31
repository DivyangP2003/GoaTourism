"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GallerySection({ images = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredImage, setHoveredImage] = useState(null);

  const categories = ["All", ...new Set(images.map((img) => img.category))];
  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);
  const visibleImages = filteredImages.slice(0, 8);

  if (!images || images.length === 0) {
    return <div className="text-center py-16">No images available.</div>;
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4 tracking-wide">
            GALLERY
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the beauty of Goa through our curated collection
          </p>
        </div>

        {/* Category Filter - No Scroll, Auto-fit */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 flex-nowrap ">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-[#98D204] text-white shadow-lg hover:bg-[#98D204] active:bg-[#4A6604]"
                  : "bg-gray-100 text-gray-700 hover:bg-[#98D204] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Always 4 Columns */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {visibleImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg sm:rounded-2xl shadow-md sm:shadow-lg"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={image.image || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                    hoveredImage === image.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-2 sm:p-4 text-white transform transition-all duration-300 ${
                    hoveredImage === image.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="text-xs sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                    {image.title}
                  </h3>
                  <span className="inline-block bg-[#4A6604] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm transition-all duration-200">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {filteredImages.length > 8 && (
          <div className="text-center mt-8 sm:mt-10">
            <Link href="/gallery">
              <button className="px-5 sm:px-8 py-2 sm:py-3 bg-[#FF7B00] text-white font-semibold rounded-full 
             hover:bg-[#FF7B00] active:bg-[#F26419] transition-all duration-200 text-xs sm:text-base">
                View More
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
