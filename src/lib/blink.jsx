import { createContext, useCallback, useContext, useId, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";

/*
 * Eyelids.
 * A full-screen black sheet with an elliptical hole cut out by a soft (blurred) mask.
 * `open` is the hole's vertical scale: 0 = eyes shut (all black), 1 = a lens-shaped view,
 * ≥1.35 = fully open, corners included. The same drawing powers the preloader reveal,
 * every navigation jump, the case-study overlay and the scroll-scrubbed chapter changes.
 */
export function Lids({ open, className, style }) {
  const raw = useId();
  const id = raw.replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={`b${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <mask id={`m${id}`}>
          <rect width="100" height="100" fill="#fff" />
          <motion.ellipse
            cx="50"
            cy="50"
            rx="72"
            ry="62"
            fill="#000"
            filter={`url(#b${id})`}
            style={{ scaleY: open, transformBox: "view-box" }}
          />
        </mask>
      </defs>
      <rect width="100" height="100" fill="#000" mask={`url(#m${id})`} />
    </svg>
  );
}

const CLOSE = { duration: 0.5, ease: [0.7, 0, 0.2, 1] };
const OPEN = { duration: 0.95, ease: [0.25, 0.1, 0.1, 1] };
const FULL = 1.35;

const BlinkContext = createContext({
  blink: async (fn) => fn?.(),
  reveal: () => {},
  revealed: true,
});

export function BlinkProvider({ children }) {
  const reduce = useReducedMotion();
  const open = useMotionValue(0); // the page boots with its eyes shut — that black is the preloader
  const shown = useMotionValue(1);
  const busy = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const openEyes = useCallback(async () => {
    shown.set(1);
    await animate(open, FULL, OPEN);
    shown.set(0);
  }, [open, shown]);

  /** Close the eyes, do something unseen (jump, open a page), open them again. */
  const blink = useCallback(
    async (during) => {
      if (reduce) {
        await during?.();
        return;
      }
      if (busy.current) return;
      busy.current = true;
      open.set(FULL);
      await Promise.all([animate(shown, 1, { duration: 0.16 }), animate(open, 0, CLOSE)]);
      await during?.();
      // two frames for layout to settle under the closed lids
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await openEyes();
      busy.current = false;
    },
    [open, openEyes, reduce, shown],
  );

  /** Called once by the preloader. */
  const reveal = useCallback(() => {
    setRevealed(true);
    if (reduce) {
      open.set(FULL);
      shown.set(0);
      return;
    }
    openEyes();
  }, [open, openEyes, reduce, shown]);

  const value = useMemo(() => ({ blink, reveal, revealed }), [blink, reveal, revealed]);

  return (
    <BlinkContext.Provider value={value}>
      {children}
      <motion.div className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: shown }}>
        <Lids open={open} className="h-full w-full" />
      </motion.div>
    </BlinkContext.Provider>
  );
}

export const useBlink = () => useContext(BlinkContext);
