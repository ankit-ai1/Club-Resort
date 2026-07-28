export default function NoiseOverlay() {
  return (
    // Outer layer is exactly the viewport and clips — the inner grain uses a
    // negative inset so its animated drift never reveals an edge, and the clip
    // keeps that negative inset from widening the document (mobile h-scroll).
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[85] overflow-hidden">
      <div
        className="absolute -inset-8 opacity-[0.035] mix-blend-overlay motion-safe:animate-grain"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
