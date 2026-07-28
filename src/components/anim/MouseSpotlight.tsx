"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";

/** A soft ambient light that drifts toward the cursor, blended over whatever content it sits above. */
export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;

    // Desktop-only ambient effect: reveal it only once a fine pointer is confirmed,
    // so on touch devices this 560px fixed layer never widens the document.
    el.classList.remove("hidden");
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const setX = gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
      gsap.to(el, { opacity: 1, duration: 0.5, overwrite: "auto" });
    };
    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.5, overwrite: "auto" });

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[560px] w-[560px] rounded-full opacity-0 mix-blend-soft-light"
      style={{ background: "radial-gradient(circle, rgba(95,220,232,0.4), transparent 68%)" }}
    />
  );
}
