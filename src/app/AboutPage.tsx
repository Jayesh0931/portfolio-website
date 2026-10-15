import React, { useEffect, useState } from "react";
import BrandVector from "@/components/BrandVector";
import Footer from "@/components/Footer";
import { MobileFinale } from "./components/mobile/MobileFinale";
import profileImg from "@/imports/Profile Image Full Size.webp";
import imgE1 from "@/imports/E1.webp";
import imgE2 from "@/imports/E2.webp";
import imgE3_1 from "@/imports/E3.1.webp";
import imgE3_2 from "@/imports/E3.2.webp";
import imgCosCoverLarge from "@/imports/cos_cover_large.webp";
import imgAllyraStoryHero from "@/imports/allyra_story_hero.webp";
import imgTulahLargeThumb from "@/imports/tulah_large_thumb.webp";

interface AboutPageProps {
  navigateTo: (path: string) => void;
  disableScrollReset?: boolean;
}

const CLIENTS = [
  "Pansophic Technologies",
  "Stanford Medicine",
  "allyra.ai",
  "tulah",
  "Tata Consultancy Services",
  "VousVous",
  "Joonify",
  "Vertisystem",
  "5Exceptions",
];

const IMPACT_HIGHLIGHTS = [
  {
    num: "60–70%",
    label: "Workflow Overhead Reduction",
    desc: "Led design of operational systems for tulah, significantly reducing clinical and service delivery friction.",
  },
  {
    num: "25–30",
    label: "Enterprise Client Demos",
    desc: "Spearheaded product demos for allyra.ai resulting in 3 successful enterprise client onboardings.",
  },
  {
    num: "TiE Talk",
    label: "Keynote Speaker",
    desc: "Delivered invited talk at TiE Chandigarh on 'AI and Human-Centred Design' and autonomous workflows.",
  },
  {
    num: "Stanford",
    label: "Leadership Recognition",
    desc: "Received formal recognition from Stanford Medicine leadership for course-planning and scholarship UX.",
  },
];

const FOCUS_ITEMS = [
  {
    num: "01",
    title: "HUMAN–AI INTERACTION & AGENTIC UX",
    skills: [
      "Agentic UX",
      "AI Behavior Design",
      "Adaptive Interfaces",
      "Conversational UX",
      "Enterprise AI Systems",
    ],
    desc: "I shape the moments where people decide whether to trust intelligent systems—defining interaction patterns, agentic workflows, and supervisory models for enterprise teams.",
  },
  {
    num: "02",
    title: "PRODUCT STRATEGY & ENTERPRISE PLATFORMS",
    skills: [
      "Product Strategy",
      "Operational Systems",
      "AI Product Management",
      "Workflow Design",
      "Cross-functional Leadership",
    ],
    desc: "Translating complex operational challenges and technical capability into clear product architectures, leading cross-functional teams from discovery through live enterprise releases.",
  },
  {
    num: "03",
    title: "SYSTEMS THINKING & CRAFT",
    skills: [
      "Design Systems",
      "Vibe UX Framework",
      "Rapid Prototyping",
      "Figma",
      "Information Architecture",
    ],
    desc: "Co-authoring modern AI UX frameworks, building scalable component libraries, and creating high-fidelity interactive models that accelerate stakeholder alignment and developer handoffs.",
  },
];

const EXPERIENCES = [
  {
    period: "JAN 2025 – PRESENT",
    company: "Pansophic Technologies",
    role: "Product Lead",
    subnote: "Promoted into Product Leadership following transition of the core Vrozart team",
    summary:
      "Lead product strategy and experience design across pilot, beta, and live releases for allyra.ai (Human-AI Interaction platform). Defined interaction patterns, agentic workflows, adaptive interfaces, and enterprise AI experiences. Supported 25–30 enterprise client demonstrations resulting in 3 successful client onboardings. Partner with engineering, sales, marketing, and leadership to align product direction and customer feedback. Contributing to early-stage platforms Raxaa.ai and EOMs.ai, shaping core workflows. Led design of operational systems for tulah (Client), reducing workflow overhead by approximately 60–70%.",
    tags: ["allyra.ai", "Agentic Workflows", "tulah", "Raxaa.ai & EOMs.ai", "Enterprise Demos"],
  },
  {
    period: "JUN 2024 – DEC 2024",
    company: "Vrozart Dackson Enterprise Pvt. Ltd.",
    role: "UXD Head",
    subnote: "Core Team transitioned to Pansophic Technologies",
    summary:
      "Co-authored the Vibe UX Framework, establishing principles for context-aware and AI-native user experiences. Led UX and interaction design across enterprise SaaS, AI-powered products, and consumer platforms. Directed product experience for Farmland Bazaar, Evosell by Evoluxar, and VousVous across discovery, workflows, and platform architecture. Established scalable design systems and developer handoff workflows across multiple product squads.",
    tags: ["Vibe UX Framework", "VousVous", "Farmland Bazaar", "Design Systems"],
  },
  {
    period: "MAY 2023 – JUN 2024",
    company: "Vertisystem (Client: Stanford Medicine)",
    role: "UI UX Designer",
    subnote: "Formal recognition received from Stanford Medicine leadership",
    summary:
      "Delivered end-to-end UX design for Stanford Medicine operational applications supporting scholarship and course-planning workflows. Created high-fidelity prototypes and interaction models that accelerated development and stakeholder alignment. Independently managed product design across distributed teams and complex administrative workflows.",
    tags: ["Stanford Medicine", "Administrative UX", "Course Planning", "Prototyping"],
  },
  {
    period: "JUN 2022 – MAY 2023",
    company: "Joonify",
    role: "User Interface Designer",
    subnote: "Platform trusted by 750+ parents",
    summary:
      "Designed end-to-end product experiences across web and mobile platforms for parents and children. Created the Talent Discovery Assessment journey, helping deliver personalized learning and growth insights through guided assessments.",
    tags: ["Ed-Tech", "Assessment Journey", "Personalized Learning", "Web & Mobile"],
  },
  {
    period: "MAY 2021 – MAY 2022",
    company: "5Exceptions Software Solutions",
    role: "UI UX Designer",
    subnote: "Cross-domain enterprise & consumer platforms",
    summary:
      "Designed digital products across healthcare, fintech, education, utility, and emerging technology domains. Delivered UX and UI solutions for web platforms, mobile applications, enterprise systems, e-commerce products, and HMI interfaces. Built foundational expertise in responsive design systems, interaction design, and developer handoffs.",
    tags: ["Healthcare & Fintech", "HMI Interfaces", "Design Systems"],
  },
  {
    period: "OCT 2020 – MAY 2021",
    company: "Freelance",
    role: "UI UX Designer",
    subnote: "IoT & smart hardware product launches",
    summary:
      "Collaborated with Robo Inventors on e-commerce platforms, IoT applications, and smart home product launches. Designed customer-facing experiences across web, mobile, and connected-device ecosystems, gaining early exposure to full product lifecycle thinking.",
    tags: ["Smart Home & IoT", "E-Commerce", "Product Lifecycle"],
  },
  {
    period: "JUN 2019 – SEP 2020",
    company: "Tata Consultancy Services",
    role: "Assistant System Engineer",
    subnote: "Apple Production Support (APS) Operations",
    summary:
      "Supported Apple Production Support (APS) operations for internal enterprise applications, managing incidents and business-critical workflows. Developed foundational expertise in enterprise systems, large-scale operations, SLA-driven service delivery, and systems thinking.",
    tags: ["Apple Production Support", "Enterprise Operations", "Systems Thinking"],
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Engineering (Computer Science)",
    institution: "Indore Institute of Science and Technology (RGPV University)",
    year: "2015 – 2019",
  },
  {
    degree: "Google UX Design Professional Certificate",
    institution: "Google | Coursera",
    year: "2023",
  },
];

const GALLERY_IMAGES = [
  { src: profileImg, alt: "Jayesh Soni Portrait", label: "Jayesh Soni" },
  { src: imgE1, alt: "Brand Architecture Exploration", label: "Brand Architecture" },
  { src: imgCosCoverLarge, alt: "Campaign OS Interface", label: "Campaign OS" },
  { src: imgE2, alt: "Editorial & Typography Craft", label: "Visual Craft" },
  { src: imgAllyraStoryHero, alt: "Allyra Multi-Agent Orchestration", label: "allyra.ai" },
  { src: imgE3_1, alt: "Mobile Interface Craft", label: "Mobile Craft" },
  { src: imgTulahLargeThumb, alt: "Tulah Clinical Wellness Platform", label: "tulah Platform" },
  { src: imgE3_2, alt: "Component Anatomy & States", label: "Design Systems" },
];

export default function AboutPage({ navigateTo, disableScrollReset }: AboutPageProps) {
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1440));
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!disableScrollReset) {
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.backgroundColor = "#FFFDFA";
    };
  }, [disableScrollReset]);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll listener for dynamic dark mode transition
  useEffect(() => {
    const handleScroll = () => {
      const trigger = document.getElementById("about-dark-trigger");
      if (trigger) {
        const rect = trigger.getBoundingClientRect();
        // Transition to dark mode when trigger reaches 70% of viewport
        const darkActive = rect.top <= window.innerHeight * 0.7;
        setIsDark(darkActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMobile = vw < 768;
  const footerScale = Math.min(1, Math.max(0.65, (vw - 48) / 1280));

  const pillStyle: React.CSSProperties = {
    background: isDark ? "#2a1b10" : "#e5ddd4",
    border: "1px solid rgba(123, 122, 119, 0.4)",
    padding: "6px 12px",
    borderRadius: 20, // ONLY tag pills have 20px border radius
    fontFamily: "Inter, sans-serif",
    fontWeight: 700,
    fontSize: isMobile ? 10.5 : 11.5,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: isDark ? "#E5DDD4" : "#77695d",
    display: "inline-block",
    transition: "background 0.8s ease, color 0.8s ease",
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: isDark ? "#190b00" : "#FFFDFA",
        color: isDark ? "#FFFDFA" : "#190b00",
        transition: "background-color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.8s ease",
        overflowX: "clip",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes about-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes about-client-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .about-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: about-marquee-scroll 24s linear infinite;
        }
        .about-photo-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 8px 0;
        }
        .about-photo-track::-webkit-scrollbar {
          display: none;
        }
        .about-client-track {
          display: flex;
          gap: 48px;
          align-items: center;
          width: max-content;
          animation: about-client-marquee 22s linear infinite;
        }
        .about-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 24px;
          border-radius: 110px;
          border: 1px solid #7b7a77;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }
        .about-back-btn:hover {
          transform: translateY(-2px);
          border-color: #EE6C13;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
        }
        .about-card-hover {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-card-hover:hover {
          transform: translateY(-3px);
          border-color: #EE6C13 !important;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
        }
        .about-image-card {
          position: relative;
          overflow: hidden;
          border-radius: 0px; /* SHARP CORNERS */
          border: 1px solid #7b7a77;
          flex-shrink: 0;
          width: 260px;
          height: 340px;
        }
        .about-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-image-card:hover img {
          transform: scale(1.06);
        }
        .about-exp-row {
          transition: background-color 0.25s ease;
        }
        .about-exp-row:hover {
          background-color: rgba(238, 108, 19, 0.06);
        }
      `}</style>

      {/* =========================================================================
          DESKTOP VIEW (>= 768px)
          Featuring distinct architectural section boxes separated by exactly 200px,
          with sharp corners (0px) and smooth light-to-dark transition on scroll!
          ========================================================================= */}
      {!isMobile && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Top Sticky Header Navigation Bar */}
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 100,
              width: "100%",
              backgroundColor: isDark ? "rgba(25, 11, 0, 0.94)" : "rgba(255, 253, 250, 0.94)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderBottom: "1px solid rgba(123, 122, 119, 0.3)",
              padding: "16px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
              transition: "background-color 0.8s ease",
            }}
          >
            {/* Back Button (Capsule pill) */}
            <button
              className="about-back-btn"
              onClick={() => navigateTo("/")}
              aria-label="Back to Portfolio Homepage"
              style={{
                backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                borderColor: "#7b7a77",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13 8H3M3 8L7.5 3.5M3 8L7.5 12.5"
                  stroke={isDark ? "#FFFDFA" : "#190B00"}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 13,
                  color: isDark ? "#FFFDFA" : "#190b00",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  transition: "color 0.25s ease",
                }}
              >
                BACK
              </span>
            </button>

            {/* Rotating Brand Vector */}
            <div
              onClick={() => navigateTo("/")}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              title="Return Home"
            >
              <BrandVector theme={isDark ? "light" : "dark"} width={78} height={52} />
            </div>
          </header>

          {/* Metadata above Section 1: [ INFO ] ... 2026 */}
          <div
            style={{
              width: "min(1280px, calc(100% - 64px))",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "36px auto 14px auto",
              padding: "0 4px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: isDark ? "#998D80" : "#77695d",
                transition: "color 0.8s ease",
              }}
            >
              [ INFO ]
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: isDark ? "#998D80" : "#77695d",
                transition: "color 0.8s ease",
              }}
            >
              2026
            </span>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: [ S-001 ] IN A NUTSHELL & OVERVIEW
              Separated from next section by 200px
              ═══════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              width: "min(1280px, calc(100% - 64px))",
              backgroundColor: "#FFFDFA",
              border: "1px solid #7b7a77",
              borderRadius: 0, // STRICTLY SHARP CORNERS
              boxShadow: "0 10px 35px rgba(0, 0, 0, 0.05)",
              marginBottom: 200, // 200PX GAP SEPARATION
              boxSizing: "border-box",
            }}
          >
            {/* Row 1: Looping ABOUT Marquee inside the box top */}
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                borderBottom: "1px solid #7b7a77",
                padding: "20px 0",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFDFA",
              }}
            >
              <div className="about-marquee-track">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 48,
                        paddingRight: 48,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: "clamp(75px, 8.5vw, 130px)",
                          lineHeight: 1,
                          letterSpacing: "4px",
                          color: "#190b00",
                          textTransform: "uppercase",
                        }}
                      >
                        ABOUT
                      </span>

                      {/* Rotating Brand Mark / Star */}
                      <BrandVector theme="dark" width={110} height={74} />

                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: "clamp(75px, 8.5vw, 130px)",
                          lineHeight: 1,
                          letterSpacing: "4px",
                          color: "#FFFDFA",
                          WebkitTextStroke: "2px #190b00",
                          paintOrder: "stroke fill",
                          textTransform: "uppercase",
                        }}
                      >
                        ABOUT
                      </span>

                      <BrandVector theme="dark" width={110} height={74} />
                    </div>
                  ))}
              </div>
            </div>

            {/* Row 2: In A Nutshell Content */}
            <div style={{ padding: "48px 56px 48px 56px", boxSizing: "border-box" }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.8px",
                  color: "#EE6C13",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                [ S-001 ] IN A NUTSHELL
              </div>

              {/* Big Editorial Headline */}
              <h1
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(26px, 2.7vw, 38px)",
                  lineHeight: 1.35,
                  letterSpacing: "-0.015em",
                  margin: "0 0 36px 0",
                  color: "#190b00",
                }}
              >
                Product Lead and AI Product Designer with 7+ years of experience designing enterprise platforms, operational systems, and AI-native products.{" "}
                <span style={{ color: "#77695d", fontWeight: 400 }}>
                  At least, that's the short answer. In reality, I shape the moments where people decide whether to trust intelligent systems—
                </span>{" "}
                <span style={{ color: "#190b00", fontWeight: 800 }}>
                  connecting human behavior, business goals, and AI capabilities into coherent, scalable products that perform and feel intuitive to use.
                </span>
              </h1>

              {/* Selected Impact Metric Cards (SHARP CORNERS: borderRadius: 0) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                  marginBottom: 44,
                }}
              >
                {IMPACT_HIGHLIGHTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="about-card-hover"
                    style={{
                      border: "1px solid #7b7a77",
                      borderRadius: 0, // SHARP CORNER
                      padding: "22px 18px",
                      backgroundColor: "#FFFDFA",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: 32,
                          lineHeight: 1,
                          color: "#EE6C13",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        {item.num}
                      </span>
                      <h4
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 800,
                          fontSize: 13.5,
                          color: "#190b00",
                          margin: "0 0 6px 0",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </h4>
                    </div>
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        lineHeight: 1.45,
                        color: "#77695d",
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Horizontal Photo Carousel (SHARP CORNERS: borderRadius: 0) */}
              <div style={{ width: "100%", overflow: "hidden" }}>
                <div className="about-photo-track">
                  {GALLERY_IMAGES.map((img, idx) => (
                    <div key={idx} className="about-image-card" style={{ backgroundColor: "#e5ddd4" }}>
                      <img src={img.src} alt={img.alt} loading="lazy" />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 12,
                          left: 12,
                          backgroundColor: "rgba(25, 11, 0, 0.85)",
                          backdropFilter: "blur(6px)",
                          padding: "4px 10px",
                          borderRadius: 20, // Capsule tag pill
                          border: "1px solid rgba(123, 122, 119, 0.4)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: 10.5,
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            color: "#FFFDFA",
                          }}
                        >
                          {img.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: [ S-002 ] THE FOUNDATION & DIVE DEEPER
              Separated from next section by 200px
              ═══════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              width: "min(1280px, calc(100% - 64px))",
              backgroundColor: "#FFFDFA",
              border: "1px solid #7b7a77",
              borderRadius: 0, // STRICTLY SHARP CORNERS
              boxShadow: "0 10px 35px rgba(0, 0, 0, 0.05)",
              marginBottom: 200, // 200PX GAP SEPARATION
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                padding: "50px 56px",
                display: "grid",
                gridTemplateColumns: "clamp(260px, 30%, 340px) 1fr",
                gap: 50,
                boxSizing: "border-box",
                backgroundColor: "#FFFDFA",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 11.5,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  [ S-002 ] THE FOUNDATION
                </span>
                <h2
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(34px, 3.5vw, 44px)",
                    lineHeight: 1.05,
                    color: "#190b00",
                    textTransform: "uppercase",
                    margin: "0 0 18px 0",
                  }}
                >
                  LET'S DIVE
                  <br />
                  EVEN DEEPER
                </h2>
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 500,
                    fontSize: 13.5,
                    color: "#77695d",
                    margin: "0 0 24px 0",
                    lineHeight: 1.5,
                  }}
                >
                  B.E. Computer Science (2015–2019)
                  <br />
                  Google UX Design Professional Certificate
                </p>
                <BrandVector theme="dark" width={68} height={46} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    color: "#4A4238",
                    margin: 0,
                  }}
                >
                  My journey began with a degree in Computer Science Engineering, where I developed an appreciation for system architecture, algorithmic constraints, and data flows. Starting my career at <b style={{ color: "#190b00" }}>Tata Consultancy Services</b> supporting Apple Production Support operations, I saw firsthand how large-scale enterprise systems handle business-critical workflows under strict SLA constraints.
                </p>

                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    color: "#4A4238",
                    margin: 0,
                  }}
                >
                  That systems background naturally drew me into product design across healthcare, fintech, ed-tech, and consumer platforms. At <b style={{ color: "#190b00" }}>Joonify</b>, I designed talent assessment experiences trusted by 750+ parents. At <b style={{ color: "#190b00" }}>Vertisystem</b>, I delivered scholarship and course-planning operational applications for <b style={{ color: "#190b00" }}>Stanford Medicine</b>, creating high-fidelity interactive models that earned formal recognition from Stanford leadership.
                </p>

                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    color: "#4A4238",
                    margin: 0,
                  }}
                >
                  As UXD Head at <b style={{ color: "#190b00" }}>Vrozart Dackson</b>, I co-authored the <b style={{ color: "#190b00" }}>Vibe UX Framework</b>—establishing principles for context-aware, AI-native products and directing digital experiences for VousVous and consumer platforms. Following the transition of our core team into <b style={{ color: "#190b00" }}>Pansophic Technologies</b>, I stepped into Product Leadership.
                </p>

                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    color: "#4A4238",
                    margin: 0,
                  }}
                >
                  Today, as Product Lead, I direct product strategy and experience design for <b style={{ color: "#190b00" }}>allyra.ai</b> (Human-AI Interaction platform), early-stage intelligence platforms <b style={{ color: "#190b00" }}>Raxaa.ai</b> and <b style={{ color: "#190b00" }}>EOMs.ai</b>, and operational platforms like <b style={{ color: "#190b00" }}>tulah</b> (reducing workflow overhead by 60–70%). I also speak regularly on AI and Human-Centred Design, including at TiE Chandigarh.
                </p>
              </div>
            </div>

            {/* Client Ticker Bar on the bottom of Section 2 */}
            <div
              style={{
                height: 70,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFDFA",
                borderTop: "1px solid #7b7a77",
                boxSizing: "border-box",
              }}
            >
              <div className="about-client-track">
                {Array(3)
                  .fill(CLIENTS)
                  .flat()
                  .map((client, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#77695d",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 40,
                      }}
                    >
                      {client}
                      <span style={{ color: "#EE6C13", fontSize: 14 }}>•</span>
                    </span>
                  ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              DARK TRANSITION TRIGGER ELEMENT
              When you scroll past Section 2 towards Section 3 (MY FOCUS),
              the background smoothly transitions into deep dark espresso #190b00!
              ═══════════════════════════════════════════════════════════════════ */}
          <div id="about-dark-trigger" style={{ height: 1, width: "100%", opacity: 0 }} />

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: [ S-003 ] CORE COMPETENCIES / MY FOCUS
              Separated from next section by 200px
              ═══════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              width: "min(1280px, calc(100% - 64px))",
              backgroundColor: isDark ? "#190b00" : "#FFFDFA",
              color: isDark ? "#FFFDFA" : "#190b00",
              border: "1px solid #7b7a77",
              borderRadius: 0, // STRICTLY SHARP CORNERS
              boxShadow: "0 10px 35px rgba(0, 0, 0, 0.05)",
              marginBottom: 200, // 200PX GAP SEPARATION
              boxSizing: "border-box",
              transition: "background-color 0.8s ease, color 0.8s ease",
            }}
          >
            {/* Section Header Bar */}
            <div
              style={{
                padding: "36px 56px",
                borderBottom: "1px solid #7b7a77",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 11.5,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  [ S-003 ] CORE COMPETENCIES
                </span>
                <h2
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(34px, 3.5vw, 44px)",
                    letterSpacing: "-0.02em",
                    color: isDark ? "#FFFDFA" : "#190b00",
                    margin: 0,
                    textTransform: "uppercase",
                    transition: "color 0.8s ease",
                  }}
                >
                  MY FOCUS
                </h2>
              </div>
              <BrandVector theme={isDark ? "light" : "dark"} width={78} height={52} />
            </div>

            {/* 3-Column Focus Cards (SHARP CORNERS: borderRadius: 0) */}
            <div style={{ padding: "44px 56px 50px 56px", boxSizing: "border-box" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {FOCUS_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="about-card-hover"
                    style={{
                      backgroundColor: isDark ? "#150c05" : "#FFFDFA",
                      border: "1px solid #7b7a77",
                      borderRadius: 0, // SHARP CORNER
                      padding: "28px 24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: 420,
                      boxSizing: "border-box",
                      transition: "background-color 0.8s ease, border-color 0.3s ease",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 16,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 900,
                            fontSize: 42,
                            lineHeight: 1,
                            color: "#EE6C13",
                          }}
                        >
                          {item.num}
                        </span>
                        <BrandVector theme={isDark ? "light" : "dark"} width={38} height={26} />
                      </div>

                      <h3
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: 20,
                          letterSpacing: "-0.01em",
                          color: isDark ? "#FFFDFA" : "#190b00",
                          margin: "0 0 16px 0",
                          textTransform: "uppercase",
                          lineHeight: 1.25,
                          transition: "color 0.8s ease",
                        }}
                      >
                        {item.title}
                      </h3>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                        {item.skills.map((skill, sIdx) => (
                          <span key={sIdx} style={pillStyle}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop: `1px solid ${isDark ? "#38291d" : "#e5ddd4"}`,
                        paddingTop: 16,
                        transition: "border-color 0.8s ease",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 400,
                          fontSize: 14.5,
                          lineHeight: 1.6,
                          color: isDark ? "#C9C1B7" : "#4A4238",
                          margin: 0,
                          transition: "color 0.8s ease",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: [ S-004 ] CAREER TIMELINE / EXPERIENCE
              Separated from next section by 200px
              ═══════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              width: "min(1280px, calc(100% - 64px))",
              backgroundColor: isDark ? "#190b00" : "#FFFDFA",
              color: isDark ? "#FFFDFA" : "#190b00",
              border: "1px solid #7b7a77",
              borderRadius: 0, // STRICTLY SHARP CORNERS
              boxShadow: "0 10px 35px rgba(0, 0, 0, 0.05)",
              marginBottom: 200, // 200PX GAP SEPARATION
              boxSizing: "border-box",
              transition: "background-color 0.8s ease, color 0.8s ease",
            }}
          >
            {/* Section Header Bar */}
            <div
              style={{
                padding: "36px 56px",
                borderBottom: "1px solid #7b7a77",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 11.5,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  [ S-004 ] CAREER TIMELINE
                </span>
                <h2
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(34px, 3.5vw, 44px)",
                    letterSpacing: "-0.02em",
                    color: isDark ? "#FFFDFA" : "#190b00",
                    margin: 0,
                    textTransform: "uppercase",
                    transition: "color 0.8s ease",
                  }}
                >
                  EXPERIENCE
                </h2>
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.6px",
                  color: isDark ? "#998D80" : "#77695d",
                  textTransform: "uppercase",
                  transition: "color 0.8s ease",
                }}
              >
                7+ YEARS LEADERSHIP
              </span>
            </div>

            {/* List of Experience Rows (SHARP CORNERS: borderRadius: 0) */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {EXPERIENCES.map((exp, i) => (
                <div
                  key={i}
                  className="about-exp-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "clamp(260px, 30%, 340px) 1fr",
                    gap: 40,
                    padding: "36px 56px",
                    borderBottom: i < EXPERIENCES.length - 1 ? "1px solid #7b7a77" : "none",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Left Info Column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: 11.5,
                        letterSpacing: "0.6px",
                        color: isDark ? "#998D80" : "#77695d",
                        textTransform: "uppercase",
                        transition: "color 0.8s ease",
                      }}
                    >
                      {exp.period}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 900,
                        fontSize: 24,
                        letterSpacing: "-0.01em",
                        color: isDark ? "#FFFDFA" : "#190b00",
                        margin: 0,
                        transition: "color 0.8s ease",
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#EE6C13",
                        margin: 0,
                      }}
                    >
                      {exp.role}
                    </p>

                    {exp.subnote && (
                      <p
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontStyle: "italic",
                          fontSize: 12.5,
                          color: isDark ? "#998D80" : "#77695d",
                          margin: "2px 0 0 0",
                          lineHeight: 1.4,
                          transition: "color 0.8s ease",
                        }}
                      >
                        {exp.subnote}
                      </p>
                    )}

                    <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                      {exp.tags.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: 10,
                            color: isDark ? "#998D80" : "#77695d",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            transition: "color 0.8s ease",
                          }}
                        >
                          [ {t} ]
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Summary Column */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: isDark ? "#C9C1B7" : "#4A4238",
                        margin: 0,
                        transition: "color 0.8s ease",
                      }}
                    >
                      {exp.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: [ S-005 ] ACADEMICS & CREDENTIALS
              Separated from next section by 200px
              ═══════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              width: "min(1280px, calc(100% - 64px))",
              backgroundColor: isDark ? "#190b00" : "#FFFDFA",
              color: isDark ? "#FFFDFA" : "#190b00",
              border: "1px solid #7b7a77",
              borderRadius: 0, // STRICTLY SHARP CORNERS
              boxShadow: "0 10px 35px rgba(0, 0, 0, 0.05)",
              marginBottom: 200, // 200PX GAP SEPARATION BEFORE FOOTER
              boxSizing: "border-box",
              transition: "background-color 0.8s ease, color 0.8s ease",
            }}
          >
            {/* Section Header Bar */}
            <div
              style={{
                padding: "36px 56px",
                borderBottom: "1px solid #7b7a77",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 11.5,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  [ S-005 ] ACADEMICS
                </span>
                <h3
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(28px, 3vw, 36px)",
                    letterSpacing: "-0.01em",
                    color: isDark ? "#FFFDFA" : "#190b00",
                    margin: 0,
                    textTransform: "uppercase",
                    transition: "color 0.8s ease",
                  }}
                >
                  EDUCATION &amp; CERTIFICATION
                </h3>
              </div>
              <BrandVector theme={isDark ? "light" : "dark"} width={60} height={40} />
            </div>

            {/* Academic Cards */}
            <div style={{ padding: "44px 56px 50px 56px", boxSizing: "border-box" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    className="about-card-hover"
                    style={{
                      border: "1px solid #7b7a77",
                      borderRadius: 0, // SHARP CORNER
                      padding: "26px 22px",
                      backgroundColor: isDark ? "#150c05" : "#FFFDFA",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "background-color 0.8s ease, border-color 0.3s ease",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: 11.5,
                          letterSpacing: "0.6px",
                          color: "#EE6C13",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        {edu.year}
                      </span>
                      <h4
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: 20,
                          color: isDark ? "#FFFDFA" : "#190b00",
                          margin: "0 0 6px 0",
                          transition: "color 0.8s ease",
                        }}
                      >
                        {edu.degree}
                      </h4>
                    </div>
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 500,
                        fontSize: 14.5,
                        color: isDark ? "#998D80" : "#77695d",
                        margin: 0,
                        transition: "color 0.8s ease",
                      }}
                    >
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: [ S-006 ] FOOTER
              Standard site footer with sharp corners (borderRadius: 0)
              ═══════════════════════════════════════════════════════════════════ */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingBottom: 80,
              boxSizing: "border-box",
            }}
          >
            {footerScale < 1 ? (
              <div
                style={{
                  width: 1280 * footerScale,
                  height: 560 * footerScale,
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    transform: `scale(${footerScale})`,
                    transformOrigin: "top center",
                    width: 1280,
                    height: 560,
                  }}
                >
                  <Footer style={{ borderRadius: 0, border: "1px solid #7b7a77" }} />
                </div>
              </div>
            ) : (
              <Footer style={{ borderRadius: 0, border: "1px solid #7b7a77" }} />
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE VIEW (< 768px)
          Distinct sections with sharp corners (0px) & Smooth Light to Dark Transition
          ========================================================================= */}
      {isMobile && (
        <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Mobile Top Bar */}
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 50,
              background: isDark ? "rgba(25, 11, 0, 0.95)" : "rgba(255, 253, 250, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(123, 122, 119, 0.3)",
              padding: "14px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "background 0.8s ease",
            }}
          >
            <button
              onClick={() => navigateTo("/")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 110,
                border: "1px solid #7b7a77",
                background: isDark ? "#190B00" : "#FFFDFA",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 12,
                  color: isDark ? "#FFFDFA" : "#190b00",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                ← BACK
              </span>
            </button>

            <BrandVector theme={isDark ? "light" : "dark"} width={60} height={40} />
          </header>

          {/* Mobile Metadata */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 20px 10px 20px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.8px",
              color: isDark ? "#998D80" : "#77695d",
              textTransform: "uppercase",
              transition: "color 0.8s ease",
            }}
          >
            <span>[ INFO ]</span>
            <span>2026</span>
          </div>

          <main style={{ padding: "0 16px 40px 16px", display: "flex", flexDirection: "column" }}>
            {/* Mobile Section 1: In A Nutshell */}
            <div
              style={{
                border: "1px solid #7b7a77",
                background: "#FFFDFA",
                borderRadius: 0, // SHARP CORNER
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                marginBottom: 60,
              }}
            >
              {/* Marquee Inside Card Top */}
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  padding: "14px 0",
                  borderBottom: "1px solid #7b7a77",
                  background: "#FFFDFA",
                }}
              >
                <div className="about-marquee-track">
                  {Array(4)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 20,
                          paddingRight: 20,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 900,
                            fontSize: 56,
                            lineHeight: 1,
                            color: "#190b00",
                            textTransform: "uppercase",
                          }}
                        >
                          ABOUT
                        </span>
                        <BrandVector theme="dark" width={68} height={46} />
                        <span
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 900,
                            fontSize: 56,
                            lineHeight: 1,
                            color: "#FFFDFA",
                            WebkitTextStroke: "1.5px #190b00",
                            paintOrder: "stroke fill",
                            textTransform: "uppercase",
                          }}
                        >
                          ABOUT
                        </span>
                        <BrandVector theme="dark" width={68} height={46} />
                      </div>
                    ))}
                </div>
              </div>

              {/* In a nutshell body */}
              <div style={{ padding: "24px 20px" }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  [ S-001 ] IN A NUTSHELL
                </span>

                <h1
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    lineHeight: 1.3,
                    color: "#190b00",
                    margin: "0 0 20px 0",
                  }}
                >
                  Product Lead &amp; AI Product Designer with 7+ years of experience designing enterprise platforms, operational systems, and AI-native products.{" "}
                  <span style={{ color: "#77695d", fontWeight: 400 }}>
                    In reality, I shape the moments where people decide whether to trust intelligent systems.
                  </span>
                </h1>

                {/* Impact Highlights (SHARP CORNERS) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                  {IMPACT_HIGHLIGHTS.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        border: "1px solid #7b7a77",
                        borderRadius: 0, // SHARP CORNER
                        padding: "14px 12px",
                        background: "#FFFDFA",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: 22,
                          color: "#EE6C13",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        {item.num}
                      </span>
                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 800,
                          fontSize: 11.5,
                          color: "#190b00",
                          textTransform: "uppercase",
                          display: "block",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Touch Photo Carousel (SHARP CORNERS) */}
                <div
                  style={{
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    display: "flex",
                    gap: 12,
                    paddingBottom: 8,
                    marginRight: -20,
                    paddingRight: 20,
                  }}
                >
                  {GALLERY_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      style={{
                        width: 200,
                        height: 270,
                        borderRadius: 0, // SHARP CORNER
                        border: "1px solid #7b7a77",
                        overflow: "hidden",
                        flexShrink: 0,
                        position: "relative",
                        background: "#e5ddd4",
                      }}
                    >
                      <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 8,
                          left: 8,
                          background: "rgba(25, 11, 0, 0.85)",
                          padding: "3px 8px",
                          borderRadius: 20, // Capsule tag
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: 9.5,
                            color: "#FFFDFA",
                            textTransform: "uppercase",
                          }}
                        >
                          {img.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Section 2: The Foundation & Dive Deeper */}
            <div
              style={{
                border: "1px solid #7b7a77",
                background: "#FFFDFA",
                borderRadius: 0, // SHARP CORNER
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                marginBottom: 60,
              }}
            >
              <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                    textTransform: "uppercase",
                  }}
                >
                  [ S-002 ] THE FOUNDATION
                </span>
                <h2
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: 26,
                    lineHeight: 1.1,
                    color: "#190b00",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  LET'S DIVE EVEN DEEPER
                </h2>
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "#4A4238",
                    margin: 0,
                  }}
                >
                  My journey began with a degree in Computer Science Engineering, where I developed an appreciation for system architecture, algorithmic constraints, and data flows. Starting my career at <b style={{ color: "#190b00" }}>Tata Consultancy Services</b> supporting Apple Production Support operations, I saw how large-scale enterprise systems handle business-critical workflows under strict SLA constraints.
                </p>
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "#4A4238",
                    margin: 0,
                  }}
                >
                  That systems background naturally drew me into product design across healthcare, fintech, ed-tech, and consumer platforms. At <b style={{ color: "#190b00" }}>Joonify</b>, I designed talent assessment experiences trusted by 750+ parents. At <b style={{ color: "#190b00" }}>Vertisystem</b>, I delivered scholarship and course-planning operational applications for <b style={{ color: "#190b00" }}>Stanford Medicine</b>, creating high-fidelity interactive models that earned formal recognition from Stanford leadership.
                </p>
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "#4A4238",
                    margin: 0,
                  }}
                >
                  Today, as Product Lead at <b style={{ color: "#190b00" }}>Pansophic Technologies</b>, I shape autonomous multi-agent orchestration, agentic UX patterns, and enterprise AI workforce governance for <b style={{ color: "#190b00" }}>allyra.ai</b>, <b style={{ color: "#190b00" }}>Raxaa.ai</b>, and <b style={{ color: "#190b00" }}>tulah</b> (60–70% workflow reduction).
                </p>
              </div>

              {/* Client Ticker */}
              <div
                style={{
                  overflow: "hidden",
                  padding: "14px 0",
                  borderTop: "1px solid #7b7a77",
                  background: "#FFFDFA",
                }}
              >
                <div className="about-client-track">
                  {Array(3)
                    .fill(CLIENTS)
                    .flat()
                    .map((c, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 800,
                          fontSize: 15,
                          color: "#77695d",
                          textTransform: "uppercase",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 20,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c} <span style={{ color: "#EE6C13", fontSize: 12 }}>•</span>
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Mobile Scroll Trigger */}
            <div id="about-dark-trigger" style={{ height: 1, width: "100%", opacity: 0 }} />

            {/* Mobile Section 3: My Focus (Transitions to Dark) */}
            <div
              style={{
                backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                color: isDark ? "#FFFDFA" : "#190b00",
                border: "1px solid #7b7a77",
                borderRadius: 0, // SHARP CORNER
                padding: "24px 20px",
                marginBottom: 60,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                transition: "background-color 0.8s ease, color 0.8s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.8px",
                  color: "#EE6C13",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                [ S-003 ] CORE COMPETENCIES
              </span>
              <h2
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: isDark ? "#FFFDFA" : "#190b00",
                  textTransform: "uppercase",
                  margin: "0 0 20px 0",
                  transition: "color 0.8s ease",
                }}
              >
                MY FOCUS
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {FOCUS_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: isDark ? "#150C05" : "#FFFDFA",
                      border: "1px solid #7b7a77",
                      borderRadius: 0, // SHARP CORNER
                      padding: "18px 16px",
                      transition: "background-color 0.8s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: 28,
                          color: "#EE6C13",
                        }}
                      >
                        {item.num}
                      </span>
                      <BrandVector theme={isDark ? "light" : "dark"} width={34} height={24} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 900,
                        fontSize: 17,
                        color: isDark ? "#FFFDFA" : "#190b00",
                        margin: "0 0 10px 0",
                        textTransform: "uppercase",
                        transition: "color 0.8s ease",
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                      {item.skills.map((s, idx) => (
                        <span key={idx} style={pillStyle}>
                          {s}
                        </span>
                      ))}
                    </div>
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: isDark ? "#C9C1B7" : "#4A4238",
                        margin: 0,
                        transition: "color 0.8s ease",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Section 4: Experience Timeline */}
            <div
              style={{
                backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                color: isDark ? "#FFFDFA" : "#190b00",
                border: "1px solid #7b7a77",
                borderRadius: 0, // SHARP CORNER
                padding: "24px 20px",
                marginBottom: 60,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                transition: "background-color 0.8s ease, color 0.8s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.8px",
                  color: "#EE6C13",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                [ S-004 ] CAREER TIMELINE
              </span>
              <h2
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: isDark ? "#FFFDFA" : "#190b00",
                  textTransform: "uppercase",
                  margin: "0 0 20px 0",
                  transition: "color 0.8s ease",
                }}
              >
                EXPERIENCE
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {EXPERIENCES.map((exp, i) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #7b7a77",
                      borderRadius: 0, // SHARP CORNER
                      padding: "18px",
                      background: isDark ? "#150C05" : "#FFFDFA",
                      transition: "background-color 0.8s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: 11,
                        color: isDark ? "#998D80" : "#77695d",
                        transition: "color 0.8s ease",
                      }}
                    >
                      {exp.period}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 900,
                        fontSize: 20,
                        color: isDark ? "#FFFDFA" : "#190b00",
                        margin: "4px 0 2px 0",
                        transition: "color 0.8s ease",
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#EE6C13",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {exp.role}
                    </p>
                    {exp.subnote && (
                      <p
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontStyle: "italic",
                          fontSize: 12,
                          color: isDark ? "#998D80" : "#77695d",
                          margin: "0 0 10px 0",
                          transition: "color 0.8s ease",
                        }}
                      >
                        {exp.subnote}
                      </p>
                    )}
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        color: isDark ? "#C9C1B7" : "#4A4238",
                        margin: "0 0 12px 0",
                        transition: "color 0.8s ease",
                      }}
                    >
                      {exp.summary}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {exp.tags.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: 9.5,
                            color: isDark ? "#998D80" : "#77695d",
                            transition: "color 0.8s ease",
                          }}
                        >
                          [ {t} ]
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Section 5: Academics & Credentials */}
            <div
              style={{
                backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                color: isDark ? "#FFFDFA" : "#190b00",
                border: "1px solid #7b7a77",
                borderRadius: 0, // SHARP CORNER
                padding: "24px 20px",
                marginBottom: 60,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                transition: "background-color 0.8s ease, color 0.8s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.8px",
                  color: "#EE6C13",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                [ S-005 ] ACADEMICS
              </span>
              <h3
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 22,
                  color: isDark ? "#FFFDFA" : "#190b00",
                  textTransform: "uppercase",
                  margin: "0 0 16px 0",
                  transition: "color 0.8s ease",
                }}
              >
                EDUCATION &amp; CERTIFICATION
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #7b7a77",
                      borderRadius: 0, // SHARP CORNER
                      padding: "16px",
                      background: isDark ? "#150C05" : "#FFFDFA",
                      transition: "background-color 0.8s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: 11,
                        color: "#EE6C13",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {edu.year}
                    </span>
                    <h4
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 800,
                        fontSize: 16,
                        color: isDark ? "#FFFDFA" : "#190b00",
                        margin: "0 0 4px 0",
                        transition: "color 0.8s ease",
                      }}
                    >
                      {edu.degree}
                    </h4>
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 13,
                        color: isDark ? "#998D80" : "#77695d",
                        margin: 0,
                        transition: "color 0.8s ease",
                      }}
                    >
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Mobile Finale Footer */}
          <MobileFinale isDark={isDark} />
        </div>
      )}
    </div>
  );
}
