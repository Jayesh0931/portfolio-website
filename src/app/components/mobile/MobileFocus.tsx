import BrandVector from "@/components/BrandVector";

export function MobileFocus() {
  return (
    <section className="mobile-section" id="mobile-focus">
      <div className="mobile-tab">
        <div className="mobile-dashdot" />
        <div className="mobile-label">Focus</div>
        <div className="num">S–003</div>
      </div>

      {/* Focus Block 01 */}
      <div className="mobile-focus-block">
        <div className="mobile-focus-head">
          <span className="n">01</span>
          <span className="t" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Product Design</span>
            <BrandVector theme="dark" width={18} height={12} style={{ opacity: 0.7 }} />
          </span>
        </div>
        <ul>
          <li>UX/UI Design</li>
          <li>Product Strategy</li>
          <li>Information Architecture</li>
          <li>User Research</li>
          <li>Interaction Design</li>
        </ul>
      </div>

      {/* Focus Block 02 */}
      <div className="mobile-focus-block">
        <div className="mobile-focus-head">
          <span className="n">02</span>
          <span className="t" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Human–AI Interaction</span>
            <BrandVector theme="dark" width={18} height={12} style={{ opacity: 0.7 }} />
          </span>
        </div>
        <ul>
          <li>Agentic UX</li>
          <li>AI Workflows</li>
          <li>Conversational Experiences</li>
          <li>AI Behavior Design</li>
          <li>Enterprise AI Systems</li>
        </ul>
      </div>

      {/* Focus Block 03 */}
      <div className="mobile-focus-block" style={{ marginBottom: 0 }}>
        <div className="mobile-focus-head">
          <span className="n">03</span>
          <span className="t" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>Systems &amp; Craft</span>
            <BrandVector theme="dark" width={18} height={12} style={{ opacity: 0.7 }} />
          </span>
        </div>
        <ul>
          <li>Design Systems</li>
          <li>Prototyping</li>
          <li>Component Libraries</li>
          <li>Motion Design</li>
          <li>Design Operations</li>
        </ul>
      </div>
    </section>
  );
}
