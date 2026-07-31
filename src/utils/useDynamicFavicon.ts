import { useEffect } from "react";

export function updateFavicon(isDarkBackground: boolean) {
  if (typeof document === "undefined") return;

  const strokeColor = isDarkBackground ? "#FFFDFA" : "#190b00";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="38" cy="50" r="30" fill="#EE6C13" />
  <circle cx="62" cy="50" r="27" fill="none" stroke="${strokeColor}" stroke-width="4" stroke-dasharray="6 4" />
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
    // 1. Initial system preference check
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent | MediaQueryList) => {
      updateFavicon(e.matches);
    };

    handleSystemChange(mediaQuery);
    mediaQuery.addEventListener("change", handleSystemChange);

    // 2. Listen to custom page section dark-mode events
    const handlePageThemeChange = (e: Event) => {
      const customEv = e as CustomEvent<{ isDark: boolean }>;
      if (customEv.detail && typeof customEv.detail.isDark === "boolean") {
        updateFavicon(customEv.detail.isDark);
      }
    };

    window.addEventListener("page-theme-change", handlePageThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("page-theme-change", handlePageThemeChange);
    };
  }, []);
}
