import { useState } from "react";
import cobwebImage from "../../assets/cobweb.jpg";

export default function SignificantOtherInnerNetwork({ nodes, onNodeClick }) {
  const [sprouted, setSprouted] = useState(false);

  const leftNode = nodes[0];
  const rightNode = nodes[1];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(8, 10, 18, 0.76), rgba(8, 10, 18, 0.82)), url(${cobwebImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 42%, rgba(145, 205, 160, 0.16), transparent 36%), radial-gradient(circle at 50% 72%, rgba(90, 170, 120, 0.09), transparent 40%)",
          zIndex: 1,
        }}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          setSprouted((prev) => !prev);
        }}
        style={{
          position: "absolute",
          left: "50%",
          top: "54%",
          transform: sprouted
            ? "translate(-50%, -50%) scale(1.2)"
            : "translate(-50%, -50%) scale(1)",
          width: "clamp(130px, calc(80px + 7.2vw), 250px)",
          height: "clamp(170px, calc(100px + 10vw), 330px)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 4,
          transition: "transform 0.35s ease",
        }}
        aria-label={sprouted ? "Hide sprouted leaves" : "Grow seedling"}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: sprouted ? "56%" : "52%",
            width: "clamp(60px, calc(34px + 3.6vw), 120px)",
            height: "clamp(5px, calc(3px + 0.35vw), 10px)",
            transform: sprouted
              ? "translateX(-100%) rotate(-30deg)"
              : "translateX(-72%) rotate(-16deg)",
            transformOrigin: "100% 50%",
            borderRadius: 999,
            background: "linear-gradient(90deg, rgba(95,170,116,0.95), rgba(130,210,145,0.85))",
            boxShadow: "0 0 8px rgba(110, 200, 130, 0.24)",
            opacity: sprouted ? 1 : 0,
            transition: "bottom 0.35s ease, transform 0.35s ease, opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            bottom: sprouted ? "56%" : "52%",
            width: "clamp(60px, calc(34px + 3.6vw), 120px)",
            height: "clamp(5px, calc(3px + 0.35vw), 10px)",
            transform: sprouted
              ? "translateX(0%) rotate(30deg)"
              : "translateX(-28%) rotate(16deg)",
            transformOrigin: "0% 50%",
            borderRadius: 999,
            background: "linear-gradient(90deg, rgba(130,210,145,0.85), rgba(95,170,116,0.95))",
            boxShadow: "0 0 8px rgba(110, 200, 130, 0.24)",
            opacity: sprouted ? 1 : 0,
            transition: "bottom 0.35s ease, transform 0.35s ease, opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "30%",
            width: "clamp(10px, calc(6px + 0.55vw), 20px)",
            height: sprouted
              ? "clamp(68px, calc(42px + 3.6vw), 140px)"
              : "clamp(42px, calc(24px + 2.4vw), 88px)",
            transform: "translateX(-50%)",
            background: "linear-gradient(180deg, rgba(110,190,125,0.9), rgba(75,145,95,0.95))",
            borderRadius: 999,
            boxShadow: "0 0 14px rgba(110, 200, 130, 0.26)",
            transition: "height 0.35s ease",
          }}
        />

        {leftNode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNodeClick(leftNode);
            }}
            style={{
              position: "absolute",
              left: "50%",
              bottom: sprouted ? "62%" : "56%",
              width: "clamp(140px, calc(88px + 8vw), 300px)",
              height: "clamp(64px, calc(34px + 4.2vw), 138px)",
              background: "linear-gradient(90deg, rgba(142,234,160,0.96), rgba(95,181,118,0.96))",
              border: "1px solid rgba(120,205,138,0.5)",
              borderRadius: "0 100% 0 100%",
              transform: sprouted
                ? "translateX(-114%) rotate(-24deg) scale(1)"
                : "translateX(-95%) rotate(-12deg) scale(0.74)",
              transformOrigin: "100% 100%",
              boxShadow: "0 0 10px rgba(120, 220, 145, 0.22)",
              color: "rgba(16, 52, 28, 0.9)",
              fontSize: "clamp(9px, calc(6px + 0.55vw), 21px)",
              fontWeight: 800,
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              textAlign: "center",
              opacity: sprouted ? 1 : 0,
              pointerEvents: sprouted ? "auto" : "none",
              cursor: "pointer",
              padding: "clamp(7px, calc(4px + 0.45vw), 16px)",
              transition: "bottom 0.35s ease, opacity 0.3s ease, transform 0.35s ease",
            }}
            className="pixel-text"
            aria-label={leftNode.label}
          >
            {leftNode.label}
          </button>
        )}

        {rightNode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNodeClick(rightNode);
            }}
            style={{
              position: "absolute",
              left: "50%",
              bottom: sprouted ? "62%" : "56%",
              width: "clamp(140px, calc(88px + 8vw), 300px)",
              height: "clamp(64px, calc(34px + 4.2vw), 138px)",
              background: "linear-gradient(90deg, rgba(142,234,160,0.96), rgba(95,181,118,0.96))",
              border: "1px solid rgba(120,205,138,0.5)",
              borderRadius: "100% 0 100% 0",
              transform: sprouted
                ? "translateX(14%) rotate(24deg) scale(1)"
                : "translateX(-5%) rotate(12deg) scale(0.74)",
              transformOrigin: "0% 100%",
              boxShadow: "0 0 10px rgba(120, 220, 145, 0.22)",
              color: "rgba(16, 52, 28, 0.9)",
              fontSize: "clamp(9px, calc(6px + 0.55vw), 21px)",
              fontWeight: 800,
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              textAlign: "center",
              opacity: sprouted ? 1 : 0,
              pointerEvents: sprouted ? "auto" : "none",
              cursor: "pointer",
              padding: "clamp(7px, calc(4px + 0.45vw), 16px)",
              transition: "bottom 0.35s ease, opacity 0.3s ease, transform 0.35s ease",
            }}
            className="pixel-text"
            aria-label={rightNode.label}
          >
            {rightNode.label}
          </button>
        )}

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "18%",
            width: "clamp(120px, calc(74px + 6.5vw), 240px)",
            height: "clamp(34px, calc(20px + 2vw), 72px)",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at 50% 40%, rgba(84,64,40,0.9), rgba(38,25,16,0.96))",
            border: "1px solid rgba(120, 94, 65, 0.7)",
            borderRadius: "50%",
            boxShadow: "0 0 15px rgba(0,0,0,0.35)",
          }}
        />
      </button>

      <p
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(16px, calc(10px + 1vw), 34px)",
          transform: "translateX(-50%)",
          margin: 0,
          width: "min(88vw, 780px)",
          textAlign: "center",
          color: "rgba(206, 240, 214, 0.72)",
          fontSize: "clamp(11px, calc(6px + 0.42vw), 20px)",
          letterSpacing: "0.04em",
          lineHeight: 1.55,
          fontStyle: "italic",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        A space for love that has not been found, but has yet to bloom
      </p>
    </div>
  );
}
