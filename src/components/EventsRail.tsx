"use client";

import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import ParallaxImage from "./anim/ParallaxImage";
import { LinkCTA } from "./UI";
import { gsap, prefersReducedMotion, isFinePointer, clamp } from "@/lib/gsap";

type Occasion = { slug: string; title: string; image: string; points: string[] };

function EventCard({ o }: { o: Occasion }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Perspective tilt + cursor spotlight — desktop, fine-pointer only.
  useGSAP(
    () => {
      const card = cardRef.current;
      const inner = innerRef.current;
      if (!card || !inner || prefersReducedMotion() || !isFinePointer()) return;

      const setRY = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });
      const setRX = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setRY(clamp(-10, 10, (px - 0.5) * 20));
        setRX(clamp(-10, 10, (0.5 - py) * 20));
        gsap.to(card, { "--sx": `${px * 100}%`, "--sy": `${py * 100}%`, duration: 0.3, overwrite: "auto" });
      };
      const onLeave = () => {
        setRY(0);
        setRX(0);
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      data-event-card
      className="group relative w-[82vw] shrink-0 snap-center [perspective:1000px] sm:w-[60vw] lg:w-auto lg:shrink lg:snap-none"
    >
      <div
        ref={innerRef}
        className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink/40 [transform-style:preserve-3d]"
      >
        <div className="relative h-56 overflow-hidden">
          <ParallaxImage
            src={o.image}
            seed={o.slug}
            alt={o.title}
            amount={6}
            imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        </div>
        <div className="p-7">
          <h3 className="font-display text-2xl font-semibold text-white">{o.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {o.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-white/65">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <LinkCTA href={`/${o.slug}`}>View packages</LinkCTA>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(280px circle at var(--sx,50%) var(--sy,50%), rgba(44,196,214,0.18), transparent 70%)" }}
        />
      </div>
    </div>
  );
}

export default function EventsRail({ occasions }: { occasions: Occasion[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const cards = track.querySelectorAll<HTMLElement>("[data-event-card]");
      if (!cards.length) return;

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0, rotateZ: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, rotateZ: (i: number) => (i % 2 === 0 ? -4 : 4) },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 0.9,
          ease: "premiumOut",
          stagger: 0.15,
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        }
      );
    },
    { scope: trackRef, dependencies: [occasions.length] }
  );

  return (
    <div
      ref={trackRef}
      className="[-ms-overflow-style:none] [scrollbar-width:none] mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0"
    >
      {occasions.map((o) => (
        <EventCard key={o.slug} o={o} />
      ))}
    </div>
  );
}
