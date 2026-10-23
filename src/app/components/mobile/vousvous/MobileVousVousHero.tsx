import React from "react";
import BrandVector from "@/components/BrandVector";
import imgVousvousLogo from "@/imports/vousvous_logo.webp";

interface MobileVousVousHeroProps {
  onBack: () => void;
  isDark?: boolean;
}

export function MobileVousVousHero({ onBack, isDark = false }: MobileVousVousHeroProps) {
  return (
    <section className="mobile-story-hero-section" id="mobile-vousvous-hero">
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
          <BrandVector theme="dark" width={48} height={32} />
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
            <span>[ 2025 ]</span>
          </div>
        </div>

        {/* Hero Brand & Title Block */}
        <div className="mobile-story-title-block">
          <div className="mobile-story-brand-row mb-2 flex items-center gap-[12px]">
            <img
              src={imgVousvousLogo}
              alt="Vousvous Logo"
              className="size-[42px] object-contain shrink-0"
            />
            <span className="font-['Alegreya_SC',serif] text-[36px] text-[#190b00] leading-none tracking-[0.5px]">
              Vousvous
            </span>
          </div>

          <h1 className="mobile-story-headline">
            Designing Fashion Discovery Beyond Search
          </h1>
        </div>

        {/* Narrative & Metadata Block */}
        <div className="mobile-story-narrative-block">
          <p className="mobile-story-paragraph text-[#77695d]">
            Fashion discovery has long been driven by filters, endless grids, and keyword searches. With VousVous, we explored a different interaction model—one where users discover, personalise, and{" "}
            <strong className="font-bold text-[#190b00]">
              create fashion through gestures and AI-guided conversations instead of traditional browsing.
            </strong>
          </p>

          <div className="mobile-story-meta-group">
            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">COMPANY</span>
              <span className="mobile-story-role-val">Vrozart Dackson</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">ROLE</span>
              <span className="mobile-story-role-val">UXD Head</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">TIMELINE</span>
              <span className="mobile-story-role-val">2026</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">FOCUS</span>
              <div className="mobile-story-focus-list">
                <p>/ Gesture-First Discovery</p>
                <p>/ AI Assisted Personalisation</p>
                <p>/ Conversational Commerce</p>
                <p>/ Multimodal Style Synthesis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileVousVousHero;
