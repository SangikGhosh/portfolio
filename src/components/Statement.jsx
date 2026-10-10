import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { stack, statement } from "../data/content";
import { FadeIn, Label } from "./ui/primitives";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/* The sentence brightens word by word as it is read — the scroll is the reading pace. */
export default function Statement() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = statement.split(" ");
  const n = words.length;

  return (
    <section aria-label="What I do" className="grid grid-cols-12 gap-x-5 px-gutter py-[clamp(7rem,22svh,14rem)]">
      <div className="col-span-12 mb-8 md:col-span-3 md:mb-0">
        <Label>What I do</Label>
      </div>
      <div className="col-span-12 md:col-span-9">
        <p
          ref={ref}
          className="font-display text-[clamp(2rem,4.3vw,4.6rem)] leading-[1.04] tracking-[-0.02em]"
        >
          {reduce
            ? statement
            : words.map((w, i) => (
                <Fragment key={i}>
                  <Word progress={scrollYProgress} range={[i / n, (i + 1) / n]}>
                    {w}
                  </Word>{" "}
                </Fragment>
              ))}
        </p>

        <FadeIn className="mt-14 flex flex-wrap items-center gap-2 md:mt-20">
          <span className="mr-4 text-meta text-mute">Daily stack</span>
          {stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
