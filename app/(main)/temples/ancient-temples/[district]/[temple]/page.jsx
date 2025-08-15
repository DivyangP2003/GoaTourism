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

  // Find the district and temple data
  const district = goaDistricts.find((d) => d.slug === districtSlug);
  const temples = ancientTemplesByDistrict[districtSlug] || [];
  const temple = temples.find((t) => t.slug === templeSlug);
  const wikiData = ancientTempleWikiData[templeSlug];

  // Table of contents sections
  const sections = [
    { id: "introduction", title: "Introduction" },
    ...(wikiData?.history ? [{ id: "history", title: "History" }] : []),
    ...(wikiData?.architecture
      ? [{ id: "architecture", title: "Architecture" }]
      : []),
    ...(wikiData?.deity ? [{ id: "deity", title: "Deity and Worship" }] : []),
    ...(wikiData?.festivals ? [{ id: "festivals", title: "Festivals" }] : []),
    { id: "visiting-info", title: "Visiting Information" },
    ...(wikiData?.similarTemples
      ? [{ id: "similar-temples", title: "Similar Temples" }]
      : []),
  ];

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setSidebarOpen(false);
    }
  };

  // Handle scroll spy
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
      <div className="bg-gray-300 py-16 h-64">
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider drop-shadow-lg text-center">
            {temple.name.toUpperCase()}
          </h1>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/temples"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Temples
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/temples/ancient-temples"
              className="hover:text-blue-600 transition-colors duration-200"
            >
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

      {/* <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-4xl font-bold text-black mb-4">{temple.name}</h2> */}

      {/* Mobile menu button */}
      {/* <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden bg-gray-100 p-2 rounded-lg">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Table of Contents Sidebar */}
          <div
            className={`${
              sidebarOpen ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sticky top-8">
              <h3 className="font-bold text-lg text-black mb-4 border-b border-gray-300 pb-2">
                Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200 cursor-pointer border ${
                      activeSection === section.id
                        ? "bg-gray-50 text-[#ff7b00] font-bold border-[#ff7b00]"
                        : "text-black font-bold border-transparent hover:border-[#ff7b00]"
                    }`}
                  >
                    <span className="text-black mr-2">{index + 1}. </span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row gap-8 mb-8">
              {/* Temple Image */}
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

              {/* Temple Info Box */}
              <div className="lg:w-2/3">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 h-fit">
                  <h3 className="font-bold text-xl text-black mb-4 text-center border-b border-gray-300 pb-2">
                    {temple.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900 block">
                          Deity:
                        </span>
                        <p className="text-gray-700">{temple.deity}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900 block">
                          Established:
                        </span>
                        <p className="text-gray-700">{temple.established}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900 block">
                          Location:
                        </span>
                        <p className="text-gray-700">{temple.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900 block">
                          Timings:
                        </span>
                        <p className="text-gray-700">
                          {wikiData?.visitingInfo?.timings || temple.timings}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section id="introduction" className="scroll-mt-8">
                <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
                  Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed text-justify text-lg">
                  {wikiData?.introduction || temple.description}
                </p>
              </section>

              {/* History Section */}
              {wikiData?.history && (
                <section id="history" className="scroll-mt-8">
                  <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
                    {wikiData.history.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify text-lg">
                    {wikiData.history.content}
                  </p>
                </section>
              )}

              {/* Architecture Section */}
              {wikiData?.architecture && (
                <section id="architecture" className="scroll-mt-8">
                  <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
                    {wikiData.architecture.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify text-lg">
                    {wikiData.architecture.content}
                  </p>
                </section>
              )}

              {/* Deity Section */}
              {wikiData?.deity && (
                <section id="deity" className="scroll-mt-8">
                  <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
                    {wikiData.deity.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify text-lg">
                    {wikiData.deity.content}
                  </p>
                </section>
              )}

              {/* Festivals Section */}
              {wikiData?.festivals && (
                <section id="festivals" className="scroll-mt-8">
                  <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
                    {wikiData.festivals.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify text-lg">
                    {wikiData.festivals.content}
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-black mb-2">
                      Major Festivals:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {temple.festivals.map((festival, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {festival}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Visiting Information Section */}
              <section id="visiting-info" className="scroll-mt-8">
                <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
                  Visiting Information
                </h2>
                {wikiData?.visitingInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-black mb-2">
                          Best Time to Visit:
                        </h4>
                        <p className="text-gray-700">
                          {wikiData.visitingInfo.bestTimeToVisit}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-black mb-2">
                          Dress Code:
                        </h4>
                        <p className="text-gray-700">
                          {wikiData.visitingInfo.dressCode}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-2">
                        How to Reach:
                      </h4>
                      <p className="text-gray-700">
                        {wikiData.visitingInfo.howToReach}
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Similar Temples Section */}
              {wikiData?.similarTemples && (
                <section id="similar-temples" className="scroll-mt-8">
                  <h2 className="text-3xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
                    Similar Temples
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wikiData.similarTemples.map((similarTemple, index) => (
                      <Link
                        key={index}
                        href={`/temples/ancient-temples/${districtSlug}/${similarTemple.slug}`}
                        className="group"
                      >
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                          <div className="relative h-32 mb-3 bg-gray-100 rounded overflow-hidden">
                            <Image
                              src={similarTemple.image || "/placeholder.svg"}
                              alt={similarTemple.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <h4 className="font-semibold text-black mb-2 group-hover:text-blue-600 transition-colors">
                            {similarTemple.name}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {similarTemple.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-gray-200">
              <Link href={`/temples/ancient-temples/${districtSlug}`}>
                <div className="flex justify-center">
                  <button
                    className="
          flex items-center gap-2
          bg-[#FF7B00] 
          text-white 
          px-8 py-3 
          rounded-lg 
          font-semibold 
          hover:bg-[#FF7B00] 
          active:bg-[#F26419]
          transition-colors 
          duration-200
        "
                  >
                    <ArrowLeft className="h-5 w-5 transition-transform duration-200" />
                    Back to {district.name} Temples
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
