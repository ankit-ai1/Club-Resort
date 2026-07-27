"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import SmartImage from "./SmartImage";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./UI";
import { gsap, ScrollTrigger, prefersReducedMotion, animateIn } from "@/lib/gsap";

type Experience = { slug: string; title: string; tag: string; excerpt: string; image: string };

export default function PinnedExperiences({ experiences }: { experiences: Experience[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: heading pins while cards scroll past. Each card also settles
      // out of a rotated/scaled-down stack as it arrives, then eases back and
      // dims slightly as the next one arrives on top of it — a real overlap/push.
      mm.add("(min-width: 1024px)", () => {
        if (prefersReducedMotion() || !sectionRef.current || !cardsRef.current || !pinRef.current) return;

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 110px",
          endTrigger: cardsRef.current,
          end: "bottom bottom",
          pin: pinRef.current,
        });

        const cards = cardsRef.current.querySelectorAll<HTMLElement>("[data-stack-card]");
        const cardTimelines: gsap.core.Timeline[] = [];
        cards.forEach((card, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          // Incoming card tips up out of depth (rotationX + perspective) and fades in
          // from a rotated/scaled-down stack; outgoing card recedes and dims as the
          // next arrives on top — a guided 3D scroll-story, not a flat overlap.
          gsap.set(card, {
            rotateZ: dir * 6,
            rotationX: -32,
            scale: 0.86,
            opacity: 0.35,
            transformPerspective: 1000,
            transformOrigin: "50% 100%",
          });
          const ctl = gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 84%", end: "top 42%", scrub: 0.5 },
          });
          ctl.to(card, { rotateZ: 0, rotationX: 0, scale: 1, opacity: 1, ease: "none" });
          if (cards[i + 1]) {
            ctl.to(card, { scale: 0.94, y: -14, opacity: 0.72, rotationX: 6, ease: "none" }, 0.6);
          }
          cardTimelines.push(ctl);
        });

        return () => {
          st.kill();
          cardTimelines.forEach((t) => t.kill());
        };
      });

      // Mobile/tablet: no pin, no room to overlap — a simple alternating settle.
      mm.add("(max-width: 1023px)", () => {
        if (prefersReducedMotion() || !cardsRef.current) return;
        const cards = cardsRef.current.querySelectorAll<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          animateIn(
            card,
            { opacity: 0, y: 40, rotateZ: i % 2 === 0 ? -3 : 3 },
            {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              duration: 0.8,
              ease: "premiumOut",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [experiences.length] }
  );

  return (
    <section ref={sectionRef} className="section relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-aqua/10 blur-3xl" />
      <div className="container-x lg:flex lg:items-start lg:gap-14">
        <div
          ref={pinRef}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:block lg:w-[360px] lg:flex-none lg:pb-10"
        >
          <SectionHeading
            masked
            eyebrow="The experiences"
            title={
              <>
                Pick your <span className="text-gradient-gold">adventure</span>
              </>
            }
          />
          <Reveal delay={2} className="max-w-sm text-white/60 lg:mt-6">
            Four distinct worlds, one gate pass. Move between adrenaline and ease as the mood takes you.
          </Reveal>
        </div>

        <div ref={cardsRef} className="lg:min-w-0 lg:flex-1">
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-0 lg:block lg:gap-0">
            {experiences.map((e, idx) => (
              <div
                key={e.slug}
                data-stack-card
                className={`will-change-transform ${idx > 0 ? "lg:-mt-16" : ""}`}
                style={{ position: "relative", zIndex: idx + 1 }}
              >
                <Link
                  href={`/${e.slug}`}
                  className={`group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink p-8 shadow-lift card-hover lg:min-h-[380px] ${
                    idx % 3 === 0 ? "md:min-h-[420px]" : ""
                  }`}
                >
                  <SmartImage
                    src={e.image}
                    seed={e.slug}
                    alt={e.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  <div className="relative">
                    <span className="eyebrow text-gold-light">{e.tag}</span>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-white">{e.title}</h3>
                    <p className="mt-2 max-w-md text-sm text-white/70">{e.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aqua-light transition-colors group-hover:text-gold-light">
                      Discover
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
