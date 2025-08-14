"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { templeCategories } from "@/data/temples";
import TempleCarousel from "./TempleCarousel";
import ContactSection from "@/app/_components/ContactSection";

export default function TemplesContent() {
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
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider drop-shadow-lg">
            TEMPLES
          </h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="text-center mb-16 p-8 rounded-2xl border-2 border-[#ff7b00]">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Sacred Heritage of Goa
          </h2>
          <p className="text-lg text-black leading-relaxed max-w-4xl mx-auto">
            Discover the spiritual heart of Goa through its magnificent temples,
            categorized by their historical periods and unique stories. Each
            category represents a different era of Goan temple architecture and
            the evolution of Hindu culture in the region.
          </p>
        </div>

        {/* Temple Categories */}
        <div className="space-y-20">
          {templeCategories.map((category, index) => (
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
                <TempleCarousel
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
                    <button className="group cursor-pointer bg-[#FF7B00] hover:bg-[#FF7B00] active:bg-[#F26419] text-white px-8 py-3 rounded-full font-semibold text-lg  transition-all duration-200 flex items-center space-x-2">
                      <span>See More</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        

        {/* Visit Information
        <div className="mt-20 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">Temple Visiting Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-black mb-2">Best Time to Visit</h4>
              <p className="text-gray-700 text-sm">
                Early morning (6-9 AM) or evening (5-8 PM) for peaceful darshan and beautiful lighting
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-black mb-2">Respect & Etiquette</h4>
              <p className="text-gray-700 text-sm">
                Dress modestly, remove footwear, maintain silence, and follow temple customs and traditions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-black mb-2">Location Hub</h4>
              <p className="text-gray-700 text-sm">
                Most temples are concentrated in Ponda taluka, known as the cultural and spiritual heart of Goa
              </p>
            </div>
          </div>
        </div> */}

        {/* Call to Action
        <div className="mt-16 text-center bg-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-black mb-4">Explore Goa's Spiritual Heritage</h3>
          <p className="text-lg text-black mb-6 max-w-2xl mx-auto">
            Join us on a spiritual journey through centuries of devotion, architecture, and cultural preservation. Each
            temple category offers unique insights into Goa's rich Hindu heritage.
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
        </div> */}
      </div>
      <ContactSection/>
    </div>
  );
}
