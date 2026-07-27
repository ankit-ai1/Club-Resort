"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SmartImage from "./SmartImage";

type Item = { src: string; seed: string; caption: string; tag: string };

export default function HorizontalShowcase({ items }: { items: Item[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const images = track.querySelectorAll<HTMLElement>("[data-panel-img]");
      const captions = track.querySelectorAll<HTMLElement>("[data-panel-caption]");

      const showStatic = () => {
        gsap.set(images, { scale: 1, filter: "brightness(1)" });
        gsap.set(captions, { opacity: 1, y: 0 });
      };

      if (prefersReducedMotion()) {
        showStatic();
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        { isDesktop: "(min-width: 900px)", isMobile: "(max-width: 899px)" },
        (context) => {
          const conditions = context.conditions as { isDesktop: boolean };
          if (!conditions.isDesktop) {
            showStatic();
            return;
          }

          const distance = track.scrollWidth - section.clientWidth;
          const tween = gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance}`,
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
            },
          });

          const panels = track.querySelectorAll<HTMLElement>("[data-panel]");
          panels.forEach((panel) => {
            const img = panel.querySelector<HTMLElement>("[data-panel-img]");
            const caption = panel.querySelector<HTMLElement>("[data-panel-caption]");
            gsap.fromTo(
              img,
              { scale: 1.25, filter: "brightness(0.55)" },
              {
                scale: 1,
                filter: "brightness(1)",
                ease: "none",
                scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 85%", end: "left 30%", scrub: true },
              }
            );
            gsap.fromTo(
              caption,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 70%", end: "left 40%", scrub: true },
              }
            );
          });

          return () => {
            tween.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [items.length] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-abyss py-16 sm:h-screen sm:py-0 sm:[&]:flex sm:items-center"
    >
      <div ref={trackRef} className="flex flex-col gap-6 px-5 will-change-transform sm:flex-row sm:gap-10 sm:px-[8vw]">
        {items.map((item) => (
          <div
            key={item.seed}
            data-panel
            className="relative h-[50vh] w-full shrink-0 overflow-hidden rounded-[2rem] border border-white/10 sm:h-[62vh] sm:w-[68vw] lg:w-[42vw]"
          >
            <div data-panel-img className="absolute inset-0">
              <SmartImage src={item.src} seed={item.seed} alt={item.caption} className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div data-panel-caption className="absolute inset-x-6 bottom-6 opacity-0">
              <span className="eyebrow text-gold-light">{item.tag}</span>
              <p className="mt-2 font-display text-2xl font-semibold text-white">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
