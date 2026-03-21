import NodeOverlay from "./NodeOverlay";

const GRANDPARENTS_COLOR = "180,155,120";

export default function GrandparentsOverlay({ onClose }) {
  return (
    <NodeOverlay title="GRANDPARENTS" onClose={onClose} color={GRANDPARENTS_COLOR} leafShaped>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: 0,
        }}
      >
        <p
          style={{
            fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
            lineHeight: 1.9,
            color: `rgba(${GRANDPARENTS_COLOR},0.88)`,
            margin: 0,
            textAlign: "center",
            maxWidth: "min(560px, 80%)",
            fontStyle: "italic",
          }}
        >
          I miss the grandparents I knew and the ones I never met. I wish I had
          spent more time learning from them, hearing their stories firsthand,
          and experiencing the lives that shaped my parents. I carry their legacy
          in the family stories, and I long for a connection I can only imagine.
        </p>
      </div>
    </NodeOverlay>
  );
}
