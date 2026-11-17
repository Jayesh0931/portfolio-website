import React, { useState } from "react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";
import imgNxt01 from "@/imports/nxt01.webp";

interface ExperienceAgenticSearchCTAProps {
  onNavigate?: () => void;
  style?: React.CSSProperties;
  className?: string;
  isMobile?: boolean;
}

export default function ExperienceAgenticSearchCTA({
  onNavigate,
  style,
  className = "",
  isMobile = false,
}: ExperienceAgenticSearchCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    playClickSound();
    if (onNavigate) {
      onNavigate();
    } else {
      window.dispatchEvent(
        new CustomEvent("navigate-to-path", { detail: "/allyra-evolution" })
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ─── MOBILE VIEW ───
  if (isMobile) {
    return (
      <section
        className="mobile-section"
        id="mobile-experience-agentic-search"
        style={{
          padding: "20px 20px 28px 20px",
          borderBottom: "1px solid #7B7A77",
          ...style,
        }}
      >
        <div
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          className="relative overflow-hidden rounded-[14px] border border-[#7b7a77]/60 p-[22px] text-left cursor-pointer transition-all duration-300 active:scale-[0.99]"
          style={{
            background:
              "radial-gradient(110% 120% at 85% 15%, rgba(238, 108, 19, 0.32) 0%, rgba(30, 11, 2, 0.95) 45%, #0e0400 100%)",
            boxShadow:
              "0 12px 30px rgba(25, 11, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Subtle warm ambient glow */}
          <div
            className="absolute -right-[30px] -top-[30px] w-[160px] h-[160px] rounded-full pointer-events-none opacity-40 blur-[45px]"
            style={{ background: "#EE6C13" }}
            aria-hidden="true"
          />

          {/* Eyebrow */}
          <div className="flex items-center gap-[8px] mb-[10px] relative z-10">
            <span className="font-['Inter:Bold',sans-serif] font-bold text-[10.5px] tracking-[0.8px] uppercase text-[#EE6C13]">
              [ DEEP DIVE · AGENTIC SEARCH &amp; SYSTEMS ]
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-['Outfit:Bold',sans-serif] font-extrabold text-[#FFFDFA] text-[26px] leading-[1.15] tracking-[-0.015em] mb-[10px] relative z-10">
            Experience Agentic Search.
          </h2>

          {/* Description */}
          <p className="font-['Outfit:Regular',sans-serif] font-normal text-[#cfc5bb] text-[13.5px] leading-[1.45] mb-[18px] relative z-10">
            Explore how multi-agent DAG task decomposition, living deliverables, and human-in-the-loop steering gates replace passive chat with verifiable outcomes.
          </p>

          {/* CTA Row */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 mb-[18px]">
            <div className="inline-flex items-center gap-[8px] h-[38px] px-[20px] rounded-[110px] bg-[#EE6C13] text-[#FFFDFA] font-['Outfit:Bold',sans-serif] font-bold text-[12.5px] uppercase tracking-[0.3px] shadow-sm">
              <span>Explore Agentic Search</span>
              <svg className="size-[12px]" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 2.5L10.5 7.5L5 12.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Product Visual */}
          <div className="relative w-full h-[180px] rounded-[10px] overflow-hidden border border-white/15 bg-[#0a0300] shadow-md relative z-10">
            <img
              src={imgNxt01}
              alt="Agentic Search DAG task decomposition and execution workflow"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-left-top opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-[8px] left-[10px] flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#EE6C13] animate-pulse" />
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[9px] uppercase tracking-[0.5px] text-[#FFFDFA]">
                Multi-Agent Execution Pipeline
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── DESKTOP VIEW ───
  return (
    <div
      style={{
        width: 1280,
        height: 250,
        boxSizing: "border-box",
        ...style,
      }}
      className={`relative select-none ${className}`}
    >
      <div
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          playHoverTick();
        }}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Experience Agentic Search: Deep Dive into Multi-Agent Execution Graphs"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className="group relative size-full overflow-hidden rounded-[14px] border border-[#7b7a77]/50 p-[28px] text-left cursor-pointer transition-all duration-300"
        style={{
          background:
            "radial-gradient(110% 140% at 85% 30%, rgba(238, 108, 19, 0.28) 0%, rgba(24, 9, 2, 0.94) 45%, #0e0400 95%)",
          borderColor: isHovered ? "#EE6C13" : "rgba(123, 122, 119, 0.5)",
          boxShadow: isHovered
            ? "0 20px 48px rgba(25, 11, 0, 0.45), 0 0 32px rgba(238, 108, 19, 0.2)"
            : "0 10px 30px rgba(25, 11, 0, 0.24)",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {/* Subtle warm amber ambient glow behind product visual */}
        <div
          className="absolute right-[40px] top-[10px] w-[420px] h-[220px] rounded-full pointer-events-none opacity-40 blur-[75px] transition-opacity duration-500"
          style={{ background: "#EE6C13" }}
          aria-hidden="true"
        />

        {/* ─── TWO-COLUMN BALANCED COMPOSITION ─── */}
        <div className="relative z-10 flex items-center justify-between size-full gap-8">
          
          {/* ── LEFT COLUMN (54%): Typography, Description & CTA ── */}
          <div className="flex flex-col justify-between h-full max-w-[640px] shrink-0 py-0.5">
            <div>
              {/* Eyebrow Label */}
              <div className="flex items-center gap-[8px] mb-[10px]">
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[11px] tracking-[0.8px] uppercase text-[#EE6C13]">
                  [ DEEP DIVE · AGENTIC SEARCH &amp; SYSTEMS ]
                </span>
                <span className="text-[#7b7a77] text-[11px]">•</span>
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[11px] tracking-[0.8px] uppercase text-[#cfc5bb]">
                  PORTAL NXT
                </span>
              </div>

              {/* Expressive Headline */}
              <h2 className="font-['Outfit:Bold',sans-serif] font-extrabold text-[#FFFDFA] text-[34px] leading-[1.1] tracking-[-0.02em] mb-[10px]">
                Experience Agentic Search.
              </h2>

              {/* Concise Supporting Sentence */}
              <p className="font-['Outfit:Regular',sans-serif] font-normal text-[#cfc5bb] text-[15px] leading-[1.45] max-w-[550px] m-0">
                Explore how multi-agent DAG task decomposition, living deliverables, and human-in-the-loop steering gates replace passive chat with verifiable outcomes.
              </p>
            </div>

            {/* Compact CTA Row */}
            <div className="flex items-center gap-[20px] pt-[8px]">
              <div
                className="inline-flex items-center gap-[9px] h-[38px] px-[22px] rounded-[110px] bg-[#EE6C13] text-[#FFFDFA] font-['Outfit:Bold',sans-serif] font-bold text-[13px] tracking-[0.3px] uppercase transition-all duration-200 group-hover:bg-[#FFFDFA] group-hover:text-[#190b00] group-hover:shadow-md shrink-0"
              >
                <span>Explore Agentic Search</span>
                <svg
                  className="size-[13px] transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 15 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 2.5L10.5 7.5L5 12.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="font-['Inter:Regular',sans-serif] text-[12px] text-[#998D80] tracking-[0.2px]">
                Recent Case Study · 2026
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN (46%): High-Impact Product Preview ── */}
          <div className="relative flex-1 h-[195px] flex items-center justify-end">
            <div className="relative w-[500px] h-[190px] rounded-[10px] overflow-hidden border border-white/15 bg-[#0a0300] shadow-[0_16px_40px_rgba(0,0,0,0.6)] group-hover:border-[#EE6C13]/50 transition-all duration-400">
              <img
                src={imgNxt01}
                alt="Agentic Search DAG Task Decomposition"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-left-top opacity-95 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating micro-badge */}
              <div className="absolute bottom-[10px] left-[12px] flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                <span className="size-1.5 rounded-full bg-[#EE6C13] animate-pulse" />
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[9.5px] uppercase tracking-[0.5px] text-[#FFFDFA]">
                  Live Orchestration Pipeline
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
