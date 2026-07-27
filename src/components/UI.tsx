"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import Magnetic from "./anim/Magnetic";
import { gsap, prefersReducedMotion, isFinePointer, clamp, Observer } from "@/lib/gsap";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  masked = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
  /** Opt-in cinematic reveal: eyebrow fades in, then the title rises from behind a
   *  clip-path mask, then the intro. Used on the homepage only. */
  masked?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!masked || !ref.current) return;
      const eyebrowEl = ref.current.querySelector<HTMLElement>("[data-h-eyebrow]");
      const titleEl = ref.current.querySelector<HTMLElement>("[data-h-title]");
      const introEl = ref.current.querySelector<HTMLElement>("[data-h-intro]");
      const targets = [eyebrowEl, titleEl, introEl].filter(Boolean) as HTMLElement[];

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, yPercent: 0, y: 0, clipPath: "none" });
        return;
      }

      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
      if (eyebrowEl) tl.fromTo(eyebrowEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "premiumOut" });
      if (titleEl)
        tl.fromTo(
          titleEl,
          { clipPath: "inset(0 0 100% 0)", yPercent: 45, opacity: 0 },
          { clipPath: "inset(0 0 0% 0)", yPercent: 0, opacity: 1, duration: 1.15, ease: "power4.out" },
          "-=0.3"
        );
      if (introEl)
        tl.fromTo(introEl, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.75");
    },
    { scope: ref, dependencies: [masked] }
  );

  if (masked) {
    return (
      <div ref={ref} className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
        {eyebrow && (
          <span data-h-eyebrow className="eyebrow">
            <span className="h-px w-6 bg-gold" />
            {eyebrow}
          </span>
        )}
        <h2
          data-h-title
          className={`mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight will-change-transform sm:text-4xl lg:text-5xl ${
            light ? "text-ink" : "text-white"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p
            data-h-intro
            className={`mt-5 text-base leading-relaxed will-change-transform sm:text-lg ${
              light ? "text-ink/70" : "text-white/65"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h2
          className={`mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl ${
            light ? "text-ink" : "text-white"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={2}>
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              light ? "text-ink/70" : "text-white/65"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function CTABand({
  title = "Ready when you are",
  subtitle = "Reserve your day of thrills, or plan a stay that lingers. Our team replies fast.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.to(blobARef.current, { x: 50, y: -36, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(blobBRef.current, { x: -46, y: 42, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(glowRef.current, { scale: 1.25, opacity: 0.5, duration: 1.9, repeat: -1, yoyo: true, ease: "sine.inOut" });

    const particles = particlesRef.current?.querySelectorAll<HTMLElement>("[data-particle]");
    particles?.forEach((p, i) => {
      gsap.fromTo(
        p,
        { y: 10, opacity: 0 },
        {
          y: -150,
          opacity: 1,
          duration: 4 + (i % 4),
          repeat: -1,
          delay: i * 0.55,
          ease: "power1.out",
          onRepeat: () => {
            gsap.set(p, { y: 10, opacity: 0 });
          },
        }
      );
    });
  }, {});

  // A soft light that tracks the cursor across the band, on top of the ambient blobs.
  useGSAP(() => {
    const card = cardRef.current;
    const light = lightRef.current;
    if (!card || !light || prefersReducedMotion() || !isFinePointer()) return;
    const setX = gsap.quickTo(light, "x", { duration: 0.6, ease: "power3.out" });
    const setY = gsap.quickTo(light, "y", { duration: 0.6, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      setX(e.clientX - r.left);
      setY(e.clientY - r.top);
      gsap.to(light, { opacity: 0.8, duration: 0.3, overwrite: "auto" });
    };
    const onLeave = () => gsap.to(light, { opacity: 0, duration: 0.4, overwrite: "auto" });
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, {});

  return (
    <section className="section relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-aqua-grad px-8 py-14 text-center shadow-glow sm:px-16 sm:py-20">
          <div ref={cardRef} className="absolute inset-0">
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
            <div ref={blobARef} className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/25 blur-3xl" />
            <div ref={blobBRef} className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/40 blur-3xl" />
            <div
              ref={lightRef}
              className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-overlay"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)" }}
            />
            <div ref={particlesRef} className="pointer-events-none absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  data-particle
                  className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-ink/25 opacity-0"
                  style={{ left: `${6 + i * 9}%` }}
                />
              ))}
            </div>
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-ink sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/80">{subtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic strength={0.3}>
                <Link href="/contact" data-cursor-hover className="btn relative bg-ink text-white hover:bg-black">
                  <span ref={glowRef} className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-ink opacity-30 blur-lg" />
                  Book your visit <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/virtual-tour" data-cursor-hover className="btn border border-ink/25 text-ink hover:bg-ink/5">
                  Take the 360° tour
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!trackRef.current || prefersReducedMotion()) return;
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
      tweenRef.current = tween;

      // Scroll gives the marquee a nudge — it briefly speeds up (or reverses,
      // if scrolling up) then eases back to its steady drift.
      let settle: gsap.core.Tween | null = null;
      const observer = Observer.create({
        target: window,
        type: "wheel,touch,scroll",
        onChangeY: (self) => {
          const boost = clamp(0.4, 4, 1 + Math.abs(self.deltaY) / 60);
          const dir = self.deltaY > 0 ? 1 : -1;
          settle?.kill();
          gsap.set(tween, { timeScale: dir * boost });
          settle = gsap.to(tween, { timeScale: 1, duration: 1, ease: "power2.out" });
        },
      });

      return () => {
        observer.kill();
        settle?.kill();
      };
    },
    { scope: trackRef }
  );

  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-abyss py-5">
      <div
        ref={trackRef}
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
        className="flex shrink-0 items-center gap-10 pr-10"
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-xl italic text-white/40"
          >
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function LinkCTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-aqua-light transition-colors hover:text-gold-light"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
