"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, MapPin, Clock, Calendar, Users } from "lucide-react"
import { goaDistricts } from "@/data/goaDistricts"
import { ancientTemplesByDistrict } from "@/data/ancientTemplesDitrictWise"
import { ancientTempleWikiData } from "@/data/ancientTempleWikiData"


export default function TempleDetailPage() {
  const params = useParams()
  const districtSlug = params.district
  const templeSlug = params.temple

  // Find the district and temple data
  const district = goaDistricts.find((d) => d.slug === districtSlug)
  const temples = ancientTemplesByDistrict[districtSlug] || []
  const temple = temples.find((t) => t.slug === templeSlug)
  const wikiData = ancientTempleWikiData[templeSlug]

  if (!district || !temple) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Temple Not Found</h1>
          <Link href={`/temples/ancient-temples/${districtSlug}`}>
            <button className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all duration-200">
              Back to {district?.name || "District"} Temples
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Wikipedia-style Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-black mb-2">{temple.name.toUpperCase()}</h1>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/temples" className="hover:text-blue-600 transition-colors duration-200">
              Temples
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/temples/ancient-temples" className="hover:text-blue-600 transition-colors duration-200">
              Ancient Temples
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/temples/ancient-temples/${districtSlug}`}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {district.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-black font-medium">{temple.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">Introduction</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {wikiData?.introduction || temple.description}
              </p>
            </div>

            {/* History Section */}
            {wikiData?.history && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">{wikiData.history.title}</h2>
                <p className="text-gray-700 leading-relaxed text-justify">{wikiData.history.content}</p>
              </div>
            )}

            {/* Architecture Section */}
            {wikiData?.architecture && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">{wikiData.architecture.title}</h2>
                <p className="text-gray-700 leading-relaxed text-justify">{wikiData.architecture.content}</p>
              </div>
            )}

            {/* Deity Section */}
            {wikiData?.deity && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">{wikiData.deity.title}</h2>
                <p className="text-gray-700 leading-relaxed text-justify">{wikiData.deity.content}</p>
              </div>
            )}

            {/* Festivals Section */}
            {wikiData?.festivals && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-black mb-4 border-b pb-2">{wikiData.festivals.title}</h2>
                <p className="text-gray-700 leading-relaxed text-justify">{wikiData.festivals.content}</p>
              </div>
            )}

            {/* Similar Temples Section */}
            {wikiData?.similarTemples && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-black mb-6 border-b pb-2">SIMILAR TEMPLES</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {wikiData.similarTemples.map((similarTemple, index) => (
                    <Link
                      key={index}
                      href={`/temples/ancient-temples/${districtSlug}/${similarTemple.slug}`}
                      className="group"
                    >
                      <div className="border rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                        <div className="relative h-24 mb-2 bg-gray-100 rounded overflow-hidden">
                          <Image
                            src={similarTemple.image || "/placeholder.svg"}
                            alt={similarTemple.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <h4 className="font-semibold text-sm text-black mb-1 group-hover:text-blue-600">
                          {similarTemple.name}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{similarTemple.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              {/* Temple Image */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image src={temple.image || "/placeholder.svg"} alt={temple.name} fill className="object-cover" />
              </div>

              {/* Temple Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-black mb-2">Temple Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <Users className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Deity:</span>
                        <p className="text-gray-700">{temple.deity}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Calendar className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Established:</span>
                        <p className="text-gray-700">{temple.established}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Location:</span>
                        <p className="text-gray-700">{temple.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Clock className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Timings:</span>
                        <p className="text-gray-700">{wikiData?.visitingInfo?.timings || temple.timings}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Festivals */}
                <div>
                  <h4 className="font-semibold text-black mb-2">Major Festivals</h4>
                  <div className="flex flex-wrap gap-1">
                    {temple.festivals.map((festival, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {festival}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visiting Information */}
                {wikiData?.visitingInfo && (
                  <div>
                    <h4 className="font-semibold text-black mb-2">Visiting Information</h4>
                    <div className="space-y-2 text-xs text-gray-700">
                      <p>
                        <span className="font-medium">Best Time:</span> {wikiData.visitingInfo.bestTimeToVisit}
                      </p>
                      <p>
                        <span className="font-medium">Dress Code:</span> {wikiData.visitingInfo.dressCode}
                      </p>
                      <p>
                        <span className="font-medium">How to Reach:</span> {wikiData.visitingInfo.howToReach}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href={`/temples/ancient-temples/${districtSlug}`}>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              ← Back to {district.name} Temples
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
              Plan Your Visit
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
