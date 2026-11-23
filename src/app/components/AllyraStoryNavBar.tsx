import React from "react";
import BrandVector from "@/components/BrandVector";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface AllyraStoryNavBarProps {
  onNavigate: (path: string) => void;
  isDark?: boolean;
}

export default function AllyraStoryNavBar({
  onNavigate,
  isDark = false,
}: AllyraStoryNavBarProps) {
  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full pointer-events-none"
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 xl:px-0 pt-6 pb-2 flex items-center justify-between">
        {/* Left: Signature Portfolio Back Pill Button */}
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onNavigate("/");
          }}
          onMouseEnter={() => playHoverTick()}
          aria-label="Back to Homepage"
          style={{ pointerEvents: "auto" }}
          className={`flex items-center gap-2 h-[40px] px-4 rounded-[110px] border shadow-sm transition-all duration-200 group cursor-pointer ${
            isDark
              ? "bg-[#190b00] border-white/20 text-[#FFFDFA] hover:bg-[#FFFDFA] hover:text-[#190b00] hover:border-[#FFFDFA]"
              : "bg-[#fffdfa] border-[#7b7a77] text-[#190b00] hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00]"
          }`}
        >
          <div className="flex size-[11px] items-center justify-center relative shrink-0">
            <svg className="size-full" fill="none" viewBox="0 0 15 15">
              <path
                d="M10 12.5L4.5 7.5L10 2.5"
                className="stroke-current"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-outfit font-black text-[14px] tracking-[0.56px] uppercase whitespace-nowrap">
            Back
          </span>
        </button>

        {/* Right: Signature BrandVector Pill (Border-free, exact 58x40 match with other stories) */}
        <div
          onClick={() => {
            playClickSound();
            onNavigate("/");
          }}
          onMouseEnter={() => playHoverTick()}
          role="button"
          aria-label="Back to Homepage"
          style={{ pointerEvents: "auto" }}
          className={`w-[58px] h-[40px] rounded-[110px] flex items-center justify-center shadow-sm transition-all duration-300 group cursor-pointer ${
            isDark
              ? "bg-[#190b00] hover:bg-[#241002]"
              : "bg-[#fffdfa] hover:bg-[#f7f4ed]"
          }`}
        >
          <BrandVector theme={isDark ? "light" : "dark"} width={48} height={32} />
        </div>
      </div>
    </header>
  );
}
