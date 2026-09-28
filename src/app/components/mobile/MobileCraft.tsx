import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import BrandVector from "@/components/BrandVector";
import {
  imgE1,
  imgE2,
  imgE31,
  imgE32,
  imgTulahCraft1,
} from "./mobileAssets";

import videoD1 from "@/imports/D1.mp4";
import videoD2 from "@/imports/D2.mp4";
import videoD3 from "@/imports/D3.mp4";
import videoE4 from "@/imports/E4.mp4";

interface CraftItem {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  tag: string;
  width: number;
}

const craftItems: CraftItem[] = [
  {
    id: "item-1",
    type: "image",
    src: imgTulahCraft1,
    title: "tulah Wellness Platform",
    tag: "Design System",
    width: 440,
  },
  {
    id: "item-2",
    type: "image",
    src: imgE2,
    title: "Editorial & Typography",
    tag: "Visual Craft",
    width: 373,
  },
  {
    id: "item-3",
    type: "image",
    src: imgE31,
    title: "Mobile Interface Craft",
    tag: "UI Architecture",
    width: 210,
  },
  {
    id: "item-4",
    type: "video",
    src: videoD2,
    title: "Interactive Canvas & Nodes",
    tag: "Motion Prototype",
    width: 440,
  },
  {
    id: "item-5",
    type: "image",
    src: imgE1,
    title: "Brand Architecture Exploration",
    tag: "Art Direction",
    width: 280,
  },
  {
    id: "item-6",
    type: "image",
    src: imgE32,
    title: "Component Anatomy & States",
    tag: "System Design",
    width: 210,
  },
  {
    id: "item-7",
    type: "video",
    src: videoD1,
    title: "Conversational Agent Flows",
    tag: "AI Interaction",
    width: 440,
  },
  {
    id: "item-8",
    type: "video",
    src: videoD3,
    title: "Multimodal Command Palette",
    tag: "Enterprise UX",
    width: 440,
  },
  {
    id: "item-9",
    type: "video",
    src: videoE4,
    title: "Micro-interactions & Physics",
    tag: "Interaction Craft",
    width: 440,
  },
];

const marqueePairs = Array(4).fill(null);

interface MobileCraftProps {
  isDark?: boolean;
}

export function MobileCraft({ isDark = false }: MobileCraftProps) {
  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const [stickyMode, setStickyMode] = useState<"before" | "fixed" | "after">("before");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeModalItem, setActiveModalItem] = useState<CraftItem | null>(null);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const cardTouchStartRef = useRef({ x: 0, y: 0, time: 0 });

  // 1. Guaranteed Viewport Locking: locks the screen firmly using fixed positioning until all 9 images are shown
  useEffect(() => {
    let animationFrameId: number;

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (!pinnedContainerRef.current) return;
        const rect = pinnedContainerRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        const totalHeight = pinnedContainerRef.current.offsetHeight;
        const maxScroll = totalHeight - windowH;
        if (maxScroll <= 0) return;

        if (rect.top > 0) {
          // Above section: resting at top of container
          setStickyMode("before");
          setScrollProgress(0);
        } else if (rect.bottom <= windowH) {
          // Completed carousel: resting at bottom of container, page scrolls to next section
          setStickyMode("after");
          setScrollProgress(1);
        } else {
          // Active carousel: screen is firmly locked in fixed position!
          setStickyMode("fixed");
          const scrolled = -rect.top;
          const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
          setScrollProgress(progress);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (activeModalItem) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [activeModalItem]);

  // 2. Touch Drag gestures: swiping horizontally drives the vertical scroll
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    const deltaY = e.touches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 16) {
      window.scrollBy({ top: -deltaX * 0.95, behavior: "auto" });
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  // Card tap detection
  const handleCardTouchStart = (e: React.TouchEvent) => {
    cardTouchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleCardTouchEnd = (item: CraftItem, e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    const dt = Date.now() - cardTouchStartRef.current.time;
    const dx = Math.abs(touch.clientX - cardTouchStartRef.current.x);
    const dy = Math.abs(touch.clientY - cardTouchStartRef.current.y);
    if (dt < 450 && dx < 20 && dy < 20) {
      setActiveModalItem(item);
    }
  };

  // Total track width calculation
  const totalTrackWidth = 3400;
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 390;
  const maxTravel = totalTrackWidth - screenWidth + 60;
  const currentTranslateX = 24 - (scrollProgress * maxTravel);

  // Viewport center for 3D calculations
  const screenCenter = screenWidth / 2;
  let runningX = currentTranslateX + 24;

  const currentPieceIndex = Math.min(9, Math.floor(scrollProgress * 8.99) + 1);

  // Determine container frame styling
  const frameStyle: React.CSSProperties = {
    width: "100vw",
    height: "100vh",
    maxHeight: "100dvh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "16px 0",
    background: isDark ? "#190B00" : "#FFFDFA",
    transition: "background 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    left: 0,
    ...(stickyMode === "fixed"
      ? { position: "fixed", top: 0, zIndex: 50 }
      : stickyMode === "after"
      ? { position: "absolute", bottom: 0, zIndex: 10 }
      : { position: "relative", zIndex: 10 }),
  };

  return (
    <section className="mobile-section" id="mobile-craft">
      <div
        className="mobile-craft-pinned-container"
        ref={pinnedContainerRef}
        style={{ height: "3500px", position: "relative", width: "100%" }}
      >
        <div style={frameStyle}>
          {/* 1. Header Bar: BrandVector on left, [ S-004 ] on right */}
          <div className="mobile-craft-header-bar">
            <BrandVector theme={isDark ? "light" : "dark"} width={64} height={42} />
            <p className="mobile-craft-tag">[ S-004 ]</p>
          </div>

          {/* 2. Giant Dual Counter-Scrolling Marquees */}
          <div className="mobile-craft-marquee-wrapper">
            {/* Row 1: Leftward (Solid -> Outline) */}
            <div className="mobile-craft-marquee-row">
              <div className="mobile-craft-marquee-track scroll-left">
                {marqueePairs.map((_, i) => (
                  <React.Fragment key={`r1-${i}`}>
                    <span className="mobile-craft-text-solid">CRAFT</span>
                    <span className="mobile-craft-text-outline">CRAFT</span>
                  </React.Fragment>
                ))}
                {marqueePairs.map((_, i) => (
                  <React.Fragment key={`r1-dup-${i}`}>
                    <span className="mobile-craft-text-solid">CRAFT</span>
                    <span className="mobile-craft-text-outline">CRAFT</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Row 2: Rightward (Outline -> Solid: Outline below Solid, Solid below Outline) */}
            <div className="mobile-craft-marquee-row reverse">
              <div className="mobile-craft-marquee-track scroll-right">
                {marqueePairs.map((_, i) => (
                  <React.Fragment key={`r2-${i}`}>
                    <span className="mobile-craft-text-outline">CRAFT</span>
                    <span className="mobile-craft-text-solid">CRAFT</span>
                  </React.Fragment>
                ))}
                {marqueePairs.map((_, i) => (
                  <React.Fragment key={`r2-dup-${i}`}>
                    <span className="mobile-craft-text-outline">CRAFT</span>
                    <span className="mobile-craft-text-solid">CRAFT</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* 3. 3D Cylindrical Image Sequence Stage */}
          <div
            className="mobile-craft-cylinder-stage"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
          >
            <div
              className="mobile-craft-cylinder-track"
              style={{ transform: `translateX(${currentTranslateX}px)` }}
            >
              {craftItems.map((item) => {
                const itemWidth = item.width;
                const itemCenter = runningX + itemWidth / 2;
                runningX += itemWidth + 16;

                const distFromCenter = (itemCenter - screenCenter) / (screenCenter * 1.15);
                const clampedDist = Math.max(-1.8, Math.min(1.8, distFromCenter));
                const rotateY = -clampedDist * 20;
                const translateZ = -Math.abs(clampedDist) * 32;
                const scale = Math.max(0.92, 1 - Math.abs(clampedDist) * 0.05);

                return (
                  <div
                    key={item.id}
                    className="mobile-craft-cylinder-item"
                    style={{
                      width: `${itemWidth}px`,
                      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                    }}
                    onTouchStart={handleCardTouchStart}
                    onTouchEnd={(e) => handleCardTouchEnd(item, e)}
                    onClick={() => setActiveModalItem(item)}
                  >
                    {item.type === "image" ? (
                      <img src={item.src} alt={item.title} loading="lazy" />
                    ) : (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      />
                    )}
                    <div className="mobile-craft-expand-badge">↗</div>
                  </div>
                );
              })}
            </div>

            <div className="mobile-craft-hint">
              <span>[ PIECE 0{currentPieceIndex} / 09 · SCROLL TO EXPLORE · TAP TO EXPAND ]</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Fullscreen Lightbox Modal mounted directly to document.body via Portal */}
      {activeModalItem && typeof document !== "undefined" && createPortal(
        <div
          className="mobile-craft-lightbox-backdrop"
          onClick={() => setActiveModalItem(null)}
        >
          <button
            type="button"
            className="mobile-craft-lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalItem(null);
            }}
            aria-label="Close modal"
          >
            ✕
          </button>

          <div
            className="mobile-craft-lightbox-media-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            {activeModalItem.type === "image" ? (
              <img src={activeModalItem.src} alt={activeModalItem.title} />
            ) : (
              <video
                src={activeModalItem.src}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            )}
          </div>

          <div className="mobile-craft-lightbox-caption" onClick={(e) => e.stopPropagation()}>
            <span className="mobile-craft-lightbox-tag">{activeModalItem.tag}</span>
            <h4 className="mobile-craft-lightbox-title">{activeModalItem.title}</h4>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}



