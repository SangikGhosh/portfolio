// Every word and link on the site lives here, so copy edits never touch layout code.

export const profile = {
  name: "Sangik Ghosh",
  first: "Sangik",
  last: "Ghosh",
  role: "Jr. AI Engineer",
  city: "Kolkata",
  country: "India",
  timezone: "Asia/Kolkata",
  email: "sangik.ghosh1@gmail.com",
  whatsapp: "https://api.whatsapp.com/send?phone=916295894643",
  resume:
    "https://www.canva.com/design/DAGb6Dz0bSE/qcV2wlUYbogTpQSqTI0aQg/view?utm_content=DAGb6Dz0bSE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1a00f338ba",
  github: "SangikGhosh",
  leetcode: "Sangik_Ghosh",
  availability: "Open to full-time roles & freelance",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/SangikGhosh" },
  { label: "LeetCode", href: "https://leetcode.com/u/Sangik_Ghosh/" },
  { label: "X", href: "https://x.com/Sangik_Ghosh" },
  { label: "Instagram", href: "https://www.instagram.com/s.a.n.g.i.k_/" },
];

export const navLinks = [
  { label: "Work", target: "work", count: 4 },
  { label: "Journey", target: "journey", count: 5 },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
];

export const hero = {
  // three short lines, centred under the name
  lines: ["Jr. AI engineer and backend", "developer — based in India", "[ Kolkata ]"],
  approach:
    "Calm, dependable systems — agents that retrieve and reason, and the services that keep them honest.",
};

/* Pictures for the window inside the name (Cloudinary originals; resized on delivery). */
export const heroImages = [
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621198/2f1d27e806f7c2d995f2688fb171b3de_xlc7sl.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621198/a13bc7e8292bc42148139ef9666dc3f3_ookm3k.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621198/684fd878fa0c62e41aab91fe64e978b8_kcposo.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621198/e98f5546126d17d0a3d9f6cd9dc36112_b6hblg.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621198/ba33f8af5c4db10ed95ff25464e8ea7a_g4xwbq.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621197/6f2b4b106344346ae4c6d82a76276ecc_p6vzm0.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621197/c24c4c6068210bd4ff41277779a454a1_ujzbvw.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621197/a7a280114b08292d6d69af7afcc54356_iaahcy.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621197/dd2f033788bd5281106d30658a5cd75b_igba1x.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621197/a1cef070d90218375c0fec9e96a588a5_dinm4n.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621197/5a6f31e0e5b0c8d1731446a1cb7102bf_xa7bpo.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621197/1078936a07be10c6d212180c6aa7a45a_bz2901.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621197/4c1da15feb2185ec11655d824ce6de06_pu0yit.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621196/5a2ae359e17e1867bc41623b8c455b24_myglqh.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621196/140f2e8a9d04b79763b13017ab4ac100_gbsxvn.jpg",
  "https://res.cloudinary.com/dq2dnhli5/image/upload/v1791621196/247148ca1f1aa88eb8bfd6aab2f73e06_umm3pw.jpg",
];

export const statement =
  "I build AI systems that retrieve, reason and act on real data — and the calm, dependable services underneath them. I started in frontend, so I still care how it all feels.";

export const stack = ["LLMs & RAG", "Python", "FastAPI", "Spring Boot", "Flutter", "Java"];

/* `cover` picks the typographic cover drawn for each project (see components/work/covers.jsx). */
export const projects = [
  {
    id: "chatbuzz",
    name: "ChatBuzz",
    year: "2024",
    role: "Lead developer",
    kind: "Full stack",
    tags: ["Full stack", "Real-time", "WebSockets"],
    title: "A chat app where messages land instantly.",
    body: "A real-time messaging platform on React, Express, Node.js and MongoDB. Token-based auth, socket-streamed messages and chat rooms that stay in sync on every device.",
    facts: [
      { value: "Real-time", label: "socket-streamed messaging" },
      { value: "Multi-room", label: "in sync across devices" },
    ],
    stack: ["React", "Express", "Node.js", "MongoDB", "Socket.io"],
    links: [{ label: "View source", href: "https://github.com/SangikGhosh/realtime-chat-app" }],
    cover: "chat",
  },
  {
    id: "filehider",
    name: "FileHider",
    year: "2024",
    role: "Backend architecture",
    kind: "Security",
    tags: ["Java", "Security", "Cryptography"],
    title: "Keeping private files private, by design.",
    body: "A Java service that encrypts and conceals sensitive local files, keeping them out of reach of anyone unauthorised — and asks for a one-time password before anything unlocks.",
    facts: [
      { value: "OTP", label: "multi-factor unlock" },
      { value: "Encrypted", label: "files concealed at rest" },
    ],
    stack: ["Java", "Cryptography", "OTP verification", "JDBC"],
    links: [{ label: "View source", href: "https://github.com/SangikGhosh/FileHiderService" }],
    cover: "vault",
  },
  {
    id: "flux",
    name: "FLUX.1 UI",
    year: "2024",
    role: "Frontend engineer",
    kind: "AI interface",
    tags: ["AI", "Interface", "Team project"],
    title: "Turning a single sentence into an image.",
    body: "A fast interface for generating detailed imagery from natural-language prompts — tuned for speed, variety of output and fluid, stateful interaction.",
    facts: [
      { value: "Text → image", label: "natural-language generation" },
      { value: "Stateful", label: "fluid, uninterrupted flow" },
    ],
    stack: ["React", "Tailwind CSS", "AI API pipeline"],
    links: [{ label: "Team repository", href: "https://github.com/sandipsaha2005/final-round-project" }],
    cover: "prompt",
  },
  {
    id: "mlbb",
    name: "MLBB Portal",
    year: "2024",
    role: "UI / UX developer",
    kind: "Community",
    tags: ["Web", "Community", "Interactive UI"],
    title: "A home base for a competitive gaming crowd.",
    body: "A community portal for Mobile Legends players: hero metrics, tactical guides, competitive match updates and multiplayer statistics, all in one quick-to-scan place.",
    facts: [
      { value: "Live", label: "match & multiplayer stats" },
      { value: "Guides", label: "tactics for every hero" },
    ],
    stack: ["React", "UI design", "Interactive UI"],
    links: [{ label: "View source", href: "https://github.com/SangikGhosh/MLBB" }],
    cover: "arena",
  },
];

export const archive = [
  {
    year: "2023",
    title: "TechHub Club Platform",
    note: "Community portal for workshops, challenges and open-source collaboration",
    stack: "React · Tailwind CSS",
    status: "Private",
  },
  {
    year: "2023",
    title: "Social Media App",
    note: "Auth, multimedia feeds, threaded discussions and profile management",
    stack: "MERN · JWT · Cloudinary",
    status: "Private",
  },
  {
    year: "2023",
    title: "Cloud Deploy Dashboard",
    note: "Exploratory UI for deploy workflows, service health and scaling settings",
    stack: "React · API tooling",
    status: "Private",
  },
];

/* The line the page "closes its eyes" on, before the dark chapter. */
export const belief = ["Built for the bad day,", "not the demo."];

export const testimonials = [
  {
    quote:
      "Collaborating with Sangik on distributed Java applications was a masterclass in architectural discipline. His grasp of backend protocols and data structures consistently raised our code quality.",
    name: "Sandip Saha",
    role: "Full-stack engineer · Hackathon teammate",
  },
  {
    quote:
      "Sangik pairs a relentless work ethic with real technical curiosity. Under hackathon pressure, his read on server-side bottlenecks kept our deployments on track.",
    name: "Shubhendu Halder",
    role: "Python developer · Collaborator",
  },
  {
    quote:
      "A focused developer who takes fundamentals seriously. From algorithmic edge cases to query tuning, he works with precision and calm clarity.",
    name: "Aman Jha",
    role: "Software engineer",
  },
];

export const about = {
  hello: "Hi, I’m Sangik.",
  intro:
    "A Jr. AI Engineer in Kolkata. I build agentic LLM systems and RAG pipelines, and the FastAPI and Spring Boot services that keep them dependable.",
  chips: ["AI engineering", "Backend", "Mobile", "Frontend roots"],
  paragraphs: [
    "Day to day I build agentic LLM systems and retrieval pipelines, and the FastAPI and Spring Boot services that keep them dependable. I also ship Flutter apps.",
    "I started out as a frontend engineer, which is why I still care how things feel. From multi-factor encryption in Java to retrieval pipelines, I try to write code that is readable, testable and aimed at a real problem — not a demo.",
  ],
  facts: [
    { k: "Based in", v: "Kolkata, India · IST" },
    { k: "Now", v: "Jr. AI Engineer — agents, RAG, LLMs" },
    { k: "Before", v: "Frontend engineer · Java backend intern" },
    { k: "Status", v: "Open to full-time roles & freelance" },
  ],
};

/* Capabilities: one row per discipline, tools listed in the order they matter. */
export const capabilities = [
  {
    title: "AI & agents",
    summary: "LLM systems that retrieve, reason and act on real data.",
    tools: ["LLM agents", "Tool use", "RAG", "Embeddings", "Qdrant", "Pinecone", "pgvector"],
  },
  {
    title: "Backend",
    summary: "APIs that stay calm under load — Python where AI lives, Java where nothing may fall over.",
    tools: ["Spring Boot", "FastAPI", "REST", "WebSockets", "Spring Security", "JWT", "JPA"],
  },
  {
    title: "Mobile",
    summary: "Cross-platform apps in Flutter — where the AI features meet people’s hands.",
    tools: ["Flutter", "Riverpod", "BLoC", "Dio", "GoRouter", "Hive", "Firebase"],
  },
  {
    title: "Data",
    summary: "Schemas designed first — relational by default, documents when the shape is loose.",
    tools: ["PostgreSQL", "Supabase", "Neon", "MongoDB", "Redis"],
  },
  {
    title: "Tools & cloud",
    summary: "From laptop to production — containers, cloud and the edge.",
    tools: ["Git", "Docker", "OCI", "Cloudflare", "Cloudinary"],
  },
  {
    title: "Frontend",
    summary: "Where I started — interfaces that feel considered, this one included.",
    tools: ["React", "Tailwind CSS", "Vite", "Responsive UI"],
  },
];

export const languages = ["Python", "Java", "Dart", "SQL", "JavaScript", "C"];

export const journey = [
  {
    when: "Now",
    title: "Jr. AI Engineer — agents, RAG and LLM systems",
    body: "Building agentic workflows and retrieval pipelines on FastAPI and Spring Boot, shipping Flutter apps, and keeping up daily DSA on LeetCode.",
    live: true,
  },
  {
    when: "2024",
    title: "National finalist, Sheriyans Coding School Hackathon",
    body: "Cleared rounds one to three against teams from across India, shipping full-stack prototypes against the clock.",
    photo: "hackathon",
  },
  {
    when: "2023",
    title: "Java backend intern, Surtle Security",
    body: "Built server-side modules in Java, picked up production security practice and shipped inside a live agile team.",
  },
  {
    when: "2022",
    title: "Diploma in Computer Science & Technology",
    body: "Behala Government Polytechnic — where self-taught curiosity met operating systems, object-oriented design and relational databases.",
    photo: "classroom",
  },
  {
    when: "Before",
    title: "Where it started",
    body: "Finished school, moved from Delhi to Kolkata and started teaching myself Java and the web, one small project at a time.",
  },
];

export const contact = {
  marquee: ["Let’s talk", "Have a role or an idea? Good. That’s what the first message is for."],
  open: "I’m always happy to meet new people, take on interesting problems and explore new ideas. Feel free to",
};

// Snapshot of live numbers (2026-09-25), shown only if the APIs are unreachable.
export const statsSnapshot = {
  asOf: "Sep 2026",
  contributions: 1585,
  leetcodeSolved: 87,
  leetcodeHard: 10,
  leetcodeEasy: 40,
  leetcodeMedium: 37,
  publicRepos: 19,
};
