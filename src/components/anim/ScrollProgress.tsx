"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current || prefersReducedMotion()) return;
    gsap.set(barRef.current, { scaleX: 0 });
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => gsap.set(barRef.current, { scaleX: self.progress }),
    });
    return () => st.kill();
  }, {});

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-[3px]">
      <div ref={barRef} className="h-full origin-left bg-aqua-grad" />
    </div>
  );
}
