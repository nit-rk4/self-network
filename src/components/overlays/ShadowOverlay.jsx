import NodeOverlay from "./NodeOverlay";

const SHADOW_COLOR = "160,100,220";

export default function ShadowOverlay({ onClose }) {
  return (
    <NodeOverlay title="SHADOWS" onClose={onClose} color={SHADOW_COLOR}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(12px, calc(8px + 0.8vw), 36px)",
          textAlign: "center",
          padding: "clamp(8px, calc(6px + 0.7vw), 28px) 0",
        }}
      >
        <p
          style={{
            fontSize: "clamp(12px, calc(7px + 0.48vw), 24px)",
            lineHeight: 1.8,
            color: `rgba(${SHADOW_COLOR},0.8)`,
            margin: 0,
          }}
        >
          Most people prefer not to notice their insecurities, hoping they'll disappear. 
          <br/>Yet they remain, always following, quietly shaping who we are.
        </p>
        <div
          style={{
            fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
            color: `rgba(${SHADOW_COLOR},0.5)`,
            fontStyle: "italic",
          }}
        >
          Look around you. 
          Notice what wasn't obvious before, that emerges only when you pay attention.
        </div>
      </div>
    </NodeOverlay>
  );
}
