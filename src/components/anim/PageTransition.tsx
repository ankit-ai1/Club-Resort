"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);
  const covering = useRef(false);

  // Cover: kicks off the instant an internal link is clicked, ahead of the
  // route actually changing — doesn't preventDefault, Next's <Link> still navigates.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (!overlayRef.current || covering.current) return;

      covering.current = true;
      gsap.killTweensOf(overlayRef.current);
      gsap.set(overlayRef.current, { display: "block" });
      gsap.fromTo(
        overlayRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: "power3.inOut", overwrite: "auto" }
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Reveal: fires once the route (and pathname) has actually changed.
  useGSAP(
    () => {
      if (isFirst.current) {
        isFirst.current = false;
        return;
      }
      if (prefersReducedMotion()) return;

      // Defensively clear any in-flight tweens from a prior run (e.g. dev-mode
      // double-invoked effects) before starting this one, so nothing fights over
      // the same properties and the onComplete below is guaranteed to fire.
      gsap.killTweensOf([overlayRef.current, contentRef.current]);

      const tl = gsap.timeline({
        onComplete: () => {
          covering.current = false;
          gsap.set(overlayRef.current, { display: "none" });
        },
      });

      // clearProps strips the inline transform once settled — leaving one behind would
      // make this wrapper a containing block for any position:fixed ScrollTrigger pin
      // further down the page, silently breaking it.
      if (covering.current) {
        tl.to(overlayRef.current, { yPercent: -100, duration: 0.55, ease: "power3.inOut", overwrite: "auto" });
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", clearProps: "transform", overwrite: "auto" },
          "-=0.2"
        );
      } else {
        // Browser back/forward or other non-click navigation — no curtain, just settle.
        gsap.set(overlayRef.current, { display: "none", yPercent: -100 });
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", clearProps: "transform", overwrite: "auto" }
        );
      }

      return () => {
        tl.kill();
      };
    },
    { dependencies: [pathname] }
  );

  return (
    <>
      <div ref={overlayRef} aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden bg-ink" />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
