import { useState, useEffect } from "react";
import Desktop from "@/imports/Desktop6/index";
import imgEllipse5 from "@/imports/Desktop6/49f9bacadb0b6c33f4b16626866a7ba76ea5c76a.png";
import imgEllipse6 from "@/imports/Desktop6/a91132eb75454691079ab470b1a18b7a63465b3c.png";
import imgEllipse7 from "@/imports/Desktop6/ea2ebb970c11a33998a35f3c05333c9689a2bb47.png";
import imgEllipse8 from "@/imports/Desktop6/9ff71da8485c02d3fd081a21e1d07fea61940bec.png";
import svgPaths from "@/imports/Desktop6/svg-rk1gtf9dz9";

const DESIGN_W = 1440;
const DESIGN_H = 10600;

function getScaleAndLeft(vw: number) {
  if (vw >= 1440) {
    // Lock scale at 1 to preserve crisp font sizes and layout hierarchy,
    // and center the 1440px design area to create balanced margins.
    const scale = 1;
    const left = (vw - 1440) / 2;
    return { scale, left };
  } else if (vw >= 768) {
    // Proportially scale down to fit smaller viewports without overflow (all the way to mobile threshold)
    const scale = vw / 1440;
    const left = 0;
    return { scale, left };
  } else {
    // Mobile view logic
    return { scale: 1, left: 0 };
  }
}

function useLayout() {
  const [vw, setVw] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : DESIGN_W
  );
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return getScaleAndLeft(vw);
}

const marqueeStyles = `
  @keyframes marquee-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: marquee-scroll 28s linear infinite;
  }
  .nav-pill {
    position: absolute;
    top: 33px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 110px;
    border: 1px solid transparent;
    cursor: pointer;
    background: transparent;
    transition: background 0.25s ease, border-color 0.25s ease;
    white-space: nowrap;
  }
  .nav-pill:hover {
    background: #190b00;
    border-color: #190b00;
  }
  .nav-pill[data-nav="about"]:hover {
    background: #EE6C13;
    border-color: #EE6C13;
  }
  .nav-pill span {
    font-family: 'Outfit', sans-serif;
    font-weight: 900;
    font-size: 14px;
    letter-spacing: 0.56px;
    text-transform: uppercase;
    color: transparent;
    transition: color 0.25s ease;
  }
  .nav-pill:hover span {
    color: #FFFDFA;
  }
  .card-overlay {
    position: absolute;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card-overlay:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(25, 11, 0, 0.12);
  }
  .card-overlay-dark:hover {
    border-color: #FFFDFA;
  }
  .card-overlay-light:hover {
    border-color: #190b00;
  }
  .card-overlay-orange:hover {
    border-color: #190b00;
  }
  .logo-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: marquee-scroll 18s linear infinite;
    gap: 64px;
  }
  .logo-icon svg {
    height: 44px;
    width: auto;
  }
  .nav-pill svg path {
    fill: transparent;
    transition: fill 0.25s ease;
  }
  .nav-pill:hover svg path {
    fill: #FFFDFA;
  }
  .sticky-header-capsule {
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sticky-header-capsule:hover {
    transform: translateY(-1px);
    border-color: #190b00 !important;
    box-shadow: 0 6px 20px rgba(25, 11, 0, 0.12) !important;
  }
`;

// Scroll to a y-position in the original 1440×8405 design space,
// accounting for whatever scale the canvas is currently rendered at.
function scrollToY(designY: number) {
  const { scale } = getScaleAndLeft(window.innerWidth);
  const offset = designY === 0 ? 0 : 25;
  window.scrollTo({ top: (designY + offset) * scale, behavior: "smooth" });
}

const navItems = [
  { left: 80,   label: "JAYESH SONI", icon: null,       scrollY: 0    },
  { left: 1010, label: "STORIES",     icon: "down",     scrollY: 2138 },
  { left: 1135, label: "CRAFT",       icon: "down",     scrollY: 6820 },
  { left: 1250, label: "ABOUT",       icon: "diagonal", scrollY: 1127 },
];

// Each bento card maps to its corresponding section further down the page.
// story positions inside Frame43 (top-[2138px], flex-col gap-[90px]):
//   header Group8 h=381 → stories start at 2138+381+90 = 2609
//   Story 01 h=690+90 → Story 02 at 3389
//   Story 02 h=690+90 → Story 03 at 4169
//   Story 03 h=690+90 → Story 04 at 4949
const bentoCards = [
  { top: 327, left: 580,  width: 500, height: 360, scrollY: 2609, theme: "dark"  }, // allyra  → Story 01
  { top: 707, left: 580,  width: 370, height: 200, scrollY: 3389, theme: "light" }, // tulah   → Story 02
  { top: 707, left: 970,  width: 370, height: 200, scrollY: 4949, theme: "orange" }, // joonify → Story 04
  { top: 327, left: 1100, width: 240, height: 220, scrollY: 4169, theme: "light" }, // VousVous→ Story 03
  { top: 567, left: 1100, width: 240, height: 120, scrollY: 5843, theme: "light" }, // Stanford→ Focus
];

function CardHoverOverlays() {
  return (
    <>
      {bentoCards.map(({ top, left, width, height, scrollY, theme }, i) => (
        <div
          key={i}
          className={`card-overlay card-overlay-${theme}`}
          style={{ top, left, width, height }}
          onClick={() => scrollToY(scrollY)}
        />
      ))}
    </>
  );
}

// Invisible click targets for the small arrow icons in the bento grid
// that sit outside the main card overlay bounds (top-right of each card).
const bentoArrows = [
  { top: 343, left: 1315, scrollY: 2609 }, // allyra arrow
  { top: 723, left: 925,  scrollY: 3389 }, // tulah arrow  ([ Story 02 ])
  { top: 583, left: 1315, scrollY: 4169 }, // VousVous arrow
  { top: 723, left: 1315, scrollY: 4949 }, // joonify arrow
];

function BentoArrowLinks() {
  return (
    <>
      {bentoArrows.map(({ top, left, scrollY }, i) => (
        <div
          key={i}
          onClick={() => scrollToY(scrollY)}
          style={{
            position: "absolute",
            top: top - 8,
            left: left - 8,
            width: 30,
            height: 30,
            cursor: "pointer",
          }}
        />
      ))}
    </>
  );
}

function NavHoverOverlay() {
  return (
    <>
      {navItems.map(({ left, label, icon, scrollY }) => (
        <div
          key={label}
          className="nav-pill"
          data-nav={label.toLowerCase()}
          style={{ left }}
          onClick={() => scrollToY(scrollY)}
        >
          <span>{label}</span>
          {icon === "down" && (
            <svg width="11" height="11" viewBox="0 0 11 11.3137" fill="none">
              <path d={svgPaths.p20be5a00} />
            </svg>
          )}
          {icon === "diagonal" && (
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d={svgPaths.p18019200} />
            </svg>
          )}
        </div>
      ))}
    </>
  );
}



/* ── scroll-synced stories header ────────────────────────────────────────── */
// Covers Frame15 (text, top=2214, left=80, w=995, h=200)
//     + Frame16 (circles, top=2139, left=1075, w=285, h=381).
// Progress: 0 → 1 as the section scrolls from below the fold into view.
//   text    → translateX  0 → -520px  (slides left with scroll)
//   circles → one +135deg (CW), one -135deg (CCW) opposite spins
function StoriesScrollOverlay() {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scale } = getScaleAndLeft(window.innerWidth);
      const secTop = 2077 * scale;                     // design y → screen y
      const vh     = window.innerHeight;
      const start  = secTop - vh * 0.8;                // begins animating before section arrives
      const end    = secTop + vh * 0.6;                // finishes well inside the section
      const scrollYAdjusted = window.scrollY - 25 * scale;
      const raw    = (scrollYAdjusted - start) / (end - start);
      setProg(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textX = prog * -520;        // px left
  const cw    = prog * 135;         // deg clockwise
  const ccw   = prog * -135;        // deg anticlockwise

  const tStyle: React.CSSProperties = {
    fontFamily : "'Outfit', sans-serif",
    fontWeight : 900,
    fontSize   : 180,
    lineHeight : "180px",
    letterSpacing: "7.2px",
    whiteSpace : "nowrap",
    flexShrink : 0,
    position   : "relative",
  };

  return (
    <>
      {/* ── TEXT — covers Frame15 ── */}
      <div style={{
        position : "absolute",
        top      : 2153,
        left     : 80,
        width    : 995,
        height   : 200,
        overflow : "hidden",
        background: "#FFFDFA",
      }}>
        <div style={{
          position : "absolute",
          left     : -1310,
          top      : "50%",
          transform: `translateY(-50%) translateX(${textX}px)`,
          display  : "flex",
          alignItems: "center",
          gap      : 60,
          willChange: "transform",
        }}>
          <p style={{
            ...tStyle,
            color          : "#FFFDFA",
            WebkitTextStroke: "1.5px #190b00",
            paintOrder     : "stroke fill",
          }}>SELECTED STORIES</p>
          <p style={{ ...tStyle, color: "#190b00" }}>STORIES</p>
        </div>
      </div>

      {/* ── CIRCLES — covers Frame16 (top=2078, left=1075, w=285, h=381) ── */}
      {/* Frame16 inner: absolute left-[59px] top-50% -translate-y-1/2; Frame7 wrapped in rotate-180 */}
      <div style={{
        position : "absolute",
        top      : 2078,
        left     : 1075,
        width    : 285,
        height   : 381,
        overflow : "hidden",
        background: "#FFFDFA",
        borderLeft: "1px solid #7b7a77",
      }}>
        <div style={{
          position : "absolute",
          left     : 59,
          top      : "50%",
          transform: "translateY(-50%)",
          display  : "flex",
          alignItems: "center",
        }}>
          {/* rotate-180 wrapper matches original Frame7 wrapper */}
          <div style={{ transform: "rotate(180deg)", display: "flex", alignItems: "center", position: "relative" }}>
            {/* Orange circle — clockwise */}
            <div style={{
              width       : 253.333,
              height      : 253.333,
              borderRadius: "50%",
              background  : "#EE6C13",
              marginRight : -101.333,
              position    : "relative",
              zIndex      : 2,
              flexShrink  : 0,
              transform   : `rotate(${cw}deg)`,
            }} />
            {/* Portrait circle — anticlockwise */}
            <div style={{
              width       : 228,
              height      : 228,
              borderRadius: "50%",
              overflow    : "hidden",
              position    : "relative",
              zIndex      : 1,
              flexShrink  : 0,
              transform   : `rotate(${ccw}deg)`,
            }}>
              <img alt="" src={imgEllipse6}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── craft section: expand → fullscreen sticky → internal scroll → exit ─── */
function CraftExpandOverlay() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(() => (typeof window !== "undefined" ? window.innerHeight : 900));
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth  : 1440));

  const { scale: rawScale } = getScaleAndLeft(vw);
  const scale = Math.max(0.001, rawScale);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY - 25 * scale);
    const onResize = () => { setVh(window.innerHeight); setVw(window.innerWidth); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [scale]);

  const { left: canvasLeft } = getScaleAndLeft(vw);
  const vhD        = vh / scale;  // viewport height in design-space px
  const vwD        = vw / scale;  // viewport width  in design-space px

  const SECT_TOP  = 6820;
  const SECT_H    = 800;
  const GALLERY_H = 1440; // total gallery content height in design-space px

  // Phase 1 — Entry: section slides up from viewport-bottom & expands to full vh×vw
  const entryStart = SECT_TOP * scale - vh;
  const entryEnd   = entryStart + SECT_H * scale * 0.7;
  const entryProg  = Math.max(0, Math.min(1, (scrollY - entryStart) / (entryEnd - entryStart)));
  const e          = entryProg ** 2 * (3 - 2 * entryProg); // smoothstep

  // Phase 2 — Sticky + internal gallery scroll
  const galleryOverflow = Math.max(0, GALLERY_H - vhD); // design-px of gallery beyond viewport
  const internalPx      = galleryOverflow * scale;        // screen-px of scroll to exhaust gallery
  const internalEnd     = entryEnd + internalPx;
  const internalProg    = internalPx > 0
    ? Math.max(0, Math.min(1, (scrollY - entryEnd) / internalPx))
    : 1;
  const galleryOffset   = internalProg * galleryOverflow; // design-px gallery has scrolled up

  // Phase 3 — Exit: element returns to a fixed canvas position and naturally scrolls off top
  const exitProg    = Math.max(0, Math.min(1, (scrollY - internalEnd) / vh));
  const exitOffsetD = exitProg * vhD;

  if (entryProg === 0 || exitProg >= 1) return null;

  // Geometry (all in design-space px):
  // left:   80 → -canvasLeft/scale  (starts at screen x=0)
  // width:  1280 → vwD              (full viewport width)
  // height: SECT_H → vhD            (full viewport height)
  // top:    slides from natural canvas pos → sticky at viewport-top → exits off top
  const curLeft   = 80 + (-canvasLeft / scale - 80) * e;
  const curWidth  = 1280 + (vwD - 1280) * e;
  const curHeight = SECT_H + (vhD - SECT_H) * e;
  const curTop    = SECT_TOP * (1 - e) + (scrollY / scale) * e - exitOffsetD;

  const craft: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif", fontWeight: 900,
    fontSize: 140, lineHeight: "140px", letterSpacing: "5.6px",
    whiteSpace: "nowrap", color: "#190b00",
  };

  return (
    <div style={{
      position: "absolute",
      top: curTop, left: curLeft, width: curWidth, height: curHeight,
      background: "#FFFDFA", border: "1px solid #7b7a77",
      overflow: "hidden", display: "flex", zIndex: 10,
    }}>
      {/* CRAFT vertical sidebar */}
      <div style={{
        width: 180, flexShrink: 0, boxShadow: "inset -1px 0 0 #7b7a77",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Top Box: 2 Circles */}
        <div style={{
          height: 148, width: "100%", display: "flex", alignItems: "center",
          justifyContent: "center", borderBottom: "1px solid #7b7a77",
          position: "relative", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", position: "relative", transform: "rotate(180deg) scale(0.75)" }}>
            <div style={{ marginRight: -35, position: "relative", flexShrink: 0, width: 88, height: 88, zIndex: 2 }}>
              <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" viewBox="0 0 88 88">
                <circle cx="44" cy="44" fill="#EE6C13" r="44" />
              </svg>
            </div>
            <div style={{ position: "relative", flexShrink: 0, width: 79, height: 79, zIndex: 1 }}>
              <img alt="" style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} src={imgEllipse8} />
            </div>
          </div>
        </div>

        {/* Middle Box: Marquee */}
        <div style={{
          flex: 1, width: "100%", overflow: "hidden", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            transform: "rotate(-90deg)",
            overflow: "hidden",
            width: curHeight - 148 - 45,
            height: 140,
            flexShrink: 0,
          }}>
            <div className="marquee-track"
              style={{ pointerEvents: "none", height: "100%", animationDuration: "18s" }}>
              <p style={craft}>CRAFT</p>
              <p style={{ ...craft, color: "#FFFDFA", WebkitTextStroke: "1.5px #190b00", paintOrder: "stroke fill" }}>CRAFT</p>
              <p style={craft}>CRAFT</p>
              <p style={{ ...craft, color: "#FFFDFA", WebkitTextStroke: "1.5px #190b00", paintOrder: "stroke fill" }}>CRAFT</p>
              <p style={craft}>CRAFT</p>
              <p style={{ ...craft, color: "#FFFDFA", WebkitTextStroke: "1.5px #190b00", paintOrder: "stroke fill" }}>CRAFT</p>
              <p style={craft}>CRAFT</p>
              <p style={{ ...craft, color: "#FFFDFA", WebkitTextStroke: "1.5px #190b00", paintOrder: "stroke fill" }}>CRAFT</p>
            </div>
          </div>
        </div>

        {/* Bottom Box: [ S-004 ] */}
        <div style={{
          height: 45, width: "100%", display: "flex", alignItems: "center",
          justifyContent: "center", borderTop: "1px solid #7b7a77",
          flexShrink: 0,
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 700,
            fontSize: "12px", letterSpacing: "0.6px", textTransform: "uppercase",
            color: "#77695d", margin: 0, whiteSpace: "nowrap",
          }}>
            [ S-004 ]
          </p>
        </div>
      </div>

      {/* Gallery — absolute inner div translates up via galleryOffset */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{
          position: "absolute", top: -galleryOffset, left: 0, right: 0,
          display: "flex", flexDirection: "column", gap: 20, padding: 20,
        }}>
          <div style={{ display: "flex", gap: 20, height: 350 }}>
            <div style={{ flex: 2, background: "#d9d9d9", opacity: 0.9 }} />
            <div style={{ flex: 1, background: "#d9d9d9", opacity: 0.9 }} />
          </div>
          <div style={{ display: "flex", gap: 20, height: 270 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, background: "#d9d9d9", opacity: 0.9 }} />)}
          </div>
          <div style={{ display: "flex", gap: 20, height: 560 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ flex: 1, background: "#d9d9d9", opacity: 0.9 }} />
              <div style={{ flex: 1, background: "#d9d9d9", opacity: 0.9 }} />
            </div>
            <div style={{ flex: 1.05, background: "#d9d9d9", opacity: 0.9 }} />
          </div>
          <div style={{ display: "flex", gap: 20, height: 160 }}>
            <div style={{ flex: 1, background: "#d9d9d9", opacity: 0.9 }} />
            <div style={{ flex: 1, background: "#d9d9d9", opacity: 0.9 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeUnit() {
  return (
    <div className="flex shrink-0 gap-[50px] items-center pr-[50px]">
      <p className="shrink-0 whitespace-nowrap leading-[140px] text-[140px] tracking-[5.6px] text-[#190b00]"
        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>
        JAYESH
      </p>
      <div className="content-stretch flex isolate items-center relative shrink-0">
        <div className="mr-[-40px] relative shrink-0 size-[100px] z-[2]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="#EE6C13" r="50" />
          </svg>
        </div>
        <div className="relative shrink-0 size-[90px] z-[1]">
          <img alt="" className="absolute block inset-0 max-w-none size-full rounded-full" src={imgEllipse5} />
        </div>
      </div>
      <p className="shrink-0 whitespace-nowrap leading-[140px] text-[140px] tracking-[5.6px]"
        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, color: "#FFFDFA", WebkitTextStroke: "1.5px #190b00", paintOrder: "stroke fill" }}>
        DESIGNING AI BEHAVIOR
      </p>
      <div className="content-stretch flex isolate items-center relative shrink-0">
        <div className="mr-[-40px] relative shrink-0 size-[100px] z-[2]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="#EE6C13" r="50" />
          </svg>
        </div>
        <div className="relative shrink-0 size-[90px] z-[1]">
          <img alt="" className="absolute block inset-0 max-w-none size-full rounded-full" src={imgEllipse5} />
        </div>
      </div>
    </div>
  );
}

function MarqueeFrame5() {
  return (
    <div style={{
      position: "absolute", top: "127px", left: "80px",
      height: "180px", width: "1280px",
      overflow: "hidden", background: "#FFFDFA",
      display: "flex", alignItems: "center",
    }}>
      <div className="marquee-track" style={{ pointerEvents: "none" }}>
        <MarqueeUnit /><MarqueeUnit />
      </div>
    </div>
  );
}

function MobileView() {
  return (
    <div style={{ width: "100%", background: "#ffffff", minHeight: "100vh", paddingBottom: "48px" }}>
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#ffffff",
        borderBottom: "1px solid #7b7a77",
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "16px", color: "#190b00", letterSpacing: "0.5px" }}>
          JAYESH SONI
        </span>
        <div style={{ display: "flex", gap: "14px", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "12px" }}>
          <a href="#m-stories" onClick={(e) => { e.preventDefault(); document.getElementById("m-stories")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "#77695d", textDecoration: "none" }}>WORK</a>
          <a href="#m-craft" onClick={(e) => { e.preventDefault(); document.getElementById("m-craft")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "#77695d", textDecoration: "none" }}>CRAFT</a>
          <a href="#m-about" onClick={(e) => { e.preventDefault(); document.getElementById("m-about")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "#77695d", textDecoration: "none" }}>ABOUT</a>
        </div>
      </header>

      {/* Edge-to-edge huge title */}
      <div style={{ overflow: "hidden", whiteSpace: "nowrap", padding: "12px 0 0 0", borderBottom: "1px solid #7b7a77" }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: "100px",
          lineHeight: "0.9",
          letterSpacing: "-4px",
          color: "#190b00",
          margin: "0 0 -10px -8px",
          textTransform: "uppercase"
        }}>
          JAYESH
        </h1>
      </div>

      {/* Large sliding marquee */}
      <div style={{ overflow: "hidden", background: "#FFFDFA", borderBottom: "1px solid #7b7a77", padding: "10px 0", display: "flex", alignItems: "center" }}>
        <div className="marquee-track" style={{ display: "flex", gap: "32px", animationDuration: "16s" }}>
          <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "28px", color: "#190b00", whiteSpace: "nowrap", letterSpacing: "1px", textTransform: "uppercase" }}>
            DESIGNING AI BEHAVIOR • DESIGNING AI BEHAVIOR •
          </span>
          <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "28px", color: "#190b00", whiteSpace: "nowrap", letterSpacing: "1px", textTransform: "uppercase" }}>
            DESIGNING AI BEHAVIOR • DESIGNING AI BEHAVIOR •
          </span>
        </div>
      </div>

      {/* Bio / Intro block */}
      <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d" }}>
          <span>[ INTRO ]</span>
          <span>2026</span>
        </div>
        <h2 style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 900,
          fontSize: "28px",
          lineHeight: "1.2",
          color: "#190b00",
          margin: 0,
        }}>
          DESIGNING HOW AI BEHAVES IN PRODUCTS.
        </h2>
        <p style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "1.4",
          color: "#77695d",
          margin: 0,
        }}>
          I shape the moments where people decide whether to trust intelligent systems.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["Human-AI Interaction", "Agentic UX", "Product Design", "Enterprise Systems"].map(tag => (
            <span key={tag} style={{ background: "#e5ddd4", color: "#77695d", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "10px", padding: "4px 10px", borderRadius: "20px", textTransform: "uppercase" }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d", textTransform: "uppercase", marginTop: "4px" }}>
          <span>Scroll to explore</span>
          <span>↙</span>
        </div>
      </div>

      {/* Work / Bento Grid (2-column layout) */}
      <div id="m-stories" style={{ padding: "12px 20px 12px 20px", borderTop: "1px solid #7b7a77", borderBottom: "1px solid #7b7a77", background: "#FFFDFA" }}>
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "24px", color: "#190b00", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          WORK
        </h2>
      </div>

      <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* allyra.ai (Spans 2 columns) */}
        <div style={{
          gridColumn: "span 2",
          background: "#190b00",
          borderRadius: "10px",
          padding: "20px",
          color: "#FFFDFA",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          cursor: "pointer"
        }} onClick={() => document.getElementById("m-story-1")?.scrollIntoView({ behavior: "smooth" })}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "10px", color: "#77695d" }}>[ CURRENT ]</span>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "24px", margin: 0 }}>allyra.ai</h3>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#7b7b7b", lineHeight: "1.4", margin: 0 }}>
            Designing an AI copilot for enterprise software teams.
          </p>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d", textTransform: "uppercase", marginTop: "4px" }}>
            View Story ↙
          </span>
        </div>

        {/* VousVous (1 col) */}
        <div style={{
          background: "#FFFDFA",
          border: "1px solid #7b7a77",
          borderRadius: "10px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          cursor: "pointer"
        }} onClick={() => document.getElementById("m-story-3")?.scrollIntoView({ behavior: "smooth" })}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "9px", color: "#77695d" }}>[ STORY 03 ]</span>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "20px", color: "#190b00", margin: 0 }}>VousVous</h3>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#7b7b7b", lineHeight: "1.3", margin: 0 }}>
            I shape the moments where people decide whether to trust intelligent systems.
          </p>
        </div>

        {/* tulah (1 col) */}
        <div style={{
          background: "#FFFDFA",
          border: "1px solid #7b7a77",
          borderRadius: "10px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          cursor: "pointer"
        }} onClick={() => document.getElementById("m-story-2")?.scrollIntoView({ behavior: "smooth" })}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "9px", color: "#77695d" }}>[ STORY 02 ]</span>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "20px", color: "#190b00", margin: 0 }}>tulah</h3>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#7b7b7b", lineHeight: "1.3", margin: 0 }}>
            I shape the moments where people decide whether to trust intelligent systems.
          </p>
        </div>

        {/* joonify (1 col) */}
        <div style={{
          background: "#EE6C13",
          border: "1px solid #7b7a77",
          borderRadius: "10px",
          padding: "16px",
          color: "#190b00",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          cursor: "pointer"
        }} onClick={() => document.getElementById("m-story-4")?.scrollIntoView({ behavior: "smooth" })}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "9px", color: "#190b00" }}>[ STORY 04 ]</span>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "20px", color: "#190b00", margin: 0 }}>joonify</h3>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#190b00", lineHeight: "1.3", margin: 0 }}>
            I shape the moments where people decide whether to trust intelligent systems.
          </p>
        </div>

        {/* Stanford (1 col) */}
        <div style={{
          background: "#e5ddd4",
          border: "1px solid #7b7a77",
          borderRadius: "10px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "9px", color: "#77695d" }}>[ WORK ]</span>
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "20px", color: "#190b00", margin: 0 }}>Stanford</h3>
        </div>
      </div>

      {/* Logo Marquee */}
      <div style={{ overflow: "hidden", background: "#190b00", padding: "16px 0", display: "flex", alignItems: "center", borderTop: "1px solid #7b7a77", borderBottom: "1px solid #7b7a77" }}>
        <div className="logo-track" style={{ display: "flex", gap: "32px", animationDuration: "14s" }}>
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.65, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", transform: "scale(0.85)" }}>{logo.icon}</div>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "18px", color: "white" }}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stories Marquee & Graphic */}
      <div style={{ overflow: "hidden", background: "#FFFDFA", borderBottom: "1px solid #7b7a77", padding: "10px 0", display: "flex", alignItems: "center" }}>
        <div className="marquee-track" style={{ display: "flex", gap: "32px", animationDuration: "16s" }}>
          <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "28px", color: "#190b00", whiteSpace: "nowrap", letterSpacing: "1px", textTransform: "uppercase" }}>
            STORIES • STORIES • STORIES • STORIES •
          </span>
          <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "28px", color: "#190b00", whiteSpace: "nowrap", letterSpacing: "1px", textTransform: "uppercase" }}>
            STORIES • STORIES • STORIES • STORIES •
          </span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px", background: "#FFFDFA", borderBottom: "1px solid #7b7a77" }}>
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#EE6C13", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#190b00", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <img src={imgEllipse8} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#e5ddd4", border: "1px solid #7b7a77", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "-25px", zIndex: 1 }} />
        </div>
        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "16px", color: "#190b00" }}>SELECTED WORK DETAILS</span>
      </div>

      {/* Stories list */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* Story 1 */}
        <div id="m-story-1" style={{ border: "1px solid #7b7a77", borderRadius: "12px", background: "#FFFDFA", overflow: "hidden" }}>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "10px", color: "#77695d" }}>
              <span>[ STORY 01 ]</span>
              <span>[ Present ]</span>
            </div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "28px", color: "#190b00", margin: 0 }}>allyra.ai</h3>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "16px", color: "#190b00", fontWeight: 500, lineHeight: "1.4", margin: 0 }}>
              Human–AI interaction platform for enterprise teams.
            </p>
            <div style={{ borderTop: "1px dashed #7b7a77", paddingTop: "12px" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "12px", color: "#77695d", textTransform: "uppercase" }}>Key Insight</span>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#77695d", lineHeight: "1.4", marginTop: "4px", margin: 0 }}>
                The biggest challenge wasn't making AI more capable. It was helping people understand what the AI was doing, when to trust it, and how to work alongside it.
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d", textTransform: "uppercase" }}>
              <span>Read Story</span>
              <span>↙</span>
            </div>
          </div>
          <div style={{ background: "#e5ddd4", height: "200px", borderTop: "1px solid #7b7a77", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "#EE6C13", display: "flex", alignItems: "center", overflow: "hidden", margin: "auto" }}>
              <img src={imgEllipse6} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        {/* Story 2 */}
        <div id="m-story-2" style={{ border: "1px solid #7b7a77", borderRadius: "12px", background: "#FFFDFA", overflow: "hidden" }}>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "10px", color: "#77695d" }}>
              <span>[ STORY 02 ]</span>
              <span>[ 2024-25 ]</span>
            </div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "28px", color: "#190b00", margin: 0 }}>tulah</h3>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "16px", color: "#190b00", fontWeight: 500, lineHeight: "1.4", margin: 0 }}>
              Operational platform designed to simplify wellness workflows and service delivery.
            </p>
            <div style={{ borderTop: "1px dashed #7b7a77", paddingTop: "12px" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "12px", color: "#77695d", textTransform: "uppercase" }}>Key Insight</span>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#77695d", lineHeight: "1.4", marginTop: "4px", margin: 0 }}>
                Most operational challenges aren't workflow problems. They're clarity problems disguised as workflows.
              </p>
            </div>
            <div style={{ borderTop: "1px dashed #7b7a77", paddingTop: "12px" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "12px", color: "#77695d", textTransform: "uppercase" }}>Contribution</span>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#77695d", lineHeight: "1.4", marginTop: "4px", margin: 0 }}>
                Product Design, Workflow Design, Information Architecture, Design Systems
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d", textTransform: "uppercase" }}>
              <span>Read Story</span>
              <span>↙</span>
            </div>
          </div>
          <div style={{ background: "#e5ddd4", height: "200px", borderTop: "1px solid #7b7a77", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "#190b00", display: "flex", alignItems: "center", overflow: "hidden", margin: "auto" }}>
              <img src={imgEllipse5} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        {/* Story 3 */}
        <div id="m-story-3" style={{ border: "1px solid #7b7a77", borderRadius: "12px", background: "#FFFDFA", overflow: "hidden" }}>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "10px", color: "#77695d" }}>
              <span>[ STORY 03 ]</span>
              <span>[ 2024-25 ]</span>
            </div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "28px", color: "#190b00", margin: 0 }}>VousVous</h3>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "16px", color: "#190b00", fontWeight: 500, lineHeight: "1.4", margin: 0 }}>
              AI-powered fashion platform for discovering, creating, and personalizing unique styles.
            </p>
            <div style={{ borderTop: "1px dashed #7b7a77", paddingTop: "12px" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "12px", color: "#77695d", textTransform: "uppercase" }}>Key Insight</span>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#77695d", lineHeight: "1.4", marginTop: "4px", margin: 0 }}>
                Personalization becomes meaningful when people can create, not just choose.
              </p>
            </div>
            <div style={{ borderTop: "1px dashed #7b7a77", paddingTop: "12px" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "12px", color: "#77695d", textTransform: "uppercase" }}>Contribution</span>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#77695d", lineHeight: "1.4", marginTop: "4px", margin: 0 }}>
                Product Design, Mobile Experience Design, Design System, Interaction Design
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d", textTransform: "uppercase" }}>
              <span>Read Story</span>
              <span>↙</span>
            </div>
          </div>
          <div style={{ background: "#e5ddd4", height: "200px", borderTop: "1px solid #7b7a77", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "90px", height: "90px" }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 441 441">
                <path d={svgPaths.p39af5380} fill="var(--fill-0, #FFFDFA)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Story 4 */}
        <div id="m-story-4" style={{ border: "1px solid #7b7a77", borderRadius: "12px", background: "#FFFDFA", overflow: "hidden" }}>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "10px", color: "#77695d" }}>
              <span>[ STORY 04 ]</span>
              <span>[ 2022-23 ]</span>
            </div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "28px", color: "#190b00", margin: 0 }}>joonify</h3>
            <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "16px", color: "#190b00", fontWeight: 500, lineHeight: "1.4", margin: 0 }}>
              Learning and assessment platform helping parents better understand how children learn and grow.
            </p>
            <div style={{ borderTop: "1px dashed #7b7a77", paddingTop: "12px" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "12px", color: "#77695d", textTransform: "uppercase" }}>Key Insight</span>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#77695d", lineHeight: "1.4", marginTop: "4px", margin: 0 }}>
                When parents understand how children learn, better decisions naturally follow.
              </p>
            </div>
            <div style={{ borderTop: "1px dashed #7b7a77", paddingTop: "12px" }}>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "12px", color: "#77695d", textTransform: "uppercase" }}>Contribution</span>
              <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#77695d", lineHeight: "1.4", marginTop: "4px", margin: 0 }}>
                Product Design, User Experience Design, Assessment Experience Design, Interaction Design
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d", textTransform: "uppercase" }}>
              <span>Read Story</span>
              <span>↙</span>
            </div>
          </div>
          <div style={{ background: "#e5ddd4", height: "200px", borderTop: "1px solid #7b7a77", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "90px", height: "90px" }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 441 441">
                <path d={svgPaths.p39af5380} fill="var(--fill-0, #FFFDFA)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Header */}
      <div style={{ padding: "16px 20px", background: "#FFFDFA", borderTop: "1px solid #7b7a77", borderBottom: "1px solid #7b7a77", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "24px", color: "#190b00", textTransform: "uppercase" }}>FOCUS</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d" }}>[ s-003 ]</span>
      </div>

      {/* Focus List */}
      <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Focus 1 */}
        <div style={{ borderBottom: "1px solid #e5ddd4", paddingBottom: "20px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "8px" }}>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500, fontSize: "14px", color: "#77695d" }}>01</span>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "22px", color: "#190b00", margin: 0, textTransform: "uppercase" }}>PRODUCT DESIGN</h3>
          </div>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "15px", color: "#77695d", lineHeight: "1.6", margin: 0 }}>
            UX/UI Design • Product Strategy • Information Architecture • User Research • Interaction Design
          </p>
        </div>

        {/* Focus 2 */}
        <div style={{ borderBottom: "1px solid #e5ddd4", paddingBottom: "20px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "8px" }}>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500, fontSize: "14px", color: "#77695d" }}>02</span>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "22px", color: "#190b00", margin: 0, textTransform: "uppercase" }}>HUMAN–AI INTERACTION</h3>
          </div>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "15px", color: "#77695d", lineHeight: "1.6", margin: 0 }}>
            Agentic UX • AI Workflows • Conversational Experiences • AI Behavior Design • Enterprise AI Systems
          </p>
        </div>

        {/* Focus 3 */}
        <div>
          <div style={{ display: "flex", gap: "12px", alignItems: "baseline", marginBottom: "8px" }}>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500, fontSize: "14px", color: "#77695d" }}>03</span>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "22px", color: "#190b00", margin: 0, textTransform: "uppercase" }}>SYSTEMS & CRAFT</h3>
          </div>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "15px", color: "#77695d", lineHeight: "1.6", margin: 0 }}>
            Design Systems • Prototyping • Component Libraries • Motion Design • Design Operations
          </p>
        </div>
      </div>

      {/* Craft Section */}
      <div id="m-craft" style={{ padding: "12px 20px 12px 20px", borderTop: "1px solid #7b7a77", borderBottom: "1px solid #7b7a77", background: "#FFFDFA" }}>
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "24px", color: "#190b00", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          CRAFT
        </h2>
      </div>
      <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div style={{ gridColumn: "span 2", background: "#d9d9d9", height: "140px", opacity: 0.9 }} />
        <div style={{ background: "#d9d9d9", height: "100px", opacity: 0.9 }} />
        <div style={{ background: "#d9d9d9", height: "100px", opacity: 0.9 }} />
        <div style={{ background: "#d9d9d9", height: "140px", opacity: 0.9 }} />
        <div style={{ background: "#d9d9d9", height: "140px", opacity: 0.9 }} />
      </div>

      {/* About Header */}
      <div id="m-about" style={{ padding: "16px 20px", background: "#FFFDFA", borderTop: "1px solid #7b7a77", borderBottom: "1px solid #7b7a77", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "24px", color: "#190b00", textTransform: "uppercase" }}>ABOUT</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#77695d" }}>[ s-001 ]</span>
      </div>

      {/* About Content */}
      <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: "24px" }}>
        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "18px", color: "#77695d", lineHeight: "1.5", margin: 0 }}>
          I'm <strong style={{ color: "#190b00", fontWeight: 700 }}>Jayesh Soni</strong>, and for the past 7+ years, I've been designing products at the intersection of people, systems, and emerging technologies. From healthcare and education to marketplaces and enterprise AI, my work has evolved into shaping Human–AI interactions, agentic experiences, and adaptive systems that people can understand and trust.
        </p>

        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "18px", color: "#77695d", lineHeight: "1.5", margin: 0 }}>
          Along the way, I've learned that the hardest product challenges are rarely just technical. They're human. The work I enjoy most is bringing clarity to complexity and creating experiences that people can confidently adopt and rely on.
        </p>

        <hr style={{ border: "none", borderTop: "1px solid #7b7a77", margin: "12px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "14px", color: "#77695d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            THE JOURNEY THAT SHAPED HOW I DESIGN
          </span>
          <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "15px", color: "#77695d", lineHeight: "1.5", margin: 0 }}>
            The products I've helped shape across enterprise AI, healthcare, education, wellness, consumer products and consulting.
          </p>
        </div>

        {/* Visual box matching desktop Frame101 style but for mobile */}
        <div style={{ background: "#190b00", padding: "32px 20px", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", position: "relative" }}>
          <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "#EE6C13", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <img src={imgEllipse8} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "18px", color: "#ffffff", letterSpacing: "1px" }}>JAYESH SONI</span>
        </div>
      </div>
    </div>
  );
}

function StickyHeader({ scale, left, hasScrolled }: { scale: number; left: number; hasScrolled: boolean }) {
  const capsuleStyle = (isCta: boolean): React.CSSProperties => ({
    background: "#FFFDFA",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 110,
    border: "1px solid #7b7a77",
    cursor: "pointer",
    pointerEvents: "auto",
    boxShadow: hasScrolled ? "0 4px 12px rgba(25, 11, 0, 0.08)" : "none",
    transition: "box-shadow 0.3s ease",
  });

  const textStyle: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 900,
    fontSize: 14,
    color: "#190b00",
    letterSpacing: "0.56px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  return (
    <div style={{
      position: "fixed",
      top: 25 * scale + 8 * scale,
      left,
      width: DESIGN_W,
      height: 40,
      transformOrigin: "top left",
      transform: `scale(${scale})`,
      pointerEvents: "none",
      zIndex: 9999,
    }}>
      {/* Jayesh Soni - scrolls to top */}
      <div style={{ position: "absolute", left: 80, top: 0 }}>
        <div className="sticky-header-capsule" style={capsuleStyle(false)} onClick={() => scrollToY(0)}>
          <span style={textStyle}>Jayesh Soni</span>
        </div>
      </div>

      {/* Stories - scrolls to 2077 */}
      <div style={{ position: "absolute", left: 1010, top: 0 }}>
        <div className="sticky-header-capsule" style={capsuleStyle(true)} onClick={() => scrollToY(2077)}>
          <span style={textStyle}>
            Stories
            <svg width="11" height="11" viewBox="0 0 11 11.3137" fill="none">
              <path d={svgPaths.p20be5a00} fill="#77695D" />
            </svg>
          </span>
        </div>
      </div>

      {/* Craft - scrolls to 6820 */}
      <div style={{ position: "absolute", left: 1135, top: 0 }}>
        <div className="sticky-header-capsule" style={capsuleStyle(true)} onClick={() => scrollToY(6820)}>
          <span style={textStyle}>
            Craft
            <svg width="11" height="11" viewBox="0 0 11 11.3137" fill="none">
              <path d={svgPaths.p20be5a00} fill="#77695D" />
            </svg>
          </span>
        </div>
      </div>

      {/* About - scrolls to 1127 */}
      <div style={{ position: "absolute", left: 1250, top: 0 }}>
        <div className="sticky-header-capsule" style={capsuleStyle(true)} onClick={() => scrollToY(1127)}>
          <span style={textStyle}>
            About
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d={svgPaths.p18019200} fill="#77695D" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { scale, left } = useLayout();
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth : DESIGN_W));
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollBg = () => {
      const vhD = window.innerHeight / scale;
      const scrollY_D = window.scrollY / scale;
      // Trigger background transition when Focus starts to enter, and keep it dark for all subsequent sections below it
      const isFocusInView = scrollY_D >= (5843 - vhD * 0.7);

      document.body.style.transition = "background-color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      document.body.style.backgroundColor = isFocusInView ? "#190b00" : "#ffffff";
    };
    window.addEventListener("scroll", handleScrollBg, { passive: true });
    handleScrollBg();
    return () => window.removeEventListener("scroll", handleScrollBg);
  }, [scale]);

  useEffect(() => {
    const onScrollToY = (e: Event) => scrollToY((e as CustomEvent<number>).detail);
    window.addEventListener("scroll-to-y", onScrollToY);
    return () => window.removeEventListener("scroll-to-y", onScrollToY);
  }, []);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (vw < 768) {
    return (
      <div style={{ width: "100%", background: "#ffffff", minHeight: "100vh" }}>
        <style>{marqueeStyles}</style>
        <MobileView />
      </div>
    );
  }

  return (
    <>
      <style>{marqueeStyles}</style>
      <StickyHeader scale={scale} left={left} hasScrolled={hasScrolled} />
      {/* Outer shell: true scrollable height accounts for scaling + offset space */}
      <div style={{ width: "100%", height: (DESIGN_H + 25) * scale, overflow: "hidden", position: "relative" }}>
        {/* Inner canvas: 1440×9400 Figma design, scaled + centred, shifted down by 25px */}
        <div style={{
          width: DESIGN_W, height: DESIGN_H,
          position: "absolute", top: 25 * scale, left,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}>
          <Desktop />
          <MarqueeFrame5 />
          <CraftExpandOverlay />
          <StoriesScrollOverlay />
          {/* BentoCard clicks now handled inside index.tsx via scroll-to-y custom event */}
        </div>
        <RecommendationsScrollOverlay />
      </div>
    </>
  );
}

/* ── recommendations section: entry → sticky fixed scroll → exit ─── */
function RecommendationsScrollOverlay() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(() => (typeof window !== "undefined" ? window.innerHeight : 900));
  const [vw, setVw] = useState(() => (typeof window !== "undefined" ? window.innerWidth  : 1440));

  const { scale: rawScale } = getScaleAndLeft(vw);
  const scale = Math.max(0.001, rawScale);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY - 25 * scale);
    const onResize = () => { setVh(window.innerHeight); setVw(window.innerWidth); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [scale]);

  const { left: canvasLeft } = getScaleAndLeft(vw);
  const vhD        = vh / scale;  // viewport height in design-space px
  const vwD        = vw / scale;  // viewport width  in design-space px

  const SECT_TOP  = 8020;
  const SECT_H    = 824; // 100px (header) + 680px (card) + 44px (indicator spacing)

  // Spacing calculation for center alignment
  const stickyTop = Math.max(0, (vhD - 780) / 2);

  // Phase 1 — Entry
  const entryStart = (SECT_TOP - vhD) * scale;
  const entryEnd   = (SECT_TOP - stickyTop) * scale;

  // Phase 2 — Sticky Pinning
  const stickyDuration = 800 * scale; // screen pixels of scroll (approx 2-3 scroll strokes for stability)
  const internalEnd    = entryEnd + stickyDuration;
  const stickyProg     = Math.max(0, Math.min(1, (scrollY - entryEnd) / stickyDuration));

  // Phase 3 — Exit
  const exitProg    = Math.max(0, Math.min(1, (scrollY - internalEnd) / vh));
  const exitOffsetD = exitProg * vhD;

  if (scrollY < entryStart || exitProg >= 1) return null;

  // Compute position relative to outer shell
  let topValue = 0;
  let posType: "absolute" | "fixed" = "absolute";

  if (scrollY < entryEnd) {
    posType = "absolute";
    topValue = (SECT_TOP * scale) + 25 * scale;
  } else if (scrollY <= internalEnd) {
    posType = "fixed";
    topValue = (stickyTop + 25) * scale;
  } else {
    posType = "absolute";
    topValue = ((SECT_TOP + stickyDuration / scale - exitOffsetD) * scale) + 25 * scale;
  }

  const containerStyle: React.CSSProperties = {
    position: posType,
    top: topValue,
    left: canvasLeft + 80 * scale,
    width: 1280,
    transformOrigin: "top left",
    transform: `scale(${scale})`,
    zIndex: 99,
  };

  const testimonials = [
    {
      initials: "SM",
      name: "Steve Morris",
      role: "Software Architect",
      company: "Stanford Medicine",
      quote: `"Jayesh's work was instrumental in the success of a major application for Stanford Medicine's medical school students. He consistently exceeded expectations through his expertise in UI/UX design, rapid execution, effective communication, and collaborative approach."`,
      linkedin: "https://linkedin.com/in/",
    },
    {
      initials: "AM",
      name: "Ankit Mishra",
      role: "Senior Developer",
      company: "Vertisystem",
      quote: `"Jayesh possesses a deep understanding of user-centered design and consistently transforms complex user needs into intuitive, engaging experiences. His strategic thinking, craftsmanship, and collaborative approach make him an exceptional designer."`,
      linkedin: "https://linkedin.com/in/",
    },
    {
      initials: "AG",
      name: "Anmol Gupta",
      role: "General Manager",
      company: "Joonify",
      quote: `"Jayesh consistently delivered high-quality work that exceeded expectations. His creativity, attention to detail, openness to feedback, and commitment to iteration made him an invaluable collaborator throughout our time working together."`,
      linkedin: "https://linkedin.com/in/",
    },
  ];

  // Interpolation logic for crossfade animation with narrow transitions (zero overlap during active phases)
  const p = stickyProg;
  let s0_op = 0, s1_op = 0, s2_op = 0;
  let s0_tx = 0, s1_tx = 0, s2_tx = 0;

  if (p < 0.29) {
    s0_op = 1; s0_tx = 0;
  } else if (p < 0.37) {
    const t = (p - 0.29) / 0.08;
    s0_op = 1 - t; s0_tx = -30 * t;
    s1_op = t; s1_tx = 30 * (1 - t);
  } else if (p < 0.62) {
    s1_op = 1; s1_tx = 0;
  } else if (p < 0.70) {
    const t = (p - 0.62) / 0.08;
    s1_op = 1 - t; s1_tx = -30 * t;
    s2_op = t; s2_tx = 30 * (1 - t);
  } else {
    s2_op = 1; s2_tx = 0;
  }

  // Progress bars filling logic
  let p0 = 0, p1 = 0, p2 = 0;
  if (p < 0.33) {
    p0 = (p / 0.33) * 100;
  } else if (p < 0.66) {
    p0 = 100;
    p1 = ((p - 0.33) / 0.33) * 100;
  } else {
    p0 = 100;
    p1 = 100;
    p2 = ((p - 0.66) / 0.34) * 100;
  }

  // Handle dot clicks -> scrolls window to middle of slide runway
  const handleDotClick = (index: number) => {
    let targetScroll = entryEnd;
    if (index === 0) targetScroll += 150 * scale;
    else if (index === 1) targetScroll += 400 * scale;
    else if (index === 2) targetScroll += 666 * scale;
    window.scrollTo({ top: targetScroll + 25 * scale, behavior: "smooth" });
  };

  // Dotted circle logo orbit calculation
  const angle = p * 2 * Math.PI; // p is stickyProg
  const orangeX = 35 + 20 * Math.sin(angle) - 16;
  const orangeY = 50 - 20 * Math.cos(angle) - 16;

  return (
    <div style={containerStyle}>
      {/* ── Section Header Bar ── */}
      <div style={{
        width: "100%", height: 100,
        background: "#FFFDFA",
        border: "1px solid #7b7a77",
        display: "flex", alignItems: "center",
        position: "relative",
      }}>
        {/* Left Logo Column (width 70px) - Orbiting circle logo */}
        <div style={{ width: 70, height: "100%", position: "relative", flexShrink: 0 }}>
          {/* Dotted circle outline centered at (35, 50) */}
          <div style={{
            width: 32, height: 32,
            borderRadius: "50%",
            border: "1.5px dashed #190b00",
            position: "absolute",
            left: 35 - 16,
            top: 50 - 16,
          }} />
          {/* Solid orange circle orbiting (35, 50) */}
          <div style={{
            width: 32, height: 32,
            borderRadius: "50%",
            background: "#EE6C13",
            position: "absolute",
            left: orangeX,
            top: orangeY,
            transition: "left 0.05s ease-out, top 0.05s ease-out",
          }} />
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, height: "100%", background: "#7b7a77", flexShrink: 0 }} />

        {/* Section tag + Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 24 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>[ S-005 ]</p>
          <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: 22, color: "#190b00", letterSpacing: "0.56px", textTransform: "uppercase", margin: 0 }}>RECOMMENDATIONS</p>
        </div>

        {/* Right description */}
        <p style={{ position: "absolute", right: 30, top: "50%", transform: "translateY(-50%)", fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 16, color: "#77695d", textAlign: "right", lineHeight: 1.4, maxWidth: 280, margin: 0 }}>
          Some kind words from people I've had<br />the privilege to work with.
        </p>
      </div>

      {/* ── Content Card ── */}
      <div style={{
        width: "100%",
        height: 680,
        background: "#ffffff",
        border: "1px solid #7b7a77",
        borderTop: "none",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 220,
        paddingRight: 80,
        boxSizing: "border-box",
      }}>
        {/* Testimonials Container Stack */}
        <div style={{ position: "relative", width: 800, height: 350 }}>
          {testimonials.map((t, i) => {
            let op = 0;
            let avatarTx = 0;
            let bubbleTx = 0;

            if (i === 0) {
              if (p < 0.29) {
                op = 1; avatarTx = 0; bubbleTx = 0;
              } else if (p < 0.37) {
                const t = (p - 0.29) / 0.08;
                op = 1 - t;
                avatarTx = -80 * t;
                bubbleTx = 80 * t;
              }
            } else if (i === 1) {
              if (p >= 0.29 && p < 0.37) {
                const t = (p - 0.29) / 0.08;
                op = t;
                avatarTx = -80 * (1 - t);
                bubbleTx = 80 * (1 - t);
              } else if (p >= 0.37 && p < 0.62) {
                op = 1; avatarTx = 0; bubbleTx = 0;
              } else if (p >= 0.62 && p < 0.70) {
                const t = (p - 0.62) / 0.08;
                op = 1 - t;
                avatarTx = -80 * t;
                bubbleTx = 80 * t;
              }
            } else if (i === 2) {
              if (p >= 0.62 && p < 0.70) {
                const t = (p - 0.62) / 0.08;
                op = t;
                avatarTx = -80 * (1 - t);
                bubbleTx = 80 * (1 - t);
              } else if (p >= 0.70) {
                op = 1; avatarTx = 0; bubbleTx = 0;
              }
            }

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  opacity: op,
                  pointerEvents: op > 0.1 ? "auto" : "none",
                  transition: "opacity 0.15s ease-out",
                }}
              >
                {/* Avatar (Left element) - translates left */}
                <div style={{
                  transform: `translateX(${avatarTx}px)`,
                  transition: "transform 0.15s ease-out",
                }}>
                  {/* Person info */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{ position: "absolute", top: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: "#EE6C13", zIndex: 2 }} />
                      <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        border: "1px solid #7b7a77",
                        background: "#e5ddd4",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "Outfit, sans-serif", fontWeight: 700,
                        fontSize: 20, color: "#190b00", flexShrink: 0,
                      }}>
                        {t.initials}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 11, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>{t.role}</p>
                      <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: 22, color: "#190b00", margin: 0 }}>{t.name}</p>
                      <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: 14, color: "#77695d", margin: 0 }}>{t.company}</p>
                    </div>
                  </div>
                </div>

                {/* Speech Bubble + Link (Right element) - translates right */}
                <div style={{
                  transform: `translateX(${bubbleTx}px)`,
                  transition: "transform 0.15s ease-out",
                }}>
                  {/* Speech bubble quote */}
                  <div style={{
                    position: "relative",
                    background: "#e5ddd4",
                    borderRadius: 12,
                    padding: "32px 36px",
                    width: 800,
                    boxSizing: "border-box",
                    marginBottom: 16,
                  }}>
                    <div style={{
                      position: "absolute",
                      top: -14, left: 40,
                      width: 0, height: 0,
                      borderLeft: "14px solid transparent",
                      borderRight: "14px solid transparent",
                      borderBottom: "14px solid #e5ddd4",
                    }} />
                    <p style={{
                      fontFamily: "Outfit, sans-serif", fontWeight: 400,
                      fontSize: 18, color: "#190b00",
                      lineHeight: 1.6, margin: 0,
                    }}>
                      {t.quote}
                    </p>
                  </div>

                  {/* VIEW ON LINKEDIN link */}
                  <div
                    style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, cursor: "pointer", marginTop: 12 }}
                    onClick={() => window.open(t.linkedin, "_blank")}
                  >
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 12, color: "#77695d", letterSpacing: "0.6px", textTransform: "uppercase", margin: 0 }}>VIEW ON LINKEDIN</p>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d={svgPaths.p18019200} fill="#EE6C13" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar / dot navigation (outside and below the card) */}
      <div style={{ position: "absolute", top: 820, left: 0, right: 0, display: "flex", gap: 20, alignItems: "center", width: "100%" }}>
        {[p0, p1, p2].map((progress, i) => (
          <div
            key={i}
            onClick={() => handleDotClick(i)}
            style={{
              height: 4,
              borderRadius: 2,
              cursor: "pointer",
              transition: "all 0.1s ease",
              background: "#e5ddd4",
              flex: i === (p < 0.33 ? 0 : p < 0.66 ? 1 : 2) ? 3.5 : 1,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Real-time filling indicator */}
            <div
              style={{
                position: "absolute",
                top: 0, left: 0, bottom: 0,
                width: `${progress}%`,
                background: "#EE6C13",
                borderRadius: 2,
                transition: "width 0.1s linear",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
