import React, { useEffect, useRef, useState } from "react";
import videoCosOpportunity from "@/imports/cos-opportunity.mov";
import videoOpportunity from "@/imports/Opportunity Video.mp4";
import videoD1 from "@/imports/D1.mp4";
import videoD2 from "@/imports/D2.mp4";
import videoD3 from "@/imports/D3.mp4";
import videoD4 from "@/imports/D4.mp4";
import videoE4 from "@/imports/E4.mp4";
import videoE5 from "@/imports/E5.mp4";
import imgE1 from "@/imports/E1.png";
import imgE2 from "@/imports/E2.png";
import imgE3_1 from "@/imports/E3.1.png";
import imgE3_2 from "@/imports/E3.2.png";
import imgCosStoryHero from "@/imports/cos-story-hero.png";
import imgCampaignOSLogo from "@/imports/campaignos_logo.png";
import imgWIDCampaignOS from "@/imports/WID-campaignos.png";
import imgEllipse5 from "@/imports/Desktop6/49f9bacadb0b6c33f4b16626866a7ba76ea5c76a.png";
import imgEllipse6 from "@/imports/Desktop6/9ff71da8485c02d3fd081a21e1d07fea61940bec.png";
import imgEllipse7 from "@/imports/Desktop6/ea2ebb970c11a33998a35f3c05333c9689a2bb47.png";
import BrandVector from "@/components/BrandVector";
import imgProfile from "@/imports/Profile Image Full Size.png";
import Footer from "@/components/Footer";

interface CampaignOSStoryPageProps {
  scale?: number;
  left?: number;
  onBack: () => void;
  onNextStory?: () => void;
}

const CANVAS_W = 1440;
const CANVAS_H = 8600;

function ViewportVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-full-screen-video", { detail: { src } }));
  };

  return (
    <div
      onClick={handleClick}
      data-custom-cursor="full-screen"
      className="relative size-full overflow-hidden cursor-pointer"
    >
      {!isLoaded && <div className="absolute inset-0 skeleton-shimmer z-10" />}
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function ShimmerImage({ src, alt, className, style }: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden size-full" style={style}>
      {!isLoaded && <div className="absolute inset-0 skeleton-shimmer z-10" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function DynamicBgBand({
  top,
  height,
  scale,
  darkBgColor = "#190b00",
  lightBgColor = "#FFFDFA",
  onViewChange
}: {
  top: number;
  height: number;
  scale: number;
  darkBgColor?: string;
  lightBgColor?: string;
  onViewChange?: (isInView: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDark(entry.isIntersecting);
        if (onViewChange) onViewChange(entry.isIntersecting);
        window.dispatchEvent(new CustomEvent("page-theme-change", { detail: { isDark: entry.isIntersecting } }));
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onViewChange]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: 0,
        width: "100%",
        top: `${top * scale}px`,
        height: `${height * scale}px`,
        transition: "background-color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        backgroundColor: isDark ? darkBgColor : lightBgColor,
      }}
    />
  );
}

export default function CampaignOSStoryPage({ scale = 1, left = 0, onBack, onNextStory }: CampaignOSStoryPageProps) {
  const [isChallengeInView, setIsChallengeInView] = useState(false);
  const [isOneThingInView, setIsOneThingInView] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      position: "relative",
      background: "#FFFDFA",
      overflowX: "hidden",
    }}>
      {/* ── Dynamic Background Bands ── */}
      <DynamicBgBand top={1076} height={1680} scale={scale} onViewChange={setIsChallengeInView} />
      <DynamicBgBand top={7847} height={750} scale={scale} onViewChange={setIsOneThingInView} />

      {/* ── Canvas Scroll Spacer ── */}
      <div style={{ height: `${CANVAS_H * scale}px`, width: "100%", position: "relative" }}>

        {/* ── Fixed Sticky Navigation Bar ── */}
        <div style={{
          position: "fixed",
          top: 0,
          left: `${left}px`,
          width: `${CANVAS_W}px`,
          height: "100px",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          pointerEvents: "none",
          zIndex: 999,
        }}>
          {/* Back Pill Button */}
          <div
            onClick={onBack}
            style={{ pointerEvents: "auto" }}
            className="hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[98px] px-[16px] py-[6px] rounded-[110px] top-[33px] z-10 shadow-sm transition-all duration-200 group cursor-pointer"
          >
            <div className="flex h-[11px] items-center justify-center relative shrink-0 w-[11px]">
              <svg className="size-full" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.5L4.5 7.5L10 2.5" className="stroke-[#190B00] group-hover:stroke-[#FFFDFA] transition-colors duration-200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-outfit font-black leading-[normal] text-[#190b00] group-hover:text-[#fffdfa] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200">
              Back
            </p>
          </div>

          {/* Nav Overlapping Circles on Top Right */}
          <div
            style={{ pointerEvents: "auto" }}
            className="absolute bg-[#fffdfa] rounded-[110px] flex items-center justify-center left-[1302px] top-[33px] w-[58px] h-[40px] z-10 shadow-sm"
          >
            <BrandVector theme="dark" width={48} height={32} />
          </div>
        </div>

        {/* ── Scaled Inner Canvas ── */}
        <div style={{
          width: `${CANVAS_W}px`,
          height: `${CANVAS_H}px`,
          position: "absolute",
          top: 0,
          left: `${left}px`,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          background: "transparent",
        }} className="font-outfit select-none">

          {/* ── Overview Header Grid Bar ── */}
          <div className="absolute content-stretch flex items-center left-[80px] top-[180px] w-[1280px]">
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-center pl-[30px] pr-[90px] py-[16px] relative shrink-0">
              <p className="font-outfit font-normal text-[#190b00] text-[30px] whitespace-nowrap">
                OVERVIEW
              </p>
            </div>
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" />
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-end pl-[90px] pr-[30px] py-[16px] relative shrink-0 -ml-[1px]">
              <p className="font-inter font-bold text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
                [ 2026 ]
              </p>
            </div>
          </div>

          {/* ── Overview Box Metadata & Branding ── */}
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex flex-col items-start left-[80px] p-[30px] top-[249px] w-[1280px] h-[488px]">
            <div className="content-stretch flex gap-[90px] items-end relative shrink-0 h-[428px] w-full">
              <div className="content-stretch flex flex-col gap-[20px] h-[228px] items-start py-[20px] relative shrink-0">
                <div className="content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[108px]">
                  <p className="font-inter font-bold text-[#7b7b7b] text-[12px] tracking-[0.6px] uppercase w-full">
                    ROLE
                  </p>
                  <p className="font-outfit font-normal text-[#190b00] text-[18px] w-full">
                    Product Lead
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
                  <p className="font-inter font-bold text-[#7b7b7b] text-[12px] tracking-[0.6px] uppercase w-full">
                    FOCUS
                  </p>
                  <div className="font-outfit font-normal text-[#190b00] text-[18px] leading-[1.3]">
                    <p className="mb-0">/ Product Design</p>
                    <p className="mb-0">/ UX Strategy</p>
                    <p className="mb-0">/ Interaction Design</p>
                    <p className="mb-0">/ Design Systems</p>
                    <p className="mb-0">/ AI Experience Design</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0" data-node-id="1:38">
                <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-node-id="1:39">
                  <div className="relative shrink-0 size-[100px]" data-node-id="1:40" data-name="Campaign OS Logo">
                    <img alt="Campaign OS Logo" className="absolute inset-0 size-full object-contain pointer-events-none" src={imgCampaignOSLogo} />
                  </div>
                  <p className="[word-break:break-word] font-outfit font-medium font-medium leading-[100px] relative shrink-0 text-[#190b00] text-[100px] tracking-[4px] whitespace-nowrap" data-node-id="1:41">
                    Campaign OS
                  </p>
                </div>

                <div className="content-stretch flex flex-col gap-[16px] items-start px-[10px] relative shrink-0">
                  <div className="font-outfit font-medium leading-[1.2] text-[#7b7b7b] text-[52px] w-[915px]">
                    <p className="mb-0">Designing an AI-Native Campaign Operating System</p>
                  </div>
                  <p className="font-outfit font-normal text-[#9c9288] text-[16px] leading-[1.4] tracking-[0.2px] mb-0">
                    Originally designed as the pilot experience for an AI-first marketing platform.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Overview Box Pullquote ── */}
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex items-end justify-center left-[80px] p-[30px] top-[736px] w-[1280px]">
            <div className="flex-[1_0_0] font-outfit font-normal leading-[1.5] text-[#77695d] text-[24px]">
              <p className="mb-0">Planning, launching, monitoring and improving digital campaigns shouldn't require
                <span className="font-outfit font-bold text-[#190b00]"> jumping across half a dozen tools.</span> This project explored how AI could become
                <span className="font-outfit font-bold text-[#190b00]"> an active marketing partner</span> —helping teams move from strategy to execution inside
                <span className="font-outfit font-bold text-[#190b00]"> one connected workspace.</span>
              </p>
            </div>
          </div>

          {/* ── Vibrant Green, Purple & Blue Ambient Glow & Main Hero Composite Image ── */}
          <div 
            style={{
              position: "absolute",
              left: "60px",
              top: "1200px",
              width: "1320px",
              height: "750px",
              background: "linear-gradient(110deg, #10b981 0%, #a855f7 50%, #3b82f6 100%)",
              filter: "blur(95px)",
              opacity: 0.85,
              borderRadius: "80px",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div 
            className="-translate-x-1/2 absolute left-1/2 overflow-hidden"
            style={{
              top: "1176px",
              width: "1280px",
              height: "800px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.45)",
              boxShadow: "-40px 0 90px rgba(16, 185, 129, 0.45), 0 0 100px rgba(168, 85, 247, 0.5), 40px 0 90px rgba(59, 130, 246, 0.45)",
              zIndex: 2,
            }}
          >
            <ShimmerImage alt="Campaign OS Hero" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCosStoryHero} />
          </div>

          {/* ── 2. THE CHALLENGE SECTION (Top 2176px inside Dark BG 1) ── */}
          <div className="absolute left-[80px] top-[2176px] w-[1280px] h-[480px]">
            <div className={`[word-break:break-word] absolute font-outfit font-normal leading-[1.6] left-[0px] text-[24px] top-[100px] w-[1106px] transition-colors duration-700 ${isChallengeInView ? "text-[#ccc]" : "text-[#77695d]"}`}>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">Marketing teams rarely struggle with a lack of tools—they struggle with fragmented workflows.</p>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">​</p>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">Strategy lives in documents, creatives in design tools, campaigns inside ad managers and performance inside analytics dashboards. AI can generate content, but it rarely understands the complete lifecycle of a campaign.</p>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">​</p>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">The opportunity wasn't to build another AI assistant.</p>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">​</p>
              <p className="leading-[normal] whitespace-pre-wrap">It was to design an AI-native workspace that could support marketers before, during and after a campaign goes live.</p>
            </div>
            <p className={`[word-break:break-word] absolute font-outfit font-bold leading-[normal] left-[0px] text-[50px] top-[0px] tracking-[5px] whitespace-nowrap transition-colors duration-700 ${isChallengeInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>
              THE CHALLENGE
            </p>
            <div className={`absolute left-0 top-[72px] w-[1030px] h-[1px] transition-colors duration-700 ${isChallengeInView ? "bg-[rgba(255,253,250,0.15)]" : "bg-[#7b7a77]/30"}`} />
          </div>

          {/* ── 3. THE OPPORTUNITY SECTION (Top 2956px) ── */}
          <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[2956px] w-[1280px]">
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-center pl-[30px] pr-[90px] py-[16px] relative shrink-0">
                <p className="font-outfit font-normal text-[#190b00] text-[30px] whitespace-nowrap">
                  THE OPPORTUNITY
                </p>
              </div>
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" />
            </div>
            <div className="content-stretch flex flex-col gap-[24px] relative shrink-0 w-full -mt-[1px] bg-white border border-[#7b7a77] border-solid p-[30px]">
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid p-[30px] w-full">
                <div className="font-outfit font-normal leading-[1.5] text-[#190b00] text-[24px]">
                  <p className="mb-4">Instead of asking marketers to learn increasingly complex advertising platforms, what if they could simply focus on outcomes?</p>
                  <p className="mb-1">The platform translates business goals into campaign structures, understands marketing context from day one and continuously helps improve campaign performance.</p>
                  <p className="font-outfit font-bold text-[#190b00] mb-0">AI becomes part of the workflow—not an external tool users constantly switch to.</p>
                </div>
              </div>
              <div 
                style={{ 
                  width: "100%", 
                  aspectRatio: "1440/936", 
                  borderRadius: "24px", 
                  overflow: "hidden", 
                  border: "5px solid rgba(123, 122, 119, 0.35)", 
                  backgroundColor: "rgba(255, 253, 250, 0.85)", 
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  boxShadow: "0 24px 60px rgba(25, 11, 0, 0.14), 0 6px 20px rgba(0, 0, 0, 0.08)",
                }}
              >
                <ViewportVideo src={videoCosOpportunity} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* ── 4. WHAT I DROVE SECTION (Top 4293px - 200px gap after Opportunity ends at 4093px) ── */}
          <div className="absolute left-[80px] top-[4293px] w-[1280px] h-[840px]">
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid h-[840px] left-0 w-[70px]">
              <div className="absolute flex items-center justify-center left-[10px] top-[135px] w-[50px]">
                <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                  <p className="font-outfit font-normal text-[#190b00] text-[30px] tracking-[1.2px]">WHAT I DROVE</p>
                </div>
              </div>
              <div className="absolute flex items-center justify-center left-[10px] top-[648px] w-[50px]">
                <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                  <p className="font-inter font-bold text-[#77695d] text-[12px] tracking-[0.6px] uppercase">[ CONTRIBUTION ]</p>
                </div>
              </div>
              <div className="absolute border-[#7b7a77] border-solid border-t content-stretch flex flex-col items-center justify-center left-0 px-[10px] py-[30px] top-[752px] w-[70px]">
                <div className="content-stretch flex items-center justify-center relative shrink-0">
                  <BrandVector theme="dark" width={42} height={28} />
                </div>
              </div>
            </div>
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid h-[840px] left-[69px] w-[1211px]">
              <div className="absolute font-outfit font-normal leading-[1.5] left-[60px] text-[22px] text-[#77695d] top-[45px] w-[1090px]">
                <p className="mb-3">I led the end-to-end product experience for the pilot, designing the workflows that connected campaign planning, AI-assisted campaign creation, performance monitoring and continuous optimization. My work included:</p>
                <p className="font-outfit font-bold text-[#190b00] text-[22px] leading-[1.4] mb-0">
                  Product Strategy / Information Architecture / End-to-end user experience / AI interaction patterns Dashboard and analytics experience / Campaign planning workflows / Design System foundations High-Fidelity Prototypes / Interaction Design
                </p>
              </div>

              {/* Graphic Asset Image */}
              <div className="absolute left-[60px] top-[305px] w-[1090px] h-[480px] flex items-center justify-center pointer-events-none">
                <img 
                  src={imgWIDCampaignOS} 
                  alt="What I Drove Diagram" 
                  className="max-w-[780px] max-h-[350px] w-auto h-auto object-contain display-block"
                />
              </div>
            </div>
          </div>

          {/* ── 5. VALIDATION SECTION (Top 5333px - 200px gap after What I Drove ends at 5133px) ── */}
          <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[5333px] w-[1280px] z-[2]">
            {/* Header Box */}
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex flex-col items-start p-[40px] relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 flex-1">
                  <p className="font-inter font-bold text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full mb-0">
                    [ AI-NATIVE MARKETING ]
                  </p>
                  <p className="font-outfit font-black leading-[1] text-[#190b00] text-[140px] tracking-[5.6px] w-full margin-0">
                    VALIDATION
                  </p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none">
                    <BrandVector theme="dark" width={231} height={154} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Header Text Bar */}
            <div className="bg-[#fffdfa] border-x border-[#7b7a77] border-solid content-stretch flex items-center px-[40px] pt-[30px] pb-[10px] relative shrink-0 w-full -mt-[1px]">
              <p className="font-outfit font-normal text-[#77695d] text-[24px] leading-[1.5] margin-0">
                This pilot explored how AI could move beyond content generation to become an active collaborator throughout the entire campaign lifecycle.
              </p>
            </div>

            {/* 2x2 Grid Section with Remix Icons */}
            <div className="bg-[#fffdfa] border-x border-b border-[#7b7a77] border-solid content-stretch flex flex-col h-[640px] relative shrink-0 w-full -mt-[1px]">
              <div className="grid grid-cols-2 grid-rows-2 size-full">
                {/* Card 1: Connected Workflows */}
                <div className="border-[#7b7a77] border-b border-r border-solid flex flex-col justify-between p-[40px]">
                  <div className="flex flex-col gap-4">
                    <div className="text-[#EE6C13] text-[48px] leading-[1] flex items-center">
                      <i className="ri-route-line" />
                    </div>
                    <h3 className="font-outfit font-bold text-[#190b00] text-[28px] margin-0">Connected Workflows</h3>
                    <p className="font-outfit font-normal text-[#77695d] text-[18px] leading-[1.5] margin-0">
                      Unified campaign planning, execution and optimization into one continuous experience instead of disconnected marketing tools.
                    </p>
                  </div>
                </div>

                {/* Card 2: Conversational Analytics */}
                <div className="border-[#7b7a77] border-b border-solid flex flex-col justify-between p-[40px]">
                  <div className="flex flex-col gap-4">
                    <div className="text-[#EE6C13] text-[48px] leading-[1] flex items-center">
                      <i className="ri-chat-smile-ai-line" />
                    </div>
                    <h3 className="font-outfit font-bold text-[#190b00] text-[28px] margin-0">Conversational Analytics</h3>
                    <p className="font-outfit font-normal text-[#77695d] text-[18px] leading-[1.5] margin-0">
                      Transformed performance dashboards into contextual AI conversations that helped marketers understand why, not just what.
                    </p>
                  </div>
                </div>

                {/* Card 3: Living Insights */}
                <div className="border-[#7b7a77] border-r border-solid flex flex-col justify-between p-[40px]">
                  <div className="flex flex-col gap-4">
                    <div className="text-[#EE6C13] text-[48px] leading-[1] flex items-center">
                      <i className="ri-sparkling-fill" />
                    </div>
                    <h3 className="font-outfit font-bold text-[#190b00] text-[28px] margin-0">Living Insights</h3>
                    <p className="font-outfit font-normal text-[#77695d] text-[18px] leading-[1.5] margin-0">
                      Introduced reusable AI insight blocks that could be explored, remixed and expanded as campaigns evolved.
                    </p>
                  </div>
                </div>

                {/* Card 4: Calm Monitoring */}
                <div className="flex flex-col justify-between p-[40px]">
                  <div className="flex flex-col gap-4">
                    <div className="text-[#EE6C13] text-[48px] leading-[1] flex items-center">
                      <i className="ri-radar-line" />
                    </div>
                    <h3 className="font-outfit font-bold text-[#190b00] text-[28px] margin-0">Calm Monitoring</h3>
                    <p className="font-outfit font-normal text-[#77695d] text-[18px] leading-[1.5] margin-0">
                      Validated autonomous monitoring where AI surfaced only meaningful moments for human intervention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 6. CRAFTING THE EXPERIENCE (Top 6493px - 200px gap after Validation ends at 6293px) ── */}
          <div className="absolute left-[80px] top-[6493px] w-[1280px]">
            {/* Header Titles & Vector Graphic */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <p
                  className="font-outfit font-black text-[105px] leading-[105px] tracking-[4.2px] uppercase whitespace-nowrap margin-0"
                  style={{
                    color: "#FFFDFA",
                    WebkitTextStrokeWidth: "2px",
                    WebkitTextStrokeColor: "#190b00",
                    paintOrder: "stroke fill",
                  }}
                >
                  CRAFTING
                </p>
                <p className="font-outfit font-black text-[#190b00] text-[105px] leading-[105px] tracking-[4.2px] uppercase whitespace-nowrap margin-0">
                  THE EXPERIENCE
                </p>
              </div>
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none">
                  <BrandVector theme="dark" width={231} height={154} />
                </div>
              </div>
            </div>

            {/* 2-Column Asymmetric Grid */}
            <div className="grid grid-cols-2 gap-6 items-start">
              {/* Left Column (Total Height: 180 + 24 + 340 + 24 + 500 = 1068px) */}
              <div className="flex flex-col gap-6">
                {/* L1: Text Callout Box */}
                <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid p-[24px] h-[180px] flex flex-col justify-center">
                  <p className="font-outfit font-normal text-[#77695d] text-[16px] leading-[1.4] mb-2">
                    Beyond the primary workflows, the product relied heavily on interaction design to make AI feel responsive without becoming overwhelming.
                  </p>
                  <p className="font-outfit font-normal text-[#77695d] text-[16px] leading-[1.4] margin-0">
                    <span className="font-outfit font-bold text-[#190b00]">Motion / Progressive Disclosure / Contextual Side Panels / Conversational Transitions</span> were designed to reduce cognitive load while maintaining transparency.
                  </p>
                </div>

                {/* L2: Middle Horizontal Video Card */}
                <div className="w-full h-[340px] border border-[#7b7a77] bg-[#e5ddd4] overflow-hidden">
                  <ViewportVideo src={videoOpportunity} className="size-full object-cover" />
                </div>

                {/* L3: Bottom Large Square Video Card */}
                <div className="w-full h-[500px] border border-[#7b7a77] bg-[#e5ddd4] overflow-hidden">
                  <ViewportVideo src={videoD3} className="size-full object-cover" />
                </div>
              </div>

              {/* Right Column (Total Height: 480 + 24 + 270 + 24 + 270 = 1068px) */}
              <div className="flex flex-col gap-6">
                {/* R1: Top Tall Portrait Video Card */}
                <div className="w-full h-[480px] border border-[#7b7a77] bg-[#e5ddd4] overflow-hidden">
                  <ViewportVideo src={videoD1} className="size-full object-cover" />
                </div>

                {/* R2: Middle Horizontal Video Card */}
                <div className="w-full h-[270px] border border-[#7b7a77] bg-[#e5ddd4] overflow-hidden">
                  <ViewportVideo src={videoD2} className="size-full object-cover" />
                </div>

                {/* R3: Bottom Horizontal Video Card */}
                <div className="w-full h-[270px] border border-[#7b7a77] bg-[#e5ddd4] overflow-hidden">
                  <ViewportVideo src={videoD4} className="size-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* ─── 7. ONE THING I LEARNED SECTION (Top 7947px - 100px inside Dark BG 2 at 7847px) ─── */}
          <div className="absolute content-stretch flex flex-col gap-[19px] items-start left-[80px] top-[7947px] w-[1280px] z-[2]">
            <p className={`font-outfit font-bold leading-[normal] relative shrink-0 text-[50px] tracking-[5px] w-[1030px] margin-0 transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>
              <span style={{ WebkitTextStrokeWidth: "2px", WebkitTextStrokeColor: "#7B7A77", color: isOneThingInView ? "#190b00" : "#fffdfa", paintOrder: "stroke fill" }}>ONE THING</span>
              <span>{` I LEARNED`}</span>
            </p>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div className="h-0 relative w-[1030px]">
                  <div className={`absolute inset-[-1px_0_0_0] h-[1px] w-full transition-colors duration-700 ${isOneThingInView ? "bg-[rgba(255,253,250,0.15)]" : "bg-[#7b7a77]/30"}`} />
                </div>
              </div>
            </div>
            <div className={`font-outfit font-normal leading-[1.6] relative shrink-0 text-[24px] w-[1030px] transition-colors duration-700 ${isOneThingInView ? "text-[#7b7b7b]" : "text-[#77695d]"}`}>
              <p className="leading-[normal] mb-0">Designing AI products isn't about adding chat to existing software.</p>
              <p className="leading-[normal] mb-0">​</p>
              <p className="leading-[normal] mb-0">
                <span>The real challenge is </span>
                <span className={`font-outfit font-bold transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>deciding when AI should guide, when it should collaborate and when it should quietly stay out of the way.</span>
              </p>
              <p className="leading-[normal] mb-0">​</p>
              <p className="leading-[normal] mb-0">This project reinforced that the best AI experiences don't ask users to adapt to machines</p>
              <p className="leading-[normal] mb-0">​</p>
              <p className="font-outfit font-bold text-[30px] leading-tight mb-0">
                <span className={`transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>they adapt to the way people already </span>
                <span className="text-[#ee6c13]">think</span>
                <span className={`transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>, </span>
                <span className="text-[#ee6c13]">plan</span>
                <span className={`transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}> and </span>
                <span className="text-[#ee6c13]">make decisions</span>
                <span className={`transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>.</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ─── NEXT ? / FOOTER CARD (Centered in 100vh) ─── */}
      <div style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#190b00",
        position: "relative",
        zIndex: 10,
      }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}>
          <Footer />
        </div>
      </div>

      {/* ─── NEXT STORY BOTTOM STRIP (80px light bg strip after footer) ─── */}
      <div style={{
        height: 80,
        width: "100%",
        backgroundColor: "#FFFDFA",
        borderTop: "1px solid #7b7a77",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 10,
      }}>
        <div
          onClick={() => {
            if (onNextStory) {
              onNextStory();
            } else {
              window.dispatchEvent(new CustomEvent("navigate-to-path", { detail: "/allyra-story" }));
              window.scrollTo(0, 0);
            }
          }}
          style={{ cursor: "pointer", pointerEvents: "auto" }}
          className="hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] bg-[#fffdfa] border border-[#7b7a77] border-solid flex gap-[10px] h-[40px] items-center justify-center px-[24px] rounded-[110px] shadow-sm transition-all duration-200 group"
        >
          <span className="font-outfit font-black text-[#190b00] group-hover:text-[#fffdfa] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200">
            Go to Next Story
          </span>
          <svg className="size-[14px]" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 2.5L10.5 7.5L5 12.5" className="stroke-[#190B00] group-hover:stroke-[#FFFDFA] transition-colors duration-200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ─── SCROLL TO TOP FLOATING BUTTON ─── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 z-[999] size-[50px] rounded-full bg-[#fffdfa] text-[#190b00] border border-[#7b7a77] shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-[#ee6c13] hover:text-white hover:border-[#ee6c13] hover:scale-110 active:scale-95 ${
          showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg className="size-6 stroke-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
