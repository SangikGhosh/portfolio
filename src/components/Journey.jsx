import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { journey } from "../data/content";
import { useMediaQuery } from "../lib/hooks";
import { FadeIn, RiseText } from "./ui/primitives";
import hackathon from "../assets/opt/hackathon.webp";
import classroom from "../assets/opt/classroom.webp";
import diploma from "../assets/opt/diploma.webp";
import friends from "../assets/opt/friends.webp";
import farewell from "../assets/opt/farewell.webp";
import btech from "../assets/opt/btech.webp";

const PHOTOS = { hackathon, classroom, diploma, friends, farewell, btech };
const FOLLOW = { stiffness: 300, damping: 32, mass: 0.6 };
const REEL = { stiffness: 140, damping: 24, mass: 0.9 };

// The reel holds the photos in row order, so moving down the list slides them up and back.
const SLOTS = journey.filter((j) => j.photo).map((j) => j.photo);

/* Rows that remember a photo show it next to the pointer while you hover them. */
export default function Journey() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [open, setOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, FOLLOW);
  const sy = useSpring(y, FOLLOW);
  const slot = useSpring(0, REEL);
  const reelY = useTransform(slot, (v) => `${-v * 100}%`);
  const listRef = useRef(null);
  const pointer = useRef(null);
  const shown = useRef(false);

  // The row is read from the pointer position, so a scroll under a still pointer moves the
  // reel exactly like moving the pointer does.
  const sync = useCallback(() => {
    const p = pointer.current;
    const row = p && document.elementFromPoint(p.x, p.y)?.closest("[data-photo]");
    const index = row && listRef.current?.contains(row) ? SLOTS.indexOf(row.dataset.photo) : -1;
    if (index < 0) {
      shown.current = false;
      setOpen(false);
      return;
    }
    if (!shown.current) {
      // opening: appear at the pointer, already on the right photo
      sx.jump(p.x);
      sy.jump(p.y);
      slot.jump(index);
    } else {
      slot.set(index);
    }
    shown.current = true;
    setOpen(true);
  }, [sx, sy, slot]);

  useEffect(() => {
    if (!fine) return undefined;
    // Decode every photo up front, so the reel never slides onto an empty frame.
    Object.values(PHOTOS).forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => {});
    });

    // The pointer is tracked on the window, so its position survives the list scrolling away.
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), sync()));
    };
    const onMove = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      schedule();
    };
    const onOut = (e) => {
      if (e.relatedTarget) return;
      pointer.current = null; // left the window
      sync();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("scroll", schedule);
    };
  }, [fine, sync, x, y]);

  return (
    <section id="journey" aria-label="Journey" className="px-gutter pb-[clamp(7rem,20svh,13rem)]">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-ink pb-6">
        <h2 className="flex items-start font-display text-d2">
          <RiseText text="Journey" />
          <span className="count text-[0.36em] tabular">({String(journey.length).padStart(2, "0")})</span>
        </h2>
        <p className="max-w-[24rem] pb-[0.4em] text-meta text-mute">
          From discovering computer science to building real-world software and AI systems.
        </p>
      </div>

      <ol ref={listRef} className="group/list">
        {journey.map((j, i) => (
          <FadeIn
            as="li"
            key={`${j.when}-${j.title}`}
            delay={i * 0.05}
            y={14}
            data-photo={j.photo ?? ""}
            className="group/row border-b border-line"
          >
            <div className="grid grid-cols-12 items-baseline gap-x-5 gap-y-2 py-6 transition-opacity duration-600 group-hover/list:opacity-25 group-hover/row:!opacity-100 md:py-9">
              <span className="col-span-12 flex items-center gap-2 text-meta tabular md:col-span-2">
                {j.live && <span aria-hidden="true" className="h-2 w-2 bg-ink" />}
                {j.when}
              </span>
              <h3 className="col-span-12 font-display text-d3 md:col-span-6">{j.title}</h3>
              <p className="col-span-12 text-meta text-mute md:col-span-4">{j.body}</p>
            </div>
          </FadeIn>
        ))}
      </ol>

      {fine && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[40]"
          style={{ x: sx, y: sy }}
        >
          {/* A fixed frame that stays open across rows; only the reel inside it moves. */}
          <div
            className="relative isolate aspect-[4/3] w-[20rem] translate-x-6 -translate-y-1/2 overflow-hidden rounded-[4px] transition-[clip-path] duration-500 ease-in-out will-change-[clip-path]"
            style={{ clipPath: open ? "inset(0% 0% 0% 0% round 4px)" : "inset(100% 0% 0% 0% round 4px)" }}
          >
            <motion.div className="absolute inset-0 flex flex-col will-change-transform" style={{ y: reelY }}>
              {SLOTS.map((key) => (
                <img
                  key={key}
                  src={PHOTOS[key]}
                  alt=""
                  decoding="async"
                  className="h-full w-full shrink-0 object-cover"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
