import React from "react";
import BrandVector from "@/components/BrandVector";
import imgTulahLogo from "@/imports/tulah_logo.webp";

interface MobileTulahHeroProps {
  onBack: () => void;
  isDark?: boolean;
}

export function MobileTulahHero({ onBack, isDark = false }: MobileTulahHeroProps) {
  return (
    <section className="mobile-story-hero-section" id="mobile-tulah-hero">
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
            <img
              src={imgTulahLogo}
              alt="Tulah Logo"
              className="mobile-story-tulah-logo"
            />
            <span className="mobile-story-brand-text">tulah</span>
          </div>

          <h1 className="mobile-story-headline">
            Designing an Operational Intelligence Platform for Personalized Wellness Care
          </h1>
        </div>

        {/* Narrative & Metadata Block */}
        <div className="mobile-story-narrative-block">
          <p className="mobile-story-paragraph">
            Personalized wellness appears simple to guests, but delivering it requires coordination across consultants, diagnostics, therapies, schedules, and operations.
          </p>

          <p className="mobile-story-paragraph">
            My role was to design the systems that brought together{" "}
            <strong>14+ operational roles into one connected care journey</strong>
            —from pre-arrival onboarding to post-retreat home care.
          </p>

          <div className="mobile-story-meta-group">
            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">ROLE</span>
              <span className="mobile-story-role-val">Product Lead &amp; AI Product Designer</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">SCOPE</span>
              <div className="mobile-story-focus-list">
                <p>/ Guest Experience</p>
                <p>/ CRM Operations</p>
                <p>/ Retreat Planning</p>
                <p>/ Consultant Workbenches</p>
                <p>/ Care Execution Systems</p>
                <p>/ Home Care Ecosystem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileTulahHero;
