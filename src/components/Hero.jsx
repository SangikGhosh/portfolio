import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  easeInOut,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Terminal from "./Terminal";
import { buildScript } from "./terminalScript";
import { stack } from "../data/content";
import { useLiveStats } from "../lib/live";
import { SCREEN_FS, SCREEN_H_BIG, SCREEN_H_SMALL } from "../lib/terminalGeometry";
import { ArrowRight } from "./ui/primitives";

/** Wait for web fonts (max 700ms) so the entrance never shows a font swap. */
function useFontsReady(timeout = 700) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };
    const t = setTimeout(finish, timeout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(finish);
    else finish();
    return () => clearTimeout(t);
  }, [timeout]);
  return ready;
}

const EASE = [0.16, 1, 0.3, 1];

/* Scroll choreography, in viewport-heights of scroll (the device stays pinned for RUNWAY). */
const RUNWAY = 2.4; // × 100svh
/* How big the device gets once it takes the stage: bigger than in the hero, never overwhelming. */
const STAGE = { maxScale: 1.5, maxHeight: 0.7, maxWidth: 0.62 }; // × itself, × viewport h, × viewport w
const T = {
  lift: [0, 0.72], // device travels from its hero slot to the centre of an empty screen
  grow: [0.06, 0.72], // …and scales up
  tilt: [0, 0.32, 0.72], // tilts back in 3D, then settles flat
  screen: [0.18, 0.72], // its screen gets taller
  hint: [0, 0.07],
  run: [0.8, 1.08, 1.36, 1.64, 1.92], // each threshold executes the next command
};

/* ── the headline block: shared by the pinned and the static hero ── */
function HeroCopy({ ready, reduce, touch, slot, hintOpacity }) {
  const item = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.55, delay: 0.03 * i, ease: EASE },
  });

  return (
    <>
      <motion.p {...item(0)} className="eyebrow inline-flex items-center gap-3">
        <span className="h-[7px] w-[7px] rounded-full bg-accent-signal" />
        Jr. AI Engineer — Kolkata, IN
      </motion.p>

      <motion.h1 {...item(1)} className="mt-[clamp(1.1rem,2.6vh,1.9rem)] text-h1 text-ink">
        Robust systems,
        <br />
        <em className="accent">quietly</em> engineered.
      </motion.h1>

      <motion.p
        {...item(2)}
        className="mt-[clamp(1rem,2.4vh,1.6rem)] max-w-[38rem] text-[clamp(1.02rem,0.3vw+0.95rem,1.2rem)] leading-[1.55] text-ink-body"
      >
        Hi, I&rsquo;m Sangik. I build <span className="font-medium text-ink">LLM agents &amp; RAG</span>{" "}
        pipelines, the <span className="font-medium text-ink">FastAPI &amp; Spring Boot</span> backends
        behind them, and <span className="font-medium text-ink">Flutter</span> apps on top.
      </motion.p>

      <motion.ul
        {...item(3)}
        className="mt-[clamp(1.1rem,2.6vh,1.75rem)] flex max-w-[44rem] flex-wrap items-center justify-center gap-2.5"
        aria-label="Primary stack"
      >
        {stack.map((s) => (
          <li key={s.label} className="pill-drop h-[2.2rem] px-4 text-[0.93rem] font-medium text-ink-body">
            <span className="relative">{s.label}</span>
          </li>
        ))}
      </motion.ul>

      <div className="mt-[clamp(1.6rem,4vh,2.75rem)] w-full">{slot}</div>

      <motion.div style={{ opacity: hintOpacity }}>
        <motion.p
          {...item(6)}
          className="serif-italic mt-[clamp(1.4rem,3.2vh,2.2rem)] inline-flex items-center gap-2 text-[clamp(1.05rem,0.4vw+0.95rem,1.3rem)] text-ink-secondary"
        >
          {touch ? "Tap a key — it actually works" : "Press W, J, C or R — it actually works"}
          <ArrowRight className="h-4 w-4 translate-y-[1px] opacity-70" />
        </motion.p>
      </motion.div>
    </>
  );
}
HeroCopy.propTypes = {
  ready: PropTypes.bool,
  reduce: PropTypes.bool,
  touch: PropTypes.bool,
  slot: PropTypes.node,
  hintOpacity: PropTypes.object,
};

const COLUMN =
  "shell relative flex flex-col items-center justify-center pb-[clamp(2.5rem,6vh,4.5rem)] pt-[clamp(6rem,14vh,9rem)] text-center";

/* Reduced motion: the original, static hero. */
function StaticHero(props) {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className={`${COLUMN} flex-1`}>
        <HeroCopy {...props} slot={<Terminal />} />
      </div>
    </section>
  );
}

/*
 * The hero copy scrolls away like normal content. The device lives on a sticky stage above it:
 * it starts exactly where the copy leaves room for it, then — as you scroll — tilts back in 3D,
 * glides to the middle of an empty screen and grows until it owns the viewport, where it runs
 * a short, real session. When the session is done the page carries on to the work.
 */
function PinnedHero(props) {
  const wrapRef = useRef(null);
  const colRef = useRef(null);
  const slotRef = useRef(null);
  const devRef = useRef(null);
  const [geo, setGeo] = useState({ slotH: 0, y0: 0, S: 1, big: SCREEN_H_BIG, fsBig: SCREEN_FS });

  const live = useLiveStats();
  const script = useMemo(() => buildScript(live), [live]);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const slot = slotRef.current;
    const root = devRef.current && devRef.current.querySelector("[data-terminal-root]");
    const screen = root && root.querySelector("[data-screen]");
    if (!wrap || !slot || !root || !screen) return;

    const em = parseFloat(getComputedStyle(root).fontSize);
    const screenNow = screen.offsetHeight / em; // current screen height in device em
    const hSmall = root.offsetHeight - (screenNow - SCREEN_H_SMALL) * em; // device height at rest
    const w0 = root.offsetWidth;
    const V = window.innerHeight;
    const W = window.innerWidth;
    const narrow = W < 640;

    // phones can't scale wider, so the screen grows taller (and its text a touch larger) instead
    const chrome = hSmall / em - SCREEN_H_SMALL;
    const big = narrow ? Math.min(Math.max((STAGE.maxHeight * V) / em - chrome, 12), 60) : SCREEN_H_BIG;
    const hBig = hSmall + (big - SCREEN_H_SMALL) * em;
    const S = narrow
      ? 1
      : Math.max(1, Math.min((STAGE.maxHeight * V) / hBig, (STAGE.maxWidth * W) / w0, STAGE.maxScale));

    const slotTop = slot.getBoundingClientRect().top - wrap.getBoundingClientRect().top;
    const y0 = slotTop + hSmall / 2 - V / 2;

    setGeo((g) => {
      const next = { slotH: hSmall, y0, S, big, fsBig: narrow ? 0.9 : SCREEN_FS };
      const tol = { slotH: 0.5, y0: 0.5, S: 0.001, big: 0.01, fsBig: 0.001 };
      const same = Object.keys(next).every((k) => Math.abs(next[k] - g[k]) < tol[k]);
      return same ? g : next;
    });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, geo.slotH]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (colRef.current) ro.observe(colRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const s = useTransform(scrollYProgress, (p) => p * RUNWAY);

  const y = useTransform(s, T.lift, [geo.y0, 0], { ease: easeInOut });
  const scale = useTransform(s, T.grow, [1, geo.S], { ease: easeInOut });
  const rotateX = useTransform(s, T.tilt, [0, 16, 0]);
  const screenH = useTransform(s, T.screen, [SCREEN_H_SMALL, geo.big], { ease: easeInOut });
  const screenFs = useTransform(s, T.screen, [SCREEN_FS, geo.fsBig]);
  const hintOpacity = useTransform(s, T.hint, [1, 0]);

  // commands only ever move forward — a terminal doesn't un-run things
  const [runTo, setRunTo] = useState(0);
  useMotionValueEvent(s, "change", (v) => {
    const n = T.run.filter((t) => v >= t).length;
    setRunTo((cur) => (n > cur ? n : cur));
  });

  return (
    <section id="top" ref={wrapRef} className="relative" style={{ height: `${100 + RUNWAY * 100}svh` }}>
      {/* the copy: ordinary content that scrolls away */}
      <div className="absolute inset-x-0 top-0 min-h-[100svh] overflow-hidden">
        <div ref={colRef} className={`${COLUMN} min-h-[100svh]`}>
          <HeroCopy
            {...props}
            hintOpacity={hintOpacity}
            slot={<div ref={slotRef} aria-hidden="true" style={{ height: geo.slotH || undefined }} />}
          />
        </div>
      </div>

      {/* the stage: pinned while the device takes over the screen */}
      <div className="pointer-events-none sticky top-0 z-10 h-[100svh] [overflow-x:clip]">
        <div className="absolute inset-0 flex items-center justify-center px-[var(--gutter)]">
          <motion.div
            initial={props.reduce ? false : { opacity: 0, y: 18 }}
            animate={props.ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
          >
            <motion.div
              ref={devRef}
              className="pointer-events-auto origin-center"
              style={{ y, scale, rotateX, transformPerspective: 1100 }}
            >
              <Terminal screenH={screenH} screenFs={screenFs} script={script} runTo={runTo} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
PinnedHero.propTypes = { reduce: PropTypes.bool, ready: PropTypes.bool };

export default function Hero() {
  const ready = useFontsReady();
  const reduce = useReducedMotion();
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const props = { ready, reduce: Boolean(reduce), touch };
  return reduce ? <StaticHero {...props} /> : <PinnedHero {...props} />;
}
