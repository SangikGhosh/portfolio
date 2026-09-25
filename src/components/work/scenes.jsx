import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

const EASE = [0.16, 1, 0.3, 1];

/** Steps through 0..n once `play` turns true. */
function useSequence(play, steps, interval = 650, startDelay = 250) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? steps : 0);
  useEffect(() => {
    if (!play || reduce) {
      if (reduce) setStep(steps);
      return undefined;
    }
    let i = 0;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setStep(i);
        if (i >= steps) clearInterval(id);
      }, interval);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [play, steps, interval, startDelay, reduce]);
  return step;
}

/* Every scene sizes itself in `em`, and the root em tracks the card width (cqw). */
const Root = ({ className, children }) => (
  <div
    className={cn("absolute inset-0 overflow-hidden", className)}
    style={{ fontSize: "clamp(7px, 2.15cqw, 13px)" }}
  >
    {children}
  </div>
);
Root.propTypes = { className: PropTypes.string, children: PropTypes.node };

const Glow = ({ className, color = "rgba(255,255,255,0.55)" }) => (
  <div
    aria-hidden="true"
    className={cn("absolute rounded-full blur-[3em]", className)}
    style={{ background: color }}
  />
);
Glow.propTypes = { className: PropTypes.string, color: PropTypes.string };

/* ─────────────────────────── ChatBuzz ─────────────────────────── */

const CHAT = [
  { who: "Riya", tone: "#F2B8A2", text: "Build passed. Pushing to staging now." },
  { who: "me", text: "Nice — ping me when it’s live." },
  { who: "Kabir", tone: "#A8C3F0", text: "Live. Messages syncing across rooms." },
];
const EVENTS = [
  ["▲", "join", "riya → #launch"],
  ["▼", "message", "riya → #launch"],
  ["▼", "message", "sg → #launch"],
  ["▼", "message", "kabir → #launch"],
];

export function ChatScene({ play }) {
  const step = useSequence(play, 5, 700);
  return (
    <Root className="bg-pastel-periwinkle">
      <Glow className="-right-[10%] -top-[20%] h-[70%] w-[60%]" />
      <Glow className="-bottom-[30%] left-[10%] h-[60%] w-[50%]" color="rgba(96,120,220,0.18)" />

      <div
        className="absolute left-[7%] top-[8%] w-[58%] -rotate-[1.5deg] rounded-[1.2em] bg-white"
        style={{ boxShadow: "0 1.6em 3.2em -1.4em rgba(30,40,110,0.45), 0 0.2em 0.5em rgba(30,40,110,0.08)" }}
      >
        <div className="flex items-center justify-between border-b border-[#EEF0F7] px-[1.2em] py-[0.9em]">
          <div className="flex items-center gap-[0.7em]">
            <div className="flex -space-x-[0.45em]">
              {["#F2B8A2", "#A8C3F0", "#1A1714"].map((c) => (
                <span key={c} className="h-[1.6em] w-[1.6em] rounded-full border-[0.15em] border-white" style={{ background: c }} />
              ))}
            </div>
            <div className="leading-tight">
              <p className="font-display text-[1.05em] font-semibold text-ink">#launch-room</p>
              <p className="text-[0.78em] text-[#7A7F92]">
                <span className="mr-[0.35em] inline-block h-[0.5em] w-[0.5em] rounded-full bg-[#34C07A]" />3 online
              </p>
            </div>
          </div>
          <span className="rounded-full bg-[#F1F3FA] px-[0.7em] py-[0.25em] font-mono text-[0.7em] text-[#5B6180]">JWT ✓</span>
        </div>

        <div className="flex min-h-[15.5em] flex-col justify-end gap-[0.65em] px-[1.2em] py-[1em]">
          {CHAT.map((m, i) => (
            <AnimatePresence key={i}>
              {step > i && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={cn("flex items-end gap-[0.5em]", m.who === "me" && "justify-end")}
                >
                  {m.who !== "me" && (
                    <span
                      className="grid h-[1.7em] w-[1.7em] shrink-0 place-items-center rounded-full text-[0.7em] font-semibold text-ink"
                      style={{ background: m.tone }}
                    >
                      {m.who[0]}
                    </span>
                  )}
                  <p
                    className={cn(
                      "max-w-[78%] rounded-[1em] px-[0.9em] py-[0.55em] text-[0.92em] leading-snug",
                      m.who === "me"
                        ? "rounded-br-[0.3em] bg-[#1A1714] text-[#F7F2ED]"
                        : "rounded-bl-[0.3em] bg-[#F1F3FA] text-[#2A2E3D]",
                    )}
                  >
                    {m.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
          <div className={cn("flex items-center gap-[0.5em] transition-opacity duration-300", step >= 3 ? "opacity-100" : "opacity-0")}>
            <span className="h-[1.7em] w-[1.7em] rounded-full bg-[#F2B8A2]" />
            <span className="flex gap-[0.25em] rounded-[1em] rounded-bl-[0.3em] bg-[#F1F3FA] px-[0.8em] py-[0.7em]">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-[0.45em] w-[0.45em] rounded-full bg-[#9AA0B8]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18 }}
                />
              ))}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-[0.6em] border-t border-[#EEF0F7] px-[1em] py-[0.8em]">
          <span className="flex-1 rounded-full bg-[#F4F5FA] px-[0.9em] py-[0.55em] text-[0.82em] text-[#9AA0B8]">
            Message #launch-room
          </span>
          <span className="grid h-[2.1em] w-[2.1em] place-items-center rounded-full bg-[#1A1714] text-[0.9em] text-white">↑</span>
        </div>
      </div>

      <div
        className="absolute bottom-[6%] right-[5%] w-[37%] rotate-[2.5deg] rounded-[0.9em] bg-[#14130F] px-[1em] py-[0.9em] font-mono text-[0.74em] leading-[1.8] text-[#A5A29E]"
        style={{ boxShadow: "0 1.4em 2.8em -1em rgba(20,19,15,0.55)" }}
      >
        <p className="mb-[0.35em] flex items-center justify-between text-[#F6F4F0]">
          <span>ws://chatbuzz</span>
          <span className="flex items-center gap-[0.35em] text-[#8BEEA6]">
            <span className="h-[0.5em] w-[0.5em] rounded-full bg-[#8BEEA6] shadow-[0_0_0.5em_#8BEEA6]" />
            live
          </span>
        </p>
        {EVENTS.map((e, i) => (
          <p
            key={i}
            className={cn("truncate transition-all duration-500", step > i ? "translate-x-0 opacity-100" : "translate-x-[0.6em] opacity-0")}
          >
            <span className={e[0] === "▲" ? "text-[#8BEEA6]" : "text-[#FF8B73]"}>{e[0]}</span> {e[1]}{" "}
            <span className="text-[#6D6C68]">{e[2]}</span>
          </p>
        ))}
      </div>
    </Root>
  );
}
ChatScene.propTypes = { play: PropTypes.bool };

/* ─────────────────────────── FileHider ─────────────────────────── */

const FILES = [
  { name: "tax-returns-2024.pdf", size: "2.1 MB" },
  { name: "passport-scan.png", size: "840 KB" },
  { name: "project-keys.env", size: "4 KB" },
  { name: "family-photos.zip", size: "1.3 GB" },
];
const CODE = ["4", "8", "1", "9", "0", "6"];

const Lock = ({ open = false }) => (
  <svg viewBox="0 0 12 12" className="h-[0.9em] w-[0.9em]" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <rect x="2.2" y="5.2" width="7.6" height="5.4" rx="1.2" />
    <path d={open ? "M4 5.2V3.8a2 2 0 0 1 3.9-.6" : "M4 5.2V3.8a2 2 0 0 1 4 0v1.4"} strokeLinecap="round" />
  </svg>
);
Lock.propTypes = { open: PropTypes.bool };

export function VaultScene({ play }) {
  const step = useSequence(play, FILES.length + CODE.length + 1, 330);
  const locked = Math.min(step, FILES.length);
  const digits = Math.max(0, Math.min(step - FILES.length, CODE.length));
  const verified = step >= FILES.length + CODE.length + 1;

  return (
    <Root className="bg-pastel-sand">
      <Glow className="-left-[15%] -top-[25%] h-[70%] w-[60%]" color="rgba(255,255,255,0.6)" />

      <div
        className="absolute left-[7%] top-[11%] w-[66%] rounded-[1.1em] bg-[#161510] text-[#EAE3D6]"
        style={{ boxShadow: "0 1.8em 3.4em -1.4em rgba(40,30,15,0.6), 0 0.2em 0.5em rgba(40,30,15,0.12)" }}
      >
        <div className="flex items-center gap-[0.45em] border-b border-[#2A2824] px-[1em] py-[0.75em]">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} className="h-[0.7em] w-[0.7em] rounded-full opacity-80" style={{ background: c }} />
          ))}
          <span className="ml-[0.6em] font-mono text-[0.75em] text-[#8B8985]">filehider — vault</span>
        </div>
        <ul className="px-[0.6em] py-[0.6em]">
          {FILES.map((f, i) => {
            const isLocked = i < locked;
            const isWorking = i === locked && play && step < FILES.length;
            return (
              <li key={f.name} className="relative flex items-center gap-[0.8em] rounded-[0.6em] px-[0.6em] py-[0.62em]">
                <span className="grid h-[2em] w-[1.6em] place-items-center rounded-[0.25em] bg-[#2A2824] font-mono text-[0.55em] text-[#8B8985]">
                  {f.name.split(".").pop().toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate font-mono text-[0.82em] transition-all duration-500", isLocked && "text-[#6D6C68] [filter:blur(0.12em)]")}>
                    {f.name}
                  </p>
                  <p className="text-[0.68em] text-[#6D6C68]">{f.size}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-[0.35em] rounded-full border px-[0.6em] py-[0.2em] font-mono text-[0.66em] transition-colors duration-300",
                    isLocked ? "border-[#FF8B73]/40 bg-[#FF7A63]/10 text-[#FF8B73]" : "border-[#3A3834] text-[#8B8985]",
                  )}
                >
                  <Lock open={!isLocked} />
                  {isLocked ? "encrypted" : isWorking ? "encrypting" : "visible"}
                </span>
                {isWorking && (
                  <motion.span
                    className="absolute bottom-[0.2em] left-[0.6em] h-[0.12em] rounded-full bg-[#FF8B73]"
                    initial={{ width: 0 }}
                    animate={{ width: "calc(100% - 1.2em)" }}
                    transition={{ duration: 0.33, ease: "linear" }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="absolute bottom-[8%] right-[6%] w-[43%] rotate-[2deg] rounded-[1em] bg-white px-[1.2em] py-[1.1em]"
        style={{ boxShadow: "0 1.4em 3em -1.1em rgba(40,30,15,0.45)" }}
      >
        <p className="font-display text-[1.05em] font-semibold text-ink">Verify it&rsquo;s you</p>
        <p className="mt-[0.15em] text-[0.75em] text-ink-secondary">Enter the 6-digit code we sent</p>
        <div className="mt-[0.8em] flex gap-[0.35em]">
          {CODE.map((d, i) => (
            <span
              key={i}
              className={cn(
                "grid h-[2.3em] flex-1 place-items-center rounded-[0.45em] border font-mono text-[1em] transition-colors duration-200",
                i < digits ? "border-[#1A1714] text-ink" : "border-[#E2DBD6] text-transparent",
                i === digits && play && !verified && "border-accent",
              )}
            >
              {i < digits ? d : "·"}
            </span>
          ))}
        </div>
        <p className={cn("mt-[0.75em] flex items-center gap-[0.4em] text-[0.75em] font-medium transition-opacity duration-300", verified ? "text-[#1F8A4C] opacity-100" : "opacity-0")}>
          <span className="grid h-[1.2em] w-[1.2em] place-items-center rounded-full bg-[#1F8A4C] text-[0.8em] text-white">✓</span>
          Verified — vault unlocked
        </p>
      </div>
    </Root>
  );
}
VaultScene.propTypes = { play: PropTypes.bool };

/* ─────────────────────────── FLUX.1 ─────────────────────────── */

const PROMPT = "a quiet harbour at dawn, 35mm film grain";
const PALETTES = [
  { sky: ["#F6C4A8", "#F4DCCB", "#EAC7C7"], sea: ["#C9A6B4", "#8D7B96"], sun: "#FFF1DC", sunX: 62 },
  { sky: ["#C9C3E6", "#E5D9EE", "#F0D6DA"], sea: ["#A99CC4", "#6E6991"], sun: "#FFF6EE", sunX: 38 },
  { sky: ["#F8D59A", "#F7E4C2", "#F1CDB0"], sea: ["#D1A889", "#8E6E62"], sun: "#FFF7E0", sunX: 70 },
  { sky: ["#A9C4E4", "#CFDCEE", "#E7D8E2"], sea: ["#7F9CC0", "#4E6488"], sun: "#FFFFFF", sunX: 30 },
];

function Painting({ p, index, revealed }) {
  return (
    <div
      className="relative overflow-hidden rounded-[0.7em] transition-[filter,transform] duration-[900ms] ease-emphasized"
      style={{
        filter: revealed ? "blur(0) saturate(1)" : "blur(0.9em) saturate(0.6)",
        transform: revealed ? "scale(1)" : "scale(1.06)",
        transitionDelay: `${index * 160}ms`,
        background: `linear-gradient(180deg, ${p.sky[0]} 0%, ${p.sky[1]} 42%, ${p.sky[2]} 58%)`,
      }}
    >
      <div
        className="absolute h-[34%] w-[34%] rounded-full"
        style={{
          left: `${p.sunX - 17}%`,
          top: "34%",
          background: `radial-gradient(circle, ${p.sun} 0 32%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[42%]"
        style={{ background: `linear-gradient(180deg, ${p.sea[0]}, ${p.sea[1]})` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] opacity-40"
        style={{ background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 5px)" }}
      />
      <div
        className="absolute bottom-[40%] h-[10%] w-[12%] rounded-t-[0.3em] bg-[#3B3040]/60"
        style={{ left: `${(p.sunX + 22) % 80}%` }}
      />
      <div
        className="absolute bottom-[41%] h-[5%] w-[20%] rounded-t-[0.5em] bg-[#3B3040]/40"
        style={{ left: `${(p.sunX + 48) % 70}%` }}
      />
      <span className="absolute bottom-[0.5em] left-[0.6em] font-mono text-[0.62em] text-white/85">v{index + 1}</span>
    </div>
  );
}
Painting.propTypes = { p: PropTypes.object, index: PropTypes.number, revealed: PropTypes.bool };

export function PromptScene({ play }) {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? PROMPT.length : 0);
  const [phase, setPhase] = useState(reduce ? 2 : 0); // 0 typing, 1 generating, 2 done

  useEffect(() => {
    if (!play || reduce) return undefined;
    let i = 0;
    let t2;
    let t3;
    const t = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= PROMPT.length) {
        clearInterval(t);
        t2 = setTimeout(() => setPhase(1), 250);
        t3 = setTimeout(() => setPhase(2), 1100);
      }
    }, 34);
    return () => {
      clearInterval(t);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [play, reduce]);

  return (
    <Root className="bg-pastel-blush">
      <Glow className="-right-[10%] -top-[20%] h-[60%] w-[55%]" />
      <div className="absolute inset-x-[7%] top-[9%]">
        <div
          className="flex items-center gap-[0.7em] rounded-full bg-white py-[0.45em] pl-[1.1em] pr-[0.45em]"
          style={{ boxShadow: "0 1em 2.2em -1em rgba(90,40,40,0.35), 0 0.15em 0.4em rgba(90,40,40,0.08)" }}
        >
          <span className="text-[1em] text-accent">✦</span>
          <p className="min-w-0 flex-1 truncate font-mono text-[0.85em] text-ink">
            {PROMPT.slice(0, typed)}
            {phase === 0 && <span className="blink ml-[0.05em] inline-block h-[1em] w-[0.08em] translate-y-[0.15em] bg-ink" />}
          </p>
          <span className="inline-flex h-[2.3em] items-center gap-[0.45em] rounded-full bg-[#1A1714] px-[1em] text-[0.8em] font-medium text-[#F7F2ED]">
            {phase === 1 ? (
              <motion.span
                className="h-[0.9em] w-[0.9em] rounded-full border-[0.15em] border-white/30 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            ) : null}
            {phase === 2 ? "Done" : "Generate"}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-[7%] bottom-[8%] top-[27%] grid grid-cols-2 grid-rows-2 gap-[0.7em]">
        {PALETTES.map((p, i) => (
          <Painting key={i} p={p} index={i} revealed={phase === 2} />
        ))}
      </div>
    </Root>
  );
}
PromptScene.propTypes = { play: PropTypes.bool };

/* ─────────────────────────── MLBB portal ─────────────────────────── */

const HEROES = [
  { name: "Layla", role: "Marksman", rate: 54.2, tone: "#F2B8A2" },
  { name: "Granger", role: "Marksman", rate: 51.8, tone: "#C6D7FD" },
  { name: "Brody", role: "Marksman", rate: 49.6, tone: "#E9D8A6" },
];

function MatchClock({ play }) {
  const [s, setS] = useState(14 * 60 + 32);
  useEffect(() => {
    if (!play) return undefined;
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [play]);
  return (
    <span className="tabular">
      {String(Math.floor(s / 60)).padStart(2, "0")}:{String(s % 60).padStart(2, "0")}
    </span>
  );
}
MatchClock.propTypes = { play: PropTypes.bool };

export function ArenaScene({ play }) {
  const step = useSequence(play, 4, 450);
  return (
    <Root className="bg-pastel-sage">
      <Glow className="-left-[10%] -top-[25%] h-[70%] w-[60%]" color="rgba(255,255,255,0.65)" />

      <div
        className="absolute left-[6%] top-[10%] w-[54%] rounded-[1.15em] bg-white px-[1.2em] pb-[1.2em] pt-[1em]"
        style={{ boxShadow: "0 1.6em 3.2em -1.3em rgba(40,60,40,0.4), 0 0.2em 0.5em rgba(40,60,40,0.08)" }}
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-[1.1em] font-semibold text-ink">Hero stats</p>
          <span className="font-mono text-[0.68em] text-ink-muted">Season 34</span>
        </div>
        <div className="mt-[0.7em] flex gap-[0.35em] text-[0.72em]">
          {["Tank", "Mage", "Marksman"].map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-[0.8em] py-[0.3em]",
                t === "Marksman" ? "bg-[#1A1714] text-[#F7F2ED]" : "bg-[#F2F0EA] text-ink-secondary",
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <ul className="mt-[0.9em] space-y-[0.75em]">
          {HEROES.map((h, i) => (
            <li key={h.name} className="flex items-center gap-[0.75em]">
              <span className="grid h-[2.2em] w-[2.2em] shrink-0 place-items-center rounded-[0.55em] font-display text-[0.85em] font-semibold text-ink" style={{ background: h.tone }}>
                {h.name[0]}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.85em] font-medium text-ink">{h.name}</span>
                  <span className="font-mono text-[0.72em] text-ink-secondary">{step > i ? h.rate.toFixed(1) : "—"}%</span>
                </div>
                <div className="mt-[0.35em] h-[0.4em] overflow-hidden rounded-full bg-[#EFEDE6]">
                  <div
                    className="h-full rounded-full bg-[#1A1714] transition-[width] duration-[900ms] ease-emphasized"
                    style={{ width: step > i ? `${h.rate}%` : "0%" }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="absolute right-[5%] top-[8%] w-[31%] rotate-[2deg] rounded-[1em] bg-[#14130F] px-[1em] py-[0.9em] text-[#F6F4F0]"
        style={{ boxShadow: "0 1.5em 3em -1em rgba(20,19,15,0.55)" }}
      >
        <p className="flex items-center gap-[0.4em] font-mono text-[0.66em] tracking-[0.12em] text-[#FF8B73]">
          <span className="h-[0.5em] w-[0.5em] rounded-full bg-[#FF3B2F]" style={{ animation: "led-pulse 1.6s ease-in-out infinite" }} />
          LIVE · RANKED
        </p>
        <p className="mt-[0.5em] flex items-baseline justify-between font-display text-[2.1em] font-semibold leading-none tracking-[-0.02em]">
          <span>12</span>
          <span className="text-[0.45em] text-[#6D6C68]">vs</span>
          <span className="text-[#A5A29E]">9</span>
        </p>
        <p className="mt-[0.4em] flex justify-between font-mono text-[0.62em] text-[#8B8985]">
          <span>Blue</span>
          <MatchClock play={play} />
          <span>Red</span>
        </p>
        <div className="mt-[0.7em] space-y-[0.25em] border-t border-[#2A2824] pt-[0.6em] font-mono text-[0.6em] text-[#A5A29E]">
          <p className={cn("transition-opacity duration-500", step > 1 ? "opacity-100" : "opacity-0")}>Layla ✕ Zilong</p>
          <p className={cn("transition-opacity duration-500", step > 2 ? "opacity-100" : "opacity-0")}>Turtle secured</p>
        </div>
      </div>

      <div
        className="absolute bottom-[9%] right-[8%] w-[40%] -rotate-[1.5deg] rounded-[0.9em] bg-white px-[1em] py-[0.85em]"
        style={{ boxShadow: "0 1.2em 2.6em -1em rgba(40,60,40,0.4)" }}
      >
        <p className="font-mono text-[0.62em] tracking-[0.12em] text-ink-muted">GUIDE · 6 MIN</p>
        <p className="mt-[0.3em] font-display text-[1em] font-semibold leading-snug text-ink">Early rotations that win the mid-game</p>
      </div>
    </Root>
  );
}
ArenaScene.propTypes = { play: PropTypes.bool };

export const SCENES = { chat: ChatScene, vault: VaultScene, prompt: PromptScene, arena: ArenaScene };
