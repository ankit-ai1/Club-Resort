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

/** Reveals an image block with a clip-path curtain + slight scale-settle. */
export default function RevealImage({ children, className, delay = 0, mode = "scroll" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const from = { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 };
      const to: gsap.TweenVars = {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.1,
        ease: "power3.inOut",
        delay,
      };
      if (mode === "scroll") {
        to.scrollTrigger = { trigger: ref.current, start: "top 82%", once: true };
      }
      animateIn(ref.current, from, to);
    },
    { scope: ref, dependencies: [mode, delay] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
