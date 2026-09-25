import { useEffect, useState } from "react";
import { profile, statsSnapshot } from "../data/content";

const CACHE_KEY = "sg-live-v1";
const TTL = 1000 * 60 * 60 * 6; // 6h

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Date.now() - parsed.t < TTL ? parsed.data : null;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* storage unavailable — fine */
  }
}

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

/** Normalises LeetCode's { unixSeconds: count } calendar into { "YYYY-MM-DD": count }. */
function leetcodeDays(calendar) {
  const out = {};
  if (!calendar) return out;
  const obj = typeof calendar === "string" ? JSON.parse(calendar) : calendar;
  Object.entries(obj).forEach(([ts, n]) => {
    const d = new Date(Number(ts) * 1000);
    const key = d.toISOString().slice(0, 10);
    out[key] = (out[key] || 0) + Number(n);
  });
  return out;
}

async function loadAll() {
  const [lc, gh, contrib, repos] = await Promise.allSettled([
    getJSON(`https://leetcode-api-faisalshohag.vercel.app/${profile.leetcode}`),
    getJSON(`https://api.github.com/users/${profile.github}`),
    getJSON(`https://github-contributions-api.jogruber.de/v4/${profile.github}?y=last`),
    getJSON(`https://api.github.com/users/${profile.github}/repos?sort=pushed&per_page=30`),
  ]);

  const data = {
    live: false,
    asOf: statsSnapshot.asOf,
    leetcode: {
      solved: statsSnapshot.leetcodeSolved,
      easy: statsSnapshot.leetcodeEasy,
      medium: statsSnapshot.leetcodeMedium,
      hard: statsSnapshot.leetcodeHard,
      days: {},
    },
    github: { repos: statsSnapshot.publicRepos, contributions: statsSnapshot.contributions, days: [] },
    repos: [],
  };

  if (lc.status === "fulfilled" && typeof lc.value.totalSolved === "number") {
    data.leetcode = {
      solved: lc.value.totalSolved,
      easy: lc.value.easySolved,
      medium: lc.value.mediumSolved,
      hard: lc.value.hardSolved,
      days: leetcodeDays(lc.value.submissionCalendar),
    };
    data.live = true;
  }
  if (gh.status === "fulfilled" && typeof gh.value.public_repos === "number") {
    data.github.repos = gh.value.public_repos;
    data.live = true;
  }
  if (contrib.status === "fulfilled" && Array.isArray(contrib.value.contributions)) {
    data.github.contributions = contrib.value.total?.lastYear ?? data.github.contributions;
    data.github.days = contrib.value.contributions;
    data.live = true;
  }
  if (repos.status === "fulfilled" && Array.isArray(repos.value)) {
    data.repos = repos.value
      .filter((r) => !r.fork && r.name.toLowerCase() !== profile.github.toLowerCase())
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        language: r.language,
        url: r.html_url,
        pushed: r.pushed_at,
        stars: r.stargazers_count,
      }));
  }
  return data;
}

let inflight = null;

/** Live GitHub + LeetCode numbers, with a dated snapshot as graceful fallback. */
export function useLiveStats() {
  const [state, setState] = useState(() => readCache());

  useEffect(() => {
    if (state) return;
    let alive = true;
    inflight = inflight || loadAll();
    inflight
      .then((data) => {
        writeCache(data);
        if (alive) setState(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [state]);

  return state;
}
