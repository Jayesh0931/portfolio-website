import {
  imgAllyraCoverSmall,
  imgCosCoverSmall,
  imgTulahSmallThumb,
  imgE31,
  imgE32,
  imgAllyraLogo,
  imgCosLogo,
  imgTulahLogo
} from "./mobileAssets";

interface MobileHeroProps {
  onNavigatePath: (path: string) => void;
  onScrollToSection: (id: string) => void;
}

export function MobileHero({ onNavigatePath, onScrollToSection }: MobileHeroProps) {
  return (
    <div className="mobile-hero" id="mobile-hero">
      {/* 1. Outlined Infinite Marquee */}
      <div className="mobile-marquee-outline-wrap">
        <div className="mobile-marquee-outline mobile-disp">
          <span>DESIGNING AI BEHAVIOR</span>
          <span>DESIGNING AI BEHAVIOR</span>
        </div>
      </div>

      {/* 2. Intro Meta Label */}
      <div className="mobile-hero-meta">
        <div className="mobile-label">[ Intro ] 2026</div>
      </div>

      {/* 3. Hero Main Headline */}
      <div className="mobile-hero-title">
        Designing how AI behaves in products.
      </div>

      {/* 4. Hero Subtitle Description */}
      <div className="mobile-hero-desc">
        I shape the moments where people decide whether to trust intelligent systems.
      </div>

      {/* 5. Capability Tags Row */}
      <div className="mobile-tag-row">
        <span className="mobile-tag">Human-AI Interaction</span>
        <span className="mobile-tag">Agentic UX</span>
        <span className="mobile-tag">Product Design</span>
        <span className="mobile-tag">Enterprise Systems</span>
      </div>

      {/* 6. Scroll CTA */}
      <div 
        className="mobile-scroll-cta"
        onClick={() => onScrollToSection("mobile-stories")}
      >
        Scroll to explore ↓
      </div>

      {/* 7. Bento Horizontal Snap Scroll Carousel (using Small Thumbs) */}
      <div className="mobile-hscroll">
        {/* Bento Card 1: allyra.ai (Story 1 · Present) -> Uses imgAllyraCoverSmall */}
        <div 
          className="mobile-bcard allyra"
          data-custom-cursor="hero-story"
          onClick={() => onNavigatePath("/allyra-story")}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img 
            src={imgAllyraCoverSmall} 
            alt="allyra.ai small thumb" 
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(18, 10, 22, 0.3) 0%, rgba(18, 10, 22, 0.92) 100%)" }} />
          
          <div className="tagline">
            <span>Story 1</span>
            <span>Present</span>
          </div>

          <div className="body">
            <div style={{ marginBottom: "6px", display: "flex", alignItems: "center" }}>
              <img src={imgAllyraLogo} alt="allyra.ai logo" style={{ height: "18px", objectFit: "contain" }} />
            </div>
            <div className="t">allyra.ai</div>
            <div className="d">Scaling AI from individual agents to enterprise-grade workflows.</div>
            <div className="go">Go to Story</div>
          </div>
        </div>

        {/* Bento Card 2: VousVous (Story 4 · 2025) -> Uses imgE31 */}
        <div 
          className="mobile-bcard vous"
          data-custom-cursor="hero-story"
          onClick={() => onScrollToSection("mobile-story-4")}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img 
            src={imgE31} 
            alt="VousVous small thumb" 
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14, 14, 14, 0.3) 0%, rgba(14, 14, 14, 0.92) 100%)" }} />

          <div className="tagline">
            <span>Story 4</span>
            <span>2025</span>
          </div>

          <div className="body">
            <div className="t">VousVous</div>
            <div className="d">Designing trustworthy AI interactions for modern relationships.</div>
            <div className="go">Go to Story</div>
          </div>
        </div>

        {/* Bento Card 3: Joonify (Story 5 · 2022) -> Uses imgE32 */}
        <div 
          className="mobile-bcard joonify"
          data-custom-cursor="hero-story"
          onClick={() => onScrollToSection("mobile-story-5")}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img 
            src={imgE32} 
            alt="Joonify small thumb" 
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(237, 230, 211, 0.6) 0%, rgba(237, 230, 211, 0.95) 100%)" }} />

          <div className="tagline">
            <span>Story 5</span>
            <span>2022</span>
          </div>

          <div className="body">
            <div className="t">Joonify</div>
            <div className="d">Learning platform helping parents understand how kids grow.</div>
            <div className="go">Go to Story</div>
          </div>
        </div>

        {/* Bento Card 4: tulah (Story 3 · 2025) -> Uses imgTulahSmallThumb */}
        <div 
          className="mobile-bcard tulah"
          data-custom-cursor="hero-story"
          onClick={() => onNavigatePath("/tulah-story")}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img 
            src={imgTulahSmallThumb} 
            alt="tulah small thumb" 
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17, 17, 17, 0.3) 0%, rgba(17, 17, 17, 0.92) 100%)" }} />

          <div className="tagline">
            <span>Story 3</span>
            <span>2025</span>
          </div>

          <div className="body">
            <div style={{ marginBottom: "6px", display: "flex", alignItems: "center" }}>
              <img src={imgTulahLogo} alt="tulah logo" style={{ height: "16px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>
            <div className="t">tulah</div>
            <div className="d">Simplifying wellness operations through thoughtful workflow design.</div>
            <div className="go">Go to Story</div>
          </div>
        </div>

        {/* Bento Card 5: CampaignOS (Story 2 · 2026) -> Uses imgCosCoverSmall */}
        <div 
          className="mobile-bcard campaign"
          data-custom-cursor="hero-story"
          onClick={() => onNavigatePath("/campaign-os-story")}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img 
            src={imgCosCoverSmall} 
            alt="Campaign OS small thumb" 
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(227, 106, 46, 0.5) 0%, rgba(138, 61, 20, 0.92) 100%)" }} />

          <div className="tagline">
            <span>Story 2</span>
            <span>2026</span>
          </div>

          <div className="body">
            <div style={{ marginBottom: "6px", display: "flex", alignItems: "center" }}>
              <img src={imgCosLogo} alt="CampaignOS logo" style={{ height: "18px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>
            <div className="t">CampaignOS</div>
            <div className="d">Reimagining campaign planning &amp; optimization with AI-native workflows.</div>
            <div className="go">Go to Story</div>
          </div>
        </div>
      </div>

      {/* 8. Scroll Hint */}
      <div className="mobile-scroll-hint">← swipe to browse all 5 stories →</div>
    </div>
  );
}
