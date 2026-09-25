import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Lenis from "@studio-freight/lenis";

const SmoothContext = createContext({ scrollTo: () => {}, lock: () => {} });

const NAV_OFFSET = -24;

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    // lerp 0.1 ≈ the decay curve measured on the reference (≈0.9 per frame)
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenisRef.current = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target, opts = {}) => {
    const el =
      typeof target === "string"
        ? target === "top"
          ? 0
          : document.getElementById(target)
        : target;
    if (el === null || el === undefined) return;
    const offset = opts.offset ?? NAV_OFFSET;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset,
        duration: opts.duration ?? 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else if (el === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  /** Freeze page scroll while an overlay is open. */
  const lock = useCallback((on) => {
    const lenis = lenisRef.current;
    if (on) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = on ? "hidden" : "";
  }, []);

  return <SmoothContext.Provider value={{ scrollTo, lock }}>{children}</SmoothContext.Provider>;
}

SmoothScrollProvider.propTypes = { children: PropTypes.node };

export const useSmoothScroll = () => useContext(SmoothContext);
