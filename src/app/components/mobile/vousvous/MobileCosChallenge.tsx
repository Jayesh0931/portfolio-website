import React from "react";

export function MobileCosChallenge() {
  return (
    <section id="mobile-cos-challenge" className="mobile-story-challenge-section">
      {/* 1. Hero Composite Showcase Frame with Ambient Glow */}
      <div className="mobile-story-challenge-img-container">
        <div
          className="mobile-story-challenge-glow"
          style={{
            background:
              "linear-gradient(110deg, #10b981 0%, #a855f7 50%, #3b82f6 100%)",
            filter: "blur(60px)",
            opacity: 0.85,
          }}
        />
        <div
          className="mobile-story-challenge-img-frame flex items-center justify-center bg-[#190b00] p-6 text-center"
          style={{
            aspectRatio: "16/10",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            boxShadow:
              "-20px 0 45px rgba(16, 185, 129, 0.35), 0 0 50px rgba(168, 85, 247, 0.4), 20px 0 45px rgba(59, 130, 246, 0.35)",
          }}
        >
          <div>
            <span className="text-[#EE6C13] text-[36px] block mb-2">✦</span>
            <p className="font-outfit font-bold text-[18px] text-[#FFFDFA] m-0">
              VousVous Experience Studio
            </p>
            <p className="font-outfit text-[12px] text-[#A89F91] mt-1 m-0">
              Declarative styling &amp; multimodal curation
            </p>
          </div>
        </div>
      </div>

      {/* 2. Section Header: THE CHALLENGE + Divider */}
      <div className="mobile-story-challenge-header">
        <h2 className="mobile-story-challenge-title">THE CHALLENGE</h2>
        <div className="mobile-story-challenge-divider" />
      </div>

      {/* 3. Narrative Content */}
      <div className="mobile-story-challenge-content">
        <p className="mobile-story-challenge-p">
          Most fashion platforms assume users know exactly what they&apos;re looking for.
        </p>

        <p className="mobile-story-challenge-p">
          In reality, <strong>fashion shopping is often exploratory.</strong> People discover styles while browsing, save pieces they like, compare options, and gradually refine their preferences.
        </p>

        <p className="mobile-story-challenge-p">
          Traditional e-commerce patterns interrupt this process with complex filters, large product grids, and overwhelming choices.
        </p>

        <p className="mobile-story-challenge-p">
          The opportunity was to design an experience that felt less like searching a catalogue and more like discovering personal style.
        </p>

        <p className="mobile-story-challenge-callout font-bold text-[#FFFDFA]">
          &quot;Discovery should feel intuitive—not exhausting.&quot;
        </p>
      </div>
    </section>
  );
}

export default MobileCosChallenge;
