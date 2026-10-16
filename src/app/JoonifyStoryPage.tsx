import React, { useEffect, useRef, useState } from "react";
import BrandVector from "@/components/BrandVector";
import Footer from "@/components/Footer";
import NextStoryBottomStrip from "@/components/NextStoryBottomStrip";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import imgJoonifyIcon from "@/imports/joonify_icon.webp";
import imgJoonifyBanner from "@/imports/joonify_banner.webp";
import imgJoonifyDesktop from "@/imports/joonify_desktop.webp";
import imgJoonifySS1 from "@/imports/joonify_SS1.webp";
import imgJoonifySS4 from "@/imports/joonify_SS4.webp";
import imgJoonifySS5 from "@/imports/joonify_SS5.webp";
import imgJoonifySS6 from "@/imports/joonify_SS6.webp";
import imgJoonifyMobile1 from "@/imports/joonify_mobile1.webp";
import imgJoonifyMobile2 from "@/imports/joonify_mobile2.webp";
import imgOutcomeQuoteMark from "@/imports/outcome_quote_mark.webp";

// Mobile Components
import MobileJoonifyHero from "./components/mobile/joonify/MobileJoonifyHero";
import MobileJoonifyChallenge from "./components/mobile/joonify/MobileJoonifyChallenge";
import MobileJoonifyOpportunity from "./components/mobile/joonify/MobileJoonifyOpportunity";
import MobileJoonifyWhatIDrove from "./components/mobile/joonify/MobileJoonifyWhatIDrove";
import MobileJoonifyOutcome from "./components/mobile/joonify/MobileJoonifyOutcome";
import MobileJoonifyDecisions from "./components/mobile/joonify/MobileJoonifyDecisions";
import MobileJoonifyOneThing from "./components/mobile/joonify/MobileJoonifyOneThing";
import { MobileFinale } from "./components/mobile/MobileFinale";

interface JoonifyStoryPageProps {
  scale?: number;
  left?: number;
  onBack: () => void;
  onNextStory?: () => void;
}

const CANVAS_W = 1440;
const CANVAS_H = 10150;

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

export default function JoonifyStoryPage({
  scale = 1,
  left = 0,
  onBack,
  onNextStory,
}: JoonifyStoryPageProps) {
  const [isChallengeInView, setIsChallengeInView] = useState(false);
  const [isOneThingInView, setIsOneThingInView] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 768 : false));
  const [isDarkMobile, setIsDarkMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScrollMobileBg = () => {
      const challengeEl = document.getElementById("mobile-joonify-challenge");
      const oppEl = document.getElementById("mobile-joonify-opportunity");
      const oneThingEl = document.getElementById("mobile-joonify-onething");

      const isPastChallengeStart = challengeEl ? challengeEl.getBoundingClientRect().top <= window.innerHeight * 0.5 : false;
      const isPastOpportunityStart = oppEl ? oppEl.getBoundingClientRect().top <= window.innerHeight * 0.5 : false;
      const isPastOneThing = oneThingEl ? oneThingEl.getBoundingClientRect().top <= window.innerHeight * 0.5 : false;

      const inChallenge = isPastChallengeStart && !isPastOpportunityStart;
      const inOneThingAndBelow = isPastOneThing;
      setIsDarkMobile(inChallenge || inOneThingAndBelow);
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
        <MobileJoonifyHero onBack={onBack} isDark={isDarkMobile} />
        <MobileJoonifyChallenge />
        <MobileJoonifyOpportunity />
        <MobileJoonifyWhatIDrove />
        <MobileJoonifyOutcome />
        <MobileJoonifyDecisions />
        <MobileJoonifyOneThing />
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
      <DynamicBgBand top={9330} height={820} scale={scale} onViewChange={setIsOneThingInView} />

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
              <p className="font-outfit font-normal text-[#190b00] text-[30px] whitespace-nowrap mb-0">
                OVERVIEW
              </p>
            </div>
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid flex-[1_0_0] h-[70px] min-w-px relative -ml-[1px]" />
            <div className="bg-[#fffdfa] border border-[#7b7a77] border-solid content-stretch flex h-[70px] items-center justify-end pr-[30px] w-[174px] relative shrink-0 -ml-[1px]">
              <p className="font-inter font-bold text-[#77695d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap mb-0">
                [ 2022 ]
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
                  <p className="mb-0">/ Early Childhood Ed-Tech</p>
                  <p className="mb-0">/ Assessment Experience</p>
                  <p className="mb-0">/ Child Talent Discovery</p>
                  <p className="mb-0">/ Learning Management &amp; Scheduling</p>
                  <p className="mb-0">/ Mobile Experience Design</p>
                </div>
              </div>
            </div>

            {/* Right Column: Joonify Logo Icon + Title */}
            <div className="absolute left-[326px] top-[46px] flex gap-[20px] items-center">
              <div className="relative shrink-0 size-[100px]">
                <img
                  src={imgJoonifyIcon}
                  alt="Joonify Logo"
                  className="absolute inset-0 size-full object-contain pointer-events-none"
                />
              </div>
              <p className="font-outfit font-bold leading-none relative shrink-0 text-[#190b00] text-[84px] whitespace-nowrap mb-0 tracking-[-0.5px]">
                Joonify
              </p>
            </div>

            {/* Right Column: Main Headline */}
            <div className="absolute left-[339px] top-[245px] w-[860px]">
              <div className="[word-break:break-word] font-outfit font-medium leading-[1.2] text-[#7b7b7b] text-[50px]">
                <p className="leading-[normal] mb-0">
                  Helping Parents Understand How Children Learn, Grow, and Discover Strengths
                </p>
              </div>
            </div>
          </div>

          {/* ── Overview Box Pullquote ── */}
          <div className="absolute bg-[#fffdfa] border border-[#7b7a77] border-solid flex items-center left-[80px] px-[32px] py-[36px] top-[736px] w-[1280px]">
            <p className="font-outfit font-normal leading-[1.5] text-[#77695d] text-[24px] mb-0">
              Every child has different strengths, interests, and learning needs. Joonify brought child talent discovery, learning recommendations, and educational planning into one platform—{" "}
              <span className="font-outfit font-bold text-[#77695d]">
                helping parents make more informed, empathetic decisions about their child&apos;s development.
              </span>
            </p>
          </div>

          {/* ── Soft Mint & Indigo Ambient Glow & Main Hero Frame ── */}
          <div
            style={{
              position: "absolute",
              left: "60px",
              top: "1200px",
              width: "1320px",
              height: "750px",
              background: "linear-gradient(110deg, #73F9C9 0%, #335FE6 100%)",
              filter: "blur(95px)",
              opacity: 0.75,
              borderRadius: "80px",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          <div
            className="-translate-x-1/2 absolute left-1/2 overflow-hidden flex items-center justify-center"
            style={{
              top: "1176px",
              width: "1280px",
              height: "800px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.45)",
              backgroundColor: "#1F2231",
              boxShadow:
                "-40px 0 90px rgba(115, 249, 201, 0.3), 40px 0 90px rgba(51, 95, 230, 0.3)",
              zIndex: 2,
            }}
          >
            <ShimmerImage
              alt="Joonify MacBook Banner"
              className="max-w-[1060px] max-h-[720px] w-auto h-auto object-contain pointer-events-none"
              src={imgJoonifyBanner}
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
                Every child has different strengths, interests, and learning needs.
              </p>
              <p className="leading-[normal] mb-6">
                In reality, <span className="font-bold text-[#fffdfa]">early childhood education is often fragmented and anxiety-driven.</span><br />
                Parents struggle to understand what their child needs, while generic tutoring programs treat all children identically.
              </p>
              <p className="leading-[normal] mb-6">
                Joonify aimed to help parents understand these differences through an intelligent talent discovery assessment and connect them with relevant, personalized learning resources.
              </p>
              <p className="font-outfit font-bold leading-[normal] text-[#fffdfa] text-[24px] mb-0">
                &quot;When parents understand how children learn, better decisions naturally follow.&quot;
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
                  Rather than disconnected educational tools, the experience connected three key parts of a child&apos;s learning journey:
                </p>

                <div className="mb-[45px]">
                  <p className="font-outfit text-[#190b00] text-[18px] leading-[1.45] mb-0">
                    <strong className="font-bold">/ Understand</strong> — Build a comprehensive child profile covering academic information, interests, skills, and personality.
                  </p>
                </div>

                <div className="mb-[45px]">
                  <p className="font-outfit text-[#190b00] text-[18px] leading-[1.45] mb-0">
                    <strong className="font-bold">/ Discover</strong> — Use interactive assessments to identify natural strengths, cognitive styles, and learning needs.
                  </p>
                </div>

                <div className="mb-[45px]">
                  <p className="font-outfit text-[#190b00] text-[18px] leading-[1.45] mb-0">
                    <strong className="font-bold">/ Grow</strong> — Explore tailored courses, track progress, and organize personalized learning schedules.
                  </p>
                </div>

                <div>
                  <p className="font-outfit text-[#77695d] text-[16px] leading-[1.4] mb-0">
                    The goal was to make a complex set of educational tools feel like one connected experience for parents.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Frame */}
              <div className="flex-1 h-full flex items-center justify-center">
                <img
                  src={imgJoonifySS6}
                  alt="Joonify Course Discovery Visual"
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
                  I led product design across the web and mobile platforms, shaping how parents discover their child&apos;s strengths and navigate early childhood education.
                </p>
                <p className="font-outfit font-bold text-[#190b00] text-[22px] leading-[1.4] mb-0">
                  / Talent discovery assessment flow / Child profiling &amp; strengths taxonomy / Unified weekly learning scheduler / Personalized course discovery experience / Engaging quiz and exam modules / Community referral &amp; parent sharing journeys / Mobile companion app for schedules and updates
                </p>
              </div>

              {/* Graphic Asset Image */}
              <div className="absolute left-[60px] top-[260px] w-[1090px] h-[540px] flex items-center justify-center pointer-events-none">
                <img 
                  src={imgJoonifyDesktop} 
                  alt="Joonify Platform Overview" 
                  className="max-w-[1000px] max-h-[500px] w-auto h-auto object-contain display-block"
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
                    [ FROM ASSESSMENT TO ACTIONABLE GROWTH ]
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
                Joonify brought child talent discovery, learning recommendations, and educational planning into one platform—helping parents make more informed decisions about their child&apos;s development.
              </p>

              {/* Two Metrics Columns */}
              <div className="grid grid-cols-2 border-b border-[#7b7a77] pb-[40px] mb-[45px]">
                {/* Metric 1 */}
                <div className="flex flex-col pr-[40px]">
                  <span className="font-outfit font-bold text-[#335FE6] text-[72px] leading-[1]">
                    750+
                  </span>
                  <h3 className="font-outfit font-medium text-[#190b00] text-[24px] leading-[1.3] mt-3 mb-2">
                    Parents Guided
                  </h3>
                  <p className="font-outfit font-normal text-[#77695d] text-[16px] leading-[normal] m-0">
                    Trusted by families during early rollout to assess children&apos;s natural learning tendencies
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col border-l border-[#7b7a77] pl-[40px]">
                  <span className="font-outfit font-bold text-[#335FE6] text-[72px] leading-[1]">
                    30 Min
                  </span>
                  <h3 className="font-outfit font-medium text-[#190b00] text-[24px] leading-[1.3] mt-3 mb-2">
                    Discovery Assessment
                  </h3>
                  <p className="font-outfit font-normal text-[#77695d] text-[16px] leading-[normal] m-0">
                    Engaging, low-stress discovery journey generating multi-dimensional developmental profiles
                  </p>
                </div>
              </div>

              {/* Journey Block */}
              <div className="flex flex-col gap-3 mb-[45px]">
                <h3 className="font-outfit font-bold text-[#335FE6] text-[48px] leading-[1.2] m-0">
                  Connected Learning Journey
                </h3>
                <p className="font-outfit font-medium text-[24px] leading-[1.4] m-0">
                  <span className="text-[#190b00]">Understand → Discover → </span>
                  <span className="text-[#335FE6] font-bold">Assess</span>
                  <span className="text-[#190b00]"> → Recommend → Schedule</span>
                </p>
              </div>

              {/* Quote Card */}
              <div className="w-full bg-[#f2ede7] border-l-[5px] border-[#335FE6] px-[36px] py-[30px] flex items-center justify-between gap-8">
                <p className="font-outfit italic text-[#190b00] text-[20px] leading-[1.5] m-0 flex-1">
                  Personalization becomes meaningful when parents can nurture a child&apos;s unique strengths, rather than forcing them into generic academic molds.
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
                    Profile Before Prescribing
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Observation
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Parents are frequently overwhelmed by conflicting educational advice and generic course catalogues.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Decision
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      <strong className="font-bold">Build a multi-dimensional child profile</strong> capturing personality, interests, and cognitive inclinations before recommending any courses.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Result
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit font-bold text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Recommendations felt tailored and credible, establishing parental trust from the first session.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Mockup Panel */}
              <div className="bg-[#e0d7cd] border-t border-r border-b border-[#7b7a77] border-solid w-[690px] h-full -ml-[1px] flex items-center justify-center shrink-0 overflow-hidden relative p-8">
                <img
                  src={imgJoonifySS1}
                  alt="Child Talent Discovery Report"
                  className="max-w-full max-h-full object-contain shadow-lg rounded-[6px]"
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
                    Assessment Without Anxiety
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Observation
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Standard educational testing induces stress in young children and yields skewed, unhelpful results.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Decision
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      <strong className="font-bold">Reframe talent discovery into gamified, 30-minute interactive quizzes</strong> and visual scenario exercises.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Result
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit font-bold text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Children enjoyed the discovery journey while parents gained deep insight into cognitive and emotional traits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Mockup Panel */}
              <div className="bg-[#e0d7cd] border-t border-r border-b border-[#7b7a77] border-solid w-[690px] h-full -ml-[1px] flex items-center justify-center shrink-0 overflow-hidden relative p-8">
                <img
                  src={imgJoonifySS4}
                  alt="Interactive Exams and Quizzes"
                  className="max-w-full max-h-full object-contain shadow-lg rounded-[6px]"
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
                    Connecting Insights to Daily Routine
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Observation
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Diagnostic reports often sit unused because parents don&apos;t know how to translate findings into daily habits.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Decision
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      <strong className="font-bold">Directly link assessment outcomes to a smart weekly learning scheduler</strong> and course discovery engine.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Result
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit font-bold text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Parents could immediately turn recommendations into structured, manageable weekly routines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Mockup Panel */}
              <div className="bg-[#e0d7cd] border-t border-r border-b border-[#7b7a77] border-solid w-[690px] h-full -ml-[1px] flex items-center justify-center shrink-0 overflow-hidden relative p-8">
                <img
                  src={imgJoonifySS5}
                  alt="Learning Scheduler"
                  className="max-w-full max-h-full object-contain shadow-lg rounded-[6px]"
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
                    Mobile Companion for Busy Parents
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Observation
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Parents don&apos;t always sit at desktop computers to manage schedules and check child updates.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Decision
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit text-[#190b00] text-[16px] leading-[1.45] m-0">
                      <strong className="font-bold">Build a focused mobile companion app</strong> for daily reminders, class links, and milestone tracking on the go.
                    </p>
                  </div>

                  <div>
                    <span className="font-outfit font-normal text-[#77695d] text-[16px] block mb-1">
                      Result
                    </span>
                    <div className="w-full h-[1px] bg-[#7b7a77]/30 mb-2.5" />
                    <p className="font-outfit font-bold text-[#190b00] text-[16px] leading-[1.45] m-0">
                      Daily parent engagement increased significantly with zero friction in attendance and scheduling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Mockup Panel */}
              <div className="bg-[#1F2231] border-t border-r border-b border-[#7b7a77] border-solid w-[690px] h-full -ml-[1px] flex items-center justify-center shrink-0 overflow-hidden relative p-8 gap-6">
                <img
                  src={imgJoonifyMobile1}
                  alt="Joonify Mobile Screen 1"
                  className="max-h-[580px] w-auto object-contain drop-shadow-xl"
                />
                <img
                  src={imgJoonifyMobile2}
                  alt="Joonify Mobile Screen 2"
                  className="max-h-[580px] w-auto object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* ── 7. ONE THING I LEARNED SECTION (Top 9530px inside Dark BG 2) ── */}
          <div className="absolute content-stretch flex flex-col gap-[19px] items-start left-[80px] top-[9530px] w-[1280px] z-[2]">
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
                Joonify was an opportunity to design beyond individual screens—
              </p>

              <p className="leading-[normal] mb-6">
                <span>to connect a child&apos;s profile, assessment journey, and learning resources into a </span>
                <span
                  className={`font-outfit font-bold transition-colors duration-700 ${
                    isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"
                  }`}
                >
                  cohesive product experience.
                </span>
              </p>

              <p className="leading-[normal] mb-4">
                In educational technology, simplicity is not about doing less. It&apos;s about removing friction between a parent&apos;s instinctive desire to support their child and the complex developmental data required to do it.
              </p>

              <p className="font-outfit font-bold text-[32px] leading-tight mb-0">
                <span
                  className={`transition-colors duration-700 ${
                    isOneThingInView ? "text-[#fffdfa]" : "text-[#190b00]"
                  }`}
                >
                  When parents understand how children learn,{" "}
                </span>
                <span className="text-[#335FE6]">better decisions naturally follow.</span>
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
