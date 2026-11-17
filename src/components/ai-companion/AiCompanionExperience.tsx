import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";
import imgProfile from "@/imports/Profile Image Full Size.webp";
import {
  KNOWLEDGE_SOURCES,
  INITIAL_SUB_INTENTS,
  RESEARCH_STEPS,
  KNOWLEDGE_QUIZ,
  SubIntent,
  ResearchStep,
} from "./nexusData";
import NexusSourceDrawer from "./NexusSourceDrawer";
import NexusDeliverableModal from "./NexusDeliverableModal";
import NexusTraditionalSearch from "./NexusTraditionalSearch";

interface AiCompanionExperienceProps {
  onClose: () => void;
}

export type NexusState =
  | "landing" // State 01: Landing screen
  | "traditional" // State 02: Traditional keyword search
  | "intent" // State 03: Intent understanding & query decomposition
  | "researching" // State 04: Agentic retrieval workspace
  | "results"; // State 05 & 06: Grounded results & conversational refinement

interface ChatMessage {
  id: string;
  sender: "user" | "nexus";
  text?: string;
  citationIds?: number[];
  isCustomFollowUp?: boolean;
}

export const AiCompanionExperience: React.FC<AiCompanionExperienceProps> = ({ onClose }) => {
  // Theme state persisted in localStorage
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nexus_theme_preference");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });
  const isDark = theme === "dark";

  const handleToggleTheme = () => {
    playClickSound();
    const next = isDark ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_theme_preference", next);
    }
  };

  // State Engine
  const [currentState, setCurrentState] = useState<NexusState>("landing");
  const [searchMode, setSearchMode] = useState<"ai" | "traditional">("ai");

  // Query & Input State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQueryText, setActiveQueryText] = useState(
    "What's the approved process for onboarding a new international vendor, what documents are required, and how long does approval usually take?"
  );

  // Intent Decomposition State (State 03)
  const [subIntents, setSubIntents] = useState<SubIntent[]>(INITIAL_SUB_INTENTS);
  const [isEditingQuery, setIsEditingQuery] = useState(false);
  const [queryDraft, setQueryDraft] = useState(activeQueryText);
  const [newSubIntentTitle, setNewSubIntentTitle] = useState("");

  // Research Progress State (State 04)
  const [researchSteps, setResearchSteps] = useState<ResearchStep[]>(RESEARCH_STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [discoveredSourceCount, setDiscoveredSourceCount] = useState(1);
  const [researchComplete, setResearchComplete] = useState(false);

  // Optional Engagement Module State (State 04)
  const [showEngagement, setShowEngagement] = useState(true);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizDismissed, setQuizDismissed] = useState(false);

  // Grounded Results & Conversation State (State 05 & 06)
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [followUpInput, setFollowUpInput] = useState("");

  // Modals & Drawers
  const [activeCitationId, setActiveCitationId] = useState<number | null>(null);
  const [isSourceDrawerOpen, setIsSourceDrawerOpen] = useState(false);
  const [isDeliverableOpen, setIsDeliverableOpen] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState<string | null>(null);

  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside results
  useEffect(() => {
    if (currentState === "results") {
      conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, currentState]);

  // Global ESC Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSourceDrawerOpen) {
          setIsSourceDrawerOpen(false);
          return;
        }
        if (isDeliverableOpen) {
          setIsDeliverableOpen(false);
          return;
        }
        if (showProfileCard) {
          setShowProfileCard(false);
          return;
        }
        playClickSound();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSourceDrawerOpen, isDeliverableOpen, showProfileCard, onClose]);

  // Trigger Research Animation Flow
  useEffect(() => {
    if (currentState !== "researching") return;

    let stepTimer: NodeJS.Timeout;
    let index = 0;

    const runNextStep = () => {
      if (index < RESEARCH_STEPS.length) {
        setCurrentStepIndex(index);
        setDiscoveredSourceCount(Math.min(7, index + 2));
        setResearchSteps((prev) =>
          prev.map((step, i) => {
            if (i < index) return { ...step, status: "completed" };
            if (i === index) return { ...step, status: "running" };
            return { ...step, status: "pending" };
          })
        );
        index++;
        stepTimer = setTimeout(runNextStep, 950);
      } else {
        setResearchSteps((prev) => prev.map((s) => ({ ...s, status: "completed" })));
        setDiscoveredSourceCount(7);
        setResearchComplete(true);
      }
    };

    runNextStep();

    return () => clearTimeout(stepTimer);
  }, [currentState]);

  // Handlers for Transitions
  const handleLaunchSearch = (promptText?: string) => {
    playClickSound();
    const query = promptText || searchQuery.trim() || activeQueryText;
    setActiveQueryText(query);
    setQueryDraft(query);
    setSearchQuery("");

    if (searchMode === "traditional") {
      setCurrentState("traditional");
      return;
    }

    // AI Search -> State 03 (Intent Understanding)
    setCurrentState("intent");
  };

  const handleExecuteResearch = () => {
    playClickSound();
    setResearchComplete(false);
    setCurrentStepIndex(0);
    setDiscoveredSourceCount(1);
    setCurrentState("researching");
  };

  const handleFinishResearch = () => {
    playClickSound();
    setCurrentState("results");
    setConversation([]);
  };

  const handleResetSearch = () => {
    playClickSound();
    setCurrentState("landing");
    setConversation([]);
    setSearchQuery("");
    setShowEngagement(true);
    setSelectedQuizOption(null);
    setQuizDismissed(false);
  };

  const handleOpenCitation = (id: number) => {
    playClickSound();
    setActiveCitationId(id);
    setIsSourceDrawerOpen(true);
  };

  const handleOpenSourceByCode = (code: string) => {
    playClickSound();
    const found = Object.values(KNOWLEDGE_SOURCES).find((s) => s.code === code);
    if (found) {
      setActiveCitationId(found.citationId);
      setIsSourceDrawerOpen(true);
    }
  };

  const handleSubIntentToggle = (id: string) => {
    playClickSound();
    setSubIntents((prev) =>
      prev.map((intent) => (intent.id === id ? { ...intent, isActive: !intent.isActive } : intent))
    );
  };

  const handleAddSubIntent = () => {
    if (!newSubIntentTitle.trim()) return;
    playClickSound();
    const newIntent: SubIntent = {
      id: `intent-${Date.now()}`,
      title: newSubIntentTitle.trim(),
      description: "Custom user-specified compliance or verification requirement",
      agentRole: "Compliance Researcher",
      targetSources: ["POL-IV-2026"],
      isActive: true,
    };
    setSubIntents((prev) => [...prev, newIntent]);
    setNewSubIntentTitle("");
  };

  // Conversational Refinement (State 06)
  const handleFollowUp = (question: string) => {
    playClickSound();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: question,
    };

    setConversation((prev) => [...prev, userMsg]);
    setFollowUpInput("");

    setTimeout(() => {
      let replyText = "";
      let citations: number[] = [];

      if (question.includes("Singapore")) {
        replyText =
          "**Singapore Regional Requirement Addendum (RPH-APAC-09 Section 3.4)**:\n\nFor entities incorporated in Singapore, suppliers must provide an authenticated **IRAS Certificate of Residence (COR)** to qualify for Double Taxation Agreement (DTA) withholding relief. Without this certificate, enterprise finance must withhold a default **15% withholding tax** at source. Payment rails default to FAST / PayNow in SGD unless telegraphic USD wire is contractually required.";
        citations = [5];
      } else if (question.includes("mandatory versus optional")) {
        replyText =
          "**Documentation Breakdown (Strict Legal Gate vs Optional)**:\n\n• **Mandatory Gates (Strict Legal Blockers)**: Form W-8BEN-E / Tax Residency Cert, Bank Ownership Letter (≤ 90 days), Certificate of Insurance with $2M general liability, and signed DPA.\n• **Optional / Conditional**: Vendor ESG Sustainability Survey, Secondary Minority/Diversity Certifications, and SOC 2 Type II reports (mandatory only if accessing enterprise customer data).";
        citations = [1, 3, 7];
      } else if (question.includes("finance approval requirements")) {
        replyText =
          "**Financial Authority Limits & Review Matrix (FIN-POL-108 Section 7.3)**:\n\n• **Tier 1 (< $50,000)**: Sourcing Manager sign-off.\n• **Tier 2 ($50,000 – $100,000)**: Category Lead & InfoSec review.\n• **Tier 3 ($100,000 – $500,000)**: Finance Director and Corporate Controller sign-off.\n• **Tier 4 (> $500,000)**: CFO executive signature.\n\n*Note*: All international wire remittances undergo an automated correspondent bank test prior to full activation.";
        citations = [4];
      } else if (question.includes("Compare the 2025 and 2026 policies")) {
        replyText =
          "**Key Changes between 2025 and 2026 Procurement Policies**:\n\n1. **Automated Sanctions Re-Check**: 2026 policy introduces continuous 30-day OFAC/EU re-checks rather than one-time annual verification.\n2. **Mandatory DPA**: All cross-border vendors now require a standardized Data Processing Addendum regardless of contract size.\n3. **Bank Letter Tightening**: Bank letters now expire after 90 days (shortened from 180 days in the 2025 guidelines) to curb invoice redirection fraud.";
        citations = [1, 2, 7];
      } else {
        replyText =
          `I analyzed that query against the 7 verified enterprise procurement documents. The policy framework confirms that all exceptions require dual sign-off from both Global Procurement Operations and the Corporate Controller.`;
        citations = [1, 4];
      }

      const nexusMsg: ChatMessage = {
        id: `nexus-${Date.now()}`,
        sender: "nexus",
        text: replyText,
        citationIds: citations,
      };

      setConversation((prev) => [...prev, nexusMsg]);
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] flex select-none overflow-hidden font-sans antialiased transition-colors duration-500 ${
        isDark ? "bg-[#090A0B] text-[#ECECED]" : "bg-[#FFFFFF] text-[#111111]"
      }`}
    >
      {/* ── AMBIENT SPATIAL LIGHTING (Locked Visual Reference Direction) ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Soft Cyan/Blue Ambient Glow (Mid-Left) */}
        <div
          className="absolute -top-[12%] -left-[12%] w-[58vw] h-[68vh] rounded-full transition-opacity duration-700"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(16, 78, 102, 0.22) 0%, rgba(8, 40, 55, 0.08) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(210, 242, 255, 0.7) 0%, rgba(228, 248, 255, 0.35) 50%, transparent 70%)",
            filter: "blur(65px)",
          }}
        />

        {/* Restrained Warm Amber-Orange Glow (Bottom-Right) */}
        <div
          className="absolute -bottom-[12%] -right-[8%] w-[52vw] h-[62vh] rounded-full transition-opacity duration-700"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(195, 95, 25, 0.18) 0%, rgba(125, 55, 15, 0.06) 45%, transparent 70%)"
              : "radial-gradient(circle, rgba(255, 235, 215, 0.7) 0%, rgba(255, 245, 235, 0.3) 45%, transparent 70%)",
            filter: "blur(65px)",
          }}
        />
      </div>

      {/* ── MINIMAL LEFT NAVIGATION RAIL (Locked Figma Reference) ── */}
      <aside className="relative z-20 flex flex-col justify-between items-center w-[54px] md:w-[62px] h-full py-4 shrink-0 border-r border-transparent">
        {/* Top App Control Group */}
        <div className="flex flex-col items-center gap-4">
          {/* Sidebar Toggle / Navigation Rail */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowNotificationToast("Sidebar menu collapsed for focused research.");
              setTimeout(() => setShowNotificationToast(null), 2500);
            }}
            onMouseEnter={playHoverTick}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? "text-[#8E8E93] hover:text-white hover:bg-white/5" : "text-[#555555] hover:text-black hover:bg-black/5"
            }`}
            title="Toggle Navigation Workspace"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>

          {/* New Search / Reset to State 01 */}
          <button
            type="button"
            onClick={handleResetSearch}
            onMouseEnter={playHoverTick}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              currentState === "landing"
                ? "text-[#EE6C13] bg-[#EE6C13]/10"
                : isDark
                ? "text-[#8E8E93] hover:text-white hover:bg-white/5"
                : "text-[#555555] hover:text-black hover:bg-black/5"
            }`}
            title="New Search (Reset to Landing)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>

          {/* Sources Explorer Icon */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsSourceDrawerOpen(true);
            }}
            onMouseEnter={playHoverTick}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? "text-[#8E8E93] hover:text-white hover:bg-white/5" : "text-[#555555] hover:text-black hover:bg-black/5"
            }`}
            title="Inspect 7 Enterprise Sources"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </button>

          {/* Deliverable Studio Shortcut 📑 */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsDeliverableOpen(true);
            }}
            onMouseEnter={playHoverTick}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? "text-[#8E8E93] hover:text-white hover:bg-white/5" : "text-[#555555] hover:text-black hover:bg-black/5"
            }`}
            title="Structured Deliverable Studio"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </button>
        </div>

        {/* Bottom Utility Group: Dual Theme Toggle & Avatar */}
        <div className="flex flex-col items-center gap-4">
          {/* Dual Theme Switcher (Sun in Dark, Crescent Moon in Light) */}
          <button
            type="button"
            onClick={handleToggleTheme}
            onMouseEnter={playHoverTick}
            className={`p-2 rounded-full transition-transform duration-200 hover:scale-110 cursor-pointer ${
              isDark ? "text-[#E5E5E7] hover:text-amber-300" : "text-[#111111] hover:text-[#555555]"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* User Profile Avatar with Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowProfileCard(!showProfileCard);
              }}
              className="w-7 h-7 rounded-full overflow-hidden border border-white/20 hover:border-[#EE6C13] transition-all cursor-pointer shadow-sm"
              title="Jayesh Soni"
            >
              <img src={imgProfile} alt="Jayesh Soni" className="w-full h-full object-cover" />
            </button>

            {showProfileCard && (
              <div
                className={`absolute left-10 bottom-0 w-60 p-4 rounded-2xl border shadow-2xl z-50 flex flex-col gap-2 ${
                  isDark ? "bg-[#16171A] border-white/10 text-white" : "bg-white border-black/10 text-[#111111]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={imgProfile} alt="Jayesh Soni" className="w-9 h-9 rounded-full object-cover border border-[#EE6C13]/40" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-xs leading-tight">Jayesh Soni</span>
                    <span className="text-[10px] opacity-70">Product Lead & AI Product Designer</span>
                  </div>
                </div>
                <div className="h-px bg-current opacity-10 my-1" />
                <p className="text-[10px] leading-relaxed opacity-75">
                  <strong>NEXUS Concept</strong> · Demonstrating enterprise search evolution into agentic, multi-source retrieval & verification.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onClose();
                  }}
                  className="w-full text-left text-xs font-semibold py-1 text-[#EE6C13] hover:underline cursor-pointer"
                >
                  ◂ Return to Portfolio (ESC)
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── TOP HEADER (Product Wordmark, Search Mode Selector & Return Pill) ── */}
      <header className="absolute top-4 left-[58px] md:left-[70px] right-4 md:right-8 z-30 flex items-center justify-between pointer-events-none">
        {/* Product Identity */}
        <div className="relative pointer-events-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#EE6C13] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              N
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`font-bold text-[14px] leading-tight tracking-wider ${isDark ? "text-white" : "text-[#111111]"}`}>
                  NEXUS
                </span>
                <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.2 rounded bg-[#EE6C13]/15 text-[#EE6C13] border border-[#EE6C13]/30">
                  Concept
                </span>
              </div>
              <span className={`text-[10px] ${isDark ? "text-[#8E8E93]" : "text-[#666666]"}`}>
                Enterprise Knowledge & Intelligence
              </span>
            </div>
          </div>

          {/* Mode Selector Pill: Traditional vs AI Search */}
          <div className={`hidden sm:flex items-center p-0.5 rounded-full border text-[11px] font-medium ml-3 ${
            isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
          }`}>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setSearchMode("ai");
                if (currentState === "traditional") {
                  setCurrentState("intent");
                }
              }}
              className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                searchMode === "ai"
                  ? "bg-[#EE6C13] text-white font-semibold shadow-xs"
                  : isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"
              }`}
            >
              ✦ AI Search
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setSearchMode("traditional");
                setCurrentState("traditional");
              }}
              className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                searchMode === "traditional"
                  ? "bg-[#EE6C13] text-white font-semibold shadow-xs"
                  : isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"
              }`}
            >
              🔍 Traditional
            </button>
          </div>
        </div>

        {/* Subtle Portfolio Return Button */}
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onClose();
          }}
          onMouseEnter={playHoverTick}
          className={`pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
            isDark
              ? "bg-white/5 hover:bg-white/15 border-white/10 text-white hover:scale-105"
              : "bg-black/5 hover:bg-black/10 border-black/10 text-black hover:scale-105"
          }`}
          title="Return to Portfolio (ESC)"
        >
          <span>◂ Portfolio</span>
          <span className={`hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded ${
            isDark ? "bg-white/10 text-white/70" : "bg-black/10 text-black/70"
          }`}>
            ESC
          </span>
        </button>
      </header>

      {/* ── NOTIFICATION TOAST ── */}
      <AnimatePresence>
        {showNotificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full border text-xs font-medium shadow-lg backdrop-blur-md ${
              isDark ? "bg-[#18191D] border-white/10 text-white" : "bg-white border-black/10 text-black"
            }`}
          >
            {showNotificationToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN WORKSPACE CONTENT CONTAINER ── */}
      <main className="relative z-10 flex-1 flex flex-col h-full overflow-hidden pl-2 pr-4 md:px-8 pt-20 pb-36">
        <div className="flex-1 overflow-y-auto max-w-4xl w-full mx-auto flex flex-col justify-start">
          {/* ========================================================================= */}
          {/* STATE 01 — SEARCH LANDING SCREEN */}
          {/* ========================================================================= */}
          {currentState === "landing" && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 my-auto animate-in fade-in zoom-in-95 duration-500">
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EE6C13]/10 border border-[#EE6C13]/30 text-[#EE6C13] text-xs font-semibold mb-6">
                <span>✦</span>
                <span>Enterprise Knowledge Search & Intelligence</span>
              </div>

              {/* Main Headline */}
              <h1 className={`text-3xl sm:text-5xl font-bold tracking-tight max-w-2xl leading-tight mb-4 ${
                isDark ? "text-white" : "text-[#111111]"
              }`}>
                What are you trying to find?
              </h1>

              {/* Supporting Subtext */}
              <p className={`text-sm sm:text-base max-w-xl leading-relaxed mb-8 ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}>
                Search across your organisation's knowledge. Ask a question, explore evidence, and get to grounded answers faster.
              </p>

              {/* Example Prompts Grid (State 01 Requirement) */}
              <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left mb-6">
                <button
                  type="button"
                  onClick={() =>
                    handleLaunchSearch(
                      "What's the approved process for onboarding a new international vendor, what documents are required, and how long does approval usually take?"
                    )
                  }
                  onMouseEnter={playHoverTick}
                  className={`p-3.5 rounded-2xl border text-xs transition-all text-left cursor-pointer group ${
                    isDark
                      ? "bg-white/[0.03] border-white/10 hover:border-[#EE6C13]/50 hover:bg-white/[0.06]"
                      : "bg-white border-black/10 hover:border-[#EE6C13]/50 hover:bg-neutral-50 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between text-[#EE6C13] font-semibold text-[11px] mb-1">
                    <span>✦ Primary Discovery Task</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className={`font-medium line-clamp-2 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                    "What's the approved process for onboarding a new international vendor, what documents are required, and how long does approval usually take?"
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleLaunchSearch("Compare the latest procurement policies (2025 vs 2026).")}
                  onMouseEnter={playHoverTick}
                  className={`p-3.5 rounded-2xl border text-xs transition-all text-left cursor-pointer group ${
                    isDark
                      ? "bg-white/[0.03] border-white/10 hover:border-[#EE6C13]/50 hover:bg-white/[0.06]"
                      : "bg-white border-black/10 hover:border-[#EE6C13]/50 hover:bg-neutral-50 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between text-[#EE6C13] font-semibold text-[11px] mb-1">
                    <span>Policy Comparison</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className={`font-medium line-clamp-2 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                    "Compare the latest procurement policies (2025 vs 2026 sanctions & DPA)."
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleLaunchSearch("What documents are required for vendor compliance?")}
                  onMouseEnter={playHoverTick}
                  className={`p-3.5 rounded-2xl border text-xs transition-all text-left cursor-pointer group ${
                    isDark
                      ? "bg-white/[0.03] border-white/10 hover:border-[#EE6C13]/50 hover:bg-white/[0.06]"
                      : "bg-white border-black/10 hover:border-[#EE6C13]/50 hover:bg-neutral-50 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between text-[#EE6C13] font-semibold text-[11px] mb-1">
                    <span>Compliance Checklist</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className={`font-medium line-clamp-2 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                    "What documents are required for vendor compliance and tax relief?"
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleLaunchSearch("Find the approval process for high-value purchases (> $100k).")}
                  onMouseEnter={playHoverTick}
                  className={`p-3.5 rounded-2xl border text-xs transition-all text-left cursor-pointer group ${
                    isDark
                      ? "bg-white/[0.03] border-white/10 hover:border-[#EE6C13]/50 hover:bg-white/[0.06]"
                      : "bg-white border-black/10 hover:border-[#EE6C13]/50 hover:bg-neutral-50 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between text-[#EE6C13] font-semibold text-[11px] mb-1">
                    <span>Financial Approval Matrix</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className={`font-medium line-clamp-2 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                    "Find the approval process and authority limits for purchases over $100,000 USD."
                  </p>
                </button>
              </div>

              {/* Fictional Knowledge Notice */}
              <p className={`text-[11px] ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                Independent UX Concept · Fictional Enterprise Knowledge Environment (Procurement Operations)
              </p>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STATE 02 — TRADITIONAL KEYWORD SEARCH */}
          {/* ========================================================================= */}
          {currentState === "traditional" && (
            <NexusTraditionalSearch
              query={activeQueryText}
              onQueryChange={setActiveQueryText}
              onSwitchToAiSearch={() => {
                setSearchMode("ai");
                setCurrentState("intent");
              }}
              onOpenSourceDoc={handleOpenSourceByCode}
              isDark={isDark}
            />
          )}

          {/* ========================================================================= */}
          {/* STATE 03 — INTENT UNDERSTANDING & DECOMPOSITION */}
          {/* ========================================================================= */}
          {currentState === "intent" && (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 py-4 animate-in fade-in duration-300">
              {/* Back breadcrumb */}
              <button
                type="button"
                onClick={() => setCurrentState("landing")}
                className={`self-start text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-black"
                }`}
              >
                <span>← Back to search prompt</span>
              </button>

              {/* Original Question Card (with Edit option) */}
              <div className={`p-5 rounded-3xl border transition-colors ${
                isDark ? "bg-[#141518] border-white/10" : "bg-white border-black/10 shadow-xs"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#EE6C13] uppercase tracking-wider">
                    Query Understanding Active
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setIsEditingQuery(!isEditingQuery);
                    }}
                    className="text-xs text-[#EE6C13] hover:underline font-semibold cursor-pointer"
                  >
                    {isEditingQuery ? "Cancel Edit" : "Edit Question"}
                  </button>
                </div>

                {isEditingQuery ? (
                  <div className="space-y-3">
                    <textarea
                      value={queryDraft}
                      onChange={(e) => setQueryDraft(e.target.value)}
                      rows={3}
                      className={`w-full p-3 rounded-xl text-sm border focus:outline-none focus:border-[#EE6C13] ${
                        isDark ? "bg-white/5 border-white/10 text-white" : "bg-neutral-50 border-neutral-300 text-black"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setActiveQueryText(queryDraft);
                        setIsEditingQuery(false);
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#EE6C13] text-white cursor-pointer"
                    >
                      Save Question
                    </button>
                  </div>
                ) : (
                  <h2 className="text-base sm:text-lg font-bold leading-snug">
                    "{activeQueryText}"
                  </h2>
                )}

                {/* System Interpretation */}
                <div className={`mt-3 pt-3 border-t flex items-start gap-2.5 text-xs ${
                  isDark ? "border-white/5 text-neutral-300" : "border-black/5 text-neutral-700"
                }`}>
                  <span className="text-[#EE6C13] font-bold text-sm shrink-0">✦</span>
                  <p className="leading-relaxed">
                    <strong>NEXUS Interpretation:</strong> I'll look across procurement policies, compliance requirements, and approval guidelines to find the complete onboarding process and identify any timeline conflicts.
                  </p>
                </div>
              </div>

              {/* Identified Sub-Intents Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <h3 className="font-bold uppercase tracking-wider text-[11px]">
                    Identified Search Intents ({subIntents.filter((i) => i.isActive).length} of {subIntents.length} active)
                  </h3>
                  <span className={`text-[11px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    Toggle to refine scope
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {subIntents.map((intent) => (
                    <div
                      key={intent.id}
                      onClick={() => handleSubIntentToggle(intent.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        intent.isActive
                          ? isDark
                            ? "bg-white/[0.04] border-[#EE6C13]/40 shadow-xs"
                            : "bg-white border-[#EE6C13]/40 shadow-xs"
                          : isDark
                          ? "bg-white/[0.01] border-white/5 opacity-50"
                          : "bg-neutral-50 border-neutral-200 opacity-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={intent.isActive}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 rounded text-[#EE6C13] accent-[#EE6C13] cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h4 className="font-semibold text-xs leading-tight">{intent.title}</h4>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            isDark ? "bg-white/10 text-neutral-300" : "bg-black/5 text-neutral-600"
                          }`}>
                            {intent.agentRole.split(" ")[0]}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                          isDark ? "text-neutral-400" : "text-neutral-500"
                        }`}>
                          {intent.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Sub-intent Input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newSubIntentTitle}
                    onChange={(e) => setNewSubIntentTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSubIntent()}
                    placeholder="Add custom sub-question or requirement..."
                    className={`flex-1 px-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#EE6C13] ${
                      isDark ? "bg-white/5 border-white/10 text-white placeholder-neutral-500" : "bg-neutral-50 border-neutral-300 text-black placeholder-neutral-400"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleAddSubIntent}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                  >
                    + Add Requirement
                  </button>
                </div>
              </div>

              {/* Continue Action Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                <span className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                  Human-in-the-loop: Scope validated by user
                </span>

                <button
                  type="button"
                  onClick={handleExecuteResearch}
                  onMouseEnter={playHoverTick}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold bg-[#EE6C13] hover:bg-[#d65f10] text-white transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Execute Research ({subIntents.filter((i) => i.isActive).length} Intents)</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STATE 04 — AGENTIC RETRIEVAL AND RESEARCH WORKSPACE */}
          {/* ========================================================================= */}
          {currentState === "researching" && (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 py-4 animate-in fade-in duration-300">
              {/* Header Status Bar */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                isDark ? "bg-[#141518] border-white/10" : "bg-white border-black/10 shadow-xs"
              }`}>
                <div className="flex items-center gap-3">
                  {/* Subtle pulsing assistant orb */}
                  <div className="relative w-8 h-8 rounded-full bg-[#EE6C13]/15 border border-[#EE6C13]/40 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EE6C13] animate-ping opacity-75" />
                    <span className="relative text-[11px] font-bold text-[#EE6C13]">✦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">
                      {researchComplete ? "Research Synthesised" : "Multi-Agent Knowledge Discovery Active"}
                    </h3>
                    <p className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      {researchComplete
                        ? "7 enterprise documents cross-examined · Citations grounded"
                        : "Querying procurement repositories, compliance gates & authority matrices"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#EE6C13]/15 text-[#EE6C13] border border-[#EE6C13]/30">
                    {discoveredSourceCount} Sources Found
                  </span>
                </div>
              </div>

              {/* Research Activity Steps */}
              <div className={`p-5 rounded-3xl border space-y-3 ${
                isDark ? "bg-[#101114] border-white/10" : "bg-white border-black/10 shadow-xs"
              }`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#EE6C13] mb-1">
                  Active Retrieval Pipeline
                </h4>

                <div className="space-y-2.5">
                  {researchSteps.map((step, idx) => (
                    <div
                      key={step.id}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                        step.status === "running"
                          ? "bg-[#EE6C13]/10 border-[#EE6C13]/40"
                          : step.status === "completed"
                          ? isDark ? "bg-white/[0.02] border-white/10" : "bg-neutral-50 border-neutral-200"
                          : isDark ? "border-transparent opacity-40" : "border-transparent opacity-40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${
                          step.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : step.status === "running"
                            ? "bg-[#EE6C13] text-white animate-pulse"
                            : "bg-white/5 text-neutral-500"
                        }`}>
                          {step.status === "completed" ? "✓" : idx + 1}
                        </span>
                        <div>
                          <span className="font-semibold block">{step.label}</span>
                          <span className={`text-[11px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                            {step.detail}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isDark ? "bg-white/10 text-neutral-300" : "bg-black/5 text-neutral-700"
                        }`}>
                          {step.agentRole}
                        </span>
                        <span className="text-[10px] font-mono text-[#EE6C13] font-semibold">
                          [{step.sourceCode}]
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement While Search Runs (Section 6 Requirement) */}
              {showEngagement && !quizDismissed && (
                <div className={`p-4 sm:p-5 rounded-3xl border transition-all ${
                  isDark
                    ? "bg-gradient-to-r from-blue-950/20 to-orange-950/20 border-white/10"
                    : "bg-gradient-to-r from-blue-50/60 to-orange-50/60 border-neutral-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">💡</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#EE6C13]">
                        Quick Knowledge Break (Optional)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuizDismissed(true)}
                      className={`text-xs opacity-60 hover:opacity-100 cursor-pointer ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      Skip / Dismiss
                    </button>
                  </div>

                  <p className="text-xs font-semibold mb-3">
                    {KNOWLEDGE_QUIZ.question}
                  </p>

                  <div className="grid grid-cols-1 gap-2 mb-3">
                    {KNOWLEDGE_QUIZ.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setSelectedQuizOption(opt.id);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                          selectedQuizOption === opt.id
                            ? opt.isCorrect
                              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-medium"
                              : "bg-rose-500/15 border-rose-500/40 text-rose-400 font-medium"
                            : isDark
                            ? "bg-white/5 border-white/10 hover:bg-white/10"
                            : "bg-white border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {selectedQuizOption && (
                    <p className={`text-xs p-3 rounded-xl border leading-relaxed ${
                      isDark ? "bg-white/5 border-white/10 text-neutral-300" : "bg-white border-neutral-200 text-neutral-700"
                    }`}>
                      {KNOWLEDGE_QUIZ.explanation}
                    </p>
                  )}
                </div>
              )}

              {/* Proceed to Grounded Results Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                  {researchComplete ? "All 6 retrieval stages completed" : "Processing background citations..."}
                </span>

                <button
                  type="button"
                  onClick={handleFinishResearch}
                  onMouseEnter={playHoverTick}
                  className={`px-6 py-3 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-2 ${
                    researchComplete
                      ? "bg-[#EE6C13] hover:bg-[#d65f10] text-white scale-105"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  <span>View Grounded Answers & Evidence</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STATE 05 & 06 — GROUNDED SEARCH RESULTS & CONVERSATIONAL REFINEMENT */}
          {/* ========================================================================= */}
          {currentState === "results" && (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 py-4 animate-in fade-in duration-300">
              {/* Result Header & Deliverables Action Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-semibold text-[#EE6C13] uppercase tracking-wider">
                      Synthesised from 7 Grounded Sources
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                    International Vendor Onboarding: What You Need to Know
                  </h1>
                </div>

                {/* Structured Deliverable Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setIsDeliverableOpen(true);
                    }}
                    onMouseEnter={playHoverTick}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EE6C13] hover:bg-[#d65f10] text-white transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <span>📑 Open Deliverable Studio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setIsSourceDrawerOpen(true);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                    }`}
                  >
                    Inspect All Sources [7]
                  </button>
                </div>
              </div>

              {/* Opening Summary */}
              <div className={`p-4 sm:p-5 rounded-2xl border text-sm leading-relaxed ${
                isDark ? "bg-[#141518] border-white/10 text-neutral-200" : "bg-neutral-50 border-neutral-200 text-neutral-800"
              }`}>
                <strong>Summary:</strong> International vendor onboarding requires procurement review, compliance verification, and finance approval before the vendor can be activated in the ERP system. Official policy specifies a 10-business-day standard SLA, though cross-border banking and wire testing can extend turnaround to 14 business days.{" "}
                <button
                  type="button"
                  onClick={() => handleOpenCitation(1)}
                  className="inline-flex items-center px-1.5 py-0.2 rounded text-[11px] font-bold text-[#EE6C13] hover:underline cursor-pointer"
                >
                  [1]
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenCitation(2)}
                  className="inline-flex items-center px-1.5 py-0.2 rounded text-[11px] font-bold text-[#EE6C13] hover:underline cursor-pointer"
                >
                  [2]
                </button>
              </div>

              {/* SECTION 1: Onboarding Process */}
              <section className="space-y-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#EE6C13]/15 text-[#EE6C13] flex items-center justify-center text-xs font-bold">1</span>
                  <span>Onboarding Process</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  The onboarding lifecycle follows a strict four-stage sequential gate:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-neutral-50 border-neutral-200"}`}>
                    <span className="font-semibold block mb-0.5">Stage 1: Intake & Registration</span>
                    <span className="opacity-75">Business sponsor registers Purchase Intent in portal (48h vendor SLA).</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-neutral-50 border-neutral-200"}`}>
                    <span className="font-semibold block mb-0.5">Stage 2: Compliance Screening</span>
                    <span className="opacity-75">AML, OFAC sanctions clearance, and corporate tax certification review.</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-neutral-50 border-neutral-200"}`}>
                    <span className="font-semibold block mb-0.5">Stage 3: Treasury & Wire Test</span>
                    <span className="opacity-75">Bank credential ownership authentication and correspondent testing.</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-neutral-50 border-neutral-200"}`}>
                    <span className="font-semibold block mb-0.5">Stage 4: ERP Master Record</span>
                    <span className="opacity-75">Operations unlocks Vendor Master record for PO issuance.</span>
                  </div>
                </div>
                <div className="pt-1 flex items-center gap-1.5 text-xs">
                  <span className="opacity-75">Sources:</span>
                  <button type="button" onClick={() => handleOpenCitation(1)} className="text-[#EE6C13] font-semibold hover:underline cursor-pointer">[1] POL-IV-2026</button>
                  <span>·</span>
                  <button type="button" onClick={() => handleOpenCitation(2)} className="text-[#EE6C13] font-semibold hover:underline cursor-pointer">[2] SOP-PR-04</button>
                </div>
              </section>

              {/* SECTION 2: Mandatory Documents */}
              <section className="space-y-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#EE6C13]/15 text-[#EE6C13] flex items-center justify-center text-xs font-bold">2</span>
                  <span>Mandatory Documentation</span>
                </h3>
                <ul className="list-disc list-inside text-xs sm:text-sm space-y-1.5 opacity-90 pl-1">
                  <li>
                    <strong>Form W-8BEN-E or Certificate of Tax Residence</strong> authenticated by the supplier's domestic authority.{" "}
                    <button type="button" onClick={() => handleOpenCitation(3)} className="text-[#EE6C13] font-bold hover:underline cursor-pointer">[3]</button>
                  </li>
                  <li>
                    <strong>Certificate of Incorporation</strong> or national commercial registry extract (certified English translation required).{" "}
                    <button type="button" onClick={() => handleOpenCitation(3)} className="text-[#EE6C13] font-bold hover:underline cursor-pointer">[3]</button>
                  </li>
                  <li>
                    <strong>Bank Account Verification Letter</strong> on official bank letterhead confirming account holder name, SWIFT/IBAN, dated within 90 days.{" "}
                    <button type="button" onClick={() => handleOpenCitation(3)} className="text-[#EE6C13] font-bold hover:underline cursor-pointer">[3]</button>
                  </li>
                  <li>
                    <strong>Certificate of Insurance (COI)</strong> naming the enterprise as an additional insured with $2,000,000 USD general aggregate liability.{" "}
                    <button type="button" onClick={() => handleOpenCitation(3)} className="text-[#EE6C13] font-bold hover:underline cursor-pointer">[3]</button>
                  </li>
                </ul>
              </section>

              {/* SECTION 3: Compliance Checks */}
              <section className="space-y-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#EE6C13]/15 text-[#EE6C13] flex items-center justify-center text-xs font-bold">3</span>
                  <span>Compliance & Security Verification</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  All international vendors undergo global sanctions checking (OFAC Specially Designated Nationals, EU Consolidated, and UN sanctions). If the supplier processes confidential information or PII, they must supply an unqualified SOC 2 Type II or ISO 27001 certificate along with an executed Data Processing Addendum (DPA).{" "}
                  <button type="button" onClick={() => handleOpenCitation(7)} className="text-[#EE6C13] font-bold hover:underline cursor-pointer">[7]</button>
                </p>
              </section>

              {/* SECTION 4: Approval Requirements */}
              <section className="space-y-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#EE6C13]/15 text-[#EE6C13] flex items-center justify-center text-xs font-bold">4</span>
                  <span>Approval Ownership by Spend Threshold</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  Financial sign-off follows the delegation of authority matrix in FIN-POL-108: Sourcing Managers sign up to $50k; Category Leads sign up to $100k; contracts exceeding <strong>$100,000 USD</strong> require Finance Director and Corporate Controller execution.{" "}
                  <button type="button" onClick={() => handleOpenCitation(4)} className="text-[#EE6C13] font-bold hover:underline cursor-pointer">[4]</button>
                </p>
              </section>

              {/* SECTION 5: Expected Timeline & SLA Policy Conflict Callout */}
              <section className="space-y-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#EE6C13]/15 text-[#EE6C13] flex items-center justify-center text-xs font-bold">5</span>
                  <span>Expected Timeline & Conflict Analysis</span>
                </h3>

                {/* Explicit Conflict Callout Box (Section 7 Trust State Requirement) */}
                <div className={`p-4 rounded-2xl border ${
                  isDark
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                    : "bg-amber-50 border-amber-300 text-amber-900"
                }`}>
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-xs uppercase tracking-wider">
                    <span>⚠️</span>
                    <span>Document Conflict Flagged: Official SLA vs Treasury Wire Timelines</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90 mb-2">
                    • <strong>Procurement SOP-PR-04</strong> cites a target SLA of <strong>10 business days</strong>.{" "}
                    <button type="button" onClick={() => handleOpenCitation(2)} className="font-bold text-[#EE6C13] hover:underline cursor-pointer">[2]</button>
                    <br />
                    • <strong>Finance Guidelines FIN-POL-108</strong> notes that cross-border wire tests and sanctions clearance routinely take up to <strong>14 business days</strong>.{" "}
                    <button type="button" onClick={() => handleOpenCitation(4)} className="font-bold text-[#EE6C13] hover:underline cursor-pointer">[4]</button>
                    <br />
                    • <strong>Empirical Benchmarks (CASE-HIST-884)</strong>: Across 342 onboardings in FY2026, the <strong>median completion duration was 12.4 business days</strong>.{" "}
                    <button type="button" onClick={() => handleOpenCitation(6)} className="font-bold text-[#EE6C13] hover:underline cursor-pointer">[6]</button>
                  </p>
                  <span className="text-[11px] font-semibold underline">
                    Recommendation: Advise stakeholders to plan for 12 to 14 business days.
                  </span>
                </div>
              </section>

              {/* SECTION 6: Important Regional Exceptions */}
              <section className="space-y-2">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#EE6C13]/15 text-[#EE6C13] flex items-center justify-center text-xs font-bold">6</span>
                  <span>Regional Exceptions & APAC Addendum</span>
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  Entities incorporated in Singapore require an IRAS Certificate of Residence to claim treaty withholding tax reductions. Failure to submit results in standard 15% withholding.{" "}
                  <button type="button" onClick={() => handleOpenCitation(5)} className="text-[#EE6C13] font-bold hover:underline cursor-pointer">[5]</button>
                </p>
              </section>

              {/* Conversational Follow-Up Prompts Strip (State 06) */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className={`text-[11px] uppercase tracking-wider font-semibold block ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}>
                  Suggested Follow-Up Refinements
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleFollowUp("What if the vendor is based in Singapore?")}
                    onMouseEnter={playHoverTick}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer border ${
                      isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-neutral-50 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    🇸🇬 What if the vendor is based in Singapore?
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFollowUp("Which documents are mandatory versus optional?")}
                    onMouseEnter={playHoverTick}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer border ${
                      isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-neutral-50 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    Which documents are mandatory versus optional?
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFollowUp("Show me the finance approval requirements.")}
                    onMouseEnter={playHoverTick}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer border ${
                      isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-neutral-50 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    Show me the finance approval requirements
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFollowUp("Compare the 2025 and 2026 policies.")}
                    onMouseEnter={playHoverTick}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer border ${
                      isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-neutral-50 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    Compare the 2025 and 2026 policies
                  </button>
                </div>
              </div>

              {/* Dynamic Conversation Stream (State 06 Follow-ups) */}
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col w-full ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  {msg.sender === "user" ? (
                    <div className={`rounded-2xl max-w-[85%] p-3.5 text-xs leading-relaxed ${
                      isDark ? "bg-[#25262B] text-white" : "bg-neutral-100 text-black"
                    }`}>
                      {msg.text}
                    </div>
                  ) : (
                    <div className={`w-full p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                      isDark ? "bg-[#141518] border-white/10 text-neutral-200" : "bg-white border-neutral-200 text-neutral-800"
                    }`}>
                      <div className="flex items-center gap-1.5 text-[#EE6C13] font-bold text-[11px] mb-1">
                        <span>✦ Grounded Refinement</span>
                      </div>
                      <div className="whitespace-pre-line">{msg.text}</div>
                      {msg.citationIds && msg.citationIds.length > 0 && (
                        <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                          <span className="text-[10px] opacity-70">Citations:</span>
                          {msg.citationIds.map((cid) => (
                            <button
                              key={cid}
                              type="button"
                              onClick={() => handleOpenCitation(cid)}
                              className="text-[#EE6C13] font-mono font-bold hover:underline cursor-pointer"
                            >
                              [{cid}]
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div ref={conversationEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* ── FLOATING BOTTOM SEARCH COMPOSER (Locked Visual Direction) ── */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-full max-w-[780px] px-4 z-40 flex flex-col items-center pointer-events-auto">
        <div
          className={`w-full rounded-[24px] md:rounded-[26px] p-3 md:p-3.5 px-4 md:px-5 backdrop-blur-2xl border transition-all duration-300 ${
            isDark ? "bg-[#111215]/90 border-white/10" : "bg-white/95 border-black/8"
          }`}
          style={{
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(70, 190, 220, 0.22), inset -1px -1px 0 rgba(238, 120, 30, 0.22)"
              : "0 14px 45px rgba(0,0,0,0.08), inset 0 1px 0 rgba(70, 190, 220, 0.25), inset -1px -1px 0 rgba(238, 120, 30, 0.25)",
          }}
        >
          {/* Top Row: Text Input */}
          <div className="w-full pb-2">
            <input
              type="text"
              value={currentState === "results" ? followUpInput : searchQuery}
              onChange={(e) => {
                if (currentState === "results") {
                  setFollowUpInput(e.target.value);
                } else {
                  setSearchQuery(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (currentState === "results") {
                    if (followUpInput.trim()) handleFollowUp(followUpInput.trim());
                  } else {
                    handleLaunchSearch();
                  }
                }
              }}
              placeholder={
                currentState === "results"
                  ? "Ask follow-up across sources (e.g. Singapore rules, wire SLAs)..."
                  : "Ask anything across your workspace..."
              }
              className={`w-full bg-transparent text-[14.5px] focus:outline-none transition-colors ${
                isDark ? "text-white placeholder-[#707075]" : "text-black placeholder-[#8E8E93]"
              }`}
            />
          </div>

          {/* Bottom Row: Context Action Pills & Circular Submit */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 md:gap-2">
              {/* + Action / Attachment */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowNotificationToast("Attachment filter: Procurement workspace active");
                  setTimeout(() => setShowNotificationToast(null), 2000);
                }}
                onMouseEnter={playHoverTick}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors cursor-pointer ${
                  isDark ? "bg-[#25262B] hover:bg-[#32333A] text-white" : "bg-[#EAEAEA] hover:bg-[#E0E0E2] text-black"
                }`}
                title="Filter Knowledge Scope"
              >
                +
              </button>

              {/* Mode indicator pill */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  const nextMode = searchMode === "ai" ? "traditional" : "ai";
                  setSearchMode(nextMode);
                  if (nextMode === "traditional") {
                    setCurrentState("traditional");
                  } else {
                    setCurrentState("intent");
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                  isDark ? "bg-[#25262B] hover:bg-[#32333A] text-[#E0E0E3]" : "bg-[#EAEAEA] hover:bg-[#E0E0E2] text-[#1A1A1A]"
                }`}
              >
                <span>{searchMode === "ai" ? "✦ AI Search" : "🔍 Traditional"}</span>
              </button>

              {/* Deliverable Studio Pill */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsDeliverableOpen(true);
                }}
                onMouseEnter={playHoverTick}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                  isDark ? "bg-[#25262B] hover:bg-[#32333A] text-[#E0E0E3]" : "bg-[#EAEAEA] hover:bg-[#E0E0E2] text-[#1A1A1A]"
                }`}
              >
                <span>📑 Deliverable</span>
              </button>

              {/* Sources Count Pill */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsSourceDrawerOpen(true);
                }}
                onMouseEnter={playHoverTick}
                className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-mono transition-all cursor-pointer ${
                  isDark ? "bg-[#25262B] hover:bg-[#32333A] text-[#E0E0E3]" : "bg-[#EAEAEA] hover:bg-[#E0E0E2] text-[#1A1A1A]"
                }`}
              >
                <span>Evidence [7]</span>
              </button>
            </div>

            {/* Circular Send Arrow */}
            <button
              type="button"
              onClick={() => {
                if (currentState === "results") {
                  if (followUpInput.trim()) handleFollowUp(followUpInput.trim());
                } else {
                  handleLaunchSearch();
                }
              }}
              onMouseEnter={playHoverTick}
              className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-sm transition-transform active:scale-95 cursor-pointer shadow-md ${
                isDark ? "bg-white text-black hover:bg-[#E0E0E0]" : "bg-black text-white hover:bg-neutral-800"
              }`}
              title="Search"
              aria-label="Submit search query"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Disclaimer Footer Text */}
        <p className={`text-[11px] text-center mt-2 font-normal transition-colors ${
          isDark ? "text-[#707075]" : "text-[#8E8E93]"
        }`}>
          AI can make mistakes, check important information.
        </p>
      </div>

      {/* ── SOURCE EVIDENCE INSPECTOR DRAWER ── */}
      <NexusSourceDrawer
        isOpen={isSourceDrawerOpen}
        activeCitationId={activeCitationId}
        onClose={() => setIsSourceDrawerOpen(false)}
        onSelectCitation={(cid) => setActiveCitationId(cid)}
        isDark={isDark}
      />

      {/* ── STRUCTURED DELIVERABLE STUDIO MODAL ── */}
      <NexusDeliverableModal
        isOpen={isDeliverableOpen}
        onClose={() => setIsDeliverableOpen(false)}
        onOpenSource={(cid) => {
          setIsDeliverableOpen(false);
          setActiveCitationId(cid);
          setIsSourceDrawerOpen(true);
        }}
        isDark={isDark}
      />
    </div>
  );
};

export default AiCompanionExperience;
