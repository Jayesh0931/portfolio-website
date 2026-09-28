import React from "react";

export function MobileCosOneThing() {
  return (
    <section id="mobile-cos-onething" className="mobile-story-onething-section">
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
          Designing AI products isn&apos;t about adding chat to existing software.
        </p>

        <p className="mobile-story-onething-p">
          The real challenge is{" "}
          <strong className="mobile-story-onething-callout">
            deciding when AI should guide, when it should collaborate and when it should quietly stay out of the way.
          </strong>
        </p>

        <p className="mobile-story-onething-p">
          This project reinforced that the best AI experiences don&apos;t ask users to adapt to machines—
        </p>

        <p className="mobile-story-onething-conclusion">
          they adapt to the way people already{" "}
          <span className="mobile-story-onething-orange">think</span>,{" "}
          <span className="mobile-story-onething-orange">plan</span> and{" "}
          <span className="mobile-story-onething-orange">make decisions</span>.
        </p>
      </div>
    </section>
  );
}

export default MobileCosOneThing;
