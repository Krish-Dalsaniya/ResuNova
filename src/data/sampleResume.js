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
  sectionOrder: [
    "summary",
    "experience",
    "projects",
    "skills",
    "education",
    "certifications",
    "languages"
  ],
  sectionSettings: {
    summary: { visible: true, title: "Professional Summary" },
    experience: { visible: true, title: "Work Experience" },
    projects: { visible: true, title: "Key Projects" },
    skills: { visible: true, title: "Skills & Proficiencies" },
    education: { visible: true, title: "Education" },
    certifications: { visible: true, title: "Certifications" },
    languages: { visible: true, title: "Languages" }
  },
  customSections: []
};

export const defaultSectionOrder = [
  "summary",
  "experience",
  "projects",
  "skills",
  "education",
  "certifications",
  "languages"
];

export const defaultSectionSettings = {
  summary: { visible: true, title: "Professional Summary" },
  experience: { visible: true, title: "Work Experience" },
  projects: { visible: true, title: "Key Projects" },
  skills: { visible: true, title: "Skills & Proficiencies" },
  education: { visible: true, title: "Education" },
  certifications: { visible: true, title: "Certifications" },
  languages: { visible: true, title: "Languages" }
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
  sectionOrder: [
    "summary",
    "experience",
    "projects",
    "skills",
    "education",
    "certifications",
    "languages"
  ],
  sectionSettings: {
    summary: { visible: true, title: "Professional Summary" },
    experience: { visible: true, title: "Work Experience" },
    projects: { visible: true, title: "Key Projects" },
    skills: { visible: true, title: "Skills & Proficiencies" },
    education: { visible: true, title: "Education" },
    certifications: { visible: true, title: "Certifications" },
    languages: { visible: true, title: "Languages" }
  },
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

export const fontSizes = [
  { id: "compact", name: "Compact (9pt)", label: "9pt", scale: 0.90, desc: "High density for 1-page resumes" },
  { id: "regular", name: "Regular (10pt)", label: "10pt", scale: 1.0, desc: "Balanced standard reading size" },
  { id: "large", name: "Large (11pt)", label: "11pt", scale: 1.10, desc: "Spacious text for short career history" }
];

export const headerStyles = [
  { id: "underline", name: "Modern Underline", icon: "━", desc: "Solid colored rule beneath titles" },
  { id: "left-bar", name: "Left Accent Bar", icon: "▎", desc: "Vertical colored bar on the left" },
  { id: "badge", name: "Subtle Badge", icon: "🏷️", desc: "Soft background highlight badge" },
  { id: "minimal", name: "Pure Typography", icon: "Aa", desc: "Clean minimalist typography" }
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

export const initialCoverLetterData = {
  recipient: {
    hiringManager: "Sarah Jenkins",
    roleTitle: "Director of Engineering",
    company: "CloudScale Technologies",
    address: "100 Market Street, Suite 400",
    cityStateZip: "San Francisco, CA 94105",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  },
  letter: {
    salutation: "Dear Ms. Jenkins,",
    subject: "Application for Senior Full-Stack Software Engineer",
    intro: "I am writing to express my enthusiastic interest in the Senior Full-Stack Software Engineer position at CloudScale Technologies. With over 7 years of experience architecting distributed cloud systems, scaling microservices for 2M+ users, and leading collaborative agile squads, I am confident in my ability to make an immediate impact on your platform engineering goals.",
    body1: "Throughout my career, I have focused on delivering reliable, high-throughput applications that bridge business objectives with technical excellence. At Nexus Digital Labs, I engineered real-time collaborative interfaces using WebSockets and CRDTs with 99.98% synchronization consistency, while designing a shared UI component system that accelerated feature delivery by 25%. Earlier at Vanguard Systems, I automated payment processing pipelines handling $12M+ monthly transaction volume.",
    body2: "What excites me most about CloudScale Technologies is your commitment to pushing the boundaries of real-time developer tooling and scalable cloud infrastructure. I thrive in environments where engineering teams take ownership of end-to-end quality, and I look forward to bringing my background in GraphQL federation, TypeScript microservices, and performance optimization to your upcoming platform roadmap.",
    conclusion: "Thank you for your time and consideration. I would welcome the opportunity to discuss how my technical leadership and background align with CloudScale Technologies' vision.",
    signOff: "Sincerely,",
    signatureName: "Alex Morgan"
  }
};

export const coverLetterPresets = [
  {
    id: "tech",
    name: "Software & Technology",
    icon: "💻",
    description: "Tailored for Software Engineers, Full-Stack Developers, and Tech Leads.",
    data: {
      recipient: {
        hiringManager: "Sarah Jenkins",
        roleTitle: "Director of Engineering",
        company: "CloudScale Technologies",
        address: "100 Market Street, Suite 400",
        cityStateZip: "San Francisco, CA 94105",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      },
      letter: {
        salutation: "Dear Ms. Jenkins,",
        subject: "Application for Senior Full-Stack Software Engineer",
        intro: "I am writing to express my enthusiastic interest in the Senior Full-Stack Software Engineer position at CloudScale Technologies. With over 7 years of experience architecting distributed cloud systems, scaling microservices for 2M+ users, and leading collaborative agile squads, I am confident in my ability to make an immediate impact on your platform engineering goals.",
        body1: "Throughout my career, I have focused on delivering reliable, high-throughput applications that bridge business objectives with technical excellence. At Nexus Digital Labs, I engineered real-time collaborative interfaces using WebSockets and CRDTs with 99.98% synchronization consistency, while designing a shared UI component system that accelerated feature delivery by 25%. Earlier at Vanguard Systems, I automated payment processing pipelines handling $12M+ monthly transaction volume.",
        body2: "What excites me most about CloudScale Technologies is your commitment to pushing the boundaries of real-time developer tooling and scalable cloud infrastructure. I thrive in environments where engineering teams take ownership of end-to-end quality, and I look forward to bringing my background in GraphQL federation, TypeScript microservices, and performance optimization to your upcoming platform roadmap.",
        conclusion: "Thank you for your time and consideration. I would welcome the opportunity to discuss how my technical leadership and background align with CloudScale Technologies' vision.",
        signOff: "Sincerely,",
        signatureName: "Alex Morgan"
      }
    }
  },
  {
    id: "product",
    name: "Product & Leadership",
    icon: "🎯",
    description: "Strategic narrative for Product Managers, Operations, and Team Leads.",
    data: {
      recipient: {
        hiringManager: "David Miller",
        roleTitle: "VP of Product",
        company: "Apex Innovations Group",
        address: "500 Howard Street",
        cityStateZip: "San Francisco, CA 94105",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      },
      letter: {
        salutation: "Dear Mr. Miller,",
        subject: "Application for Senior Technical Product Manager",
        intro: "I am excited to submit my application for the Senior Technical Product Manager role at Apex Innovations Group. Having guided complex SaaS products from early customer discovery through multi-million dollar annual recurring revenue, I am eager to help scale your next generation of enterprise offerings.",
        body1: "In my previous positions, I have built a track record of translating complex technical constraints into clear product roadmaps that delight end-users. By establishing metric-driven sprint prioritization and working closely with engineering, UX, and sales leaders, I led initiatives that increased user engagement by 42% and reduced customer churn by 18% over four consecutive quarters.",
        body2: "Apex Innovations' customer-first philosophy and rapid product cadence strongly resonate with my operational values. I bring a combination of technical depth, rigorous hypothesis testing, and cross-functional leadership that ensures products are built efficiently and delivered on time.",
        conclusion: "I would appreciate the chance to discuss how my product strategy and operational rigor can contribute to Apex Innovations' growth targets.",
        signOff: "Best regards,",
        signatureName: "Alex Morgan"
      }
    }
  },
  {
    id: "graduate",
    name: "Entry-Level & Graduate",
    icon: "🎓",
    description: "Designed for recent graduates and career changers showcasing potential.",
    data: {
      recipient: {
        hiringManager: "University Recruiting Team",
        roleTitle: "Campus & Early Career Programs",
        company: "Pinnacle Software Labs",
        address: "250 University Avenue",
        cityStateZip: "Palo Alto, CA 94301",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      },
      letter: {
        salutation: "Dear Hiring Team,",
        subject: "Application for Associate Software Engineer — Early Career",
        intro: "As a recent Computer Science graduate with a strong academic foundation in algorithms, systems programming, and full-stack web development, I am eager to begin my professional career as an Associate Software Engineer at Pinnacle Software Labs.",
        body1: "During my academic tenure, I served as lead developer on an open-source collaborative project that earned departmental honors and was adopted by over 1,500 active campus users. My internship experience gave me hands-on practice collaborating in agile sprints, writing unit and integration tests, and optimizing database queries in production-like environments.",
        body2: "I have closely followed Pinnacle Software Labs' recent engineering blog posts on modern web performance and developer tooling. Your dedication to engineering mentorship and continuous learning represents the ideal environment for me to contribute meaningful code while learning from seasoned domain experts.",
        conclusion: "Thank you for reviewing my application. I would be thrilled to speak with your team about how my foundational training, passion for clean code, and rapid learning ability can benefit your team.",
        signOff: "Sincerely,",
        signatureName: "Alex Morgan"
      }
    }
  },
  {
    id: "creative",
    name: "Design & Creative",
    icon: "🎨",
    description: "Compelling storytelling for UI/UX Designers, Creatives, and Brand Strategists.",
    data: {
      recipient: {
        hiringManager: "Elena Rostova",
        roleTitle: "Creative Director",
        company: "Studio Vanguard Design",
        address: "742 Evergreen Terrace",
        cityStateZip: "New York, NY 10012",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      },
      letter: {
        salutation: "Dear Ms. Rostova,",
        subject: "Application for Senior UI/UX & Product Designer",
        intro: "I am writing to express my enthusiasm for the Senior UI/UX & Product Designer opening at Studio Vanguard Design. With a passion for human-centered design systems, micro-interactions, and accessible digital products, I would love to bring my design craft to your award-winning team.",
        body1: "Over the past 6 years, I have spearheaded end-to-end design overhauls for cross-platform applications, working closely with engineering partners to ensure design fidelity from Figma prototypes to production release. My design systems have decreased front-end design debt by 30% while creating cohesive visual identities across responsive web and mobile touchpoints.",
        body2: "Studio Vanguard's reputation for pairing elegant aesthetics with thoughtful interaction design inspires my creative approach. I thrive at the intersection of aesthetic refinement and user research, ensuring every pixel serves a purposeful functional outcome.",
        conclusion: "I welcome the opportunity to walk you through my portfolio and discuss how my design vision aligns with your upcoming client projects.",
        signOff: "Warm regards,",
        signatureName: "Alex Morgan"
      }
    }
  }
];

