import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { journey } from "../data/content";
import { useMediaQuery } from "../lib/hooks";
import { EASE_IN_OUT, FadeIn, RiseText } from "./ui/primitives";
import hackathon from "../assets/opt/hackathon.webp";
import classroom from "../assets/opt/classroom.webp";

const PHOTOS = { hackathon, classroom };
const FOLLOW = { stiffness: 300, damping: 32, mass: 0.6 };

/* Rows that remember a photo show it next to the pointer while you hover them. */
export default function Journey() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [photo, setPhoto] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, FOLLOW);
  const sy = useSpring(y, FOLLOW);

  const onMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="journey" aria-label="Journey" className="px-gutter pb-[clamp(7rem,20svh,13rem)]">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-ink pb-6">
        <h2 className="flex items-start font-display text-d2">
          <RiseText text="Journey" />
          <span className="count text-[0.36em] tabular">({String(journey.length).padStart(2, "0")})</span>
        </h2>
        <p className="max-w-[24rem] pb-[0.4em] text-meta text-mute">
          From teaching myself Java in Delhi to building AI systems in Kolkata.
        </p>
      </div>

      <ol className="group/list" onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setPhoto(null)}>
        {journey.map((j, i) => (
          <FadeIn
            as="li"
            key={j.when}
            delay={i * 0.05}
            y={14}
            onPointerEnter={() => setPhoto(j.photo ?? null)}
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
          <div className="relative aspect-[4/3] w-[20rem] translate-x-6 -translate-y-1/2">
            <AnimatePresence>
              {photo && (
                <motion.img
                  key={photo}
                  src={PHOTOS[photo]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  transition={{ duration: 0.6, ease: EASE_IN_OUT }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </section>
  );
}
