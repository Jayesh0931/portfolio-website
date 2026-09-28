import BrandVector from "@/components/BrandVector";

const focusData = [
  {
    num: "01",
    title: "PRODUCT\nDESIGN",
    skills: [
      "UX/UI Design",
      "Product Strategy",
      "Information Architecture",
      "User Research",
      "Interaction Design",
    ],
  },
  {
    num: "02",
    title: "HUMAN–AI\nINTERACTION",
    skills: [
      "Agentic UX",
      "AI Workflows",
      "Conversational Experiences",
      "AI Behavior Design",
      "Enterprise AI Systems",
    ],
  },
  {
    num: "03",
    title: "SYSTEMS\n& CRAFT",
    skills: [
      "Design Systems",
      "Prototyping",
      "Component Libraries",
      "Motion Design",
      "Design Operations",
    ],
  },
];

export function MobileFocus() {
  return (
    <section className="mobile-section" id="mobile-focus">
      <div className="mobile-focus-wrap">
        <div className="mobile-focus-box">
          <div className="mobile-focus-header">
            <div className="mobile-focus-header-left">
              <p className="mobile-focus-tag">[ s-003 ]</p>
              <h2 className="mobile-focus-title">FOCUS</h2>
            </div>
            <div className="mobile-focus-header-right">
              <BrandVector theme="dark" width={82} height={54} />
            </div>
          </div>

          <div className="mobile-focus-items">
            {focusData.map((item) => (
              <div key={item.num} className="mobile-focus-row">
                <span className="mobile-focus-num">{item.num}</span>
                <div className="mobile-focus-content">
                  <h3 className="mobile-focus-item-title">{item.title}</h3>
                  <div className="mobile-focus-item-list">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="mobile-focus-skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

