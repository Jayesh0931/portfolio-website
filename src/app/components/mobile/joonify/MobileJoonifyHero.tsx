import React from "react";
import BrandVector from "@/components/BrandVector";
import imgJoonifyIcon from "@/imports/joonify_icon.webp";

interface MobileJoonifyHeroProps {
  onBack: () => void;
  isDark?: boolean;
}

export function MobileJoonifyHero({ onBack, isDark = false }: MobileJoonifyHeroProps) {
  return (
    <section className="mobile-story-hero-section" id="mobile-joonify-hero">
      {/* 1. Header / Navigation Row */}
      <header className="mobile-story-nav-header">
        <button
          type="button"
          onClick={onBack}
          className="mobile-story-back-pill"
          aria-label="Back to home"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>BACK</span>
        </button>

        <div onClick={onBack} style={{ cursor: "pointer" }} role="button" aria-label="Back to home">
          <BrandVector theme={isDark ? "light" : "dark"} width={48} height={32} />
        </div>
      </header>

      {/* 2. Unified Boxed Hero Card */}
      <div className="mobile-story-box-card">
        {/* Overview Grid Divider Bar */}
        <div className="mobile-story-overview-bar">
          <div className="mobile-story-overview-left">
            <span>OVERVIEW</span>
          </div>
          <div className="mobile-story-overview-right">
            <span>[ 2022 ]</span>
          </div>
        </div>

        {/* Hero Brand & Title Block */}
        <div className="mobile-story-title-block">
          <div className="mobile-story-brand-row mb-2 flex items-center gap-[12px]">
            <img
              src={imgJoonifyIcon}
              alt="Joonify Logo"
              className="size-[42px] object-contain shrink-0"
            />
            <span className="font-outfit font-bold text-[36px] text-[#190b00] leading-none tracking-[-0.5px]">
              Joonify
            </span>
          </div>

          <h1 className="mobile-story-headline">
            Helping parents understand how their children learn, grow, and discover their strengths.
          </h1>
        </div>

        {/* Pullquote Container */}
        <div className="mobile-story-narrative-block">
          <p className="mobile-story-paragraph text-[#77695d]">
            Every child has different strengths, interests, and learning needs. Joonify brought child talent discovery, learning recommendations, and educational planning into one platform—
            <strong className="font-bold text-[#190b00]">
              helping parents make more informed, empathetic decisions about their child&apos;s development.
            </strong>
          </p>

          {/* Role & Scope Metadata Block */}
          <div className="mobile-story-meta-group">
            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">COMPANY</span>
              <span className="mobile-story-role-val">Joonify</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">ROLE</span>
              <span className="mobile-story-role-val">User Interface Designer</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">TIMELINE</span>
              <span className="mobile-story-role-val">2022 – 2023</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">FOCUS</span>
              <div className="mobile-story-focus-list">
                <p>/ Early Childhood Ed-Tech</p>
                <p>/ Assessment Experience</p>
                <p>/ Child Talent Discovery</p>
                <p>/ Personalised Learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileJoonifyHero;
