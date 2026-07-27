"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** vertical travel as a % of the element's own height; positive drifts down while scrolling */
  speed?: number;
};

/** Scroll-scrubbed parallax drift, transform-only. No-ops under reduced motion. */
export default function ParallaxLayer({ children, className, speed = 15 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.to(ref.current, {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [speed] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
