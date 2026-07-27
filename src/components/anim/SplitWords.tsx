"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { animateIn } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "scroll" | "mount";
};

/** Splits a plain string into per-word masked spans and staggers their reveal. */
export default function SplitWords({ text, className, delay = 0, stagger = 0.04, mode = "scroll" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useGSAP(
    () => {
      const inners = ref.current?.querySelectorAll<HTMLElement>("[data-word-inner]");
      if (!inners || !inners.length) return;
      const from = { yPercent: 100, opacity: 0 };
      const to: gsap.TweenVars = { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay, stagger };
      if (mode === "scroll") {
        to.scrollTrigger = { trigger: ref.current, start: "top 88%", once: true };
      }
      animateIn(inners, from, to);
    },
    { scope: ref, dependencies: [text, mode, delay, stagger] }
  );

  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <span data-word-inner className="inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
