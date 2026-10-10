import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "../lib/hooks";

const INTERACTIVE = "a, button, [role='button'], summary, select, label";
const FOLLOW = { stiffness: 520, damping: 42, mass: 0.45 };

/*
 * The system pointer always stays visible — this only adds to it.
 * A soft, see-through disc trails the pointer (blended with `difference`, so it reads as light
 * grey on white, dark grey on black and a tint over colour). Over anything clickable it fills
 * in and inverts what it covers; over
 * elements with data-cursor="Label" it turns into a tag beside the pointer saying what a
 * click will do.
 */
export default function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, FOLLOW);
  const sy = useSpring(y, FOLLOW);
  const last = useRef({ x: -200, y: -200 });
  const [label, setLabel] = useState(null);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [down, setDown] = useState(false);

  const on = fine && !reduce;

  useEffect(() => {
    if (!on) return undefined;

    const read = (el) => {
      const t = el instanceof Element ? el : null;
      if (!t) return;
      const labelled = t.closest("[data-cursor]");
      setLabel(labelled ? labelled.getAttribute("data-cursor") : null);
      setHover(!labelled && Boolean(t.closest(INTERACTIVE)));
      setHidden(Boolean(t.closest("input, textarea, iframe")));
    };

    const move = (e) => {
      last.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      read(e.target);
    };
    // content scrolls under a still pointer: re-check what is under it
    const scroll = () => {
      const { x: px, y: py } = last.current;
      if (px >= 0) read(document.elementFromPoint(px, py));
    };
    const out = (e) => {
      if (!e.relatedTarget) setHidden(true);
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    const blur = () => setHidden(true);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("mouseout", out);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", blur);
    };
  }, [on, x, y]);

  if (!on) return null;

  const size = hover ? 52 : 24;

  const fade = { opacity: hidden ? 0 : 1 };

  return (
    <>
      {/* the disc — no outline, just a soft tint; it inverts what it covers on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: sx, y: sy }}
        animate={fade}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute left-0 top-0 rounded-full"
          initial={false}
          animate={{
            width: size,
            height: size,
            x: -size / 2,
            y: -size / 2,
            scale: label ? 0 : down ? 0.8 : 1,
            backgroundColor: hover ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.12)",
          }}
          transition={{ type: "spring", stiffness: 480, damping: 34 }}
        />
      </motion.div>

      {/* the tag — solid, never blended, so it stays legible over the coloured covers */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: sx, y: sy }}
        animate={fade}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute left-4 top-4 flex h-9 origin-top-left items-center whitespace-nowrap rounded-full bg-ink px-4 text-[0.8125rem] text-paper outline outline-1 outline-paper/25"
          initial={false}
          animate={{ opacity: label ? 1 : 0, scale: label ? (down ? 0.92 : 1) : 0.5 }}
          transition={{ type: "spring", stiffness: 480, damping: 34 }}
        >
          {label}
        </motion.div>
      </motion.div>
    </>
  );
}
