"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SmartImage from "../SmartImage";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  src: string;
  seed: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  imgClassName?: string;
  /** vertical travel in % of the frame; total motion is 2×amount (default ~16%) */
  amount?: number;
};

/**
 * Drop-in replacement for a SmartImage that lives inside a `relative overflow-hidden`
 * frame: renders the image slightly taller than the frame and scrubs it vertically
 * against scroll, so it drifts at a different rate than its container — the core
 * "heavy premium" parallax. No layout change: the frame's box is untouched.
 */
export default function ParallaxImage({
  src,
  seed,
  alt,
  width,
  height,
  priority,
  imgClassName = "h-full w-full object-cover",
  amount = 8,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: ref, dependencies: [amount] }
  );

  return (
    <div ref={ref} className="absolute left-0 h-[122%] w-full will-change-transform" style={{ top: "-11%" }}>
      <SmartImage src={src} seed={seed} alt={alt} width={width} height={height} priority={priority} className={imgClassName} />
    </div>
  );
}
