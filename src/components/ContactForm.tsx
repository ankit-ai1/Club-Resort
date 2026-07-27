"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Send, CheckCircle2 } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/data/site";

const interests = ["Day outing", "Water park", "Corporate offsite", "School / college", "Stay & rooms", "Banquet / event"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: interests[0], message: "" });
  const panelRef = useRef<HTMLDivElement>(null);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend in this template — hand off to WhatsApp with a prefilled message.
    const text = encodeURIComponent(
      `Hi Club Platinum! I'm ${form.name}.\nInterest: ${form.interest}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  };

  useGSAP(
    () => {
      if (!panelRef.current || prefersReducedMotion()) return;
      gsap.fromTo(panelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    },
    { dependencies: [sent] }
  );

  const field =
    "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-aqua focus:bg-white/[0.05]";

  return (
    <div className="relative rounded-[1.75rem] border border-white/10 bg-abyss/50 p-7 sm:p-9">
      <div ref={panelRef}>
        {sent ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-14 w-14 text-aqua" />
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">Thanks, {form.name || "friend"}!</h3>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              We&apos;ve opened WhatsApp with your details so you can send it in one tap. Prefer a call? Ring us on{" "}
              {site.phones[0]}.
            </p>
            <button onClick={() => setSent(false)} className="btn-ghost mt-7">
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/60">Your name</label>
                <input required value={form.name} onChange={(e) => update("name", e.target.value)} className={field} placeholder="Priya Sharma" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/60">Phone</label>
                <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={field} placeholder="+91 ..." />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Email</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={field} placeholder="you@email.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">I&apos;m interested in</label>
              <select value={form.interest} onChange={(e) => update("interest", e.target.value)} className={`${field} appearance-none`}>
                {interests.map((i) => (
                  <option key={i} className="bg-abyss text-white">
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={4}
                className={`${field} resize-none`}
                placeholder="Group size, preferred date, anything else we should know..."
              />
            </div>
            <button type="submit" className="btn-gold w-full">
              Send enquiry <Send className="h-4 w-4" />
            </button>
            <p className="text-center text-[11px] text-white/40">
              This opens WhatsApp with your details prefilled. We usually reply within the hour.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
