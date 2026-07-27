import React, { useState } from "react";
import profileImg from "@/imports/Profile Image Full Size.png";

interface ContactButtonProps {
  label?: string;
  iconPath: string;
  hoverIconPath?: string;
  onClick: () => void;
  circular?: boolean;
}

function ContactButton({ label, iconPath, hoverIconPath, onClick, circular }: ContactButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: circular ? 0 : 10,
        width: circular ? 40 : "auto",
        height: 40,
        padding: circular ? 0 : "0 24px",
        border: "1px solid #7b7a77",
        borderRadius: circular ? "50%" : 24,
        cursor: "pointer",
        background: hover ? "#190b00" : "transparent",
        transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hover ? "0 4px 12px rgba(25, 11, 0, 0.12)" : "none",
        boxSizing: "border-box",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ transition: "fill 0.25s ease" }}>
        <path d={hover && hoverIconPath ? hoverIconPath : iconPath} fill={hover ? "#FFFDFA" : "#EE6C13"} />
      </svg>
      {!circular && label && (
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.6px",
          color: hover ? "#FFFDFA" : "#190b00",
          transition: "color 0.25s ease",
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

interface FooterProps {
  style?: React.CSSProperties;
}

export default function Footer({ style }: FooterProps) {
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const mailIcon = "M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z";
  const linkedinIcon = "M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z";
  const resumeIcon = "M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM6 15V17H18V15H6ZM6 7V13H12V7H6ZM14 7V9H18V7H14ZM14 11V13H18V11H14ZM8 9H10V11H8V9Z";

  const copyIcon = "M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z";
  const externalLinkIcon = "M10 3V5H5V19H19V14H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H10ZM17.7071 7.70711L12 13.4142L10.5858 12L16.2929 6.29289L13 3H21V11L17.7071 7.70711Z";
  const downloadIcon = "M3 19H21V21H3V19ZM13 9H20L12 17L4 9H11V1H13V9Z";
  const phoneIcon = "M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z";
  const phoneLineIcon = "M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z";

  return (
    <div style={{
      width: 1280,
      height: 560,
      background: "#FFFDFA",
      border: "1px solid #7b7a77",
      display: "flex",
      boxSizing: "border-box",
      ...style,
    }}>
      {/* ── Left Column (960px) ── */}
      <div style={{
        width: 960,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #7b7a77",
        boxSizing: "border-box",
      }}>
        {/* Top Header Area (280px) */}
        <div style={{
          height: 280,
          padding: "45px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderBottom: "1px solid #7b7a77",
          boxSizing: "border-box",
        }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 12,
            color: "#77695d",
            letterSpacing: "0.6px",
            textTransform: "uppercase",
            margin: "0 0 10px 0",
          }}>
            [ S-006 ]
          </p>
          <h2 style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 900,
            fontSize: 145,
            lineHeight: 0.9,
            color: "#190b00",
            margin: 0,
            letterSpacing: "-4px",
            textTransform: "uppercase",
          }}>
            NEXT <span style={{ color: "#EE6C13" }}>?</span>
          </h2>
        </div>

        {/* Bottom Body Area (280px) */}
        <div style={{
          height: 280,
          padding: "45px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}>
          <p style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: "#77695d",
            lineHeight: 1.5,
            maxWidth: 680,
            margin: 0,
          }}>
            That's my story so far. If you're building thoughtful AI products—or simply want to talk design—I'd love to hear from you.
          </p>

          {/* Action Buttons Row */}
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
            {/* Left Circular Buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <ContactButton
                iconPath={phoneIcon}
                hoverIconPath={phoneLineIcon}
                onClick={() => window.location.href = "tel:+91-9755113185"}
                circular
              />
              <ContactButton
                iconPath={mailIcon}
                hoverIconPath={copyIcon}
                onClick={() => {
                  navigator.clipboard.writeText("jayeshsoni@example.com");
                  alert("Email copied to clipboard!");
                }}
                circular
              />
            </div>
            {/* Right Pill Buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <ContactButton
                label="LINKEDIN"
                iconPath={linkedinIcon}
                hoverIconPath={externalLinkIcon}
                onClick={() => window.open("https://linkedin.com/in/", "_blank")}
              />
              <ContactButton
                label="RESUME"
                iconPath={resumeIcon}
                hoverIconPath={downloadIcon}
                onClick={() => window.open("/Jayesh_Soni_Resume.html", "_blank")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Column (320px) ── */}
      <div style={{
        width: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "50px 30px",
        boxSizing: "border-box",
      }}>
        {/* Profile Image container adjusting automatically to original aspect ratio */}
        <div style={{
          width: 250,
          aspectRatio: "2/3",
          border: "1px solid #7b7a77",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}>
          {!isProfileLoaded && (
            <div className="absolute inset-0 skeleton-shimmer" />
          )}
          <img
            src={profileImg}
            alt="Jayesh Soni Profile"
            onLoad={() => setIsProfileLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: isProfileLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-out",
            }}
          />
        </div>
        <div style={{ width: 250, textAlign: "left" }}>
          <h3 style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: 24,
            color: "#190b00",
            margin: "20px 0 0 0",
          }}>
            Jayesh Soni
          </h3>
          <p style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "#77695d",
            margin: "4px 0 0 0",
          }}>
            Product Lead & AI Product Designer
          </p>
        </div>
      </div>
    </div>
  );
}
