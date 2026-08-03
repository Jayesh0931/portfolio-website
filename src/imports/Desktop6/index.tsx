import { useState, useEffect } from "react";
import svgPaths from "./svg-rk1gtf9dz9";
import imgEllipse5 from "./49f9bacadb0b6c33f4b16626866a7ba76ea5c76a.png";
import Footer from "../../components/Footer";
import imgEllipse6 from "./a91132eb75454691079ab470b1a18b7a63465b3c.png";
import imgEllipse7 from "./ea2ebb970c11a33998a35f3c05333c9689a2bb47.png";
import imgEllipse8 from "./9ff71da8485c02d3fd081a21e1d07fea61940bec.png";
import imgAllyraCoverSmall from "../allyra_cover_small.png";
import imgAllyraCoverBig from "../allyra_cover_big.png";
import imgCosCoverSmall from "../cos_cover_small.png";
import imgCosCoverLarge from "../cos_cover_large.png";
import BrandVector from "../../components/BrandVector";

function Group() {
  return (
    <div style={{ position: "absolute", top: 7724, height: 788, left: 305, width: 96 }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 787.594">
        <g id="Group">
          <g id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <BrandVector theme="dark" width={150} height={100} />
    </div>
  );
}

function Frame4() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[50px] items-center left-[-26px] top-1/2">
      <p className="[word-break:break-word] font-['Outfit:Black',sans-serif] font-black leading-[140px] relative shrink-0 text-[#190b00] text-[140px] tracking-[5.6px] whitespace-nowrap">JAYESH</p>
      <Frame6 />
      <p className="[word-break:break-word] font-['Outfit:Black',sans-serif] font-black leading-[140px] relative shrink-0 text-[140px] text-[transparent] tracking-[5.6px] whitespace-nowrap">DESIGNING AI BEHAVIOR</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute h-[180px] left-[80px] overflow-clip top-[127px] w-[1280px]">
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[183px] w-[1280px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 1">
            <line id="Line 1" stroke="var(--stroke-0, #190B00)" x2="1280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-[#e5ddd4] content-stretch flex items-center justify-center left-[105px] px-[11px] py-[6px] rounded-[20px] top-[733px]">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Human-AI Interaction</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-[#e5ddd4] content-stretch flex items-center justify-center left-[297px] px-[11px] py-[6px] rounded-[20px] top-[733px]">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Agentic UX</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-[#e5ddd4] content-stretch flex items-center justify-center left-[251px] px-[11px] py-[6px] rounded-[20px] top-[768px]">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Enterprise Systems</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-[#e5ddd4] content-stretch flex items-center justify-center left-[105px] px-[11px] py-[6px] rounded-[20px] top-[768px]">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Product Design</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[110px] top-[882px]">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-pre">{`SCROLL TO  EXPLORE`}</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <div className="relative size-[9px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
              <path d={svgPaths.p3e256a00} fill="var(--fill-0, #77695D)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const triggerScroll = (y: number) => {
  window.dispatchEvent(new CustomEvent("scroll-to-y", { detail: y }));
};

const triggerScrollToId = (id: string) => {
  window.dispatchEvent(new CustomEvent("scroll-to-id", { detail: id }));
};

const triggerNavigate = (path: string) => {
  window.dispatchEvent(new CustomEvent("navigate-to-path", { detail: path }));
};

function BentoCard({
  top, left, width, height,
  bgColor, borderColor = "#7b7a77",
  onClick, children, isStoryCard
}: {
  top: number; left: number; width: number; height: number;
  bgColor: string; borderColor?: string; hoverBorderColor?: string;
  onClick?: () => void; children: React.ReactNode;
  isStoryCard?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      data-custom-cursor={isStoryCard ? "hero-story" : undefined}
      className="premium-hover-card"
      style={{
        position: "absolute",
        top, left, width, height,
        backgroundColor: bgColor,
        borderRadius: 10,
        border: `1px solid ${borderColor}`,
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[80px] top-[127px]">
      <div className="-translate-x-1/2 absolute bg-[#FFFDFA] h-[800px] left-1/2 top-[127px] w-[1280px]">
        <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <p className="[word-break:break-word] absolute font-['Outfit:Bold',sans-serif] font-bold leading-[normal] left-[105px] text-[#190b00] text-[30px] top-[471px] w-[353px]">DESIGNING HOW AI BEHAVES IN PRODUCTS.</p>
      <div className="[word-break:break-word] absolute font-['Outfit:Regular',sans-serif] font-normal leading-[0] left-[105px] text-[#77695d] text-[18px] top-[577px] w-[353px]">
        <p className="leading-[normal] mb-0">I shape the moments where people</p>
        <p className="leading-[normal]">decide whether to trust intelligent systems.</p>
      </div>
      <Frame5 />
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[110px] not-italic text-[#77695d] text-[12px] top-[337px] tracking-[0.6px] uppercase whitespace-nowrap">[ INTRO ]</p>
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[110px] not-italic text-[#77695d] text-[12px] top-[364px] tracking-[0.6px] uppercase whitespace-nowrap">2026</p>
      <Frame9 />
      <Frame10 />
      <Frame11 />
      <Frame12 />
      <Frame8 />
      <div className="absolute flex h-[620px] items-center justify-center left-[560px] top-[307px] w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[620px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 620 1">
                <line id="Line 2" stroke="var(--stroke-0, #7B7A77)" x2="620" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[80px] top-[307px] w-[1280px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1280px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 1">
                <line id="Line 3" stroke="var(--stroke-0, #7B7A77)" x2="1280" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* ── allyra.ai card ── */}
      {/* ── allyra.ai card ── */}
      <BentoCard top={327} left={580} width={500} height={360} bgColor="#190b00" borderColor="#7b7a77" hoverBorderColor="#EE6C13" onClick={() => triggerScrollToId("story-01-block")} isStoryCard>
        <div style={{ position: "relative", width: "100%", height: "100%", padding: 20, boxSizing: "border-box", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ STORY 1 ]</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ PRESENT ]</p>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d={svgPaths.p3e256a00} fill="#77695D" /></svg>
              </div>
            </div>
          </div>

          {/* Right Mockup Image */}
          <img 
            src={imgAllyraCoverSmall} 
            alt="Allyra Mockup"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "290px",
              height: "auto",
              objectFit: "contain",
              display: "block",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Bottom Left Content */}
          <div style={{ position: "absolute", left: 20, bottom: 20, display: "flex", flexDirection: "column", gap: 12, maxWidth: 200, zIndex: 2 }}>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 30, color: "#FFFDFA", margin: 0 }}>allyra.ai</p>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 14, color: "#7b7b7b", lineHeight: "1.4" }}>
              <p style={{ margin: 0 }}>Scaling AI from individual agents to enterprise-grade workflows.</p>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* ── VousVous card (Story 04) ── */}
      <BentoCard top={327} left={1100} width={240} height={220} bgColor="#FFFDFA" borderColor="#7b7a77" hoverBorderColor="#190b00" onClick={() => triggerScrollToId("story-04-block")} isStoryCard>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 16, boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ STORY 04 ] [ 2025 ]</p>
            <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d={svgPaths.p18019200} fill="#77695D" /></svg>
            </div>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 30, color: "#190b00", margin: 0, lineHeight: 1.1 }}>VousVous</p>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 14, color: "#7b7b7b", lineHeight: "1.4" }}>
              <p style={{ margin: 0 }}>Designing trustworthy AI interactions for modern relationships.</p>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* ── Joonify card (Story 05) ── */}
      <BentoCard top={567} left={1100} width={240} height={120} bgColor="#e5ddd4" borderColor="#7b7a77" hoverBorderColor="#190b00" onClick={() => triggerScrollToId("story-05-block")} isStoryCard>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 16, boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ STORY 05 ] [ 2022 ]</p>
            <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d={svgPaths.p18019200} fill="#77695D" /></svg>
            </div>
          </div>
          <div style={{ marginTop: "auto" }}>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 30, color: "#190b00", margin: 0, lineHeight: 1.1 }}>Joonify</p>
          </div>
        </div>
      </BentoCard>

      {/* ── tulah card (Story 03) ── */}
      <BentoCard top={707} left={580} width={370} height={200} bgColor="#FFFDFA" borderColor="#7b7a77" hoverBorderColor="#190b00" onClick={() => triggerScrollToId("story-03-block")} isStoryCard>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 16, boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ STORY 03 ] [ 2025 ]</p>
            <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d={svgPaths.p18019200} fill="#77695D" /></svg>
            </div>
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 30, color: "#190b00", margin: 0, lineHeight: 1.1 }}>tulah</p>
            <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 14, color: "#7b7b7b", lineHeight: "1.4" }}>
              <p style={{ margin: 0 }}>Simplifying wellness operations through thoughtful workflow design.</p>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* ── Campaign OS card (Story 02) ── */}
      <BentoCard top={707} left={970} width={370} height={200} bgColor="#EE6C13" borderColor="#7b7a77" hoverBorderColor="#190b00" onClick={() => triggerScrollToId("story-02-block")} isStoryCard>
        <div style={{ position: "relative", width: "100%", height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
          
          {/* Right MacBook Mockup Image (Positioned flush on right half) */}
          <img 
            src={imgCosCoverSmall} 
            alt="Campaign OS Mockup"
            style={{
              position: "absolute",
              right: "-5px",
              top: "-2px",
              width: "235px",
              height: "102%",
              objectFit: "cover",
              objectPosition: "left top",
              display: "block",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Title overlapping edge of screen */}
          <p style={{
            position: "absolute",
            left: 20,
            top: 20,
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: 30,
            color: "#FFFDFA",
            margin: 0,
            lineHeight: 1,
            zIndex: 5,
            whiteSpace: "nowrap",
            letterSpacing: "-0.5px"
          }}>
            CampaignOS
          </p>

          {/* Subtitle Description */}
          <div style={{
            position: "absolute",
            left: 20,
            top: 62,
            width: 165,
            fontFamily: "Outfit, sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#FFFDFA",
            lineHeight: "1.35",
            zIndex: 5,
            opacity: 0.95
          }}>
            <p style={{ margin: 0 }}>Reimagining campaign planning, execution & optimization with AI-native workflows.</p>
          </div>

          {/* Bottom Left Tags */}
          <div style={{ position: "absolute", left: 20, bottom: 16, zIndex: 5, display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#FFFDFA", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ STORY 02 ]</p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#FFFDFA", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ 2026 ]</p>
              <span style={{ color: "#FFFDFA", fontSize: 14, fontWeight: "bold", lineHeight: 1 }}>↙</span>
            </div>
          </div>

        </div>
      </BentoCard>
    </div>
  );
}

function Frame14() {
  return (
    <div className="-translate-y-1/2 [word-break:break-word] absolute content-stretch flex font-['Outfit:Black',sans-serif] font-black gap-[60px] items-center leading-[180px] left-[-30px] text-[180px] top-1/2 tracking-[7.2px] whitespace-nowrap">
      <p className="relative shrink-0 text-[#190b00]">STORIES</p>
      <p className="relative shrink-0 text-[transparent]">SELECTED STORIES</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="col-1 h-[200px] ml-0 mt-[76px] overflow-clip relative row-1 w-[995px]">
      <Frame14 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative">
      <BrandVector theme="dark" width={270} height={180} />
    </div>
  );
}

function Frame16() {
  return (
    <div className="col-1 h-[381px] ml-[995px] mt-px overflow-clip relative row-1 w-[285px]">
      <div className="-translate-y-1/2 absolute flex items-center justify-center left-[59px] top-[calc(50%-0.17px)]">
        <div className="flex-none">
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#FFFDFA] col-1 h-[381px] ml-0 mt-px relative row-1 w-[1280px]">
        <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <p className="[word-break:break-word] col-1 font-['Inter:Bold',sans-serif] font-bold leading-[normal] ml-[30px] mt-[31px] not-italic relative row-1 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">[ s-002 ]</p>
      <Frame15 />
      <Frame16 />
      <div className="col-1 flex h-[382px] items-center justify-center ml-[996px] mt-0 relative row-1 w-0">
        <div className="-rotate-90 flex-none">
          <div className="h-0 relative w-[382px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 382 1">
                <line id="Line 5" stroke="var(--stroke-0, #7B7A77)" x2="382" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] col-1 font-['Outfit:Regular',sans-serif] font-normal leading-[normal] ml-[30px] mt-[306px] relative row-1 text-[#77695d] text-[18px] w-[402px]">A few selected stories that represent the problems I loved to solve and the impact I strive to create.</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex font-['Inter:Bold',sans-serif] font-bold gap-[20px] items-center not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0">[ story 01 ]</p>
      <p className="relative shrink-0">[ Present ]</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#190b00] text-[30px] w-full">allyra.ai</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[#77695d] text-[18px] w-full">Human–AI interaction platform for enterprise teams.</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[40px] items-start leading-[normal] relative shrink-0 w-[273px]">
      <Frame40 />
      <Frame41 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Key Insight</p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
      <Frame30 />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">{`The biggest challenge wasn't making AI more capable. It was helping people understand what the AI was doing, when to trust it, and how to work alongside it.`}</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame31 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Contibution</p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
      <Frame28 />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">Product Strategy, Product Design, Interaction Design, Design Systems</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame29 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start leading-[0] relative shrink-0">
      <Group2 />
      <Group1 />
    </div>
  );
}

function Frame22() {
  return (
    <div 
      className="bg-[#FFFDFA] h-full relative shrink-0 w-[316px]" 
    >
      <div aria-hidden className="absolute border-[#7b7a77] border-b border-l border-solid border-t inset-0 pointer-events-none transition-colors duration-300" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between pl-[20px] py-[20px] relative size-full">
          <Frame21 />
          <Frame27 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 size-[441px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 441 441">
        <g id="Frame">
          <path d={svgPaths.p39af5380} fill="var(--fill-0, #FFFDFA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#e5ddd4] flex-[1_0_0] min-h-px relative w-full overflow-hidden">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300 z-10" />
      <div className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        <img 
          src={imgAllyraCoverBig} 
          alt="Allyra Cover" 
          className="size-full object-cover display-block pointer-events-none" 
        />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Human-AI Interaction</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Enterprise AI</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Agentic UX</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
      <Frame17 />
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 text-[#77695d] group-hover:text-[#190b00] transition-colors duration-300">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-current text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Read More</p>
      <div className="flex items-center justify-center relative shrink-0 size-[9px] transition-transform duration-300 group-hover:translate-x-1">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[9px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
              <path d={svgPaths.p3e256a00} fill="currentColor" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#FFFDFA] bottom-[11px] content-stretch flex h-[55px] items-center justify-between left-1/2 p-[20px] w-[944px]">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300" />
      <Frame26 />
      <Frame32 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center min-w-px relative">
      <Frame19 />
      <Frame18 />
    </div>
  );
}

function Frame23() {
  return (
    <div 
      id="story-01-block"
      data-custom-cursor="read-story"
      onClick={() => triggerNavigate("/allyra-story")}
      className="group content-stretch flex h-[690px] items-center relative shrink-0 w-full cursor-pointer premium-hover-row"
    >
      <Frame22 />
      <Frame20 />
    </div>
  );
}

function StoryCampaignOS() {
  return (
    <div 
      id="story-02-block"
      data-custom-cursor="read-story"
      onClick={() => triggerNavigate("/campaign-os-story")}
      className="group content-stretch flex h-[690px] items-center relative shrink-0 w-full cursor-pointer premium-hover-row"
    >
      {/* Left Sidebar */}
      <div className="bg-[#FFFDFA] h-full relative shrink-0 w-[316px]">
        <div aria-hidden className="absolute border-[#7b7a77] border-b border-l border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-between pl-[20px] py-[20px] relative size-full">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[40px] items-start leading-[normal] relative shrink-0 w-[273px]">
              <div className="content-stretch flex font-['Inter:Bold',sans-serif] font-bold gap-[20px] items-center not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full whitespace-nowrap">
                <p className="relative shrink-0">[ story 02 ]</p>
                <p className="relative shrink-0">[ 2026 ]</p>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#190b00] text-[30px] w-full">Campaign OS</p>
                <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[#77695d] text-[18px] w-full">
                  AI-native operating system that brings campaign planning, execution, monitoring and optimization into one connected workflow.
                </p>
              </div>
            </div>

            <div className="content-stretch flex flex-col gap-[40px] items-start leading-[0] relative shrink-0">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Key Insight</p>
                    <div className="flex items-center justify-center relative shrink-0 w-full">
                      <div className="flex-none rotate-180 w-full">
                        <div className="h-0 relative w-full">
                          <div className="absolute inset-[-1px_0_0_0]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                              <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">
                    {`Marketing teams don't need more AI tools. They need AI that understands the entire campaign lifecycle and knows when to assist, collaborate or simply stay out of the way.`}
                  </p>
                </div>
              </div>

              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                  <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Contibution</p>
                    <div className="flex items-center justify-center relative shrink-0 w-full">
                      <div className="flex-none rotate-180 w-full">
                        <div className="h-0 relative w-full">
                          <div className="absolute inset-[-1px_0_0_0]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                              <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">
                    Product Strategy, AI Experience Design, Workflow Design, Information Architecture, Interaction Design, Dashboard UX, Design Systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Main Visual Area */}
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-w-px relative">
        <div className="bg-[#e5ddd4] flex-[1_0_0] min-h-px relative w-full overflow-hidden">
          <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300 z-10" />
          <div className="flex flex-row items-center justify-center size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <img 
              src={imgCosCoverLarge} 
              alt="Campaign OS Cover Large" 
              className="size-full object-cover display-block pointer-events-none" 
            />
          </div>
        </div>

        {/* Bottom Banner inside Right Visual */}
        <div className="-translate-x-1/2 absolute bg-[#FFFDFA] bottom-[10px] content-stretch flex h-[55px] items-center justify-between left-1/2 p-[20px] w-[944px] z-20">
          <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300" />
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
            <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
              <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">AI WORKFLOWS</p>
            </div>
            <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
              <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">MARKETING OS</p>
            </div>
            <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
              <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">HUMAN-AI INTERACTION</p>
            </div>
          </div>
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex font-['Inter:Bold',sans-serif] font-bold gap-[20px] items-center not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0">[ story 03 ]</p>
      <p className="relative shrink-0">[ 2025 ]</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#190b00] text-[30px] w-full">tulah</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[#77695d] text-[18px] w-full">Operational platform designed to simplify wellness workflows and service delivery.</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[40px] items-start leading-[normal] relative shrink-0 w-[273px]">
      <Frame44 />
      <Frame45 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Key Insight</p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
      <Frame37 />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">{`Most operational challenges aren't workflow problems. They're clarity problems disguised as workflows.`}</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame36 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Contibution</p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
      <Frame39 />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">Product Design, Workflow Design, Information Architecture, Design Systems</p>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame38 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start leading-[0] relative shrink-0">
      <Group3 />
      <Group4 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-[#FFFDFA] h-full relative shrink-0 w-[316px]">
      <div aria-hidden className="absolute border-[#7b7a77] border-b border-l border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between pl-[20px] py-[20px] relative size-full">
          <Frame34 />
          <Frame35 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-[441px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 441 441">
        <g id="Frame">
          <path d={svgPaths.p39af5380} fill="var(--fill-0, #FFFDFA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-[#e5ddd4] flex-[1_0_0] min-h-px relative w-full">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[87px] pl-[241px] pr-[222px] pt-[106px] relative size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">{` Wellness AI`}</p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Operations</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Service Experience</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
      <Frame50 />
      <Frame51 />
      <Frame52 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 text-[#77695d] group-hover:text-[#190b00] transition-colors duration-300">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-current text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Read More</p>
      <div className="flex items-center justify-center relative shrink-0 size-[9px] transition-transform duration-300 group-hover:translate-x-1">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[9px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
              <path d={svgPaths.p3e256a00} fill="currentColor" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#FFFDFA] bottom-[10px] content-stretch flex h-[55px] items-center justify-between left-1/2 p-[20px] w-[944px]">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300" />
      <Frame49 />
      <Frame53 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-w-px relative">
      <Frame47 />
      <Frame48 />
    </div>
  );
}

function Frame42() {
  return (
    <div 
      id="story-03-block"
      data-custom-cursor="read-story"
      className="group content-stretch flex h-[690px] items-center relative shrink-0 w-full cursor-pointer premium-hover-row"
    >
      <Frame33 />
      <Frame46 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex font-['Inter:Bold',sans-serif] font-bold gap-[20px] items-center not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0">[ story 04 ]</p>
      <p className="relative shrink-0">[ 2025 ]</p>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#190b00] text-[30px] w-full">VousVous</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[#77695d] text-[18px] w-full">AI-powered fashion platform for discovering, creating, and personalizing unique styles.</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[40px] items-start leading-[normal] relative shrink-0 w-[273px]">
      <Frame57 />
      <Frame58 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Key Insight</p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
      <Frame61 />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">Personalization becomes meaningful when people can create, not just choose.</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame60 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Contibution</p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
      <Frame63 />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px] whitespace-pre-wrap">{`Product Design, Mobile Experience Design, Design System,  Interaction Design`}</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame62 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start leading-[0] relative shrink-0">
      <Group5 />
      <Group6 />
    </div>
  );
}

function Frame55() {
  return (
    <div 
      data-custom-cursor="read-story" 
      className="group bg-[#FFFDFA] h-full relative shrink-0 w-[316px] cursor-pointer transition-all duration-300 hover:bg-[#ffffff] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(25,11,0,0.08)]"
    >
      <div aria-hidden className="absolute border-[#7b7a77] border-b border-l border-solid border-t inset-0 pointer-events-none group-hover:border-[#190b00] transition-colors duration-300" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between pl-[20px] py-[20px] relative size-full">
          <Frame56 />
          <Frame59 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 size-[441px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 441 441">
        <g id="Frame">
          <path d={svgPaths.p39af5380} fill="var(--fill-0, #FFFDFA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame65() {
  return (
    <div className="bg-[#e5ddd4] flex-[1_0_0] min-h-px relative w-full">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[87px] pl-[241px] pr-[222px] pt-[106px] relative size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Fashion Tech</p>
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">AI Personalization</p>
    </div>
  );
}

function Frame70() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Consumer Products</p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
      <Frame68 />
      <Frame69 />
      <Frame70 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 text-[#77695d] group-hover:text-[#190b00] transition-colors duration-300">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-current text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Read More</p>
      <div className="flex items-center justify-center relative shrink-0 size-[9px] transition-transform duration-300 group-hover:translate-x-1">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[9px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
              <path d={svgPaths.p3e256a00} fill="currentColor" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#FFFDFA] bottom-[10px] content-stretch flex h-[55px] items-center justify-between left-1/2 p-[20px] w-[944px]">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300" />
      <Frame67 />
      <Frame71 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-w-px relative">
      <Frame65 />
      <Frame66 />
    </div>
  );
}

function Frame54() {
  return (
    <div 
      id="story-04-block"
      data-custom-cursor="read-story"
      className="group content-stretch flex h-[690px] items-center relative shrink-0 w-full cursor-pointer premium-hover-row"
    >
      <Frame55 />
      <Frame64 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex font-['Inter:Bold',sans-serif] font-bold gap-[20px] items-center not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0">[ story 05 ]</p>
      <p className="relative shrink-0">[ 2022 ]</p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#190b00] text-[30px] w-full">Joonify</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[#77695d] text-[18px] w-full">Learning and assessment platform helping parents better understand how children learn and grow.</p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[40px] items-start leading-[normal] relative shrink-0 w-[273px]">
      <Frame75 />
      <Frame76 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Key Insight</p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
      <Frame79 />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">When parents understand how children learn, better decisions naturally follow.</p>
    </div>
  );
}

function Group9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame78 />
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px] w-full">Contibution</p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="296" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame80() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
      <Frame81 />
      <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[16px] w-[276px]">Product Design, User Experience Design, Assessment Experience Design, Interaction Design</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <Frame80 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start leading-[0] relative shrink-0">
      <Group9 />
      <Group10 />
    </div>
  );
}

function Frame73() {
  return (
    <div 
      data-custom-cursor="read-story" 
      className="group bg-[#FFFDFA] h-full relative shrink-0 w-[316px] cursor-pointer transition-all duration-300 hover:bg-[#ffffff] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(25,11,0,0.08)]"
    >
      <div aria-hidden className="absolute border-[#7b7a77] border-b border-l border-solid border-t inset-0 pointer-events-none group-hover:border-[#190b00] transition-colors duration-300" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between pl-[20px] py-[20px] relative size-full">
          <Frame74 />
          <Frame77 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 size-[441px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 441 441">
        <g id="Frame">
          <path d={svgPaths.p39af5380} fill="var(--fill-0, #FFFDFA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame83() {
  return (
    <div className="bg-[#e5ddd4] flex-[1_0_0] min-h-px relative w-full">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[87px] pl-[241px] pr-[222px] pt-[106px] relative size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame86() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">ED-Tech</p>
    </div>
  );
}

function Frame87() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">{` Learning Experience`}</p>
    </div>
  );
}

function Frame88() {
  return (
    <div className="bg-[#e5ddd4] content-stretch flex items-center justify-center px-[11px] py-[6px] relative rounded-[20px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Child Development</p>
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
      <Frame86 />
      <Frame87 />
      <Frame88 />
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 text-[#77695d] group-hover:text-[#190b00] transition-colors duration-300">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-current text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">Read More</p>
      <div className="flex items-center justify-center relative shrink-0 size-[9px] transition-transform duration-300 group-hover:translate-x-1">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="relative size-[9px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
              <path d={svgPaths.p3e256a00} fill="currentColor" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#FFFDFA] bottom-[10px] content-stretch flex h-[55px] items-center justify-between left-1/2 p-[20px] w-[944px]">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none transition-colors duration-300" />
      <Frame85 />
      <Frame89 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-w-px relative">
      <Frame83 />
      <Frame84 />
    </div>
  );
}

function Frame72() {
  return (
    <div 
      id="story-05-block"
      data-custom-cursor="read-story"
      className="group content-stretch flex h-[690px] items-center relative shrink-0 w-full cursor-pointer premium-hover-row"
    >
      <Frame73 />
      <Frame82 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[90px] items-start left-[80px] top-[2077px] w-[1280px]">
      <Group8 />
      <Frame23 />
      <StoryCampaignOS />
      <Frame42 />
      <Frame54 />
      <Frame72 />
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <BrandVector theme="dark" width={42} height={28} />
    </div>
  );
}

function Frame90() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[80px] px-[10px] py-[30px] top-[7312px] w-[70px]">
      <div aria-hidden className="absolute border-[#7b7a77] border-solid border-t inset-0 pointer-events-none" />
      <Frame91 />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 whitespace-nowrap">
      <div className="font-['Outfit:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[#190b00] text-[30px]">
        <p className="leading-[normal] mb-0">PRODUCT</p>
        <p className="leading-[normal]">DESIGN</p>
      </div>
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-black">
        UX/UI Design
        <br aria-hidden />
        Product Strategy
        <br aria-hidden />
        Information Architecture
        <br aria-hidden />
        User Research
        <br aria-hidden />
        Interaction Design
      </p>
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[580px] items-center justify-center min-w-px relative">
      <div className="flex flex-col items-start gap-[20px]">
        <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px]">01</p>
        <Frame94 />
      </div>
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#190b00] text-[30px] w-[230px]">HUMAN–AI INTERACTION</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[18px] text-black w-[230px]">
        Agentic UX
        <br aria-hidden />
        AI Workflows
        <br aria-hidden />
        Conversational Experiences
        <br aria-hidden />
        AI Behavior Design
        <br aria-hidden />
        Enterprise AI Systems
      </p>
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[580px] items-center justify-center leading-[normal] min-w-px relative">
      <div className="flex flex-col items-start gap-[20px]">
        <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[#77695d] text-[18px]">02</p>
        <Frame96 />
      </div>
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative shrink-0 whitespace-nowrap">
      <div className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#190b00] text-[30px]">
        <p className="leading-[normal] mb-0">SYSTEMS</p>
        <p className="leading-[normal]">{`& CRAFT`}</p>
      </div>
      <div className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[18px] text-black">
        <p className="leading-[normal] mb-0">Design Systems</p>
        <p className="leading-[normal] mb-0">Prototyping</p>
        <p className="leading-[normal] mb-0">Component Libraries</p>
        <p className="leading-[normal] mb-0">Motion Design</p>
        <p className="leading-[normal]">Design Operations</p>
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[580px] items-center justify-center min-w-px relative">
      <div className="flex flex-col items-start gap-[20px]">
        <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#77695d] text-[18px]">03</p>
        <Frame98 />
      </div>
    </div>
  );
}

function Frame92() {
  return (
    <div style={{ position: "absolute", top: 6727, left: 150, width: 1212, height: 580, display: "flex", gap: "1px", alignItems: "center" }}>
      <Frame93 />
      <Frame95 />
      <Frame97 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents" style={{ top: 6623, left: 80, width: 1280, height: 780 }}>
      <div id="focus-section-block" className="absolute bg-[#FFFDFA]" style={{ left: 80, width: 70, top: 6623, height: 780 }}>
        <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#FFFDFA]" style={{ left: 151, width: 1209, top: 6623, height: 780 }}>
        <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute flex items-center justify-center" style={{ top: 7226, left: 107, width: 15, height: 59, containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">[ s-003 ]</p>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ top: 6664, left: 97, width: 38, height: 134, containerType: "size" }}>
        <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
          <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative text-[#190b00] text-[30px] text-right w-full">FOCUS</p>
        </div>
      </div>
      <Frame90 />
      <Frame92 />
    </div>
  );
}

function Frame100() {
  return (
    <div className="col-1 content-stretch flex items-center ml-[14px] mt-[48px] relative row-1">
      <BrandVector theme="dark" width={42} height={28} />
    </div>
  );
}

function Group12() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#FFFDFA] col-1 h-[750px] ml-0 mt-0 relative row-1 w-[71px]">
        <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="bg-[#FFFDFA] col-1 h-[750px] ml-[71px] mt-0 relative row-1 w-[1209px]">
        <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="[word-break:break-word] col-1 font-['Outfit:Regular',sans-serif] font-normal ml-[250px] mt-[155px] relative row-1 text-[#77695d] text-[24px] w-[850px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[normal]">{`I'm `}</span>
          <span className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] text-[#190b00]">Jayesh Soni</span>
          <span className="leading-[normal]">{`, and for the past 7+ years, I've been designing products at the intersection of people, systems, and emerging technologies. From healthcare and education to marketplaces and enterprise AI, my work has evolved into shaping Human–AI interactions, agentic experiences, and adaptive systems that people can understand and trust.`}</span>
        </p>
        <p className="leading-[normal] mb-0">​</p>
        <p className="leading-[normal]">{`Along the way, I've learned that the hardest product challenges are rarely just technical. They're human. The work I enjoy most is bringing clarity to complexity and creating experiences that people can confidently adopt and rely on.`}</p>
      </div>
      <p className="[word-break:break-word] col-1 font-['Outfit:Regular',sans-serif] font-normal leading-[normal] ml-[250px] mt-[92px] relative row-1 text-[#77695d] text-[18px] w-[448px]">THE JOURNEY THAT SHAPED HOW I DESIGN</p>
      <div className="col-1 flex h-[57px] items-center justify-center ml-[27px] mt-[663px] relative row-1 w-[15px]">
        <div className="-rotate-90 flex-none">
          <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">[ s-001 ]</p>
        </div>
      </div>
      <div className="col-1 flex h-[103px] items-center justify-center ml-[17px] mt-[238px] relative row-1 w-[38px]">
        <div className="-rotate-90 flex-none">
          <p className="[word-break:break-word] font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative text-[#190b00] text-[30px] text-right whitespace-nowrap">ABOUT</p>
        </div>
      </div>
      <Frame100 />
      <div className="col-1 flex h-0 items-center justify-center ml-[250px] mt-[123px] relative row-1 w-[1030px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[1030px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1030 1">
                <line id="Line 4" stroke="var(--stroke-0, #7B7A77)" x2="1030" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="col-1 flex h-0 items-center justify-center ml-0 mt-[123px] relative row-1 w-[70px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[70px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 1">
                <line id="Line 3" stroke="var(--stroke-0, #7B7A77)" x2="70" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Row */}
      <div className="col-1 h-[98px] ml-[71px] mt-[652px] overflow-hidden relative row-1 w-[1209px] flex items-center bg-[#FFFDFA] border-t border-[#7b7a77] border-solid">
        <div className="marquee-track" style={{ display: "flex", gap: "80px", animationDuration: "25s" }}>
          {Array(3).fill([
            "Tata Consultancy Services",
            "Joonify",
            "Vertisystem",
            "Stanford",
            "allyra.ai",
            "tulah"
          ]).flat().map((name, idx) => (
            <span key={idx} style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "32px",
              color: "#C1B8B0",
              whiteSpace: "nowrap"
            }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Frame99() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-[1127px] w-[1440px]">
      <Group12 />
    </div>
  );
}

function Frame104() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="bg-[#d9d9d9] h-[383px] opacity-90 relative shrink-0 w-[680px]" />
      <div className="bg-[#d9d9d9] h-[383px] opacity-90 relative shrink-0 w-[359px]" />
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <div className="bg-[#d9d9d9] flex-[1_0_0] h-[383px] min-w-px opacity-90 relative" />
      <div className="bg-[#d9d9d9] flex-[1_0_0] h-[383px] min-w-px opacity-90 relative" />
      <div className="bg-[#d9d9d9] flex-[1_0_0] h-[383px] min-w-px opacity-90 relative" />
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[507px]">
      <div className="aspect-video bg-[#d9d9d9] opacity-90 relative shrink-0 w-full" />
      <div className="aspect-video bg-[#d9d9d9] opacity-90 relative shrink-0 w-full" />
      <div className="aspect-video bg-[#d9d9d9] opacity-90 relative shrink-0 w-full" />
    </div>
  );
}

function Frame106() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
      <Frame107 />
      <div className="bg-[#d9d9d9] h-[898px] opacity-90 relative shrink-0 w-[532px]" />
    </div>
  );
}

function Frame103() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[20px] top-[20px] w-[1059px]">
      <Frame104 />
      <Frame105 />
      <Frame106 />
    </div>
  );
}

function Frame102() {
  return (
    <div className="absolute h-[800px] left-[261px] overflow-x-clip overflow-y-auto top-[7600px] w-[1099px]">
      <Frame103 />
    </div>
  );
}

function Frame109() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Outfit:Black',sans-serif] font-black gap-[50px] items-center leading-[140px] relative text-[140px] tracking-[5.6px] whitespace-nowrap">
      <p className="relative shrink-0 text-[#190b00]">CARFT</p>
      <p className="relative shrink-0 text-[transparent]">CRAFT</p>
      <p className="relative shrink-0 text-[#190b00]">CARFT</p>
      <p className="relative shrink-0 text-[transparent]">CRAFT</p>
    </div>
  );
}

function Frame108() {
  return (
    <div className="absolute h-[800px] left-[80px] top-[7600px] w-[180px] flex flex-col">
      {/* Top Box: 2 Circles */}
      <div className="h-[148px] w-full flex items-center justify-center relative border-b border-[#7b7a77] border-solid">
        <div className="rotate-180 scale-75">
          <Frame110 />
        </div>
      </div>

      {/* Middle Box: Marquee */}
      <div className="flex-1 w-full overflow-hidden relative">
        <div className="-translate-y-1/2 absolute flex h-[2108px] items-center justify-center left-[20px] top-[calc(50%-701px)] w-[140px]">
          <div className="-rotate-90 flex-none">
            <Frame109 />
          </div>
        </div>
      </div>

      {/* Bottom Box: [ S-004 ] */}
      <div className="h-[45px] w-full flex items-center justify-center border-t border-[#7b7a77] border-solid">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
          [ S-004 ]
        </p>
      </div>
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex items-center relative">
      <BrandVector theme="dark" width={132} height={88} />
    </div>
  );
}

function Group13() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%-550px)] top-[7600px]">
      <div className="-translate-x-1/2 absolute bg-[#FFFDFA] left-[calc(50%-550px)] w-[180px]" style={{ top: 7600, height: 148 }}>
        <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="-translate-x-1/2 absolute flex items-center justify-center left-[calc(50%-549px)]" style={{ top: 7722 }}>
        <div className="flex-none rotate-180">
          <Frame110 />
        </div>
      </div>
    </div>
  );
}

function Frame111() {
  return (
    <div className="absolute bg-[#FFFDFA] content-stretch flex h-[40px] items-center justify-center left-[80px] px-[16px] py-[6px] rounded-[110px] top-[8px]">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none rounded-[110px]" />
      <p className="[word-break:break-word] font-['Outfit:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[#190b00] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap">Jayesh Soni</p>
    </div>
  );
}

function Frame112() {
  return (
    <div className="absolute bg-[#FFFDFA] content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[1135px] px-[16px] py-[6px] rounded-[110px] top-[8px]">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none rounded-[110px]" />
      <p className="[word-break:break-word] font-['Outfit:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[#190b00] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap">Craft</p>
      <div className="h-[11.314px] relative shrink-0 w-[11px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11.3137">
          <path d={svgPaths.p20be5a00} fill="var(--fill-0, #77695D)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame113() {
  return (
    <div className="absolute bg-[#FFFDFA] content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[1010px] px-[16px] py-[6px] rounded-[110px] top-[8px]">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none rounded-[110px]" />
      <p className="[word-break:break-word] font-['Outfit:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[#190b00] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap">Stories</p>
      <div className="h-[11.314px] relative shrink-0 w-[11px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11.3137">
          <path d={svgPaths.p20be5a00} fill="var(--fill-0, #77695D)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame114() {
  return (
    <div className="absolute bg-[#FFFDFA] content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[1250px] px-[16px] py-[6px] rounded-[110px] top-[8px]">
      <div aria-hidden className="absolute border border-[#7b7a77] border-solid inset-0 pointer-events-none rounded-[110px]" />
      <p className="[word-break:break-word] font-['Outfit:Black',sans-serif] font-black leading-[normal] relative shrink-0 text-[#190b00] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap">About</p>
      <div className="relative shrink-0 size-[11px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
          <path d={svgPaths.p18019200} fill="var(--fill-0, #77695D)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   RECOMMENDATIONS  [ S-005 ]
   Position: top = 7820 (craft ends 7620 + 200px gap)
   Height: 780px
   ══════════════════════════════════════════════════════════════════════════ */
function RecommendationsSection() {
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      initials: "SM",
      name: "Steve Morris",
      role: "Software Architect",
      company: "Stanford Medicine",
      quote: `"Jayesh's work was instrumental in the success of a major application for Stanford Medicine's medical school students. He consistently exceeded expectations through his expertise in UI/UX design, rapid execution, effective communication, and collaborative approach."`,
      linkedin: "https://linkedin.com/in/",
    },
    {
      initials: "AM",
      name: "Ankit Mishra",
      role: "Senior Developer",
      company: "Vertisystem",
      quote: `"Jayesh possesses a deep understanding of user-centered design and consistently transforms complex user needs into intuitive, engaging experiences. His strategic thinking, craftsmanship, and collaborative approach make him an exceptional designer."`,
      linkedin: "https://linkedin.com/in/",
    },
    {
      initials: "AG",
      name: "Anmol Gupta",
      role: "General Manager",
      company: "Joonify",
      quote: `"Jayesh consistently delivered high-quality work that exceeded expectations. His creativity, attention to detail, openness to feedback, and commitment to iteration made him an invaluable collaborator throughout our time working together."`,
      linkedin: "https://linkedin.com/in/",
    },
  ];

  const t = testimonials[active];

  return (
    <div id="recommendations-section-block" className="absolute left-[80px] top-[8800px] w-[1280px]">
      {/* ── Section Header Bar ── */}
      <div style={{
        width: "100%", height: 100,
        background: "#FFFDFA",
        border: "1px solid #7b7a77",
        display: "flex", alignItems: "center",
        position: "relative",
      }}>
        {/* Left Logo Column (width 70px) */}
        <div style={{ width: 70, height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <div className="content-stretch flex items-center justify-center relative shrink-0">
              <BrandVector theme="dark" width={42} height={28} />
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, height: "100%", background: "#7b7a77", flexShrink: 0 }} />

        {/* Section tag + Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 24 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ S-005 ]</p>
          <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 22, color: "#190b00", letterSpacing: "0.56px", textTransform: "uppercase", margin: 0 }}>RECOMMENDATIONS</p>
        </div>

        {/* Right description */}
        <p style={{ position: "absolute", right: 30, top: "50%", transform: "translateY(-50%)", fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 16, color: "#77695d", textAlign: "right", lineHeight: 1.4, maxWidth: 280, margin: 0 }}>
          Some kind words from people I've had<br />the privilege to work with.
        </p>
      </div>

      {/* ── Content Card ── */}
      <div style={{
        width: "100%",
        height: 680,
        background: "#ffffff",
        border: "1px solid #7b7a77",
        borderTop: "none",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 220,
        paddingRight: 80,
        boxSizing: "border-box",
      }}>

        {/* Person info */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
          {/* Avatar circle */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            {/* Orange dot accent */}
            <div style={{ position: "absolute", top: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: "#EE6C13", zIndex: 2 }} />
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              border: "1px solid #7b7a77",
              background: "#e5ddd4",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Outfit, sans-serif", fontWeight: 700,
              fontSize: 20, color: "#190b00", flexShrink: 0,
            }}>
              {t.initials}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 11, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>{t.role}</p>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 22, color: "#190b00", margin: 0 }}>{t.name}</p>
            <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 14, color: "#77695d", margin: 0 }}>{t.company}</p>
          </div>
        </div>

        {/* Speech bubble quote */}
        <div style={{
          position: "relative",
          background: "#e5ddd4",
          borderRadius: 12,
          padding: "32px 36px",
          width: 800,
          boxSizing: "border-box",
          marginBottom: 16,
        }}>
          {/* Triangle pointer */}
          <div style={{
            position: "absolute",
            top: -14, left: 40,
            width: 0, height: 0,
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderBottom: "14px solid #e5ddd4",
          }} />
          <p style={{
            fontFamily: "Outfit, sans-serif", fontWeight: 400,
            fontSize: 18, color: "#190b00",
            lineHeight: 1.6, margin: 0,
          }}>
            {t.quote}
          </p>
        </div>

        {/* VIEW ON LINKEDIN link */}
        <div
          style={{ width: 800, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, cursor: "pointer", marginTop: 12 }}
          onClick={() => window.open(t.linkedin, "_blank")}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>VIEW ON LINKEDIN</p>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d={svgPaths.p18019200} fill="#EE6C13" />
          </svg>
        </div>
      </div>

      {/* Progress bar / dot navigation (outside and below the card) */}
      <div style={{ position: "absolute", top: 820, left: 0, right: 0, display: "flex", gap: 20, alignItems: "center", width: "100%" }}>
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              height: 4,
              borderRadius: 2,
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: i === active ? "#EE6C13" : "#e5ddd4",
              flex: i === active ? 3.5 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ContactButton({
  label,
  iconPath,
  onClick
}: {
  label: string;
  iconPath: string;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 24px",
        border: "1px solid #7b7a77",
        borderRadius: 24,
        cursor: "pointer",
        background: hover ? "#190b00" : "transparent",
        transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "0 4px 12px rgba(25, 11, 0, 0.12)" : "none",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ transition: "fill 0.25s ease" }}>
        <path d={iconPath} fill={hover ? "#FFFDFA" : "#EE6C13"} />
      </svg>
      <span style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.6px",
        color: hover ? "#FFFDFA" : "#190b00",
        transition: "color 0.25s ease",
      }}>
        {label}
      </span>
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-transparent relative size-full" data-name="Desktop - 6">
      <Group />
      <Group7 />
      <Frame43 />
      <Group11 />
      <Frame99 />
      <Footer style={{ position: "absolute", left: 80, top: 10620 }} />
    </div>
  );
}