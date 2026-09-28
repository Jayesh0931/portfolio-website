import { useState, useEffect } from "react";
import BrandVector from "@/components/BrandVector";

interface MobileHeaderProps {
  onNavigateSection?: (sectionId: string) => void;
}

export function MobileHeader({ onNavigateSection }: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
          className="mobile-header-pill"
          onClick={() => handleNavClick("mobile-top")}
        >
          <span>JAYESH SONI</span>
        </div>

        <button 
          className="mobile-burger-btn"
          aria-label="Open Navigation Menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="bar bar-top" />
          <span className="bar bar-mid" />
          <span className="bar bar-bot" />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu-overlay" role="dialog" aria-modal="true">
          {/* Top Section */}
          <div className="mobile-menu-top">
            {/* Header row with brand pill and close button */}
            <div className="mobile-menu-header">
              <div 
                className="mobile-header-pill"
                onClick={() => handleNavClick("mobile-top")}
              >
                <span>JAYESH SONI</span>
              </div>

              <button 
                className="mobile-menu-close-btn"
                aria-label="Close Navigation Menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation pills */}
            <nav className="mobile-menu-items">
              {/* STORIES */}
              <button 
                type="button"
                className="mobile-menu-pill"
                onClick={() => handleNavClick("mobile-stories")}
              >
                <span className="mobile-menu-pill-text">STORIES</span>
                <span className="mobile-menu-pill-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </span>
              </button>

              {/* CRAFT */}
              <button 
                type="button"
                className="mobile-menu-pill"
                onClick={() => handleNavClick("mobile-craft")}
              >
                <span className="mobile-menu-pill-text">CRAFT</span>
                <span className="mobile-menu-pill-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </span>
              </button>

              {/* ABOUT */}
              <button 
                type="button"
                className="mobile-menu-pill"
                onClick={() => handleNavClick("mobile-about")}
              >
                <span className="mobile-menu-pill-text">ABOUT</span>
                <span className="mobile-menu-pill-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </button>
            </nav>
          </div>

          {/* Middle Section: CURRENTLY (Centred vertically between top nav and bottom action pills) */}
          <div className="mobile-menu-currently">
            <span className="mobile-menu-currently-tag">[ CURRENTLY ]</span>
            <p className="mobile-menu-currently-title">
              Designing how AI behaves in<br />
              products at{" "}
              <a
                href="/allyra-story"
                className="mobile-menu-allyra-link"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  if (window.location.pathname !== "/allyra-story") {
                    window.location.href = "/allyra-story";
                  }
                }}
              >
                allyra.ai
              </a>
            </p>
            <p className="mobile-menu-currently-sub">
              Open to selected opportunities
            </p>
          </div>

          {/* Bottom Section: 3 Action Pills on Left & Bleeding BrandVector on Right */}
          <div className="mobile-menu-bottom-area">
            <div className="mobile-menu-bottom-row">
              {/* 3 Contact Action Pills */}
              <div className="mobile-menu-action-pills">
                {/* EMAIL */}
                <a 
                  href="mailto:jayeshsoni0931@gmail.com" 
                  className="mobile-menu-action-pill"
                  aria-label="Send email to Jayesh Soni"
                >
                  <svg className="mobile-menu-action-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z" />
                  </svg>
                  <span className="mobile-menu-action-pill-text">EMAIL</span>
                </a>

                {/* LINKEDIN */}
                <a 
                  href="https://www.linkedin.com/in/jayeshsoni31/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mobile-menu-action-pill"
                  aria-label="Open Jayesh Soni LinkedIn"
                >
                  <svg className="mobile-menu-action-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z" />
                  </svg>
                  <span className="mobile-menu-action-pill-text">LINKEDIN</span>
                </a>

                {/* RESUME */}
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mobile-menu-action-pill"
                  aria-label="Open Jayesh Soni Resume"
                >
                  <svg className="mobile-menu-action-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM6 15V17H18V15H6ZM6 7V13H12V7H6ZM14 7V9H18V7H14ZM14 11V13H18V11H14ZM8 9H10V11H8V9Z" />
                  </svg>
                  <span className="mobile-menu-action-pill-text">RESUME</span>
                </a>
              </div>

              {/* Bleeding Brand Vector on Right */}
              <div className="mobile-menu-brand-side" aria-hidden="true">
                <BrandVector theme="dark" width={210} height={140} />
              </div>
            </div>

            {/* Bottom Right Origin Tag */}
            <div className="mobile-menu-origin-tag">
              [ INDIA ]
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileHeader;
