import type { Metadata } from "next";
import { Presentation, Users, Bed, Utensils, Wifi, CalendarCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SectionHeading, CTABand } from "@/components/UI";
import { FeatureCards, PackageCards, SplitFeature } from "@/components/Blocks";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Corporate Retreats",
  description:
    "Team offsites, residential conferences and incentive stays near Delhi NCR — parks, banquets and boardrooms in one place.",
};

const features = [
  { icon: Presentation, title: "Conference-ready", text: "A boardroom and banquet halls with AV, projection and flexible seating for 20 to 400." },
  { icon: Users, title: "Team building", text: "Facilitated adventure challenges and park activities that turn colleagues into a crew." },
  { icon: Bed, title: "Residential stays", text: "On-site rooms mean your offsite actually stays on-site — no shuttling, no lost time." },
  { icon: Utensils, title: "Curated catering", text: "Buffets, live counters and custom menus for coffee breaks, lunches and gala dinners." },
  { icon: Wifi, title: "Connectivity", text: "Wi-Fi and power throughout, so the work parts run as smoothly as the fun parts." },
  { icon: CalendarCheck, title: "One point of contact", text: "A dedicated coordinator handles the logistics end to end, from agenda to après-work." },
];

const packages = [
  {
    name: "Day Offsite",
    price: "On request",
    features: ["Half or full-day venue", "Tea, coffee & lunch", "Team activity slot", "AV & projector", "Parking for all"],
  },
  {
    name: "Residential Conference",
    price: "On request",
    highlight: true,
    features: ["Overnight stay", "Conference hall + AV", "All meals & breaks", "Adventure team-building", "Water & amusement park access"],
  },
  {
    name: "Incentive & Leisure",
    price: "On request",
    features: ["Reward-trip package", "Premium rooms", "Gala dinner", "Full park access", "Custom itinerary"],
  },
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="For teams"
        title="Corporate Retreats"
        intro="Offsites people actually enjoy. Meet, bond and unwind in one green address — with the parks, the food and the beds all on the same grounds."
        image={img.corporate}
        seed="corporate-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why teams choose us"
            title="Work sessions by day, memories by evening"
            intro="Run a productive morning in the boardroom, break for a team challenge in the adventure park, then close the day over a gala dinner — all without leaving the property."
          />
          <div className="mt-14">
            <FeatureCards items={features} />
          </div>
        </div>
      </section>

      <section className="section py-8">
        <SplitFeature
          eyebrow="The venue"
          title="Rooms that mean business"
          text="Our conference hall is a long-time favourite of blue-chip teams for its calm, focused setting and dependable AV. Pair it with the banquet halls for larger plenaries, or break out into the grounds for workshops in the open air."
          points={["Boardroom & plenary setups", "Projector, screen & sound", "Flexible layouts", "Break-out spaces"]}
          image={img.conference}
          seed="corporate-conf"
        />
      </section>

      <section className="section bg-abyss py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Packages" title="Pick a starting point" intro="Every offsite is different — these are our common formats, all fully customisable to your agenda and headcount." />
          <div className="mt-14">
            <PackageCards items={packages} />
          </div>
        </div>
      </section>

      <CTABand title="Let's plan your offsite" subtitle="Tell us your dates and headcount — we'll send a tailored proposal quickly." />
    </>
  );
}
