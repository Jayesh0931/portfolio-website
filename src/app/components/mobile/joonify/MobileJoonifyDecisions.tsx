import React, { useState } from "react";
import BrandVector from "@/components/BrandVector";
import imgJoonifySS1 from "@/imports/joonify_SS1.webp";
import imgJoonifySS4 from "@/imports/joonify_SS4.webp";
import imgJoonifySS5 from "@/imports/joonify_SS5.webp";
import imgJoonifyMobile1 from "@/imports/joonify_mobile1.webp";
import { MobileImageLightbox } from "../common/MobileImageLightbox";

interface DecisionItem {
  id: string;
  tag: string;
  title: string;
  observation: string;
  decision: React.ReactNode;
  resultLabel: string;
  result: React.ReactNode;
  imageSrc: string;
}

const DECISIONS: DecisionItem[] = [
  {
    id: "01",
    tag: "[ KEY DECISION 01 ]",
    title: "Profile Before Prescribing",
    observation: "Parents are frequently overwhelmed by conflicting educational advice and generic course catalogues.",
    decision: (
      <span>
        <strong className="font-bold">Build a multi-dimensional child profile</strong> capturing personality, interests, and cognitive inclinations before recommending any courses.
      </span>
    ),
    resultLabel: "Result",
    result: (
      <strong className="font-bold">
        Recommendations felt tailored and credible, establishing parental trust from the first session.
      </strong>
    ),
    imageSrc: imgJoonifySS1,
  },
  {
    id: "02",
    tag: "[ KEY DECISION 02 ]",
    title: "Assessment Without Anxiety",
    observation: "Standard educational testing induces stress in young children and yields skewed, unhelpful results.",
    decision: (
      <span>
        <strong className="font-bold">Reframe talent discovery into gamified, 30-minute interactive quizzes</strong> and visual scenario exercises.
      </span>
    ),
    resultLabel: "Result",
    result: (
      <span>
        <strong className="font-bold">Children enjoyed the discovery journey</strong> while parents gained deep insight into cognitive and emotional traits.
      </span>
    ),
    imageSrc: imgJoonifySS4,
  },
  {
    id: "03",
    tag: "[ KEY DECISION 03 ]",
    title: "Connecting Insights to Daily Routine",
    observation: "Diagnostic reports often sit unused because parents don't know how to translate findings into daily habits.",
    decision: (
      <span>
        <strong className="font-bold">Directly link assessment outcomes to a smart weekly learning scheduler</strong> and course discovery engine.
      </span>
    ),
    resultLabel: "Result",
    result: (
      <span>
        <strong className="font-bold">Parents could immediately turn recommendations into structured, manageable weekly routines.</strong>
      </span>
    ),
    imageSrc: imgJoonifySS5,
  },
  {
    id: "04",
    tag: "[ KEY DECISION 04 ]",
    title: "Mobile Companion for Busy Parents",
    observation: "Parents don't always sit at desktop computers to manage schedules and check child updates.",
    decision: (
      <span>
        <strong className="font-bold">Build a focused mobile companion app</strong> for daily reminders, class links, and milestone tracking on the go.
      </span>
    ),
    resultLabel: "Result",
    result: (
      <span>
        <strong className="font-bold">Daily parent engagement increased significantly</strong> with zero friction in attendance and scheduling.
      </span>
    ),
    imageSrc: imgJoonifyMobile1,
  },
];

export function MobileJoonifyDecisions() {
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  return (
    <section id="mobile-joonify-decisions" className="mobile-story-decisions-section">
      {/* 1. Header Box */}
      <div className="mobile-story-decisions-header">
        <div className="mobile-story-decisions-header-titles">
          <span className="mobile-story-decisions-tag">
            [ OBSERVATION - DECISION - RESULT ]
          </span>
          <h2 className="mobile-story-decisions-title">KEY PRODUCT DECISIONS</h2>
        </div>
        <div className="mobile-story-decisions-brand">
          <BrandVector theme="dark" width={32} height={22} />
        </div>
      </div>

      {/* 2. Decisions List */}
      <div className="mobile-story-decisions-list">
        {DECISIONS.map((item) => (
          <div key={item.id} className="mobile-story-decision-card">
            {/* Tag & Title */}
            <span className="mobile-story-decision-card-tag">{item.tag}</span>
            <h3 className="mobile-story-decision-card-title">{item.title}</h3>

            {/* Takeaway Grid */}
            <div className="mobile-story-decision-takeaway-grid">
              <div className="mobile-story-decision-col">
                <span className="mobile-story-decision-col-label">Observation</span>
                <div className="mobile-story-decision-col-divider" />
                <p className="mobile-story-decision-col-text">{item.observation}</p>
              </div>

              <div className="mobile-story-decision-col">
                <span className="mobile-story-decision-col-label">Decision</span>
                <div className="mobile-story-decision-col-divider" />
                <p className="mobile-story-decision-col-text">{item.decision}</p>
              </div>

              <div className="mobile-story-decision-col">
                <span className="mobile-story-decision-col-label">{item.resultLabel}</span>
                <div className="mobile-story-decision-col-divider" />
                <p className="mobile-story-decision-col-text">{item.result}</p>
              </div>
            </div>

            {/* Image Panel with Lightbox */}
            <div
              className="mt-6 border border-[#7b7a77]/30 bg-[#f4eee6] p-2 rounded-[4px] cursor-pointer is-interactive"
              onClick={() => setActiveLightboxImg(item.imageSrc)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveLightboxImg(item.imageSrc);
                }
              }}
              aria-label={`View ${item.title} visual in fullscreen`}
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-auto object-contain max-h-[260px] mx-auto block"
              />
              <button
                type="button"
                className="mobile-story-opportunity-view-btn mt-2"
                aria-label="Tap to view in fullscreen"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span>Tap to view</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <MobileImageLightbox
        isOpen={Boolean(activeLightboxImg)}
        onClose={() => setActiveLightboxImg(null)}
        imageSrc={activeLightboxImg || ""}
        imageAlt="Decision Visual"
      />
    </section>
  );
}

export default MobileJoonifyDecisions;
