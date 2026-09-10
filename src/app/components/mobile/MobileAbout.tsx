import BrandVector from "@/components/BrandVector";
import {
  imgAllyraLogo,
  imgCosLogo,
  imgTulahLogo
} from "./mobileAssets";

export function MobileAbout() {
  const clients = [
    { name: "allyra.ai", logo: imgAllyraLogo },
    { name: "Campaign OS", logo: imgCosLogo },
    { name: "tulah", logo: imgTulahLogo },
    { name: "Stanford Medicine", text: "STANFORD MEDICINE" },
    { name: "Vertisystem", text: "VERTISYSTEM" },
    { name: "Joonify", text: "JOONIFY" },
  ];

  return (
    <section className="mobile-section" id="mobile-about">
      {/* Section Tab */}
      <div className="mobile-tab">
        <div className="mobile-dashdot" />
        <div className="mobile-label">About</div>
        <div className="num">S–001</div>
      </div>

      {/* About Box */}
      <div className="mobile-about-body">
        <p style={{ letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginBottom: "10px", fontSize: "10px" }}>
          The journey that shaped how I design
        </p>
        <p>
          I'm <b>Jayesh Soni</b>, and for the past 7+ years I've been designing products at the intersection of people, systems, and emerging technologies. From healthcare and education to marketplaces and enterprise AI, my work has evolved into shaping Human–AI interactions, agentic experiences, and adaptive systems that people can understand and trust.
        </p>
        <p>
          Along the way, I've learned that the hardest product challenges are rarely just technical. They're human. The work I enjoy most is bringing clarity to complexity and creating experiences that people can confidently adopt and rely on.
        </p>
      </div>

      {/* Client Logo Ticker */}
      <div className="mobile-ticker-wrap" style={{ background: "#190b00", color: "#FFFDFA", borderColor: "#7b7a77" }}>
        <div className="mobile-ticker" style={{ animationDuration: "18s" }}>
          {[...clients, ...clients, ...clients].map((client, idx) => (
            <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "10px", opacity: 0.85 }}>
              {client.logo ? (
                <img src={client.logo} alt={client.name} style={{ height: "18px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              ) : (
                <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, letterSpacing: "0.5px" }}>{client.text}</span>
              )}
              <BrandVector theme="light" width={18} height={12} style={{ opacity: 0.5 }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
