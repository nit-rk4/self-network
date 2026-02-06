import { useState } from "react";

export default function LetterOverlay({ title, children, onClose }) {
  const [fadeIn] = useState(true);

  return (
    <div
      className="letter-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        background: "rgba(20, 12, 8, 0.88)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "letterFadeIn 0.4s ease forwards",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(560px, 85vw)",
          maxHeight: "78vh",
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(210,190,150,0.15) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 30%, rgba(200,180,140,0.1) 0%, transparent 60%),
            linear-gradient(170deg, #f5ede0 0%, #ebe3d1 40%, #e2d6c0 100%)
          `,
          borderRadius: 6,
          padding: "48px 44px 40px",
          boxShadow: `
            0 2px 0 #d4c8a8,
            0 4px 0 #c8bb9e,
            0 20px 60px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.5)
          `,
          overflowY: "auto",
          animation: fadeIn ? "letterSlideIn 0.45s cubic-bezier(.2,.9,.3,1) forwards" : "none",
        }}
      >
        {/* Decorative stamp-like element */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 24,
            width: 48,
            height: 56,
            border: "2px dashed rgba(160,120,80,0.25)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 22, opacity: 0.3 }}>♥</span>
        </div>

        {/* Title / addressee */}
        <h2
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 20,
            fontWeight: 400,
            fontStyle: "italic",
            color: "#5a4635",
            marginBottom: 28,
            letterSpacing: "0.01em",
            lineHeight: 1.4,
            borderBottom: "1px solid rgba(160,130,90,0.25)",
            paddingBottom: 16,
          }}
        >
          {title}
        </h2>

        {/* Letter body */}
        <div
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 15,
            lineHeight: 1.9,
            color: "#4a3d30",
            whiteSpace: "pre-wrap",
          }}
        >
          {children}
        </div>

        {/* Close hint */}
        <p
          style={{
            marginTop: 32,
            textAlign: "center",
            fontSize: 12,
            color: "rgba(120,100,70,0.4)",
            fontStyle: "italic",
            fontFamily: "'Georgia', serif",
          }}
        >
          click outside to close
        </p>
      </div>

      {/* Inject letter-specific keyframes */}
      <style>{`
        @keyframes letterFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes letterSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
