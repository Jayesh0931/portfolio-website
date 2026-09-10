import { useEffect } from "react";

export const triggerAutoScroll = (e?: React.MouseEvent | MouseEvent) => {
  const detail = e
    ? { clientX: e.clientX, clientY: e.clientY }
    : undefined;
  window.dispatchEvent(new CustomEvent("start-auto-scroll", { detail }));
};

export function useAutoScroll() {
  useEffect(() => {
    let animId: number | null = null;
    let isAutoScrolling = false;
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const stopAutoScroll = () => {
      if (!isAutoScrolling) return;
      isAutoScrolling = false;
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("wheel", handleUserInteraction, true);
      window.removeEventListener("touchstart", handleUserInteraction, true);
      window.removeEventListener("touchmove", handleUserInteraction, true);
      window.removeEventListener("keydown", handleUserInteraction, true);
      window.removeEventListener("mousedown", handleMouseDown, true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isAutoScrolling) return;
      const now = performance.now();
      // Grace period of 150ms to ignore initial mouse movement from the click itself
      if (now - startTime < 150) return;

      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
      if (dist > 5) {
        stopAutoScroll();
      }
    };

    const handleMouseDown = () => {
      const now = performance.now();
      if (now - startTime < 150) return;
      stopAutoScroll();
    };

    const handleUserInteraction = () => {
      stopAutoScroll();
    };

    const startAutoScroll = (initialPos?: { clientX?: number; clientY?: number }) => {
      stopAutoScroll();

      isAutoScrolling = true;
      startTime = performance.now();
      startX = initialPos && typeof initialPos.clientX === "number" ? initialPos.clientX : 0;
      startY = initialPos && typeof initialPos.clientY === "number" ? initialPos.clientY : 0;

      let lastTimestamp = performance.now();
      let accumulatedScroll = window.scrollY;
      const speedPixelsPerSecond = 207; // Smooth readable auto-scroll speed (~207px/s, increased by 15%)

      const step = (timestamp: number) => {
        if (!isAutoScrolling) return;

        const dt = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        // Cap dt to prevent massive jumps on frame lag or tab switching
        const clampedDt = Math.min(dt, 0.1);
        accumulatedScroll += speedPixelsPerSecond * clampedDt;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (accumulatedScroll >= maxScroll - 2) {
          window.scrollTo(0, maxScroll);
          stopAutoScroll();
          return;
        }

        window.scrollTo(0, accumulatedScroll);
        animId = requestAnimationFrame(step);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("pointermove", handleMouseMove);
      window.addEventListener("wheel", handleUserInteraction, { capture: true, passive: true });
      window.addEventListener("touchstart", handleUserInteraction, { capture: true, passive: true });
      window.addEventListener("touchmove", handleUserInteraction, { capture: true, passive: true });
      window.addEventListener("keydown", handleUserInteraction, { capture: true });
      window.addEventListener("mousedown", handleMouseDown, { capture: true });

      animId = requestAnimationFrame(step);
    };

    const handleStartEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ clientX?: number; clientY?: number }>;
      startAutoScroll(customEvent.detail);
    };

    window.addEventListener("start-auto-scroll", handleStartEvent);

    return () => {
      stopAutoScroll();
      window.removeEventListener("start-auto-scroll", handleStartEvent);
    };
  }, []);
}
