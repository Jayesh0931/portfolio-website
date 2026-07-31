import { useEffect } from "react";

export function updateFavicon(forceLightStroke?: boolean) {
  if (typeof document === "undefined") return;

  const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useLightStroke = forceLightStroke !== undefined ? forceLightStroke : prefersDark;
  const strokeColor = useLightStroke ? "#FFFDFA" : "#190B00";

  const svg = `<svg width="231" height="154" viewBox="0 0 231 154" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .dashed { stroke: ${strokeColor}; }
    @media (prefers-color-scheme: dark) {
      .dashed { stroke: #FFFDFA !important; }
    }
  </style>
  <circle class="dashed" cx="69.3004" cy="77.0004" r="63.9102" transform="rotate(-180 69.3004 77.0004)" stroke-width="10.78" stroke-dasharray="18.48 18.48"/>
  <circle cx="154.001" cy="77.0003" r="77.0002" transform="rotate(-180 154.001 77.0003)" fill="#EE6C13"/>
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
