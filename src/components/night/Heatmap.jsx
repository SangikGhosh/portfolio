import { useMemo } from "react";
import PropTypes from "prop-types";

const LEVELS = [
  "rgba(246,244,240,0.06)",
  "rgba(255,122,99,0.28)",
  "rgba(255,122,99,0.5)",
  "rgba(255,122,99,0.74)",
  "#FF7A63",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toKey(d) {
  return d.toISOString().slice(0, 10);
}

/** A 53-week grid, Sunday-first, ending today. `counts` = { "YYYY-MM-DD": n }. */
export default function Heatmap({ counts, levels, label }) {
  const { weeks, months, max } = useMemo(() => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setUTCDate(start.getUTCDate() - 364 - start.getUTCDay());
    const cols = [];
    const monthMarks = [];
    let m = -1;
    let hi = 0;
    for (let c = 0; c < 53; c += 1) {
      const col = [];
      for (let r = 0; r < 7; r += 1) {
        const d = new Date(start);
        d.setUTCDate(start.getUTCDate() + c * 7 + r);
        if (d > today) {
          col.push(null);
          continue;
        }
        const key = toKey(d);
        const n = counts[key] || 0;
        hi = Math.max(hi, n);
        col.push({ key, n, lvl: levels ? levels[key] : undefined });
        if (r === 0 && d.getUTCMonth() !== m) {
          m = d.getUTCMonth();
          monthMarks.push({ c, label: MONTHS[m] });
        }
      }
      cols.push(col);
    }
    return { weeks: cols, months: monthMarks, max: hi };
  }, [counts, levels]);

  const levelOf = (cell) => {
    if (cell.lvl !== undefined) return cell.lvl;
    if (!cell.n) return 0;
    const r = cell.n / Math.max(1, max);
    return r > 0.66 ? 4 : r > 0.4 ? 3 : r > 0.18 ? 2 : 1;
  };

  return (
    <div className="overflow-x-auto pb-1" data-lenis-prevent>
      <div className="min-w-[640px]">
        <div className="relative mb-2 h-4">
          {months.map((mm) => (
            <span
              key={`${mm.label}-${mm.c}`}
              className="mono-meta absolute text-[0.65rem] text-night-muted"
              style={{ left: `${(mm.c / 53) * 100}%` }}
            >
              {mm.label}
            </span>
          ))}
        </div>
        <div className="grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: "repeat(7, 1fr)" }} role="img" aria-label={label}>
          {weeks.map((col, ci) =>
            col.map((cell, ri) =>
              cell ? (
                <span
                  key={cell.key}
                  title={`${cell.n} on ${cell.key}`}
                  className="aspect-square w-full rounded-[2.5px] transition-transform duration-200 hover:scale-[1.35]"
                  style={{ background: LEVELS[levelOf(cell)] }}
                />
              ) : (
                <span key={`e-${ci}-${ri}`} className="aspect-square w-full" />
              ),
            ),
          )}
        </div>
      </div>
    </div>
  );
}
Heatmap.propTypes = {
  counts: PropTypes.object.isRequired,
  levels: PropTypes.object,
  label: PropTypes.string,
};

export function HeatLegend() {
  return (
    <span className="mono-meta inline-flex items-center gap-1.5 text-[0.65rem] text-night-muted">
      less
      {LEVELS.map((c) => (
        <span key={c} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: c }} />
      ))}
      more
    </span>
  );
}
