import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBlink } from "../lib/blink";
import { useSmoothScroll } from "../lib/smooth";
import { useZonedTime } from "../lib/hooks";
import { navLinks, profile, socials } from "../data/content";
import { EASE, Roll } from "./ui/primitives";

/**
 * What sits under each nav box: "dark" over the black chapters, "light" everywhere else.
 * Re-read on scroll, so every box always matches — and melts into — the page behind it.
 */
function useTonesUnder(count, watch) {
  const els = useRef([]);
  const [tones, setTones] = useState(() => Array(count).fill("light"));

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const next = els.current.slice(0, count).map((el) => {
        if (!el || !el.offsetParent) return "light";
        const header = el.closest("header");
        const r = el.getBoundingClientRect();
        const under = document
          .elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
          .find((n) => !header.contains(n));
        return under && under.closest(".on-dark") ? "dark" : "light";
      });
      setTones((prev) => (prev.every((t, i) => t === next[i]) ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    const settle = setTimeout(read, 800); // after the menu or a blink has finished moving
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [count, watch]);

  const ref = useCallback((i) => (el) => (els.current[i] = el), []);
  return [tones, ref];
}

/*
 * Fixed, borderless. Each group sits in its own box — white over white, black over black —
 * so it is invisible until something passes beneath it. Every jump closes the eyes first.
 */
export default function Header() {
  const { blink, revealed } = useBlink();
  const { jump, lock } = useSmoothScroll();
  const time = useZonedTime(profile.timezone);
  const [open, setOpen] = useState(false);
  const [tones, box] = useTonesUnder(3, open);

  useEffect(() => {
    if (!open) return undefined;
    lock(true);
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      lock(false);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, lock]);

  const go = (target) => (e) => {
    e.preventDefault();
    setOpen(false);
    // the footer is black edge to edge, so it lands flush; everything else clears the header
    blink(() => jump(target, target === "contact" ? { offset: 0 } : undefined));
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="fixed inset-x-0 top-0 z-[70]"
      >
        <nav
          aria-label="Primary"
          className="grid grid-cols-[1fr_auto_1fr] items-start p-[clamp(0.625rem,0.9vw,1rem)] text-[clamp(1rem,0.6vw+0.5rem,1.25rem)] leading-tight"
        >
          <a
            ref={box(0)}
            data-tone={tones[0]}
            href="#top"
            onClick={go("top")}
            className="nav-box justify-self-start"
            aria-label="Sangik Ghosh, back to top"
          >
            <Roll>©SangikGhosh</Roll>
          </a>

          <ul ref={box(1)} data-tone={tones[1]} className="nav-box hidden gap-[0.5em] md:inline-flex">
            {navLinks
              .filter((l) => l.target !== "contact")
              .map((l) => (
                <li key={l.target}>
                  <a href={`#${l.target}`} onClick={go(l.target)} className="inline-flex items-start">
                    <Roll>{l.label}</Roll>
                    {l.count && <span className="count tabular">({l.count})</span>}
                  </a>
                </li>
              ))}
          </ul>

          <div className="col-start-3 flex items-start justify-end">
            <span ref={box(2)} data-tone={tones[2]} className="nav-box">
              <a href="#contact" onClick={go("contact")} className="hidden md:inline-flex">
                <Roll>Get in touch</Roll>
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu"
                className="md:hidden"
              >
                <Roll>{open ? "Close" : "Menu"}</Roll>
              </button>
            </span>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="on-dark fixed inset-0 z-[60] flex flex-col px-gutter pb-8 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {[{ label: "Home", target: "top" }, ...navLinks].map((l, i) => (
                <li key={l.target} className="border-b border-rule">
                  <a href={`#${l.target}`} onClick={go(l.target)} className="flex items-baseline justify-between py-3">
                    <span className="mask">
                      <motion.span
                        className="inline-block font-display text-[3rem] leading-none tracking-[-0.02em]"
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, delay: 0.25 + i * 0.05, ease: EASE }}
                      >
                        {l.label}
                      </motion.span>
                    </span>
                    <span className="tabular text-meta text-dim">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-meta">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
            <p className="mt-6 text-meta text-dim">
              {profile.city} {time} IST
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
