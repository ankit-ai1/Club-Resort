import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTABand } from "@/components/UI";
import { blogPosts } from "@/data/site";

const bodies: Record<string, string[]> = {
  "best-day-outing-near-delhi": [
    "There's a particular kind of tired that comes from a weekend spent circling a mall. The parking, the food court, the same shops you saw last month — it rarely leaves anyone feeling like they actually got away. The good news is that a genuine change of scene sits barely an hour from the city.",
    "Trade the concrete for twelve green acres and the day rewrites itself. Mornings are for the water — the wave pool at full swell, a lazy float down the river, the little ones squealing under the tipping buckets. Afternoons drift toward the rides, then the adventure zone for anyone still full of beans.",
    "The trick to a great day out is removing decisions. Pick one gate pass that covers everything, plan your meals around a buffet so nobody goes hungry, and leave room in the schedule to do nothing at all. The best memories tend to happen in the unplanned gaps.",
    "By evening, the pace slows on its own. A proper meal, a last slow lap of the grounds, and the drive home with a car full of happily exhausted people. That's the reset a mall can never quite deliver.",
  ],
  "monsoon-splash-guide": [
    "Everyone pictures a water park under a blazing sun, but ask a regular and they'll tell you a secret: the shoulder season, when the first rains arrive, is the sweet spot. Warm water, cooler air, and noticeably shorter queues for the big slides.",
    "There's something cinematic about the wave pool in a light drizzle — the surface alive, the crowd thinner, the whole place feeling a little more yours. The rain-dance arena, of course, needs no encouragement from the weather; it's a downpour by design.",
    "A few practical notes for a monsoon visit: pack a change of clothes and a dry bag, check timings before you set out as they shift with the season, and keep an eye on lifeguard signals during heavier spells. Safety always sets the pace.",
    "Go with the flow and the monsoon becomes the best time to visit rather than the worst. Fewer people, softer light, and the pure joy of being wet on purpose while the sky joins in.",
  ],
  "corporate-offsite-checklist": [
    "A good offsite is one part agenda and three parts atmosphere. The teams that come back raving are rarely the ones with the densest slide decks — they're the ones who found time to actually be together away from their desks.",
    "Start with the non-negotiables: a room with reliable AV, strong Wi-Fi, and power where people sit. Nothing derails a session faster than a projector that won't connect. Confirm these before anything else.",
    "Then build in the human parts. A team challenge in the adventure park does more for cohesion than any icebreaker on a whiteboard. A shared meal, unhurried, does the rest. Keep at least one block of the day loose enough for genuine conversation.",
    "Finally, hand the logistics to someone else. A single on-site coordinator who owns the timings, the catering and the transitions frees you to be present with your team — which was the whole point of leaving the office in the first place.",
  ],
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const body = bodies[post.slug] ?? [post.excerpt];
  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero eyebrow={`${post.date} · ${post.readMins} min read`} title={post.title} image={post.image} seed={post.slug} />

      <article className="section py-20 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-aqua-light">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
          </Reveal>

          <div className="mt-8 space-y-6">
            {body.map((para, i) => (
              <Reveal key={i} delay={i}>
                <p className={`leading-relaxed text-white/75 ${i === 0 ? "text-xl text-white/90" : "text-base"}`}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 rounded-2xl border border-white/10 bg-abyss/40 p-7 text-center">
            <p className="font-display text-xl text-white">Sound like your kind of day?</p>
            <Link href="/contact" className="btn-gold mt-5">
              Plan your visit <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section pb-24">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold text-white">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {others.map((o) => (
                <Link key={o.slug} href={`/blog/${o.slug}`} className="group rounded-2xl border border-white/10 bg-abyss/40 p-7 card-hover">
                  <span className="text-xs uppercase tracking-widest text-gold-light">{o.date}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white transition-colors group-hover:text-aqua-light">{o.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{o.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
