import { Fragment, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export const EASE = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.76, 0, 0.24, 1];

/**
 * Text that rises into place word by word, each word behind its own mask.
 * `text` is a string, or an array of strings for explicit lines.
 * Without `play` it triggers on scroll-into-view; with `play` it waits for that flag.
 */
export function RiseText({
  text,
  as = "span",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.035,
  duration = 1.15,
  play,
  amount = 0.3,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px -8% 0px" });
  const go = play === undefined ? inView : play;
  const Tag = as;
  const lines = Array.isArray(text) ? text : [text];
  let i = 0;

  const word = (w, key) => (
    <span className="mask" key={key}>
      <motion.span
        className="inline-block will-change-transform"
        initial={reduce ? false : { y: "110%" }}
        animate={go ? { y: "0%" } : undefined}
        transition={{ duration, ease: EASE, delay: delay + i++ * stagger }}
      >
        {w}
      </motion.span>
    </span>
  );

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => {
          const words = line.split(" ");
          const content = words.map((w, wi) => (
            <Fragment key={wi}>
              {word(w, wi)}
              {wi < words.length - 1 && " "}
            </Fragment>
          ));
          return lines.length > 1 ? (
            <span key={li} className={cn("block", lineClassName)}>
              {content}
            </span>
          ) : (
            <Fragment key={li}>{content}</Fragment>
          );
        })}
      </span>
    </Tag>
  );
}

/** One-shot fade-up for blocks. */
export function FadeIn({ children, className, delay = 0, y = 24, as = "div", amount = 0.2, play, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const show = { opacity: 1, y: 0 };
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      {...(play === undefined
        ? { whileInView: show, viewport: { once: true, amount, margin: "0px 0px -8% 0px" } }
        : { animate: play ? show : undefined })}
      transition={{ duration: 1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** [ Label ] */
export function Label({ children, className, as: Tag = "p" }) {
  return <Tag className={cn("label", className)}>[ {children} ]</Tag>;
}

/** Text that rolls up to an identical copy on hover of its link or button. */
export function Roll({ children, className }) {
  return (
    <span className={cn("roll", className)}>
      <span data-text={children}>{children}</span>
    </span>
  );
}

const MAGNET = { stiffness: 260, damping: 18, mass: 0.6 };

/**
 * Leans toward the pointer while it is over the element, then springs home.
 * `strength` is the share of the pointer's offset it follows; `max` caps the travel in px.
 * Mouse only, and still for anyone who prefers reduced motion.
 */
export function Magnetic({ as = "div", strength = 0.4, max = 10, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, MAGNET);
  const sy = useSpring(y, MAGNET);
  const Tag = motion[as];
  const clamp = (v) => Math.max(-max, Math.min(max, v));

  const move = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength));
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Tag className={className} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  );
}

/** Counts from 0 to `to` once it's in view. The final value is always in the accessible name. */
export function CountUp({ to, duration = 1.6, format = (n) => n.toLocaleString("en-IN"), className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setValue(to);
      return undefined;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => setValue(Math.round(n)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{format(to)}</span>
      <span aria-hidden="true">{format(value)}</span>
    </span>
  );
}

/* ── Icons: hairline strokes, sized to the text ── */
const Svg = ({ children, className = "h-[0.85em] w-[0.85em]", ...p }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="square"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...p}
  >
    {children}
  </svg>
);

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M1.5 8h12.5M9 3l5 5-5 5" />
  </Svg>
);
export const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M3.5 12.5 12.5 3.5M5 3.5h7.5V11" />
  </Svg>
);
export const ArrowDown = (p) => (
  <Svg {...p}>
    <path d="M8 1.5V14M3 9l5 5 5-5" />
  </Svg>
);
export const ArrowUp = (p) => (
  <Svg {...p}>
    <path d="M8 14.5V2M3 7l5-5 5 5" />
  </Svg>
);
