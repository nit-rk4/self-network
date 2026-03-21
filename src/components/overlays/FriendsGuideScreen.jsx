import { FiX } from "react-icons/fi";

export default function FriendsGuideScreen({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(680px, 92vw)",
          borderColor: "rgba(120,200,100,0.2)",
          boxShadow:
            "0 0 50px rgba(80,160,60,0.12), 0 20px 60px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(16px, calc(12px + 1.2vw), 40px)",
          }}
        >
          <h2
            className="pixel-text"
            style={{
              fontSize: "clamp(10px, calc(6px + 0.4vw), 18px)",
              color: "rgba(140,210,120,0.9)",
              margin: 0,
              letterSpacing: "0.06em",
            }}
          >
            🌿 FRIENDS GUIDE
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(120,200,100,0.08)",
              border: "1px solid rgba(120,200,100,0.25)",
              borderRadius: "50%",
              width: "clamp(28px, calc(20px + 1vw), 44px)",
              height: "clamp(28px, calc(20px + 1vw), 44px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(140,210,120,0.9)",
              fontSize: "clamp(14px, calc(10px + 0.6vw), 28px)",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        {/* Guide content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px, calc(10px + 1vw), 36px)",
            textAlign: "left",
          }}
        >
          <div>
            <h3
              className="pixel-text"
              style={{
                fontSize: "clamp(7px, calc(4px + 0.3vw), 12px)",
                color: "rgba(120,190,100,0.75)",
                marginBottom: "clamp(6px, calc(4px + 0.35vw), 14px)",
                letterSpacing: "0.05em",
              }}
            >
              THE VINE
            </h3>
            <p
              style={{
                fontSize: "clamp(11px, calc(7px + 0.42vw), 20px)",
                lineHeight: 1.7,
                color: "rgba(180,220,160,0.8)",
                margin: 0,
              }}
            >
              The vine stretches across the screen, carrying the leaves of your
              friendships. <strong>Hover left or right</strong> to scroll through
              the leaves and discover each friend's story.
            </p>
          </div>

          <div>
            <h3
              className="pixel-text"
              style={{
                fontSize: "clamp(7px, calc(4px + 0.3vw), 12px)",
                color: "rgba(120,190,100,0.75)",
                marginBottom: "clamp(6px, calc(4px + 0.35vw), 14px)",
                letterSpacing: "0.05em",
              }}
            >
              THE LEAVES
            </h3>
            <p
              style={{
                fontSize: "clamp(11px, calc(7px + 0.42vw), 20px)",
                lineHeight: 1.7,
                color: "rgba(180,220,160,0.8)",
                margin: 0,
              }}
            >
              Each <strong>green leaf</strong> on the top vine represents a
              friend. Click on any leaf to see their photo, how you met, and
              what you like about them.
            </p>
          </div>

          <div>
            <h3
              className="pixel-text"
              style={{
                fontSize: "clamp(7px, calc(4px + 0.3vw), 12px)",
                color: "rgba(120,190,100,0.75)",
                marginBottom: "clamp(6px, calc(4px + 0.35vw), 14px)",
                letterSpacing: "0.05em",
              }}
            >
              BELOW THE VINE
            </h3>
            <p
              style={{
                fontSize: "clamp(11px, calc(7px + 0.42vw), 20px)",
                lineHeight: 1.7,
                color: "rgba(180,220,160,0.8)",
                margin: 0,
              }}
            >
              The lower vine holds two special leaves: a <strong>paper
              scroll</strong> with lists about friendship, and a{" "}
              <strong>letter envelope</strong> — a message written to your best
              friend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
