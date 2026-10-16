import React, { useState } from "react";
import imgJoonifyBanner from "@/imports/joonify_banner.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileJoonifyChallenge() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section id="mobile-joonify-challenge" className="mobile-story-challenge-section">
      {/* 1. Hero Composite Showcase Frame with Soft Mint & Blue Glow */}
      <div className="mobile-story-challenge-img-container">
        <div
          className="mobile-story-challenge-glow"
          style={{
            background: "linear-gradient(110deg, #73F9C9 0%, #335FE6 100%)",
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
          aria-label="View Joonify platform overview in fullscreen"
          style={{
            boxShadow: "-20px 0 45px rgba(115, 249, 201, 0.35), 20px 0 45px rgba(51, 95, 230, 0.35)",
            backgroundColor: "#1F2231",
          }}
        >
          <img
            src={imgJoonifyBanner}
            alt="Joonify Platform Overview"
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
        imageSrc={imgJoonifyBanner}
        imageAlt="Joonify Platform Overview"
      />

      {/* 2. Section Header: THE CHALLENGE + Divider */}
      <div className="mobile-story-challenge-header">
        <h2 className="mobile-story-challenge-title">THE CHALLENGE</h2>
        <div className="mobile-story-challenge-divider" />
      </div>

      {/* 3. Narrative Content */}
      <div className="mobile-story-challenge-content">
        <p className="mobile-story-challenge-p">
          Every child has different strengths, interests, and learning needs.
        </p>

        <p className="mobile-story-challenge-p">
          In reality, <strong className="font-bold text-[#FFFDFA]">early childhood education is often fragmented and anxiety-driven.</strong><br />
          Parents struggle to understand their child&apos;s natural tendencies, while generic tutoring programs treat all children identically.
        </p>

        <p className="mobile-story-challenge-p">
          Joonify aimed to help parents understand these differences through an intelligent talent discovery assessment and connect them with relevant, personalized learning resources.
        </p>

        <p className="mobile-story-challenge-callout font-outfit italic font-bold text-[#FFFDFA]">
          &quot;When parents understand how children learn, better decisions naturally follow.&quot;
        </p>
      </div>
    </section>
  );
}

export default MobileJoonifyChallenge;
