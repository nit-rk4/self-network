import NodeOverlay from "./NodeOverlay";
import dorcasPhoto from "../../assets/dorcas.jpg";

const ATE_DJ_COLOR = "255,160,140";

export default function AteDJOverlay({ onClose }) {
  return (
    <NodeOverlay title="ATE DJ" onClose={onClose} color={ATE_DJ_COLOR} leafShaped>
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
              border: `1px solid rgba(${ATE_DJ_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${ATE_DJ_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img src={dorcasPhoto} alt="Ate DJ" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
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
                color: `rgb(${ATE_DJ_COLOR})`,
                marginBottom: "clamp(8px, calc(5px + 0.48vw), 20px)",
                opacity: 0.8,
              }}
            >
              ATE DJ
            </h3>
            <p
              style={{
                fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                lineHeight: 1.7,
                color: `rgba(${ATE_DJ_COLOR},0.85)`,
                margin: 0,
              }}
            >
              Ate DJ and I bond over games and shared excitement for the little
              adventures in life, from good computers to hanging out with
              friends. But I struggle with her laziness and sarcastic temper. She
              can become sharp and biting when frustrated, demanding tasks from
              me while not sharing responsibility. Loving her means accepting her
              flaws alongside the fun we have together.
            </p>
          </div>
        </div>
      </div>
    </NodeOverlay>
  );
}
