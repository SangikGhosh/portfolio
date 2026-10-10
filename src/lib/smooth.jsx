import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothContext = createContext({ scrollTo: () => {}, jump: () => {}, lock: () => {} });

const resolve = (target) =>
  typeof target === "string" ? (target === "top" ? 0 : document.getElementById(target)) : target;

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
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

  /** Glide to a section id, an element, or "top". */
  const scrollTo = useCallback((target, opts = {}) => {
    const el = resolve(target);
    if (el === null || el === undefined) return;
    const offset = opts.offset ?? 0;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset,
        duration: opts.duration ?? 1.6,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    } else {
      const y = el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  /** Teleport — used while the eyes are closed, so the move is never seen. Lands clear of the header. */
  const jump = useCallback((target, opts = {}) => {
    const el = resolve(target);
    if (el === null || el === undefined) return;
    const offset = el === 0 ? 0 : (opts.offset ?? -Math.round(Math.min(110, window.innerHeight * 0.12)));
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset, immediate: true, force: true });
    else {
      const y = el === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "instant" });
    }
  }, []);

  /** Freeze page scroll while an overlay is open. */
  const lock = useCallback((on) => {
    const lenis = lenisRef.current;
    if (on) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = on ? "hidden" : "";
  }, []);

  return <SmoothContext.Provider value={{ scrollTo, jump, lock }}>{children}</SmoothContext.Provider>;
}

export const useSmoothScroll = () => useContext(SmoothContext);
