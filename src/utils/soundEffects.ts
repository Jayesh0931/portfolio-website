/**
 * Tactile Micro-Audio Engine (Web Audio API)
 * Synthesizes crisp, mechanical haptic micro-sounds entirely in code (0 KB audio downloads).
 * Gracefully respects browser autoplay policies and user mute preferences.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Initialize preference from localStorage if available
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("portfolio_sound_enabled");
  if (saved !== null) {
    soundEnabled = saved === "true";
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const isSoundEnabled = (): boolean => soundEnabled;

export const setSoundEnabled = (enabled: boolean): void => {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_sound_enabled", String(enabled));
    window.dispatchEvent(new CustomEvent("sound-toggle", { detail: enabled }));
  }
};

export const toggleSound = (): boolean => {
  const next = !soundEnabled;
  setSoundEnabled(next);
  if (next) {
    playClickSound(true);
  }
  return next;
};

/**
 * Gentle tactile click/thud for buttons, cards, and navigation.
 */
export function playClickSound(force = false): void {
  if (!soundEnabled && !force) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Subtle wooden/mechanical tactile click
    osc.type = "sine";
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.024);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  } catch {
    // Ignore audio errors
  }
}

/**
 * Micro tick for interactive hovers (pills, bento cards).
 */
export function playHoverTick(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.012);

    gain.gain.setValueAtTime(0.018, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.013);
  } catch {
    // Ignore audio errors
  }
}

/**
 * Smooth resonant swoosh for page transitions.
 */
export function playTransitionSound(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(900, now + 0.12);

    osc.type = "sine";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.12);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  } catch {
    // Ignore audio errors
  }
}
