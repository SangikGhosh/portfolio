import portrait from "../../assets/opt/portrait.webp";
import { about } from "../../data/content";
import { Reveal } from "../ui/primitives";

export default function About() {
  return (
    <section id="about" className="relative pb-[clamp(6rem,12vw,10rem)] pt-[clamp(3rem,6vw,5rem)]">
      <div className="shell">
        <div className="mx-auto grid max-w-content items-center gap-y-16 lg:grid-cols-12 lg:gap-x-16">
          <Reveal className="lg:col-span-5" y={28}>
            <figure className="group relative mx-auto w-[min(100%,24rem)]">
              {/* tape */}
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 z-10 h-7 w-28 -translate-x-1/2 rotate-[-3deg] bg-[#E9E1D2]/70 shadow-[0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-[1px]"
              />
              <div
                className="relative rotate-[-2.2deg] bg-[#F4EFE6] p-3 pb-14 transition-transform duration-700 ease-emphasized group-hover:rotate-0"
                style={{ boxShadow: "0 2.2rem 3.5rem -1.6rem rgba(0,0,0,0.75), 0 0.2rem 0.6rem rgba(0,0,0,0.35)" }}
              >
                <img
                  src={portrait}
                  alt="Sangik Ghosh in a red shirt, in front of a hand-painted wall"
                  className="aspect-[4/5] w-full object-cover object-[50%_30%]"
                  loading="lazy"
                  decoding="async"
                  width="960"
                  height="1176"
                />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-baseline justify-between">
                  <span className="serif-italic text-[1.25rem] text-[#3A3530]">Sangik, Kolkata</span>
                  <span className="font-mono text-[0.68rem] tracking-[0.1em] text-[#8B8985]">SG—01</span>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 className="mt-[clamp(1.5rem,3vw,2.5rem)] text-h2 text-night-text">
                Calm under load, <em className="accent">curious</em> by default.
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 12)} className="mt-6 max-w-[36rem] text-lede text-night-secondary">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <blockquote className="serif-italic mt-10 max-w-[34rem] border-l border-night-border pl-6 text-[clamp(1.35rem,0.8vw+1.1rem,1.75rem)] leading-snug text-night-text">
                {about.belief}
              </blockquote>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-12 grid max-w-[38rem] gap-2.5 sm:grid-cols-2">
                {about.facts.map((f) => (
                  <div
                    key={f.k}
                    className="rounded-[14px] bg-white/[0.045] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-300 hover:bg-white/[0.07]"
                  >
                    <dt className="text-[0.8rem] tracking-[0.01em] text-night-muted">{f.k}</dt>
                    <dd className="mt-1.5 flex items-center gap-2 text-[1rem] leading-snug text-night-text [text-wrap:balance]">
                      {f.k === "Status" && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8BEEA6]"
                          style={{ animation: "led-pulse-green 2.4s ease-in-out infinite" }}
                        />
                      )}
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
