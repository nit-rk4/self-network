import NodeOverlay from "./NodeOverlay";
import identityPhoto from "../../assets/image.jpg";

const IDENTITY_COLOR = "160,180,200";

export default function IdentityOverlay({ onClose }) {
  return (
    <NodeOverlay title="IDENTITY" onClose={onClose} color={IDENTITY_COLOR}>
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
        {/* Left side - Photo */}
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
              border: `1px solid rgba(${IDENTITY_COLOR},0.2)`,
              borderRadius: 12,
              background: `rgba(${IDENTITY_COLOR},0.03)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Replace the placeholder below with an <img> tag */}
            <span
              style={{
                color: `rgba(${IDENTITY_COLOR},0.3)`,
                fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
                textAlign: "center",
                padding: 16,
              }}
            >
              <img src={identityPhoto} alt="Denise Ruth Manalang" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </span>
          </div>
        </div>

        {/* Right side - Description & Quote */}
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
          {/* Description */}
          <div>
            <h3
              className="pixel-text"
              style={{
                fontSize: "clamp(8px, calc(5px + 0.35vw), 16px)",
                color: `rgb(${IDENTITY_COLOR})`,
                marginBottom: "clamp(8px, calc(5px + 0.48vw), 20px)",
                opacity: 0.8,
              }}
            >
              ABOUT ME
            </h3>
            <p
              style={{
                fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                lineHeight: 1.7,
                color: `rgba(${IDENTITY_COLOR},0.85)`,
                margin: 0,
              }}
            >
              My name is <strong>Denise Ruth Manalang </strong>. I am 20 years old, born on April 16, 2005, and I am a third-year Computer Science student. I'm usually quiet at first, but I become more comfortable and expressive once I get to know people.
            </p>
            <br/>
            <p
              style={{
                fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                lineHeight: 1.7,
                color: `rgba(${IDENTITY_COLOR},0.85)`,
                margin: 0,
              }}
            >
                I enjoy gaming, reading, and watching movies, especially when they let me relax or escape into a different world.
            </p>
          </div>

          {/* Quote */}
          <div
            style={{
              marginTop: "auto",
              borderLeft: `2px solid rgba(${IDENTITY_COLOR},0.3)`,
              paddingLeft: 16,
            }}
          >
            <p
              style={{
                fontSize: "clamp(12px, calc(7px + 0.48vw), 24px)",
                fontStyle: "italic",
                lineHeight: 1.6,
                color: `rgba(${IDENTITY_COLOR},0.7)`,
                margin: 0,
              }}
            >
              "We keep moving forward, opening new doors, and doing new things, because we're curious and curiosity keeps leading us down new paths."
            </p>
            <span
              style={{
                fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
                color: `rgba(${IDENTITY_COLOR},0.4)`,
                marginTop: 6,
                display: "block",
              }}
            >
              — Walt Disney
            </span>
          </div>
        </div>
      </div>
    </NodeOverlay>
  );
}
