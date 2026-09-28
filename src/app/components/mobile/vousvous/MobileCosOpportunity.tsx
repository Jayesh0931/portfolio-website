import React from "react";
import imgVousvousOpportunity from "@/imports/vousvous-opportunity.webp";

export function MobileCosOpportunity() {
  return (
    <section id="mobile-cos-opportunity" className="mobile-story-opportunity-section">
      {/* 1. Header Bar: THE OPPORTUNITY + Empty Right Box */}
      <div className="mobile-story-opportunity-header-bar">
        <div className="mobile-story-opportunity-header-left">
          <h2 className="mobile-story-opportunity-title">THE OPPORTUNITY</h2>
        </div>
        <div className="mobile-story-opportunity-header-right" aria-hidden="true" />
      </div>

      {/* 2. Main Content Card */}
      <div className="mobile-story-opportunity-card">
        {/* Narrative Copy */}
        <p className="mobile-story-opportunity-p">
          Rather than redesigning fashion shopping, the goal was to rethink how people discover, express, and personalize fashion.
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <p className="mobile-story-opportunity-p mb-0">
            <strong>/ Discover naturally</strong> — One design at a time, using simple gestures instead of endless scrolling.
          </p>

          <p className="mobile-story-opportunity-p mb-0">
            <strong>/ Express intent conversationally</strong> — Describe what you want and let AI turn intent into inspiration.
          </p>

          <p className="mobile-story-opportunity-p mb-0">
            <strong>/ Personalize before purchasing</strong> — Remix, refine, and customize designs before moving to quote and purchase.
          </p>
        </div>

        {/* Opportunity Visual Frame */}
        <div className="mt-8 flex justify-center">
          <img
            src={imgVousvousOpportunity}
            alt="Vousvous Opportunity Visual"
            className="w-full max-w-[340px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default MobileCosOpportunity;
