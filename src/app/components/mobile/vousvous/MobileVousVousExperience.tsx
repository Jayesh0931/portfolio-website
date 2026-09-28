import React, { useState } from "react";
import { ExperienceBrandMark } from "@/app/components/TheExperienceShowcase";
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

export function MobileVousVousExperience() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const current = STEPS.find((s) => s.id === activeStep) || STEPS[0];

  return (
    <section
      id="mobile-vousvous-experience"
      className="mobile-story-experience-section px-4 py-16 bg-[#190b00] text-[#fffdfa]"
    >
      {/* ── 1. HEADER (Sharp 90-degree corners, Dark Background) ── */}
      <p className="font-inter font-bold text-[11px] tracking-[0.6px] uppercase m-0 mb-3">
        <span className="text-[#a8a29e]">[ FROM DISCOVERY TO </span>
        <span className="text-[#EE6C13]">PURCHASE</span>
        <span className="text-[#a8a29e]"> ]</span>
      </p>

      <div className="flex items-center justify-between mb-1">
        <h2 className="font-outfit font-black text-[#FFFDFA] text-[44px] leading-tight tracking-[1px] uppercase m-0">
          THE
        </h2>
        <div className="shrink-0 -mt-1 scale-75 origin-right">
          <ExperienceBrandMark />
        </div>
      </div>

      <h2
        className="font-outfit font-black text-[44px] leading-tight tracking-[1px] uppercase m-0 mb-6"
        style={{
          color: "#190b00",
          WebkitTextStrokeWidth: "1.5px",
          WebkitTextStrokeColor: "#7B7A77",
          paintOrder: "stroke fill",
        }}
      >
        EXPERIENCE
      </h2>

      {/* ── 2. STEP TABS (Sharp 90-degree corners, Dark Theme) ── */}
      <div className="grid grid-cols-5 border border-[#7b7a77]/50 bg-[#251305] mb-6">
        {STEPS.map((s) => {
          const isSelected = activeStep === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`py-2.5 flex flex-col items-center justify-center border-r last:border-r-0 border-[#7b7a77]/50 transition-colors ${
                isSelected ? "bg-[#331c0a] text-[#fffdfa]" : "bg-transparent text-[#a8a29e]"
              }`}
            >
              <span
                className={`font-outfit font-bold text-[14px] leading-none ${
                  isSelected ? "text-[#EE6C13]" : "text-[#a8a29e]"
                }`}
              >
                {s.num}
              </span>
              <span className="font-outfit text-[9px] uppercase tracking-wider font-bold mt-1 truncate max-w-full px-1">
                {s.title.slice(0, 4)}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 3. ACTIVE STEP DETAIL CARD (Sharp 90-degree container, Dark Theme) ── */}
      <div className="bg-[#251305] border border-[#7b7a77]/50 p-5 flex flex-col">
        {/* Step info header */}
        <div className="flex items-baseline justify-between mb-4 border-b border-[#7b7a77]/40 pb-3">
          <div>
            <span className="font-outfit font-bold text-[#EE6C13] text-[28px] leading-none block mb-1">
              {current.num}
            </span>
            <h3 className="font-outfit font-black text-[#FFFDFA] text-[22px] uppercase tracking-wide m-0">
              {current.title}
            </h3>
          </div>
          <span className="font-outfit text-[#a8a29e] text-[13px] font-medium">
            {current.subtitle}
          </span>
        </div>

        {/* iPhone Mockup Centered Frame using vousvous_opportunity_phone.webp */}
        <div className="bg-[#190b00] border border-[#7b7a77]/50 py-6 flex items-center justify-center">
          <img
            src={imgOpportunityPhone}
            alt={`${current.num} ${current.title}`}
            className="w-[200px] h-[415px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] select-none pointer-events-none"
          />
        </div>

        {/* Next / Previous controls */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#7b7a77]/40">
          <button
            onClick={() => setActiveStep((prev) => (prev > 1 ? prev - 1 : 5))}
            className="font-outfit font-bold text-[12px] text-[#a8a29e] hover:text-[#fffdfa] flex items-center gap-1 uppercase"
          >
            ← Previous
          </button>
          <span className="font-outfit text-[11px] text-[#a8a29e]">
            {activeStep} of 5
          </span>
          <button
            onClick={() => setActiveStep((prev) => (prev < 5 ? prev + 1 : 1))}
            className="font-outfit font-bold text-[12px] text-[#EE6C13] flex items-center gap-1 uppercase"
          >
            Next Step →
          </button>
        </div>
      </div>
    </section>
  );
}

export default MobileVousVousExperience;
