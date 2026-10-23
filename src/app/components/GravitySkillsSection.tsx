import React, { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface SkillPill {
  id: string;
  name: string;
  category: "ai" | "product" | "design" | "tools";
  highlight?: boolean;
}

const GRAVITY_SKILLS: SkillPill[] = [
  // AI & Systems
  { id: "hai", name: "Human–AI Interaction", category: "ai", highlight: true },
  { id: "agentic-ux", name: "Agentic AI UX", category: "ai", highlight: true },
  { id: "multi-agent", name: "Multi-Agent Workflows", category: "ai", highlight: true },
  { id: "hitl", name: "Human-in-the-Loop", category: "ai", highlight: true },
  { id: "conversational-ai", name: "Conversational AI", category: "ai" },
  { id: "ai-guardrails", name: "AI Guardrails", category: "ai" },
  { id: "llm-products", name: "LLM Products", category: "ai" },
  { id: "gen-ui", name: "Generative UI", category: "ai" },

  // Product & 0→1
  { id: "zero-to-one", name: "0-to-1 Product", category: "product", highlight: true },
  { id: "prod-strategy", name: "Product Strategy", category: "product" },
  { id: "roadmap", name: "Roadmap Prioritisation", category: "product" },
  { id: "discovery", name: "User Discovery", category: "product" },
  { id: "leadership", name: "Cross-Functional Leadership", category: "product", highlight: true },
  { id: "saas", name: "Enterprise SaaS", category: "product" },
  { id: "automation", name: "Workflow Automation", category: "product" },

  // Design & HCI
  { id: "design-systems", name: "Design Systems", category: "design", highlight: true },
  { id: "interaction-design", name: "Interaction Design", category: "design" },
  { id: "user-flows", name: "User Flows", category: "design" },
  { id: "ia", name: "Information Architecture", category: "design" },
  { id: "wcag", name: "WCAG Accessibility", category: "design", highlight: true },
  { id: "usability", name: "Usability Testing", category: "design" },
  { id: "prototyping", name: "Rapid Prototyping", category: "design" },

  // Tools & Code
  { id: "figma", name: "Figma", category: "tools" },
  { id: "figma-make", name: "Figma Make", category: "tools" },
  { id: "claude", name: "Claude", category: "tools" },
  { id: "chatgpt", name: "ChatGPT", category: "tools" },
  { id: "gemini", name: "Gemini", category: "tools" },
  { id: "antigravity", name: "Antigravity", category: "tools" },
  { id: "html-react", name: "HTML & React Prototyping", category: "tools", highlight: true },
];

interface GravitySkillsSectionProps {
  isDark?: boolean;
  contentWidth?: number | string;
  scale?: number;
  isMobile?: boolean;
  style?: React.CSSProperties;
}

export default function GravitySkillsSection({
  isDark = false,
  contentWidth = 1280,
  scale = 1,
  isMobile = false,
  style = {},
}: GravitySkillsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const pillElementsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [hasDropped, setHasDropped] = useState(false);

  // Matter.js instances
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<{ [key: string]: Matter.Body }>({});
  const animFrameRef = useRef<number | null>(null);

  const getCategoryDotColor = (category: SkillPill["category"]) => {
    switch (category) {
      case "ai":
        return "#EE6C13"; // International orange
      case "product":
        return "#F59E0B"; // Amber
      case "design":
        return "#0284C7"; // Sky blue
      case "tools":
        return "#10B981"; // Emerald
      default:
        return "#EE6C13";
    }
  };

  const startSimulation = useCallback(() => {
    if (!canvasRef.current) return;

    // Clean up any existing engine/runner
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
      runnerRef.current = null;
    }
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }

    const arenaWidth = canvasRef.current.clientWidth || (isMobile ? 360 : 1280);
    const arenaHeight = canvasRef.current.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 800);

    // Create physics engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.15, scale: 0.001 },
    });
    engineRef.current = engine;

    // Create invisible boundaries (floor, left wall, right wall)
    const wallOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { visible: false },
      friction: 0.35,
      restitution: 0.4,
    };

    const wallThickness = 120;
    const floor = Matter.Bodies.rectangle(
      arenaWidth / 2,
      arenaHeight + wallThickness / 2 - 2,
      arenaWidth + 800,
      wallThickness,
      wallOptions
    );
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2 + 2,
      arenaHeight / 2,
      wallThickness,
      arenaHeight * 3,
      wallOptions
    );
    const rightWall = Matter.Bodies.rectangle(
      arenaWidth + wallThickness / 2 - 2,
      arenaHeight / 2,
      wallThickness,
      arenaHeight * 3,
      wallOptions
    );

    Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

    // Create bodies for each skill pill
    const bodies: { [key: string]: Matter.Body } = {};

    GRAVITY_SKILLS.forEach((skill, index) => {
      const el = pillElementsRef.current[skill.id];
      // Compute dimensions based on measured DOM size or fallback
      const pillWidth = el ? Math.max(el.offsetWidth, 90) : (skill.name.length * 8.5 + 46);
      const pillHeight = el ? Math.max(el.offsetHeight, 38) : (isMobile ? 38 : 46);

      // Random starting coordinates above viewport
      const padding = Math.max(pillWidth / 2 + 10, 40);
      const randomX = Math.random() * (arenaWidth - padding * 2) + padding;
      // Stagger spawn height so pills cascade down through full height
      const randomY = -60 - index * (isMobile ? 22 : 28) - Math.random() * 100;

      const body = Matter.Bodies.rectangle(randomX, randomY, pillWidth, pillHeight, {
        chamfer: { radius: pillHeight / 2 },
        density: 0.0015,
        friction: 0.28,
        frictionAir: 0.012,
        restitution: 0.42, // realistic bounce
        angle: (Math.random() - 0.5) * 0.45,
      });

      // Give a slight initial tumble
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

      bodies[skill.id] = body;
    });

    bodiesRef.current = bodies;
    Matter.Composite.add(engine.world, Object.values(bodies));

    // Mouse constraint for drag-and-toss interactivity
    const mouse = Matter.Mouse.create(canvasRef.current);
    // Prevent mouse wheel capture so page scrolling remains buttery smooth
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.Composite.add(engine.world, mouseConstraint);

    // Run engine
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // Sync loop: map Matter.js body coordinates to HTML DOM pills
    const updateDOM = () => {
      GRAVITY_SKILLS.forEach((skill) => {
        const body = bodies[skill.id];
        const el = pillElementsRef.current[skill.id];

        if (body && el) {
          const x = body.position.x;
          const y = body.position.y;
          const angle = body.angle;

          // translate from center-pivot to top-left
          el.style.transform = `translate3d(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px, 0) rotate(${angle}rad)`;
          if (el.style.visibility !== "visible") {
            el.style.visibility = "visible";
          }
        }
      });

      animFrameRef.current = requestAnimationFrame(updateDOM);
    };

    animFrameRef.current = requestAnimationFrame(updateDOM);
    setHasDropped(true);
  }, [isMobile]);

  // Observer to trigger drop when scrolled into viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasDropped) {
          startSimulation();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasDropped, startSimulation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.World.clear(engineRef.current.world, false);
    };
  }, []);

  const handleReDrop = () => {
    playClickSound();
    startSimulation();
  };

  return (
    <section
      ref={containerRef}
      style={{
        width: typeof contentWidth === "number" ? `${contentWidth}px` : "100%",
        height: "100vh",
        margin: "0 auto 60px auto",
        boxSizing: "border-box",
        userSelect: "none",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
      aria-label="Capabilities Gravity Physics Lab"
    >
      {/* ── Eyebrow Tag & Minimal Refresh Icon Button (No Title, No Box) ── */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "16px 6px 10px 6px" : "24px 0 12px 0",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? 11 : 12,
            letterSpacing: "0.8px",
            color: "#EE6C13",
            textTransform: "uppercase",
          }}
        >
          [ S-006 // CAPABILITIES ]
        </span>

        {/* Minimal Refresh Icon Button */}
        <button
          type="button"
          onClick={handleReDrop}
          title="Drop Again"
          aria-label="Drop Again"
          style={{
            width: isMobile ? 32 : 36,
            height: isMobile ? 32 : 36,
            borderRadius: "50%",
            background: "transparent",
            border: `1px solid ${isDark ? "rgba(255, 253, 250, 0.25)" : "rgba(25, 11, 0, 0.25)"}`,
            color: isDark ? "#FFFDFA" : "#190b00",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            outline: "none",
            transition: "all 0.25s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#EE6C13";
            e.currentTarget.style.borderColor = "#EE6C13";
            e.currentTarget.style.color = "#FFFDFA";
            playHoverTick();
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = isDark ? "rgba(255, 253, 250, 0.25)" : "rgba(25, 11, 0, 0.25)";
            e.currentTarget.style.color = isDark ? "#FFFDFA" : "#190b00";
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </div>

      {/* ── Completely Open Full Viewport Height Gravity Arena (No Box, No Borders) ── */}
      <div
        ref={canvasRef}
        style={{
          width: "100%",
          flex: 1,
          height: "100%",
          backgroundColor: "transparent",
          border: "none", // NO BOX BORDER
          position: "relative",
          overflow: "hidden",
          cursor: "grab",
          boxSizing: "border-box",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.cursor = "grabbing";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.cursor = "grab";
        }}
      >
        {/* Render each HTML Pill synchronized to its physics body */}
        {GRAVITY_SKILLS.map((skill) => {
          const dotColor = getCategoryDotColor(skill.category);

          return (
            <div
              key={skill.id}
              ref={(el) => {
                pillElementsRef.current[skill.id] = el;
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                visibility: "hidden", // hidden until initial placement
                display: "inline-flex",
                alignItems: "center",
                gap: isMobile ? 6 : 8,
                padding: isMobile ? "9px 18px" : "12px 24px",
                borderRadius: 9999, // Perfect pill capsule
                backgroundColor: "#FFFDFA", // Clean white pill matching the user's reference image
                color: "#190b00", // High contrast dark text
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: isMobile ? 13 : 15.5,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(25, 11, 0, 0.08)",
                willChange: "transform",
                pointerEvents: "auto",
                touchAction: "none",
              }}
            >
              {/* Category accent dot */}
              <span
                style={{
                  width: isMobile ? 6 : 7,
                  height: isMobile ? 6 : 7,
                  borderRadius: "50%",
                  backgroundColor: dotColor,
                  flexShrink: 0,
                }}
              />
              <span>{skill.name}</span>
              {skill.highlight && (
                <span
                  style={{
                    color: "#EE6C13",
                    fontSize: 10,
                    lineHeight: 1,
                  }}
                >
                  ✦
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
