// High-definition acoustic sound effects engine for ice freeze, crack, and shatter.
// Uses authentic studio foley audio samples preloaded into Web Audio API buffers with zero latency.

let audioCtx: AudioContext | null = null;

const audioBuffers: {
  freeze: AudioBuffer | null;
  crack: AudioBuffer | null;
  shatter: AudioBuffer | null;
} = {
  freeze: null,
  crack: null,
  shatter: null,
};

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx || audioCtx.state === "closed") {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Preload real audio files into memory buffers for instantaneous playback
async function preloadBuffer(key: "freeze" | "crack" | "shatter", url: string): Promise<void> {
  try {
    const ctx = getContext();
    if (!ctx) return;
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    audioBuffers[key] = await ctx.decodeAudioData(arrayBuffer);
  } catch {
    // If decoding or fetch fails, will gracefully fall back to HTML5 Audio
  }
}

let hasPreloaded = false;

// Preload real audio buffers only after initial user interaction or on-demand
export function lazyPreloadIceAudio(): void {
  if (hasPreloaded || typeof window === "undefined") return;
  hasPreloaded = true;
  preloadBuffer("freeze", "/sounds/ice_freeze.mp3");
  preloadBuffer("crack", "/sounds/ice_crack.mp3");
  preloadBuffer("shatter", "/sounds/ice_shatter.mp3");
}

if (typeof window !== "undefined") {
  const triggerLazy = () => {
    lazyPreloadIceAudio();
    window.removeEventListener("pointerdown", triggerLazy);
    window.removeEventListener("keydown", triggerLazy);
    window.removeEventListener("scroll", triggerLazy);
  };
  window.addEventListener("pointerdown", triggerLazy, { once: true, passive: true });
  window.addEventListener("keydown", triggerLazy, { once: true, passive: true });
  window.addEventListener("scroll", triggerLazy, { once: true, passive: true });
}

function playBuffer(
  key: "freeze" | "crack" | "shatter",
  volume = 1.0,
  fallbackUrl: string
): void {
  const ctx = getContext();

  if (ctx && audioBuffers[key]) {
    try {
      const source = ctx.createBufferSource();
      source.buffer = audioBuffers[key];
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start(0);
      return;
    } catch {
      // Fall through to HTMLAudioElement
    }
  }

  // Fallback to HTML5 Audio Element
  try {
    const audio = new Audio(fallbackUrl);
    audio.volume = Math.min(1.0, Math.max(0, volume));
    audio.play().catch(() => {});
  } catch {
    // Ignore autoplay or audio policy errors
  }
}

/**
 * Phase 1: Real Freezing & Cryogenic Frost Wind Sound
 * Genuine acoustic recording of sub-zero crystallization sweep and frost wind.
 */
export function playFreezeAudio(): void {
  playBuffer("freeze", 1.0, "/sounds/ice_freeze.mp3");
}

/**
 * Phase 2: Real Structural Ice Crack Sound
 * Violent, sharp acoustic ice fracture snap and tension release.
 */
export function playCrackAudio(): void {
  playBuffer("crack", 1.0, "/sounds/ice_crack.mp3");
}

/**
 * Phase 3: Real Glass & Ice Shatter Down Crash
 * Colossal concussive glass impact, fractured ice burst, and falling crystal debris.
 */
export function playShatterAudio(): void {
  playBuffer("shatter", 1.0, "/sounds/ice_shatter.mp3");
}
