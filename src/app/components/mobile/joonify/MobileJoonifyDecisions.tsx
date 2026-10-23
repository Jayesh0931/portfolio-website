import React, { useState } from "react";
import BrandVector from "@/components/BrandVector";
import imgJoonifySS1 from "@/imports/joonify_SS1.webp";
import imgJoonifySS4 from "@/imports/joonify_SS4.webp";
import imgJoonifySS5 from "@/imports/joonify_SS5.webp";
import imgJoonifyMobile1 from "@/imports/joonify_mobile1.webp";
import imgJoonifyMobile2 from "@/imports/joonify_mobile2.webp";
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
  imageSrc2?: string;
  isDarkPanel?: boolean;
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
    imageSrc2: imgJoonifyMobile2,
    isDarkPanel: true,
  },
];

function DecisionCard({
  item,
  onOpenLightbox,
}: {
  item: DecisionItem;
  onOpenLightbox: (src: string, alt: string) => void;
}) {
  return (
    <div className="bg-[#fffdfa] border border-[#7b7a77] flex flex-col">
      {/* Top Text Content */}
      <div className="p-5 flex flex-col">
        {/* Tag */}
        <p className="font-inter font-bold text-[11px] text-[#EE6C13] uppercase tracking-wider m-0 mb-2">
          {item.tag}
        </p>

        {/* Title */}
        <h3 className="font-outfit font-bold text-[22px] text-[#190b00] leading-tight m-0 mb-5">
          {item.title}
        </h3>

        {/* Observation */}
        <div className="mb-4">
          <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
            Observation
          </span>
          <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
          <p className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
            {item.observation}
          </p>
        </div>

        {/* Decision */}
        <div className="mb-4">
          <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
            Decision
          </span>
          <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
          <div className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
            {item.decision}
          </div>
        </div>

        {/* Result */}
        <div>
          <span className="font-outfit font-normal text-[13px] text-[#77695d] block mb-1">
            {item.resultLabel}
          </span>
          <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2" />
          <div className="font-outfit text-[14px] text-[#190b00] leading-relaxed m-0">
            {item.result}
          </div>
        </div>
      </div>

      {/* Bottom Mockup Panel */}
      <div
        className={`${
          item.isDarkPanel ? "bg-[#1F2231]" : "bg-[#e0d7cd]"
        } border-t border-[#7b7a77] p-5 flex flex-col items-center justify-center cursor-pointer is-interactive relative overflow-hidden`}
        onClick={() => onOpenLightbox(item.imageSrc, item.title)}
        role="button"
        tabIndex={0}
        aria-label={`Preview ${item.title} visual in fullscreen`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenLightbox(item.imageSrc, item.title);
          }
        }}
      >
        {item.imageSrc2 ? (
          <div className="flex items-center justify-center gap-4 w-full py-2">
            <img
              src={item.imageSrc}
              alt={`${item.title} - Screen 1`}
              className="max-h-[230px] w-auto object-contain drop-shadow-xl"
            />
            <img
              src={item.imageSrc2}
              alt={`${item.title} - Screen 2`}
              className="max-h-[230px] w-auto object-contain drop-shadow-xl"
            />
          </div>
        ) : (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="w-full max-h-[240px] object-contain drop-shadow-md rounded-[4px]"
          />
        )}

        {/* Tap to View Button */}
        <div
          className={`w-full pt-3 flex items-center justify-center gap-1.5 text-[11px] font-outfit font-bold uppercase tracking-wider ${
            item.isDarkPanel ? "text-[#fffdfa]" : "text-[#190b00]"
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          <span>Tap to view visual</span>
        </div>
      </div>
    </div>
  );
}

export function MobileJoonifyDecisions() {
  const [lightboxData, setLightboxData] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="mobile-joonify-decisions" className="mobile-story-decisions-section">
      {/* Section Header */}
      <div className="mobile-story-decisions-header">
        <div className="mobile-story-decisions-brand">
          <BrandVector theme="dark" width={56} height={38} />
        </div>
        <div className="mobile-story-decisions-header-divider" />
        <div className="mobile-story-decisions-header-titles">
          <p className="mobile-story-decisions-tag">
            [ OBSERVATION - DECISION - RESULT ]
          </p>
          <h2 className="mobile-story-decisions-title">
            KEY PRODUCT<br />DECISIONS
          </h2>
        </div>
      </div>

      {/* Decision Cards List */}
      <div className="mobile-story-decisions-list">
        {DECISIONS.map((d) => (
          <DecisionCard
            key={d.id}
            item={d}
            onOpenLightbox={(src, alt) => setLightboxData({ src, alt })}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <MobileImageLightbox
        isOpen={Boolean(lightboxData)}
        onClose={() => setLightboxData(null)}
        src={lightboxData?.src || ""}
        alt={lightboxData?.alt || "Decision Visual"}
        type="image"
      />
    </section>
  );
}

export default MobileJoonifyDecisions;
