import type { Metadata } from "next";
import { Ticket, Gauge, Users, Baby, Music, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SectionHeading, CTABand } from "@/components/UI";
import { FeatureCards, RideChips } from "@/components/Blocks";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Amusement Park",
  description:
    "Unlimited rides for every age — spinners, swings, thrillers and gentle carousels at Club Platinum's amusement park near Delhi NCR.",
};

const features = [
  { icon: Ticket, title: "Unlimited rides", text: "One pass, no counting tokens — hop on again and again until your legs give out." },
  { icon: Gauge, title: "Full-throttle thrillers", text: "Break dance, disco spinners and drop rides for those who like their stomach in their throat." },
  { icon: Baby, title: "Gentle kiddie rides", text: "Carousels, mini-trains and soft spinners sized and slowed for the smallest guests." },
  { icon: Users, title: "Rides to share", text: "Plenty of two- and four-seaters, so friends and families ride together." },
  { icon: Music, title: "Music & lights", text: "A soundtrack and light show that turns every evening into a mini carnival." },
  { icon: Sparkles, title: "Games & arcade", text: "Skill games and an arcade corner for prizes, bragging rights and rainy-hour fun." },
];

const rides = [
  "Break Dance",
  "Disco Spinner",
  "Mono Cycle",
  "Jumping Frog",
  "Racing Horses",
  "Merry-Go-Round",
  "Baby Train",
  "Pirate Swing",
  "Bumper Cars",
  "Drop Tower",
  "Kiddie Carousel",
  "Sky Wheel",
];

export default function AmusementParkPage() {
  return (
    <>
      <PageHero
        eyebrow="Play"
        title="The Amusement Park"
        intro="Twenty-plus rides that spin, soar and swing — from full-throttle thrillers to gentle carousels for the little ones."
        image={img.amusement}
        seed="amusement-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Ride all day"
            title="Unlimited rides, zero token math"
            intro="Your pass unlocks every ride, every time. Chase the thrillers, then wind down on the carousel — the choice resets with every loop."
          />
          <div className="mt-14">
            <FeatureCards items={features} />
          </div>
        </div>
      </section>

      <section className="section pb-24">
        <div className="container-x">
          <RideChips title="The ride line-up" items={rides} />
        </div>
      </section>

      <CTABand title="Ride till you drop" subtitle="Group discounts for schools, colleges and big families — get a quote in minutes." />
    </>
  );
}
