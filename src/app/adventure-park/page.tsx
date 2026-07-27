import type { Metadata } from "next";
import { Mountain, Cable, Footprints, Target, HardHat, TreePine } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SectionHeading, CTABand } from "@/components/UI";
import { FeatureCards, SplitFeature } from "@/components/Blocks";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Adventure Park",
  description:
    "Rope courses, ziplines, climbing walls and team challenges at Club Platinum's open-air adventure park near Delhi NCR.",
};

const features = [
  { icon: Cable, title: "Zipline runs", text: "Clip in and glide across the green on our cable runs — a rush that ends in a grin." },
  { icon: Footprints, title: "Rope courses", text: "Wobbly bridges, cargo nets and balance beams strung between posts to test your nerve." },
  { icon: Mountain, title: "Climbing wall", text: "Graded routes for first-timers to confident climbers, with belay and safety gear included." },
  { icon: Target, title: "Target sports", text: "Archery and target games that reward a steady hand and a calm eye." },
  { icon: HardHat, title: "Safety-first setup", text: "Certified harnesses, helmets and trained marshals on every high element." },
  { icon: TreePine, title: "Open-air & green", text: "It all sits in a leafy, landscaped stretch — adventure with room to breathe." },
];

export default function AdventureParkPage() {
  return (
    <>
      <PageHero
        eyebrow="Dare"
        title="The Adventure Park"
        intro="Test your nerve across ziplines, rope courses and climbing walls — an open-air playground built for teams and thrill-seekers."
        image={img.adventure}
        seed="adventure-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="The challenges"
            title="Face the fun head-on"
            intro="Whether you're chasing a personal dare or bonding a whole team, our adventure elements turn nerves into stories worth retelling."
          />
          <div className="mt-14">
            <FeatureCards items={features} />
          </div>
        </div>
      </section>

      <section className="section py-8">
        <SplitFeature
          eyebrow="For teams"
          title="Where colleagues become a crew"
          text="Adventure is our favourite kind of icebreaker. Our marshals can run structured team challenges — timed courses, trust elements and problem-solving relays — that get everyone laughing, cheering and working together long before the debrief."
          points={["Facilitated team games", "All safety gear included", "Custom challenge circuits", "Photo & video coverage"]}
          image={img.zipline}
          seed="zipline-team"
          href="/corporate"
          cta="Plan a team day"
        />
      </section>

      <CTABand title="Ready to take the leap?" subtitle="Book the adventure park solo, with friends, or as a full team-building day." />
    </>
  );
}
