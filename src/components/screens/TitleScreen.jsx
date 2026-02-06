import { useState, useEffect } from "react";

const messageParagraphs = [
  "This project is presented as a network because I do not experience my sense of self as a single, linear story.",
  "Each node represents an aspect of who I am, shown without a fixed order to reflect how these parts coexist rather than follow a clear beginning or ending.",
  "Viewers are free to navigate the map in any direction, mirroring how thoughts, memories, and self-reflection naturally connect.",
  "This structure reflects how I understand myself: interconnected, evolving, and made up of many equally important parts.",
];

export default function TitleScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),       // title
      setTimeout(() => setStep(2), 2200),       // subtitle
      setTimeout(() => setStep(3), 3800),       // made by
      setTimeout(() => setStep(4), 6500),       // fade title out, show message phase
      setTimeout(() => setStep(5), 8000),       // paragraph 1
      setTimeout(() => setStep(6), 10500),      // paragraph 2
      setTimeout(() => setStep(7), 13000),      // paragraph 3
      setTimeout(() => setStep(8), 15500),      // paragraph 4
      setTimeout(() => {
        setFadeOut(true);                       // fade everything out
      }, 19000),
      setTimeout(onComplete, 19800),            // proceed to main app
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const titleVisible = step >= 1 && step < 4;
  const messagePhase = step >= 4;

  return (
    <div
      className={`screen-container ${fadeOut ? "fade-out" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(12px, calc(8px + 0.8vw), 32px)",
        padding: "clamp(16px, calc(12px + 1.3vw), 52px)",
      }}
    >
      {/* Title phase */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(12px, calc(8px + 0.8vw), 32px)",
          opacity: titleVisible ? 1 : 0,
          transition: "opacity 1s ease",
          pointerEvents: "none",
        }}
      >
        <h1
          className="pixel-text"
          style={{
            fontSize: "clamp(18px, calc(14px + 1vw), 48px)",
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
            fontSize: "clamp(13px, calc(8px + 0.55vw), 28px)",
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
            marginTop: "clamp(16px, calc(12px + 1.3vw), 52px)",
            textAlign: "center",
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <p
            style={{
              fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
              color: "rgba(102,210,255,0.5)",
              margin: 0,
              lineHeight: 1.8,
            }}
          >
            Made by
          </p>
          <p
            style={{
              fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
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
              fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
              color: "rgba(102,210,255,0.45)",
              margin: "4px 0 0",
            }}
          >
            TN32
          </p>
        </div>
      </div>

      {/* Message phase */}
      <div
        style={{
          position: "absolute",
          maxWidth: "min(600px, 90vw)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, calc(10px + 1vw), 38px)",
          opacity: messagePhase ? 1 : 0,
          transition: "opacity 1s ease",
          padding: "clamp(16px, calc(12px + 1.3vw), 52px)",
        }}
      >
        {messageParagraphs.map((text, i) => (
          <p
            key={i}
            style={{
              fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
              lineHeight: 1.8,
              color: "rgba(102,210,255,0.8)",
              margin: 0,
              textAlign: "center",
              opacity: step >= 5 + i ? 1 : 0,
              transform: step >= 5 + i ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
