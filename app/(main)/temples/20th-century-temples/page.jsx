"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Home, MapPin } from "lucide-react";
import { goaDistricts } from "@/data/goaDistricts";
import { twentiethCenturyTemplesByDistrict } from "@/data/twentyCenturtTemplesDistrictWise";

export default function TwentiethCenturyTemplesPage() {
  const totalTemples = Object.values(twentiethCenturyTemplesByDistrict)
    .reduce((sum, temples) => sum + temples.length, 0);
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-wide">
            20TH CENTURY TEMPLES
          </h1>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <Link
            href="/"
            className="hover:text-primary transition-colors duration-200"
          >
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/temples"
            className="hover:text-primary transition-colors duration-200"
          >
            Temples
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#4A6604] font-semibold">20th Century Temples</span>
        </div>

        {/* Information Section */}
        <div className="my-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Modern Temple Architecture & Community Centers
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-8">
            The 20th century marked a renaissance in temple construction in Goa,
            especially after liberation in 1961. These modern temples blend
            traditional Hindu architecture with contemporary design elements,
            featuring enhanced facilities and serving as community centers for
            cultural and religious activities.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff7b00] mb-2">
                {totalTemples}
              </div>
              <p className="text-gray-600">Modern Temples</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff7b00] mb-2">
                1900-2000
              </div>
              <p className="text-gray-600">Construction Period</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff7b00] mb-2">
                Community
              </div>
              <p className="text-gray-600">Centers</p>
            </div>
          </div>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goaDistricts.map((district) => (
            <Link
              key={district.id}
              href={`/temples/20th-century-temples/${district.slug}`}
            >
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
                      {twentiethCenturyTemplesByDistrict[district.id]?.length || 0} Temples
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

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <Link href="/temples">
            <div className="flex justify-center">
              <button className="flex items-center gap-2 bg-[#FF7B00] hover:bg-[#F26419] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
                <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                Back To Temples
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
