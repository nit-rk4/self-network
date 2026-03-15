import NodeOverlay from "./NodeOverlay";

const PAPA_COLOR = "140,180,220";

export default function PapaOverlay({ onClose }) {
  return (
    <NodeOverlay title="PAPA" onClose={onClose} color={PAPA_COLOR}>
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
              border: `1px solid rgba(${PAPA_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${PAPA_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                color: `rgba(${PAPA_COLOR},0.3)`,
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
