import React, { useState } from "react";
import BrandVector from "@/components/BrandVector";
import imgWIDTulahMobile from "@/imports/WID-tulah-mobile.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileTulahWhatIDrove() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-tulah-whatidrove" className="mobile-story-wid-section">
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
            I led the end-to-end product experience across the entire wellness journey—from pre-arrival onboarding and multidisciplinary care planning to retreat operations and post-retreat home care. My work unified guests, specialists, and operational teams into a single coordinated care ecosystem.
          </p>

          <p className="mobile-story-wid-roles">
            Product Strategy / Information Architecture / End-to-end Experience / Operational Workflow Design / Role-based Systems / Care Planning Framework / Mobile Experience / Design System / Interaction Design
          </p>

          {/* Diagram Container */}
          <div
            className="mobile-story-wid-img-wrap"
            onClick={() => setIsLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="View Tulah Care Orchestration Diagram in fullscreen"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
          >
            <img
              src={imgWIDTulahMobile}
              alt="Tulah Care Orchestration Diagram"
              className="mobile-story-wid-img"
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={imgWIDTulahMobile}
        alt="Tulah Care Orchestration Diagram"
        type="image"
      />
    </section>
  );
}

export default MobileTulahWhatIDrove;
