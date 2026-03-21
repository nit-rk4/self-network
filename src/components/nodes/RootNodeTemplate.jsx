export default function RootNodeTemplate({
  label,
  onClick,
  hintText,
  interactive = true,
  style,
  titleFontSize,
}) {
  return (
    <div
      role={interactive ? "button" : undefined}
      onClick={interactive ? onClick : undefined}
      className={`panel rounded-lg ${interactive ? "cursor-pointer" : ""}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg,#06263a 0%, #081e33 100%)",
        boxShadow: "0 18px 48px var(--glow)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 8,
          border: "1px solid rgba(102,210,255,0.4)",
          boxShadow: `
            0 0 10px rgba(102,210,255,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(70px, calc(40px + 5.5vw), 180px)",
          height: 20,
          background: "linear-gradient(180deg, #0d3a5c 0%, #06263a 100%)",
          border: "2px solid rgba(102,210,255,0.6)",
          borderBottom: "none",
          boxShadow: `
            0 0 20px rgba(102,210,255,0.6),
            inset 0 2px 0 rgba(255,255,255,0.2),
            inset 0 -2px 6px rgba(0,0,0,0.4)
          `,
          borderRadius: "4px 4px 0 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 8,
            right: 8,
            height: 3,
            background: "rgba(102,210,255,0.4)",
            borderRadius: 1,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(70px, calc(40px + 5.5vw), 180px)",
          height: 20,
          background: "linear-gradient(0deg, #0d3a5c 0%, #06263a 100%)",
          border: "2px solid rgba(102,210,255,0.6)",
          borderTop: "none",
          boxShadow: `
            0 0 20px rgba(102,210,255,0.6),
            inset 0 -2px 0 rgba(255,255,255,0.2),
            inset 0 2px 6px rgba(0,0,0,0.4)
          `,
          borderRadius: "0 0 4px 4px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 3,
            left: 8,
            right: 8,
            height: 3,
            background: "rgba(102,210,255,0.4)",
            borderRadius: 1,
          }}
        />
      </div>

      <div
        style={{
          pointerEvents: "none",
          padding: "clamp(8px, calc(6px + 0.7vw), 28px)",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: titleFontSize ?? "clamp(18px, calc(12px + 1.5vw), 56px)",
            color: "var(--accent)",
            letterSpacing: "0.08em",
            textShadow: "0 4px 12px rgba(0,150,255,0.08)",
            marginBottom: 8,
          }}
          className="pixel-text"
        >
          {label}
        </div>
        {hintText && (
          <div
            style={{
              fontSize: "clamp(12px, calc(8px + 0.7vw), 30px)",
              color: "rgba(102,210,255,0.85)",
              fontWeight: 500,
              letterSpacing: "0.03em",
              textShadow: "0 2px 8px rgba(0,150,255,0.10)",
              opacity: 0.92,
              userSelect: "none",
            }}
          >
            {hintText}
          </div>
        )}
      </div>
    </div>
  );
}
