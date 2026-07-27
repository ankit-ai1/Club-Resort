"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { animateIn } from "@/lib/gsap";

/** Two panels slide in diagonally from opposite corners and settle into place — a
 * masking technique distinct from the vertical clip-path curtain used elsewhere. */
export default function DiagonalImageDuo({
  className,
  first,
  second,
}: {
  className?: string;
  first: ReactNode;
  second: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!aRef.current || !bRef.current || !wrapRef.current) return;
      animateIn(
        aRef.current,
        { opacity: 0, x: "-22%", y: "16%", rotate: -8, scale: 1.12 },
        {
          opacity: 1,
          x: "0%",
          y: "0%",
          rotate: 0,
          scale: 1,
          duration: 1.1,
          ease: "premiumInOut",
          scrollTrigger: { trigger: wrapRef.current, start: "top 78%", once: true },
        }
      );
      animateIn(
        bRef.current,
        { opacity: 0, x: "18%", y: "-14%", rotate: 7, scale: 1.12 },
        {
          opacity: 1,
          x: "0%",
          y: "0%",
          rotate: 0,
          scale: 1,
          duration: 1.1,
          ease: "premiumInOut",
          delay: 0.12,
          scrollTrigger: { trigger: wrapRef.current, start: "top 78%", once: true },
        }
      );
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={className}>
      <div ref={aRef} className="mt-8 will-change-transform">
        {first}
      </div>
      <div ref={bRef} className="will-change-transform">
        {second}
      </div>
    </div>
  );
}
