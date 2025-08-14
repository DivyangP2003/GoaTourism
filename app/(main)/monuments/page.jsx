"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Home, MapPin } from "lucide-react";
import { goaDistricts } from "@/data/goaDistricts";
import Image from "next/image";

export default function MonumentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-96 overflow-hidden mb-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/festivals-hero.jpg" // Replace with your actual image path
            alt="Hindu Festivals in Goa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* FESTIVALS Text Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider drop-shadow-lg">
            MONUMENTS
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <Link
            href="/"
            className="hover:text-primary transition-colors duration-200"
          >
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/monuments"
            className="hover:text-primary transition-colors duration-200"
          >
            Monuments
          </Link>
        </div>

        <div className="my-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Explore Historical Monuments by Region
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-8">
            Dive into the rich history of Goa through its iconic monuments
            spread across different regions. From ancient forts overlooking the
            Arabian Sea to colonial-era churches and mansions, each structure
            tells a unique story of Goa’s cultural and political past. Click on
            any region to uncover the historical monuments it holds and explore
            the legacy they preserve.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-[#ff7b00]">
                {goaDistricts.reduce(
                  (total, district) => total + district.monumentCount,
                  0
                )}
              </div>
              <p className="text-gray-600">Total Monuments in Goa</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff7b00] mb-2">12</div>
              <p className="text-gray-600">Districts Covered</p>
            </div>
          </div>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goaDistricts.map((district) => (
            <Link key={district.id} href={`/monuments/${district.slug}`}>
              <div className="group cursor-pointer">
                {/* District Box with Background Image */}
                <div
                  className="relative bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-lg h-40 sm:h-48 md:h-52 lg:h-56 flex items-center justify-center mb-3 group-hover:shadow-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${district.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Hover Content */}
                  <div className="relative z-10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MapPin className="h-8 w-8 text-white mx-auto mb-2 font-bold" />
                    <span className="text-sm text-white font-bold">
                      {district.templeCount} Temples
                    </span>
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

        {/* Monuments Information Section */}

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <Link href="/">
            <div className="flex justify-center">
              <button className="flex items-center gap-2 bg-[#FF7B00] hover:bg-[#FF7B00] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
                <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                Back To Home
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
