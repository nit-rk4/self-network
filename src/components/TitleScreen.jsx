import { useState, useEffect } from "react";

export default function TitleScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),     // title fades in
      setTimeout(() => setStep(2), 2200),     // subtitle fades in
      setTimeout(() => setStep(3), 3800),     // made by fades in
      setTimeout(() => {
        setFadeOut(true);                     // whole screen fades out
      }, 6000),
      setTimeout(onComplete, 6800),           // proceed to main app
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`screen-container ${fadeOut ? "fade-out" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 32,
      }}
    >
      <h1
        className="pixel-text"
        style={{
          fontSize: 28,
          color: "var(--accent)",
          letterSpacing: "0.08em",
          textShadow: "0 0 30px rgba(102,210,255,0.3)",
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        The Self Network
      </h1>

      <p
        style={{
          fontSize: 16,
          color: "rgba(102,210,255,0.7)",
          fontStyle: "italic",
          letterSpacing: "0.03em",
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        a digital map of my being.
      </p>

      <div
        style={{
          marginTop: 32,
          textAlign: "center",
          opacity: step >= 3 ? 1 : 0,
          transform: step >= 3 ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "rgba(102,210,255,0.5)",
            margin: 0,
            lineHeight: 1.8,
          }}
        >
          Made by
        </p>
        <p
          style={{
            fontSize: 15,
            color: "rgba(102,210,255,0.75)",
            margin: 0,
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          Denise Ruth G. Manalang
        </p>
        <p
          style={{
            fontSize: 13,
            color: "rgba(102,210,255,0.45)",
            margin: "4px 0 0",
          }}
        >
          TN32
        </p>
      </div>
    </div>
  );
}
