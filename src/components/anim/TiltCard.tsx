"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, isFinePointer, clamp } from "@/lib/gsap";

export default function TiltCard({
  children,
  className,
  radiusClassName = "rounded-2xl",
  maxTilt = 9,
}: {
  children: ReactNode;
  className?: string;
  radiusClassName?: string;
  maxTilt?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner || prefersReducedMotion() || !isFinePointer()) return;

      const setRX = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });
      const setRY = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });
      const setLift = gsap.quickTo(inner, "z", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setRX(clamp(-maxTilt, maxTilt, (0.5 - py) * maxTilt * 2));
        setRY(clamp(-maxTilt, maxTilt, (px - 0.5) * maxTilt * 2));
        setLift(16);
        gsap.to(wrap, { "--mx": `${px * 100}%`, "--my": `${py * 100}%`, duration: 0.35, overwrite: "auto" });
      };
      const onLeave = () => {
        setRX(0);
        setRY(0);
        setLift(0);
      };

      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);
      return () => {
        wrap.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={`group/tilt h-full [perspective:1200px] ${className ?? ""}`}>
      <div
        ref={innerRef}
        className={`relative h-full overflow-hidden ${radiusClassName} [transform-style:preserve-3d] will-change-transform`}
      >
        {children}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(44,196,214,0.16), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 ring-1 ring-inset ring-aqua/40 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      </div>
    </div>
  );
}
