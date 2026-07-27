import type { Metadata } from "next";
import { Utensils, Wine, Presentation, Cake, Users2, ChefHat } from "lucide-react";
import PageHero from "@/components/PageHero";
import { SectionHeading, CTABand } from "@/components/UI";
import { SplitFeature, FeatureCards } from "@/components/Blocks";
import { img } from "@/data/site";

export const metadata: Metadata = {
  title: "Dining & Banquets",
  description:
    "A multi-cuisine restaurant, air-conditioned banquet halls and a conference room at Club Platinum Resort near Delhi NCR.",
};

const venues = [
  { icon: Utensils, title: "Multi-cuisine restaurant", text: "A wide-ranging à la carte and buffet menu spanning Indian, Chinese and continental favourites." },
  { icon: Users2, title: "Spacious banquet halls", text: "Air-conditioned halls for weddings, receptions and large gatherings, dressed to your theme." },
  { icon: Presentation, title: "Conference room", text: "A focused, AV-equipped boardroom favoured by corporate teams for offsites and meetings." },
  { icon: ChefHat, title: "Live counters", text: "Chaat, grills and dessert stations that bring theatre and freshness to your event." },
  { icon: Cake, title: "Celebration catering", text: "Cakes, custom menus and décor for birthdays, anniversaries and milestone moments." },
  { icon: Wine, title: "Poolside & alfresco", text: "Snacks and cool drinks by the water, or open-air dining under the evening sky." },
];

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Taste & gather"
        title="Dining & Banquets"
        intro="The quieter pleasures that round out a great day — a multi-cuisine kitchen, elegant banquets and a boardroom built for focus."
        image={img.dining}
        seed="dining-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Every table, covered"
            title="From poolside snacks to plated dinners"
            intro="Whether you're grabbing a bite between slides or hosting three hundred for a reception, our kitchen and venues flex to the occasion."
          />
          <div className="mt-14">
            <FeatureCards items={venues} />
          </div>
        </div>
      </section>

      <section className="section space-y-24 py-8 sm:space-y-28">
        <SplitFeature
          eyebrow="Multi-cuisine restaurant"
          title="Choicest flavours, finest setting"
          text="Our restaurant blends a broad, crowd-pleasing menu with a warm, contemporary ambience. Expect generous buffets on busy days and a satisfying à la carte spread the rest of the time — comfort food and celebration food, all in one kitchen."
          points={["Indian · Chinese · Continental", "Veg & non-veg", "Buffet & à la carte", "Kid-friendly options"]}
          image={img.food}
          seed="dining-restaurant"
        />
        <SplitFeature
          eyebrow="Banquet halls"
          title="A stage for your big moments"
          text="Air-conditioned, generously sized and endlessly adaptable, our banquet halls host weddings, receptions and corporate galas with equal ease. Bring your theme — we'll bring the setup, the service and the catering."
          points={["Weddings & receptions", "Corporate galas", "Custom décor & seating", "In-house catering"]}
          image={img.banquet}
          seed="dining-banquet"
          reverse
        />
        <SplitFeature
          eyebrow="Conference room"
          title="Where focus comes easy"
          text="A calm, well-equipped boardroom that blue-chip teams return to for its soothing setting and dependable AV. Ideal for strategy days, training sessions and meetings that deserve to be uninterrupted."
          points={["Projector & sound", "Flexible seating", "High-speed Wi-Fi", "Catered breaks"]}
          image={img.conference}
          seed="dining-conference"
        />
      </section>

      <CTABand title="Hosting something special?" subtitle="Weddings, galas, offsites or birthdays — let's design the menu and the room together." />
    </>
  );
}
