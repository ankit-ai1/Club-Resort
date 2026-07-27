import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SmartImage from "@/components/SmartImage";
import BlogCard from "@/components/BlogCard";
import RevealImage from "@/components/anim/RevealImage";
import Magnetic from "@/components/anim/Magnetic";
import { CTABand } from "@/components/UI";
import { blogPosts, img } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog & Journal",
  description: "Stories, guides and tips from Club Platinum Resort — planning day outings, offsites and getaways near Delhi NCR.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        eyebrow="The journal"
        title="Stories & guides"
        intro="Little reads to help you plan the perfect day out, the smartest offsite and the easiest escape from the city."
        image={img.spa}
        seed="blog-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x">
          {/* Featured */}
          <RevealImage>
            <Link
              href={`/blog/${featured.slug}`}
              data-cursor-hover
              className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-abyss/40 lg:grid-cols-2"
            >
              <div className="relative min-h-[280px] overflow-hidden">
                <SmartImage
                  src={featured.image}
                  seed={featured.slug}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="text-xs uppercase tracking-widest text-gold-light">
                  Featured · {featured.date} · {featured.readMins} min
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white transition-colors group-hover:text-aqua-light sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-white/65">{featured.excerpt}</p>
                <Magnetic strength={0.3} className="mt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-aqua-light">
                    Read the story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Magnetic>
              </div>
            </Link>
          </RevealImage>

          {/* Rest */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((post) => (
              <BlogCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                image={post.image}
                seed={post.slug}
                meta={`${post.date} · ${post.readMins} min`}
                title={post.title}
                excerpt={post.excerpt}
                imageClassName="h-52"
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
