import React, { useState, useEffect, useRef } from "react";
import imgExp1 from "@/imports/vousvous_expereince_1.webp";
import imgExp2 from "@/imports/vousvous_expereince_2.webp";
import imgExp3 from "@/imports/vousvous_expereince_3.webp";
import imgExp4 from "@/imports/vousvous_expereince_4.webp";
import imgExp5 from "@/imports/vousvous_expereince_5.webp";

interface StepData {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  image: string;
}

const STEPS: StepData[] = [
  {
    id: 1,
    num: "01",
    title: "DISCOVER",
    subtitle: "Explore • Swipe",
    image: imgExp1,
  },
  {
    id: 2,
    num: "02",
    title: "EXPRESS",
    subtitle: "AI Chat",
    image: imgExp2,
  },
  {
    id: 3,
    num: "03",
    title: "CREATE",
    subtitle: "Generate • Remix",
    image: imgExp3,
  },
  {
    id: 4,
    num: "04",
    title: "PERSONALISE",
    subtitle: "Try-On",
    image: imgExp4,
  },
  {
    id: 5,
    num: "05",
    title: "COMPLETE",
    subtitle: "Quote • Purchase",
    image: imgExp5,
  },
];

// Brand mark with rotating dashed white circle and static orange solid circle
export function ExperienceBrandMark({
  className = "",
  circleRef,
}: {
  className?: string;
  circleRef?: React.RefObject<SVGGElement | null>;
}) {
  return (
    <svg
      width="140"
      height="95"
      viewBox="0 0 140 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dashed Circle Group (White on dark background, rotates smoothly with scroll) */}
      <g
        ref={circleRef}
        className="rotating-vector"
        style={{ transformOrigin: "44px 48px", willChange: "transform" }}
      >
        <circle
          cx="44"
          cy="48"
          r="36"
          stroke="#FFFDFA"
          strokeWidth="4.5"
          strokeDasharray="6 6"
          fill="none"
        />
      </g>
      {/* Solid Orange Circle (Static) */}
      <circle cx="88" cy="48" r="38" fill="#EE6C13" />
    </svg>
  );
}

interface TheExperienceShowcaseProps {
  scale?: number;
  left?: number;
  sectionTop?: number;
}

export function TheExperienceShowcase({
  scale = 1,
  left = 0,
  sectionTop = 9529,
}: TheExperienceShowcaseProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [pinMode, setPinMode] = useState<"before" | "pinned" | "after">("before");

  const dashedCircleRef = useRef<SVGGElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth scroll interpolation refs (liquid momentum at 60fps/120fps)
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Total scroll budget
  const SCROLL_DISTANCE = 2400;

  // Stride between card centers: Card width (240px) + Gap (32px) = 272px
  const CARD_WIDTH = 240;
  const GAP = 32;
  const STRIDE = CARD_WIDTH + GAP;

  // 1. Scroll listener: updates targetProgress continuously in real time
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const start = (sectionTop - 30) * scale;
      const end = start + SCROLL_DISTANCE * scale;

      // Rotate dashed circle on scroll
      if (dashedCircleRef.current) {
        dashedCircleRef.current.style.transform = `rotate(${scrollY * 0.25}deg)`;
      }

      if (scrollY < start) {
        setPinMode("before");
        targetProgressRef.current = 0;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = "0%";
        }
      } else if (scrollY >= start && scrollY <= end) {
        setPinMode("pinned");
        const progress = (scrollY - start) / (SCROLL_DISTANCE * scale);
        // Map 0..1 scroll to 0..4 step progress
        targetProgressRef.current = Math.min(Math.max(progress * 4, 0), 4);

        if (progressBarRef.current) {
          const pct = Math.min(Math.max(progress * 100, 2), 100);
          progressBarRef.current.style.width = `${pct}%`;
        }
      } else {
        setPinMode("after");
        targetProgressRef.current = 4;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = "100%";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scale, sectionTop]);

  // 2. Liquid 120fps RAF Render Loop: Eliminates all jerkiness and sudden threshold jumps
  useEffect(() => {
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      // Smooth inertia: lerp current towards target progress
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current += diff * 0.14;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const cur = currentProgressRef.current;
      const shiftX = -cur * STRIDE;

      // 1. Move the entire track smoothly on GPU
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${shiftX}px)`;
      }

      // 2. Smoothly scale and cross-fade each phone without triggering layout reflow
      STEPS.forEach((_, i) => {
        const dist = Math.abs(cur - i);
        // Scale phone from 1.0 (active center) down to 0.74 (inactive)
        const phoneScale = Math.max(0.74, 1 - dist * 0.26);

        let opacity = 0.45;
        let labelOpacity = 0.6;

        if (i < cur) {
          // Phone moving left into/behind the text panel:
          // Fade label to 0 to prevent text-on-text clash, soften phone under blur mask
          const pastFactor = cur - i;
          opacity = Math.max(0.2, 1 - pastFactor * 0.45);
          labelOpacity = Math.max(0, 1 - pastFactor * 2.2);
        } else {
          // Current active or upcoming phone
          opacity = Math.max(0.45, 1 - dist * 0.55);
          labelOpacity = Math.max(0.6, 1 - dist * 0.4);
        }

        const phoneEl = phoneRefs.current[i];
        if (phoneEl) {
          phoneEl.style.transform = `scale(${phoneScale})`;
          phoneEl.style.opacity = `${opacity}`;
        }

        const labelEl = labelRefs.current[i];
        if (labelEl) {
          labelEl.style.opacity = `${labelOpacity}`;
          labelEl.style.pointerEvents = labelOpacity < 0.1 ? "none" : "auto";
        }
      });

      // 3. Update active step index for click highlights
      const nearestStep = Math.min(5, Math.max(1, Math.round(cur) + 1));
      setActiveStep((prev) => (prev !== nearestStep ? nearestStep : prev));

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);
    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [STRIDE]);

  // Click on step smoothly scrolls page directly to that step
  const handleStepClick = (stepId: number) => {
    const stepRatio = (stepId - 1) / 4;
    const targetScrollY = (sectionTop - 30) * scale + stepRatio * (SCROLL_DISTANCE * scale);
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Viewport-pinned positioning
  const containerStyle: React.CSSProperties =
    pinMode === "pinned"
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 20,
          pointerEvents: "auto",
        }
      : pinMode === "before"
      ? {
          position: "absolute",
          top: `${sectionTop * scale}px`,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 2,
          pointerEvents: "auto",
        }
      : {
          position: "absolute",
          top: `${(sectionTop + SCROLL_DISTANCE) * scale}px`,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 2,
          pointerEvents: "auto",
        };

  return (
    <>
      <div style={containerStyle} className="select-none bg-[#190b00] overflow-hidden">
        {/* Full viewport stage */}
        <div className="w-full h-full relative overflow-hidden flex items-center">
          {/* ── 1. LEFT PANEL: Full viewport height (Typography on top, Brand Vector on bottom) ── */}
          <div className="absolute left-[60px] lg:left-[80px] top-0 h-full w-[420px] lg:w-[460px] z-20 flex flex-col justify-between pt-[105px] pb-10 pointer-events-none">
            {/* Top Typography Block */}
            <div className="flex flex-col pointer-events-auto">
              {/* Eyebrow Tag: Clears the navbar < BACK button cleanly */}
              <p className="font-inter font-bold text-[12px] tracking-[0.6px] uppercase m-0 mb-4 text-[#a8a29e]">
                [ FROM DISCOVERY TO <span className="text-[#EE6C13]">PURCHASE</span> ]
              </p>

              {/* Title Row 1: THE (Solid White) */}
              <h2 className="font-outfit font-black text-[#FFFDFA] text-[66px] lg:text-[76px] leading-[0.88] tracking-[2px] uppercase m-0">
                THE
              </h2>

              {/* Title Row 2: EXPERIENCE (Outline typography) */}
              <h2
                className="font-outfit font-black text-[66px] lg:text-[76px] leading-[0.88] tracking-[2px] uppercase m-0 whitespace-nowrap"
                style={{
                  color: "#190b00",
                  WebkitTextStrokeWidth: "2px",
                  WebkitTextStrokeColor: "#7B7A77",
                  paintOrder: "stroke fill",
                }}
              >
                EXPERIENCE
              </h2>
            </div>

            {/* Bottom Brand Mark Block (Rotates smoothly on scroll) */}
            <div className="shrink-0 pointer-events-auto mt-auto pt-4">
              <ExperienceBrandMark circleRef={dashedCircleRef} />
            </div>
          </div>

          {/* ── 2. BLUR & GRADIENT OVERLAY (Gently blurs & fades phones as they pass behind the left text) ── */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-[500px] lg:w-[540px] z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(25, 11, 0, 1) 0%, rgba(25, 11, 0, 0.95) 70%, rgba(25, 11, 0, 0) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              maskImage: "linear-gradient(to right, black 65%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 65%, transparent 100%)",
            }}
          />

          {/* ── 3. HORIZONTAL TRACK OF PHONES: First phone starts CENTERED in the right panel ── */}
          <div
            style={{
              paddingLeft: "calc(50vw + 108px)",
            }}
            className="w-full h-full relative z-0 flex items-center overflow-visible"
          >
            <div
              ref={trackRef}
              style={{
                willChange: "transform",
              }}
              className="flex items-end justify-start gap-8 min-w-[1800px] pb-6"
            >
              {STEPS.map((step, idx) => {
                const isActive = activeStep === step.id;

                return (
                  <div
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    style={{
                      width: `${CARD_WIDTH}px`,
                    }}
                    className="shrink-0 flex flex-col justify-end items-start cursor-pointer select-none group"
                  >
                    {/* Step Labels directly above each phone */}
                    <div
                      ref={(el) => (labelRefs.current[idx] = el)}
                      style={{
                        willChange: "opacity",
                      }}
                      className="flex flex-col pb-3 w-full"
                    >
                      {/* Step Number */}
                      <span className="font-outfit font-bold text-[#EE6C13] text-[28px] leading-none mb-1">
                        {step.num}
                      </span>

                      {/* Step Title (White) */}
                      <h3 className="font-outfit font-black text-[#FFFDFA] uppercase tracking-wide text-[20px] leading-tight m-0">
                        {step.title}
                      </h3>

                      {/* Step Subtitle (Muted Light Gray) */}
                      <p className="font-outfit text-[#a8a29e] font-normal text-[12px] leading-tight m-0 mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>

                    {/* iPhone Frame Using vousvous_opportunity_phone.webp */}
                    <div
                      ref={(el) => (phoneRefs.current[idx] = el)}
                      style={{
                        transformOrigin: "bottom center",
                        willChange: "transform, opacity",
                      }}
                      className="w-full h-[510px] max-h-[58vh] flex items-center justify-center select-none"
                    >
                      <img
                        src={step.image}
                        alt={`${step.num} ${step.title}`}
                        className={`w-full h-full object-contain pointer-events-none select-none transition-shadow duration-300 ${
                          isActive
                            ? "drop-shadow-[0_24px_50px_rgba(0,0,0,0.9)]"
                            : "drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM BRAND ORANGE PROGRESS BAR (Appears ONLY when section is locked in viewport) ── */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[6px] bg-white/10 z-[9999] transition-opacity duration-300 pointer-events-none ${
          pinMode === "pinned" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={progressBarRef}
          className="h-full bg-[#EE6C13] transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(238,108,19,0.8)]"
          style={{ width: "2%" }}
        />
      </div>
    </>
  );
}

export default TheExperienceShowcase;
