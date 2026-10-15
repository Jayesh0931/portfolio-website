import React, { useState, useEffect, useRef } from "react";
import { ExperienceBrandMark } from "@/app/components/TheExperienceShowcase";
import imgExp1 from "@/imports/vousvous_expereince_1.webp";
import imgExp2 from "@/imports/vousvous_expereince_2.webp";
import imgExp3 from "@/imports/vousvous_expereince_3.webp";
import imgExp4 from "@/imports/vousvous_expereince_4.webp";
import imgExp5 from "@/imports/vousvous_expereince_5.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

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

const SCROLL_BUDGET = 2200;

export function MobileVousVousExperience() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dashedCircleRef = useRef<SVGGElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 390
  );

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  // Responsive stride calculation on window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. Scroll listener: maps vertical scroll through outerRef into 0..4 progress
  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const totalScroll = outerRef.current.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      // Rotate dashed circle smoothly with scroll
      if (dashedCircleRef.current) {
        dashedCircleRef.current.style.transform = `rotate(${window.scrollY * 0.3}deg)`;
      }

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      targetProgressRef.current = progress * 4; // 0 to 4 steps
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Liquid 120Hz RAF loop: smooth inertia translation, phone scaling & progress bar
  useEffect(() => {
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current += diff * 0.14;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const cur = currentProgressRef.current;
      const cardWidth = Math.min(300, Math.floor(windowWidth * 0.74));
      const gap = 20;
      const stride = cardWidth + gap;
      const initialPaddingLeft = (windowWidth - cardWidth) / 2;
      const shiftX = initialPaddingLeft - cur * stride;

      // Translate track horizontally on GPU
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${shiftX}px, 0, 0)`;
      }

      // Smoothly scale & adjust opacity for each phone
      STEPS.forEach((_, i) => {
        const dist = Math.abs(cur - i);
        const scale = Math.max(0.88, 1 - dist * 0.12);
        const opacity = Math.max(0.45, 1 - dist * 0.45);

        const phoneEl = phoneRefs.current[i];
        if (phoneEl) {
          phoneEl.style.transform = `scale(${scale})`;
          phoneEl.style.opacity = `${opacity}`;
        }
      });

      // Update bottom progress bar width
      if (progressBarRef.current) {
        const pct = Math.min(Math.max((cur / 4) * 100, 2), 100);
        progressBarRef.current.style.width = `${pct}%`;
      }

      // Active step number
      const nearest = Math.min(5, Math.max(1, Math.round(cur) + 1));
      setActiveStep((prev) => (prev !== nearest ? nearest : prev));

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);
    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [windowWidth]);

  // Click on a phone card scrolls smoothly to that step
  const handleStepClick = (index: number) => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScroll = outerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / 4) * totalScroll;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  // Horizontal swipe gestures on mobile drive page vertical scroll
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    const deltaY = e.touches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 12) {
      window.scrollBy({ top: -deltaX * 1.15, behavior: "auto" });
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const cardWidth = Math.min(300, Math.floor(windowWidth * 0.74));

  return (
    <section
      id="mobile-vousvous-experience"
      ref={outerRef}
      style={{
        height: `calc(100vh + ${SCROLL_BUDGET}px)`,
        position: "relative",
        width: "100%",
      }}
      className="mobile-story-experience-sticky-container select-none"
    >
      {/* ── STICKY VIEWPORT FRAME (Pins to viewport on scroll) ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          maxHeight: "100dvh",
          overflow: "hidden",
          backgroundColor: "#190b00",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
        className="text-[#fffdfa]"
      >
        {/* ── 1. HEADER (Top pinned: Solid clean typography, rotating brand mark) ── */}
        <div className="pt-6 px-5 pb-2 shrink-0 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase m-0 mb-1.5 text-[#a8a29e]">
              [ FROM DISCOVERY TO <span className="text-[#EE6C13]">PURCHASE</span> ]
            </p>
            <h2 className="font-outfit font-black text-[#FFFDFA] text-[30px] sm:text-[34px] tracking-[1.2px] uppercase leading-none m-0">
              THE EXPERIENCE
            </h2>
          </div>

          {/* Rotating Brand Vector */}
          <div className="shrink-0 -mr-2 scale-[0.65] origin-right">
            <ExperienceBrandMark circleRef={dashedCircleRef} />
          </div>
        </div>

        {/* ── 2. HORIZONTAL TRACK OF LARGE PHONES ── */}
        <div
          className="flex-1 w-full overflow-hidden flex items-center relative py-2"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-5"
            style={{ willChange: "transform" }}
          >
            {STEPS.map((step, idx) => {
              const isActive = activeStep === step.id;

              return (
                <div
                  key={step.id}
                  ref={(el) => (phoneRefs.current[idx] = el)}
                  onClick={() => {
                    if (!isActive) {
                      handleStepClick(idx);
                    } else {
                      setLightboxImage(step.image);
                      setLightboxTitle(`${step.num} ${step.title}`);
                    }
                  }}
                  style={{
                    width: `${cardWidth}px`,
                    willChange: "transform, opacity",
                    transformOrigin: "center center",
                  }}
                  className="shrink-0 flex flex-col items-center justify-center cursor-pointer select-none"
                >
                  {/* Step Meta (Above the phone) */}
                  <div className="flex flex-col items-center text-center pb-2.5 w-full">
                    <div className="flex items-baseline gap-2">
                      <span className="font-outfit font-bold text-[#EE6C13] text-[22px] leading-none">
                        {step.num}
                      </span>
                      <h3 className="font-outfit font-black text-[#FFFDFA] uppercase tracking-wide text-[18px] leading-tight m-0">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-outfit text-[#a8a29e] font-normal text-[12px] leading-tight m-0 mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* High-Impact Large Phone Mockup Frame */}
                  <div className="relative w-full flex items-center justify-center">
                    <img
                      src={step.image}
                      alt={`${step.num} ${step.title}`}
                      className={`w-full h-auto max-h-[58vh] sm:max-h-[62vh] object-contain select-none pointer-events-none transition-all duration-300 ${
                        isActive
                          ? "drop-shadow-[0_24px_50px_rgba(0,0,0,0.98)]"
                          : "drop-shadow-[0_12px_25px_rgba(0,0,0,0.6)]"
                      }`}
                    />
                  </div>

                  {/* Tap to inspect hint */}
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-outfit font-semibold uppercase tracking-wider text-[#a8a29e] opacity-80">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    <span>Tap to view</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. BOTTOM GLOWING ORANGE PROGRESS BAR ── */}
        <div className="w-full h-[4px] bg-white/10 shrink-0 relative">
          <div
            ref={progressBarRef}
            className="h-full bg-[#EE6C13] shadow-[0_0_12px_rgba(238,108,19,0.9)] transition-[width] duration-75 ease-out"
            style={{ width: "2%" }}
          />
        </div>
      </div>

      {/* Step Lightbox Modal */}
      <MobileImageLightbox
        isOpen={Boolean(lightboxImage)}
        onClose={() => setLightboxImage(null)}
        src={lightboxImage || ""}
        alt={lightboxTitle}
        type="image"
      />
    </section>
  );
}

export default MobileVousVousExperience;
