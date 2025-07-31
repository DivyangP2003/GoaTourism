"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Hook to detect window size & set visible cards
const useVisibleCards = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1280) setCount(5); // Large screens
      else if (window.innerWidth >= 768) setCount(3); // Medium
      else setCount(3); // Small
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return count;
};

export default function HiddenGemsSection({
  hiddenGems,
  title = "HIDDEN GEMS",
  subtitle = "Places to visit on your next trip to Goa",
}) {
  const visibleCards = useVisibleCards();
  const prepend = hiddenGems.slice(-visibleCards);
  const append = hiddenGems.slice(0, visibleCards);
  const totalData = [...prepend, ...hiddenGems, ...append];

  const [currentIndex, setCurrentIndex] = useState(visibleCards);
  const [transitioning, setTransitioning] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  // ✅ Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // ✅ Infinite Loop Reset
  useEffect(() => {
    const totalRealSlides = hiddenGems.length;
    if (currentIndex === totalRealSlides + visibleCards) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        requestAnimationFrame(() => {
          setCurrentIndex(visibleCards);
          requestAnimationFrame(() => setTransitioning(true));
        });
      }, 600);
      return () => clearTimeout(timeout);
    }
    if (currentIndex === 0) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        requestAnimationFrame(() => {
          setCurrentIndex(totalRealSlides);
          requestAnimationFrame(() => setTransitioning(true));
        });
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, hiddenGems.length, visibleCards]);

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  const handleMouseEnter = () => intervalRef.current && clearInterval(intervalRef.current);
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => setCurrentIndex((prev) => prev + 1), 4000);
  };

  return (
    <section className="relative w-full bg-gray-100 py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
          {title}
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${(currentIndex * 100) / totalData.length}%)`,
            transition: transitioning ? "transform 0.6s ease-in-out" : "none",
            width: `${(totalData.length / visibleCards) * 100}%`,
          }}
        >
          {totalData.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{ width: `${100 / totalData.length}%` }}
              className="px-1 sm:px-2 md:px-3 lg:px-4"
            >
              <motion.div
                className="relative h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gray-500/50 p-2 sm:p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-bold text-black text-sm sm:text-base md:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-black text-xs sm:text-sm md:text-base">
                    {item.subtitle}
                  </p>
                  <motion.button
                    className="mt-2 md:mt-3 bg-[#98D204] hover:bg-[#98D204] active:bg-[#4A6604] 
                    text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    Read More
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white p-2 md:p-3 rounded-full shadow hover:scale-110 transition"
        >
          <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white p-2 md:p-3 rounded-full shadow hover:scale-110 transition"
        >
          <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mt-8 md:mt-11 space-x-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const middle = Math.floor(5 / 2);
          const offset = i - middle;
          const index =
            (currentIndex + offset + hiddenGems.length) % hiddenGems.length;

          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${
                  index === currentIndex
                    ? "bg-[#98D204] scale-125"
                    : "bg-gray-300 hover:bg-[#98D204]"
                }`}
            />
          );
        })}
      </div>

      {/* Discover More */}
      <div className="text-center mt-6 md:mt-10">
        <Link href="/hiddenGems">
          <button className="bg-[#FF7B00] hover:bg-[#FF7B00] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
            Discover More
          </button>
        </Link>
      </div>
    </section>
  );
}
