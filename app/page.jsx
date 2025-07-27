import { destinations } from "@/data/destinations";
import DestinationsSection from "./_components/DestinationsSection";
import VideoHero from "./_components/VideoHero";
import HiddenGemsSection from "./_components/HiddenGemsSection";
import { hiddenGems } from "@/data/hiddenGems";
import { events } from "@/data/events";
import WhatsHappeningSection from "./_components/WhatsHappeningSection";
import InteractiveMapSection from "./_components/InteractiveMapSection";
import GallerySection from "./_components/GallerySection";
import { galleryImages } from "@/data/gallery";
import ContactSection from "./_components/ContactSection";

export default function HomePage() {
  return (
    <div>
      <VideoHero />
      <DestinationsSection
        destinations={destinations}
        title="DESTINATIONS"
        subtitle="Places to visit on your next trip to Goa"
      />
      <HiddenGemsSection hiddenGems={hiddenGems} />
      <WhatsHappeningSection events={events} />
      <InteractiveMapSection />
      <GallerySection images={galleryImages} />
      <ContactSection />
    </div>
  )
}
