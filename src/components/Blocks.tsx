import type { LucideIcon } from "lucide-react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import SmartImage from "./SmartImage";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import RevealImage from "./anim/RevealImage";
import TiltCard from "./anim/TiltCard";
import Magnetic from "./anim/Magnetic";
import { AltSlideReveal, FlipStagger, FlipStaggerItem } from "./anim/CardReveal";

export function FeatureCards({
  items,
}: {
  items: { icon: LucideIcon; title: string; text: string }[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <AltSlideReveal key={f.title} index={i}>
          <TiltCard radiusClassName="rounded-2xl" className="h-full">
            <div className="group h-full rounded-2xl border border-white/10 bg-abyss/40 p-7 transition-shadow duration-500 hover:shadow-lift">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-aqua/10 text-aqua transition-colors duration-500 group-hover:bg-aqua group-hover:text-ink">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{f.text}</p>
            </div>
          </TiltCard>
        </AltSlideReveal>
      ))}
    </div>
  );
}

export function RideChips({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal className="rounded-2xl border border-white/10 bg-abyss/40 p-7">
      <h3 className="font-display text-xl font-semibold text-gradient-gold">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {items.map((r) => (
          <span
            key={r}
            className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/75 transition-colors hover:border-aqua hover:text-aqua-light"
          >
            {r}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export function PackageCards({
  items,
}: {
  items: {
    name: string;
    price: string;
    unit?: string;
    highlight?: boolean;
    features: string[];
  }[];
}) {
  return (
    <FlipStagger className="grid gap-6 lg:grid-cols-3">
      {items.map((p) => (
        <FlipStaggerItem key={p.name}>
          <TiltCard radiusClassName="rounded-[1.75rem]" className="h-full" maxTilt={6}>
            <div
              className={`relative flex h-full flex-col p-8 ${
                p.highlight
                  ? "border border-gold/40 bg-gradient-to-b from-gold/[0.12] to-transparent shadow-gold"
                  : "border border-white/10 bg-abyss/40"
              }`}
            >
              {p.highlight && (
                <span className="absolute right-6 top-6 rounded-full bg-gold-grad px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
                  Popular
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold text-white">{p.name}</h3>
              <div className="mt-4 flex items-end gap-1.5">
                <span className="font-display text-4xl font-semibold text-gradient-aqua">{p.price}</span>
                {p.unit && <span className="mb-1.5 text-sm text-white/50">{p.unit}</span>}
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua" /> {f}
                  </li>
                ))}
              </ul>
              <Magnetic strength={0.25} className="mt-7 block w-full">
                <Link href="/contact" data-cursor-hover className={`${p.highlight ? "btn-gold" : "btn-ghost"} w-full`}>
                  Enquire now
                </Link>
              </Magnetic>
            </div>
          </TiltCard>
        </FlipStaggerItem>
      ))}
    </FlipStagger>
  );
}

export function SplitFeature({
  eyebrow,
  title,
  text,
  points,
  image,
  seed,
  reverse = false,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  text: string;
  points?: string[];
  image: string;
  seed?: string;
  reverse?: boolean;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
      <RevealImage className={reverse ? "lg:order-2" : ""}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-lift">
          <SmartImage src={image} seed={seed || title} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        </div>
      </RevealImage>
      <div className={reverse ? "lg:order-1" : ""}>
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold" /> {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-5 leading-relaxed text-white/65">{text}</p>
        </Reveal>
        {points && (
          <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <StaggerItem key={p}>
                <div className="flex items-center gap-2.5 text-sm text-white/75">
                  <Check className="h-4 w-4 text-aqua" /> {p}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
        {href && cta && (
          <Reveal delay={3} className="mt-8">
            <Magnetic strength={0.25}>
              <Link href={href} data-cursor-hover className="btn-aqua">
                {cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </Reveal>
        )}
      </div>
    </div>
  );
}
