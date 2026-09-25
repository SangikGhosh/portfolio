import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../lib/utils";
import { useKeyShortcuts, useZonedTime } from "../lib/hooks";
import { useSmoothScroll } from "../lib/smooth";
import { SCREEN_FS, SCREEN_H_SMALL } from "../lib/terminalGeometry";
import { profile } from "../data/content";

const KEYS = [
  { key: "W", label: "Work", cmd: "open ./work", target: "work" },
  { key: "J", label: "Journey", cmd: "cat journey.md", target: "journey" },
  { key: "C", label: "Contact", cmd: "./say-hello.sh", target: "contact" },
  { key: "R", label: "Résumé", cmd: "open resume.pdf", href: profile.resume, dark: true },
];

const PROMPT = (
  <>
    <span className="text-[#FF8B73]">sangik</span>
    <span className="text-[#8B8985]">@kolkata ~ %</span>
  </>
);

/**
 * SG—01: a pocket terminal. Four real keycaps drive navigation;
 * the physical W / J / C / R keys press them too.
 *
 * Optional props let the hero grow the screen (`screenH`, `screenFs` — motion values in the
 * device's em) and run a `script` of commands; `runTo` says how many have been reached.
 */
export default function Terminal({ screenH, screenFs, script = [], runTo = 0 }) {
  const { scrollTo } = useSmoothScroll();
  const time = useZonedTime(profile.timezone);
  const [typed, setTyped] = useState("");
  const [echo, setEcho] = useState(null);
  const [pressed, setPressed] = useState(null);
  const typer = useRef(null);
  const releaseTimer = useRef(null);

  // screen size: driven from outside, or fixed at rest
  const restH = useMotionValue(SCREEN_H_SMALL);
  const restFs = useMotionValue(SCREEN_FS);
  const hMV = screenH || restH;
  const fsMV = screenFs || restFs;
  const screenHeight = useTransform([hMV, fsMV], ([h, f]) => `${h / f}em`);
  const screenFont = useTransform(fsMV, (f) => `${f}em`);

  // scripted session
  const [done, setDone] = useState(0);
  const [live, setLive] = useState("");
  const busy = useRef(false);
  const timers = useRef([]);
  const target = Math.min(runTo, script.length);
  const running = done < target;

  useEffect(() => {
    if (busy.current || done >= target) return;
    busy.current = true;
    const idx = done;
    const cmd = script[idx].cmd;
    let n = 0;
    clearInterval(typer.current);
    setTyped("");
    const id = setInterval(() => {
      n += 1;
      setLive(cmd.slice(0, n));
      if (n >= cmd.length) {
        clearInterval(id);
        timers.current.push(
          setTimeout(() => {
            setLive("");
            busy.current = false;
            setDone(idx + 1);
          }, 260),
        );
      }
    }, 26);
    timers.current.push(id);
  }, [done, target, script]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => {
        clearInterval(t);
        clearTimeout(t);
      });
      timers.current = [];
      busy.current = false;
    },
    [],
  );

  // keep the newest line in view, like a real terminal
  const viewRef = useRef(null);
  const logRef = useRef(null);
  const [shift, setShift] = useState(0);
  useLayoutEffect(() => {
    const v = viewRef.current;
    const l = logRef.current;
    if (!v || !l) return undefined;
    const update = () => setShift(Math.max(0, l.offsetHeight - v.clientHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(v);
    ro.observe(l);
    return () => ro.disconnect();
  }, []);

  const typeOut = useCallback(
    (text) => {
      if (running) return;
      clearInterval(typer.current);
      let i = 0;
      setTyped("");
      typer.current = setInterval(() => {
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) clearInterval(typer.current);
      }, 28);
    },
    [running],
  );

  const clear = useCallback(() => {
    clearInterval(typer.current);
    setTyped("");
  }, []);

  useEffect(() => () => {
    clearInterval(typer.current);
    clearTimeout(releaseTimer.current);
  }, []);

  const run = useCallback(
    (k) => {
      setPressed(k.key);
      clearTimeout(releaseTimer.current);
      releaseTimer.current = setTimeout(() => setPressed(null), 170);
      clearInterval(typer.current);
      setTyped(k.cmd);
      setEcho(k.href ? "→ opening in a new tab" : `→ jumping to ${k.label.toLowerCase()}`);
      if (k.href) {
        window.open(k.href, "_blank", "noopener,noreferrer");
      } else {
        setTimeout(() => scrollTo(k.target), 140);
      }
      setTimeout(() => {
        setEcho(null);
        setTyped("");
      }, 2200);
    },
    [scrollTo],
  );

  useKeyShortcuts(
    Object.fromEntries(KEYS.map((k) => [k.key.toLowerCase(), () => run(k)])),
  );

  return (
    <div
      data-terminal-root
      className="relative mx-auto select-none"
      style={{
        fontSize:
          "min(clamp(11.5px, 1.45vh + 0.3vw, 16px), calc((100vw - 2.5rem) / 30.5))",
        width: "30em",
      }}
    >
      {/* floor shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] -bottom-[1.2em] h-[2.4em] rounded-[50%] bg-[#191613] opacity-[0.22] blur-[1.2em]"
      />

      {/* body */}
      <div
        className="relative rounded-[1.45em] p-[0.85em]"
        style={{
          background: "linear-gradient(180deg, #EFEAE1 0%, #E4DDD1 55%, #D8D0C2 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -0.18em 0 rgba(25,22,19,0.07), 0 0.1em 0.25em rgba(25,22,19,0.1), 0 1.4em 2.6em -1.1em rgba(25,22,19,0.38)",
        }}
      >
        <div className="flex gap-[0.8em]">
          {/* screen */}
          <motion.div
            data-screen
            className="relative flex-1 overflow-hidden rounded-[0.85em] bg-[#15140F] text-left font-mono leading-[1.72]"
            style={{
              height: screenHeight,
              fontSize: screenFont,
              boxShadow:
                "inset 0 0 0 0.32em #2A2622, inset 0 0 0 0.38em #3A3530, inset 0 0.9em 1.6em rgba(0,0,0,0.55)",
            }}
            aria-live="polite"
          >
            <div className="scanlines pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0 z-10"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 45% 35%, rgba(255,236,214,0.075), transparent 70%)",
              }}
            />
            <div ref={viewRef} className="absolute inset-x-[1.05em] inset-y-[0.95em] overflow-hidden">
              <div
                ref={logRef}
                className="text-[#EAE3D6] transition-transform duration-150 ease-out [text-shadow:0_0_0.6em_rgba(255,232,205,0.28)]"
                style={{ transform: `translateY(${-shift}px)` }}
              >
                <p className="truncate">
                  {PROMPT} whoami
                </p>
                <p className="truncate text-[#A5A29E]">jr. ai engineer · agents · rag · fastapi</p>
                <p className="truncate">
                  {PROMPT} status
                </p>
                <p className="truncate text-[#A5A29E]">
                  <span className="mr-[0.5em] inline-block h-[0.55em] w-[0.55em] rounded-full bg-[#8BEEA6] shadow-[0_0_0.5em_#8BEEA6] align-[0.05em]" />
                  {profile.availability.toLowerCase()}
                </p>

                {script.slice(0, done).map((step) => (
                  <div key={step.cmd}>
                    <p className="truncate">
                      {PROMPT} {step.cmd}
                    </p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#A5A29E]"
                    >
                      {step.out}
                    </motion.div>
                  </div>
                ))}

                <p className="truncate">
                  {PROMPT} {running ? live : typed}
                  <span className="blink ml-[0.1em] inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] bg-[#EAE3D6]" />
                </p>
                {echo && <p className="truncate text-[#FF8B73]">{echo}</p>}
              </div>
            </div>
          </motion.div>

          {/* side panel */}
          <div className="flex w-[4.9em] flex-col items-center justify-between py-[0.2em]">
            <span className="font-mono text-[0.62em] font-medium tracking-[0.18em] text-[#6C6762]">
              SG—01
            </span>
            <div
              className="grid grid-cols-4 gap-[0.32em]"
              aria-hidden="true"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className="h-[0.36em] w-[0.36em] rounded-full"
                  style={{
                    background: "#B9B0A2",
                    boxShadow: "inset 0 0.08em 0.1em rgba(25,22,19,0.45), 0 0.05em 0 rgba(255,255,255,0.7)",
                  }}
                />
              ))}
            </div>
            <div
              className="w-full rounded-[0.35em] bg-[#1E1C17] px-[0.35em] py-[0.3em] text-center font-mono text-[0.62em] leading-none text-[#E9C07A]"
              style={{ boxShadow: "inset 0 0.1em 0.3em rgba(0,0,0,0.6), 0 0.06em 0 rgba(255,255,255,0.7)" }}
            >
              <span className="block text-[0.72em] tracking-[0.2em] text-[#8B8985]">KOL</span>
              <span className="tabular">{time}</span>
            </div>
            <div className="flex items-center gap-[0.35em]">
              <span
                className="h-[0.48em] w-[0.48em] rounded-full bg-accent-signal"
                style={{ animation: "led-pulse 2.4s ease-in-out infinite" }}
              />
              <span className="font-mono text-[0.52em] tracking-[0.18em] text-[#6C6762]">PWR</span>
            </div>
          </div>
        </div>

        {/* keycaps */}
        <div className="mt-[0.8em] flex gap-[0.5em]" role="group" aria-label="Terminal shortcuts">
          {KEYS.map((k) => {
            const down = pressed === k.key;
            return (
              <button
                key={k.key}
                type="button"
                onClick={() => run(k)}
                onPointerEnter={() => typeOut(k.cmd)}
                onPointerLeave={clear}
                onFocus={() => typeOut(k.cmd)}
                onBlur={clear}
                aria-label={`${k.label} (shortcut ${k.key})`}
                aria-keyshortcuts={k.key}
                className={cn(
                  "group relative flex h-[3.05em] flex-1 flex-col justify-between rounded-[0.55em] px-[0.62em] py-[0.42em] text-left transition-[transform,box-shadow] duration-150 ease-out",
                  "hover:-translate-y-[0.04em]",
                  down && "!translate-y-[0.2em]",
                )}
                style={{
                  background: k.dark
                    ? "linear-gradient(180deg, #2B2824 0%, #1A1714 100%)"
                    : "linear-gradient(180deg, #FDFBF7 0%, #EEE8DD 100%)",
                  boxShadow: down
                    ? `0 0.03em 0 ${k.dark ? "#000" : "#C9BFAF"}, 0 0.08em 0.2em rgba(25,22,19,0.2), inset 0 1px 0 ${k.dark ? "rgba(255,255,255,0.12)" : "#fff"}`
                    : `0 0.22em 0 ${k.dark ? "#000" : "#C9BFAF"}, 0 0.4em 0.7em -0.15em rgba(25,22,19,0.3), inset 0 1px 0 ${k.dark ? "rgba(255,255,255,0.12)" : "#fff"}`,
                }}
              >
                <span
                  className={cn(
                    "font-display text-[1.05em] font-semibold leading-none",
                    k.dark ? "text-[#F2EFE6]" : "text-ink",
                  )}
                >
                  {k.key}
                </span>
                <span
                  className={cn(
                    "text-[0.62em] font-medium leading-none tracking-[0.02em]",
                    k.dark ? "text-[#A5A29E]" : "text-ink-secondary",
                  )}
                >
                  {k.label}
                </span>
                {k.dark && (
                  <span className="absolute right-[0.55em] top-[0.5em] h-[0.34em] w-[0.34em] rounded-full bg-accent-signal opacity-80" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Terminal.propTypes = {
  screenH: PropTypes.object,
  screenFs: PropTypes.object,
  script: PropTypes.arrayOf(PropTypes.shape({ cmd: PropTypes.string, out: PropTypes.node })),
  runTo: PropTypes.number,
};
