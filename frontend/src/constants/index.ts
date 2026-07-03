export const PERSONAL_INFO = {
  name: "Muhammed Raees Pareed",
  title: "Frontend Developer | Cybersecurity Analyst | AI Enthusiast",
  subtitle: "Building secure, scalable, and user-focused digital experiences.",
  email: "raeeskp02@gmail.com",
  github: "https://github.com/raees027",
  linkedin: "https://www.linkedin.com/in/raees-muhammed-/",
  tcsDetails: "Assistant System Engineer at TCS"
};

export const ACHIEVEMENTS = [
  { value: "05+", label: "Projects Completed" },
  { value: "35+", label: "Technologies Learned" },
  { value: "04+", label: "Verified Credentials" },
  { value: "100%", label: "Continuous Learning" }
];

export const SKILL_CATEGORIES = [
  {
    name: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Redux", "Tailwind CSS", "Material UI", "Bootstrap", "Vite"]
  },
  {
    name: "Backend Development",
    skills: ["Node.js", "Express.js", "Java", "Spring Boot", "REST APIs"]
  },
  {
    name: "Cybersecurity Ops",
    skills: ["Security Monitoring", "SIEM Tools", "Incident Response", "Threat Detection", "Vulnerability Assessment"]
  },
  {
    name: "AI Engineering",
    skills: ["Prompt Engineering", "OpenAI APIs", "AI Integrations", "RAG Systems", "LLM Applications"]
  },
  {
    name: "Databases & Tools",
    skills: ["MySQL", "MongoDB", "Git", "Docker", "Postman", "Figma", "VS Code"]
  }
];

export const EXPERIENCE_TIMELINE = [
  {
    role: "Assistant System Engineer (Cyber Security Analyst & Developer)",
    company: "Tata Consultancy Services (TCS)",
    period: "May 2024 – Present",
    highlights: [
      "Designed and developed reusable React component layers for secure internal dashboards.",
      "Conducted comprehensive code reviews to defense-in-depth against MERN security bugs.",
      "Engineered automated vulnerability scans and SIEM dashboard reports for active threat feeds.",
      "Spearheaded Java Full Stack pre-deployment training focusing on secure enterprise microservices.",
      "Monitored live production feeds to trace, log, and isolate SYN flood alerts on critical ports."
    ]
  }
];

export const EDUCATION_TIMELINE = [
  {
    degree: "B.Tech in Civil Engineering (GPA: 8.4)",
    institution: "Govt Engineering College, Thrissur",
    period: "2019 – 2023",
    description: "Shifted engineering principles from physical steel structures to software memory footprints."
  },
  {
    degree: "Enterprise Java Full Stack Training Program",
    institution: "TCS Initial Learning Program",
    period: "2024",
    description: "Intensive training on secure web systems, Spring Boot architectures, and Oracle databases."
  }
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Cinemas. Movie Dashboard",
    type: "dev",
    description: "Full-featured movies showcase platform featuring user watchlist curation and authentication.",
    tech: ["React", "Vite", "Tailwind CSS", "TMDB API", "Node.js", "MongoDB"],
    github: "https://github.com/raees027/cinemas-mern",
    live: "https://cinemas.raees.dev",
    highlights: [
      "Search and sort movies based on runtime filters, ratings, and genre tags.",
      "User watch list curation powered by local cache and secure Mongo records.",
      "Dynamic admin config dashboards to manage user role levels and DB contents."
    ]
  },
  {
    id: 2,
    title: "SOC Threat Radar Analyzer",
    type: "sec",
    description: "Interactive real-time network sweep console displaying MITRE matrix attacks mitigations.",
    tech: ["React", "SIEM Telemetry", "Log Auditing", "Snort IDS"],
    github: "https://github.com/raees027/soc-analyzer",
    live: "https://radar.raees.dev",
    highlights: [
      "Simulated packet capture sweeps tracing live ports logs to isolate SYN queries.",
      "Mitigation tracking templates mapped to OWASP Top 10 vulnerabilities.",
      "Audited ports logs console logging SYN alerts mitigation states."
    ]
  },
  {
    id: 3,
    title: "Flight Reservation System",
    type: "dev",
    description: "Fullstack ticket management and booking portal featuring secure client-admin access control.",
    tech: ["Java", "React", "Spring Boot", "MySQL", "REST APIs"],
    github: "https://github.com/raees027/flight-booking",
    live: "https://flight.raees.dev",
    highlights: [
      "High-speed seat booking algorithms checking flight vacancy updates.",
      "Admin systems dashboard to configure flight paths, prices, and vacancy charts.",
      "Secure JWT user authentication flow mapping customer ticket files."
    ]
  },
  {
    id: 4,
    title: "Vehicle Insurance System",
    type: "dev",
    description: "Secure insurance application console connecting underwriters with customer coverage policies.",
    tech: ["Java", "Oracle DB", "Spring MVC", "Bootstrap CSS"],
    github: "https://github.com/raees027/insurance-console",
    live: "https://insurance.raees.dev",
    highlights: [
      "Underwriter dashboard to evaluate policies, calculate premiums, and log coverage details.",
      "Secure CRUD framework logging vehicle registration files and status audits.",
      "Automatic claim assessment formulas parsing vehicle parameters."
    ]
  },
  {
    id: 5,
    title: "RAG Agent AI Project Mockup",
    type: "dev",
    description: "AI assistant parsing enterprise knowledge-base PDFs to generate secure query answers.",
    tech: ["OpenAI API", "React", "Pinecone Vector DB", "LangChain"],
    github: "https://github.com/raees027/rag-ai-agent",
    live: "https://ai.raees.dev",
    highlights: [
      "Semantic similarity document chunk retrieval matching vector database lookups.",
      "Context injection schemas guarding agent answers against prompt leaks.",
      "Clean UI display formatting agent source citations and chat history caches."
    ]
  }
];

export const CERTIFICATIONS = [
  { name: "React Essential Training", issuer: "LinkedIn Learning", date: "Verified Credentials" },
  { name: "Java Full Stack Enterprise ILP", issuer: "TCS Academy", date: "Verified Credentials" },
  { name: "Cybersecurity Analyst Bootcamp", issuer: "TCS Academy", date: "Verified Credentials" },
  { name: "Generative AI Foundations & RAG Architectures", issuer: "Future Learning", date: "Ongoing Credentials" }
];
