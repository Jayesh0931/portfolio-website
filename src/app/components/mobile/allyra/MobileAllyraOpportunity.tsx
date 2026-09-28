import React, { useRef, useEffect, useState } from "react";
import videoOpportunity from "@/imports/Opportunity Video.mp4";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileAllyraOpportunity() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Auto-play / pause when video enters/leaves viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="mobile-allyra-opportunity" className="mobile-story-opportunity-section">
      {/* 1. Top Header Bar: THE OPPORTUNITY + Empty Right Box */}
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
          My first belief was simple, Specialized AI would outperform general-purpose AI. Instead of expecting one model to do everything, we explored whether domain-specific agents could deliver more reliable outcomes.
        </p>

        <p className="mobile-story-opportunity-p">
          This led to our first product direction:
          <br />
          <strong className="mobile-story-opportunity-strong">
            Make agent creation accessible to non-technical users.
          </strong>
        </p>

        {/* Video Container */}
        <div 
          className="mobile-story-opportunity-video-wrap"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Play opportunity video in fullscreen"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
        >
          {!isLoaded && (
            <div className="mobile-story-opportunity-video-skeleton skeleton-shimmer" />
          )}
          <video
            ref={videoRef}
            src={videoOpportunity}
            className="mobile-story-opportunity-video"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsLoaded(true)}
          />
        </div>

        {/* Small copy 'Tap to view' just below the video not on it */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="mobile-story-opportunity-view-btn"
          aria-label="Tap to view video in fullscreen"
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

      {/* Fullscreen Video Lightbox Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={videoOpportunity}
        alt="The Opportunity Video"
        type="video"
      />
    </section>
  );
}

export default MobileAllyraOpportunity;
