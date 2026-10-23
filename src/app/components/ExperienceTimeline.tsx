import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

export interface SubRole {
  id: string;
  tabLabel: string;
  mobileTabLabel?: string;
  shortRole: string;
  role: string;
  company: string;
  divisionLabel?: string;
  period: string;
  yearLabel?: string;
  subnote?: string;
  points: string[];
  tags: string[];
}

export interface ExperienceItem {
  period: string;
  yearLabel: string;
  company: string;
  shortCompany: string;
  role: string;
  subnote?: string;
  summary: string;
  points: string[];
  tags: string[];
  transitionBadge?: string;
  transitionNote?: string;
  subRoles?: SubRole[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "JUN 2024 – PRESENT",
    yearLabel: "2024 – NOW",
    company: "PANSOPHIC TECHNOLOGIES",
    shortCompany: "Pansophic Tech",
    role: "Product Lead & UXD Head",
    subnote: "Enterprise AI, agentic workflows & cross-functional design leadership",
    summary:
      "Led product direction, roadmap prioritisation, and end-to-end UX strategy for Allyra.ai, an enterprise B2B AI platform, taking it from pilot to production. Expanded reach across 15+ organisations, including a pilot with a leading Indian enterprise group, designing interaction patterns for 19+ AI agents. Led a team of 3 designers and 2 business analysts while boosting design throughput to 2–3 features per designer/week. Designed workflow automation for Tulah, a wellness platform, replacing spreadsheets and manual forms with connected digital workflows. Previously as UXD Head at Vrozart Dackson, co-authored the Vibe UX Framework and directed product experience for VousVous, Farmland Bazaar, and Evosell.",
    points: [
      "Led end-to-end UX strategy, roadmap prioritisation, and enterprise workflow repositioning for Allyra.ai, taking it from pilot to production across 15+ organisations.",
      "Designed conversational, Human-in-the-Loop interaction models for 19+ AI agents with progress tracking, user approvals, and safety guardrails, validated via customer usability research.",
      "Led a cross-functional team of 3 designers and 2 business analysts across engineering, sales, marketing, and executive leadership, tracked in Jira.",
      "Scaled design velocity from 1 to 2–3 features per designer/week by pairing Figma with rapid HTML prototypes and AI-assisted workflows.",
      "Designed workflow automation for Tulah (hospitality/wellness) and provided UX leadership for emerging AI platforms Raxaa.ai and EOMs.ai.",
    ],
    tags: ["allyra.ai", "15+ Organisations", "19+ AI Agents", "Team Leadership", "Tulah Automation", "Raxaa.ai & EOMs.ai"],
    subRoles: [
      {
        id: "product-lead",
        tabLabel: "01 · PRODUCT LEAD",
        mobileTabLabel: "01 · PRODUCT LEAD",
        shortRole: "Product Lead",
        role: "Product Lead",
        company: "Pansophic Technologies",
        divisionLabel: "Enterprise Platform: Allyra.ai",
        period: "JAN 2025 – PRESENT",
        yearLabel: "2025 – NOW",
        points: [
          "Led end-to-end UX strategy, roadmap prioritisation, and enterprise workflow repositioning for Allyra.ai, taking it from pilot to production across 15+ organisations.",
          "Designed conversational, Human-in-the-Loop interaction models for 19+ AI agents with progress tracking, user approvals, and safety guardrails, validated via customer usability research.",
          "Led a cross-functional team of 3 designers and 2 business analysts across engineering, sales, marketing, and executive leadership, tracked in Jira.",
          "Scaled design velocity from 1 to 2–3 features per designer/week by pairing Figma with rapid HTML prototypes and AI-assisted workflows.",
          "Designed workflow automation for Tulah (hospitality/wellness) and provided UX leadership for emerging AI platforms Raxaa.ai and EOMs.ai.",
        ],
        tags: ["allyra.ai", "15+ Organisations", "19+ AI Agents", "Team Leadership", "Tulah Automation", "Raxaa.ai & EOMs.ai"],
      },
      {
        id: "uxd-head",
        tabLabel: "02 · UXD HEAD (VROZART)",
        mobileTabLabel: "02 · UXD HEAD (VROZART)",
        shortRole: "UXD Head",
        role: "UXD Head",
        company: "Vrozart Dackson Enterprise Pvt. Ltd.",
        divisionLabel: "Design Studio Division: Vrozart Dackson Enterprise",
        period: "JUN 2024 – DEC 2024",
        yearLabel: "JUN – DEC 2024",
        subnote: "(Vrozart Dackson Enterprise Pvt. Ltd.)",
        points: [
          "Co-authored the Vibe UX Framework, establishing principles for context-aware and AI-native user experiences.",
          "Led UX strategy and interaction design across enterprise SaaS, AI-powered products, and consumer platforms.",
          "Directed product experiences for Farmland Bazaar, Evosell by Evoluxar, and VousVous across customer discovery, user flows, workflows, and information architecture.",
          "Established scalable, accessibility-aware (WCAG) design systems and developer handoff processes, integrating AI-assisted workflows into concept exploration and prototyping.",
        ],
        tags: ["Vibe UX Framework", "VousVous", "Farmland Bazaar", "Evosell", "Design Systems (WCAG)"],
      },
    ],
  },
  {
    period: "MAY 2023 – JUN 2024",
    yearLabel: "2023 – 2024",
    company: "VERTISYSTEM (Client: Stanford Medicine)",
    shortCompany: "Stanford Medicine",
    role: "UI UX Designer",
    subnote: "Written appreciation received from Stanford Medicine leadership",
    summary:
      "Partnered with Stanford Medicine stakeholders to translate complex administrative processes into structured digital workflows, user flows, wireframes, and high-fidelity prototypes. Owned design for the Financial Aid app alongside semester/course planning and scholarships.",
    points: [
      "Partnered with Stanford Medicine stakeholders to translate complex administrative processes into structured digital workflows, user flows, wireframes, and high-fidelity prototypes.",
      "Designed end-to-end UI/UX flows for student administrative systems covering semester and course planning, financial accounts, and scholarships.",
      "Owned design for the Financial Aid app, working with distributed engineering and stakeholder teams.",
      "Received written appreciation from Stanford Medicine leadership for contributions that were instrumental to project success.",
    ],
    tags: ["Stanford Medicine", "Financial Aid App", "Course Planning", "Administrative Workflows"],
  },
  {
    period: "JUN 2022 – MAY 2023",
    yearLabel: "2022 – 2023",
    company: "JOONIFY",
    shortCompany: "Joonify",
    role: "User Interface Designer",
    subnote: "Platform trusted by 750+ parents",
    summary:
      "Designed end-to-end product experiences across web and mobile platforms for parents and children. Created the Talent Discovery Assessment journey, helping deliver personalised learning and growth insights through guided assessments.",
    points: [
      "Designed end-to-end product experiences across web and mobile platforms for parents and children.",
      "Created the Talent Discovery Assessment journey, helping deliver personalised learning and growth insights through guided assessments.",
      "Designed onboarding, assessment, and learning experiences for a platform serving 750+ parents.",
    ],
    tags: ["Ed-Tech", "Assessment Journey", "Personalised Learning", "Web & Mobile"],
  },
  {
    period: "MAY 2021 – MAY 2022",
    yearLabel: "2021 – 2022",
    company: "5EXCEPTIONS SOFTWARE SOLUTIONS",
    shortCompany: "5Exceptions",
    role: "UI UX Designer",
    subnote: "Cross-domain enterprise & emerging technology platforms",
    summary:
      "Designed digital products across healthcare, fintech, education, utility, and emerging technology domains. Delivered UX and UI solutions for web platforms, mobile applications, enterprise systems, e-commerce products, and HMI interfaces. Built foundational expertise in responsive design systems, interaction design, and developer handoff workflows.",
    points: [
      "Designed digital products across healthcare, fintech, education, utility, and emerging technology domains.",
      "Delivered UX and UI solutions for web platforms, mobile applications, enterprise systems, e-commerce products, and HMI interfaces.",
      "Built foundational expertise in responsive design systems, interaction design, and developer handoff workflows.",
    ],
    tags: ["Healthcare & Fintech", "HMI Interfaces", "Enterprise Systems", "Design Systems"],
  },
  {
    period: "OCT 2020 – MAY 2021",
    yearLabel: "2020 – 2021",
    company: "FREELANCE",
    shortCompany: "Freelance",
    role: "UI UX Designer",
    subnote: "E-commerce, IoT & connected device launches",
    summary:
      "Partnered with Robo Inventors to launch e-commerce, IoT, and smart home products, contributing from UX strategy to production-ready interfaces.",
    points: [
      "Partnered with Robo Inventors to launch e-commerce, IoT, and smart home products, contributing from UX strategy to production-ready interfaces.",
    ],
    tags: ["Smart Home & IoT", "E-Commerce", "UX Strategy", "Robo Inventors"],
  },
  {
    period: "JUN 2019 – SEP 2020",
    yearLabel: "2019 – 2020",
    company: "TATA CONSULTANCY SERVICES",
    shortCompany: "Tata Consultancy Services",
    role: "Assistant System Engineer",
    subnote: "Apple Enterprise Production Systems",
    summary:
      "Supported Apple's enterprise production systems while building a strong foundation in large-scale operations, incident management, and enterprise software.",
    points: [
      "Supported Apple's enterprise production systems while building a strong foundation in large-scale operations, incident management, and enterprise software.",
    ],
    tags: ["Apple Production Support", "Enterprise Operations", "Systems Thinking"],
  },
];

interface ExperienceTimelineProps {
  isDark: boolean;
  contentWidth: number;
  scale?: number;
  isMobile?: boolean;
}

export default function ExperienceTimeline({
  isDark,
  contentWidth,
  scale = 1,
  isMobile = false,
}: ExperienceTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSubRoleIndex, setActiveSubRoleIndex] = useState(0);
  const [isExpandedPoints, setIsExpandedPoints] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  // Reset active sub-role & mobile expansion when milestone changes
  useEffect(() => {
    setActiveSubRoleIndex(0);
    setIsExpandedPoints(false);
  }, [activeIndex]);

  useEffect(() => {
    setIsExpandedPoints(false);
  }, [activeSubRoleIndex]);

  // Desktop Scroll Budget constants (Airy, executive readability scaled to viewport)
  const STAGE_HEIGHT = 850;
  const SCROLL_PER_ITEM = 400;
  const TOTAL_TRACK_HEIGHT = STAGE_HEIGHT + (EXPERIENCES.length - 1) * SCROLL_PER_ITEM;
  const MAX_SCROLL = TOTAL_TRACK_HEIGHT - STAGE_HEIGHT;

  // Desktop Viewport Locked Scroll Listener
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const stickyTopOffset = 70;

      if (rect.top <= stickyTopOffset) {
        const scrolled = Math.max(0, stickyTopOffset - rect.top);
        const progress = Math.min(Math.max(scrolled / MAX_SCROLL, 0), 1);
        const targetIndex = Math.min(
          Math.floor(progress * EXPERIENCES.length),
          EXPERIENCES.length - 1
        );

        setActiveIndex((prev) => {
          if (prev !== targetIndex) {
            playHoverTick();
            return targetIndex;
          }
          return prev;
        });
      } else {
        setActiveIndex(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, MAX_SCROLL]);

  // Handle direct milestone selection via click or prev/next
  const handleSelectIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= EXPERIENCES.length) return;
      playClickSound();
      setActiveIndex(index);

      if (!isMobile && containerRef.current) {
        isProgrammaticScrollRef.current = true;
        const rect = containerRef.current.getBoundingClientRect();
        const currentScrollY = window.scrollY;
        const containerAbsTop = currentScrollY + rect.top;
        const stepZone = MAX_SCROLL / EXPERIENCES.length;
        const targetScrolled = index * stepZone + 15;
        const targetScrollY = containerAbsTop - 70 + targetScrolled;

        window.scrollTo({ top: targetScrollY, behavior: "smooth" });

        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 600);
      }
    },
    [isMobile, MAX_SCROLL]
  );

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(diffX) > 40) {
      if (diffX < 0 && activeIndex < EXPERIENCES.length - 1) {
        handleSelectIndex(activeIndex + 1);
      } else if (diffX > 0 && activeIndex > 0) {
        handleSelectIndex(activeIndex - 1);
      }
    }
  };

  const currentExp = EXPERIENCES[activeIndex];
  const hasSubRoles = Boolean(currentExp.subRoles && currentExp.subRoles.length > 0);
  const activeSub = hasSubRoles ? currentExp.subRoles![activeSubRoleIndex] : null;

  const displayCompany = activeSub ? activeSub.company : currentExp.company;
  const displayRole = activeSub ? activeSub.role : currentExp.role;
  const displayPeriod = activeSub ? activeSub.period : currentExp.period;
  const displaySubnote = activeSub ? activeSub.subnote : currentExp.subnote;
  const displayPoints = activeSub ? activeSub.points : currentExp.points;
  const displayTags = activeSub ? activeSub.tags : currentExp.tags;

  // ═════════════════════════════════════════════════════════════════════════
  // MOBILE VIEW (< 768px): Touch-friendly Milestone Rail + Swipable Stage
  // ═════════════════════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <section
        style={{
          width: "100%",
          backgroundColor: isDark ? "#190b00" : "#FFFDFA",
          color: isDark ? "#FFFDFA" : "#190b00",
          border: "1px solid #7b7a77",
          borderRadius: 0,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          marginBottom: 60,
          boxSizing: "border-box",
          overflow: "hidden",
          transition: "background-color 0.8s ease, color 0.8s ease",
        }}
      >
        {/* Mobile Header Bar */}
        <div
          style={{
            padding: "20px 18px",
            borderBottom: "1px solid #7b7a77",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
              [ S-004 ] CAREER TIMELINE
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 10.5,
                letterSpacing: "0.5px",
                color: isDark ? "#998D80" : "#77695d",
                textTransform: "uppercase",
              }}
            >
              7+ YEARS EXPERIENCE
            </span>
          </div>
          <h2
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 900,
              fontSize: 26,
              color: isDark ? "#FFFDFA" : "#190b00",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            EXPERIENCE
          </h2>
        </div>

        {/* Horizontal Milestone Rail */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 18px",
            borderBottom: "1px solid #7b7a77",
            overflowX: "auto",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            background: isDark ? "#140800" : "#faf6f0",
          }}
        >
          {EXPERIENCES.map((exp, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectIndex(idx)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  border: isSelected ? "1px solid #EE6C13" : "1px solid #7b7a77",
                  backgroundColor: isSelected ? "#EE6C13" : isDark ? "#190b00" : "#FFFDFA",
                  color: isSelected ? "#FFFDFA" : isDark ? "#998D80" : "#77695d",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "0.3px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: isSelected ? "#FFFDFA" : "#7b7a77",
                  }}
                />
                <span>{exp.yearLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Swipable Role Stage */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeIndex}-${activeSubRoleIndex}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Milestone Count & Period */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#EE6C13",
                    letterSpacing: "0.5px",
                  }}
                >
                  [ 0{activeIndex + 1} / 0{EXPERIENCES.length} ]
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 10.5,
                    color: isDark ? "#998D80" : "#77695d",
                    letterSpacing: "0.4px",
                  }}
                >
                  {currentExp.period}
                </span>
              </div>

              {/* Company Title */}
              <h3
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 900,
                  fontSize: 24,
                  color: isDark ? "#FFFDFA" : "#190b00",
                  margin: "0 0 10px 0",
                  lineHeight: 1.2,
                }}
              >
                {currentExp.company}
              </h3>

              {/* Sub-Role Switcher Tabs for Mobile: Brutalist Segmented Control */}
              {hasSubRoles && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: 2,
                    backgroundColor: isDark ? "rgba(255, 253, 250, 0.04)" : "#efe8de",
                    border: `1px solid ${isDark ? "#7b7a77" : "#8c8278"}`,
                    gap: 3,
                    margin: "6px 0 12px 0",
                    flexWrap: "wrap",
                  }}
                >
                  {currentExp.subRoles!.map((sub, sIdx) => {
                    const isSubSelected = sIdx === activeSubRoleIndex;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setActiveSubRoleIndex(sIdx);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 12px",
                          borderRadius: 0,
                          border: isSubSelected
                            ? "1px solid #EE6C13"
                            : "1px solid transparent",
                          backgroundColor: isSubSelected
                            ? "#EE6C13"
                            : "transparent",
                          color: isSubSelected
                            ? "#FFFDFA"
                            : isDark
                            ? "#C9C1B7"
                            : "#5a5047",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 800,
                          fontSize: 11,
                          letterSpacing: "0.4px",
                          whiteSpace: "nowrap",
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                        }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            backgroundColor: isSubSelected ? "#FFFDFA" : "#7b7a77",
                          }}
                        />
                        <span>{sub.mobileTabLabel || sub.tabLabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", margin: "0 0 6px 0" }}>
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    fontSize: 17,
                    color: "#EE6C13",
                    margin: 0,
                  }}
                >
                  {displayRole}
                </p>
                {hasSubRoles && (
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      color: isDark ? "#998D80" : "#77695d",
                    }}
                  >
                    · {displayPeriod}
                  </span>
                )}
              </div>

              {displaySubnote && (
                <p
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontStyle: "italic",
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: isDark ? "#998D80" : "#77695d",
                    margin: "0 0 12px 0",
                  }}
                >
                  {displaySubnote}
                </p>
              )}

              {/* Tags (Capped at 4 for scannability on mobile) */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {displayTags.slice(0, 4).map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      color: "#EE6C13",
                      background: isDark ? "rgba(238, 108, 19, 0.08)" : "rgba(238, 108, 19, 0.06)",
                      border: "1px solid rgba(238, 108, 19, 0.25)",
                      padding: "3px 9px",
                      borderRadius: 20,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Key Deliverables List (Concise 3 items default with seamless expander) */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {(isExpandedPoints ? displayPoints : displayPoints.slice(0, 3)).map((pt, pIdx) => (
                  <div key={pIdx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span
                      style={{
                        color: "#EE6C13",
                        fontSize: 11,
                        lineHeight: 1.5,
                        flexShrink: 0,
                        marginTop: 3,
                      }}
                    >
                      ◆
                    </span>
                    <span
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: isDark ? "#C9C1B7" : "#4A4238",
                      }}
                    >
                      {pt}
                    </span>
                  </div>
                ))}

                {displayPoints.length > 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setIsExpandedPoints(!isExpandedPoints);
                    }}
                    style={{
                      marginTop: 4,
                      alignSelf: "flex-start",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "transparent",
                      border: `1px solid ${isDark ? "#7b7a77" : "#8c8278"}`,
                      borderRadius: 9999,
                      padding: "6px 14px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.3px",
                      color: "#EE6C13",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>
                      {isExpandedPoints
                        ? "– Show Less"
                        : `+ ${displayPoints.length - 3} More Highlights`}
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Controls Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid #7b7a77",
            }}
          >
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={() => handleSelectIndex(activeIndex - 1)}
              style={{
                background: "transparent",
                border: "1px solid #7b7a77",
                borderRadius: 9999,
                padding: "6px 14px",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 11.5,
                color: isDark ? "#FFFDFA" : "#190b00",
                opacity: activeIndex === 0 ? 0.3 : 1,
                cursor: activeIndex === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← PREV
            </button>

            {/* Pagination Dots */}
            <div style={{ display: "flex", gap: 6 }}>
              {EXPERIENCES.map((_, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectIndex(i)}
                  style={{
                    width: i === activeIndex ? 16 : 6,
                    height: 6,
                    borderRadius: 9999,
                    backgroundColor: i === activeIndex ? "#EE6C13" : "#7b7a77",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              disabled={activeIndex === EXPERIENCES.length - 1}
              onClick={() => handleSelectIndex(activeIndex + 1)}
              style={{
                background: "transparent",
                border: "1px solid #7b7a77",
                borderRadius: 9999,
                padding: "6px 14px",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 11.5,
                color: isDark ? "#FFFDFA" : "#190b00",
                opacity: activeIndex === EXPERIENCES.length - 1 ? 0.3 : 1,
                cursor: activeIndex === EXPERIENCES.length - 1 ? "not-allowed" : "pointer",
              }}
            >
              NEXT →
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // DESKTOP VIEW (>= 768px): Viewport Locked Split Timeline Stage
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: `${contentWidth}px`,
        height: `${TOTAL_TRACK_HEIGHT}px`,
        marginBottom: 200,
        boxSizing: "border-box",
      }}
    >
      {/* Viewport-Pinned Stage Box */}
      <div
        style={{
          position: "sticky",
          top: 70,
          width: `${contentWidth}px`,
          height: `${STAGE_HEIGHT}px`,
          backgroundColor: isDark ? "#190b00" : "#FFFDFA",
          color: isDark ? "#FFFDFA" : "#190b00",
          border: "1px solid #7b7a77",
          borderRadius: 0,
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.05)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "background-color 0.8s ease, color 0.8s ease",
        }}
      >
        {/* Section Header Bar */}
        <div
          style={{
            padding: "26px 48px",
            borderBottom: "1px solid #7b7a77",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexShrink: 0,
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
                marginBottom: 6,
              }}
            >
              [ S-004 ] CAREER TIMELINE
            </span>
            <h2
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(30px, 3.2vw, 40px)",
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
            7+ YEARS EXPERIENCE
          </span>
        </div>

        {/* Split Content Body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(300px, 33%, 380px) 1fr",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* ─── LEFT COLUMN: Vertical Interactive Timeline Spine ─── */}
          <div
            style={{
              borderRight: "1px solid #7b7a77",
              padding: "32px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowY: "auto",
              background: isDark ? "rgba(25, 11, 0, 0.5)" : "rgba(255, 253, 250, 0.5)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {EXPERIENCES.map((exp, idx) => {
                const isActive = idx === activeIndex;
                const isLast = idx === EXPERIENCES.length - 1;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectIndex(idx)}
                    onMouseEnter={() => playHoverTick()}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      cursor: "pointer",
                      padding: "6px 8px",
                      borderRadius: 4,
                      opacity: isActive ? 1 : 0.45,
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                  >
                    {/* Connecting line */}
                    {!isLast && (
                      <div
                        style={{
                          position: "absolute",
                          left: 15,
                          top: 22,
                          bottom: -18,
                          width: 1,
                          backgroundColor: isDark ? "rgba(123, 122, 119, 0.4)" : "#d6cec5",
                          zIndex: 1,
                        }}
                      />
                    )}

                    {/* Timeline Node Dot */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor: isActive ? "#EE6C13" : isDark ? "#2a1b10" : "#FFFDFA",
                        border: isActive
                          ? "2.5px solid #FFFDFA"
                          : `2px solid ${isDark ? "#7b7a77" : "#8c8278"}`,
                        boxShadow: isActive ? "0 0 12px rgba(238, 108, 19, 0.75)" : "none",
                        marginTop: 2,
                        flexShrink: 0,
                        transition: "all 0.25s ease",
                      }}
                    />

                    {/* Info */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <span
                        style={{
                          fontFamily: "DM Mono, monospace",
                          fontWeight: 700,
                          fontSize: 12,
                          letterSpacing: "0.8px",
                          color: isActive ? "#EE6C13" : isDark ? "#998D80" : "#77695d",
                          textTransform: "uppercase",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {exp.yearLabel}
                      </span>
                      <h4
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontWeight: isActive ? 900 : 700,
                          fontSize: 17,
                          lineHeight: 1.25,
                          color: isActive
                            ? isDark
                              ? "#FFFDFA"
                              : "#190b00"
                            : isDark
                            ? "#8c8278"
                            : "#706e6b",
                          margin: 0,
                          transition: "color 0.25s ease",
                        }}
                      >
                        {exp.shortCompany}
                      </h4>
                      {!exp.subRoles && (
                        <span
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 500,
                            fontSize: 13.5,
                            color: isActive ? "#EE6C13" : isDark ? "#A89D91" : "#7b7a77",
                            transition: "color 0.25s ease",
                          }}
                        >
                          {exp.role}
                        </span>
                      )}

                      {/* Hierarchical Child Roles (Pansophic -> Allyra.ai & Vrozart) */}
                      {exp.subRoles && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            marginTop: 8,
                            marginLeft: 2,
                            paddingLeft: 10,
                            borderLeft: `1.5px dashed ${isActive ? "rgba(238, 108, 19, 0.45)" : "rgba(123, 122, 119, 0.3)"}`,
                          }}
                        >
                          {exp.subRoles.map((sub, sIdx) => {
                            const isSubActive = isActive && sIdx === activeSubRoleIndex;
                            return (
                              <div
                                key={sub.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playClickSound();
                                  handleSelectIndex(idx);
                                  setActiveSubRoleIndex(sIdx);
                                }}
                                onMouseEnter={() => playHoverTick()}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  cursor: "pointer",
                                  padding: "3px 6px",
                                  borderRadius: 2,
                                  backgroundColor: isSubActive
                                    ? isDark
                                      ? "rgba(238, 108, 19, 0.16)"
                                      : "rgba(238, 108, 19, 0.08)"
                                    : "transparent",
                                  border: isSubActive
                                    ? "1px solid rgba(238, 108, 19, 0.4)"
                                    : "1px solid transparent",
                                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                }}
                              >
                                <div
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    backgroundColor: isSubActive ? "#EE6C13" : isDark ? "#7b7a77" : "#a89d91",
                                    boxShadow: isSubActive ? "0 0 6px rgba(238, 108, 19, 0.7)" : "none",
                                    flexShrink: 0,
                                  }}
                                />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                  <span
                                    style={{
                                      fontFamily: "Inter, sans-serif",
                                      fontWeight: 700,
                                      fontSize: 11,
                                      color: isSubActive ? "#EE6C13" : isDark ? "#A89D91" : "#5a5047",
                                      letterSpacing: "0.3px",
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    {sub.shortRole} · {sub.yearLabel}
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: "Outfit, sans-serif",
                                      fontSize: 12.5,
                                      color: isSubActive
                                        ? isDark
                                          ? "#FFFDFA"
                                          : "#190b00"
                                        : isDark
                                        ? "#7b7a77"
                                        : "#8c8278",
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    {sIdx === 0 ? "Allyra.ai" : "Vrozart Dackson"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator hint at bottom of left spine */}
            <div
              style={{
                paddingTop: 16,
                marginTop: 20,
                borderTop: "1px solid rgba(123, 122, 119, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: 10.5,
                  color: isDark ? "#8c8278" : "#77695d",
                  letterSpacing: "0.5px",
                }}
              >
                SCROLL OR CLICK TO SCRUB TIMELINE ↓
              </span>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Active Role Dossier Stage ─── */}
          <div
            style={{
              padding: "30px 48px 20px 48px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxSizing: "border-box",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Top Dossier Header Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    color: "#EE6C13",
                  }}
                >
                  [ MILESTONE 0{activeIndex + 1} / 0{EXPERIENCES.length} ]
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 12.5,
                    color: isDark ? "#998D80" : "#77695d",
                    letterSpacing: "0.5px",
                  }}
                >
                  {currentExp.period}
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => handleSelectIndex(activeIndex - 1)}
                  style={{
                    background: "transparent",
                    border: "1px solid #7b7a77",
                    borderRadius: 9999,
                    padding: "6px 18px",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: "0.5px",
                    color: isDark ? "#FFFDFA" : "#190b00",
                    opacity: activeIndex === 0 ? 0.25 : 1,
                    cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                  className="timeline-nav-btn"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  disabled={activeIndex === EXPERIENCES.length - 1}
                  onClick={() => handleSelectIndex(activeIndex + 1)}
                  style={{
                    background: "transparent",
                    border: "1px solid #7b7a77",
                    borderRadius: 9999,
                    padding: "6px 18px",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: "0.5px",
                    color: isDark ? "#FFFDFA" : "#190b00",
                    opacity: activeIndex === EXPERIENCES.length - 1 ? 0.25 : 1,
                    cursor: activeIndex === EXPERIENCES.length - 1 ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                  className="timeline-nav-btn"
                >
                  NEXT →
                </button>
              </div>
            </div>

            {/* Dossier Content Card */}
            <div
              className="timeline-content-scroll"
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: 14,
                paddingBottom: 28,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeIndex}-${activeSubRoleIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Company Title */}
                  <h3
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(32px, 3.2vw, 40px)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      color: isDark ? "#FFFDFA" : "#190b00",
                      margin: "0 0 14px 0",
                    }}
                  >
                    {currentExp.company}
                  </h3>

                  {/* Sub-Role Switcher: Architectural Brutalist Segmented Control */}
                  {hasSubRoles && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: 3,
                        backgroundColor: isDark ? "rgba(255, 253, 250, 0.04)" : "#efe8de",
                        border: `1px solid ${isDark ? "#7b7a77" : "#8c8278"}`,
                        borderRadius: 0,
                        gap: 4,
                        marginBottom: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      {currentExp.subRoles!.map((sub, sIdx) => {
                        const isSubSelected = sIdx === activeSubRoleIndex;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setActiveSubRoleIndex(sIdx);
                            }}
                            onMouseEnter={() => playHoverTick()}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "8px 18px",
                              borderRadius: 0,
                              border: isSubSelected
                                ? "1px solid #EE6C13"
                                : "1px solid transparent",
                              backgroundColor: isSubSelected
                                ? "#EE6C13"
                                : "transparent",
                              color: isSubSelected
                                ? "#FFFDFA"
                                : isDark
                                ? "#C9C1B7"
                                : "#5a5047",
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 800,
                              fontSize: 11.5,
                              letterSpacing: "0.5px",
                              textTransform: "uppercase",
                              cursor: "pointer",
                              transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                              boxShadow: isSubSelected
                                ? "0 2px 10px rgba(238, 108, 19, 0.35)"
                                : "none",
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor: isSubSelected ? "#FFFDFA" : isDark ? "#7b7a77" : "#8c8278",
                              }}
                            />
                            <span>{sub.tabLabel}</span>
                            <span
                              style={{
                                fontFamily: "DM Mono, monospace",
                                fontSize: 10.5,
                                opacity: isSubSelected ? 0.95 : 0.6,
                                fontWeight: 500,
                                letterSpacing: "0.3px",
                              }}
                            >
                              ({sub.yearLabel})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Role & Context Subnote */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                    <span
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontWeight: 800,
                        fontSize: 23,
                        color: "#EE6C13",
                      }}
                    >
                      {displayRole}
                    </span>
                    {hasSubRoles && (
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: 13,
                          color: isDark ? "#998D80" : "#77695d",
                          letterSpacing: "0.4px",
                        }}
                      >
                        · {displayPeriod}
                      </span>
                    )}
                    {displaySubnote && (
                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontStyle: "italic",
                          fontSize: 14.5,
                          color: isDark ? "#998D80" : "#77695d",
                        }}
                      >
                        {displaySubnote}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                    {displayTags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: 11.5,
                          color: "#EE6C13",
                          background: isDark ? "rgba(238, 108, 19, 0.08)" : "rgba(238, 108, 19, 0.06)",
                          border: "1px solid rgba(238, 108, 19, 0.3)",
                          padding: "5px 13px",
                          borderRadius: 20,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Key Deliverables & Outcomes */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {displayPoints.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span
                          style={{
                            color: "#EE6C13",
                            fontSize: 12,
                            lineHeight: 1.6,
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        >
                          ◆
                        </span>
                        <p
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            fontSize: 17,
                            lineHeight: 1.6,
                            color: isDark ? "#C9C1B7" : "#4A4238",
                            margin: 0,
                          }}
                        >
                          {pt}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Progress Bar */}
            <div
              style={{
                flexShrink: 0,
                marginTop: 12,
                paddingTop: 12,
                borderTop: "1px solid #7b7a77",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  height: 3,
                  width: "100%",
                  backgroundColor: isDark ? "rgba(123, 122, 119, 0.25)" : "#e5ddd4",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${((activeIndex + 1) / EXPERIENCES.length) * 100}%`,
                    backgroundColor: "#EE6C13",
                    transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "DM Mono, monospace",
                  fontSize: 10,
                  color: isDark ? "#8c8278" : "#77695d",
                }}
              >
                <span>2024 – PRESENT</span>
                <span>CHRONOLOGICAL MILESTONE TRACK</span>
                <span>2019 TCS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
