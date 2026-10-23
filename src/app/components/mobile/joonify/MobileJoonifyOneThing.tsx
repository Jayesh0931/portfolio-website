import React from "react";

export function MobileJoonifyOneThing() {
  return (
    <section id="mobile-joonify-onething" className="mobile-story-onething-section">
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
          Joonify was an opportunity to design beyond individual screens—
        </p>

        <p className="mobile-story-onething-p">
          to connect a child&apos;s profile, assessment journey, and learning resources into a{" "}
          <strong className="font-bold text-[#fffdfa]">cohesive product experience.</strong>
        </p>

        <p className="mobile-story-onething-p">
          In educational technology, simplicity is not about doing less. It&apos;s about removing friction between a parent&apos;s instinctive desire to support their child and the complex developmental data required to do it.
        </p>

        <p className="mobile-story-onething-conclusion">
          When parents understand how children learn,{" "}
          <span className="text-[#EE6C13] font-bold">better decisions naturally follow.</span>
        </p>
      </div>
    </section>
  );
}

export default MobileJoonifyOneThing;
