import imgE1 from "@/imports/E1.webp";
import imgE2 from "@/imports/E2.webp";

export interface AgenticFeatureItem {
  id: string;
  num: string;
  tag: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  rationale: string;
  tradeoff: string;
  businessGoal: string;
}

export const AGENTIC_SEARCH_SECTION_DATA = {
  eyebrow: "RECENT PRODUCT WORK · PORTAL NXT",
  heading: "Designing the next generation of AI-powered experiences.",
  intro:
    "Recent work exploring how people express intent, understand AI-generated responses, navigate complex information and stay in control as intelligent systems take action.",
  ctaHeading: "Explore the actual experience.",
  ctaSupportingCopy:
    "A closer look at the screens, interaction decisions and prototypes behind Allyra.",
  ctaActionLabel: "Explore product experience",
  ctaTargetRoute: "/allyra-story",
};

export const AGENTIC_SEARCH_FEATURES: AgenticFeatureItem[] = [
  {
    id: "feature-01",
    num: "01",
    tag: "[ FEATURE 01 ]",
    title: "From search intent to actionable outcomes",
    imageSrc: "/video-frames/allyra_e4.png",
    imageAlt: "Allyra goal-to-workflow progression: task formulation, multi-agent orchestration, and structured execution pipeline",
    rationale:
      "Translate ambiguous user intent into structured plans and actionable outcomes.",
    tradeoff:
      "Guided planning adds interaction steps compared with a simple search or chat input, but makes complex execution easier to understand and direct.",
    businessGoal:
      "Improve task completion and reduce the effort required to reach an outcome.",
  },
  {
    id: "feature-02",
    num: "02",
    tag: "[ FEATURE 02 ]",
    title: "Making AI responses transparent and trustworthy",
    imageSrc: imgE2,
    imageAlt: "Allyra enterprise governance: scoped connector permissions, access management, and audit decision checkpoints",
    rationale:
      "Make agent permissions, actions and decision checkpoints visible to users.",
    tradeoff:
      "Additional confirmations introduce friction, but help prevent unintended actions and make the system more understandable.",
    businessGoal:
      "Build enterprise confidence and support responsible AI adoption.",
  },
  {
    id: "feature-03",
    num: "03",
    tag: "[ FEATURE 03 ]",
    title: "Structuring complex information into usable outputs",
    imageSrc: imgE1,
    imageAlt: "Allyra enterprise workspace portal: structured deliverable previews, operational status tables, and activity stream",
    rationale:
      "Turn complex agent-generated information into readable, structured outputs that users can act on.",
    tradeoff:
      "Structured layouts require more design and presentation decisions than returning a conversational response alone.",
    businessGoal:
      "Improve information comprehension and support faster decision-making.",
  },
  {
    id: "feature-04",
    num: "04",
    tag: "[ FEATURE 04 ]",
    title: "Designing human-in-the-loop interactions",
    imageSrc: "/video-frames/allyra_e5.png",
    imageAlt: "Allyra human-in-the-loop review workflow: human quality review, approval checkpoints, and intervention controls",
    rationale:
      "Introduce human confirmation and escalation at moments where agent actions need oversight.",
    tradeoff:
      "Human checkpoints reduce full autonomy, but help users retain control over consequential actions.",
    businessGoal:
      "Enable safer, more dependable use of AI in enterprise workflows.",
  },
];
