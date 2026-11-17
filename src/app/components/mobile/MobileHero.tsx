import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  AllyraHeroCard,
  CampaignOSHeroCard,
  TulahHeroCard,
  VousVousHeroCard,
  JoonifyHeroCard,
  SharedMarqueeUnit
} from "@/components/hero/SharedHeroComponents";
import KineticText from "@/components/KineticText";
import { playClickSound } from "@/utils/soundEffects";

interface MobileHeroProps {
  onNavigatePath: (path: string) => void;
  onScrollToSection: (id: string) => void;
}

export function MobileHero({ onNavigatePath, onScrollToSection }: MobileHeroProps) {
  return (
    <div className="mobile-hero" id="mobile-hero">
      {/* 1. Graphic Marquee Ribbon with exact web component scaled */}
      <div className="mobile-hero-marquee" aria-hidden="true">
        <div className="mobile-hero-marquee-scaler">
          <div className="mobile-hero-marquee-track">
            <SharedMarqueeUnit animateEntrance />
            <SharedMarqueeUnit />
          </div>
        </div>
      </div>

      {/* 2. Intro Meta Row */}
      <div className="mobile-hero-meta">
        <span>[ INTRO ]</span>
        <span>2026</span>
      </div>

      {/* 3. Hero Main Headline */}
      <h1 className="mobile-hero-title">
        <KineticText text="DESIGNING HOW AI BEHAVES IN PRODUCTS." />
      </h1>

      {/* 4. Hero Subtitle */}
      <p className="mobile-hero-desc">
        <KineticText delay={0.15} text="I shape the moments where people decide whether to trust intelligent systems." />
      </p>

      {/* 5. Capability Pills (2 Rows, Warm Taupe) */}
      <div className="mobile-hero-tags">
        <div className="mobile-hero-tags-row">
          <span className="mobile-hero-pill-tag">HUMAN-AI INTERACTION</span>
          <span className="mobile-hero-pill-tag">AGENTIC UX</span>
        </div>
        <div className="mobile-hero-tags-row">
          <span className="mobile-hero-pill-tag">PRODUCT DESIGN</span>
          <span className="mobile-hero-pill-tag">AGENTIC SEARCH</span>
        </div>
      </div>

      {/* 5b. Quick Navigation Bar: About Jayesh & Explore Indicator */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        marginTop: "-16px",
        marginBottom: "28px",
      }}>
        <button
          onClick={() => {
            playClickSound();
            onNavigatePath("/about");
          }}
          aria-label="Read About Jayesh Soni"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "#190b00",
            color: "#FFFDFA",
            padding: "8px 16px",
            borderRadius: 110,
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.56px",
            textTransform: "uppercase",
            border: "1px solid #190b00",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(25, 11, 0, 0.12)",
          }}
        >
          <span>About Jayesh</span>
          <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
            <path d="M2 9L9 2M9 2H4M9 2V7" stroke="#FFFDFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: "#77695D",
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}>
          [ 05 PROJECTS ↓ ]
        </span>
      </div>

      {/* 6. Exact Web Bento Cards Stacked for Mobile */}
      <div style={{ display: "flex", flexDirection: "column", gap: "36px", padding: "0 20px" }}>
        {/* Card 1: allyra.ai */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
        >
          <AllyraHeroCard 
            isMobile 
            onClick={() => onNavigatePath("/allyra-story")} 
            style={{ width: "100%", height: 280 }} 
          />
        </motion.div>

        {/* Card 2: CampaignOS */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
        >
          <CampaignOSHeroCard 
            isMobile 
            onClick={() => onNavigatePath("/campaign-os-story")} 
            style={{ width: "100%", height: 195 }} 
          />
        </motion.div>

        {/* Card 3: tulah */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.54 }}
        >
          <TulahHeroCard 
            isMobile 
            onClick={() => onNavigatePath("/tulah-story")} 
            style={{ width: "100%", height: 195 }} 
          />
        </motion.div>

        {/* 2-Column Split: VousVous + Joonify */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.64 }}
          style={{ display: "flex", gap: "12px", width: "100%" }}
        >
          <VousVousHeroCard 
            isMobile 
            onClick={() => onNavigatePath("/vousvous-story")} 
            style={{ flex: 1.38, height: 220 }} 
          />
          <JoonifyHeroCard 
            isMobile 
            onClick={() => onNavigatePath("/joonify-story")} 
            style={{ flex: 1, height: 220 }} 
          />
        </motion.div>
      </div>
    </div>
  );
}

export default MobileHero;
