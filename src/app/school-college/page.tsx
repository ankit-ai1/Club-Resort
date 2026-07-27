import type { Metadata } from "next";
import { ShieldCheck, Bus, Utensils, Users, ClipboardCheck, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SectionHeading, CTABand } from "@/components/UI";
import { FeatureCards, PackageCards } from "@/components/Blocks";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "School & College Picnics",
  description:
    "Safe, well-organised group picnics for schools and colleges near Delhi NCR — water park, rides, meals and supervision included.",
};

const features = [
  { icon: ShieldCheck, title: "Safety-first", text: "Lifeguards, marshals and first-aid on hand, with clear group zones and staff coordination." },
  { icon: Users, title: "Built for big groups", text: "We regularly host hundreds of students in a single day, with smooth entry and headcounts." },
  { icon: Utensils, title: "Meals included", text: "Wholesome buffet meals and snacks planned for growing appetites, veg and non-veg." },
  { icon: Clock, title: "Structured day", text: "A suggested schedule keeps the day flowing — parks, meals and downtime, well-paced." },
  { icon: Bus, title: "Easy access", text: "Ample coach parking and a straightforward route from Delhi NCR keep transport simple." },
  { icon: ClipboardCheck, title: "Teacher-friendly", text: "A single coordinator, clear rules and support so accompanying staff can relax too." },
];

const packages = [
  {
    name: "Day Picnic",
    price: "On request",
    features: ["Full-day park access", "Welcome drink", "Buffet lunch", "Supervised zones", "Coach parking"],
  },
  {
    name: "Splash + Feast",
    price: "On request",
    highlight: true,
    features: ["Water & amusement park", "Snacks + buffet lunch", "Rain dance session", "Dedicated group host", "Group photo"],
  },
  {
    name: "Overnight Trip",
    price: "On request",
    features: ["Stay in group rooms", "All meals covered", "Full park access", "Evening activities", "24×7 support"],
  },
];

export default function SchoolCollegePage() {
  return (
    <>
      <PageHero
        eyebrow="For students"
        title="School & College Picnics"
        intro="A big day out that's fun for students and easy for teachers — safe, supervised and packed with things to do, from splash pools to rides."
        image={img.school}
        seed="school-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why institutions trust us"
            title="Hundreds of students, one smooth day"
            intro="Group picnics live or die on organisation. We've hosted enough of them to make yours run like clockwork — so the only thing anyone remembers is the fun."
          />
          <div className="mt-14">
            <FeatureCards items={features} />
          </div>
        </div>
      </section>

      <section className="section bg-abyss py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Packages" title="Plans that scale with your group" intro="Share your headcount and date and we'll tailor inclusions and pricing for your institution." />
          <div className="mt-14">
            <PackageCards items={packages} />
          </div>
        </div>
      </section>

      <CTABand title="Planning a class trip?" subtitle="Get a group quote with meals, access and supervision — sorted in one message." />
    </>
  );
}
