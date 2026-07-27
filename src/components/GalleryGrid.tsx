"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import SmartImage from "./SmartImage";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { img } from "@/data/site";

type Item = { src: string; seed: string; cat: string; alt: string; span?: boolean };

const items: Item[] = [
  { src: img.heroPool, seed: "g1", cat: "Resort", alt: "Pool aerial", span: true },
  { src: img.waterSlides, seed: "g2", cat: "Water Park", alt: "Water slides" },
  { src: img.amusement, seed: "g3", cat: "Rides", alt: "Amusement rides" },
  { src: img.roomSuite, seed: "g4", cat: "Rooms", alt: "Suite" },
  { src: img.adventure, seed: "g5", cat: "Adventure", alt: "Adventure park" },
  { src: img.dining, seed: "g6", cat: "Dining", alt: "Restaurant", span: true },
  { src: img.wavePool, seed: "g7", cat: "Water Park", alt: "Wave pool" },
  { src: img.ferrisWheel, seed: "g8", cat: "Rides", alt: "Sky wheel" },
  { src: img.roomDeluxe, seed: "g9", cat: "Rooms", alt: "Deluxe room" },
  { src: img.banquet, seed: "g10", cat: "Dining", alt: "Banquet hall" },
  { src: img.zipline, seed: "g11", cat: "Adventure", alt: "Zipline" },
  { src: img.resortNight, seed: "g12", cat: "Resort", alt: "Resort at night", span: true },
  { src: img.splash, seed: "g13", cat: "Water Park", alt: "Splash" },
  { src: img.food, seed: "g14", cat: "Dining", alt: "Food spread" },
];

const cats = ["All", "Resort", "Water Park", "Rides", "Adventure", "Rooms", "Dining"];

export default function GalleryGrid() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<Item | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter: every item stays mounted (so nothing needs to unmount mid-animation);
  // non-matching items fade/scale down then get display:none, matches reverse.
  useGSAP(
    () => {
      const els = gridRef.current?.querySelectorAll<HTMLElement>("[data-gallery-item]");
      if (!els) return;
      els.forEach((el) => {
        const matches = cat === "All" || el.dataset.cat === cat;
        gsap.killTweensOf(el);
        if (prefersReducedMotion()) {
          gsap.set(el, { display: matches ? "" : "none", opacity: matches ? 1 : 0, scale: matches ? 1 : 0.9 });
          return;
        }
        if (matches) {
          gsap.set(el, { display: "" });
          gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        } else {
          gsap.to(el, {
            opacity: 0,
            scale: 0.9,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(el, { display: "none" });
            },
          });
        }
      });
    },
    { dependencies: [cat], scope: gridRef }
  );

  const closeLightbox = () => {
    if (prefersReducedMotion() || !overlayRef.current || !modalRef.current) {
      setActive(null);
      return;
    }
    const tl = gsap.timeline({ onComplete: () => setActive(null) });
    tl.to(modalRef.current, { scale: 0.92, opacity: 0, duration: 0.25, ease: "power2.in" }).to(
      overlayRef.current,
      { opacity: 0, duration: 0.2 },
      "-=0.1"
    );
  };

  useGSAP(
    () => {
      if (!active || !overlayRef.current || !modalRef.current || prefersReducedMotion()) return;
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(modalRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" });
    },
    { dependencies: [active] }
  );

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              cat === c
                ? "bg-gold-grad text-ink"
                : "border border-white/12 text-white/70 hover:border-aqua hover:text-aqua-light"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.seed}
            data-gallery-item
            data-cat={item.cat}
            onClick={() => setActive(item)}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
              item.span ? "sm:col-span-2 sm:row-span-1" : ""
            }`}
          >
            <SmartImage
              src={item.src}
              seed={item.seed}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 rounded-full bg-ink/60 px-3 py-1 text-xs text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              {item.cat}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          ref={overlayRef}
          onClick={closeLightbox}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl border border-white/12"
          >
            <SmartImage
              src={active.src}
              seed={active.seed}
              alt={active.alt}
              width={1600}
              height={1000}
              className="max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
