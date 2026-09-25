// Every word and link on the site lives here, so copy edits never touch layout code.

export const profile = {
  name: "Sangik Ghosh",
  role: "Jr. AI Engineer",
  city: "Kolkata",
  country: "IN",
  timezone: "Asia/Kolkata",
  email: "sangik.ghosh1@gmail.com",
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
  { label: "WhatsApp", href: "https://api.whatsapp.com/send?phone=916295894643" },
];

export const navLinks = [
  { label: "Work", target: "work", key: "W" },
  { label: "Journey", target: "journey", key: "J" },
  { label: "Contact", target: "contact", key: "C" },
];

export const stack = [
  { label: "LLMs & RAG" },
  { label: "Python" },
  { label: "FastAPI" },
  { label: "Spring Boot" },
  { label: "Flutter" },
  { label: "Java" },
];

export const projects = [
  {
    id: "chatbuzz",
    badge: "ChatBuzz",
    year: "2024",
    role: "Lead developer",
    tags: ["Full stack", "Real-time", "WebSockets"],
    title: ["A chat app where messages land ", "instantly", "."],
    body: "A real-time messaging platform on React, Express, Node.js and MongoDB. Token-based auth, socket-streamed messages and chat rooms that stay in sync on every device.",
    facts: [
      { value: "Real-time", label: "socket-streamed messaging" },
      { value: "Multi-room", label: "in sync across devices" },
    ],
    stack: ["React", "Express", "Node.js", "MongoDB", "Socket.io"],
    links: [{ label: "View source", href: "https://github.com/SangikGhosh/realtime-chat-app" }],
    scene: "chat",
    tone: "periwinkle",
  },
  {
    id: "filehider",
    badge: "FileHider",
    year: "2024",
    role: "Backend architecture",
    tags: ["Java", "Security", "Cryptography"],
    title: ["Keeping private files ", "private", ", by design."],
    body: "A Java service that encrypts and conceals sensitive local files, keeping them out of reach of anyone unauthorised — and asks for a one-time password before anything unlocks.",
    facts: [
      { value: "OTP", label: "multi-factor unlock" },
      { value: "Encrypted", label: "files concealed at rest" },
    ],
    stack: ["Java", "Cryptography", "OTP verification", "JDBC"],
    links: [{ label: "View source", href: "https://github.com/SangikGhosh/FileHiderService" }],
    scene: "vault",
    tone: "sand",
  },
  {
    id: "flux",
    badge: "FLUX.1 UI",
    year: "2024",
    role: "Frontend engineer",
    tags: ["AI", "Interface", "Team project"],
    title: ["Turning a single sentence into an ", "image", "."],
    body: "A fast interface for generating detailed imagery from natural-language prompts — tuned for speed, variety of output and fluid, stateful interaction.",
    facts: [
      { value: "Text → image", label: "natural-language generation" },
      { value: "Stateful", label: "fluid, uninterrupted flow" },
    ],
    stack: ["React", "Tailwind CSS", "AI API pipeline"],
    links: [{ label: "Team repository", href: "https://github.com/sandipsaha2005/final-round-project" }],
    scene: "prompt",
    tone: "blush",
  },
  {
    id: "mlbb",
    badge: "MLBB Portal",
    year: "2024",
    role: "UI / UX developer",
    tags: ["Web", "Community", "Interactive UI"],
    title: ["A home base for a ", "competitive", " gaming crowd."],
    body: "A community portal for Mobile Legends players: hero metrics, tactical guides, competitive match updates and multiplayer statistics, all in one quick-to-scan place.",
    facts: [
      { value: "Live", label: "match & multiplayer stats" },
      { value: "Guides", label: "tactics for every hero" },
    ],
    stack: ["React", "UI design", "Interactive UI"],
    links: [{ label: "View source", href: "https://github.com/SangikGhosh/MLBB" }],
    scene: "arena",
    tone: "sage",
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
    title: "Full-stack Social Media App",
    note: "Auth, multimedia feeds, threaded discussions and profile management",
    stack: "MERN · JWT · Cloudinary",
    status: "Private",
  },
  {
    year: "2023",
    title: "Cloud Deployment Dashboard",
    note: "Exploratory UI for deploy workflows, service health and scaling settings",
    stack: "React · API tooling",
    status: "Private",
  },
];

export const testimonials = [
  {
    quote: [
      "Collaborating with Sangik on distributed Java applications was a masterclass in ",
      "architectural discipline",
      ". His grasp of backend protocols and data structures consistently raised our code quality.",
    ],
    name: "Sandip Saha",
    role: "Full-stack engineer · Hackathon teammate",
  },
  {
    quote: [
      "Sangik pairs a ",
      "relentless work ethic",
      " with real technical curiosity. Under hackathon pressure, his read on server-side bottlenecks kept our deployments on track.",
    ],
    name: "Shubhendu Halder",
    role: "Python developer · Collaborator",
  },
  {
    quote: [
      "A focused developer who takes fundamentals seriously. From algorithmic edge cases to query tuning, he works with ",
      "precision and calm clarity",
      ".",
    ],
    name: "Aman Jha",
    role: "Software engineer",
  },
];

export const about = {
  paragraphs: [
    "I’m a Jr. AI Engineer in Kolkata. Day to day I build agentic LLM systems and RAG pipelines, and the FastAPI and Spring Boot services that keep them dependable. I also ship Flutter apps.",
    "I started out as a frontend engineer, which is why I still care how things feel. From multi-factor encryption in Java to retrieval pipelines, I try to write code that is readable, testable and aimed at a real problem — not a demo.",
  ],
  belief: "Software shouldn’t only work in perfect conditions. It should stay calm, predictable and resilient under load.",
  facts: [
    { k: "Based in", v: "Kolkata, India · IST" },
    { k: "Now", v: "Jr. AI Engineer — agents, RAG, LLMs" },
    { k: "Before", v: "Frontend engineer · Java backend intern" },
    { k: "Status", v: "Open to full-time roles & freelance" },
  ],
};

/*
 * Skills — a hierarchy, not a list.
 *   domain  → what I can build (one keycap each)
 *   headline→ the 3–4 things shown on the keycap
 *   groups  → capability → the concrete tools behind it (shown when a key is pressed)
 * Add a technology by adding a string to a group's `items`. Each tool lives in exactly one place.
 */
export const skills = {
  languages: [
    { label: "Python", use: "AI · FastAPI", primary: true },
    { label: "Java", use: "Spring Boot · Android", primary: true },
    { label: "Dart", use: "Flutter", primary: true },
    { label: "SQL", use: "PostgreSQL · Supabase" },
    { label: "JavaScript", use: "React · web" },
    { label: "C", use: "Fundamentals" },
  ],
  languagesSummary: "Python for AI, Java for services that can’t fall over, Dart for apps.",

  domains: [
    {
      id: "ai",
      code: "AI / ML",
      tag: "core",
      title: "AI & agents",
      summary: "LLM systems that retrieve, reason and act on real data.",
      headline: ["Agents", "RAG", "Embeddings", "Vector search"],
      groups: [
        { name: "Agentic AI", items: ["LLM agents", "Tool use", "Multi-step workflows"] },
        { name: "Retrieval (RAG)", items: ["Embeddings", "Vector search", "Chunking & retrieval"] },
        { name: "Vector stores", items: ["Qdrant", "Pinecone", "pgvector"] },
        { name: "Model integration", items: ["LLMs", "Model APIs"] },
      ],
    },
    {
      id: "backend",
      code: "BACKEND",
      tag: "core",
      title: "Backend",
      summary: "APIs that stay calm under load — Python where AI lives, Java where nothing may fall over.",
      headline: ["Spring Boot", "FastAPI", "REST", "Security"],
      groups: [
        { name: "Frameworks", items: ["Spring Boot", "FastAPI"] },
        { name: "APIs & realtime", items: ["REST APIs", "WebSockets"] },
        { name: "Security", items: ["Spring Security", "JWT"] },
        { name: "Persistence", items: ["JPA / Hibernate", "JDBC"] },
      ],
    },
    {
      id: "mobile",
      code: "MOBILE",
      title: "Mobile",
      summary: "Cross-platform apps in Flutter — where the AI features meet people’s hands.",
      headline: ["Flutter", "State management", "Native"],
      groups: [
        { name: "Framework", items: ["Flutter"] },
        { name: "State management", items: ["Riverpod", "BLoC"] },
        { name: "Networking & routing", items: ["Dio", "GoRouter"] },
        { name: "Architecture", items: ["GetIt", "Freezed", "json_serializable"] },
        { name: "Storage & services", items: ["Hive", "Firebase"] },
        { name: "Native integration", items: ["Android (Java)"] },
      ],
    },
    {
      id: "data",
      code: "DATA",
      title: "Data",
      summary: "Schemas designed first — relational by default, documents when the shape is loose.",
      headline: ["PostgreSQL", "Supabase", "MongoDB", "Redis"],
      groups: [
        { name: "Relational", items: ["PostgreSQL", "Supabase", "Neon"] },
        { name: "Document", items: ["MongoDB"] },
        { name: "Key-value & cache", items: ["Redis"] },
        { name: "Modelling", items: ["Schema design", "Query tuning"] },
      ],
    },
    {
      id: "tools",
      code: "TOOLS",
      title: "Tools & cloud",
      summary: "From laptop to production — containers, cloud and the edge.",
      headline: ["Git", "Docker", "OCI", "Cloudflare"],
      groups: [
        { name: "Source control", items: ["Git"] },
        { name: "Containers", items: ["Docker"] },
        { name: "Cloud & edge", items: ["OCI", "Cloudflare"] },
        { name: "Media", items: ["Cloudinary"] },
      ],
    },
    {
      id: "frontend",
      code: "FRONTEND",
      tag: "roots",
      title: "Frontend",
      summary: "Where I started — interfaces that feel considered, this one included.",
      headline: ["React", "Tailwind", "UI architecture"],
      groups: [
        { name: "Framework", items: ["React"] },
        { name: "Styling & build", items: ["Tailwind CSS", "Vite"] },
        { name: "Practice", items: ["UI architecture", "Responsive design"] },
      ],
    },
  ],

  // keyboard rows on tablet/desktop (weights = relative key width)
  layout: [
    [
      { id: "ai", w: 1.45 },
      { id: "backend", w: 1.45 },
      { id: "mobile", w: 1.1 },
    ],
    [
      { id: "data", w: 1.2 },
      { id: "tools", w: 1.1 },
      { id: "frontend", w: 1 },
    ],
  ],

  filters: [
    { id: "ai", label: "AI / ML" },
    { id: "backend", label: "Backend" },
    { id: "mobile", label: "Mobile" },
    { id: "data", label: "Data" },
    { id: "frontend", label: "Frontend" },
    { id: "tools", label: "Tools" },
    { id: "languages", label: "Languages" },
  ],

  dsa: {
    title: "Data structures & algorithms",
    topics: ["Arrays", "Trees", "Graphs", "Dynamic programming", "Backtracking"],
  },
};

export const journey = [
  {
    when: "Now",
    title: "Jr. AI Engineer — agents, RAG and LLM systems",
    body: "Building agentic workflows and retrieval pipelines on FastAPI and Spring Boot, shipping Flutter apps, and keeping up daily DSA on LeetCode.",
    meta: "LLMs · FastAPI · Spring Boot · Flutter",
    live: true,
  },
  {
    when: "2024",
    title: "National finalist, Sheriyans Coding School Hackathon",
    body: "Cleared rounds one to three against teams from across India, shipping full-stack prototypes against the clock with my team.",
    meta: "September 2024",
    photo: "hackathon",
  },
  {
    when: "2023",
    title: "Java backend intern, Surtle Security",
    body: "Built server-side modules in Java, picked up production security practice and shipped inside a live agile team.",
    meta: "Kolkata · Internship",
  },
  {
    when: "2022",
    title: "Diploma in Computer Science & Technology",
    body: "Behala Government Polytechnic — where self-taught curiosity met operating systems, object-oriented design and relational databases.",
    meta: "Behala Government Polytechnic",
  },
  {
    when: "Before",
    title: "Where it started",
    body: "Finished school, moved from Delhi to Kolkata and started teaching myself Java and the web, one small project at a time.",
    meta: "Delhi → Kolkata",
  },
];

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
