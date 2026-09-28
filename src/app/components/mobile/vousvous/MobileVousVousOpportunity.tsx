import React from "react";

export function MobileVousVousOpportunity() {
  return (
    <section id="mobile-vousvous-opportunity" className="mobile-story-opportunity-section">
      {/* 1. Supertag */}
      <p className="mobile-story-opportunity-tag">
        <span>[ </span>
        <span className="mobile-story-opportunity-tag-orange">THE OPPORTUNITY</span>
        <span> ]</span>
      </p>

      {/* 2. Headline */}
      <h2 className="mobile-story-opportunity-title">
        From Search Queries to Declarative Wardrobes
      </h2>

      {/* 3. Narrative Copy */}
      <div className="mobile-story-opportunity-copy">
        <p>
          What if instead of hunting through infinite catalogs, people could declare how they want to feel, what context they are dressing for, and let generative AI curate and synthesize complete, cohesive outfits?
        </p>
        <p>
          By bridging visual AI understanding with interactive conversational feedback loops, VousVous transforms discovery from transactional filtering into a collaborative styling session.
        </p>
      </div>

      {/* 4. Prototype Device Showcase Frame */}
      <div className="mt-8 flex justify-center">
        <div className="w-[280px] h-[560px] border-[6px] border-[#190b00] rounded-[44px] bg-[#fbf7ee] shadow-xl overflow-hidden relative flex flex-col items-center justify-between p-4">
          {/* Dynamic Island / Speaker notch */}
          <div className="w-[90px] h-[22px] bg-[#190b00] rounded-full mx-auto" />
          
          {/* Inner Mockup Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
            <span className="text-[#EE6C13] text-[32px] mb-3">✦</span>
            <p className="font-outfit font-bold text-[18px] text-[#190b00] m-0">Declarative Canvas</p>
            <p className="font-outfit text-[12px] text-[#77695d] mt-2 m-0 leading-[1.4]">
              Multimodal style cues, mood-driven composition, and adaptive styling suggestions.
            </p>
          </div>

          {/* Home indicator bar */}
          <div className="w-[110px] h-[4px] bg-[#7b7a77]/60 rounded-full mb-1" />
        </div>
      </div>
    </section>
  );
}

export default MobileVousVousOpportunity;
