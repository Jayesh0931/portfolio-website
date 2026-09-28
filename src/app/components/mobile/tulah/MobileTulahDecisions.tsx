import React, { useRef, useEffect, useState } from "react";
import BrandVector from "@/components/BrandVector";
import videoTulahD1 from "@/imports/tulah_D1.mp4";
import videoTulahD2 from "@/imports/tulah_D2.mp4";
import videoTulahD3 from "@/imports/tulah_D3.mp4";
import videoTulahD4 from "@/imports/tulah_D4.mp4";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

interface DecisionItem {
  id: string;
  tag: string;
  title: string;
  videoSrc: string;
  observation: React.ReactNode;
  decision: React.ReactNode;
  playbackRate?: number;
}

const DECISIONS: DecisionItem[] = [
  {
    id: "tulah-decision-01",
    tag: "[ KEY DECISION 01 ]",
    title: "Design Around Roles, Not Modules",
    videoSrc: videoTulahD1,
    observation: "Every operational role had different goals, responsibilities, and context.",
    decision: (
      <>
        Designed <strong className="mobile-story-decision-bold">dedicated workbenches tailored to each team&apos;s workflow</strong> instead of one generic admin interface.
      </>
    ),
  },
  {
    id: "tulah-decision-02",
    tag: "[ KEY DECISION 02 ]",
    title: "Hide Operational Complexity From Guests",
    videoSrc: videoTulahD2,
    observation: "Guests needed clarity throughout their wellness journey—not visibility into operational processes.",
    decision: (
      <>
        Surfaced <strong className="mobile-story-decision-bold">only relevant information</strong> at each stage while keeping scheduling &amp; coordination within staff workspaces.
      </>
    ),
    playbackRate: 2,
  },
  {
    id: "tulah-decision-03",
    tag: "[ KEY DECISION 03 ]",
    title: "Standardize Multidisciplinary Care",
    videoSrc: videoTulahD3,
    observation: "Each wellness specialist worked differently, making it difficult to combine recommendations into one retreat plan.",
    decision: (
      <>
        Created a <strong className="mobile-story-decision-bold">shared care planning framework</strong> that enabled Medical, Ayurveda, Nutrition, Fitness, Yoga, and Diagnostics teams to contribute through a consistent structure.
      </>
    ),
    playbackRate: 2,
  },
  {
    id: "tulah-decision-04",
    tag: "[ KEY DECISION 04 ]",
    title: "Design Beyond The Retreat",
    videoSrc: videoTulahD4,
    observation: "Wellness outcomes depend on habits after guests leave, not just during their stay.",
    decision: (
      <>
        Extended the experience into a <strong className="mobile-story-decision-bold">dedicated home care platform</strong> supporting routines, consultations, nutrition, activity tracking, and continuous follow-ups.
      </>
    ),
    playbackRate: 2,
  },
];

function DecisionCard({ item }: { item: DecisionItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (item.playbackRate && item.playbackRate !== 1) {
      video.playbackRate = item.playbackRate;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (item.playbackRate && item.playbackRate !== 1) {
            video.playbackRate = item.playbackRate;
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [item.playbackRate]);

  return (
    <div className="mobile-story-decision-card">
      {/* Micro-tag */}
      <p className="mobile-story-decision-card-tag">{item.tag}</p>

      {/* Decision Title */}
      <h3 className="mobile-story-decision-card-title">{item.title}</h3>

      {/* Video Container with Amber Glow & Shimmer */}
      <div
        className="mobile-story-decision-video-wrap"
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Preview ${item.title} video in fullscreen`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
      >
        <div className="mobile-story-decision-glow" aria-hidden="true" />
        {!isLoaded && (
          <div className="mobile-story-decision-video-skeleton skeleton-shimmer" />
        )}
        <video
          ref={videoRef}
          src={item.videoSrc}
          className="mobile-story-decision-video"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => {
            setIsLoaded(true);
            if (videoRef.current && item.playbackRate) {
              videoRef.current.playbackRate = item.playbackRate;
            }
          }}
        />
      </div>

      {/* Tap to View Button */}
      <button
        type="button"
        className="mobile-story-decision-tap-btn"
        onClick={() => setIsLightboxOpen(true)}
        aria-label="Tap to view video in fullscreen"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        <span>Tap to view</span>
      </button>

      {/* Structured Blocks: Observation & Decision */}
      <div className="mobile-story-decision-blocks">
        <div className="mobile-story-decision-block">
          <span className="mobile-story-decision-label">Observation</span>
          <div className="mobile-story-decision-line" />
          <div className="mobile-story-decision-text">{item.observation}</div>
        </div>

        <div className="mobile-story-decision-block">
          <span className="mobile-story-decision-label">Decision</span>
          <div className="mobile-story-decision-line" />
          <div className="mobile-story-decision-text">{item.decision}</div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={item.videoSrc}
        alt={item.title}
        type="video"
      />
    </div>
  );
}

interface MobileTulahDecisionsProps {
  isDark?: boolean;
}

export function MobileTulahDecisions({ isDark = true }: MobileTulahDecisionsProps) {
  return (
    <section id="mobile-tulah-decisions" className="mobile-story-decisions-section">
      {/* Header Row: Brand Vector + Divider + Titles */}
      <div className="mobile-story-decisions-header">
        <div className="mobile-story-decisions-brand">
          <BrandVector theme={isDark ? "light" : "dark"} width={56} height={38} />
        </div>
        <div className="mobile-story-decisions-header-divider" />
        <div className="mobile-story-decisions-header-titles">
          <p className="mobile-story-decisions-tag">[ OBSERVATION - DECISION - RESULT ]</p>
          <h2 className="mobile-story-decisions-title">
            KEY PRODUCT<br />DECISIONS
          </h2>
        </div>
      </div>

      {/* 4 Stacked Bento Decision Cards */}
      <div className="mobile-story-decisions-list">
        {DECISIONS.map((item) => (
          <DecisionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default MobileTulahDecisions;
