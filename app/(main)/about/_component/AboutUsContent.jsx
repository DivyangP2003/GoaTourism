import Image from "next/image"

export default function AboutUsContent() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-wide">ABOUT YUGAANTAR</h1>
        </div>

        {/* Section 1: Preserving Goa's Legacy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-black">Preserving Goa's Legacy, One Story at a Time</h2>
            <p className="text-lg text-black leading-relaxed">
              Founded in 2020, YugaantarGoa is a dedicated social media initiative committed to preserving, promoting,
              and educating about the rich heritage, vibrant culture, and layered history of Goa. With a vision to
              reconnect people—especially the younger generation—with Goa's timeless legacy, YugaantarGoa curates
              authentic content that highlights lesser-known historical narratives, cultural practices, traditional art
              forms, and forgotten landmarks.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Preserving Goa's Legacy"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Educational Trails */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center lg:order-1">
            <div className="w-full max-w-md h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Educational Trails and Documentation"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="space-y-6 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Bringing History to Life: Educational Trails and Documentation
            </h2>
            <p className="text-lg text-black leading-relaxed">
              Beyond its digital presence, YugaantarGoa actively engages in on-ground outreach. One of its key
              activities includes conducting educational heritage trails and interactive field visits to historically
              significant sites, especially designed for school students. These immersive experiences aim to ignite
              curiosity and instill pride in Goa's unique identity. Apart from this team YugaantarGoa is also
              documenting all the lesser known historical and cultural facts of Goa. Inquisition of Goa is one of the
              broader topic documented by YugaantarGoa.
            </p>
          </div>
        </div>

        {/* Section 3: Future Generations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Keeping Goa's Spirit Alive for Future Generations
            </h2>
            <p className="text-lg text-black leading-relaxed">
              Through a blend of research-driven content, community involvement, and educational initiatives,
              YugaantarGoa continues to serve as a vibrant platform that bridges the past with the present—ensuring that
              the spirit of Goa lives on for generations to come.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-64 bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Keeping Goa's Spirit Alive"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center bg-gray-50 p-8 rounded-2xl border border-gray-300">
          <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
          <p className="text-lg text-black leading-relaxed max-w-4xl mx-auto">
            To preserve, promote, and share the rich cultural heritage of Goa through innovative digital storytelling,
            educational initiatives, and community engagement, ensuring that future generations remain connected to
            their roots and proud of their unique Goan identity.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-black mb-6">Join Our Journey</h3>
          <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
            Be part of our mission to preserve Goa's heritage. Follow our stories, participate in our trails, and help
            us keep the spirit of Goa alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-black px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 hover:bg-secondary hover:text-white">
              Follow Our Journey
            </button>
            <button className="bg-accent text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 hover:bg-destructive">
              Join Heritage Trails
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
