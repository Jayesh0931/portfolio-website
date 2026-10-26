import BrandVector from "@/components/BrandVector";

const CLIENTS = [
  "Tata Consultancy Services",
  "5Exceptions",
  "Joonify",
  "Vertisystem",
  "Stanford Medicine",
  "Vrozart Dackson",
  "Pansophic Technologies",
  "Allyra.ai",
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
            <div
              className="mobile-about-body-text"
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: 1.45,
                letterSpacing: "-0.015em",
                color: "#77695d",
              }}
            >
              <p style={{ margin: 0, lineHeight: 1.45 }}>
                {`I'm `}
                <strong style={{ color: "#190b00", fontWeight: 700 }}>Jayesh Soni</strong>
                {`, and with 7+ years in technology—including 6+ years in UX and product design—I work at the intersection of people, systems, and emerging technologies. From healthcare and education to marketplaces and enterprise AI, my work has evolved into shaping Human–AI interactions, agentic experiences, and adaptive systems that people can understand and trust.`}
              </p>
              <p style={{ margin: 0, lineHeight: 1.45 }}>
                {`Along the way, I've learned that the hardest product challenges are rarely just technical. They're human. The work I enjoy most is bringing clarity to complexity and creating experiences that people can confidently adopt and rely on.`}
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
