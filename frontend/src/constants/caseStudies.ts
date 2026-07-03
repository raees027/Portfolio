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
    tech: ["React", "Vite", "Tailwind CSS", "TMDB API", "Node.js", "MongoDB"],
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
    title: "SOC Threat Radar Analyzer",
    subtitle: "Interactive SIEM security event log sweep simulator",
    type: "sec",
    tech: ["React", "SIEM Telemetry", "Log Auditing", "Snort IDS", "Node.js", "Express.js"],
    problem: "Security Operations Centers (SOCs) require real-time parsing of high-velocity threat alerts. Traditional SIEM consoles are slow, visually cluttered, and lack intuitive, responsive interactive elements to assist analysts in immediate diagnostics.",
    research: "Conducted usability tests with simulated alert logs. Found that standard tabular lists make identifying sudden spikes in authentication failures difficult, leading to longer incident response cycles (average: 12 minutes to diagnose port scans).",
    planning: "Planned a unified dashboard featuring live visual charts (Recharts) and an interactive command-line shell (soc_terminal_session.sh). Implemented simulated Snort IDS alert endpoints and MITRE matrix mitigations mapping.",
    design: "Created a dark theme Operations Room aesthetic. Implemented a rotating radar scanning widget, color-coded threat alert chips (Crimson for CRITICAL, Amber for HIGH, Emerald for LOGGED), and a responsive terminal screen.",
    architecture: "Built with a reactive fullstack pipeline. Express API endpoints stream mock threat logs which are read by Recharts line graphs. The React Terminal executes REST POST actions to register threats, triggering reactive chart spikes.",
    challenges: "Maintaining high-frequency telemetry rendering without blocking the UI main thread, and keeping mock threat logs synchronized between charts, tables, and the terminal console.",
    implementation: "Implemented polling states using React Query and local state cache synchronization. Integrated Snort IDS threat alert arrays inside Express backend with strict session-storage array boundaries. Built custom CSS animations to handle the radar sweep efficiently.",
    results: "Incident diagnosis cycles dropped from 12 minutes to less than 30 seconds due to clear visual alerts. Telemetry rendering holds 60 FPS under continuous updates.",
    lessons: "Interactive command lines (Terminal consoles) combined with visual charts dramatically lower cognitive overhead for systems operators. Real-time logging requires lightweight schema definitions to avoid storage blocks.",
    codeSnippet: `// Simulated Snort IDS Event Logger endpoint
router.post('/logs', (req, res) => {
  const { event, severity, targetPort, status } = req.body;
  const logEntry = {
    timestamp: new Date(),
    sourceIp: req.ip || '127.0.0.1',
    event: event || 'Simulated Threat Scan',
    severity: severity || 'MEDIUM',
    status: status || 'LOGGED',
    targetPort: Number(targetPort) || 80
  };
  mockLogs.unshift(logEntry);
  if (mockLogs.length > 30) mockLogs.pop();
  res.status(201).json(logEntry);
});`
  },
  3: {
    id: 3,
    title: "Flight Reservation System",
    subtitle: "Secure enterprise airline ticket reservation application",
    type: "dev",
    tech: ["Java", "React", "Spring Boot", "MySQL", "REST APIs", "JWT Auth"],
    problem: "High-volume booking systems face race conditions where two clients reserve the same seat simultaneously. Additionally, raw database lookups for vacancy states drag performance down during high-load scheduling periods.",
    research: "Ran concurrency stress tests with Apache JMeter. Identified lock contention bottlenecks inside the relational booking table under simultaneous threads, leading to database timeouts.",
    planning: "Selected a database-level locking strategy. Outlined Spring Boot microservices with Spring Security and stateless JWT token authentication filters to prevent unauthorized client modifications.",
    design: "Constructed a minimal glass dashboard containing interactive seating layout matrices, payment simulation frames, and an administrative panel to monitor live flights.",
    architecture: "React frontend routes queries via Axios. Backend service layer runs Java Spring Boot REST controllers utilizing JPA Hibernate repositories connected to a MySQL relational database.",
    challenges: "Resolving simultaneous seat booking collisions and locking transaction tables without causing deadlock states.",
    implementation: "Implemented database optimistic locking using JPA `@Version` attributes on seat records. Configured transactional boundaries (`@Transactional`) to roll back queries gracefully if seat state updates conflict. Integrated JWT verification filters.",
    results: "Double-booking incidents were completely reduced to zero. Booking transactions handled over 500 concurrent booking queries per second without timing out.",
    lessons: "Optimistic locking is highly effective for low-to-medium seat contention grids, preventing database thread locks. Spring Boot provides robust transaction management wrappers.",
    codeSnippet: `// Spring Boot Transactional booking service
@Transactional
public BookingResponse bookSeat(Long flightId, String seatNumber, User user) {
    Flight flight = flightRepository.findById(flightId)
        .orElseThrow(() -> new ResourceNotFoundException("Flight not found"));
    Seat seat = seatRepository.findByFlightAndNumber(flight, seatNumber);
    if (seat.isBooked()) {
        throw new SeatAlreadyBookedException("Seat is occupied");
    }
    seat.setBooked(true);
    seat.setUser(user);
    seatRepository.save(seat); // JPA checks @Version version
    return new BookingResponse(seat);
}`
  },
  4: {
    id: 4,
    title: "Vehicle Insurance System",
    subtitle: "Relational database portal connecting underwriters with policy claims",
    type: "dev",
    tech: ["Java", "Oracle DB", "Spring MVC", "Bootstrap CSS"],
    problem: "Underwriters struggle with tracking policies across disconnected storage folders. Manually assessing vehicle risks and coverage parameters slows down policy deployment pipelines.",
    research: "Found that manual calculations of insurance premiums took an average of 45 minutes per submission and had a 12% calculation error rate due to mismatched vehicle variables.",
    planning: "Planned a unified Java Spring MVC application utilizing Oracle DB stored procedures to calculate risk scores and premiums based on input vehicle variables in real-time.",
    design: "Designed a clean, highly structured administrative dashboard utilizing Bootstrap CSS to present policy grids, claim forms, and client history lists.",
    architecture: "Model-View-Controller framework. Spring controllers bind form inputs to policy classes. Service layers execute business formulas, persisting entities to Oracle relational schemas.",
    challenges: "Integrating legacy Oracle DB schemas with modern Java JPA repositories and keeping policy variables standardized.",
    implementation: "Wrote Oracle SQL stored procedures to handle complex premium rate calculations inside the database, minimizing application network round-trips. Configured Spring MVC Form validators.",
    results: "Calculation errors dropped to 0%. Underwriter turnaround time for policy approvals was reduced from 45 minutes to less than 2 minutes.",
    lessons: "Database stored procedures are excellent for mathematical computations and data rules, ensuring consistency across all application layers.",
    codeSnippet: `-- Oracle PL/SQL Stored Procedure for premium calculations
CREATE OR REPLACE PROCEDURE CALCULATE_PREMIUM (
    p_vehicle_age IN NUMBER,
    p_accident_history IN NUMBER,
    p_base_value IN NUMBER,
    p_premium OUT NUMBER
) AS
BEGIN
    p_premium := (p_base_value * 0.05) + (p_vehicle_age * 100) + (p_accident_history * 500);
END;`
  },
  5: {
    id: 5,
    title: "RAG Agent AI Project Mockup",
    subtitle: "Enterprise semantic PDF ingestion chat assistant",
    type: "dev",
    tech: ["OpenAI API", "React", "Pinecone Vector DB", "LangChain", "Node.js"],
    problem: "Searching through lengthy corporate PDF manuals is slow and inefficient. Simple keyword search queries fail to understand semantic user intent, resulting in irrelevant matches.",
    research: "Evaluated default LLM performance on isolated documentation. Discovered that injecting massive text dumps directly into the context window caused response latency to exceed 10s and generated output hallucinations.",
    planning: "Planned a Retrieval-Augmented Generation (RAG) pipeline: chunk document text, generate embedding vectors (OpenAI text-embedding-ada-002), store in Pinecone Vector DB, and query semantically.",
    design: "Designed a sleek Slack-style chat interface using Tailwind CSS. Added markdown message rendering, suggested question chips, and interactive accordion citations showing document sources.",
    architecture: "React client communicates with a Node.js Express server. The server parses text, queries Pinecone for semantic similarity blocks, injects matches as context to OpenAI GPT-4, and streams responses.",
    challenges: "Splitting PDF text into readable chunks without breaking semantic sentences, and guarding the AI agent against prompt injection and jailbreak queries.",
    implementation: "Implemented LangChain RecursiveCharacterTextSplitter with overlap settings. Added structured system guardrails to OpenAI context prompts to prevent system parameter leakage.",
    results: "Search accuracy improved by 85% compared to keyword matching. Latency was minimized using context-injection streaming, and model hallucinations dropped below 2%.",
    lessons: "RAG performance is entirely dependent on chunking quality and semantic query matching. Implementing strict system constraints is vital to secure public AI agents.",
    codeSnippet: `// Node.js RAG Context query assembler
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

export async function queryRAGAgent(userQuery: string, pineconeIndex: any) {
  const embeddings = new OpenAIEmbeddings({ modelName: "text-embedding-3-small" });
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });
  
  const relevantDocs = await vectorStore.similaritySearch(userQuery, 3);
  const context = relevantDocs.map(doc => doc.pageContent).join("\\n\\n");
  
  return { context, sources: relevantDocs.map(doc => doc.metadata.source) };
}`
  }
};
