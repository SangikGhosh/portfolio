import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import hackathon from "../../assets/opt/hackathon.webp";
import { journey } from "../../data/content";
import { Reveal } from "../ui/primitives";

const PHOTOS = { hackathon };

export default function Journey() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="journey" className="relative py-[clamp(6rem,11vw,9rem)]">
      <div className="shell">
        <div className="mx-auto grid max-w-content gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-32">
              <p className="eyebrow">Journey</p>
              <h2 className="mt-[clamp(1.5rem,3vw,2.5rem)] text-h2 text-night-text">
                A short road, walked <em className="accent">on purpose</em>.
              </h2>
              <p className="mt-6 max-w-[22rem] text-[1.02rem] leading-relaxed text-night-secondary">
                From self-taught Java in 2022 to national hackathon finals and production backend work.
              </p>
            </Reveal>
          </div>

          <ol ref={listRef} className="relative lg:col-span-8">
            <span aria-hidden="true" className="absolute bottom-3 left-[0.4rem] top-3 w-px bg-night-border md:left-[7.4rem]" />
            <motion.span
              aria-hidden="true"
              style={{ scaleY: progress }}
              className="absolute bottom-3 left-[0.4rem] top-3 w-px origin-top bg-accent-night md:left-[7.4rem]"
            />

            {journey.map((j, i) => (
              <Reveal as="li" key={j.title} delay={0.04 * i} className="relative grid gap-3 pb-14 pl-9 last:pb-0 md:grid-cols-[7.4rem_1fr] md:gap-x-10 md:pl-0">
                <span className="serif-italic text-[clamp(1.6rem,1.4vw+1rem,2.2rem)] leading-none text-night-muted md:pr-6 md:text-right">
                  {j.when}
                </span>

                <span
                  aria-hidden="true"
                  className="absolute left-[0.4rem] top-[0.55rem] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-night-outline bg-night md:left-[7.4rem]"
                >
                  {j.live && (
                    <span className="absolute inset-[-4px] animate-ping rounded-full bg-accent-night/40" />
                  )}
                </span>

                <div className="md:pl-10">
                  <h3 className="font-display text-[clamp(1.2rem,0.6vw+1rem,1.45rem)] font-semibold leading-snug tracking-[-0.015em] text-night-text">
                    {j.title}
                  </h3>
                  <p className="mt-3 max-w-[34rem] text-[1rem] leading-relaxed text-night-secondary">{j.body}</p>
                  <p className="mono-meta mt-4 inline-flex items-center gap-2 text-night-muted">
                    {j.live && <span className="h-1.5 w-1.5 rounded-full bg-[#8BEEA6] shadow-[0_0_6px_#8BEEA6]" />}
                    {j.meta}
                  </p>

                  {j.photo && (
                    <figure className="group mt-7 w-[min(100%,20rem)] rotate-[1.5deg] bg-[#F4EFE6] p-2 pb-9 shadow-[0_1.6rem_2.6rem_-1.2rem_rgba(0,0,0,0.8)] transition-transform duration-700 ease-emphasized hover:rotate-0">
                      <img
                        src={PHOTOS[j.photo]}
                        alt="The team at the hackathon"
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover"
                        width="1000"
                        height="750"
                      />
                      <figcaption className="serif-italic mt-2 px-1 text-[1.02rem] text-[#3A3530]">
                        Finals week, with the team
                      </figcaption>
                    </figure>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
