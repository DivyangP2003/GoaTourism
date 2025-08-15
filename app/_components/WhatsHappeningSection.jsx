import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { events } from "@/data/events";
import Link from "next/link";

export default function WhatsHappeningSection() {
  return (
    <section className="py-12 sm:py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-gray-800 mb-3 sm:mb-4 font-serif">
            What's Happening
          </h2>
          <p className="text-[clamp(0.9rem,2vw,1.125rem)] text-gray-600 max-w-2xl mx-auto px-2">
            Stay updated with the latest events, festivals, and cultural
            celebrations in Goa
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#4A6604] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[0.65rem] sm:text-sm font-semibold">
                  Upcoming
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-[clamp(1rem,2vw,1.25rem)] font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-[#4A6604] transition-colors duration-200">
                  {event.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-1.5 sm:mb-2">
                  <Calendar size={14} className="mr-1.5 sm:mr-2" />
                  <span className="text-[0.75rem] sm:text-sm">
                    {event.date}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-2 sm:mb-4">
                  <MapPin size={14} className="mr-1.5 sm:mr-2" />
                  <span className="text-[0.75rem] sm:text-sm">
                    {event.location}
                  </span>
                </div>

                <p className="text-gray-600 text-[0.75rem] sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  {event.description}
                </p>

                <button className="w-full bg-[#98D204] hover:bg-[#4A6604] active:bg-[#4A6604] text-white py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 rounded-lg font-semibold text-[0.8rem] sm:text-[0.9rem] md:text-base transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Discover More */}
        <div className="text-center mt-6 md:mt-10">
          <Link href="/events">
            <button className="bg-[#FF7B00] hover:bg-[#F26419]/90 active:bg-[#F26419] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-[0.85rem] sm:text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
              View More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
