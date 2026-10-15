import React, { useRef, useEffect, useState } from "react";
import BrandVector from "@/components/BrandVector";
import videoVousVousD1 from "@/imports/vousvous_D1.mp4";
import videoVousVousD2 from "@/imports/vousvous_D2.mp4";
import videoVousVousD3 from "@/imports/vousvous_D3.mp4";
import videoVousVousD4 from "@/imports/vousvous_D4.mp4";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

interface DecisionItem {
  id: string;
  tag: string;
  title: string;
  observation: string;
  decision: React.ReactNode;
  resultLabel: string;
  result: React.ReactNode;
  videoSrc: string;
  playbackRate?: number;
}

const DECISIONS: DecisionItem[] = [
  {
    id: "01",
    tag: "[ KEY DECISION 01 ]",
    title: "Discovery Before Search",
    observation: "Traditional fashion apps make users search, filter, and scroll before they know what they want.",
    decision: (
      <span>
        <strong className="font-bold">Make discovery the primary interaction</strong> — one design at a time, with swipe-based exploration.
      </span>
    ),
    resultLabel: "Result",
    result: (
      <strong className="font-bold">
        Fashion browsing became more intuitive, lightweight, and exploratory.
      </strong>
    ),
    videoSrc: videoVousVousD1,
  },
  {
    id: "02",
    tag: "[ KEY DECISION 02 ]",
    title: "Gestures Become Navigation",
    observation: "The home experience needed to feel faster and more natural than conventional catalogue browsing.",
    decision: (
      <span>
        <strong className="font-bold">Built the core experience around three simple gestures:</strong><br />
        Swipe left = Like<br />
        Swipe right = Skip<br />
        Swipe up = Explore
      </span>
    ),
    resultLabel: "Result",
    result: (
      <span>
        <strong className="font-bold">The interaction model became the navigation system itself,</strong> reducing reliance on traditional menus and filters.
      </span>
    ),
    videoSrc: videoVousVousD2,
  },
  {
    id: "03",
    tag: "[ KEY DECISION 03 ]",
    title: "AI as a Creative Partner",
    observation: "Finding inspiration is only the first step. Users often want to change, personalize, or recreate what they discover.",
    decision: (
      <span>
        Position AI as a <strong className="font-bold">co-creator</strong> — helping users describe ideas, generate designs, remix them, and explore variations.
      </span>
    ),
    resultLabel: "Results",
    result: (
      <span>
        The journey expanded from <strong className="font-bold">Discover → Create → Remix → Quote → Purchase</strong>, connecting inspiration directly to creation.
      </span>
    ),
    videoSrc: videoVousVousD3,
    playbackRate: 2,
  },
  {
    id: "04",
    tag: "[ KEY DECISION 04 ]",
    title: "Personalise Before Purchase",
    observation: "A product page usually ends the discovery journey, but fashion often requires more personal consideration.",
    decision: (
      <span>
        Connect <strong className="font-bold">AI generation, remixing, body profile, and try-on</strong> before users commit to a purchase.
      </span>
    ),
    resultLabel: "Results",
    result: (
      <span>
        <strong className="font-bold">Personalisation became part of the purchase journey</strong>, rather than an afterthought.
      </span>
    ),
    videoSrc: videoVousVousD4,
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
    <div className="bg-[#fffdfa] border border-[#7b7a77] flex flex-col">
      {/* Top Text Content */}
      <div className="p-5 flex flex-col">
        {/* Tag */}
        <p className="font-inter font-bold text-[11px] text-[#EE6C13] uppercase tracking-wider m-0 mb-2">
          {item.tag}
        </p>

        {/* Title */}
        <h3 className="font-outfit font-bold text-[22px] text-[#190b00] leading-tight m-0 mb-5">
          {item.title}
        </h3>

        {/* Observation */}
        <div className="mb-4">
          <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
            Observation
          </span>
          <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
          <p className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
            {item.observation}
          </p>
        </div>

        {/* Decision */}
        <div className="mb-4">
          <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
            Decision
          </span>
          <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
          <div className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
            {item.decision}
          </div>
        </div>

        {/* Result */}
        <div>
          <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
            {item.resultLabel}
          </span>
          <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
          <div className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
            {item.result}
          </div>
        </div>
      </div>

      {/* Bottom: Beige Mockup Panel with Viewport Video + Lightbox */}
      <div
        className="bg-[#e0d7cd] border-t border-[#7b7a77] flex flex-col items-center justify-center overflow-hidden cursor-pointer is-interactive relative"
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
        <div className="w-full aspect-square relative overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 skeleton-shimmer z-10" />
          )}
          <video
            ref={videoRef}
            src={item.videoSrc}
            loop
            muted
            playsInline
            onLoadedData={() => {
              setIsLoaded(true);
              if (videoRef.current && item.playbackRate) {
                videoRef.current.playbackRate = item.playbackRate;
              }
            }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Tap to View Button */}
        <div className="w-full py-2.5 bg-[#d6cdc2] border-t border-[#7b7a77]/40 flex items-center justify-center gap-1.5 text-[11px] font-outfit font-bold text-[#190b00] uppercase tracking-wider">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          <span>Tap to view video</span>
        </div>
      </div>

      {/* Video Fullscreen Lightbox */}
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

export function MobileVousVousDecisions() {
  return (
    <section id="mobile-vousvous-decisions" className="mobile-story-decisions-section">
      {/* Section Header */}
      <div className="mobile-story-decisions-header">
        <div className="mobile-story-decisions-brand">
          <BrandVector theme="dark" width={56} height={38} />
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

      {/* Decision Cards List */}
      <div className="mobile-story-decisions-list">
        {DECISIONS.map((d) => (
          <DecisionCard key={d.id} item={d} />
        ))}
      </div>
    </section>
  );
}

export default MobileVousVousDecisions;
