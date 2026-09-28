import React from "react";
import BrandVector from "@/components/BrandVector";
import imgAllyraLogo from "@/imports/allyra_logo.webp";

interface MobileAllyraHeroProps {
  onBack: () => void;
  isDark?: boolean;
}

export function MobileAllyraHero({ onBack, isDark = false }: MobileAllyraHeroProps) {
  return (
    <section className="mobile-story-hero-section">
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

      {/* 2. Boxed Hero Card */}
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
              src={imgAllyraLogo}
              alt="Allyra Logo"
              className="mobile-story-allyra-logo"
            />
            <span className="mobile-story-brand-text">allyra.ai</span>
          </div>

          <h1 className="mobile-story-headline">
            Designing the evolution of an Enterprise AI Workforce
          </h1>
        </div>

        {/* Narrative & Metadata Block */}
        <div className="mobile-story-narrative-block">
          <p className="mobile-story-paragraph">
            AI wasn't struggling to generate answers. It was struggling to operate inside real workflows.
          </p>

          <p className="mobile-story-paragraph">
            Between 2024 and 2026, I helped shape <strong>Allyra</strong> from a no-code AI agent creation platform into <strong>an enterprise AI workspace</strong> capable of creating, training, orchestrating and operationalizing AI workers.
          </p>

          <div className="mobile-story-meta-group">
            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">ROLE</span>
              <span className="mobile-story-role-val">Product Lead</span>
            </div>

            <div className="mobile-story-meta-item">
              <span className="mobile-story-meta-label">FOCUS</span>
              <div className="mobile-story-focus-list">
                <p>/ Product Strategy</p>
                <p>/ Human-AI Interaction</p>
                <p>/ Agentic UX</p>
                <p>/ Enterprise AI Systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileAllyraHero;
