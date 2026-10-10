import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";
import { EASE, EASE_IN_OUT } from "../ui/primitives";

/*
 * Project covers, drawn in type instead of screenshots. Each sizes itself in `em`, and the
 * root em follows the card width (cqw) — the same drawing works as a card and full-bleed.
 * The parent sets `container-type: inline-size` and passes `play` when the card is in view.
 * The interface around them stays black and white; the work is where the colour lives.
 */
const THEMES = {
  chat: { bg: "#2B35F2", fg: "#FFFFFF", sub: "rgba(255,255,255,0.64)", rule: "rgba(255,255,255,0.3)" },
  vault: { bg: "#0E6B4C", fg: "#FFFFFF", sub: "rgba(255,255,255,0.64)", rule: "rgba(255,255,255,0.3)" },
  prompt: { bg: "#D8F34E", fg: "#000000", sub: "rgba(0,0,0,0.55)", rule: "rgba(0,0,0,0.2)" },
  arena: { bg: "#E3245E", fg: "#FFFFFF", sub: "rgba(255,255,255,0.72)", rule: "rgba(255,255,255,0.32)" },
};

function Frame({ theme, label, meta, children }) {
  const t = THEMES[theme];
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ fontSize: "1.6cqw", background: t.bg, color: t.fg, "--sub": t.sub, "--rule": t.rule }}
    >
      <div className="absolute inset-x-[5%] top-[5.5%] flex justify-between text-[0.95em] leading-none">
        <span>{label}</span>
        <span className="text-[color:var(--sub)]">{meta}</span>
      </div>
      {children}
    </div>
  );
}

const rise = (play, delay, reduce) => ({
  initial: reduce ? false : { y: "110%" },
  animate: play ? { y: "0%" } : undefined,
  transition: { duration: 1, ease: EASE, delay },
});

/* ── ChatBuzz: a conversation set as type, and a packet riding the socket ── */
const CHAT = [
  { who: "riya", at: "12:04:31", text: "Build passed. Pushing to staging.", me: false },
  { who: "you", at: "12:04:33", text: "Ping me when it’s live.", me: true },
  { who: "kabir", at: "12:04:38", text: "Live — synced in every room.", me: false },
];

export function ChatCover({ play }) {
  const reduce = useReducedMotion();
  return (
    <Frame theme="chat" label="#launch-room" meta="3 online">
      <div className="absolute inset-x-[5%] top-[19%] flex flex-col gap-[1.5em]">
        {CHAT.map((m, i) => (
          <div key={i} className={cn("flex flex-col", m.me && "items-end text-right")}>
            <span className="mask">
              <motion.span {...rise(play, 0.15 + i * 0.32, reduce)} className="inline-block text-[0.9em] text-[color:var(--sub)]">
                {m.who} · {m.at}
              </motion.span>
            </span>
            <span className="mask mt-[0.35em]">
              <motion.span
                {...rise(play, 0.2 + i * 0.32, reduce)}
                className={cn(
                  "inline-block font-display text-[3.05em] leading-[1.02] tracking-[-0.02em]",
                  m.me && "text-[color:var(--sub)]",
                )}
              >
                {m.text}
              </motion.span>
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-[5%] bottom-[7%]">
        <div className="mb-[0.9em] flex justify-between text-[0.9em] text-[color:var(--sub)]">
          <span>socket.io</span>
          <span className="tabular">12 ms</span>
        </div>
        <div className="relative h-px bg-[color:var(--rule)]">
          <motion.span
            className="absolute -top-[0.3em] h-[0.6em] w-[0.6em] bg-current"
            initial={{ left: "0%" }}
            animate={play && !reduce ? { left: ["0%", "100%"] } : undefined}
            transition={{ duration: 2.4, ease: EASE_IN_OUT, repeat: Infinity, repeatDelay: 0.6 }}
          />
        </div>
      </div>
    </Frame>
  );
}

/* ── FileHider: names get redacted one by one, then the one-time password ── */
const FILES = ["passport.pdf", "tax-2024.xlsx", "letters/"];
const OTP = ["4", "8", "1", "2", "0", "9"];

export function VaultCover({ play }) {
  const reduce = useReducedMotion();
  return (
    <Frame theme="vault" label="FileHider — vault" meta="AES · locked">
      <ul className="absolute inset-x-[5%] top-[18%] flex flex-col gap-[0.35em]">
        {FILES.map((f, i) => (
          <li key={f} className="flex items-center gap-[0.4em] font-display text-[3.2em] leading-[1.1] tracking-[-0.02em]">
            <span className="relative inline-block">
              {f}
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-[-0.06em] -bottom-[0.02em] top-[0.12em] origin-left bg-ink"
                initial={reduce ? false : { scaleX: 0 }}
                animate={play ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.75, ease: EASE_IN_OUT, delay: 0.4 + i * 0.35 }}
              />
            </span>
            <motion.span
              className="font-sans text-[0.3em] tracking-normal text-[color:var(--sub)]"
              initial={reduce ? false : { opacity: 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.35 }}
            >
              hidden
            </motion.span>
          </li>
        ))}
      </ul>

      <div className="absolute inset-x-[5%] bottom-[7%]">
        <p className="mb-[0.9em] text-[0.9em] text-[color:var(--sub)]">One-time password</p>
        <div className="flex gap-[0.6em]">
          {OTP.map((d, i) => (
            <span
              key={i}
              className={cn(
                "grid h-[4.2em] w-[3.4em] place-items-center border border-current font-display text-[1em]",
                i === 2 && "mr-[1.2em]",
              )}
            >
              <motion.span
                className="text-[2.2em] tabular leading-none"
                initial={reduce ? false : { opacity: 0 }}
                animate={play ? { opacity: 1 } : undefined}
                transition={{ duration: 0.2, delay: 1.6 + i * 0.12 }}
              >
                {d}
              </motion.span>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ── FLUX.1: a prompt types itself out, four halftone "renders" develop ── */
const PROMPT = "a quiet harbour at dawn, fog, 35mm";
/* four "renders": a dawn-coloured ground under a halftone shape — sun, sea, moon, hills */
const RENDERS = [
  {
    ground: "linear-gradient(180deg, #FFC9B5 0%, #FF6F61 100%)",
    mask: "radial-gradient(circle at 34% 38%, #000 0 15%, transparent 15.5%), linear-gradient(to top, #000 0 38%, transparent 38.5%)",
  },
  {
    ground: "linear-gradient(180deg, #BFE3FF 0%, #3D6BFF 100%)",
    mask: "linear-gradient(to top, #000 0 52%, transparent 52.5%), radial-gradient(ellipse at 70% 30%, #000 0 22%, transparent 60%)",
  },
  {
    ground: "linear-gradient(180deg, #FFF1B8 0%, #FFB23F 100%)",
    mask: "radial-gradient(circle at 60% 62%, #000 0 30%, transparent 30.5%)",
  },
  {
    ground: "linear-gradient(180deg, #E6DCFF 0%, #7B5CFF 100%)",
    mask: "linear-gradient(170deg, transparent 0 45%, #000 45.5% 70%, transparent 70.5%), linear-gradient(to top, #000 0 22%, transparent 22.5%)",
  },
];

function useTyped(text, play, delay = 300, speed = 38) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (!play || reduce) return undefined;
    let id;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setN((v) => {
          if (v >= text.length) {
            clearInterval(id);
            return v;
          }
          return v + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [play, reduce, text, delay, speed]);
  return n;
}

export function PromptCover({ play }) {
  const reduce = useReducedMotion();
  const n = useTyped(PROMPT, play);
  const typed = n >= PROMPT.length;
  return (
    <Frame theme="prompt" label="FLUX.1 — generate" meta="4 variations">
      <p className="absolute inset-x-[5%] top-[17%] max-w-[22em] font-display text-[2.7em] leading-[1.08] tracking-[-0.02em]">
        <span className="text-[color:var(--sub)]">“</span>
        {PROMPT.slice(0, n)}
        <span className="caret ml-[0.04em] inline-block h-[0.85em] w-[0.06em] translate-y-[0.1em] bg-current" />
      </p>

      <div className="absolute inset-x-[5%] bottom-[7%] grid grid-cols-4 gap-[1em]">
        {RENDERS.map(({ ground, mask }, i) => (
          <motion.div
            key={i}
            className="relative aspect-square overflow-hidden"
            style={{ background: ground }}
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={typed || reduce ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 0.9, ease: EASE_IN_OUT, delay: 0.15 + i * 0.12 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, #000 0.17em, transparent 0.19em)",
                backgroundSize: "0.62em 0.62em",
                WebkitMaskImage: mask,
                maskImage: mask,
              }}
            />
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* ── MLBB Portal: a ranked table, bars growing to their win rate ── */
const ROLES = [
  ["Mage", 54.2],
  ["Assassin", 51.8],
  ["Marksman", 49.6],
  ["Tank", 47.1],
  ["Support", 45.3],
];

export function ArenaCover({ play }) {
  const reduce = useReducedMotion();
  return (
    <Frame theme="arena" label="MLBB — ranked" meta="Live">
      <div className="absolute left-[5%] top-[15%]">
        <span className="mask">
          <motion.span
            {...rise(play, 0.15, reduce)}
            className="inline-block font-display text-[6em] leading-[0.95] tracking-[-0.025em] tabular"
          >
            12,480
          </motion.span>
        </span>
        <p className="mt-[0.4em] text-[0.9em] text-[color:var(--sub)]">matches tracked this season</p>
      </div>

      <ul className="absolute inset-x-[5%] bottom-[7%]">
        <li className="flex justify-between pb-[0.7em] text-[0.9em] text-[color:var(--sub)]">
          <span>Role</span>
          <span>Win rate</span>
        </li>
        {ROLES.map(([role, rate], i) => (
          <li key={role} className="flex items-center gap-[1.5em] border-t border-[color:var(--rule)] py-[0.75em]">
            <span className="w-[7em] text-[1.35em]">{role}</span>
            <span className="relative h-[0.25em] flex-1">
              <motion.span
                className="absolute inset-y-0 left-0 origin-left bg-current"
                style={{ width: `${(rate - 40) * 5}%` }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={play ? { scaleX: 1 } : undefined}
                transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.09 }}
              />
            </span>
            <span className="w-[4em] text-right text-[1.35em] tabular">{rate.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export const COVERS = { chat: ChatCover, vault: VaultCover, prompt: PromptCover, arena: ArenaCover };
