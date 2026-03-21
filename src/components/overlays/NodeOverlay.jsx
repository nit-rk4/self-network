import { FiX } from "react-icons/fi";

export default function NodeOverlay({
  title,
  onClose,
  children,
  color = "102,210,255",
  leafShaped = false,
  flowerShaped = false,
}) {

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

  if (flowerShaped) {
    const flowerId = color.replace(/,/g, "");

    return (
      <div className="overlay-backdrop" onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "clamp(360px, 62vw, 980px)",
            aspectRatio: "1 / 1",
            maxHeight: "88vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 600 600"
            preserveAspectRatio="xMidYMid meet"
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
              <radialGradient id={`flowerCore-${flowerId}`} cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(255,244,222,0.22)" />
                <stop offset="60%" stopColor="rgba(18,22,34,0.74)" />
                <stop offset="100%" stopColor="rgba(12,16,26,0.8)" />
              </radialGradient>
              <radialGradient id={`petal-${flowerId}`} cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor={`rgba(${color},0.22)`} />
                <stop offset="100%" stopColor="rgba(18,22,34,0.2)" />
              </radialGradient>
              <filter id={`flowerGlow-${flowerId}`} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx="300"
                cy="300"
                rx="92"
                ry="165"
                fill={`url(#petal-${flowerId})`}
                stroke="rgba(248,224,182,0.2)"
                strokeWidth="1.2"
                transform={`rotate(${angle} 300 300)`}
                filter={`url(#flowerGlow-${flowerId})`}
              />
            ))}

            <circle
              cx="300"
              cy="300"
              r="180"
              fill={`url(#flowerCore-${flowerId})`}
              stroke="rgba(248,224,182,0.28)"
              strokeWidth="1.6"
            />
          </svg>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "64%",
              height: "64%",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
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
                  fontSize: "clamp(8px, calc(5px + 0.36vw), 15px)",
                  color: "rgba(248, 236, 211, 0.9)",
                  textShadow: "0 0 10px rgba(255, 240, 215, 0.2)",
                  margin: 0,
                  letterSpacing: "0.05em",
                }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255, 229, 188, 0.08)",
                  border: "1px solid rgba(255, 222, 170, 0.22)",
                  borderRadius: "50%",
                  width: "clamp(24px, calc(18px + 0.9vw), 40px)",
                  height: "clamp(24px, calc(18px + 0.9vw), 40px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255, 233, 200, 0.9)",
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

            <div
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                minHeight: 0,
                flex: 1,
                textAlign: "center",
                paddingRight: "clamp(2px, calc(1px + 0.2vw), 8px)",
                paddingInline: "clamp(8px, calc(4px + 0.6vw), 18px)",
              }}
            >
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
          background: "rgba(16, 18, 28, 0.72)",
          backdropFilter: "blur(16px) saturate(130%)",
          WebkitBackdropFilter: "blur(16px) saturate(130%)",
          borderColor: "rgba(245, 212, 156, 0.2)",
          borderRadius: "28px 34px 30px 26px / 24px 30px 28px 32px",
          boxShadow: `
            0 0 0 1px rgba(255, 228, 184, 0.08) inset,
            0 18px 54px rgba(0, 0, 0, 0.35),
            0 0 65px rgba(246, 208, 144, 0.12),
            0 0 18px rgba(${color},0.08)
          `,
          animation: "ghostGlassIn 0.42s ease-out forwards",
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
              color: "rgba(248, 233, 205, 0.9)",
              textShadow: "0 0 10px rgba(255, 238, 205, 0.2)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 229, 188, 0.08)",
              border: "1px solid rgba(255, 222, 170, 0.22)",
              borderRadius: "50%",
              width: "clamp(28px, calc(20px + 1.1vw), 48px)",
              height: "clamp(28px, calc(20px + 1.1vw), 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255, 233, 200, 0.9)",
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
