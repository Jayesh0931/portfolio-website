import React, { useState, useRef, useEffect, useId } from "react";
import { playClickSound, playHoverTick } from "@/utils/soundEffects";

interface MethodologyTooltipProps {
  label: string;
  title: string;
  children: React.ReactNode;
  isDark?: boolean;
}

export default function MethodologyTooltip({
  label,
  title,
  children,
  isDark = true,
}: MethodologyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  // Close on Click Outside or Escape Key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playClickSound();
    if (isOpen && isPinned) {
      setIsOpen(false);
      setIsPinned(false);
    } else {
      setIsOpen(true);
      setIsPinned(true);
    }
  };

  const handleMouseEnter = () => {
    playHoverTick();
    if (!isPinned) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setIsOpen(false);
    setIsPinned(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block mt-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle Editorial Disclosure Link */}
      <button
        type="button"
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={tooltipId}
        className="group inline-flex items-center gap-1.5 font-outfit text-[13.5px] font-semibold text-[#EE6C13] hover:text-[#ff8533] underline decoration-[#EE6C13]/50 underline-offset-4 hover:decoration-[#EE6C13] transition-colors cursor-pointer bg-transparent border-0 p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EE6C13]"
      >
        <span>{label}</span>
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          id={tooltipId}
          role="dialog"
          aria-label={title}
          className={`absolute z-50 left-0 bottom-full mb-3 w-[360px] sm:w-[440px] md:w-[480px] max-w-[calc(100vw-2.5rem)] rounded-none shadow-2xl p-5 md:p-6 transition-all duration-200 animate-in fade-in zoom-in-95 ${
            isDark
              ? "bg-[#140801] border border-white/20 text-[#FFFDFA]"
              : "bg-[#fffdfa] border border-[#7b7a77] text-[#190b00]"
          }`}
          style={{
            boxShadow: isDark
              ? "0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : "0 20px 40px -10px rgba(25, 11, 0, 0.25), 0 0 0 1px rgba(123, 122, 119, 0.2)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Area */}
          <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-white/10">
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-[1.5px] text-[#EE6C13] font-bold block mb-1">
                METHODOLOGY & RATIONALE
              </span>
              <h3 className="font-outfit font-black text-[17px] md:text-[18px] leading-tight m-0 text-current">
                {title}
              </h3>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close explanation"
              className={`size-6 rounded-none flex items-center justify-center shrink-0 text-xs transition-colors cursor-pointer border ${
                isDark
                  ? "border-white/15 text-[#a89f96] hover:text-white hover:bg-white/10"
                  : "border-[#7b7a77]/30 text-[#7a7065] hover:text-[#190b00] hover:bg-black/5"
              }`}
            >
              ✕
            </button>
          </div>

          {/* Structured Content Area */}
          <div className="text-[13px] md:text-[13.5px] leading-[1.65] font-outfit text-current">
            {children}
          </div>

          {/* Bottom Anchor Notch */}
          <div
            className={`absolute left-6 -bottom-1.5 size-3 rotate-45 border-r border-b ${
              isDark ? "bg-[#140801] border-white/20" : "bg-[#fffdfa] border-[#7b7a77]"
            }`}
          />
        </div>
      )}
    </div>
  );
}
