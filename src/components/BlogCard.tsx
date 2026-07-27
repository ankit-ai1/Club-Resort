"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import SmartImage from "./SmartImage";
import Magnetic from "./anim/Magnetic";
import { splitText } from "@/lib/splitText";
import { gsap, animateIn, prefersReducedMotion, isFinePointer, clamp } from "@/lib/gsap";

type Props = {
  href: string;
  image: string;
  seed: string;
  meta: string;
  title: string;
  excerpt: string;
  ctaLabel?: string;
  imageClassName?: string;
  titleClassName?: string;
  index?: number;
};

export default function BlogCard({
  href,
  image,
  seed,
  meta,
  title,
  excerpt,
  ctaLabel = "Read more",
  imageClassName = "h-52",
  titleClassName = "text-2xl",
  index = 0,
}: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      const fromSide = index % 2 === 0 ? -36 : 36;
      animateIn(
        cardRef.current,
        { opacity: 0, x: fromSide, y: 30, rotate: index % 2 === 0 ? -2 : 2 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.9,
          ease: "premiumOut",
          scrollTrigger: { trigger: cardRef.current, start: "top 88%", once: true },
        }
      );

      if (!titleRef.current || prefersReducedMotion()) return;
      const split = splitText(titleRef.current, ["words"]);
      gsap.set(split.words, { yPercent: 100, opacity: 0 });
      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "premiumOut",
        stagger: 0.05,
        delay: 0.15,
        scrollTrigger: { trigger: cardRef.current, start: "top 88%", once: true },
      });
      return () => split.revert();
    },
    { scope: cardRef, dependencies: [index] }
  );

  // Liquid distortion — the image skews with cursor movement speed, then relaxes.
  useGSAP(
    () => {
      const imgEl = imgRef.current;
      if (!imgEl || prefersReducedMotion() || !isFinePointer()) return;
      const setSkew = gsap.quickTo(imgEl, "skewY", { duration: 0.6, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        setSkew(clamp(-5, 5, (e.movementY || 0) * 0.6));
      };
      const onLeave = () => setSkew(0);
      imgEl.addEventListener("mousemove", onMove);
      imgEl.addEventListener("mouseleave", onLeave);
      return () => {
        imgEl.removeEventListener("mousemove", onMove);
        imgEl.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: cardRef }
  );

  return (
    <Link
      ref={cardRef}
      href={href}
      data-cursor-hover
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-abyss/40 transition-shadow duration-500 hover:shadow-lift"
    >
      <div ref={imgRef} className={`relative overflow-hidden will-change-transform ${imageClassName}`}>
        <SmartImage
          src={image}
          seed={seed}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <span className="text-xs uppercase tracking-widest text-gold-light">{meta}</span>
        <h3
          ref={titleRef}
          className={`mt-3 overflow-hidden font-display font-semibold leading-snug text-white transition-colors group-hover:text-aqua-light ${titleClassName}`}
        >
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{excerpt}</p>
        <Magnetic strength={0.3} className="mt-5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-aqua-light">
            {ctaLabel} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Magnetic>
      </div>
    </Link>
  );
}
