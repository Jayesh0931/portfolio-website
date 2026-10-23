import React from "react";
import BrandVector from "@/components/BrandVector";

export function MobileAllyraImpact() {
  return (
    <section id="mobile-allyra-impact" className="mobile-story-impact-section">
      {/* 1. Top Tag */}
      <p className="mobile-story-impact-tag">
        <span>[ AGENT CREATION → </span>
        <span className="mobile-story-impact-tag-orange">ENTERPRISE SCALE &amp; ADOPTION</span>
        <span> ]</span>
      </p>

      {/* 2. Header Row: SCALE & ADOPTION + Brand Vector */}
      <div className="mobile-story-impact-header-row">
        <h2 className="mobile-story-impact-title mobile-story-scale-title">SCALE &amp; ADOPTION</h2>
        <div className="mobile-story-impact-brand">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 3. Two Stacked Metric Cards */}
      <div className="mobile-story-impact-metrics">
        {/* Metric 1 */}
        <div className="mobile-story-impact-metric-item">
          <span className="mobile-story-impact-num">15+</span>
          <h3 className="mobile-story-impact-subhead">Organisations Reached</h3>
          <p className="mobile-story-impact-desc">
            Expanded reach across 15+ organisations, including a pilot with a leading Indian enterprise group, through platform usage and API integrations.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="mobile-story-impact-metric-item">
          <span className="mobile-story-impact-num">19+</span>
          <h3 className="mobile-story-impact-subhead">AI Agents Designed</h3>
          <p className="mobile-story-impact-desc">
            Designed interaction patterns and task-focused, human-in-the-loop workflows for 19+ AI agents across enterprise operational domains.
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
