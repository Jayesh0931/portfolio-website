import {
  imgE1,
  imgE2,
  imgE31,
  imgE32,
  imgTulahCraft1
} from "./mobileAssets";

export function MobileCraft() {
  return (
    <section className="mobile-section" id="mobile-craft">
      <div className="mobile-tab" style={{ marginBottom: "6px" }}>
        <div className="mobile-label">S–004</div>
      </div>

      <div className="mobile-wordmark-wrap">
        <span className="mobile-wordmark-ghost mobile-disp">C</span>
        <span className="mobile-wordmark-solid mobile-disp">
          RAFT<span className="dot" />
        </span>
      </div>

      <div className="mobile-section-intro">
        Visual explorations, UI details, and craft outside the case studies.
      </div>

      {/* Masonry Grid with Real Assets */}
      <div className="mobile-craft-grid">
        <div className="mobile-cg1">
          <img src={imgE1} alt="Craft detail 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="mobile-cg1">
          <img src={imgE2} alt="Craft detail 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="mobile-cg3">
          <img src={imgTulahCraft1} alt="Craft detail 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="mobile-cg4">
          <img src={imgE31} alt="Craft detail 4" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="mobile-cg2" style={{ gridColumn: 2 }}>
          <img src={imgE32} alt="Craft detail 5" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
