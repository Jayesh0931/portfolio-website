import { useEffect, useState, useRef } from "react";
import "@/app/styles/mobileTheme.css";
import { MobileHeader } from "./MobileHeader";
import { MobileHero } from "./MobileHero";
import { MobileAbout } from "./MobileAbout";
import { MobileStories } from "./MobileStories";
import { MobileFocus } from "./MobileFocus";
import { MobileCraft } from "./MobileCraft";
import { MobileRecommendations } from "./MobileRecommendations";
import { MobileFinale } from "./MobileFinale";
import ScrollToTopButton from "@/components/ScrollToTopButton";

interface MobileHomepageProps {
  onNavigatePath?: (path: string) => void;
}

export function MobileHomepage({ onNavigatePath }: MobileHomepageProps) {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isCelebrationFlash, setIsCelebrationFlash] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [maxDrag, setMaxDrag] = useState(260);

  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const currentDragX = useRef(0);

  useEffect(() => {
    // Show prompt on mobile opening if not dismissed in this session
    const dismissed = sessionStorage.getItem("desktop-prompt-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowBottomSheet(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Recalculate track limit dynamically on open or resize
  useEffect(() => {
    if (!showBottomSheet) return;
    const updateLimit = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.getBoundingClientRect().width;
        // 48px thumb + 8px padding
        setMaxDrag(Math.max(10, trackWidth - 48 - 8));
      }
    };
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, [showBottomSheet]);

  const triggerUnlockCelebration = () => {
    if (isUnlocked) return;
    setIsUnlocked(true);
    setIsRevealing(true);
    setIsCelebrationFlash(true);
    sessionStorage.setItem("desktop-prompt-dismissed", "true");

    // Allow slide-down exit animation to complete before removing from DOM
    setTimeout(() => {
      setShowBottomSheet(false);
    }, 360);

    // Dissolve amber flare bloom
    setTimeout(() => {
      setIsCelebrationFlash(false);
    }, 850);
  };

  const getLimit = () => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.getBoundingClientRect().width;
      return Math.max(10, trackWidth - 48 - 8);
    }
    return maxDrag;
  };

  const handleDragStart = (clientX: number) => {
    if (isUnlocked) return;
    touchStartX.current = clientX - currentDragX.current;
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || isUnlocked) return;
    const limit = getLimit();
    const rawDeltaX = clientX - touchStartX.current;
    const clampedX = Math.max(0, Math.min(rawDeltaX, limit));
    currentDragX.current = clampedX;
    setDragX(clampedX);
  };

  const handleDragEnd = () => {
    if (!isDragging || isUnlocked) return;
    setIsDragging(false);
    const limit = getLimit();

    // If dragged past 55% of the track -> Slide to end & celebrate!
    if (currentDragX.current > limit * 0.55) {
      setDragX(limit);
      triggerUnlockCelebration();
    } else {
      // Snap back smoothly
      setDragX(0);
      currentDragX.current = 0;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    handleDragStart(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    handleDragMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    handleDragEnd();
  };

  const handleNavigatePath = (path: string) => {
    if (onNavigatePath) {
      onNavigatePath(path);
    } else {
      window.dispatchEvent(new CustomEvent("navigate-to-path", { detail: path }));
    }
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // IntersectionObserver for delayed reveal of .readpill and .go pills
  useEffect(() => {
    const revealables = document.querySelectorAll(".readpill, .go");
    const timers = new WeakMap<Element, NodeJS.Timeout>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            if (!timers.has(el)) {
              const timer = setTimeout(() => {
                el.classList.add("visible");
              }, 500);
              timers.set(el, timer);
            }
          } else {
            if (timers.has(el)) {
              clearTimeout(timers.get(el));
              timers.delete(el);
            }
            el.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    revealables.forEach((el) => observer.observe(el));

    return () => {
      revealables.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Dynamic Light-to-Dark Canvas Transition (matches desktop web at Focus section)
  const [isDarkCanvas, setIsDarkCanvas] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScrollBg = () => {
      const focusEl = document.getElementById("mobile-focus");
      if (!focusEl) return;
      const rect = focusEl.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.7;
      setIsDarkCanvas(inView);
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScrollBg, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    onScrollBg();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScrollBg);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`mobile-root ${isDarkCanvas ? "is-dark-canvas" : ""}`} id="mobile-top">
      <MobileHeader onNavigateSection={handleScrollToSection} />

      <main className={`mobile-site-main ${showBottomSheet && !isRevealing ? "mobile-site-dimmed" : ""} ${isRevealing ? "mobile-site-revealing" : ""}`}>
        <MobileHero 
          onNavigatePath={handleNavigatePath} 
          onScrollToSection={handleScrollToSection} 
        />

        <MobileAbout />

        <MobileStories 
          onNavigatePath={handleNavigatePath} 
        />

        <MobileFocus />

        <MobileCraft isDark={isDarkCanvas} />

        <MobileRecommendations isDark={isDarkCanvas} />

        <MobileFinale isDark={isDarkCanvas} />
      </main>

      {/* Celebratory Amber Flare / Bloom Overlay */}
      {isCelebrationFlash && <div className="mobile-reveal-bloom" />}

      {/* Mobile Desktop Prompt - Plain Simple Text & Swipe to Right */}
      {showBottomSheet && (
        <div 
          className="mobile-bottom-sheet-backdrop"
          onClick={triggerUnlockCelebration}
        >
          <div 
            className={`mobile-bottom-sheet-panel ${isUnlocked ? "mobile-sheet-dismissing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Plain Simple Text */}
            <div className="mobile-swipe-text-wrap">
              <p className="mobile-swipe-heading">
                Built for large screens.<br />
                <span>Still remarkable right here.</span>
              </p>
              <p className="mobile-swipe-subtext">
                Crafted for wide desktop displays, thoughtfully adapted for mobile.
              </p>
            </div>

            {/* Tactile Swipe-to-Right Track */}
            <div ref={trackRef} className="mobile-swipe-track">
              <div 
                className="mobile-swipe-fill" 
                style={{ width: `${dragX + 28}px` }} 
              />
              <span 
                className="mobile-swipe-label mobile-swipe-label-shimmer"
                style={{
                  opacity: Math.max(0, 1 - (dragX / (maxDrag || 1)) * 1.6),
                }}
              >
                Swipe to enter &rarr;
              </span>
              <div 
                className="mobile-swipe-thumb"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  transform: `translateX(${dragX}px)`,
                  transition: isDragging ? "none" : "transform 0.32s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Scroll to Top Button (40px x 40px on mobile) */}
      <ScrollToTopButton show={showScrollTop} onClick={scrollToTop} />
    </div>
  );
}

export default MobileHomepage;
