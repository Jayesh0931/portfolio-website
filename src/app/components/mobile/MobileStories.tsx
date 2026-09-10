import BrandVector from "@/components/BrandVector";
import {
  imgAllyraCoverBig,
  imgCosCoverLarge,
  imgTulahLargeThumb,
  imgE31,
  imgE32
} from "./mobileAssets";

interface MobileStoriesProps {
  onNavigatePath: (path: string) => void;
}

export function MobileStories({ onNavigatePath }: MobileStoriesProps) {
  return (
    <section className="mobile-section" id="mobile-stories">
      {/* 1. Section Index Tab */}
      <div className="mobile-tab" style={{ marginBottom: "6px" }}>
        <div className="mobile-label">S–002</div>
      </div>

      {/* 2. Wordmark Header with Orange Dashed Dot */}
      <div className="mobile-wordmark-wrap">
        <span className="mobile-wordmark-ghost mobile-disp">S</span>
        <span className="mobile-wordmark-solid mobile-disp">
          TORIES<span className="dot" />
        </span>
      </div>

      {/* 3. Section Intro */}
      <div className="mobile-section-intro">
        A few selected stories that represent the problems I loved to solve and the impact I strive to create.
      </div>

      {/* Story 01: allyra.ai -> Uses imgAllyraCoverBig ("Large Thumb") */}
      <div 
        className="mobile-story-card" 
        id="mobile-story-1"
        data-custom-cursor="read-story"
        onClick={() => onNavigatePath("/allyra-story")}
      >
        <div className="mobile-story-visual" style={{ overflow: "hidden" }}>
          <img 
            src={imgAllyraCoverBig} 
            alt="allyra.ai large thumb" 
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(18, 10, 22, 0.2) 0%, rgba(18, 10, 22, 0.65) 100%)" }} />
          <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
            <BrandVector theme="light" width={38} height={25} />
          </div>
          <div className="readpill">Read Story</div>
        </div>

        <div className="mobile-story-body">
          <div className="meta">
            <span>Story 01</span>
            <span>Present</span>
          </div>
          <div className="stitle">allyra.ai</div>
          <div className="sdesc">Human–AI interaction platform for enterprise teams.</div>
          
          <div className="mobile-kv-label">Key insight</div>
          <div className="mobile-kv-text">
            The biggest challenge wasn't making AI more capable. It was helping people understand what the AI was doing, when to trust it, and how to work alongside it.
          </div>
          
          <div className="mobile-story-tags">
            <span>Product Strategy</span>
            <span>Product Design</span>
            <span>Design Systems</span>
          </div>
          
          <div className="mobile-read-more">Read more →</div>
        </div>
      </div>

      {/* Story 02: Campaign OS -> Uses imgCosCoverLarge ("Large Thumb") */}
      <div 
        className="mobile-story-card" 
        id="mobile-story-2"
        data-custom-cursor="read-story"
        onClick={() => onNavigatePath("/campaign-os-story")}
      >
        <div className="mobile-story-visual" style={{ overflow: "hidden" }}>
          <img 
            src={imgCosCoverLarge} 
            alt="Campaign OS large thumb" 
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(227, 106, 46, 0.2) 0%, rgba(138, 61, 20, 0.65) 100%)" }} />
          <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
            <BrandVector theme="light" width={38} height={25} />
          </div>
          <div className="readpill">Read Story</div>
        </div>

        <div className="mobile-story-body">
          <div className="meta">
            <span>Story 02</span>
            <span>2026</span>
          </div>
          <div className="stitle">Campaign OS</div>
          <div className="sdesc">
            AI-native operating system bringing campaign planning, execution &amp; optimization into one connected workflow.
          </div>
          
          <div className="mobile-kv-label">Key insight</div>
          <div className="mobile-kv-text">
            Marketing teams don't need more AI tools. They need AI that understands the entire campaign lifecycle and knows when to assist, collaborate, or simply stay out of the way.
          </div>
          
          <div className="mobile-story-tags">
            <span>AI Workflows</span>
            <span>Marketing OS</span>
            <span>Human-AI Interaction</span>
          </div>
          
          <div className="mobile-read-more">Read more →</div>
        </div>
      </div>

      {/* Story 03: tulah -> Uses imgTulahLargeThumb ("Large Thumb") */}
      <div 
        className="mobile-story-card" 
        id="mobile-story-3"
        data-custom-cursor="read-story"
        onClick={() => onNavigatePath("/tulah-story")}
      >
        <div className="mobile-story-visual" style={{ overflow: "hidden" }}>
          <img 
            src={imgTulahLargeThumb} 
            alt="tulah large thumb" 
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.65) 100%)" }} />
          <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
            <BrandVector theme="light" width={38} height={25} />
          </div>
          <div className="readpill">Read Story</div>
        </div>

        <div className="mobile-story-body">
          <div className="meta">
            <span>Story 03</span>
            <span>2025</span>
          </div>
          <div className="stitle">tulah</div>
          <div className="sdesc">
            Operational platform designed to simplify wellness workflows and service delivery.
          </div>

          <div className="mobile-kv-label">Key insight</div>
          <div className="mobile-kv-text">
            Most operational challenges aren't workflow problems. They're clarity problems disguised as workflows.
          </div>
          
          <div className="mobile-story-tags">
            <span>Wellness AI</span>
            <span>Operations</span>
            <span>Service Experience</span>
          </div>
          
          <div className="mobile-read-more">Read more →</div>
        </div>
      </div>

      {/* Story 04: VousVous */}
      <div 
        className="mobile-story-card" 
        id="mobile-story-4"
        data-custom-cursor="read-story"
      >
        <div className="mobile-story-visual" style={{ overflow: "hidden" }}>
          <img 
            src={imgE31} 
            alt="VousVous story thumb" 
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.65) 100%)" }} />
          <div className="readpill" style={{ position: "absolute", bottom: "16px" }}>Read Story</div>
        </div>

        <div className="mobile-story-body">
          <div className="meta">
            <span>Story 04</span>
            <span>2025</span>
          </div>
          <div className="stitle">VousVous</div>
          <div className="sdesc">
            AI-powered fashion platform for discovering, creating, and personalizing unique styles.
          </div>
          
          <div className="mobile-kv-label">Key insight</div>
          <div className="mobile-kv-text">
            Personalization becomes meaningful when people can create, not just choose.
          </div>
          
          <div className="mobile-story-tags">
            <span>Fashion Tech</span>
            <span>AI Personalization</span>
          </div>
          
          <div className="mobile-read-more">Read more →</div>
        </div>
      </div>

      {/* Story 05: Joonify */}
      <div 
        className="mobile-story-card" 
        id="mobile-story-5"
        data-custom-cursor="read-story"
      >
        <div className="mobile-story-visual" style={{ overflow: "hidden" }}>
          <img 
            src={imgE32} 
            alt="Joonify story thumb" 
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)" }} />
          <div className="readpill" style={{ position: "absolute", bottom: "16px" }}>Read Story</div>
        </div>

        <div className="mobile-story-body">
          <div className="meta">
            <span>Story 05</span>
            <span>2022</span>
          </div>
          <div className="stitle">Joonify</div>
          <div className="sdesc">
            Learning and assessment platform helping parents better understand how children learn and grow.
          </div>
          
          <div className="mobile-kv-label">Key insight</div>
          <div className="mobile-kv-text">
            When parents understand how children learn, better decisions naturally follow.
          </div>
          
          <div className="mobile-story-tags">
            <span>Ed-Tech</span>
            <span>Learning Experience</span>
            <span>Child Development</span>
          </div>
          
          <div className="mobile-read-more">Read more →</div>
        </div>
      </div>
    </section>
  );
}
