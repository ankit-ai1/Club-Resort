"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import PanoramaViewer from "@/components/PanoramaViewer";
import { CTABand } from "@/components/UI";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { img } from "@/data/site";

const scenes = [
  { key: "pools", label: "The Pools", src: img.poolAerial, seed: "tour-pools" },
  { key: "water", label: "Water Park", src: img.waterSlides, seed: "tour-water" },
  { key: "rides", label: "Amusement Park", src: img.amusement, seed: "tour-rides" },
  { key: "rooms", label: "Rooms & Suites", src: img.roomSuite, seed: "tour-rooms" },
  { key: "dining", label: "Dining & Banquets", src: img.banquet, seed: "tour-dining" },
  { key: "night", label: "Resort by Night", src: img.resortNight, seed: "tour-night" },
];

export default function VirtualTourPage() {
  const [active, setActive] = useState(scenes[0]);
  const headerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-tour-anim]", headerRef.current);
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(items, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 });
    },
    { scope: headerRef }
  );

  useGSAP(
    () => {
      if (!sceneRef.current || prefersReducedMotion()) return;
      gsap.fromTo(sceneRef.current, { opacity: 0, scale: 0.99 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
    },
    { dependencies: [active.key] }
  );

  return (
    <>
      <section ref={headerRef} className="section relative overflow-hidden pb-8 pt-36">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
        <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-aqua/15 blur-3xl" />
        <div className="container-x relative">
          <span data-tour-anim className="eyebrow">
            <Compass className="h-4 w-4" /> Explore in 360°
          </span>
          <h1
            data-tour-anim
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            Wander every corner <span className="text-gradient-aqua">before you arrive</span>
          </h1>
          <p data-tour-anim className="mt-5 max-w-xl text-white/65">
            Take a look around the resort at your own pace. Drag any scene to pan across it, then jump between spaces below.
          </p>
        </div>
      </section>

      <section className="section py-10">
        <div className="container-x">
          <div ref={sceneRef}>
            <PanoramaViewer src={active.src} seed={active.seed} label={active.label} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {scenes.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active.key === s.key
                    ? "bg-aqua-grad text-ink"
                    : "border border-white/12 text-white/70 hover:border-aqua hover:text-aqua-light"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Self-guided", d: "Move at your own pace — no queues, no waiting." },
              { t: "Every space", d: "From the wave pool to the banquet halls and beyond." },
              { t: "Then book", d: "Like what you see? Reserve your day in a couple of taps." },
            ].map((c) => (
              <div key={c.t} className="glass rounded-2xl p-6">
                <p className="font-display text-lg font-semibold text-gradient-gold">{c.t}</p>
                <p className="mt-2 text-sm text-white/60">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/contact" className="btn-gold">
              Book your visit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTABand title="Seen enough? Come feel it." subtitle="The 360° tour is lovely — the real thing is better. Reserve your day now." />
    </>
  );
}
