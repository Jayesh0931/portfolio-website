import BrandVector from "@/components/BrandVector";
import { imgProfile } from "./mobileAssets";

export function MobileFinale() {
  return (
    <div className="mobile-finale-wrap" id="mobile-finale">
      <div className="mobile-finale-card">
        {/* Photo Header */}
        <div className="mobile-finale-photo" style={{ position: "relative" }}>
          <img 
            src={imgProfile} 
            alt="Jayesh Soni Profile" 
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(25, 11, 0, 0.1) 0%, rgba(25, 11, 0, 0.75) 100%)" }} />
          <div style={{ position: "relative", zIndex: 2, paddingBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BrandVector theme="light" width={110} height={70} />
          </div>
        </div>

        <div className="mobile-finale-body">
          <div className="mobile-label" style={{ marginBottom: "10px" }}>
            [ S–006 ]
          </div>

          <div className="mobile-finale-title mobile-disp">
            NEXT<span className="q">?</span>
          </div>

          <div className="mobile-finale-desc">
            That's my story so far. If you're building thoughtful AI products — or simply want to talk design — I'd love to hear from you.
          </div>

          <div className="mobile-finale-signoff">
            <div className="name">Jayesh Soni</div>
            <div className="role">Product Lead &amp; AI Product Designer</div>
          </div>

          <div className="mobile-finale-actions">
            <a href="tel:+15103448408" className="mobile-icon-btn" title="Phone">
              ☎
            </a>
            <a href="mailto:jayeshsoni0931@gmail.com" className="mobile-icon-btn" title="Email">
              ✉
            </a>
            <a 
              href="https://linkedin.com/in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-cta-btn"
            >
              in LinkedIn
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mobile-cta-btn solid"
            >
              ↓ Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
