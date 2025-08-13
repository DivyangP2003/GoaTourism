import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-3 gap-6 tiny:grid-cols-2">
        
        {/* Brand Section */}
        <div className="text-xs sm:text-sm md:text-base">
          <div className="flex items-center space-x-2 mb-2">
            <Image
              src="/logo.png"
              alt="YUGAANTAR Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-base sm:text-lg font-bold text-[#F26419]">YUGAANTAR</span>
          </div>
          <p className="leading-snug">
            Discover the rich heritage, culture, and traditions of Konkan Goa
            through our comprehensive guide to temples, festivals, monuments,
            and archaeological sites.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-xs sm:text-sm md:text-base">
          <h3 className="font-bold mb-2 uppercase">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-[#F26419]">About Us</Link></li>
            <li><Link href="/temples" className="hover:text-[#F26419]">Temples</Link></li>
            <li><Link href="/festivals" className="hover:text-[#F26419]">Festivals</Link></li>
            <li><Link href="/monuments" className="hover:text-[#F26419]">Monuments</Link></li>
            <li><Link href="/archaeological-sites" className="hover:text-[#F26419]">Archeological Sites</Link></li>
            <li><Link href="#" className="hover:text-[#F26419]">Gallery</Link></li>
            <li><Link href="#" className="hover:text-[#F26419]">Interactive Map</Link></li>
          </ul>
        </div>

        {/* Explore
        <div className="text-xs sm:text-sm md:text-base">
          <h3 className="font-bold mb-2 uppercase">Explore</h3>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-[#F26419]">About Us</Link></li>
            <li><Link href="/temples" className="hover:text-[#F26419]">Temples</Link></li>
            <li><Link href="/festivals" className="hover:text-[#F26419]">Festivals</Link></li>
            <li><Link href="/monuments" className="hover:text-[#F26419]">Monuments</Link></li>
            <li><Link href="/archaeological-sites" className="hover:text-[#F26419]">Archeological Sites</Link></li>
            <li><Link href="#" className="hover:text-[#F26419]">Gallery</Link></li>
            <li><Link href="#" className="hover:text-[#F26419]">Interactive Map</Link></li>
          </ul>
        </div> */}

        {/* Contact Info */}
        <div className="text-xs sm:text-sm md:text-base">
          <h3 className="font-bold mb-2 uppercase">Contact Info</h3>
          <p><span className="text-gray-500">Email:</span> <br/> yugaantargoa1998@gmail.com</p>
          <p className="mt-2"><span className="text-gray-500">Phone:</span> <br/> 79 7293 4399</p>
          <p className="mt-2"><span className="text-gray-500">Location:</span> <br/> 123 Heritage Street Panaji, Goa 403001</p>

          <div className="flex space-x-2 mt-4">
            <a href="#" className="bg-orange-500 p-2 rounded"><Facebook className="w-4 h-4 text-white" /></a>
            <a href="#" className="bg-orange-500 p-2 rounded"><Instagram className="w-4 h-4 text-white" /></a>
            <a href="#" className="bg-orange-500 p-2 rounded"><Linkedin className="w-4 h-4 text-white" /></a>
            <a href="#" className="bg-orange-500 p-2 rounded"><Youtube className="w-4 h-4 text-white" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-4 py-3 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm md:text-base text-gray-500 px-2 sm:px-4 lg:px-8">
        <p>© {new Date().getFullYear()} YUGAANTAR. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" className="hover:text-[#F26419]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#F26419]">Terms of Service</Link>
          <Link href="#" className="hover:text-[#F26419]">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}
