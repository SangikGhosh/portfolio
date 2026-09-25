import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useHeadroom, useZonedTime } from "../lib/hooks";
import { useSmoothScroll } from "../lib/smooth";
import { navLinks, profile, socials } from "../data/content";
import { ArrowUpRight } from "./ui/primitives";

export default function Nav() {
  const { hidden, scrolled, headerRef } = useHeadroom(90);
  const { scrollTo } = useSmoothScroll();
  const time = useZonedTime(profile.timezone);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  const go = (target) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(target, target === "top" ? { offset: 0 } : undefined);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[transform,border-color,background-color] duration-400 ease-emphasized",
          "bg-paper/[0.84] backdrop-blur-[14px] backdrop-saturate-[1.2]",
          scrolled ? "border-hairline" : "border-transparent bg-paper/0 backdrop-blur-0",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <nav
          aria-label="Primary"
          className="flex h-[68px] items-center justify-between px-[var(--gutter)] md:h-[80px]"
        >
          <div className="flex items-center gap-5">
            <a
              href="#top"
              onClick={go("top")}
              className="group font-display text-[1.125rem] font-semibold tracking-[-0.02em] text-ink md:text-[1.2rem]"
              aria-label="Sangik Ghosh — back to top"
            >
              Sangik Ghosh
              <span className="inline-block text-accent-signal transition-transform duration-400 ease-emphasized group-hover:translate-x-[3px]">
                .
              </span>
            </a>
            <span className="mono-meta hidden items-center gap-2 text-ink-muted xl:inline-flex">
              <span className="h-px w-5 bg-hairline-strong" />
              {profile.city} <span className="tabular">{time}</span> IST
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-8">
            <ul className="hidden items-center gap-8 md:flex">
              {navLinks.map((l) => (
                <li key={l.target}>
                  <a
                    href={`#${l.target}`}
                    onClick={go(l.target)}
                    className="link-underline text-[0.975rem] text-[#4A4540] hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary h-10 px-[1.1rem] text-[0.9375rem]"
            >
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-10 w-10 place-items-center rounded-full md:hidden"
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-5 bg-ink transition-transform duration-400 ease-emphasized",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-5 bg-ink transition-transform duration-400 ease-emphasized",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-paper px-[var(--gutter)] pb-10 pt-28 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {[...navLinks, { label: "Top", target: "top" }].map((l, i) => (
                <motion.li
                  key={l.target}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${l.target}`}
                    onClick={go(l.target)}
                    className="flex items-baseline gap-4 border-b border-hairline py-4 font-display text-[2.4rem] font-semibold tracking-[-0.03em] text-ink"
                  >
                    <span className="mono-meta text-ink-muted">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-ink-secondary">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                  {s.label} <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
