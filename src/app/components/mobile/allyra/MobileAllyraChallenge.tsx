import React, { useState } from "react";
import imgAllyraStoryHero from "@/imports/allyra_story_hero.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileAllyraChallenge() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-allyra-challenge" className="mobile-story-challenge-section">
      {/* 1. Hero Composite Image with Violet Glow */}
      <div className="mobile-story-challenge-img-container">
        <div className="mobile-story-challenge-glow" aria-hidden="true" />
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
          aria-label="View evolution timeline graphic in horizontal fullscreen"
        >
          <img
            src={imgAllyraStoryHero}
            alt="Evolution across Alpha, Beta and Production (2024-2026)"
            className="mobile-story-challenge-img"
          />
        </div>

        {/* Small copy 'Tap to view' just below the image not on it */}
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

      {/* Horizontal Fullscreen Lightbox Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={imgAllyraStoryHero}
        alt="Evolution across Alpha, Beta and Production (2024-2026)"
      />

      {/* 2. Section Title and Divider */}
      <div className="mobile-story-challenge-header">
        <h2 className="mobile-story-challenge-title">THE CHALLENGE</h2>
        <div className="mobile-story-challenge-divider" />
      </div>

      {/* 3. Narrative Copy and Bullet List */}
      <div className="mobile-story-challenge-body">
        <p className="mobile-story-challenge-p">
          In late 2024, the AI industry was obsessed with models.
          <br />
          The real challenge wasn't access to AI.
        </p>

        <p className="mobile-story-challenge-p">
          The challenge was turning AI into something businesses could actually use. Building an AI agent required:
        </p>

        <ul className="mobile-story-challenge-list">
          <li>Prompt engineering</li>
          <li>Knowledge systems</li>
          <li>APIs</li>
          <li>Integrations</li>
          <li>Continuous maintenance</li>
        </ul>

        <p className="mobile-story-challenge-p">
          The people who understood business problems often couldn't build AI solutions themselves.
          <br />
          That gap became the opportunity.
        </p>
      </div>
    </section>
  );
}

export default MobileAllyraChallenge;
