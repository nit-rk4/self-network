import { FiX } from "react-icons/fi";

export default function NodeOverlay({ title, onClose, children, color = "102,210,255" }) {
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
