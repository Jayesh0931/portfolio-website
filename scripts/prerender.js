import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const BASE_URL =
  process.env.BASE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://jayeshsoni.com");
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png`;

const PERSON_SCHEMA = {
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  "name": "Jayesh Soni",
  "jobTitle": "Product Lead & AI Product Designer",
  "url": `${BASE_URL}/`,
  "image": DEFAULT_IMAGE,
  "sameAs": [
    "https://www.linkedin.com/in/jayeshsoni31/",
    "https://x.com/jayeshsoni_",
    "https://github.com/Jayesh0931"
  ],
  "knowsAbout": [
    "Enterprise AI Workforce",
    "Human-AI Collaboration",
    "Interaction Architecture",
    "Product Strategy & Leadership",
    "Conversational Analytics",
    "Autonomous Multi-Agent Systems"
  ],
  "description": "Product Lead and AI Product Designer specialising in Enterprise AI Workforce systems, human-AI collaboration, and interaction design."
};

const STORIES = [
  {
    path: "allyra-story",
    title: "Allyra.ai Case Study — Jayesh Soni | Product Lead",
    description: "Case study on Allyra.ai: Scaling enterprise AI workforce systems from point-solution bots to multi-agent workflows with human-in-the-loop governance.",
    headline: "Scaling AI from Individual Agents to Enterprise-Grade Workflows",
    company: "Pansophic Technologies",
    year: "2024–2026",
    role: "Product Lead",
    team: "3 designers and 2 business analysts",
    scope: "Enterprise AI Workforce / Multi-Agent Orchestration / AI Governance / Interaction Architecture",
    keywords: "Allyra.ai, Enterprise AI Workforce, Multi-Agent Workflows, Agentic AI UX, Human-in-the-Loop, AI Governance, AI Guardrails",
    ogImage: `${BASE_URL}/assets/allyra_story_hero-C4SPDcuF.webp`,
    overview: "Between 2024 and 2026, I led product direction and UX strategy for Allyra.ai, evolving it from an agent-building tool into an organisation-ready enterprise AI platform capable of creating, training, orchestrating, and operationalising AI workers.",
    challenge: "In late 2024, the AI industry was obsessed with models. The real challenge wasn't access to AI. The challenge was turning AI into something businesses could actually use: prompt engineering, knowledge systems, APIs, integrations, and continuous maintenance. The people who understood business problems often couldn't build AI solutions themselves.",
    opportunity: "Instead of standalone prompt boxes and single-turn chatbots, the opportunity was to design an enterprise workspace where teams could compose, test, connect, and govern multi-agent workflows visually.",
    whatIDrove: "Agent Canvas & Orchestration Architecture, Live Evaluation & Governance Dashboards, Human-in-the-Loop Approval Protocols, Enterprise Multi-Tenant Workspaces, Team Leadership of 3 designers and 2 business analysts.",
    impact: "Expanded reach across 15+ organisations—including a pilot with a leading Indian enterprise group; designed task-focused, human-in-the-loop workflows for 19+ AI agents.",
    keyDecisions: [
      "Role-Based Agent Hierarchies over Monolithic LLMs",
      "Transparent Observability and Telemetry Before Autonomous Execution",
      "Composable Enterprise Knowledge Connectors",
      "Human-in-the-Loop Confidence Threshold Gates"
    ],
    oneThing: "The hardest part of enterprise AI isn't making models smarter—it's making AI systems observable, governable, and trustworthy for human teams."
  },
  {
    path: "campaign-os-story",
    title: "Campaign OS Case Study — Jayesh Soni | UXD Head",
    description: "Case study on Campaign OS: Client project directed at Vrozart Dackson designing an autonomous campaign operating system with conversational analytics and calm monitoring.",
    headline: "Designing an Autonomous Marketing & Campaign Operating System",
    company: "Vrozart Dackson Enterprise",
    year: "2024–2025",
    role: "UXD Head",
    team: "Enterprise Client Work (NDA)",
    scope: "Product Direction / UX Strategy / Autonomous Marketing / Conversational Analytics",
    keywords: "Campaign OS, Autonomous Marketing, Conversational Analytics, Living Insights, Calm Monitoring, Multi-Channel Workflows",
    ogImage: `${BASE_URL}/assets/cos-story-hero-CDaydGfO.webp`,
    overview: "Directed product experience for an enterprise campaign operating system while at Vrozart Dackson (anonymised under NDA). The system connects the entire campaign lifecycle into a single collaborative workspace where AI acts as an active marketing partner.",
    challenge: "Marketing workflows are fragmented across creative generation, channel deployment, analytics dashboards, and optimisation tools. Teams waste hours context-switching and manually copying data between disconnected software.",
    opportunity: "Connect the entire campaign lifecycle into a single collaborative workspace where AI assists across strategy, asset generation, multi-channel deployment, and autonomous performance monitoring.",
    whatIDrove: "Connected Workflows, Conversational Analytics Interface, Living Insights Canvas, Calm Monitoring System with human-in-the-loop controls.",
    impact: "Unified campaign planning, execution, and optimisation into a single continuous canvas; conversational analytics turning performance charts into narrative strategic dialogues; calm autonomous background monitoring.",
    keyDecisions: [
      "Connected Workflows over Point Solutions",
      "Conversational Analytics Turning Data into Actionable Strategy",
      "Living Insights Canvas for Iterative Creative Remixing",
      "Calm Autonomous Monitoring with Proactive Anomaly Alerts"
    ],
    oneThing: "Designing AI products isn't about adding chat to existing software. The real challenge is deciding when AI should guide, when it should collaborate and when it should quietly stay out of the way."
  },
  {
    path: "tulah-story",
    title: "Tulah Wellness Platform Case Study — Jayesh Soni | Product Lead",
    description: "Case study on Tulah: Designing workflow automation for a wellness platform, replacing fragmented spreadsheets and manual forms with connected digital workflows.",
    headline: "Orchestrating Personalised Care Across Complex Wellness Workflows",
    company: "Pansophic Technologies",
    year: "2025",
    role: "Product Lead",
    team: "Cross-functional Product & Operations",
    scope: "Workflow Automation / Wellness Operations / Journey Coordination",
    keywords: "Tulah, Wellness Platform, Workflow Automation, Care Coordination, Operations Design, Journey Timeline",
    ogImage: `${BASE_URL}/assets/tulah-story-hero-D5MXapZP.webp`,
    overview: "Delivering personalised wellness wasn't the challenge. Coordinating it was. Designed workflow automation for Tulah, a wellness platform, replacing fragmented spreadsheets, documents, forms, and manual communication with connected digital workflows.",
    challenge: "Care teams worked in silos, recommendations became fragmented across spreadsheets, activities were difficult to coordinate, and long-term continuity of care was hard to maintain.",
    opportunity: "Design a unified operational system that connected specialists, operations teams, and guests through a single, end-to-end care journey.",
    whatIDrove: "Cross-Specialty Coordination Matrix, Guest Journey Timeline, Operational Handover Protocols, Unified Wellness Dashboard.",
    impact: "Connected digital workflow automation replacing fragmented spreadsheets, coordinated multidisciplinary care handover, transparent guest timeline visibility.",
    keyDecisions: [
      "Design Around Roles, Not Software Modules",
      "Unified Guest Care Timeline as Single Source of Truth",
      "Calm Operational Handover Alerts Without Noise",
      "Continuous Care Feedback Loops Between Consultations"
    ],
    oneThing: "The hardest part of designing complex systems isn't creating workflows. It's creating shared understanding."
  },
  {
    path: "vousvous-story",
    title: "VousVous Case Study — Jayesh Soni | UXD Head, Vrozart Dackson",
    description: "Case study on VousVous: Declarative fashion discovery beyond search, multimodal style synthesis, and interactive wardrobe curation.",
    headline: "Designing Fashion Discovery Beyond Search",
    company: "Vrozart Dackson Enterprise",
    year: "2024",
    role: "UXD Head, Vrozart Dackson",
    team: "Design & Engineering Team",
    scope: "Product Direction / Gesture-First Discovery / Multimodal AI Synthesis / Conversational Commerce",
    keywords: "VousVous, Fashion Discovery, Gesture-First UX, Multimodal AI, Conversational Commerce, Vibe UX Framework",
    ogImage: `${BASE_URL}/assets/vousvous-story-hero-FHJVyzag.webp`,
    overview: "Fashion discovery has long been driven by filters, endless grids, and keyword searches. With VousVous, we explored a different interaction model—one where users discover, personalise, and create fashion through gestures and AI-guided conversations instead of traditional browsing.",
    challenge: "Most fashion platforms assume users know exactly what they're looking for. In reality, fashion shopping is exploratory. People discover styles while browsing, save pieces they like, compare options, and gradually refine their preferences. Traditional patterns interrupt this process with complex filters and overwhelming choices.",
    opportunity: "Discover naturally using simple gestures, express intent conversationally with AI, and personalise before purchasing with AI remixing and try-on.",
    whatIDrove: "Gesture-first discovery experience, Conversational AI workflows for fashion exploration, The remix interaction for personalisation, Quotation and measurement journeys, Consistent visual language, Reusable interaction patterns.",
    impact: "100+ Pilot Users (early cohort testing gesture discovery & AI style remixing), 3 Core Gestures (Like · Skip · Explore), AI-powered journey (Discover → Create → Remix → Quote → Purchase).",
    keyDecisions: [
      "Discovery Before Search — One design at a time with swipe-based exploration",
      "Conversation Over Filters — Expressing fashion intent through natural language",
      "Generative Co-Creation — AI as a partner for prompt-guided style variations and remixing",
      "Personalise Before Purchase — Integrating body profile and try-on directly into checkout"
    ],
    oneThing: "Designing for AI isn't about replacing familiar experiences. It's about introducing intelligence only where it removes friction. The strongest moments came from balancing human intuition with AI assistance."
  },
  {
    path: "joonify-story",
    title: "Joonify Case Study — Jayesh Soni | User Interface Designer",
    description: "Case study on Joonify: Helping parents understand how their children learn, grow, and discover their strengths through early childhood assessments.",
    headline: "Child Talent Discovery Assessment & Personalised Growth Roadmaps",
    company: "Joonify",
    year: "2022–2023",
    role: "User Interface Designer",
    team: "Product & EdTech Team",
    scope: "Product Design / User Experience Design / Assessment Experience / Interaction Design / Ed-Tech Platform",
    keywords: "Joonify, EdTech Design, Talent Discovery, Child Profiling, Assessment Journey, Personalised Learning",
    ogImage: `${BASE_URL}/assets/joonify_desktop-CoP02MZj.webp`,
    overview: "Joonify brought child talent discovery, learning recommendations, and educational planning into one platform—helping parents make more informed decisions about their child's development.",
    challenge: "Every child has different strengths, interests, and learning needs. Joonify aimed to help parents understand these differences through a talent discovery assessment and connect them with relevant learning resources.",
    opportunity: "Connect three key parts of a child's learning journey: Understand (child profiling), Discover (talent assessment), and Grow (curated courses and schedules).",
    whatIDrove: "Talent Discovery Assessment Experience, Learning Scheduler, Course Discovery Hub, Quiz and Exam Flows, Referral System, Design System.",
    impact: "750+ Parents Guided, 30-Minute Talent Discovery Assessment, 6 Development Dimensions Evaluated.",
    keyDecisions: [
      "Understand Before Prescribing — Comprehensive child profiling across cognitive and behavioral traits",
      "Assessment Without Anxiety — 30-minute engaging, pressure-free talent discovery journey",
      "Connected Learning Ecosystem — Unifying talent assessment with tailored course recommendations and scheduling",
      "Actionable Clarity for Parents — Translating developmental data into clear growth roadmaps"
    ],
    oneThing: "Joonify was an opportunity to design beyond individual screens—to connect a child's profile, assessment journey, and learning resources into a cohesive product experience."
  }
];

function generateStoryHtml(templateHtml, story) {
  const canonicalUrl = `${BASE_URL}/${story.path}`;

  let html = templateHtml;

  // 1. Update Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${story.title}</title>`);

  // 2. Update Meta Description & Keywords
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${story.description}" />`
  );
  html = html.replace(
    /<meta name="keywords" content=".*?" \/>/i,
    `<meta name="keywords" content="${story.keywords}" />`
  );

  // 3. Update Canonical Link
  html = html.replace(
    /<link rel="canonical" href=".*?" id="canonical-url" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" id="canonical-url" />`
  );

  // 4. Update OpenGraph Tags
  html = html.replace(
    /<meta property="og:title" content=".*?" id="og-title" \/>/i,
    `<meta property="og:title" content="${story.title}" id="og-title" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" id="og-description" \/>/i,
    `<meta property="og:description" content="${story.description}" id="og-description" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" id="og-url" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" id="og-url" />`
  );
  html = html.replace(
    /<meta property="og:type" content=".*?" id="og-type" \/>/i,
    `<meta property="og:type" content="article" id="og-type" />`
  );
  html = html.replace(
    /<meta property="og:image" content=".*?" id="og-image" \/>/i,
    `<meta property="og:image" content="${story.ogImage}" id="og-image" />`
  );

  // 5. Update Twitter Tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" id="twitter-title" \/>/i,
    `<meta name="twitter:title" content="${story.title}" id="twitter-title" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" id="twitter-description" \/>/i,
    `<meta name="twitter:description" content="${story.description}" id="twitter-description" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content=".*?" id="twitter-image" \/>/i,
    `<meta name="twitter:image" content="${story.ogImage}" id="twitter-image" />`
  );

  // 6. Inject Rich JSON-LD Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      {
        "@type": "CreativeWork",
        "@id": `${canonicalUrl}#casestudy`,
        "name": story.title,
        "headline": story.headline,
        "url": canonicalUrl,
        "description": story.description,
        "author": { "@id": `${BASE_URL}/#person` },
        "publisher": { "@id": `${BASE_URL}/#person` },
        "inLanguage": "en-GB"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": story.headline, "item": canonicalUrl }
        ]
      }
    ]
  };

  const jsonLdScript = `\n    <script type="application/ld+json" id="json-ld-schema">${JSON.stringify(jsonLd, null, 2)}</script>\n  </head>`;
  html = html.replace("</head>", jsonLdScript);

  // 7. Inject Semantic Static Text inside <div id="root">
  // This ensures that web crawlers, AI search bots (ChatGPT, Claude, Perplexity),
  // and non-JS clients instantly receive 100% of the text.
  // When a real user visits with JavaScript enabled, React's createRoot mounts and replaces it seamlessly.
  const semanticBody = `
    <main role="main" class="pre-rendered-seo" style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif; color: #190b00; line-height: 1.6;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e0dbd1; padding-bottom: 16px;">
        <a href="/" style="color: #EE6C13; text-decoration: none; font-weight: 600;">← Back to Jayesh Soni Portfolio</a>
        <a href="/about" style="color: #190b00; text-decoration: none; font-weight: 600;">About Jayesh Soni →</a>
      </nav>
      
      <header style="margin-bottom: 40px; border-bottom: 1px solid #7b7a77; padding-bottom: 24px;">
        <p style="font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #77695d; margin: 0 0 8px 0;">[ CASE STUDY ]</p>
        <h1 style="font-size: 36px; line-height: 1.2; margin: 0 0 16px 0;">${story.headline}</h1>
        <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 15px; color: #77695d; margin: 12px 0 16px 0; padding: 12px 16px; background: #fbf7ee; border-radius: 6px;">
          <div><strong style="color: #190b00;">Company:</strong> ${story.company}</div>
          <div><strong style="color: #190b00;">Timeline:</strong> ${story.year}</div>
          <div><strong style="color: #190b00;">Role:</strong> ${story.role}</div>
          ${story.team ? `<div><strong style="color: #190b00;">Team / Context:</strong> ${story.team}</div>` : ""}
        </div>
        <p style="font-size: 15px; color: #77695d; margin: 0;"><strong>Scope:</strong> ${story.scope}</p>
      </header>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">Overview</h2>
        <p style="font-size: 18px; color: #190b00;">${story.overview}</p>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">The Challenge</h2>
        <p style="font-size: 17px; color: #190b00;">${story.challenge}</p>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">The Opportunity</h2>
        <p style="font-size: 17px; color: #190b00;">${story.opportunity}</p>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">What I Drove</h2>
        <p style="font-size: 17px; color: #190b00;">${story.whatIDrove}</p>
      </section>

      ${story.path === "allyra-story" ? `
      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">End-to-End Multi-Agent Workflow Pipeline</h2>
        <ol style="padding-left: 20px; font-size: 17px; color: #190b00; line-height: 1.7;">
          <li style="margin-bottom: 12px;"><strong>Stage 1: Intent &amp; Goal Formulation:</strong> Decomposes natural language business goals into a structured Directed Acyclic Graph (DAG) of discrete tasks with scoped tool dependencies.</li>
          <li style="margin-bottom: 12px;"><strong>Stage 2: Orchestration &amp; Delegation:</strong> A supervisory agent routes tasks to specialized domain agents (Knowledge Retrieval, Policy Compliance, Generation, API Execution) while bounding context windows.</li>
          <li style="margin-bottom: 12px;"><strong>Stage 3: Confidence Thresholds &amp; Guardrails:</strong> Dual-layer verification pairing deterministic rules (schema validation, data privacy boundaries) with probabilistic confidence scoring to prevent runtime hallucinations.</li>
          <li style="margin-bottom: 12px;"><strong>Stage 4: Human-in-the-Loop (HITL) Approval Gate:</strong> Contextual staging queue where low-confidence or high-stakes actions are paused for human review with explanatory diffs and quick-approval controls.</li>
          <li style="margin-bottom: 12px;"><strong>Stage 5: Live Execution &amp; Telemetry Audit:</strong> Execution through secure enterprise connectors with real-time tracking of latency, token expenditure, and error recovery in a centralized governance dashboard.</li>
        </ol>
      </section>
      ` : ""}

      ${story.path === "tulah-story" ? `
      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">Cross-Specialty Care Handover Matrix</h2>
        <ol style="padding-left: 20px; font-size: 17px; color: #190b00; line-height: 1.7;">
          <li style="margin-bottom: 12px;"><strong>Stage 1: Pre-Arrival Onboarding &amp; Intake:</strong> Digital capture of biometric data, medical contraindications, and wellness goals into a unified electronic health profile before check-in.</li>
          <li style="margin-bottom: 12px;"><strong>Stage 2: Multidisciplinary Specialist Consultations:</strong> Independent diagnostic assessments across Ayurveda, modern clinical medicine, naturopathy, and clinical nutrition.</li>
          <li style="margin-bottom: 12px;"><strong>Stage 3: Care Plan Synthesis &amp; Conflict Resolution:</strong> Automated conflict-detection engine flagging therapeutic contradictions across disciplines, enabling clinical leadership to synthesize a single source of truth care plan.</li>
          <li style="margin-bottom: 12px;"><strong>Stage 4: Synchronized Guest Timeline &amp; Operations Delivery:</strong> Real-time operational dispatch translating clinical plans into guest mobile schedules, custom herbal kitchen orders, and therapy room prep.</li>
        </ol>
      </section>
      ` : ""}

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">${story.path === "allyra-story" ? "Scale &amp; Adoption" : (story.path === "tulah-story" ? "Foundation &amp; Care Orchestration" : (story.path === "campaign-os-story" ? "The Solution" : "Outcome"))}</h2>
        <p style="font-size: 17px; color: #190b00;">${story.impact}</p>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">Key Product Decisions</h2>
        <ul style="padding-left: 20px; font-size: 17px; color: #190b00;">
          ${story.keyDecisions.map((d) => `<li style="margin-bottom: 8px;">${d}</li>`).join("")}
        </ul>
      </section>

      <section style="margin-bottom: 36px; padding: 24px; background: #fbf7ee; border-left: 4px solid #EE6C13;">
        <h2 style="font-size: 20px; margin: 0 0 8px 0; color: #EE6C13;">One Thing I Learned</h2>
        <p style="font-size: 18px; font-style: italic; margin: 0; color: #190b00;">"${story.oneThing}"</p>
      </section>
    </main>
  `;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${semanticBody}</div>`);

  return html;
}

function cleanBaseHtml(html) {
  let cleaned = html.replace(/\s*<script type="application\/ld\+json" id="json-ld-schema">[\s\S]*?<\/script>/i, "");
  cleaned = cleaned.replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>');
  return cleaned;
}

function generateHomeSemanticHtml(templateHtml) {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_SCHEMA,
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": `${BASE_URL}/`,
        "name": "Jayesh Soni Portfolio",
        "publisher": { "@id": `${BASE_URL}/#person` },
        "inLanguage": "en-GB"
      }
    ]
  };

  let html = templateHtml;
  const jsonLdScript = `\n    <script type="application/ld+json" id="json-ld-schema">${JSON.stringify(homeJsonLd, null, 2)}</script>\n  </head>`;
  html = html.replace("</head>", jsonLdScript);

  const semanticBody = `
    <main role="main" class="pre-rendered-seo" style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif; color: #190b00; line-height: 1.6;">
      <nav aria-label="Main Navigation" style="margin-bottom: 32px; display: flex; gap: 24px; font-size: 15px; font-weight: 700; border-bottom: 1px solid #e0dbd1; padding-bottom: 16px;">
        <a href="/" style="color: #190b00; text-decoration: none;">HOME</a>
        <a href="/about" style="color: #EE6C13; text-decoration: none;">ABOUT JAYESH SONI →</a>
      </nav>

      <header style="margin-bottom: 40px;">
        <h1 style="font-size: 40px; margin: 0 0 8px 0; font-weight: 800; letter-spacing: -0.5px;">Jayesh Soni</h1>
        <p style="font-size: 22px; color: #77695d; margin: 0; font-weight: 600;">Product Lead • AI Product Designer</p>
        <p style="font-size: 18px; color: #190b00; margin-top: 12px; max-width: 720px; line-height: 1.5;">Designing AI products that align human behaviour, business goals, and intelligent agents.</p>
      </header>

      <section style="margin-bottom: 40px;">
        <h2 style="font-size: 26px; margin: 0 0 16px 0;">Featured AI & Product Case Studies</h2>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 24px; border-bottom: 1px solid #7b7a77; padding-bottom: 16px;">
            <h3 style="font-size: 22px; margin: 0 0 8px 0;"><a href="/allyra-story" style="color: #190b00; text-decoration: none;">Allyra.ai — Scaling AI from Individual Agents to Enterprise-Grade Workflows</a></h3>
            <p style="color: #77695d; margin: 0;">Enterprise AI workforce orchestration, multi-agent governance, and telemetry systems.</p>
          </li>
          <li style="margin-bottom: 24px; border-bottom: 1px solid #7b7a77; padding-bottom: 16px;">
            <h3 style="font-size: 22px; margin: 0 0 8px 0;"><a href="/campaign-os-story" style="color: #190b00; text-decoration: none;">Campaign OS — Autonomous Campaign Operating System</a></h3>
            <p style="color: #77695d; margin: 0;">Connected marketing workflows, conversational analytics, and calm autonomous monitoring.</p>
          </li>
          <li style="margin-bottom: 24px; border-bottom: 1px solid #7b7a77; padding-bottom: 16px;">
            <h3 style="font-size: 22px; margin: 0 0 8px 0;"><a href="/tulah-story" style="color: #190b00; text-decoration: none;">Tulah Wellness Platform — Orchestrating Personalised Care Across Multidisciplinary Workflows</a></h3>
            <p style="color: #77695d; margin: 0;">Care handover protocols, guest journey timeline synchronisation, and workflow automation.</p>
          </li>
          <li style="margin-bottom: 24px; border-bottom: 1px solid #7b7a77; padding-bottom: 16px;">
            <h3 style="font-size: 22px; margin: 0 0 8px 0;"><a href="/vousvous-story" style="color: #190b00; text-decoration: none;">VousVous — Designing Fashion Discovery Beyond Search</a></h3>
            <p style="color: #77695d; margin: 0;">Gesture-first discovery, multimodal style synthesis, and AI-assisted personalised commerce.</p>
          </li>
        </ul>
      </section>

      <footer style="margin-top: 60px; padding-top: 24px; border-top: 1px solid #7b7a77; font-size: 15px; color: #77695d; display: flex; flex-wrap: wrap; gap: 24px;">
        <a href="/about" style="color: #EE6C13; font-weight: 700; text-decoration: none;">About Jayesh Soni</a>
        <a href="https://www.linkedin.com/in/jayeshsoni31/" target="_blank" rel="noopener noreferrer" style="color: #190b00; text-decoration: none;">LinkedIn</a>
        <a href="mailto:jayeshsoni31@gmail.com" style="color: #190b00; text-decoration: none;">Email</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style="color: #190b00; text-decoration: none;">Resume (PDF)</a>
      </footer>
    </main>
  `;

  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${semanticBody}</div>`);
}

function generateAboutHtml(baseHtml) {
  let html = baseHtml;
  const canonicalUrl = `${BASE_URL}/about`;
  const title = "About — Jayesh Soni | Product Lead & AI Product Designer";
  const desc = "About Jayesh Soni: Product Lead and AI Product Designer with 7+ years shaping human-AI interaction, enterprise AI systems, and scalable digital products.";

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = html.replace(/<link\s+rel="canonical"[\s\S]*?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+name="description"[\s\S]*?>/i, `<meta name="description" content="${desc}" />`);
  html = html.replace(/<meta\s+property="og:title"[\s\S]*?>/i, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta\s+property="og:description"[\s\S]*?>/i, `<meta property="og:description" content="${desc}" />`);
  html = html.replace(/<meta\s+property="og:url"[\s\S]*?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  const semanticBody = `
    <main role="main" class="pre-rendered-seo" style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif; color: #190b00; line-height: 1.6;">
      <nav aria-label="Breadcrumb" style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e0dbd1; padding-bottom: 16px;">
        <a href="/" style="color: #EE6C13; text-decoration: none; font-weight: 600;">← Back to Jayesh Soni Portfolio</a>
        <a href="/about" style="color: #190b00; text-decoration: none; font-weight: 600;">About Jayesh Soni →</a>
      </nav>
      
      <header style="margin-bottom: 40px; border-bottom: 1px solid #7b7a77; padding-bottom: 24px;">
        <p style="font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #77695d; margin: 0 0 8px 0;">[ ABOUT JAYESH SONI ]</p>
        <h1 style="font-size: 38px; line-height: 1.2; margin: 0 0 16px 0;">Product Lead & AI Product Designer</h1>
        <p style="font-size: 20px; color: #190b00; line-height: 1.4;">Designing Intelligent Products where human behaviour, business goals, and AI capabilities work together.</p>
      </header>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">In A Nutshell</h2>
        <p style="font-size: 18px; color: #190b00;">Product Lead and AI Product Designer with 7+ years of experience designing enterprise platforms, operational systems, and AI-native products across healthcare, education, wellness, marketplaces, and SaaS ecosystems. My work combines product strategy, systems thinking, and user experience to solve complex operational challenges and build intelligent products that connect user needs, business goals, and AI capabilities.</p>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">Selected Impact</h2>
        <ul style="padding-left: 20px; font-size: 17px; color: #190b00;">
          <li>Drove Allyra.ai's shift from an agent-building tool to an organisation-ready enterprise AI platform.</li>
          <li>Designed interaction patterns and task-focused, human-in-the-loop workflows for 19+ AI agents.</li>
          <li>Expanded Allyra's reach across 15+ organisations, including a pilot with a leading Indian enterprise group, through platform usage and API integrations.</li>
          <li>Led a team of 3 designers and 2 business analysts, boosting design throughput from ~1 to 2–3 features per designer per week.</li>
          <li>Designed workflow automation for Tulah, a wellness platform, replacing fragmented spreadsheets, documents, and manual communication with connected digital workflows.</li>
          <li>Delivered operational product experiences for Stanford Medicine, including the Financial Aid app.</li>
          <li>Speaker at TiE Chandigarh on AI and Human-Centred Design.</li>
        </ul>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">My Focus & Core Skills</h2>
        <ul style="padding-left: 20px; font-size: 17px; color: #190b00;">
          <li><strong>01 AI & Product:</strong> Human–AI Interaction, Agentic AI UX, Conversational AI, LLM-Powered Products, Generative AI (GenAI), Human-in-the-Loop Design, AI Guardrails, Multi-Agent Workflows, AI Product Strategy.</li>
          <li><strong>02 Product:</strong> Product Roadmap & Prioritisation, Product Discovery, 0-to-1 Product Development, Stakeholder Management, Cross-Functional Leadership, Enterprise SaaS, Workflow Automation.</li>
          <li><strong>03 Design:</strong> UX Strategy, Interaction Design, User Flows, Wireframing, Information Architecture, Usability Testing, User Research, Accessibility (WCAG), Design Systems, Rapid Prototyping, Developer Handoff.</li>
          <li><strong>04 Tools:</strong> Figma, Figma Make, Jira, Claude, ChatGPT, Gemini, Antigravity, HTML Prototyping.</li>
        </ul>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">Experience</h2>
        <ul style="padding-left: 20px; font-size: 17px; color: #190b00;">
          <li><strong>Jan 2025 – Present:</strong> Pansophic Technologies — Product Lead (allyra.ai, tulah, Raxaa.ai, EOMs.ai)</li>
          <li><strong>Jun 2024 – Dec 2024:</strong> Vrozart Dackson Enterprise — UXD Head (Vibe UX Framework, VousVous)</li>
          <li><strong>May 2023 – Jun 2024:</strong> Vertisystem (Client: Stanford Medicine) — UI UX Designer</li>
          <li><strong>Jun 2022 – May 2023:</strong> Joonify — User Interface Designer</li>
          <li><strong>May 2021 – May 2022:</strong> 5Exceptions Software Solutions — UI UX Designer</li>
          <li><strong>Oct 2020 – May 2021:</strong> Freelance — UI UX Designer (Robo Inventors)</li>
          <li><strong>Jun 2019 – Sep 2020:</strong> Tata Consultancy Services — Assistant System Engineer (Apple Production Support)</li>
        </ul>
      </section>

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">Education & Certification</h2>
        <ul style="padding-left: 20px; font-size: 17px; color: #190b00;">
          <li><strong>Bachelor of Engineering (Computer Science)</strong> (2015 – 2019) — Indore Institute of Science and Technology (RGPV University)</li>
          <li><strong>Google UX Design Professional Certificate</strong> (2023) — Google | Coursera</li>
        </ul>
      </section>
    </main>
  `;

  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${semanticBody}</div>`);
}

function runPrerender() {
  const indexHtmlPath = path.join(distDir, "index.html");
  if (!fs.existsSync(indexHtmlPath)) {
    console.error("dist/index.html not found. Please run vite build first.");
    process.exit(1);
  }

  const rawBaseHtml = fs.readFileSync(indexHtmlPath, "utf-8");
  const baseHtml = cleanBaseHtml(rawBaseHtml);

  // 1. Generate Pre-rendered Pages for each story route
  for (const story of STORIES) {
    const targetDir = path.join(distDir, story.path);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const storyHtml = generateStoryHtml(baseHtml, story);
    const targetFile = path.join(targetDir, "index.html");
    fs.writeFileSync(targetFile, storyHtml, "utf-8");

    const cleanHtmlFile = path.join(distDir, `${story.path}.html`);
    fs.writeFileSync(cleanHtmlFile, storyHtml, "utf-8");
    console.log(`[prerender] Generated static route: /${story.path}/index.html & /${story.path}.html`);
  }

  // 2. Generate Pre-rendered Page for /about
  const aboutDir = path.join(distDir, "about");
  if (!fs.existsSync(aboutDir)) {
    fs.mkdirSync(aboutDir, { recursive: true });
  }
  const aboutHtml = generateAboutHtml(baseHtml);
  fs.writeFileSync(path.join(aboutDir, "index.html"), aboutHtml, "utf-8");
  fs.writeFileSync(path.join(distDir, "about.html"), aboutHtml, "utf-8");
  console.log(`[prerender] Generated static route: /about/index.html & /about.html`);

  // 3. Enhance root index.html with fallback semantic HTML
  const homeHtml = generateHomeSemanticHtml(baseHtml);
  fs.writeFileSync(indexHtmlPath, homeHtml, "utf-8");
  console.log(`[prerender] Enhanced root /index.html with semantic content`);

  console.log("[prerender] Static pre-rendering completed successfully!");
}

runPrerender();
