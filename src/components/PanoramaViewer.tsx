"use client";

import { useRef, useState } from "react";
import { Move, Maximize2 } from "lucide-react";
import SmartImage from "./SmartImage";

export default function PanoramaViewer({
  src,
  seed,
  label,
}: {
  src: string;
  seed: string;
  label: string;
}) {
  const [x, setX] = useState(50);
  const dragging = useRef(false);
  const last = useRef(0);

  const start = (clientX: number) => {
    dragging.current = true;
    last.current = clientX;
  };
  const move = (clientX: number) => {
    if (!dragging.current) return;
    const delta = clientX - last.current;
    last.current = clientX;
    setX((v) => Math.min(100, Math.max(0, v - delta * 0.12)));
  };
  const end = () => (dragging.current = false);

  return (
    <div
      className="group relative aspect-[16/9] cursor-grab overflow-hidden rounded-[1.75rem] border border-white/10 shadow-lift active:cursor-grabbing"
      onMouseDown={(e) => start(e.clientX)}
      onMouseMove={(e) => move(e.clientX)}
      onMouseUp={end}
      onMouseLeave={end}
      onTouchStart={(e) => start(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchEnd={end}
    >
      <div className="absolute inset-0 scale-[1.6]" style={{ transform: `translateX(${(50 - x) * 0.9}%) scale(1.6)` }}>
        <SmartImage src={src} seed={seed} alt={label} className="h-full w-full object-cover" width={2000} height={1000} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />

      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ink/60 px-4 py-2 text-xs font-medium text-white backdrop-blur">
        <Maximize2 className="h-3.5 w-3.5 text-aqua" /> {label}
      </div>
      <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink/60 px-4 py-2 text-xs text-white/80 backdrop-blur transition-opacity group-hover:opacity-0">
        <Move className="h-3.5 w-3.5 text-aqua" /> Drag to look around
      </div>
    </div>
  );
}
