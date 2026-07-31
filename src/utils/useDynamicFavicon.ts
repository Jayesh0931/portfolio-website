import { useEffect } from "react";

export function updateFavicon(forceLightStroke?: boolean) {
  if (typeof document === "undefined") return;

  const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useLightStroke = forceLightStroke !== undefined ? forceLightStroke : prefersDark;
  const strokeColor = useLightStroke ? "#FFFDFA" : "#190b00";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>
    .dashed { stroke: ${strokeColor}; }
    @media (prefers-color-scheme: dark) {
      .dashed { stroke: #FFFDFA !important; }
    }
  </style>
  <circle cx="38" cy="50" r="30" fill="#EE6C13" />
  <circle class="dashed" cx="62" cy="50" r="27" fill="none" stroke-width="4.5" stroke-dasharray="6 4" />
</svg>`;

  const encodedSvg = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  let linkEl = document.getElementById("favicon-svg") as HTMLLinkElement | null;
  if (!linkEl) {
    linkEl = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
  }

  if (linkEl) {
    linkEl.type = "image/svg+xml";
    linkEl.href = encodedSvg;
  }
}

export function useDynamicFavicon() {
  useEffect(() => {
    // Initial calculation respecting OS/Browser dark mode
    updateFavicon();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      updateFavicon();
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    const handlePageThemeChange = (e: Event) => {
      const customEv = e as CustomEvent<{ isDark: boolean }>;
      if (customEv.detail && typeof customEv.detail.isDark === "boolean") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        // If system is dark, always keep light stroke for browser tab visibility.
        // Otherwise, match the section theme.
        updateFavicon(prefersDark ? true : customEv.detail.isDark);
      }
    };

    window.addEventListener("page-theme-change", handlePageThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("page-theme-change", handlePageThemeChange);
    };
  }, []);
}
