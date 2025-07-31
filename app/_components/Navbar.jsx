"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Map, ImageIcon, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { name: "About Us", href: "/about" },
    { name: "Temples", href: "/temples" },
    { name: "Festivals", href: "/festivals" },
    { name: "Monuments", href: "/monuments" },
    { name: "Archaeological Sites", href: "/archaeological-sites" },
  ];

  const getActiveClass = (href) =>
    pathname === href
      ? "text-[#F26419] underline decoration-[#F26419] decoration-[5px] underline-offset-4"
      : "text-black";

  const iconActive = {
    search: pathname.startsWith("/search"),
    map: pathname.startsWith("/map"),
    image: pathname.startsWith("/gallery"),
  };

  // ✅ Detect Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-black/15 backdrop-blur-md text-white hover:bg-white hover:text-black"
          : "bg-white text-black"
      }`}
    >
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="YUGAANTAR Logo"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
            <span className="text-2xl font-bold text-[#F26419]">YUGAANTAR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-semibold px-3 py-2 text-sm transition-colors duration-200
                  hover:text-[#FF7B00] hover:underline hover:decoration-[#FF7B00] hover:decoration-[5px] hover:underline-offset-4
                  ${getActiveClass(item.href)}
                  ${
                  isScrolled? " hover:text-[#F26419]":"text-black" }
                  `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/search">
              <button
                aria-label="Search"
                className={`px-1 transition-colors duration-200
                  hover:text-[#FF7B00] hover:underline hover:decoration-[#FF7B00] hover:decoration-[5px] hover:underline-offset-4
                  ${
                    iconActive.search
                      ? "text-[#F26419] underline decoration-[#F26419] decoration-[5px] underline-offset-4"
                      : "text-black"
                  }`}
              >
                <Search size={20} />
              </button>
            </Link>

            <Link href="/map">
              <button
                aria-label="Map"
                className={`px-1 transition-colors duration-200
                  hover:text-[#FF7B00] hover:underline hover:decoration-[#FF7B00] hover:decoration-[5px] hover:underline-offset-4
                  ${
                    iconActive.map
                      ? "text-[#F26419] underline decoration-[#F26419] decoration-[5px] underline-offset-4"
                      : "text-black"
                  }`}
              >
                <Map size={20} />
              </button>
            </Link>

            <Link href="/gallery">
              <button
                aria-label="Gallery"
                className={`px-1 transition-colors duration-200
                  hover:text-[#FF7B00] hover:underline hover:decoration-[#FF7B00] hover:decoration-[5px] hover:underline-offset-4
                  ${
                    iconActive.image
                      ? "text-[#F26419] underline decoration-[#F26419] decoration-[5px] underline-offset-4"
                      : "text-black"
                  }`}
              >
                <ImageIcon size={20} />
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 font-semibold hover:text-amber-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-semibold block px-3 py-2 text-base transition-colors duration-200
                    hover:text-[#FF7B00] hover:underline hover:decoration-[#FF7B00] hover:decoration-[5px] hover:underline-offset-4
                    ${getActiveClass(item.href)}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
