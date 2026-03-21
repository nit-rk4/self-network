import NodeOverlay from "./NodeOverlay";
import diannePhoto from "../../assets/dianne.jpg";

const ATE_DIANNE_COLOR = "140,220,190";

export default function AteDianneOverlay({ onClose }) {
  return (
    <NodeOverlay title="ATE DIANNE" onClose={onClose} color={ATE_DIANNE_COLOR} leafShaped>
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
              border: `1px solid rgba(${ATE_DIANNE_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${ATE_DIANNE_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img src={diannePhoto} alt="Ate Dianne" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
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
                color: `rgb(${ATE_DIANNE_COLOR})`,
                marginBottom: "clamp(8px, calc(5px + 0.48vw), 20px)",
                opacity: 0.8,
              }}
            >
              ATE DIANNE
            </h3>
            <p
              style={{
                fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                lineHeight: 1.7,
                color: `rgba(${ATE_DIANNE_COLOR},0.85)`,
                margin: 0,
              }}
            >
              Ate Dianne is the sibling I confide in most. I can tell her
              everything, and despite our occasional fights, I feel deeply
              connected to her. What frustrates me is when she mirrors the
              behaviors of our older sisters to avoid responsibility or assert
              control. I admire her honesty and closeness, but wish we could
              navigate fairness without the "ate card" hierarchy interfering.
            </p>
          </div>
        </div>
      </div>
    </NodeOverlay>
  );
}
