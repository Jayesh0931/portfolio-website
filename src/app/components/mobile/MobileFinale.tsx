import { motion } from "motion/react";
import BrandVector from "@/components/BrandVector";
import { imgProfile } from "./mobileAssets";
import ProfileCard from "@/components/ProfileCard";
import resumePdf from "@/imports/Jayesh_Soni_Resume_November_2026.pdf";

interface MobileFinaleProps {
  isDark?: boolean;
  sectionTag?: string;
}

const mobileFinaleTitleVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

const mobileFinaleCharVariants = {
  hidden: {
    y: "115%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.62,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const mobileFinaleQuestionVariants = {
  hidden: {
    y: "115%",
    opacity: 0,
    scale: 0.5,
    rotate: -14,
  },
  visible: {
    y: "0%",
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 170,
      mass: 0.8,
      delay: 0.3,
    },
  },
};

export function MobileFinale({ isDark = false, sectionTag = "[ S-006 ]" }: MobileFinaleProps) {
  return (
    <section className={`mobile-finale-section ${isDark ? "is-dark" : ""}`} id="mobile-finale">
      <div className="mobile-finale-content">
        {/* 1. Header Tag */}
        <p className="mobile-finale-tag">{sectionTag}</p>

        {/* 2. Giant NEXT ? Title with Kinetic Character Mask Reveal */}
        <motion.h2
          className="mobile-finale-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={mobileFinaleTitleVariants}
        >
          <span
            style={{
              display: "inline-flex",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingBottom: "4px",
              marginBottom: "-4px",
            }}
          >
            {["N", "E", "X", "T"].map((char, index) => (
              <motion.span
                key={index}
                variants={mobileFinaleCharVariants}
                style={{
                  display: "inline-block",
                  willChange: "transform, opacity",
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>

          <span
            className="mobile-finale-question"
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              padding: "0 16px 6px 16px",
              margin: "0 -16px -6px -8px",
            }}
          >
            <motion.span
              variants={mobileFinaleQuestionVariants}
              style={{
                display: "inline-block",
                color: "#EE6C13",
                transformOrigin: "bottom center",
                willChange: "transform, opacity",
                padding: "0 4px",
              }}
            >
              ?
            </motion.span>
          </span>
        </motion.h2>

        {/* 3. Subtitle Paragraph */}
        <p className="mobile-finale-desc">
          That's my story so far. If you're building thoughtful AI products—or simply want to talk design—I'd love to hear from you.
        </p>

        {/* 4. Three Pill Action Buttons */}
        <div className="mobile-finale-buttons">
          {/* EMAIL */}
          <a
            href="mailto:jayeshsoni31@gmail.com"
            className="mobile-finale-pill-btn"
            aria-label="Send email to Jayesh Soni"
          >
            <svg className="mobile-finale-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z" />
            </svg>
            <span className="mobile-finale-btn-text">EMAIL</span>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/jayeshsoni31/"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-finale-pill-btn"
            aria-label="Open Jayesh Soni LinkedIn"
          >
            <svg className="mobile-finale-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z" />
            </svg>
            <span className="mobile-finale-btn-text">LINKEDIN</span>
          </a>

          {/* RESUME */}
          <a
            href={resumePdf}
            download="Jayesh_Soni_Resume_November_2026.pdf"
            className="mobile-finale-pill-btn"
            aria-label="Download Jayesh Soni Resume"
          >
            <svg className="mobile-finale-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM6 15V17H18V15H6ZM6 7V13H12V7H6ZM14 7V9H18V7H14ZM14 11V13H18V11H14ZM8 9H10V11H8V9Z" />
            </svg>
            <span className="mobile-finale-btn-text">RESUME</span>
          </a>
        </div>

        {/* 5. Profile Identity Card (Stacked) */}
        <div className="mobile-finale-profile-card">
          <ProfileCard
            width={180}
            aspectRatio="4/5"
            imageSrc={imgProfile}
          />

          <div className="mobile-finale-profile-info">
            <div className="mobile-finale-profile-vector-row">
              <BrandVector theme={isDark ? "light" : "dark"} width={64} height={42} />
            </div>

            <div className="mobile-finale-profile-meta">
              <h3 className="mobile-finale-profile-name">Jayesh Soni</h3>
              <p className="mobile-finale-profile-role">Product Lead &amp; AI Product Designer</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Full Width Sub-Footer Strip */}
      <footer className="mobile-finale-subfooter">
        <span className="mobile-finale-subfooter-left">Made with intent by Me</span>
        <span className="mobile-finale-subfooter-right">[ INDIA ]</span>
      </footer>
    </section>
  );
}

export default MobileFinale;
