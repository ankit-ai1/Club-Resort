"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Compass, MapPin, Star } from "lucide-react";
import SmartImage from "./SmartImage";
import ParallaxLayer from "./anim/ParallaxLayer";
import Magnetic from "./anim/Magnetic";
import { gsap, prefersReducedMotion, isFinePointer } from "@/lib/gsap";
import { splitText } from "@/lib/splitText";
import { img, site } from "@/data/site";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const shapeARef = useRef<HTMLDivElement>(null);
  const shapeBRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const scrollDotRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const items = gsap.utils.toArray<HTMLElement>("[data-hero-anim]", rootRef.current);
      const split = headlineRef.current ? splitText(headlineRef.current, ["chars"]) : null;

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        gsap.set(bgRef.current, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
        if (split) gsap.set(split.chars, { opacity: 1, yPercent: 0 });
        gsap.set(headlineRef.current?.querySelectorAll("[data-no-split]") ?? [], {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        });
        gsap.set(scrollCueRef.current, { opacity: 1 });
        return () => split?.revert();
      }

      // Background: clip-path curtain reveal on load; a static slight zoom baseline
      // that the scroll timeline (below) then drives up for depth.
      gsap.set(bgRef.current, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.05 });
      gsap.to(bgRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "premiumInOut" });

      // Headline: character-by-character rise from behind a mask with a skew + blur
      // that resolves as each glyph settles — a bold cinematic entrance. The two
      // gradient-clipped words get their own focus-pull (blur+scale) reveal since
      // splitting their text would break the background-clip:text gradient.
      const gradientWords = headlineRef.current?.querySelectorAll<HTMLElement>("[data-no-split]") ?? [];
      if (split) {
        gsap.set(split.chars, { yPercent: 130, opacity: 0, rotateZ: 4, skewY: 7, filter: "blur(12px)", transformOrigin: "0% 100%" });
      }
      gsap.set(gradientWords, { opacity: 0, scale: 0.82, filter: "blur(10px)" });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(items[0], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "premiumOut" });
      if (split) {
        tl.to(
          split.chars,
          {
            yPercent: 0,
            opacity: 1,
            rotateZ: 0,
            skewY: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            stagger: { amount: 0.5, from: "start" },
          },
          "-=0.35"
        );
      }
      tl.to(
        gradientWords,
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "premiumOut", stagger: 0.15 },
        "-=0.5"
      );
      tl.fromTo(
        items.slice(1),
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.75, ease: "premiumOut", stagger: 0.12 },
        "-=0.5"
      );

      gsap.fromTo(scrollCueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.7 });
      gsap.to(scrollDotRef.current, { y: 10, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut", delay: 1.9 });
      gsap.to(arrowRef.current, { x: 5, repeat: -1, yoyo: true, duration: 0.85, ease: "sine.inOut", delay: 2 });
      gsap.to(glowRef.current, { scale: 1.25, opacity: 0.55, duration: 1.9, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // Scroll depth separation: as you leave the hero, the background scales up
      // (the ParallaxLayer wrapper simultaneously drifts it down) while the headline
      // block rises faster and fades — a strong multi-layer parallax on the way out.
      gsap.to(bgRef.current, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(contentInnerRef.current, {
        yPercent: -24,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Mouse-reactive depth: content, decorative shapes and background drift at different rates.
      if (isFinePointer() && rootRef.current) {
        const setContentX = gsap.quickTo(contentRef.current, "x", { duration: 1, ease: "power3.out" });
        const setContentY = gsap.quickTo(contentRef.current, "y", { duration: 1, ease: "power3.out" });
        const setShapeAX = gsap.quickTo(shapeARef.current, "x", { duration: 1.2, ease: "power3.out" });
        const setShapeAY = gsap.quickTo(shapeARef.current, "y", { duration: 1.2, ease: "power3.out" });
        const setShapeBX = gsap.quickTo(shapeBRef.current, "x", { duration: 1.4, ease: "power3.out" });
        const setShapeBY = gsap.quickTo(shapeBRef.current, "y", { duration: 1.4, ease: "power3.out" });
        const setBgX = gsap.quickTo(bgRef.current, "xPercent", { duration: 1.6, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
          const r = rootRef.current!.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          setContentX(nx * 10);
          setContentY(ny * 6);
          setShapeAX(nx * -40);
          setShapeAY(ny * -30);
          setShapeBX(nx * 32);
          setShapeBY(ny * 24);
          setBgX(nx * -1.5);
        };
        rootRef.current.addEventListener("mousemove", onMove);
        return () => {
          rootRef.current?.removeEventListener("mousemove", onMove);
          split?.revert();
        };
      }

      return () => split?.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Background image */}
      <ParallaxLayer speed={10} className="absolute inset-[-6%] h-[112%] w-full">
        <div ref={bgRef} className="h-full w-full will-change-transform">
          <SmartImage
            src={img.heroPool}
            seed="hero-pool"
            alt="Aerial view of the resort pools"
            priority
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>
      </ParallaxLayer>

      {/* Gradient veils */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />

      {/* Floating depth shapes — ambient idle drift (CSS) + mouse-reactive parallax (GSAP) */}
      <div ref={shapeARef} className="pointer-events-none absolute -left-24 top-1/3 will-change-transform">
        <div className="h-72 w-72 animate-floaty rounded-full bg-aqua/20 blur-3xl" />
      </div>
      <div ref={shapeBRef} className="pointer-events-none absolute right-10 top-24 will-change-transform">
        <div className="h-56 w-56 animate-floaty rounded-full bg-gold/15 blur-3xl" style={{ animationDelay: "-3s" }} />
      </div>

      {/* Content — contentRef carries mouse-depth (x/y); the inner wrapper carries
          the scroll rise+fade, so the two transforms never collide. */}
      <div ref={contentRef} className="container-x section relative z-10 w-full py-20 will-change-transform">
        <div ref={contentInnerRef} className="will-change-transform">
        <div data-hero-anim className="flex items-center gap-3">
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold" /> {site.tagline}
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="mt-6 max-w-4xl font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
        >
          A day of <span data-no-split className="inline-block text-gradient-aqua">thrills</span>.
          <br />
          A stay of <span data-no-split className="inline-block text-gradient-gold">calm</span>.
        </h1>

        <p data-hero-anim className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          Just beyond Delhi NCR, Club Platinum blends a roaring water park, unlimited
          rides and green, unhurried luxury — an all-in-one escape for families, friends
          and teams.
        </p>

        <div data-hero-anim className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic strength={0.3}>
            <Link href="/contact" data-cursor-hover className="btn-gold relative">
              <span
                ref={glowRef}
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold opacity-40 blur-xl"
              />
              Plan your visit <ArrowRight ref={arrowRef} className="h-4 w-4" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.3}>
            <Link href="/virtual-tour" data-cursor-hover className="btn-ghost">
              <Compass className="h-4 w-4" /> Explore in 360°
            </Link>
          </Magnetic>
        </div>

        {/* Trust row */}
        <div data-hero-anim className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/70">
          <span className="flex items-center gap-2">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </span>
            4.6 · 50,000+ guests / year
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-aqua" /> Bahadurgarh, Haryana · ~1 hr from Delhi
          </span>
        </div>
        </div>
      </div>

      {/* Animated wave divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="h-16 w-full sm:h-24"
          aria-hidden="true"
        >
          <path
            className="animate-wave"
            fill="#06141B"
            d="M0,64 C240,120 480,20 720,54 C960,88 1200,20 1440,60 L1440,120 L0,120 Z"
          />
          <path
            fill="#06141B"
            opacity="0.6"
            d="M0,80 C240,40 480,110 720,80 C960,50 1200,110 1440,80 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-0 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <span className="relative h-9 w-5 rounded-full border border-white/30">
          <span
            ref={scrollDotRef}
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-aqua"
          />
        </span>
      </div>
    </section>
  );
}
