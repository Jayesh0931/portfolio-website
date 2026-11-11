import React from "react";
import { motion } from "motion/react";

export type AssistantState =
  | "ready"
  | "clarifying"
  | "planning"
  | "executing"
  | "inspecting"
  | "approval"
  | "complete";

interface SiriAmbientIndicatorProps {
  state: AssistantState;
  size?: "compact" | "normal" | "large";
  showLabel?: boolean;
  className?: string;
}

const STATE_CONFIG: Record<
  AssistantState,
  {
    label: string;
    sublabel: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    pulseSpeed: number;
    orbScale: number;
  }
> = {
  ready: {
    label: "Listening & Ready",
    sublabel: "Awaiting your natural-language goal",
    primaryColor: "rgba(238, 108, 19, 0.85)", // #EE6C13
    secondaryColor: "rgba(255, 164, 81, 0.75)",
    accentColor: "rgba(255, 230, 204, 0.9)",
    pulseSpeed: 3.2,
    orbScale: 1,
  },
  clarifying: {
    label: "Clarifying Intent",
    sublabel: "Resolving policy parameters",
    primaryColor: "rgba(238, 108, 19, 0.95)",
    secondaryColor: "rgba(217, 91, 10, 0.85)",
    accentColor: "rgba(255, 214, 179, 0.95)",
    pulseSpeed: 2.2,
    orbScale: 1.05,
  },
  planning: {
    label: "Structuring Plan",
    sublabel: "Synthesising verifiable workflow steps",
    primaryColor: "rgba(234, 88, 12, 0.9)",
    secondaryColor: "rgba(251, 146, 60, 0.8)",
    accentColor: "rgba(254, 215, 170, 0.9)",
    pulseSpeed: 2.0,
    orbScale: 1.08,
  },
  executing: {
    label: "Executing Workflow",
    sublabel: "Retrieving clauses & computing reimbursement",
    primaryColor: "rgba(238, 108, 19, 1)",
    secondaryColor: "rgba(249, 115, 22, 0.9)",
    accentColor: "rgba(255, 237, 213, 0.95)",
    pulseSpeed: 1.5,
    orbScale: 1.15,
  },
  inspecting: {
    label: "Inspecting Evidence",
    sublabel: "Cross-referencing Section 4.2 grounding",
    primaryColor: "rgba(217, 91, 10, 0.9)",
    secondaryColor: "rgba(245, 158, 11, 0.85)",
    accentColor: "rgba(254, 243, 199, 0.95)",
    pulseSpeed: 2.4,
    orbScale: 1.05,
  },
  approval: {
    label: "Human Approval Needed",
    sublabel: "Consequential checkpoint awaiting sign-off",
    primaryColor: "rgba(238, 108, 19, 1)",
    secondaryColor: "rgba(194, 65, 12, 0.95)",
    accentColor: "rgba(255, 255, 255, 1)",
    pulseSpeed: 1.8,
    orbScale: 1.12,
  },
  complete: {
    label: "Outcome Prepared",
    sublabel: "Claim dossier ready for your submission",
    primaryColor: "rgba(34, 197, 94, 0.9)", // Verified Green
    secondaryColor: "rgba(238, 108, 19, 0.8)",
    accentColor: "rgba(240, 253, 244, 0.95)",
    pulseSpeed: 3.5,
    orbScale: 1,
  },
};

export const SiriAmbientIndicator: React.FC<SiriAmbientIndicatorProps> = ({
  state,
  size = "normal",
  showLabel = true,
  className = "",
}) => {
  const config = STATE_CONFIG[state] || STATE_CONFIG.ready;

  const orbDimensions = {
    compact: { w: 28, h: 28, blur: 8 },
    normal: { w: 44, h: 44, blur: 14 },
    large: { w: 72, h: 72, blur: 24 },
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-2.5 ${className}`}
      role="status"
      aria-label={`AI Companion Status: ${config.label}`}
    >
      {/* Siri / Apple Intelligence Inspired Ambient Orb */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{
          width: orbDimensions.w,
          height: orbDimensions.h,
        }}
      >
        {/* Outer Glow Halo */}
        <motion.div
          animate={{
            scale: [1, config.orbScale, 1],
            opacity: [0.55, 0.9, 0.55],
          }}
          transition={{
            duration: config.pulseSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${config.primaryColor} 0%, ${config.secondaryColor} 60%, transparent 80%)`,
            filter: `blur(${orbDimensions.blur}px)`,
          }}
        />

        {/* Dynamic Waveform Core */}
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: config.pulseSpeed * 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full border border-white/20"
          style={{
            width: orbDimensions.w * 0.75,
            height: orbDimensions.h * 0.75,
            background: `conic-gradient(from 0deg, ${config.primaryColor}, ${config.secondaryColor}, ${config.accentColor}, ${config.primaryColor})`,
            boxShadow: `0 0 ${orbDimensions.w * 0.4}px ${config.primaryColor}`,
          }}
        />

        {/* Center Iris Nucleus */}
        <div
          className="relative rounded-full bg-[#190b00] border border-[#FFFDFA]/30 flex items-center justify-center z-10 shadow-sm"
          style={{
            width: orbDimensions.w * 0.45,
            height: orbDimensions.h * 0.45,
          }}
        >
          {/* Audio Wave Bars for Visual Feedback */}
          <div className="flex items-center gap-[2px]">
            {[0.6, 1, 0.7, 0.9].map((heightScale, idx) => (
              <motion.span
                key={idx}
                animate={{
                  scaleY: state === "executing" || state === "ready" ? [0.4, 1.4, 0.5] : [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 0.6 + idx * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.08,
                }}
                className="w-[1.5px] rounded-full"
                style={{
                  height: orbDimensions.w * 0.22 * heightScale,
                  backgroundColor: state === "complete" ? "#22c55e" : "#FFFDFA",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Label and Sublabel */}
      {showLabel && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: state === "complete" ? "#22c55e" : "#EE6C13",
              }}
            />
            <span
              className="font-outfit font-extrabold uppercase tracking-[0.6px] text-[#190b00]"
              style={{
                fontSize: size === "compact" ? "11px" : "12.5px",
              }}
            >
              {config.label}
            </span>
          </div>
          {size !== "compact" && (
            <span
              className="font-inter text-[10.5px] text-[#77695d] tracking-[0.2px] truncate max-w-[210px]"
            >
              {config.sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SiriAmbientIndicator;
