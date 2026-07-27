"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion, isFinePointer, clamp } from "@/lib/gsap";

function StatCell({ value, label }: { value: string; label: string }) {
  const cellRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLParagraphElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "0";
  const suffix = match?.[3] ?? "";
  const target = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  const render = (v: number) => {
    if (!numRef.current) return;
    const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN");
    numRef.current.textContent = `${prefix}${n}${suffix}`;
  };

  // Mask wipe on enter + count-up tied directly to scroll progress (numbers roll
  // as the block scrolls through, and roll back on the way up) + idle glow breathing.
  useGSAP(
    () => {
      if (!cellRef.current || !numRef.current || !wipeRef.current) return;

      if (prefersReducedMotion()) {
        render(target);
        gsap.set(wipeRef.current, { scaleX: 0 });
        return;
      }

      render(0);
      gsap.fromTo(
        wipeRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 0.9,
          ease: "premiumInOut",
          transformOrigin: "right",
          scrollTrigger: { trigger: cellRef.current, start: "top 88%", once: true },
        }
      );

      const st = ScrollTrigger.create({
        trigger: cellRef.current,
        start: "top 92%",
        end: "top 42%",
        scrub: true,
        onUpdate: (self) => render(target * self.progress),
      });

      const glow = gsap.to(glowRef.current, {
        opacity: 0.5,
        scale: 1.4,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => {
        st.kill();
        glow.kill();
      };
    },
    { scope: cellRef, dependencies: [value] }
  );

  // Subtle 3D tilt toward the cursor.
  useGSAP(
    () => {
      const cell = cellRef.current;
      if (!cell || prefersReducedMotion() || !isFinePointer()) return;
      const setRX = gsap.quickTo(cell, "rotationX", { duration: 0.4, ease: "power3.out" });
      const setRY = gsap.quickTo(cell, "rotationY", { duration: 0.4, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        const r = cell.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setRX(clamp(-6, 6, -py * 12));
        setRY(clamp(-6, 6, px * 12));
      };
      const onLeave = () => {
        setRX(0);
        setRY(0);
      };
      cell.addEventListener("mousemove", onMove);
      cell.addEventListener("mouseleave", onLeave);
      return () => {
        cell.removeEventListener("mousemove", onMove);
        cell.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: cellRef }
  );

  return (
    <div
      ref={cellRef}
      className="relative overflow-hidden bg-abyss/40 p-7 text-center transition-colors [transform-style:preserve-3d] [perspective:600px] hover:bg-white/[0.03]"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 -z-10 opacity-0"
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(201,162,75,0.25), transparent 70%)" }}
      />
      <p ref={numRef} className="font-display text-4xl font-semibold text-white sm:text-5xl">
        0
      </p>
      <p className="mt-2 text-xs leading-relaxed text-white/55">{label}</p>
      <div ref={wipeRef} className="pointer-events-none absolute inset-0 origin-right bg-ink" />
    </div>
  );
}

export default function StatsRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="container-x mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] sm:grid-cols-4">
      {stats.map((s) => (
        <StatCell key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  );
}
