import { archive } from "../data/content";
import { FadeIn, RiseText } from "./ui/primitives";

/* An index, not a gallery: hover a row and the rest step back. */
export default function Archive() {
  return (
    <section aria-label="Archive" className="px-gutter pb-[clamp(7rem,20svh,14rem)]">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-ink pb-6">
        <h2 className="flex items-start font-display text-d2">
          <RiseText text="Archive" />
          <span className="count text-[0.36em] tabular">({String(archive.length).padStart(2, "0")})</span>
        </h2>
        <p className="max-w-[24rem] pb-[0.4em] text-meta text-mute">
          Earlier builds, kept private — the projects that taught me the fundamentals.
        </p>
      </div>

      <ul className="group/list">
        {archive.map((a, i) => (
          <FadeIn as="li" key={a.title} delay={i * 0.06} y={14} className="group/row border-b border-line">
            <div className="grid grid-cols-12 items-baseline gap-x-5 gap-y-2 py-5 transition-opacity duration-600 group-hover/list:opacity-25 group-hover/row:!opacity-100 md:py-7">
              <span className="col-span-6 text-meta tabular md:col-span-1">{a.year}</span>
              <span className="col-span-6 text-right text-meta text-mute md:order-last md:col-span-1">{a.status}</span>
              <span className="col-span-12 font-display text-d3 md:col-span-4">{a.title}</span>
              <span className="col-span-12 text-meta text-mute md:col-span-4">{a.note}</span>
              <span className="col-span-12 text-meta md:col-span-2">{a.stack}</span>
            </div>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
