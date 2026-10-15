import React, { useState } from "react";
import BrandVector from "@/components/BrandVector";
import imgWIDVousVous from "@/imports/WID-vousvous.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileVousVousWhatIDrove() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-vousvous-whatidrove" className="mobile-story-wid-section">
      <div className="mobile-story-wid-card">
        {/* Left Vertical Rail */}
        <div className="mobile-story-wid-rail">
          {/* Top Brand Vector Box */}
          <div className="mobile-story-wid-rail-top">
            <BrandVector theme="dark" width={34} height={22} />
          </div>

          {/* Vertical Rotated Title: WHAT I DROVE */}
          <div className="mobile-story-wid-rail-title-wrap">
            <span className="mobile-story-wid-rail-title">WHAT I DROVE</span>
          </div>

          {/* Vertical Rotated Tag: [ CONTRIBUTION ] */}
          <div className="mobile-story-wid-rail-tag-wrap">
            <span className="mobile-story-wid-rail-tag">[ CONTRIBUTION ]</span>
          </div>
        </div>

        {/* Right Content Pane */}
        <div className="mobile-story-wid-content">
          <p className="mobile-story-wid-p">
            I led the end-to-end experience for the consumer mobile application, shaping how users discover, personalise, and purchase fashion.
          </p>

          <p className="mobile-story-wid-roles">
            / Gesture-first discovery experience / Conversational AI workflows for fashion exploration / The remix interaction for personalisation / Quotation and measurement journeys / Consistent visual language across / Reusable interaction patterns for discovery, saving, and customisation
          </p>

          {/* Diagram Container with Interactive Lightbox */}
          <div
            className="mobile-story-wid-img-wrap is-interactive"
            onClick={() => setIsLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="View What I Drove graphic in fullscreen"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
          >
            <img
              src={imgWIDVousVous}
              alt="VousVous Interaction System Diagram"
              className="mobile-story-wid-img"
            />
          </div>

          {/* Tap to View Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="mobile-story-challenge-view-btn mt-3"
            aria-label="Tap to view diagram in fullscreen"
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
        src={imgWIDVousVous}
        alt="VousVous Interaction System Diagram"
        type="image"
      />
    </section>
  );
}

export default MobileVousVousWhatIDrove;
