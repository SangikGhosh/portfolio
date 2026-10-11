import { useLiveStats } from "../lib/live";
import { profile, statsSnapshot } from "../data/content";
import { ArrowUpRight, CountUp, FadeIn, Label, Roll } from "./ui/primitives";

/* Black chapter, part two: numbers that are fetched, not typed in. */
export default function Numbers() {
  const live = useLiveStats();
  const lc = live?.leetcode ?? {
    solved: statsSnapshot.leetcodeSolved,
    easy: statsSnapshot.leetcodeEasy,
    medium: statsSnapshot.leetcodeMedium,
    hard: statsSnapshot.leetcodeHard,
  };
  const gh = live?.github ?? { contributions: statsSnapshot.contributions, repos: statsSnapshot.publicRepos };

  const stats = [
    {
      value: lc.solved,
      label: "LeetCode problems solved",
      sub: `${lc.easy} easy · ${lc.medium} medium · ${lc.hard} hard`,
      href: `https://leetcode.com/u/${profile.leetcode}/`,
    },
    {
      value: gh.contributions,
      label: "GitHub contributions, last 12 months",
      sub: "Commits, reviews and issues",
      href: `https://github.com/${profile.github}`,
    },
    {
      value: gh.repos,
      label: "Public repositories",
      sub: "Experiments included",
      href: `https://github.com/${profile.github}?tab=repositories`,
    },
  ];

  return (
    <section aria-label="By the numbers" className="px-gutter pb-[clamp(4rem,10svh,7rem)]">
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5">
        <Label>By the numbers</Label>
        <p className="text-meta text-dim">
          {live?.live ? "Live from GitHub & LeetCode" : `Snapshot · ${statsSnapshot.asOf}`}
        </p>
      </div>

      <div className="grid md:grid-cols-3">
        {stats.map((s, i) => (
          <FadeIn
            key={s.label}
            delay={i * 0.08}
            className={i > 0 ? "py-8 md:pl-6" : "py-8 md:pr-6"}
          >
            <a href={s.href} target="_blank" rel="noreferrer" className="group block">
              <CountUp
                to={s.value}
                className="block font-display text-[clamp(4.5rem,10vw,10.5rem)] leading-[0.9] tracking-[-0.03em] tabular"
              />
              <span className="mt-6 flex items-center gap-2 text-meta">
                <Roll>{s.label}</Roll>
                <ArrowUpRight className="h-3 w-3 text-dim transition-transform duration-600 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 block text-meta text-dim">{s.sub}</span>
            </a>
          </FadeIn>
        ))}
      </div>

    </section>
  );
}
