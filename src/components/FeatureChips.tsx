import type { LucideIcon } from "lucide-react";
import Magnetic from "./anim/Magnetic";
import PopReveal from "./anim/PopReveal";

export default function FeatureChips({ items }: { items: { icon: LucideIcon; label: string }[] }) {
  return (
    <PopReveal className="mt-8 grid gap-4 sm:grid-cols-3">
      {items.map((f) => (
        <div key={f.label} data-pop-item>
          <Magnetic strength={0.2} className="block w-full">
            <div data-cursor-hover className="glass rounded-2xl p-5">
              <f.icon className="h-6 w-6 text-aqua" />
              <p className="mt-3 text-sm font-medium text-white/80">{f.label}</p>
            </div>
          </Magnetic>
        </div>
      ))}
    </PopReveal>
  );
}
