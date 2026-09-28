import React from "react";
import BrandVector from "@/components/BrandVector";
import imgOpportunityPhone from "@/imports/vousvous_opportunity_phone.webp";

interface DecisionItem {
  id: string;
  tag: string;
  title: string;
  observation: string;
  decision: React.ReactNode;
  resultLabel: string;
  result: React.ReactNode;
}

const DECISIONS: DecisionItem[] = [
  {
    id: "01",
    tag: "[ KEY DECISION 01 ]",
    title: "Discovery Before Search",
    observation: "Traditional fashion apps make users search, filter, and scroll before they know what they want.",
    decision: (
      <span>
        <strong className="font-bold">Make discovery the primary interaction</strong> — one design at a time, with swipe-based exploration.
      </span>
    ),
    resultLabel: "Result",
    result: (
      <strong className="font-bold">
        Fashion browsing became more intuitive, lightweight, and exploratory.
      </strong>
    )
  },
  {
    id: "02",
    tag: "[ KEY DECISION 02 ]",
    title: "Gestures Become Navigation",
    observation: "The home experience needed to feel faster and more natural than conventional catalogue browsing.",
    decision: (
      <span>
        <strong className="font-bold">Built the core experience around three simple gestures:</strong><br />
        Swipe left = Like<br />
        Swipe right = Skip<br />
        Swipe up = Explore
      </span>
    ),
    resultLabel: "Result",
    result: (
      <span>
        <strong className="font-bold">The interaction model became the navigation system itself,</strong> reducing reliance on traditional menus and filters.
      </span>
    )
  },
  {
    id: "03",
    tag: "[ KEY DECISION 03 ]",
    title: "AI as a Creative Partner",
    observation: "Finding inspiration is only the first step. Users often want to change, personalize, or recreate what they discover.",
    decision: (
      <span>
        Position AI as a <strong className="font-bold">co-creator</strong> — helping users describe ideas, generate designs, remix them, and explore variations.
      </span>
    ),
    resultLabel: "Results",
    result: (
      <span>
        The journey expanded from <strong className="font-bold">Discover → Create → Remix → Quote → Purchase</strong>, connecting inspiration directly to creation.
      </span>
    )
  },
  {
    id: "04",
    tag: "[ KEY DECISION 04 ]",
    title: "Personalise Before Purchase",
    observation: "A product page usually ends the discovery journey, but fashion often requires more personal consideration.",
    decision: (
      <span>
        Connect <strong className="font-bold">AI generation, remixing, body profile, and try-on</strong> before users commit to a purchase.
      </span>
    ),
    resultLabel: "Results",
    result: (
      <span>
        <strong className="font-bold">Personalisation became part of the purchase journey</strong>, rather than an afterthought.
      </span>
    )
  }
];

export function MobileVousVousDecisions() {
  return (
    <section id="mobile-vousvous-decisions" className="mobile-story-decisions-section px-4 py-16">
      {/* 1. Header Box: 90-degree square corners */}
      <p className="font-inter font-bold text-[12px] tracking-[0.6px] text-[#77695d] uppercase mb-2">
        [ OBSERVATION - DECISION - RESULT ]
      </p>

      <div className="bg-[#fffdfa] border border-[#7b7a77] p-4 flex items-center justify-between">
        <h2 className="font-outfit font-black text-[28px] tracking-[1px] text-[#190b00] uppercase m-0 leading-tight">
          KEY PRODUCT<br />DECISIONS
        </h2>
        <div className="shrink-0">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 2. Decision Cards Stack (Sharp 90-degree corners) */}
      <div className="flex flex-col gap-6 mt-6">
        {DECISIONS.map((d) => (
          <div key={d.id} className="bg-[#fffdfa] border border-[#7b7a77] flex flex-col">
            {/* Top Text Content */}
            <div className="p-5 flex flex-col">
              {/* Tag */}
              <p className="font-inter font-bold text-[11px] text-[#77695d] uppercase tracking-wider m-0 mb-2">
                {d.tag}
              </p>

              {/* Title */}
              <h3 className="font-outfit font-bold text-[22px] text-[#190b00] leading-tight m-0 mb-5">
                {d.title}
              </h3>

              {/* Observation */}
              <div className="mb-4">
                <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
                  Observation
                </span>
                <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
                <p className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
                  {d.observation}
                </p>
              </div>

              {/* Decision */}
              <div className="mb-4">
                <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
                  Decision
                </span>
                <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
                <div className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
                  {d.decision}
                </div>
              </div>

              {/* Result */}
              <div>
                <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
                  {d.resultLabel}
                </span>
                <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
                <div className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
                  {d.result}
                </div>
              </div>
            </div>

            {/* Bottom: Beige Mockup Panel with Phone Image */}
            <div className="bg-[#e5ddd4] border-t border-[#7b7a77] py-8 flex items-center justify-center">
              <img
                src={imgOpportunityPhone}
                alt={d.title}
                className="w-[195px] h-[405px] object-contain drop-shadow-md select-none pointer-events-none"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MobileVousVousDecisions;
