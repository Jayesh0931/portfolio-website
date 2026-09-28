import React from "react";
import BrandVector from "@/components/BrandVector";
import imgOutcomeQuoteMark from "@/imports/outcome_quote_mark.webp";

export function MobileCosValidation() {
  return (
    <section id="mobile-cos-validation" className="mobile-story-validation-section">
      {/* 1. Top Supertag */}
      <p className="mobile-story-validation-tag">
        <span>[ </span>
        <span className="mobile-story-validation-tag-orange">FROM CONCEPT TO LIVE PRODUCT</span>
        <span> ]</span>
      </p>

      {/* 2. Header Box: OUTCOME + Brand Vector */}
      <div className="bg-[#fffdfa] border border-[#7b7a77] p-4 flex items-center justify-between">
        <h2 className="mobile-story-validation-title">OUTCOME</h2>
        <div className="mobile-story-validation-brand">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 3. Main Content Container (90-degree square corners, seamless -mt-[1px] connection) */}
      <div className="bg-[#fffdfa] border-x border-b border-[#7b7a77] p-4 -mt-[1px] flex flex-col">
        {/* Intro Narrative */}
        <p className="font-outfit font-normal text-[#77695d] text-[15px] leading-[1.5] mb-5">
          VousVous moved beyond a conventional fashion-commerce experience, creating a live mobile product built around discovery, personalization, and AI-assisted creation.
        </p>

        {/* Two Metrics Cards (Sharp 90-degree borders) */}
        <div className="grid grid-cols-2 border border-[#7b7a77] bg-[#fffdfa] mb-5">
          <div className="p-3.5 flex flex-col justify-between">
            <div>
              <span className="font-outfit font-black text-[34px] text-[#EE6C13] leading-none block">
                100+
              </span>
              <span className="font-outfit font-bold text-[13px] text-[#190b00] leading-snug block mt-2">
                Pilot Users
              </span>
            </div>
            <span className="font-outfit text-[11px] text-[#77695d] mt-2 block">
              Exclusive access to the first live experience
            </span>
          </div>

          <div className="border-l border-[#7b7a77] p-3.5 flex flex-col justify-between">
            <div>
              <span className="font-outfit font-black text-[34px] text-[#EE6C13] leading-none block">
                3
              </span>
              <span className="font-outfit font-bold text-[13px] text-[#190b00] leading-snug block mt-2">
                Core Gestures
              </span>
            </div>
            <span className="font-outfit text-[11px] text-[#77695d] mt-2 block">
              Like · Skip · Explore
            </span>
          </div>
        </div>

        {/* Highlight Bar: AI-powered journey (Sharp 90-degree border) */}
        <div className="border border-[#7b7a77] bg-[#fffdfa] p-3.5 mb-5">
          <h3 className="font-outfit font-bold text-[20px] text-[#EE6C13] m-0">
            AI-powered journey
          </h3>
          <p className="font-outfit font-medium text-[14px] leading-snug text-[#190b00] mt-1.5 m-0">
            Discover → Create → <span className="text-[#EE6C13] font-bold">Remix</span> → Quote → Purchase
          </p>
        </div>

        {/* Quote / Takeaway Card (Sharp 90-degree box with left orange bar) */}
        <div className="bg-[#f2ede7] border-l-4 border-[#EE6C13] p-4 flex flex-col justify-between gap-3">
          <p className="font-outfit italic text-[13.5px] leading-relaxed text-[#190b00] m-0">
            The experience demonstrated how{" "}
            <strong className="font-bold">AI can become part of the </strong>
            <strong className="font-bold text-[#EE6C13]">interaction model</strong>
            <strong className="font-bold">—not just another feature,</strong>{" "}
            turning fashion discovery from a catalogue-browsing task into a more personal, exploratory experience.
          </p>
          <div className="flex justify-end">
            <img
              src={imgOutcomeQuoteMark}
              alt="Quote"
              className="w-[44px] h-[34px] object-contain opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileCosValidation;
