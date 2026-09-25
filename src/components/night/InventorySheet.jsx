import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { useSmoothScroll } from "../../lib/smooth";
import { skills } from "../../data/content";
import { totalTechCount } from "../../lib/skills";

const EASE = [0.16, 1, 0.3, 1];

function Items({ items }) {
  return items.map((it, i) => (
    <span key={it} className="whitespace-nowrap">
      {it}
      {i < items.length - 1 && <span className="mx-1.5 text-hairline-strong">·</span>}
    </span>
  ));
}

function Block({ code, title, summary, groups }) {
  return (
    <section className="grid gap-5 py-7 md:grid-cols-[13.5rem_1fr] md:gap-10">
      <div>
        <p className="font-mono text-[0.64rem] tracking-[0.16em] text-ink-muted">{code}</p>
        <h3 className="mt-2 font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
        {summary && <p className="mt-2 max-w-[20rem] text-[0.92rem] leading-snug text-ink-secondary">{summary}</p>}
      </div>
      <dl className="grid content-start gap-x-8 gap-y-5 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.name} className="border-t border-hairline pt-3">
            <dt className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-muted">{g.name}</dt>
            <dd className="mt-1.5 flex flex-wrap text-[1rem] font-medium leading-snug text-ink">
              <Items items={g.items} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
Block.propTypes = {
  code: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  groups: PropTypes.array,
};

/** The printed spec sheet: every technology, grouped, one place each. */
export default function InventorySheet({ open, onClose }) {
  const { lock } = useSmoothScroll();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const returnTo = document.activeElement;
    lock(true);
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      lock(false);
      if (returnTo && returnTo.focus) returnTo.focus();
    };
  }, [open, lock, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-[#0B0A08]/75" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inventory-title"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 28, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[22px] bg-paper text-ink shadow-[0_2rem_5rem_-1rem_rgba(0,0,0,0.85)] md:max-h-[86vh] md:max-w-[68rem] md:rounded-[22px]"
          >
            <header className="flex items-start justify-between gap-6 border-b border-hairline px-5 pb-5 pt-6 sm:px-8 md:px-10 md:pt-8">
              <div>
                <p className="eyebrow">Full inventory · {totalTechCount} in total</p>
                <h2 id="inventory-title" className="mt-3 font-display text-[clamp(1.6rem,1.4vw+1.1rem,2.3rem)] font-semibold tracking-[-0.025em] text-ink">
                  Everything in the <em className="accent">toolbox</em>.
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="btn btn-secondary h-10 shrink-0 px-4 text-[0.875rem]"
              >
                Close <span className="font-mono text-[0.7rem] text-ink-muted">esc</span>
              </button>
            </header>

            <div className="overflow-y-auto overscroll-contain px-5 sm:px-8 md:px-10" data-lenis-prevent>
              <div className="divide-y divide-hairline pb-6">
                {skills.domains.map((d) => (
                  <Block
                    key={d.id}
                    code={d.tag ? `${d.code} · ${d.tag.toUpperCase()}` : d.code}
                    title={d.title}
                    summary={d.summary}
                    groups={d.groups}
                  />
                ))}
                <Block
                  code="LANGUAGES"
                  title="Languages"
                  summary={skills.languagesSummary}
                  groups={skills.languages.map((l) => ({ name: l.use, items: [l.label] }))}
                />
                <Block
                  code="PRACTICE · DAILY"
                  title="Data structures & algorithms"
                  summary="Not a tool — a habit. A few problems most days, on LeetCode."
                  groups={[{ name: "Topics", items: skills.dsa.topics }]}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
InventorySheet.propTypes = { open: PropTypes.bool, onClose: PropTypes.func.isRequired };
