"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  seed?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

/**
 * A resilient <img>. If the remote source fails to load, it falls back to a
 * high-quality Picsum photo keyed by `seed`, so the layout is never broken.
 */
export default function SmartImage({
  src,
  alt,
  seed = "platinum",
  className = "",
  width = 1200,
  height = 800,
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const finalSrc = failed
    ? `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`
    : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
