import { useState } from "react";
import BrandVector from "@/components/BrandVector";

interface MobileHeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export function MobileHeader({ onNavigateSection }: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="mobile-header">
        <div 
          className="mobile-pill mobile-disp"
          onClick={() => handleNavClick("mobile-top")}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <div style={{ display: "flex", alignItems: "center", transform: "scale(0.85)" }}>
            <BrandVector theme="dark" width={22} height={15} />
          </div>
          <span>JAYESH SONI</span>
        </div>

        <button 
          className="mobile-burger" 
          aria-label="Toggle Navigation Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 6px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none" }} />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-nav-menu">
          <div className="mobile-nav-link" onClick={() => handleNavClick("mobile-hero")}>
            <span>Intro</span>
            <span>↙</span>
          </div>
          <div className="mobile-nav-link" onClick={() => handleNavClick("mobile-about")}>
            <span>About</span>
            <span>S–001</span>
          </div>
          <div className="mobile-nav-link" onClick={() => handleNavClick("mobile-stories")}>
            <span>Stories</span>
            <span>S–002</span>
          </div>
          <div className="mobile-nav-link" onClick={() => handleNavClick("mobile-focus")}>
            <span>Focus</span>
            <span>S–003</span>
          </div>
          <div className="mobile-nav-link" onClick={() => handleNavClick("mobile-craft")}>
            <span>Craft</span>
            <span>S–004</span>
          </div>
          <div className="mobile-nav-link" onClick={() => handleNavClick("mobile-recommendations")}>
            <span>Recommendations</span>
            <span>S–005</span>
          </div>
          <div className="mobile-nav-link" onClick={() => handleNavClick("mobile-finale")}>
            <span>Contact</span>
            <span>S–006</span>
          </div>
        </div>
      )}
    </>
  );
}
