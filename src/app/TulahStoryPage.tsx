import React, { useEffect, useRef, useState } from "react";
import imgTulahStoryHero from "@/imports/tulah-story-hero.webp";
import imgTulahLogo from "@/imports/tulah_logo.webp";
import imgTulahCraft1 from "@/imports/tulah_craft_1.webp";
import videoTulahOpportunity from "@/imports/tulah_opportunity.mp4";
import videoTulahD1 from "@/imports/tulah_D1.mp4";
import videoTulahD2 from "@/imports/tulah_D2.mp4";
import videoTulahD3 from "@/imports/tulah_D3.mp4";
import videoTulahD4 from "@/imports/tulah_D4.mp4";
import imgWIDTulah from "@/imports/WID-tulah.webp";
import BrandVector from "@/components/BrandVector";
import Footer from "@/components/Footer";
import NextStoryBottomStrip from "@/components/NextStoryBottomStrip";
import ScrollToTopButton from "@/components/ScrollToTopButton";

interface TulahStoryPageProps {
  scale?: number;
  left?: number;
  onBack: () => void;
  onNextStory?: () => void;
}

const CANVAS_W = 1440;
const CANVAS_H = 10300;

function ViewportVideo({ 
  src, 
  className, 
  playbackRate = 1 
}: { 
  src: string; 
  className?: string; 
  playbackRate?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const applyPlaybackRate = () => {
    if (videoRef.current && playbackRate !== 1) {
      videoRef.current.playbackRate = playbackRate;
    }
  };

  useEffect(() => {
    applyPlaybackRate();
  }, [playbackRate, isLoaded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          applyPlaybackRate();
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, [playbackRate]);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-full-screen-video", { detail: { src } }));
  };

  return (
    <div 
      onClick={handleClick}
      data-custom-cursor="full-screen"
      className="relative size-full overflow-hidden cursor-pointer"
    >
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-shimmer z-10" />
      )}
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        onLoadedData={() => {
          setIsLoaded(true);
          applyPlaybackRate();
        }}
        onPlay={applyPlaybackRate}
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
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-shimmer z-10" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

interface DynamicBgBandProps {
  top: number;
  height: number;
  scale: number;
  darkBgColor?: string;
  lightBgColor?: string;
  onViewChange?: (isInView: boolean) => void;
}

function DynamicBgBand({ 
  top, 
  height, 
  scale, 
  darkBgColor = "#190b00", 
  lightBgColor = "#FFFDFA",
  onViewChange
}: DynamicBgBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDark(entry.isIntersecting);
        if (onViewChange) {
          onViewChange(entry.isIntersecting);
        }
        window.dispatchEvent(new CustomEvent("page-theme-change", { detail: { isDark: entry.isIntersecting } }));
      },
      {
        rootMargin: "0px 0px -25% 0px",
        threshold: 0.05,
      }
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

export default function TulahStoryPage({ scale = 1, left = 0, onBack, onNextStory }: TulahStoryPageProps) {
  const keyDecisionsRef = useRef<HTMLDivElement>(null);
  const [isDecisionsInView, setIsDecisionsInView] = useState(false);
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
    <article 
      role="article"
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        background: "#FFFDFA",
        overflowX: "hidden",
      }}
    >
      {/* Absolute Canvas Scroll Spacer */}
      <div style={{ height: `${CANVAS_H * scale}px`, width: "100%", position: "relative" }}>
        {/* Sticky Header Wrapper */}
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
          {/* Back pill-shaped button */}
          <div 
            onClick={onBack}
            role="button"
            aria-label="Back to Homepage"
            style={{ cursor: "pointer", transition: "all 0.2s", pointerEvents: "auto" }}
            className="hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[90px] px-[16px] py-[6px] rounded-[110px] top-[33px] z-10 shadow-sm transition-all duration-200 group" 
          >
            <div className="flex h-[11px] items-center justify-center relative shrink-0 w-[11px]">
              <svg className="size-full" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.5L4.5 7.5L10 2.5" className="stroke-[#190B00] group-hover:stroke-[#FFFDFA] transition-colors duration-200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="[word-break:break-word] font-outfit font-black leading-[normal] relative shrink-0 text-[#190b00] group-hover:text-[#fffdfa] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200">
              Back
            </p>
          </div>

          {/* Nav Overlapping Circles on Top Right */}
          <div 
            style={{ pointerEvents: "auto" }}
            className="absolute bg-[#fffdfa] rounded-[110px] flex items-center justify-center left-[1292px] top-[33px] w-[58px] h-[40px] z-10 shadow-sm" 
          >
            <BrandVector theme="dark" width={48} height={32} />
          </div>
        </div>

        {/* ─── DYNAMIC BACKGROUND BANDS ─── */}
        <DynamicBgBand 
          top={1028} 
          height={1725} 
          scale={scale} 
          onViewChange={setIsChallengeInView}
        />
        
        <DynamicBgBand 
          top={6320} 
          height={3234} 
          scale={scale} 
          onViewChange={setIsDecisionsInView}
        />
        
        <DynamicBgBand 
          top={9640} 
          height={720} 
          scale={scale} 
          onViewChange={setIsOneThingInView}
        />

        {/* ─── SCALED INNER CANVAS ─── */}
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
          
          {/* Background grid line */}
          <div className="absolute h-[787.594px] left-[21.18%] right-[72.15%] top-[7130.67px]">
            <div className="absolute block inset-0 max-w-none size-full border-l border-dashed border-[#7b7a77] opacity-25" />
          </div>

          {/* Overview Box Metadata & Branding */}
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex flex-col items-start left-[80px] p-[30px] top-[249px] w-[1280px] h-[488px]">
            <div className="content-stretch flex gap-[90px] items-end relative shrink-0 h-[428px] w-full">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
                <div className="content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[160px]">
                  <p className="font-inter font-bold not-italic relative shrink-0 text-[#7b7b7b] text-[12px] tracking-[0.6px] uppercase w-full">
                    ROLE
                  </p>
                  <p className="font-outfit font-normal relative shrink-0 text-[#190b00] text-[18px] w-full leading-[1.3]">
                    Product Lead &<br />AI Product Designer
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 mt-2">
                  <p className="font-inter font-bold leading-[normal] min-w-full not-italic relative shrink-0 text-[#7b7b7b] text-[12px] tracking-[0.6px] uppercase w-[min-content]">
                    SCOPE
                  </p>
                  <div className="font-outfit font-normal leading-[1.3] relative shrink-0 text-[#190b00] text-[17px]">
                    <p className="leading-[normal] mb-0">/ Guest Experience</p>
                    <p className="leading-[normal] mb-0">/ CRM Operations</p>
                    <p className="leading-[normal] mb-0">/ Retreat Planning</p>
                    <p className="leading-[normal] mb-0">/ Consultant Workbenches</p>
                    <p className="leading-[normal] mb-0">/ Care Execution Systems</p>
                    <p className="leading-[normal] mb-0">/ Home Care Ecosystem</p>
                  </div>
                </div>
              </div>

              <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0">
                <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[100px]">
                    <img alt="Tulah Logo" className="absolute inset-0 size-full object-contain pointer-events-none" src={imgTulahLogo} />
                  </div>
                  <p className="[word-break:break-word] font-outfit font-medium leading-[100px] relative shrink-0 text-[#190b00] text-[100px] tracking-[4px] whitespace-nowrap">
                    tulah
                  </p>
                </div>
                <div className="content-stretch flex items-center justify-center px-[10px] relative shrink-0">
                  <div className="[word-break:break-word] font-outfit font-medium leading-[1.2] relative shrink-0 text-[#7b7b7b] text-[52px] w-[915px]">
                    <p className="leading-[normal] mb-0">
                      Designing an Operational<br />
                      Intelligence Platform for<br />
                      Personalized Wellness Care
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Header grid border bar */}
          <div className="absolute content-stretch flex items-center left-[80px] top-[180px] w-[1280px]">
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-center pl-[30px] pr-[90px] py-[16px] relative shrink-0">
              <p className="[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap">
                OVERVIEW
              </p>
            </div>
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" />
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-end pl-[90px] pr-[30px] py-[16px] relative shrink-0 -ml-[1px]">
              <p className="[word-break:break-word] font-inter font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
                [ 2025 ]
              </p>
            </div>
          </div>

          {/* Overview Box pullquote copy */}
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex items-end justify-center left-[80px] p-[30px] top-[736px] w-[1280px]">
            <div className="[word-break:break-word] flex-[1_0_0] font-outfit font-normal leading-[1.5] min-w-px relative text-[#77695d] text-[24px] whitespace-pre-wrap">
              <p className="leading-[normal] mb-0">{`Personalized wellness appears simple to guests, but delivering it requires coordination across consultants, diagnostics, therapies, schedules, and operations.`}</p>
              <p className="leading-[normal] mb-0">​</p>
              <p>
                <span className="leading-[normal]">{`My role was to design the systems that brought together `}</span>
                <span className="[word-break:break-word] font-outfit font-bold font-bold leading-[normal]">14+ operational roles into one connected care journey</span>
                <span className="leading-[normal]">{`—from pre-arrival onboarding to post-retreat home care.`}</span>
              </p>
            </div>
          </div>

          {/* Violet/Amber glow layer */}
          <div className="absolute bg-[#ee6c13] blur-[100px] h-[676px] left-[124px] top-[1220px] w-[1192px] opacity-35" />
          
          {/* Main Hero composite image */}
          <div className="-translate-x-1/2 absolute border border-solid border-white h-[800px] left-1/2 rounded-[10px] top-[1158px] w-[1280px]">
            <ShimmerImage alt="Tulah Hero Dashboard" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgTulahStoryHero} />
          </div>

          {/* ─── THE CHALLENGE SECTION ─── */}
          <div className="absolute left-[80px] top-[2143px] w-[1280px] h-[600px]">
            <div className={`[word-break:break-word] absolute font-outfit font-normal leading-[1.6] left-[0px] text-[24px] top-[100px] w-[1106px] transition-colors duration-700 ${isChallengeInView ? "text-[#ccc]" : "text-[#77695d]"}`}>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">Delivering personalized wellness wasn't the challenge. Coordinating it was. Every guest journey involved multiple consultants, diagnostics, therapies, nutrition plans, fitness programs, medications, wearable data, and operational teams working together.</p>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">​</p>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">Without a connected system:</p>
              <ul className="list-disc mb-0 pl-[36px]">
                <li>Care teams worked in silos</li>
                <li>Recommendations became fragmented</li>
                <li>Activities were difficult to coordinate</li>
                <li>Guests struggled to understand what came next</li>
                <li>Long-term continuity of care was difficult to maintain</li>
              </ul>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">​</p>
              <p className="leading-[normal] mb-0 whitespace-pre-wrap">The opportunity wasn't to build another wellness platform.</p>
              <p className="leading-[normal] whitespace-pre-wrap">It was to design a unified operational system that connected specialists, operations teams, and guests through a single, end-to-end care journey.</p>
            </div>
            <p className={`[word-break:break-word] absolute font-outfit font-bold leading-[normal] left-[0px] text-[50px] top-[0px] tracking-[5px] whitespace-nowrap transition-colors duration-700 ${isChallengeInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>
              THE CHALLENGE
            </p>
            <div className={`absolute left-0 top-[72px] w-[1030px] h-[1px] transition-colors duration-700 ${isChallengeInView ? "bg-[rgba(255,253,250,0.15)]" : "bg-[#7b7a77]/30"}`} />
          </div>

          {/* ─── THE OPPORTUNITY SECTION ─── */}
          <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[2971px] w-[1280px]">
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-center pl-[30px] pr-[90px] py-[16px] relative shrink-0">
                <p className="[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[26px] tracking-[1px] uppercase whitespace-nowrap">
                  THE OPPORTUNITY
                </p>
              </div>
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" />
            </div>
            <div className="content-stretch flex items-center relative shrink-0 w-full -mt-[1px]">
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] relative p-[30px] flex flex-col gap-[30px]">
                
                {/* Content Card Box matching reference image */}
                <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid p-[36px] w-full flex flex-col gap-[20px]">
                  <p className="font-outfit font-normal text-[#190b00] text-[22px] leading-[1.5] margin-0">
                    Most operational challenges weren't workflow problems—they were clarity problems.
                  </p>

                  <div className="flex flex-col gap-[6px] font-outfit text-[#190b00] text-[22px] leading-[1.5]">
                    <p className="margin-0">
                      <span>Guests needed to know </span>
                      <span className="font-bold">\ What happens next \ Which tasks are pending \ Where do I go</span>
                    </p>
                    <p className="margin-0">
                      <span>Staff needed clarity on </span>
                      <span className="font-bold">\ Task ownership \ Dependencies \ Next actions</span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-[6px] font-outfit font-normal text-[#190b00] text-[22px] leading-[1.5]">
                    <p className="margin-0">
                      Consultants also needed a structured way to combine their expertise into one personalized retreat plan.
                    </p>
                    <p className="margin-0">
                      <span>This became an opportunity to design a </span>
                      <span className="font-bold">connected operational intelligence system</span>
                      <span> instead of isolated tools.</span>
                    </p>
                  </div>
                </div>

                {/* Opportunity Video Showcase below text box */}
                <div style={{ width: "838px", aspectRatio: "2562 / 1844", borderRadius: "38px", overflow: "hidden", border: "1.5px solid #e5ddd4", margin: "0 auto", backgroundColor: "#000" }}>
                  <ViewportVideo 
                    src={videoTulahOpportunity} 
                    playbackRate={2}
                    className="w-full h-full object-contain" 
                  />
                </div>

              </div>
            </div>
          </div>

          {/* ─── WHAT I DROVE SECTION (Contribution Diagram layout) ─── */}
          <div className="absolute left-[80px] top-[4231px] w-[1280px] h-[714px]">
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid h-[714px] left-0 w-[70px]">
              <div className="absolute flex items-center justify-center left-[10px] top-[115px] w-[50px]">
                <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                  <p className="font-outfit font-normal leading-[normal] text-[#190b00] text-[30px] tracking-[1.2px]">WHAT I DROVE</p>
                </div>
              </div>
              <div className="absolute flex items-center justify-center left-[10px] top-[535px] w-[50px]">
                <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                  <p className="font-inter font-bold leading-[normal] text-[#77695d] text-[12px] tracking-[0.6px] uppercase">[ contribution ]</p>
                </div>
              </div>
              <div className="absolute border-[#7b7a77] border-solid border-t content-stretch flex flex-col items-center justify-center left-0 px-[10px] py-[20px] top-[626px] h-[88px] w-[70px]">
                <div className="content-stretch flex items-center justify-center relative shrink-0">
                  <BrandVector theme="dark" width={42} height={28} />
                </div>
              </div>
            </div>
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid h-[714px] left-[69px] w-[1211px]">
              <div className="[word-break:break-word] absolute font-outfit font-normal leading-[1.5] left-[60px] text-[22px] text-[#7b7b7b] top-[40px] w-[1090px]">
                <p className="leading-[1.4] mb-3 text-[#7b7b7b]">I led the end-to-end product experience across the entire wellness journey—from pre-arrival onboarding and multidisciplinary care planning to retreat operations and post-retreat home care. My work unified guests, specialists, and operational teams into a single coordinated care ecosystem.</p>
                <p className="font-outfit font-bold text-[#190b00] text-[22px] leading-[1.4] mb-3">{`Product Strategy  /  Information Architecture  /  End-to-end Experience  /  Operational Workflow Design  /  Role-based Systems  /  Care Planning Framework  /  Mobile Experience  /  Design System  /  Interaction Design`}</p>
              </div>
              
              {/* Care Orchestration Diagram Image */}
              <div className="absolute left-[60px] top-[260px] w-[1090px] h-[410px] flex items-center justify-center pointer-events-none">
                <img 
                  src={imgWIDTulah} 
                  alt="Tulah Care Orchestration Diagram" 
                  className="max-w-[760px] max-h-[340px] w-auto h-auto object-contain display-block"
                />
              </div>
            </div>
          </div>

          {/* ─── FOUNDATION SECTION (Impact / Metric Grid layout) ─── */}
          <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[5211px] w-[1280px] z-[2]">
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex flex-col items-start p-[30px] relative shrink-0 w-full overflow-hidden">
              <div className="content-stretch flex gap-[30px] items-center relative shrink-0 w-full justify-between">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
                  <p className="font-inter font-bold leading-[0] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full">
                    <span>{`[ CARE ORCHESTRATION ] `}</span>
                  </p>
                  <p className="font-outfit font-black leading-none relative shrink-0 text-[#190b00] text-[96px] tracking-[3px] whitespace-nowrap margin-0">
                    FOUNDATION
                  </p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none">
                    <BrandVector theme="dark" width={231} height={154} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#fffdfa] border-l border-r border-b border-[#7b7a77] border-solid content-stretch flex flex-col gap-[60px] h-[780px] items-start p-[30px] relative shrink-0 w-full">
              <div className="flex-[1_0_0] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] min-h-px relative w-full">
                {/* Stat 1 */}
                <div className="border-[#7b7a77] border-b border-r border-solid content-stretch flex flex-col gap-[10px] items-start justify-self-stretch overflow-clip p-[24px] relative self-stretch shrink-0">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-between leading-[normal] min-h-px relative w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <p className="font-outfit font-bold min-w-full relative shrink-0 text-[#ee6c13] text-[80px] w-[min-content] margin-0">
                        14+
                      </p>
                      <p className="font-outfit font-normal relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap margin-0">
                        Operational Roles
                      </p>
                    </div>
                    <p className="font-outfit font-normal relative shrink-0 text-[#7b7b7b] text-[18px] w-full margin-0">
                      Unified CRM, Planning, Coordination, Consultation, Operations and Guest experiences through role-based workflows.
                    </p>
                  </div>
                </div>
                {/* Stat 2 */}
                <div className="border-[#7b7a77] border-b border-l border-solid content-stretch flex flex-col gap-[10px] items-start justify-self-stretch overflow-clip p-[24px] relative self-stretch shrink-0">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-between leading-[normal] min-h-px relative w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <p className="font-outfit font-bold min-w-full relative shrink-0 text-[#ee6c13] text-[80px] w-[min-content] margin-0">
                        6+
                      </p>
                      <p className="font-outfit font-normal relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap margin-0">
                        Wellness Disciplines
                      </p>
                    </div>
                    <p className="font-outfit font-normal relative shrink-0 text-[#7b7b7b] text-[18px] w-full margin-0">
                      Unified recommendations from Medical, Ayurveda, Nutrition, Fitness, Yoga and Diagnostics into one personalized retreat plan.
                    </p>
                  </div>
                </div>
                {/* Stat 3 */}
                <div className="border-[#7b7a77] border-r border-solid border-t content-stretch flex flex-col gap-[10px] items-start justify-self-stretch overflow-clip p-[24px] relative self-stretch shrink-0">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-between leading-[normal] min-h-px relative w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <p className="font-outfit font-bold min-w-full relative shrink-0 text-[#ee6c13] text-[80px] w-[min-content] margin-0">
                        ~65%
                      </p>
                      <p className="font-outfit font-normal relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap margin-0">
                        Administrative Overhead Reduced
                      </p>
                    </div>
                    <p className="font-outfit font-normal relative shrink-0 text-[#7b7b7b] text-[18px] w-full margin-0">
                      Digitized planning, scheduling and execution significantly reduced administrative coordination across departments.
                    </p>
                  </div>
                </div>
                {/* Stat 4 */}
                <div className="border-[#7b7a77] border-l border-solid border-t content-stretch flex flex-col gap-[10px] items-start justify-self-stretch overflow-clip p-[24px] relative self-stretch shrink-0">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-between leading-[normal] min-h-px relative w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                      <p className="font-outfit font-bold min-w-full relative shrink-0 text-[#ee6c13] text-[80px] w-[min-content] margin-0">
                        500+
                      </p>
                      <p className="font-outfit font-normal relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap margin-0">
                        Care Activities
                      </p>
                    </div>
                    <p className="font-outfit font-normal relative shrink-0 text-[#7b7b7b] text-[18px] w-full margin-0">
                      Across the guest lifecycle- activities, sessions, therapies, medications, meals, diagnostics, notifications, follow-ups & many more.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f2ede7] border-[#ee6c13] border-l-6 border-solid content-stretch flex gap-[10px] items-center justify-center overflow-clip pl-[30px] pr-[120px] py-[20px] relative shrink-0 w-full">
                <p className="[word-break:break-word] font-outfit font-normal italic leading-normal relative shrink-0 text-[#190b00] text-[24px] w-full margin-0">
                  <span>{`"The platform wasn't built to manage activities—`}</span>
                  <strong className="font-outfit font-bold text-[#ee6c13] italic">
                    it was built to orchestrate personalized care.
                  </strong>
                  <span>{`"`}</span>
                </p>
                <div className="absolute right-[20px] top-[-10px] text-[#ee6c13] opacity-20 text-[120px] font-serif leading-none select-none">
                  ”
                </div>
              </div>
            </div>
          </div>

          {/* ─── KEY PRODUCT DECISIONS SECTION (Starts at top-[6371px]) ─── */}
          <div ref={keyDecisionsRef} className="absolute content-stretch flex flex-col gap-[60px] items-start left-[80px] top-[6371px] w-[1284px] z-[2]">
            <div className={`border border-solid content-stretch flex gap-[30px] items-center relative shrink-0 w-full transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40 shadow-2xl" : "bg-[#fffdfa] border-[#7b7a77]"}`}>
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none">
                  <div className={`border-l border-solid content-stretch flex flex-col h-[134px] items-center justify-center px-[10px] py-[30px] relative w-[100px] transition-colors duration-700 ${isDecisionsInView ? "border-[#7b7a77]/40" : "border-[#7b7a77]"}`}>
                    <div className="flex h-[80px] items-center justify-center relative shrink-0 w-[53.08px]">
                      <div className="flex-none">
                        <div className="content-stretch flex items-center justify-center relative">
                          <BrandVector theme={isDecisionsInView ? "light" : "dark"} width={75} height={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1120px]">
                <div className="[word-break:break-word] content-stretch flex flex-col font-bold gap-[20px] items-start leading-[normal] relative shrink-0 w-[297px]">
                  <p className={`font-inter font-bold min-w-full not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase w-[min-content] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                    [ Observation - Decision - Result ]
                  </p>
                  <p className={`font-outfit font-bold relative shrink-0 text-[30px] whitespace-nowrap margin-0 tracking-[1.2px] transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>
                    KEY PRODUCT DECISIONS
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decision 01 */}
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <div className={`border-b border-l border-solid border-t content-stretch flex flex-col h-[690px] items-start justify-between p-[20px] relative shrink-0 w-[356px] transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`}>
                <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[320px]">
                  <div className="content-stretch flex items-center relative shrink-0 w-full">
                    <p className={`[word-break:break-word] font-inter font-bold leading-[normal] not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                      [ KEY DECISION 01 ]
                    </p>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[30px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>{`Design Around Roles, Not Modules`}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.4] relative shrink-0 w-full">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                          Observation
                        </p>
                        <div className="flex items-center justify-center relative shrink-0 w-full">
                          <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                        </div>
                      </div>
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`}>
                        Every operational role had different goals, responsibilities, and context.
                      </p>
                    </div>
                  </div>
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                          Decision
                        </p>
                        <div className="flex items-center justify-center relative shrink-0 w-full">
                          <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                        </div>
                      </div>
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`}>
                        <span className="leading-[normal]">{`Designed `}</span>
                        <span className={`font-outfit font-bold leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>dedicated workbenches tailored to each team's workflow</span>
                        <span className="leading-[normal]"> instead of one generic admin interface.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decision 01 Media Panel */}
              <div className={`border border-solid content-stretch flex h-[690px] items-center justify-center relative shrink-0 w-[924px] overflow-hidden transition-all duration-700 ease-in-out bg-black ${isDecisionsInView ? "border-[#7b7a77]/40" : "border-[#7b7a77]"}`}>
                <div className={`absolute bg-[#ee6c13] blur-[80px] w-[600px] h-[350px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isDecisionsInView ? "opacity-30" : "opacity-0"}`} />
                <div className="relative size-full overflow-hidden z-10">
                  <ViewportVideo 
                    src={videoTulahD1} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>

            {/* Decision 02 */}
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <div className={`border-b border-l border-solid border-t content-stretch flex flex-col h-[690px] items-start justify-between p-[20px] relative shrink-0 w-[356px] transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`}>
                <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[320px]">
                  <div className="content-stretch flex items-center relative shrink-0 w-full">
                    <p className={`[word-break:break-word] font-inter font-bold leading-[normal] not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                      [ KEY DECISION 02 ]
                    </p>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[30px] w-[320px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>
                      Hide Operational Complexity From Guests
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.4] relative shrink-0 w-full">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                          Observation
                        </p>
                        <div className="flex items-center justify-center relative shrink-0 w-full">
                          <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                        </div>
                      </div>
                      <div className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] whitespace-pre-wrap transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`}>
                        <p className="mb-0">Guests needed clarity throughout their wellness journey—not visibility into operational processes.</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                          Decision
                        </p>
                        <div className="flex items-center justify-center relative shrink-0 w-full">
                          <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                        </div>
                      </div>
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`}>
                        <span className="leading-[normal]">{`Surfaced `}</span>
                        <span className={`font-outfit font-bold transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>only relevant information</span>
                        <span className="leading-[normal]">{` at each stage while keeping scheduling & coordination within staff workspaces.`}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decision 02 Media Panel */}
              <div className={`border border-solid content-stretch flex h-[690px] items-center justify-center relative shrink-0 w-[924px] overflow-hidden transition-all duration-700 ease-in-out bg-black ${isDecisionsInView ? "border-[#7b7a77]/40" : "border-[#7b7a77]"}`}>
                <div className={`absolute bg-[#ee6c13] blur-[80px] w-[600px] h-[350px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isDecisionsInView ? "opacity-30" : "opacity-0"}`} />
                <div className="relative size-full overflow-hidden z-10">
                  <ViewportVideo 
                    src={videoTulahD2} 
                    playbackRate={2}
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>
            </div>

            {/* Decision 03 */}
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <div className={`border-b border-l border-solid border-t content-stretch flex flex-col h-[690px] items-start justify-between p-[20px] relative shrink-0 w-[356px] transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`}>
                <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[320px]">
                  <div className="content-stretch flex items-center relative shrink-0 w-full">
                    <p className={`[word-break:break-word] font-inter font-bold leading-[normal] not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                      [ KEY DECISION 03 ]
                    </p>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[30px] w-[320px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>
                      Standardize Multidisciplinary Care
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.4] relative shrink-0 w-full">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                          Observation
                        </p>
                        <div className="flex items-center justify-center relative shrink-0 w-full">
                          <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                        </div>
                      </div>
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`}>
                        Each wellness specialist worked differently, making it difficult to combine recommendations into one retreat plan.
                      </p>
                    </div>
                  </div>
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                          Decision
                        </p>
                        <div className="flex items-center justify-center relative shrink-0 w-full">
                          <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                        </div>
                      </div>
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`}>
                        <span className="leading-[normal]">{`Created a `}</span>
                        <span className={`font-outfit font-bold transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>shared care planning framework</span>
                        <span className="leading-[normal]">{` that enabled Medical, Ayurveda, Nutrition, Fitness, Yoga, and Diagnostics teams to contribute through a consistent structure.`}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decision 03 Media Panel */}
              <div className={`border border-solid content-stretch flex h-[690px] items-center justify-center p-[32px] relative shrink-0 w-[924px] overflow-hidden transition-all duration-700 ease-in-out bg-black ${isDecisionsInView ? "border-[#7b7a77]/40" : "border-[#7b7a77]"}`}>
                <div className={`absolute bg-[#ee6c13] blur-[80px] w-[600px] h-[350px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isDecisionsInView ? "opacity-30" : "opacity-0"}`} />
                <div className="relative size-full overflow-hidden z-10 flex items-center justify-center">
                  <ViewportVideo 
                    src={videoTulahD3} 
                    playbackRate={2}
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>
            </div>

            {/* Decision 04 */}
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <div className={`border-b border-l border-solid border-t content-stretch flex flex-col h-[690px] items-start justify-between p-[20px] relative shrink-0 w-[356px] transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`}>
                <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[320px]">
                  <div className="content-stretch flex items-center relative shrink-0 w-full">
                    <p className={`[word-break:break-word] font-inter font-bold leading-[normal] not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                      [ KEY DECISION 04 ]
                    </p>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[30px] w-[320px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>{`Design Beyond The Retreat`}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.4] relative shrink-0 w-full">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                          Observation
                        </p>
                        <div className="flex items-center justify-center relative shrink-0 w-full">
                          <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                        </div>
                      </div>
                      <div className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] whitespace-pre-wrap transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`}>
                        <p className="mb-0">Wellness outcomes depend on habits after guests leave, not just during their stay.</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
                    <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`}>
                          Decision
                        </p>
                        <div className="flex items-center justify-center relative shrink-0 w-full">
                          <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                        </div>
                      </div>
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`}>
                        <span className="leading-[normal]">{`Extended the experience into a `}</span>
                        <span className={`font-outfit font-bold transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>dedicated home care platform</span>
                        <span className="leading-[normal]">{` supporting routines, consultations, nutrition, activity tracking, and continuous follow-ups.`}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decision 04 Media Panel */}
              <div className={`border border-solid content-stretch flex h-[690px] items-center justify-center p-[32px] relative shrink-0 w-[924px] overflow-hidden transition-all duration-700 ease-in-out bg-black ${isDecisionsInView ? "border-[#7b7a77]/40" : "border-[#7b7a77]"}`}>
                <div className={`absolute bg-[#ee6c13] blur-[80px] w-[600px] h-[350px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isDecisionsInView ? "opacity-30" : "opacity-0"}`} />
                <div className="relative size-full overflow-hidden z-10 flex items-center justify-center">
                  <ViewportVideo 
                    src={videoTulahD4} 
                    playbackRate={2}
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ─── ONE THING I LEARNED SECTION ─── */}
          <div className="absolute content-stretch flex flex-col gap-[19px] items-start left-[80px] top-[9760px] w-[1280px] z-[2]">
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
              <p className="leading-[normal] mb-0 font-bold text-[28px] text-[#190b00]" style={{ color: isOneThingInView ? "#fffdfa" : "#190b00" }}>The hardest part of designing complex systems isn't creating workflows.</p>
              <p className="font-outfit font-bold text-[32px] text-[#ee6c13] mb-0">It's creating shared understanding.</p>
              <p className="leading-[normal] mb-0">​</p>
              <p className="leading-[normal] mb-0">Across this product, every challenge ultimately came back to clarity:</p>
              <p className="leading-[normal] mb-0">/ Helping guests understand what comes next.</p>
              <p className="leading-[normal] mb-0">/ Helping specialists contribute within a common framework.</p>
              <p className="leading-[normal] mb-0">/ Helping operations teams coordinate without unnecessary complexity.</p>
              <p className="leading-[normal] mb-0">​</p>
              <p className="leading-[normal] mb-0">Designing wellness wasn't about building better interfaces.</p>
              <p className="leading-[normal] mb-0">​</p>
              <p className="font-outfit font-bold text-[30px] leading-tight mb-0">
                <span className={`transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>It was about helping dozens of specialists operate as </span>
                <span className="text-[#ee6c13]">one coordinated care system</span>
                <span className={`transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>.</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ─── FOOTER CARD (Centered in 100vh) ─── */}
      <div style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#190b00",
        position: "relative",
        zIndex: 10,
        marginTop: "-2px",
      }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}>
          <Footer />
        </div>
      </div>

      {/* ─── NEXT STORY BOTTOM STRIP ─── */}
      <NextStoryBottomStrip onNextStory={onNextStory} defaultNextPath="/campaign-os-story" />

      {/* ─── SCROLL TO TOP FLOATING BUTTON ─── */}
      <ScrollToTopButton show={showScrollTop} onClick={scrollToTop} />
    </article>
  );
}
