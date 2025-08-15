"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ArchaelogyCarousel({ images, categoryTitle }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Keep duplication stable for SSR + client
  const extendedImages = [...images, ...images];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === images.length - 1) {
        // Jump instantly to first slide without animation
        setTimeout(() => setCurrentIndex(0), 0);
        return prev; // stay on last briefly, then snap
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // ✅ Auto-scroll only after mount
  useEffect(() => {
    if (!isMounted || !isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, images.length, isMounted]);

  // ✅ Static SSR fallback (no animations, no index changes)
  if (!isMounted) {
    return (
      <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={images[0].src || "/placeholder.svg"}
          alt={images[0].alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-black px-4 py-2 rounded-full text-sm font-semibold">
            {categoryTitle}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white text-lg font-semibold mb-2">
            {images[0].caption}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-80 rounded-2xl overflow-hidden shadow-lg group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ✅ Image Container */}
      <div className="relative h-full">
        <div className="absolute inset-0">
          {extendedImages.map((img, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={
                currentIndex === 0
                  ? { duration: 0 }
                  : { duration: 0.8, ease: "easeInOut" }
              }
              className="relative flex-shrink-0 w-full h-full"
              style={{
                position: "absolute",
                top: 0,
                left: `${index * 100}%`,
                right: 0,
                bottom: 0,
              }}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="bg-[#98D204] hover:bg-[#4A6604] active:bg-[#4A6604] px-4 py-2 rounded-full text-sm font-semibold text-white">
            {categoryTitle}
          </span>
        </motion.div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Image Caption */}
        <motion.div
          key={`caption-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <p className="text-white text-lg font-semibold mb-2">
            {images[currentIndex % images.length].caption}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
