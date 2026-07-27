"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, prefersReducedMotion, isFinePointer, clamp } from "@/lib/gsap";
import { testimonials } from "@/data/site";

function circularOffset(idx: number, active: number, n: number) {
  let offset = idx - active;
  if (offset > n / 2) offset -= n;
  if (offset < -n / 2) offset += n;
  return offset;
}

export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

  const go = (dir: number) => setI((v) => (v + dir + n) % n);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);

  // Coverflow: the active card centers and sharpens, neighbors recede into depth.
  useGSAP(
    () => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const offset = circularOffset(idx, i, n);
        const isActive = offset === 0;
        const vars = {
          xPercent: offset * 106,
          scale: isActive ? 1 : 0.8,
          opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.32,
          rotateY: isActive ? 0 : offset > 0 ? -14 : 14,
          zIndex: isActive ? 10 : 5 - Math.abs(offset),
          filter: isActive ? "blur(0px)" : "blur(1.5px)",
        };
        if (prefersReducedMotion()) {
          gsap.set(card, vars);
        } else {
          gsap.to(card, { ...vars, duration: 0.75, ease: "premiumInOut" });
        }
      });
    },
    { dependencies: [i] }
  );

  // A slow, individually-offset idle float so the stack feels alive, not static.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      gsap.to(card, { y: "+=10", duration: 2.6 + idx * 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
  }, []);

  // Whole stage drifts on a slow infinite rotation loop — the "infinite movement" ambient layer.
  useGSAP(() => {
    if (!stageRef.current || prefersReducedMotion()) return;
    gsap.to(stageRef.current, {
      rotateY: 4,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  // The active card leans toward the cursor.
  useGSAP(() => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion() || !isFinePointer()) return;
    const onMove = (e: MouseEvent) => {
      const active = cardRefs.current[i];
      if (!active) return;
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(active, {
        rotateX: clamp(-8, 8, -py * 14),
        rotateY: clamp(-8, 8, px * 14),
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    const onLeave = () => {
      const active = cardRefs.current[i];
      if (!active) return;
      gsap.to(active, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, [i]);

  return (
    <div className="relative mx-auto max-w-4xl">
      <div ref={stageRef} className="relative mx-auto flex h-[360px] max-w-lg items-center justify-center [perspective:1400px] sm:h-[300px]">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="absolute inset-x-0 mx-auto w-full max-w-md rounded-[1.75rem] border border-white/10 bg-abyss/70 p-8 text-center shadow-lift backdrop-blur will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Quote className="mx-auto h-8 w-8 text-gold/50" />
            <blockquote className="mt-5 font-display text-xl font-medium leading-snug text-white sm:text-2xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6">
              <span className="block font-semibold text-aqua-light">{t.name}</span>
              <span className="block text-sm text-white/50">{t.role}</span>
            </figcaption>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          data-cursor-hover
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-aqua hover:text-aqua-light"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-gold" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next testimonial"
          data-cursor-hover
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-aqua hover:text-aqua-light"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
