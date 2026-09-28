import React from "react";
import BrandVector from "@/components/BrandVector";

export function MobileAllyraImpact() {
  return (
    <section id="mobile-allyra-impact" className="mobile-story-impact-section">
      {/* 1. Top Tag */}
      <p className="mobile-story-impact-tag">
        <span>[ AGENT CREATION → </span>
        <span className="mobile-story-impact-tag-orange">ENTERPRISE AI PLATFORM</span>
        <span> ]</span>
      </p>

      {/* 2. Header Row: IMPACT + Brand Vector */}
      <div className="mobile-story-impact-header-row">
        <h2 className="mobile-story-impact-title">IMPACT</h2>
        <div className="mobile-story-impact-brand">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 3. Four Stacked Metric Cards */}
      <div className="mobile-story-impact-metrics">
        {/* Metric 1 */}
        <div className="mobile-story-impact-metric-item">
          <span className="mobile-story-impact-num">50+</span>
          <h3 className="mobile-story-impact-subhead">Enterprise Demonstrations</h3>
          <p className="mobile-story-impact-desc">
            Validated through enterprise conversations, workshops and live product demos.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="mobile-story-impact-metric-item">
          <span className="mobile-story-impact-num">20+</span>
          <h3 className="mobile-story-impact-subhead">Enterprise Use Allyra</h3>
          <p className="mobile-story-impact-desc">
            Successfully onboarded into production environments.
          </p>
        </div>

        {/* Metric 3 */}
        <div className="mobile-story-impact-metric-item">
          <span className="mobile-story-impact-num">7+</span>
          <h3 className="mobile-story-impact-subhead">Operational AI Workflows</h3>
          <p className="mobile-story-impact-desc">
            / Hiring / HR / Communication / Presentations / Scheduling/ Productivity / Sales
          </p>
        </div>

        {/* Metric 4 */}
        <div className="mobile-story-impact-metric-item">
          <span className="mobile-story-impact-num">~60%</span>
          <h3 className="mobile-story-impact-subhead">Administrative Effort Reduced</h3>
          <p className="mobile-story-impact-desc">
            Reduced repetitive work through AI-powered operational workflows.
          </p>
        </div>
      </div>

      {/* 4. Bottom Pullquote Card */}
      <div className="mobile-story-impact-quote-card">
        {/* Quote Decoration Icon (directly reused from web) */}
        <div className="mobile-story-impact-quote-mark" aria-hidden="true">
          ”
        </div>

        {/* Quote Text */}
        <p className="mobile-story-impact-quote-text">
          <span>"The platform evolved beyond agent creation into a foundation for </span>
          <strong className="mobile-story-impact-quote-orange">Enterprise AI Operations.</strong>
          <span>"</span>
        </p>
      </div>
    </section>
  );
}

export default MobileAllyraImpact;
