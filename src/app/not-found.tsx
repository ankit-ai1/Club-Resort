import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section flex min-h-[80vh] items-center justify-center py-32 text-center">
      <div>
        <p className="font-display text-8xl font-semibold text-gradient-aqua sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
          This slide leads nowhere
        </h1>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          The page you&apos;re after has drifted off. Let&apos;s get you back to dry land.
        </p>
        <Link href="/" className="btn-gold mt-8">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </section>
  );
}
