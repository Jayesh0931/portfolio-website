import React, { useEffect, useRef, useState } from "react";
import BrandVector from "@/components/BrandVector";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import vidNxt01 from "@/imports/nxt01.mp4";
import vidNxt02 from "@/imports/nxt02.mp4";
import vidNxt03 from "@/imports/nxt03.mp4";
import vidNxt04 from "@/imports/nxt04.mp4";
import imgNxt01 from "@/imports/nxt01.webp";
import imgNxt02 from "@/imports/nxt02.webp";
import imgNxt03 from "@/imports/nxt03.webp";
import imgNxt04 from "@/imports/nxt04.webp";
import imgAllyraLogo from "@/imports/allyra_logo.webp";

interface AllyraEvolutionStoryPageProps {
  scale?: number;
  left?: number;
  onBack: () => void;
  onNextStory?: () => void;
}

function ArticleVideo({
  src,
  poster,
  alt,
  caption,
}: {
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
}) {
  const isPdf = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("pdf");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(isPdf);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPdf) return;
    const video = videoRef.current;
    if (!video) return;

    // Respect OS-level reduced motion accessibility preference
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isPdf]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleOpenFullscreen = () => {
    window.dispatchEvent(new CustomEvent("open-full-screen-video", { detail: { src } }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenFullscreen();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2.5 my-5 md:my-6">
      {/* Video Framing Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpenFullscreen}
        onKeyDown={handleKeyDown}
        data-custom-cursor="full-screen"
        aria-label={`Open ${caption || alt} in full-screen modal`}
        className="group relative w-full rounded-[10px] overflow-hidden border border-[#7b7a77] bg-[#140801] shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#ee6c13]/70 focus:outline-none focus:ring-2 focus:ring-[#ee6c13] focus:ring-offset-2 select-none"
        style={{ aspectRatio: "3456 / 1924" }}
      >
        {/* Ambient warm glow behind video */}
        <div
          className="absolute inset-0 bg-[#ee6c13] opacity-15 blur-[45px] pointer-events-none"
          aria-hidden="true"
        />

        {!isLoaded && (
          <div
            className="absolute inset-0 skeleton-shimmer z-10"
            aria-label="Loading video preview..."
          />
        )}

        {isPdf && poster ? (
          <img
            src={poster}
            alt={alt}
            className="w-full h-full object-contain block relative z-1"
          />
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={alt}
            title={alt}
            onLoadedData={() => setIsLoaded(true)}
            className={`w-full h-full object-contain block relative z-1 transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Floating Controls Overlay: Persistent on touch / mobile devices, hover on desktop */}
        {!isPdf && (
          <div className="absolute bottom-2.5 right-2.5 md:bottom-3 md:right-3 z-20 flex items-center gap-1.5 md:gap-2 opacity-95 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="h-7 md:h-8 px-2.5 md:px-3 rounded-full bg-black/80 hover:bg-black text-[#FFFDFA] border border-white/20 text-[10.5px] md:text-[11px] font-inter font-semibold uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenFullscreen();
              }}
              aria-label="Expand video to full screen"
              className="h-7 md:h-8 px-2.5 md:px-3 rounded-full bg-[#ee6c13] hover:bg-[#d95a08] text-[#FFFDFA] text-[10.5px] md:text-[11px] font-inter font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              <span>Full Screen</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile-Only Accessible "Tap to View Full Screen" Action Link */}
      <div className="flex md:hidden items-center justify-between pt-1">
        <button
          type="button"
          onClick={handleOpenFullscreen}
          className="inline-flex items-center gap-1.5 text-[#EE6C13] active:text-[#d95a08] font-inter font-bold text-[11.5px] uppercase tracking-[0.5px] py-1 cursor-pointer"
          aria-label={`Tap to view ${caption || alt} in full screen`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          <span>Tap to expand full screen</span>
        </button>
      </div>

      {caption && (
        <p className="font-inter font-bold text-[10.5px] md:text-[11px] tracking-[0.6px] uppercase text-[#77695d] text-center m-0">
          {caption}
        </p>
      )}
    </div>
  );
}

function ArticleImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const isPdf = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("pdf");
  const [isLoaded, setIsLoaded] = useState(isPdf);

  return (
    <div className="w-full flex flex-col gap-3 my-6">
      <div
        className="relative w-full rounded-[10px] overflow-hidden border border-[#7b7a77] bg-[#f7f4ee] p-4 flex items-center justify-center shadow-lg"
        style={{ minHeight: "420px" }}
      >
        {!isLoaded && <div className="absolute inset-0 skeleton-shimmer z-10" />}
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`max-w-full max-h-[580px] w-auto h-auto object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
            }`}
        />
      </div>
      {caption && (
        <p className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#77695d] text-center m-0">
          {caption}
        </p>
      )}
    </div>
  );
}

export default function AllyraEvolutionStoryPage({
  scale = 1,
  left = 0,
  onBack,
  onNextStory,
}: AllyraEvolutionStoryPageProps) {
  const isPdf = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("pdf");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 768 : false));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <article
      role="article"
      className="w-full min-h-screen bg-[#FFFDFA] text-[#190b00] select-text relative overflow-x-hidden font-outfit"
    >
      {/* ─── STICKY HEADER NAVIGATION BAR ─── */}
      {/* Desktop fixed navbar */}
      {!isMobile && (
        <header
          role="banner"
          style={{
            position: isPdf ? "absolute" : "fixed",
            top: 0,
            left: `${left}px`,
            width: "1440px",
            height: "100px",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            pointerEvents: "none",
            zIndex: 999,
          }}
        >
          {/* Back Pill Button */}
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Homepage"
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            className="hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[90px] px-[16px] py-[6px] rounded-[110px] top-[33px] z-10 shadow-sm transition-all duration-200 group"
          >
            <div className="flex h-[11px] items-center justify-center relative shrink-0 w-[11px]">
              <svg className="size-full" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 12.5L4.5 7.5L10 2.5"
                  className="stroke-[#190B00] group-hover:stroke-[#FFFDFA] transition-colors duration-200"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-outfit font-black leading-[normal] text-[#190b00] group-hover:text-[#fffdfa] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200">
              Back
            </span>
          </button>

          {/* Right Brand Vector Pill */}
          <div
            onClick={onBack}
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            className="absolute bg-[#fffdfa] border border-[#7b7a77] rounded-[110px] flex items-center justify-center left-[1292px] top-[33px] w-[58px] h-[40px] z-10 shadow-sm hover:border-[#190b00] transition-colors"
          >
            <BrandVector theme="dark" width={48} height={32} />
          </div>
        </header>
      )}

      {/* Mobile Nav Header */}
      {isMobile && (
        <header className="mobile-story-nav-header">
          <button
            type="button"
            onClick={onBack}
            className="mobile-story-back-pill"
            aria-label="Back to home"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>BACK</span>
          </button>

          <div onClick={onBack} style={{ cursor: "pointer" }} role="button" aria-label="Back to home">
            <BrandVector theme="dark" width={48} height={32} />
          </div>
        </header>
      )}

      {/* ─── MAIN EDITORIAL ARTICLE CONTAINER ─── */}
      <main
        className="w-full mx-auto"
        style={{
          maxWidth: isMobile ? "100%" : "1020px",
          paddingLeft: isMobile ? "16px" : "40px",
          paddingRight: isMobile ? "16px" : "40px",
          paddingTop: isMobile ? "0px" : "130px",
          paddingBottom: "80px",
        }}
      >
        {/* ── 1. ARTICLE LEAD HEADER (Blog / Changelog / Design Update Style) ── */}
        <section className="border-b border-[#7b7a77] pb-10 mb-12">
          {/* Micro Category Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-inter font-bold text-[11px] tracking-[0.8px] uppercase text-[#ee6c13] bg-[#ee6c13]/10 px-2.5 py-1 rounded">
              AGENTIC SEARCH
            </span>
            <span className="text-[#7b7a77] text-[12px]">•</span>
            <span className="font-inter font-bold text-[11px] tracking-[0.8px] uppercase text-[#77695d]">
              PORTAL NXT · AGENTIC ENGINE
            </span>
            <span className="text-[#7b7a77] text-[12px]">•</span>
            <span className="font-inter font-bold text-[11px] tracking-[0.8px] uppercase text-[#77695d]">
              OCTOBER 2026
            </span>
          </div>

          {/* Article Main Headline */}
          <h1
            className="font-outfit font-black tracking-[-0.5px] text-[#190b00] leading-[1.08] mb-6"
            style={{ fontSize: isMobile ? "36px" : "56px" }}
          >
            Beyond the Search Box: The Evolution of Allyra's Agentic Search Experience
          </h1>

          {/* Article Subtitle / Deck */}
          <p
            className="font-outfit font-normal text-[#77695d] leading-[1.5] mb-8"
            style={{ fontSize: isMobile ? "19px" : "24px" }}
          >
            The product didn't stop evolving at launch. Here's what I've been shaping next — agentic search interaction models, intent formulation, and architectural decisions that transform simple query boxes into autonomous execution pipelines.
          </p>

          {/* Metadata pill & branding strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded bg-[#f7f4ee] border border-[#7b7a77]/40">
            <div className="flex items-center gap-3">
              <img
                src={imgAllyraLogo}
                alt="Allyra Logo"
                className="size-8 object-contain"
              />
              <div>
                <p className="font-inter font-bold text-[12px] text-[#190b00] tracking-[0.4px] m-0">
                  Jayesh Soni
                </p>
                <p className="font-inter font-normal text-[11px] text-[#77695d] m-0">
                  Product Lead
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[12px] font-inter text-[#77695d]">
              <span><strong>Domain:</strong> Agentic Search &amp; Enterprise AI</span>
              <span>•</span>
              <span><strong>Focus:</strong> Recent Capabilities</span>
            </div>
          </div>
        </section>

        {/* ── 2. INTRODUCTORY ESSAY / WHY THIS MATTERS ── */}
        <section className="mb-16">
          <p
            className="font-outfit font-normal text-[#190b00] leading-[1.6] mb-5"
            style={{ fontSize: isMobile ? "18px" : "21px" }}
          >
            After releasing the first enterprise edition of Allyra, we saw a critical pattern unfold across our enterprise pilots: <strong>knowledge workers don't need another chatbot that speaks in confident paragraphs while hallucinating citations.</strong>
          </p>
          <p
            className="font-outfit font-normal text-[#77695d] leading-[1.6] mb-8"
            style={{ fontSize: isMobile ? "16px" : "18px" }}
          >
            Real work requires deterministic outcomes. When someone asks an AI system to evaluate candidates, configure compliance checks, or plan an enterprise project, they need an agent that decomposes intent, retrieves verifiable evidence, renders structured deliverables, and pauses for steering when the stakes are high.
          </p>

          <div className="border-l-4 border-[#ee6c13] bg-[#ee6c13]/5 p-5 rounded-r">
            <p className="font-outfit italic font-medium text-[18px] text-[#190b00] leading-[1.4] m-0">
              "We didn't set out to make AI sound smarter. We set out to make AI more verifiable, collaborative, and actionable."
            </p>
          </div>
        </section>

        {/* ── 3. THE 4 RECENT CAPABILITIES (Core feature deep-dives) ── */}
        <div className="flex flex-col gap-20">

          {/* ── FEATURE 01: Multi-Step Workflows (From Intent to Outcomes) ── */}
          <section className="border border-[#7b7a77] bg-[#fffdfa] p-4 sm:p-6 md:p-10 shadow-sm relative">
            {/* Header / Number Badge */}
            <div className="flex items-center justify-between border-b border-[#7b7a77]/30 pb-4 mb-6">
              <span className="font-inter font-bold text-[12px] tracking-[0.8px] uppercase text-[#ee6c13]">
                [ 01 · AGENTIC SEARCH &amp; TASK DECOMPOSITION ]
              </span>
              <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#77695d]">
                DAG TASK DECOMPOSITION
              </span>
            </div>

            <h2
              className="font-outfit font-bold text-[#190b00] leading-[1.15] mb-3"
              style={{ fontSize: isMobile ? "26px" : "34px" }}
            >
              From Search Query to Multi-Agent Execution
            </h2>
            <p className="font-outfit text-[#77695d] text-[18px] leading-[1.4] mb-6 font-normal">
              Transforming ambiguous enterprise search intent into an observable, inspectable multi-agent execution pipeline.
            </p>

            {/* Video Showcase */}
            <ArticleVideo
              src={vidNxt01}
              poster={imgNxt01}
              alt="Multi-agent DAG task decomposition and execution workflow"
              caption="[ FIG. 01 — MULTI-AGENT EXECUTION GRAPH & PROGRESSION BOARD ]"
            />

            {/* Design Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#7b7a77]/30">
              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  The Challenge
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Single-turn search engines force users to manually chain queries and paste intermediate findings between different windows.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  Interaction Model
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Dynamic DAG decomposition. The engine breaks high-level goals into specialized agents (JD drafting, screening, scheduling) with visible dependencies.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  The Outcome
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Users see the entire plan before execution starts. Ambiguous goals become verifiable, repeatable operational workflows.
                </p>
              </div>
            </div>
          </section>

          {/* ── FEATURE 02: Transparent, Defensible Truth ── */}
          <section className="border border-[#7b7a77] bg-[#fffdfa] p-4 sm:p-6 md:p-10 shadow-sm relative">
            <div className="flex items-center justify-between border-b border-[#7b7a77]/30 pb-4 mb-6">
              <span className="font-inter font-bold text-[12px] tracking-[0.8px] uppercase text-[#ee6c13]">
                [ 02 · ENTERPRISE PROVENANCE ]
              </span>
              <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#77695d]">
                CONNECTOR-LEVEL CITATIONS
              </span>
            </div>

            <h2
              className="font-outfit font-bold text-[#190b00] leading-[1.15] mb-3"
              style={{ fontSize: isMobile ? "26px" : "34px" }}
            >
              Transparent, Defensible Responses
            </h2>
            <p className="font-outfit text-[#77695d] text-[18px] leading-[1.4] mb-6 font-normal">
              Eliminating generative hallucinations through zero-trust attribution and real-time permission mapping.
            </p>

            {/* Video Showcase */}
            <ArticleVideo
              src={vidNxt02}
              poster={imgNxt02}
              alt="Governance and verified enterprise connectors"
              caption="[ FIG. 02 — ENTERPRISE ACCESS TIERS, PERMISSIONS & CITATION GOVERNANCE ]"
            />

            {/* Design Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#7b7a77]/30">
              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  The Challenge
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Enterprise stakeholders reject generative assertions without auditability. A single ungrounded statement breaks user trust completely.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  Interaction Model
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Connector-level provenance. Every assertion indexes back to exact origin files, timestamped records, and active organizational permissions.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  The Outcome
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  One-click verification. Users confirm source grounding and compliance before executing mission-critical decisions.
                </p>
              </div>
            </div>
          </section>

          {/* ── FEATURE 03: Structured, Contextual Outputs ── */}
          <section className="border border-[#7b7a77] bg-[#fffdfa] p-4 sm:p-6 md:p-10 shadow-sm relative">
            <div className="flex items-center justify-between border-b border-[#7b7a77]/30 pb-4 mb-6">
              <span className="font-inter font-bold text-[12px] tracking-[0.8px] uppercase text-[#ee6c13]">
                [ 03 · GENERATIVE WORKSPACES ]
              </span>
              <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#77695d]">
                LIVING DELIVERABLES
              </span>
            </div>

            <h2
              className="font-outfit font-bold text-[#190b00] leading-[1.15] mb-3"
              style={{ fontSize: isMobile ? "26px" : "34px" }}
            >
              Structured, Contextual Outputs
            </h2>
            <p className="font-outfit text-[#77695d] text-[18px] leading-[1.4] mb-6 font-normal">
              Replacing dead-end chat prose with live action blocks, sortable data grids, and workspace deliverables.
            </p>

            {/* Video Showcase */}
            <ArticleVideo
              src={vidNxt03}
              poster={imgNxt03}
              alt="Portal workspace deliverables and Kanban action grids"
              caption="[ FIG. 03 — PORTAL WORKSPACE DELIVERABLES & INTERACTIVE ACTION BOARDS ]"
            />

            {/* Design Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#7b7a77]/30">
              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  The Challenge
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Chat streams generate passive paragraphs that cannot be edited, filtered, or handed off without tedious manual formatting.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  Interaction Model
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Generative UI workspaces. Query outputs render dynamically as interactive tables, status boards, and live action components.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  The Outcome
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Living deliverables. Users take direct action inside the result without copying and pasting into external tools.
                </p>
              </div>
            </div>
          </section>

          {/* ── FEATURE 04: Human-in-the-Loop Decisions ── */}
          <section className="border border-[#7b7a77] bg-[#fffdfa] p-4 sm:p-6 md:p-10 shadow-sm relative">
            <div className="flex items-center justify-between border-b border-[#7b7a77]/30 pb-4 mb-6">
              <span className="font-inter font-bold text-[12px] tracking-[0.8px] uppercase text-[#ee6c13]">
                [ 04 · PROGRESSIVE AUTONOMY ]
              </span>
              <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#77695d]">
                STEERING GATES &amp; CONTROL
              </span>
            </div>

            <h2
              className="font-outfit font-bold text-[#190b00] leading-[1.15] mb-3"
              style={{ fontSize: isMobile ? "26px" : "34px" }}
            >
              Human-in-the-Loop Decisions
            </h2>
            <p className="font-outfit text-[#77695d] text-[18px] leading-[1.4] mb-6 font-normal">
              Balancing machine speed with human discretion through active review gates and parameter steering.
            </p>

            {/* Video Showcase */}
            <ArticleVideo
              src={vidNxt04}
              poster={imgNxt04}
              alt="Human-in-the-loop active steering gates and review controls"
              caption="[ FIG. 04 — HUMAN-IN-THE-LOOP SLIDE GENERATION & ACTIVE STEERING GATES ]"
            />

            {/* Design Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#7b7a77]/30">
              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  The Challenge
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Unsupervised autonomy causes acute anxiety. When AI makes assumptions in silence, small misinterpretations compound into large errors.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  Interaction Model
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Steering gates. High-impact operations pause for human review, allowing users to tweak parameters, inspect citations, or re-route next steps.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase text-[#ee6c13]">
                  The Outcome
                </span>
                <p className="font-outfit text-[15px] text-[#190b00] leading-[1.5] m-0">
                  Safe speed. AI handles tedious cognitive heavy-lifting while experienced humans preserve accountability and quality control.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* ── 4. CONCLUDING TAKEAWAY CARD ── */}
        <section className="mt-20 border border-[#7b7a77] bg-[#190b00] text-[#FFFDFA] p-8 md:p-12 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#7b7a77]/40 pb-4 mb-6">
            <span className="font-inter font-bold text-[11px] tracking-[0.8px] uppercase text-[#ee6c13]">
              [ REFLECTION ]
            </span>
            <BrandVector theme="light" width={42} height={28} />
          </div>

          <h3 className="font-outfit font-bold text-[28px] md:text-[36px] text-white leading-tight mb-4">
            From Black-Box Autonomy to Verifiable Agency
          </h3>

          <p className="font-outfit text-[17px] md:text-[19px] text-[#ccc] leading-[1.6] mb-8">
            The next generation of enterprise AI won't be won by whoever has the biggest parameter model. It will be won by whoever designs the most reliable, transparent collaboration between human experts and intelligent systems. By decomposing intent, enforcing verifiable provenance, and keeping people in control, we turn AI from an interesting toy into a dependable operational partner.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#7b7a77]/30">
            {onNextStory && (
              <button
                type="button"
                onClick={onNextStory}
                className="hover:bg-[#ee6c13] hover:border-[#ee6c13] bg-[#fffdfa] text-[#190b00] hover:text-[#fffdfa] font-outfit font-bold text-[14px] uppercase tracking-[0.5px] px-6 py-3 rounded-[110px] transition-all cursor-pointer"
              >
                Read Allyra Foundational Story →
              </button>
            )}
            <button
              type="button"
              onClick={onBack}
              className="border border-[#7b7a77] text-[#FFFDFA] hover:bg-white/10 font-outfit font-medium text-[14px] uppercase tracking-[0.5px] px-6 py-3 rounded-[110px] transition-all cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        </section>
      </main>

      {/* ─── FOOTER CARD (Centered in 100vh) ─── */}
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#190b00",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ transform: `scale(${isMobile ? 1 : scale})`, transformOrigin: "center center" }}>
          <Footer />
        </div>
      </div>

      {/* ─── FLOATING SCROLL TO TOP ─── */}
      <ScrollToTopButton show={showScrollTop} onClick={scrollToTop} />
    </article>
  );
}
