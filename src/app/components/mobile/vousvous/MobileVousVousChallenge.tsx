import React from "react";

export function MobileVousVousChallenge() {
  return (
    <section id="mobile-vousvous-challenge" className="mobile-story-challenge-section">
      {/* 1. Hero / Prototype Showcase Frame with Ambient Glow */}
      <div className="mobile-story-challenge-img-container">
        <div 
          className="mobile-story-challenge-glow" 
          style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.45) 0%, rgba(168, 85, 247, 0.45) 50%, rgba(59, 130, 246, 0.45) 100%)",
            filter: "blur(40px)",
          }}
        />
        <div className="mobile-story-challenge-img-frame border border-[#7b7a77]/50 rounded-[16px] overflow-hidden bg-[#190b00]/90 p-4 aspect-[16/10] flex items-center justify-center">
          <div className="text-center text-[#FFFDFA]">
            <span className="text-[#EE6C13] text-[28px] mb-2 block">✦</span>
            <p className="font-outfit font-bold text-[18px] text-[#FFFDFA] m-0">VousVous Discovery Platform</p>
            <p className="font-outfit text-[13px] text-[#A89F91] mt-1 m-0">Interactive visual exploration & generative wardrobe</p>
          </div>
        </div>
      </div>

      {/* 2. Challenge Supertag */}
      <p className="mobile-story-challenge-tag">
        <span>[ </span>
        <span className="mobile-story-challenge-tag-orange">THE CHALLENGE</span>
        <span> ]</span>
      </p>

      {/* 3. Challenge Headline */}
      <h2 className="mobile-story-challenge-title">
        Why Traditional Fashion Search Fails Style Expression
      </h2>

      {/* 4. Challenge Narrative Copy */}
      <div className="mobile-story-challenge-copy">
        <p>
          Modern e-commerce still treats fashion like commodities on a spreadsheet: filters for color, size, and category. But true personal style is declarative, emotional, and relational.
        </p>
        <p>
          People rarely think in keywords like <em>&quot;relaxed fit pleated beige trousers linen&quot;</em>. They think in moods, occasions, aesthetic references, and personal silhouettes.
        </p>
        <p>
          When users are forced into rigid search facets, the discovery process collapses into fatigue rather than inspiration.
        </p>
      </div>

      {/* 5. Bullet Highlights */}
      <div className="mobile-story-challenge-bullets">
        <div className="mobile-story-challenge-bullet-item">
          <span className="text-[#EE6C13] font-bold">/ Keyword Friction:</span> Text queries fail to capture aesthetic nuance and intent.
        </div>
        <div className="mobile-story-challenge-bullet-item">
          <span className="text-[#EE6C13] font-bold">/ Decision Fatigue:</span> Endless scrolling through repetitive catalog grids.
        </div>
        <div className="mobile-story-challenge-bullet-item">
          <span className="text-[#EE6C13] font-bold">/ Passive Consumption:</span> Users are constrained to choosing from presets rather than actively shaping looks.
        </div>
      </div>
    </section>
  );
}

export default MobileVousVousChallenge;
