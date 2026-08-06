import { useEffect } from "react";

interface SEOConfig {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
}

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
    "https://www.linkedin.com/in/jayeshsoni09/",
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

const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": `${BASE_URL}/`,
  "name": "Jayesh Soni Portfolio",
  "publisher": { "@id": `${BASE_URL}/#person` },
  "inLanguage": "en-US"
};

export function useSEOManager(path: string) {
  useEffect(() => {
    let config: SEOConfig;

    if (path.startsWith("/allyra-story")) {
      config = {
        title: "Allyra.ai Case Study — Jayesh Soni | Product Lead & AI Product Designer",
        description: "Case study on Allyra.ai: Scaling AI from individual agents to enterprise-grade workflows, agent orchestra governance, and enterprise deployment.",
        path: "/allyra-story",
        type: "article",
      };
    } else if (path.startsWith("/campaign-os-story")) {
      config = {
        title: "Campaign OS Case Study — Jayesh Soni | Product Lead & AI Product Designer",
        description: "Case study on Campaign OS: Designing an autonomous marketing & campaign operating system with connected workflows, conversational analytics, and calm monitoring.",
        path: "/campaign-os-story",
        type: "article",
      };
    } else {
      config = {
        title: "Jayesh Soni: Product Lead & AI Product Designer",
        description: "Portfolio of Jayesh Soni - Product Lead and AI Product Designer specializing in Enterprise AI Workforce systems, human-AI collaboration, and interactive web experiences.",
        path: "/",
        type: "website",
      };
    }

    const canonicalUrl = `${BASE_URL}${config.path === "/" ? "" : config.path}`;
    const pageImage = config.image || DEFAULT_IMAGE;

    // Update document title
    document.title = config.title;

    // Helper to set meta attributes safely
    const setMetaTag = (selector: string, attributeName: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const match = selector.match(/\[(.*?)="(.*?)"\]/);
        if (match) {
          element.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attributeName, value);
    };

    // Update meta tags
    setMetaTag('meta[name="description"]', "content", config.description);
    setMetaTag('meta[property="og:title"]', "content", config.title);
    setMetaTag('meta[property="og:description"]', "content", config.description);
    setMetaTag('meta[property="og:url"]', "content", canonicalUrl);
    setMetaTag('meta[property="og:type"]', "content", config.type || "website");
    setMetaTag('meta[property="og:image"]', "content", pageImage);
    setMetaTag('meta[name="twitter:title"]', "content", config.title);
    setMetaTag('meta[name="twitter:description"]', "content", config.description);
    setMetaTag('meta[name="twitter:image"]', "content", pageImage);

    // Update canonical URL link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Build page-specific JSON-LD graph
    const schemaGraph: any[] = [PERSON_SCHEMA, WEBSITE_SCHEMA];

    const webpageSchema: any = {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      "name": config.title,
      "description": config.description,
      "isPartOf": { "@id": `${BASE_URL}/#website` },
      "about": { "@id": `${BASE_URL}/#person` },
      "inLanguage": "en-US"
    };

    schemaGraph.push(webpageSchema);

    // Breadcrumb schema
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${BASE_URL}/`
      }
    ];

    if (config.path !== "/") {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": config.path.includes("allyra") ? "Allyra.ai Case Study" : "Campaign OS Case Study",
        "item": canonicalUrl
      });
    }

    schemaGraph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      "itemListElement": breadcrumbItems
    });

    // Page-specific CreativeWork / CaseStudy schemas
    if (config.path === "/allyra-story") {
      schemaGraph.push({
        "@type": "CreativeWork",
        "@id": `${canonicalUrl}#casestudy`,
        "name": "Allyra.ai: Scaling AI from Individual Agents to Enterprise-Grade Workflows",
        "headline": "Scaling AI from Individual Agents to Enterprise-Grade Workflows",
        "url": canonicalUrl,
        "description": "Enterprise case study detailing multi-agent workflow orchestration, governance dashboard, and human-AI outcome validation.",
        "author": { "@id": `${BASE_URL}/#person` },
        "publisher": { "@id": `${BASE_URL}/#person` },
        "about": ["Enterprise AI Workforce", "Agent Orchestration", "AI Governance"]
      });
    } else if (config.path === "/campaign-os-story") {
      schemaGraph.push({
        "@type": "CreativeWork",
        "@id": `${canonicalUrl}#casestudy`,
        "name": "Campaign OS: Autonomous Campaign Operating System",
        "headline": "Designing an Autonomous Marketing & Campaign Operating System",
        "url": canonicalUrl,
        "description": "Case study exploring connected workflows, conversational analytics, living insights, and calm monitoring.",
        "author": { "@id": `${BASE_URL}/#person` },
        "publisher": { "@id": `${BASE_URL}/#person` },
        "about": ["Connected Workflows", "Conversational Analytics", "Calm Monitoring", "Living Insights"]
      });
    }

    // Inject / Update JSON-LD Script tag in <head>
    let scriptTag = document.querySelector('script[id="json-ld-schema"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-schema";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph
    });
  }, [path]);
}
