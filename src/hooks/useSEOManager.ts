import { useEffect } from "react";
import { CASE_STUDIES, PERSONAL_INFO, CaseStudyMeta } from "../data/portfolioData";

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  path: string;
  type?: string;
  image?: string;
  headline?: string;
  caseStudy?: CaseStudyMeta;
}

const getBaseUrl = () => {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return PERSONAL_INFO.domain;
};

const BASE_URL = getBaseUrl();
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png`;

const PERSON_SCHEMA = {
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: PERSONAL_INFO.name,
  jobTitle: PERSONAL_INFO.primaryTitle,
  url: `${BASE_URL}/`,
  image: DEFAULT_IMAGE,
  sameAs: [
    PERSONAL_INFO.linkedin,
    PERSONAL_INFO.twitter,
    PERSONAL_INFO.github,
  ],
  knowsAbout: [
    "Human–AI Interaction",
    "Agentic AI UX",
    "Conversational AI",
    "Multi-Agent Workflows",
    "AI Guardrails",
    "Enterprise AI Workforce",
    "Product Strategy & Leadership",
    "Enterprise SaaS",
    "Workflow Automation",
  ],
  description: `${PERSONAL_INFO.primaryTitle}. ${PERSONAL_INFO.heroTagline}`,
};

const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: `${BASE_URL}/`,
  name: "Jayesh Soni Portfolio",
  publisher: { "@id": `${BASE_URL}/#person` },
  inLanguage: "en-GB",
};

export function useSEOManager(path: string) {
  useEffect(() => {
    let config: SEOConfig;

    // Match case studies
    const matchedStudy = Object.values(CASE_STUDIES).find((study) =>
      path.startsWith(study.path)
    );

    if (matchedStudy) {
      config = {
        title: matchedStudy.title,
        description: matchedStudy.description,
        keywords: matchedStudy.keywords.join(", "),
        path: matchedStudy.path,
        type: "article",
        image: matchedStudy.ogImage,
        headline: matchedStudy.headline,
        caseStudy: matchedStudy,
      };
    } else if (path.startsWith("/about")) {
      config = {
        title: "About — Jayesh Soni | Product Lead & AI Product Designer",
        description:
          "About Jayesh Soni: Product Lead and AI Product Designer with 7+ years of experience shaping human–AI interaction, enterprise AI systems, and scalable digital products.",
        keywords:
          "Jayesh Soni, About, Product Lead, AI Product Designer, Background, Experience, Pansophic, Vrozart Dackson, Stanford Medicine",
        path: "/about",
        type: "profile",
        image: DEFAULT_IMAGE,
      };
    } else {
      config = {
        title: `${PERSONAL_INFO.name} • ${PERSONAL_INFO.primaryTitle}`,
        description: PERSONAL_INFO.seoDescription,
        keywords: PERSONAL_INFO.metaKeywords,
        path: "/",
        type: "website",
        image: DEFAULT_IMAGE,
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
    setMetaTag('meta[name="keywords"]', "content", config.keywords);
    setMetaTag('meta[property="og:title"]', "content", config.title);
    setMetaTag('meta[property="og:description"]', "content", config.description);
    setMetaTag('meta[property="og:url"]', "content", canonicalUrl);
    setMetaTag('meta[property="og:type"]', "content", config.type || "website");
    setMetaTag('meta[property="og:image"]', "content", pageImage);
    setMetaTag('meta[property="og:locale"]', "content", "en_GB");
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
      url: canonicalUrl,
      name: config.title,
      description: config.description,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#person` },
      inLanguage: "en-GB",
    };

    schemaGraph.push(webpageSchema);

    // Breadcrumb schema
    const breadcrumbItems: any[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/`,
      },
    ];

    if (config.path !== "/") {
      let pageLabel = "About";
      if (config.caseStudy) {
        pageLabel = `${config.caseStudy.title.split(" — ")[0]}`;
      }
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: pageLabel,
        item: canonicalUrl,
      });
    }

    schemaGraph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems,
    });

    // Page-specific CreativeWork / CaseStudy schemas
    if (config.caseStudy) {
      schemaGraph.push({
        "@type": "CreativeWork",
        "@id": `${canonicalUrl}#casestudy`,
        name: config.caseStudy.title,
        headline: config.caseStudy.headline,
        url: canonicalUrl,
        description: config.caseStudy.description,
        author: { "@id": `${BASE_URL}/#person` },
        publisher: { "@id": `${BASE_URL}/#person` },
        inLanguage: "en-GB",
        about: config.caseStudy.keywords,
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
      "@graph": schemaGraph,
    });
  }, [path]);
}
