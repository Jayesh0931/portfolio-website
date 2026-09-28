import React, { useRef, useEffect, useState } from "react";
import BrandVector from "@/components/BrandVector";
import videoD1 from "@/imports/D1.mp4";
import videoD2 from "@/imports/D2.mp4";
import videoD3 from "@/imports/D3.mp4";
import videoD4 from "@/imports/D4.mp4";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

interface DecisionItem {
  id: string;
  tag: string;
  title: string;
  videoSrc: string;
  observation: React.ReactNode;
  decision: React.ReactNode;
  result: React.ReactNode;
}

const DECISIONS: DecisionItem[] = [
  {
    id: "decision-01",
    tag: "[ DECISION 01 ]",
    title: "One Agent Isn't Enough",
    videoSrc: videoD2,
    observation: "Real business workflows rarely belong to a single specialist.",
    decision: (
      <>
        Create <strong className="mobile-story-decision-bold">Multi-Agent Collaboration</strong>.
      </>
    ),
    result: "Specialized agents could work together toward shared goals.",
  },
  {
    id: "decision-02",
    tag: "[ DECISION 02 ]",
    title: "Knowledge ≠ Expertise",
    videoSrc: videoD1,
    observation: (
      <div className="mobile-story-decision-multiline">
        <p className="mb-2">Agents could retrieve information.</p>
        <p className="mb-2">But struggled to make professional recommendations.</p>
        <p className="mb-0">They often produced multiple possible answers instead of taking a position.</p>
      </div>
    ),
    decision: (
      <>
        Introduce a <strong className="mobile-story-decision-bold">Training Layer</strong> that allowed subject matter experts to shape behavior.
      </>
    ),
    result: "Agents evolved from information retrievers into domain-specific assistants.",
  },
  {
    id: "decision-03",
    tag: "[ DECISION 03 ]",
    title: "Discoverability Matters",
    videoSrc: videoD3,
    observation: "Creating and training agents was only useful if people could find and use them.",
    decision: (
      <>
        Introduce a <strong className="mobile-story-decision-bold">Agent Marketplace</strong>.
      </>
    ),
    result: (
      <div className="mobile-story-decision-multiline">
        <p className="mb-1">Created a lifecycle:</p>
        <p className="mobile-story-decision-bold mb-0">Create → Train → Publish → Use</p>
      </div>
    ),
  },
  {
    id: "decision-04",
    tag: "[ DECISION 04 ]",
    title: "People Don't Want Agents",
    videoSrc: videoD4,
    observation: (
      <div className="mobile-story-decision-multiline">
        <p className="mb-2">Enterprise conversations shifted.</p>
        <p className="mb-1">
          People <strong className="mobile-story-decision-bold">weren&apos;t</strong> asking:
        </p>
        <p className="mobile-story-decision-bold italic mb-2">&ldquo;How do I build agents?&rdquo;</p>
        <p className="mb-1">
          They <strong className="mobile-story-decision-bold">were</strong> asking:
        </p>
        <p className="mobile-story-decision-bold italic mb-1">&ldquo;How do I control them?&rdquo;</p>
        <p className="mobile-story-decision-bold italic mb-1">&ldquo;How do I manage spend?&rdquo;</p>
        <p className="mobile-story-decision-bold italic mb-0">&ldquo;How do I trust them?&rdquo;</p>
      </div>
    ),
    decision: (
      <>
        Pivot toward an <strong className="mobile-story-decision-bold">Enterprise Operating Layer</strong>.
      </>
    ),
    result: <span className="mobile-story-decision-bold">The Portal.</span>,
  },
];

function DecisionCard({ item }: { item: DecisionItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mobile-story-decision-card">
      {/* Micro-tag */}
      <p className="mobile-story-decision-card-tag">{item.tag}</p>

      {/* Decision Title */}
      <h3 className="mobile-story-decision-card-title">{item.title}</h3>

      {/* Video Container */}
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
          onLoadedData={() => setIsLoaded(true)}
        />
      </div>

      {/* Tap to View Button */}
      <button
        type="button"
        className="mobile-story-decision-tap-btn"
        onClick={() => setIsLightboxOpen(true)}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        <span>Tap to view</span>
      </button>

      {/* Structured Blocks: Observation, Decision, Result */}
      <div className="mobile-story-decision-blocks">
        {/* Observation */}
        <div className="mobile-story-decision-block">
          <span className="mobile-story-decision-label">Observation</span>
          <div className="mobile-story-decision-line" />
          <div className="mobile-story-decision-text">{item.observation}</div>
        </div>

        {/* Decision */}
        <div className="mobile-story-decision-block">
          <span className="mobile-story-decision-label">Decision</span>
          <div className="mobile-story-decision-line" />
          <div className="mobile-story-decision-text">{item.decision}</div>
        </div>

        {/* Result */}
        <div className="mobile-story-decision-block">
          <span className="mobile-story-decision-label">Result</span>
          <div className="mobile-story-decision-line" />
          <div className="mobile-story-decision-text">{item.result}</div>
        </div>
      </div>

      {/* Fullscreen Video Lightbox */}
      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={item.videoSrc}
        alt={`${item.title} video`}
        type="video"
      />
    </div>
  );
}

export function MobileAllyraDecisions() {
  return (
    <section id="mobile-allyra-decisions" className="mobile-story-decisions-section">
      {/* Section Header */}
      <div className="mobile-story-decisions-header">
        <div className="mobile-story-decisions-brand">
          <BrandVector theme="light" width={56} height={38} />
        </div>
        <div className="mobile-story-decisions-header-divider" />
        <div className="mobile-story-decisions-header-titles">
          <p className="mobile-story-decisions-tag">
            [ OBSERVATION - DECISION - RESULT ]
          </p>
          <h2 className="mobile-story-decisions-title">
            KEY PRODUCT<br />DECISIONS
          </h2>
        </div>
      </div>

      {/* 4 Decision Cards */}
      <div className="mobile-story-decisions-list">
        {DECISIONS.map((item) => (
          <DecisionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default MobileAllyraDecisions;

