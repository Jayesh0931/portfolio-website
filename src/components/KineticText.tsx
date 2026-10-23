import React from "react";
import { motion } from "motion/react";

interface KineticTextProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}

export default function KineticText({
  children,
  text,
  className = "",
  as: Component = "span",
  delay = 0.08,
  stagger = 0.055,
  style = {},
}: KineticTextProps) {
  const content = text ?? (typeof children === "string" ? children : "");

  if (!content) {
    return <Component className={className} style={style}>{children}</Component>;
  }

  const words = content.split(" ");

  return (
    <Component className={`inline-block ${className}`} style={style}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden align-top"
          style={{
            marginRight: index === words.length - 1 ? 0 : "0.26em",
            verticalAlign: "top",
            lineHeight: "1.15",
          }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + Math.pow(index, 0.9) * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

