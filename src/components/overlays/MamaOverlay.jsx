import NodeOverlay from "./NodeOverlay";
import mamaPhoto from "../../assets/mama.jpg";

const MAMA_COLOR = "255,195,140";

export default function MamaOverlay({ onClose }) {
  return (
    <NodeOverlay title="MAMA" onClose={onClose} color={MAMA_COLOR} leafShaped>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(20px, calc(15px + 1.5vw), 40px)",
          paddingBottom: "20px",
        }}
      >
        {/* Left side - Photo placeholder */}
        <div
          style={{
            flex: "0 0 auto",
            width: "clamp(140px, 50%, 250px)",
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
              border: `1px solid rgba(${MAMA_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${MAMA_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img src={mamaPhoto} alt="Mama" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
          </div>
        </div>

        {/* Right side - Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "clamp(14px, calc(10px + 1vw), 38px)",
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
