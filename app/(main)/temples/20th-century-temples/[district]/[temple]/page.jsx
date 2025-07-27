"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Home,
  MapPin,
  Clock,
  Calendar,
  Users,
  Building,
} from "lucide-react";
import { goaDistricts } from "@/data/goaDistricts";
import { twentiethCenturyTemplesByDistrict } from "@/data/twentyCenturtTemplesDistrictWise";

export default function TempleDetailPage() {
  const params = useParams();
  const districtSlug = params.district;
  const templeSlug = params.temple;

  // Find the district and temple data
  const district = goaDistricts.find((d) => d.slug === districtSlug);
  const temples = twentiethCenturyTemplesByDistrict[districtSlug] || [];
  const temple = temples.find((t) => t.slug === templeSlug);

  if (!district || !temple) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Temple Not Found
          </h1>
          <Link href={`/temples/20th-century-temples/${districtSlug}`}>
            <button className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all duration-200">
              Back to {district?.name || "District"} Temples
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={temple.image || "/placeholder.svg"}
            alt={temple.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold tracking-wider drop-shadow-lg mb-4">
              {temple.name.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {district.name}, Goa
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            href="/temples/20th-century-temples"
            className="hover:text-primary transition-colors duration-200"
          >
            20th Century Temples
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/temples/20th-century-temples/${districtSlug}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {district.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-black font-medium">{temple.name}</span>
        </div>

        {/* Temple Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Temple Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">
                {temple.name}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {temple.description}
              </p>
            </div>

            {/* Temple Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Deity</h4>
                  <p className="text-gray-700">{temple.deity}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-6 w-6 text-accent mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Established</h4>
                  <p className="text-gray-700">{temple.established}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Location</h4>
                  <p className="text-gray-700">{temple.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-link mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Timings</h4>
                  <p className="text-gray-700">{temple.timings}</p>
                </div>
              </div>
            </div>

            {/* Festivals */}
            <div>
              <h4 className="font-semibold text-black mb-3">Major Festivals</h4>
              <div className="flex flex-wrap gap-2">
                {temple.festivals.map((festival, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {festival}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Temple Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={temple.image || "/placeholder.svg"}
                  alt={temple.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        
        {/* Temple Description */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-black mb-6">
            About This Modern Temple
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {temple.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">
                Modern Architecture
              </h3>
              <p className="text-gray-700">
                Built in {temple.constructionYear}, this temple represents the{" "}
                {temple.architecturalStyle} style, showcasing how traditional
                Hindu temple architecture evolved during the 20th century with
                modern construction techniques and contemporary design elements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">
                Community Impact
              </h3>
              <p className="text-gray-700">
                This temple serves as more than just a place of worship - it
                functions as a community center with modern facilities that
                support various social, cultural, and educational programs for
                the local community.
              </p>
            </div>
          </div>
        </div>

        {/* Construction Details */}
            <div className="bg-secondary/5 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Building className="h-6 w-6 text-secondary" />
                <h3 className="text-xl font-bold text-black">Modern Construction</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-secondary mb-1">{temple.constructionYear}</div>
                  <p className="text-sm text-gray-600">Construction Year</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-accent mb-1">20th</div>
                  <p className="text-sm text-gray-600">Century</p>
                </div>
              </div>
            </div>

        {/* Community Features Section */}
        <div className="bg-primary/5 rounded-2xl p-8 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-black">
              Community Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {temple.communityFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <h3 className="font-bold text-black">{feature}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Modern facility supporting community development and social
                  welfare programs.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">
            Visiting Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-black mb-2">
                Best Time to Visit
              </h4>
              <p className="text-gray-700 text-sm">
                Early morning or evening for peaceful darshan
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-black mb-2">Dress Code</h4>
              <p className="text-gray-700 text-sm">
                Modest clothing required, remove footwear before entering
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-black mb-2">How to Reach</h4>
              <p className="text-gray-700 text-sm">
                Accessible by road from {district.name} town center
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/temples/20th-century-temples/${districtSlug}`}>
            <button className="bg-primary text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-all duration-200">
              ← Back to {district.name} Temples
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
  );
}
