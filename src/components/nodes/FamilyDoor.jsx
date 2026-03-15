import { useState } from "react";
import { FiLock } from "react-icons/fi";

export default function FamilyDoor({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "clamp(16px, calc(10px + 1.8vw), 60px)",
        right: "clamp(16px, calc(10px + 1.8vw), 60px)",
        zIndex: 45,
        width: "clamp(60px, calc(40px + 3.3vw), 130px)",
        height: "clamp(90px, calc(60px + 5vw), 200px)",
        background: hovered
          ? "linear-gradient(180deg, rgba(50,30,15,0.95) 0%, rgba(30,18,8,0.98) 100%)"
          : "linear-gradient(180deg, rgba(40,24,12,0.9) 0%, rgba(24,14,6,0.95) 100%)",
        border: `1px solid rgba(255,180,100,${hovered ? 0.5 : 0.25})`,
        borderRadius: "10px 10px 2px 2px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        boxShadow: hovered
          ? "0 0 30px rgba(255,180,100,0.3), 0 0 60px rgba(255,140,60,0.15), inset 0 0 20px rgba(255,180,100,0.08)"
          : "0 0 18px rgba(255,180,100,0.15), 0 0 40px rgba(255,140,60,0.08)",
        transition: "all 0.4s ease",
        overflow: "hidden",
      }}
      aria-label="Open the locked door"
    >
      {/* Door arch at the top */}
      <div
        style={{
          position: "absolute",
          top: -1,
          left: -1,
          right: -1,
          height: 36,
          borderRadius: "10px 10px 0 0",
          background: "linear-gradient(180deg, rgba(255,180,100,0.12) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Lock icon */}
      <FiLock
        style={{
          fontSize: "clamp(16px, calc(10px + 0.7vw), 36px)",
          color: `rgba(255,200,130,${hovered ? 0.9 : 0.5})`,
          filter: hovered ? "drop-shadow(0 0 6px rgba(255,180,100,0.5))" : "none",
          transition: "all 0.4s ease",
        }}
      />

      {/* Label */}
      <span
        className="pixel-text"
        style={{
          fontSize: "clamp(5px, calc(3px + 0.28vw), 12px)",
          color: `rgba(255,200,130,${hovered ? 0.8 : 0.4})`,
          letterSpacing: "0.15em",
          transition: "all 0.4s ease",
        }}
      >
        ? ? ?
      </span>

      {/* Bottom light slit */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "25%",
          right: "25%",
          height: 2,
          background: `rgba(255,180,100,${hovered ? 0.5 : 0.2})`,
          borderRadius: "2px 2px 0 0",
          transition: "all 0.4s ease",
        }}
      />
    </button>
  );
}
