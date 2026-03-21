import NodeOverlay from "./NodeOverlay";
import marielPhoto from "../../assets/yhiel.jpg";

const ATE_MARIEL_COLOR = "200,160,220";

export default function AteMarielOverlay({ onClose }) {
  return (
    <NodeOverlay title="ATE MARIEL" onClose={onClose} color={ATE_MARIEL_COLOR} leafShaped>
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
              border: `1px solid rgba(${ATE_MARIEL_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${ATE_MARIEL_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img src={marielPhoto} alt="Ate Mariel" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
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
                color: `rgb(${ATE_MARIEL_COLOR})`,
                marginBottom: "clamp(8px, calc(5px + 0.48vw), 20px)",
                opacity: 0.8,
              }}
            >
              ATE MARIEL
            </h3>
            <p
              style={{
                fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                lineHeight: 1.7,
                color: `rgba(${ATE_MARIEL_COLOR},0.85)`,
                margin: 0,
              }}
            >
              With Ate Mariel, I share small joys that feel rare—talking about
              anime, music, and colors, laughing over stuffed toys, feeling
              understood in ways few people get. Yet when she's upset, her anger
              overwhelms me, her words cutting across mine, leaving little room
              for me to express myself. I treasure the harmony when she's in a
              good mood, and learn patience when she's not.
            </p>
          </div>
        </div>
      </div>
    </NodeOverlay>
  );
}
