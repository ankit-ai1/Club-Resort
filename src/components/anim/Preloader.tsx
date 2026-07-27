"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STORAGE_KEY = "cp-loaded";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const letterRef = useRef<SVGTextElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined" || !overlayRef.current) return;

      const finish = () => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        document.body.style.overflow = "";
        gsap.set(overlayRef.current, { display: "none" });
      };

      if (sessionStorage.getItem(STORAGE_KEY)) {
        gsap.set(overlayRef.current, { display: "none" });
        return;
      }

      document.body.style.overflow = "hidden";

      if (prefersReducedMotion()) {
        finish();
        return;
      }

      const path = pathRef.current;
      const len = path ? path.getTotalLength() : 0;
      if (path) gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(fillRef.current, { opacity: 0, scale: 0.8, transformOrigin: "center" });
      gsap.set(letterRef.current, { opacity: 0 });
      gsap.set(wordmarkRef.current, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ onComplete: finish });
      tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "premiumInOut" })
        .to(fillRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "snap" }, "-=0.3")
        .to(letterRef.current, { opacity: 1, duration: 0.4 }, "-=0.2")
        .to(wordmarkRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "premiumOut" }, "-=0.2")
        .to({}, { duration: 0.4 })
        .to(markRef.current, { opacity: 0, y: -14, duration: 0.4, ease: "power2.in" })
        .to(curtainRef.current, { yPercent: -100, duration: 0.7, ease: "premiumInOut" }, "-=0.15");

      return () => {
        tl.kill();
      };
    },
    { scope: overlayRef }
  );

  return (
    <div ref={overlayRef} id="cp-preloader" className="fixed inset-0 z-[100]" suppressHydrationWarning>
      <div ref={curtainRef} className="absolute inset-0 flex items-center justify-center bg-ink">
        <div ref={markRef} className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 48 48" className="h-16 w-16" aria-hidden="true">
            <defs>
              <linearGradient id="lg-preloader" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#E4C77E" />
                <stop offset="0.55" stopColor="#C9A24B" />
                <stop offset="1" stopColor="#A57F2E" />
              </linearGradient>
            </defs>
            <path ref={pathRef} d="M24 2 46 24 24 46 2 24Z" fill="none" stroke="url(#lg-preloader)" strokeWidth="1.5" />
            <path ref={fillRef} d="M24 10 38 24 24 38 10 24Z" fill="url(#lg-preloader)" opacity="0.18" />
            <text
              ref={letterRef}
              x="24"
              y="30"
              textAnchor="middle"
              fontFamily="var(--font-fraunces), serif"
              fontSize="17"
              fontWeight="600"
              fill="url(#lg-preloader)"
            >
              P
            </text>
          </svg>
          <span ref={wordmarkRef} className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/60">
            Club Platinum
          </span>
        </div>
      </div>
      {/* Runs synchronously during HTML parse, before hydration — hides the
          preloader instantly on repeat views this session, no flash. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('${STORAGE_KEY}')){var el=document.getElementById('cp-preloader');if(el)el.style.display='none';}}catch(e){}`,
        }}
      />
    </div>
  );
}
