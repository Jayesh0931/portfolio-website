import { useState, useEffect } from "react";
import { isSoundEnabled, toggleSound } from "@/utils/soundEffects";

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className = "" }: SoundToggleProps) {
  const [enabled, setEnabled] = useState(isSoundEnabled);

  useEffect(() => {
    const onToggle = (e: Event) => {
      setEnabled((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener("sound-toggle", onToggle);
    return () => window.removeEventListener("sound-toggle", onToggle);
  }, []);

  const handleClick = () => {
    const next = toggleSound();
    setEnabled(next);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={enabled ? "Mute tactile sound effects" : "Enable tactile sound effects"}
      title={enabled ? "Sound: ON (Tactile audio enabled)" : "Sound: OFF"}
      className={`group relative flex items-center justify-center rounded-full border border-[#7b7a77]/60 bg-[#FFFDFA]/90 text-[#190b00] backdrop-blur-md transition-all duration-300 hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${className}`}
      style={{
        width: "36px",
        height: "36px",
      }}
    >
      {enabled ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#190b00] transition-colors group-hover:text-[#fffdfa]"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#77695d] transition-colors group-hover:text-[#fffdfa]"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
