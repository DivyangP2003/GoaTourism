import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { festivalsData } from "@/data/festivals-data";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

const monthNames = {
  chaitra: "Chaitra",
  vaishakh: "Vaishakh",
  jestha: "Jestha",
  aashadh: "Aashadh",
  shravan: "Shravan",
  bhadrapada: "Bhadrapada",
  aashvin: "Aashvin",
  kartik: "Kartik",
  margashirsh: "Margashirsh",
  paush: "Paush",
  maagh: "Maagh",
  falgun: "Falgun",
};

export default function MonthFestivalsPage({ params }) {
  const { month } = params;
  const festivals = festivalsData[month];
  const monthName = monthNames[month];

  if (!festivals || !monthName) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 overflow-hidden mb-12">
        <div className="absolute inset-0">
          <Image
            src="/festivals-hero.jpg" // You can make it dynamic per month if needed
            alt={`Festivals in ${monthName}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider drop-shadow-lg text-center">
            FESTIVALS IN {monthName.toUpperCase()}
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
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/festivals/${monthName.toLowerCase()}`}
            className="hover:text-primary transition-colors duration-200 text-[#4A6604] font-semibold"
          >
            {monthName}
          </Link>
        </div>

        {/* Festivals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {festivals.map((festival) => (
            <Link
              key={festival.name}
              href={`/festivals/${month}/${festival.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="group cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden w-full h-40 sm:h-48 md:h-52 lg:h-56 border border-transparent group-hover:border-[#ff7b00] group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={festival.image || "/fallback.jpg"} // fallback image if not present
                  alt={festival.name}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold drop-shadow-md text-center px-2">
                  {festival.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Back Link */}
      <div className="mb-12 text-center">
        <Link href="/festivals">
          <div className="flex justify-center">
            <button className="flex items-center gap-2 bg-[#FF7B00] hover:bg-[#F26419] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
              <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              Back To Festivals
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(festivalsData).map((month) => ({
    month,
  }));
}
