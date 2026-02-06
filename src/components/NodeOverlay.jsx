import { FiX } from "react-icons/fi";

export default function NodeOverlay({ title, onClose, children }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
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
              fontSize: 14,
              color: "var(--accent)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {title}
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
