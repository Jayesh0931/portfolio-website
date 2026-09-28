import React, { useRef, useEffect, useState } from "react";
import imgE1 from "@/imports/E1.webp";
import imgE2 from "@/imports/E2.webp";
import imgE3_1 from "@/imports/E3.1.webp";
import imgE3_2 from "@/imports/E3.2.webp";
import videoE4 from "@/imports/E4.mp4";
import videoE5 from "@/imports/E5.mp4";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

function EvidenceImageCard({
  tag,
  title,
  copy,
  imgSrc,
  alt,
}: {
  tag: string;
  title: string;
  copy: React.ReactNode;
  imgSrc: string;
  alt: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="mobile-story-evidence-card">
      {/* Header Bar */}
      <div className="mobile-story-evidence-card-header">
        <span className="mobile-story-evidence-card-tag">{tag}</span>
        <h3 className="mobile-story-evidence-card-title">{title}</h3>
      </div>

      {/* Narrative Copy */}
      <div className="mobile-story-evidence-copy">{copy}</div>

      {/* Visual Media Container */}
      <div
        className="mobile-story-evidence-media-wrap"
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} in fullscreen`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
      >
        {!isLoaded && (
          <div className="mobile-story-evidence-skeleton skeleton-shimmer" />
        )}
        <img
          src={imgSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`mobile-story-evidence-img ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Tap to View Button */}
      <button
        type="button"
        className="mobile-story-evidence-tap-btn"
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
        src={imgSrc}
        alt={alt}
        type="image"
      />
    </div>
  );
}

function EvidenceSlideshowCard({
  tag,
  title,
  copy,
  images,
}: {
  tag: string;
  title: string;
  copy: React.ReactNode;
  images: string[];
}) {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  const hasAnyLoaded = Object.values(loadedImages).some(Boolean);

  return (
    <div className="mobile-story-evidence-card">
      <div className="mobile-story-evidence-card-header">
        <span className="mobile-story-evidence-card-tag">{tag}</span>
        <h3 className="mobile-story-evidence-card-title">{title}</h3>
      </div>

      <div className="mobile-story-evidence-copy">{copy}</div>

      <div
        className="mobile-story-evidence-media-wrap"
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} in fullscreen`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
      >
        {!hasAnyLoaded && (
          <div className="mobile-story-evidence-skeleton skeleton-shimmer" />
        )}
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt={`${title} slide ${i + 1}`}
            onLoad={() => setLoadedImages((prev) => ({ ...prev, [img]: true }))}
            className={`mobile-story-evidence-slide-img ${
              i === index && loadedImages[img] ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* Slide Indicator Dots */}
        <div className="mobile-story-evidence-dots" aria-hidden="true">
          {images.map((img, i) => (
            <span
              key={img}
              className={`mobile-story-evidence-dot ${i === index ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mobile-story-evidence-tap-btn"
        onClick={() => setIsLightboxOpen(true)}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        <span>Tap to view</span>
      </button>

      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={images[index]}
        alt={`${title} slide`}
        type="image"
      />
    </div>
  );
}

function EvidenceVideoCard({
  tag,
  title,
  copy,
  videoSrc,
}: {
  tag: string;
  title: string;
  copy: React.ReactNode;
  videoSrc: string;
}) {
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
    <div className="mobile-story-evidence-card">
      <div className="mobile-story-evidence-card-header">
        <span className="mobile-story-evidence-card-tag">{tag}</span>
        <h3 className="mobile-story-evidence-card-title">{title}</h3>
      </div>

      <div className="mobile-story-evidence-copy">{copy}</div>

      <div
        className="mobile-story-evidence-media-wrap mobile-story-evidence-video-wrap"
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Play ${title} in fullscreen`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
      >
        {/* Subtle violet backlight glow matching desktop */}
        <div className="mobile-story-evidence-glow" aria-hidden="true" />
        {!isLoaded && (
          <div className="mobile-story-evidence-skeleton skeleton-shimmer" />
        )}
        <video
          ref={videoRef}
          src={videoSrc}
          className="mobile-story-evidence-video"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        />
      </div>

      <button
        type="button"
        className="mobile-story-evidence-tap-btn"
        onClick={() => setIsLightboxOpen(true)}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
        <span>Tap to view</span>
      </button>

      <MobileImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={videoSrc}
        alt={`${title} video`}
        type="video"
      />
    </div>
  );
}

export function MobileAllyraEvidence() {
  return (
    <section id="mobile-allyra-evidence" className="mobile-story-evidence-section">
      {/* 1. Section Display Header */}
      <div className="mobile-story-evidence-header">
        <p className="mobile-story-evidence-supertag">[ PROOF OF OUTCOMES ]</p>
        <h2 className="mobile-story-evidence-title">EVIDENCE</h2>
      </div>

      {/* 2. Stacked 5 Evidence Bento Cards */}
      <div className="mobile-story-evidence-list">
        {/* Evidence 1: Enterprise AI Workspace */}
        <EvidenceImageCard
          tag="[ EVIDENCE 01 ]"
          title="ENTERPRISE AI WORKSPACE"
          imgSrc={imgE1}
          alt="Portal Dashboard screen"
          copy={
            <>
              <p className="mobile-story-evidence-p">
                The Portal became the gateway into the ecosystem.
              </p>
              <p className="mobile-story-evidence-p">
                Instead of focusing on agent creation, it focused on operational outcomes.
              </p>
            </>
          }
        />

        {/* Evidence 2: Governance */}
        <EvidenceImageCard
          tag="[ EVIDENCE 02 ]"
          title="GOVERNANCE"
          imgSrc={imgE2}
          alt="Governance screen"
          copy={
            <>
              <p className="mobile-story-evidence-p mb-2">
                Enterprise adoption required:
              </p>
              <div className="mobile-story-evidence-bullets">
                <p className="mobile-story-evidence-bullet-item">/Budget controls</p>
                <p className="mobile-story-evidence-bullet-item">/Usage monitoring</p>
                <p className="mobile-story-evidence-bullet-item">/Access management</p>
                <p className="mobile-story-evidence-bullet-item">/Licensing</p>
              </div>
            </>
          }
        />

        {/* Evidence 3: Automation Layer */}
        <EvidenceSlideshowCard
          tag="[ EVIDENCE 03 ]"
          title="AUTOMATION LAYER"
          images={[imgE3_1, imgE3_2]}
          copy={
            <>
              <p className="mobile-story-evidence-p mb-2">
                As adoption grew, operational tasks became repetitive. The next layer was automation.
              </p>
              <div className="mobile-story-evidence-bullets">
                <p className="mobile-story-evidence-bullet-item">/Scheduling</p>
                <p className="mobile-story-evidence-bullet-item">/Reminders</p>
                <p className="mobile-story-evidence-bullet-item">/Meeting summaries</p>
                <p className="mobile-story-evidence-bullet-item">/Follow-ups</p>
              </div>
            </>
          }
        />

        {/* Evidence 4: Hiring Workflow */}
        <EvidenceVideoCard
          tag="[ EVIDENCE 04 ]"
          title="HIRING WORKFLOW"
          videoSrc={videoE4}
          copy={
            <>
              <p className="mobile-story-evidence-p mb-2">
                One of the strongest examples of operational AI. Instead of isolated tools, the workflow connected:
              </p>
              <div className="mobile-story-evidence-flow">
                <span>JD Creation</span>
                <span className="mobile-story-evidence-flow-arrow">→</span>
                <span>Resume Screening</span>
                <span className="mobile-story-evidence-flow-arrow">→</span>
                <span>Interview Scheduling</span>
                <span className="mobile-story-evidence-flow-arrow">→</span>
                <span>AI Interview</span>
                <span className="mobile-story-evidence-flow-arrow">→</span>
                <span>Evaluation</span>
                <span className="mobile-story-evidence-flow-arrow">→</span>
                <span>Onboarding</span>
              </div>
            </>
          }
        />

        {/* Evidence 5: PPT Workflow */}
        <EvidenceVideoCard
          tag="[ EVIDENCE 05 ]"
          title="PPT WORKFLOW"
          videoSrc={videoE5}
          copy={
            <>
              <p className="mobile-story-evidence-p mb-2">
                A lesson we learned repeatedly:
              </p>
              <div className="mobile-story-evidence-bullets">
                <p className="mobile-story-evidence-bullet-item">/Automation without control creates poor outcomes.</p>
                <p className="mobile-story-evidence-bullet-item">/The PPT workflow deliberately kept humans involved.</p>
                <p className="mobile-story-evidence-bullet-item">/The system helped structure and generate.</p>
                <p className="mobile-story-evidence-bullet-item">/Humans remained responsible for quality and direction.</p>
              </div>
            </>
          }
        />
      </div>
    </section>
  );
}

export default MobileAllyraEvidence;
