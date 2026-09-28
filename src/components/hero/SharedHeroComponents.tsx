import React from "react";
import svgPaths from "@/imports/Desktop6/svg-rk1gtf9dz9";
import imgAllyraCoverSmall from "@/imports/allyra_cover_small.webp";
import imgCosCoverSmall from "@/imports/cos_cover_small.webp";
import imgTulahSmallThumb from "@/imports/tulah_small_thumb.webp";
import BrandVector from "@/components/BrandVector";

export const triggerScrollToId = (id: string) => {
  window.dispatchEvent(new CustomEvent("scroll-to-id", { detail: id }));
};

export const triggerNavigate = (path: string) => {
  window.dispatchEvent(new CustomEvent("navigate-to-path", { detail: path }));
};

export function BentoCard({
  top, left, width, height,
  bgColor, borderColor = "#7b7a77",
  onClick, children, isStoryCard,
  style, className = ""
}: {
  top?: number; left?: number; width?: number | string; height?: number | string;
  bgColor: string; borderColor?: string; hoverBorderColor?: string;
  onClick?: () => void; children: React.ReactNode;
  isStoryCard?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  const isAbsolute = top !== undefined && left !== undefined;
  return (
    <div
      onClick={onClick}
      data-custom-cursor={isStoryCard ? "hero-story" : undefined}
      className={`premium-hover-card ${className}`}
      style={{
        position: isAbsolute ? "absolute" : "relative",
        ...(isAbsolute ? { top, left } : {}),
        width: width ?? "100%",
        height: height ?? "100%",
        backgroundColor: bgColor,
        borderRadius: 12,
        border: borderColor !== "none" ? `1px solid ${borderColor}` : "none",
        cursor: "pointer",
        overflow: "hidden",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── 1. allyra.ai card ── */
export function AllyraHeroCard({
  top, left, width, height, style, onClick, isMobile
}: {
  top?: number; left?: number; width?: number | string; height?: number | string;
  style?: React.CSSProperties; onClick?: () => void; isMobile?: boolean;
}) {
  const handleClick = onClick ?? (() => triggerNavigate("/allyra-story"));
  return (
    <BentoCard
      top={top}
      left={left}
      width={width}
      height={height}
      style={style}
      bgColor="#160E07"
      borderColor={isMobile ? "#2a1c10" : "#7b7a77"}
      hoverBorderColor="#EE6C13"
      onClick={handleClick}
      isStoryCard
    >
      <div style={{ position: "relative", width: "100%", height: "100%", padding: isMobile ? "16px 18px" : 20, boxSizing: "border-box", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: isMobile ? 11 : 12, color: "#998D80", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ STORY 1 ]</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: isMobile ? 11 : 12, color: "#998D80", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ PRESENT ]</p>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {isMobile && (
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10, color: "#998D80", letterSpacing: "0.6px", textTransform: "uppercase" }}>VIEW STORY</span>
            )}
            <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d={svgPaths.p3e256a00} fill="#998D80" /></svg>
            </div>
          </div>
        </div>

        {/* Right Mockup Image - Sits BELOW the top header row on mobile */}
        <img 
          src={imgAllyraCoverSmall} 
          alt="Allyra Mockup"
          style={{
            position: "absolute",
            right: isMobile ? "-20px" : 0,
            top: isMobile ? "38px" : "auto",
            bottom: isMobile ? "auto" : 0,
            width: isMobile ? "62%" : "290px",
            maxWidth: isMobile ? "245px" : "none",
            height: "auto",
            objectFit: "contain",
            display: "block",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Bottom Left Content */}
        <div style={{ position: "absolute", left: isMobile ? 18 : 20, bottom: isMobile ? 18 : 20, display: "flex", flexDirection: "column", gap: isMobile ? 6 : 12, maxWidth: isMobile ? "48%" : 200, zIndex: 2 }}>
          <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : 30, color: "#FFFDFA", margin: 0, lineHeight: 1 }}>allyra.ai</p>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: isMobile ? 11.5 : 14, color: "#C9C1B7", lineHeight: "1.35" }}>
            <p style={{ margin: 0 }}>Scaling AI from individual agents to enterprise-grade workflows.</p>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ── 2. Campaign OS card (Story 02) ── */
export function CampaignOSHeroCard({
  top, left, width, height, style, onClick, isMobile
}: {
  top?: number; left?: number; width?: number | string; height?: number | string;
  style?: React.CSSProperties; onClick?: () => void; isMobile?: boolean;
}) {
  const handleClick = onClick ?? (() => triggerNavigate("/campaign-os-story"));
  return (
    <BentoCard
      top={top}
      left={left}
      width={width}
      height={height}
      style={style}
      bgColor="#EE5A1E"
      borderColor={isMobile ? "#df4f14" : "#7b7a77"}
      hoverBorderColor="#190b00"
      onClick={handleClick}
      isStoryCard
    >
      <div style={{ position: "relative", width: "100%", height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
        {/* Right MacBook Mockup Image - Flush on right edge, full height cover like web */}
        <img 
          src={imgCosCoverSmall} 
          alt="Campaign OS Mockup"
          style={{
            position: "absolute",
            right: isMobile ? "-8px" : "-5px",
            top: "-2px",
            width: isMobile ? "245px" : "235px",
            height: "104%",
            objectFit: "cover",
            objectPosition: "left top",
            display: "block",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: isMobile ? "16px 18px" : "14px 16px", boxSizing: "border-box" }}>
          {!isMobile ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#fff", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>
                  [ STORY 02 ] [ 2026 ]
                </p>
                <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d={svgPaths.p18019200} fill="#fff" />
                  </svg>
                </div>
              </div>
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4, maxWidth: "170px" }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 28, color: "#fff", margin: 0, lineHeight: 1 }}>
                  CampaignOS
                </p>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 13, color: "rgba(255, 255, 255, 0.8)", lineHeight: "1.35" }}>
                  <p style={{ margin: 0 }}>Reimagining campaign planning & optimization with AI-native workflows.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, maxWidth: "52%" }}>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: 25, color: "#fff", margin: 0, lineHeight: 1.1 }}>
                  CampaignOS
                </p>
                <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 11, color: "rgba(255, 255, 255, 0.95)", lineHeight: "1.35" }}>
                  <p style={{ margin: 0 }}>Reimagining campaign planning, execution & optimization with AI-native workflows.</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10.5, color: "#fff", letterSpacing: "0.5px", textTransform: "uppercase", margin: 0 }}>
                  [ STORY 02 ]
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 10.5, color: "#fff", letterSpacing: "0.5px", textTransform: "uppercase", margin: 0 }}>
                    [ 2026 ]
                  </p>
                  <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
                    <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                      <path d={svgPaths.p18019200} fill="#fff" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BentoCard>
  );
}

/* ── 3. tulah card (Story 03) ── Minimalist White Card (NO Mockup on Mobile) */
export function TulahHeroCard({
  top, left, width, height, style, onClick, isMobile
}: {
  top?: number; left?: number; width?: number | string; height?: number | string;
  style?: React.CSSProperties; onClick?: () => void; isMobile?: boolean;
}) {
  const handleClick = onClick ?? (() => triggerNavigate("/tulah-story"));
  return (
    <BentoCard
      top={top}
      left={left}
      width={width}
      height={height}
      style={style}
      bgColor="#FFFFFF"
      borderColor={isMobile ? "#D6CEBE" : "#7b7a77"}
      hoverBorderColor="#190b00"
      onClick={handleClick}
      isStoryCard
    >
      <div style={{ position: "relative", width: "100%", height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
        {/* Background Mockup Image (Shifted down so top edge of laptop sits below text) */}
        <img 
          src={imgTulahSmallThumb} 
          alt="tulah story mockup"
          style={{
            position: "absolute",
            right: isMobile ? "-15px" : "-5px",
            bottom: isMobile ? "-28px" : "-35px",
            width: isMobile ? "340px" : "380px",
            maxWidth: isMobile ? "105%" : "none",
            height: "auto",
            objectFit: "contain",
            display: "block",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Foreground Text Layer */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%", padding: isMobile ? "16px 18px" : "14px 16px", boxSizing: "border-box" }}>
          {/* Top Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: isMobile ? 11 : 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>
              [ STORY 03 ] [ 2025 ]
            </p>
            <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d={svgPaths.p18019200} fill="#77695D" />
              </svg>
            </div>
          </div>

          {/* Title & Subtitle on Top Left Clear Space */}
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4, maxWidth: isMobile ? "210px" : "230px" }}>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: isMobile ? 26 : 28, color: "#190b00", margin: 0, lineHeight: 1 }}>
              tulah
            </p>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: isMobile ? 12 : 13, color: "#7b7b7b", lineHeight: "1.35" }}>
              <p style={{ margin: 0 }}>Simplifying wellness operations through thoughtful workflow design.</p>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ── 4. VousVous card (Story 04) ── */
export function VousVousHeroCard({
  top, left, width, height, style, onClick, isMobile
}: {
  top?: number; left?: number; width?: number | string; height?: number | string;
  style?: React.CSSProperties; onClick?: () => void; isMobile?: boolean;
}) {
  const handleClick = onClick ?? (() => triggerNavigate("/vousvous-story"));
  return (
    <BentoCard
      top={top}
      left={left}
      width={width}
      height={height}
      style={style}
      bgColor="#FFFFFF"
      borderColor={isMobile ? "#D6CEBE" : "#7b7a77"}
      hoverBorderColor="#190b00"
      onClick={handleClick}
      isStoryCard
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: isMobile ? "14px 14px 16px" : 16, boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: isMobile ? 9.5 : 12, color: "#77695d", letterSpacing: "0.5px", textTransform: "uppercase", margin: 0 }}>
            [ STORY 04 ] [ 2025 ]
          </p>
          <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
            <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><path d={svgPaths.p18019200} fill="#77695D" /></svg>
          </div>
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
          <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 30, color: "#190b00", margin: 0, lineHeight: 1.1 }}>VousVous</p>
          <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: isMobile ? 11 : 14, color: "#6B6258", lineHeight: "1.35" }}>
            <p style={{ margin: 0 }}>Designing trustworthy AI interactions for modern relationships.</p>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ── 5. Joonify card (Story 05) ── */
export function JoonifyHeroCard({
  top, left, width, height, style, onClick, isMobile
}: {
  top?: number; left?: number; width?: number | string; height?: number | string;
  style?: React.CSSProperties; onClick?: () => void; isMobile?: boolean;
}) {
  const handleClick = onClick ?? (() => triggerScrollToId("story-05-block"));
  return (
    <BentoCard
      top={top}
      left={left}
      width={width}
      height={height}
      style={style}
      bgColor="#E2DACD"
      borderColor={isMobile ? "none" : "#7b7a77"}
      hoverBorderColor="#190b00"
      onClick={handleClick}
      isStoryCard
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: isMobile ? "14px 14px 16px" : 16, boxSizing: "border-box" }}>
        {!isMobile ? (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ STORY 05 ] [ 2022 ]</p>
            <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d={svgPaths.p18019200} fill="#77695D" /></svg>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 9.5, color: "#635A50", letterSpacing: "0.5px", textTransform: "uppercase", margin: 0 }}>[ STORY 05 ]</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 9.5, color: "#635A50", letterSpacing: "0.5px", textTransform: "uppercase", margin: 0 }}>[ 2022 ]</p>
              <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
                <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><path d={svgPaths.p18019200} fill="#635A50" /></svg>
              </div>
            </div>
          </div>
        )}
        <div style={{ marginTop: "auto" }}>
          <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: isMobile ? 24 : 30, color: "#190b00", margin: 0, lineHeight: 1, letterSpacing: "-0.02em" }}>Joonify</p>
        </div>
      </div>
    </BentoCard>
  );
}

/* ── 6. Marquee Unit (Original Web Component) ── */
export function SharedMarqueeUnit() {
  return (
    <div className="flex shrink-0 gap-[50px] items-center pr-[50px]">
      <p
        className="shrink-0 whitespace-nowrap leading-[140px] text-[140px] tracking-[5.6px] text-[#190b00]"
        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}
      >
        JAYESH
      </p>
      <div className="content-stretch flex items-center relative shrink-0">
        <BrandVector theme="dark" width={150} height={100} />
      </div>
      <p
        className="shrink-0 whitespace-nowrap leading-[140px] text-[140px] tracking-[5.6px]"
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          color: "#FFFDFA",
          WebkitTextStroke: "1.5px #190b00",
          paintOrder: "stroke fill",
        }}
      >
        DESIGNING AI BEHAVIOR
      </p>
      <div className="content-stretch flex items-center relative shrink-0">
        <BrandVector theme="dark" width={150} height={100} />
      </div>
    </div>
  );
}
