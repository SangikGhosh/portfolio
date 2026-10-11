import { useCallback, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useBlink } from "../../lib/blink";
import { useSmoothScroll } from "../../lib/smooth";
import { profile, projects } from "../../data/content";
import { ArrowRight, EASE_IN_OUT, RiseText, Roll } from "../ui/primitives";
import { COVERS } from "./covers";
import CaseOverlay from "./CaseOverlay";

function Card({ p, i, onOpen }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState(false);
  const Cover = COVERS[p.cover];

  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        data-cursor="Open project"
        className="group block w-full text-left"
      >
        <span ref={ref} className="relative isolate block aspect-[10/7] overflow-hidden rounded-[4px] [container-type:inline-size]">
          <motion.span
            className="absolute inset-0 block"
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 1.25, ease: EASE_IN_OUT, delay: (i % 2) * 0.12 }}
          >
            <span className="absolute inset-0 block">
              <Cover play={inView} hover={hover} video={p.video} />
            </span>
          </motion.span>
        </span>

        <span className="mt-3 flex items-baseline gap-2">
          <span className="text-micro tabular">0{i + 1}</span>
          <span className="text-[1.375rem] leading-tight tracking-[-0.02em]">{p.name}</span>
          <ArrowRight className="h-4 w-4 -translate-x-2 self-center opacity-0 transition duration-600 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span className="mt-1 block max-w-[34rem] pr-4 text-meta text-mute">
          {p.kind}, {p.year}. {p.title}
        </span>
      </button>
    </li>
  );
}

/* Work in progress: the poster stays softly blurred, with a "Coming soon" tag on hover. Nothing to open yet. */
function BuildingCard({ p, i }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const Cover = COVERS[p.cover];

  return (
    <li>
      <div data-cursor="Coming soon" className="group block w-full cursor-default text-left" aria-label={`${p.name}, in progress`}>
        <span ref={ref} className="relative isolate block aspect-[10/7] overflow-hidden rounded-[4px] [container-type:inline-size]">
          <motion.span
            className="absolute inset-0 block"
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
            transition={{ duration: 1.25, ease: EASE_IN_OUT, delay: (i % 2) * 0.12 }}
          >
            <span className="absolute inset-0 block scale-[1.08] blur-[14px]">
              <Cover image={p.image} />
            </span>
          </motion.span>
          {/* Sits above the blur, so the status reads clearly. */}
          <span className="absolute left-[3%] top-[4%] z-10 inline-flex h-10 items-center rounded-full bg-ink px-5 text-meta leading-none text-paper">
            Under development
          </span>
        </span>

        <span className="mt-3 flex items-baseline gap-2">
          <span className="text-micro tabular">0{i + 1}</span>
          <span className="text-[1.375rem] leading-tight tracking-[-0.02em]">{p.name}</span>
        </span>
        <span className="mt-1 block max-w-[34rem] pr-4 text-meta text-mute">
          {p.year}. {p.title}
        </span>
      </div>
    </li>
  );
}

export default function Work() {
  const { blink } = useBlink();
  const { lock } = useSmoothScroll();
  const [openId, setOpenId] = useState(null);
  const lastFocus = useRef(null);

  const openCase = (id) => {
    lastFocus.current = document.activeElement;
    blink(() => {
      setOpenId(id);
      lock(true);
    });
  };
  const closeCase = useCallback(() => {
    blink(() => {
      setOpenId(null);
      lock(false);
    }).then(() => lastFocus.current?.focus?.({ preventScroll: true }));
  }, [blink, lock]);
  const nextCase = useCallback((id) => blink(() => setOpenId(id)), [blink]);

  return (
    <section id="work" aria-label="Personal work" className="px-gutter pb-[clamp(6rem,16svh,12rem)]">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-8 md:pb-12">
        <h2 className="flex items-start font-display text-d2">
          <RiseText text="Personal work" />
          <span className="count text-[0.36em] tabular">({projects.length})</span>
        </h2>
        <a
          href={`https://github.com/${profile.github}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 pb-[0.4em] text-meta"
        >
          <ArrowRight className="h-3.5 w-3.5" />
          <Roll>Everything on GitHub</Roll>
        </a>
      </div>

      <ul className="grid gap-x-1 gap-y-12 md:grid-cols-2 md:gap-y-20">
        {projects.map((p, i) => (
          p.building ? <BuildingCard key={p.id} p={p} i={i} /> : <Card key={p.id} p={p} i={i} onOpen={() => openCase(p.id)} />
        ))}
      </ul>

      <CaseOverlay id={openId} onClose={closeCase} onNext={nextCase} />
    </section>
  );
}
