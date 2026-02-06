import { useState } from "react";
import { FiLock } from "react-icons/fi";

export default function AbyssEntryOverlay({ onClose, onEnter }) {
  const [lockHovered, setLockHovered] = useState(false);

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(520px, 90vw)",
          borderColor: "rgba(140,100,200,0.2)",
          boxShadow:
            "0 0 60px rgba(140,100,200,0.12), 0 20px 60px rgba(0,0,0,0.5)",
          textAlign: "center",
          padding: "clamp(24px, calc(16px + 2.2vw), 80px) clamp(20px, calc(14px + 1.8vw), 68px)",
        }}
      >
        {/* Lock icon as the "key" to enter */}
        <button
          onClick={onEnter}
          onMouseEnter={() => setLockHovered(true)}
          onMouseLeave={() => setLockHovered(false)}
          style={{
            background: lockHovered
              ? "rgba(140,100,200,0.12)"
              : "rgba(140,100,200,0.06)",
            border: `1px solid rgba(140,100,200,${lockHovered ? 0.5 : 0.25})`,
            borderRadius: "50%",
            width: "clamp(52px, calc(36px + 2.5vw), 100px)",
            height: "clamp(52px, calc(36px + 2.5vw), 100px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto clamp(16px, calc(12px + 1.1vw), 48px)",
            cursor: "pointer",
            transition: "all 0.4s ease",
            boxShadow: lockHovered
              ? "0 0 30px rgba(140,100,200,0.3), 0 0 60px rgba(80,40,160,0.1)"
              : "0 0 15px rgba(140,100,200,0.1)",
          }}
          aria-label="Enter the Abyss"
        >
          <FiLock
            style={{
              fontSize: "clamp(20px, calc(14px + 1vw), 48px)",
              color: lockHovered
                ? "rgba(200,170,255,0.9)"
                : "rgba(180,140,240,0.6)",
              transition: "all 0.4s ease",
            }}
          />
        </button>

        {/* Title */}
        <h2
          className="pixel-text"
          style={{
            fontSize: "clamp(9px, calc(5px + 0.4vw), 18px)",
            color: "rgba(180,140,240,0.8)",
            margin: "0 0 clamp(12px, calc(8px + 0.8vw), 36px)",
            letterSpacing: "0.12em",
          }}
        >
          THE ABYSS
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(12px, calc(7px + 0.48vw), 24px)",
            color: "rgba(180,140,240,0.5)",
            lineHeight: 1.8,
            margin: "0 0 clamp(8px, calc(5px + 0.48vw), 20px)",
          }}
        >
          Beyond here lie the most fragile parts of who I am — the feelings
          I struggle to accept, the things I find hardest to face,
          and words I've never said out loud.
        </p>

        <p
          style={{
            fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
            color: "rgba(180,140,240,0.4)",
            lineHeight: 1.7,
            margin: "0 0 clamp(18px, calc(12px + 1.25vw), 52px)",
            fontStyle: "italic",
          }}
        >
          This is not a place of fear. It is a place of honesty.
        </p>

        {/* Prompt */}
        <p
          style={{
            fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
            color: "rgba(180,140,240,0.55)",
            margin: 0,
            letterSpacing: "0.03em",
          }}
        >
          Press the lock to continue.
        </p>

        {/* Close hint */}
        <button
          onClick={onClose}
          style={{
            marginTop: "clamp(14px, calc(10px + 1vw), 42px)",
            background: "none",
            border: "none",
            color: "rgba(140,100,200,0.3)",
            fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
            cursor: "pointer",
            transition: "color 0.2s ease",
          }}
        >
          or turn back
        </button>
      </div>
    </div>
  );
}
