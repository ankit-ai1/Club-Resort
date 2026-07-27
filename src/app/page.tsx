import Link from "next/link";
import { ArrowRight, Compass, Utensils, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import ParallaxImage from "@/components/anim/ParallaxImage";
import Testimonials from "@/components/Testimonials";
import PinnedExperiences from "@/components/PinnedExperiences";
import EventsRail from "@/components/EventsRail";
import AboutStory from "@/components/AboutStory";
import StatsRow from "@/components/StatsRow";
import DiagonalImageDuo from "@/components/DiagonalImageDuo";
import FeatureChips from "@/components/FeatureChips";
import BlogCard from "@/components/BlogCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, CTABand, Marquee, LinkCTA } from "@/components/UI";
import { experiences, occasions, blogPosts, stats, img } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Marquee
        items={[
          "Water Park",
          "Unlimited Rides",
          "Adventure Zone",
          "Luxury Stays",
          "Fine Dining",
          "Banquets & Offsites",
        ]}
      />

      {/* Welcome — pinned storytelling */}
      <AboutStory image={img.resortNight} seed="resort-night">
        <StatsRow stats={stats} />
      </AboutStory>

      {/* Experiences — pinned heading while cards stack/overlap past it */}
      <PinnedExperiences experiences={experiences} />

      {/* Occasions — horizontal rail on mobile, perspective+spotlight grid on desktop */}
      <section className="section relative bg-abyss py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            masked
            align="center"
            eyebrow="Made for the moment"
            title={
              <>
                However you gather, <span className="text-gradient-aqua">we host it well</span>
              </>
            }
            intro="Curated packages that bundle the parks, the food and the stay — so you can turn up and simply enjoy."
          />
          <EventsRail occasions={occasions} />
        </div>
      </section>

      {/* Beyond the parks */}
      <section className="section relative py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <DiagonalImageDuo
            className="order-2 grid grid-cols-2 gap-4 lg:order-1"
            first={
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
                <ParallaxImage src={img.dining} seed="dining" alt="Multi-cuisine dining" amount={7} />
              </div>
            }
            second={
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
                <ParallaxImage src={img.banquet} seed="banquet" alt="Banquet hall" amount={7} />
              </div>
            }
          />

          <div className="order-1 lg:order-2">
            <SectionHeading
              masked
              eyebrow="Beyond the parks"
              title={
                <>
                  Dine, meet & celebrate <span className="text-gradient-gold">in style</span>
                </>
              }
              intro="A multi-cuisine restaurant, air-conditioned banquets and a boardroom built for focus — the quieter pleasures that round out a great day."
            />
            <FeatureChips
              items={[
                { icon: Utensils, label: "Multi-cuisine restaurant" },
                { icon: Sparkles, label: "Spacious banquet halls" },
                { icon: Compass, label: "Conference & boardroom" },
              ]}
            />
            <Reveal delay={2} className="mt-8">
              <Link href="/dining" className="btn-aqua">
                Explore dining & banquets <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section relative overflow-hidden bg-abyss py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div className="container-x relative">
          <div className="mb-14 text-center">
            <span className="eyebrow justify-center">
              <span className="h-px w-6 bg-gold" /> In their words
            </span>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Blog preview */}
      <section className="section relative py-24 sm:py-32">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              masked
              eyebrow="From the journal"
              title={
                <>
                  Stories & <span className="text-gradient-aqua">little guides</span>
                </>
              }
            />
            <Reveal delay={2}>
              <LinkCTA href="/blog">Read the blog</LinkCTA>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post, idx) => (
              <BlogCard
                key={post.slug}
                index={idx}
                href={`/blog/${post.slug}`}
                image={post.image}
                seed={post.slug}
                meta={`${post.date} · ${post.readMins} min`}
                title={post.title}
                excerpt={post.excerpt}
                imageClassName="h-48"
                titleClassName="text-xl"
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
