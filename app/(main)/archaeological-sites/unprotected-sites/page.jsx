"use client";

import Link from "next/link";
import { ArrowLeft, ChevronRight, Home, MapPin } from "lucide-react";
import { goaDistricts } from "@/data/goaDistricts";
import { unprotectedSitesByDistrict } from "@/data/unprotectedSitesDistrictWise";

export default function NonRecognisedSitesPage() {
  const totalSites = Object.values(unprotectedSitesByDistrict).reduce(
    (sum, temples) => sum + temples.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-wide">
            NON-RECOGNISED SITES
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
            href="/archaeological-sites"
            className="hover:text-primary transition-colors duration-200"
          >
            Archaeological Sites
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-black font-medium">Non Recognised Sites</span>
        </div>

        {/* Information Section */}
        <div className="my-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Explore Non Recognised Protected Sites by District
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-8">
            Discover the Archaeological Survey of India non recognised sites
            across Goa organized by district. Each region showcases unique
            historical monuments, forts, churches, caves, and heritage
            structures that tell the story of Goa's rich cultural past. Click on
            any district to explore the Non Recognised sites in that area and learn about
            their archaeological and historical significance.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-[#ff7b00]">
                {totalSites}
              </div>
              <p className="text-gray-600">Total Non Recognised Protected Sites</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold  mb-2 text-[#ff7b00]">12</div>
              <p className="text-gray-600">Districts Covered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold  mb-2 text-[#ff7b00]">
                6th-19th
              </div>
              <p className="text-gray-600">Century Heritage</p>
            </div>
          </div>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goaDistricts.map((district) => (
            <Link
              key={district.id}
              href={`/archaeological-sites/unprotected-sites/${district.slug}`}
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
                      {unprotectedSitesByDistrict[district.id]?.length || 0} Non Recognised Sites
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
          <Link href="/archaeological-sites">
            <div className="flex justify-center">
              <button className="flex items-center gap-2 bg-[#FF7B00] hover:bg-[#FF7B00] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
                <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                Back To Archaeological Sites
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
