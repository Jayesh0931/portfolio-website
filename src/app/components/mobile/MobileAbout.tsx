import BrandVector from "@/components/BrandVector";

const CLIENTS = [
  "Pansophic Technologies",
  "allyra.ai",
  "Stanford Medicine",
  "tulah",
  "Tata Consultancy Services",
  "VousVous",
  "Joonify",
  "Vertisystem",
  "5Exceptions",
];

export function MobileAbout() {
  return (
    <section className="mobile-about-section" id="mobile-about">
      <div className="mobile-about-box">
        {/* Top Header Row spanning both columns with a single continuous divider line */}
        <div className="mobile-about-top-row">
          <div className="mobile-about-rail-top">
            <BrandVector theme="dark" width={38} height={26} />
          </div>
          <div className="mobile-about-header-cell">
            <span className="mobile-about-header-text">THE JOURNEY THAT SHAPED HOW I DESIGN</span>
          </div>
        </div>

        {/* Lower Main Content Area (Rail on left, Body & Ticker on right) */}
        <div className="mobile-about-main-row">
          {/* Left Column Rail Body */}
          <div className="mobile-about-rail-body">
            <div className="mobile-about-rail-rotated-label">
              <span>ABOUT</span>
            </div>
            <div className="mobile-about-rail-rotated-tag">
              <span>[ S-001 ]</span>
            </div>
          </div>

          {/* Right Main Column */}
          <div className="mobile-about-content">
            {/* Body Paragraphs */}
            <div className="mobile-about-body-text">
            <p>
              I'm <b>Jayesh Soni</b>, Product Lead &amp; AI Product Designer with 7+ years designing AI-native products, enterprise platforms, and operational systems.
              Experienced in Human–AI Interaction, Agentic UX, AI workflow design, prompt engineering, and product strategy, with end-to-end ownership from discovery through implementation.
            </p>
            <p>
              I design AI products that align human behaviour, business goals, and intelligent agents—bringing clarity to complexity and creating adaptive experiences that enterprise teams can confidently adopt and trust.
            </p>
          </div>

          {/* Client Ticker Marquee */}
          <div className="mobile-about-ticker-wrap">
            <div className="mobile-about-ticker-track">
              {Array(3)
                .fill(CLIENTS)
                .flat()
                .map((name, idx) => (
                  <span key={idx} className="mobile-about-ticker-item">
                    {name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

export default MobileAbout;
