import type { Metadata } from "next";
import Link from "next/link";
import { Users, Wifi, Wind, Coffee, Tv, Bath, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SmartImage from "@/components/SmartImage";
import { SectionHeading, CTABand } from "@/components/UI";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { img, amenities } from "@/data/site";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Contemporary rooms and suites with modern fittings, plush bedding and easy park access at Club Platinum Resort.",
};

const rooms = [
  {
    name: "Deluxe Room",
    image: img.roomDeluxe,
    seed: "room-deluxe",
    sleeps: "Up to 4 adults",
    text: "A spacious, light-filled room with contemporary furnishings and all the essentials for a restful night after the parks.",
    tags: ["King or twin beds", "Air-conditioned", "Ensuite bath"],
  },
  {
    name: "Premium Suite",
    image: img.roomSuite,
    seed: "room-suite",
    sleeps: "Up to 4 + lounge",
    text: "An elevated stay with a separate seating area, upgraded linens and thoughtful extras for those who like a little more room to unwind.",
    tags: ["Separate lounge", "Premium bedding", "Garden or pool view"],
  },
  {
    name: "Family Room",
    image: img.roomBed,
    seed: "room-family",
    sleeps: "Up to 6",
    text: "Built for the whole gang, with flexible bedding and space for everyone to spread out between adventures.",
    tags: ["Extra bedding", "Family-friendly layout", "Close to the parks"],
  },
];

const amenityIcons = [
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Wind, label: "Air-con" },
  { icon: Tv, label: "Smart TV" },
  { icon: Coffee, label: "Tea & coffee" },
  { icon: Bath, label: "Hot showers" },
  { icon: Users, label: "Room service" },
];

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay"
        title="Rooms & Suites"
        intro="The calm counterpoint to a day of thrills — contemporary rooms with plush bedding, modern fittings and the parks just outside your door."
        image={img.roomSuite}
        seed="rooms-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Where to rest"
            title="Sleep well, wake up to more fun"
            intro="Three room styles, one shared promise: crisp beds, quiet air-conditioning and everything within an easy stroll of the water."
          />

          <div className="mt-14 space-y-8">
            {rooms.map((r, idx) => (
              <Reveal key={r.name}>
                <div
                  className={`grid overflow-hidden rounded-[2rem] border border-white/10 bg-abyss/40 lg:grid-cols-2 ${
                    idx % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[280px] overflow-hidden">
                    <SmartImage src={r.image} seed={r.seed} alt={r.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8 sm:p-10">
                    <div className="flex items-center gap-2 text-sm text-aqua-light">
                      <Users className="h-4 w-4" /> {r.sleeps}
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-semibold text-white">{r.name}</h3>
                    <p className="mt-3 leading-relaxed text-white/65">{r.text}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/70">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link href="/contact" className="btn-gold mt-7">
                      Check availability <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-abyss py-20">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="In every room" title="Comfort as standard" />
          <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {amenityIcons.map((a) => (
              <StaggerItem key={a.label}>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-ink/40 p-6 text-center card-hover">
                  <a.icon className="h-6 w-6 text-aqua" />
                  <span className="text-sm text-white/70">{a.label}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {amenities.map((a) => (
              <span key={a} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Turn a day trip into a getaway" subtitle="Stay-and-play packages bundle your room with park access and meals." />
    </>
  );
}
