import commonVectorDark from "@/imports/common-vector-dark.svg";
import commonVectorLight from "@/imports/common-vector-light.svg";

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
  width = 100,
  height = "auto",
  animate = true,
}: BrandVectorProps) {
  const src = theme === "light" ? commonVectorLight : commonVectorDark;

  return (
    <img
      src={src}
      alt="Jayesh Soni Brand Vector"
      width={width}
      height={height}
      className={`display-block ${animate ? "rotating-vector" : ""} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        objectFit: "contain",
        ...style,
      }}
    />
  );
}
