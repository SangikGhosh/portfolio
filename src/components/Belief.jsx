import { belief } from "../data/content";
import BlinkStage from "./BlinkStage";
import { ArrowDown, Label, RiseText } from "./ui/primitives";

/* The last white frame before the page closes its eyes and the dark chapter begins. */
export default function Belief() {
  return (
    <BlinkStage mode="close" label="Belief">
      <div className="flex h-full flex-col bg-paper px-gutter pb-8 pt-24">
        <div className="flex flex-1 items-center justify-center">
          <RiseText
            as="p"
            text={belief}
            className="text-center font-display text-d1"
            stagger={0.05}
            amount={0.6}
          />
        </div>
        <div className="flex items-end justify-between">
          <Label>Belief</Label>
          <span className="inline-flex items-center gap-2 text-meta">
            Scroll <ArrowDown className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </BlinkStage>
  );
}
