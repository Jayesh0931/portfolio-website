import {
  AllyraHeroCard,
  CampaignOSHeroCard,
  TulahHeroCard,
  VousVousHeroCard,
  JoonifyHeroCard,
  SharedMarqueeUnit
} from "@/components/hero/SharedHeroComponents";

interface MobileHeroProps {
  onNavigatePath: (path: string) => void;
  onScrollToSection: (id: string) => void;
}

export function MobileHero({ onNavigatePath, onScrollToSection }: MobileHeroProps) {
  return (
    <div className="mobile-hero" id="mobile-hero">
      {/* 1. Graphic Marquee Ribbon with exact web component scaled */}
      <div className="mobile-hero-marquee" aria-hidden="true">
        <div className="mobile-hero-marquee-scaler">
          <div className="mobile-hero-marquee-track">
            <SharedMarqueeUnit />
            <SharedMarqueeUnit />
          </div>
        </div>
      </div>

      {/* 2. Intro Meta Row */}
      <div className="mobile-hero-meta">
        <span>[ INTRO ]</span>
        <span>2026</span>
      </div>

      {/* 3. Hero Main Headline */}
      <h1 className="mobile-hero-title">
        DESIGNING HOW AI<br />
        BEHAVES IN PRODUCTS.
      </h1>

      {/* 4. Hero Subtitle */}
      <p className="mobile-hero-desc">
        I shape the moments where people<br />
        decide whether to trust intelligent systems.
      </p>

      {/* 5. Capability Pills (2 Rows, Warm Taupe) */}
      <div className="mobile-hero-tags">
        <div className="mobile-hero-tags-row">
          <span className="mobile-hero-pill-tag">HUMAN-AI INTERACTION</span>
          <span className="mobile-hero-pill-tag">AGENTIC UX</span>
        </div>
        <div className="mobile-hero-tags-row">
          <span className="mobile-hero-pill-tag">PRODUCT DESIGN</span>
          <span className="mobile-hero-pill-tag">ENTERPRISE SYSTEMS</span>
        </div>
      </div>

      {/* 6. Exact Web Bento Cards Stacked for Mobile */}
      <div style={{ display: "flex", flexDirection: "column", gap: "36px", padding: "0 20px" }}>
        {/* Card 1: allyra.ai */}
        <AllyraHeroCard 
          isMobile 
          onClick={() => onNavigatePath("/allyra-story")} 
          style={{ width: "100%", height: 280 }} 
        />

        {/* Card 2: CampaignOS */}
        <CampaignOSHeroCard 
          isMobile 
          onClick={() => onNavigatePath("/campaign-os-story")} 
          style={{ width: "100%", height: 195 }} 
        />

        {/* Card 3: tulah */}
        <TulahHeroCard 
          isMobile 
          onClick={() => onNavigatePath("/tulah-story")} 
          style={{ width: "100%", height: 195 }} 
        />

        {/* 2-Column Split: VousVous + Joonify */}
        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          <VousVousHeroCard 
            isMobile 
            onClick={() => onNavigatePath("/vousvous-story")} 
            style={{ flex: 1.38, height: 220 }} 
          />
          <JoonifyHeroCard 
            isMobile 
            onClick={() => onScrollToSection("mobile-stories")} 
            style={{ flex: 1, height: 220 }} 
          />
        </div>
      </div>
    </div>
  );
}

export default MobileHero;
