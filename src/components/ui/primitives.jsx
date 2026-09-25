import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/** One-shot fade-up as the element enters the viewport. */
export function Reveal({ children, delay = 0, y = 20, className, as = "div", amount = 0.15, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
Reveal.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  y: PropTypes.number,
  className: PropTypes.string,
  as: PropTypes.string,
  amount: PropTypes.number,
};

/** Renders ["plain ", "accent", " tail"] — the site's one typographic device. */
export function AccentText({ parts, quiet = false }) {
  const [pre, acc, post] = parts;
  return (
    <>
      {pre}
      <em className={quiet ? "accent accent-quiet" : "accent"}>{acc}</em>
      {post}
    </>
  );
}
AccentText.propTypes = { parts: PropTypes.arrayOf(PropTypes.string).isRequired, quiet: PropTypes.bool };

/** Counts from 0 to `to` once it's in view. The final value is always in the accessible name. */
export function CountUp({ to, duration = 1.15, format = (n) => n.toLocaleString("en-IN"), className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
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
    <span ref={ref} className={className} aria-label={format(to)}>
      <span aria-hidden="true">{format(value)}</span>
    </span>
  );
}
CountUp.propTypes = {
  to: PropTypes.number.isRequired,
  duration: PropTypes.number,
  format: PropTypes.func,
  className: PropTypes.string,
};

/* ── Icons: 1.5px strokes, drawn to sit on the text baseline ── */
const Svg = ({ children, className = "h-[0.95em] w-[0.95em]", ...p }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...p}
  >
    {children}
  </svg>
);
Svg.propTypes = { children: PropTypes.node, className: PropTypes.string };

export const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M5 11 11 5M6 5h5v5" />
  </Svg>
);
export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </Svg>
);
export const ArrowDown = (p) => (
  <Svg {...p}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </Svg>
);
export const Play = ({ className = "h-[0.8em] w-[0.8em]" }) => (
  <svg viewBox="0 0 12 12" aria-hidden="true" className={className}>
    <path d="M2.5 1.6v8.8L10.2 6z" fill="currentColor" />
  </svg>
);
Play.propTypes = { className: PropTypes.string };
