import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export interface MobileImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  type?: "image" | "video";
}

export function MobileImageLightbox({
  isOpen,
  onClose,
  src,
  alt,
  type,
}: MobileImageLightboxProps) {
  const isVideo = type === "video" || (typeof src === "string" && (src.includes(".mp4") || src.includes(".webm")));

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="mobile-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      {/* Floating Close Button */}
      <button
        type="button"
        className="mobile-lightbox-close-btn"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close media preview"
      >
        ✕
      </button>

      {/* Fullscreen media filling viewport */}
      {isVideo ? (
        <video
          src={src}
          className="mobile-lightbox-fullscreen-img"
          autoPlay
          loop
          playsInline
          controls
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="mobile-lightbox-fullscreen-img"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>,
    document.body
  );
}

export default MobileImageLightbox;
