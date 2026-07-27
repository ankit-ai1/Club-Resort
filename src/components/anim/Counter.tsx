"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  /** e.g. "12", "20+", "50k+", "4.6" — animates the numeric part, keeps prefix/suffix static */
  value: string;
  className?: string;
  duration?: number;
};

export default function Counter({ value, className, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "0";
  const suffix = match?.[3] ?? "";
  const target = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useGSAP(
    () => {
      if (!ref.current || Number.isNaN(target)) return;
      if (prefersReducedMotion()) {
        setDisplay(numStr);
        return;
      }
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        onUpdate: () => {
          setDisplay(decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val).toLocaleString("en-IN"));
        },
      });
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
