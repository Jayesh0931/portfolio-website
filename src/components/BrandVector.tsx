import React from "react";

interface BrandVectorProps {
  theme?: "dark" | "light"; // "dark" = dark stroke (for light bg), "light" = light stroke (for dark bg)
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  animate?: boolean;
}

export default function BrandVector({
  theme = "dark",
  className = "",
  style,
  width = 150,
  height = "auto",
  animate = true,
}: BrandVectorProps) {
  const strokeColor = theme === "light" ? "#FFFDFA" : "#190B00";
  const animClass = animate ? "spin-dashed-circle" : "";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 231 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`display-block ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        overflow: "visible",
        ...style,
      }}
    >
      <style>{`
        @keyframes spinDashedCircle {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spin-dashed-circle {
          transform-origin: 69.3004px 77.0004px;
          animation: spinDashedCircle 14s linear infinite;
        }
      `}</style>

      {/* 1. Dashed Circle (Rotates around its center 69.3004, 77.0004) */}
      <circle
        cx="69.3004"
        cy="77.0004"
        r="63.9102"
        stroke={strokeColor}
        strokeWidth="10.78"
        strokeDasharray="18.48 18.48"
        className={animClass}
      />

      {/* 2. Solid Orange Circle (STATIC - does NOT rotate!) */}
      <circle
        cx="154.001"
        cy="77.0003"
        r="77.0002"
        fill="#EE6C13"
      />
    </svg>
  );
}
