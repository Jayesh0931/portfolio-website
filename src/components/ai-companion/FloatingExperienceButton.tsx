import React from "react";
import { motion } from "motion/react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface FloatingExperienceButtonProps {
  onClick: () => void;
  className?: string;
}

export const FloatingExperienceButton: React.FC<FloatingExperienceButtonProps> = ({
  onClick,
  className = "",
}) => {
  const handleClick = () => {
    playClickSound();
    onClick();
  };

  const handleMouseEnter = () => {
    playHoverTick();
  };

  return (
    <div
      className={`fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-[990] pointer-events-auto select-none ${className}`}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.95 }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-full cursor-pointer overflow-hidden backdrop-blur-2xl bg-[#190B00]/90 hover:bg-[#190B00] text-[#FFFDFA] border border-[#EE6C13]/40 hover:border-[#EE6C13] shadow-[0_14px_36px_-10px_rgba(238,108,19,0.35)] transition-all duration-300"
        aria-label="Experience Human-Controlled AI Companion"
      >
        {/* Subtle Warm Orange Ambient Halo */}
        <div className="absolute -inset-1 rounded-full bg-[#EE6C13]/15 blur-md pointer-events-none group-hover:bg-[#EE6C13]/25 transition-all" />

        {/* Gemini Sparkle Icon in Signature Orange */}
        <div className="relative z-10 w-6 h-6 rounded-full bg-[#EE6C13]/15 border border-[#EE6C13]/30 flex items-center justify-center shrink-0">
          <motion.span
            animate={{
              scale: [0.95, 1.15, 0.95],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[#EE6C13] text-sm leading-none font-bold"
          >
            ✦
          </motion.span>
        </div>

        {/* Clean Minimal Typography */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex flex-col text-left">
            <span className="font-['Outfit',sans-serif] font-bold text-[13.5px] md:text-[14px] text-[#FFFDFA] tracking-tight leading-tight group-hover:text-[#EE6C13] transition-colors">
              Experience NEXUS
            </span>
            <span className="hidden sm:block font-['Inter',sans-serif] text-[10px] text-[#A89D91] font-normal tracking-wide">
              Agentic Enterprise Search
            </span>
          </div>

          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#EE6C13]/15 text-[#EE6C13] text-[10px] font-semibold border border-[#EE6C13]/30">
            Concept
          </span>
        </div>

        {/* Arrow */}
        <svg
          className="relative z-10 w-3.5 h-3.5 text-[#A89D91] group-hover:text-[#EE6C13] group-hover:translate-x-0.5 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
};

export default FloatingExperienceButton;
