import React, { useState, useRef } from "react";
import BrandVector from "@/components/BrandVector";

const testimonials = [
  {
    initials: "SM",
    role: "SOFTWARE ARCHITECT",
    name: "Steve Morris",
    company: "Stanford Medicine",
    quote: `"Jayesh's work was instrumental in the success of a major application for Stanford Medicine's medical school students. He consistently exceeded expectations through his expertise in UI/UX design, rapid execution, effective communication, and collaborative approach."`,
    linkedin: "https://www.linkedin.com/in/jayeshsoni31/details/recommendations/?detailScreenTabIndex=0",
  },
  {
    initials: "AM",
    role: "SENIOR DEVELOPER",
    name: "Ankit Mishra",
    company: "Vertisystem",
    quote: `"Jayesh possesses a deep understanding of user-centered design and consistently transforms complex user needs into intuitive, engaging experiences. His strategic thinking, craftsmanship, and collaborative approach make him an exceptional designer."`,
    linkedin: "https://www.linkedin.com/in/jayeshsoni31/details/recommendations/?detailScreenTabIndex=0",
  },
  {
    initials: "AG",
    role: "GENERAL MANAGER",
    name: "Anmol Gupta",
    company: "Joonify",
    quote: `"Jayesh consistently delivered high-quality work that exceeded expectations. His creativity, attention to detail, openness to feedback, and commitment to iteration made him an invaluable collaborator throughout our time working together."`,
    linkedin: "https://www.linkedin.com/in/jayeshsoni31/details/recommendations/?detailScreenTabIndex=0",
  },
];

interface MobileRecommendationsProps {
  isDark?: boolean;
}

export function MobileRecommendations({ isDark = false }: MobileRecommendationsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Mouse dragging support for desktop / browser testing
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Sync active index on scroll
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const slides = Array.from(slider.children) as HTMLElement[];
    if (slides.length === 0) return;

    const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    slides.forEach((slide, idx) => {
      const slideCenter = (slide.offsetLeft - slider.offsetLeft) + slide.clientWidth / 2;
      const diff = Math.abs(sliderCenter - slideCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const slides = slider.children;
    if (slides[index]) {
      const targetSlide = slides[index] as HTMLElement;
      slider.scrollTo({
        left: targetSlide.offsetLeft - slider.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeftRef.current = sliderRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    isDraggingRef.current = false;
    if (hasMovedRef.current) {
      const slider = sliderRef.current;
      const slides = Array.from(slider.children) as HTMLElement[];
      const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
      let closestIndex = 0;
      let minDiff = Infinity;

      slides.forEach((slide, idx) => {
        const slideCenter = (slide.offsetLeft - slider.offsetLeft) + slide.clientWidth / 2;
        const diff = Math.abs(sliderCenter - slideCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = idx;
        }
      });
      scrollToCard(closestIndex);
    }
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      handleMouseUp();
    }
  };

  return (
    <section className="mobile-section" id="mobile-recommendations">
      <div className="mobile-rec-wrap">
        {/* 1. Header Row: Horizontal BrandVector (solid orange on right) | Divider | [ S-005 ] RECOMMENDATIONS */}
        <div className="mobile-rec-header-row">
          <div className="mobile-rec-brandvector-box">
            <BrandVector theme={isDark ? "light" : "dark"} width={56} height={38} />
          </div>
          <div className="mobile-rec-header-divider" />
          <div className="mobile-rec-header-titles">
            <p className="mobile-rec-tag">[ S-005 ]</p>
            <h2 className="mobile-rec-title">RECOMMENDATIONS</h2>
          </div>
        </div>

        {/* 2. Subtitle with increased breathing room */}
        <p className="mobile-rec-subtitle">
          Some kind words from people I’ve had the privilege to work with.
        </p>

        {/* 3. Smooth Horizontal Scroll-Snap Slider */}
        <div className="mobile-rec-slider-container">
          <div
            className="mobile-rec-slider"
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {testimonials.map((rec, index) => (
              <div key={index} className="mobile-rec-card-slide">
                {/* Author Meta Row */}
                <div className="mobile-rec-author-row">
                  <div className="mobile-rec-avatar-circle">
                    <span className="mobile-rec-avatar-initials">{rec.initials}</span>
                    <span className="mobile-rec-avatar-dot" />
                  </div>
                  <div className="mobile-rec-author-meta">
                    <span className="mobile-rec-author-role">{rec.role}</span>
                    <h3 className="mobile-rec-author-name">{rec.name}</h3>
                    <span className="mobile-rec-author-company">{rec.company}</span>
                  </div>
                </div>

                {/* Speech Bubble Card */}
                <div className="mobile-rec-speech-bubble-container">
                  <svg
                    className="mobile-rec-bubble-tail"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 16L4 0L24 16Z" fill="#EFEAE2" />
                  </svg>
                  <div className="mobile-rec-speech-bubble">
                    <p className="mobile-rec-quote-text">{rec.quote}</p>
                  </div>
                </div>

                {/* View on LinkedIn CTA */}
                <div className="mobile-rec-linkedin-wrap">
                  <a
                    href={rec.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-rec-linkedin-btn"
                  >
                    <span>VIEW ON LINKEDIN</span>
                    <span className="mobile-rec-linkedin-arrow">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Carousel Pagination Bars with enlarged hit targets */}
        <div className="mobile-rec-pagination">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`mobile-rec-bar-tap-target ${i === activeIndex ? "active" : ""}`}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to recommendation ${i + 1}`}
            >
              <span className="mobile-rec-bar-line" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

