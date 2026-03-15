export default function FamilyCompleteOverlay({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(640px, 92vw)",
          borderColor: "rgba(255,195,140,0.28)",
          boxShadow:
            "0 0 50px rgba(255,195,140,0.18), 0 20px 60px rgba(0,0,0,0.5)",
          textAlign: "center",
          padding:
            "clamp(24px, calc(16px + 2.2vw), 80px) clamp(20px, calc(14px + 1.8vw), 68px)",
        }}
      >
        <p
          style={{
            margin: "0 0 clamp(14px, calc(10px + 1vw), 34px)",
            fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
            lineHeight: 1.9,
            color: "rgba(255,220,190,0.88)",
          }}
        >
          I admire my family for how we hold together, even when tempers flare or
          disagreements arise. We're stable, we support each other, and even in
          small moments, there's care and understanding that keeps us connected.
        </p>

        <p
          style={{
            margin: 0,
            fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
            lineHeight: 1.9,
            color: "rgba(255,220,190,0.88)",
          }}
        >
          Yet I wish they could see me more fully—not just the youngest sibling
          or the one who must follow rules. I wish they could understand my
          perspective, the thoughts behind my choices, and the ways I'm learning
          to grow. I hope they know I'm trying to find my own voice while still
          being part of this family.
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: "clamp(16px, calc(10px + 1vw), 38px)",
            padding:
              "clamp(8px, calc(5px + 0.42vw), 18px) clamp(16px, calc(10px + 0.8vw), 32px)",
            background: "rgba(255,195,140,0.12)",
            border: "1px solid rgba(255,195,140,0.35)",
            borderRadius: 8,
            color: "rgba(255,220,190,0.92)",
            cursor: "pointer",
            fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
            letterSpacing: "0.04em",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
