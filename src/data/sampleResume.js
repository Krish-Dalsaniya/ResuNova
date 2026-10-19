export const initialResumeData = {
  personalInfo: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full-Stack Software Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 382-9102",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    showAvatar: true
  },
  summary: "Results-driven Senior Full-Stack Engineer with 7+ years of experience architecting high-performance cloud applications and distributed systems. Expert in React, TypeScript, Node.js, and cloud native architectures. Led cross-functional engineering squads delivering enterprise SaaS solutions scaled to 2M+ daily active users.",
  experience: [
    {
      id: "exp-1",
      role: "Lead Full-Stack Engineer",
      company: "CloudScale Technologies",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      current: true,
      description: "Spearheaded core microservices architecture and interactive customer dashboards.",
      highlights: [
        "Architected and deployed a multi-tenant real-time analytics engine processing 45M+ events daily with sub-50ms latency.",
        "Mentored a team of 9 software engineers and championed TypeScript adoption, reducing production defect rate by 34%.",
        "Refactored legacy REST APIs into modern GraphQL federation, cutting frontend payload sizes by 40%."
      ]
    },
    {
      id: "exp-2",
      role: "Senior Frontend Engineer",
      company: "Nexus Digital Labs",
      location: "Austin, TX",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      description: "Led frontend development of next-generation collaborative workspace product.",
      highlights: [
        "Engineered real-time document editing interface using WebSockets and CRDTs with 99.98% sync consistency.",
        "Created an internal UI component design system adopted by 6 engineering teams, improving sprint delivery velocity by 25%.",
        "Optimized client-side rendering pipeline and bundle chunking, improving Core Web Vitals to 98+ score."
      ]
    },
    {
      id: "exp-3",
      role: "Software Developer",
      company: "Vanguard Systems",
      location: "Seattle, WA",
      startDate: "2017-08",
      endDate: "2019-05",
      current: false,
      description: "Developed customer portal modules and internal business logic APIs.",
      highlights: [
        "Built automated payment processing workflow integrated with Stripe API handling $12M+ monthly volume.",
        "Wrote end-to-end integration test suites boosting code coverage from 55% to 88%."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2013-09",
      endDate: "2017-05",
      grade: "3.85 GPA",
      honors: "Dean's Honor List, Magna Cum Laude"
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React / Next.js", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Tailwind / Vanilla CSS", level: 5 },
        { name: "Vue.js", level: 4 },
        { name: "State Management (Redux/Zustand)", level: 5 }
      ]
    },
    {
      category: "Backend & Cloud",
      items: [
        { name: "Node.js / Express", level: 5 },
        { name: "Python / FastAPI", level: 4 },
        { name: "PostgreSQL & Redis", level: 5 },
        { name: "AWS (ECS, Lambda, S3)", level: 4 },
        { name: "Docker & Kubernetes", level: 4 }
      ]
    },
    {
      category: "Architecture & Practices",
      items: [
        { name: "Microservices & Distributed Systems", level: 5 },
        { name: "CI/CD & DevOps Automation", level: 4 },
        { name: "System Design & Scalability", level: 5 },
        { name: "Agile & Team Leadership", level: 5 }
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "PulseStream Realtime Analytics",
      role: "Creator & Lead Maintainer",
      link: "https://github.com/example/pulsestream",
      technologies: "React, Node.js, ClickHouse, Apache Kafka",
      highlights: [
        "Open-source data telemetry pipeline used by 1,200+ organizations.",
        "Featured on Hacker News front page with 3.4k GitHub stars."
      ]
    },
    {
      id: "proj-2",
      name: "AI DocAssist Plugin",
      role: "Solo Architect",
      link: "https://example.com/docassist",
      technologies: "Next.js, OpenAI API, Vector DB, WebAssembly",
      highlights: [
        "Chrome extension enabling semantic context-aware note taking with 25k+ active weekly installs."
      ]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialUrl: "https://aws.amazon.com/verify"
    },
    {
      id: "cert-2",
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2022",
      credentialUrl: "https://cncf.io/verify"
    }
  ],
  languages: [
    { id: "lang-1", name: "English", level: "Native / Bilingual" },
    { id: "lang-2", name: "Spanish", level: "Professional Working" },
    { id: "lang-3", name: "German", level: "Elementary" }
  ],
  customSections: []
};

export const emptyResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    avatar: "",
    showAvatar: false
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  customSections: []
};

export const colorThemes = [
  { id: "navy", name: "Executive Navy", primary: "#1e3a8a", secondary: "#3b82f6", accent: "#dbeafe", text: "#1e293b", bgSidebar: "#f8fafc" },
  { id: "emerald", name: "Forest Emerald", primary: "#065f46", secondary: "#10b981", accent: "#d1fae5", text: "#1f2937", bgSidebar: "#f0fdf4" },
  { id: "burgundy", name: "Classic Burgundy", primary: "#831843", secondary: "#db2777", accent: "#fce7f3", text: "#18181b", bgSidebar: "#fdf2f8" },
  { id: "charcoal", name: "Modern Charcoal", primary: "#1f2937", secondary: "#4b5563", accent: "#e5e7eb", text: "#111827", bgSidebar: "#f9fafb" },
  { id: "indigo", name: "Royal Indigo", primary: "#3730a3", secondary: "#6366f1", accent: "#e0e7ff", text: "#1e1b4b", bgSidebar: "#eef2ff" },
  { id: "teal", name: "Nordic Teal", primary: "#115e59", secondary: "#14b8a6", accent: "#ccfbf1", text: "#134e4a", bgSidebar: "#f0fdfa" },
  { id: "amber", name: "Warm Amber", primary: "#92400e", secondary: "#d97706", accent: "#fef3c7", text: "#292524", bgSidebar: "#fffbeb" },
  { id: "slate", name: "Minimal Slate", primary: "#334155", secondary: "#64748b", accent: "#f1f5f9", text: "#0f172a", bgSidebar: "#f8fafc" }
];

export const fontFamilies = [
  { id: "jakarta", name: "Plus Jakarta Sans", font: "'Plus Jakarta Sans', sans-serif" },
  { id: "inter", name: "Inter (Modern)", font: "'Inter', sans-serif" },
  { id: "outfit", name: "Outfit (Geometric)", font: "'Outfit', sans-serif" },
  { id: "merriweather", name: "Merriweather (Serif)", font: "'Merriweather', serif" },
  { id: "roboto-slab", name: "Roboto Slab (Editorial)", font: "'Roboto Slab', serif" }
];

export const templates = [
  {
    id: "executive",
    name: "Executive Split",
    tagline: "NovoResume Signature Two-Column",
    description: "Distinctive sidebar with clean timeline, ideal for experienced professionals & tech leads.",
    thumbnail: "executive"
  },
  {
    id: "minimal",
    name: "Modern Minimal",
    tagline: "High ATS Single Column",
    description: "Sleek and highly readable single-column layout optimized for ATS screening algorithms.",
    thumbnail: "minimal"
  },
  {
    id: "techduo",
    name: "Tech Duo",
    tagline: "Modern Engineering Grid",
    description: "Two-column layout highlighting skills, open-source projects, and technical proficiencies.",
    thumbnail: "techduo"
  },
  {
    id: "creative",
    name: "Creative Accent",
    tagline: "Bold Banner & Photo Frame",
    description: "Dynamic top color banner with prominent contact grid and skill proficiency meters.",
    thumbnail: "creative"
  },
  {
    id: "compact",
    name: "Compact Corporate",
    tagline: "Maximum Density One-Pager",
    description: "Dense and structured layout designed to fit extensive career history onto a single clean page.",
    thumbnail: "compact"
  },
  {
    id: "timeline",
    name: "Novo Timeline",
    tagline: "Connected Milestone Track",
    description: "Signature connected vertical timeline linking roles, projects, and education with node markers.",
    thumbnail: "timeline"
  },
  {
    id: "elegant",
    name: "Classic Elegant",
    tagline: "Refined Serif & Academic",
    description: "Prestigious layout with classic serif typography, subtle dividers, and clean dual-column grids.",
    thumbnail: "elegant"
  },
  {
    id: "graduate",
    name: "College Graduate",
    tagline: "Credentials Sidebar",
    description: "Designed for students, recent grads, and career changers, prioritizing projects and coursework.",
    thumbnail: "graduate"
  }
];
