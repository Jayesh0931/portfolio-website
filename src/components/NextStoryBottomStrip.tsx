import React from "react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface NextStoryBottomStripProps {
  onNextStory?: () => void;
  defaultNextPath: string;
  isDark?: boolean;
}

export default function NextStoryBottomStrip({ onNextStory, defaultNextPath, isDark = false }: NextStoryBottomStripProps) {
  return (
    <div style={{
      minHeight: 80,
      width: "100%",
      backgroundColor: isDark ? "#130800" : "#FFFDFA",
      borderTop: isDark ? "1px solid #2C2117" : "1px solid #7b7a77",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      flexWrap: "wrap",
      padding: "16px 20px",
      position: "relative",
      zIndex: 10,
    }}>
      {/* 1. Next Story */}
      <div
        onClick={() => {
          playClickSound();
          if (onNextStory) {
            onNextStory();
          } else {
            window.dispatchEvent(new CustomEvent("navigate-to-path", { detail: defaultNextPath }));
            window.scrollTo(0, 0);
          }
        }}
        onMouseEnter={() => playHoverTick()}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
        className={isDark
          ? "hover:bg-[#FFFDFA] hover:text-[#190b00] hover:border-[#FFFDFA] bg-[#190b00] border border-[#7b7a77] border-solid flex gap-[10px] h-[40px] items-center justify-center px-[22px] rounded-[110px] shadow-sm transition-all duration-200 group"
          : "hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] bg-[#fffdfa] border border-[#7b7a77] border-solid flex gap-[10px] h-[40px] items-center justify-center px-[22px] rounded-[110px] shadow-sm transition-all duration-200 group"
        }
      >
        <span className={isDark
          ? "font-outfit font-black text-[#FFFDFA] group-hover:text-[#190b00] text-[13px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200"
          : "font-outfit font-black text-[#190b00] group-hover:text-[#fffdfa] text-[13px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200"
        }>
          Next Story
        </span>
        <svg className="size-[13px]" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2.5L10.5 7.5L5 12.5" className={isDark ? "stroke-[#FFFDFA] group-hover:stroke-[#190B00] transition-colors duration-200" : "stroke-[#190B00] group-hover:stroke-[#FFFDFA] transition-colors duration-200"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* 2. About Jayesh */}
      <div
        onClick={() => {
          playClickSound();
          window.dispatchEvent(new CustomEvent("navigate-to-path", { detail: "/about" }));
          window.scrollTo(0, 0);
        }}
        onMouseEnter={() => playHoverTick()}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
        className={isDark
          ? "hover:bg-[#EE6C13] hover:text-[#FFFDFA] hover:border-[#EE6C13] bg-transparent border border-[#7b7a77] border-solid flex gap-[10px] h-[40px] items-center justify-center px-[22px] rounded-[110px] shadow-sm transition-all duration-200 group"
          : "hover:bg-[#EE6C13] hover:text-[#FFFDFA] hover:border-[#EE6C13] bg-transparent border border-[#7b7a77] border-solid flex gap-[10px] h-[40px] items-center justify-center px-[22px] rounded-[110px] shadow-sm transition-all duration-200 group"
        }
      >
        <span className={isDark
          ? "font-outfit font-black text-[#FFFDFA] text-[13px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200"
          : "font-outfit font-black text-[#190b00] group-hover:text-[#FFFDFA] text-[13px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200"
        }>
          About Jayesh
        </span>
        <svg className="size-[13px]" fill="none" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 9L9 2M9 2H4M9 2V7" className={isDark ? "stroke-[#FFFDFA] group-hover:stroke-[#FFFDFA] transition-colors duration-200" : "stroke-[#190b00] group-hover:stroke-[#FFFDFA] transition-colors duration-200"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
