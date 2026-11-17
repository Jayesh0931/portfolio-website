import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";
import { KNOWLEDGE_SOURCES, KnowledgeSource } from "./nexusData";

interface NexusSourceDrawerProps {
  isOpen: boolean;
  activeCitationId: number | null;
  onClose: () => void;
  onSelectCitation: (citationId: number) => void;
  isDark: boolean;
}

export const NexusSourceDrawer: React.FC<NexusSourceDrawerProps> = ({
  isOpen,
  activeCitationId,
  onClose,
  onSelectCitation,
  isDark,
}) => {
  const source = activeCitationId
    ? KNOWLEDGE_SOURCES[String(activeCitationId)] || KNOWLEDGE_SOURCES["1"]
    : KNOWLEDGE_SOURCES["1"];

  const allSources = Object.values(KNOWLEDGE_SOURCES);

  const getTrustBadge = (state: KnowledgeSource["trustState"]) => {
    switch (state) {
      case "verified":
        return {
          bg: isDark ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700",
          icon: "✓",
        };
      case "multi-source":
        return {
          bg: isDark ? "bg-sky-500/15 border-sky-500/30 text-sky-400" : "bg-sky-50 border-sky-200 text-sky-700",
          icon: "☵",
        };
      case "conflict":
        return {
          bg: isDark ? "bg-amber-500/20 border-amber-500/40 text-amber-300" : "bg-amber-50 border-amber-300 text-amber-800",
          icon: "⚠",
        };
      case "requires-human":
        return {
          bg: isDark ? "bg-purple-500/15 border-purple-500/30 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700",
          icon: "✦",
        };
    }
  };

  const badgeStyle = getTrustBadge(source.trustState);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="fixed inset-0 z-[10010] bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Pane */}
          <motion.aside
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className={`fixed top-0 right-0 bottom-0 z-[10020] w-full max-w-[500px] flex flex-col shadow-2xl border-l backdrop-blur-2xl overflow-hidden transition-colors ${
              isDark
                ? "bg-[#101114]/98 border-white/10 text-white"
                : "bg-white/98 border-black/10 text-[#111111]"
            }`}
          >
            {/* Drawer Header */}
            <div className={`p-4 md:p-5 border-b flex items-center justify-between shrink-0 ${
              isDark ? "border-white/10" : "border-black/10"
            }`}>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-[#EE6C13]/15 border border-[#EE6C13]/30 flex items-center justify-center text-[#EE6C13] font-bold text-xs">
                  [{source.citationId}]
                </span>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">Source Evidence Inspector</h3>
                  <p className={`text-[11px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    Verifiable enterprise source record
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                onMouseEnter={playHoverTick}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isDark ? "hover:bg-white/10 text-neutral-400 hover:text-white" : "hover:bg-black/5 text-neutral-500 hover:text-black"
                }`}
                title="Close Source Inspector (ESC)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Source Navigation Tabs / Chips */}
            <div className={`px-4 py-2.5 border-b flex items-center gap-1.5 overflow-x-auto shrink-0 ${
              isDark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-black/[0.02]"
            }`}>
              {allSources.map((s) => {
                const isActive = s.citationId === source.citationId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      onSelectCitation(s.citationId);
                    }}
                    onMouseEnter={playHoverTick}
                    className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[#EE6C13] text-white font-bold shadow-xs scale-105"
                        : isDark
                        ? "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                        : "bg-black/5 text-neutral-600 hover:text-black hover:bg-black/10"
                    }`}
                  >
                    [{s.citationId}] {s.code}
                  </button>
                );
              })}
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
              {/* Document Identity Banner */}
              <div className={`p-4 rounded-xl border ${
                isDark ? "bg-white/[0.03] border-white/10" : "bg-neutral-50 border-neutral-200"
              }`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#EE6C13]/15 text-[#EE6C13] border border-[#EE6C13]/30">
                    {source.code}
                  </span>
                  <span className={`text-[11px] font-mono ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    Match {source.relevanceScore}%
                  </span>
                </div>

                <h2 className="text-base font-bold leading-snug mb-2">
                  {source.title}
                </h2>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <span className={`text-[10px] uppercase tracking-wider block ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      Location
                    </span>
                    <span className="font-medium">{source.section} (Page {source.page})</span>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase tracking-wider block ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      Last Updated
                    </span>
                    <span className="font-medium">{source.lastUpdated}</span>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase tracking-wider block ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      Owner Department
                    </span>
                    <span className="font-medium">{source.department}</span>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase tracking-wider block ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      Jurisdiction
                    </span>
                    <span className="font-medium">{source.jurisdiction}</span>
                  </div>
                </div>
              </div>

              {/* Trust & Verification State */}
              <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${badgeStyle.bg}`}>
                <span className="text-base font-bold shrink-0 mt-0.5">{badgeStyle.icon}</span>
                <div className="flex-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Trust State: {source.trustLabel}
                  </h4>
                  {source.trustState === "conflict" && (
                    <p className="text-xs opacity-90 leading-relaxed mt-1">
                      <strong>Policy Disagreement:</strong> Procurement SLA targets 10 business days, while Treasury & Finance guidelines specify up to 14 business days due to international correspondent banking delays.
                    </p>
                  )}
                  {source.trustState === "verified" && (
                    <p className="text-xs opacity-90 leading-relaxed mt-1">
                      Primary verified enterprise standard operating document. Signed off by Enterprise Risk Management.
                    </p>
                  )}
                  {source.trustState === "requires-human" && (
                    <p className="text-xs opacity-90 leading-relaxed mt-1">
                      Regional tax treaty exemptions require human review of certified IRAS Certificate of Residence.
                    </p>
                  )}
                </div>
              </div>

              {/* Supporting Excerpt */}
              <div>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}>
                  <span>✦ Grounding Evidence (Direct Excerpt)</span>
                </h4>
                <blockquote className={`p-3.5 rounded-xl border-l-4 border-l-[#EE6C13] text-xs leading-relaxed italic ${
                  isDark ? "bg-white/[0.04] text-neutral-200" : "bg-neutral-50 text-neutral-800"
                }`}>
                  "{source.excerpt}"
                </blockquote>
              </div>

              {/* Full Context Section */}
              <div>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}>
                  Document Context Snippet
                </h4>
                <div className={`p-3.5 rounded-xl text-xs leading-relaxed font-sans border ${
                  isDark ? "bg-[#0b0c0e] border-white/5 text-neutral-300" : "bg-white border-neutral-200 text-neutral-700"
                }`}>
                  {source.fullSnippet}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className={`p-4 border-t flex items-center justify-between shrink-0 ${
              isDark ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-black/[0.02]"
            }`}>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    const prevId = source.citationId > 1 ? source.citationId - 1 : allSources.length;
                    onSelectCitation(prevId);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                  }`}
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    const nextId = source.citationId < allSources.length ? source.citationId + 1 : 1;
                    onSelectCitation(nextId);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                  }`}
                >
                  Next →
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  navigator.clipboard?.writeText(
                    `[${source.citationId}] ${source.title} (${source.code}), ${source.section}, p. ${source.page}`
                  );
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#EE6C13] hover:bg-[#d65f10] text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Copy Citation</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default NexusSourceDrawer;
