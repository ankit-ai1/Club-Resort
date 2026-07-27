"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { X, Check } from "lucide-react";
import SmartImage from "./SmartImage";
import Magnetic from "./anim/Magnetic";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { img, site } from "@/data/site";

const perks = [
  "Welcome mocktail on arrival",
  "Full access to water & amusement park",
  "Live DJ & rain-dance zone",
  "Lavish veg / non-veg buffet",
  "Seasonal festive specials",
];

export default function OfferPopup() {
  const [shouldRender, setShouldRender] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setShouldRender(true);
      setOpen(true);
    }, 2600);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      if (!shouldRender || !overlayRef.current || !cardRef.current) return;

      if (prefersReducedMotion()) {
        gsap.set(overlayRef.current, { display: open ? "flex" : "none", opacity: 1 });
        gsap.set(cardRef.current, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      if (open) {
        gsap.set(overlayRef.current, { display: "flex" });
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          cardRef.current,
          { scale: 0.9, y: 30, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }
        );
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(overlayRef.current, { display: "none" });
          },
        });
        tl.to(cardRef.current, { scale: 0.9, y: 30, opacity: 0, duration: 0.25, ease: "power2.in" }).to(
          overlayRef.current,
          { opacity: 0, duration: 0.2 },
          "-=0.1"
        );
      }
    },
    { dependencies: [open, shouldRender] }
  );

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[60] hidden items-center justify-center bg-ink/80 p-4 opacity-0 backdrop-blur-sm"
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl border border-white/12 bg-abyss shadow-lift sm:grid-cols-2"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close offer"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur transition-colors hover:bg-ink"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative hidden sm:block">
          <SmartImage
            src={img.splash}
            seed="offer-splash"
            alt="Seasonal splash package"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
        </div>

        <div className="p-7 sm:p-8">
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" /> Limited time
          </span>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
            Season Splash <span className="text-gradient-gold">Package</span>
          </h3>
          <p className="mt-2 text-sm text-white/60">
            Our most-loved all-inclusive day out, priced to share with the whole crew.
          </p>

          <ul className="mt-5 space-y-2.5">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-white/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-xs uppercase tracking-widest text-white/50">from</span>
            <span className="font-display text-4xl font-semibold text-gradient-gold">₹999</span>
            <span className="mb-1 text-xs text-white/50">/ person*</span>
          </div>

          <Magnetic strength={0.25} className="mt-5 block w-full">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="btn-gold w-full"
            >
              Grab it on WhatsApp
            </a>
          </Magnetic>
          <p className="mt-3 text-center text-[11px] text-white/40">
            *Terms apply. Prices vary by season, group size and day.
          </p>
        </div>
      </div>
    </div>
  );
}
