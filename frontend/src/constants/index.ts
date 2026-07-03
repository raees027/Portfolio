export const PERSONAL_INFO = {
  name: "Muhammed Raees Pareed",
  title: "Software Engineer | Frontend Developer | Cybersecurity Analyst",
  subtitle: "Building responsive, secure, and user-friendly web and mobile applications.",
  email: "raeeskp02@gmail.com",
  github: "https://github.com/raees027",
  linkedin: "https://www.linkedin.com/in/raees-muhammed-/",
  tcsDetails: "Assistant System Engineer at TCS"
};

export const ACHIEVEMENTS = [
  { value: "02", label: "Projects Completed" },
  { value: "20+", label: "Technologies Learned" },
  { value: "03", label: "Verified Credentials" },
  { value: "100%", label: "Continuous Learning" }
];

export const SKILL_CATEGORIES = [
  {
    name: "Frontend Development",
    skills: ["React.js", "HTML5", "CSS3", "JavaScript", "TypeScript (Basic)", "Responsive UI Development", "Material UI"]
  },
  {
    name: "Backend Development",
    skills: ["Node.js", "Express.js", "Java", "REST APIs"]
  },
  {
    name: "Cybersecurity Ops",
    skills: ["Log Analysis", "Root Cause Analysis", "System Reliability", "Anomaly Detection", "Security Monitoring"]
  },
  {
    name: "Databases & Tools",
    skills: ["MongoDB", "SQL", "Git", "GitHub", "Postman", "Docker", "Kubernetes"]
  }
];

export const EXPERIENCE_TIMELINE = [
  {
    role: "Assistant System Engineer",
    company: "Tata Consultancy Services, Bangalore",
    period: "May 2024 – Present",
    highlights: [
      "Role- Cyber Security Analyst",
      "Analyzed and investigated system issues using logs and monitoring tools.",
      "Performed debugging and root cause analysis to resolve technical problems.",
      "Collaborated with cross-functional teams to improve system reliability.",
      "Worked with large datasets to identify anomalies and improve performance."
    ]
  }
];

export const EDUCATION_TIMELINE = [
  {
    degree: "Bachelor of Technology in Civil Engineering (GPA: 8.4)",
    institution: "Government Engineering College, Thrissur",
    period: "June 2019 – July 2023",
    description: "Shifted focus from structural design to software engineering and development."
  }
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Cinemas. Movie Dashboard",
    type: "dev",
    description: "Movie Dashboard – A web application with Admin and User modes, where admins can manually add and manage movie data and users can browse and view movie details through a responsive interface.",
    tech: ["React.js", "Material UI", "HTML5", "CSS3", "JavaScript", "REST APIs", "Node.js", "MongoDB"],
    github: "https://github.com/raees027/Movie-App",
    live: "https://cinemas.raees.dev",
    highlights: [
      "Developed reusable and modular UI components using React.js and Material UI for scalable frontend architecture.",
      "Built responsive and user-friendly interfaces using HTML5, CSS3, and JavaScript.",
      "Implemented features such as search, filtering, and pagination for efficient handling of large datasets."
    ]
  },
  {
    id: 2,
    title: "ScamShield",
    type: "sec",
    description: "Fullstack security scanner and reporter platform designed to identify and catalog suspicious UPI IDs, phone numbers, and URLs.",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "Express.js", "Neon PostgreSQL", "Helmet", "CORS"],
    github: "https://github.com/raees027/Scam-shield",
    live: "https://scamshield.raees.dev",
    highlights: [
      "Scan API routes evaluating suspicious UPI addresses, phone numbers, and malicious URLs against verification pools.",
      "Automated database ingestion logging reports to flag entries as SUSPICIOUS after receiving multiple user alerts.",
      "Built-in rate limiter, CORS rules, and secure Helmet headers safeguarding endpoints against automated scraper scripts."
    ]
  }
];

export const CERTIFICATIONS = [
  { name: "React JS Essential Training", issuer: "LinkedIn Learning", date: "Verified Credentials" },
  { name: "Introduction to Web Design and Development", issuer: "LinkedIn Learning", date: "Verified Credentials" },
  { name: "Process: Agile for Practitioners Assessment", issuer: "TCS / Agile", date: "Verified Credentials" }
];
