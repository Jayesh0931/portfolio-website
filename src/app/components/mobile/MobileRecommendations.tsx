import { useState } from "react";
import {
  imgEllipseSteve,
  imgEllipseAnkit,
  imgEllipseAnmol
} from "./mobileAssets";

const testimonials = [
  {
    avatarImg: imgEllipseSteve,
    name: "Steve Morris",
    role: "Software Architect · Stanford Medicine",
    quote: `"Jayesh's work was instrumental in the success of a major application for Stanford Medicine's medical school students. He consistently exceeded expectations through his expertise in UI/UX design, rapid execution, and collaborative approach."`,
    linkedin: "https://linkedin.com/in/",
  },
  {
    avatarImg: imgEllipseAnkit,
    name: "Ankit Mishra",
    role: "Senior Developer · Vertisystem",
    quote: `"Jayesh possesses a deep understanding of user-centered design and consistently transforms complex user needs into intuitive, engaging experiences. His strategic thinking, craftsmanship, and collaborative approach make him an exceptional designer."`,
    linkedin: "https://linkedin.com/in/",
  },
  {
    avatarImg: imgEllipseAnmol,
    name: "Anmol Gupta",
    role: "General Manager · Joonify",
    quote: `"Jayesh consistently delivered high-quality work that exceeded expectations. His creativity, attention to detail, openness to feedback, and commitment to iteration made him an invaluable collaborator throughout our time working together."`,
    linkedin: "https://linkedin.com/in/",
  },
];

export function MobileRecommendations() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeRec = testimonials[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="mobile-section" id="mobile-recommendations">
      <div className="mobile-tab">
        <div className="mobile-dashdot" />
        <div className="mobile-label">Recommendations</div>
        <div className="num">S–005</div>
      </div>

      <div className="mobile-rec-card" onClick={handleNext}>
        <div className="mobile-rec-person">
          <div className="mobile-avatar" style={{ overflow: "hidden" }}>
            <img 
              src={activeRec.avatarImg} 
              alt={activeRec.name} 
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} 
            />
          </div>
          <div>
            <div className="mobile-rec-name">{activeRec.name}</div>
            <div className="mobile-rec-role">{activeRec.role}</div>
          </div>
        </div>

        <div className="mobile-rec-quote">
          {activeRec.quote}
        </div>

        <a 
          href={activeRec.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mobile-rec-link"
          onClick={(e) => e.stopPropagation()}
        >
          View on LinkedIn ↗
        </a>
      </div>

      {/* Progress Segments */}
      <div className="mobile-rec-progress">
        {testimonials.map((_, i) => (
          <div 
            key={i} 
            className={`seg ${i === activeIndex ? "active" : i < activeIndex ? "done" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            <div className="fill" />
          </div>
        ))}
      </div>

      <div style={{ padding: "6px 16px 0", fontSize: "9.5px", opacity: 0.5, cursor: "pointer" }} onClick={handleNext}>
        tap / swipe for more →
      </div>
    </section>
  );
}
