import NodeOverlay from "./NodeOverlay";

const FRIEND_COLOR = "120,200,100";

export default function FriendDetailOverlay({ friend, onClose }) {
  if (!friend) return null;

  return (
    <NodeOverlay title={friend.name} onClose={onClose} color={FRIEND_COLOR} leafShaped>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(16px, calc(12px + 1.2vw), 36px)",
          paddingBottom: "20px",
        }}
      >
        {/* Photo */}
        <div
          style={{
            flex: "0 0 auto",
            width: "clamp(120px, 45%, 220px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              border: `1px solid rgba(${FRIEND_COLOR},0.25)`,
              borderRadius: 12,
              background: `rgba(${FRIEND_COLOR},0.05)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {friend.photo ? (
              <img
                src={friend.photo}
                alt={friend.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontSize: "clamp(28px, calc(18px + 1.5vw), 56px)",
                  opacity: 0.25,
                  color: `rgb(${FRIEND_COLOR})`,
                }}
              >
                📷
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "clamp(12px, calc(8px + 0.9vw), 28px)",
          }}
        >
          {/* How We Met */}
          <div>
            <h3
              className="pixel-text"
              style={{
                fontSize: "clamp(6px, calc(4px + 0.28vw), 11px)",
                color: `rgba(${FRIEND_COLOR},0.7)`,
                marginBottom: "clamp(6px, calc(4px + 0.4vw), 14px)",
                letterSpacing: "0.06em",
              }}
            >
              HOW WE MET
            </h3>
            <p
              style={{
                fontSize: "clamp(10px, calc(6px + 0.42vw), 18px)",
                lineHeight: 1.7,
                color: `rgba(${FRIEND_COLOR},0.85)`,
                margin: 0,
              }}
            >
              {friend.howWeMet}
            </p>
          </div>

          {/* What I Like */}
          <div>
            <h3
              className="pixel-text"
              style={{
                fontSize: "clamp(6px, calc(4px + 0.28vw), 11px)",
                color: `rgba(${FRIEND_COLOR},0.7)`,
                marginBottom: "clamp(6px, calc(4px + 0.4vw), 14px)",
                letterSpacing: "0.06em",
              }}
            >
              WHAT I LIKE ABOUT THEM
            </h3>
            <p
              style={{
                fontSize: "clamp(10px, calc(6px + 0.42vw), 18px)",
                lineHeight: 1.7,
                color: `rgba(${FRIEND_COLOR},0.85)`,
                margin: 0,
              }}
            >
              {friend.whatILike}
            </p>
          </div>
        </div>
      </div>
    </NodeOverlay>
  );
}
