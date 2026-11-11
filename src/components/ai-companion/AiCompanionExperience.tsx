import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface AiCompanionExperienceProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  timestamp: string;
  text?: string;
  type?: "standard" | "clarification" | "plan_execution" | "review_card" | "outcome_card";
  steps?: { title: string; desc: string; done: boolean }[];
  options?: { id: string; label: string; cap: string }[];
  selectedOptionId?: string;
  reviewData?: {
    total: number;
    cap: number;
    copay: number;
    beneficiary: string;
    approved: boolean;
  };
}

const RECENT_CHATS = [
  { id: "chat-1", title: "Parental health check-up claim", date: "Just now", active: true },
  { id: "chat-2", title: "Annual wellness allowance FY25–26", date: "Yesterday", active: false },
  { id: "chat-3", title: "Dental diagnostic coverage policy", date: "3 days ago", active: false },
];

const SUGGESTED_PROMPTS = [
  "Check whether parents' annual health check-up is covered and calculate reimbursement",
  "Calculate remaining wellness allowance under FY25–26 Standard Tier",
  "Prepare draft reimbursement claim for ₹9,200 Apollo Diagnostics panel",
];

export const AiCompanionExperience: React.FC<AiCompanionExperienceProps> = ({ onClose }) => {
  // Theme: Dark (default) / Light
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isDark = theme === "dark";

  // Sidebar toggle for mobile/desktop
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isAgentWorking, setIsAgentWorking] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [claimAmount, setClaimAmount] = useState<number>(9200);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAgentWorking]);

  // Keyboard shortcut: ESC to exit to portfolio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playClickSound();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Start fresh chat
  const handleNewChat = () => {
    playClickSound();
    setMessages([]);
    setInputText("");
    setIsAgentWorking(false);
    setClaimAmount(9200);
  };

  // User submits a prompt
  const handleSendMessage = (textToSend?: string) => {
    const prompt = (textToSend || inputText).trim();
    if (!prompt || isAgentWorking) return;

    playClickSound();
    const userMsgId = `user-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: prompt,
      timestamp: "Just now",
      type: "standard",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsAgentWorking(true);

    // Agent workflow simulation: Planning & Clarification
    setTimeout(() => {
      const planMsgId = `assistant-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: planMsgId,
          sender: "assistant",
          timestamp: "Just now",
          type: "clarification",
          text: "I've reviewed your request and cross-referenced the Enterprise Benefits Handbook. Before I calculate the final reimbursement and assemble your claim package, please confirm the applicable coverage tier:",
          steps: [
            { title: "Dependent Eligibility", desc: "Dependent father (age 64) verified in HR registry", done: true },
            { title: "Policy Schedule", desc: "Located Section 4.2 (Annual Preventive Health Check-Up)", done: true },
            { title: "Reimbursement Cap", desc: "Awaiting tier selection to lock allowable ceiling", done: false },
          ],
          options: [
            { id: "tier-2", label: "Standard Full-Time Employee (Recommended)", cap: "₹8,000 / yr" },
            { id: "tier-senior", label: "Parent Senior Citizen Voluntary Add-On", cap: "₹12,000 / yr" },
            { id: "tier-1", label: "Senior Executive Health Plan", cap: "₹15,000 / yr" },
          ],
        },
      ]);
      setIsAgentWorking(false);
    }, 1500);
  };

  // User selects an option inside the chat stream
  const handleSelectOption = (msgId: string, optionId: string, optionLabel: string) => {
    playClickSound();

    // Mark option as selected in the previous message
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, selectedOptionId: optionId } : m))
    );

    // Add user confirmation turn
    setMessages((prev) => [
      ...prev,
      {
        id: `user-reply-${Date.now()}`,
        sender: "user",
        text: optionLabel,
        timestamp: "Just now",
        type: "standard",
      },
    ]);

    setIsAgentWorking(true);

    // Assistant prepares the review dossier card
    setTimeout(() => {
      const reviewMsgId = `assistant-review-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: reviewMsgId,
          sender: "assistant",
          timestamp: "Just now",
          type: "review_card",
          text: "Under the Standard Full-Time Employee tier, parental preventive check-ups are 100% eligible up to ₹8,000 per financial year. Here is the compiled claim summary ready for your sign-off:",
          steps: [
            { title: "Eligibility Confirmed", desc: "Dependent parent age > 60 verified", done: true },
            { title: "Cap Calculated", desc: "Applied ₹8,000 annual ceiling", done: true },
            { title: "Dossier Compiled", desc: "Itemized tax invoice & doctor prescription attached", done: true },
          ],
          reviewData: {
            total: claimAmount,
            cap: 8000,
            copay: Math.max(0, claimAmount - 8000),
            beneficiary: "Ramakant Soni (Father, Age 64)",
            approved: false,
          },
        },
      ]);
      setIsAgentWorking(false);
    }, 1600);
  };

  // User approves the draft package in chat
  const handleApproveDraft = (msgId: string) => {
    playClickSound();

    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && m.reviewData
          ? { ...m, reviewData: { ...m.reviewData, approved: true } }
          : m
      )
    );

    // Add Outcome turn
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `outcome-${Date.now()}`,
          sender: "assistant",
          timestamp: "Just now",
          type: "outcome_card",
          text: "Claim Package Approved. The dossier has been generated and is ready for submission to your Employee Self-Service (ESS) Benefits Portal.",
        },
      ]);
    }, 400);
  };

  const handleDownloadDossier = () => {
    playClickSound();
    const data = {
      title: "Human-Controlled AI Companion — Claim Dossier",
      beneficiary: "Ramakant Soni (Father, Age 64)",
      policy: "Enterprise Benefits FY2025–26 (§ 4.2)",
      totalInvoice: claimAmount,
      eligibleReimbursement: Math.min(claimAmount, 8000),
      patientCoPay: Math.max(0, claimAmount - 8000),
      status: "Ready for Employee Portal Submission",
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Claim_Package_Dossier.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    playClickSound();
    const summary = `CLAIM PACKAGE PREPARED
Beneficiary: Ramakant Soni (Father, Age 64)
Total Invoice: ₹${claimAmount.toLocaleString()}
Eligible Reimbursement: ₹8,000 (Max Cap)
Patient Co-Pay: ₹${Math.max(0, claimAmount - 8000).toLocaleString()}
Status: Verified & Ready for Portal Submission.`;
    navigator.clipboard.writeText(summary);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <div
      className={`fixed inset-0 z-[10000] flex select-none overflow-hidden font-sans antialiased transition-colors duration-500 ${
        isDark ? "bg-[#190B00] text-[#FFFDFA]" : "bg-[#FBF8F4] text-[#190B00]"
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          LEFT PANEL / SIDEBAR (Gemini Style)
          ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`h-full border-r flex flex-col justify-between shrink-0 overflow-hidden z-40 transition-colors duration-500 ${
              isDark ? "bg-[#140800] border-[#7b7a77]/25" : "bg-[#F4ECE1] border-[#190B00]/10"
            }`}
          >
            {/* Top: Branding & New Chat */}
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#EE6C13] font-bold text-base">✦</span>
                  <span className="font-['Outfit',sans-serif] font-bold text-sm tracking-tight">
                    AI Companion
                  </span>
                </div>
                {/* Close toggle button on mobile */}
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className={`md:hidden p-1 rounded-md text-xs cursor-pointer ${
                    isDark ? "text-[#A89D91] hover:text-[#FFFDFA]" : "text-[#77695D] hover:text-[#190B00]"
                  }`}
                >
                  ✕
                </button>
              </div>

              {/* New Chat Button */}
              <button
                type="button"
                onClick={handleNewChat}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#EE6C13] hover:bg-[#d95a08] text-[#FFFDFA] font-['Outfit',sans-serif] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                <span>+</span>
                <span>New Chat</span>
              </button>

              {/* Recent Conversations List */}
              <div className="flex flex-col gap-1.5 mt-2">
                <span className={`text-[10px] font-['Outfit',sans-serif] font-bold uppercase tracking-wider px-2 ${
                  isDark ? "text-[#7b7a77]" : "text-[#8c8278]"
                }`}>
                  Recent Activity
                </span>
                {RECENT_CHATS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      if (c.id === "chat-1" && messages.length === 0) {
                        handleSendMessage(SUGGESTED_PROMPTS[0]);
                      }
                    }}
                    className={`flex flex-col text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                      c.active && messages.length > 0
                        ? "bg-[#EE6C13]/15 text-[#EE6C13] font-semibold border border-[#EE6C13]/30"
                        : isDark
                        ? "text-[#A89D91] hover:bg-[#FFFDFA]/5 hover:text-[#FFFDFA]"
                        : "text-[#77695D] hover:bg-[#190B00]/5 hover:text-[#190B00]"
                    }`}
                  >
                    <span className="truncate">{c.title}</span>
                    <span className="text-[10px] opacity-60 font-mono mt-0.5">{c.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Theme Switcher & Portfolio Exit */}
            <div className={`p-4 border-t flex flex-col gap-2.5 ${
              isDark ? "border-[#7b7a77]/20" : "border-[#190B00]/10"
            }`}>
              {/* Theme Toggle Pill */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setTheme(isDark ? "light" : "dark");
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                  isDark
                    ? "bg-[#FFFDFA]/5 hover:bg-[#FFFDFA]/10 border-[#7b7a77]/30 text-[#A89D91]"
                    : "bg-white hover:bg-[#FFFDFA] border-[#190B00]/10 text-[#77695D]"
                }`}
              >
                <span>Theme Mode</span>
                <span className="font-semibold text-[#EE6C13]">
                  {isDark ? "☾ Dark" : "☼ Light"}
                </span>
              </button>

              {/* Exit to Portfolio Button */}
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-['Outfit',sans-serif] font-semibold cursor-pointer transition-all ${
                  isDark
                    ? "border-[#7b7a77]/30 text-[#FFFDFA] hover:border-[#EE6C13] hover:text-[#EE6C13]"
                    : "border-[#190B00]/15 text-[#190B00] hover:border-[#EE6C13] hover:text-[#EE6C13]"
                }`}
              >
                <span>◂ Return to Portfolio</span>
                <span className="text-[9px] font-mono opacity-50 px-1 py-0.2 bg-black/10 rounded">ESC</span>
              </button>

              {/* User profile indicator */}
              <div className="flex items-center gap-2 pt-1 px-1">
                <div className="w-6 h-6 rounded-full bg-[#EE6C13] text-white flex items-center justify-center text-[10px] font-bold">
                  JS
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold leading-none">Jayesh Soni</span>
                  <span className="text-[10px] opacity-60">Optum Agentic UX</span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONVERSATIONAL CANVAS
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Floating App Bar */}
        <header
          className={`h-14 px-4 md:px-6 flex items-center justify-between border-b shrink-0 z-30 transition-colors duration-500 ${
            isDark ? "bg-[#190B00]/90 border-[#7b7a77]/20" : "bg-[#FBF8F4]/90 border-[#190B00]/10"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Sidebar toggle button */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setSidebarOpen(!sidebarOpen);
              }}
              className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                isDark
                  ? "bg-[#FFFDFA]/5 hover:bg-[#FFFDFA]/10 border-[#7b7a77]/30 text-[#A89D91]"
                  : "bg-white hover:bg-[#FFFDFA] border-[#190B00]/10 text-[#77695D]"
              }`}
              title="Toggle sidebar"
            >
              ☰
            </button>

            <span className="font-['Outfit',sans-serif] font-bold text-sm tracking-tight">
              {messages.length === 0 ? "New Conversation" : "Parental Health Claim Assistant"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EE6C13]/10 text-[#EE6C13] border border-[#EE6C13]/25">
              <span>✦</span>
              <span>Human-in-the-Loop</span>
            </span>

            {/* Subtle Close button */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                isDark ? "text-[#A89D91] hover:text-[#FFFDFA]" : "text-[#77695D] hover:text-[#190B00]"
              }`}
              title="Close"
            >
              ✕
            </button>
          </div>
        </header>

        {/* ── CHAT MESSAGE STREAM / LANDING SCREEN ── */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 flex flex-col justify-start">
          {/* LANDING SCREEN (If no messages yet, like Gemini/Claude home) */}
          {messages.length === 0 ? (
            <div className="my-auto max-w-2xl mx-auto w-full flex flex-col items-center text-center gap-8 py-6">
              {/* Gemini-Inspired Clean Greeting */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-[#EE6C13]/15 border border-[#EE6C13]/30 flex items-center justify-center text-[#EE6C13] text-xl font-bold mb-2">
                  ✦
                </div>
                <h1 className="font-['Outfit',sans-serif] font-bold text-3xl md:text-4xl tracking-tight leading-tight">
                  Hello, Jayesh.
                </h1>
                <p className={`font-['Outfit',sans-serif] text-base md:text-lg font-medium max-w-md ${
                  isDark ? "text-[#A89D91]" : "text-[#77695D]"
                }`}>
                  How can I help you navigate your enterprise benefits today?
                </p>
              </div>

              {/* "Continue where you left off" Card */}
              <div
                onClick={() => handleSendMessage(SUGGESTED_PROMPTS[0])}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between text-left cursor-pointer transition-all duration-200 group ${
                  isDark
                    ? "bg-[#21130A] hover:bg-[#2A180D] border-[#EE6C13]/30 hover:border-[#EE6C13]"
                    : "bg-white hover:bg-[#FFFDF8] border-[#190B00]/10 hover:border-[#EE6C13]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EE6C13]/10 text-[#EE6C13] flex items-center justify-center text-sm font-bold">
                    📋
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#EE6C13]">
                      Continue where you left off
                    </span>
                    <span className="font-['Outfit',sans-serif] font-bold text-sm">
                      Check annual preventive diagnostics for parents & prepare claim
                    </span>
                  </div>
                </div>
                <span className="text-[#EE6C13] text-sm group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>

              {/* 3 Quick Prompt Chips */}
              <div className="w-full flex flex-col gap-2 text-left">
                <span className={`text-[10px] font-['Outfit',sans-serif] font-bold uppercase tracking-wider px-1 ${
                  isDark ? "text-[#7b7a77]" : "text-[#8c8278]"
                }`}>
                  Suggested Scenarios
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isDark
                          ? "bg-[#FFFDFA]/5 hover:bg-[#EE6C13]/10 border-[#7b7a77]/25 hover:border-[#EE6C13]/50 text-[#A89D91] hover:text-[#FFFDFA]"
                          : "bg-white hover:bg-[#EE6C13]/10 border-[#190B00]/10 hover:border-[#EE6C13]/50 text-[#77695D] hover:text-[#190B00]"
                      }`}
                    >
                      <span className="text-[#EE6C13] text-xs">✦</span>
                      <span className="line-clamp-2 leading-relaxed">{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* CONVERSATION THREAD (All turns, thoughts, clarifications, review, outcome) */
            <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 py-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  {/* Sender Label */}
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] font-semibold opacity-60">
                    <span>{msg.sender === "user" ? "You" : "✦ AI Companion"}</span>
                    <span>·</span>
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                  </div>

                  {/* USER MESSAGE BUBBLE */}
                  {msg.sender === "user" && (
                    <div className="max-w-[85%] md:max-w-[75%] p-3.5 px-4 rounded-2xl rounded-tr-xs bg-[#EE6C13] text-[#FFFDFA] font-medium text-sm leading-relaxed shadow-sm">
                      {msg.text}
                    </div>
                  )}

                  {/* ASSISTANT MESSAGE BUBBLE & INTERACTIVE MODULES */}
                  {msg.sender === "assistant" && (
                    <div
                      className={`max-w-[95%] md:max-w-[85%] p-5 rounded-2xl rounded-tl-xs border flex flex-col gap-4 text-sm leading-relaxed shadow-xs ${
                        isDark
                          ? "bg-[#21130A] border-[#EE6C13]/20"
                          : "bg-white border-[#190B00]/10"
                      }`}
                    >
                      {/* Agent Step Breakdown (Collapsible Gemini-Style Reasoning) */}
                      {msg.steps && (
                        <div
                          className={`p-3 rounded-xl border text-xs flex flex-col gap-2 ${
                            isDark ? "bg-[#140800] border-[#7b7a77]/25" : "bg-[#FBF8F4] border-[#190B00]/10"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-['Outfit',sans-serif] font-bold text-[#EE6C13] text-[11px] uppercase tracking-wider">
                            <span>✦</span>
                            <span>Agent Reasoning & Steps:</span>
                          </div>
                          <div className="flex flex-col gap-1.5 pl-1">
                            {msg.steps.map((st, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className={st.done ? "text-[#EE6C13] font-bold" : "text-gray-400"}>
                                  {st.done ? "✓" : "○"}
                                </span>
                                <div>
                                  <strong className="font-semibold">{st.title}:</strong>{" "}
                                  <span className={isDark ? "text-[#A89D91]" : "text-[#77695D]"}>
                                    {st.desc}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Conversational Text */}
                      <p>{msg.text}</p>

                      {/* INTERACTIVE CLARIFICATION OPTIONS (State 02 directly inside chat) */}
                      {msg.type === "clarification" && msg.options && (
                        <div className="flex flex-col gap-2 pt-1">
                          {msg.options.map((opt) => {
                            const isChosen = msg.selectedOptionId === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                disabled={Boolean(msg.selectedOptionId)}
                                onClick={() => handleSelectOption(msg.id, opt.id, opt.label)}
                                className={`p-3 rounded-xl border flex items-center justify-between text-left text-xs transition-all ${
                                  isChosen
                                    ? "bg-[#EE6C13] text-[#FFFDFA] border-[#EE6C13] font-semibold"
                                    : msg.selectedOptionId
                                    ? "opacity-40 cursor-not-allowed border-transparent"
                                    : isDark
                                    ? "bg-[#FFFDFA]/5 hover:bg-[#EE6C13]/15 border-[#7b7a77]/30 hover:border-[#EE6C13] cursor-pointer"
                                    : "bg-[#FBF8F4] hover:bg-white border-[#190B00]/10 hover:border-[#EE6C13] cursor-pointer"
                                }`}
                              >
                                <span>{opt.label}</span>
                                <span className="font-mono font-bold">{opt.cap}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* INTERACTIVE REVIEW CARD (State 05 directly inside chat) */}
                      {msg.type === "review_card" && msg.reviewData && (
                        <div
                          className={`p-4 rounded-xl border flex flex-col gap-4 ${
                            isDark ? "bg-[#140800] border-[#EE6C13]/30" : "bg-[#FBF8F4] border-[#EE6C13]/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-['Outfit',sans-serif] font-bold text-xs uppercase tracking-wider text-[#EE6C13]">
                              Claim Review Dossier
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                msg.reviewData.approved
                                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-[#EE6C13]/10 text-[#EE6C13] border border-[#EE6C13]/30"
                              }`}
                            >
                              {msg.reviewData.approved ? "✓ Approved" : "Awaiting Approval"}
                            </span>
                          </div>

                          {/* Financial Metrics */}
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className={`p-2.5 rounded-lg border ${isDark ? "bg-[#FFFDFA]/5 border-[#7b7a77]/20" : "bg-white border-[#190B00]/10"}`}>
                              <span className="text-[10px] opacity-60 block">Total Bill</span>
                              <span className="font-bold text-base">₹{msg.reviewData.total.toLocaleString()}</span>
                            </div>
                            <div className="p-2.5 rounded-lg border bg-[#EE6C13]/10 border-[#EE6C13]/30 text-[#EE6C13]">
                              <span className="text-[10px] font-semibold block">Policy Cap</span>
                              <span className="font-bold text-base">₹8,000</span>
                            </div>
                            <div className={`p-2.5 rounded-lg border ${isDark ? "bg-[#FFFDFA]/5 border-[#7b7a77]/20" : "bg-white border-[#190B00]/10"}`}>
                              <span className="text-[10px] opacity-60 block">Your Co-Pay</span>
                              <span className="font-bold text-base">₹{msg.reviewData.copay.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="text-xs opacity-75">
                            <strong>Beneficiary:</strong> {msg.reviewData.beneficiary}
                          </div>

                          {/* Approval Button inside Chat */}
                          {!msg.reviewData.approved && (
                            <button
                              type="button"
                              onClick={() => handleApproveDraft(msg.id)}
                              className="w-full py-2.5 rounded-xl bg-[#EE6C13] hover:bg-[#d95a08] text-[#FFFDFA] font-['Outfit',sans-serif] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm text-center"
                            >
                              Approve Package & Deliver Dossier ✓
                            </button>
                          )}
                        </div>
                      )}

                      {/* OUTCOME DELIVERED ACTIONS */}
                      {msg.type === "outcome_card" && (
                        <div className="flex flex-wrap gap-2.5 pt-2">
                          <button
                            type="button"
                            onClick={handleDownloadDossier}
                            className="px-4 py-2 rounded-xl bg-[#EE6C13] hover:bg-[#d95a08] text-[#FFFDFA] font-['Outfit',sans-serif] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                          >
                            Download Dossier (.JSON)
                          </button>
                          <button
                            type="button"
                            onClick={handleCopySummary}
                            className={`px-3.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                              isDark
                                ? "bg-[#FFFDFA]/5 hover:bg-[#FFFDFA]/10 border-[#7b7a77]/30 text-[#FFFDFA]"
                                : "bg-white hover:bg-[#FBF8F4] border-[#190B00]/15 text-[#190B00]"
                            }`}
                          >
                            {copiedToast ? "✓ Copied!" : "Copy Formatted Text"}
                          </button>
                          <button
                            type="button"
                            onClick={handleNewChat}
                            className={`px-3 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                              isDark ? "text-[#A89D91] hover:text-[#FFFDFA]" : "text-[#77695D] hover:text-[#190B00]"
                            }`}
                          >
                            Start New Query →
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Working Indicator */}
              {isAgentWorking && (
                <div className="flex items-center gap-2 px-2 py-1 text-xs text-[#EE6C13] font-medium animate-pulse">
                  <span>✦</span>
                  <span>Agent is retrieving policy clauses and calculating parameters...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── PERSISTENT BOTTOM INPUT BAR (Gemini / Claude Style) ── */}
        <div
          className={`p-4 md:p-6 border-t shrink-0 transition-colors duration-500 ${
            isDark ? "bg-[#190B00] border-[#7b7a77]/20" : "bg-[#FBF8F4] border-[#190B00]/10"
          }`}
        >
          <div className="max-w-3xl mx-auto w-full">
            <div
              className={`flex items-center gap-2 p-2 px-3.5 rounded-2xl border transition-all duration-200 ${
                isDark
                  ? "bg-[#21130A] border-[#EE6C13]/30 focus-within:border-[#EE6C13] shadow-[0_6px_25px_rgba(0,0,0,0.4)]"
                  : "bg-white border-[#190B00]/15 focus-within:border-[#EE6C13] shadow-[0_6px_25px_rgba(0,0,0,0.04)]"
              }`}
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isAgentWorking}
                placeholder="Ask anything about employee benefits, parental coverage, or claim ceilings..."
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder-[#A89D91]"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isAgentWorking}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  inputText.trim() && !isAgentWorking
                    ? "bg-[#EE6C13] text-[#FFFDFA] hover:bg-[#d95a08] shadow-sm"
                    : "opacity-40 bg-[#7b7a77]/20 text-[#A89D91] cursor-not-allowed"
                }`}
                title="Send"
              >
                ↑
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 px-1 text-[10.5px] opacity-60 font-['DM_Mono',monospace]">
              <span>Human-Controlled AI Prototype · Optum Agentic Search Concept</span>
              <span>Press ↵ to send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiCompanionExperience;
