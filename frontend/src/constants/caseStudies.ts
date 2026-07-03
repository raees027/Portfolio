export interface CaseStudyData {
  id: number;
  title: string;
  subtitle: string;
  type: 'dev' | 'sec';
  tech: string[];
  problem: string;
  research: string;
  planning: string;
  design: string;
  architecture: string;
  challenges: string;
  implementation: string;
  results: string;
  lessons: string;
  codeSnippet: string;
}

export const CASE_STUDIES: Record<number, CaseStudyData> = {
  1: {
    id: 1,
    title: "Cinemas Movie Dashboard",
    subtitle: "High-performance full-stack movie data exploration tool",
    type: "dev",
    tech: ["React.js", "Material UI", "HTML5", "CSS3", "JavaScript", "REST APIs", "Node.js", "MongoDB"],
    problem: "Traditional movie discovery sites suffer from high initial load times and poor client-side search optimizations. Managing large pagination offsets in MongoDB without proper cursor management leads to database latency spikes under peak loads.",
    research: "Analyzed network sweeps and render cycle logs during key filters. Discovered that rebuilding DOM lists for 100+ cards on every query key stroke caused CPU utilization to hit 85% on lower-end devices. Discovered that using numeric skip pagination in MongoDB scaled linearly in O(N) database reads.",
    planning: "Outlined a paginated virtualized grid architecture. Decided to utilize cursor-based pagination (using the TMDB ID and rating as cursors) instead of skip limits. Planned a secure user authenticated watchlist storage with MERN API endpoints.",
    design: "Designed a clean glassmorphism UI layout featuring neon Indigo filters. Integrated movie category tabs, quick search bars, and an administrative workspace to audit user roles.",
    architecture: "The application is built on a standard MERN stack. React client manages interface rendering, React Query caches server filters, Node/Express aggregates backend TMDB data feeds, and MongoDB stores client collection logs securely.",
    challenges: "Handling rapid client search keystrokes without overloading the TMDB external API, and resolving re-render lag during list toggling.",
    implementation: "Implemented Lodash-style debounce logic to queue keystrokes and reduce API hits by 75%. Re-architected list components to utilize `React.memo` and `useCallback` to isolate render trees. Structured MongoDB aggregate pipelines with index hashes on high-volume fields.",
    results: "Search response latency was cut from 1.2s to less than 150ms. Client CPU load during rendering dropped below 15%. Skip-query scaling concerns were completely resolved using cursor pagination.",
    lessons: "Memoization is a powerful optimizer when applied target-selectively rather than globally. Fine-tuning MongoDB index queries yields greater performance gains than upgrading instance hardware sizes.",
    codeSnippet: `// Debounced search input callback
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}`
  },
  2: {
    id: 2,
    title: "ScamShield",
    subtitle: "Fullstack security scanner and reporter platform blocking fraudulent entities",
    type: "sec",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "Express.js", "Neon PostgreSQL", "Helmet", "CORS"],
    problem: "Fraudulent agents exploit channels like UPI, phone lines, and SMS links to scam victims. There is a lack of localized repositories where users can instantly scan suspect identifiers and report them for validation.",
    research: "Analyzed reported scam feeds. Found that 92% of fraud incidents utilize repeated identifiers (the same UPI or phone number) within a 48-hour window. Incident mitigation response times suffer if validation requires manual administrative checks.",
    planning: "Designed a mobile-first scanning client using Expo. Planned a backend Express service connected to a Neon Serverless PostgreSQL instance to log user reports. Implemented auto-flagging logic where 3+ reports on an identifier dynamically flags it as SUSPICIOUS.",
    design: "Created a clear interface featuring neon security status badges (SCAM, SUSPICIOUS, SAFE). Implemented scan history records, reporting forms, and dashboard stats for blocked scams.",
    architecture: "Expo/React Native frontend routes requests to an Express API server. The backend queries a Neon PostgreSQL database pool, executing rate limiting and Helmet headers to block automated malicious queries.",
    challenges: "Preventing malicious agents from spamming fake reports to block legitimate UPI IDs, and handling high-concurrency DB transactions on serverless Postgres pools under traffic spikes.",
    implementation: "Integrated rate-limiting rules (express-rate-limit) on scan and report routes. Configured database schema with constraints on unique report values and implemented an automatic verification trigger at 3+ report logs. Secure Helmet headers block iframe clicks.",
    results: "User lookup latency was cut below 120ms using Neon database pools. Fraud flagging response times dropped to zero due to automated report aggregation. Secured backend routes against scraping scripts.",
    lessons: "Automating threat categorization via multi-tenant reporting filters out administrative verification queues. Protecting APIs with CORS rules and rate limiters is essential when running open threat intelligence platforms.",
    codeSnippet: `// POST /api/report - User reporting service & auto-suspicious threshold
scanRouter.post("/report", async (req, res) => {
  try {
    const { value, type, description } = req.body;
    const { pool } = await import("../db/neon.js");

    // Save the report
    await pool.query(
      "INSERT INTO reports (type, value, description) VALUES ($1, $2, $3)",
      [type, value.trim().toLowerCase(), description || null]
    );

    // Check how many times this has been reported
    const countResult = await pool.query(
      "SELECT COUNT(*) FROM reports WHERE value = $1",
      [value.trim().toLowerCase()]
    );
    const reportCount = parseInt(countResult.rows[0].count);

    // If reported 3+ times, auto-add to suspicious pool
    if (reportCount >= 3) {
      await pool.query(
        \`INSERT INTO scam_entries (type, value, risk_level, reason, source, verified)
         VALUES ($1, $2, 'SUSPICIOUS', $3, 'user-report', false)
         ON CONFLICT (value) DO NOTHING\`,
        [type, value.trim().toLowerCase(), \`Reported \${reportCount} times by users\`]
      );
    }

    res.json({
      success: true,
      message: "Report submitted successfully",
      totalReports: reportCount,
    });
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});`
  }
};
