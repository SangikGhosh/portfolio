import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useViewport } from "../lib/hooks";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * The chapter break. A terminal cursor block sits under the quote, blinking.
 * Scroll and it "selects the line" (stretches to full width), then "selects all"
 * (floods the screen) — paper becomes night.
 */
export default function ChapterTransition() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { w, h } = useViewport();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [idle, setIdle] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (v) => setIdle(v < 0.004));

  const CY = 0.34; // cursor sits a third of the way down the viewport
  const bw = Math.max(14, Math.round(w * 0.011));
  const bh = Math.round(bw * 1.85);

  const clip = useTransform(scrollYProgress, (p) => {
    const t = clamp01(p / 0.72);
    // phase A: select the line (width), phase B: select all (height)
    const a = easeInOut(clamp01(t / 0.42));
    const b = easeInOut(clamp01((t - 0.42) / 0.58));
    const width = lerp(bw, w + 2, a);
    const lineH = lerp(bh, bh * 1.6, a);
    const top = lerp(h * CY - lineH / 2, 0, b);
    const bottom = lerp(h - (h * CY + lineH / 2), 0, b);
    const side = Math.max(0, (w - width) / 2);
    const r = lerp(2, 0, t);
    return `inset(${top.toFixed(1)}px ${side.toFixed(1)}px ${bottom.toFixed(1)}px ${side.toFixed(1)}px round ${r.toFixed(1)}px)`;
  });

  const titleOpacity = useTransform(scrollYProgress, [0.62, 0.86], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.62, 0.9], [18, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  if (reduce) {
    return (
      <div className="night flex min-h-[80svh] items-center justify-center text-center">
        <ChapterTitle />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[260svh]" aria-label="Chapter two">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.p
          style={{ opacity: hintOpacity, top: `calc(${CY * 100}% + ${bh}px)` }}
          className="mono-meta absolute left-1/2 -translate-x-1/2 text-ink-muted"
          aria-hidden="true"
        >
          scroll to continue
        </motion.p>

        <motion.div
          aria-hidden="true"
          className={idle ? "blink absolute inset-0 bg-night" : "absolute inset-0 bg-night"}
          style={{ clipPath: clip, WebkitClipPath: clip }}
        />

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[var(--gutter)] text-center"
        >
          <ChapterTitle />
        </motion.div>
      </div>
    </div>
  );
}

function ChapterTitle() {
  return (
    <div style={{ "--accent-color": "#FF7A63" }}>
      <p className="eyebrow !text-night-muted">Chapter two</p>
      <h2 className="mt-6 text-display text-night-text">
        Off the <em className="accent">clock</em>.
      </h2>
      <p className="mono-meta mx-auto mt-6 max-w-[26rem] text-night-muted">
        the practice behind the work — who I am, what I train, where I&rsquo;m going
      </p>
    </div>
  );
}
