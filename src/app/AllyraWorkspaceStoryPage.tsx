import React, { useEffect, useState, useRef } from "react";
import AllyraStoryNavBar from "@/app/components/AllyraStoryNavBar";
import MethodologyTooltip from "@/app/components/MethodologyTooltip";
import Footer from "@/components/Footer";
import NextStoryBottomStrip from "@/components/NextStoryBottomStrip";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";
import vidNxt03 from "@/imports/nxt03.mp4";
import imgNxt03 from "@/imports/nxt03.webp";

interface StoryPageProps {
  onNavigate: (path: string) => void;
  scale?: number;
  left?: number;
  isMobile?: boolean;
}

export default function AllyraWorkspaceStoryPage({
  onNavigate,
  scale = 1,
  isMobile = false,
}: StoryPageProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme switch: Starts in Light theme, transitions to Dark when entire video is in viewport or scrolled past
  useEffect(() => {
    const el = videoSectionRef.current;
    if (!el) return;

    const checkViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Entire video is in viewport when top is visible and bottom is within viewport,
      // or when user has scrolled past into video/outcome
      const isEntirelyInView = (rect.top >= 0 && rect.bottom <= vh) || (rect.top < 80 && rect.bottom > vh * 0.6);
      const isPastVideo = rect.top < 80;

      setIsDark(isEntirelyInView || isPastVideo);
    };

    window.addEventListener("scroll", checkViewport, { passive: true });
    window.addEventListener("resize", checkViewport, { passive: true });
    checkViewport();

    return () => {
      window.removeEventListener("scroll", checkViewport);
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  // Video Autoplay Observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleOpenFullscreen = () => {
    window.dispatchEvent(new CustomEvent("open-full-screen-video", { detail: { src: vidNxt03 } }));
  };

  return (
    <article
      role="article"
      aria-label="02 — Unified Workspace Case Study"
      className="w-full min-h-screen font-outfit selection:bg-[#EE6C13] selection:text-white relative overflow-x-hidden"
      style={{
        backgroundColor: isDark ? "#190b00" : "#FFFDFA",
        color: isDark ? "#FFFDFA" : "#190b00",
        transition: "background-color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.5s ease",
      }}
    >
      {/* ─── STICKY HEADER NAVIGATION (Matches portfolio stories) ─── */}
      <AllyraStoryNavBar onNavigate={onNavigate} isDark={isDark} />

      <main className="max-w-[1240px] mx-auto px-5 md:px-10 xl:px-0 pt-16 md:pt-24 pb-24">
        {/* ─── 1. HERO — LIGHT THEME INITIALLY ─── */}
        <header className="mb-14 md:mb-18">
          <div className="flex items-center gap-2 mb-4">
            <span className="size-2 rounded-none bg-[#EE6C13]" />
            <span className="font-mono text-[11px] font-bold text-[#EE6C13] uppercase tracking-[1.5px]">
              02 / 04 · UNIFIED WORKSPACE
            </span>
          </div>

          <h1
            className={`font-outfit font-black text-[38px] sm:text-[52px] md:text-[68px] leading-[1.05] tracking-[-0.03em] mb-6 max-w-[1040px] transition-colors duration-500 ${
              isDark ? "text-[#FFFDFA]" : "text-[#190b00]"
            }`}
          >
            AI capabilities shouldn&apos;t feel disconnected.
          </h1>

          <p
            className={`font-outfit text-[19px] md:text-[23px] leading-[1.5] m-0 max-w-[840px] font-normal transition-colors duration-500 ${
              isDark ? "text-[#b8afa6]" : "text-[#5c534b]"
            }`}
          >
            Bringing isolated agent capabilities into one synchronized workspace where multi-agent coordination feeds directly into live deliverables.
          </p>
        </header>

        {/* ─── 2 & 3. THE PROBLEM & THE DECISION ─── */}
        <section
          className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-t pt-10 pb-16 mb-16 transition-colors duration-500 ${
            isDark ? "border-white/10" : "border-[#7b7a77]/30"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] text-[#EE6C13] uppercase tracking-wider font-bold">
                [ 01 · THE PROBLEM ]
              </span>
            </div>
            <h2
              className={`font-outfit font-bold text-[20px] md:text-[22px] leading-snug mb-3 transition-colors duration-500 ${
                isDark ? "text-[#FFFDFA]" : "text-[#190b00]"
              }`}
            >
              Fragmented workflows break cognitive focus and introduce manual translation work.
            </h2>
            <p
              className={`font-outfit text-[16px] md:text-[17px] leading-[1.65] m-0 transition-colors duration-500 ${
                isDark ? "text-[#cfc5bb]" : "text-[#554d45]"
              }`}
            >
              Work becomes fragmented when users must move between isolated agents and workflows. Manually copying unstructured chat responses across spreadsheets, text editors, and presentation builders introduces severe cognitive fatigue and breaks flow.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] text-[#EE6C13] uppercase tracking-wider font-bold">
                [ 02 · THE DECISION ]
              </span>
            </div>
            <h2
              className={`font-outfit font-bold text-[20px] md:text-[22px] leading-snug mb-3 transition-colors duration-500 ${
                isDark ? "text-[#FFFDFA]" : "text-[#190b00]"
              }`}
            >
              Anchor multi-agent execution behind the glass to a living deliverable canvas.
            </h2>
            <p
              className={`font-outfit text-[16px] md:text-[17px] leading-[1.65] m-0 transition-colors duration-500 ${
                isDark ? "text-[#cfc5bb]" : "text-[#554d45]"
              }`}
            >
              Bring capabilities into one cohesive workspace: multi-agent execution telemetry coordinates behind the glass on the left, while directly structuring and populating an exportable deliverable canvas on the right in real time.
            </p>
          </div>
        </section>

        {/* ─── 4. PRODUCT EVIDENCE — DOMINANT UI SHOWCASE (TRIGGER FOR DARK THEME) ─── */}
        <section ref={videoSectionRef} className="mb-20">
          <figure className="w-full select-none m-0">
            <div
              className={`relative w-full rounded-none overflow-hidden border shadow-2xl group transition-all duration-700 ${
                isDark ? "border-[#7b7a77]/40 bg-[#080200]" : "border-[#7b7a77] bg-[#f5f2ea]"
              }`}
            >
              <div
                className="relative w-full cursor-pointer overflow-hidden"
                style={{ aspectRatio: "3456 / 1924" }}
                onClick={handleOpenFullscreen}
              >
                <video
                  ref={videoRef}
                  src={vidNxt03}
                  poster={imgNxt03}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain block"
                />

                {/* Video Play/Pause & Full-Screen Action Overlay */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 opacity-95 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="h-8 px-3 rounded-none bg-black/85 hover:bg-black text-[#FFFDFA] border border-white/20 text-[11px] font-mono uppercase tracking-wider backdrop-blur-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>Play</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenFullscreen();
                    }}
                    aria-label="Expand video to full screen"
                    className="h-8 px-3 rounded-none bg-[#EE6C13] hover:bg-[#d95a08] text-[#FFFDFA] text-[11px] font-mono font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    <span>Expand</span>
                  </button>
                </div>
              </div>

              {/* Caption Bar */}
              <div
                className={`p-3.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors duration-500 ${
                  isDark ? "bg-[#0e0501] border-white/10" : "bg-[#f0ece1] border-[#7b7a77]/30"
                }`}
              >
                <span
                  className={`font-mono text-[11.5px] uppercase tracking-wider transition-colors duration-500 ${
                    isDark ? "text-[#8e857c]" : "text-[#685f56]"
                  }`}
                >
                  EXHIBIT 02 · UNIFIED AI WORKSPACE: Telemetry on left coordinates with living deliverable on right
                </span>
                <span className="font-mono text-[11px] text-[#EE6C13] uppercase tracking-wider font-semibold">
                  Click to Expand Full Screen ↗
                </span>
              </div>
            </div>
          </figure>
        </section>

        {/* ─── 5. OUTCOME — ONE CREDIBLE IMPACT METRIC (DARK PANEL) ─── */}
        <section
          className={`p-8 md:p-14 rounded-none border mb-24 relative transition-colors duration-700 ${
            isDark ? "bg-[#180a01] border-white/10" : "bg-[#f8f5ee] border-[#7b7a77]/30"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
            <div className="shrink-0 lg:max-w-[420px]">
              <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#EE6C13] font-bold block mb-2">
                [ IMPACT EVIDENCE ]
              </span>
              <div className="font-outfit font-black text-[68px] md:text-[92px] leading-none text-[#EE6C13] my-1 tracking-tight">
                4 ➔ 1
              </div>
              <p
                className={`font-outfit text-[18px] md:text-[20px] font-bold leading-snug m-0 transition-colors duration-500 ${
                  isDark ? "text-[#FFFDFA]" : "text-[#190b00]"
                }`}
              >
                Fragmented workflows brought into one continuous experience
              </p>
            </div>

            <div
              className={`lg:max-w-[540px] border-t lg:border-t-0 lg:border-l pt-6 lg:pt-0 lg:pl-10 transition-colors duration-500 ${
                isDark ? "border-white/15 text-[#cfc5bb]" : "border-[#7b7a77]/30 text-[#554d45]"
              }`}
            >
              <p className="font-outfit text-[15.5px] md:text-[17px] leading-[1.65] m-0 mb-3">
                Consolidates four previously disconnected enterprise workflows—<strong>Research Extraction, Data Analysis, Copy Synthesis, and Document Assembly</strong>—into one continuous canvas with 1-click export to native tools.
              </p>

              <MethodologyTooltip
                label="What was consolidated ↗"
                title="4 workflows → 1 canvas"
                isDark={isDark}
              >
                <p className="m-0 mb-3 text-[#cfc5bb]">
                  Four previously separate workflow stages were brought into a unified work environment:
                </p>

                <ul className="list-disc pl-5 my-3 space-y-1 text-[#cfc5bb]">
                  <li>Research Extraction</li>
                  <li>Data Analysis</li>
                  <li>Copy Synthesis</li>
                  <li>Document Assembly</li>
                </ul>

                <p className="m-0 text-[12.5px] text-[#a89f96] leading-[1.6]">
                  The consolidation reduces workflow fragmentation, context switching and external handoffs between stages. Users can progress from research to a deliverable within one continuous workspace, with export available when needed.
                </p>
              </MethodologyTooltip>
            </div>
          </div>
        </section>

        {/* ─── 6. STORY PROGRESSION NAVIGATION ─── */}
        <nav
          aria-label="Story Progression Navigation"
          className={`pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors duration-500 ${
            isDark ? "border-white/15" : "border-[#7b7a77]/30"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onNavigate("/allyra-outcomes");
            }}
            onMouseEnter={() => playHoverTick()}
            className={`flex items-center gap-2 text-[13px] font-outfit font-bold uppercase tracking-[0.5px] transition-colors cursor-pointer bg-transparent border-0 p-0 group ${
              isDark ? "text-[#a89f96] hover:text-[#FFFDFA]" : "text-[#554d45] hover:text-[#190b00]"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Story 01: Outcome-First</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onNavigate("/allyra-observability");
            }}
            onMouseEnter={() => playHoverTick()}
            className="flex items-center gap-2 text-[13px] font-outfit font-bold uppercase tracking-[0.5px] text-[#EE6C13] hover:text-[#ff8533] transition-colors cursor-pointer bg-transparent border-0 p-0 group"
          >
            <span>Story 03: Execution Visibility</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </nav>
      </main>

      {/* ─── FULL 100VH CENTERED FOOTER CONTAINER ─── */}
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
        }}
      >
        <div style={{ transform: `scale(${isMobile ? 1 : scale})`, transformOrigin: "center center" }}>
          <Footer />
        </div>
      </div>

      {/* ─── NEXT STORY BOTTOM STRIP ─── */}
      <NextStoryBottomStrip
        onNextStory={() => onNavigate("/allyra-observability")}
        defaultNextPath="/allyra-observability"
        isDark={true}
      />

      {/* ─── FLOATING SCROLL TO TOP ─── */}
      <ScrollToTopButton show={showScrollTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </article>
  );
}
