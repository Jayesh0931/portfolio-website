import React, { useState } from "react";
import imgVousvousStoryHero from "@/imports/vousvous-story-hero.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileVousVousChallenge() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-vousvous-challenge" className="mobile-story-challenge-section">
      {/* 1. Hero Composite Showcase Frame with Soft Cyan & Peach Glow */}
      <div className="mobile-story-challenge-img-container">
        <div
          className="mobile-story-challenge-glow"
          style={{
            background: "linear-gradient(110deg, #68C3E7 0%, #FFB86B 100%)",
            filter: "blur(60px)",
            opacity: 0.85,
          }}
          aria-hidden="true"
        />
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
          aria-label="View Vousvous hero graphic in fullscreen"
          style={{
            boxShadow: "-20px 0 45px rgba(104, 195, 231, 0.4), 20px 0 45px rgba(255, 184, 107, 0.4)",
          }}
        >
          <img
            src={imgVousvousStoryHero}
            alt="Vousvous Story Hero"
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

      {/* Fullscreen Horizontal Lightbox Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={imgVousvousStoryHero}
        alt="Vousvous Story Hero"
        type="image"
      />

      {/* 2. Section Header: THE CHALLENGE + Divider */}
      <div className="mobile-story-challenge-header">
        <h2 className="mobile-story-challenge-title">THE CHALLENGE</h2>
        <div className="mobile-story-challenge-divider" />
      </div>

      {/* 3. Narrative Content */}
      <div className="mobile-story-challenge-content">
        <p className="mobile-story-challenge-p">
          Most fashion platforms assume users know exactly what they&apos;re looking for.
        </p>

        <p className="mobile-story-challenge-p">
          In reality, <strong className="font-bold text-[#FFFDFA]">fashion shopping is often exploratory.</strong><br />
          People discover styles while browsing, save pieces they like, compare options, and gradually refine their preferences.
        </p>

        <p className="mobile-story-challenge-p">
          Traditional e-commerce patterns interrupt this process with complex filters, large product grids, and overwhelming choices.
        </p>

        <p className="mobile-story-challenge-p">
          The opportunity was to design an experience that felt less like searching a catalogue and more like discovering personal style.
        </p>

        <p className="mobile-story-challenge-callout font-outfit italic font-bold text-[#FFFDFA]">
          &quot;Discovery should feel intuitive—not exhausting.&quot;
        </p>
      </div>
    </section>
  );
}

export default MobileVousVousChallenge;
