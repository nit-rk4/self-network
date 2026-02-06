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
          maxWidth: 520,
          borderColor: "rgba(140,100,200,0.2)",
          boxShadow:
            "0 0 60px rgba(140,100,200,0.12), 0 20px 60px rgba(0,0,0,0.5)",
          textAlign: "center",
          padding: "48px 40px",
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
            width: 72,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
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
              fontSize: 28,
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
            fontSize: 11,
            color: "rgba(180,140,240,0.8)",
            margin: "0 0 20px",
            letterSpacing: "0.12em",
          }}
        >
          THE ABYSS
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(180,140,240,0.5)",
            lineHeight: 1.8,
            margin: "0 0 12px",
          }}
        >
          Beyond here lie the most fragile parts of who I am — the feelings
          I struggle to accept, the things I find hardest to face,
          and words I've never said out loud.
        </p>

        <p
          style={{
            fontSize: 13,
            color: "rgba(180,140,240,0.4)",
            lineHeight: 1.7,
            margin: "0 0 32px",
            fontStyle: "italic",
          }}
        >
          This is not a place of fear. It is a place of honesty.
        </p>

        {/* Prompt */}
        <p
          style={{
            fontSize: 12,
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
            marginTop: 24,
            background: "none",
            border: "none",
            color: "rgba(140,100,200,0.3)",
            fontSize: 12,
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
