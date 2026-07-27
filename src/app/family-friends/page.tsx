import type { Metadata } from "next";
import { Cake, Sun, Utensils, Baby, Music, Camera } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SectionHeading, CTABand } from "@/components/UI";
import { FeatureCards, PackageCards, SplitFeature } from "@/components/Blocks";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Family & Friends",
  description:
    "Weekend day outings and celebration packages for families and friends near Delhi NCR — water park, food and stays.",
};

const features = [
  { icon: Sun, title: "The perfect day out", text: "One ticket unlocks the water park, the rides and the adventure zone — hours of shared fun." },
  { icon: Baby, title: "Every age welcome", text: "Gentle kiddie rides and splash zones for the little ones, thrillers for the brave." },
  { icon: Utensils, title: "Feasts, not fuss", text: "Buffet dining and poolside snacks mean nobody's hangry and nobody's cooking." },
  { icon: Cake, title: "Celebrations", text: "Birthdays, reunions and get-togethers with décor, cake and a private corner on request." },
  { icon: Music, title: "Rain dance & DJ", text: "Turn up the day with music, rain dance and a party mood that everyone catches." },
  { icon: Camera, title: "Memories to keep", text: "Photogenic corners everywhere — you'll leave with a camera roll worth scrolling." },
];

const packages = [
  {
    name: "Day Outing",
    price: "On request",
    features: ["Full-day park access", "Welcome drink", "Buffet lunch", "Rain dance", "Free parking"],
  },
  {
    name: "Family Feast",
    price: "On request",
    highlight: true,
    features: ["Water & amusement park", "Snacks + buffet lunch", "Kids' splash zone", "Group host", "Celebration corner"],
  },
  {
    name: "Stay & Play",
    price: "On request",
    features: ["Overnight room stay", "All meals", "Full park access", "Evening bonfire (seasonal)", "Late checkout"],
  },
];

export default function FamilyFriendsPage() {
  return (
    <>
      <PageHero
        eyebrow="For everyone you love"
        title="Family & Friends"
        intro="Round up the crew for a day where everyone — from the tiniest to the boldest — finds their kind of fun, then feasts together."
        image={img.family}
        seed="family-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why it works"
            title="Something for every member of the group"
            intro="The magic of Club Platinum is range: thrill for the teenagers, gentle rides for the kids, a lazy river for the grandparents, and a buffet that brings everyone back to one table."
          />
          <div className="mt-14">
            <FeatureCards items={features} />
          </div>
        </div>
      </section>

      <section className="section py-8">
        <SplitFeature
          eyebrow="Celebrate here"
          title="Birthdays & reunions, sorted"
          text="Mark the moment without lifting a finger. We can set up a decorated corner, arrange the cake, plan the menu and give your group a home base for the day — so you get to be a guest at your own party."
          points={["Décor & cake", "Private group corner", "Custom menu", "Photo-ready spots"]}
          image={img.kids}
          seed="family-celebrate"
          reverse
        />
      </section>

      <section className="section bg-abyss py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Packages" title="Pick your kind of day" intro="From a quick day trip to a full stay-and-play weekend — all easy to tailor to your group." />
          <div className="mt-14">
            <PackageCards items={packages} />
          </div>
        </div>
      </section>

      <CTABand title="Gather your people" subtitle="Tell us your group size and date — we'll help you plan the perfect day." />
    </>
  );
}
