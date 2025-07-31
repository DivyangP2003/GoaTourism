import { MapPin } from "lucide-react";

export default function InteractiveMapSection() {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-black mb-3 sm:mb-4 font-serif">
            Interactive Map
          </h2>
          <p className="text-[clamp(0.9rem,2vw,1.125rem)] text-gray-600 max-w-2xl mx-auto px-2">
            Explore Goa's attractions, beaches, and heritage sites on our
            interactive map
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden">
          <div className="h-64 sm:h-80 md:h-[400px] lg:h-[500px] bg-[#FF7B00] flex items-center justify-center p-4">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-transparent rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300" />
              </div>
              <h3 className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold text-white mb-1 sm:mb-2">
                Interactive Map Coming Soon
              </h3>
              <p className="text-[clamp(0.8rem,2vw,1rem)] text-gray-300">
                We're working on bringing you an amazing interactive map
                experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
