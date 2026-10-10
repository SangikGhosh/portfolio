import { useState } from "react";
import { useMotionValue, useMotionValueEvent } from "framer-motion";
import { about } from "../data/content";
import BlinkStage from "./BlinkStage";
import { FadeIn, Label, RiseText } from "./ui/primitives";
import portrait from "../assets/opt/portrait.webp";

/* What the eyes open onto after the dark chapter. The greeting rises as the lids part. */
function Scene({ progress }) {
  const fallback = useMotionValue(1);
  const [play, setPlay] = useState(progress === null);
  useMotionValueEvent(progress ?? fallback, "change", (v) => v > 0.4 && setPlay(true));
  return (
    <div className="grid h-full grid-cols-12 content-center gap-x-5 gap-y-8 bg-paper px-gutter pb-10 pt-24">
      <div className="col-span-12 flex flex-col justify-end md:col-span-6 md:pb-4">
        <Label>About</Label>
        <RiseText as="h2" text={about.hello} play={play} className="mt-5 block font-display text-d1" />
        <p className="mt-6 max-w-[30rem] text-lead">{about.intro}</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {about.chips.map((c) => (
            <li key={c} className="chip">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-8 col-start-3 row-start-1 md:col-span-5 md:col-start-8 md:row-start-auto">
        <div className="group relative aspect-[4/5] max-h-[72svh] overflow-hidden bg-surface">
          <img
            src={portrait}
            alt="Sangik Ghosh, standing in front of a black-and-white mural"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-900 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <BlinkStage mode="open" anchor="about" label="About">
        {(progress) => <Scene progress={progress} />}
      </BlinkStage>

      <section aria-label="My story" className="px-gutter pb-[clamp(7rem,20svh,13rem)] pt-[clamp(4rem,12svh,8rem)]">
        <div className="grid grid-cols-12 gap-x-5 gap-y-8">
          <div className="col-span-12 md:col-span-3">
            <Label>Story</Label>
          </div>
          <div className="col-span-12 space-y-6 md:col-span-6">
            {about.paragraphs.map((t, i) => (
              <FadeIn as="p" key={i} delay={i * 0.08} className={i === 0 ? "indent text-lead" : "text-lead"}>
                {t}
              </FadeIn>
            ))}
          </div>
        </div>

        {/* one fact per row — spacing does the separating, no rules */}
        <dl className="mt-[clamp(4rem,12svh,7rem)] space-y-5 md:space-y-6">
          {about.facts.map((f, i) => (
            <FadeIn key={f.k} delay={i * 0.05} y={12} className="grid grid-cols-12 items-baseline gap-x-5 gap-y-1">
              <dt className="col-span-12 text-meta text-mute md:col-span-3">{f.k}</dt>
              <dd className="col-span-12 text-lead md:col-span-9">{f.v}</dd>
            </FadeIn>
          ))}
        </dl>
      </section>
    </>
  );
}
