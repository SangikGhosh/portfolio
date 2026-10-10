import { heroImages } from "../data/content";

/*
 * The pictures in the hero's window.
 * - Shuffled once per visit, so every visit opens on a different one.
 * - Delivered by Cloudinary at the size this screen needs: cropped to 4:3 from the exact centre,
 *   auto format and quality.
 * - The first starts downloading the moment this module loads; the preloader waits for it.
 * - The rest follow one at a time, in the order they will be shown, only after the page
 *   has opened — so they never compete with what is on screen.
 */

const ASPECT = 4 / 3;

/** Device-pixel width of the window, rounded up to a 160px step (nearby screens share a cache). */
function slotWidth() {
  if (typeof window === "undefined") return 640;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const font = vw < 640 ? vw * 0.19 : Math.min(vw * 0.136, vh * 0.31); // matches --name in Hero
  const px = font * 0.91 * Math.min(window.devicePixelRatio || 1, 2);
  return Math.min(960, Math.max(320, Math.ceil(px / 160) * 160));
}

function sized(url, w) {
  const h = Math.round(w / ASPECT);
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_fill,g_center,w_${w},h_${h}/`);
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const width = slotWidth();

/** This visit's running order. */
export const heroOrder = shuffle([...new Set(heroImages)]).map((u) => sized(u, width));

const loads = new Map();

/** Download and decode one picture. Resolves true when it can be shown without a flash, false if it failed. */
export function loadImage(src, priority = "auto") {
  if (!loads.has(src)) {
    loads.set(
      src,
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.fetchPriority = priority;
        img.onload = () => (img.decode ? img.decode().then(() => resolve(true), () => resolve(true)) : resolve(true));
        img.onerror = () => resolve(false);
        img.src = src;
      }),
    );
  }
  return loads.get(src);
}

/** The opening picture, requested straight away at high priority. */
export const firstHeroImage = heroOrder.length ? loadImage(heroOrder[0], "high") : Promise.resolve(false);

let started = false;

/** Queue the rest, one after another. Safe to call more than once. */
export function preloadRest() {
  if (started) return;
  started = true;
  heroOrder.slice(1).reduce((chain, src) => chain.then(() => loadImage(src, "low")), firstHeroImage);
}
