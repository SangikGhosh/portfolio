import { capabilities, languages } from "../data/content";
import { FadeIn, Label, Magnetic, RiseText, Roll } from "./ui/primitives";

/* One tool, a softly filled pill that turns over with its row. It leans toward the pointer and its name rolls. */
function Tool({ children }) {
  return (
    <Magnetic
      as="li"
      data-cursor-hover
      className="roll-trigger rounded-full bg-paper/[0.07] px-3 py-1 text-[0.8125rem] leading-tight transition-colors duration-600 ease-out group-hover:bg-ink/[0.06]"
    >
      <Roll>{children}</Roll>
    </Magnetic>
  );
}

/* Black chapter, part one. An index of disciplines; each row turns over to white when you point at it. */
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
            <span className="count text-[0.36em] tabular">({String(capabilities.length).padStart(2, "0")})</span>
          </h2>
          <FadeIn as="p" delay={0.2} className="mt-6 max-w-[34rem] text-lead text-dim">
            Six disciplines, one habit: make it hold. Python where the AI lives, Java where nothing may fall
            over, Flutter where people touch it.
          </FadeIn>
        </div>
      </div>

      <ul>
        {capabilities.map((c, i) => (
          <FadeIn as="li" key={c.title} y={16} delay={i * 0.04} className="group relative">
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-600 ease-out group-hover:scale-y-100"
            />
            <div className="relative grid grid-cols-12 items-baseline gap-x-5 gap-y-4 py-7 transition-colors duration-600 ease-out group-hover:text-ink md:px-3 md:py-9">
              <span className="col-span-2 text-meta tabular text-dim transition-colors duration-600 group-hover:text-mute md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="col-span-10 flex items-start font-display text-d2 md:col-span-3">
                {c.title}
                <span className="count text-[0.36em] tabular text-dim transition-colors duration-600 group-hover:text-mute">
                  ({String(c.tools.length).padStart(2, "0")})
                </span>
              </h3>
              <p className="col-span-12 max-w-[26rem] text-meta text-dim transition-colors duration-600 group-hover:text-mute md:col-span-4">
                {c.summary}
              </p>
              <ul aria-label={`${c.title} tools`} className="col-span-12 flex flex-wrap gap-1.5 md:col-span-4">
                {c.tools.map((t) => (
                  <Tool key={t}>{t}</Tool>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}

        <FadeIn as="li" y={16} delay={capabilities.length * 0.04} className="group relative">
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-600 ease-out group-hover:scale-y-100"
          />
          <div className="relative grid grid-cols-12 items-baseline gap-x-5 gap-y-4 py-7 transition-colors duration-600 ease-out group-hover:text-ink md:px-3 md:py-9">
            <span className="col-span-12 text-meta text-dim transition-colors duration-600 group-hover:text-mute md:col-span-8">
              Languages I write in, most days
            </span>
            <ul aria-label="Languages" className="col-span-12 flex flex-wrap gap-1.5 md:col-span-4">
              {languages.map((l) => (
                <Tool key={l}>{l}</Tool>
              ))}
            </ul>
          </div>
        </FadeIn>
      </ul>
    </section>
  );
}
