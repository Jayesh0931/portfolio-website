import React, { useState, useEffect } from "react";

export default function FilmGrain() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only run expensive SVG turbulence shader on desktop with fine mouse pointer
    // Protects mobile/tablet Safari WebProcess from memory limits and thermal throttling
    const isFine = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsDesktop(Boolean(isFine && window.innerWidth >= 1024));
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[999990] select-none overflow-hidden"
      style={{
        opacity: 0.055,
        mixBlendMode: "multiply",
      }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="film-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain-filter)" />
      </svg>
    </div>
  );
}
