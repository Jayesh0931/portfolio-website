import React from "react";

interface BrandVectorProps {
  theme?: "dark" | "light"; // "dark" = dark stroke (for light bg), "light" = light stroke (for dark bg)
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
}

export default function BrandVector({
  theme = "dark",
  className = "",
  style,
  width = 150,
  height = "auto",
}: BrandVectorProps) {
  const strokeColor = theme === "light" ? "#FFFDFA" : "#190B00";

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
      {/* 1. Dashed Circle Group (Only this group has class "rotating-vector" to rotate on page scroll) */}
      <g
        className="rotating-vector"
        style={{ transformOrigin: "69.3004px 77.0004px" }}
      >
        <circle
          cx="69.3004"
          cy="77.0004"
          r="63.9102"
          stroke={strokeColor}
          strokeWidth="10.78"
          strokeDasharray="18.48 18.48"
        />
      </g>

      {/* 2. Solid Orange Circle (STATIC - does NOT rotate on scroll!) */}
      <circle
        cx="154.001"
        cy="77.0003"
        r="77.0002"
        fill="#EE6C13"
      />
    </svg>
  );
}
