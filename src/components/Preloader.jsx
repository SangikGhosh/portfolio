import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useBlink } from "../lib/blink";
import { useSmoothScroll } from "../lib/smooth";
import { useZonedTime } from "../lib/hooks";
import { firstHeroImage, heroOrder } from "../lib/heroImages";
import { profile } from "../data/content";
import { EASE, EASE_IN_OUT } from "./ui/primitives";

const SEEN = "sg-seen";
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const pageLoaded = () =>
  new Promise((r) => (document.readyState === "complete" ? r() : window.addEventListener("load", r, { once: true })));

/** One odometer wheel: the digits stacked in a column, rolled into place. */
function Digit({ d }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden align-top">
      <motion.span
        className="flex flex-col"
        initial={false}
        animate={{ y: `${-Number(d)}em` }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {DIGITS.map((n) => (
          <span key={n} className="block h-[1em] leading-[1em]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/*
 * The page opens with its eyes shut. On the black: the name and the year in the corners, a
 * rolling counter, a hairline that fills, and — once it has arrived — the first picture the
 * hero will show, in a small window at the centre. At 100 everything slides away and the
 * lids part onto the hero, where that same picture is waiting.
 */
export default function Preloader() {
  const { reveal } = useBlink();
  const { lock } = useSmoothScroll();
  const reduce = useReducedMotion();
  const time = useZonedTime(profile.timezone);
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const [picture, setPicture] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    let alive = true;
    firstHeroImage.then((ok) => alive && ok && setPicture(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const open = () => {
      document.documentElement.classList.remove("is-loading");
      lock(false);
      reveal();
    };

    if (reduce) {
      setN(100);
      setDone(true);
      open();
      return undefined;
    }

    lock(true);
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {
      /* storage unavailable — fine */
    }
    const step = seen ? 70 : 170; // ms between counts
    const minMs = seen ? 650 : 1900; // never rush the first impression
    let ready = false;
    const cap = setTimeout(() => (ready = true), 4500); // a slow network never blocks the page
    Promise.all([document.fonts?.ready ?? Promise.resolve(), pageLoaded(), firstHeroImage]).then(() => (ready = true));

    const t0 = performance.now();
    let v = 0;
    let timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    // count in uneven strides, holding short of 100 until everything is in
    const tick = () => {
      const elapsed = performance.now() - t0;
      const ceiling = ready && elapsed >= minMs ? 100 : Math.min(92, Math.round((elapsed / minMs) * 92) + 4);
      if (v < ceiling) v = Math.min(ceiling, v + 4 + Math.floor(Math.random() * 13));
      setN(v);
      if (v >= 100) {
        if (fired.current) return;
        fired.current = true;
        try {
          sessionStorage.setItem(SEEN, "1");
        } catch {
          /* ignore */
        }
        later(() => setLeaving(true), 380);
        later(() => {
          setDone(true);
          open();
        }, 380 + 720);
        return;
      }
      later(tick, step);
    };
    later(tick, 260);

    return () => {
      clearTimeout(cap);
      timers.forEach(clearTimeout);
      timers = [];
    };
  }, [lock, reduce, reveal]);

  const count = String(n).padStart(3, "0");
  const out = { duration: 0.6, ease: EASE_IN_OUT };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[95] text-paper"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* corners */}
          <motion.div
            className="absolute inset-x-0 top-0 flex items-start justify-between px-gutter pt-[clamp(0.9rem,1.9vw,2.1rem)] text-[clamp(0.95rem,0.6vw+0.45rem,1.2rem)] leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: leaving ? 0 : 1, y: leaving ? -12 : 0 }}
            transition={leaving ? out : { duration: 0.8, delay: 0.1 }}
          >
            <span className="px-[0.5em] py-[0.3em] -ml-[0.5em]">©SangikGhosh</span>
            <span className="px-[0.5em] py-[0.3em] -mr-[0.5em] text-dim">Portfolio ©{new Date().getFullYear()}</span>
          </motion.div>

          {/* the first picture, as soon as it has arrived */}
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              className="relative aspect-[4/3] w-[clamp(7rem,12vw,11rem)] overflow-hidden rounded-[3px]"
              initial={false}
              animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 0.92 : 1 }}
              transition={out}
            >
              <AnimatePresence>
                {picture && heroOrder[0] && (
                  <motion.img
                    key="first"
                    src={heroOrder[0]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.18 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                    transition={{ duration: 1.1, ease: EASE_IN_OUT }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* bottom row: where and when, and the count */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-gutter pb-[clamp(1.1rem,2.4vw,2.4rem)]">
            <motion.p
              className="pb-[0.35em] text-[clamp(0.95rem,0.6vw+0.45rem,1.2rem)] leading-tight text-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: leaving ? 0 : 1 }}
              transition={leaving ? out : { duration: 0.8, delay: 0.2 }}
            >
              {profile.city}, IN · <span className="tabular">{time}</span>
            </motion.p>

            <div className="-mr-2 overflow-hidden pb-[0.04em] pr-2">
              <motion.p
                className="flex items-start font-display text-[clamp(4.5rem,11vw,10.5rem)] leading-none tracking-[-0.04em] tabular"
                initial={{ y: "105%" }}
                animate={{ y: leaving ? "-105%" : "0%" }}
                transition={leaving ? out : { duration: 1, ease: EASE, delay: 0.15 }}
              >
                <Digit d={count[0]} />
                <Digit d={count[1]} />
                <Digit d={count[2]} />
                <span className="ml-[0.08em] mt-[0.12em] text-[0.22em] leading-none text-dim">%</span>
              </motion.p>
            </div>
          </div>

          {/* the hairline that fills */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-paper/15">
            <motion.div
              className="h-full origin-left bg-paper"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: n / 100, opacity: leaving ? 0 : 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
