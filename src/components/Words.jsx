import { testimonials } from "../data/content";
import { cn } from "../lib/utils";
import { FadeIn, Label, RiseText } from "./ui/primitives";

const PLACE = ["md:ml-[6%]", "md:mx-auto", "md:ml-auto md:mr-[6%]"];

/* The headline stays pinned; the quotes pass over it one at a time. */
export default function Words() {
  return (
    <section aria-label="Testimonials" className="relative px-gutter">
      <div className="sticky top-0 flex h-[100svh] flex-col pb-8 pt-24">
        <div className="flex flex-1 items-center justify-center">
          <RiseText
            as="h2"
            text={["In their", "words."]}
            stagger={0.06}
            amount={0.5}
            className="text-center font-display text-giant"
          />
        </div>
        <div className="flex items-end justify-between">
          <Label>Testimonials</Label>
          <span className="text-meta tabular">(0{testimonials.length})</span>
        </div>
      </div>

      <ol className="relative -mt-[100svh] flex flex-col gap-[48svh] pb-[45svh] pt-[85svh]">
        {testimonials.map((t, i) => (
          <FadeIn
            as="li"
            key={t.name}
            y={60}
            amount={0.3}
            className={cn("on-dark w-full max-w-[27rem] p-6 md:p-8", PLACE[i % PLACE.length])}
          >
            <p className="font-display text-d3 tabular">{i + 1}</p>
            <blockquote className="mt-10 text-lead">“{t.quote}”</blockquote>
            <footer className="mt-10">
              <p className="text-meta">{t.name}</p>
              <p className="text-meta text-dim">{t.role}</p>
            </footer>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}
