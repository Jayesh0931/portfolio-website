import React, { useEffect, useRef, useState } from "react";
import imgEvolutionComposite from "@/imports/allyra_evolution_composite.png";
import videoOpportunity from "@/imports/Opportunity Video.mp4";
import videoD1 from "@/imports/D1.mp4";
import videoD2 from "@/imports/D2.mp4";
import videoD3 from "@/imports/D3.mp4";
import videoD4 from "@/imports/D4.mp4";
import imgAllyraStoryHero from "@/imports/allyra_story_hero.png";
import imgWIDAllyra from "@/imports/WID-allyra.png";
import imgAllyraLogo from "@/imports/allyra_logo.png";
import imgHiring from "@/imports/allyra_hiring_kanban.jpg";
import imgPortal from "@/imports/allyra_portal_dashboard.jpg";
import imgAgentCreation from "@/imports/allyra_agent_creation.jpg";
import imgTrainingInterface from "@/imports/allyra_training_interface.jpg";
import imgTeamNetwork from "@/imports/allyra_team_network.jpg";
import imgEllipse5 from "@/imports/Desktop6/49f9bacadb0b6c33f4b16626866a7ba76ea5c76a.png";
import imgEllipse6 from "@/imports/Desktop6/9ff71da8485c02d3fd081a21e1d07fea61940bec.png";
import imgEllipse7 from "@/imports/Desktop6/ea2ebb970c11a33998a35f3c05333c9689a2bb47.png";
import BrandVector from "@/components/BrandVector";
import Footer from "@/components/Footer";
import imgE1 from "@/imports/E1.png";
import imgE2 from "@/imports/E2.png";
import imgE3_1 from "@/imports/E3.1.png";
import imgE3_2 from "@/imports/E3.2.png";
import videoE4 from "@/imports/E4.mp4";
import videoE5 from "@/imports/E5.mp4";

interface AllyraStoryPageProps {
  scale?: number;
  left?: number;
  onBack: () => void;
}

const CANVAS_W = 1440;
const CANVAS_H = 14464; // Total height of absolute canvas from node coordinates

function ViewportVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-shimmer z-10" />
      )}
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

function AutoSlideshow({ images, interval = 5000 }: { images: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  const hasAnyLoaded = Object.values(loadedImages).some(Boolean);

  return (
    <div className="relative size-full flex items-center justify-center">
      {!hasAnyLoaded && (
        <div className="absolute inset-0 skeleton-shimmer z-20" />
      )}
      {images.map((img, i) => (
        <img
          key={img}
          alt={`Slideshow image ${i + 1}`}
          onLoad={() => setLoadedImages((prev) => ({ ...prev, [img]: true }))}
          className={`absolute block max-w-full max-h-full object-contain transition-opacity duration-500 ${
            i === index && loadedImages[img] ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          src={img}
        />
      ))}
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
        rootMargin: "0px 0px -25% 0px", // triggers when 25% from viewport bottom
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

export default function AllyraStoryPage({ scale = 1, left = 0, onBack }: AllyraStoryPageProps) {
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
    <div style={{
      width: "100%",
      minHeight: "100vh",
      position: "relative",
      background: "#FFFDFA",
      overflowX: "hidden",
    }}>
      {/* Absolute Canvas Scroll Spacer */}
      <div style={{ height: `${CANVAS_H * scale}px`, width: "100%", position: "relative" }}>
        {/* Sticky Header Wrapper (placed outside the scaled inner canvas) */}
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
            style={{ cursor: "pointer", transition: "all 0.2s", pointerEvents: "auto" }}
            className="hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[80px] px-[16px] py-[6px] rounded-[110px] top-[33px] z-10 shadow-sm transition-all duration-200 group" 
            data-node-id="1:26"
          >
            <div className="flex h-[11px] items-center justify-center relative shrink-0 w-[11px]" data-node-id="1:27">
              <svg className="size-full" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.5L4.5 7.5L10 2.5" className="stroke-[#190B00] group-hover:stroke-[#FFFDFA] transition-colors duration-200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="[word-break:break-word] font-outfit font-black leading-[normal] relative shrink-0 text-[#190b00] group-hover:text-[#fffdfa] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200" data-node-id="1:28">
              Back
            </p>
          </div>

          {/* Nav Overlapping Circles on Top Right with Pill-shaped BG */}
          <div 
            style={{ pointerEvents: "auto" }}
            className="absolute bg-[#fffdfa] rounded-[110px] flex items-center justify-center left-[1302px] top-[33px] w-[58px] h-[40px] z-10 shadow-sm" 
            data-node-id="1:23"
          >
            <BrandVector theme="dark" width={48} height={32} />
          </div>
        </div>

        {/* ─── FULL VIEWPORT BACKGROUND BANDS (Stretch end-to-end on all display widths) ─── */}
        {/* Background band for Challenge */}
        <DynamicBgBand 
          top={1028} 
          height={1725} 
          scale={scale} 
          onViewChange={setIsChallengeInView}
        />
        
        {/* Dynamic Background band for Key Product Decisions */}
        <DynamicBgBand 
          top={6130} 
          height={3234} 
          scale={scale} 
          onViewChange={setIsDecisionsInView}
        />
        
        {/* Background band for One Thing I Learned and Footer CTA */}
        <DynamicBgBand 
          top={13804} 
          height={660} 
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
        
        {/* Background grid vertical line mockup */}
        <div className="absolute h-[787.594px] left-[21.18%] right-[72.15%] top-[6940.67px]" data-node-id="1:21" data-name="Group">
          <div className="absolute block inset-0 max-w-none size-full border-l border-dashed border-[#7b7a77] opacity-25" />
        </div>

        {/* Overview Box Metadata and Branding */}
        <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex flex-col items-start left-[80px] p-[30px] top-[249px] w-[1280px] h-[488px]" data-node-id="1:29">
          <div className="content-stretch flex gap-[90px] items-end relative shrink-0 h-[428px] w-full" data-node-id="1:30">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] h-[228px] items-start py-[20px] relative shrink-0" data-node-id="1:31">
              <div className="content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 w-[108px]" data-node-id="1:32">
                <p className="font-inter font-bold font-bold not-italic relative shrink-0 text-[#7b7b7b] text-[12px] tracking-[0.6px] uppercase w-full" data-node-id="1:33">
                  ROLE
                </p>
                <p className="font-outfit font-normal font-normal relative shrink-0 text-[#190b00] text-[18px] w-full" data-node-id="1:34">
                  Product Lead
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-node-id="1:35">
                <p className="font-inter font-bold font-bold leading-[normal] min-w-full not-italic relative shrink-0 text-[#7b7b7b] text-[12px] tracking-[0.6px] uppercase w-[min-content]" data-node-id="1:36">
                  Focus
                </p>
                <div className="font-outfit font-normal font-normal leading-[1.3] relative shrink-0 text-[#190b00] text-[18px]" data-node-id="1:37">
                  <p className="leading-[normal] mb-0">/ Product Strategy</p>
                  <p className="leading-[normal] mb-0">/ Human-AI Interaction</p>
                  <p className="leading-[normal] mb-0">/ Agentic UX</p>
                  <p className="leading-[normal]">/ Enterprise AI Systems</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0" data-node-id="1:38">
              <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-node-id="1:39">
                <div className="relative shrink-0 size-[100px]" data-node-id="1:40" data-name="Allyra Logo 1">
                  <img alt="Allyra Logo" className="absolute inset-0 size-full object-contain pointer-events-none" src={imgAllyraLogo} />
                </div>
                <p className="[word-break:break-word] font-outfit font-medium font-medium leading-[100px] relative shrink-0 text-[#190b00] text-[100px] tracking-[4px] whitespace-nowrap" data-node-id="1:41">
                  allyra.ai
                </p>
              </div>
              <div className="content-stretch flex items-center justify-center px-[10px] relative shrink-0" data-node-id="1:42">
                <div className="[word-break:break-word] font-outfit font-medium font-medium leading-[1.2] relative shrink-0 text-[#7b7b7b] text-[60px] w-[915px]" data-node-id="1:43">
                  <p className="leading-[normal] mb-0">Designing the evolution of an Enterprise AI Workforce</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Header grid border bar */}
        <div className="absolute content-stretch flex items-center left-[80px] top-[180px] w-[1280px]" data-node-id="1:44">
          <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-center pl-[30px] pr-[90px] py-[16px] relative shrink-0" data-node-id="1:45">
            <p className="[word-break:break-word] font-outfit font-normal font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap" data-node-id="1:46">
              OVERVIEW
            </p>
          </div>
          <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" data-node-id="1:47" />
          <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-end pl-[90px] pr-[30px] py-[16px] relative shrink-0 -ml-[1px]" data-node-id="1:48">
            <p className="[word-break:break-word] font-inter font-bold font-bold leading-[normal] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap" data-node-id="1:49">
              [ 2026 ]
            </p>
          </div>
        </div>

        {/* Overview Box pullquote copy */}
        <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex items-end justify-center left-[80px] p-[30px] top-[736px] w-[1280px]" data-node-id="1:54">
          <div className="[word-break:break-word] flex-[1_0_0] font-outfit font-normal font-normal leading-[1.5] min-w-px relative text-[#77695d] text-[24px] whitespace-pre-wrap" data-node-id="1:55">
            <p className="leading-[normal] mb-0">{`AI wasn't struggling to generate answers. It was struggling to operate inside real workflows.`}</p>
            <p className="leading-[normal] mb-0">​</p>
            <p>
              <span className="leading-[normal]">{`Between 2024 and 2026, I helped shape `}</span>
              <span className="[word-break:break-word] font-outfit font-bold font-bold leading-[normal]">Allyra</span>
              <span className="leading-[normal]">{` from a no-code AI agent creation platform into `}</span>
              <span className="[word-break:break-word] font-outfit font-bold font-bold leading-[normal]">an enterprise AI workspace</span>
              <span className="leading-[normal]">{` capable of creating, training, orchestrating and operationalizing AI workers.`}</span>
            </p>
          </div>
        </div>

        {/* Violet glow layer */}
        <div className="absolute bg-[#c0f] blur-[100px] h-[676px] left-[124px] top-[1220px] w-[1192px] opacity-35" data-node-id="1:56" />
        
        {/* Main Hero composite image */}
        <div className="-translate-x-1/2 absolute border border-solid border-white h-[800px] left-1/2 rounded-[10px] top-[1158px] w-[1280px]" data-node-id="1:57" data-name="allyra-story-hero 1">
          <ShimmerImage alt="Allyra Story Hero" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgAllyraStoryHero} />
        </div>

        {/* ─── THE CHALLENGE SECTION ─── */}
        <div className="absolute left-[80px] top-[2143px] w-[1280px] h-[600px]" data-node-id="1:50">
          <div className={`[word-break:break-word] absolute font-outfit font-normal font-normal leading-[1.6] left-[0px] text-[24px] top-[100px] w-[1106px] transition-colors duration-700 ${isChallengeInView ? "text-[#ccc]" : "text-[#77695d]"}`} data-node-id="1:51">
            <p className="leading-[normal] mb-0 whitespace-pre-wrap">In late 2024, the AI industry was obsessed with models.</p>
            <p className="leading-[normal] mb-0 whitespace-pre-wrap">{`The real challenge wasn't access to AI.`}</p>
            <p className="leading-[normal] mb-0 whitespace-pre-wrap">​</p>
            <p className="leading-[normal] mb-0 whitespace-pre-wrap">The challenge was turning AI into something businesses could actually use. Building an AI agent required:</p>
            <ul className="list-disc mb-0 pl-[36px]">
              <li>Prompt engineering</li>
              <li>Knowledge systems</li>
              <li>APIs</li>
              <li>Integrations</li>
              <li>Continuous maintenance</li>
            </ul>
            <p className="leading-[normal] mb-0 whitespace-pre-wrap">​</p>
            <p className="leading-[normal] mb-0 whitespace-pre-wrap">{`The people who understood business problems often couldn't build AI solutions themselves.`}</p>
            <p className="leading-[normal] whitespace-pre-wrap">That gap became the opportunity.</p>
          </div>
          <p className={`[word-break:break-word] absolute font-outfit font-bold font-bold leading-[normal] left-[0px] text-[50px] top-[0px] tracking-[5px] whitespace-nowrap transition-colors duration-700 ${isChallengeInView ? "text-[#fffdfa]" : "text-[#190b00]"}`} data-node-id="1:52">
            THE CHALLENGE
          </p>
          {/* Horizontal separator line */}
          <div className={`absolute left-0 top-[72px] w-[1030px] h-[1px] transition-colors duration-700 ${isChallengeInView ? "bg-[rgba(255,253,250,0.15)]" : "bg-[#7b7a77]/30"}`} data-node-id="1:53" />
        </div>

        {/* ─── THE OPPORTUNITY SECTION ─── */}
        <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[2971px] w-[1280px]" data-node-id="1:58">
          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:59">
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-center pl-[30px] pr-[90px] py-[16px] relative shrink-0" data-node-id="1:60">
              <p className="[word-break:break-word] font-outfit font-normal font-normal leading-[normal] relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap" data-node-id="1:61">
                THE OPPORTUNITY
              </p>
            </div>
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" data-node-id="1:62" />
          </div>
          <div className="content-stretch flex items-center relative shrink-0 w-full -mt-[1px]" data-node-id="1:63">
            <div className="bg-white border border-[#7b7a77] border-solid flex-[1_0_0] h-[800px] min-w-px relative p-[30px] flex flex-col justify-end" data-node-id="1:64">
              <div style={{ width: "838px", aspectRatio: "1797/1080", borderRadius: "12px", overflow: "hidden", border: "1.5px solid #e5ddd4", margin: "0 auto" }}>
                <ViewportVideo 
                  src={videoOpportunity} 
                  className="w-full h-full object-contain bg-black" 
                />
              </div>
            </div>
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid bottom-[580px] content-stretch flex items-end justify-center left-[30px] p-[20px] w-[1220px]" data-node-id="1:65">
              <div className="[word-break:break-word] flex-[1_0_0] font-outfit font-normal font-normal leading-[1.5] min-w-px relative text-[#190b00] text-[24px] whitespace-pre-wrap" data-node-id="1:66">
                <p className="leading-[normal] mb-0">My first belief was simple, Specialized AI would outperform general-purpose AI. Instead of expecting one model to do everything, we explored whether domain-specific agents could deliver more reliable outcomes.</p>
                <p className="leading-[normal] mb-0">​</p>
                <p className="font-outfit font-bold font-bold leading-[normal]">Make agent creation accessible to non-technical users.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── WHAT I DROVE SECTION (Contribution Diagram layout) ─── */}
        <div className="absolute left-[80px] top-[4041px] w-[1280px] h-[840px]" data-node-id="1:67">
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid h-[840px] left-0 w-[70px]" data-node-id="1:68">
            <div className="absolute flex items-center justify-center left-[10px] top-[135px] w-[50px]" data-node-id="1:72">
              <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                <p className="font-outfit font-normal leading-[normal] text-[#190b00] text-[30px] tracking-[1.2px]">WHAT I DROVE</p>
              </div>
            </div>
            <div className="absolute flex items-center justify-center left-[10px] top-[648px] w-[50px]" data-node-id="1:71">
              <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                <p className="font-inter font-bold leading-[normal] text-[#77695d] text-[12px] tracking-[0.6px] uppercase">[ contribution ]</p>
              </div>
            </div>
            <div className="absolute border-[#7b7a77] border-solid border-t content-stretch flex flex-col items-center justify-center left-0 px-[10px] py-[30px] top-[752px] w-[70px]" data-node-id="1:73">
              <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="1:74">
                <BrandVector theme="dark" width={42} height={28} />
              </div>
            </div>
          </div>
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid h-[840px] left-[69px] w-[1211px]" data-node-id="1:69">
            <div className="[word-break:break-word] absolute font-outfit font-normal leading-[1.5] left-[60px] text-[22px] text-[#7b7b7b] top-[45px] w-[1090px]" data-node-id="1:70">
              <p className="leading-[1.4] mb-3 text-[#7b7b7b]">While leading product experience, my contribution extended beyond UX design. I worked at the intersection of market signals, business strategy and product execution. My role included:</p>
              <p className="font-outfit font-bold text-[#190b00] text-[22px] leading-[1.4] mb-3">{`Product Strategy  /  Product Definition  /  Feature Prioritization  /  Human-AI Interaction Design  /  Enterprise Workflow Design  /  Stakeholder Alignment`}</p>
              <p className="leading-[1.4] mb-0 text-[#7b7b7b]">Across the project I helped translate emerging AI capabilities into products people could actually use.</p>
            </div>
            
            {/* Graphic Asset Image */}
            <div className="absolute left-[60px] top-[305px] w-[1090px] h-[480px] flex items-center justify-center pointer-events-none">
              <img 
                src={imgWIDAllyra} 
                alt="What I Drove Diagram" 
                className="max-w-[780px] max-h-[350px] w-auto h-auto object-contain display-block"
              />
            </div>
          </div>
        </div>

        {/* ─── IMPACT SECTION (Starts at top-[5021px]) ─── */}
        <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[5021px] w-[1280px] z-[2]" data-node-id="1:255">
          <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex flex-col items-start p-[30px] relative shrink-0 w-full" data-node-id="1:256">
            <div className="content-stretch flex gap-[265px] items-center relative shrink-0 w-full justify-between" data-node-id="1:257">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start relative shrink-0 flex-1" data-node-id="1:258">
                <p className="font-inter font-bold font-bold leading-[0] not-italic relative shrink-0 text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full" data-node-id="1:259">
                  <span>{`[ agent creation → `}</span>
                  <span className="text-[#ee6c13]">enterprise AI platform</span>
                  <span>{` ]`}</span>
                </p>
                <p className="font-outfit font-black font-black leading-[140px] relative shrink-0 text-[#190b00] text-[140px] tracking-[5.6px] w-full margin-0" data-node-id="1:260">
                  IMPACT
                </p>
              </div>
              <div className="flex items-center justify-center relative shrink-0" data-node-id="1:261">
                <div className="flex-none rotate-180">
                  <BrandVector theme="dark" width={231} height={154} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#fffdfa] border-l border-r border-b border-[#7b7a77] border-solid content-stretch flex flex-col gap-[60px] h-[780px] items-start p-[30px] relative shrink-0 w-full" data-node-id="1:264">
            <div className="flex-[1_0_0] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] min-h-px relative w-full" data-node-id="1:265" data-name="Cards">
              <div className="border-[#7b7a77] border-b border-r border-solid content-stretch flex flex-col gap-[10px] items-start justify-self-stretch overflow-clip p-[24px] relative self-stretch shrink-0" data-node-id="1:266" data-name="Number Card">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-between leading-[normal] min-h-px relative w-full" data-node-id="1:268">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:269">
                    <p className="font-outfit font-bold font-bold min-w-full relative shrink-0 text-[#ee6c13] text-[80px] w-[min-content] margin-0" data-node-id="1:270">
                      50+
                    </p>
                    <p className="font-outfit font-normal font-normal relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap margin-0" data-node-id="1:271">
                      Enterprise Demonstrations
                    </p>
                    <p className="font-inter font-bold not-italic relative shrink-0 text-[#77695d] text-[11px] tracking-[0.6px] uppercase w-full margin-0 mt-1" data-node-id="1:271b">
                      LAST UPDATED IN JUNE 2026
                    </p>
                  </div>
                  <p className="font-outfit font-normal font-normal relative shrink-0 text-[#7b7b7b] text-[18px] w-full margin-0" data-node-id="1:272">
                    Validated through enterprise conversations, workshops and live product demos.
                  </p>
                </div>
              </div>
              <div className="border-[#7b7a77] border-b border-l border-solid content-stretch flex flex-col gap-[10px] items-start justify-self-stretch overflow-clip p-[24px] relative self-stretch shrink-0" data-node-id="1:273" data-name="Number Card">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-between leading-[normal] min-h-px relative w-full" data-node-id="1:275">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:276">
                    <p className="font-outfit font-bold font-bold min-w-full relative shrink-0 text-[#ee6c13] text-[80px] w-[min-content] margin-0" data-node-id="1:277">
                      20+
                    </p>
                    <p className="font-outfit font-normal font-normal relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap margin-0" data-node-id="1:278">
                      Enterprise Use Allyra
                    </p>
                    <p className="font-inter font-bold not-italic relative shrink-0 text-[#77695d] text-[11px] tracking-[0.6px] uppercase w-full margin-0 mt-1" data-node-id="1:278b">
                      LAST UPDATED IN JUNE 2026
                    </p>
                  </div>
                  <p className="font-outfit font-normal font-normal relative shrink-0 text-[#7b7b7b] text-[18px] w-full margin-0" data-node-id="1:279">
                    Successfully onboarded into production environments.
                  </p>
                </div>
              </div>
              <div className="border-[#7b7a77] border-r border-solid border-t content-stretch flex flex-col gap-[10px] items-start justify-self-stretch overflow-clip p-[24px] relative self-stretch shrink-0" data-node-id="1:280" data-name="Number Card">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-between leading-[normal] min-h-px relative w-full" data-node-id="1:282">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:283">
                    <p className="font-outfit font-bold font-bold min-w-full relative shrink-0 text-[#ee6c13] text-[80px] w-[min-content] margin-0" data-node-id="1:284">
                      7+
                    </p>
                    <p className="font-outfit font-normal font-normal relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap margin-0" data-node-id="1:285">
                      Operational AI Workflows
                    </p>
                  </div>
                  <p className="font-outfit font-normal font-normal relative shrink-0 text-[#7b7b7b] text-[18px] w-full margin-0" data-node-id="1:286">
                    / Hiring / HR / Communication / Presentations / Scheduling/ Productivity / Sales
                  </p>
                </div>
              </div>
              <div className="border-[#7b7a77] border-l border-solid border-t content-stretch flex flex-col gap-[10px] items-start justify-self-stretch overflow-clip p-[24px] relative self-stretch shrink-0" data-node-id="1:287" data-name="Number Card">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start justify-between leading-[normal] min-h-px relative w-full" data-node-id="1:289">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:290">
                    <p className="font-outfit font-bold font-bold min-w-full relative shrink-0 text-[#ee6c13] text-[80px] w-[min-content] margin-0" data-node-id="1:291">
                      ~60%
                    </p>
                    <p className="font-outfit font-normal font-normal relative shrink-0 text-[#190b00] text-[30px] whitespace-nowrap margin-0" data-node-id="1:292">
                      Administrative Effort Reduced
                    </p>
                  </div>
                  <p className="font-outfit font-normal font-normal relative shrink-0 text-[#7b7b7b] text-[18px] w-full margin-0" data-node-id="1:293">
                    Reduced repetitive work through AI-powered operational workflows.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#f2ede7] border-[#ee6c13] border-l-6 border-solid content-stretch flex gap-[10px] items-center justify-center overflow-clip pl-[30px] pr-[120px] py-[20px] relative shrink-0 w-full" data-node-id="1:294">
              <p className="[word-break:break-word] font-outfit font-normal italic leading-normal relative shrink-0 text-[#190b00] text-[24px] w-full margin-0" data-node-id="1:295">
                <span>{`"The platform evolved beyond agent creation into a foundation for `}</span>
                <strong className="font-outfit font-bold font-bold text-[#ee6c13] italic">
                  Enterprise AI Operations.
                </strong>
                <span>{`"`}</span>
              </p>
              <div className="absolute right-[20px] top-[-10px] text-[#ee6c13] opacity-20 text-[120px] font-serif leading-none select-none" data-node-id="1:296">
                ”
              </div>
            </div>
          </div>
        </div>

        {/* ─── KEY PRODUCT DECISIONS SECTION (Starts at top-[6181px]) ─── */}
        <div ref={keyDecisionsRef} className="absolute content-stretch flex flex-col gap-[60px] items-start left-[80px] top-[6181px] w-[1284px] z-[2]" data-node-id="1:91">
          <div className={`border border-solid content-stretch flex gap-[30px] items-center relative shrink-0 w-full transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40 shadow-2xl" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:92">
            <div className="flex items-center justify-center relative shrink-0" data-node-id="1:93">
              <div className="flex-none rotate-180">
                <div className={`border-l border-solid content-stretch flex flex-col h-[134px] items-center justify-center px-[10px] py-[30px] relative w-[100px] transition-colors duration-700 ${isDecisionsInView ? "border-[#7b7a77]/40" : "border-[#7b7a77]"}`}>
                  <div className="flex h-[80px] items-center justify-center relative shrink-0 w-[53.08px]" data-node-id="1:94">
                    <div className="flex-none rotate-90">
                      <div className="content-stretch flex items-center justify-center relative">
                        <BrandVector theme={isDecisionsInView ? "light" : "dark"} width={75} height={50} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1120px]" data-node-id="1:97">
              <div className="[word-break:break-word] content-stretch flex flex-col font-bold gap-[20px] items-start leading-[normal] relative shrink-0 w-[297px]" data-node-id="1:98">
                <p className={`font-inter font-bold min-w-full not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase w-[min-content] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:99">
                  [ Observation - Decision - Result ]
                </p>
                <p className={`font-outfit font-bold relative shrink-0 text-[30px] whitespace-nowrap margin-0 tracking-[1.2px] transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`} data-node-id="1:100">
                  KEY PRODUCT DECISIONS
                </p>
              </div>
            </div>
          </div>
          
          {/* Decision 01 */}
          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:131">
            <div className={`border-b border-l border-solid border-t content-stretch flex flex-col h-[690px] items-start justify-between p-[20px] relative shrink-0 w-[356px] transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:132">
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[320px]" data-node-id="1:133">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:134">
                  <p className={`[word-break:break-word] font-inter font-bold leading-[normal] not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:135">
                    [ Decision 01 ]
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:136">
                  <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[30px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`} data-node-id="1:137">{`One Agent Isn't Enough`}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.4] relative shrink-0 w-full" data-node-id="1:138">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:139">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:140">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:141">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:142">
                        Observation
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:143">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:144">
                      Real business workflows rarely belong to a single specialist.
                    </p>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:145">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:146">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:147">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:148">
                        Decision
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:149">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:150">
                      <span className="leading-[normal]">{`Create `}</span>
                      <span className={`font-outfit font-bold leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>Multi-Agent Collaboration</span>
                      <span className="leading-[normal]">.</span>
                    </p>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:151">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:152">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:153">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:154">
                        Result
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:155">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:156">
                      Specialized agents could work together toward shared goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decision 01 video visual panel */}
            <div className={`border border-solid content-stretch flex h-[690px] items-center justify-center p-[40px] relative shrink-0 w-[924px] overflow-hidden transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:157">
              {/* Neon glow of accent behind frame */}
              <div className={`absolute bg-[#ee6c13] blur-[80px] w-[600px] h-[350px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isDecisionsInView ? "opacity-30" : "opacity-0"}`} />
              <div className="relative shrink-0 w-[844px] h-[524px] rounded-[10px] overflow-hidden shadow-lg border-2 border-white/10 bg-black z-10" data-node-id="1:158" data-name="Frame">
                <ViewportVideo 
                  src={videoD2} 
                  className="absolute block inset-0 size-full object-cover" 
                />
              </div>
            </div>
          </div>

          {/* Decision 02 */}
          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:102">
            <div className={`border-b border-l border-solid border-t content-stretch flex flex-col h-[690px] items-start justify-between p-[20px] relative shrink-0 w-[356px] transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:103">
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[320px]" data-node-id="1:104">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:105">
                  <p className={`[word-break:break-word] font-inter font-bold font-bold leading-[normal] not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:106">
                    [ Decision 02 ]
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:107">
                  <p className={`[word-break:break-word] font-outfit font-bold font-bold leading-[normal] relative shrink-0 text-[30px] w-[320px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`} data-node-id="1:108">
                    Knowledge ≠ Expertise
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.4] relative shrink-0 w-full" data-node-id="1:109">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:110">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:111">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:112">
                      <p className={`[word-break:break-word] font-outfit font-normal font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:113">
                        Observation
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:114">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <div className={`[word-break:break-word] font-outfit font-normal font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] whitespace-pre-wrap transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:115">
                      <p className="mb-0">Agents could retrieve information.</p>
                      <p className="mb-0">​</p>
                      <p className="mb-0">But struggled to make professional recommendations.</p>
                      <p className="mb-0">​</p>
                      <p>They often produced multiple possible answers instead of taking a position.</p>
                    </div>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:116">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:117">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:118">
                      <p className={`[word-break:break-word] font-outfit font-normal font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:119">
                        Decision
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:120">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-normal font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:121">
                      <span className="leading-[normal]">{`Introduce a `}</span>
                      <span className={`font-outfit font-bold font-bold leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>Training Layer</span>
                      <span className="leading-[normal]">{` that allowed subject matter experts to shape behavior.`}</span>
                    </p>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:122">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:123">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:124">
                      <p className={`[word-break:break-word] font-outfit font-normal font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:125">
                        Result
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:126">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-normal font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:127">
                      Agents evolved from information retrievers into domain-specific assistants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decision 02 video visual panel */}
            <div className={`border border-solid content-stretch flex h-[690px] items-center justify-center p-[40px] relative shrink-0 w-[924px] overflow-hidden transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:128">
              {/* Neon glow of accent behind video */}
              <div className={`absolute bg-[#ee6c13] blur-[80px] w-[600px] h-[350px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isDecisionsInView ? "opacity-30" : "opacity-0"}`} />
              <div className="relative shrink-0 w-[844px] h-[524px] rounded-[10px] overflow-hidden shadow-lg border-2 border-white/10 bg-black z-10" data-node-id="1:129" data-name="Frame">
                <ViewportVideo 
                  src={videoD1} 
                  className="absolute block inset-0 size-full object-cover" 
                />
              </div>
            </div>
          </div>

          {/* Decision 03 */}
          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:160">
            <div className={`border-b border-l border-solid border-t content-stretch flex flex-col h-[690px] items-start justify-between p-[20px] relative shrink-0 w-[356px] transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:161">
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[320px]" data-node-id="1:162">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:163">
                  <p className={`[word-break:break-word] font-inter font-bold leading-[normal] not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:164">
                    [ Decision 03 ]
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:165">
                  <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[30px] w-[320px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`} data-node-id="1:166">
                    Discoverability Matters
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.4] relative shrink-0 w-full" data-node-id="1:167">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:168">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:169">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:170">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:171">
                        Observation
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:172">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:173">
                      Creating and training agents was only useful if people could find and use them.
                    </p>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:174">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:175">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:176">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:177">
                        Decision
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:178">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:179">
                      <span className="leading-[normal]">{`Introduce a `}</span>
                      <span className={`font-outfit font-bold leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>Agent Marketplace</span>
                      <span className="leading-[normal]">.</span>
                    </p>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:180">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:181">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:182">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:183">
                        Result
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:184">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <div className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:185">
                      <p className="leading-[normal] mb-0">Created a lifecycle:</p>
                      <p className={`leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>Create → Train → Publish → Use</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`border border-solid content-stretch flex h-[690px] items-center justify-center p-[40px] relative shrink-0 w-[924px] overflow-hidden transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:186">
              {/* Neon glow of accent behind frame */}
              <div className={`absolute bg-[#ee6c13] blur-[80px] w-[600px] h-[350px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isDecisionsInView ? "opacity-30" : "opacity-0"}`} />
              <div className="relative shrink-0 w-[844px] h-[524px] rounded-[10px] overflow-hidden shadow-lg border-2 border-white/10 bg-black z-10" data-node-id="1:187" data-name="Frame">
                <ViewportVideo 
                  src={videoD3} 
                  className="absolute block inset-0 size-full object-cover" 
                />
              </div>
            </div>
          </div>

          {/* Decision 04 */}
          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:189">
            <div className={`border-b border-l border-solid border-t content-stretch flex flex-col h-[690px] items-start justify-between p-[20px] relative shrink-0 w-[356px] transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:190">
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[320px]" data-node-id="1:191">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:192">
                  <p className={`[word-break:break-word] font-inter font-bold leading-[normal] not-italic relative shrink-0 text-[12px] tracking-[0.6px] uppercase whitespace-nowrap margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:193">
                    [ Decision 04 ]
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:194">
                  <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[30px] w-[320px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#fffdfa]" : "text-[#190b00]"}`} data-node-id="1:195">{`People Don't Want Agents`}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.4] relative shrink-0 w-full" data-node-id="1:196">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:197">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:198">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:199">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:200">
                        Observation
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:201">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <div className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] whitespace-pre-wrap transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:202">
                      <p className="leading-[normal] mb-0">Enterprise conversations shifted.</p>
                      <p className="leading-[normal] mb-0">​</p>
                      <p className="mb-0">
                        <span className="leading-[normal]">{`People `}</span>
                        <span className={`[word-break:break-word] font-outfit font-bold leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>{`weren't`}</span>
                        <span className="leading-[normal]">{` asking:`}</span>
                      </p>
                      <p className={`leading-[normal] mb-0 transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>{`"How do I build agents?"`}</p>
                      <p className="leading-[normal] mb-0">​</p>
                      <p className="mb-0">
                        <span className="leading-[normal]">{`They `}</span>
                        <span className={`[word-break:break-word] font-outfit font-bold leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>were</span>
                        <span className="leading-[normal]">{` asking:`}</span>
                      </p>
                      <p className={`leading-[normal] mb-0 transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>{`"How do I control them?"`}</p>
                      <p className={`leading-[normal] mb-0 transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>{`"How do I manage spend?"`}</p>
                      <p className={`leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>{`"How do I trust them?"`}</p>
                    </div>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:203">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:204">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:205">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:206">
                        Decision
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:207">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-normal leading-[1.4] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ccc]" : "text-[#190b00]"}`} data-node-id="1:208">
                      <span className="leading-[normal]">{`Pivot toward an `}</span>
                      <span className={`font-outfit font-bold leading-[normal] transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`}>Enterprise Operating Layer</span>
                      <span className="leading-[normal]">.</span>
                    </p>
                  </div>
                </div>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="1:209">
                  <div className="col-1 content-stretch flex flex-col gap-[10px] items-start ml-0 mt-0 relative row-1 w-[296px]" data-node-id="1:210">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:211">
                      <p className={`[word-break:break-word] font-outfit font-normal leading-[normal] relative shrink-0 text-[18px] w-full margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-[#ee6c13]" : "text-[#77695d]"}`} data-node-id="1:212">
                        Result
                      </p>
                      <div className="flex items-center justify-center relative shrink-0 w-full" data-node-id="1:213">
                        <div className={`flex-none rotate-180 w-full h-[1px] transition-colors duration-700 ${isDecisionsInView ? "bg-[#7b7a77]/40" : "bg-[#7b7a77]"}`} />
                      </div>
                    </div>
                    <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[16px] w-[276px] margin-0 transition-colors duration-700 ${isDecisionsInView ? "text-white" : "text-[#190b00]"}`} data-node-id="1:214">
                      The Portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`border border-solid content-stretch flex h-[690px] items-center justify-center p-[40px] relative shrink-0 w-[924px] overflow-hidden transition-all duration-700 ease-in-out ${isDecisionsInView ? "bg-black border-[#7b7a77]/40" : "bg-[#fffdfa] border-[#7b7a77]"}`} data-node-id="1:215">
              {/* Neon glow of accent behind frame */}
              <div className={`absolute bg-[#ee6c13] blur-[80px] w-[600px] h-[350px] rounded-full pointer-events-none z-0 transition-opacity duration-700 ${isDecisionsInView ? "opacity-30" : "opacity-0"}`} />
              <div className="relative shrink-0 w-[844px] h-[524px] rounded-[10px] overflow-hidden shadow-lg border-2 border-white/10 bg-black z-10" data-node-id="1:216" data-name="Frame">
                <ViewportVideo 
                  src={videoD4} 
                  className="absolute block inset-0 size-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── EVIDENCE GRID PORTFOLIO (Starts top-[9514px] inside light container) ─── */}
        <div className="absolute content-stretch flex flex-col gap-[100px] items-start left-[80px] top-[9514px] w-[1280px] z-[2]" data-node-id="1:218">
          <div className="[word-break:break-word] flex flex-col font-outfit font-black font-black justify-center leading-[0] relative shrink-0 text-[#190b00] text-[140px] tracking-[5.6px] whitespace-nowrap margin-0" data-node-id="1:219">
            <p className="leading-[140px] margin-0">EVIDENCE</p>
          </div>
          
          {/* Evidence 1 */}
          <div className="border border-[#7b7a77] border-solid content-stretch flex h-[690px] items-center relative shrink-0 w-[1280px]" style={{ background: "linear-gradient(90deg, #E5DDD4 0%, #FFFDFA 35.9%)" }} data-node-id="1:220">
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[55px] items-center left-[40px] p-[20px] top-[40px] z-10" data-node-id="1:223">
              <p className="[word-break:break-word] font-outfit font-bold font-bold leading-[normal] relative shrink-0 text-[#77695d] text-[18px] tracking-[1.8px] uppercase whitespace-nowrap margin-0" data-node-id="1:224">
                Enterprise AI Workspace
              </p>
            </div>
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid top-[115px] left-[40px] w-[320px] h-auto content-stretch flex flex-col p-[20px] z-10" data-node-id="1:225">
              <div className="[word-break:break-word] font-outfit font-normal font-normal leading-[1.6] relative shrink-0 text-[#77695d] text-[18px]" data-node-id="1:226">
                <p className="leading-[normal] mb-0">The Portal became the gateway into the ecosystem.</p>
                <p className="leading-[normal] mb-0">​</p>
                <p className="leading-[normal] mb-0">Instead of focusing on agent creation, it focused on operational outcomes.</p>
              </div>
            </div>
            <div className="absolute right-[40px] top-[40px] w-[840px] h-[610px] z-10 flex items-center justify-center" data-node-id="1:221" data-name="Frame">
              <ShimmerImage alt="Portal Dashboard screen" className="max-w-full max-h-full object-contain" src={imgE1} />
            </div>
          </div>

          {/* Evidence 2 */}
          <div className="border border-[#7b7a77] border-solid content-stretch flex h-[690px] items-center relative shrink-0 w-[1280px]" style={{ background: "linear-gradient(90deg, #E5DDD4 0%, #FFFDFA 35.9%)" }} data-node-id="1:227">
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[55px] items-center left-[40px] p-[20px] top-[40px] z-10" data-node-id="1:230">
              <p className="[word-break:break-word] font-outfit font-bold font-bold leading-[normal] relative shrink-0 text-[#77695d] text-[18px] tracking-[1.8px] uppercase whitespace-nowrap margin-0" data-node-id="1:231">
                Governance
              </p>
            </div>
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid top-[115px] left-[40px] w-[320px] h-auto content-stretch flex flex-col p-[20px] z-10" data-node-id="1:232">
              <div className="[word-break:break-word] font-outfit font-normal font-normal leading-[1.6] relative shrink-0 text-[#77695d] text-[18px]" data-node-id="1:233">
                <p className="leading-[normal] mb-[15px] text-[18px]">Enterprise adoption required:</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Budget controls</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Usage monitoring</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Access management</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Licensing</p>
              </div>
            </div>
            <div className="absolute right-[40px] top-[40px] w-[840px] h-[610px] z-10 flex items-center justify-center" data-node-id="1:228" data-name="Frame">
              <ShimmerImage alt="Governance screen" className="max-w-full max-h-full object-contain" src={imgE2} />
            </div>
          </div>

          {/* Evidence 3 */}
          <div className="border border-[#7b7a77] border-solid content-stretch flex h-[690px] items-center relative shrink-0 w-[1280px]" style={{ background: "linear-gradient(90deg, #E5DDD4 0%, #FFFDFA 35.9%)" }} data-node-id="1:234">
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[55px] items-center left-[40px] p-[20px] top-[40px] z-10" data-node-id="1:237">
              <p className="[word-break:break-word] font-outfit font-bold font-bold leading-[normal] relative shrink-0 text-[#77695d] text-[18px] tracking-[1.8px] uppercase whitespace-nowrap margin-0" data-node-id="1:238">
                Automation Layer
              </p>
            </div>
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid top-[115px] left-[40px] w-[320px] h-auto content-stretch flex flex-col p-[20px] z-10" data-node-id="1:239">
              <div className="[word-break:break-word] font-outfit font-normal font-normal leading-[1.6] relative shrink-0 text-[#77695d] text-[18px]" data-node-id="1:240">
                <p className="leading-[normal] mb-[15px] text-[18px]">As adoption grew, operational tasks became repetitive. The next layer was automation.</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Scheduling</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Reminders</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Meeting summaries</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Follow-ups</p>
              </div>
            </div>
            <div className="absolute right-[40px] top-[40px] w-[840px] h-[610px] z-10 flex items-center justify-center" data-node-id="1:235" data-name="Frame">
              <AutoSlideshow images={[imgE3_1, imgE3_2]} interval={3500} />
            </div>
          </div>

          {/* Evidence 4 */}
          <div className="border border-[#7b7a77] border-solid content-stretch flex h-[690px] items-center relative shrink-0 w-[1280px]" style={{ background: "linear-gradient(90deg, #E5DDD4 0%, #FFFDFA 35.9%)" }} data-node-id="1:241">
            <div className="absolute bg-[#8b5cf6] blur-[110px] w-[500px] h-[350px] rounded-full pointer-events-none z-0 opacity-[0.22] right-[180px] top-[170px]" />
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[55px] items-center left-[40px] p-[20px] top-[40px] z-10" data-node-id="1:244">
              <p className="[word-break:break-word] font-outfit font-bold font-bold leading-[normal] relative shrink-0 text-[#77695d] text-[18px] tracking-[1.8px] uppercase whitespace-nowrap margin-0" data-node-id="1:245">
                Hiring Workflow
              </p>
            </div>
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid top-[115px] left-[40px] w-[320px] h-auto content-stretch flex flex-col p-[20px] z-10" data-node-id="1:246">
              <div className="[word-break:break-word] font-outfit font-normal font-normal leading-[1.6] relative shrink-0 text-[#77695d] text-[18px]" data-node-id="1:247">
                <p className="leading-[normal] mb-[15px] text-[18px]">One of the strongest examples of operational AI. Instead of isolated tools, the workflow connected:</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">JD Creation</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">→ Resume Screening</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">→ Interview Scheduling</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">→ AI Interview</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">→ Evaluation</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">→ Onboarding</p>
              </div>
            </div>
            <div className="absolute right-[40px] top-[40px] w-[840px] h-[610px] z-10 flex items-center justify-center" data-node-id="1:242" data-name="Frame">
              <div className="rounded-[10px] overflow-hidden shadow-2xl border-2 border-white/10 bg-black max-w-full max-h-full">
                <ViewportVideo src={videoE4} className="block max-w-full max-h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Evidence 5 */}
          <div className="border border-[#7b7a77] border-solid content-stretch flex h-[690px] items-center relative shrink-0 w-[1280px]" style={{ background: "linear-gradient(90deg, #E5DDD4 0%, #FFFDFA 35.9%)" }} data-node-id="1:248">
            <div className="absolute bg-[#8b5cf6] blur-[110px] w-[500px] h-[350px] rounded-full pointer-events-none z-0 opacity-[0.22] right-[180px] top-[170px]" />
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[55px] items-center left-[40px] p-[20px] top-[40px] z-10" data-node-id="1:251">
              <p className="[word-break:break-word] font-outfit font-bold font-bold leading-[normal] relative shrink-0 text-[#77695d] text-[18px] tracking-[1.8px] uppercase whitespace-nowrap margin-0" data-node-id="1:252">
                PPT Workflow
              </p>
            </div>
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid top-[115px] left-[40px] w-[320px] h-auto content-stretch flex flex-col p-[20px] z-10" data-node-id="1:253">
              <div className="[word-break:break-word] font-outfit font-normal font-normal leading-[1.6] relative shrink-0 text-[#77695d] text-[18px]" data-node-id="1:254">
                <p className="leading-[normal] mb-[15px] text-[18px]">A lesson we learned repeatedly:</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Automation without control creates poor outcomes.</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/The PPT workflow deliberately kept humans involved.</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/The system helped structure and generate.</p>
                <p className="font-outfit font-bold font-bold leading-[normal] text-[18px] mb-0">/Humans remained responsible for quality and direction.</p>
              </div>
            </div>
            <div className="absolute right-[40px] top-[40px] w-[840px] h-[610px] z-10 flex items-center justify-center" data-node-id="1:249" data-name="Frame">
              <div className="rounded-[10px] overflow-hidden shadow-2xl border-2 border-white/10 bg-black max-w-full max-h-full">
                <ViewportVideo src={videoE5} className="block max-w-full max-h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── ONE THING I LEARNED SECTION ─── */}
        <div className="absolute content-stretch flex flex-col gap-[19px] items-start left-[80px] top-[13924px] w-[1280px] z-[2]" data-node-id="1:299">
          <p className={`[word-break:break-word] font-outfit font-bold leading-[normal] relative shrink-0 text-[50px] tracking-[5px] w-[1030px] margin-0 transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`} data-node-id="1:300">
            <span style={{ WebkitTextStrokeWidth: "2px", WebkitTextStrokeColor: "#7B7A77", color: isOneThingInView ? "#190b00" : "#fffdfa", paintOrder: "stroke fill" }}>ONE THING</span>
            <span className="leading-[normal]">{` I LEARNED`}</span>
          </p>
          <div className="flex items-center justify-center relative shrink-0" data-node-id="1:301">
            <div className="flex-none rotate-180">
              <div className="h-0 relative w-[1030px]">
                <div className={`absolute inset-[-1px_0_0_0] h-[1px] w-full transition-colors duration-700 ${isOneThingInView ? "bg-[rgba(255,253,250,0.15)]" : "bg-[#7b7a77]/30"}`} />
              </div>
            </div>
          </div>
          <div className={`[word-break:break-word] font-outfit font-normal font-normal leading-[1.6] relative shrink-0 text-[24px] w-[1030px] transition-colors duration-700 ${isOneThingInView ? "text-[#7b7b7b]" : "text-[#77695d]"}`} data-node-id="1:302">
            <p className="leading-[normal] mb-0">I started this journey believing the challenge was making AI easier to build. Eventually realized the challenge was making AI easier to trust.</p>
            <p className="leading-[normal] mb-0">​</p>
            <p className="leading-[normal] mb-0">Every major product decision, from training and orchestration, to governance and human review came from the same realization:</p>
            <p className={`font-outfit font-bold font-bold leading-[normal] mb-0 transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>{`/ People don't want AI / People want reliable outcomes.`}</p>
            <p className="leading-[normal] mb-0">​</p>
            <p className="leading-[normal] mb-0">{`The future isn't autonomous AI.`}</p>
            <p className="leading-[normal] mb-0">​</p>
            <p className="font-outfit font-bold font-bold text-[30px] leading-tight">
              <span className={`leading-[normal] transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>{`It's well-designed collaboration between `}</span>
              <span className="leading-[normal] text-[#ee6c13]">humans</span>
              <span className={`leading-[normal] transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>{` and `}</span>
              <span className="leading-[normal] text-[#ee6c13]">AI</span>
              <span className={`leading-[normal] transition-colors duration-700 ${isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"}`}>{`.`}</span>
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
