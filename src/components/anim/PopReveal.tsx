"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { animateIn } from "@/lib/gsap";

/** Staggered pop-in (scale + rotate, back-ease) for its [data-pop-item] children. */
export default function PopReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll<HTMLElement>("[data-pop-item]");
      if (!items?.length) return;
      animateIn(
        items,
        { opacity: 0, scale: 0.4, rotate: -20 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.7,
          ease: "snap",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
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
