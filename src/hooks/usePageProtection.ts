import { useEffect, useState } from "react";

// DETACHABLE SETTING: Set to true to enable all screenshot, copy, and download protections.
// Set to false for development so you can screenshot, record, and inspect.
const ENABLE_PROTECTION = false;

export function usePageProtection() {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    if (!ENABLE_PROTECTION) return;

    // Add CSS protection class to body
    document.body.classList.add("protection-enabled");

    // 1. Prevent Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Prevent Drag Start on images/videos
    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLVideoElement) {
        e.preventDefault();
      }
    };

    // 3. Block Keyboard Shortcuts (DevTools, Save, Print, View Source)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      
      // A. Detect Screenshot Triggers to blur immediately
      // PrintScreen Key (Universal)
      if (e.key === "PrintScreen" || e.key === "Snapshot") {
        setIsBlurred(true);
        e.preventDefault();
        return false;
      }

      // Cmd + Shift (Mac screenshots: Cmd+Shift+3/4/5)
      // Win + Shift (Windows screenshots: Win+Shift+S)
      // Ctrl + Shift (Snipping tools / Inspector)
      if ((isMac && e.metaKey && e.shiftKey) || 
          (!isMac && e.metaKey && e.shiftKey) || 
          (e.ctrlKey && e.shiftKey)) {
        setIsBlurred(true);
      }

      // Block F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac) -> Open DevTools
      if ((e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) || 
          (isMac && e.metaKey && e.altKey && (e.key === "I" || e.key === "i"))) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+Shift+J (Windows) / Cmd+Option+J (Mac) -> Open DevTools Console
      if ((e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) || 
          (isMac && e.metaKey && e.altKey && (e.key === "J" || e.key === "j"))) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+U (Windows) / Cmd+Option+U (Mac) -> View Source
      if ((e.ctrlKey && (e.key === "U" || e.key === "u")) ||
          (isMac && e.metaKey && e.altKey && (e.key === "U" || e.key === "u"))) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+S (Windows) / Cmd+S (Mac) -> Save Page
      if ((e.ctrlKey && (e.key === "S" || e.key === "s")) || 
          (isMac && e.metaKey && (e.key === "S" || e.key === "s"))) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+P (Windows) / Cmd+P (Mac) -> Print Page
      if ((e.ctrlKey && (e.key === "P" || e.key === "p")) || 
          (isMac && e.metaKey && (e.key === "P" || e.key === "p"))) {
        e.preventDefault();
        return false;
      }
    };

    // 4. Release blur when keys are released
    const handleKeyUp = (e: KeyboardEvent) => {
      // If they release Cmd, Win, Ctrl or Shift, we can check if they are still holding screenshot keys
      if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
        setIsBlurred(false);
      }
    };

    // 5. Blur page when window loses focus (e.g. Snipping tool / Screenshot focus)
    const handleBlur = () => {
      setIsBlurred(true);
    };

    const handleFocus = () => {
      setIsBlurred(false);
    };

    // Attach listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    // Clean up
    return () => {
      document.body.classList.remove("protection-enabled");
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return ENABLE_PROTECTION ? isBlurred : false;
}
