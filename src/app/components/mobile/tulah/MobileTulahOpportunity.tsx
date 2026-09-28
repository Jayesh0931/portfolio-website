import React, { useRef, useEffect, useState } from "react";
import videoTulahOpportunity from "@/imports/tulah_opportunity.mp4";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

export function MobileTulahOpportunity() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 2;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.playbackRate = 2;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="mobile-tulah-opportunity" className="mobile-story-opportunity-section">
      {/* 1. Header Bar: THE OPPORTUNITY + Empty Right Box */}
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
          Most operational challenges weren&apos;t workflow problems—they were clarity problems.
        </p>

        <p className="mobile-story-opportunity-p">
          Guests needed to know{" "}
          <strong className="mobile-story-opportunity-strong">
            \ What happens next \ Which tasks are pending \ Where do I go
          </strong>
        </p>

        <p className="mobile-story-opportunity-p">
          Staff needed clarity on{" "}
          <strong className="mobile-story-opportunity-strong">
            \ Task ownership \ Dependencies \ Next actions
          </strong>
        </p>

        <p className="mobile-story-opportunity-p">
          Consultants also needed a structured way to combine their expertise into one personalized retreat plan.
        </p>

        <p className="mobile-story-opportunity-p">
          <strong className="mobile-story-opportunity-strong">
            This became an opportunity to design a connected operational intelligence system instead of isolated tools.
          </strong>
        </p>

        {/* Video Container */}
        <div
          className="mobile-cos-opportunity-video-wrap"
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
            src={videoTulahOpportunity}
            className="mobile-cos-opportunity-video"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => {
              setIsLoaded(true);
              if (videoRef.current) videoRef.current.playbackRate = 2;
            }}
          />
        </div>

        {/* Tap to View Button */}
        <button
          type="button"
          className="mobile-story-opportunity-tap-btn"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Tap to view video in fullscreen"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          <span>Tap to view</span>
        </button>
      </div>

      {/* Fullscreen Video Lightbox */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={videoTulahOpportunity}
        alt="Tulah Opportunity Video"
        type="video"
      />
    </section>
  );
}

export default MobileTulahOpportunity;
