import React, { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { playHoverTick } from "@/utils/soundEffects";

interface BrandVectorProps {
  theme?: "dark" | "light"; // "dark" = dark stroke (for light bg), "light" = light stroke (for dark bg)
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  interactive?: boolean;
}

export default function BrandVector({
  theme = "dark",
  className = "",
  style,
  width = 150,
  height = "auto",
  interactive = true,
}: BrandVectorProps) {
  const strokeColor = theme === "light" ? "#FFFDFA" : "#190B00";
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Magnetic spring physics for interactive attraction
  const springConfig = { stiffness: 320, damping: 24, mass: 0.6 };
  const orangeX = useSpring(0, springConfig);
  const orangeY = useSpring(0, springConfig);
  const dashedScale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    // Subtle magnetic attraction
    orangeX.set(dx * 10);
    orangeY.set(dy * 10);
    dashedScale.set(1.05);
  };

  const handleMouseEnter = () => {
    if (interactive) playHoverTick();
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    orangeX.set(0);
    orangeY.set(0);
    dashedScale.set(1);
  };

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 231 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`display-block ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        overflow: "visible",
        ...style,
      }}
    >
      {/* 1. Dashed Circle Group (Rotates on scroll + reacts with subtle interactive spring) */}
      <motion.g
        className="rotating-vector"
        style={{
          transformOrigin: "69.3004px 77.0004px",
          scale: dashedScale,
        }}
      >
        <circle
          cx="69.3004"
          cy="77.0004"
          r="63.9102"
          stroke={strokeColor}
          strokeWidth="10.78"
          strokeDasharray="18.48 18.48"
          style={{ transition: "stroke 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        />
      </motion.g>

      {/* 2. Solid Orange Circle (Magnetic spring displacement toward cursor) */}
      <motion.circle
        cx="154.001"
        cy="77.0003"
        r="77.0002"
        fill="#EE6C13"
        style={{
          x: orangeX,
          y: orangeY,
        }}
      />
    </svg>
  );
}
