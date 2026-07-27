"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail, Compass } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./anim/Magnetic";
import RevealImage from "./anim/RevealImage";
import { gsap, animateIn, prefersReducedMotion } from "@/lib/gsap";
import { nav, site } from "@/data/site";

const socials = [
  { icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: Twitter, href: site.social.twitter, label: "Twitter" },
  { icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: site.social.youtube, label: "YouTube" },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (glowRef.current && !prefersReducedMotion()) {
        gsap.to(glowRef.current, { opacity: 0.55, scale: 1.2, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
      const cols = ref.current?.querySelectorAll<HTMLElement>("[data-footer-col]");
      if (cols?.length) {
        animateIn(
          cols,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "premiumOut",
            stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          }
        );
      }
      if (mapRef.current && !prefersReducedMotion()) {
        gsap.fromTo(
          mapRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: mapRef.current, start: "top bottom", end: "bottom 60%", scrub: true },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-abyss">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div ref={glowRef} className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-aqua/10 blur-3xl" />

      <div ref={ref} className="container-x section relative py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div data-footer-col className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              A green escape near Delhi NCR where water, thrill and hospitality meet — designed for families, friends and teams who want a day worth remembering.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-cursor-hover
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 transition-colors hover:border-aqua hover:text-aqua-light"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div data-footer-col className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-light">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.slice(0, 6).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/60 transition-colors hover:text-aqua-light">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/virtual-tour" className="flex items-center gap-1.5 text-white/60 transition-colors hover:text-gold-light">
                  <Compass className="h-3.5 w-3.5" /> 360° Virtual Tour
                </Link>
              </li>
            </ul>
          </div>

          <div data-footer-col className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-light">
              Reach us
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <span className="flex flex-col">
                  {site.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-white">
                      {p}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div data-footer-col className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-light">
              Find us
            </h4>
            <RevealImage className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <div ref={mapRef} className="h-40 w-full will-change-transform">
                <iframe
                  src={site.mapEmbed}
                  title="Club Platinum Resort location"
                  className="h-full w-full grayscale-[30%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </RevealImage>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Club Platinum Resort. All rights reserved.</p>
          <p>Crafted with care · Bahadurgarh, Haryana</p>
        </div>
      </div>
    </footer>
  );
}
