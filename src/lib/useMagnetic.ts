"use client";

import { useEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion, isFinePointer } from "@/lib/gsap";

/** Pulls the element toward the cursor while hovered, snaps back on leave. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.4) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !isFinePointer()) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setX(relX * strength);
      setY(relY * strength);
    };
    const onLeave = () => {
      setX(0);
      setY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength]);
}
