import React, { useRef, useEffect, useState } from "react";
import BrandVector from "@/components/BrandVector";
import videoCosCraft1 from "@/imports/cos-craft-1.mp4";
import videoCosCraft2 from "@/imports/cos-craft-2.mp4";
import videoCosCraft3 from "@/imports/cos-craft-3.mp4";
import videoCosCraft4 from "@/imports/cos-craft-4.mp4";
import videoCosCraft5 from "@/imports/cos-craft-5.mp4";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

interface CraftItem {
  id: string;
  tag: string;
  title: string;
  videoSrc: string;
  description: string;
  playbackRate?: number;
}

const CRAFT_ITEMS: CraftItem[] = [
  {
    id: "cos-craft-1",
    tag: "[ CRAFT 01 ]",
    title: "Contextual Prompt Suggestions",
    videoSrc: videoCosCraft1,
    description:
      "Contextual prompt suggestions guiding campaign strategy and multi-step AI execution.",
  },
  {
    id: "cos-craft-2",
    tag: "[ CRAFT 02 ]",
    title: "Multi-Channel Deployment",
    videoSrc: videoCosCraft2,
    description:
      "Real-time multi-channel campaign deployment with live performance telemetry.",
  },
  {
    id: "cos-craft-3",
    tag: "[ CRAFT 03 ]",
    title: "Interactive Workspace Canvas",
    videoSrc: videoCosCraft3,
    description:
      "Interactive workspace canvas for exploring, remixing, and refining AI campaign assets.",
  },
  {
    id: "cos-craft-4",
    tag: "[ CRAFT 04 ]",
    title: "Conversational Analytics",
    videoSrc: videoCosCraft4,
    description:
      "Conversational analytics interface turning complex data dashboards into actionable narrative insights.",
  },
  {
    id: "cos-craft-5",
    tag: "[ CRAFT 05 ]",
    title: "Autonomous Monitoring",
    videoSrc: videoCosCraft5,
    description:
      "Autonomous monitoring and intelligent audience segmentation with human-in-the-loop controls.",
    playbackRate: 1.25,
  },
];

function CraftVideoCard({ item }: { item: CraftItem }) {
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
    <div className="mobile-story-craft-card">
      <div className="mobile-story-craft-card-header">
        <span className="mobile-story-craft-card-tag">{item.tag}</span>
        <h3 className="mobile-story-craft-card-title">{item.title}</h3>
      </div>

      <p className="mobile-story-craft-card-desc">{item.description}</p>

      {/* Video Preview Container */}
      <div
        className="mobile-story-craft-video-wrap"
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Preview ${item.title} in fullscreen`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
      >
        {!isLoaded && (
          <div className="mobile-story-craft-skeleton skeleton-shimmer" />
        )}
        <video
          ref={videoRef}
          src={item.videoSrc}
          className="mobile-story-craft-video"
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
        className="mobile-story-craft-tap-btn"
        onClick={() => setIsLightboxOpen(true)}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        <span>Tap to view</span>
      </button>

      {/* Fullscreen Lightbox */}
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

export function MobileCosCraft() {
  return (
    <section id="mobile-cos-craft" className="mobile-story-craft-section">
      {/* 1. Direct Editorial Display Header */}
      <div className="mobile-story-craft-header">
        <div className="mobile-story-craft-header-left">
          <p className="mobile-story-craft-supertag">[ INTERACTION &amp; CRAFT ]</p>
          <div className="mobile-story-craft-titles">
            <h2 className="mobile-story-craft-title-stroke">CRAFTING</h2>
            <h2 className="mobile-story-craft-title-solid">THE EXPERIENCE</h2>
          </div>
        </div>
        <div className="mobile-story-craft-brand" aria-hidden="true">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 2. Architectural Intro Callout Box */}
      <div className="mobile-story-craft-intro-box">
        <p className="mobile-story-craft-intro-p">
          Beyond the primary workflows, the product relied heavily on interaction design to make AI feel responsive without becoming overwhelming.
        </p>
        <p className="mobile-story-craft-intro-bold">
          Motion / Progressive Disclosure / Contextual Side Panels / Conversational Transitions{" "}
          <span className="mobile-story-craft-intro-light">were designed to reduce cognitive load while maintaining transparency.</span>
        </p>
        <p className="mobile-story-craft-intro-hint">
          Tap any video to view interactions.
        </p>
      </div>

      {/* 3. 5 Stacked Craft Video Cards */}
      <div className="mobile-story-craft-list">
        {CRAFT_ITEMS.map((item) => (
          <CraftVideoCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default MobileCosCraft;
