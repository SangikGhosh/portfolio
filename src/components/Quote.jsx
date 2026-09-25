import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";
import { testimonials } from "../data/content";
import { Reveal } from "./ui/primitives";

export default function Quote() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section aria-label="What collaborators say" className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(4rem,8vw,7rem)]">
      <div className="shell">
        <Reveal className="mx-auto max-w-[50rem] text-center">
          <p className="eyebrow mb-[clamp(2rem,4vw,3rem)]">In their words</p>
          <div className="relative min-h-[clamp(12rem,22vw,15.5rem)]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="serif-italic text-quote text-ink">
                  <span className="text-ink-muted">“</span>
                  {t.quote[0]}
                  <span className="text-accent">{t.quote[1]}</span>
                  {t.quote[2]}
                  <span className="text-ink-muted">”</span>
                </blockquote>
                <figcaption className="eyebrow mt-8 text-[0.78rem] tracking-[0.16em]">
                  {t.name} — {t.role}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6" role="tablist" aria-label="Choose a testimonial">
            {testimonials.map((q, i) => (
              <button
                key={q.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Quote from ${q.name}`}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative pb-1.5 font-mono text-[0.78rem] tracking-[0.08em] transition-colors duration-250",
                  i === active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {String(i + 1).padStart(2, "0")}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px origin-left bg-ink transition-transform duration-400 ease-emphasized",
                    i === active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                  )}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
