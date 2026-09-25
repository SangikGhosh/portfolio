import { useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useZonedTime } from "../../lib/hooks";
import { useSmoothScroll } from "../../lib/smooth";
import { profile, socials } from "../../data/content";
import { ArrowDown, ArrowUpRight, Reveal } from "../ui/primitives";

const WEB3FORMS_KEY = "987eaf20-883f-4372-a319-b9deaedef032";

function Field({ label, as = "input", ...props }) {
  const Tag = as;
  return (
    <label className="group block">
      <span className="mono-meta text-night-muted transition-colors group-focus-within:text-night-text">{label}</span>
      <Tag
        {...props}
        className={cn(
          "mt-2 w-full resize-none border-b border-night-border bg-transparent pb-3 text-[1.05rem] text-night-text outline-none transition-colors duration-300 placeholder:text-night-outline focus:border-night-text",
          "focus-visible:outline-none",
        )}
      />
    </label>
  );
}

Field.propTypes = { label: PropTypes.string, as: PropTypes.string };

function NoteForm() {
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New note from sangik.dev");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-[40rem] gap-8 text-left" data-lenis-prevent>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" placeholder="Ada Lovelace" />
        <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="ada@company.com" />
      </div>
      <Field as="textarea" label="Message" name="message" required rows={3} placeholder="What are you building?" />
      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" disabled={status === "sending"} className="btn btn-light disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send note"}
          <ArrowUpRight className="arrow h-3.5 w-3.5" />
        </button>
        <p aria-live="polite" className="text-[0.95rem] text-night-secondary">
          {status === "sent" && "Thank you — I’ll reply within a day or two."}
          {status === "error" && (
            <>
              Couldn&rsquo;t send that. Email me at{" "}
              <a className="text-night-text underline underline-offset-4" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const time = useZonedTime(profile.timezone);
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="contact" className="relative overflow-hidden pt-[clamp(7rem,13vw,11rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-[0.07] blur-[80px]"
        style={{ background: "radial-gradient(circle, #FF7A63, transparent 65%)" }}
      />

      <div className="shell relative">
        <div className="mx-auto max-w-[56rem] text-center">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-[clamp(1.5rem,3vw,2.5rem)] text-display text-night-text">
              Let&rsquo;s build something
              <br />
              <em className="accent">dependable</em>.
            </h2>
            <p className="mx-auto mt-7 max-w-[36rem] text-lede text-night-secondary">
              I&rsquo;m open to full-time roles and freelance work. The fastest way to reach me is email — I read everything.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <a href={`mailto:${profile.email}`} className="btn btn-lg btn-light">
              Email me
              <ArrowUpRight className="arrow h-4 w-4" />
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-lg btn-ghost-night">
              View résumé
            </a>
          </Reveal>

          <Reveal delay={0.12} className="mt-8">
            <button
              type="button"
              aria-expanded={showForm}
              onClick={() => setShowForm((v) => !v)}
              className="serif-italic inline-flex items-center gap-2 text-[1.2rem] text-night-secondary transition-colors hover:text-night-text"
            >
              {showForm ? "or, never mind" : "or leave a note right here"}
              <ArrowDown className={cn("h-4 w-4 transition-transform duration-400 ease-emphasized", showForm && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>
              {showForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <NoteForm />
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.1} className="mt-[clamp(4rem,8vw,6rem)]">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-[1.12rem] text-night-secondary hover:text-night-text"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono-meta mt-8 text-night-muted">
              {profile.availability} · {profile.city}, IN · {profile.email}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-[clamp(5rem,10vw,8rem)] max-w-content">
          <p className="font-mono text-[0.82rem] text-night-muted" aria-hidden="true">
            <span className="text-[#FF8B73]">sangik</span>@kolkata ~ % exit
            <span className="blink ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.18em] bg-night-muted" />
          </p>
          <footer className="mt-5 flex flex-col gap-4 border-t border-night-border py-7 text-[0.9rem] text-night-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Sangik Ghosh — designed &amp; engineered in Kolkata.</p>
            <div className="flex items-center gap-6">
              <span className="mono-meta tabular">
                {profile.city} {time} IST
              </span>
              <button
                type="button"
                onClick={() => scrollTo("top", { offset: 0, duration: 2 })}
                className="link-underline text-night-secondary hover:text-night-text"
              >
                Back to top ↑
              </button>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
