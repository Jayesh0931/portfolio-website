import React from "react";
import { motion } from "motion/react";

export type AssistantState =
  | "ready"
  | "listening"
  | "clarifying"
  | "planning"
  | "executing"
  | "inspecting"
  | "approval"
  | "complete";

interface AppleIntelligenceOrbProps {
  state: AssistantState;
  size?: "compact" | "normal" | "large" | "hero";
  className?: string;
  showStatusBadge?: boolean;
}

export const AppleIntelligenceOrb: React.FC<AppleIntelligenceOrbProps> = ({
  state,
  size = "normal",
  className = "",
  showStatusBadge = false,
}) => {
  const sizeMap = {
    compact: { outer: 32, icon: 16, glow: 36 },
    normal: { outer: 52, icon: 24, glow: 60 },
    large: { outer: 80, icon: 36, glow: 96 },
    hero: { outer: 110, icon: 48, glow: 130 },
  }[size];

  const isWorking = state === "executing" || state === "planning" || state === "listening";

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Warm Ambient Orange Glow Halo */}
      <motion.div
        animate={{
          scale: isWorking ? [1, 1.25, 1] : [1, 1.1, 1],
          opacity: isWorking ? [0.35, 0.65, 0.35] : [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: isWorking ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: sizeMap.glow,
          height: sizeMap.glow,
          background: "radial-gradient(circle, rgba(238, 108, 19, 0.45) 0%, rgba(238, 108, 19, 0.1) 60%, transparent 100%)",
          filter: "blur(12px)",
        }}
      />

      {/* Main Core: Pure Minimalist Gemini Presence */}
      <motion.div
        animate={{
          scale: isWorking ? [0.96, 1.04, 0.96] : [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: isWorking ? 1.8 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative rounded-full flex items-center justify-center border border-[#EE6C13]/30 bg-[#EE6C13]/10 backdrop-blur-md shadow-[0_4px_20px_rgba(238,108,19,0.25)]"
        style={{
          width: sizeMap.outer,
          height: sizeMap.outer,
        }}
      >
        {/* Subtle Inner Ring */}
        <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#EE6C13]/20 via-transparent to-black/20 pointer-events-none" />

        {/* Gemini Sparkle Mark */}
        <motion.span
          animate={{
            rotate: isWorking ? [0, 90, 180, 270, 360] : [0, 15, -15, 0],
            scale: isWorking ? [1, 1.15, 1] : [1, 1.05, 1],
          }}
          transition={{
            duration: isWorking ? 5 : 6,
            repeat: Infinity,
            ease: isWorking ? "linear" : "easeInOut",
          }}
          className="text-[#EE6C13] font-bold leading-none select-none relative z-10"
          style={{ fontSize: sizeMap.icon }}
        >
          ✦
        </motion.span>
      </motion.div>

      {/* Optional Status Pill */}
      {showStatusBadge && (
        <span className="mt-2 text-[10px] uppercase font-bold tracking-widest text-[#EE6C13] px-2 py-0.5 rounded-full bg-[#EE6C13]/10 border border-[#EE6C13]/25">
          {state}
        </span>
      )}
    </div>
  );
};

export default AppleIntelligenceOrb;
