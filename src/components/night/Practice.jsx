import { useMemo } from "react";
import PropTypes from "prop-types";
import { useLiveStats } from "../../lib/live";
import { profile, statsSnapshot } from "../../data/content";
import { ArrowUpRight, CountUp, Reveal } from "../ui/primitives";
import Heatmap, { HeatLegend } from "./Heatmap";

const LANG_DOT = {
  Java: "#E0A060",
  JavaScript: "#E8D36A",
  TypeScript: "#6FA8E8",
  Python: "#7FA7D9",
  Dart: "#6FD0C4",
  Kotlin: "#B69CF0",
  HTML: "#E88C6A",
  CSS: "#9A8CE8",
};

function ago(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const units = [
    [60 * 60 * 24 * 365, "y"],
    [60 * 60 * 24 * 30, "mo"],
    [60 * 60 * 24 * 7, "w"],
    [60 * 60 * 24, "d"],
    [60 * 60, "h"],
  ];
  for (const [u, l] of units) if (s >= u) return `${Math.floor(s / u)}${l} ago`;
  return "just now";
}

function Stat({ value, label, sub, first }) {
  return (
    <div className={first ? "py-6 md:pr-10" : "border-t border-night-border py-6 md:border-l md:border-t-0 md:px-10"}>
      <p className="serif-italic text-stat-xl text-night-text">
        {value === null ? <span className="text-night-border">—</span> : <CountUp to={value} />}
      </p>
      <p className="mt-4 max-w-[15rem] text-[0.98rem] leading-snug text-night-secondary">{label}</p>
      {sub && <p className="mono-meta mt-2 text-night-muted">{sub}</p>}
    </div>
  );
}
Stat.propTypes = { value: PropTypes.number, label: PropTypes.string, sub: PropTypes.string, first: PropTypes.bool };

function Panel({ title, meta, href, children }) {
  return (
    <div className="rounded-panel border border-night-border bg-night-raised/70 p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-baseline gap-3">
          <span className="font-display text-[1.1rem] font-semibold tracking-[-0.01em] text-night-text">{title}</span>
          <span className="mono-meta text-night-muted transition-colors group-hover:text-night-text">{meta}</span>
          <ArrowUpRight className="h-3 w-3 self-center text-night-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <HeatLegend />
      </div>
      {children}
    </div>
  );
}
Panel.propTypes = { title: PropTypes.string, meta: PropTypes.string, href: PropTypes.string, children: PropTypes.node };

export default function Practice() {
  const data = useLiveStats();

  const gh = useMemo(() => {
    const counts = {};
    const levels = {};
    (data?.github.days || []).forEach((d) => {
      counts[d.date] = d.count;
      levels[d.date] = d.level;
    });
    return { counts, levels };
  }, [data]);

  return (
    <section id="practice" className="relative py-[clamp(6rem,11vw,9rem)]">
      <div className="shell">
        <div className="mx-auto max-w-content">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Practice</p>
              <h2 className="mt-[clamp(1.5rem,3vw,2.5rem)] text-h2 text-night-text">
                Reps, not <em className="accent">rhetoric</em>.
              </h2>
            </div>
            <p className="mono-meta inline-flex items-center gap-2 text-night-muted">
              <span className={`h-1.5 w-1.5 rounded-full ${data?.live ? "bg-[#8BEEA6] shadow-[0_0_6px_#8BEEA6]" : "bg-night-outline"}`} />
              {data ? (data.live ? "live from GitHub & LeetCode" : `snapshot · ${statsSnapshot.asOf}`) : "fetching…"}
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-[clamp(3rem,6vw,4.5rem)] grid border-y border-night-border md:grid-cols-3">
            <Stat first value={data ? data.github.contributions : null} label="contributions on GitHub in the last twelve months" />
            <Stat
              value={data ? data.leetcode.solved : null}
              label="problems solved on LeetCode, and counting"
              sub={data ? `${data.leetcode.hard} hard · ${data.leetcode.medium} medium · ${data.leetcode.easy} easy` : " "}
            />
            <Stat value={data ? data.github.repos : null} label="public repositories — experiments included" />
          </Reveal>

          <div className="mt-12 grid gap-5">
            <Reveal delay={0.05}>
              <Panel
                title="GitHub"
                meta={`@${profile.github}`}
                href={`https://github.com/${profile.github}`}
              >
                <Heatmap counts={gh.counts} levels={gh.levels} label="GitHub contributions over the last year" />
              </Panel>
            </Reveal>
            <Reveal delay={0.08}>
              <Panel
                title="LeetCode"
                meta={`@${profile.leetcode}`}
                href={`https://leetcode.com/u/${profile.leetcode}/`}
              >
                <Heatmap counts={data?.leetcode.days || {}} label="LeetCode submissions over the last year" />
              </Panel>
            </Reveal>
          </div>

          {data?.repos?.length > 0 && (
            <Reveal delay={0.06} className="mt-16">
              <div className="mb-5 flex items-baseline justify-between">
                <p className="eyebrow">Recently pushed</p>
                <a
                  href={`https://github.com/${profile.github}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline mono-meta text-night-muted hover:text-night-text"
                >
                  all repositories
                </a>
              </div>
              <ul className="grid gap-px overflow-hidden rounded-panel border border-night-border bg-night-border sm:grid-cols-2 lg:grid-cols-3">
                {data.repos.map((r) => (
                  <li key={r.name} className="bg-night">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors duration-300 hover:bg-night-raised"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="break-all font-mono text-[0.9rem] text-night-text">{r.name}</span>
                        <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-night-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-night-text" />
                      </span>
                      <span className="mono-meta flex items-center gap-3 text-night-muted">
                        {r.language && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full" style={{ background: LANG_DOT[r.language] || "#8B8985" }} />
                            {r.language}
                          </span>
                        )}
                        <span>pushed {ago(r.pushed)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
