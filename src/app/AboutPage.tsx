import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import BrandVector from "@/components/BrandVector";
import Footer from "@/components/Footer";
import { playHoverTick } from "@/utils/soundEffects";
import { MobileFinale } from "./components/mobile/MobileFinale";
import ExperienceTimeline from "./components/ExperienceTimeline";
import CreativeLab from "./components/CreativeLab";
import GravitySkillsSection from "./components/GravitySkillsSection";


interface AboutPageProps {
  navigateTo: (path: string) => void;
  disableScrollReset?: boolean;
  scale?: number;
  left?: number;
}

const CLIENTS = [
  "Tata Consultancy Services",
  "5Exceptions",
  "Joonify",
  "Vertisystem",
  "Stanford Medicine",
  "Vrozart Dackson",
  "Pansophic Technologies",
  "Allyra.ai",
];

const IMPACT_HIGHLIGHTS = [
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
    label: "Features / Designer / Wk",
    desc: "Increased design throughput from ~1 to 2–3 features per designer per week through AI-assisted workflows and coded prototypes.",
  },
  {
    num: "Tulah",
    label: "Wellness Platform",
    desc: "Designed workflow automation for a wellness platform, replacing fragmented spreadsheets and manual forms.",
  },
  {
    num: "Stanford",
    label: "Stanford Medicine",
    desc: "Designed operational UI/UX for course planning, accounts, scholarships, and the Financial Aid app, receiving leadership appreciation.",
  },
  {
    num: "TiE Talk",
    label: "Keynote Speaker",
    desc: "Speaker at TiE Chandigarh on AI and Human-Centred Design.",
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



const NUTSHELL_SEGMENTS_DESKTOP = [
  {
    text: "Product Lead and AI Product Designer with 7+ years in technology, including 6+ years in UX and product design. Experienced in Human–AI Interaction, Agentic UX, AI workflow design, and product strategy, with end-to-end ownership from discovery and prototyping through implementation. Designing AI products that align human behaviour, business goals, and intelligent agents.",
    style: { color: "#77695d", fontWeight: 400 },
  },
];

const NUTSHELL_SEGMENTS_MOBILE = [
  {
    text: "Product Lead and AI Product Designer with 7+ years in technology, including 6+ years in UX and product design. Experienced in Human–AI Interaction, Agentic UX, AI workflow design, and product strategy, with end-to-end ownership from discovery and prototyping through implementation. Designing AI products that align human behaviour, business goals, and intelligent agents.",
    style: { color: "#77695d", fontWeight: 400 },
  },
];

interface QuickStreamingParagraphProps {
  segments: {
    text: string;
    style?: React.CSSProperties;
  }[];
  baseDelay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}

function QuickStreamingParagraph({
  segments,
  baseDelay = 0.26,
  stagger = 0.015,
  style = {},
}: QuickStreamingParagraphProps) {
  let globalWordIndex = 0;

  return (
    <h1 style={style}>
      {segments.map((seg, sIdx) => {
        const words = seg.text.trim().split(/\s+/);
        return (
          <span key={sIdx} style={seg.style}>
            {words.map((word, wIdx) => {
              const currentIdx = globalWordIndex++;
              const isLastInSeg = wIdx === words.length - 1;
              const isLastOverall = sIdx === segments.length - 1 && isLastInSeg;
              const delay = baseDelay + currentIdx * stagger;

              return (
                <span
                  key={wIdx}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "top",
                    lineHeight: "inherit",
                    paddingBottom: "4px",
                    marginBottom: "-4px",
                    marginRight: isLastOverall ? 0 : "0.26em",
                  }}
                >
                  <motion.span
                    style={{
                      display: "inline-block",
                      willChange: "transform, opacity",
                    }}
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.42,
                      ease: [0.16, 1, 0.3, 1],
                      delay,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
            {sIdx < segments.length - 1 && " "}
          </span>
        );
      })}
    </h1>
  );
}

interface AboutHighlightCardProps {
  item: (typeof IMPACT_HIGHLIGHTS)[0];
  delay: number;
  isMobile?: boolean;
}

function AboutHighlightCard({
  item,
  delay,
  isMobile = false,
}: AboutHighlightCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    playHoverTick();
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: isMobile ? 24 : 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 0, // SHARP CORNER
        padding: isMobile ? "14px 12px" : "22px 18px",
        backgroundColor: "#FFFDFA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "default",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 10px 24px rgba(25, 11, 0, 0.08)" : "none",
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity",
      }}
    >
      <div>
        <span
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 900,
            fontSize: isMobile ? 20 : 32,
            lineHeight: isMobile ? 1.1 : 1,
            color: "#EE6C13",
            display: "block",
            marginBottom: isMobile ? 4 : 8,
          }}
        >
          {item.num}
        </span>
        <h4
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? 11 : 13.5,
            lineHeight: isMobile ? 1.25 : undefined,
            color: "#190b00",
            margin: isMobile ? "0 0 4px 0" : "0 0 6px 0",
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
          fontSize: isMobile ? 10.5 : 13,
          lineHeight: isMobile ? 1.35 : 1.45,
          color: "#77695d",
          margin: 0,
        }}
      >
        {item.desc}
      </p>

      {/* Slow ease-in border stroke overlay (same as hero right side bento cards) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 0,
          border: `1px solid ${hovered ? "#EE6C13" : "#7b7a77"}`,
          pointerEvents: "none",
          zIndex: 10,
          transition: "border-color 0.25s ease",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: delay + 0.2,
        }}
      />
    </motion.div>
  );
}

interface AboutKineticCharWordProps {
  word: string;
  baseDelay: number;
  charStagger?: number;
  style?: React.CSSProperties;
}

function AboutKineticCharWord({
  word,
  baseDelay,
  charStagger = 0.045,
  style = {},
}: AboutKineticCharWordProps) {
  return (
    <span style={{ display: "inline-flex", overflow: "visible", ...style }}>
      {word.split("").map((char, index) => {
        const curvedDelay = baseDelay + Math.pow(index, 0.9) * charStagger;
        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              lineHeight: 1.05,
              paddingBottom: "8px",
              marginBottom: "-8px",
            }}
          >
            <motion.span
              style={{
                display: "inline-block",
                willChange: "transform",
              }}
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.72,
                ease: [0.16, 1, 0.3, 1],
                delay: curvedDelay,
              }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

interface AboutMarqueeUnitProps {
  animateEntrance?: boolean;
  isMobile?: boolean;
}

function AboutMarqueeUnit({
  animateEntrance = false,
  isMobile = false,
}: AboutMarqueeUnitProps) {
  const fontStyleBase: React.CSSProperties = {
    fontFamily: "Outfit, sans-serif",
    fontWeight: 900,
    lineHeight: 1,
    textTransform: "uppercase",
    fontSize: isMobile ? 72 : "clamp(98px, 11vw, 170px)",
    letterSpacing: isMobile ? "2.6px" : "5.2px",
    whiteSpace: "nowrap",
  };

  const solidStyle: React.CSSProperties = {
    ...fontStyleBase,
    color: "#190b00",
  };

  const outlineStyle: React.CSSProperties = {
    ...fontStyleBase,
    color: "#FFFDFA",
    WebkitTextStroke: isMobile ? "2px #190b00" : "2.5px #190b00",
    paintOrder: "stroke fill",
  };

  const gap = isMobile ? 26 : 64;
  const vecW = isMobile ? 88 : 144;
  const vecH = isMobile ? 60 : 96;

  if (!animateEntrance) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: `${gap}px`,
          paddingRight: `${gap}px`,
          flexShrink: 0,
        }}
      >
        <span style={solidStyle}>ABOUT</span>
        <BrandVector theme="dark" width={vecW} height={vecH} />
        <span style={outlineStyle}>ABOUT</span>
        <BrandVector theme="dark" width={vecW} height={vecH} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${gap}px`,
        paddingRight: `${gap}px`,
        flexShrink: 0,
      }}
    >
      {/* 1. First ABOUT - solid */}
      <AboutKineticCharWord
        word="ABOUT"
        baseDelay={0.06}
        charStagger={0.045}
        style={solidStyle}
      />

      {/* 2. First BrandVector - Crisp spring entry */}
      <motion.div
        style={{ display: "inline-flex", alignItems: "center", position: "relative", flexShrink: 0 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
      >
        <BrandVector theme="dark" width={vecW} height={vecH} />
      </motion.div>

      {/* 3. Second ABOUT - outline */}
      <AboutKineticCharWord
        word="ABOUT"
        baseDelay={0.32}
        charStagger={0.025}
        style={outlineStyle}
      />

      {/* 4. Second BrandVector */}
      <motion.div
        style={{ display: "inline-flex", alignItems: "center", position: "relative", flexShrink: 0 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
      >
        <BrandVector theme="dark" width={vecW} height={vecH} />
      </motion.div>
    </div>
  );
}

export default function AboutPage({
  navigateTo,
  disableScrollReset,
  scale: propScale,
  left: propLeft,
}: AboutPageProps) {
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
  const clampedVw = isMobile ? vw : Math.min(vw, 1728);
  const derivedScale = isMobile ? 1 : clampedVw / 1440;
  const derivedLeft = isMobile ? 0 : (vw - clampedVw) / 2;
  const scale = propScale ?? derivedScale;
  const left = propLeft ?? derivedLeft;
  const contentWidth = 1280 * scale;

  const pillStyle: React.CSSProperties = {
    background: isDark ? "rgba(255, 253, 250, 0.05)" : "#f0ebe3",
    border: `1px solid ${isDark ? "rgba(123, 122, 119, 0.32)" : "rgba(123, 122, 119, 0.35)"}`,
    padding: isMobile ? "5px 10px" : "6px 12px",
    borderRadius: 100,
    fontFamily: "Outfit, sans-serif",
    fontWeight: 500,
    fontSize: isMobile ? 11.5 : 12.5,
    letterSpacing: "0.15px",
    color: isDark ? "#E5DDD4" : "#4A4238",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.25s ease",
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
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes about-client-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .about-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: about-marquee-scroll 50s linear infinite;
          will-change: transform;
        }
        .about-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 767px) {
          .about-marquee-track {
            animation: about-marquee-scroll 26s linear infinite;
          }
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
          gap: 8px;
          height: 40px;
          padding: 0 16px;
          border-radius: 110px;
          border: 1px solid #7b7a77;
          cursor: pointer;
          transition: background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
        }
        .about-back-btn:hover,
        .about-back-btn:active {
          transform: translateY(-2px);
          background-color: #190b00 !important;
          border-color: #190b00 !important;
          box-shadow: 0 6px 20px rgba(25, 11, 0, 0.25) !important;
        }
        .about-back-btn:hover span,
        .about-back-btn:active span {
          color: #FFFDFA !important;
        }
        .about-back-btn:hover svg path,
        .about-back-btn:active svg path {
          stroke: #FFFDFA !important;
        }
        .about-brand-capsule {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-brand-capsule:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(25, 11, 0, 0.16) !important;
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
        .about-exp-row {
          transition: background-color 0.25s ease;
        }
        .about-exp-row:hover {
          background-color: rgba(238, 108, 19, 0.06);
        }
        .timeline-nav-btn {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .timeline-nav-btn:hover:not(:disabled) {
          background-color: #190b00 !important;
          color: #FFFDFA !important;
          border-color: #190b00 !important;
        }
      `}</style>

      {/* =========================================================================
          DESKTOP VIEW (>= 768px)
          Featuring distinct architectural section boxes separated by exactly 200px,
          with sharp corners (0px) and smooth light-to-dark transition on scroll!
          ========================================================================= */}
      {!isMobile && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: `${120 * scale}px` }}>
          {/* Top Sticky Header Navigation Bar */}
          <header
            role="banner"
            style={{
              position: "fixed",
              top: `${(25 + 8) * scale}px`,
              left: `${left}px`,
              width: "1440px",
              height: "40px",
              transformOrigin: "top left",
              transform: `scale(${scale})`,
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            {/* Back Button (Capsule pill) */}
            <motion.div
              style={{ position: "absolute", left: 90, top: 0, pointerEvents: "auto" }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <button
                className="about-back-btn"
                onClick={() => navigateTo("/")}
                aria-label="Back to Portfolio Homepage"
                style={{
                  backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                  borderColor: "#7b7a77",
                  height: 40,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderRadius: 110,
                  border: "1px solid #7b7a77",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  boxShadow: "0 4px 12px rgba(25, 11, 0, 0.08)",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", width: 11, height: 11, alignItems: "center", justifyContent: "center" }}>
                  <svg width="11" height="11" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M10 12.5L4.5 7.5L10 2.5"
                      stroke={isDark ? "#FFFDFA" : "#190B00"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: "stroke 0.25s ease" }}
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 900,
                    fontSize: 14,
                    color: isDark ? "#FFFDFA" : "#190b00",
                    letterSpacing: "0.56px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "color 0.25s ease",
                  }}
                >
                  BACK
                </span>
              </button>
            </motion.div>

            {/* Brand Capsule on the right (Pill BG shape + shadow, strictly no stroke) */}
            <motion.div
              style={{ position: "absolute", left: 1292, top: 0, pointerEvents: "auto" }}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            >
              <div
                className="about-brand-capsule"
                onClick={() => navigateTo("/")}
                role="button"
                aria-label="Return Home"
                title="Return Home"
                style={{
                  cursor: "pointer",
                  pointerEvents: "auto",
                  backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                  borderRadius: 110,
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 58,
                  height: 40,
                  boxShadow: isDark
                    ? "0 4px 14px rgba(0, 0, 0, 0.45)"
                    : "0 4px 14px rgba(25, 11, 0, 0.08)",
                  boxSizing: "border-box",
                  transition: "background-color 0.8s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease",
                }}
              >
                <BrandVector theme={isDark ? "light" : "dark"} width={48} height={32} />
              </div>
            </motion.div>
          </header>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: [ S-001 ] IN A NUTSHELL & OVERVIEW
              Separated from next section by 200px
              ═══════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              width: `${contentWidth}px`,
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
                border: "1px solid #7b7a77",
                padding: "24px 0",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFDFA",
                boxSizing: "border-box",
              }}
            >
              <div className="about-marquee-track">
                {/* First half: unit 1 animates entrance, followed by static units */}
                <AboutMarqueeUnit animateEntrance />
                <AboutMarqueeUnit />
                <AboutMarqueeUnit />
                {/* Second half for seamless linear loop */}
                <AboutMarqueeUnit />
                <AboutMarqueeUnit />
                <AboutMarqueeUnit />
              </div>
            </div>

            {/* Content Box (Attached Brutalist Stage) */}
            <div
              style={{
                backgroundColor: "#FFFDFA",
                border: "1px solid #7b7a77",
                borderTop: "none",
                padding: "52px 56px",
                boxSizing: "border-box",
              }}
            >
              {/* Section Sub-Tag */}
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.8px",
                  color: "#EE6C13",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                [ S-001 ] EXECUTIVE PROFILE
              </div>
              {/* Big Editorial Headline with Quick Text Streaming Reveal */}
              <QuickStreamingParagraph
                segments={NUTSHELL_SEGMENTS_DESKTOP}
                baseDelay={0.28}
                stagger={0.015}
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(26px, 2.5vw, 36px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.015em",
                  margin: "0 0 52px 0",
                  color: "#77695d",
                }}
              />

              {/* Architectural Impact Metrics Grid (VousVous OUTCOME Style) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  borderTop: "1px solid #7b7a77",
                  borderBottom: "1px solid #7b7a77",
                  boxSizing: "border-box",
                }}
              >
                {/* Metric 1 */}
                <div style={{ padding: "36px 32px 36px 0", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(48px, 4.5vw, 68px)", color: "#EE6C13", lineHeight: 1, marginBottom: 8 }}>
                    15+
                  </span>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 19, color: "#190b00", textTransform: "uppercase", margin: "0 0 8px 0" }}>
                    Organisations Reached
                  </h4>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, lineHeight: 1.6, color: "#77695d", margin: 0 }}>
                    Expanded Allyra's reach across 15+ organisations, including a pilot with a leading Indian enterprise group.
                  </p>
                </div>

                {/* Metric 2 */}
                <div style={{ padding: "36px 32px", borderLeft: "1px solid #7b7a77", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(48px, 4.5vw, 68px)", color: "#EE6C13", lineHeight: 1, marginBottom: 8 }}>
                    19+
                  </span>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 19, color: "#190b00", textTransform: "uppercase", margin: "0 0 8px 0" }}>
                    AI Agents Designed
                  </h4>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, lineHeight: 1.6, color: "#77695d", margin: 0 }}>
                    Designed interaction patterns and task-focused, human-in-the-loop workflows for 19+ AI agents with safety guardrails.
                  </p>
                </div>

                {/* Metric 3 */}
                <div style={{ padding: "36px 0 36px 32px", borderLeft: "1px solid #7b7a77", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(48px, 4.5vw, 68px)", color: "#EE6C13", lineHeight: 1, marginBottom: 8 }}>
                    ~1 → 2–3
                  </span>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 19, color: "#190b00", textTransform: "uppercase", margin: "0 0 8px 0" }}>
                    Features / Designer / Wk
                  </h4>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, lineHeight: 1.6, color: "#77695d", margin: 0 }}>
                    Scaled design velocity from ~1 to 2–3 features per designer per week through coded HTML prototypes and AI workflows.
                  </p>
                </div>
              </div>

              {/* Row 2: Secondary Domain Highlights with 1px Vertical Dividers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  boxSizing: "border-box",
                }}
              >
                {/* Col 1 */}
                <div style={{ padding: "32px 32px 10px 0", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.8px", color: "#EE6C13", textTransform: "uppercase", marginBottom: 6 }}>
                    [ PLATFORM WORKFLOWS ]
                  </span>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#190b00", margin: "0 0 8px 0" }}>
                    Tulah Wellness
                  </h4>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, lineHeight: 1.6, color: "#77695d", margin: 0 }}>
                    Replaced fragmented spreadsheets, documents, and manual forms with connected digital hospitality workflows.
                  </p>
                </div>

                {/* Col 2 */}
                <div style={{ padding: "32px 32px 10px 32px", borderLeft: "1px solid #7b7a77", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.8px", color: "#EE6C13", textTransform: "uppercase", marginBottom: 6 }}>
                    [ CLIENT APPRECIATION ]
                  </span>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#190b00", margin: "0 0 8px 0" }}>
                    Stanford Medicine
                  </h4>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, lineHeight: 1.6, color: "#77695d", margin: 0 }}>
                    Designed operational UI/UX for course planning, accounts, scholarships, and the Financial Aid app.
                  </p>
                </div>

                {/* Col 3 */}
                <div style={{ padding: "32px 0 10px 32px", borderLeft: "1px solid #7b7a77", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.8px", color: "#EE6C13", textTransform: "uppercase", marginBottom: 6 }}>
                    [ THOUGHT LEADERSHIP ]
                  </span>
                  <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#190b00", margin: "0 0 8px 0" }}>
                    TiE Keynote Speaker
                  </h4>
                  <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 16, lineHeight: 1.6, color: "#77695d", margin: 0 }}>
                    Speaker at TiE Chandigarh on Human-Centred Design and building trustworthy AI interaction models.
                  </p>
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
              width: `${contentWidth}px`,
              marginBottom: 200, // 200PX GAP SEPARATION
              boxSizing: "border-box",
            }}
          >
            {/* Header Box */}
            <div
              style={{
                backgroundColor: "#FFFDFA",
                border: "1px solid #7b7a77",
                padding: "44px 56px",
                boxSizing: "border-box",
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
                    fontSize: 12,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  [ S-002 ] FROM SYSTEMS TO AI-NATIVE PRODUCTS
                </span>
                <h2
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(64px, 7vw, 110px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    color: "#190b00",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  FOUNDATION
                </h2>
              </div>
              <div style={{ flexShrink: 0 }}>
                <BrandVector theme="dark" width={180} height={120} />
              </div>
            </div>

            {/* Content Box (Attached -mt-[1px]) */}
            <div
              style={{
                backgroundColor: "#FFFDFA",
                border: "1px solid #7b7a77",
                borderTop: "none",
                boxSizing: "border-box",
              }}
            >
              {/* Lead Pullquote Banner */}
              <div
                style={{
                  padding: "44px 56px 40px 56px",
                  borderBottom: "1px solid #7b7a77",
                  boxSizing: "border-box",
                }}
              >
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    lineHeight: 1.5,
                    color: "#77695d",
                    margin: 0,
                  }}
                >
                  “My journey began in <strong style={{ color: "#190b00", fontWeight: 800 }}>Computer Science Engineering</strong>, where I developed a deep appreciation for system architecture, constraints, and data flows. That technical rigour shapes every AI interaction pattern, agent approval flow, and enterprise workflow I design today.”
                </p>
              </div>

              {/* 3-Column Architectural Progression Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  boxSizing: "border-box",
                }}
              >
                {/* Chapter 01 */}
                <div
                  style={{
                    padding: "40px 36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 40, color: "#EE6C13" }}>
                        01
                      </span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12.5, fontWeight: 700, color: "#77695d" }}>
                        2015 – 2020
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#190b00", margin: "0 0 10px 0", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                      SYSTEMS &amp; ENTERPRISE ROOTS
                    </h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: "#EE6C13", letterSpacing: "0.5px", margin: "0 0 14px 0", textTransform: "uppercase" }}>
                      B.E. COMPUTER SCIENCE · TCS · APPLE PRODUCTION SYSTEMS
                    </p>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 17, lineHeight: 1.7, color: "#4A4238", margin: 0 }}>
                      I studied Computer Science Engineering, then supported Apple's enterprise production systems at Tata Consultancy Services. It taught me how large-scale operations and incident management work when reliability matters, and why good products start with how systems behave.
                    </p>
                  </div>
                </div>

                {/* Chapter 02 */}
                <div
                  style={{
                    padding: "40px 36px",
                    borderLeft: "1px solid #7b7a77",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 40, color: "#EE6C13" }}>
                        02
                      </span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12.5, fontWeight: 700, color: "#77695d" }}>
                        2020 – 2024
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#190b00", margin: "0 0 10px 0", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                      COMPLEX WORKFLOWS &amp; SCALE
                    </h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: "#EE6C13", letterSpacing: "0.5px", margin: "0 0 14px 0", textTransform: "uppercase" }}>
                      5EXCEPTIONS · JOONIFY · STANFORD MEDICINE
                    </p>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 17, lineHeight: 1.7, color: "#4A4238", margin: 0 }}>
                      I moved into product design across healthcare, fintech, education, and IoT. I owned design for Stanford Medicine's Financial Aid app, earning written appreciation from its leadership, and created Joonify's Talent Discovery Assessment journey for a platform serving 750+ parents.
                    </p>
                  </div>
                </div>

                {/* Chapter 03 */}
                <div
                  style={{
                    padding: "40px 36px",
                    borderLeft: "1px solid #7b7a77",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 40, color: "#EE6C13" }}>
                        03
                      </span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12.5, fontWeight: 700, color: "#77695d" }}>
                        2024 – PRESENT
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#190b00", margin: "0 0 10px 0", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                      AI-NATIVE PRODUCT LEADERSHIP
                    </h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, color: "#EE6C13", letterSpacing: "0.5px", margin: "0 0 14px 0", textTransform: "uppercase" }}>
                      PANSOPHIC TECHNOLOGIES · VROZART DACKSON · ALLYRA.AI
                    </p>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 17, lineHeight: 1.7, color: "#4A4238", margin: 0 }}>
                      I co-authored the Vibe UX Framework for AI-native experiences, then stepped into product leadership. Today I lead direction and roadmap for Allyra.ai with a team of 3 designers and 2 business analysts, designing human-in-the-loop workflows for 19+ AI agents, now reaching 15+ organisations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Ticker Bar on the bottom of Section 2 */}
              <div
                style={{
                  height: 68,
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
                          fontSize: 17,
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
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              DARK TRANSITION TRIGGER ELEMENT
              When you scroll past Section 2 towards Career Timeline,
              the background smoothly transitions into deep dark espresso #190b00!
              ═══════════════════════════════════════════════════════════════════ */}
          <div id="about-dark-trigger" style={{ height: 1, width: "100%", opacity: 0 }} />

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: [ S-003 ] CAREER TIMELINE / EXPERIENCE
              Separated from next section by 200px
              ═══════════════════════════════════════════════════════════════════ */}
          <ExperienceTimeline
            isDark={isDark}
            contentWidth={contentWidth}
            scale={scale}
            isMobile={false}
          />

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: [ S-005 ] ACADEMICS & CREDENTIALS
              Separated from next section by 200px
              ═══════════════════════════════════════════════════════════════════ */}
          <section
            style={{
              width: `${contentWidth}px`,
              marginBottom: 200, // 200PX GAP SEPARATION BEFORE FOOTER
              boxSizing: "border-box",
            }}
          >
            {/* Header Box */}
            <div
              style={{
                backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                border: "1px solid #7b7a77",
                padding: "44px 56px",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background-color 0.8s ease",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  [ S-005 ] ACADEMICS &amp; CREDENTIALS
                </span>
                <h2
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(64px, 7vw, 110px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    color: isDark ? "#FFFDFA" : "#190b00",
                    textTransform: "uppercase",
                    margin: 0,
                    transition: "color 0.8s ease",
                  }}
                >
                  EDUCATION
                </h2>
              </div>
              <div style={{ flexShrink: 0 }}>
                <BrandVector theme={isDark ? "light" : "dark"} width={180} height={120} />
              </div>
            </div>

            {/* Content Box (Attached -mt-[1px]) */}
            <div
              style={{
                backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                border: "1px solid #7b7a77",
                borderTop: "none",
                boxSizing: "border-box",
                transition: "background-color 0.8s ease",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  boxSizing: "border-box",
                }}
              >
                {EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "48px 52px",
                      borderLeft: idx > 0 ? "1px solid #7b7a77" : "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      backgroundColor: isDark ? "#150c05" : "#FFFDFA",
                      transition: "background-color 0.8s ease",
                      boxSizing: "border-box",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: 56,
                          lineHeight: 1,
                          color: "#EE6C13",
                          display: "block",
                          marginBottom: 16,
                        }}
                      >
                        {edu.year}
                      </span>
                      <h3
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: 900,
                          fontSize: 24,
                          color: isDark ? "#FFFDFA" : "#190b00",
                          margin: "0 0 10px 0",
                          transition: "color 0.8s ease",
                        }}
                      >
                        {edu.degree}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 500,
                        fontSize: 16,
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
              SECTION 6: [ S-006 ] CREATIVE LAB
              Exploratory Generative AI Video Direction & Visual Storytelling
              ═══════════════════════════════════════════════════════════════════ */}
          <CreativeLab
            isDark={isDark}
            contentWidth={contentWidth}
            scale={scale}
            isMobile={false}
          />

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6B: [ S-006 // CAPABILITIES ] GRAVITY SKILLS LAB
              Physics-driven gravity pill drop positioned just above footer
              ═══════════════════════════════════════════════════════════════════ */}
          <GravitySkillsSection
            isDark={isDark}
            contentWidth={contentWidth}
            scale={scale}
            isMobile={false}
          />

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: [ S-007 ] FOOTER
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
            <div
              style={{
                width: `${contentWidth}px`,
                height: `${560 * scale}px`,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  width: 1280,
                  height: 560,
                }}
              >
                <Footer style={{ borderRadius: 0, border: "1px solid #7b7a77" }} sectionTag="[ S-007 ]" />
              </div>
            </div>
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
              borderBottom: "none",
              padding: "14px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "background 0.8s ease",
            }}
          >
            <motion.div
              initial={{ y: -36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <button
                className="about-back-btn"
                onClick={() => navigateTo("/")}
                aria-label="Back to Portfolio Homepage"
                style={{
                  height: 38,
                  padding: "0 16px",
                  borderRadius: 110,
                  border: "1px solid #7b7a77",
                  backgroundColor: isDark ? "#190B00" : "#FFFDFA",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", width: 11, height: 11, alignItems: "center", justifyContent: "center" }}>
                  <svg width="11" height="11" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M10 12.5L4.5 7.5L10 2.5"
                      stroke={isDark ? "#FFFDFA" : "#190B00"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: "stroke 0.25s ease" }}
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 900,
                    fontSize: 12,
                    color: isDark ? "#FFFDFA" : "#190b00",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "color 0.25s ease",
                  }}
                >
                  BACK
                </span>
              </button>
            </motion.div>

            <motion.div
              initial={{ y: -36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <BrandVector theme={isDark ? "light" : "dark"} width={60} height={40} />
            </motion.div>
          </header>

          <main style={{ padding: "20px 16px 40px 16px", display: "flex", flexDirection: "column" }}>
            {/* Mobile Section 1: In A Nutshell / Overview */}
            <div
              style={{
                marginBottom: 60,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Marquee Inside Card Top */}
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  padding: "16px 0",
                  border: "1px solid #7b7a77",
                  background: "#FFFDFA",
                }}
              >
                <div className="about-marquee-track">
                  <AboutMarqueeUnit animateEntrance isMobile />
                  <AboutMarqueeUnit isMobile />
                  <AboutMarqueeUnit isMobile />
                  <AboutMarqueeUnit isMobile />
                </div>
              </div>

              {/* Mobile Content Stage */}
              <div
                style={{
                  backgroundColor: "#FFFDFA",
                  border: "1px solid #7b7a77",
                  borderTop: "none",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
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
                    marginBottom: 14,
                  }}
                >
                  [ S-001 ] EXECUTIVE PROFILE
                </span>
                {/* Big Editorial Headline */}
                <QuickStreamingParagraph
                  segments={NUTSHELL_SEGMENTS_MOBILE}
                  baseDelay={0.25}
                  stagger={0.016}
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 400,
                    fontSize: 20,
                    lineHeight: 1.45,
                    color: "#77695d",
                    margin: "0 0 24px 0",
                  }}
                />

                {/* Primary Stats Grid */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderTop: "1px solid #7b7a77",
                    borderBottom: "1px solid #7b7a77",
                    padding: "16px 0",
                    gap: 18,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 44, color: "#EE6C13", lineHeight: 1, display: "block" }}>
                      15+
                    </span>
                    <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 16, color: "#190b00", textTransform: "uppercase", margin: "4px 0 2px 0" }}>
                      Organisations Reached
                    </h4>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, color: "#77695d", margin: 0, lineHeight: 1.5 }}>
                      Expanded Allyra across enterprise pilots &amp; production deployment.
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(123, 122, 119, 0.3)", paddingTop: 16 }}>
                    <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 44, color: "#EE6C13", lineHeight: 1, display: "block" }}>
                      19+
                    </span>
                    <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 16, color: "#190b00", textTransform: "uppercase", margin: "4px 0 2px 0" }}>
                      AI Agents Designed
                    </h4>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, color: "#77695d", margin: 0, lineHeight: 1.5 }}>
                      Task-focused, human-in-the-loop workflows with safety guardrails.
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(123, 122, 119, 0.3)", paddingTop: 16 }}>
                    <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 44, color: "#EE6C13", lineHeight: 1, display: "block" }}>
                      ~1 → 2–3
                    </span>
                    <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 16, color: "#190b00", textTransform: "uppercase", margin: "4px 0 2px 0" }}>
                      Features / Designer / Wk
                    </h4>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, color: "#77695d", margin: 0, lineHeight: 1.5 }}>
                      Scaled throughput via coded HTML prototypes and AI workflows.
                    </p>
                  </div>
                </div>

                {/* Secondary Domain Callouts */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ background: "rgba(25, 11, 0, 0.03)", border: "1px solid #7b7a77", padding: "14px 16px" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.6px", color: "#EE6C13", textTransform: "uppercase", display: "block", marginBottom: 3 }}>
                      [ PLATFORM WORKFLOWS ]
                    </span>
                    <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#190b00", margin: "0 0 4px 0" }}>
                      Tulah Wellness
                    </h4>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, color: "#77695d", margin: 0, lineHeight: 1.5 }}>
                      Automated fragmented spreadsheets and manual forms into connected digital workflows.
                    </p>
                  </div>

                  <div style={{ background: "rgba(25, 11, 0, 0.03)", border: "1px solid #7b7a77", padding: "14px 16px" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.6px", color: "#EE6C13", textTransform: "uppercase", display: "block", marginBottom: 3 }}>
                      [ CLIENT APPRECIATION ]
                    </span>
                    <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#190b00", margin: "0 0 4px 0" }}>
                      Stanford Medicine
                    </h4>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, color: "#77695d", margin: 0, lineHeight: 1.5 }}>
                      Designed operational UI/UX for course planning, accounts, scholarships, and Financial Aid.
                    </p>
                  </div>

                  <div style={{ background: "rgba(25, 11, 0, 0.03)", border: "1px solid #7b7a77", padding: "14px 16px" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.6px", color: "#EE6C13", textTransform: "uppercase", display: "block", marginBottom: 3 }}>
                      [ THOUGHT LEADERSHIP ]
                    </span>
                    <h4 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#190b00", margin: "0 0 4px 0" }}>
                      TiE Keynote Speaker
                    </h4>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, color: "#77695d", margin: 0, lineHeight: 1.5 }}>
                      Speaker at TiE Chandigarh on Human-Centred Design and AI interactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Section 2: The Foundation & Dive Deeper */}
            <div
              style={{
                marginBottom: 60,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Mobile Header Pavilion Box */}
              <div
                style={{
                  backgroundColor: "#FFFDFA",
                  border: "1px solid #7b7a77",
                  padding: "24px 20px",
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
                      fontSize: 11,
                      letterSpacing: "0.8px",
                      color: "#EE6C13",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    [ S-002 ] FROM SYSTEMS TO AI-NATIVE PRODUCTS
                  </span>
                  <h2
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 900,
                      fontSize: 38,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "#190b00",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    FOUNDATION
                  </h2>
                </div>
                <BrandVector theme="dark" width={56} height={38} />
              </div>

              {/* Mobile Content Stage */}
              <div
                style={{
                  backgroundColor: "#FFFDFA",
                  border: "1px solid #7b7a77",
                  borderTop: "none",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {/* Pullquote */}
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontStyle: "italic",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#77695d",
                    borderBottom: "1px solid #7b7a77",
                    paddingBottom: 16,
                    margin: 0,
                  }}
                >
                  “My journey began in <strong style={{ color: "#190b00", fontWeight: 800 }}>Computer Science Engineering</strong>, where I developed a deep appreciation for system architecture, constraints, and data flows. That technical rigour shapes every AI interaction pattern, agent approval flow, and enterprise workflow I design today.”
                </p>

                {/* 3 Chapters */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#EE6C13" }}>
                        01
                      </span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 700, color: "#77695d" }}>
                        2015 – 2020
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#190b00", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                      SYSTEMS &amp; ENTERPRISE ROOTS
                    </h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#EE6C13", margin: "0 0 6px 0", textTransform: "uppercase" }}>
                      B.E. COMPUTER SCIENCE · TCS · APPLE PRODUCTION SYSTEMS
                    </p>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, lineHeight: 1.55, color: "#4A4238", margin: 0 }}>
                      I studied Computer Science Engineering, then supported Apple's enterprise production systems at Tata Consultancy Services. It taught me how large-scale operations and incident management work when reliability matters, and why good products start with how systems behave.
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(123, 122, 119, 0.3)", paddingTop: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#EE6C13" }}>
                        02
                      </span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 700, color: "#77695d" }}>
                        2020 – 2024
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#190b00", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                      COMPLEX WORKFLOWS &amp; SCALE
                    </h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#EE6C13", margin: "0 0 6px 0", textTransform: "uppercase" }}>
                      5EXCEPTIONS · JOONIFY · STANFORD MEDICINE
                    </p>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, lineHeight: 1.55, color: "#4A4238", margin: 0 }}>
                      I moved into product design across healthcare, fintech, education, and IoT. I owned design for Stanford Medicine's Financial Aid app, earning written appreciation from its leadership, and created Joonify's Talent Discovery Assessment journey for a platform serving 750+ parents.
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(123, 122, 119, 0.3)", paddingTop: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 24, color: "#EE6C13" }}>
                        03
                      </span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 700, color: "#77695d" }}>
                        2024 – PRESENT
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 18, color: "#190b00", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                      AI-NATIVE PRODUCT LEADERSHIP
                    </h3>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#EE6C13", margin: "0 0 6px 0", textTransform: "uppercase" }}>
                      PANSOPHIC TECHNOLOGIES · VROZART DACKSON · ALLYRA.AI
                    </p>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14.5, lineHeight: 1.55, color: "#4A4238", margin: 0 }}>
                      I co-authored the Vibe UX Framework for AI-native experiences, then stepped into product leadership. Today I lead direction and roadmap for Allyra.ai with a team of 3 designers and 2 business analysts, designing human-in-the-loop workflows for 19+ AI agents, now reaching 15+ organisations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Ticker */}
              <div
                style={{
                  overflow: "hidden",
                  padding: "12px 0",
                  border: "1px solid #7b7a77",
                  borderTop: "none",
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
                          fontSize: 14,
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

            {/* Mobile Section 3: Career Timeline & Experience */}
            <ExperienceTimeline
              isDark={isDark}
              contentWidth={contentWidth}
              scale={scale}
              isMobile={true}
            />

            {/* Mobile Section 5: Academics & Credentials */}
            <div
              style={{
                marginBottom: 60,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Mobile Header Pavilion Box */}
              <div
                style={{
                  backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                  border: "1px solid #7b7a77",
                  padding: "24px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background-color 0.8s ease",
                }}
              >
                <div>
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
                    [ S-005 ] ACADEMICS &amp; CREDENTIALS
                  </span>
                  <h3
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 900,
                      fontSize: 34,
                      lineHeight: 1,
                      letterSpacing: "-0.01em",
                      color: isDark ? "#FFFDFA" : "#190b00",
                      textTransform: "uppercase",
                      margin: 0,
                      transition: "color 0.8s ease",
                    }}
                  >
                    EDUCATION
                  </h3>
                </div>
                <BrandVector theme={isDark ? "light" : "dark"} width={56} height={38} />
              </div>

              {/* Mobile Content Stage */}
              <div
                style={{
                  backgroundColor: isDark ? "#190b00" : "#FFFDFA",
                  border: "1px solid #7b7a77",
                  borderTop: "none",
                  padding: "20px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition: "background-color 0.8s ease",
                }}
              >
                {EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "1px solid #7b7a77",
                      borderRadius: 0, // SHARP CORNER
                      padding: "18px 16px",
                      background: isDark ? "#150C05" : "#FFFDFA",
                      transition: "background-color 0.8s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 900,
                        fontSize: 32,
                        lineHeight: 1,
                        color: "#EE6C13",
                        display: "block",
                        marginBottom: 6,
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

            {/* Mobile Section 6: [ S-006 ] Creative Lab */}
            <CreativeLab
              isDark={isDark}
              contentWidth={contentWidth}
              scale={scale}
              isMobile={true}
            />

            {/* Mobile Gravity Skills Section just above footer */}
            <div style={{ padding: "0 16px", marginTop: "32px", marginBottom: "32px" }}>
              <GravitySkillsSection
                isDark={isDark}
                contentWidth="100%"
                scale={scale}
                isMobile={true}
              />
            </div>
          </main>

          {/* Mobile Finale Footer */}
          <MobileFinale isDark={isDark} sectionTag="[ S-007 ]" />
        </div>
      )}
    </div>
  );
}
