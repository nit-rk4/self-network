import NodeOverlay from "./NodeOverlay";
import identityPhoto from "../../assets/image.jpg";

const IDENTITY_COLOR = "160,180,200";

export default function IdentityOverlay({ onClose }) {
  return (
    <NodeOverlay title="IDENTITY" onClose={onClose} color={IDENTITY_COLOR}>
      <div
        style={{
          display: "flex",
          gap: 32,
          height: "100%",
          minHeight: 0,
        }}
      >
        {/* Left side - Photo */}
        <div
          style={{
            flex: "0 0 40%",
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
              maxHeight: 360,
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
                fontSize: 13,
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
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            overflowY: "auto",
          }}
        >
          {/* Description */}
          <div>
            <h3
              className="pixel-text"
              style={{
                fontSize: 10,
                color: `rgb(${IDENTITY_COLOR})`,
                marginBottom: 12,
                opacity: 0.8,
              }}
            >
              ABOUT ME
            </h3>
            <p
              style={{
                fontSize: 15,
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
                fontSize: 15,
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
                fontSize: 14,
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
                fontSize: 12,
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
