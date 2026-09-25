# PORTFOLIO_DESIGN_ANALYSIS.md

> Reverse-engineered design and interaction spec, taken from a screen recording of a reference portfolio site. Use it as the brief for upgrading the Sangik Ghosh portfolio in this repo (React 18 + Vite + Tailwind 3 + GSAP + framer-motion).
>
> **Source:** `C:\Users\sangi\Videos\2026-09-25 11-39-08.mp4` (55.37 s, 1920×1080, 60 fps, OBS capture of Brave on Windows 11). The reference is a product-designer portfolio, not ours. Everything below describes **how it behaves**. None of its copy, branding, illustrations, photos or signature concepts may be reused.

---

## 0. How to read this document

### 0.1 Confidence labels

| Label | Meaning |
|---|---|
| **[M] Measured** | Taken from the pixels, e.g. row/column ink profiles, color sampling or per-frame motion tracking. Error is roughly ±1–2 device px, or ±3–6 in each RGB channel (video compression). |
| **[O] Observed** | Seen directly in frames but not measured numerically. |
| **[I] Inferred** | A reasoned conclusion from what was observed. It is probably right, but verify it during implementation. |
| **[A] Assumption** | Something the video cannot show, such as mobile layout, focus states or exact easing curves. Treat as a recommendation. |

### 0.2 Units: device px vs CSS px (important)

- The Windows taskbar measures 60 device px, and the scrollbar is ≈18 px. Both match **Windows display scaling of 125%**, so **devicePixelRatio ≈ 1.25** **[I]**.
- **Every CSS value here = measured device px ÷ 1.25.** The recording viewport is ≈ **1522 × 698 CSS px**, a typical 14–15″ laptop at 125% scaling **[I]**.
- The recording contains only one viewport size. All responsive behavior is therefore **[A]**.

### 0.3 Analysis method (so the numbers can be trusted)

1. Contact sheets of the whole video at 4 fps (221 frames) to map the story.
2. Per-frame (60 fps, 3,321 frames) vertical-shift estimation of the viewport, giving scroll velocity per frame and smoothing/inertia curves.
3. Targeted 20–60 fps frame extraction of 11 interactions: entrance, TV hover, button hovers, RTL card, circle transition, DVD sequence, DVD hover, marquee, torch desk, count-up, hands illustration.
4. Pixel color sampling (median, darkest-3% and brightest-3% per region) for backgrounds, text and accents.
5. Glyph row/column profiles for cap heights, x-heights, line pitch and element boxes. Corner-inset curves for border radii.
6. Template tracking of the logo, frame by frame, to time the navbar hide/show.

---

## 1. Executive Summary

The reference is a **warm, editorial, single-page portfolio**. It combines strict typographic discipline with a few playful, tactile "objects". Its polish comes from five things:

1. **One typographic device, used everywhere.** A heavy grotesk sans sentence ends in, or contains, **one word in a high-contrast serif italic** set in ink-blue (on light) or lavender (on dark). Every heading uses it. It is the site's voice.
2. **Two themes told as one story.** The first half is **light "paper"** (`#F7F2ED`) and holds the professional work. The second half is **dark "after hours"** (`#14130F`) and holds the personal work. A **scroll-scrubbed black dot grows into a full-screen circle** to move between them.
3. **Calm, low-amplitude motion.** Content fades up about 12–24 px. Hovers are pure color changes (~250 ms). Lenis-style smooth scrolling runs with lerp ≈ 0.1. The nav hides on scroll-down and reveals on scroll-up. Nothing bounces, parallaxes aggressively or spins without purpose.
4. **Skeuomorphic "signature objects" that do real jobs.** A retro CSS TV plays a 60-second intro. A TV, a DVD shelf and a player act as the video library. A dark desk with a flashlight cursor acts as the articles index. Each object is **the navigation for that content type**, not decoration.
5. **Evidence-first content.** Each case study row shows a client badge, tags, a problem-framed title, 2–3 lines of copy, **two big serif-italic metrics**, then primary and secondary CTAs. Mentorship stats count up on entry.

**For our portfolio:** adopt the type device, the light→dark chapter structure, the headroom nav, the smooth scroll, the case-study row anatomy, the button language, the metric typography and the reveal system. **Do not copy** the TV/DVD, the torch desk, the hands illustration, the circle transition *as-is*, or any copy. Section 19 gives our own equivalents (e.g. a terminal/cartridge metaphor and a cursor-block transition).

---

## 2. Video Analysis

### 2.1 What the recording contains

| Segment | Time | Content |
|---|---|---|
| Recorder UI | 00:00.0–00:01.4 and 00:53.7–00:55.4 | OBS Studio window. Not part of the site; ignored. |
| Reference site (top, already loaded) | 00:01.5–00:08.2 | Hero idle, cursor wandering, TV hover preview |
| Reload | 00:08.2–00:08.8 | Browser refresh, which **exposes the page-load entrance animation** |
| Full scroll-through with interactions | 00:09.7–00:53.6 | Every section to the footer, including hovers, clicks, an external Medium tab (00:46.2–00:48.2) and a return |

### 2.2 Browser and viewport facts

- Brave, with the tab and bookmark bars visible. Web viewport is ≈1902×873 device px (≈1522×698 CSS) **[M/I]**.
- The page uses the **native scrollbar**, which renders **dark** (track ≈`#2C2C2C`, thumb ≈`#757575`). This suggests `color-scheme: dark` on the root, or a browser dark theme **[I, uncertain]**.
- Thumb/track ratio ≈ 0.078, so the **total page length is ≈ 12.8 viewports ≈ 8,900 CSS px** (this includes the pinned transition runway) **[M/I]**.
- The status bar shows link targets. "Read More" goes to an **internal case-study route** (`/<slug>`). "Watch Video" goes to **YouTube (external)**. "Read on Medium" and the article notes go to **Medium (external, new tab)** **[O]**.

### 2.3 Global motion facts from per-frame tracking

- **Smooth scroll with inertia [M]:** each wheel burst decays geometrically to 0 over **0.6–1.2 s** (≈0.88–0.93× per frame). There are no per-notch steps. Example (device px/frame): `38 38 38 36 34 32 32 30 28 28 24 22 20 16 14 14 12 10 10 8 6 6 6 4 4 4 4 2 0`. That matches **Lenis with lerp ≈ 0.08–0.1** (or `duration ≈ 1.1–1.2 s`) **[I]**.
- Peak scroll velocity observed is ≈ 120 device px/frame, so the smoothing doesn't limit speed; it only eases **[M]**.
- **No scroll snapping** anywhere. Stops land at arbitrary positions **[M]**.
- **No horizontal page scroll.** The only horizontal motion is the DVD marquee **[O]**.

---

## 3. Timeline / Frame Analysis

Times are mm:ss.s from the start of the video.

| Time | What appears / changes | Motion / state details |
|---|---|---|
| 00:00.0–00:01.4 | OBS UI | Not the site. |
| 00:01.4–00:01.5 | Window switches to the browser; the site is at scrollY = 0 | Hard cut (window switch). |
| 00:01.5–00:04.2 | **Hero**, static: nav, eyebrow with blue dot, 2-line H1 with italic accent word, lead sentence, "DESIGNED ACROSS" label, 6 country pills, retro TV, italic caption with an arrow | Cursor moves over empty space; **nothing reacts** (no cursor follower, no parallax on mouse) **[O]**. |
| 00:04.2–00:04.3 | Cursor enters the **TV** | Cursor becomes a pointer. The TV screen **swaps from the dark scanline screen to a muted preview video**, and the scanlines stay on top. The play button and "ME IN A MINUTE" label stay **[O]**. |
| 00:04.4–00:06.3 | Cursor already left the TV (≈4.4 s) | The **preview keeps playing ~2 s after hover-out**. Brightness flickers slightly (CRT-like, or just the video content) **[O]**. |
| 00:06.3–00:06.5 | Preview fades out | ~100–150 ms fade back to the idle screen **[M]**. |
| 00:06.5–00:08.2 | Idle hero | — |
| 00:08.20–00:08.35 | **Reload**: content area blank, **nav already painted** | The nav is not part of the entrance animation **[M]**. |
| 00:08.35–00:08.75 | **Hero entrance** | All hero blocks fade in together (≤ 40 ms stagger) and rise ≈ 12 CSS px, reaching ~90% by 00:08.55 **[M]**. |
| 00:08.667 | **Font swap (FOUT)** | The headline box snaps from a wider fallback font to the web font (width 615 → 589 device px) **[M]**. Use `font-display: swap` plus preloading, or `optional`. |
| 00:09.7–00:10.2 | Scroll down begins | Content slides under the nav. **Text under the nav is blurred**, because the nav has a backdrop blur **[O]**. |
| 00:10.20–00:10.23 | **Nav hides** | Slides up out of view after ≈ 50–80 CSS px of downward scroll **[M/I]**. |
| 00:10.2–00:10.8 | Hero divider (hairline) passes; "SELECTED WORK" eyebrow, H2 with italic accent word, first **case-study row** (media left, text right) | Scroll decelerates smoothly. |
| 00:11.0–00:11.8 | Scroll back up to the top | **Nav slides back in** (00:11.23–00:11.47; the last 32 device px take ≈ 240 ms, decelerating) **[M]**. |
| 00:12.0–00:13.4 | Fast scroll down through rows 1→3 | **Text blocks fade up as they enter** (≈50% opacity at entry, 100% within ~100–150 ms). Nav hides at 00:12.4. |
| 00:13.5–00:14.3 | Small scroll up | Nav reveals (00:13.60–00:13.80), now with a **1px bottom border** (scrolled state) **[M]**. |
| 00:14.5–00:15.6 | Settled on case row 2 (text left, media right) | Nav hides at 00:14.57. |
| 00:15.77–00:15.97 | Hover on **"Watch Video" (outline)** | The background fills to near-black and the text turns cream, ≈ 200–250 ms. There is a mid-transition frame where the text and fill are the same gray **[M]**. |
| 00:16.23–00:16.47 | Hover on **"Read More" (solid dark)** | Near-black → **ink blue `#1E28AC`**, ≈ 250 ms. It reverses in ≈ 250 ms on leave (00:16.73–00:16.95) **[M]**. |
| 00:17.0–00:18.3 | Scroll to row 3 (RTL case) | Its phone mockup **crossfades from the EN/LTR layout to the AR/RTL layout**, and the label "EN · LTR" becomes "AR · RTL" over ≈ 350 ms (00:17.3–00:17.65). This fires when the card is mostly in view **[M/I]**. |
| 00:18.7–00:20.0 | Row 4; hover on the **"Read on Medium"** outline button | Same outline→dark fill hover **[O]**. |
| 00:20.0–00:21.0 | **Testimonial**: centered serif-italic pull quote (3 lines) with a blue accent phrase, then uppercase attribution; **a small black dot** far below | The dot scrolls with the page. |
| 00:21.2–00:21.4 | Nav reveals (scroll up) | Border visible. |
| 00:22.0–00:22.97 | Scroll down; the dot rises to **≈ 24% of the viewport height** and **pins** | Circle center stays constant at ≈ 205 device px from the viewport top **[M]**. |
| 00:22.97–00:24.23 | **Dot → full-screen dark circle** | Scroll-scrubbed. Radius grows from ~8 → ~1,200 device px; the bottom corners are covered last. The circle is **crisp**, with no blur **[M]**. |
| 00:23.77–00:24.30 | **"After work" title** (centered, sans plus a lavender italic word) fades from ≈ 10% to 100% while the circle finishes **[M]** | — |
| 00:24.3–00:24.8 | Full dark screen with the title; it then scrolls up normally | The pin releases **[O]**. |
| 00:24.8–00:26.1 | Fast scroll through **Content Creation** (big TV, DVD player, **DVD shelf**), **Writing** (desk of paper notes), **Leadership** header | — |
| 00:26.47–00:26.67 | Nav reveals over the dark section as a **light frosted bar** (it does **not** invert to dark) **[M]** | — |
| 00:27.5–00:28.5 | Settled on Content Creation | TV screen shows green phosphor text "CH 03 · INSERT A DISC". Player LCD reads "NO DISC". |
| 00:28.5–00:31.2 | Cursor over the DVD shelf | **Hovered case lifts ≈ 30 CSS px** (~180 ms). **The marquee pauses while hovered** **[M]**. |
| 00:31.0 onward | Cursor leaves | **Marquee resumes**, drifting left at ≈ 26 CSS px/s **[M]**. |
| 00:34.2 | **Click a DVD** | LCD: "NO DISC" → "INSERT" within ~0.1 s. |
| 00:34.3–00:34.8 | The selected case **rises out of the shelf** (≈ 100+ CSS px) | ease-out |
| 00:34.85–00:35.0 | **Case swings open** (3D hinge), revealing the **disc** | ~150–200 ms |
| 00:35.2–00:35.8 | **Disc flies to the player tray**, shrinking and rotating | ~600 ms |
| 00:35.9–00:36.3 | The empty case fades or closes and **returns to the shelf** with an **indigo selection ring** | — |
| 00:36.0–00:38.3 | LCD shows "LOADING" and an amber **progress bar** fills, then shows **"PLAYING"** with 4 green LEDs | ≈ 2.3 s fill |
| 00:38.5–00:39.25 | TV screen goes black (power-on), then a **YouTube embed** appears inside the screen and autoplays | — |
| 00:42.3–00:43.5 | Scroll to **Writing** | Dark desk; 9 paper notes, slightly rotated, with polaroids and paperclips. |
| 00:43.5–00:45.8 | Cursor becomes a **flashlight**, which casts a warm spotlight | **The hovered note straightens, brightens, rises above the others, gets a blue title underline and shows a "PUBLISHED · MEDIUM ↗" stamp** **[O]**. |
| 00:45.9–00:48.2 | Click, which **opens Medium in a new tab**; the user returns | Native behavior. |
| 00:49.0–00:50.7 | **Leadership & Mentorship**: 2-column intro with 3 big serif-italic stats | **Count-up** from 0 in ≈ 1.1 s with a strong ease-out (Δ per 100 ms: +19, +13, +13, +10, +9, +5, +5, +3…) **[M]**. The CTA button below fades in. Two review cards follow. |
| 00:50.5–00:51.5 | **Closing CTA**: blue illustration card | The **two hand illustrations slide toward each other** (scroll-linked). |
| 00:51.5–00:53.6 | Page end, idle | Display heading plus italic accent word, two large buttons, text social links, micro availability line. |

---

## 4. Page Architecture

### 4.1 Section order (top → bottom)

| # | Section | Theme | Alignment | Height (approx., CSS) | Role |
|---|---|---|---|---|---|
| 0 | Fixed nav (headroom) | light frosted | full-bleed, space-between | ≈ 85 | Wayfinding + résumé |
| 1 | Hero | light | **centered** | exactly **100vh** (divider sits at the fold) **[M]** | Identity + proof + signature object |
| 2 | Selected Work | light | **left** (container) | 4 rows × ~540 + header | Primary evidence |
| 3 | Testimonial pull quote | light | **centered** | ~1 viewport | Social proof, pacing pause |
| 4 | Theme transition (pinned) | light→dark | centered | runway ≈ 1.2–1.5 vh **[I]** | Chapter break |
| 5 | "After work" title | dark | centered | ~1 viewport | Chapter title |
| 6 | Content creation (TV + DVD) | dark | left header, centered object | ~1.6 viewports | Video library |
| 7 | Writing (desk) | dark | left header, full-container desk | ~1.5 viewports | Articles index |
| 8 | Leadership & mentorship | dark | 2-col | ~1.3 viewports | Stats + reviews |
| 9 | Closing CTA + footer | dark | **centered** | ~1.2 viewports | Conversion |

**Why [I]:** centered sections are "statements", i.e. identity, quote, chapter title and closing ask. Left-aligned sections are "reading and browsing" content. The switch in alignment sets the rhythm: statement → evidence → pause → chapter → evidence → ask.

### 4.2 Container system [M]

| Layer | Width at 1522 viewport | Likely CSS |
|---|---|---|
| Nav | full-bleed, inline padding **≈ 60** | `padding-inline: clamp(20px, 4vw, 64px)` |
| Divider / outer container | **1280** (x 120→1400) | `max-width: 1280px; margin-inline: auto` |
| Content container | **≈ 1160** (x 179→1341) | 1280 minus 2×60 padding |
| Hero column | ≈ 720 (lead sentence width) | `max-width: 46rem`, centered |
| Pull quote | ≈ 730 | `max-width: 46rem`, centered |
| Case row | 550 text + **61 gap** + 551 media | `grid-template-columns: 1fr 1fr; column-gap: 64px` |

### 4.3 Layering / z-index [O/I]

| z | Element |
|---|---|
| 100 | Custom cursor (flashlight) in the Writing section |
| 50 | Fixed nav: translucent bg + `backdrop-filter: blur()`; hides via translateY |
| 40 | Theme-transition dark layer (pinned) |
| 30 | Hovered paper note / lifted DVD case / flying disc |
| 10 | Section content |
| 0 | Page background (paper / ink) |

Overlapping elements: polaroids overlap the paper notes (clipped with paperclips), the disc flies over the TV and player, the hands illustration bleeds into the card edges. Nothing overlaps across sections except the nav and the transition layer.

---

## 5. UI Component Analysis (inventory)

Specifications for each component are in section 17. This table is the inventory with the key observed values. CSS px.

| Component | Where | Size | Key observed styling |
|---|---|---|---|
| **Nav bar** | fixed top | h ≈ 85, full-bleed | bg ≈ page color at ~82–85% alpha + backdrop blur (≈ 10–14 px). 1px bottom border `#E2DBD6` only when scrolled. Over dark sections it renders as a light frosted bar (`≈#CFCCC7` effective). |
| Logo wordmark | nav left, x = 60 | ~19 px text | Grotesk 600, near-black. **The period is ink-blue** (accent dot). |
| Nav links | nav right | 16 px text, gap ≈ 31 | `#4A4540`. Hover not observed. |
| Résumé pill | nav far right | 82 × 37 | 1.5 px near-black border, transparent fill, radius full, 16 px text. |
| Eyebrow (hero) | hero top | 14 px | Uppercase, tracking ≈ 0.2 em, `#6C6762`, preceded by a **6–8 px ink-blue dot** (`#2230D1`). |
| Eyebrow (section) | section top-left | 14 px | Same, no dot. `#6C6762` (light) / `#8B8985` (dark). |
| H1 | hero | ≈ 66 px, 2 lines | See §6. The last word is serif italic in ink blue. |
| Lead sentence | hero | ≈ 18–19 px | `#413C37`, with domain words in medium weight `#191613`. |
| "Designed across" label + country pills | hero | pills 37 h, gap ≈ 9 | Pill bg `#FEF9F6` (lighter than the page) with a subtle border/shadow. Each has a **2-letter code prefix** in small tracked caps plus a 16 px name. |
| **Retro TV (hero)** | hero center | ≈ 302 × 224 | Beige CSS body (`#C6BEB1`, lower shade `#A69E90`), radius ≈ 18, large soft drop shadow. Scanline screen, speaker grille, 2 knobs, model label. Hover plays a muted preview. |
| TV caption | under TV | ≈ 20 px | Serif italic `#67635F` with a "→". |
| Hero divider | bottom of hero | 1280 × 1 | `#E2DBD6`-ish hairline. |
| **Case-study row** ×4 | Selected Work | 1160 wide; media 551 × 412 (**4:3**) | Alternating sides; vertically centered text; row gap ≈ 124. |
| Client badge | row text top | ≈ 53 × 31 | The client's own logo lockup, radius ≈ 5–6. |
| Tag chip | row | h 30, gap ≈ 12 | bg `#FCF9F5`, 1px light border, radius full, 15 px `#4C4846`. |
| Case title (H3) | row | ≈ 35 px, 2 lines | Grotesk 600. Some rows use a **sans-italic** phrase (the grotesk's true italic) instead of the serif italic. |
| Case body | row | 18 px / 28 px | `#433E39`, max ≈ 3 lines (≈ 45–55 ch). |
| Metric pair | row | numeral ≈ 45 px | Serif italic `#19140F`; label 15 px `#716B67`; 2 columns ≈ 300 apart. |
| Primary button | row | 127 × 42 | `#1A1714` fill, cream text, radius full, "↗" glyph. Hover → `#1E28AC`. |
| Secondary button | row | 144 × 42 | Transparent, 1.5 px near-black border, "▶" glyph. Hover → dark fill + cream text. |
| Media card | row | 551 × 412 | Pastel bg: periwinkle `#C6D7FD`, sage `#E5EADF`, blush `#EFDCD6`, sand `#EAE3D3`. Radius ≈ 20. **No border, no shadow.** Holds a composed mockup scene (device + 3D props). |
| Media corner label | RTL card | ≈ 14 px | "EN · LTR" style, uppercase tracked, gray, top-right inside the card. |
| **Pull quote** | testimonial | ≈ 52 px, 3 lines | Serif italic `#1A1510`, accent phrase in ink blue (synthetic bold). Attribution 15 px uppercase tracked `#6C6763`. |
| Transition dot | below quote | ≈ 14 px ⌀ | `#14130F`. |
| Chapter title | dark | ≈ 72 px | `#F6F4F0` sans + lavender `#B7B5F0` serif italic. |
| Big TV + DVD player | content creation | TV ≈ 520 × 344; player ≈ 408 × 53 | Player body `#1C1C1E`, LCD amber `#DFA941`/`#C3AA7A`, LEDs `#8BEEA6`, eject key. TV screen text phosphor green `#75A37F`, uppercase mono-ish, tracked. |
| Handwritten hint + arrow | right of player | serif italic ≈ 24 px, white | Hand-drawn curved arrow pointing at the shelf. |
| DVD shelf (marquee) | below player | case ≈ 150 × 216 (≈ 0.7 ratio), gap ≈ 25 | Edge fade masks. Each case has a "DVD" badge (`#4548CF`). The selected case gets an indigo ring. |
| YouTube CTA pill | under shelf | h ≈ 36 | Brand red, white text, YouTube icon. |
| **Desk + paper notes** | writing | note ≈ 205 × 265 | Dark desk with a vignette. Notes use a typewriter font, rotated ±2–4°, have red strike-throughs and red squiggle underlines, polaroids with paperclips, and a "– 1 –" page number. |
| Flashlight cursor | writing | ≈ 64 px icon | Replaces the cursor. A warm radial spotlight follows it. |
| "Read all on Medium" pill | under desk | h ≈ 44 | White pill, black text, Medium logo, **soft white glow**. |
| Stats trio | leadership | numeral ≈ 80 px | Serif italic cream, star in `#EFBC18`, 1 px light vertical dividers, label 15 px `#A5A29E`. |
| Partner logos row | leadership | ≈ 22 px | White wordmarks. |
| Brand CTA button | leadership | h ≈ 44 | Brand red `#D63434` with a **red glow shadow**. |
| Rating line | leadership | — | Serif italic "4.9", 5 small yellow stars, gray meta text. |
| Review card ×2 | leadership | 573 × 190 | bg `#1B1A16`, 1px border `#32312D`, radius ≈ 16, padding ≈ 24. "★ 5/5" in yellow, serif-italic quote, gray attribution. |
| Illustration card | closing | ≈ 680 wide | Flat blue `#282DD1` bg with white line art, radius ≈ 20. |
| Display CTA heading | closing | ≈ 72 px | Cream sans + lavender italic word. |
| Large buttons | closing | h ≈ 60; "Connect" ≈ 138 wide | Primary: cream fill `#F2EFE6`, dark text. Secondary: 1px `#6D6C68` border, cream text. |
| Social text links | closing | ≈ 19 px, gap ≈ 26 | `#A09F9A`, no icons. |
| Availability line | footer | ≈ 14 px | `#8A8A86`, "·"-separated, slight tracking. |

**Not present in the reference [O]:** modals, dropdowns, tooltips, a hamburger menu (at this width), a carousel with arrows, image galleries, a custom cursor outside the Writing section, a scroll progress bar, back-to-top, preloader.

---

## 6. Typography Analysis

### 6.1 Families (closest practical matches)

| Role | Observed traits | Closest match (free) | Alternatives |
|---|---|---|---|
| **Display / headings (sans)** | Neo-grotesk with a large x-height (x/cap ≈ 0.72). **Single-story "g" with a flat, squared tail**, straight-tailed "y", double-story "a", horizontal "e" bar, tight apertures, weight ≈ 600. It has a **true italic**, used in one case title. | **Instrument Sans** 600 **[I]** | Schibsted Grotesk, Hanken Grotesk, General Sans |
| **Accent (serif italic)** | High-contrast, slightly condensed italic with ball terminals on figures (9, 3). Calligraphic "v" and "f", bracketed serifs. Accent phrases look **synthetically bolded** (smeared stems), which implies the font ships one weight. | **Instrument Serif Italic** **[I]** | Newsreader Italic (true weights), Fraunces Italic, Playfair Display Italic |
| **Body / UI** | Neutral humanist-grotesk, screen-optimized: Inter-like "1", "g", "y". | **Inter** 400/500 **[I]** | Geist, Figtree |
| **Typewriter (notes)** | Slab monospace, bold titles, regular body | Courier Prime **[I]** | Special Elite, IBM Plex Mono |
| **LCD / screen labels** | Uppercase, tracked ≈ 0.2 em, monospaced feel | Space Mono / JetBrains Mono **[I]** | VT323 for a more retro look |

**Traits to keep even if the fonts change:** the sans must be **heavy (600), tight and large-x-height**. The serif must be an **italic with real contrast**, so the accent word reads as a different voice rather than just a style change.

### 6.2 Measured scale (CSS px at a 1522 px viewport)

| Token | Size | Line-height | Tracking | Weight | Color (light / dark) | Measured from |
|---|---|---|---|---|---|---|
| Display (chapter / CTA) | **≈ 72** (cap 52) | ≈ 1.05–1.08 | ≈ −0.03 em | 600 | — / `#F6F4F0` | "After work", closing heading |
| H1 (hero) | **≈ 66** (cap 48, x 34.5) | **1.05** (pitch 71) | ≈ −0.025 em | 600 | `#191613` | hero |
| Stat XL | **≈ 80** | 1.0 | 0 | 400 italic serif | `#F6F4F0` | mentorship |
| Quote | **≈ 52** | ≈ 1.18 (pitch 62) | 0 | 400 italic serif (accent faux-bold) | `#1A1510` | testimonial |
| Stat L | **≈ 45** (cap 32) | 1.0 | 0 | 400 italic serif | `#19140F` | case metrics |
| H2 (section) | **≈ 34** (cap 24) | ≈ 1.15 | ≈ −0.02 em | 600 | `#191613` / `#F6F4F0` | "Selected work" H2, "Content creation" H2 |
| H3 (case title) | **≈ 35** | ≈ 1.12 (pitch 39) | ≈ −0.02 em | 600 | `#19140F` | case rows |
| Lede italic (serif) | ≈ 24 | 1.5 | 0 | 400 italic | — / `#A5A29E` | dark section sub-lines |
| Body-L (dark sections) | ≈ 24 | ≈ 1.5 (pitch 36) | 0 | 400 (+ 600 highlights in `#F6F4F0`) | — / `#A5A29E` | leadership |
| Body (case) | **≈ 18–19** | **≈ 1.55** (pitch 28) | 0 | 400 | `#433E39` | case rows |
| Lead (hero) | ≈ 18–19 | ≈ 1.5 | 0 | 400 + 500 emphasis | `#413C37` / emphasis `#191613` | hero |
| Nav link | ≈ 16 | 1 | 0 | 400 | `#4A4540` | nav |
| Button | ≈ 15–16 | 1 | 0 | 500 | on-fill | buttons |
| Tag | ≈ 15 | 1 | 0 | 400 | `#4C4846` | chips |
| Meta / stat label | ≈ 15 | 1.4 | 0 | 400 | `#716B67` / `#A5A29E` | metric labels |
| Eyebrow | **≈ 14** (cap 10.4) | 1 | **≈ 0.18–0.2 em** | 500 | `#6C6762` / `#8B8985` | section labels |
| Micro (footer) | ≈ 14 | 1.4 | ≈ 0.02 em | 400 | — / `#8A8A86` | availability line |

### 6.3 Typographic rules observed

1. **One accent per heading.** Only one word or short phrase switches to serif italic, and it is usually the **last word before the period**. The period stays in the sans at primary color, and on dark it stays cream while the word is lavender.
2. **The accent always carries the meaning** (the verb/object that sums up the value proposition).
3. Numbers that matter (metrics, ratings, counts) are **always serif italic**, never sans. That makes the evidence feel "signed", not "dashboard".
4. Uppercase appears **only** in eyebrows, attributions, screen/LCD labels and tiny meta. Never in headings.
5. The type scale has **big jumps and few steps**: roughly 14 → 18 → 34 → 52/66/72/80. Sizes between 20 and 30 px barely appear.
6. The hierarchy is **size and weight driven**. Color is rarely used for hierarchy apart from the accent and the muted tiers.

### 6.4 Responsive type [A]

The reference fit its hero into a 698 px-tall viewport, so its scale is tuned for laptops. Recommended fluid clamps are in §16.1.

---

## 7. Color System

### 7.1 Light theme ("paper") [M]

| Token | HEX | Evidence / use |
|---|---|---|
| `paper` (bg) | **`#F7F2ED`** | page background (warm off-white, not white) |
| `paper-raised` | `#FCF9F5` / `#FEF9F6` | tag and country-pill fills (reads as white at ~50% alpha) |
| `ink` (text-primary) | **`#191613`** | headings, logo, bold words (warm near-black, not `#000`) |
| `ink-body` | `#423D38` | paragraphs |
| `ink-secondary` | `#6C6762` | eyebrows, attribution |
| `ink-muted` | `#716B67` | metric labels; captions `#67635F` |
| `hairline` | **`#E2DBD6`** | nav border, dividers, tag borders (approximate) |
| `accent` (ink blue) | **`#1E28AC`** | primary-button hover fill; accent text renders `#1A27A6` |
| `accent-bright` | `#2230D1` | small dots (eyebrow dot, logo period) |
| `btn-dark` | `#1A1714` | primary button fill, secondary-button hover fill |
| pastel `periwinkle` | `#C6D7FD` | media card |
| pastel `sage` | `#E5EADF` | media card |
| pastel `blush` | `#EFDCD6` | media card |
| pastel `sand` | `#EAE3D3` | media card |

### 7.2 Dark theme ("ink / after hours") [M]

| Token | HEX | Use |
|---|---|---|
| `night` (bg) | **`#14130F`** | dark sections (warm near-black) |
| `night-raised` | `#1B1A16` | review cards |
| `night-border` | `#32312D` | card borders |
| `cream` (text-primary) | **`#F6F4F0`** | headings |
| `cream-secondary` | `#A5A29E` | body, ledes |
| `cream-muted` | `#8B8985` / `#8A8A86` | eyebrows, footer micro |
| `lavender` (accent on dark) | **`#B7B5F0`** | italic accent words |
| `divider-on-dark` | ≈ `rgba(246,244,240,0.75)` | stat dividers (1 px; value uncertain) |
| `btn-cream` | `#F2EFE6` | primary button on dark |
| `outline-on-dark` | `#6D6C68` | secondary-button border on dark |
| `illustration-blue` | `#282DD1` | closing illustration card |
| `star` | `#EFBC18` | ratings |

### 7.3 Object palette (signature objects only)

TV beige `#C6BEB1`, shade `#A69E90`, knobs `#CAC2B6`. Screen near-black `#1E1C16` with lighter scanlines. Phosphor green `#75A37F`. Player `#1C1C1E`. LCD amber `#DFA941`. LED green `#8BEEA6`. DVD badge `#4548CF`. Desk `#14130F` with a warm spotlight. Paper `#F1EEE6` lit and ≈ `#84837F` unlit.

### 7.4 Color character

- **No pure black or pure white** as surfaces. Everything is **warm-shifted** (R > G > B by 5–10 steps). Pure white appears only on the Medium pill and the illustration line art.
- **One brand accent** (ink blue) with a **tint for dark mode** (lavender), keeping hue and changing lightness. Brand reds and yellows only show up where a third-party brand demands them.
- **Pastels are used only inside media cards**, never on text or chrome.
- **Transparency and blur** only on the nav (frosted glass). There is no general glassmorphism.
- **Gradients** only as functional light: the spotlight, the scanline screen, edge-fade masks, knob shading. No decorative gradient backgrounds.
- **Grain/noise:** faint banding appears on both backgrounds, but it is most likely video compression **[uncertain]**.

---

## 8. Spacing System [M → rounded to a scale]

| Observed gap | CSS px | Rounded token |
|---|---|---|
| Pill-to-pill (country pills) | 9 | 8 |
| Tag-to-tag, button-to-button | 12 | 12 |
| Badge → tags | 17 | 16 |
| Tags → title, title → body | 20–22 | 20/24 |
| Hero: H1 → lead, label → pills | 18–30 | 24 |
| Body → metrics, metric label → buttons | 30–34 | 32 |
| Eyebrow → section H2 | 61 | 64 |
| Column gap (case rows) | 61 | 64 |
| Section H2 → first row | 74 | 72–80 |
| Row → row (case studies) | 124 | 128 |
| Section top padding (divider → eyebrow) | 154 | 160 |
| Nav inline padding / page gutter | 60 | clamp(20, 4vw, 64) |

**Principle:** spacing is **generous between groups and tight within them**. Metric pairs and tags cluster; rows breathe (~128). Sections breathe more (~160).

---

## 9. Grid System

- **12-column mental model, 2-column reality.** Case rows are a strict **1:1 two-column grid** (550 | 64 | 550) with `align-items: center`. The **media side alternates** (row 1 media-left, row 2 media-right, …) **[M]**.
- Leadership section: **5:7-ish** split. Left text column ≈ 430, right stats area ≈ 700 made of **3 equal columns with 1 px dividers**, **bottom-aligned** to the intro text **[O]**.
- Review cards: **2 equal columns**, gap ≈ 18–20.
- Hero, testimonial, chapter title and CTA: **single centered column** with a max width of ≈ 720–740 (≈ 46 rem).
- Writing desk: a **free-form scatter** inside the container (≈ 4 columns × 3 rows of notes with random offsets and rotations). It deliberately breaks the grid.
- DVD shelf: a **single horizontal row** clipped by the container, with edge fades.
- **No bento grid** anywhere in the reference.

---

## 10. Animation System

All values are CSS/time. "Scrub" means the animation is tied to scroll progress.

| # | Animation | Trigger | Initial → final | Duration | Delay / stagger | Easing | Loops | Conf. |
|---|---|---|---|---|---|---|---|---|
| A1 | Hero entrance | page load (after fonts/DOM) | opacity 0 → 1, y +12 → 0 | ≈ 400 ms (90% at ~200 ms) | ≤ 40 ms stagger (H1 first, lead/label last) | strong ease-out ≈ `cubic-bezier(0.16,1,0.3,1)` | no | M |
| A2 | Nav hide | scroll down > ~60 px | y 0 → −100% | ≈ 250–300 ms | — | ease-in-out | — | I |
| A3 | Nav reveal | any scroll up | y −100% → 0 | ≈ 300–350 ms (last 32 px ≈ 240 ms) | — | ease-out (decelerating) | — | M/I |
| A4 | Nav scrolled state | scrollY > ~40 px | border transparent → `#E2DBD6` | ≈ 200 ms | — | ease | — | M/A |
| A5 | Content reveal | element enters viewport (~10–15% visible) | opacity 0 → 1, y +16–24 → 0 | ≈ 500–600 ms | children 60–80 ms | ease-out | **once** | O/I |
| A6 | Primary button hover | pointer enter/leave | bg `#1A1714` ↔ `#1E28AC` | ≈ 250 ms | — | ease | — | M |
| A7 | Secondary button hover | pointer enter/leave | bg transparent ↔ `#1A1714`; text ink ↔ cream | ≈ 200–250 ms | — | ease | — | M |
| A8 | TV hover preview | pointer enter | screen idle → muted video (fade ≤ 100 ms); plays ≈ 2 s; fades out 100–150 ms | ~2.2 s | — | linear fades | no | M/O |
| A9 | RTL demo crossfade | card ≥ ~50% visible | EN layer 1 → 0, AR layer 0 → 1, label swap | ≈ 350 ms | — | ease-in-out | unknown (may alternate) | M/I |
| A10 | Chapter circle | **scrub**, pinned | dot ⌀ 14 → covers viewport (clip radius ~8 → ~960 CSS) | ≈ 1.2–1.5 vh of scroll | — | linear in scroll (smoothed by Lenis) | — | M/I |
| A11 | Chapter title | scrub, last ~30% of A10 | opacity ≈ 0.1 → 1 | — | — | linear | — | M |
| A12 | DVD marquee | always | translateX → −50% (seamless) | ≈ 26 px/s | — | linear | **infinite, pauses on hover** | M |
| A13 | DVD hover lift | pointer enter | y 0 → −30 | ≈ 180 ms | — | ease-out | — | M/O |
| A14 | DVD → player | click | case rises (500 ms) → opens (rotateY ~−100°, 180 ms) → disc flies to tray (scale 1 → ~0.3, rotate ~180°+, 600 ms) → case returns (300 ms) | ≈ 2 s | LCD states at +0.1 s / +1.8 s / +4 s | ease-out / ease-in-out | — | O/I |
| A15 | Player LCD progress | after insert | bar 0 → 100% | ≈ 2.3 s | — | linear-ish | — | O |
| A16 | TV power-on | LCD "PLAYING" | scanline gray → black → iframe | ≈ 0.7 s | — | step/fade | — | O |
| A17 | Flashlight spotlight | pointer move (desk) | radial light at cursor | continuous | — | none/slight lerp | — | O |
| A18 | Paper note hover | pointer enter | rotate ±3° → 0°, y 0 → −6, scale 1 → ~1.05, brightness dim → full, title underline 0 → 100%, stamp opacity 0 → 1 | ≈ 200–300 ms | — | ease-out | — | O/I |
| A19 | Stat count-up | enters viewport | 0 → target (integers, suffix static) | **≈ 1.1 s** | columns start together | strong ease-out (≈ easeOutCubic/Expo) | once | M |
| A20 | Hands converge | **scrub** as the card enters | each hand x ±40–60 → 0 | card-enter → fully visible | — | linear in scroll | — | O/I |
| A21 | Smooth scroll | wheel/trackpad | — | 0.6–1.2 s decay | — | exponential (lerp ≈ 0.1) | — | M |

**Motion character:** small distances (≤ 24 px) for UI, big motion only for **objects** (disc, circle) and **only when the user caused it** (scroll or click). No looping ambient animation except the marquee.

---

## 11. Scroll Interaction System

### 11.1 Smooth scrolling
- **Initial:** native wheel input → **progression:** position lerps toward the target (≈ 0.9 decay/frame) → **final:** settles 0.6–1.2 s after the last input. No snapping, no section locks. Touch behavior unknown **[A: keep native on touch]**.

### 11.2 Headroom navigation
- **Initial (top of page):** nav visible, transparent-looking, no border.
- **Scroll down ~60 px:** nav slides fully up (hidden).
- **Any scroll up:** nav slides back in (≈ 300 ms, decelerating) with a translucent bg, backdrop blur and a 1 px bottom border.
- **Over dark sections:** the same light frosted bar. It does not re-theme. The high contrast doubles as a "you can always get back" affordance **[I]**.

### 11.3 Content reveals
- **Initial:** block below the fold, opacity 0, y +16–24.
- **~10–15% in view:** fade/rise starts; runs ~500–600 ms independent of scroll speed. **One-shot.** It does not reverse on scroll-up.
- Applies to case text blocks, media cards, CTA buttons (seen mid-fade in the leadership section) and section headers **[O/I]**.

### 11.4 Chapter transition (dot → circle) — the signature scroll moment
```text
Initial   → small ink dot (~14 px) sits ~200 px below the quote attribution; scrolls normally.
Pin       → when the dot reaches ≈ 24% of viewport height, its container pins (sticky).
0–25%     → circle radius grows fast: covers the center column; quote is already gone.
25–60%    → circle exceeds viewport width; only the bottom corners remain paper-colored.
60–100%   → corners close; chapter title fades 0.1 → 1 over the last ~30%.
Release   → dark title screen scrolls away normally; next dark section follows.
```
- The edge stays **crisp** throughout (no blur, no feather) **[M]**. Implement with `clip-path: circle()` on a full-viewport dark layer, not `transform: scale()` on a tiny div, which can rasterize blurry **[I]**.

### 11.5 Scroll-linked illustration (hands)
- **Initial:** card enters from the bottom; the two hands are apart.
- **Progression:** the hands translate horizontally toward each other in proportion to scroll.
- **Final:** fingertips almost touch when the card is fully in view **[O]**.

### 11.6 What does NOT happen on scroll [O]
No parallax on media, no scale-on-scroll of cards, no sticky section headers, no horizontal scroll sections, no progress indicator, no image masking reveals, and no blur transitions except the nav backdrop.

---

## 12. Microinteractions

| Interaction | Observed behavior | Conf. |
|---|---|---|
| Primary button hover | Color swap to ink blue, ~250 ms, no lift/scale/shadow | M |
| Secondary button hover | Fill swap to ink, text to cream, ~200–250 ms | M |
| Cursor | Native arrow/pointer everywhere **except** the Writing desk (flashlight) | O |
| TV hover | Muted preview in the screen; scanlines persist; the play affordance stays | O |
| DVD hover | Case lifts ~30 px; marquee pauses | M |
| DVD click | Full insert choreography + LCD state machine + iframe autoplay | O |
| Selected DVD | Indigo 2 px ring around the case | O |
| Paper hover | Straighten + lift + brighten + blue title underline + "published" stamp | O |
| Stats | Count-up once | M |
| Links out | Standard `target="_blank"` for external content; internal case routes | O |
| Arrows in labels | "↗" = leaves page / deep link; "→" = more (caption); "▶" = video | O |
| **Not observed** | Nav link hover, tag hover, pill hover, card-image hover, focus rings, active/pressed states, menu open/close | — |

---

## 13. Image / Video Treatment

| Medium | Treatment |
|---|---|
| Case media | **Contained** inside 4:3 rounded cards (r ≈ 20) on a **pastel field**. Content is a **composed scene** (device mockup + props/3D emoji), not a raw screenshot. `object-fit: cover`, with composition centered or bleeding off an edge. No border, no shadow, no hover zoom observed. |
| Device mockups | Phones and a browser window are cropped by the card edge on purpose (bleed), which implies scale and depth. |
| Hero video | Muted **preview on hover** inside the TV screen (under a scanline overlay). The full video presumably opens on click (not observed). |
| Video library | **YouTube iframe injected into the TV screen** only after the user's "insert" action, i.e. **lazy by interaction**. No preload for the unselected videos (the covers are images). |
| Desk photos | Polaroid frames (white border ~6 px, slight rotation, soft shadow), fixed with paperclips over the notes. |
| Illustration | Flat two-color line art (white on ink-blue), full-bleed inside a rounded card. |
| Image reveal | Same fade-up as text, with no mask or clip reveal **[O]**. |

---

## 14. UX Analysis

### 14.1 Observable behavior
- First viewport: role eyebrow → big claim → one-line proof (years + domains) → geographic proof (pills) → a **play affordance** (TV). **All above the fold** at 698 px height.
- Work appears immediately after the hero with no "about" block in between.
- Each case follows **problem → action → numbers → next step**.
- A single testimonial sits between the work and the personal chapter.
- The personal chapter uses **interactive objects** as navigation (pick a disc, light a note).
- The closing section repeats the thesis in one line and gives exactly **two** actions.

### 14.2 Interpretation
- **Attention path:** accent word (color + style contrast) → H1 → the TV (the only object with volume and shadow) → pills. The eye goes from **claim to proof to invitation**.
- **Progressive disclosure:** the hero promises; the case rows prove with numbers; the quote validates with a third party; the dark chapter humanizes; the CTA converts. Every section answers the question the previous one raised.
- **Scroll as storytelling:** the circle transition is a *chapter break*. It tells the visitor "work is over, this is me after hours" without writing that sentence.
- **Density modulation:** dense (case rows) → sparse (quote) → empty (dot) → sparse (chapter title) → dense and playful (objects) → dense (stats/reviews) → sparse (CTA). The sparse moments are rests, and they stop the page from feeling long.
- **Whitespace:** ~128–160 px between blocks makes each row read as its own "page", so scanning stays easy despite rich content.
- **Overload prevention:** one accent color, one font pair, pastels confined to media, hovers without movement, objects that only animate after a user action.
- **Navigation:** minimal (Work / Contact / Résumé). Headroom keeps it out of the way while reading but instantly available on the intent signal (scroll up).
- **CTA emphasis:** each case has one solid (primary) and one outline (secondary) action. The page end has one light-filled (primary) and one outline action. The hierarchy never has two primaries side by side.

---

## 15. Responsive Strategy

**Only one viewport (≈ 1522 × 698 CSS) is in the video. Everything below is [A].**

| Breakpoint | Container | Type | Layout changes | Motion changes |
|---|---|---|---|---|
| **≥ 1600** (large desktop, 27″) | 1280 max; gutters grow | Clamp maxima: H1 ≤ 76, display ≤ 84 | Same as laptop; the hero gains air; no widening past 1280 | Same |
| **1440–1599** (15/16″ laptops at 100–125%) | 1280 | H1 ≈ 68–72 | Same | Same |
| **1280–1439** (14″ laptops, e.g. 1366, 1440×900) | 1160–1280 | H1 ≈ 60–66 | Hero must still fit 100svh: reduce the TV/object to ~260 wide if `max-height: 760px` | Same |
| **1024–1279** (small laptops / tablet landscape) | fluid, gutter 40 | H1 ≈ 52–58, H2 ≈ 30 | Case rows stay 2-col with a 40 gap; stats 3-col | Same |
| **768–1023** (tablet portrait) | fluid, gutter 32 | H1 ≈ 46–50 | **Case rows stack: media first, then text**; stats 3-col condensed; reviews 1-col; desk becomes a 2-col scatter | Pin runway shortened (~100vh) |
| **< 768** (mobile) | fluid, gutter 20 | H1 ≈ 38–42, display ≈ 44, stat L ≈ 36 | Nav: logo + Résumé pill (+ optional "Menu"); pills wrap in 2–3 rows; 1-col everything; buttons full-width in pairs; DVD/marquee stays horizontal (touch-scrollable); desk becomes a vertical stack of notes with ±1.5° rotation | **Circle transition:** keep but shorten, or replace with a 600 ms color crossfade. Hover effects become tap (first tap = preview/"lit", second = open). **Lenis off on touch** (native momentum). |

Other rules [A]:
- Never allow horizontal page overflow: marquee and desk are clipped by `overflow-x: clip` on their section.
- Use `svh`/`dvh` units for pinned or hero heights on mobile.
- Keep touch targets ≥ 44 px (tags are 30 px tall, so make them non-interactive or increase the padding on mobile).

---

## 16. Design Tokens

### 16.1 CSS custom properties (drop-in)

```css
:root {
  /* ---------- Color: light ("paper") ---------- */
  --color-bg: #F7F2ED;
  --color-surface: #FCF9F5;            /* chips, pills */
  --color-surface-secondary: #EFE9E2;  /* [A] quiet panels */
  --color-text-primary: #191613;
  --color-text-body: #423D38;
  --color-text-secondary: #6C6762;
  --color-text-muted: #736D68;         /* observed labels #716B67; 4.59:1 on paper (AA) */
  --color-border: #E2DBD6;
  --color-border-strong: #25231D;      /* outline buttons */
  --color-accent: #1E28AC;             /* ink blue */
  --color-accent-hover: #2230D1;       /* brighter blue (dots/hover-on-accent) */
  --color-accent-text: #1A27A6;
  --color-btn-dark: #1A1714;
  --color-on-dark-btn: #F7F2ED;

  /* ---------- Color: dark ("night") ---------- */
  --night-bg: #14130F;
  --night-surface: #1B1A16;
  --night-border: #32312D;
  --night-text-primary: #F6F4F0;
  --night-text-secondary: #A5A29E;
  --night-text-muted: #8B8985;
  --night-accent: #B7B5F0;             /* lavender tint of accent */
  --night-btn-light: #F2EFE6;
  --night-outline: #6D6C68;

  /* ---------- Typography ---------- */
  --font-sans-display: "Instrument Sans", "Inter", system-ui, sans-serif;
  --font-serif-accent: "Instrument Serif", "Newsreader", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Space Mono", ui-monospace, monospace;

  --text-display: clamp(2.75rem, 3.6vw + 1rem, 5rem);      /* ≈72 @1522 */
  --text-h1:      clamp(2.4rem, 3.4vw + 0.9rem, 4.5rem);    /* ≈66 @1522 */
  --text-stat-xl: clamp(3rem, 4.2vw + 1rem, 5.25rem);      /* ≈80 */
  --text-quote:   clamp(1.9rem, 2.6vw + 0.8rem, 3.5rem);   /* ≈52 */
  --text-stat:    clamp(2.1rem, 2.1vw + 0.8rem, 3rem);     /* ≈45 */
  --text-h2:      clamp(1.75rem, 1.3vw + 1rem, 2.4rem);    /* ≈34 */
  --text-h3:      clamp(1.6rem, 1.4vw + 0.9rem, 2.4rem);   /* ≈35 */
  --text-lede:    clamp(1.2rem, 0.6vw + 0.95rem, 1.5rem);  /* ≈24 serif italic */
  --text-body:    clamp(1rem, 0.25vw + 0.9rem, 1.1875rem); /* ≈18–19 */
  --text-small:   0.9375rem;  /* 15 */
  --text-caption: 0.875rem;   /* 14 */
  --text-nav:     1rem;       /* 16 */
  --text-button:  0.9375rem;  /* 15 */
  --tracking-tight: -0.025em;
  --tracking-eyebrow: 0.18em;

  /* ---------- Spacing ---------- */
  --space-xs: 0.5rem;   /* 8  */
  --space-sm: 0.75rem;  /* 12 */
  --space-md: 1.5rem;   /* 24 */
  --space-lg: 2rem;     /* 32 */
  --space-xl: 4rem;     /* 64 */
  --space-2xl: 8rem;    /* 128 */
  --space-3xl: 10rem;   /* 160 */
  --gutter: clamp(1.25rem, 4vw, 4rem);
  --container: 80rem;   /* 1280 */

  /* ---------- Radius ---------- */
  --radius-small: 6px;    /* logo badges */
  --radius-medium: 16px;  /* review cards */
  --radius-large: 20px;   /* media cards, TV/objects */
  --radius-pill: 9999px;

  /* ---------- Motion ---------- */
  --motion-fast: 180ms;     /* hover lifts */
  --motion-normal: 250ms;   /* color hovers */
  --motion-slow: 550ms;     /* reveals */
  --motion-entrance: 400ms; /* hero load */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);  /* expo-out feel */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

### 16.2 Tailwind `theme.extend` equivalent

```js
// tailwind.config.js (extend)
colors: {
  paper: { DEFAULT: '#F7F2ED', raised: '#FCF9F5' },
  ink: { DEFAULT: '#191613', body: '#423D38', secondary: '#6C6762', muted: '#736D68', btn: '#1A1714' },
  hairline: '#E2DBD6',
  accent: { DEFAULT: '#1E28AC', bright: '#2230D1', text: '#1A27A6', night: '#B7B5F0' },
  night: { DEFAULT: '#14130F', raised: '#1B1A16', border: '#32312D',
           text: '#F6F4F0', secondary: '#A5A29E', muted: '#8B8985', btn: '#F2EFE6', outline: '#6D6C68' },
},
fontFamily: {
  display: ['"Instrument Sans"', 'Inter', 'sans-serif'],
  accent: ['"Instrument Serif"', 'Newsreader', 'Georgia', 'serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
},
borderRadius: { badge: '6px', card: '20px', panel: '16px' },
transitionTimingFunction: { emphasized: 'cubic-bezier(0.16,1,0.3,1)' },
maxWidth: { container: '80rem', prose: '46rem' },
```

---

## 17. Component Specifications

Values are for ≥ 1280 px. Mobile deltas are in the "Responsive" line.

### 17.1 Navigation bar
```text
Component:      Headroom nav
Purpose:        Identity + 2 anchors + résumé; out of the way while reading
Layout:         fixed; inset-x 0; flex, space-between, items-center; full-bleed
Dimensions:     height ≈ 85px; padding-inline var(--gutter) (≈60)
Spacing:        links gap ≈ 32; last link → pill gap ≈ 30
Typography:     logo 19px display 600 ink, final "." in accent-bright; links 16px Inter 400 #4A4540
Colors:         bg rgba(247,242,237,0.84) + backdrop-filter: blur(12px) saturate(1.2)
Borders:        bottom 1px transparent → #E2DBD6 when scrollY > 40
Radius:         pill = full
Shadow:         none
Initial State:  visible at top
Interaction:    hide on scroll-down (> 60px past last reveal), reveal on scroll-up
Hover:          [A] links → ink color, 150ms; pill → fill ink / text paper, 250ms (same as secondary button)
Active:         [A] current section link gets 1px underline offset 6px
Scroll Behavior: translateY(0 ↔ -100%), 300ms var(--ease-emphasized) on reveal, 250ms ease-in-out on hide
Animation:      none on page load (painted immediately)
Responsive:     <768: logo + Résumé pill only (links move to footer/CTA), height 64
Implementation Notes: stays light over dark sections (don't re-theme); use a single rAF-throttled
                listener fed by Lenis' scroll event; never hide while a keyboard focus is inside it.
```

### 17.2 Eyebrow label
```text
Purpose:     Section kicker
Typography:  14px Inter 500, uppercase, tracking 0.18–0.2em; #6C6762 (light) / #8B8985 (dark)
Variant:     hero eyebrow prefixed by a 7px accent-bright dot + 10px gap
Spacing:     → heading 48–64px (section) / ≈24px (hero)
```

### 17.3 Accent heading (the core device)
```text
Purpose:     Every H1/H2/display heading
Markup:      <h2>Plain words <em class="accent">keyword</em>.</h2>
Sans part:   display font 600, tracking -0.025em, color ink / night-text
Accent:      font-accent italic 400, same size, color accent-text (light) / accent-night (dark),
             letter-spacing 0, optional font-weight 600 ONLY if the accent font has a real bold
             (reference used synthetic bold — avoid; use a true weight)
Period:      stays in sans, primary color
Rule:        max one accent per heading; accent = the meaning-carrying word
```

### 17.4 Hero
```text
Layout:       min-height 100svh; centered column max-width ≈ 46rem; content starts ≈ 94px from top
Order:        eyebrow → H1 (2 lines) → lead (1 line) → small label → pill row → signature object → caption
Spacing (CSS): eyebrow→H1 cap ≈ 40 | H1→lead ≈ 30 | lead→label ≈ 23 | label→pills ≈ 18 | pills→object ≈ 21 | object→caption ≈ 13
Divider:      1px hairline at the bottom edge of the section, container width 1280
Animation:    A1 (fade + rise 12px, 400ms, ≤40ms stagger)
Responsive:   must fit a 698px-tall laptop viewport without scrolling; below 760px height scale the object down
```

### 17.5 Pill (hero chips)
```text
Dimensions:  h 37; padding-inline 16; gap 9
Typography:  code prefix 11–12px tracked uppercase #6C6762 + 8px gap + 16px label #423D38
Colors:      bg #FEF9F6; border 1px ≈ #E8E1DA; very soft shadow 0 1px 2px rgba(25,22,19,0.04) [I]
Radius:      full
Hover:       [A] none (informational); if interactive → border ink, 200ms
```

### 17.6 Signature object — hero "TV" pattern (generic spec, not to be cloned)
```text
Purpose:     Tactile play affordance for a short intro video
Dimensions:  ≈ 300 × 225, radius 18
Build:       pure CSS/SVG: body gradient (#C6BEB1 → #A69E90), inset screen with repeating-linear-gradient
             scanlines (1px dark / 2px transparent), right control panel (label, grille, 2 radial-gradient knobs)
Shadow:      0 24px 48px -12px rgba(25,22,19,0.25), 0 2px 4px rgba(25,22,19,0.08)
Hover:       muted <video> fades in inside the screen (≤100ms), scanlines stay on top; persists ~2s after leave; fade out 150ms
Click:       [A] open full video (modal or new tab)
Caption:     serif-italic 20px muted + "→"
```

### 17.7 Case-study row
```text
Purpose:      One project = one row of evidence
Layout:       grid 2 × 1fr, column-gap 64, align-items center; media side alternates by index
Dimensions:   container 1160; media 4:3 (≈551 × 412)
Text stack:   badge (≈53×31, r 6) → 16 → tag row (h30, gap 12) → 20 → H3 (≈35px, max 2 lines, ≈22ch)
              → 20 → body (18/28, max 3 lines, #433E39) → 32 → metric pair (2 cols, gap ≈ 80)
              → 32 → button pair (gap 12)
Metric:       numeral var(--text-stat) serif italic ink; label 15px #716B67, 16px below
Media card:   pastel bg (per project), r 20, overflow hidden, no border/shadow; composed mockup scene
Row gap:      128
Animation:    A5 reveal on text block and media (media first, text +80ms) [A]
Special:      optional in-card demo state change (like the LTR→RTL crossfade) when ≥50% visible
Responsive:   <1024 stack media-first; metric pair stays 2-col; buttons wrap
```

### 17.8 Buttons
```text
Primary (light theme)
  Size:     h 42 (md) / 60 (lg CTA); padding-inline 20 (md) / 40 (lg); radius full
  Type:     15–16px Inter 500; trailing "↗" (external/deep) at 0.85em
  Colors:   bg #1A1714, text #F7F2ED
  Hover:    bg #1E28AC, 250ms ease; no transform, no shadow
  Focus:    [A] 2px outline accent, offset 3px
  Active:   [A] translateY(1px)
Secondary (outline)
  Colors:   transparent, 1.5px border #25231D, text ink; leading "▶" for video
  Hover:    bg #1A1714, text #F7F2ED, 200–250ms
Dark-theme pair (closing CTA)
  Primary:  bg #F2EFE6, text #191613 → [A] hover bg #FFFFFF
  Secondary:1px #6D6C68 border, text #F6F4F0 → [A] hover border #F6F4F0
Glow pill (third-party brand CTA)
  bg = brand color; box-shadow 0 10px 28px -8px rgba(brand,0.55)
```

### 17.9 Tag chip
```text
h 30; padding-inline 14; radius full; bg #FCF9F5; border 1px #E5DED6 [I]; text 15px #4C4846; gap 12; non-interactive
```

### 17.10 Pull-quote testimonial
```text
Layout:      centered, max-width ≈ 46rem, section ≈ 1 viewport, lots of air
Quote:       var(--text-quote) serif italic, lh 1.18, ink; one accent phrase in accent-text
Attribution: 15px uppercase tracked 0.08em #6C6763, 40px below
Follow-up:   transition dot ≈ 200px below the attribution (if using the chapter transition)
```

### 17.11 Chapter transition (pinned, scrubbed)
```text
Structure:   wrapper height ≈ 250vh → sticky inner 100vh (top:0) containing:
             (a) dark layer: absolute inset 0, bg night, clip-path: circle(7px at 50% 24%)
             (b) chapter title: centered, opacity 0.1
Scroll map:  progress 0 → 0.7: clip radius 7px → hypot(100vw, 76vh) (covers farthest corner)
             progress 0.55 → 0.85: title opacity 0.1 → 1
             progress 0.85 → 1: hold, then release
Easing:      "none" (scrubbed); smoothing comes from Lenis / scrub: 0.3
Reduced motion: replace with instant theme switch at the section boundary
```

### 17.12 Marquee shelf (generic)
```text
Track:      flex, gap 24, items duplicated ×2, animation translateX(0 → -50%) linear infinite, ≈26px/s
Mask:       mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)
Item hover: translateY(-30px) 180ms ease-out; track animation-play-state: paused on :hover
Selected:   2px ring accent (outline-offset 2px)
```

### 17.13 Stats row with count-up
```text
Layout:      3 equal columns, 1px dividers (night-text at ~0.7 alpha), padding-inline 32
Numeral:     var(--text-stat-xl) serif italic cream; suffix "+" in the same font; optional icon (★ #EFBC18) inline
Label:       15px #A5A29E, 2 lines max, 16px below numeral
Animation:   count 0 → target over 1.1s, easeOutCubic, starts when 40% visible, once; decimals only if needed
A11y:        render the final value in the DOM (aria-label) — animate a visual copy
```

### 17.14 Review card (dark)
```text
bg #1B1A16; border 1px #32312D; radius 16; padding 24–28
Rating "★ 5/5" 15px #EFBC18 → 16 → quote 20–22px serif italic cream lh 1.45 → 20 → name · source 15px #8B8985
Grid: 2 columns, gap 20; equal heights
```

### 17.15 Closing CTA + footer
```text
Order:      illustration card (≈680 wide, r 20) → 80 → display heading (2 lines, accent word lavender)
            → 48 → button pair (lg, gap 20) → 64 → text links row (19px #A09F9A, gap 26)
            → 48 → micro line (14px #8A8A86, "·" separators)
Motion:     scroll-linked illustration detail (e.g., two parts converging), heading/buttons A5 reveal
```

---

## 18. Page Structure

### 18.1 Reference page (as observed)
```text
PAGE (light → dark)
│
├── Nav (fixed, headroom, frosted)
│
├── Hero (100vh, centered)
│   ├── Eyebrow (dot + role)
│   ├── H1 (sans + italic accent word)
│   ├── Lead (years + domains)
│   ├── Label + country pills
│   ├── Retro TV (hover preview → intro video)
│   ├── Caption
│   └── Divider
│
├── Selected Work (left-aligned)
│   ├── Eyebrow + H2 (accent)
│   └── Case Row ×4 (alternating: media | text)
│       ├── Client badge, tags, title, body
│       ├── Metric pair (serif italic)
│       └── Primary (internal case) + Secondary (video / article)
│
├── Pull Quote (centered) + dot
│
├── Chapter Transition (pinned; dot → dark circle)
│   └── Chapter Title "After …" (centered)
│
├── Content Creation (dark)
│   ├── Eyebrow + H2 + italic lede
│   ├── TV + DVD player (state machine)
│   ├── Hint text + hand-drawn arrow
│   ├── DVD marquee shelf
│   └── YouTube CTA pill
│
├── Writing (dark)
│   ├── Eyebrow + H2 + italic lede (instructions)
│   ├── Desk with 9 notes (flashlight cursor, hover lift, click → article)
│   └── "Read all on Medium" glow pill
│
├── Leadership & Mentorship (dark)
│   ├── Left: eyebrow, H2, body-L, partner logos, brand CTA, rating line
│   ├── Right: 3 count-up stats with dividers
│   └── 2 review cards
│
└── Closing CTA + Footer (dark, centered)
    ├── Illustration card (scroll-linked)
    ├── Display heading (accent)
    ├── Connect (primary) + View résumé (outline)
    ├── Text social links
    └── Availability micro line
```

### 18.2 Proposed structure for OUR portfolio
```text
PAGE (paper → night)
│
├── Nav: "Sangik Ghosh." (accent dot) | Work · Journey · Contact | [Résumé]
│
├── Hero (100svh, centered)
│   ├── Eyebrow: ● Software Engineer · Backend & Android
│   ├── H1: two lines, one italic accent word (e.g. "…systems that *scale*.")
│   ├── Lead: years/stack/domains in one line, key tech in medium weight
│   ├── Label "BUILT WITH" + stack pills with 2-letter mono codes (JV Java, SB Spring Boot, AN Android, RE React …)
│   ├── Signature object: mini terminal/CRT that previews a 60-sec intro OR the portrait card (own identity)
│   ├── Caption (serif italic + →)
│   └── Divider
│
├── Selected Work — case rows ×3–4 (replaces bento grid)
│   └── badge (tech/company) · tags · problem title · body · 2 metrics (latency, users, uptime, LOC…) · CTAs
│
├── Pull Quote (from MyTeam/testimonials — pick the best one)
│
├── Chapter Transition (own metaphor: terminal cursor "█" grows to fill → night)
│   └── Chapter title "Off the *clock*." / "After *hours*." (own wording)
│
├── Practice (night): LeetCode + GitHub
│   ├── Stats trio with count-up (problems solved, contributions, streak/rating)
│   └── Contribution heatmap restyled in lavender ramp
│
├── Journey (night): Timeline restyled as an editorial list
│
├── Toolbox (night, compact): grouped skill tags (replaces big Skills section)
│
└── Closing CTA + Footer (night)
    ├── Own illustration / terminal card
    ├── Display heading with accent word
    ├── Email me (primary) + View résumé (outline)
    └── GitHub · LinkedIn · X · WhatsApp (text links) + availability line
```

---

## 19. Portfolio Adaptation Strategy

### 19.1 Current state of this repo (audit, from code)

| Area | Current implementation | Gap vs the reference level of polish |
|---|---|---|
| Loading | `App.jsx` gates the whole page behind an **800 ms `Preloader`** (`setTimeout`) | The reference paints instantly and fades in within 400 ms. The preloader delays LCP and adds nothing. |
| Scrolling | `html { scroll-behavior: smooth }`, `react-scroll` `<Link smooth duration={800}>`; **`@studio-freight/lenis` installed but never initialized** | No inertial smoothing, and there are two competing smooth-scroll mechanisms. |
| Nav | Works/Story segmented toggle + centered name + WhatsApp + "Let's chat". Turns white/85 + blur + border at `scrollY > 20`. **Always visible.** | Busier than needed. No headroom. |
| Background | White graph-paper grid + yellow radial "atmosphere" in the hero | Distinctive (keep the idea), but pure white feels colder than warm paper. The yellow field competes with the headline. |
| Type | `LT Superior Serif` (upright weights **only**) for headings; Inter body; Newsreader loaded but only as a fallback | `italic` on LT Superior Serif **synthesizes a fake oblique**. Use a real italic (Newsreader Italic is already loaded, so load it explicitly as the accent family). |
| Accent color | `#0000EE` (hyperlink blue) | Same idea as the reference's ink blue but harsher. Refine it to a deeper ink, and add a dark-mode tint. |
| Projects | Bento grid with bordered cards, image zoom on hover, tag overlays, small "Explore Project" buttons | The reference's evidence rows (problem → metrics → CTA) are clearer and more persuasive. |
| Section headers | Every section repeats dot + uppercase label + serif H2 + italic side note + bottom border | Too uniform. The reference varies the rhythm (centered statements vs left content) and uses a chapter change. |
| Sections | 12 content blocks (Hero, Projects, Skills, About, LeetCode ×2, GitHub ×2, Timeline, Team, Contact, Footer) | Long page with no narrative arc. Consolidate. |
| Motion | framer-motion entrances (0.5–0.7 s, delays up to 0.76 s), a GSAP hero parallax (−28 px scrub), Timeline `useScroll` | Entrance stagger is too long (0.76 s before the last element). The reference finishes everything in 0.4 s. |
| Unused / heavy deps | `custompointer/curser.jsx` (unused), `three`, `@react-three/*`, `@splinetool`, `@mui/material`, `@material-tailwind/react`, `next` in a Vite app | Bundle weight. Remove what isn't rendered. |

### 19.2 What transfers directly (principles)

1. **Accent-heading device:** display font + one true-italic serif word in the accent color, on every heading.
2. **Warm paper and warm ink** instead of white and `#111`: `#F7F2ED` / `#191613` (or a slightly cooler variant if we keep the graph grid, e.g. `#F6F3EE`).
3. **Light → dark chapter structure:** professional work on paper, personal practice (LeetCode, GitHub, journey) on night.
4. **Headroom nav** + **Lenis smooth scroll (lerp 0.1)** + **one-shot fade-up reveals** (16–24 px, 550 ms).
5. **Case-row anatomy** with **serif-italic metrics** and a primary/outline CTA pair.
6. **Button language:** dark → accent on hover, outline → dark fill on hover, 250 ms, no bounce.
7. **Count-up stats** for LeetCode and GitHub numbers.
8. **Spacing rhythm:** 128 between rows, 160 between sections, 64 column gap, 1280/1160 containers.
9. **Hero fits one laptop viewport:** claim, proof, stack pills and one object, all above the fold.
10. **Objects animate only on user intent** (hover, click, scroll), never ambiently.

### 19.3 What to adapt (same mechanics, our own metaphor)

| Reference pattern | Our adaptation |
|---|---|
| Retro TV playing an intro | **CRT terminal** (or keep our **portrait card**) with a hover preview: e.g. a looping 3-second screen capture of a project, under a scanline or monospace overlay. |
| DVD shelf → player | **Project "cartridges" or "floppies" → terminal.** Picking one runs `$ run <project>` and shows its demo GIF/video in the terminal screen. Optional, phase 2. |
| Dot → dark circle transition | **Terminal cursor block "█" grows to fill the screen** (same pinned `clip-path`/scale mechanics, our own shape and meaning). |
| Flashlight desk of articles | Only if we publish writing. Otherwise **skip**. For repos, a simple dark list with hover-lit rows is enough. |
| Mentorship stats | **LeetCode solved / contest rating / GitHub contributions / streak** as count-up serif-italic numerals. |
| Pastel media fields | One pastel per project that suits its domain (e.g. sage = Android, periwinkle = web, sand = backend), containing **composed mockups** (device frame + architecture snippet), not raw screenshots. |
| EN→AR RTL crossfade demo | A **per-project in-card demo toggle** triggered on view, e.g. an API card flipping from "request" to "response", or light → dark mode of an app screen. |
| Country pills | **Stack pills** with 2-letter mono codes, or "Built for" pills (clients/domains). |

### 19.4 What NOT to copy

- The TV/VV-60 model, DVD cases, player UI, "insert a disc" copy, or any of their layouts one-to-one.
- The torch/desk/paper-notes concept, the "PUBLISHED" stamp, the polaroid scatter.
- The Michelangelo hands illustration or any illustration style that mimics it.
- Any text: headline wording, section titles ("After work", "Problems worth solving"), captions, quotes.
- Third-party logos and brand buttons (Topmate/Medium styling), which only belong to them.
- The exact chapter-title device of a two-word "After work": write our own.

### 19.5 Keeping our own identity

- **Keep LT Superior Serif** as a distinctive voice. Two options:
  - **A (recommended):** display headings in **Instrument Sans 600** (close to the reference's energy), with **LT Superior Serif upright** used for metrics and big numerals and **Newsreader Italic** for accent words. Moderate change, and it keeps our serif.
  - **B (conservative):** keep **LT Superior Serif** for headings and use **Newsreader Italic** for the accent words (a true italic, fixing the current faux italic). Inter for body.
- **Keep the graph-paper grid** as our "engineering notebook" signature, but reduce it to the **hero only**, masked to fade out downward (`mask-image: linear-gradient(#000 40%, transparent)`), at ≈ 0.03 alpha over paper.
- **Drop the yellow atmosphere** or reduce it to a single subtle warm glow behind the hero object. The reference proves one accent color is enough.
- Use a **mono** (JetBrains Mono) for engineer-flavored meta: stack codes, years, LCD/terminal labels. That is our equivalent of their typewriter/LCD details.

### 19.6 Section-by-section mapping (current component → target)

| Current component | Target | Action |
|---|---|---|
| `preloader/App.jsx` + 800 ms gate in `App.jsx` | none | **Remove.** Replace with the A1 hero entrance (400 ms). |
| `navbar/navbar.jsx` | Headroom nav (§17.1) | Replace the toggle and center logo with left wordmark + 3 links + Résumé pill; add hide/reveal; move WhatsApp to the contact section. |
| `home.jsx` + `hero/HeroAtmosphere.jsx` | Centered hero (§17.4) | Centered compact layout, accent H1, stack pills, one object (portrait card or terminal), divider at the fold. Remove the scrub parallax (the reference has none). |
| `projects/app.jsx` (bento) | Case rows (§17.7) | Rebuild as alternating rows with metrics and a CTA pair; `Card.jsx` notice stays for private repos. |
| `MyTeam/*` (animated testimonials) | Pull quote (§17.10) | One large centered quote; optional small row of more quotes later. |
| — | Chapter transition (§17.11) | New component, cursor-block metaphor. |
| `Leetcode/*`, `GithubRepo/*` | Practice (night) | Stats trio with count-up; heatmaps restyled in a lavender ramp on `#1B1A16` panels; repos as a dark list. |
| `Timeline/*` | Journey (night) | Keep the scroll-linked line, restyle to night tokens, typography per §6. |
| `Skills/skills.jsx` | Toolbox (compact) | Grouped tag chips (§17.9); no large cards. |
| `about/aboutMe.jsx` | Folded into the hero lead + closing | Keep a short bio paragraph inside Practice/Journey, or a single row. The résumé link goes to the nav + closing. |
| `contact/contact.jsx` + `Footer/footer.jsx` | Closing CTA + footer (§17.15) | Merge into one dark closing section. |

---

## 20. Implementation Recommendations

### 20.1 Libraries (already in `package.json`)
- **Lenis** (`@studio-freight/lenis`, the old name for `lenis`; either works) for smooth scroll.
- **GSAP + ScrollTrigger** for everything scroll-scrubbed or pinned (chapter transition, converging illustration, Timeline if moved).
- **framer-motion** for component-level reveals, hovers and the count-up (or GSAP; don't mix both on the same element).
- Remove `html { scroll-behavior: smooth }` and `react-scroll` once Lenis is in: use `lenis.scrollTo('#id', { offset: -80 })`.

### 20.2 Lenis + ScrollTrigger bootstrap
```jsx
// src/lib/smoothScroll.js
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothTouch: false });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => { gsap.ticker.remove(raf); lenis.destroy(); };
}
```

### 20.3 Headroom nav hook
```jsx
function useHeadroom(threshold = 60) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    let ticking = false;
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY.current;
        setScrolled(y > 40);
        if (y <= threshold) setHidden(false);   // always visible near the top
        else if (dy > 2) setHidden(true);       // scrolling down → hide
        else if (dy < -2) setHidden(false);     // scrolling up → reveal
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return { hidden, scrolled };
}
// <header className={cn(
//   "fixed inset-x-0 top-0 z-50 h-[85px] bg-paper/85 backdrop-blur-md border-b",
//   "transition-[transform,border-color] duration-300 ease-emphasized",
//   scrolled ? "border-hairline" : "border-transparent",
//   hidden && "-translate-y-full")}>
```
*(Don't hide while focus is inside the header: check `header.contains(document.activeElement)` before `setHidden(true)`.)*

### 20.4 Reveal primitive
```jsx
export const Reveal = ({ children, delay = 0, y = 20, as: Tag = motion.div, ...p }) => (
  <Tag initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, margin: "0px 0px -12% 0px" }}
       transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }} {...p}>
    {children}
  </Tag>
);
```

### 20.5 Chapter transition (clip-path, pinned, scrubbed)
```jsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const cover = () => `${Math.hypot(window.innerWidth / 2, window.innerHeight * 0.76) + 20}px`;
    gsap.timeline({
      scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "+=150%", scrub: 0.3, pin: stickyRef.current, invalidateOnRefresh: true },
    })
      .fromTo(layerRef.current, { clipPath: "circle(7px at 50% 24%)" }, { clipPath: () => `circle(${cover()} at 50% 24%)`, ease: "none", duration: 0.7 })
      .fromTo(titleRef.current, { opacity: 0.1 }, { opacity: 1, ease: "none", duration: 0.3 }, 0.55);
  }, wrapRef);
  return () => ctx.revert();
}, []);
```

### 20.6 Count-up
```jsx
function CountUp({ to, suffix = "", duration = 1.1 }) {
  const ref = useRef(null); const inView = useInView(ref, { once: true, amount: 0.4 });
  const [v, setV] = useState(0);
  useEffect(() => { if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop(); }, [inView, to, duration]);
  return <span ref={ref} aria-label={`${to}${suffix}`}>{v}{suffix}</span>;
}
```

### 20.7 Marquee (pause on hover)
```css
.marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.marquee__track { display: flex; gap: 24px; width: max-content; animation: marquee var(--marquee-dur, 60s) linear infinite; }
.marquee:hover .marquee__track { animation-play-state: paused; }
@keyframes marquee { to { transform: translateX(-50%); } }  /* items duplicated ×2 */
```
Set `--marquee-dur` to `trackHalfWidth / 26` seconds so the speed is ≈ 26 px/s.

### 20.8 Hover preview video
```jsx
<video ref={v} muted playsInline loop preload="none" poster={poster}
  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-150" />
// onPointerEnter: v.current.play(); show (opacity-100); clearTimeout(t)
// onPointerLeave: t = setTimeout(() => { hide; v.current.pause(); }, 2000)   // matches the observed ~2s linger
```

### 20.9 Fonts (avoid the FOUT that was visible at 00:08.667)
- Self-host woff2 (not otf) for the display, accent and body fonts. `<link rel="preload" as="font" type="font/woff2" crossorigin>` the two hero-critical files.
- `font-display: swap` + `size-adjust`/`ascent-override` on a local fallback to reduce the reflow, or `optional` for the display font.
- Load **real italic** files for the accent family. Never rely on synthetic italic or bold (`font-synthesis: none` on accent elements).

### 20.10 Accessibility and reduced motion [A]
- `prefers-reduced-motion`: disable Lenis, reveals (render final state), the marquee (static row, scrollable), the chapter scrub (instant theme switch) and the count-up (final value).
- Hover-only features (previews, lifted notes) must have click/tap and keyboard equivalents (`button`, `aria-pressed` for the selected cartridge).
- Contrast (computed): `#423D38` on paper 9.7:1, `#6C6762` on paper 5.0:1, `#736D68` on paper 4.6:1, accent `#1E28AC` on paper 9.7:1, `#A5A29E` on night 7.3:1, `#8B8985` on night 5.3:1, lavender `#B7B5F0` on night 9.6:1. Anything lighter than `#736D68` on paper fails AA for small text.
- Focus ring: `outline: 2px solid var(--color-accent); outline-offset: 3px` (not observed in the reference, but required).

### 20.11 Performance
- Remove unused heavy deps (three/fiber/drei/spline/MUI/material-tailwind/next) if nothing renders them.
- Lazy-load iframes and videos only on interaction (as the reference does with YouTube).
- Keep `backdrop-filter` only on the nav. Avoid animating `filter` or `box-shadow` on large elements.
- Animate only `transform`, `opacity` and `clip-path`.

---

## 21. Uncertain / Inferred Details

| Item | Status | Why uncertain |
|---|---|---|
| devicePixelRatio 1.25 and every CSS conversion | **[I]** | Inferred from the taskbar and scrollbar sizes; browser zoom could also be non-100%. |
| Font identities (Instrument Sans / Instrument Serif / Inter) | **[I]** | Matched by glyph traits, not metadata. |
| Nav hide duration and threshold | **[I]** | Only the last ~35 px of the slide was trackable; the threshold is estimated at 50–80 px. |
| Reveal translate distance | **[I]** | Opacity fade was clear; translation is hard to separate from smooth-scroll motion. |
| Circle-transition scroll runway | **[I]** | Frame shift tracking fails while the circle fills the screen; estimated at ~1.2–1.5 viewport heights. |
| RTL card: view-triggered vs time-looped | **[I]** | Only one switch was observed. |
| Thin vertical bar at the right of the RTL card | unknown | Possibly a drag/scrub handle affordance. Never interacted with. |
| TV preview linger (~2 s after leave) | **[O]** | Could be a fixed-length teaser rather than a delayed mouseleave. |
| DVD sequence sub-timings | **[O/I]** | Estimated from 20 fps frames; the 3D rotation angle is approximate. |
| Hands scroll-link vs time-based | **[I]** | The motion coincided with scrolling. |
| Hover/focus/active states of nav links, tags, pills, media | not observed | The cursor never tested them. All specs are **[A]**. |
| Background grain | uncertain | Faint banding is likely video compression. |
| Dark native scrollbar (`color-scheme`) | uncertain | Could be a browser theme setting. |
| All mobile/tablet behavior | **[A]** | Single desktop viewport recorded. |

---

## 22. Final Design Principles

1. **One voice, one accent.** A heavy sans states the claim, and a single true-italic serif word carries its meaning in one accent color (ink blue on paper, lavender on night).
2. **Warm, never pure.** Surfaces are warm paper and warm ink. Pure white and pure black are exceptions.
3. **Evidence as typography.** Every claim is followed by a number, and numbers are always set as expressive serif italics.
4. **Chapters, not sections.** Professional work on light, personal practice on dark. A scroll-scrubbed, crisp, user-driven transition marks the break.
5. **Motion is quiet and earned.** UI motion ≤ 24 px and ≤ 600 ms, hovers are color only, and large motion happens only as a direct result of scroll or click.
6. **Smooth, not slow.** Lenis lerp ≈ 0.1, a headroom nav, one-shot reveals, no scroll-jacking except one pinned moment.
7. **Rhythm through alignment.** Centered statements (hero, quote, chapter, ask) alternate with left-aligned evidence (work, practice).
8. **Generous between, tight within.** 128–160 px between blocks, 8–32 px inside them.
9. **Objects over ornaments.** If something is decorative, make it functional (a player, a terminal, a filter). If it can't be functional, remove it.
10. **Everything above the fold on a laptop.** The first viewport holds the whole pitch: role, claim, proof, stack and one invitation to engage.
11. **Two actions, clear rank.** A solid primary and an outline secondary. Never two primaries side by side.
12. **Own the metaphor.** Borrow the rigor, spacing, motion grammar and typographic device. Never borrow the reference's objects, words or images.
