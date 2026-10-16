import React, { useState } from "react";
import imgJoonifySS6 from "@/imports/joonify_SS6.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileJoonifyOpportunity() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-joonify-opportunity" className="mobile-story-opportunity-section">
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
          Rather than disconnected educational tools, the experience connected three key parts of a child&apos;s learning journey:
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <p className="mobile-story-opportunity-p mb-0">
            <strong>/ Understand</strong> — Build a comprehensive child profile covering academic information, interests, skills, and personality.
          </p>

          <p className="mobile-story-opportunity-p mb-0">
            <strong>/ Discover</strong> — Use interactive assessments to identify natural strengths, cognitive styles, and learning needs.
          </p>

          <p className="mobile-story-opportunity-p mb-0">
            <strong>/ Grow</strong> — Explore tailored courses, track progress, and organize personalized learning schedules.
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
            src={imgJoonifySS6}
            alt="Joonify Course Discovery Visual"
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

      {/* Lightbox Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageSrc={imgJoonifySS6}
        imageAlt="Joonify Course Discovery Visual"
      />
    </section>
  );
}

export default MobileJoonifyOpportunity;
