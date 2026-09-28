import React from "react";

interface ScrollToTopButtonProps {
  show: boolean;
  onClick: () => void;
  className?: string;
}

export default function ScrollToTopButton({ show, onClick, className = "" }: ScrollToTopButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Scroll to top"
      className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[999] w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-[#fffdfa] text-[#190b00] border border-[#7b7a77] shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-[#ee6c13] hover:text-white hover:border-[#ee6c13] hover:scale-110 active:scale-95 cursor-pointer ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      } ${className}`}
    >
      <svg className="w-5 h-5 md:w-6 md:h-6 stroke-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
