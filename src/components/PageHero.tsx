"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SmartImage from "./SmartImage";
import RevealImage from "./anim/RevealImage";
import ParallaxLayer from "./anim/ParallaxLayer";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  seed,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  seed?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-pagehero-anim]", rootRef.current);
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.1 }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-32 sm:min-h-[70vh]">
      <ParallaxLayer speed={8} className="absolute inset-[-6%] h-[112%] w-full">
        <RevealImage mode="mount" className="h-full w-full">
          <SmartImage
            src={image}
            seed={seed || title}
            alt={title}
            priority
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </RevealImage>
      </ParallaxLayer>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />

      <div className="container-x section relative">
        <span data-pagehero-anim className="eyebrow">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </span>
        <h1
          data-pagehero-anim
          className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {title}
        </h1>
        {intro && (
          <p data-pagehero-anim className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
