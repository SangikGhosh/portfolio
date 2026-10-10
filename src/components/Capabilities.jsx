import { capabilities, languages } from "../data/content";
import { FadeIn, Label, RiseText } from "./ui/primitives";

/* Black chapter, part one. Each row turns over to white when you point at it. */
export default function Capabilities() {
  return (
    <section aria-label="Capabilities" className="px-gutter pb-[clamp(6rem,16svh,11rem)] pt-[clamp(3rem,8svh,6rem)]">
      <div className="grid grid-cols-12 gap-x-5 gap-y-6 pb-12 md:pb-20">
        <div className="col-span-12 md:col-span-3">
          <Label>Capabilities</Label>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="flex items-start font-display text-d1">
            <RiseText text="What I build" />
            <span className="count text-[0.36em] tabular">(06)</span>
          </h2>
          <FadeIn as="p" delay={0.2} className="mt-6 max-w-[34rem] text-lead text-dim">
            Six disciplines, one habit: make it hold. Python where the AI lives, Java where nothing may fall
            over, Flutter where people touch it.
          </FadeIn>
        </div>
      </div>

      <ul className="border-b border-rule">
        {capabilities.map((c, i) => (
          <FadeIn as="li" key={c.title} y={16} delay={i * 0.04} className="group relative border-t border-rule">
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-600 ease-out group-hover:scale-y-100"
            />
            <div className="relative grid grid-cols-12 items-baseline gap-x-5 gap-y-3 py-6 transition-colors duration-600 ease-out group-hover:text-ink md:px-3 md:py-8">
              <span className="col-span-2 text-meta tabular md:col-span-1">0{i + 1}</span>
              <h3 className="col-span-10 font-display text-d3 md:col-span-3">{c.title}</h3>
              <p className="col-span-12 text-meta text-dim transition-colors duration-600 group-hover:text-mute md:col-span-4">
                {c.summary}
              </p>
              <p className="col-span-12 text-meta md:col-span-4">{c.tools.join(", ")}</p>
            </div>
          </FadeIn>
        ))}
      </ul>

      <FadeIn className="mt-8 grid grid-cols-12 gap-x-5 gap-y-2 text-meta">
        <span className="col-span-12 text-dim md:col-span-4">Languages</span>
        <span className="col-span-12 md:col-span-8">{languages.join(", ")}</span>
      </FadeIn>
    </section>
  );
}
