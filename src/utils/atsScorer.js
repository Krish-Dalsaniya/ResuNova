/**
 * ResuNova ATS Scorer & Content Optimizer Engine
 * Evaluates resumes against modern Applicant Tracking System (ATS) guidelines,
 * keyword density, quantifiable metrics, and active phrasing.
 */

// Power verbs dictionary grouped by functional competency
export const POWER_VERBS = {
  leadership: [
    "Spearheaded", "Orchestrated", "Directed", "Championed", "Steered",
    "Governed", "Mobilized", "Empowered", "Mentored", "Delegated",
    "Cultivated", "Guided", "Navigated", "Formulated", "Supervised"
  ],
  engineering: [
    "Architected", "Engineered", "Deployed", "Refactored", "Automated",
    "Optimized", "Configured", "Implemented", "Integrated", "Debugged",
    "Constructed", "Standardized", "Centralized", "Containerized", "Provisioned"
  ],
  growth: [
    "Accelerated", "Maximized", "Amplified", "Outperformed", "Surpassed",
    "Boosted", "Escalated", "Generated", "Doubled", "Elevated",
    "Captivated", "Monetized", "Expanded", "Strengthened", "Capitalized"
  ],
  innovation: [
    "Pioneered", "Transformed", "Modernized", "Overhauled", "Devised",
    "Invented", "Redesigned", "Streamlined", "Conceptualized", "Disrupted",
    "Crafted", "Revamped", "Re-engineered", "Restructured", "Initiated"
  ],
  collaboration: [
    "Facilitated", "Negotiated", "Partnered", "Synthesized", "Coordinated",
    "Liaised", "Unified", "Co-authored", "Advocated", "Mediated",
    "Fostered", "Consulted", "Allied", "Synchronized", "Brainstormed"
  ]
};

// Passive / Weak phrases to discourage
export const WEAK_PHRASES = [
  { weak: "responsible for", suggestion: "Led, Managed, Executed, Spearheaded" },
  { weak: "duties included", suggestion: "Delivered, Oversaw, Implemented" },
  { weak: "worked on", suggestion: "Engineered, Architected, Designed, Built" },
  { weak: "helped with", suggestion: "Facilitated, Supported, Accelerated" },
  { weak: "assisted in", suggestion: "Collaborated on, Contributed to, Co-developed" },
  { weak: "handled", suggestion: "Orchestrated, Resolved, Managed, Directed" },
  { weak: "part of a team", suggestion: "Partnered with, Collaborated across" }
];

// Regex for detecting quantifiable metrics (percentages, currency, numbers + units)
const METRIC_REGEX = /(\d+(\.\d+)?%|\$\d+[\d,]*(\.\d+)?|\b\d+\b\+?|\b\d+x\b|\b\d+\s*(users|clients|projects|million|billion|k|teams|engineers|customers|downloads|stars|requests|queries|seconds|ms)\b)/i;

/**
 * Calculates comprehensive ATS Score (0 - 100) and produces actionable checklist.
 */
export function calculateAtsScore(data = {}) {
  const {
    personalInfo = {},
    summary = "",
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = []
  } = data;

  const checks = [];
  let score = 0;

  // 1. Personal & Contact Information (Max: 20 pts)
  let contactScore = 0;
  
  if (personalInfo.fullName && personalInfo.fullName.trim().length >= 3) {
    contactScore += 5;
    checks.push({
      id: "contact_name",
      category: "Contact Info",
      title: "Full Name provided",
      description: "Applicant name is clearly defined for ATS header extraction.",
      passed: true,
      points: 5,
      maxPoints: 5
    });
  } else {
    checks.push({
      id: "contact_name",
      category: "Contact Info",
      title: "Missing Full Name",
      description: "Enter your full legal name so applicant parsing software identifies you.",
      passed: false,
      points: 0,
      maxPoints: 5,
      impact: "high"
    });
  }

  if (personalInfo.jobTitle && personalInfo.jobTitle.trim().length >= 3) {
    contactScore += 4;
    checks.push({
      id: "contact_title",
      category: "Contact Info",
      title: "Target Professional Title",
      description: `Target title "${personalInfo.jobTitle}" aligns with role keywords.`,
      passed: true,
      points: 4,
      maxPoints: 4
    });
  } else {
    checks.push({
      id: "contact_title",
      category: "Contact Info",
      title: "Missing Professional Job Title",
      description: "Include a specific role title (e.g. Senior Full-Stack Engineer) to match ATS job titles.",
      passed: false,
      points: 0,
      maxPoints: 4,
      impact: "high"
    });
  }

  const hasEmail = personalInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email.trim());
  const hasPhone = personalInfo.phone && personalInfo.phone.trim().length >= 7;

  if (hasEmail && hasPhone) {
    contactScore += 6;
    checks.push({
      id: "contact_methods",
      category: "Contact Info",
      title: "Email & Phone contact details",
      description: "Recruiters can reach out via direct phone and email.",
      passed: true,
      points: 6,
      maxPoints: 6
    });
  } else {
    checks.push({
      id: "contact_methods",
      category: "Contact Info",
      title: "Incomplete Contact Channels",
      description: "Ensure both a valid email address and phone number are present.",
      passed: false,
      points: hasEmail || hasPhone ? 3 : 0,
      maxPoints: 6,
      impact: "high"
    });
    if (hasEmail || hasPhone) contactScore += 3;
  }

  const hasSocial = (personalInfo.linkedin && personalInfo.linkedin.trim()) || 
                    (personalInfo.github && personalInfo.github.trim()) || 
                    (personalInfo.website && personalInfo.website.trim());

  if (hasSocial) {
    contactScore += 5;
    checks.push({
      id: "contact_social",
      category: "Contact Info",
      title: "Professional Profile / Portfolio link",
      description: "LinkedIn, GitHub, or online portfolio link detected.",
      passed: true,
      points: 5,
      maxPoints: 5
    });
  } else {
    checks.push({
      id: "contact_social",
      category: "Contact Info",
      title: "Add LinkedIn or Portfolio Link",
      description: "Recruiters are 71% more likely to schedule interviews when a verified profile URL is present.",
      passed: false,
      points: 0,
      maxPoints: 5,
      impact: "medium"
    });
  }

  score += contactScore;

  // 2. Executive / Professional Summary (Max: 15 pts)
  let summaryScore = 0;
  const summaryWords = summary ? summary.trim().split(/\s+/).filter(Boolean) : [];

  if (summaryWords.length >= 35 && summaryWords.length <= 110) {
    summaryScore += 15;
    checks.push({
      id: "summary_optimal",
      category: "Summary",
      title: "Optimal Summary Length (35-110 words)",
      description: `Your summary contains ${summaryWords.length} words, ideal for 6-second recruiter scans.`,
      passed: true,
      points: 15,
      maxPoints: 15
    });
  } else if (summaryWords.length > 0 && summaryWords.length < 35) {
    summaryScore += 8;
    checks.push({
      id: "summary_short",
      category: "Summary",
      title: "Summary is slightly brief",
      description: `Current summary has ${summaryWords.length} words. Expand to at least 35-40 words with career accomplishments.`,
      passed: false,
      points: 8,
      maxPoints: 15,
      impact: "medium"
    });
  } else if (summaryWords.length > 110) {
    summaryScore += 9;
    checks.push({
      id: "summary_long",
      category: "Summary",
      title: "Summary is too lengthy",
      description: `Current summary has ${summaryWords.length} words. Condense down to 3-4 concise impact sentences.`,
      passed: false,
      points: 9,
      maxPoints: 15,
      impact: "low"
    });
  } else {
    checks.push({
      id: "summary_missing",
      category: "Summary",
      title: "No Professional Summary",
      description: "A 3-sentence summary highlights your core value proposition before the work history.",
      passed: false,
      points: 0,
      maxPoints: 15,
      impact: "high"
    });
  }

  score += summaryScore;

  // 3. Work Experience & Quantifiable Impact (Max: 35 pts)
  let expScore = 0;
  const allHighlights = [];
  
  experience.forEach(exp => {
    if (exp.highlights && Array.isArray(exp.highlights)) {
      exp.highlights.forEach(h => {
        if (typeof h === 'string' && h.trim()) allHighlights.push(h.trim());
      });
    }
  });

  if (experience.length >= 1) {
    expScore += 10;
    checks.push({
      id: "exp_presence",
      category: "Experience",
      title: `${experience.length} Work Experience entr${experience.length === 1 ? 'y' : 'ies'} documented`,
      description: "Demonstrates consistent career trajectory and relevant background.",
      passed: true,
      points: 10,
      maxPoints: 10
    });
  } else {
    checks.push({
      id: "exp_presence",
      category: "Experience",
      title: "No Work Experience Entries",
      description: "Add your full-time, part-time, or contract positions.",
      passed: false,
      points: 0,
      maxPoints: 10,
      impact: "high"
    });
  }

  // Count quantifiable metrics in highlights
  let metricsCount = 0;
  allHighlights.forEach(h => {
    if (METRIC_REGEX.test(h)) metricsCount++;
  });

  if (metricsCount >= 3) {
    expScore += 15;
    checks.push({
      id: "exp_metrics",
      category: "Experience",
      title: `Strong Quantified Results (${metricsCount} metrics detected)`,
      description: "Bullets feature measurable statistics (%, $, user scale, performance multipliers).",
      passed: true,
      points: 15,
      maxPoints: 15
    });
  } else if (metricsCount >= 1) {
    expScore += 8;
    checks.push({
      id: "exp_metrics",
      category: "Experience",
      title: `Only ${metricsCount} measurable metric found`,
      description: "Add more quantifiable impact (e.g. 'boosted throughput by 35%', 'reduced latency by 120ms', 'managed $50k budget').",
      passed: false,
      points: 8,
      maxPoints: 15,
      impact: "high"
    });
  } else {
    checks.push({
      id: "exp_metrics",
      category: "Experience",
      title: "Zero Quantifiable Metrics Detected",
      description: "ATS algorithms favor concrete figures. Add numbers, percentages, or dollar savings to your bullet points.",
      passed: false,
      points: 0,
      maxPoints: 15,
      impact: "high"
    });
  }

  // Detect Action Verbs starting bullets
  const flattenedVerbs = Object.values(POWER_VERBS).flat().map(v => v.toLowerCase());
  let actionVerbCount = 0;
  
  allHighlights.forEach(h => {
    const firstWord = h.split(/\s+/)[0]?.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (firstWord && flattenedVerbs.includes(firstWord)) {
      actionVerbCount++;
    }
  });

  if (actionVerbCount >= 3) {
    expScore += 10;
    checks.push({
      id: "exp_action_verbs",
      category: "Experience",
      title: `Strong Action Verbs (${actionVerbCount} powerful verbs detected)`,
      description: "Highlights begin with dynamic verbs like Spearheaded, Engineered, Accelerated.",
      passed: true,
      points: 10,
      maxPoints: 10
    });
  } else if (actionVerbCount >= 1) {
    expScore += 5;
    checks.push({
      id: "exp_action_verbs",
      category: "Experience",
      title: `Some Action Verbs used (${actionVerbCount} found)`,
      description: "Start more bullet points with high-impact power verbs rather than nouns or tasks.",
      passed: false,
      points: 5,
      maxPoints: 10,
      impact: "medium"
    });
  } else {
    checks.push({
      id: "exp_action_verbs",
      category: "Experience",
      title: "Lack of Impact Action Verbs",
      description: "Start each bullet with an active verb (e.g. 'Architected...', 'Transformed...', 'Automated...').",
      passed: false,
      points: 0,
      maxPoints: 10,
      impact: "medium"
    });
  }

  score += expScore;

  // 4. Skills & Competencies (Max: 15 pts)
  let skillScore = 0;
  const totalSkillsCount = skills.reduce((acc, cat) => acc + (cat.items?.length || 0), 0);

  if (totalSkillsCount >= 8 && skills.length >= 2) {
    skillScore += 15;
    checks.push({
      id: "skills_depth",
      category: "Skills",
      title: `Well-Categorized Skill Stack (${totalSkillsCount} skills across ${skills.length} categories)`,
      description: "Enables ATS keyword scanners to categorize both frontend, backend, or domain tools.",
      passed: true,
      points: 15,
      maxPoints: 15
    });
  } else if (totalSkillsCount >= 4) {
    skillScore += 9;
    checks.push({
      id: "skills_depth",
      category: "Skills",
      title: `${totalSkillsCount} Skills listed (Recommend 8+)`,
      description: "Add relevant libraries, frameworks, or domain methodologies to match ATS job descriptions.",
      passed: false,
      points: 9,
      maxPoints: 15,
      impact: "medium"
    });
  } else {
    checks.push({
      id: "skills_depth",
      category: "Skills",
      title: "Insufficient Skills Listed",
      description: "ATS systems heavily rely on skill keyword matching. Add at least 6-8 core technical competencies.",
      passed: false,
      points: 0,
      maxPoints: 15,
      impact: "high"
    });
  }

  score += skillScore;

  // 5. Education & Supplemental Credentials (Max: 15 pts)
  let eduScore = 0;
  if (education.length >= 1 && education.some(e => e.degree && e.institution)) {
    eduScore += 9;
    checks.push({
      id: "edu_presence",
      category: "Education",
      title: "Education & Degree credentials listed",
      description: "Degree and academic institution are properly recognized.",
      passed: true,
      points: 9,
      maxPoints: 9
    });
  } else {
    checks.push({
      id: "edu_presence",
      category: "Education",
      title: "Missing Education Details",
      description: "Add your university, college, or bootcamp credentials.",
      passed: false,
      points: 0,
      maxPoints: 9,
      impact: "medium"
    });
  }

  const extrasCount = (projects.length > 0 ? 1 : 0) + 
                      (certifications.length > 0 ? 1 : 0) + 
                      (languages.length > 0 ? 1 : 0);

  if (extrasCount >= 2) {
    eduScore += 6;
    checks.push({
      id: "extras_rich",
      category: "Credentials",
      title: "Strong Portfolio & Credentials",
      description: "Projects, Certifications, and/or Languages distinguish your profile from other candidates.",
      passed: true,
      points: 6,
      maxPoints: 6
    });
  } else if (extrasCount === 1) {
    eduScore += 3;
    checks.push({
      id: "extras_rich",
      category: "Credentials",
      title: "Add Industry Certifications or Projects",
      description: "Certifications and portfolio projects boost your profile ranking by up to 25%.",
      passed: false,
      points: 3,
      maxPoints: 6,
      impact: "low"
    });
  } else {
    checks.push({
      id: "extras_rich",
      category: "Credentials",
      title: "No Projects or Certifications",
      description: "Include verified certificates or notable projects to substantiate your experience.",
      passed: false,
      points: 0,
      maxPoints: 6,
      impact: "low"
    });
  }

  score += eduScore;

  // Detect any passive weak phrases in summary or bullet points
  const detectedWeakPhrases = [];
  const textCorpus = [summary, ...allHighlights].join(" ").toLowerCase();

  WEAK_PHRASES.forEach(wp => {
    if (textCorpus.includes(wp.weak.toLowerCase())) {
      detectedWeakPhrases.push(wp);
    }
  });

  // Determine Overall Status Tier
  let statusTier = "Needs Work";
  let statusColor = "#ef4444"; // red
  if (score >= 90) {
    statusTier = "Exceptional — Interview Ready";
    statusColor = "#10b981"; // green
  } else if (score >= 75) {
    statusTier = "Strong ATS Match";
    statusColor = "#3b82f6"; // blue
  } else if (score >= 50) {
    statusTier = "Competent — Room for Polish";
    statusColor = "#f59e0b"; // amber
  }

  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    statusTier,
    statusColor,
    checks,
    metricsCount,
    actionVerbCount,
    detectedWeakPhrases,
    categoryBreakdown: {
      contact: { score: contactScore, max: 20 },
      summary: { score: summaryScore, max: 15 },
      experience: { score: expScore, max: 35 },
      skills: { score: skillScore, max: 15 },
      education: { score: eduScore, max: 15 }
    }
  };
}
