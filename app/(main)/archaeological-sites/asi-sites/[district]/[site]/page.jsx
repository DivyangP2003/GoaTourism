"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, MapPin, Clock, Calendar, Users } from "lucide-react"
import { asiSitesByDistrict } from "@/data/asiSitesDistrictWise"
import { goaDistricts } from "@/data/goaDistricts"

export default function ASISiteDetailPage() {
  const params = useParams()
  const districtSlug = params.district
  const siteSlug = params.site

  // Find the district and site data
  const district = goaDistricts.find((d) => d.slug === districtSlug)
  const sites = asiSitesByDistrict[districtSlug] || []
  const site = sites.find((s) => s.slug === siteSlug)

  if (!district || !site) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">ASI Site Not Found</h1>
          <Link href={`/archaeological-sites/asi-sites/${districtSlug}`}>
            <button className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all duration-200">
              Back to {district?.name || "District"} ASI Sites
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold tracking-wider drop-shadow-lg mb-4">
              {site.name.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">{district.name}, Goa</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <Link href="/" className="hover:text-primary transition-colors duration-200">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/archaeological-sites" className="hover:text-primary transition-colors duration-200">
            Heritage
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/archaeological-sites/asi-sites" className="hover:text-primary transition-colors duration-200">
            ASI Sites
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/archaeological-sites/asi-sites/${districtSlug}`} className="hover:text-primary transition-colors duration-200">
            {district.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#4A6604] font-semibold">{site.name}</span>
        </div>

        {/* Site Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Site Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">{site.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{site.description}</p>
            </div>

            {/* Site Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Type</h4>
                  <p className="text-gray-700">{site.type}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-6 w-6 text-accent mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Period</h4>
                  <p className="text-gray-700">{site.period}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Location</h4>
                  <p className="text-gray-700">{site.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-link mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Timings</h4>
                  <p className="text-gray-700">{site.timings}</p>
                </div>
              </div>
            </div>

            {/* Historical Significance */}
            <div>
              <h4 className="font-semibold text-black mb-3">Historical Significance</h4>
              <div className="flex flex-wrap gap-2">
                {site.significance.map((significance, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {significance}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Site Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image src={site.image || "/placeholder.svg"} alt={site.name} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">Visiting Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-black mb-2">Best Time to Visit</h4>
              <p className="text-gray-700 text-sm">
                Early morning or late afternoon for better lighting and fewer crowds
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-black mb-2">Entry Guidelines</h4>
              <p className="text-gray-700 text-sm">
                Follow ASI guidelines, no touching of monuments, photography may be restricted
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-black mb-2">How to Reach</h4>
              <p className="text-gray-700 text-sm">
                Accessible by road from {district.name} town center, public transport available
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/archaeological-sites/asi-sites/${districtSlug}`}>
            <button className="bg-primary text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-all duration-200">
              ← Back to {district.name} ASI Sites
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-accent text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-destructive transition-all duration-200">
              Plan Your Visit
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
