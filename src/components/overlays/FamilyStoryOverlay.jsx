export default function FamilyStoryOverlay({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(640px, 92vw)",
          borderColor: "rgba(255,180,100,0.28)",
          boxShadow:
            "0 0 50px rgba(255,180,100,0.18), 0 20px 60px rgba(0,0,0,0.5)",
          textAlign: "center",
          padding:
            "clamp(24px, calc(16px + 2.2vw), 80px) clamp(20px, calc(14px + 1.8vw), 68px)",
        }}
      >
        {/* Title */}
        <h2
          className="pixel-text"
          style={{
            fontSize: "clamp(9px, calc(5px + 0.4vw), 18px)",
            color: "rgba(255,200,130,0.8)",
            margin: "0 0 clamp(12px, calc(8px + 0.8vw), 36px)",
            letterSpacing: "0.12em",
          }}
        >
          AN EMBARRASSING STORY
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
            lineHeight: 1.9,
            color: "rgba(255,220,180,0.88)",
            fontStyle: "italic",
          }}
        >
          One afternoon, Ate DJ kept stopping to ask every security guard if they
          were single, laughing like it was the funniest thing in the world.
          Inspired, I decided to try being "bold" too — walking up to strangers
          and offering high-fives as a way to become more "extroverted". I aimed
          for this tall guy (who was willing to participate), swung my hand,
          missed, and accidentally knocked over his iced coffee. It spilled on
          his bag and my shoe. My sisters ended up paying for his coffee and have
          never let me live this down.
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: "clamp(16px, calc(10px + 1vw), 38px)",
            padding:
              "clamp(8px, calc(5px + 0.42vw), 18px) clamp(16px, calc(10px + 0.8vw), 32px)",
            background: "rgba(255,180,100,0.12)",
            border: "1px solid rgba(255,200,130,0.35)",
            borderRadius: 8,
            color: "rgba(255,220,180,0.92)",
            cursor: "pointer",
            fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
            letterSpacing: "0.04em",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
