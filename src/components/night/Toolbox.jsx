import { Fragment, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useMediaQuery } from "../../lib/hooks";
import { useLiveStats } from "../../lib/live";
import { itemsOf, totalTechCount, viewFor } from "../../lib/skills";
import { profile, skills } from "../../data/content";
import { ArrowUpRight, Reveal } from "../ui/primitives";
import InventorySheet from "./InventorySheet";

const EASE = [0.16, 1, 0.3, 1];
const PANEL_ID = "toolbox-panel";
const FACE = "linear-gradient(180deg, #F4EFE7 0%, #E4DDD1 100%)";
const keyShadow = (down) =>
  down
    ? "0 1px 0 #8F877B, 0 2px 5px rgba(0,0,0,0.45), inset 0 1px 0 #fff"
    : "0 4px 0 #8F877B, 0 7px 14px -4px rgba(0,0,0,0.6), inset 0 1px 0 #fff";

function Led({ on }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "h-[7px] w-[7px] shrink-0 rounded-full transition-[background-color,box-shadow] duration-300",
        on ? "bg-accent-signal shadow-[0_0_9px_2px_rgba(255,59,47,0.55)]" : "bg-[#CFC6B8] shadow-[inset_0_1px_1px_rgba(0,0,0,0.3)]",
      )}
    />
  );
}
Led.propTypes = { on: PropTypes.bool };

function LangKey({ lang, pressed, dimmed, onPress }) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-expanded={pressed}
      aria-controls={PANEL_ID}
      className={cn(
        "relative flex h-[2.75rem] min-w-[5.4rem] flex-[1_1_auto] items-center justify-center rounded-[9px] px-4 text-[0.92rem] font-medium text-ink transition-[transform,opacity,box-shadow] duration-200 ease-out md:h-[3rem]",
        pressed ? "translate-y-[3px]" : "hover:translate-y-[2px]",
        dimmed && "opacity-40 hover:opacity-80",
      )}
      style={{ background: FACE, boxShadow: keyShadow(pressed) }}
    >
      {lang.primary && (
        <span aria-hidden="true" className="absolute left-2.5 top-2.5 h-[5px] w-[5px] rounded-full bg-accent-signal/80" />
      )}
      {lang.label}
      {lang.primary && <span className="sr-only"> (primary)</span>}
    </button>
  );
}
LangKey.propTypes = { lang: PropTypes.object, pressed: PropTypes.bool, dimmed: PropTypes.bool, onPress: PropTypes.func };

function DomainKey({ domain, w, pressed, dimmed, onPress }) {
  const count = itemsOf(domain).length;
  return (
    <button
      type="button"
      onClick={onPress}
      aria-expanded={pressed}
      aria-controls={PANEL_ID}
      className={cn(
        "flex min-h-[8.25rem] min-w-0 flex-col justify-between rounded-[12px] p-4 text-left transition-[transform,opacity,box-shadow] duration-200 ease-out sm:p-5 md:min-h-[9.4rem]",
        "flex-[var(--w)_1_0]",
        pressed ? "translate-y-[3px]" : "hover:translate-y-[2px]",
        dimmed && "opacity-40 hover:opacity-80",
      )}
      style={{ "--w": w, background: FACE, boxShadow: keyShadow(pressed) }}
    >
      <span className="block">
        <span className="flex items-start justify-between gap-3">
          <span className="font-mono text-[0.62rem] tracking-[0.15em] text-ink-muted">
            {domain.code}
            {domain.tag && <span className="text-[#9A938B]"> · {domain.tag.toUpperCase()}</span>}
          </span>
          <Led on={pressed} />
        </span>
        <span className="mt-5 block font-display text-[clamp(1.2rem,0.55vw+1rem,1.55rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
          {domain.title}
        </span>
        <span className="mt-1.5 block text-[0.86rem] leading-snug text-ink-secondary">{domain.headline.join(" · ")}</span>
      </span>
      <span className="mt-3 block text-right font-mono text-[0.64rem] text-ink-muted">{count} inside</span>
    </button>
  );
}
DomainKey.propTypes = {
  domain: PropTypes.object,
  w: PropTypes.number,
  pressed: PropTypes.bool,
  dimmed: PropTypes.bool,
  onPress: PropTypes.func,
};

/** Animates its own height to whatever its content measures. */
function Collapse({ children }) {
  const reduce = useReducedMotion();
  const inner = useRef(null);
  const [h, setH] = useState(0);
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return undefined;
    setH(el.offsetHeight);
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: h, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ height: { duration: reduce ? 0 : 0.45, ease: EASE }, opacity: { duration: reduce ? 0 : 0.22 } }}
      className="overflow-hidden"
    >
      <div ref={inner}>{children}</div>
    </motion.div>
  );
}
Collapse.propTypes = { children: PropTypes.node };

// The separator travels with the item before it, so a wrapped line never starts with "·".
function Items({ items }) {
  return items.map((it, i) => (
    <span key={it} className="whitespace-nowrap">
      {it}
      {i < items.length - 1 && <span className="mx-1.5 text-night-outline">·</span>}
    </span>
  ));
}

/** The recessed display that opens under the pressed row. */
function Panel({ view, onClose, onInventory }) {
  const count = new Set(view.groups.flatMap((g) => g.items)).size;
  const cols = view.groups.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div className="pt-2.5 md:pt-3">
      <div
        id={PANEL_ID}
        role="region"
        aria-label={`${view.title} in detail`}
        className="relative overflow-hidden rounded-[14px] bg-[#12110E] px-5 py-6 sm:px-7 md:px-9 md:py-8"
        style={{ boxShadow: "inset 0 2px 14px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(255,255,255,0.035)" }}
      >
        <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 opacity-50" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="relative"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="min-w-0 truncate font-mono text-[0.68rem] tracking-[0.06em] text-night-muted">
                <span className="text-[#FF8B73]">sangik</span>
                <span className="hidden sm:inline">@kolkata</span> ~ % ls ./{view.id}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close detail"
                className="mono-meta shrink-0 rounded-full border border-night-border px-3 py-1.5 text-night-muted transition-colors duration-250 hover:border-night-outline hover:text-night-text"
              >
                esc ✕
              </button>
            </div>
            <p className="serif-italic mt-3 max-w-[42rem] text-[clamp(1.3rem,0.8vw+1.05rem,1.75rem)] leading-snug text-night-text">
              {view.summary}
            </p>

            <dl className={cn("mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2", cols)}>
              {view.groups.map((g, i) => (
                <motion.div
                  key={g.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 + i * 0.035, ease: EASE }}
                  className="border-t border-night-border pt-3"
                >
                  <dt className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-night-muted">{g.name}</dt>
                  <dd className="mt-2 flex flex-wrap items-center font-display text-[1.08rem] font-medium leading-snug tracking-[-0.01em] text-night-text">
                    {g.primary && <span aria-hidden="true" className="mr-2 h-[5px] w-[5px] rounded-full bg-accent-night" />}
                    <Items items={g.items} />
                  </dd>
                </motion.div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-night-border pt-5">
              <p className="mono-meta text-night-muted">
                {count} in {view.title.toLowerCase()}
              </p>
              <button
                type="button"
                onClick={onInventory}
                className="link-underline inline-flex items-center gap-1.5 text-[0.95rem] text-night-secondary hover:text-night-text"
              >
                See the full inventory <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
Panel.propTypes = { view: PropTypes.object, onClose: PropTypes.func, onInventory: PropTypes.func };

function SpaceBar() {
  const data = useLiveStats();
  const solved = data?.leetcode.solved;
  return (
    <a
      href={`https://leetcode.com/u/${profile.leetcode}/`}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-3 rounded-[12px] px-5 py-4 transition-transform duration-200 ease-out hover:translate-y-[2px] md:px-7 md:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
      style={{
        background: "linear-gradient(180deg, #2B2824 0%, #1A1714 100%)",
        boxShadow: "0 4px 0 #050504, 0 8px 16px -4px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.09)",
      }}
    >
      <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#34322D] px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.2em] text-[#8BEEA6]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8BEEA6]" style={{ animation: "led-pulse-green 2.4s ease-in-out infinite" }} />
          DAILY
        </span>
        <span className="font-display text-[1.12rem] font-semibold tracking-[-0.015em] text-night-text">{skills.dsa.title}</span>
      </span>
      <span className="text-[0.88rem] leading-snug text-night-secondary lg:flex-1 lg:text-center">
        {skills.dsa.topics.join(" · ")}
      </span>
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-night-muted transition-colors group-hover:text-night-text">
        {typeof solved === "number" ? `${solved} solved on LeetCode` : "LeetCode"}
        <ArrowUpRight className="h-3 w-3" />
      </span>
    </a>
  );
}

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export default function Toolbox() {
  const [active, setActive] = useState(null); // null | domain id | "languages"
  const [inventory, setInventory] = useState(false);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 540px)");

  // Desktop keeps the designed keyboard rows; tablets re-flow to 2 keys per row and phones to 1,
  // so the detail panel always opens directly under the key that was pressed.
  const rows = useMemo(
    () => (isLg ? skills.layout : chunk(skills.layout.flat(), isSm ? 2 : 1)),
    [isLg, isSm],
  );
  const domain = (id) => skills.domains.find((d) => d.id === id);
  const view = active ? viewFor(active) : null;

  const toggle = useCallback((id) => setActive((cur) => (cur === id ? null : id)), []);
  const close = useCallback(() => setActive(null), []);
  const openInventory = useCallback(() => setInventory(true), []);
  const closeInventory = useCallback(() => setInventory(false), []);

  const panelFor = (rowKey) => (
    <AnimatePresence initial={false}>
      {view && rowKey === (active === "languages" ? "fn" : rows.findIndex((r) => r.some((k) => k.id === active))) && (
        <Collapse key={`panel-${rowKey}`}>
          <Panel view={view} onClose={close} onInventory={openInventory} />
        </Collapse>
      )}
    </AnimatePresence>
  );

  return (
    <section
      id="toolbox"
      className="relative py-[clamp(6rem,11vw,9rem)]"
      onKeyDown={(e) => e.key === "Escape" && active && !inventory && close()}
    >
      <div className="shell">
        <div className="mx-auto max-w-content">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Toolbox</p>
              <h2 className="mt-[clamp(1.5rem,3vw,2.5rem)] text-h2 text-night-text">
                The keys I <em className="accent">reach</em> for.
              </h2>
            </div>
            <p className="serif-italic max-w-[21rem] text-[1.2rem] leading-snug text-night-secondary md:text-right">
              Six domains and one daily habit. Press a key to open it.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-[clamp(2.5rem,5vw,3.5rem)]">
            <div className="mb-5 flex flex-wrap items-center gap-2" role="group" aria-label="Focus the toolbox">
              {[{ id: null, label: "All" }, ...skills.filters].map((f) => (
                <button
                  key={f.label}
                  type="button"
                  aria-pressed={active === f.id}
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "h-9 rounded-full border px-4 text-[0.88rem] transition-colors duration-250",
                    active === f.id
                      ? "border-night-text bg-night-text text-night"
                      : "border-night-border text-night-secondary hover:border-night-outline hover:text-night-text",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div
              className="rounded-[22px] border border-[#2E2B26] p-3 sm:p-4 md:p-5"
              style={{
                background: "linear-gradient(180deg, #24211D 0%, #1A1815 100%)",
                boxShadow: "0 2.5rem 4rem -2.5rem rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* function row: languages */}
              <div className="flex flex-wrap gap-2 md:flex-nowrap md:gap-2.5">
                {skills.languages.map((l) => (
                  <LangKey
                    key={l.label}
                    lang={l}
                    pressed={active === "languages"}
                    dimmed={Boolean(active) && active !== "languages"}
                    onPress={() => toggle("languages")}
                  />
                ))}
              </div>
              {panelFor("fn")}

              {/* domain rows */}
              {rows.map((row, ri) => (
                <Fragment key={row.map((k) => k.id).join("-")}>
                  <div
                    className="mt-2.5 flex gap-2 md:mt-3 md:gap-2.5 lg:pl-[var(--off)]"
                    style={{ "--off": `${(ri + 1) * 1.6}%` }}
                  >
                    {row.map((k) => (
                      <DomainKey
                        key={k.id}
                        domain={domain(k.id)}
                        w={isLg ? k.w : 1}
                        pressed={active === k.id}
                        dimmed={Boolean(active) && active !== k.id}
                        onPress={() => toggle(k.id)}
                      />
                    ))}
                  </div>
                  {panelFor(ri)}
                </Fragment>
              ))}

              {/* spacebar: the daily practice */}
              <div className="mt-2.5 md:mt-3 md:px-[9%]">
                <SpaceBar />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="mono-meta inline-flex items-center gap-2 text-night-muted">
                <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-accent-signal/80" />
                primary languages · {skills.domains.length} domains · {totalTechCount} technologies
              </p>
              <button type="button" onClick={openInventory} className="btn btn-ghost-night self-start sm:self-auto">
                Explore the full inventory
                <ArrowUpRight className="arrow h-3.5 w-3.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <InventorySheet open={inventory} onClose={closeInventory} />
    </section>
  );
}
