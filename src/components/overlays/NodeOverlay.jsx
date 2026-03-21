import { FiX } from "react-icons/fi";

export default function NodeOverlay({ title, onClose, children, color = "102,210,255", leafShaped = false }) {

  if (leafShaped) {
    return (
      <div className="overlay-backdrop" onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "clamp(320px, 52vw, 780px)",
            aspectRatio: "3 / 4",
            maxHeight: "88vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* SVG leaf background — the actual leaf silhouette */}
          <svg
            viewBox="0 0 300 400"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <defs>
              <radialGradient id={`leafGrad-${color.replace(/,/g, "")}`} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor={`rgba(${color},0.12)`} />
                <stop offset="50%" stopColor="rgba(8,24,40,0.96)" />
                <stop offset="100%" stopColor="rgba(4,12,20,0.98)" />
              </radialGradient>
              <filter id="leafGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Glow halo behind the leaf */}
            <path
              d="M150 8 C185 8 240 35 268 80 C290 118 292 165 285 205 C275 258 245 305 210 340 C188 362 165 378 150 385 C135 378 112 362 90 340 C55 305 25 258 15 205 C8 165 10 118 32 80 C60 35 115 8 150 8 Z"
              fill={`rgba(${color},0.06)`}
              filter="url(#leafGlow)"
            />
            {/* Leaf body fill */}
            <path
              d="M150 8 C185 8 240 35 268 80 C290 118 292 165 285 205 C275 258 245 305 210 340 C188 362 165 378 150 385 C135 378 112 362 90 340 C55 305 25 258 15 205 C8 165 10 118 32 80 C60 35 115 8 150 8 Z"
              fill={`url(#leafGrad-${color.replace(/,/g, "")})`}
            />
            {/* Leaf border stroke */}
            <path
              d="M150 8 C185 8 240 35 268 80 C290 118 292 165 285 205 C275 258 245 305 210 340 C188 362 165 378 150 385 C135 378 112 362 90 340 C55 305 25 258 15 205 C8 165 10 118 32 80 C60 35 115 8 150 8 Z"
              fill="none"
              stroke={`rgba(${color},0.35)`}
              strokeWidth="1.5"
            />
            {/* Center vein */}
            <path
              d="M150 20 Q152 200 150 380"
              fill="none"
              stroke={`rgba(${color},0.08)`}
              strokeWidth="1"
            />
          </svg>

          {/* Content layer */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "62%",
              height: "70%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "clamp(10px, calc(8px + 0.8vw), 28px)",
                flexShrink: 0,
              }}
            >
              <h2
                className="pixel-text"
                style={{
                  fontSize: "clamp(8px, calc(5px + 0.35vw), 15px)",
                  color: `rgb(${color})`,
                  margin: 0,
                  letterSpacing: "0.05em",
                }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: `rgba(${color},0.08)`,
                  border: `1px solid rgba(${color},0.2)`,
                  borderRadius: "50%",
                  width: "clamp(24px, calc(18px + 0.9vw), 40px)",
                  height: "clamp(24px, calc(18px + 0.9vw), 40px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: `rgb(${color})`,
                  fontSize: "clamp(12px, calc(8px + 0.5vw), 24px)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            {/* Content */}
            <div style={{ overflow: "auto", flex: 1, minHeight: 0 }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: `rgba(${color},0.25)`,
          boxShadow: `0 0 40px rgba(${color},0.12), 0 20px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(14px, calc(10px + 1vw), 38px)",
          }}
        >
          <h2
            className="pixel-text"
            style={{
              fontSize: "clamp(10px, calc(5px + 0.35vw), 16px)",
              color: `rgb(${color})`,
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: `rgba(${color},0.08)`,
              border: `1px solid rgba(${color},0.2)`,
              borderRadius: "50%",
              width: "clamp(28px, calc(20px + 1.1vw), 48px)",
              height: "clamp(28px, calc(20px + 1.1vw), 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: `rgb(${color})`,
              fontSize: "clamp(14px, calc(9px + 0.6vw), 30px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
