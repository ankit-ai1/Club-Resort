import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import HorizontalShowcase from "@/components/HorizontalShowcase";
import { SectionHeading, CTABand } from "@/components/UI";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual tour of Club Platinum Resort — the water park, rides, adventure zone, rooms and dining.",
};

const showcase = [
  { src: img.heroPool, seed: "sc1", tag: "Resort", caption: "Twelve acres, one gate pass" },
  { src: img.waterSlides, seed: "sc2", tag: "Water Park", caption: "Twisting flumes, real adrenaline" },
  { src: img.amusement, seed: "sc3", tag: "Rides", caption: "Unlimited spins and swings" },
  { src: img.roomSuite, seed: "sc4", tag: "Rooms", caption: "The calm after the splash" },
  { src: img.zipline, seed: "sc5", tag: "Adventure", caption: "Test your nerve, green canopy above" },
  { src: img.banquet, seed: "sc6", tag: "Dining", caption: "Evenings that linger" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="See it first"
        title="The Gallery"
        intro="A window into a day at Club Platinum — the splashes, the rides, the quiet corners and the feasts."
        image={img.poolAerial}
        seed="gallery-hero"
      />

      <section className="section pt-16 sm:pt-20">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Scroll to explore"
            title="A slower look, six ways"
          />
        </div>
      </section>

      <HorizontalShowcase items={showcase} />

      <section className="section py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="The full library" title="Every corner, filterable" />
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>

      <CTABand title="Prefer to see it in person?" subtitle="Book a visit, or wander every corner first with our 360° virtual tour." />
    </>
  );
}
