import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Lids } from "../lib/blink";
import { cn } from "../lib/utils";

/*
 * A pinned scene the page blinks over, scrubbed by scroll.
 *   mode="close": the scene is in view, then the lids close over it — the next chapter is black.
 *   mode="open":  arrives black, then the lids part onto the scene.
 * `anchor` puts an id at the point where the scene is fully visible, so a jump lands there
 * with the eyes open instead of on the black. `children` may be a function of the stage's
 * scroll progress (null when motion is reduced).
 */
export default function BlinkStage({ mode = "close", anchor, label, children, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const closing = mode === "close";
  const open = useTransform(p, closing ? [0.14, 0.9] : [0.04, 0.8], closing ? [1.35, 0] : [0, 1.35]);
  const lidOpacity = useTransform(p, closing ? [0.06, 0.14] : [0.8, 0.9], closing ? [0, 1] : [1, 0]);
  const blur = useTransform(
    p,
    closing ? [0.3, 0.88] : [0.08, 0.7],
    closing ? ["blur(0px)", "blur(10px)"] : ["blur(10px)", "blur(0px)"],
  );
  const scale = useTransform(p, closing ? [0.14, 0.9] : [0.04, 0.8], closing ? [1, 0.94] : [1.06, 1]);

  if (reduce) {
    return (
      <section aria-label={label} className={cn("relative h-[100svh]", className)}>
        {anchor && <span id={anchor} className="absolute top-0" />}
        {typeof children === "function" ? children(null) : children}
      </section>
    );
  }

  return (
    <section ref={ref} aria-label={label} className={cn("relative h-[220svh]", className)}>
      {anchor && <span id={anchor} aria-hidden="true" className="absolute top-[calc(100%-100svh)]" />}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ filter: blur, scale }}>
          {typeof children === "function" ? children(p) : children}
        </motion.div>
        <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: lidOpacity }}>
          <Lids open={open} className="h-full w-full" />
        </motion.div>
      </div>
    </section>
  );
}
