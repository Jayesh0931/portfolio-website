import React, { useRef, useState, useCallback, useEffect } from "react";
import profileImg from "@/imports/Profile Image Full Size.webp";

interface ProfileCardProps {
  imageSrc?: string;
  width?: number | string;
  aspectRatio?: string;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  imageSrc = profileImg,
  width = 250,
  aspectRatio = "4/5",
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isLoaded, setIsLoaded] = useState(false);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt limits: -14 to +14 deg
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;

    // Glare coordinates in percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setTransform({ rotateX, rotateY, glareX, glareY });
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // Mobile tilt (device orientation if supported)
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      style={{
        perspective: 1000,
        width,
        display: "inline-block",
      }}
      className={className}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          aspectRatio,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: isHovered
            ? `rotateX(${transform.rotateX.toFixed(2)}deg) rotateY(${transform.rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.08s ease-out, box-shadow 0.25s ease-out"
            : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out",
          boxShadow: isHovered
            ? "0 22px 38px -12px rgba(25, 11, 0, 0.22), 0 8px 16px -6px rgba(234, 88, 12, 0.15)"
            : "0 4px 12px rgba(25, 11, 0, 0.05)",
          border: "1px solid #7b7a77",
          boxSizing: "border-box",
          backgroundColor: "#FFFDFA",
          overflow: "hidden",
          cursor: "crosshair",
          userSelect: "none",
        }}
      >
        {/* Skeleton Shimmer while loading */}
        {!isLoaded && <div className="absolute inset-0 skeleton-shimmer" />}

        {/* Profile Image (Base layer) */}
        <img
          src={imageSrc}
          alt="Jayesh Soni Profile - Product Lead & AI Designer"
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.4s ease-out",
            transform: "translateZ(0px)",
          }}
        />

        {/* Dynamic Holographic / Glare Sheen Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            mixBlendMode: "color-dodge",
            opacity: isHovered ? 0.65 : 0,
            transition: "opacity 0.3s ease-out",
            background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(255, 255, 255, 0.7) 0%, rgba(234, 88, 12, 0.15) 35%, transparent 75%)`,
            transform: "translateZ(14px)",
          }}
        />

        {/* Iridescent Holo Grain Foil on Hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: isHovered ? 0.18 : 0,
            transition: "opacity 0.35s ease",
            background: `linear-gradient(${transform.rotateY * 10 + 135}deg, rgba(234,88,12,0.4) 0%, rgba(255,255,255,0.6) 50%, rgba(25,11,0,0.3) 100%)`,
            transform: "translateZ(18px)",
          }}
        />

        {/* Subtle corner registration ticks for brutalist precision */}
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 2,
            width: 5,
            height: 5,
            borderTop: "1.5px solid #190b00",
            borderLeft: "1.5px solid #190b00",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            width: 5,
            height: 5,
            borderTop: "1.5px solid #190b00",
            borderRight: "1.5px solid #190b00",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 2,
            left: 2,
            width: 5,
            height: 5,
            borderBottom: "1.5px solid #190b00",
            borderLeft: "1.5px solid #190b00",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 5,
            height: 5,
            borderBottom: "1.5px solid #190b00",
            borderRight: "1.5px solid #190b00",
            pointerEvents: "none",
          }}
        />
      </div>

      <style>{`
        @keyframes profileCardBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;
