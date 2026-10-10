import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useBlink } from "../lib/blink";
import { useSmoothScroll } from "../lib/smooth";
import { firstHeroImage, heroOrder, loadImage, preloadRest } from "../lib/heroImages";
import { hero, profile } from "../data/content";
import { ArrowRight, EASE, EASE_IN_OUT, FadeIn, Label, RiseText, Roll } from "./ui/primitives";

const HOLD = 6500; // ms each picture stays fully in view
const DISSOLVE = 2.2; // s for the soft cross-dissolve between pictures
const DRIFT = (HOLD + DISSOLVE * 1000 * 2) / 1000; // s of slow pull-back while a picture is on screen
const SOFT = [0.22, 1, 0.36, 1];

/** One word of the name; its letters rise one after another behind a shared mask. */
function Word({ word, play, delay }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em] pt-[0.04em] -mt-[0.04em] align-bottom">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={reduce ? false : { y: "108%" }}
          animate={play ? { y: "0%" } : undefined}
          transition={{ duration: 1.25, ease: EASE, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * The window inside the name. It opens once the letters land, then dissolves slowly from one
 * picture to the next in this visit's random order — never to a picture that hasn't finished
 * downloading (it just holds the current one a little longer).
 */
function Slot({ play }) {
  const reduce = useReducedMotion();
  const [layers, setLayers] = useState(() => [{ src: heroOrder[0], id: 0 }]);
  const [firstReady, setFirstReady] = useState(false);

  useEffect(() => {
    let alive = true;
    firstHeroImage.then((ok) => alive && ok && setFirstReady(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!play || reduce || heroOrder.length < 2) return undefined;
    preloadRest();
    let alive = true;
    let timer;
    const wait = (ms) =>
      new Promise((r) => {
        timer = setTimeout(r, ms);
      });

    (async () => {
      let i = 0;
      let misses = 0;
      await wait(HOLD + 1600); // the opening picture stays a little longer, while the intro settles
      while (alive && misses < heroOrder.length) {
        const next = (i + 1) % heroOrder.length;
        const ok = await loadImage(heroOrder[next]); // usually already in the cache
        if (!alive) return;
        i = next;
        if (!ok) {
          misses += 1; // a broken link is skipped, never shown
          continue;
        }
        misses = 0;
        setLayers((ls) => [...ls.slice(-1), { src: heroOrder[i], id: Date.now() }]);
        await wait(HOLD + DISSOLVE * 1000);
      }
    })();

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [play, reduce]);

  return (
    <motion.span
      className="relative mx-[0.06em] inline-block h-[0.68em] overflow-hidden rounded-[0.025em] bg-surface align-baseline"
      initial={{ width: reduce ? "0.91em" : "0em" }}
      animate={play && !reduce ? { width: "0.91em" } : undefined}
      transition={{ duration: 1.1, ease: EASE_IN_OUT, delay: 0.75 }}
    >
      {layers.map((l, k) => {
        const opening = l.id === 0;
        return (
          <motion.span
            key={l.id}
            className="absolute inset-0 block"
            initial={opening ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)" }}
            animate={opening ? { opacity: firstReady ? 1 : 0 } : { opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: opening ? 0.6 : DISSOLVE, ease: SOFT }}
            style={{ zIndex: k }}
          >
            <motion.img
              src={l.src}
              alt=""
              decoding="async"
              className="h-full w-full object-cover"
              initial={{ scale: reduce ? 1 : 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduce ? 0 : DRIFT, ease: "linear" }}
            />
          </motion.span>
        );
      })}
    </motion.span>
  );
}

export default function Hero() {
  const { blink, revealed } = useBlink();
  const { jump } = useSmoothScroll();
  const play = revealed;

  return (
    <>
      {/* First screen: the name and three lines, nothing else. */}
      <section
        id="top"
        className="relative flex h-[100svh] min-h-[32rem] flex-col items-center justify-center px-gutter pt-16 [--name:19vw] sm:[--name:min(13.6vw,31svh)]"
      >
        <h1 className="text-center font-display text-[length:var(--name)] leading-[0.92] tracking-[-0.02em]">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            <Word word={profile.first} play={play} delay={0.1} />
            <Slot play={play} />
          </span>
          <span aria-hidden="true" className="block sm:hidden" />
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            <Word word={profile.last} play={play} delay={0.3} />
          </span>
        </h1>

        <RiseText
          as="p"
          text={hero.lines}
          play={play}
          delay={0.9}
          stagger={0.03}
          className="mt-[clamp(1.75rem,5svh,3.5rem)] text-center font-display text-[1.6rem] leading-[1.1] tracking-[-0.02em] sm:text-d2"
        />
      </section>

      {/* Revealed on the first scroll. */}
      <div className="px-gutter">
        <FadeIn y={16} className="grid grid-cols-12 gap-x-5 gap-y-5 border-t border-line pb-8 pt-5">
          <div className="col-span-12 md:col-span-6">
            <Label>Approach</Label>
            <p className="mt-1 text-meta text-mute">{profile.availability}</p>
          </div>
          <p className="indent relative col-span-12 max-w-[23rem] text-lead sm:col-span-8 md:col-span-4">
            <span className="absolute left-0 top-[0.55em] indent-0 text-micro tabular">01</span>
            {hero.approach}
          </p>
          <div className="col-span-12 sm:col-span-4 sm:justify-self-end md:col-span-2">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                blink(() => jump("about"));
              }}
              className="inline-flex items-center gap-2 text-meta"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <Roll>More about me</Roll>
            </a>
          </div>
        </FadeIn>
      </div>
    </>
  );
}
