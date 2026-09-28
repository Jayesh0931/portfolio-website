import React from "react";

export function MobileTulahOneThing() {
  return (
    <section id="mobile-tulah-onething" className="mobile-story-onething-section">
      {/* 1. Header with Stroke Text + Divider */}
      <div className="mobile-story-onething-header">
        <h2 className="mobile-story-onething-title">
          <span
            className="mobile-story-onething-stroke"
            style={{
              WebkitTextStrokeWidth: "1.5px",
              WebkitTextStrokeColor: "#7B7A77",
              color: "#190B00",
              paintOrder: "stroke fill",
            }}
          >
            ONE THING
          </span>
          <span className="mobile-story-onething-solid">I LEARNED</span>
        </h2>
        <div className="mobile-story-onething-divider" />
      </div>

      {/* 2. Narrative Reflection Copy */}
      <div className="mobile-story-onething-content">
        <p className="mobile-story-onething-p">
          The hardest part of designing complex systems isn&apos;t creating workflows.
        </p>

        <p className="mobile-story-onething-callout">
          It&apos;s creating shared understanding.
        </p>

        <p className="mobile-story-onething-p">
          Across this product, every challenge ultimately came back to clarity:
        </p>

        <div className="mobile-tulah-onething-list">
          <p>/ Helping guests understand what comes next.</p>
          <p>/ Helping specialists contribute within a common framework.</p>
          <p>/ Helping operations teams coordinate without unnecessary complexity.</p>
        </div>

        <p className="mobile-story-onething-p">
          Designing wellness wasn&apos;t about building better interfaces.
        </p>

        <p className="mobile-story-onething-conclusion">
          It was about helping dozens of specialists operate as{" "}
          <span className="mobile-story-onething-orange">one coordinated care system</span>.
        </p>
      </div>
    </section>
  );
}

export default MobileTulahOneThing;
