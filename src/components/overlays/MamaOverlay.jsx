import NodeOverlay from "./NodeOverlay";

const MAMA_COLOR = "255,195,140";

export default function MamaOverlay({ onClose }) {
  return (
    <NodeOverlay title="MAMA" onClose={onClose} color={MAMA_COLOR}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "clamp(16px, calc(12px + 1.3vw), 52px)",
          height: "100%",
          minHeight: 0,
        }}
      >
        {/* Left side - Photo placeholder */}
        <div
          style={{
            flex: "1 1 clamp(180px, 40%, 300px)",
            minWidth: "min(180px, 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              maxHeight: "clamp(200px, 40vh, 480px)",
              border: `1px solid rgba(${MAMA_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${MAMA_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                color: `rgba(${MAMA_COLOR},0.3)`,
                fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
                textAlign: "center",
                padding: 16,
              }}
            >
              [ photo ]
            </span>
          </div>
        </div>

        {/* Right side - Description */}
        <div
          style={{
            flex: "1 1 clamp(200px, 50%, 400px)",
            minWidth: "min(200px, 100%)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(14px, calc(10px + 1vw), 38px)",
            overflowY: "auto",
          }}
        >
          <div>
            <h3
              className="pixel-text"
              style={{
                fontSize: "clamp(8px, calc(5px + 0.35vw), 16px)",
                color: `rgb(${MAMA_COLOR})`,
                marginBottom: "clamp(8px, calc(5px + 0.48vw), 20px)",
                opacity: 0.8,
              }}
            >
              MAMA
            </h3>
            <p
              style={{
                fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                lineHeight: 1.7,
                color: `rgba(${MAMA_COLOR},0.85)`,
                margin: 0,
              }}
            >
              My mother moves through our lives with quiet care, making countless
              small sacrifices that remind me how much she loves us. Even as time
              changes her, the care she offers feels timeless, the same way she
              cared for us when we were little. What I struggle with is how
              closely she manages our lives—I feel tethered to her oversight,
              like I haven't fully learned to bloom on my own. From her, I've
              inherited not just my height and face, but a sense of warmth in the
              small gestures that shape daily life.
            </p>
          </div>
        </div>
      </div>
    </NodeOverlay>
  );
}
