"use client"

import Link from "next/link"
import { ChevronRight, Home, MapPin } from "lucide-react"
import { goaDistricts } from "@/data/goaDistricts"

export default function AncientTemplesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-wide">ANCIENT TEMPLES</h1>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <Link href="/" className="hover:text-primary transition-colors duration-200">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/temples" className="hover:text-primary transition-colors duration-200">
            Temples
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-black font-medium">Ancient Temples</span>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goaDistricts.map((district) => (
            <Link key={district.id} href={`/temples/ancient-temples/${district.slug}`}>
              <div className="group cursor-pointer">
                {/* District Box */}
                <div className="bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-lg h-32 flex items-center justify-center mb-3 group-hover:shadow-lg">
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MapPin className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <span className="text-sm text-gray-600 font-medium">{district.templeCount} Temples</span>
                  </div>
                </div>

                {/* District Name */}
                <h3 className="text-lg font-semibold text-black text-center group-hover:text-primary transition-colors duration-200">
                  {district.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">Explore Ancient Temples by District</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-8">
            Discover the ancient temples of Goa organized by district. Each region has its unique architectural styles,
            historical significance, and spiritual heritage. Click on any district to explore the ancient temples in
            that area and learn about their fascinating stories.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {goaDistricts.reduce((total, district) => total + district.templeCount, 0)}
              </div>
              <p className="text-gray-600">Total Ancient Temples</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">12</div>
              <p className="text-gray-600">Districts Covered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">12th-16th</div>
              <p className="text-gray-600">Century Heritage</p>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <Link href="/temples">
            <button className="bg-primary text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-all duration-200">
              ← Back to Temples
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
