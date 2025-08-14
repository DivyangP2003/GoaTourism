"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import { goaDistricts } from "@/data/goaDistricts";
import { ancientTemplesByDistrict } from "@/data/ancientTemplesDitrictWise";

export default function AncientTemplesDistrictPage() {
  const params = useParams();
  const districtSlug = params.district;

  // Find the district data
  const district = goaDistricts.find((d) => d.slug === districtSlug);
  const temples = ancientTemplesByDistrict[districtSlug] || [];

  // Get other districts for "OTHER TALUKAS" section
  const otherDistricts = goaDistricts
    .filter((d) => d.slug !== districtSlug)
    .slice(0, 4);

  if (!district) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            District Not Found
          </h1>
          <Link href="/temples/ancient-temples">
            <button className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all duration-200">
              Back to Ancient Temples
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section with Background Image */}
      <div className="relative h-64 overflow-hidden mb-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt={`Ancient Temples in ${district.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Title Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider drop-shadow-lg text-center">
            ANCIENT TEMPLES IN {district.name.toUpperCase()}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <Link
            href="/temples/ancient-temples"
            className="hover:text-primary transition-colors duration-200"
          >
            Ancient Temples
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/temples/ancient-temples/${encodeURIComponent(
              district.name.toLowerCase()
            )}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {district.name}
          </Link>
        </div>

        {/* Temples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {temples.map((temple) => (
            <Link
              key={temple.id}
              href={`/temples/ancient-temples/${districtSlug}/${temple.slug}`}
            >
              <div className="group cursor-pointer">
                {/* Temple Image Box */}
                <div className="bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-lg h-40 mb-3 overflow-hidden group-hover:shadow-lg">
                  <Image
                    src={temple.image || "/placeholder.svg"}
                    alt={temple.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  />
                </div>

                {/* Temple Name */}
                <h3 className="text-sm font-medium text-black text-center group-hover:text-primary transition-colors duration-200">
                  {temple.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Talukas Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 tracking-wide">
            OTHER TALUKAS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDistricts.map((otherDistrict) => (
              <Link
                key={otherDistrict.id}
                href={`/temples/ancient-temples/${otherDistrict.slug}`}
              >
                <div className="group cursor-pointer">
                  {/* District Box */}
                  <div className="bg-white border-2 border-gray-300 hover:border-[#ff7b00] transition-colors duration-300 rounded-lg h-40 flex items-center justify-center mb-3 group-hover:shadow-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors duration-300">
                        <span className="text-2xl font-bold text-gray-600 group-hover:text-primary">
                          {otherDistrict.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 group-hover:text-primary font-medium">
                        {ancientTemplesByDistrict[otherDistrict.slug]?.length ||
                          0}{" "}
                        Temples
                      </span>
                    </div>
                  </div>

                  {/* District Name */}
                  <h3 className="text-sm font-medium text-black text-center group-hover:text-primary transition-colors duration-200">
                    {otherDistrict.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Navigation */}
        <div className="mt-16 text-center pb-16">
          <Link href="/temples/ancient-temples">
            <div className="flex justify-center">
              <button className="flex items-center gap-2 bg-[#FF7B00] hover:bg-[#FF7B00] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
                <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                Back To Ancient Temples
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
