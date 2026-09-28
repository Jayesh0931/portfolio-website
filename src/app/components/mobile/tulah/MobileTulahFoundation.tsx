import React from "react";
import BrandVector from "@/components/BrandVector";

interface FoundationMetric {
  number: string;
  label: string;
  desc: string;
}

const FOUNDATION_METRICS: FoundationMetric[] = [
  {
    number: "14+",
    label: "Operational Roles",
    desc: "Unified CRM, Planning, Coordination, Consultation, Operations and Guest experiences through role-based workflows.",
  },
  {
    number: "6+",
    label: "Wellness Disciplines",
    desc: "Unified recommendations from Medical, Ayurveda, Nutrition, Fitness, Yoga and Diagnostics into one personalized retreat plan.",
  },
  {
    number: "~65%",
    label: "Admin Overhead Reduced",
    desc: "Digitized planning, scheduling and execution significantly reduced administrative coordination across departments.",
  },
  {
    number: "500+",
    label: "Care Activities",
    desc: "Across the guest lifecycle—activities, sessions, therapies, medications, meals, diagnostics, notifications, follow-ups & more.",
  },
];

export function MobileTulahFoundation() {
  return (
    <section id="mobile-tulah-foundation" className="mobile-story-impact-section">
      {/* 1. Top Supertag */}
      <p className="mobile-story-impact-tag">
        <span>[ </span>
        <span className="mobile-story-impact-tag-orange">CARE ORCHESTRATION</span>
        <span> ]</span>
      </p>

      {/* 2. Header Row: FOUNDATION + Brand Vector */}
      <div className="mobile-story-impact-header-row">
        <h2 className="mobile-story-impact-title mobile-story-foundation-title">FOUNDATION</h2>
        <div className="mobile-story-impact-brand">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 3. Four Stacked Metric Items with Hairline Dividers */}
      <div className="mobile-story-impact-metrics">
        {FOUNDATION_METRICS.map((metric, idx) => (
          <div key={idx} className="mobile-story-impact-metric-item">
            <span className="mobile-story-impact-num">{metric.number}</span>
            <h3 className="mobile-story-impact-subhead">{metric.label}</h3>
            <p className="mobile-story-impact-desc">{metric.desc}</p>
          </div>
        ))}
      </div>

      {/* 4. Bottom Pullquote Card with Georgia Quotation Mark */}
      <div className="mobile-story-impact-quote-card">
        <div className="mobile-story-impact-quote-mark" aria-hidden="true">
          ”
        </div>
        <p className="mobile-story-impact-quote-text">
          <span>&ldquo;The platform wasn&apos;t built to manage activities—</span>
          <strong className="mobile-story-impact-quote-orange">
            it was built to orchestrate personalized care.
          </strong>
          <span>&rdquo;</span>
        </p>
      </div>
    </section>
  );
}

export default MobileTulahFoundation;
