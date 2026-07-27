"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Momentum smooth-scrolling via Lenis, driven off GSAP's ticker and wired
 * into ScrollTrigger so every pin / scrub stays perfectly in sync (no double
 * RAF loop, no drift). Skipped entirely under prefers-reduced-motion so those
 * users keep instant native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // lerp (not duration) gives the weighty, "heavy premium" catch-up feel —
    // each frame eases ~9% of the remaining distance toward the target.
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Keep ScrollTrigger's notion of scroll position tied to Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Let ScrollTrigger recompute pin measurements once Lenis is live.
    ScrollTrigger.refresh();

    // Smooth-scroll internal hash links (e.g. the scroll cue) through Lenis.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
}
