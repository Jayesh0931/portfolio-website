import React, { useState } from "react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface AllyraEvolutionBannerProps {
  onNavigate?: (path: string) => void;
  style?: React.CSSProperties;
  className?: string;
  isMobile?: boolean;
}

interface MetricStoryCell {
  metric: string;
  isTextMetric?: boolean;
  label: string;
  actionText: string;
  targetPath: string;
}

export default function AllyraEvolutionBanner({
  onNavigate,
  style,
  className = "",
  isMobile = false,
}: AllyraEvolutionBannerProps) {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const handleNavigate = (path: string) => {
    playClickSound();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.dispatchEvent(
        new CustomEvent("navigate-to-path", { detail: path })
      );
      // If navigating with a hash to an already active page or new page, handle smooth scroll
      if (path.includes("#")) {
        const hash = path.substring(path.indexOf("#"));
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  };

  const metricCells: MetricStoryCell[] = [
    {
      metric: "~40%",
      label: "Fewer steps to initiate work",
      actionText: "Outcome-first experiences",
      targetPath: "/allyra-outcomes",
    },
    {
      metric: "4 → 1",
      label: "Fragmented workflows, unified",
      actionText: "Unified AI workspace",
      targetPath: "/allyra-workspace",
    },
    {
      metric: "5 stages",
      label: "Visible AI execution",
      actionText: "Making AI understandable",
      targetPath: "/allyra-observability",
    },
    {
      metric: "Human-in-loop",
      isTextMetric: true,
      label: "Oversight at critical decisions",
      actionText: "Calibrated autonomy",
      targetPath: "/allyra-autonomy",
    },
  ];

  // ─── MOBILE VIEW (Editorial Stack: Title top, 2x2 Metric Grid below) ───
  if (isMobile) {
    return (
      <section
        className="mobile-section"
        id="mobile-allyra-evolution"
        style={{
          padding: "20px",
          borderBottom: "1px solid #7B7A77",
          ...style,
        }}
      >
        <div
          className="relative overflow-hidden rounded-none border border-[#7b7a77]/50 text-left"
          style={{
            background:
              "radial-gradient(110% 140% at 85% 15%, rgba(238, 108, 19, 0.22) 0%, rgba(24, 9, 2, 0.96) 45%, #0e0400 100%)",
            boxShadow: "0 10px 28px rgba(25, 11, 0, 0.35)",
          }}
        >
          {/* Top Left Section: Title & Framing */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="size-1.5 rounded-none bg-[#EE6C13]" />
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[10px] tracking-[0.8px] uppercase text-[#EE6C13]">
                CURRENTLY SHAPING
              </span>
            </div>
            <h2 className="font-['Outfit:Bold',sans-serif] font-extrabold text-[#FFFDFA] text-[22px] leading-[1.2] tracking-[-0.015em] mb-1.5">
              Beyond Agent-Centric AI
            </h2>
            <p className="font-['Outfit:Regular',sans-serif] font-normal text-[#cfc5bb] text-[13px] leading-[1.45] mb-3.5">
              Evolving enterprise AI from managing agents to accomplishing outcomes.
            </p>
            <button
              type="button"
              onClick={() => handleNavigate("/allyra-outcomes")}
              className="inline-flex items-center gap-1.5 font-['Outfit:Bold',sans-serif] font-bold text-[11.5px] uppercase tracking-[0.5px] text-[#EE6C13] hover:underline cursor-pointer"
            >
              <span>Explore the work</span>
              <svg className="size-3" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Bottom 2x2 Metric Grid */}
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
            {metricCells.map((cell, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={() => handleNavigate(cell.targetPath)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNavigate(cell.targetPath);
                  }
                }}
                className={`p-4 flex flex-col justify-between active:bg-white/5 transition-colors cursor-pointer ${
                  idx === 0 ? "border-t-0" : ""
                } ${idx === 1 ? "border-t-0" : ""}`}
              >
                <div>
                  <div
                    className={`font-['Outfit:Black',sans-serif] font-black text-[#FFFDFA] leading-none mb-1.5 ${
                      cell.isTextMetric ? "text-[18px] leading-tight" : "text-[26px]"
                    }`}
                  >
                    {cell.metric}
                  </div>
                  <p className="font-['Outfit:Regular',sans-serif] text-[11.5px] text-[#aaa] leading-[1.3] m-0 mb-3">
                    {cell.label}
                  </p>
                </div>
                <div className="flex items-center gap-1 font-['Inter:Bold',sans-serif] font-bold text-[9.5px] uppercase tracking-[0.4px] text-[#EE6C13]">
                  <span>{cell.actionText}</span>
                  <svg className="size-2.5 shrink-0" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── DESKTOP VIEW (~200px Horizontal Editorial Featured Strip) ───
  return (
    <div
      style={{
        width: 1280,
        height: 200,
        boxSizing: "border-box",
        ...style,
      }}
      className={`relative select-none ${className}`}
    >
      <div
        className="relative size-full overflow-hidden rounded-none border border-[#7b7a77]/50 flex items-stretch text-left shadow-lg"
        style={{
          background:
            "radial-gradient(110% 160% at 85% 25%, rgba(238, 108, 19, 0.18) 0%, rgba(24, 9, 2, 0.97) 48%, #0e0400 100%)",
        }}
      >
        {/* Subtle warm amber ambient glow behind metric area */}
        <div
          className="absolute right-[20px] top-[0px] w-[500px] h-[200px] rounded-full pointer-events-none opacity-30 blur-[80px]"
          style={{ background: "#EE6C13" }}
          aria-hidden="true"
        />

        {/* ── LEFT SECTION (~30%): Title, Context & Subtle Link ── */}
        <div className="w-[30%] shrink-0 p-6 md:p-7 flex flex-col justify-between relative z-10 border-r border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="size-1.5 rounded-none bg-[#EE6C13]" />
              <span className="font-['Inter:Bold',sans-serif] font-bold text-[10.5px] tracking-[0.8px] uppercase text-[#EE6C13]">
                CURRENTLY SHAPING
              </span>
            </div>
            <h2 className="font-['Outfit:Bold',sans-serif] font-extrabold text-[#FFFDFA] text-[22px] md:text-[23px] leading-[1.18] tracking-[-0.015em] mb-1.5">
              Beyond Agent-Centric AI
            </h2>
            <p className="font-['Outfit:Regular',sans-serif] font-normal text-[#cfc5bb] text-[12.5px] leading-[1.4] max-w-[290px] m-0">
              Evolving enterprise AI from managing agents to accomplishing outcomes.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNavigate("/allyra-outcomes")}
              onMouseEnter={() => playHoverTick()}
              className="group/link inline-flex items-center gap-1.5 font-['Inter:Bold',sans-serif] font-bold text-[11px] uppercase tracking-[0.6px] text-[#EE6C13] cursor-pointer bg-transparent border-0 p-0 text-left"
            >
              <span className="group-hover/link:underline">Explore the work</span>
              <svg
                className="size-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ── RIGHT SECTION (~70%): Four Horizontally Arranged Story Cells ── */}
        <div className="w-[70%] grid grid-cols-4 relative z-10 divide-x divide-white/10">
          {metricCells.map((cell, idx) => (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => handleNavigate(cell.targetPath)}
              onMouseEnter={() => {
                setHoveredCell(idx);
                playHoverTick();
              }}
              onMouseLeave={() => setHoveredCell(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavigate(cell.targetPath);
                }
              }}
              aria-label={`${cell.metric}: ${cell.label}`}
              className="p-5 md:p-6 flex flex-col justify-between transition-all duration-200 hover:bg-white/[0.035] cursor-pointer group select-none text-left"
            >
              {/* Primary Metric Anchor */}
              <div>
                <div
                  className={`font-['Outfit:Black',sans-serif] font-black text-[#FFFDFA] leading-none mb-2 transition-transform duration-300 group-hover:-translate-y-0.5 ${
                    cell.isTextMetric
                      ? "text-[21px] md:text-[22px] leading-tight group-hover:text-[#EE6C13]"
                      : "text-[32px] md:text-[34px] group-hover:text-[#EE6C13]"
                  }`}
                >
                  {cell.metric}
                </div>
                <p className="font-['Outfit:Regular',sans-serif] text-[12px] md:text-[12.5px] text-[#cfc5bb] leading-[1.35] m-0">
                  {cell.label}
                </p>
              </div>

              {/* Interaction Affordance */}
              <div className="pt-2">
                <span className="font-['Inter:Bold',sans-serif] font-bold text-[10.5px] uppercase tracking-[0.5px] text-[#8e857c] group-hover:text-[#EE6C13] transition-colors duration-200 inline-flex items-center gap-1">
                  <span>{cell.actionText}</span>
                  <svg
                    className="size-2.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
