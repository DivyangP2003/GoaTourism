import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";

const hinduMonths = [
  "Chaitra",
  "Vaishakh",
  "Jestha",
  "Aashadh",
  "Shravan",
  "Bhadrapada",
  "Aashvin",
  "Kartik",
  "Margashirsh",
  "Paush",
  "Maagh",
  "Falgun",
];

const monthImages = {
  Chaitra: "/1.jpg",
  Vaishakh: "/festivals/vaishakh.jpg",
  Jestha: "/festivals/jestha.jpg",
  Aashadh: "/festivals/aashadh.jpg",
  Shravan: "/festivals/shravan.jpg",
  Bhadrapada: "/festivals/bhadrapada.jpg",
  Aashvin: "/festivals/aashvin.jpg",
  Kartik: "/festivals/kartik.jpg",
  Margashirsh: "/festivals/margashirsh.jpg",
  Paush: "/festivals/paush.jpg",
  Maagh: "/festivals/maagh.jpg",
  Falgun: "/festivals/falgun.jpg",
};

export default function FestivalsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 overflow-hidden mb-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/festivals-hero.jpg" // Replace with your actual image path
            alt="Hindu Festivals in Goa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* FESTIVALS Text Overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider drop-shadow-lg">
            FESTIVALS
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            href="/festivals"
            className="hover:text-primary transition-colors duration-200"
          >
            Festivals
          </Link>
        </div>

        {/* Months Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hinduMonths.map((month) => (
            <Link
              key={month}
              href={`/festivals/${month.toLowerCase()}`}
              className="group cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden w-full h-40 sm:h-48 md:h-52 lg:h-56 border border-transparent group-hover:border-yellow-400 group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={monthImages[month]}
                  alt={month}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold drop-shadow-md">
                  {month}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Celebrate Hindu Festivals Across Goa
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-8">
            Immerse yourself in the vibrant tapestry of Hindu festivals
            celebrated across Goa. From grand temple processions to traditional
            rituals and community feasts, each festival reflects the region's
            deep spiritual roots and cultural richness. Click on any festival to
            discover its unique customs, history, and the joyous spirit with
            which it is observed.
          </p>
        </div>

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <Link href="/">
            <button className="bg-primary text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-all duration-200">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
