import { useEffect, useRef } from "react";
import { caseProjects as projects } from "../../data/content";
import { ArrowRight, ArrowUpRight, FadeIn, Label, RiseText, Roll } from "../ui/primitives";
import { COVERS } from "./covers";

/*
 * A project as its own page. It is mounted while the eyes are closed, so when they
 * open the visitor is simply somewhere else — no slide-in, no modal chrome.
 */
export default function CaseOverlay({ id, onClose, onNext }) {
  const closeRef = useRef(null);
  const index = projects.findIndex((x) => x.id === id);
  const p = projects[index];

  useEffect(() => {
    if (!p) return undefined;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [p, onClose]);

  if (!p) return null;
  const next = projects[(index + 1) % projects.length];
  const Cover = COVERS[p.cover];
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      key={p.id}
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name} project`}
      data-lenis-prevent
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-paper text-ink"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between px-gutter pt-5 text-meta text-paper mix-blend-difference md:pt-7">
        <span>
          Project {num} <span className="opacity-50">/ 0{projects.length}</span>
        </span>
        <button ref={closeRef} type="button" onClick={onClose} className="inline-flex items-center gap-2">
          <Roll>Close</Roll>
          <span aria-hidden="true" className="relative block h-3 w-3">
            <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <article className="px-gutter pb-16 pt-[clamp(6rem,18svh,10rem)]">
        <header className="grid grid-cols-12 gap-x-5">
          <div className="col-span-12 mb-6 md:col-span-3 md:mb-0">
            <Label>{p.kind}</Label>
          </div>
          <div className="col-span-12 md:col-span-9">
            <RiseText as="h2" text={p.name} play delay={0.35} className="block font-display text-d1" />
            <RiseText
              as="p"
              text={p.title}
              play
              delay={0.5}
              stagger={0.025}
              className="mt-6 block max-w-[40rem] font-display text-d3"
            />
          </div>
        </header>

        <FadeIn play delay={0.7} className="mt-14 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-line pt-5 md:grid-cols-4">
          {[
            ["Role", p.role],
            ["Year", p.year],
            ["Focus", p.tags.join(", ")],
            ["Stack", p.stack.join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-meta text-mute">{k}</p>
              <p className="mt-1 text-meta">{v}</p>
            </div>
          ))}
        </FadeIn>

        {/* Same 10:7 frame as the card, capped so the whole cover fits on screen. */}
        <FadeIn
          play
          delay={0.8}
          y={40}
          className="relative isolate mx-auto mt-10 aspect-[10/7] w-full max-w-[calc((100svh-8rem)*10/7)] overflow-hidden rounded-[4px] [container-type:inline-size]"
        >
          <Cover play full video={p.video} />
        </FadeIn>

        <section className="mt-[clamp(4rem,12svh,8rem)] grid grid-cols-12 gap-x-5 gap-y-8">
          <div className="col-span-12 md:col-span-3">
            <Label>Overview</Label>
          </div>
          <p className="indent col-span-12 max-w-[44rem] text-lead md:col-span-6">{p.body}</p>
        </section>

        {p.flow && (
          <section className="mt-[clamp(4rem,12svh,8rem)] grid grid-cols-12 gap-x-5 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <Label>How it works</Label>
            </div>
            <ol className="col-span-12 border-b border-line md:col-span-9">
              {p.flow.map((s, i) => (
                <li key={s.step} className="grid grid-cols-9 items-baseline gap-x-5 gap-y-2 border-t border-line py-5 md:py-6">
                  <span className="col-span-1 text-meta tabular">0{i + 1}</span>
                  <span className="col-span-8 font-display text-d3 md:col-span-3">{s.step}</span>
                  <p className="col-span-8 col-start-2 max-w-[34rem] text-meta text-mute md:col-span-5 md:col-start-auto">
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="mt-[clamp(4rem,12svh,8rem)] grid grid-cols-12 gap-x-5 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <Label>Outcome</Label>
          </div>
          {p.facts.map((f) => (
            <div key={f.label} className="col-span-12 border-t border-ink pt-4 sm:col-span-6 md:col-span-4">
              <p className="font-display text-d2">{f.value}</p>
              <p className="mt-2 text-meta text-mute">{f.label}</p>
            </div>
          ))}
          <div className="col-span-12 flex flex-wrap gap-3 md:col-start-4">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn-sq">
                {l.label} <ArrowUpRight className="arrow h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </section>
      </article>

      <button
        type="button"
        onClick={() => onNext(next.id)}
        data-cursor="Next project"
        className="group block w-full border-t border-line px-gutter pb-12 pt-6 text-left"
      >
        <span className="text-meta text-mute">Next project</span>
        <span className="mt-4 flex items-center justify-between gap-6">
          <span className="font-display text-d1">{next.name}</span>
          <ArrowRight className="h-[clamp(2rem,5vw,4.5rem)] w-[clamp(2rem,5vw,4.5rem)] transition-transform duration-600 ease-out group-hover:translate-x-3" />
        </span>
      </button>
    </div>
  );
}
