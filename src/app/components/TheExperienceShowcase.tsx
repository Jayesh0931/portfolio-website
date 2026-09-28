import React, { useState, useEffect, useRef } from "react";
import imgOpportunityPhone from "@/imports/vousvous_opportunity_phone.webp";

interface StepData {
  id: number;
  num: string;
  title: string;
  subtitle: string;
}

const STEPS: StepData[] = [
  {
    id: 1,
    num: "01",
    title: "DISCOVER",
    subtitle: "Explore • Swipe",
  },
  {
    id: 2,
    num: "02",
    title: "EXPRESS",
    subtitle: "AI Chat",
  },
  {
    id: 3,
    num: "03",
    title: "CREATE",
    subtitle: "Generate • Remix",
  },
  {
    id: 4,
    num: "04",
    title: "PERSONALISE",
    subtitle: "Try-On",
  },
  {
    id: 5,
    num: "05",
    title: "COMPLETE",
    subtitle: "Quote • Purchase",
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
      width="135"
      height="95"
      viewBox="0 0 135 95"
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
          strokeWidth="5"
          strokeDasharray="7 7"
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

  // Track scroll budget (in canvas pixels)
  const SCROLL_DISTANCE = 2200;
  const PIN_OFFSET = 30; // viewport top clearance

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const start = (sectionTop - PIN_OFFSET) * scale;
      const end = start + SCROLL_DISTANCE * scale;

      // 1. Rotate the dashed circle on scroll
      if (dashedCircleRef.current) {
        dashedCircleRef.current.style.transform = `rotate(${scrollY * 0.25}deg)`;
      }

      // 2. Track pin state and progress
      if (scrollY < start) {
        setPinMode("before");
        setActiveStep(1);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = "0%";
        }
      } else if (scrollY >= start && scrollY <= end) {
        setPinMode("pinned");
        const progress = (scrollY - start) / (SCROLL_DISTANCE * scale);

        // Update bottom progress bar width smoothly in real time
        if (progressBarRef.current) {
          const pct = Math.min(Math.max(progress * 100, 2), 100);
          progressBarRef.current.style.width = `${pct}%`;
        }

        // Active step thresholds
        if (progress < 0.20) {
          setActiveStep(1);
        } else if (progress < 0.40) {
          setActiveStep(2);
        } else if (progress < 0.60) {
          setActiveStep(3);
        } else if (progress < 0.80) {
          setActiveStep(4);
        } else {
          setActiveStep(5);
        }
      } else {
        setPinMode("after");
        setActiveStep(5);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = "100%";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scale, sectionTop]);

  // Click on step smoothly scrolls page to that step
  const handleStepClick = (stepId: number) => {
    const stepRatio = (stepId - 1) / 4;
    const targetScrollY = (sectionTop - PIN_OFFSET) * scale + stepRatio * (SCROLL_DISTANCE * scale);
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const getHorizontalShift = (step: number) => {
    switch (step) {
      case 1:
        return 0;
      case 2:
        return -130;
      case 3:
        return -310;
      case 4:
        return -490;
      case 5:
        return -670;
      default:
        return 0;
    }
  };

  const horizontalShift = getHorizontalShift(activeStep);

  // Native hardware-composited positioning: zero-lag, zero jitter!
  const containerStyle: React.CSSProperties =
    pinMode === "pinned"
      ? {
          position: "fixed",
          top: `${PIN_OFFSET * scale}px`,
          left: `${left + 80 * scale}px`,
          width: "1280px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          zIndex: 20,
          pointerEvents: "auto",
        }
      : pinMode === "before"
      ? {
          position: "absolute",
          top: `${sectionTop * scale}px`,
          left: `${left + 80 * scale}px`,
          width: "1280px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          zIndex: 2,
          pointerEvents: "auto",
        }
      : {
          position: "absolute",
          top: `${(sectionTop + SCROLL_DISTANCE) * scale}px`,
          left: `${left + 80 * scale}px`,
          width: "1280px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          zIndex: 2,
          pointerEvents: "auto",
        };

  return (
    <>
      <div style={containerStyle} className="flex flex-col pt-6 select-none">
        {/* ── 1. HEADER SECTION (Styled for Dark Background #190b00) ── */}
        <div className="flex flex-col mb-12 w-full">
          {/* Eyebrow Tag */}
          <p className="font-inter font-bold text-[12px] tracking-[0.6px] uppercase m-0 mb-4">
            <span className="text-[#a8a29e]">[ FROM DISCOVERY TO </span>
            <span className="text-[#EE6C13]">PURCHASE</span>
            <span className="text-[#a8a29e]"> ]</span>
          </p>

          {/* Row 1: THE in White on left, Brand Mark on far right */}
          <div className="flex items-center justify-between w-full">
            <h2 className="font-outfit font-black text-[#FFFDFA] text-[130px] leading-[0.9] tracking-[4px] uppercase m-0">
              THE
            </h2>
            <div className="shrink-0 mr-4">
              <ExperienceBrandMark circleRef={dashedCircleRef} />
            </div>
          </div>

          {/* Row 2: EXPERIENCE (Outline Typography styled for dark background) */}
          <h2
            className="font-outfit font-black text-[130px] leading-[0.9] tracking-[4px] uppercase m-0 whitespace-nowrap"
            style={{
              color: "#190b00",
              WebkitTextStrokeWidth: "2.5px",
              WebkitTextStrokeColor: "#7B7A77",
              paintOrder: "stroke fill",
            }}
          >
            EXPERIENCE
          </h2>
        </div>

        {/* ── 2. INTERACTIVE 5-DEVICE SHOWCASE (HORIZONTALLY SCROLLING TRACK) ── */}
        <div className="w-full overflow-visible min-h-[760px] relative">
          <div
            style={{
              transform: `translateX(${horizontalShift}px)`,
              transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform",
            }}
            className="flex items-start justify-start gap-7 min-w-[1600px]"
          >
            {STEPS.map((step) => {
              const isActive = activeStep === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`flex flex-col cursor-pointer transition-all duration-500 ease-out select-none group ${
                    isActive
                      ? "w-[290px] shrink-0 z-10"
                      : "w-[172px] shrink-0 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Step Labels */}
                  <div
                    className={`flex flex-col transition-all duration-500 ${
                      isActive ? "h-[110px] justify-end pb-3" : "h-[110px] justify-end pb-3 mt-[100px]"
                    }`}
                  >
                    {/* Step Number */}
                    <span
                      className={`font-outfit font-bold text-[#EE6C13] transition-all duration-500 leading-none ${
                        isActive ? "text-[38px] mb-2" : "text-[22px] mb-1.5"
                      }`}
                    >
                      {step.num}
                    </span>

                    {/* Step Title (White) */}
                    <h3
                      className={`font-outfit font-black text-[#FFFDFA] uppercase tracking-wide transition-all duration-500 leading-tight m-0 ${
                        isActive ? "text-[24px]" : "text-[16px]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Subtitle (Muted Light Gray) */}
                    <p
                      className={`font-outfit text-[#a8a29e] font-normal transition-all duration-500 leading-tight m-0 mt-0.5 ${
                        isActive ? "text-[15px]" : "text-[12px]"
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>

                  {/* iPhone Frame Using vousvous_opportunity_phone.webp */}
                  <div
                    className={`transition-all duration-500 ease-out flex items-center justify-center ${
                      isActive ? "w-[290px] h-[600px] mt-0" : "w-[172px] h-[356px] mt-0"
                    }`}
                  >
                    <img
                      src={imgOpportunityPhone}
                      alt={`${step.num} ${step.title}`}
                      className={`w-full h-full object-contain pointer-events-none select-none transition-all duration-500 ${
                        isActive
                          ? "drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] scale-100"
                          : "drop-shadow-md group-hover:scale-[1.02]"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM BRAND ORANGE PROGRESS BAR (Appears ONLY when section is locked in viewport) ── */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[8px] bg-white/10 z-[9999] transition-opacity duration-300 pointer-events-none ${
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
