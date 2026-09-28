import React from "react";
import BrandVector from "@/components/BrandVector";
import imgCampaignOSLogo from "@/imports/campaignos_logo.webp";

interface MobileCosHeroProps {
  onBack: () => void;
  isDark?: boolean;
}

export function MobileCosHero({ onBack, isDark = false }: MobileCosHeroProps) {
  return (
    <section className="mobile-story-hero-section" id="mobile-cos-hero">
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

      {/* 2. Unified Boxed Hero Card (Matching Allyra's Bento Box Architecture) */}
      <div className="mobile-story-box-card">
        {/* Overview Grid Divider Bar */}
        <div className="mobile-story-overview-bar">
          <div className="mobile-story-overview-left">
            <span>OVERVIEW</span>
          </div>
          <div className="mobile-story-overview-right">
            <span>[ 2026 ]</span>
          </div>
        </div>

        {/* Hero Brand & Title Block */}
        <div className="mobile-story-title-block">
          <div className="mobile-story-brand-row">
            <img
              src={imgCampaignOSLogo}
              alt="Campaign OS Logo"
              className="mobile-story-cos-logo"
            />
            <span className="mobile-story-brand-text">Campaign OS</span>
          </div>

          <h1 className="mobile-story-headline">
            Designing an AI-Native Campaign Operating System
          </h1>
        </div>

        {/* Narrative & Metadata Block */}
        <div className="mobile-story-narrative-block">
          <p className="mobile-story-paragraph">
            Planning, launching, monitoring and improving digital campaigns shouldn&apos;t require{" "}
            <strong>jumping across half a dozen tools.</strong>
          </p>

          <p className="mobile-story-paragraph">
            This project explored how AI could become{" "}
            <strong>an active marketing partner</strong>
            —helping teams move from strategy to execution inside{" "}
            <strong>one connected workspace.</strong>
          </p>

          <p className="mobile-story-footnote">
            Originally designed as the pilot experience for an AI-first marketing platform.
          </p>

          <div className="mobile-story-meta-group">
            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">ROLE</span>
              <span className="mobile-story-role-val">Product Lead</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">FOCUS</span>
              <div className="mobile-story-focus-list">
                <p>/ Product Design</p>
                <p>/ UX Strategy</p>
                <p>/ Interaction Design</p>
                <p>/ Design Systems</p>
                <p>/ AI Experience Design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileCosHero;
