import React from "react";

export function MobileJoonifyOneThing() {
  return (
    <section id="mobile-joonify-onething" className="mobile-story-onething-section">
      {/* 1. Header with Stroke Text + Divider */}
      <div className="mobile-story-onething-header mb-6">
        <h2 className="font-outfit font-bold text-[30px] tracking-[2.5px] uppercase m-0 leading-tight">
          <span
            style={{
              WebkitTextStrokeWidth: "1.5px",
              WebkitTextStrokeColor: "#7B7A77",
              color: "#190B00",
              paintOrder: "stroke fill",
            }}
          >
            ONE THING
          </span>
          <span className="text-[#fffdfa] ml-2">I LEARNED</span>
        </h2>
        <div className="w-full h-[1px] bg-[rgba(255,253,250,0.15)] mt-3" />
      </div>

      {/* 2. Narrative Reflection Copy */}
      <div className="flex flex-col gap-5 font-outfit text-[16px] text-[#8c827a] leading-relaxed">
        <p className="m-0">
          Joonify was an opportunity to design beyond individual screens—
        </p>

        <p className="m-0">
          to connect a child&apos;s profile, assessment journey, and learning resources into a{" "}
          <strong className="font-bold text-[#fffdfa]">cohesive product experience.</strong>
        </p>

        <p className="m-0">
          In educational technology, simplicity is not about doing less. It&apos;s about removing friction between a parent&apos;s instinctive desire to support their child and the complex developmental data required to do it.
        </p>

        <p className="font-outfit font-bold text-[22px] leading-snug text-[#fffdfa] mt-2 m-0">
          When parents understand how children learn, <span className="text-[#335FE6]">better decisions naturally follow.</span>
        </p>
      </div>
    </section>
  );
}

export default MobileJoonifyOneThing;
