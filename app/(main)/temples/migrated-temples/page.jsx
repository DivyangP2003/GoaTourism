"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Home, MapPin } from "lucide-react";
import { goaDistricts } from "@/data/goaDistricts";

export default function MigratedTemplesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-wide">
            MIGRATED TEMPLES
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
          <span className="text-black font-medium">Migrated Temples</span>
        </div>

        {/* Information Section */}
        <div className="my-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Temples Relocated During Portuguese Rule
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-8">
            During the Portuguese Inquisition (1560-1812), many Hindu temples
            were destroyed or forced to relocate from the Old Conquests to safer
            areas in the New Conquests. These migrated temples represent the
            resilience and determination of the Hindu community to preserve
            their faith and cultural heritage.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff7b00] mb-2">
                {Math.floor(
                  goaDistricts.reduce(
                    (total, district) => total + district.templeCount,
                    0
                  ) * 0.6
                )}
              </div>
              <p className="text-gray-600">Migrated Temples</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff7b00] mb-2">
                1560-1812
              </div>
              <p className="text-gray-600">Inquisition Period</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ff7b00] mb-2">
                Preserved
              </div>
              <p className="text-gray-600">Cultural Heritage</p>
            </div>
          </div>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goaDistricts.map((district) => (
            <Link
              key={district.id}
              href={`/temples/migrated-temples/${district.slug}`}
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

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <Link href="/temples">
            <div className="flex justify-center">
              <button className="flex items-center gap-2 bg-[#FF7B00] hover:bg-[#FF7B00] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
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
