import NodeOverlay from "./NodeOverlay";

const ATE_DIANNE_COLOR = "140,220,190";

export default function AteDianneOverlay({ onClose }) {
  return (
    <NodeOverlay title="ATE DIANNE" onClose={onClose} color={ATE_DIANNE_COLOR}>
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
              border: `1px solid rgba(${ATE_DIANNE_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${ATE_DIANNE_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                color: `rgba(${ATE_DIANNE_COLOR},0.3)`,
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
