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
  {
    node: "INNER VOICE",
    desc: "Explores feelings and experiences that are hard to accept, including a short poem/story.",
    letters: "Letters G, H, and L",
  },
];

export default function GuideScreen({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 640, maxHeight: "80vh" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h2
            className="pixel-text"
            style={{
              fontSize: 13,
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
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              fontSize: 18,
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
            fontSize: 14,
            color: "rgba(102,210,255,0.6)",
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          Click on each node to explore a different part of my self.
          Here's what you'll find in each one:
        </p>

        {/* Guide items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {guideItems.map((item) => (
            <div
              key={item.node}
              style={{
                padding: "14px 18px",
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
                    fontSize: 10,
                    color: "var(--accent)",
                  }}
                >
                  {item.node}
                </span>
                <span
                  style={{
                    fontSize: 11,
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
                  fontSize: 13,
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
      </div>
    </div>
  );
}
