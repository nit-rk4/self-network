import { FiX } from "react-icons/fi";

const guideItems = [
  {
    node: "IDENTITY",
    desc: "Introduces me, with a photo, description, and my favorite quote.",
    letters: "Letters A–C",
  },
  {
    node: "STRENGTHS",
    desc: "Highlights things I like about myself and my special talents.",
    letters: "Letters D and F",
  },
  {
    node: "SHADOWS",
    desc: "Examines the parts of myself that are difficult to face.",
    letters: "Letters E and K",
  },
  {
    node: "GROWTH",
    desc: "Reflects on areas I can improve, things I'm grateful for, and ways I can respect myself more.",
    letters: "Letters I and M",
  },
  {
    node: "FORGIVENESS",
    desc: "Covers forgiveness I seek, give, and extend to myself.",
    letters: "Letter J",
  },

];

export default function GuideScreen({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "min(640px, 90vw)", maxHeight: "80vh" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(14px, calc(10px + 1vw), 42px)",
          }}
        >
          <h2
            className="pixel-text"
            style={{
              fontSize: "clamp(10px, calc(6px + 0.48vw), 22px)",
              color: "var(--accent)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            GUIDE
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(102,210,255,0.08)",
              border: "1px solid rgba(102,210,255,0.2)",
              borderRadius: "50%",
              width: "clamp(28px, calc(18px + 1.1vw), 48px)",
              height: "clamp(28px, calc(18px + 1.1vw), 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              fontSize: "clamp(14px, calc(9px + 0.6vw), 30px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            aria-label="Close guide"
          >
            <FiX />
          </button>
        </div>

        <p
          style={{
            fontSize: "clamp(12px, calc(7px + 0.48vw), 24px)",
            color: "rgba(102,210,255,0.6)",
            marginBottom: "clamp(14px, calc(10px + 1vw), 42px)",
            lineHeight: 1.6,
          }}
        >
          Click on each node to explore a different part of my self.
          Here's what you'll find in each one:
        </p>

        {/* Guide items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, calc(6px + 0.7vw), 28px)" }}>
          {guideItems.map((item) => (
            <div
              key={item.node}
              style={{
                padding: "clamp(10px, calc(6px + 0.55vw), 24px) clamp(12px, calc(8px + 0.7vw), 30px)",
                background: "rgba(102,210,255,0.03)",
                border: "1px solid rgba(102,210,255,0.1)",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  className="pixel-text"
                  style={{
                    fontSize: "clamp(8px, calc(5px + 0.35vw), 16px)",
                    color: "var(--accent)",
                  }}
                >
                  {item.node}
                </span>
                <span
                  style={{
                    fontSize: "clamp(9px, calc(5px + 0.4vw), 18px)",
                    color: "rgba(102,210,255,0.4)",
                    flexShrink: 0,
                    marginLeft: 12,
                  }}
                >
                  {item.letters}
                </span>
              </div>
              <p
                style={{
                  fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
                  color: "rgba(102,210,255,0.7)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Hint */}
        <div
          style={{
            marginTop: "clamp(14px, calc(10px + 1vw), 42px)",
            padding: "clamp(10px, calc(6px + 0.7vw), 28px) clamp(12px, calc(8px + 0.8vw), 34px)",
            background: "rgba(102,210,255,0.04)",
            border: "1px dashed rgba(102,210,255,0.25)",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <p
            className="pixel-text"
            style={{
              fontSize: "clamp(8px, calc(5px + 0.35vw), 16px)",
              color: "rgba(102,210,255,0.45)",
              margin: 0,
              marginBottom: 6,
              letterSpacing: "0.12em",
            }}
          >
            ??? &nbsp; ??? &nbsp; ???
          </p>
          <p
            style={{
              fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
              color: "rgba(102,210,255,0.55)",
              margin: 0,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            There is something else here — but it won't reveal itself until every node has been visited. Leave no stone unturned.
          </p>
        </div>
      </div>
    </div>
  );
}
