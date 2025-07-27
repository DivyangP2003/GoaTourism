import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { festivalsData } from "@/data/festivals-data"
import { ChevronRight, Home } from "lucide-react"

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
}

export default function FestivalDetailPage({ params }) {
  const { month, festival: festivalSlug } = params
  const festivals = festivalsData[month]
  const monthName = monthNames[month]

  if (!festivals || !monthName) {
    notFound()
  }

  const festival = festivals.find((f) => f.name.toLowerCase().replace(/\s+/g, "-") === festivalSlug)

  if (!festival) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Festival Name */}
      <div className="relative h-96 overflow-hidden mb-12">
        <div className="absolute inset-0">
          <Image
            src="/festivals-hero.jpg" // Replace with a month/festival-specific image if needed
            alt={`Festival: ${festival.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider drop-shadow-lg">
            {festival.name}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
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
            className="hover:text-primary transition-colors duration-200"
          >
            {monthName}
          </Link>
                    <ChevronRight className="h-4 w-4" />
          <Link
            href={`/festivals/${monthName.toLowerCase()}/${festival.name.toLowerCase()}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {festival.name}
          </Link>
        </div>


        {/* Festival Details */}
        <div className="space-y-12">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {festival.description}
            </p>
          </section>

          {/* Significance */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Significance
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {festival.significance}
            </p>
          </section>

          {/* Date */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Date</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {festival.date}
            </p>
          </section>

          {/* Rituals */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Rituals & Traditions
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {festival.rituals.map((ritual, index) => (
                <li
                  key={index}
                  className="flex items-start text-lg text-gray-700"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></span>
                  {ritual}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-16 text-center">
          <Link href={`/festivals/${month}`}>
            <button className="bg-primary text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-secondary hover:text-white transition-all duration-200">
              ← Back to {monthName}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  const params = []

  Object.keys(festivalsData).forEach((month) => {
    festivalsData[month].forEach((festival) => {
      params.push({
        month: month,
        festival: festival.name.toLowerCase().replace(/\s+/g, "-"),
      })
    })
  })

  return params
}
