"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { animateIn } from "@/lib/gsap";

/** Alternating left/right slide-in, keyed by index — used for feature-card grids. */
export function AltSlideReveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const fromLeft = index % 2 === 0;
      animateIn(
        ref.current,
        { opacity: 0, x: fromLeft ? -46 : 46, y: 26, rotateZ: fromLeft ? -3 : 3 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotateZ: 0,
          duration: 0.9,
          ease: "premiumOut",
          delay: (index % 3) * 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        }
      );
    },
    { scope: ref, dependencies: [index] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** A 3D flip-up cascade for its [data-flip-card] children — used for pricing tables. */
export function FlipStagger({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = ref.current?.querySelectorAll<HTMLElement>("[data-flip-card]");
      if (!cards?.length) return;
      animateIn(
        cards,
        { opacity: 0, y: 60, rotateX: 35, transformPerspective: 800, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: "premiumOut",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FlipStaggerItem({ children }: { children: ReactNode }) {
  return <div data-flip-card>{children}</div>;
}
