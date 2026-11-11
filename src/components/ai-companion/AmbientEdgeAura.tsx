import React from "react";
import { motion } from "motion/react";
import { AssistantState } from "./AppleIntelligenceOrb";

interface AmbientEdgeAuraProps {
  state: AssistantState;
  intensity?: "soft" | "vibrant";
  className?: string;
}

export const AmbientEdgeAura: React.FC<AmbientEdgeAuraProps> = ({
  state,
  intensity = "soft",
  className = "",
}) => {
  const isActionActive =
    state === "executing" || state === "planning" || state === "approval" || state === "listening";

  const opacityLevel = isActionActive
    ? intensity === "vibrant"
      ? 0.4
      : 0.25
    : 0.15;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700 ${className}`}
      style={{ opacity: opacityLevel }}
      aria-hidden="true"
    >
      {/* Top Subtle Warm Orange Wash */}
      <motion.div
        animate={{
          y: ["-10%", "5%", "-10%"],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-[-10%] right-[-10%] h-[180px] md:h-[260px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(238, 108, 19, 0.35) 0%, rgba(238, 108, 19, 0.08) 50%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};

export default AmbientEdgeAura;
