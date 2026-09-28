import React from "react";
import BrandVector from "@/components/BrandVector";

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

        <BrandVector theme="dark" width={48} height={32} />
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
          <div className="mobile-story-brand-row">
            <span className="text-[#EE6C13] text-[22px] leading-none">✦</span>
            <span className="mobile-story-brand-text">VousVous</span>
          </div>

          <h1 className="mobile-story-headline">
            Declarative Fashion Discovery Beyond Search
          </h1>
        </div>

        {/* Narrative Paragraphs */}
        <div className="mobile-story-narrative-block">
          <p className="mobile-story-paragraph">
            Personalization becomes meaningful when people can create, not just choose. VousVous is an AI-powered fashion platform designed to move past keyword search into visual declaration and personalized style discovery.
          </p>
        </div>

        {/* Metadata Stack: Role & Team Contribution */}
        <div className="mobile-story-meta-group">
          <div className="mobile-story-meta-item">
            <span className="mobile-story-meta-label">Role</span>
            <span className="mobile-story-role-val">
              Product Lead & AI Product Designer
            </span>
          </div>

          <div className="mobile-story-meta-item">
            <span className="mobile-story-meta-label">Focus Areas</span>
            <div className="mobile-story-focus-list">
              <p>Product Strategy</p>
              <p>AI Interaction Design</p>
              <p>Mobile Experience Architecture</p>
              <p>Design System Foundations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileVousVousHero;
