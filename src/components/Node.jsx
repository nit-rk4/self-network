// src/components/Node.jsx
import { useState } from "react";

/**
 * Self-contained Node component that uses inline styles to avoid Tailwind issues.
 */
export default function Node({ label, childrenNodes = [], radius = 140 }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = (e) => {
    e.stopPropagation();
    setExpanded((s) => !s);
  };

  return (
    <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
      <button
        onClick={toggle}
        style={{
          width: 144,
          height: 144,
          borderRadius: 12,
          background: "#2b1a47",
          border: "2px solid #8affc1",
          color: "#8affc1",
          fontWeight: 800,
          boxShadow: "0 0 24px rgba(138,255,193,0.25)",
          cursor: "pointer",
        }}
      >
        {label}
      </button>

      {expanded && (
        // full-screen overlay (click outside closes)
        <div
          onClick={() => setExpanded(false)}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            // overlay is transparent so you'll still see the background; change if needed
            background: "rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* center anchor for radial children; prevent overlay click from closing when interacting inside */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: 0, height: 0 }}
          >
            {childrenNodes.map((child, i) => {
              const angle = (i / childrenNodes.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    transform: "translate(-50%,-50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // placeholder: replace with modal/panel later
                      alert(`${child.label}\n\n(Replace this with your journal content)`);
                    }}
                    style={{
                      minWidth: 110,
                      height: 40,
                      borderRadius: 8,
                      background: "#12081f",
                      border: "1px solid #8affc1",
                      color: "#8affc1",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 0 12px rgba(138,255,193,0.12)",
                      padding: "6px 10px",
                      fontSize: 12,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {child.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
