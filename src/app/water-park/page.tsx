import type { Metadata } from "next";
import { Waves, Wind, LifeBuoy, Baby, Droplets, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SectionHeading, CTABand } from "@/components/UI";
import { FeatureCards, RideChips } from "@/components/Blocks";
import { Reveal } from "@/components/Reveal";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Water Park",
  description:
    "Wave pools, high-speed flumes, lazy rivers and a kids' splash zone — the water park at Club Platinum near Delhi NCR.",
};

const features = [
  { icon: Waves, title: "Roaring wave pool", text: "A vast wave pool that swells from gentle ripples to surf-worthy sets on a timed cycle." },
  { icon: Wind, title: "High-speed flumes", text: "Twisting body slides and multi-lane racers that drop, spiral and launch you into the splash pool." },
  { icon: Droplets, title: "Lazy river", text: "Drift the slow circuit on a tube, sun on your face, with nowhere to be for a while." },
  { icon: Baby, title: "Kids' splash zone", text: "A shallow, gently-graded play area with tipping buckets and mini slides for little ones." },
  { icon: LifeBuoy, title: "Lifeguards on duty", text: "Trained lifeguards watch every pool, so grown-ups can relax as much as the kids." },
  { icon: ShieldCheck, title: "Clean & tested water", text: "Filtration and water quality checked through the day to keep every dip fresh and safe." },
];

const slides = [
  "Magic Twist",
  "Black Tunnel",
  "Multi-Lane Racers",
  "Cyclone Bowl",
  "Family Raft Slide",
  "Spiral Drop",
  "Wave Pool",
  "Lazy River",
  "Aqua Play Fort",
  "Rain Dance Arena",
];

export default function WaterParkPage() {
  return (
    <>
      <PageHero
        eyebrow="Splash"
        title="The Water Park"
        intro="From adrenaline flumes to a slow, sunlit drift — a full day of water, engineered for thrill-seekers and paddlers alike."
        image={img.waterSlides}
        seed="waterpark-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="What's inside"
            title="Every kind of wet, in one place"
            intro="Chase the big slides, float the lazy river, or let the kids run wild in the splash fort. It's all included on a single gate pass."
          />
          <div className="mt-14">
            <FeatureCards items={features} />
          </div>
        </div>
      </section>

      <section className="section pb-8">
        <div className="container-x">
          <RideChips title="Slides & attractions" items={slides} />
        </div>
      </section>

      <section className="section py-24 sm:py-28">
        <div className="container-x grid gap-8 sm:grid-cols-3">
          {[
            { k: "Rain dance", v: "DJ-led rain dance sessions through the day" },
            { k: "Changing rooms", v: "Lockers, showers and clean changing areas" },
            { k: "Poolside bites", v: "Snacks and cold drinks steps from the water" },
          ].map((x, i) => (
            <Reveal key={x.k} delay={i} className="glass rounded-2xl p-7">
              <p className="font-display text-xl font-semibold text-gradient-gold">{x.k}</p>
              <p className="mt-2 text-sm text-white/60">{x.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand title="Bring your swimsuit" subtitle="Day passes, group rates and stay-and-splash packages — ask us what fits your crew." />
    </>
  );
}
