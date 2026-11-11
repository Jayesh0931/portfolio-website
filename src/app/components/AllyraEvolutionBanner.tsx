import React, { useState } from "react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";
import imgEvolutionComposite from "@/imports/allyra_evolution_composite.webp";
import imgNxt01 from "@/imports/nxt01.webp";

interface AllyraEvolutionBannerProps {
  onNavigate?: () => void;
  style?: React.CSSProperties;
  className?: string;
  isMobile?: boolean;
}

export default function AllyraEvolutionBanner({
  onNavigate,
  style,
  className = "",
  isMobile = false,
}: AllyraEvolutionBannerProps) {
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

  // ─── MOBILE VIEW (Stacked: Headline & CTA first, Visual below) ───
  if (isMobile) {
    return (
      <section
        className="mobile-section"
        id="mobile-allyra-evolution"
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
          className="relative overflow-hidden rounded-none border border-[#7b7a77]/60 p-[22px] text-left cursor-pointer transition-all duration-300 active:scale-[0.99]"
          style={{
            background:
              "radial-gradient(110% 120% at 85% 15%, rgba(238, 108, 19, 0.28) 0%, rgba(30, 11, 2, 0.95) 45%, #0e0400 100%)",
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
              RECENT WORK · PORTAL NXT
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-['Outfit:Bold',sans-serif] font-extrabold text-[#FFFDFA] text-[24px] leading-[1.18] tracking-[-0.015em] mb-[10px] relative z-10">
            Beyond the launch.
            <br />
            <span className="text-[#FFFDFA]">Into the agentic era.</span>
          </h2>

          {/* Concise Description */}
          <p className="font-['Outfit:Regular',sans-serif] font-normal text-[#cfc5bb] text-[13.5px] leading-[1.45] mb-[18px] relative z-10">
            The next evolution of Allyra — where AI understands goals, orchestrates work and delivers outcomes.
          </p>

          {/* CTA Row */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 mb-[18px]">
            <div className="inline-flex items-center gap-[8px] h-[36px] px-[18px] rounded-[110px] bg-[#EE6C13] text-[#FFFDFA] font-['Outfit:Bold',sans-serif] font-bold text-[12.5px] uppercase tracking-[0.3px] shadow-sm">
              <span>Take a look</span>
              <svg className="size-[12px]" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 2.5L10.5 7.5L5 12.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Product Visual */}
          <div className="relative w-full h-[170px] rounded-none overflow-hidden border border-white/15 bg-[#0a0300] shadow-md relative z-10">
            <img
              src={imgEvolutionComposite}
              alt="Allyra Agentic Experience Preview"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-left-top opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
    );
  }

  // ─── DESKTOP VIEW (Refined Two-Column Composition) ───
  return (
    <div
      style={{
        width: 1280,
        height: 270,
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
        aria-label="Beyond the launch. Into the agentic era."
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        className="group relative size-full overflow-hidden rounded-none border border-[#7b7a77]/50 p-[30px] text-left cursor-pointer transition-all duration-300"
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
          className="absolute right-[40px] top-[10px] w-[420px] h-[240px] rounded-full pointer-events-none opacity-40 blur-[75px] transition-opacity duration-500"
          style={{ background: "#EE6C13" }}
          aria-hidden="true"
        />

        {/* ─── TWO-COLUMN BALANCED COMPOSITION ─── */}
        <div className="relative z-10 flex items-center justify-between size-full gap-8">
          
          {/* ── LEFT COLUMN (52–54%): Typography, Description, CTA & Metadata ── */}
          <div className="flex flex-col justify-between h-full max-w-[620px] shrink-0 py-0.5">
            <div>
              {/* Eyebrow Label */}
              <div className="flex items-center gap-[8px] mb-[12px]">
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[11px] tracking-[0.8px] uppercase text-[#EE6C13]">
                  RECENT WORK · PORTAL NXT
                </span>
              </div>

              {/* Expressive Headline */}
              <h2 className="font-['Outfit:Bold',sans-serif] font-extrabold text-[#FFFDFA] text-[33px] leading-[1.12] tracking-[-0.02em] mb-[10px]">
                Beyond the launch.
                <br />
                <span className="text-[#FFFDFA]">Into the agentic era.</span>
              </h2>

              {/* Concise Supporting Sentence */}
              <p className="font-['Outfit:Regular',sans-serif] font-normal text-[#cfc5bb] text-[15px] leading-[1.45] max-w-[530px] m-0">
                The next evolution of Allyra — where AI understands goals, orchestrates work and delivers outcomes.
              </p>
            </div>

            {/* Compact CTA & Supporting Metadata Row */}
            <div className="flex items-center gap-[22px] pt-[10px]">
              {/* Compact CTA Button */}
              <div
                className="inline-flex items-center gap-[9px] h-[38px] px-[20px] rounded-[110px] bg-[#EE6C13] text-[#FFFDFA] font-['Outfit:Bold',sans-serif] font-bold text-[13px] tracking-[0.3px] uppercase transition-all duration-200 group-hover:bg-[#FFFDFA] group-hover:text-[#190b00] group-hover:shadow-md shrink-0"
              >
                <span>Take a look</span>
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
            </div>
          </div>

          {/* ── RIGHT COLUMN (46–48%): High-Impact Layered Product Showcase ── */}
          <div className="relative flex-1 h-[215px] flex items-center justify-end">
            
            {/* Primary Product Screenshot Window */}
            <div className="relative w-[520px] h-[210px] rounded-none overflow-hidden border border-white/15 bg-[#0a0300] shadow-[0_16px_40px_rgba(0,0,0,0.6)] group-hover:border-[#EE6C13]/50 transition-all duration-400">
              <img
                src={imgEvolutionComposite}
                alt="Allyra Agentic Platform Interface"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-left-top opacity-95 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              {/* Subtle bottom gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle Layered Floating UI Preview (Connector Governance Card) */}
            <div 
              className="absolute -bottom-[8px] left-[15px] w-[185px] h-[105px] rounded-none overflow-hidden border border-white/20 bg-[#0d0400] shadow-[0_18px_36px_rgba(0,0,0,0.7)] z-20 transition-transform duration-400 group-hover:-translate-y-1 group-hover:border-[#EE6C13]/60"
            >
              <img
                src={imgNxt01}
                alt="Agent Builder & Orchestration Preview"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              
              {/* Floating micro-badge */}
              <div className="absolute bottom-[6px] left-[8px] flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#EE6C13] animate-pulse" />
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[9px] uppercase tracking-[0.5px] text-[#FFFDFA]">
                  Live Orchestration
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
