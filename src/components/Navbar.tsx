"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Menu, X, Compass } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./anim/Magnetic";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { nav, site } from "@/data/site";

function DesktopDropdown({ open, children }: { open: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { opacity: open ? 1 : 0, y: 0 });
        return;
      }
      gsap.to(ref.current, {
        opacity: open ? 1 : 0,
        y: open ? 0 : 10,
        duration: 0.2,
        ease: "power2.out",
      });
    },
    { dependencies: [open], scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`absolute left-0 top-full w-60 pt-3 opacity-0 ${open ? "" : "pointer-events-none"}`}
    >
      <div className="glass overflow-hidden rounded-2xl p-2 shadow-lift">{children}</div>
    </div>
  );
}

function MobileAccordion({ open, children }: { open: boolean; children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapRef.current || !innerRef.current) return;
      const targetHeight = open ? innerRef.current.scrollHeight : 0;
      if (prefersReducedMotion()) {
        gsap.set(wrapRef.current, { height: targetHeight, opacity: open ? 1 : 0 });
        return;
      }
      gsap.to(wrapRef.current, {
        height: targetHeight,
        opacity: open ? 1 : 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
    },
    { dependencies: [open], scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className="overflow-hidden" style={{ height: 0 }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Hide the bar on downward scroll, bring it back on upward scroll or near the top.
  useGSAP(() => {
    if (!headerRef.current || prefersReducedMotion()) return;
    const setY = gsap.quickTo(headerRef.current, "y", { duration: 0.45, ease: "premiumOut" });
    let lastY = window.scrollY;
    let hidden = false;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      if (y > 160 && goingDown && !hidden && !open) {
        hidden = true;
        setY(-100);
      } else if ((!goingDown || y <= 160) && hidden) {
        hidden = false;
        setY(0);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Logo settles slightly smaller once the bar has picked up its scrolled background.
  useGSAP(
    () => {
      if (!logoRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(logoRef.current, { scale: 1 });
        return;
      }
      gsap.to(logoRef.current, { scale: scrolled ? 0.88 : 1, duration: 0.4, ease: "premiumOut" });
    },
    { dependencies: [scrolled] }
  );

  // Sliding active-link indicator — measures the current item and glides the pill to it.
  useGSAP(
    () => {
      const active = nav.find((item) => pathname === item.href || item.children?.some((c) => c.href === pathname));
      const el = active ? itemRefs.current[active.label] : null;
      if (!el || !desktopNavRef.current || !indicatorRef.current) {
        gsap.set(indicatorRef.current, { opacity: 0 });
        return;
      }
      const navRect = desktopNavRef.current.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const vars = { x: rect.left - navRect.left, width: rect.width, opacity: 1 };
      if (prefersReducedMotion()) {
        gsap.set(indicatorRef.current, vars);
      } else {
        gsap.to(indicatorRef.current, { ...vars, duration: 0.5, ease: "premiumInOut" });
      }
    },
    { dependencies: [pathname] }
  );

  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(mobileMenuRef.current, { opacity: open ? 1 : 0, display: open ? "block" : "none" });
        return;
      }
      if (open) {
        gsap.set(mobileMenuRef.current, { display: "block" });
        gsap.fromTo(mobileMenuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(mobileMenuRef.current, { display: "none" });
          },
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 will-change-transform transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-[72px] w-full items-center justify-between px-6 lg:px-10">
        <div ref={logoRef} className="origin-left">
          <Logo />
        </div>

        {/* Desktop nav */}
        <nav ref={desktopNavRef} className="relative hidden items-center gap-1 lg:flex">
          <span
            ref={indicatorRef}
            className="pointer-events-none absolute inset-y-1 left-0 z-0 rounded-full bg-white/10 opacity-0"
            style={{ width: 0 }}
          />
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              item.children?.some((c) => c.href === pathname);
            return (
              <div
                key={item.label}
                ref={(el) => {
                  itemRefs.current[item.label] = el;
                }}
                className="group relative z-10"
                onMouseEnter={() => item.children && setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <Magnetic strength={0.25}>
                  <Link
                    href={item.href}
                    data-cursor-hover
                    className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                      active ? "text-aqua-light" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                </Magnetic>

                {item.children && (
                  <DesktopDropdown open={openGroup === item.label}>
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-xl px-4 py-2.5 text-sm text-white/75 transition-colors hover:bg-aqua/10 hover:text-aqua-light"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </DesktopDropdown>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Magnetic strength={0.3}>
            <Link
              href="/virtual-tour"
              data-cursor-hover
              className="flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-gold-light"
            >
              <Compass className="h-4 w-4" /> 360° Tour
            </Link>
          </Magnetic>
          <Magnetic strength={0.35}>
            <Link href="/contact" data-cursor-hover className="btn-gold text-sm shadow-gold">
              Book Now
            </Link>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 top-[72px] z-40 hidden overflow-y-auto bg-ink/95 opacity-0 backdrop-blur-xl lg:hidden"
      >
        <nav className="section flex flex-col gap-1 py-6">
          {nav.map((item) => (
            <div key={item.label} className="border-b border-white/5 py-1">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenGroup((g) => (g === item.label ? null : item.label))
                    }
                    className="flex w-full items-center justify-between py-3 text-left text-lg font-medium text-white"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openGroup === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <MobileAccordion open={openGroup === item.label}>
                    <div className="flex flex-col gap-1 pb-3 pl-4">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="py-2 text-white/70 hover:text-aqua-light"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </MobileAccordion>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block py-3 text-lg font-medium text-white hover:text-aqua-light"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/virtual-tour" className="btn-ghost w-full">
              <Compass className="h-4 w-4" /> Take the 360° Tour
            </Link>
            <Link href="/contact" className="btn-gold w-full">
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
