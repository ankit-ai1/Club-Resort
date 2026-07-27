"use client";

import { useRef, type ReactNode } from "react";
import { useMagnetic } from "@/lib/useMagnetic";

export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useMagnetic(ref, strength);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
