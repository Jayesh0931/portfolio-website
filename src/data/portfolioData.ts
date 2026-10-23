/**
 * Authoritative Single Source of Truth for Jayesh Soni Portfolio
 * All React pages, SEO managers, and pre-render scripts reference this data.
 */

export interface CaseStudyMeta {
  slug: string;
  path: string;
  title: string;
  headline: string;
  company: string;
  year: string;
  role: string;
  team?: string;
  scope: string;
  description: string;
  keywords: string[];
  ogImage: string;
  overview: string;
  challenge: string;
  opportunity: string;
  whatIDrove: string;
  impact: string[];
  keyDecisions: string[];
  oneThing: string;
}

export const PERSONAL_INFO = {
  name: "Jayesh Soni",
  primaryTitle: "Product Lead • AI Product Designer",
  heroTagline: "Designing AI products that align human behaviour, business goals, and intelligent agents.",
  seoDescription: "Portfolio of Jayesh Soni — Product Lead and AI Product Designer specialising in Enterprise AI Workforce systems, human–AI interaction, and multi-agent workflows.",
  metaKeywords: "Jayesh Soni, Product Lead, AI Product Designer, Enterprise AI Workforce, Human-AI Interaction, Agentic AI UX, Multi-Agent Workflows, Conversational AI, Portfolio",
  domain: "https://jayeshsoni.com",
  email: "jayeshsoni31@gmail.com",
  phone: "+91-9755113185",
  linkedin: "https://www.linkedin.com/in/jayeshsoni31/",
  twitter: "https://x.com/jayeshsoni_",
  github: "https://github.com/Jayesh0931",
  resumePath: "/Jayesh_Soni_Resume_November_2026.pdf",
  locale: "en_GB",
};

export const IMPACT_HIGHLIGHTS = [
  {
    num: "15+",
    label: "Organisations Reached",
    desc: "Expanded Allyra's reach across 15+ organisations, including a pilot with a leading Indian enterprise group.",
  },
  {
    num: "19+",
    label: "AI Agents Designed",
    desc: "Designed interaction patterns and task-focused, human-in-the-loop workflows for 19+ AI agents.",
  },
  {
    num: "~1 → 2–3",
    label: "Features / Designer / Week",
    desc: "Increased design throughput from ~1 to 2–3 features per designer per week through AI-assisted workflows and coded prototypes.",
  },
  {
    num: "Tulah",
    label: "Wellness Platform Automation",
    desc: "Designed connected digital workflows for a wellness platform, replacing fragmented spreadsheets and manual forms.",
  },
  {
    num: "Stanford",
    label: "Stanford Medicine",
    desc: "Designed operational UI/UX for course planning, accounts, scholarships, and the Financial Aid app.",
  },
  {
    num: "TiE Talk",
    label: "Keynote Speaker",
    desc: "Speaker at TiE Chandigarh on AI and Human-Centred Design.",
  },
];

export const CASE_STUDIES: Record<string, CaseStudyMeta> = {
  allyra: {
    slug: "allyra-story",
    path: "/allyra-story",
    title: "Allyra.ai Case Study — Jayesh Soni | Product Lead • AI Product Designer",
    headline: "Scaling AI from Individual Agents to Enterprise-Grade Workflows",
    company: "Pansophic Technologies",
    year: "2024–2026",
    role: "Product Lead",
    team: "3 designers and 2 business analysts",
    scope: "Enterprise AI Workforce / Multi-Agent Orchestration / AI Governance / Interaction Architecture",
    description: "Case study on Allyra.ai: Scaling enterprise AI workforce systems from point-solution bots to multi-agent workflows with human-in-the-loop governance.",
    keywords: [
      "Allyra.ai",
      "Enterprise AI Workforce",
      "Multi-Agent Workflows",
      "Agentic AI UX",
      "Human-in-the-Loop",
      "AI Governance",
      "AI Guardrails"
    ],
    ogImage: "https://jayeshsoni.com/assets/allyra_story_hero-C4SPDcuF.webp",
    overview: "Between 2024 and 2026, I led product direction and UX strategy for Allyra.ai, evolving it from an agent-building tool into an organisation-ready enterprise AI platform capable of creating, training, orchestrating, and operationalising AI workers.",
    challenge: "In late 2024, the AI industry was obsessed with models. The real challenge wasn't access to AI. The challenge was turning AI into something businesses could actually use: prompt engineering, knowledge systems, APIs, integrations, and continuous maintenance.",
    opportunity: "Instead of standalone prompt boxes and single-turn chatbots, the opportunity was to design an enterprise workspace where teams could compose, test, connect, and govern multi-agent workflows visually.",
    whatIDrove: "Agent Canvas & Orchestration Architecture, Live Evaluation & Governance Dashboards, Human-in-the-Loop Approval Protocols, Enterprise Workspaces, and leadership of a team of 3 designers and 2 business analysts.",
    impact: [
      "Expanded reach across 15+ organisations, including a pilot with a leading Indian enterprise group, through platform usage and API integrations",
      "Designed interaction patterns and task-focused, human-in-the-loop workflows for 19+ AI agents across diverse enterprise domains"
    ],
    keyDecisions: [
      "Role-Based Agent Hierarchies over Monolithic LLMs",
      "Transparent Observability and Telemetry Before Autonomous Execution",
      "Composable Enterprise Knowledge Connectors",
      "Human-in-the-Loop Confidence Threshold Gates"
    ],
    oneThing: "The hardest part of enterprise AI isn't making models smarter—it's making AI systems observable, governable, and trustworthy for human teams."
  },

  campaignOS: {
    slug: "campaign-os-story",
    path: "/campaign-os-story",
    title: "Campaign OS Case Study — Jayesh Soni | Product Lead",
    headline: "Designing an Autonomous Marketing & Campaign Operating System",
    company: "Vrozart Dackson Enterprise",
    year: "2025",
    role: "Product Lead",
    team: "Client Engagement (NDA)",
    scope: "Product Direction / UX Strategy / Autonomous Marketing / Conversational Analytics",
    description: "Case study on Campaign OS: Client project directed at Vrozart Dackson designing an autonomous campaign operating system with conversational analytics and calm monitoring.",
    keywords: [
      "Campaign OS",
      "Autonomous Marketing",
      "Conversational Analytics",
      "Living Insights",
      "Calm Monitoring",
      "Multi-Channel Workflows"
    ],
    ogImage: "https://jayeshsoni.com/assets/cos-story-hero-CDaydGfO.webp",
    overview: "Directed product experience for an enterprise campaign operating system while at Vrozart Dackson (anonymised under NDA). The system connects the entire campaign lifecycle into a single collaborative workspace where AI acts as an active marketing partner.",
    challenge: "Marketing workflows are fragmented across creative generation, channel deployment, analytics dashboards, and optimisation tools. Teams waste hours context-switching and manually copying data between disconnected software.",
    opportunity: "Connect the entire campaign lifecycle into a single collaborative workspace where AI assists across strategy, asset generation, multi-channel deployment, and autonomous performance monitoring.",
    whatIDrove: "Connected Workflows, Conversational Analytics Interface, Living Insights Canvas, Calm Monitoring System with human-in-the-loop controls.",
    impact: [
      "Unified campaign planning, execution, and optimisation into a single continuous canvas",
      "Conversational analytics converting static charts into interactive dialogues explaining metric drivers",
      "Autonomous background monitoring that alerts marketers only when human intervention is required"
    ],
    keyDecisions: [
      "Connected Workflows over Point Solutions",
      "Conversational Analytics Turning Data into Actionable Strategy",
      "Living Insights Canvas for Iterative Creative Remixing",
      "Calm Autonomous Monitoring with Proactive Anomaly Alerts"
    ],
    oneThing: "Designing AI products isn't about adding chat to existing software. The real challenge is deciding when AI should guide, when it should collaborate and when it should quietly stay out of the way."
  },

  tulah: {
    slug: "tulah-story",
    path: "/tulah-story",
    title: "Tulah Wellness Platform Case Study — Jayesh Soni | Product Lead",
    headline: "Orchestrating Personalised Care Across Complex Wellness Workflows",
    company: "Pansophic Technologies",
    year: "2025",
    role: "Product Lead",
    team: "Cross-functional Product & Operations",
    scope: "Workflow Automation / Wellness Operations / Journey Coordination",
    description: "Case study on Tulah: Designing workflow automation for a wellness platform, replacing fragmented spreadsheets and manual forms with connected digital workflows.",
    keywords: [
      "Tulah",
      "Wellness Platform",
      "Workflow Automation",
      "Care Coordination",
      "Operations Design",
      "Journey Timeline"
    ],
    ogImage: "https://jayeshsoni.com/assets/tulah-story-hero-D5MXapZP.webp",
    overview: "Delivering personalised wellness wasn't the challenge. Coordinating it was. Designed workflow automation for Tulah, a wellness platform, replacing fragmented spreadsheets, documents, forms, and manual communication with connected digital workflows.",
    challenge: "Teams worked in silos, recommendations became fragmented across spreadsheets and forms, activities were difficult to coordinate, and continuity of care was hard to maintain.",
    opportunity: "Design a unified operational system that connected specialists, operations teams, and guests through a single, end-to-end journey timeline.",
    whatIDrove: "Cross-Specialty Coordination Matrix, Guest Journey Timeline, Operational Handover Protocols, Unified Wellness Dashboard.",
    impact: [
      "Connected digital workflow automation replacing fragmented spreadsheets and manual forms",
      "Unified operational handover between wellness specialists and operations teams",
      "Transparent journey timeline visibility for end-to-end guest coordination"
    ],
    keyDecisions: [
      "Design Around Roles, Not Software Modules",
      "Unified Guest Care Timeline as Single Source of Truth",
      "Calm Operational Handover Alerts Without Noise",
      "Continuous Feedback Loops Between Consultations"
    ],
    oneThing: "The hardest part of designing complex systems isn't creating workflows. It's creating shared understanding."
  },

  vousvous: {
    slug: "vousvous-story",
    path: "/vousvous-story",
    title: "VousVous Case Study — Jayesh Soni | UXD Head, Vrozart Dackson",
    headline: "Designing Fashion Discovery Beyond Search",
    company: "Vrozart Dackson Enterprise",
    year: "2026",
    role: "UXD Head, Vrozart Dackson",
    team: "Design & Engineering Team",
    scope: "Product Direction / Gesture-First Discovery / Multimodal AI Synthesis / Conversational Commerce",
    description: "Case study on VousVous: Declarative fashion discovery beyond search using gesture-first UX and conversational multimodal AI.",
    keywords: [
      "VousVous",
      "Fashion Discovery",
      "Gesture-First UX",
      "Multimodal AI",
      "Conversational Commerce",
      "Vibe UX Framework"
    ],
    ogImage: "https://jayeshsoni.com/assets/vousvous-story-hero-FHJVyzag.webp",
    overview: "Fashion discovery has long been driven by filters, endless grids, and keyword searches. With VousVous, we explored a different interaction model—one where users discover, personalise, and create fashion through gestures and AI-guided conversations instead of traditional browsing.",
    challenge: "Most fashion platforms assume users know exactly what they're looking for. In reality, fashion shopping is exploratory. Traditional patterns interrupt this process with complex filters and overwhelming choices.",
    opportunity: "Discover naturally using simple gestures, express intent conversationally with AI, and personalise before purchasing with AI remixing and try-on.",
    whatIDrove: "Gesture-first discovery experience, Conversational AI workflows for fashion exploration, The remix interaction for personalisation, Quotation and measurement journeys, Design system.",
    impact: [
      "100+ Pilot Users with high engagement across gesture-first discovery",
      "3 Core Gestures (Like · Skip · Explore) replacing traditional filter panels",
      "End-to-end AI-powered journey: Discover → Create → Remix → Quote → Purchase"
    ],
    keyDecisions: [
      "Discovery Before Search — One design at a time with swipe-based exploration",
      "Conversation Over Filters — Expressing fashion intent through natural language",
      "Generative Co-Creation — AI as a partner for prompt-guided style variations and remixing",
      "Personalise Before Purchase — Integrating body profile and try-on directly into checkout"
    ],
    oneThing: "Designing for AI isn't about replacing familiar experiences. It's about introducing intelligence only where it removes friction. The strongest moments came from balancing human intuition with AI assistance."
  },

  joonify: {
    slug: "joonify-story",
    path: "/joonify-story",
    title: "Joonify Case Study — Jayesh Soni | User Interface Designer",
    headline: "Child Talent Discovery Assessment & Personalised Growth Roadmaps",
    company: "Joonify",
    year: "2022–2023",
    role: "User Interface Designer",
    team: "Product & EdTech Team",
    scope: "Product Design / Assessment Experience / Interaction Design / Ed-Tech Platform",
    description: "Case study on Joonify: Helping parents understand how their children learn, grow, and discover their strengths through early childhood assessments.",
    keywords: [
      "Joonify",
      "EdTech Design",
      "Talent Discovery",
      "Child Profiling",
      "Assessment Journey",
      "Personalised Learning"
    ],
    ogImage: "https://jayeshsoni.com/assets/joonify_desktop-CoP02MZj.webp",
    overview: "Joonify brought child talent discovery, learning recommendations, and educational planning into one platform—helping parents make more informed decisions about their child's development.",
    challenge: "Every child has different strengths, interests, and learning needs. Joonify aimed to help parents understand these differences through a talent discovery assessment and connect them with relevant learning resources.",
    opportunity: "Connect three key parts of a child's learning journey: Understand (child profiling), Discover (talent assessment), and Grow (curated courses and schedules).",
    whatIDrove: "Talent Discovery Assessment Experience, Learning Scheduler, Course Discovery Hub, Quiz and Exam Flows, Referral System, Design System.",
    impact: [
      "Platform serving 750+ parents through guided talent discovery assessments",
      "30-Minute pressure-free talent discovery journey evaluating 6 development dimensions",
      "Connected learning ecosystem connecting assessment insights to tailored course roadmaps"
    ],
    keyDecisions: [
      "Understand Before Prescribing — Comprehensive child profiling across cognitive and behavioral traits",
      "Assessment Without Anxiety — 30-minute engaging, pressure-free talent discovery journey",
      "Connected Learning Ecosystem — Unifying talent assessment with tailored course recommendations",
      "Actionable Clarity for Parents — Translating developmental data into clear growth roadmaps"
    ],
    oneThing: "Joonify was an opportunity to design beyond individual screens—to connect a child's profile, assessment journey, and learning resources into a cohesive product experience."
  }
};
