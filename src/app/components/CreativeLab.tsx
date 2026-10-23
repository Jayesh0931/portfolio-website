import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";
import CircularGallery from "@/components/CircularGallery";

export interface CreativeVideo {
  id: string;
  title: string;
  aspectRatio: "16:9" | "9:16";
  aspectRatioLabel: string;
  poster: string;
  driveId: string;
  previewUrl: string;
  tags: string[];
}

export const CREATIVE_VIDEOS: CreativeVideo[] = [
  {
    id: "college-admission",
    title: "College Admission Campaign",
    aspectRatio: "16:9",
    aspectRatioLabel: "16:9 CINEMATIC",
    poster: "/creative-lab/college_admission.jpg",
    driveId: "1zB2lbB0lS5Bez1STPqCLRwgtqa47kPHH",
    previewUrl: "https://drive.google.com/file/d/1zB2lbB0lS5Bez1STPqCLRwgtqa47kPHH/preview",
    tags: ["Storytelling", "Generative Video", "Camera Motion"],
  },
  {
    id: "heera-biryani",
    title: "Heera Biryani Masala",
    aspectRatio: "9:16",
    aspectRatioLabel: "9:16 REEL",
    poster: "/creative-lab/heera_biryani.jpg",
    driveId: "19sqYO8I5GD0Fmx7Rhx0KR96cZFmtgBDV",
    previewUrl: "https://drive.google.com/file/d/19sqYO8I5GD0Fmx7Rhx0KR96cZFmtgBDV/preview",
    tags: ["Food Commercial", "Slow-Motion", "Culinary Lighting"],
  },
  {
    id: "phone-habit",
    title: "Digital Habits & Screen Time",
    aspectRatio: "9:16",
    aspectRatioLabel: "9:16 REEL",
    poster: "/creative-lab/phone_habit.jpg",
    driveId: "1xt6Xo7PmKFVBfoSMc3s4DoQEuxbB9IfK",
    previewUrl: "https://drive.google.com/file/d/1xt6Xo7PmKFVBfoSMc3s4DoQEuxbB9IfK/preview",
    tags: ["Human Behaviour", "Concept Storyboarding", "Digital Habits"],
  },
  {
    id: "yoga-wellness",
    title: "Yoga & Mindful Wellness",
    aspectRatio: "9:16",
    aspectRatioLabel: "9:16 REEL",
    poster: "/creative-lab/yoga_wellness.jpg",
    driveId: "1J4L9Kf-7GnWi1hj-_HA9TDNE8kGZGglk",
    previewUrl: "https://drive.google.com/file/d/1J4L9Kf-7GnWi1hj-_HA9TDNE8kGZGglk/preview",
    tags: ["Mindful Movement", "Atmospheric Light", "Human Rhythm"],
  },
];

interface CreativeLabProps {
  isDark: boolean;
  contentWidth: number;
  scale?: number;
  isMobile?: boolean;
}

export default function CreativeLab({
  isDark,
  contentWidth,
  scale = 1,
  isMobile = false,
}: CreativeLabProps) {
  const [activeVideo, setActiveVideo] = useState<CreativeVideo | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  const handleOpenVideo = (video: CreativeVideo) => {
    playClickSound();
    setActiveVideo(video);
  };

  const handleCloseVideo = () => {
    playClickSound();
    setActiveVideo(null);
  };

  // ═════════════════════════════════════════════════════════════════════════
  // MOBILE VIEW (< 768px) — Full Viewport Bleed, No Borders, Big Overlaid Video Thumbs
  // ═════════════════════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <>
        <div
          style={{
            position: "relative",
            width: "calc(100% + 32px)",
            marginLeft: "-16px",
            marginRight: "-16px",
            backgroundColor: "#070402",
            color: "#FFFDFA",
            border: "none",
            borderRadius: 0,
            padding: "54px 16px 64px 16px",
            marginBottom: 60,
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* Header Content */}
          <div style={{ marginBottom: 32 }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.8px",
                color: "#EE6C13",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 10,
              }}
            >
              [ S-006 ] BEYOND THE WORK
            </span>

            <h2
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: 32,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#FFFDFA",
                textTransform: "uppercase",
                margin: "0 0 14px 0",
              }}
            >
              CURIOSITY DOESN’T CLOCK OUT.
            </h2>

            <p
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: "#D1C7BD",
                margin: 0,
              }}
            >
              Outside product design, I enjoy experimenting with generative AI, turning ideas into cinematic videos, and exploring new ways to tell stories through technology. It’s where I play, learn, and create without a brief.
            </p>
          </div>

          {/* Big Monumental Video Cards Stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {CREATIVE_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => handleOpenVideo(video)}
                style={{
                  position: "relative",
                  width: "100%",
                  height: 440,
                  backgroundColor: "#0d0703",
                  borderRadius: 0,
                  border: "2px solid #EE6C13",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Full Bleed Poster Image */}
                <img
                  src={video.poster}
                  alt={video.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Scrim Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(7, 4, 2, 0.95) 0%, rgba(7, 4, 2, 0.5) 45%, rgba(7, 4, 2, 0.15) 75%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Aspect Badge (Top Left) */}
                <div style={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: "0.8px",
                      color: "#FFFDFA",
                      backgroundColor: "rgba(10, 5, 2, 0.8)",
                      padding: "4px 10px",
                      borderRadius: 0,
                      display: "inline-block",
                    }}
                  >
                    [ {video.aspectRatioLabel} ]
                  </span>
                </div>

                {/* Watch Reel Trigger Pill (Center) */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: "#FFFDFA",
                    color: "#190b00",
                    padding: "10px 20px",
                    borderRadius: 0,
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 900,
                    fontSize: 12,
                    letterSpacing: "0.6px",
                    textTransform: "uppercase",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <span style={{ color: "#EE6C13", fontSize: 13 }}>▶</span>
                  <span>WATCH REEL</span>
                </div>

                {/* Bottom Overlay: Title & 3-4 Tags */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px 18px",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 900,
                      fontSize: 22,
                      lineHeight: 1.15,
                      color: "#FFFDFA",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "-0.015em",
                      textShadow: "0 2px 14px rgba(0,0,0,0.7)",
                    }}
                  >
                    {video.title}
                  </h3>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {video.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: 10.5,
                          letterSpacing: "0.5px",
                          color: "rgba(255, 253, 250, 0.75)",
                          textTransform: "uppercase",
                        }}
                      >
                        [ {t} ]
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {activeVideo && (
            <VideoLightboxModal video={activeVideo} onClose={handleCloseVideo} isDark={isDark} />
          )}
        </AnimatePresence>
      </>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // DESKTOP VIEW (>= 768px) — Monumental Brutalist Video Billboards
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <>
      <section
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "#070402",
          color: "#FFFDFA",
          border: "none",
          borderRadius: 0,
          marginBottom: 200,
          boxSizing: "border-box",
          overflow: "hidden",
          padding: "100px 0 110px 0",
        }}
      >
        {/* Subtle Atmospheric Stage */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(circle 1000px at 50% 30%, rgba(238, 108, 19, 0.08), transparent 70%)",
          }}
        />

        {/* Constrained Content Container */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "min(1360px, calc(100% - 80px))",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {/* Section Header */}
          <div style={{ maxWidth: "880px", marginBottom: 32 }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.8px",
                color: "#EE6C13",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 14,
              }}
            >
              [ S-006 ] BEYOND THE WORK
            </span>

            <h2
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(38px, 4.4vw, 62px)",
                letterSpacing: "-0.025em",
                color: "#FFFDFA",
                textTransform: "uppercase",
                margin: "0 0 16px 0",
                lineHeight: 1.05,
              }}
            >
              CURIOSITY DOESN’T CLOCK OUT.
            </h2>

            <p
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: 17,
                lineHeight: 1.65,
                color: "#D1C7BD",
                margin: 0,
                maxWidth: "820px",
              }}
            >
              Outside product design, I enjoy experimenting with generative AI, turning ideas into cinematic videos, and exploring new ways to tell stories through technology. It’s where I play, learn, and create without a brief.
            </p>
          </div>
          {/* Seamless Panoramic Circular Gallery (No enclosing box or borders) */}
          <div
            style={{
              width: "100%",
              height: 600,
              position: "relative",
              overflow: "visible",
            }}
          >
              <CircularGallery
                items={[
                  ...CREATIVE_VIDEOS,
                  ...CREATIVE_VIDEOS,
                  ...CREATIVE_VIDEOS,
                ].map((v) => ({
                  image: v.poster,
                  text: v.title,
                  description: `${v.aspectRatioLabel} • ${v.tags.slice(0, 2).join(" • ")}`,
                }))}
                bend={3}
                textColor="#FFFDFA"
                borderRadius={0}
                strokeColor="#EE6C13"
                strokeWidth={2}
                scrollSpeed={1.5}
                openOnClick={false}
                onItemClick={(_item, index) => {
                  const video = CREATIVE_VIDEOS[index % CREATIVE_VIDEOS.length];
                  handleOpenVideo(video);
                }}
              />
              {/* Bottom Drag Guidance Banner */}
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  backgroundColor: "rgba(10, 5, 2, 0.85)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(123, 122, 119, 0.5)",
                  padding: "6px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  zIndex: 10,
                }}
              >
                <span style={{ color: "#ea580c", fontSize: 13 }}>⟵</span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 10.5,
                    letterSpacing: "1px",
                    color: "#D1C7BD",
                    textTransform: "uppercase",
                  }}
                >
                  DRAG OR SCROLL 360° RIBBON • CLICK CARD TO PLAY
                </span>
                <span style={{ color: "#ea580c", fontSize: 13 }}>⟶</span>
              </div>
            </div>
        </div>
      </section>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <VideoLightboxModal video={activeVideo} onClose={handleCloseVideo} isDark={isDark} />
        )}
      </AnimatePresence>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// Interactive Video Lightbox Modal Component
// ══════════════════════════════════════════════════════════════════════════
interface VideoLightboxModalProps {
  video: CreativeVideo;
  onClose: () => void;
  isDark: boolean;
}

function VideoLightboxModal({ video, onClose, isDark }: VideoLightboxModalProps) {
  const isLandscape = video.aspectRatio === "16:9";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(7, 4, 2, 0.94)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        boxSizing: "border-box",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isLandscape ? "min(960px, 94vw)" : "min(460px, 92vw)",
          maxHeight: "92vh",
          backgroundColor: "#120A05",
          border: "1.5px solid #EE6C13",
          borderRadius: 0,
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#160C06",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: 10,
                color: "#EE6C13",
                letterSpacing: "0.6px",
                padding: "2px 8px",
                backgroundColor: "rgba(238, 108, 19, 0.12)",
                borderRadius: 0,
              }}
            >
              [ {video.aspectRatioLabel} ]
            </span>
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 15,
                color: "#FFFDFA",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: isLandscape ? "500px" : "240px",
              }}
            >
              {video.title}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 0,
              padding: "4px 14px",
              color: "#FFFDFA",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "0.5px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Video Player Frame */}
        <div
          style={{
            width: "100%",
            aspectRatio: isLandscape ? "16 / 9" : "9 / 16",
            maxHeight: isLandscape ? "64vh" : "70vh",
            backgroundColor: "#000",
            position: "relative",
          }}
        >
          <iframe
            src={`${video.previewUrl}?autoplay=1`}
            title={video.title}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{
              border: "none",
              display: "block",
            }}
          />
        </div>

        {/* Modal Caption Bar */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            backgroundColor: "#110702",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {video.tags.map((t, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  color: "#998D80",
                  textTransform: "uppercase",
                }}
              >
                [ {t} ]
              </span>
            ))}
          </div>

          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: "#EE6C13",
              textTransform: "uppercase",
            }}
          >
            CREATIVE LAB EXPERIMENT
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
