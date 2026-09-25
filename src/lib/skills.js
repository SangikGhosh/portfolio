import { skills } from "../data/content";

export const itemsOf = (domain) => domain.groups.flatMap((g) => g.items);

const domainById = Object.fromEntries(skills.domains.map((d) => [d.id, d]));

const languagesView = {
  id: "languages",
  code: "LANGUAGES",
  title: "Languages",
  summary: skills.languagesSummary,
  groups: skills.languages.map((l) => ({ name: l.use, items: [l.label], primary: l.primary })),
};

/** The data behind a pressed key: a domain, or the language row. */
export const viewFor = (id) => (id === "languages" ? languagesView : domainById[id]);

/** Unique count across every language and every item in every domain. */
export const totalTechCount = new Set([
  ...skills.languages.map((l) => l.label.toLowerCase()),
  ...skills.domains.flatMap((d) => itemsOf(d).map((i) => i.toLowerCase())),
]).size;
