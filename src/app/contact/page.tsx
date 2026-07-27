import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/UI";
import { site, img } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Book",
  description:
    "Get in touch with Club Platinum Resort — book a visit, request a group quote, or plan your event. Call, email or WhatsApp us.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="Contact & Book"
        intro="Tell us what you're planning — a day out, a group trip, a stay or an event — and we'll make it easy from here."
        image={img.cocktail}
        seed="contact-hero"
      />

      <section className="section py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Enquire"
              title="Start your booking"
              intro="Fill this in and we'll pick it up right away. In a hurry? WhatsApp or call us directly — details are on the right."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Visit us", lines: [site.address] },
              { icon: Phone, title: "Call us", lines: site.phones, hrefs: site.phones.map((p) => `tel:${p.replace(/\s/g, "")}`) },
              { icon: Mail, title: "Email us", lines: [site.email], hrefs: [`mailto:${site.email}`] },
              { icon: MessageCircle, title: "WhatsApp", lines: ["Chat with us instantly"], hrefs: [`https://wa.me/${site.whatsapp}`] },
              { icon: Clock, title: "Open", lines: ["All days · 10:00 AM – 6:00 PM", "Timings vary by season"] },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i}>
                <div className="flex gap-4 rounded-2xl border border-white/10 bg-abyss/40 p-6">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aqua/10 text-aqua">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                    <div className="mt-1 space-y-0.5 text-sm text-white/60">
                      {c.lines.map((l, idx) =>
                        c.hrefs?.[idx] ? (
                          <a key={l} href={c.hrefs[idx]} target={c.hrefs[idx].startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block hover:text-aqua-light">
                            {l}
                          </a>
                        ) : (
                          <p key={l}>{l}</p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={5}>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src={site.mapEmbed}
                  title="Club Platinum Resort location"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
