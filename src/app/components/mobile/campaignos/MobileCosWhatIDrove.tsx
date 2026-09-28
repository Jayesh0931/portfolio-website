import React, { useState } from "react";
import BrandVector from "@/components/BrandVector";
import imgWIDCampaignOSMobile from "@/imports/WID-campaignos-mobile.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileCosWhatIDrove() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-cos-whatidrove" className="mobile-story-wid-section">
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
            I led the end-to-end product experience for the pilot, designing the workflows that connected campaign planning, AI-assisted campaign creation, performance monitoring and continuous optimization. My work included:
          </p>

          <p className="mobile-story-wid-roles">
            Product Strategy / Information Architecture / End-to-end user experience / AI interaction patterns / Dashboard and analytics experience / Campaign planning workflows / Design System foundations / High-Fidelity Prototypes / Interaction Design
          </p>

          {/* Diagram Container */}
          <div
            className="mobile-story-wid-img-wrap"
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
              src={imgWIDCampaignOSMobile}
              alt="Campaign OS Product Experience Diagram"
              className="mobile-story-wid-img"
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={imgWIDCampaignOSMobile}
        alt="Campaign OS Product Experience Diagram"
        type="image"
      />
    </section>
  );
}

export default MobileCosWhatIDrove;
