import React from "react";

export function MobileAllyraOneThing() {
  return (
    <section id="mobile-allyra-onething" className="mobile-story-onething-section">
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
          I started this journey believing the challenge was making AI easier to build. Eventually realized the challenge was making AI easier to trust.
        </p>

        <p className="mobile-story-onething-p">
          Every major product decision, from training and orchestration, to governance and human review came from the same realization:
        </p>

        <p className="mobile-story-onething-callout">
          / People don&apos;t want AI / People want reliable outcomes.
        </p>

        <p className="mobile-story-onething-p">
          The future isn&apos;t autonomous AI.
        </p>

        <p className="mobile-story-onething-conclusion">
          It&apos;s well-designed collaboration between{" "}
          <span className="mobile-story-onething-orange">humans</span> and{" "}
          <span className="mobile-story-onething-orange">AI</span>.
        </p>
      </div>
    </section>
  );
}

export default MobileAllyraOneThing;
