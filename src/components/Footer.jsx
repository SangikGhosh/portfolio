import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useBlink } from "../lib/blink";
import { useSmoothScroll } from "../lib/smooth";
import { useZonedTime } from "../lib/hooks";
import { contact, profile, socials } from "../data/content";
import { ArrowRight, ArrowUp, ArrowUpRight, EASE, FadeIn, Label, Roll } from "./ui/primitives";

const WEB3FORMS_KEY = "987eaf20-883f-4372-a319-b9deaedef032";

function Marquee() {
  const item = ([big, small], k) => (
    <span key={k} className="flex shrink-0 items-center gap-8 pr-8">
      <span className="whitespace-nowrap font-display text-d2">{big}</span>
      <span className="max-w-[17rem] text-meta leading-snug">{small}</span>
    </span>
  );
  return (
    <div className="overflow-hidden py-6 md:py-8" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((half) => (
          <div key={half} className="flex">
            {contact.marquee.map((pair, k) => item(pair, `${half}-${k}`))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, as: Tag = "input", ...props }) {
  return (
    <label className="block">
      <span className="text-meta text-dim">{label}</span>
      <Tag
        {...props}
        // The message box grows with its text, so it never scrolls on its own and the page keeps one smooth scroll.
        className={`mt-2 w-full resize-none rounded-none border-b border-rule bg-transparent pb-3 text-lead text-paper outline-none transition-colors duration-400 placeholder:text-[#4a4a4a] focus:border-paper ${
          Tag === "textarea" ? "min-h-[4.5em] [field-sizing:content]" : ""
        }`}
      />
    </label>
  );
}

function NoteForm() {
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "New note from the portfolio");
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
    <form onSubmit={onSubmit} className="grid gap-8">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" placeholder="Your name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
      </div>
      <Field as="textarea" label="Message" name="message" required rows={3} placeholder="What are you building?" />
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" disabled={status === "sending"} className="btn-sq">
          {status === "sending" ? "Sending…" : "Send note"}
          <ArrowRight className="arrow h-3.5 w-3.5" />
        </button>
        <p aria-live="polite" className="text-meta text-dim">
          {status === "sent" && "Thank you. I’ll reply within a day or two."}
          {status === "error" && (
            <>
              Couldn’t send that. Email me at{" "}
              <a className="line-link-on text-paper" href={`mailto:${profile.email}`}>
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

/** The name, set as large as the page is wide. */
function Wordmark() {
  const ref = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [size, setSize] = useState(null);

  // scale the current size by how far the line falls short of (or overshoots) the column
  const fit = useCallback(() => {
    const text = textRef.current;
    const line = lineRef.current;
    if (!text || !line) return;
    const current = parseFloat(getComputedStyle(text).fontSize);
    const w = line.getBoundingClientRect().width;
    if (!w) return;
    const next = current * (text.clientWidth / w) * 0.995;
    setSize((s) => (s !== null && Math.abs(next - s) < 0.5 ? s : next));
  }, []);

  useLayoutEffect(() => {
    fit();
  }, [fit]);

  useEffect(() => {
    const ro = new ResizeObserver(fit);
    if (ref.current) ro.observe(ref.current);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [fit]);

  const letters = profile.name.split("");
  return (
    <div ref={ref} className="px-gutter pt-[clamp(2rem,8svh,5rem)]">
      <p
        ref={textRef}
        className="whitespace-nowrap font-display leading-[0.8] tracking-[-0.03em]"
        style={{ fontSize: size ? `${size}px` : "15vw" }}
      >
        <span className="sr-only">{profile.name}</span>
        <span ref={lineRef} aria-hidden="true" className="-mb-[0.1em] inline-block overflow-hidden pb-[0.26em] align-bottom">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block whitespace-pre"
              initial={reduce ? false : { y: "105%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{ duration: 1.3, ease: EASE, delay: i * 0.035 }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      </p>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button type="button" onClick={copy} data-cursor={copied ? "Copied" : "Copy"} className="text-left text-lead">
      <span className="line-link break-all">{profile.email}</span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}

export default function Footer() {
  const { blink } = useBlink();
  const { jump } = useSmoothScroll();
  const time = useZonedTime(profile.timezone);

  return (
    <footer id="contact" className="on-dark relative pt-[clamp(5rem,13svh,8rem)]">
      <Marquee />

      <div className="grid grid-cols-12 gap-x-5 gap-y-12 px-gutter pb-[clamp(5rem,14svh,9rem)] pt-[clamp(4rem,10svh,7rem)]">
        <div className="col-span-12 md:col-span-3">
          <p className="text-meta">©{new Date().getFullYear()}</p>
        </div>

        <FadeIn className="col-span-12 md:col-span-4">
          <Label>Open</Label>
          <p className="indent mt-6 max-w-[24rem] text-lead">
            {contact.open}{" "}
            <a href={`mailto:${profile.email}`} className="line-link-on">
              say hello
            </a>
            .
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="col-span-12 sm:col-span-6 md:col-span-3">
          <Label>Contact</Label>
          <div className="mt-6 space-y-5">
            <div>
              <p className="text-meta text-dim">Email</p>
              <CopyEmail />
            </div>
            <div>
              <p className="text-meta text-dim">Elsewhere</p>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="text-lead">
                <Roll>WhatsApp</Roll>
              </a>
              <span className="text-lead text-dim"> · </span>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="text-lead">
                <Roll>Résumé</Roll>
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="col-span-12 sm:col-span-6 md:col-span-2">
          <Label>Social</Label>
          <ul className="mt-6 space-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-lead">
                  <Roll>{s.label}</Roll>
                  <ArrowUpRight className="h-3 w-3 text-dim transition-transform duration-600 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="col-span-12 pt-6 md:col-span-3 md:pt-10">
          <Label>Leave a note</Label>
        </div>
        <div className="col-span-12 md:col-span-9 md:pt-10">
          <NoteForm />
        </div>
      </div>

      <Wordmark />

      <div className="flex flex-wrap items-baseline justify-between gap-4 px-gutter pb-6 pt-6 text-meta">
        <span className="text-dim">Designed &amp; built by {profile.name}</span>
        <span className="tabular text-dim">
          {profile.city} {time} IST
        </span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            blink(() => jump("top"));
          }}
          className="inline-flex items-center gap-2"
        >
          <Roll>Back to top</Roll>
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
