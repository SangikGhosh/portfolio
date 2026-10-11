import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "../../lib/hooks";
import { EASE_IN_OUT } from "../ui/primitives";

/*
 * Project covers, drawn in type instead of screenshots. Each sizes itself in `em`, and the
 * root em follows the card width (cqw) — the same drawing works as a card and full-bleed.
 * The parent sets `container-type: inline-size` and passes `play` when the card is in view.
 * The interface around them stays black and white; the work is where the colour lives.
 */
const THEMES = {
  vault: { bg: "#0E6B4C", fg: "#FFFFFF", sub: "rgba(255,255,255,0.64)", rule: "rgba(255,255,255,0.3)" },
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

/* ── FileHider: names get redacted one by one, then the emailed one-time password ── */
const FILES = ["passport.pdf", "tax-2024.xlsx", "letters/"];
const OTP = ["4", "8", "1", "2"];

export function VaultCover({ play }) {
  const reduce = useReducedMotion();
  return (
    <Frame theme="vault" label="FileHider vault" meta="MySQL · OTP">
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
        <p className="mb-[0.9em] text-[0.9em] text-[color:var(--sub)]">One-time password, sent by email</p>
        <div className="flex gap-[0.6em]">
          {OTP.map((d, i) => (
            <span
              key={i}
              className="grid h-[4.2em] w-[3.4em] place-items-center border border-current font-display text-[1em]"
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

/* ── Screen-recorded projects: a still until hovered, then the real app running ── */
export function VideoCover({ play, hover, full, video }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const touch = useMediaQuery("(hover: none)");
  // Cards play while hovered (or in view on touch screens); the case page plays on open.
  const running = !reduce && play && (full || hover || touch);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (running) v.play().catch(() => {});
    else v.pause();
  }, [running]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full bg-[#0e0e0e] object-cover"
      src={video.src}
      poster={video.poster}
      aria-label={video.label}
      preload={full ? "auto" : "metadata"}
      controls={full && reduce}
      muted
      loop
      playsInline
    />
  );
}

/* ── A still poster, for work that has no recording yet ── */
export function ImageCover({ image }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

export const COVERS = { vault: VaultCover, video: VideoCover, image: ImageCover };
