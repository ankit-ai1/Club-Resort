"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { animateIn } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "scroll" | "mount";
};

/**
 * Wraps a line/phrase in an overflow-hidden mask and reveals the inner
 * content by sliding it up from below — the classic Apple/Linear-style
 * headline reveal. Works with JSX children (e.g. a gradient <span>)
 * since it doesn't need to split text itself.
 */
export default function MaskReveal({ children, className, delay = 0, mode = "scroll" }: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const inner = wrapRef.current?.firstElementChild;
      if (!inner) return;
      const from = { yPercent: 110, opacity: 0 };
      const to: gsap.TweenVars = { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay };
      if (mode === "scroll") {
        to.scrollTrigger = { trigger: wrapRef.current, start: "top 85%", once: true };
      }
      animateIn(inner, from, to);
    },
    { scope: wrapRef, dependencies: [mode, delay] }
  );

  return (
    <span ref={wrapRef} className={`inline-block overflow-hidden align-top ${className ?? ""}`}>
      <span className="inline-block will-change-transform">{children}</span>
    </span>
  );
}
