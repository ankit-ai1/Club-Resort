import type { Metadata } from "next";
import { Leaf, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import SmartImage from "@/components/SmartImage";
import { SectionHeading, CTABand } from "@/components/UI";
import { FeatureCards } from "@/components/Blocks";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { img, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind Club Platinum Resort — a green escape near Delhi NCR where thrill and hospitality meet.",
};

const values = [
  { icon: ShieldCheck, title: "Safety first, always", text: "Lifeguards, trained marshals and daily checks so you can play with total peace of mind." },
  { icon: Leaf, title: "Green by design", text: "Twelve landscaped acres kept lush and clean — an escape that feels a world away from the city." },
  { icon: HeartHandshake, title: "Genuine hospitality", text: "A team that treats a family of four and a corporate 400 with the same warmth and care." },
  { icon: Sparkles, title: "All-in-one ease", text: "Parks, dining, banquets and stays in one place, so a great day takes zero logistics from you." },
];

const timeline = [
  { year: "The idea", text: "A simple wish: a nearby place where families could find both thrill and calm in a single day." },
  { year: "The build", text: "Twelve acres shaped into water park, rides, adventure zone, dining and stays." },
  { year: "The community", text: "Tens of thousands of guests a year — from birthday parties to boardroom offsites." },
  { year: "Today", text: "Still growing, still refining, still chasing that one perfect day out." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A green escape, built for joy"
        intro="Club Platinum began with a simple belief — that the best days out blend a little adrenaline with a lot of ease. Here's the place we made for it."
        image={img.resortNight}
        seed="about-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Thrill and tranquility, under one sky"
              intro="Just beyond the edge of Delhi NCR, we set out to gather everything a great outing needs into one green address. A roaring water park for the brave. Unlimited rides for the young and the young-at-heart. An adventure zone for teams. And when the energy fades, modern rooms and unhurried dining to bring the day to a gentle close."
            />
            <Reveal delay={3}>
              <p className="mt-5 leading-relaxed text-white/65">
                We're proud that families return year after year, that schools trust us with hundreds of students, and that companies choose us to bring their people together. That trust is the thing we work hardest to keep.
              </p>
            </Reveal>
          </div>
          <Reveal delay={2} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-lift">
              <SmartImage src={img.poolAerial} seed="about-aerial" alt="Aerial view of the resort" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>

        <Stagger className="container-x mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] sm:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="bg-abyss/40 p-7 text-center">
              <p className="font-display text-4xl font-semibold text-gradient-aqua sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs text-white/55">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="section bg-abyss py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="What we stand for" title="The promises behind the fun" />
          <div className="mt-14">
            <FeatureCards items={values} />
          </div>
        </div>
      </section>

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How we got here" title="A short journey" />
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i} className="relative rounded-2xl border border-white/10 bg-abyss/40 p-7">
                <span className="font-display text-sm font-semibold uppercase tracking-widest text-gold-light">
                  {t.year}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
