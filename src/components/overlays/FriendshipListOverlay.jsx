import { FiX } from "react-icons/fi";

const GOOD_QUALITIES = [
  "Loyalty — standing by you even when it's hard",
  "Honesty — telling the truth with kindness",
  "Listening — hearing you without just waiting to speak",
  "Support — being there without trying to fix everything",
  "Patience — understanding that people grow at their own pace",
  "Trust — keeping your words safe",
  "Laughter — making even ordinary moments memorable",
  "Respect — honoring boundaries and differences",
];

const FRIENDSHIP_BREAKERS = [
  "Betrayal — breaking trust or talking behind someone's back",
  "Jealousy — resenting each other's happiness or success",
  "One-sidedness — only one person putting in effort",
  "Dishonesty — hiding things or lying to avoid conflict",
  "Toxicity — bringing each other down instead of lifting up",
  "Neglect — forgetting to show up when it matters",
  "Judgment — making someone feel small for being themselves",
  "Selfishness — always putting your needs first",
];

export default function FriendshipListOverlay({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(740px, 90vw)",
          maxHeight: "85vh",
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(210,195,155,0.12) 0%, transparent 60%),
            linear-gradient(175deg, #f6eee0 0%, #ece4d2 40%, #e3d8c4 100%)
          `,
          borderRadius: "clamp(6px, calc(4px + 0.3vw), 14px)",
          padding: "clamp(24px, calc(16px + 2.2vw), 72px) clamp(22px, calc(16px + 2vw), 64px)",
          boxShadow: `
            0 2px 0 #d4c8a8,
            0 4px 0 #c8bb9e,
            0 20px 60px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.5)
          `,
          overflowY: "auto",
          animation: "overlaySlideIn 0.4s ease forwards",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "clamp(12px, calc(8px + 0.6vw), 24px)",
            right: "clamp(12px, calc(8px + 0.6vw), 24px)",
            background: "rgba(160,130,80,0.1)",
            border: "1px solid rgba(160,130,80,0.25)",
            borderRadius: "50%",
            width: "clamp(28px, calc(20px + 1vw), 44px)",
            height: "clamp(28px, calc(20px + 1vw), 44px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(120,95,60,0.7)",
            fontSize: "clamp(14px, calc(9px + 0.6vw), 26px)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          aria-label="Close"
        >
          <FiX />
        </button>

        {/* Good Friend Qualities */}
        <div style={{ marginBottom: "clamp(28px, calc(18px + 2vw), 56px)" }}>
          <h2
            className="pixel-text"
            style={{
              fontSize: "clamp(8px, calc(5px + 0.35vw), 14px)",
              color: "#5a7348",
              marginBottom: "clamp(14px, calc(10px + 0.9vw), 32px)",
              letterSpacing: "0.06em",
            }}
          >
            🌿 QUALITIES OF A GOOD FRIEND
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(8px, calc(5px + 0.5vw), 18px)",
            }}
          >
            {GOOD_QUALITIES.map((q, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: "clamp(12px, calc(7px + 0.48vw), 22px)",
                  lineHeight: 1.6,
                  color: "#4a5e3a",
                  paddingLeft: "clamp(16px, calc(10px + 0.8vw), 32px)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0.15em",
                    fontSize: "clamp(10px, calc(6px + 0.35vw), 16px)",
                    color: "#6a8a52",
                    opacity: 0.7,
                  }}
                >
                  🍃
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(150,120,70,0.3), transparent)",
            margin: "clamp(16px, calc(10px + 1vw), 36px) 0",
          }}
        />

        {/* Things That Mess Up */}
        <div>
          <h2
            className="pixel-text"
            style={{
              fontSize: "clamp(8px, calc(5px + 0.35vw), 14px)",
              color: "#7a5040",
              marginBottom: "clamp(14px, calc(10px + 0.9vw), 32px)",
              letterSpacing: "0.06em",
            }}
          >
            🥀 THINGS THAT MESS UP A FRIENDSHIP
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(8px, calc(5px + 0.5vw), 18px)",
            }}
          >
            {FRIENDSHIP_BREAKERS.map((q, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: "clamp(12px, calc(7px + 0.48vw), 22px)",
                  lineHeight: 1.6,
                  color: "#6e4a3a",
                  paddingLeft: "clamp(16px, calc(10px + 0.8vw), 32px)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0.15em",
                    fontSize: "clamp(10px, calc(6px + 0.35vw), 16px)",
                    color: "#8a5a42",
                    opacity: 0.6,
                  }}
                >
                  🍂
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>

        {/* Close hint */}
        <p
          style={{
            marginTop: "clamp(20px, calc(14px + 1.2vw), 48px)",
            textAlign: "center",
            fontSize: "clamp(9px, calc(5px + 0.35vw), 16px)",
            color: "rgba(120,100,70,0.35)",
            fontStyle: "italic",
            fontFamily: "'Georgia', serif",
          }}
        >
          click outside to close
        </p>
      </div>
    </div>
  );
}
