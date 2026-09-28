import React from "react";

export function MobileVousVousWhatIDrove() {
  return (
    <section id="mobile-vousvous-wid" className="mobile-story-wid-section">
      {/* 1. Supertag */}
      <p className="mobile-story-wid-tag">
        <span>[ </span>
        <span className="mobile-story-wid-tag-orange">WHAT I DROVE</span>
        <span> ]</span>
      </p>

      {/* 2. Headline */}
      <h2 className="mobile-story-wid-title">
        Orchestrating the Multimodal Discovery Architecture
      </h2>

      {/* 3. Description & Contributions */}
      <div className="mobile-story-wid-desc">
        <p className="mb-3 text-[#77695d]">
          As Product Lead and AI Product Designer, I directed the product definition, interaction architecture, and interface systems:
        </p>
        <p className="font-outfit font-bold text-[#190b00] text-[16px] leading-[1.4] m-0">
          Product Vision & Strategy / Conversational Prompt Interface / Visual Style Synthesis Engine / Dynamic Wardrobe State Management / Interactive Mobile Prototypes
        </p>
      </div>

      {/* 4. Circular System Framework Diagram */}
      <div className="mt-8 p-6 bg-[#fffdfa] border border-[#7b7a77] rounded-[16px] flex flex-col items-center justify-center">
        <div className="relative w-[260px] h-[260px] flex items-center justify-center">
          {/* Dashed outer orbit circle */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#7b7a77]/50" />
          
          {/* Central Orange Focal Badge */}
          <div className="w-[140px] h-[140px] rounded-full bg-[#EE6C13] text-[#FFFDFA] flex flex-col items-center justify-center text-center p-3 shadow-lg z-10">
            <span className="font-outfit font-black text-[13px] tracking-[0.5px] uppercase leading-tight">
              Declarative Wardrobe Engine
            </span>
          </div>

          {/* Orbiting Satellite Labels */}
          <div className="absolute top-2 bg-[#fffdfa] border border-[#7b7a77] px-2.5 py-1 rounded-full text-[10px] font-inter font-bold text-[#77695d]">
            Visual AI
          </div>
          <div className="absolute bottom-2 bg-[#fffdfa] border border-[#7b7a77] px-2.5 py-1 rounded-full text-[10px] font-inter font-bold text-[#77695d]">
            Relational Feedback
          </div>
          <div className="absolute left-[-8px] bg-[#fffdfa] border border-[#7b7a77] px-2 py-1 rounded-full text-[10px] font-inter font-bold text-[#77695d]">
            Mood
          </div>
          <div className="absolute right-[-8px] bg-[#fffdfa] border border-[#7b7a77] px-2 py-1 rounded-full text-[10px] font-inter font-bold text-[#77695d]">
            Fit
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileVousVousWhatIDrove;
