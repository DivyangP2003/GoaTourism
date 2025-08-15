"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, Home, MapPin } from "lucide-react"
import { goaDistricts } from "@/data/goaDistricts"
import { unprotectedSitesByDistrict } from "@/data/unprotectedSitesDistrictWise"

export default function nonrecognisedSitesDistrictPage() {
  const params = useParams()
  const districtSlug = params.district

  // Find the district data
  const district = goaDistricts.find((d) => d.slug === districtSlug)
  const sites = unprotectedSitesByDistrict[districtSlug] || []

  // Get other districts for "OTHER TALUKAS" section
  const otherDistricts = goaDistricts
  .filter((d) => d.slug !== districtSlug)
  .slice(0, 4)

  if (!district) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">District Not Found</h1>
          <Link href="/unprotected-sites">
            <button className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all duration-200">
              Back to Non Recognised Sites
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-64 overflow-hidden mb-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={district.image || "/placeholder.svg"}
            alt={`NON RECOGNISED Sites in ${district.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Title Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider drop-shadow-lg text-center">
            NON RECOGNISED SITES IN {district.name.toUpperCase()}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <Link href="/" className="hover:text-primary transition-colors duration-200">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/archaeological-sites" className="hover:text-primary transition-colors duration-200">
            Archaeological Sites
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/archaeological-sites/unprotected-sites" className="hover:text-primary transition-colors duration-200">
            Non Recognised Sites
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/archaeological-sites/unprotected-sites/${encodeURIComponent(district.name.toLowerCase())}`}
            className="hover:text-primary transition-colors duration-200 text-[#4A6604] font-semibold"
          >
            {district.name}
          </Link>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {sites.map((site) => (
            <Link key={site.id} href={`/archaeological-sites/unprotected-sites/${districtSlug}/${site.slug}`}>
              <div className="group cursor-pointer">
                {/* Site Image Box */}
                <div className="bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-lg h-40 mb-3 overflow-hidden group-hover:shadow-lg">
                  <Image
                    src={site.image || "/placeholder.svg"}
                    alt={site.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  />
                </div>

                {/* Site Name */}
                <h3 className="text-sm font-medium text-black text-center group-hover:text-primary transition-colors duration-200">
                  {site.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Talukas Section */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 tracking-wide">OTHER TALUKAS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherDistricts.map((otherDistrict) => (
              <Link key={otherDistrict.id} href={`/archaeological-sites/unprotected-sites/${otherDistrict.slug}`}>
                <div className="group cursor-pointer">
                  {/* District Box */}
                  <div
                    className="relative bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-lg h-40 sm:h-48 md:h-52 lg:h-56 flex items-center justify-center mb-3 group-hover:shadow-lg overflow-hidden"
                    style={{
                      backgroundImage: `url(${otherDistrict.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Hover Content */}
                    <div className="relative z-10 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <MapPin className="h-8 w-8 text-white mx-auto mb-2 font-bold" />
                      <span className="text-sm text-white font-bold">
                        {unprotectedSitesByDistrict[otherDistrict.slug]?.length || 0} Non Recognised Sites
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
          <Link href="/archaeological-sites/unprotected-sites">
            <div className="flex justify-center">
              <button className="flex items-center gap-2 bg-[#FF7B00] hover:bg-[#F26419] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
                <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                Back To Non Recognised Sites
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
