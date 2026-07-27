import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, Observer, ScrollToPlugin, CustomEase);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });

  // Signature eases — used instead of stock power/back eases so motion reads
  // as hand-tuned rather than default-GSAP. bezier control points translated
  // into CustomEase's SVG-path form.
  CustomEase.create("premiumOut", "M0,0 C0.16,1 0.3,1 1,1");
  CustomEase.create("premiumInOut", "M0,0 C0.83,0 0.17,1 1,1");
  CustomEase.create("silk", "M0,0 C0.22,0.61 0.36,1 1,1");
  CustomEase.create("snap", "M0,0 C0.34,1.56 0.64,1 1,1");
}

export { gsap, ScrollTrigger, Flip, Observer, ScrollToPlugin, CustomEase };

export const EASE = "premiumOut";
export const EASE_SOFT = "silk";
export const EASE_INOUT = "premiumInOut";
export const EASE_SNAP = "snap";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Animates from `fromVars` to `toVars`, but jumps straight to the end
 * state when the user prefers reduced motion — every animated component
 * in the app should route scroll/mount animations through this instead
 * of calling gsap.fromTo directly.
 */
export function animateIn(
  targets: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars
) {
  if (prefersReducedMotion()) {
    const instant = { ...toVars };
    delete instant.delay;
    delete instant.stagger;
    delete instant.scrollTrigger;
    return gsap.set(targets, instant);
  }
  return gsap.fromTo(targets, fromVars, toVars);
}

/** Linear interpolation helper for manual per-frame lerping (magnetic/tilt/lighting effects). */
export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

/** Clamp helper. */
export function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value));
}
