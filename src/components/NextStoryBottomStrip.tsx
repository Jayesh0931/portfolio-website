import React from "react";

interface NextStoryBottomStripProps {
  onNextStory?: () => void;
  defaultNextPath: string;
  isDark?: boolean;
}

export default function NextStoryBottomStrip({ onNextStory, defaultNextPath, isDark = false }: NextStoryBottomStripProps) {
  return (
    <div style={{
      height: 80,
      width: "100%",
      backgroundColor: isDark ? "#130800" : "#FFFDFA",
      borderTop: isDark ? "1px solid #2C2117" : "1px solid #7b7a77",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      zIndex: 10,
    }}>
      <div
        onClick={() => {
          if (onNextStory) {
            onNextStory();
          } else {
            window.dispatchEvent(new CustomEvent("navigate-to-path", { detail: defaultNextPath }));
            window.scrollTo(0, 0);
          }
        }}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
        className={isDark
          ? "hover:bg-[#FFFDFA] hover:text-[#190b00] hover:border-[#FFFDFA] bg-[#190b00] border border-[#7b7a77] border-solid flex gap-[10px] h-[40px] items-center justify-center px-[24px] rounded-[110px] shadow-sm transition-all duration-200 group"
          : "hover:bg-[#190b00] hover:text-[#fffdfa] hover:border-[#190b00] bg-[#fffdfa] border border-[#7b7a77] border-solid flex gap-[10px] h-[40px] items-center justify-center px-[24px] rounded-[110px] shadow-sm transition-all duration-200 group"
        }
      >
        <span className={isDark
          ? "font-outfit font-black text-[#FFFDFA] group-hover:text-[#190b00] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200"
          : "font-outfit font-black text-[#190b00] group-hover:text-[#fffdfa] text-[14px] tracking-[0.56px] uppercase whitespace-nowrap transition-colors duration-200"
        }>
          Go to Next Story
        </span>
        <svg className="size-[14px]" fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2.5L10.5 7.5L5 12.5" className={isDark ? "stroke-[#FFFDFA] group-hover:stroke-[#190B00] transition-colors duration-200" : "stroke-[#190B00] group-hover:stroke-[#FFFDFA] transition-colors duration-200"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
