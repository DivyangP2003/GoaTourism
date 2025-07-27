"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Map, ImageIcon, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Temples", href: "/temples" },
    { name: "Festivals", href: "/festivals" },
    { name: "Monuments", href: "/monuments" },
    { name: "Archaeological Sites", href: "/archaeological-sites" },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="YUGAANTAR Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-amber-800">YUGAANTAR</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 ">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 font-semibold hover:text-amber-600 px-3 py-2 text-sm transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
              <Search size={20} />
            </button>
            <button className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
              <Map size={20} />
            </button>
            <button className="text-gray-700 hover:text-amber-600 transition-colors duration-200">
              <ImageIcon size={20} />
            </button>

            {/* Mobile menu button */}
            <button className="lg:hidden text-gray-700 font-semibold hover:text-amber-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                  className="text-gray-700 font-semibold hover:text-amber-600 block px-3 py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
