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
} from "lucide-react";
import { goaDistricts } from "@/data/goaDistricts";
import { ancientMonumentsByDistrict } from "@/data/monuments";

export default function MonumentDetailPage() {
  const params = useParams();
  const districtSlug = params.district;
  const monumentSlug = params.monument;

  // Find the district and monument data
  const district = goaDistricts.find((d) => d.slug === districtSlug);
  const monuments = ancientMonumentsByDistrict[districtSlug] || [];
  const monument = monuments.find((t) => t.slug === monumentSlug);

  if (!district || !monument) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Monument Not Found
          </h1>
          <Link href={`/monuments/${districtSlug}`}>
            <button className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all duration-200">
              Back to {district?.name || "District"} Monuments
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
            src={monument.image || "/placeholder.svg"}
            alt={monument.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold tracking-wider drop-shadow-lg mb-4">
              {monument.name.toUpperCase()}
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
            href="/monuments"
            className="hover:text-primary transition-colors duration-200"
          >
            Monuments
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/monuments/${districtSlug}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {district.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#4A6604] font-semibold">{monument.name}</span>
        </div>

        {/* monument Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* monument Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">
                {monument.name}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {monument.description}
              </p>
            </div>

            {/* monument Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Significance</h4>
                  <p className="text-gray-700">{monument.significance}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h4 className="font-semibold text-black">Location</h4>
                  <p className="text-gray-700">{monument.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* monument Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={monument.image || "/placeholder.svg"}
                  alt={monument.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">
            Visiting Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
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

            {/* <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-black mb-2">Dress Code</h4>
              <p className="text-gray-700 text-sm">
                Modest clothing required, remove footwear before entering
              </p>
            </div> */}

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
          <Link href={`/monuments/${districtSlug}`}>
            <button className="bg-primary text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-all duration-200">
              ← Back to {district.name} Monuments
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
