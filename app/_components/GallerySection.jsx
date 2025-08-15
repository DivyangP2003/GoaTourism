"use client";

import { useState, useEffect } from "react";
import { galleryImages } from "@/data/gallery";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "All",
  "Temple",
  "Festival",
  "Culture",
  "Archaeology",
  "Heritage",
  "Nature",
];

const categoryLabels = {
  All: "Complete Collection",
  Temple: "Sacred Temples",
  Festival: "Vibrant Festivals",
  Culture: "Cultural Heritage",
  Archaeology: "Archaeological Wonders",
  Heritage: "Historical Legacy",
  Nature: "Natural Beauty",
};

const categoryColors = {
  Temple: "bg-amber-100 text-amber-800 border-amber-200",
  Festival: "bg-rose-100 text-rose-800 border-rose-200",
  Culture: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Archaeology: "bg-stone-100 text-stone-800 border-stone-200",
  Heritage: "bg-blue-100 text-blue-800 border-blue-200",
  Nature: "bg-green-100 text-green-800 border-green-200",
};

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let filtered = galleryImages;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (image) => image.category === selectedCategory
      );
    }
    setFilteredImages(filtered);
  }, [selectedCategory]);

  const visibleImages = filteredImages.slice(0, 8);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex =
        currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-3 tracking-wide">
            GALLERY
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the rich heritage and vibrant culture of Goa
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-sm font-medium transition-all duration-200 hover:scale-105
   rounded-full border-2
    ${
      selectedCategory === category
        ? "bg-[#98D204] text-white border-[#98D204] hover:bg-[#4A6604] active:bg-[#4A6604] shadow-lg"
        : "backdrop-blur-sm bg-[#D6D6D6] text-black border-none hover:border-[#98D204] hover:bg-[#4A6604] hover:text-white"
    }
  `}
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
          {visibleImages.map((image) => (
            <Card
              key={image.id}
              className="bg-gray-500/50 opacity-100 border-none break-inside-avoid cursor-pointer group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.05] p-0"
              onClick={() => openLightbox(image)}
            >
              <div className="relative">
                <img
                  src={
                    image.image ||
                    `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(
                      image.title
                    )}`
                  }
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      categoryColors[image.category] ||
                      "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {image.category}
                  </span>
                </div>

                {/* Title - hidden until hover */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {image.title}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        {filteredImages.length > 8 && (
          <div className="text-center mt-8">
            <Link href="/gallery">
              <button className="bg-[#FF7B00] hover:bg-[#F26419] active:bg-[#F26419] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-lg transition-all hover:scale-105 cursor-pointer">
                View More
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Image */}
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    categoryColors[selectedImage.category] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {selectedImage.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
