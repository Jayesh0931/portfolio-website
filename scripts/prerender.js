import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

const BASE_URL = "https://jayeshsoni.com";
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
  "description": "Product Lead and AI Product Designer specializing in Enterprise AI Workforce systems, human-AI collaboration, and interaction design."
};

const STORIES = [
  {
    path: "allyra-story",
    title: "Allyra.ai Case Study — Jayesh Soni | Product Lead & AI Product Designer",
    description: "Case study on Allyra.ai: Scaling AI from individual agents to enterprise-grade workflows, agent orchestra governance, and enterprise deployment.",
    headline: "Scaling AI from Individual Agents to Enterprise-Grade Workflows",
    role: "Product Lead & AI Product Designer",
    scope: "Enterprise AI Workforce / Agent Orchestration / AI Governance / Interaction Architecture / Human-in-the-Loop Validation",
    overview: "Between 2024 and 2026, I helped shape Allyra from a no-code AI agent creation platform into an enterprise AI workspace capable of creating, training, orchestrating and operationalizing AI workers.",
    challenge: "In late 2024, the AI industry was obsessed with models. The real challenge wasn't access to AI. The challenge was turning AI into something businesses could actually use: prompt engineering, knowledge systems, APIs, integrations, and continuous maintenance. The people who understood business problems often couldn't build AI solutions themselves.",
    opportunity: "Instead of standalone prompt boxes and single-turn chatbots, the opportunity was to design an enterprise workspace where teams could compose, test, connect, and govern multi-agent workflows visually.",
    whatIDrove: "Agent Canvas & Orchestration Architecture, Live Evaluation & Governance Dashboards, Human-in-the-Loop Approval Protocols, Enterprise Multi-Tenant Workspaces.",
    impact: "70% reduction in agent setup time, high-governance multi-agent orchestration, enterprise deployment across Fortune 500 pilots.",
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
    title: "Campaign OS Case Study — Jayesh Soni | Product Lead & AI Product Designer",
    description: "Case study on Campaign OS: Designing an autonomous marketing & campaign operating system with connected workflows, conversational analytics, and calm monitoring.",
    headline: "Designing an Autonomous Marketing & Campaign Operating System",
    role: "Product Lead",
    scope: "Product Design / UX Strategy / Interaction Design / Design Systems / AI Experience Design",
    overview: "Planning, launching, monitoring and improving digital campaigns shouldn't require jumping across half a dozen tools. This project explored how AI could become an active marketing partner—helping teams move from strategy to execution inside one connected workspace.",
    challenge: "Marketing workflows are fragmented across creative generation, channel deployment, analytics dashboards, and optimization tools. Teams waste hours context-switching and manually copying data between disconnected software.",
    opportunity: "Connect the entire campaign lifecycle into a single collaborative workspace where AI assists across strategy, asset generation, multi-channel deployment, and autonomous performance monitoring.",
    whatIDrove: "Connected Workflows, Conversational Analytics Interface, Living Insights Canvas, Calm Monitoring System with human-in-the-loop controls.",
    impact: "Autonomous multi-channel monitoring, unified campaign lifecycle execution, conversational analytics turning dashboards into narrative insights.",
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
    title: "Tulah Clinical Wellness Case Study — Jayesh Soni | Product Lead & AI Product Designer",
    description: "Case study on Tulah: Streamlining multidisciplinary clinical workflows, patient care coordination, and calm wellness operations.",
    headline: "Orchestrating Personalized Care Across Complex Clinical Workflows",
    role: "Product Lead & Design Architect",
    scope: "Clinical Workflows / Patient Care Coordination / Multidisciplinary Systems / Operations",
    overview: "Delivering personalized wellness wasn't the challenge. Coordinating it was. Every guest journey involved multiple consultants, diagnostics, therapies, nutrition plans, fitness programs, medications, wearable data, and operational teams working together.",
    challenge: "Care teams worked in silos, recommendations became fragmented, activities were difficult to coordinate, guests struggled to understand what came next, and long-term continuity of care was hard to maintain.",
    opportunity: "Design a unified operational system that connected specialists, operations teams, and guests through a single, end-to-end care journey.",
    whatIDrove: "Cross-Specialty Coordination Matrix, Guest Journey Timeline, Clinical Handover Protocols, Unified Wellness Dashboard.",
    impact: "Unified multidisciplinary care orchestration, coordinated specialist handover, transparent guest timeline visibility.",
    keyDecisions: [
      "Design Around Roles, Not Software Modules",
      "Unified Guest Care Timeline as Single Source of Truth",
      "Calm Clinical Handover Alerts Without Operational Noise",
      "Continuous Care Feedback Loops Between Consultations"
    ],
    oneThing: "The hardest part of designing complex systems isn't creating workflows. It's creating shared understanding."
  },
  {
    path: "vousvous-story",
    title: "VousVous Case Study — Jayesh Soni | Product Lead & AI Product Designer",
    description: "Case study on VousVous: Declarative fashion discovery beyond search, multimodal style synthesis, and interactive wardrobe curation.",
    headline: "Designing Fashion Discovery Beyond Search",
    role: "Product Designer",
    scope: "Discovery Experience / AI Assisted Personalization / Conversational Commerce / Interaction Design / Fashion Marketplace",
    overview: "Fashion discovery has long been driven by filters, endless grids, and keyword searches. With VousVous, we explored a different interaction model—one where users discover, personalize, and create fashion through gestures and AI-guided conversations instead of traditional browsing.",
    challenge: "Most fashion platforms assume users know exactly what they're looking for. In reality, fashion shopping is exploratory. People discover styles while browsing, save pieces they like, compare options, and gradually refine their preferences. Traditional patterns interrupt this process with complex filters and overwhelming choices.",
    opportunity: "Discover naturally using simple gestures, express intent conversationally with AI, and personalize before purchasing with AI remixing and try-on.",
    whatIDrove: "Gesture-first discovery experience, Conversational AI workflows for fashion exploration, The remix interaction for personalisation, Quotation and measurement journeys, Consistent visual language, Reusable interaction patterns.",
    impact: "100+ Pilot Users, 3 Core Gestures (Like · Skip · Explore), AI-powered journey (Discover → Create → Remix → Quote → Purchase).",
    keyDecisions: [
      "Discovery Before Search — One design at a time with swipe-based exploration",
      "Conversation Over Filters — Expressing fashion intent through natural language",
      "Generative Co-Creation — AI as a partner for prompt-guided style variations and remixing",
      "Personalise Before Purchase — Integrating body profile and try-on directly into checkout"
    ],
    oneThing: "Designing for AI isn't about replacing familiar experiences. It's about introducing intelligence only where it removes friction. The strongest moments came from balancing human intuition with AI assistance."
  }
];

function generateStoryHtml(templateHtml, story) {
  const canonicalUrl = `${BASE_URL}/${story.path}`;

  let html = templateHtml;

  // 1. Update Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${story.title}</title>`);

  // 2. Update Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${story.description}" />`
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

  // 5. Update Twitter Tags
  html = html.replace(
    /<meta name="twitter:title" content=".*?" id="twitter-title" \/>/i,
    `<meta name="twitter:title" content="${story.title}" id="twitter-title" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" id="twitter-description" \/>/i,
    `<meta name="twitter:description" content="${story.description}" id="twitter-description" />`
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
        "inLanguage": "en-US"
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
      <nav aria-label="Breadcrumb" style="margin-bottom: 24px;">
        <a href="/" style="color: #EE6C13; text-decoration: none; font-weight: 600;">← Back to Jayesh Soni Portfolio</a>
      </nav>
      
      <header style="margin-bottom: 40px; border-bottom: 1px solid #7b7a77; padding-bottom: 24px;">
        <p style="font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #77695d; margin: 0 0 8px 0;">[ CASE STUDY ]</p>
        <h1 style="font-size: 36px; line-height: 1.2; margin: 0 0 16px 0;">${story.headline}</h1>
        <p style="font-size: 18px; color: #77695d; margin: 0 0 8px 0;"><strong>Role:</strong> ${story.role}</p>
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

      <section style="margin-bottom: 36px;">
        <h2 style="font-size: 24px; margin: 0 0 12px 0;">Validation & Impact</h2>
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
        "inLanguage": "en-US"
      }
    ]
  };

  let html = templateHtml;
  const jsonLdScript = `\n    <script type="application/ld+json" id="json-ld-schema">${JSON.stringify(homeJsonLd, null, 2)}</script>\n  </head>`;
  html = html.replace("</head>", jsonLdScript);

  const semanticBody = `
    <main role="main" class="pre-rendered-seo" style="max-width: 960px; margin: 0 auto; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif; color: #190b00; line-height: 1.6;">
      <header style="margin-bottom: 40px;">
        <h1 style="font-size: 40px; margin: 0 0 12px 0;">Jayesh Soni</h1>
        <p style="font-size: 22px; color: #77695d; margin: 0;">Product Lead & AI Product Designer</p>
        <p style="font-size: 16px; color: #77695d; margin-top: 8px;">Specializing in Enterprise AI Workforce systems, human-AI collaboration, and interaction architecture.</p>
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
            <h3 style="font-size: 22px; margin: 0 0 8px 0;"><a href="/tulah-story" style="color: #190b00; text-decoration: none;">Tulah Clinical Wellness — Orchestrating Personalized Care Across Multidisciplinary Workflows</a></h3>
            <p style="color: #77695d; margin: 0;">Clinical handover protocols, patient timeline synchronization, and operations design.</p>
          </li>
          <li style="margin-bottom: 24px; border-bottom: 1px solid #7b7a77; padding-bottom: 16px;">
            <h3 style="font-size: 22px; margin: 0 0 8px 0;"><a href="/vousvous-story" style="color: #190b00; text-decoration: none;">VousVous — Designing Fashion Discovery Beyond Search</a></h3>
            <p style="color: #77695d; margin: 0;">Gesture-first discovery, multimodal style synthesis, and AI-assisted personalized commerce.</p>
          </li>
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
    console.log(`[prerender] Generated static route: /${story.path}/index.html`);
  }

  // 2. Enhance root index.html with fallback semantic HTML
  const homeHtml = generateHomeSemanticHtml(baseHtml);
  fs.writeFileSync(indexHtmlPath, homeHtml, "utf-8");
  console.log(`[prerender] Enhanced root /index.html with semantic content`);

  console.log("[prerender] Static pre-rendering completed successfully!");
}

runPrerender();
