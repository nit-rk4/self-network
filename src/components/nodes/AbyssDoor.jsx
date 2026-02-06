import { useState } from "react";
import { FiLock } from "react-icons/fi";

export default function AbyssDoor({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="abyss-door"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 36,
        right: 36,
        zIndex: 45,
        width: 88,
        height: 132,
        background: hovered
          ? "linear-gradient(180deg, rgba(20,10,30,0.95) 0%, rgba(8,4,16,0.98) 100%)"
          : "linear-gradient(180deg, rgba(14,8,22,0.9) 0%, rgba(6,3,12,0.95) 100%)",
        border: `1px solid rgba(140,100,200,${hovered ? 0.5 : 0.25})`,
        borderRadius: "10px 10px 2px 2px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        boxShadow: hovered
          ? "0 0 30px rgba(140,100,200,0.3), 0 0 60px rgba(80,40,160,0.15), inset 0 0 20px rgba(140,100,200,0.08)"
          : "0 0 18px rgba(140,100,200,0.15), 0 0 40px rgba(80,40,160,0.08)",
        transition: "all 0.4s ease",
        overflow: "hidden",
      }}
      aria-label="Enter the Abyss"
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
          background: "linear-gradient(180deg, rgba(140,100,200,0.12) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Keyhole / lock icon */}
      <FiLock
        style={{
          fontSize: 24,
          color: `rgba(180,140,240,${hovered ? 0.9 : 0.5})`,
          filter: hovered ? "drop-shadow(0 0 6px rgba(140,100,200,0.5))" : "none",
          transition: "all 0.4s ease",
        }}
      />

      {/* Label */}
      <span
        className="pixel-text"
        style={{
          fontSize: 7,
          color: `rgba(180,140,240,${hovered ? 0.8 : 0.4})`,
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
          background: `rgba(140,100,200,${hovered ? 0.5 : 0.2})`,
          borderRadius: "2px 2px 0 0",
          transition: "all 0.4s ease",
        }}
      />
    </button>
  );
}
