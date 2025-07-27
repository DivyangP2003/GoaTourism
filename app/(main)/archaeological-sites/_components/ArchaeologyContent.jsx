"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { archaeologyCategories } from "@/data/archaelogical";
import ArchaelogyCarousel from "./ArchaeologyCarousel";

export default function ArchaelogyContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Goan Temples Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* TEMPLES Text Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider drop-shadow-lg text-center">
            ARCHAEOLOGICAL SITES
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Archaeological Treasures of Goa
          </h2>
          <p className="text-lg text-black leading-relaxed max-w-4xl mx-auto">
            Journey through the ancient past of Goa by exploring its remarkable
            archaeological sites. These locations, preserved across centuries,
            reveal glimpses of Goa’s early civilizations, trade routes, and
            cultural transformations. Categorized by region and era, each site
            offers a fascinating insight into the rich and layered history of
            this coastal state.
          </p>
        </div>

        {/* Temple Categories */}
        <div className="space-y-20">
          {archaeologyCategories.map((category, index) => (
            <div
              key={category.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Carousel Section */}
              <div
                suppressHydrationWarning
                className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <ArchaelogyCarousel
                  images={category.images}
                  categoryTitle={category.title}
                />
              </div>

              {/* Content Section */}
              <div
                className={`space-y-6 ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xl text-primary font-semibold mb-4">
                    {category.subtitle}
                  </p>
                </div>

                <p className="text-lg text-black leading-relaxed">
                  {category.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-black">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Examples List */}
                <div>
                  <h4 className="font-semibold text-black mb-2">
                    Notable Examples:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* See More Button */}
                <div className="pt-4">
                  <Link href={category.route}>
                    <button className="group bg-accent text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-destructive transition-all duration-200 flex items-center space-x-2">
                      <span>See More</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-black mb-4">
            Discover Goa's Historical Monuments
          </h3>
          <p className="text-lg text-black mb-6 max-w-2xl mx-auto">
            Embark on a journey through time as you explore Goa’s iconic
            monuments—each one a testament to the region’s diverse history,
            colonial legacy, and architectural brilliance. From grand forts to
            elegant churches, every structure tells a story of Goa’s vibrant
            past.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/heritage-trails">
              <button className="bg-primary text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-all duration-200">
                Join Heritage Trail
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-link text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-200">
                Plan Your Visit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
