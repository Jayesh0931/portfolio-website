import React from "react";
import BrandVector from "@/components/BrandVector";

export function MobileCosValidation() {
  return (
    <section id="mobile-cos-validation" className="mobile-story-validation-section">
      {/* 1. Top Supertag */}
      <p className="mobile-story-validation-tag">
        <span>[ </span>
        <span className="mobile-story-validation-tag-orange">AI-NATIVE MARKETING</span>
        <span> ]</span>
      </p>

      {/* 2. Header Row: VALIDATION + Brand Vector */}
      <div className="mobile-story-validation-header-row">
        <h2 className="mobile-story-validation-title">VALIDATION</h2>
        <div className="mobile-story-validation-brand">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 3. Sub-header Context Description */}
      <p className="mobile-story-validation-intro-p">
        This pilot explored how AI could move beyond content generation to become an active collaborator throughout the entire campaign lifecycle.
      </p>

      {/* 4. Four Stacked Feature Items with Hairline Dividers */}
      <div className="mobile-story-validation-list">
        {/* Item 1: Connected Workflows */}
        <div className="mobile-story-validation-item">
          <div className="mobile-story-validation-icon-wrap">
            <i className="ri-route-line" aria-hidden="true" />
          </div>
          <h3 className="mobile-story-validation-item-title">Connected Workflows</h3>
          <p className="mobile-story-validation-item-desc">
            Unified campaign planning, execution and optimization into one continuous experience instead of disconnected marketing tools.
          </p>
        </div>

        {/* Item 2: Conversational Analytics */}
        <div className="mobile-story-validation-item">
          <div className="mobile-story-validation-icon-wrap">
            <i className="ri-chat-smile-ai-line" aria-hidden="true" />
          </div>
          <h3 className="mobile-story-validation-item-title">Conversational Analytics</h3>
          <p className="mobile-story-validation-item-desc">
            Transformed performance dashboards into contextual AI conversations that helped marketers understand why, not just what.
          </p>
        </div>

        {/* Item 3: Living Insights */}
        <div className="mobile-story-validation-item">
          <div className="mobile-story-validation-icon-wrap">
            <i className="ri-sparkling-fill" aria-hidden="true" />
          </div>
          <h3 className="mobile-story-validation-item-title">Living Insights</h3>
          <p className="mobile-story-validation-item-desc">
            Introduced reusable AI insight blocks that could be explored, remixed and expanded as campaigns evolved.
          </p>
        </div>

        {/* Item 4: Calm Monitoring */}
        <div className="mobile-story-validation-item">
          <div className="mobile-story-validation-icon-wrap">
            <i className="ri-radar-line" aria-hidden="true" />
          </div>
          <h3 className="mobile-story-validation-item-title">Calm Monitoring</h3>
          <p className="mobile-story-validation-item-desc">
            Validated autonomous monitoring where AI surfaced only meaningful moments for human intervention.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MobileCosValidation;
