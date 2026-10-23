import React from "react";
import BrandVector from "@/components/BrandVector";
import imgOutcomeQuoteMark from "@/imports/outcome_quote_mark.webp";

export function MobileJoonifyOutcome() {
  return (
    <section id="mobile-joonify-outcome" className="mobile-story-validation-section">
      {/* 1. Top Supertag */}
      <p className="mobile-story-validation-tag">
        <span>[ </span>
        <span className="mobile-story-validation-tag-orange">FROM ASSESSMENT TO ACTIONABLE GROWTH</span>
        <span> ]</span>
      </p>

      {/* 2. Header Box: OUTCOME + Brand Vector */}
      <div className="bg-[#fffdfa] border border-[#7b7a77] p-4 flex items-center justify-between">
        <h2 className="mobile-story-validation-title">OUTCOME</h2>
        <div className="mobile-story-validation-brand">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="bg-[#fffdfa] border-x border-b border-[#7b7a77] p-4 -mt-[1px] flex flex-col">
        {/* Intro Narrative */}
        <p className="font-outfit font-normal text-[#77695d] text-[15px] leading-[1.5] mb-5">
          Joonify brought child talent discovery, learning recommendations, and educational planning into one platform—helping parents make more informed decisions about their child&apos;s development.
        </p>

        {/* Two Metrics Cards */}
        <div className="grid grid-cols-2 border border-[#7b7a77] bg-[#fffdfa] mb-5">
          <div className="p-3.5 flex flex-col justify-between">
            <div>
              <span className="font-outfit font-black text-[34px] text-[#EE6C13] leading-none block">
                750+
              </span>
              <span className="font-outfit font-bold text-[13px] text-[#190b00] leading-snug block mt-2">
                Parents Guided
              </span>
            </div>
            <span className="font-outfit text-[11px] text-[#77695d] mt-2 block">
              Trusted by families during early rollout
            </span>
          </div>

          <div className="border-l border-[#7b7a77] p-3.5 flex flex-col justify-between">
            <div>
              <span className="font-outfit font-black text-[34px] text-[#EE6C13] leading-none block">
                30 Min
              </span>
              <span className="font-outfit font-bold text-[13px] text-[#190b00] leading-snug block mt-2">
                Discovery Assessment
              </span>
            </div>
            <span className="font-outfit text-[11px] text-[#77695d] mt-2 block">
              Engaging, non-invasive talent discovery
            </span>
          </div>
        </div>

        {/* Highlight Bar: The Connected Journey */}
        <div className="border border-[#7b7a77] bg-[#fffdfa] p-3.5 mb-5">
          <h3 className="font-outfit font-bold text-[20px] text-[#EE6C13] m-0">
            Connected Learning Journey
          </h3>
          <p className="font-outfit font-medium text-[14px] leading-snug text-[#190b00] mt-1.5 m-0">
            Understand → Discover → <span className="text-[#EE6C13] font-bold">Assess</span> → Recommend → Schedule
          </p>
        </div>

        {/* Quote / Takeaway Card */}
        <div className="bg-[#f2ede7] border-l-4 border-[#EE6C13] p-4 flex flex-col justify-between gap-3">
          <p className="font-outfit italic text-[13.5px] leading-relaxed text-[#190b00] m-0">
            Personalization becomes meaningful when parents can nurture a child&apos;s unique strengths, rather than forcing them into generic academic molds.
          </p>
          <div className="flex justify-end">
            <img
              src={imgOutcomeQuoteMark}
              alt="Quote Mark"
              className="w-[36px] h-auto opacity-75 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileJoonifyOutcome;
