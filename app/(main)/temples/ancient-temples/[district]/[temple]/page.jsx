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
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { goaDistricts } from "@/data/goaDistricts";
import { ancientTemplesByDistrict } from "@/data/ancientTemplesDitrictWise";
import { ancientTempleWikiData } from "@/data/ancientTempleWikiData";

export default function TempleDetailPage() {
  const params = useParams();
  const districtSlug = params.district;
  const templeSlug = params.temple;
  const [activeSection, setActiveSection] = useState("introduction");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const district = goaDistricts.find((d) => d.slug === districtSlug);
  const temples = ancientTemplesByDistrict[districtSlug] || [];
  const temple = temples.find((t) => t.slug === templeSlug);
  const wikiData = ancientTempleWikiData[templeSlug];

  // ✅ Removed similar-temples from TOC
  const sections = [
    { id: "introduction", title: "Introduction" },
    ...(wikiData?.history ? [{ id: "history", title: "History" }] : []),
    ...(wikiData?.architecture
      ? [{ id: "architecture", title: "Architecture" }]
      : []),
    ...(wikiData?.deity ? [{ id: "deity", title: "Deity and Worship" }] : []),
    ...(wikiData?.festivals ? [{ id: "festivals", title: "Festivals" }] : []),
    { id: "visiting-info", title: "Visiting Information" },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!district || !temple) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Temple Not Found
          </h1>
          <Link href={`/temples/ancient-temples/${districtSlug}`}>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200">
              Back to {district?.name || "District"} Temples
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      <div className="relative h-64 overflow-hidden mb-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={temple.image || "/placeholder.svg"}
            alt={`${temple.name.toUpperCase()}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Title Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider drop-shadow-lg text-center">
            {temple.name.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
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
              href={`/temples/ancient-temples/${districtSlug}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {district.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[#4A6604] font-semibold">{temple.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-transparent border border-gray-200 rounded-lg p-4 sticky top-8">
              <h3 className="font-bold text-lg text-black mb-4 border-b border-gray-300 pb-2">
                Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200 cursor-pointer border  
                      ${
                        activeSection === section.id
                          ? "bg-white text-[#ff7b00] font-bold border-[#ff7b00]"
                          : "text-[#5C5B5B] font-bold border-transparent hover:border-[#ff7b00] hover:text-[#ff7b00]"
                      }`}
                  >
                    <span
                      className={`mr-2 transition-colors duration-200 
                        ${
                          activeSection === section.id
                            ? "text-[#ff7b00]"
                            : "text-[#5C5B5B] group-hover:text-[#ff7b00]"
                        }`}
                    >
                      {index + 1}.
                    </span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              {/* Image */}
              <div className="lg:w-1/3">
                <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={temple.image || "/placeholder.svg"}
                    alt={temple.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="lg:w-2/3">
                <div className="bg-white border-none rounded-lg p-6 shadow-lg">
                  <h3 className="font-bold text-xl text-black mb-4 text-center border-b border-gray-300 pb-2">
                    {temple.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-[#4A6604] mt-1" />
                      <div>
                        <span className="font-semibold">Deity:</span>
                        <p>{temple.deity}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-[#4A6604] mt-1" />
                      <div>
                        <span className="font-semibold">Established:</span>
                        <p>{temple.established}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-[#4A6604] mt-1" />
                      <div>
                        <span className="font-semibold">Location:</span>
                        <p>{temple.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-[#4A6604] mt-1" />
                      <div>
                        <span className="font-semibold">Timings:</span>
                        <p>
                          {wikiData?.visitingInfo?.timings || temple.timings}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              <section id="introduction">
                <h2 className="text-3xl font-bold mb-6 border-b-1 border-[#E0E0E0]  pb-2">
                  Introduction
                </h2>
                <p>{wikiData?.introduction || temple.description}</p>
              </section>

              {wikiData?.history && (
                <section id="history">
                  <h2 className="text-3xl font-bold mb-6 border-b-1 border-[#E0E0E0] pb-2">
                    {wikiData.history.title}
                  </h2>
                  <p>{wikiData.history.content}</p>
                </section>
              )}

              {wikiData?.architecture && (
                <section id="architecture">
                  <h2 className="text-3xl font-bold mb-6 border-b-1 border-[#E0E0E0] pb-2">
                    {wikiData.architecture.title}
                  </h2>
                  <p>{wikiData.architecture.content}</p>
                </section>
              )}

              {wikiData?.deity && (
                <section id="deity">
                  <h2 className="text-3xl font-bold mb-6 border-b-1 border-[#E0E0E0] pb-2">
                    {wikiData.deity.title}
                  </h2>
                  <p>{wikiData.deity.content}</p>
                </section>
              )}

              {wikiData?.festivals && (
                <section id="festivals">
                  <h2 className="text-3xl font-bold mb-6 border-b-1 border-[#E0E0E0] pb-2">
                    {wikiData.festivals.title}
                  </h2>
                  <p>{wikiData.festivals.content}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {temple.festivals.map((festival, i) => (
                      <span
                        key={i}
                        className="bg-[#4A6604] text-white px-3 py-1 rounded-full text-sm"
                      >
                        {festival}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <section id="visiting-info">
                <h2 className="text-3xl font-bold mb-6 border-b-1 border-[#E0E0E0] pb-2">
                  Visiting Information
                </h2>
                {wikiData?.visitingInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Best Time to Visit:</h4>
                        <p>{wikiData.visitingInfo.bestTimeToVisit}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Dress Code:</h4>
                        <p>{wikiData.visitingInfo.dressCode}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">How to Reach:</h4>
                      <p>{wikiData.visitingInfo.howToReach}</p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Similar Temples Full Width */}
      {wikiData?.similarTemples && (
        <div
          className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-repeat-x"
          style={{
            backgroundImage: "url('/Union.svg')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        >
          {" "}
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 border-none pb-2">
              Similar Temples
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wikiData.similarTemples.map((similarTemple, i) => (
                <Link
                  key={i}
                  href={`/temples/ancient-temples/${districtSlug}/${similarTemple.slug}`}
                  className="group"
                >
                  <div className="border-none rounded-lg p-4 hover:shadow-lg transition">
                    <div className="relative h-32 mb-3 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={similarTemple.image || "/placeholder.svg"}
                        alt={similarTemple.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <h4 className="font-semibold text-black mb-2 group-hover:text-[#4A6604]">
                      {similarTemple.name}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {similarTemple.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="flex justify-center py-12 border-none">
        <Link href={`/temples/ancient-temples/${districtSlug}`}>
          <button className="flex items-center gap-2 bg-[#FF7B00] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#F26419] transition">
            <ArrowLeft className="h-5 w-5" />
            Back to {district.name} Temples
          </button>
        </Link>
      </div>
    </div>
  );
}
