import React, { useEffect, useRef, useState } from "react";
import BrandVector from "@/components/BrandVector";
import Footer from "@/components/Footer";
import NextStoryBottomStrip from "@/components/NextStoryBottomStrip";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import imgVousvousLogo from "@/imports/vousvous_logo.webp";
import imgVousvousStoryHero from "@/imports/vousvous-story-hero.webp";
import imgVousvousOpportunity from "@/imports/vousvous-opportunity.webp";
import imgOpportunityPhone from "@/imports/vousvous_opportunity_phone.webp";
import imgWIDVousVous from "@/imports/WID-vousvous.webp";
import imgOutcomeQuoteMark from "@/imports/outcome_quote_mark.webp";
import MobileCosHero from "./components/mobile/vousvous/MobileCosHero";
import MobileCosChallenge from "./components/mobile/vousvous/MobileCosChallenge";
import MobileCosOpportunity from "./components/mobile/vousvous/MobileCosOpportunity";
import MobileCosWhatIDrove from "./components/mobile/vousvous/MobileCosWhatIDrove";
import MobileCosValidation from "./components/mobile/vousvous/MobileCosValidation";
import MobileVousVousDecisions from "./components/mobile/vousvous/MobileVousVousDecisions";
import MobileVousVousExperience from "./components/mobile/vousvous/MobileVousVousExperience";
import TheExperienceShowcase from "./components/TheExperienceShowcase";
import MobileCosOneThing from "./components/mobile/vousvous/MobileCosOneThing";
import { MobileFinale } from "./components/mobile/MobileFinale";

interface VousVousStoryPageProps {
  scale?: number;
  left?: number;
  onBack: () => void;
  onNextStory?: () => void;
}

const CANVAS_W = 1440;
const CANVAS_H = 13600;

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

function CraftVideo({
  src,
  className,
  description,
  muted = true,
  playbackRate = 1,
}: {
  src: string;
  className?: string;
  description?: string;
  muted?: boolean;
  playbackRate?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current && playbackRate !== 1) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, isLoaded]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video) {
      video.playbackRate = playbackRate;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-full-screen-video", { detail: { src } }));
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-custom-cursor="full-screen"
      className="relative size-full overflow-hidden cursor-pointer group"
    >
      {!isLoaded && <div className="absolute inset-0 skeleton-shimmer z-10" />}
      <video
        ref={videoRef}
        src={src}
        loop
        muted={muted}
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 p-6 pt-24 pointer-events-none z-20 flex items-end transition-opacity duration-300 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.3) 80%, transparent 100%)",
        }}
      >
        {description && (
          <p className="font-outfit font-semibold text-[#FFFDFA] text-[17px] leading-[1.4] m-0 drop-shadow-md tracking-[0.2px]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function ShimmerImage({
  src,
  alt,
  className,
  style,
}: {
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
  onViewChange,
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
        window.dispatchEvent(
          new CustomEvent("page-theme-change", { detail: { isDark: entry.isIntersecting } })
        );
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

export default function VousVousStoryPage({
  scale = 1,
  left = 0,
  onBack,
  onNextStory,
}: VousVousStoryPageProps) {
  const [isChallengeInView, setIsChallengeInView] = useState(false);
  const [isOneThingInView, setIsOneThingInView] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isDarkMobile, setIsDarkMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScrollMobileBg = () => {
      const challengeEl = document.getElementById("mobile-cos-challenge");
      const oppEl = document.getElementById("mobile-cos-opportunity");
      const oneThingEl = document.getElementById("mobile-cos-onething");

      const isPastChallengeStart = challengeEl
        ? challengeEl.getBoundingClientRect().top <= window.innerHeight * 0.5
        : false;
      const isPastOpportunityStart = oppEl
        ? oppEl.getBoundingClientRect().top <= window.innerHeight * 0.5
        : false;
      const isPastOneThingStart = oneThingEl
        ? oneThingEl.getBoundingClientRect().top <= window.innerHeight * 0.5
        : false;

      const inChallenge = isPastChallengeStart && !isPastOpportunityStart;
      const inOneThing = isPastOneThingStart;
      setIsDarkMobile(inChallenge || inOneThing);
    };

    window.addEventListener("scroll", handleScrollMobileBg, { passive: true });
    handleScrollMobileBg();
    return () => window.removeEventListener("scroll", handleScrollMobileBg);
  }, [isMobile]);

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

  if (isMobile) {
    return (
      <article role="article" className={`mobile-story-container ${isDarkMobile ? "is-dark" : ""}`}>
        <MobileCosHero onBack={onBack} isDark={isDarkMobile} />
        <MobileCosChallenge />
        <MobileCosOpportunity />
        <MobileCosWhatIDrove />
        <MobileCosValidation />
        <MobileVousVousDecisions />
        <MobileVousVousExperience />
        <MobileCosOneThing />
        <MobileFinale isDark={true} />
        <NextStoryBottomStrip onNextStory={onNextStory} defaultNextPath="/allyra-story" isDark={true} />

        <ScrollToTopButton show={showScrollTop} onClick={scrollToTop} />
      </article>
    );
  }

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
      {/* ── Dynamic Background Bands ── */}
      <DynamicBgBand top={1076} height={1680} scale={scale} onViewChange={setIsChallengeInView} />
      <DynamicBgBand top={9429} height={4171} scale={scale} onViewChange={setIsOneThingInView} />

      {/* ── Canvas Scroll Spacer ── */}
      <div style={{ height: `${CANVAS_H * scale}px`, width: "100%", position: "relative" }}>
        {/* ── Fixed Sticky Navigation Bar ── */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: `${left}px`,
            width: `${CANVAS_W}px`,
            height: "100px",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            pointerEvents: "none",
            zIndex: 999,
          }}
        >
          {/* Back Pill Button */}
          <div
            onClick={onBack}
            role="button"
            aria-label="Back to Homepage"
            style={{ pointerEvents: "auto" }}
            className="hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] absolute bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[90px] px-[16px] py-[6px] rounded-[110px] top-[33px] z-10 shadow-sm transition-all duration-200 group cursor-pointer"
          >
            <div className="flex h-[11px] items-center justify-center relative shrink-0 w-[11px]">
              <svg className="size-full" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 12.5L4.5 7.5L10 2.5"
                  className="stroke-[#190B00] group-hover:stroke-[#FFFDFA] transition-colors duration-200"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-outfit font-black leading-[normal] text-[#190b00] group-hover:text-[#fffdfa] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200">
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

        {/* ── 7. THE EXPERIENCE SECTION (Hardware-Composited Viewport Pinning) ── */}
        <TheExperienceShowcase scale={scale} left={left} sectionTop={9529} />

        {/* ── Scaled Inner Canvas ── */}
        <div
          style={{
            width: `${CANVAS_W}px`,
            height: `${CANVAS_H}px`,
            position: "absolute",
            top: 0,
            left: `${left}px`,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            background: "transparent",
          }}
          className="font-outfit select-none"
        >
          {/* ── Overview Header Grid Bar ── */}
          <div className="absolute content-stretch flex items-center left-[80px] top-[180px] w-[1280px]">
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-start pl-[30px] w-[275px] relative shrink-0">
              <p className="font-outfit font-normal text-[#190b00] text-[30px] whitespace-nowrap">
                OVERVIEW
              </p>
            </div>
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" />
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-end pr-[30px] w-[174px] relative shrink-0 -ml-[1px]">
              <p className="font-inter font-bold text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
                [ 2025 ]
              </p>
            </div>
          </div>

          {/* ── Overview Box Metadata & Branding ── */}
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid left-[80px] top-[249px] w-[1280px] h-[488px]">
            {/* Left Column: ROLE & SCOPE */}
            <div className="absolute left-[30px] bottom-[30px] w-[240px] flex flex-col gap-[28px]">
              <div className="flex flex-col gap-[4px] leading-[normal] w-full">
                <p className="font-inter font-bold text-[#7b7b7b] text-[12px] tracking-[0.6px] uppercase w-full mb-0">
                  ROLE
                </p>
                <p className="font-outfit font-normal text-[#190b00] text-[18px] w-full mb-0">
                  Product Designer
                </p>
              </div>
              <div className="flex flex-col gap-[4px] w-full">
                <p className="font-inter font-bold text-[#7b7b7b] text-[12px] tracking-[0.6px] uppercase w-full mb-1">
                  SCOPE
                </p>
                <div className="font-outfit font-normal text-[#190b00] text-[17px] leading-[1.38]">
                  <p className="mb-0">/ Discovery Experience</p>
                  <p className="mb-0">/ AI Assisted Personalization</p>
                  <p className="mb-0">/ Conversational Commerce</p>
                  <p className="mb-0">/ Interaction Design</p>
                  <p className="mb-0">/ Fashion Marketplace</p>
                </div>
              </div>
            </div>

            {/* Right Column: Vousvous Logo + Title */}
            <div className="absolute left-[326px] top-[46px] flex gap-[20px] items-center">
              <div className="relative shrink-0 size-[100px]">
                <img
                  src={imgVousvousLogo}
                  alt="Vousvous Logo"
                  className="absolute inset-0 size-full object-contain pointer-events-none"
                />
              </div>
              <p className="font-['Alegreya_SC',serif] font-normal leading-none relative shrink-0 text-[#190b00] text-[84px] whitespace-nowrap mb-0 tracking-[0.5px]">
                Vousvous
              </p>
            </div>

            {/* Right Column: Main Headline */}
            <div className="absolute left-[339px] top-[245px] w-[754px]">
              <div className="[word-break:break-word] font-outfit font-medium leading-[1.2] text-[#7b7b7b] text-[52px]">
                <p className="leading-[normal] mb-0">
                  Designing Fashion Discovery<br />
                  Beyond Search
                </p>
              </div>
            </div>
          </div>

          {/* ── Overview Box Pullquote ── */}
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid flex items-center left-[80px] px-[32px] py-[36px] top-[736px] w-[1280px]">
            <p className="font-outfit font-normal leading-[1.5] text-[#77695d] text-[24px] mb-0">
              Fashion discovery has long been driven by filters, endless grids, and keyword searches. With VousVous, we explored a different interaction model—one where users discover, personalize, and{" "}
              <span className="font-outfit font-bold text-[#77695d]">
                create fashion through gestures and AI-guided conversations instead of traditional browsing.
              </span>
            </p>
          </div>

          {/* ── Soft Sky Cyan (#68C3E7) & Warm Peach (#FFB86B) Ambient Glow & Main Hero Frame ── */}
          <div
            style={{
              position: "absolute",
              left: "60px",
              top: "1200px",
              width: "1320px",
              height: "750px",
              background: "linear-gradient(110deg, #68C3E7 0%, #FFB86B 100%)",
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
              boxShadow:
                "-40px 0 90px rgba(104, 195, 231, 0.45), 40px 0 90px rgba(255, 184, 107, 0.45)",
              zIndex: 2,
            }}
          >
            <ShimmerImage
              alt="Vousvous Story Hero"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgVousvousStoryHero}
            />
          </div>

          {/* ── 2. THE CHALLENGE SECTION (Top 2176px inside Dark BG 1) ── */}
          <div className="absolute left-[80px] top-[2176px] w-[1280px] h-[480px]">
            <div
              className={`[word-break:break-word] absolute font-outfit font-normal leading-[1.6] left-[0px] text-[24px] top-[100px] w-[1106px] transition-colors duration-700 ${
                isChallengeInView ? "text-[#ccc]" : "text-[#77695d]"
              }`}
            >
              <p className="leading-[normal] mb-6">
                Most fashion platforms assume users know exactly what they&apos;re looking for.
              </p>
              <p className="leading-[normal] mb-6">
                In reality, <span className="font-bold text-[#fffdfa]">fashion shopping is often exploratory.</span><br />
                People discover styles while browsing, save pieces they like, compare options, and gradually refine their preferences.
              </p>
              <p className="leading-[normal] mb-6">
                Traditional e-commerce patterns interrupt this process with complex filters, large product grids, and overwhelming choices.
              </p>
              <p className="leading-[normal] mb-8">
                The opportunity was to design an experience that felt less like searching a catalogue and more like discovering personal style.
              </p>
              <p className="font-outfit font-bold leading-[normal] text-[#fffdfa] text-[24px] mb-0">
                &quot;Discovery should feel intuitive—not exhausting.&quot;
              </p>
            </div>
            <p
              className={`[word-break:break-word] absolute font-outfit font-bold leading-[normal] left-[0px] text-[50px] top-[0px] tracking-[5px] whitespace-nowrap transition-colors duration-700 ${
                isChallengeInView ? "text-[#fffdfa]" : "text-[#190b00]"
              }`}
            >
              THE CHALLENGE
            </p>
            <div
              className={`absolute left-0 top-[72px] w-[1030px] h-[1px] transition-colors duration-700 ${
                isChallengeInView ? "bg-[rgba(255,253,250,0.15)]" : "bg-[#7b7a77]/30"
              }`}
            />
          </div>

          {/* ── 3. THE OPPORTUNITY SECTION (Top 2956px) ── */}
          <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[2956px] w-[1280px]">
            <div className="content-stretch flex items-center relative shrink-0 w-full">
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-start pl-[30px] w-[390px] relative shrink-0">
                <p className="font-outfit font-normal text-[#190b00] text-[30px] whitespace-nowrap mb-0">
                  THE OPPORTUNITY
                </p>
              </div>
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" />
            </div>

            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full -mt-[1px] bg-white border border-[#7b7a77] border-solid p-[30px] h-[800px]">
              {/* Left Column: Opportunity Card */}
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid p-[32px] w-[420px] h-[740px] flex flex-col justify-start shrink-0">
                <p className="font-outfit font-normal text-[#190b00] text-[20px] leading-[1.45] mb-[45px]">
                  Rather than redesigning fashion shopping, the goal was to rethink how people discover, express, and personalize fashion.
                </p>

                <div className="mb-[45px]">
                  <p className="font-outfit text-[#190b00] text-[18px] leading-[1.45] mb-0">
                    <strong className="font-bold">/ Discover naturally</strong> — One design at a time, using simple gestures instead of endless scrolling.
                  </p>
                </div>

                <div className="mb-[45px]">
                  <p className="font-outfit text-[#190b00] text-[18px] leading-[1.45] mb-0">
                    <strong className="font-bold">/ Express intent conversationally</strong> — Describe what you want and let AI turn intent into inspiration.
                  </p>
                </div>

                <div>
                  <p className="font-outfit text-[#190b00] text-[18px] leading-[1.45] mb-0">
                    <strong className="font-bold">/ Personalize before purchasing</strong> — Remix, refine, and customize designs before moving to quote and purchase.
                  </p>
                </div>
              </div>

              {/* Right Column: Opportunity Visual Frame */}
              <div className="flex-1 h-full flex items-center justify-center">
                <img
                  src={imgVousvousOpportunity}
                  alt="Vousvous Opportunity Visual"
                  className="max-h-[740px] max-w-full w-auto h-auto object-contain pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* ── 4. WHAT I DROVE SECTION (Top 4025px - 200px gap after Opportunity ends at 3825px) ── */}
          <div className="absolute left-[80px] top-[4025px] w-[1280px] h-[840px]">
            <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid h-[840px] left-0 w-[70px]">
              <div className="absolute flex items-center justify-center left-[10px] top-[135px] w-[50px]">
                <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                  <p className="font-outfit font-normal text-[#190b00] text-[30px] tracking-[1.2px]">
                    WHAT I DROVE
                  </p>
                </div>
              </div>
              <div className="absolute flex items-center justify-center left-[10px] top-[648px] w-[50px]">
                <div style={{ transform: "rotate(-90deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                  <p className="font-inter font-bold text-[#77695d] text-[12px] tracking-[0.6px] uppercase">
                    [ CONTRIBUTION ]
                  </p>
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
                <p className="mb-3">
                  I led the end-to-end experience for the consumer mobile application, shaping how users discover, personalise, and purchase fashion.
                </p>
                <p className="font-outfit font-bold text-[#190b00] text-[22px] leading-[1.4] mb-0">
                  / Gesture-first discovery experience / Conversational AI workflows for fashion exploration / The remix interaction for personalisation / Quotation and measurement journeys / Consistent visual language across / Reusable interaction patterns for discovery, saving, and customisation
                </p>
              </div>

              {/* Graphic Asset Image */}
              <div className="absolute left-[60px] top-[260px] w-[1090px] h-[540px] flex items-center justify-center pointer-events-none">
                <img 
                  src={imgWIDVousVous} 
                  alt="VousVous Interaction System Diagram" 
                  className="max-w-[880px] max-h-[480px] w-auto h-auto object-contain display-block"
                />
              </div>
            </div>
          </div>

          {/* ── 5. VALIDATION / OUTCOME SECTION (Top 5065px - 200px gap after What I Drove ends at 4865px) ── */}
          <div className="absolute content-stretch flex flex-col items-start left-[80px] top-[5065px] w-[1280px] z-[2]">
            {/* Header Box */}
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex flex-col items-start p-[40px] relative shrink-0 w-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 flex-1">
                  <p className="font-inter font-bold text-[#77695d] text-[12px] tracking-[0.6px] uppercase w-full mb-0">
                    [ FROM CONCEPT TO LIVE PRODUCT ]
                  </p>
                  <p className="font-outfit font-black leading-[1] text-[#190b00] text-[140px] tracking-[5.6px] w-full margin-0">
                    OUTCOME
                  </p>
                </div>
                <div className="flex items-center justify-center relative shrink-0">
                  <div className="flex-none">
                    <BrandVector theme="dark" width={231} height={154} />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Box */}
            <div className="bg-[#fffdfa] border-x border-b border-[#7b7a77] border-solid content-stretch flex flex-col p-[40px] relative shrink-0 w-full -mt-[1px]">
              {/* Intro Narrative */}
              <p className="font-outfit font-normal text-[#77695d] text-[24px] leading-[1.4] mb-[45px]">
                VousVous moved beyond a conventional fashion-commerce experience, creating a live mobile product built around discovery, personalization, and AI-assisted creation.
              </p>

              {/* Two Metrics Columns */}
              <div className="grid grid-cols-2 border-b border-[#7b7a77] pb-[40px] mb-[45px]">
                {/* Metric 1 */}
                <div className="flex flex-col pr-[40px]">
                  <span className="font-outfit font-bold text-[#EE6C13] text-[72px] leading-[1]">
                    100+
                  </span>
                  <h3 className="font-outfit font-medium text-[#190b00] text-[24px] leading-[1.3] mt-3 mb-2">
                    Pilot Users
                  </h3>
                  <p className="font-outfit font-normal text-[#77695d] text-[16px] leading-[normal] m-0">
                    Exclusive access to the first live experience
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col border-l border-[#7b7a77] pl-[40px]">
                  <span className="font-outfit font-bold text-[#EE6C13] text-[72px] leading-[1]">
                    3
                  </span>
                  <h3 className="font-outfit font-medium text-[#190b00] text-[24px] leading-[1.3] mt-3 mb-2">
                    Core Gestures
                  </h3>
                  <p className="font-outfit font-normal text-[#77695d] text-[16px] leading-[normal] m-0">
                    Like · Skip · Explore
                  </p>
                </div>
              </div>

              {/* AI-powered journey Block */}
              <div className="flex flex-col gap-3 mb-[45px]">
                <h3 className="font-outfit font-bold text-[#EE6C13] text-[48px] leading-[1.2] m-0">
                  AI-powered journey
                </h3>
                <p className="font-outfit font-medium text-[24px] leading-[1.4] m-0">
                  <span className="text-[#190b00]">Discover → Create → </span>
                  <span className="text-[#EE6C13] font-bold">Remix</span>
                  <span className="text-[#190b00]"> → Quote → Purchase</span>
                </p>
              </div>

              {/* Quote Card */}
              <div className="w-full bg-[#f2ede7] border-l-[5px] border-[#EE6C13] px-[36px] py-[30px] flex items-center justify-between gap-8">
                <p className="font-outfit italic text-[#190b00] text-[20px] leading-[1.5] m-0 flex-1">
                  The experience demonstrated how{" "}
                  <span className="font-bold">AI can become part of the </span>
                  <span className="font-bold text-[#EE6C13]">interaction model</span>
                  <span className="font-bold">—not just another feature,</span>{" "}
                  turning fashion discovery from a catalogue-browsing task into a more personal, exploratory experience.
                </p>
                <img
                  src={imgOutcomeQuoteMark}
                  alt="Quote"
                  className="w-[102px] h-[80px] shrink-0 object-contain pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* ── 6. KEY PRODUCT DECISIONS SECTION (Top 6195px - 200px gap after Outcome ends at 5995px) ── */}
          <div className="absolute content-stretch flex flex-col gap-[60px] items-start left-[80px] top-[6195px] w-[1280px] z-[2]">
            {/* Header Box */}
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex items-center relative shrink-0 w-full h-[134px]">
              <div className="border-r border-[#7b7a77] border-solid h-full w-[114px] flex items-center justify-center shrink-0">
                <div style={{ transform: "rotate(90deg)" }}>
                  <BrandVector theme="dark" width={68} height={45} />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] justify-center pl-[40px] flex-1">
                <p className="font-inter font-bold text-[#77695d] text-[12px] tracking-[0.6px] uppercase m-0">
                  [ OBSERVATION - DECISION - RESULT ]
                </p>
                <h2 className="font-outfit font-black text-[#190b00] text-[36px] tracking-[1.5px] uppercase m-0 leading-none">
                  KEY PRODUCT DECISIONS
                </h2>
              </div>
            </div>

            {/* Decision 01 */}
            <div className="content-stretch flex items-center relative shrink-0 w-full h-[690px]">
              {/* Left Card */}
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid p-[44px] flex flex-col justify-between w-[590px] h-full shrink-0">
                <div>
                  <p className="font-inter font-bold text-[12px] text-[#77695d] tracking-[0.6px] uppercase m-0 mb-3">
                    [ KEY DECISION 01 ]
                  </p>
                  <h3 className="font-outfit font-bold text-[#190b00] text-[32px] leading-[1.2] m-0">
                    Discovery Before Search
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Observation
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Traditional fashion apps make users search, filter, and scroll before they know what they want.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Decision
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      <strong className="font-bold">Make discovery the primary interaction</strong> — one design at a time, with swipe-based exploration.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Result
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit font-bold text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Fashion browsing became more intuitive, lightweight, and exploratory.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Mockup Panel */}
              <div className="bg-[#e5ddd4] border-t border-r border-b border-[#7b7a77] border-solid w-[690px] h-full -ml-[1px] flex items-center justify-center shrink-0 p-8">
                <img
                  src={imgOpportunityPhone}
                  alt="Decision Mockup"
                  className="w-[290px] h-[600px] object-contain drop-shadow-md select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Decision 02 */}
            <div className="content-stretch flex items-center relative shrink-0 w-full h-[690px]">
              {/* Left Card */}
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid p-[44px] flex flex-col justify-between w-[590px] h-full shrink-0">
                <div>
                  <p className="font-inter font-bold text-[12px] text-[#77695d] tracking-[0.6px] uppercase m-0 mb-3">
                    [ KEY DECISION 02 ]
                  </p>
                  <h3 className="font-outfit font-bold text-[#190b00] text-[32px] leading-[1.2] m-0">
                    Gestures Become Navigation
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Observation
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      The home experience needed to feel faster and more natural than conventional catalogue browsing.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Decision
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <div className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      <strong className="font-bold">Built the core experience around three simple gestures:</strong><br />
                      Swipe left = Like<br />
                      Swipe right = Skip<br />
                      Swipe up = Explore
                    </div>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Result
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      <strong className="font-bold">The interaction model became the navigation system itself,</strong> reducing reliance on traditional menus and filters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Mockup Panel */}
              <div className="bg-[#e5ddd4] border-t border-r border-b border-[#7b7a77] border-solid w-[690px] h-full -ml-[1px] flex items-center justify-center shrink-0 p-8">
                <img
                  src={imgOpportunityPhone}
                  alt="Decision Mockup"
                  className="w-[290px] h-[600px] object-contain drop-shadow-md select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Decision 03 */}
            <div className="content-stretch flex items-center relative shrink-0 w-full h-[690px]">
              {/* Left Card */}
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid p-[44px] flex flex-col justify-between w-[590px] h-full shrink-0">
                <div>
                  <p className="font-inter font-bold text-[12px] text-[#77695d] tracking-[0.6px] uppercase m-0 mb-3">
                    [ KEY DECISION 03 ]
                  </p>
                  <h3 className="font-outfit font-bold text-[#190b00] text-[32px] leading-[1.2] m-0">
                    AI as a Creative Partner
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Observation
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Finding inspiration is only the first step. Users often want to change, personalize, or recreate what they discover.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Decision
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Position AI as a <strong className="font-bold">co-creator</strong> — helping users describe ideas, generate designs, remix them, and explore variations.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Results
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      The journey expanded from <strong className="font-bold">Discover → Create → Remix → Quote → Purchase</strong>, connecting inspiration directly to creation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Mockup Panel */}
              <div className="bg-[#e5ddd4] border-t border-r border-b border-[#7b7a77] border-solid w-[690px] h-full -ml-[1px] flex items-center justify-center shrink-0 p-8">
                <img
                  src={imgOpportunityPhone}
                  alt="Decision Mockup"
                  className="w-[290px] h-[600px] object-contain drop-shadow-md select-none pointer-events-none"
                />
              </div>
            </div>

            {/* Decision 04 */}
            <div className="content-stretch flex items-center relative shrink-0 w-full h-[690px]">
              {/* Left Card */}
              <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid p-[44px] flex flex-col justify-between w-[590px] h-full shrink-0">
                <div>
                  <p className="font-inter font-bold text-[12px] text-[#77695d] tracking-[0.6px] uppercase m-0 mb-3">
                    [ KEY DECISION 04 ]
                  </p>
                  <h3 className="font-outfit font-bold text-[#190b00] text-[32px] leading-[1.2] m-0">
                    Personalise Before Purchase
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Observation
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      A product page usually ends the discovery journey, but fashion often requires more personal consideration.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Decision
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Connect <strong className="font-bold">AI generation, remixing, body profile, and try-on</strong> before users commit to a purchase.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Results
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      <strong className="font-bold">Personalisation became part of the purchase journey</strong>, rather than an afterthought.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Mockup Panel */}
              <div className="bg-[#e5ddd4] border-t border-r border-b border-[#7b7a77] border-solid w-[690px] h-full -ml-[1px] flex items-center justify-center shrink-0 p-8">
                <img
                  src={imgOpportunityPhone}
                  alt="Decision Mockup"
                  className="w-[290px] h-[600px] object-contain drop-shadow-md select-none pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* ── 8. ONE THING I LEARNED SECTION (Top 12980px - 200px gap after The Experience ends at 12780px) ── */}
          <div className="absolute content-stretch flex flex-col gap-[19px] items-start left-[80px] top-[12980px] w-[1280px] z-[2]">
            <p
              className={`font-outfit font-bold leading-[normal] relative shrink-0 text-[50px] tracking-[5px] w-[1030px] margin-0 transition-colors duration-700 ${
                isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"
              }`}
            >
              <span
                style={{
                  WebkitTextStrokeWidth: "2px",
                  WebkitTextStrokeColor: "#7B7A77",
                  color: isOneThingInView ? "#190b00" : "#fffdfa",
                  paintOrder: "stroke fill",
                }}
              >
                ONE THING
              </span>
              <span>{` I LEARNED`}</span>
            </p>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div className="h-0 relative w-[1030px]">
                  <div
                    className={`absolute inset-[-1px_0_0_0] h-[1px] w-full transition-colors duration-700 ${
                      isOneThingInView ? "bg-[rgba(255,253,250,0.15)]" : "bg-[#7b7a77]/30"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div
              className={`font-outfit font-normal leading-[1.6] relative shrink-0 text-[24px] w-[1030px] transition-colors duration-700 ${
                isOneThingInView ? "text-[#8c827a]" : "text-[#77695d]"
              }`}
            >
              <p className="leading-[normal] mb-6">
                Designing for AI isn't about replacing familiar experiences.
              </p>

              <p className="leading-[normal] mb-6">
                <span>It's about introducing intelligence only where it </span>
                <span
                  className={`font-outfit font-bold transition-colors duration-700 ${
                    isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"
                  }`}
                >
                  removes friction.
                </span>
              </p>

              <p className="leading-[normal] mb-2">
                The strongest moments in this project weren't generated by AI—they came from balancing human intuition with AI assistance.
              </p>

              <div className="flex flex-col gap-1 mb-8">
                <p className="leading-[normal] m-0">/Gestures made discovery effortless</p>
                <p className="leading-[normal] m-0">/Conversations made intent easier to express</p>
                <p className="leading-[normal] m-0">/Personalisation transformed inspiration into something uniquely personal.</p>
              </div>

              <p className="font-outfit font-bold text-[32px] leading-tight mb-0">
                <span
                  className={`transition-colors duration-700 ${
                    isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"
                  }`}
                >
                  That{" "}
                </span>
                <span className="text-[#ee6c13]">balance</span>
                <span
                  className={`transition-colors duration-700 ${
                    isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"
                  }`}
                >
                  {" "}became the most valuable design lesson from this project.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── NEXT ? / FOOTER CARD (Centered in 100vh) ─── */}
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#190b00",
          position: "relative",
          zIndex: 10,
          marginTop: "-2px",
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <Footer />
        </div>
      </div>

      {/* ─── NEXT STORY BOTTOM STRIP ─── */}
      <NextStoryBottomStrip onNextStory={onNextStory} defaultNextPath="/allyra-story" />

      {/* ─── SCROLL TO TOP FLOATING BUTTON ─── */}
      <ScrollToTopButton show={showScrollTop} onClick={scrollToTop} />
    </article>
  );
}
