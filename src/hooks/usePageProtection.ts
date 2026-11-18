import { useEffect, useState } from "react";

// PAGE PROTECTION: Set to false to disable all screenshot, copy, and download protections.
// Permanently disabled for production.
const ENABLE_PROTECTION = false;

export function usePageProtection() {
  const [isBlurred] = useState(false);

  useEffect(() => {
    // Ensure any leftover protection classes are cleared
    document.body.classList.remove("protection-enabled");
  }, []);

  return isBlurred;
}
