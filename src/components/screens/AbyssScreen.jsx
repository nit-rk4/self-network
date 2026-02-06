import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function AbyssScreen({ onBack }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Trigger the fade-in after mount
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="abyss-screen"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        background: "radial-gradient(ellipse at 50% 40%, #0c0814 0%, #060410 40%, #020108 100%)",
        opacity: entered ? 1 : 0,
        transition: "opacity 1s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Very subtle ambient particles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 60%, rgba(140,100,200,0.03) 0%, transparent 50%), " +
            "radial-gradient(circle at 70% 30%, rgba(100,60,180,0.02) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "fixed",
          top: 30,
          left: 30,
          zIndex: 80,
          background: "rgba(20,10,30,0.7)",
          border: "1px solid rgba(140,100,200,0.25)",
          borderRadius: "50%",
          padding: 10,
          color: "rgba(180,140,240,0.7)",
          fontSize: 28,
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(140,100,200,0.2)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
        }}
        aria-label="Leave the Abyss"
      >
        <FiArrowLeft />
      </button>

      {/* Abyss content — placeholder for now */}
      <div
        style={{
          opacity: entered ? 1 : 0,
          transition: "opacity 1.5s ease 0.5s",
          textAlign: "center",
          maxWidth: 600,
          padding: "0 24px",
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: "rgba(180,140,240,0.35)",
            lineHeight: 2,
            fontStyle: "italic",
            letterSpacing: "0.02em",
          }}
        >
          You've reached the deepest part.
        </p>
      </div>
    </div>
  );
}
