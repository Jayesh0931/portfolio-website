import React, { useState } from "react";
import BrandVector from "@/components/BrandVector";
import imgWIDAllyraMobile from "@/imports/WID-allyra-mobile.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileAllyraWhatIDrove() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-allyra-what-i-drove" className="mobile-story-wid-section">
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
          {/* Narrative Copy */}
          <p className="mobile-story-wid-p">
            While leading product experience, my contribution extended beyond UX design. I worked at the intersection of market signals, business strategy and product execution. My role included:
          </p>

          <p className="mobile-story-wid-roles">
            Product Strategy / Product Definition / Feature Prioritization / Human-AI Interaction Design / Enterprise Workflow Design / Stakeholder Alignment
          </p>

          <p className="mobile-story-wid-p">
            Across the project I helped translate emerging AI capabilities into products people could actually use.
          </p>

          {/* Visual Diagram: WID-allyra-mobile.webp */}
          <div 
            className="mobile-story-wid-img-wrap"
            onClick={() => setIsLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="View contribution diagram in fullscreen"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
          >
            <img
              src={imgWIDAllyraMobile}
              alt="What I Drove Diagram: Market Signals, Business Strategy, Product Decisions, User Experience"
              className="mobile-story-wid-img"
            />
          </div>

          {/* Small copy 'Tap to view' just below the image not on it */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="mobile-story-wid-view-btn"
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

      {/* Fullscreen Image Lightbox Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={imgWIDAllyraMobile}
        alt="What I Drove Diagram"
      />
    </section>
  );
}

export default MobileAllyraWhatIDrove;
