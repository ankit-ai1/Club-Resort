"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/data/site";

export default function WhatsAppButton() {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { opacity: 1, scale: 1 });
        return;
      }
      gsap.fromTo(
        ref.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 1.2, ease: "back.out(1.8)" }
      );
    },
    { scope: ref }
  );

  const onEnter = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, { scale: 1.08, duration: 0.25, ease: "power2.out" });
  };
  const onLeave = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, { scale: 1, duration: 0.25, ease: "power2.out" });
  };
  const onDown = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, { scale: 0.94, duration: 0.15, ease: "power2.out" });
  };
  const onUp = () => {
    if (prefersReducedMotion() || !ref.current) return;
    gsap.to(ref.current, { scale: 1.08, duration: 0.15, ease: "power2.out" });
  };

  return (
    <a
      ref={ref}
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      className="group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] opacity-0 shadow-[0_10px_40px_-8px_rgba(37,211,102,0.7)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white" aria-hidden="true">
        <path d="M16.004 3C9.383 3 4 8.383 4 15.004c0 2.115.553 4.183 1.605 6.006L4 29l8.184-1.57a11.94 11.94 0 0 0 3.82.627h.004C22.63 28.057 28 22.674 28 16.053 28 8.383 22.625 3 16.004 3Zm0 21.86h-.003a9.9 9.9 0 0 1-3.375-.586l-.242-.096-4.856.932.99-4.73-.157-.243A9.86 9.86 0 0 1 6.14 15.01c0-5.44 4.427-9.866 9.87-9.866 2.636 0 5.112 1.027 6.976 2.892a9.8 9.8 0 0 1 2.888 6.98c-.002 5.44-4.428 9.844-9.87 9.844Zm5.412-7.384c-.297-.149-1.758-.868-2.03-.967-.272-.099-.47-.148-.669.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.099-.199.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.241-.579-.486-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.005-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347Z" />
      </svg>
    </a>
  );
}
