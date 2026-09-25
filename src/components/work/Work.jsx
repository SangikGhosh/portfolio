import { useRef } from "react";
import PropTypes from "prop-types";
import { useInView } from "framer-motion";
import { cn } from "../../lib/utils";
import { archive, projects } from "../../data/content";
import { AccentText, ArrowUpRight, Reveal } from "../ui/primitives";
import { SCENES } from "./scenes";

const TONES = {
  periwinkle: "bg-pastel-periwinkle",
  sand: "bg-pastel-sand",
  blush: "bg-pastel-blush",
  sage: "bg-pastel-sage",
};

function CaseRow({ project, index }) {
  const mediaRef = useRef(null);
  const play = useInView(mediaRef, { once: true, amount: 0.45 });
  const Scene = SCENES[project.scene];
  const flip = index % 2 === 1;

  return (
    <article className="grid items-center gap-y-10 md:grid-cols-2 md:gap-x-[clamp(2.5rem,5vw,4rem)]">
      <Reveal
        y={24}
        className={cn("relative", flip && "md:order-2")}
      >
        <div
          ref={mediaRef}
          className={cn("relative aspect-[4/3] overflow-hidden rounded-card", TONES[project.tone])}
          style={{ containerType: "inline-size" }}
        >
          {Scene && <Scene play={play} />}
        </div>
        <span className="mono-meta absolute -top-7 left-0 hidden text-ink-muted md:block">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </Reveal>

      <Reveal y={20} delay={0.08} className={cn(flip && "md:order-1")}>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-[1.9rem] items-center rounded-badge bg-ink px-2.5 font-display text-[0.9rem] font-semibold tracking-[-0.01em] text-paper">
            {project.badge}
          </span>
          <span className="mono-meta text-ink-muted">
            {project.year} · {project.role}
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2.5">
          {project.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>

        <h3 className="mt-5 max-w-[22ch] text-h3 text-ink">
          <AccentText parts={project.title} />
        </h3>

        <p className="mt-4 max-w-[34rem] text-body text-ink-body">{project.body}</p>

        <dl className="mt-8 grid max-w-[30rem] grid-cols-2 gap-x-8">
          {project.facts.map((f) => (
            <div key={f.value}>
              <dt className="serif-italic text-stat leading-none text-ink">{f.value}</dt>
              <dd className="mt-2.5 text-[0.9375rem] leading-snug text-ink-muted">{f.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-primary">
              {l.label}
              <ArrowUpRight className="arrow h-3.5 w-3.5" />
            </a>
          ))}
          <span className="mono-meta pl-1 text-ink-muted">{project.stack.join(" · ")}</span>
        </div>
      </Reveal>
    </article>
  );
}
CaseRow.propTypes = { project: PropTypes.object.isRequired, index: PropTypes.number.isRequired };

function Archive() {
  return (
    <div className="mt-[clamp(6rem,11vw,9rem)]">
      <Reveal className="flex items-end justify-between border-b border-hairline pb-5">
        <div>
          <p className="eyebrow">Also built</p>
          <h3 className="mt-3 font-display text-[clamp(1.35rem,1vw+1rem,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
            Earlier work, kept <em className="accent">private</em>.
          </h3>
        </div>
        <span className="mono-meta hidden text-ink-muted sm:block">Code on request</span>
      </Reveal>
      <ul>
        {archive.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 0.05} y={12}>
            <div className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-x-6 gap-y-1 border-b border-hairline py-5 transition-colors duration-300 hover:bg-paper-deep/60 md:grid-cols-[4.5rem_1.1fr_1.2fr_10rem_6rem] md:px-3">
              <span className="serif-italic text-[1.35rem] text-ink-muted">{a.year}</span>
              <span className="font-display text-[1.12rem] font-semibold tracking-[-0.015em] text-ink">{a.title}</span>
              <span className="col-start-2 text-[0.95rem] text-ink-secondary md:col-start-auto">{a.note}</span>
              <span className="mono-meta col-start-2 text-ink-muted md:col-start-auto">{a.stack}</span>
              <span className="mono-meta col-start-2 inline-flex items-center gap-1.5 text-ink-muted md:col-start-auto md:justify-self-end">
                <span className="h-1.5 w-1.5 rounded-full bg-hairline-strong" />
                {a.status}
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative pb-[clamp(6rem,12vw,10rem)] pt-[clamp(6rem,11vw,10rem)]">
      <div className="shell">
        <div className="mx-auto max-w-content">
          <Reveal className="mb-[clamp(4rem,8vw,6.5rem)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-[clamp(1.5rem,3.5vw,3.5rem)] text-h2 text-ink">
                Work that holds up under <em className="accent">load</em>.
              </h2>
            </div>
            <p className="serif-italic max-w-[20rem] text-[1.2rem] leading-snug text-ink-secondary md:text-right">
              Four projects, each a problem first and a stack second.
            </p>
          </Reveal>

          <div className="flex flex-col gap-[clamp(5.5rem,10vw,8rem)]">
            {projects.map((p, i) => (
              <CaseRow key={p.id} project={p} index={i} />
            ))}
          </div>

          <Archive />
        </div>
      </div>
    </section>
  );
}
