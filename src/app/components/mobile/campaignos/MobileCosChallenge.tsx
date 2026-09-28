import React, { useState } from "react";
import imgCosStoryHero from "@/imports/cos-story-hero.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileCosChallenge() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-cos-challenge" className="mobile-story-challenge-section">
      {/* 1. Hero Composite Dashboard Mockup with Vibrant Ambient Glow */}
      <div className="mobile-story-challenge-img-container">
        <div className="mobile-cos-challenge-glow" aria-hidden="true" />
        <div
          className="mobile-story-challenge-img-frame is-interactive"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
          aria-label="View Campaign OS dashboard in horizontal fullscreen"
        >
          <img
            src={imgCosStoryHero}
            alt="Campaign OS Dashboard Mockup"
            className="mobile-story-challenge-img"
          />
        </div>

        {/* 'Tap to view' Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="mobile-story-challenge-view-btn"
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

      {/* 2. Section Header: THE CHALLENGE + Divider */}
      <div className="mobile-story-challenge-header">
        <h2 className="mobile-story-challenge-title">THE CHALLENGE</h2>
        <div className="mobile-story-challenge-divider" />
      </div>

      {/* 3. Narrative Content */}
      <div className="mobile-story-challenge-content">
        <p className="mobile-story-challenge-p">
          Marketing teams rarely struggle with a lack of tools—they struggle with fragmented workflows.
        </p>

        <p className="mobile-story-challenge-p">
          Strategy lives in documents, creatives in design tools, campaigns inside ad managers and performance inside analytics dashboards. AI can generate content, but it rarely understands the complete lifecycle of a campaign.
        </p>

        <p className="mobile-story-challenge-p">
          The opportunity wasn&apos;t to build another AI assistant.
        </p>

        <p className="mobile-story-challenge-callout">
          It was to design an AI-native workspace that could support marketers before, during and after a campaign goes live.
        </p>
      </div>

      {/* Fullscreen Horizontal Lightbox Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={imgCosStoryHero}
        alt="Campaign OS Dashboard Mockup"
        type="image"
      />
    </section>
  );
}

export default MobileCosChallenge;
