import React, { useState } from "react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";
import { TRADITIONAL_DOCS, TraditionalDoc } from "./nexusData";

interface NexusTraditionalSearchProps {
  query: string;
  onQueryChange: (q: string) => void;
  onSwitchToAiSearch: () => void;
  onOpenSourceDoc: (code: string) => void;
  isDark: boolean;
}

export const NexusTraditionalSearch: React.FC<NexusTraditionalSearchProps> = ({
  query,
  onQueryChange,
  onSwitchToAiSearch,
  onOpenSourceDoc,
  isDark,
}) => {
  const [selectedDept, setSelectedDept] = useState("All");
  const [sortBy, setSortBy] = useState<"relevance" | "date">("relevance");

  const departments = ["All", "Global Procurement", "Procurement Ops", "Risk & Compliance", "Treasury", "APAC Procurement"];

  const filteredDocs = TRADITIONAL_DOCS.filter((doc) => {
    if (selectedDept !== "All" && doc.department !== selectedDept) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "relevance") return b.matchScore - a.matchScore;
    return 0;
  });

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-4 animate-in fade-in duration-300">
      {/* Mode Switch Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isDark ? "bg-white/[0.03] border-white/10" : "bg-neutral-50 border-neutral-200"
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
            🔍
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight">Traditional Keyword Search Active</h3>
            <p className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
              Showing exact indexed matches. Want AI intent decomposition & synthesized answers?
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onSwitchToAiSearch();
          }}
          onMouseEnter={playHoverTick}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#EE6C13] hover:bg-[#d65f10] text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs shrink-0"
        >
          <span>✦ Switch to AI Agentic Search</span>
        </button>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Department Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <span className={`text-[11px] uppercase tracking-wider font-semibold mr-1 ${
            isDark ? "text-neutral-400" : "text-neutral-500"
          }`}>
            Department:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedDept(dept);
              }}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer shrink-0 ${
                selectedDept === dept
                  ? "bg-[#EE6C13] text-white font-medium"
                  : isDark
                  ? "bg-white/5 text-neutral-400 hover:text-white"
                  : "bg-black/5 text-neutral-600 hover:text-black"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className={`text-[11px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>Sort:</span>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSortBy(sortBy === "relevance" ? "date" : "relevance");
            }}
            className={`px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
              isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
            }`}
          >
            {sortBy === "relevance" ? "Highest Match %" : "Most Recent"}
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs px-1">
          <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>
            Found {filteredDocs.length} indexed documents matching "{query || "international vendor onboarding"}"
          </span>
          <span className="font-mono text-[11px] text-[#EE6C13]">
            Indexed in 0.04s
          </span>
        </div>

        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all hover:scale-[1.005] ${
              isDark
                ? "bg-[#141518] border-white/10 hover:border-white/20"
                : "bg-white border-black/10 hover:border-black/20 shadow-xs"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  {doc.code}
                </span>
                <span className={`text-[11px] ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                  {doc.type} · {doc.department}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {doc.matchScore}% Match
                </span>
              </div>
            </div>

            <h4 className="text-sm sm:text-base font-bold mb-1 hover:text-[#EE6C13] transition-colors cursor-pointer"
                onClick={() => {
                  playClickSound();
                  onOpenSourceDoc(doc.code);
                }}
            >
              {doc.title}
            </h4>

            {/* Snippet with highlights */}
            <p
              className={`text-xs leading-relaxed mb-3 ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
              dangerouslySetInnerHTML={{ __html: doc.highlightSnippet }}
            />

            <div className={`flex items-center justify-between text-[11px] pt-2 border-t ${
              isDark ? "border-white/5 text-neutral-400" : "border-black/5 text-neutral-500"
            }`}>
              <span>Updated: {doc.date} · File: {doc.size}</span>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onOpenSourceDoc(doc.code);
                }}
                className="text-[#EE6C13] hover:underline font-semibold cursor-pointer"
              >
                Inspect Source Document →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NexusTraditionalSearch;
