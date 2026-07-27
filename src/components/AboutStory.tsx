"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import SmartImage from "./SmartImage";
import Magnetic from "./anim/Magnetic";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { splitText } from "@/lib/splitText";

export default function AboutStory({ image, seed, children }: { image: string; seed: string; children?: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !pinRef.current) return;

      if (prefersReducedMotion()) {
        gsap.set([imgWrapRef.current, eyebrowRef.current, headingRef.current, paraRef.current, ctaRef.current, badgeRef.current], {
          clipPath: "none",
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
        });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop: the whole block pins while scroll "writes" the story —
      // eyebrow unmasks, image wipes open left-to-right, paragraph lines
      // rise in one at a time, all scrubbed directly to scroll position.
      mm.add("(min-width: 1024px)", () => {
        const paraSplit = paraRef.current ? splitText(paraRef.current, ["lines"]) : null;

        gsap.set(imgWrapRef.current, { clipPath: "inset(0% 0% 0% 100%)" });
        gsap.set(eyebrowRef.current, { clipPath: "inset(0 100% 0 0)" });
        if (paraSplit) gsap.set(paraSplit.lines, { yPercent: 115, opacity: 0.15 });
        gsap.set(ctaRef.current, { y: 40, opacity: 0 });
        gsap.set(badgeRef.current, { scale: 0.5, opacity: 0, rotate: -8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=90",
            end: "+=110%",
            scrub: 0.6,
            pin: pinRef.current,
          },
        });

        tl.to(eyebrowRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "none" }, 0)
          .to(imgWrapRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 2.4, ease: "none" }, 0.2)
          .to(badgeRef.current, { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "none" }, 0.8);

        if (paraSplit) {
          tl.to(paraSplit.lines, { yPercent: 0, opacity: 1, stagger: 0.5, duration: 1.6, ease: "none" }, 0.6);
        }
        tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 1, ease: "none" }, 2.6);

        return () => paraSplit?.revert();
      });

      // Mobile/tablet: pinning a tall stacked layout feels cramped — settle
      // for a plain (still clip-path based) reveal instead of scroll-jacking.
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          imgWrapRef.current,
          { clipPath: "inset(0% 0% 0% 100%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "premiumInOut",
            scrollTrigger: { trigger: imgWrapRef.current, start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          [eyebrowRef.current, headingRef.current, paraRef.current, ctaRef.current],
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "premiumOut",
            stagger: 0.12,
            scrollTrigger: { trigger: pinRef.current, start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          badgeRef.current,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: badgeRef.current, start: "top 90%", once: true },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section relative py-24 sm:py-32">
      <div ref={pinRef} className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <span ref={eyebrowRef} className="eyebrow inline-block overflow-hidden">
            <span className="mr-2 inline-block h-px w-6 bg-gold align-middle" />
            Welcome to Club Platinum
          </span>
          <h2
            ref={headingRef}
            className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            One address for<span className="text-gradient-aqua"> every kind of joy</span>
          </h2>
          <p ref={paraRef} className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
            Twelve landscaped acres where a splash-soaked afternoon can melt into a candle-lit
            dinner and an unhurried night&apos;s sleep. We built Club Platinum so families,
            friends and teams could find thrill and calm in the very same place.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
            <Magnetic strength={0.3}>
              <Link href="/about" data-cursor-hover className="btn-aqua">
                Our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/gallery" data-cursor-hover className="btn-ghost">
                See the gallery
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="relative">
          <div
            ref={imgWrapRef}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-lift"
          >
            <SmartImage
              src={image}
              seed={seed}
              alt="Club Platinum Resort at dusk"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
          <div ref={badgeRef} className="glass absolute -bottom-6 -left-6 hidden rounded-2xl p-5 sm:block">
            <p className="font-display text-4xl font-semibold text-gradient-gold">12</p>
            <p className="text-xs uppercase tracking-widest text-white/60">Acres of escape</p>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
