import Link from "next/link";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Club Platinum Resort home">
      <span className="relative inline-flex h-10 w-10 items-center justify-center">
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <defs>
            <linearGradient id="lg-plat" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E4C77E" />
              <stop offset="0.55" stopColor="#C9A24B" />
              <stop offset="1" stopColor="#A57F2E" />
            </linearGradient>
          </defs>
          <path
            d="M24 2 46 24 24 46 2 24Z"
            fill="none"
            stroke="url(#lg-plat)"
            strokeWidth="1.5"
            className="transition-transform duration-500 group-hover:rotate-45"
            style={{ transformOrigin: "center" }}
          />
          <path d="M24 10 38 24 24 38 10 24Z" fill="url(#lg-plat)" opacity="0.16" />
          <text
            x="24"
            y="30"
            textAnchor="middle"
            fontFamily="var(--font-fraunces), serif"
            fontSize="17"
            fontWeight="600"
            fill="url(#lg-plat)"
          >
            P
          </text>
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-lg font-semibold tracking-tight text-white">
            Club Platinum
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light/80">
            Resort
          </span>
        </span>
      )}
    </Link>
  );
}
