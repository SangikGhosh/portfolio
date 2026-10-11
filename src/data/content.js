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
  { label: "Journey", target: "journey", count: 7 },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
];

export const hero = {
  // three short lines, centred under the name
  lines: ["Jr. AI engineer and backend", "developer based in India", "[ Kolkata ]"],
  approach:
    "Calm, dependable systems: agents that retrieve and reason, and the services that keep them honest.",
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
  "I build AI systems that retrieve, reason and act on real data, and the calm, dependable services underneath them. I started in frontend, so I still care how it all feels.";

export const stack = ["LLMs & RAG", "Python", "FastAPI", "Spring Boot", "Flutter", "Java"];

/* `cover` picks the typographic cover drawn for each project (see components/work/covers.jsx).
   `building: true` marks work in progress: shown in the grid, but it has no project page yet. */
export const projects = [
  {
    id: "lectra",
    name: "Lectra",
    year: "2026",
    kind: "In progress",
    title: "A digital classroom for coaching batches.",
    building: true,
    cover: "image",
    image: {
      src: "https://res.cloudinary.com/dq2dnhli5/image/upload/f_auto,q_auto,w_1600/portfolio/lectra-poster",
      alt: "Lectra, a classroom app in development: its splash screen on a phone over a peach, lavender and pink gradient",
    },
  },
  {
    id: "greenroute",
    name: "GreenRoute",
    year: "2026",
    role: "Flutter app lead",
    kind: "Mobile app",
    tags: ["Flutter", "AI scanning", "Hackathon"],
    title: "Photograph your waste. Get paid to sort it.",
    body: "A community waste and circular-economy platform built at IEMHACKS 4.0 with a team of four, for Howrah and North 24 Parganas. A vision model identifies, prices and bins every item in one photo; collectors run road-optimised pickup routes; recyclers buy sorted lots from a live market. I built the Flutter app, all three roles in one codebase, on our Spring Boot API.",
    flow: [
      {
        step: "Scan",
        text: "A citizen photographs their waste. YOLOv8 finds every object and returns material, bin colour, price range, carbon saved and points.",
      },
      {
        step: "Hand over",
        text: "Request a doorstep pickup, or drop it at the nearest collection point, ranked by real road time and worth more points.",
      },
      {
        step: "Collect",
        text: "Collectors claim jobs first-come, drive stops ordered on real roads, then weigh and pay. Points are credited only on completion.",
      },
      {
        step: "Sell",
        text: "Recyclers buy sorted, weighed lots straight from households, with an atomic purchase and a full wallet ledger.",
      },
    ],
    facts: [
      { value: "3 roles", label: "citizen, collector and recycler in one app" },
      { value: "16", label: "waste types identified and priced" },
      { value: "45", label: "REST endpoints behind it" },
    ],
    stack: ["Flutter", "Riverpod", "GoRouter", "flutter_map", "Spring Boot", "YOLOv8"],
    links: [
      { label: "Live site", href: "https://www.greenroutehere.tech" },
      { label: "View source", href: "https://github.com/SangikGhosh/iemhacksHackathon" },
    ],
    cover: "video",
    video: {
      src: "https://res.cloudinary.com/dq2dnhli5/video/upload/q_auto,vc_h264/portfolio/greenroute-demo-v2.mp4",
      poster: "https://res.cloudinary.com/dq2dnhli5/video/upload/so_14.5,q_auto,w_1600/portfolio/greenroute-demo-v2.jpg",
      label: "GreenRoute app walkthrough: scanning waste, a collector's route, and the recycler market",
    },
  },
  {
    id: "relay",
    name: "Relay",
    year: "2026",
    role: "Solo full-stack developer",
    kind: "Real-time chat",
    tags: ["Real-time", "Spring Boot", "WebSockets"],
    title: "Rooms where messages land the moment they’re sent.",
    body: "A real-time team chat: rooms with invite codes, live typing, instant delivery on every device, and owner controls. A Spring Boot API with a Netty Socket.IO server underneath, a React and TypeScript client on top. People live in PostgreSQL, messages in MongoDB, sign-up codes in Redis.",
    flow: [
      {
        step: "Sign up",
        text: "Email and password confirmed with a 4-digit code held in Redis for ten minutes, or Google sign-in. Every session is a signed JWT.",
      },
      {
        step: "Make a room",
        text: "Each room gets an 8-character invite code and a QR. Teammates join with the code and see the full history.",
      },
      {
        step: "Talk live",
        text: "A Netty Socket.IO server, keyed by invite code, pushes messages and typing events to everyone in the room the instant they happen.",
      },
      {
        step: "Stay in control",
        text: "Owners see who’s in, remove members, or switch on announcement mode so every member’s composer locks at once.",
      },
    ],
    facts: [
      { value: "Live", label: "messages, typing and permissions over sockets" },
      { value: "2 stores", label: "PostgreSQL for people, MongoDB for messages" },
      { value: "JWT", label: "with Google OAuth and email OTP" },
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS 4", "Spring Boot", "netty-socketio", "Redis", "PostgreSQL", "MongoDB"],
    links: [
      { label: "Frontend source", href: "https://github.com/SangikGhosh/webchatapp-frontend" },
      { label: "Backend source", href: "https://github.com/SangikGhosh/WebChatApp-Backend" },
    ],
    cover: "video",
    video: {
      src: "https://res.cloudinary.com/dq2dnhli5/video/upload/q_auto,vc_h264/portfolio/relay-demo-v3.mp4",
      poster: "https://res.cloudinary.com/dq2dnhli5/video/upload/so_26,q_auto,w_1600/portfolio/relay-demo-v3.jpg",
      label: "Relay walkthrough: signing in, switching rooms, live chat between desktop and phone, and room controls",
    },
  },
  {
    id: "filehider",
    name: "FileHider",
    year: "2024",
    role: "Solo developer",
    kind: "Backend",
    tags: ["Java", "JDBC", "Email OTP"],
    title: "Private files, behind a one-time password.",
    body: "A Java command-line service that hides files by taking them off the disk entirely and holding them in MySQL. Every sign-up and every login is confirmed with a one-time code sent by email, and a file only comes back to the exact path it left when its owner asks for it.",
    flow: [
      {
        step: "Sign up",
        text: "Name, email and password. The account is saved only after the 4-digit code sent to that inbox is typed back in.",
      },
      {
        step: "Log in",
        text: "The password is checked against MySQL, then a fresh one-time code goes out over Gmail SMTP. Two checks before anything opens.",
      },
      {
        step: "Hide",
        text: "Point it at a file: its contents, name, path and owner are written to the database, and the original is deleted from disk.",
      },
      {
        step: "Restore",
        text: "Pick one of your own files by ID. It is written back to where it came from and its database row is removed.",
      },
    ],
    facts: [
      { value: "2-step", label: "password, then email OTP" },
      { value: "Off-disk", label: "files held in MySQL until restored" },
      { value: "4 layers", label: "views, services, DAOs, JDBC" },
    ],
    stack: ["Java 17", "JDBC", "MySQL", "JavaMail (SMTP)", "Maven"],
    links: [{ label: "View source", href: "https://github.com/SangikGhosh/FileHiderService" }],
    cover: "vault",
  },
];

/* Projects with their own page, in grid order. */
export const caseProjects = projects.filter((p) => !p.building);

/* `href` makes the row a link; `result` is the line it earned. */
export const archive = [
  {
    year: "2024",
    title: "TechHub Club Platform",
    note: "Community portal for workshops, challenges and open-source collaboration",
    stack: "React · Tailwind CSS",
    status: "Private",
  },
  {
    year: "2023",
    title: "Render.com, reimagined",
    note: "A ground-up redesign of Render’s cloud-platform site, built as a hackathon team",
    result: "Round 3 · Top 10",
    stack: "React · Tailwind CSS",
    status: "Live",
    href: "https://reimagin-eight.vercel.app/",
  },
  {
    year: "2023",
    title: "MLBB Portal",
    note: "Community portal for Mobile Legends players, with hero metrics, guides and match updates",
    result: "Qualified for round 3 · Top 25 of 650+",
    stack: "React · Interactive UI",
    status: "Live",
    href: "https://mlbb-chi.vercel.app/",
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
    "I started out as a frontend engineer, which is why I still care how things feel. From multi-factor encryption in Java to retrieval pipelines, I try to write code that is readable, testable and aimed at a real problem, not a demo.",
  ],
  facts: [
    { k: "Based in", v: "Kolkata, India · IST" },
    { k: "Now", v: "Junior AI Engineer at Opacity AI" },
    { k: "Studying", v: "B.Tech, CSE (AI & ML), Heritage Institute of Technology" },
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
    summary: "APIs that stay calm under load. Python where AI lives, Java where nothing may fall over.",
    tools: ["Spring Boot", "FastAPI", "REST", "WebSockets", "Spring Security", "JWT", "JPA"],
  },
  {
    title: "Mobile",
    summary: "Cross-platform apps in Flutter, where the AI features meet people’s hands.",
    tools: ["Flutter", "Riverpod", "BLoC", "Dio", "GoRouter", "Hive", "Firebase"],
  },
  {
    title: "Data",
    summary: "Schemas designed first. Relational by default, documents when the shape is loose.",
    tools: ["PostgreSQL", "Supabase", "Neon", "MongoDB", "Redis"],
  },
  {
    title: "Tools & cloud",
    summary: "From laptop to production: containers, cloud and the edge.",
    tools: ["Git", "Docker", "OCI", "Cloudflare", "Cloudinary"],
  },
  {
    title: "Frontend",
    summary: "Where I started. Interfaces that feel considered, this one included.",
    tools: ["React", "Tailwind CSS", "Vite", "Responsive UI"],
  },
];

export const languages = ["Python", "Java", "Dart", "SQL", "JavaScript", "C"];

export const journey = [
  {
    when: "Now",
    title: "Junior AI Engineer, Opacity AI",
    body: "Working on AI automation, backend engineering, agentic workflows, RAG and LLM-powered applications. I started on the frontend team before moving into AI engineering.",
    live: true,
  },
  {
    when: "2025",
    title: "B.Tech in Computer Science (AI & ML)",
    body: "Joined Heritage Institute of Technology, Kolkata, for a B.Tech in Computer Science and Engineering, specialising in Artificial Intelligence and Machine Learning.",
    photo: "btech",
  },
  {
    when: "2025",
    title: "Diploma in Computer Science & Technology",
    body: "Completed my diploma at Behala Government Polytechnic after three years of programming, software development, databases and computer science fundamentals.",
    photo: "farewell",
  },
  {
    when: "2024",
    title: "Learning, building and growing",
    body: "A full year of diploma life, friends and hands-on work. Explored Spring Boot and FastAPI and built several projects, learning to turn ideas into real applications.",
    photo: "friends",
  },
  {
    when: "2023",
    title: "National finalist, Sheryians Coding School Hackathon",
    body: "Reached the national finals as part of a finalist team, competing with developers from across India and building against tight deadlines.",
    photo: "hackathon",
  },
  {
    when: "2022",
    title: "Started my diploma",
    body: "Enrolled at Behala Government Polytechnic to study Computer Science and Technology, the start of my formal technical education.",
    photo: "diploma",
  },
  {
    when: "Before",
    title: "Where it all started",
    body: "Finished school at Government Sponsored Multipurpose School for Boys, Taki House, where I first got curious about computers and how software works.",
    photo: "classroom",
  },
];

export const contact = {
  // Each pair scrolls past once per loop: a big line, then the small note beside it.
  marquee: [
    ["Let’s talk", "Have a role or an idea? Good. That’s what the first message is for."],
    ["Hiring?", "Open to full-time roles in AI and backend engineering."],
    ["Have a project?", "Agents, APIs or a Flutter app. Freelance work is welcome."],
    ["Say hello", "Questions, feedback or just a good idea. I read every note."],
  ],
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
