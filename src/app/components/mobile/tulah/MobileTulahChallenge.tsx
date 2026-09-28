import React, { useState } from "react";
import imgTulahStoryHero from "@/imports/tulah-story-hero.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileTulahChallenge() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-tulah-challenge" className="mobile-story-challenge-section">
      {/* 1. Hero Composite Dashboard Mockup with Amber Glow */}
      <div className="mobile-story-challenge-img-container">
        <div className="mobile-tulah-challenge-glow" aria-hidden="true" />
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
          aria-label="View Tulah dashboard in horizontal fullscreen"
        >
          <img
            src={imgTulahStoryHero}
            alt="Tulah Hero Dashboard Mockup"
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
          Delivering personalized wellness wasn&apos;t the challenge. Coordinating it was. Every guest journey involved multiple consultants, diagnostics, therapies, nutrition plans, fitness programs, medications, wearable data, and operational teams working together.
        </p>

        <p className="mobile-story-challenge-p">
          Without a connected system:
        </p>

        <ul className="mobile-tulah-challenge-list">
          <li>Care teams worked in silos</li>
          <li>Recommendations became fragmented</li>
          <li>Activities were difficult to coordinate</li>
          <li>Guests struggled to understand what came next</li>
          <li>Long-term continuity of care was difficult to maintain</li>
        </ul>

        <p className="mobile-story-challenge-p">
          The opportunity wasn&apos;t to build another wellness platform.
        </p>

        <p className="mobile-story-challenge-callout">
          It was to design a unified operational system that connected specialists, operations teams, and guests through a single, end-to-end care journey.
        </p>
      </div>

      {/* Fullscreen Horizontal Lightbox Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={imgTulahStoryHero}
        alt="Tulah Hero Dashboard Mockup"
        type="image"
      />
    </section>
  );
}

export default MobileTulahChallenge;
