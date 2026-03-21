import NodeOverlay from "./NodeOverlay";
import papaPhoto from "../../assets/papa.jpg";

const PAPA_COLOR = "140,180,220";

export default function PapaOverlay({ onClose }) {
  return (
    <NodeOverlay title="PAPA" onClose={onClose} color={PAPA_COLOR} leafShaped>
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
              border: `1px solid rgba(${PAPA_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${PAPA_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img src={papaPhoto} alt="Papa" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
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
                color: `rgb(${PAPA_COLOR})`,
                marginBottom: "clamp(8px, calc(5px + 0.48vw), 20px)",
                opacity: 0.8,
              }}
            >
              PAPA
            </h3>
            <p
              style={{
                fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                lineHeight: 1.7,
                color: `rgba(${PAPA_COLOR},0.85)`,
                margin: 0,
              }}
            >
              My father has always wanted to be present in our lives, and I know
              that one day I'll deeply value the memories we've built. Even when
              I've felt distant or inadequate as a daughter, I recognize how much
              I appreciate his constant effort to be part of our family. What I
              struggle with is his strictness and tendency to read disagreement
              as disrespect—it can feel suffocating at times. From him, I may
              have inherited my temper, though most of his other traits shine
              through my siblings.
            </p>
          </div>
        </div>
      </div>
    </NodeOverlay>
  );
}
