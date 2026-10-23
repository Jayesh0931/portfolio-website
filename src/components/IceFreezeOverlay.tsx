import React, { useState, useEffect, useRef } from "react";
import { playFreezeAudio, playCrackAudio, playShatterAudio } from "@/utils/iceAudioEffects";

export function triggerIceFreeze(origin?: { x: number; y: number }) {
  window.dispatchEvent(new CustomEvent("trigger-ice-freeze", { detail: origin }));
}

// -------------------------------------------------------------
// Data Structures for Procedural Frost & Shatter Simulation
// -------------------------------------------------------------

interface DendriteSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  dist: number;      // Distance from origin
  reach: number;     // Distance when segment starts growing
  alpha: number;
  color: string;
}

interface FrostBloom {
  x: number;
  y: number;
  radius: number;
  dist: number;
  rotation: number;
}

interface Shard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  vertices: { x: number; y: number }[];
  fill: string;
  stroke: string;
  opacity: number;
  glintVertex: { x: number; y: number };
}

interface MicroDebris {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  alpha: number;
}

export default function IceFreezeOverlay() {
  const [isActive, setIsActive] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 140, y: 36 });
  const [showCracks, setShowCracks] = useState(false);
  const [cracksFading, setCracksFading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const startTimeRef = useRef<number>(0);
  const crackAudioFiredRef = useRef<boolean>(false);
  const shatterAudioFiredRef = useRef<boolean>(false);

  // Growth & shard simulation state refs
  const dendritesRef = useRef<DendriteSegment[]>([]);
  const bloomsRef = useRef<FrostBloom[]>([]);
  const shardsRef = useRef<Shard[]>([]);
  const debrisRef = useRef<MicroDebris[]>([]);
  const maxDistanceRef = useRef(1200);

  // -----------------------------------------------------------
  // 1. Generators: Dendritic Frost Ferns & Delaunay Shards
  // -----------------------------------------------------------

  const buildDendriteTree = (ox: number, oy: number, w: number, h: number) => {
    const corners = [
      Math.hypot(ox - 0, oy - 0),
      Math.hypot(ox - w, oy - 0),
      Math.hypot(ox - 0, oy - h),
      Math.hypot(ox - w, oy - h),
    ];
    const maxD = Math.max(...corners) * 1.15;
    maxDistanceRef.current = maxD;

    const segments: DendriteSegment[] = [];
    const numPrimaryRays = 120;

    for (let r = 0; r < numPrimaryRays; r++) {
      const baseAngle = (r / numPrimaryRays) * Math.PI * 2 + (Math.random() - 0.5) * 0.05;
      const totalSteps = 30 + Math.floor(Math.random() * 20);
      const stepLen = (maxD / totalSteps) * (0.85 + Math.random() * 0.3);

      let currX = ox;
      let currY = oy;
      let currAngle = baseAngle;

      for (let s = 0; s < totalSteps; s++) {
        const nextX = currX + Math.cos(currAngle) * stepLen;
        const nextY = currY + Math.sin(currAngle) * stepLen;
        const dist = Math.hypot(nextX - ox, nextY - oy);

        // Primary needle stem
        segments.push({
          x1: currX,
          y1: currY,
          x2: nextX,
          y2: nextY,
          width: Math.max(1.2, 4.0 * (1 - dist / maxD)),
          dist,
          reach: dist * (0.85 + Math.random() * 0.22),
          alpha: 0.95,
          color: Math.random() > 0.35 ? "#ffffff" : "#cbe9ff",
        });

        // Fern frost sub-branches at ±60° (Ice crystal hexagonal lattice)
        if (Math.random() > 0.25) {
          const side = Math.random() > 0.5 ? 1 : -1;
          const branchAngle = currAngle + side * (Math.PI / 3 + (Math.random() - 0.5) * 0.2);
          const branchLen = stepLen * (0.7 + Math.random() * 0.8);
          const bx = currX + Math.cos(branchAngle) * branchLen;
          const by = currY + Math.sin(branchAngle) * branchLen;
          const bDist = Math.hypot(bx - ox, by - oy);

          segments.push({
            x1: currX,
            y1: currY,
            x2: bx,
            y2: by,
            width: Math.max(0.8, 2.5 * (1 - bDist / maxD)),
            dist: bDist,
            reach: bDist * (0.88 + Math.random() * 0.2),
            alpha: 0.9,
            color: "#e2f4ff",
          });

          // Tertiary micro-needles (frost feathers)
          if (Math.random() > 0.35) {
            const tertAngle = branchAngle - side * (Math.PI / 3);
            const tertLen = branchLen * 0.65;
            const tx = bx + Math.cos(tertAngle) * tertLen;
            const ty = by + Math.sin(tertAngle) * tertLen;
            const tDist = Math.hypot(tx - ox, ty - oy);

            segments.push({
              x1: bx,
              y1: by,
              x2: tx,
              y2: ty,
              width: 0.85,
              dist: tDist,
              reach: tDist * (0.9 + Math.random() * 0.2),
              alpha: 0.82,
              color: "#ffffff",
            });
          }
        }

        currAngle += (Math.random() - 0.5) * 0.1;
        currX = nextX;
        currY = nextY;
      }
    }

    // Secondary ice blooms (hexagonal crystal stars along the frontier)
    const blooms: FrostBloom[] = [];
    const numBlooms = 140;
    for (let b = 0; b < numBlooms; b++) {
      const angle = Math.random() * Math.PI * 2;
      const d = Math.random() * maxD;
      blooms.push({
        x: ox + Math.cos(angle) * d,
        y: oy + Math.sin(angle) * d,
        radius: 14 + Math.random() * 30,
        dist: d,
        rotation: Math.random() * Math.PI,
      });
    }

    dendritesRef.current = segments;
    bloomsRef.current = blooms;
  };

  const buildShatterShards = (w: number, h: number) => {
    const cols = 17;
    const rows = 11;
    const cellW = w / cols;
    const cellH = h / rows;

    const grid: { x: number; y: number }[][] = [];
    for (let r = 0; r <= rows; r++) {
      grid[r] = [];
      for (let c = 0; c <= cols; c++) {
        let x = c * cellW;
        let y = r * cellH;
        if (c > 0 && c < cols) x += (Math.random() - 0.5) * cellW * 0.7;
        if (r > 0 && r < rows) y += (Math.random() - 0.5) * cellH * 0.7;
        grid[r][c] = { x, y };
      }
    }

    const shards: Shard[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p00 = grid[r][c];
        const p10 = grid[r][c + 1];
        const p11 = grid[r + 1][c + 1];
        const p01 = grid[r + 1][c];

        const alternate = (r + c) % 2 === 0;
        const tri1 = alternate ? [p00, p10, p11] : [p00, p10, p01];
        const tri2 = alternate ? [p00, p11, p01] : [p10, p11, p01];

        [tri1, tri2].forEach((pts) => {
          const cx = (pts[0].x + pts[1].x + pts[2].x) / 3;
          const cy = (pts[0].y + pts[1].y + pts[2].y) / 3;

          const localVerts = pts.map((p) => ({
            x: p.x - cx,
            y: p.y - cy,
          }));

          const lateralPush = (Math.random() - 0.5) * 4.8;
          const initialDrop = -1.2 + Math.random() * 3.5;

          const alpha = 0.65 + Math.random() * 0.32;
          const fill =
            Math.random() > 0.45
              ? `rgba(215, 242, 255, ${alpha})`
              : `rgba(180, 225, 252, ${alpha})`;

          shards.push({
            x: cx,
            y: cy,
            vx: lateralPush,
            vy: initialDrop,
            rotation: 0,
            vRot: (Math.random() - 0.5) * 0.09,
            vertices: localVerts,
            fill,
            stroke: "rgba(255, 255, 255, 0.95)",
            opacity: 1,
            glintVertex: localVerts[Math.floor(Math.random() * localVerts.length)],
          });
        });
      }
    }

    const debris: MicroDebris[] = [];
    for (let d = 0; d < 85; d++) {
      debris.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 6.5,
        vy: 2 + Math.random() * 9,
        size: 2.5 + Math.random() * 5.5,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.28,
        alpha: 0.85 + Math.random() * 0.15,
      });
    }

    shardsRef.current = shards;
    debrisRef.current = debris;
  };

  // -----------------------------------------------------------
  // 2. Event Listener: Trigger Freeze Growth
  // -----------------------------------------------------------

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      if (isActive) return;

      const customEvent = e as CustomEvent<{ x?: number; y?: number } | undefined>;
      const ox = customEvent.detail?.x ?? 140;
      const oy = customEvent.detail?.y ?? 36;
      setOrigin({ x: ox, y: oy });

      const w = window.innerWidth;
      const h = window.innerHeight;
      buildDendriteTree(ox, oy, w, h);
      buildShatterShards(w, h);

      crackAudioFiredRef.current = false;
      shatterAudioFiredRef.current = false;
      startTimeRef.current = performance.now();
      setIsActive(true);
      setShowCracks(false);
      setCracksFading(false);

      playFreezeAudio();
    };

    window.addEventListener("trigger-ice-freeze", handleTrigger);
    return () => window.removeEventListener("trigger-ice-freeze", handleTrigger);
  }, [isActive]);

  // -----------------------------------------------------------
  // 3. Animation Render Loop (Single continuous timeline)
  // -----------------------------------------------------------

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const render = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      ctx.clearRect(0, 0, width, height);

      // -------------------------------------------------------
      // TIMELINE STAGE 1: ORGANIC FROST CRAWL (0.0s - 2.0s)
      // -------------------------------------------------------
      if (elapsed < 2.0) {
        const growthT = Math.min(1.0, elapsed / 1.95);
        const maxD = maxDistanceRef.current;
        const currentRadius = growthT * maxD * 1.12;

        // Synchronize backdrop filter mask directly via ref
        if (backdropRef.current) {
          const maskPct = Math.max(8, growthT * 145) + "%";
          const maskStyle = `radial-gradient(circle at ${origin.x}px ${origin.y}px, black 0%, black ${maskPct}, transparent calc(${maskPct} + 130px))`;
          backdropRef.current.style.webkitMaskImage = maskStyle;
          backdropRef.current.style.maskImage = maskStyle;
        }
        if (vignetteRef.current) {
          vignetteRef.current.style.opacity = String(Math.min(1, growthT * 1.25));
        }

        // Frosted ice radial gradient mass
        ctx.save();
        ctx.beginPath();
        const numPoints = 72;
        for (let i = 0; i <= numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const wave =
            1 +
            0.16 * Math.sin(5 * angle + 1.2) +
            0.08 * Math.cos(8 * angle) +
            0.04 * Math.sin(14 * angle);
          const r = currentRadius * wave;
          const px = origin.x + Math.cos(angle) * r;
          const py = origin.y + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const grad = ctx.createRadialGradient(
          origin.x,
          origin.y,
          0,
          origin.x,
          origin.y,
          Math.max(10, currentRadius)
        );
        grad.addColorStop(0, "rgba(225, 246, 255, 0.72)");
        grad.addColorStop(0.5, "rgba(188, 232, 255, 0.52)");
        grad.addColorStop(0.85, "rgba(145, 212, 252, 0.38)");
        grad.addColorStop(1, "rgba(120, 195, 250, 0.0)");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // Advancing crystal needles
        const dendrites = dendritesRef.current;
        for (let i = 0; i < dendrites.length; i++) {
          const seg = dendrites[i];
          if (seg.reach > currentRadius + 140) continue;

          const segProg = Math.min(1.0, Math.max(0, (currentRadius + 140 - seg.reach) / 120));
          if (segProg <= 0) continue;

          const ex = seg.x1 + (seg.x2 - seg.x1) * segProg;
          const ey = seg.y1 + (seg.y2 - seg.y1) * segProg;

          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = seg.color;
          ctx.lineWidth = seg.width;
          ctx.lineCap = "round";
          ctx.globalAlpha = seg.alpha * Math.min(1, segProg * 1.5);
          ctx.stroke();

          // Spicule tip glow
          if (segProg < 1.0) {
            ctx.beginPath();
            ctx.arc(ex, ey, seg.width * 1.6, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1.0;

        // Ice blooms along frontier
        const blooms = bloomsRef.current;
        for (let b = 0; b < blooms.length; b++) {
          const bloom = blooms[b];
          if (bloom.dist > currentRadius) continue;

          const bloomAge = Math.min(1.0, (currentRadius - bloom.dist) / 180);
          ctx.save();
          ctx.translate(bloom.x, bloom.y);
          ctx.rotate(bloom.rotation);
          ctx.globalAlpha = (1 - bloomAge * 0.35) * 0.85;

          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.2;
          for (let ray = 0; ray < 6; ray++) {
            ctx.rotate(Math.PI / 3);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, bloom.radius * bloomAge);
            const fPos = bloom.radius * bloomAge * 0.6;
            ctx.moveTo(-4, fPos - 4);
            ctx.lineTo(0, fPos);
            ctx.lineTo(4, fPos - 4);
            ctx.stroke();
          }
          ctx.restore();
        }
        ctx.globalAlpha = 1.0;
      }

      // -------------------------------------------------------
      // TIMELINE STAGE 2: STRESS CRACKS (2.0s - 2.5s)
      // -------------------------------------------------------
      else if (elapsed >= 2.0 && elapsed < 2.5) {
        if (!showCracks) setShowCracks(true);

        if (backdropRef.current) {
          backdropRef.current.style.webkitMaskImage = "none";
          backdropRef.current.style.maskImage = "none";
          backdropRef.current.style.opacity = "1";
        }
        if (vignetteRef.current) {
          vignetteRef.current.style.opacity = "1";
        }

        // Fire realistic crack audio & trigger background reset while screen is 100% frozen
        if (!crackAudioFiredRef.current) {
          crackAudioFiredRef.current = true;
          setScreenShake(true);
          playCrackAudio();
          setTimeout(() => setScreenShake(false), 260);

          // Dispatches instant reload/reset with a 0.3s delay after cracks appear, while still hidden behind the frozen opaque frost layer!
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("ice-freeze-reset"));
          }, 300);
        }

        // Draw solid frozen glass sheet with sparkling frost crystals
        const grad = ctx.createRadialGradient(
          origin.x,
          origin.y,
          0,
          origin.x,
          origin.y,
          Math.max(width, height)
        );
        grad.addColorStop(0, "rgba(225, 246, 255, 0.75)");
        grad.addColorStop(0.6, "rgba(188, 232, 255, 0.58)");
        grad.addColorStop(1, "rgba(145, 212, 252, 0.45)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Draw crystal needles over the sheet
        const dendrites = dendritesRef.current;
        for (let i = 0; i < dendrites.length; i++) {
          const seg = dendrites[i];
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.strokeStyle = seg.color;
          ctx.lineWidth = seg.width;
          ctx.lineCap = "round";
          ctx.globalAlpha = seg.alpha * 0.8;
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;
      }

      // -------------------------------------------------------
      // TIMELINE STAGE 3: SHATTER DOWN & GRAVITY COLLAPSE (2.5s - 3.65s)
      // -------------------------------------------------------
      else if (elapsed >= 2.5) {
        if (!cracksFading) setCracksFading(true);

        // Hide static backdrop so falling shards reveal clean website underneath
        if (backdropRef.current) {
          backdropRef.current.style.opacity = "0";
        }
        if (vignetteRef.current) {
          vignetteRef.current.style.opacity = "0";
        }

        // Fire realistic shatter audio once
        if (!shatterAudioFiredRef.current) {
          shatterAudioFiredRef.current = true;
          playShatterAudio();
        }

        const shatterElapsed = elapsed - 2.5;

        // Flash shockwave
        if (shatterElapsed < 0.22) {
          const flashAlpha = (1 - shatterElapsed / 0.22) * 0.85;
          ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
          ctx.fillRect(0, 0, width, height);
        }

        const shards = shardsRef.current;
        const debris = debrisRef.current;
        const gravity = 1.45; // Downward gravity acceleration

        // Physics step: tumble & fall DOWNWARDS
        shards.forEach((s) => {
          s.vy += gravity;
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.985;
          s.rotation += s.vRot;

          // Fade out as shards fall off the bottom of the screen
          if (s.y > height * 0.85) {
            s.opacity = Math.max(0, s.opacity - 0.045);
          }

          if (s.opacity <= 0) return;

          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.rotation);
          ctx.globalAlpha = s.opacity;

          ctx.beginPath();
          s.vertices.forEach((v, idx) => {
            if (idx === 0) ctx.moveTo(v.x, v.y);
            else ctx.lineTo(v.x, v.y);
          });
          ctx.closePath();

          ctx.fillStyle = s.fill;
          ctx.fill();

          ctx.strokeStyle = s.stroke;
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Specular glint
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(s.glintVertex.x, s.glintVertex.y, 1.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });

        // Falling micro-debris / crystal shower
        debris.forEach((d) => {
          d.vy += gravity * 0.85;
          d.x += d.vx;
          d.y += d.vy;
          d.rotation += d.vRot;

          ctx.save();
          ctx.translate(d.x, d.y);
          ctx.rotate(d.rotation);
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillRect(-d.size / 2, -d.size / 2, d.size, d.size);
          ctx.restore();
        });

        // -----------------------------------------------------
        // TIMELINE STAGE 4: CLEAN COMPLETION AT 3.65s
        // -----------------------------------------------------
        if (elapsed >= 3.65) {
          setIsActive(false);
          setShowCracks(false);
          setCracksFading(false);
          crackAudioFiredRef.current = false;
          shatterAudioFiredRef.current = false;
          return;
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive, origin]);

  if (!isActive) return null;

  return (
    <div
      id="ice-freeze-screen"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999999,
        pointerEvents: "all",
        userSelect: "none",
        overflow: "hidden",
        transform: screenShake
          ? "translate(6px, -4px) rotate(0.25deg) scale(1.008)"
          : "none",
        transition: "transform 0.05s ease",
      }}
    >
      <style>{`
        @keyframes crackImpactPop {
          0% {
            opacity: 0.15;
            transform: translate(-48%, -46%) scale(0.94);
          }
          60% {
            opacity: 1;
            transform: translate(-48%, -46%) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate(-48%, -46%) scale(1.0);
          }
        }
      `}</style>

      {/* 1. Frosted Glass Backdrop Layer - masked to expand organically with the freeze front */}
      <div
        ref={backdropRef}
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(12px) brightness(1.2) contrast(1.16) saturate(0.55)",
          WebkitBackdropFilter: "blur(12px) brightness(1.2) contrast(1.16) saturate(0.55)",
          backgroundColor: "rgba(195, 232, 255, 0.28)",
          opacity: 1,
          transition: "opacity 0.18s ease",
        }}
      />

      {/* 2. Sub-zero Vignette & Cold Border Frost */}
      <div
        ref={vignetteRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.0) 30%, rgba(175, 220, 255, 0.3) 75%, rgba(130, 195, 245, 0.65) 100%)",
          opacity: 0,
          transition: "opacity 0.18s ease",
          pointerEvents: "none",
        }}
      />

      {/* 3. High-resolution Dynamic Canvas (Organic Frost Dendrites & Gravity Shards) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* 4. Structural Stress Cracks Overlay (Authentic High-Resolution Fracture Texture) */}
      {showCracks && !cracksFading && (
        <div
          style={{
            position: "absolute",
            left: origin.x,
            top: origin.y,
            width: "180vw",
            height: "180vh",
            maxWidth: "2800px",
            maxHeight: "2800px",
            transform: "translate(-47%, -51%)",
            backgroundImage: "url(/ice_crack_overlay.webp)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            pointerEvents: "none",
            mixBlendMode: "screen",
            filter:
              "drop-shadow(0 0 8px rgba(160, 225, 255, 0.9)) drop-shadow(0 0 20px rgba(120, 205, 255, 0.55)) brightness(1.2)",
            animation: "crackImpactPop 0.08s ease-out forwards",
          }}
        />
      )}
    </div>
  );
}
