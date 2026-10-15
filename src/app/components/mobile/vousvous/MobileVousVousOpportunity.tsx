import React, { useState } from "react";
import imgVousvousOpportunity from "@/imports/vousvous-opportunity.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileVousVousOpportunity() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-vousvous-opportunity" className="mobile-story-opportunity-section">
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

        {/* Opportunity Visual Frame with Interactive Lightbox */}
        <div
          className="mt-8 flex flex-col items-center justify-center cursor-pointer is-interactive"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
          aria-label="View Opportunity visual in fullscreen"
        >
          <img
            src={imgVousvousOpportunity}
            alt="Vousvous Opportunity Visual"
            className="w-full max-w-[340px] h-auto object-contain rounded-[8px]"
          />

          <button
            type="button"
            className="mobile-story-challenge-view-btn mt-3"
            aria-label="Tap to view graphic in fullscreen"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span>Tap to view</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Horizontal Lightbox Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={imgVousvousOpportunity}
        alt="Vousvous Opportunity Visual"
        type="image"
      />
    </section>
  );
}

export default MobileVousVousOpportunity;
