import { useState, useMemo } from "react";

export default function RootNode({ label, childrenNodes = [], outerBgGif, innerBgGif }) {
  const [expanded, setExpanded] = useState(false);

  // Generate random positions for inner nodes every time component mounts or expands
  const randomPositions = useMemo(() => {
    return childrenNodes.map(() => ({
      left: 15 + Math.random() * 70,  // between 15% and 85%
      top: 15 + Math.random() * 70,   // between 15% and 85%
    }));
  }, [expanded, childrenNodes.length]);

  // Generate connections between nodes (create a web)
  const connections = useMemo(() => {
    const lines = [];
    const numNodes = randomPositions.length;
    
    randomPositions.forEach((pos, i) => {
      const numConnections = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * numNodes);
        if (targetIndex !== i) {
          lines.push({
            from: pos,
            to: randomPositions[targetIndex],
          });
        }
      }
    });
    
    return lines;
  }, [randomPositions]);

  return (
    <>
      {/* Outer network GIF - fades out when expanded */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${outerBgGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: expanded ? 0 : 0.08,
          transition: "opacity 1s ease-in-out", // YOUR TRANSITION
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      {/* Inner network GIF - fades in when expanded */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${innerBgGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: expanded ? 1 : 0, // YOUR OPACITY VALUES
          transition: expanded ? "opacity 1s ease-in" : "opacity 0.2s ease-out", // YOUR TRANSITION
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      {/* Lines going to/from the main node - ONLY when NOT expanded */}
        {!expanded && (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 39,
            }}
        >
            {/* Lines going UP from TOP PORT */}
            {[
            { x: -18, y: 15, opacity: 0.7, width: 0.6 },
            { x: -8, y: 12, opacity: 0.9, width: 0.8 },
            { x: 2, y: 18, opacity: 0.6, width: 0.5 },
            { x: 10, y: 10, opacity: 1, width: 0.9 },
            { x: 20, y: 14, opacity: 0.75, width: 0.7 },
            { x: -12, y: 20, opacity: 0.5, width: 0.4 },
            ].map((line, i) => {
            const targetX = 50 + line.x;
            const controlY = line.y;
            
            return (
                <g key={`top-${i}`} opacity={line.opacity}>
                {/* Outer glow layer */}
                <path
                    d={`M 50 32.5 Q ${targetX} ${controlY}, ${targetX} 0`}
                    fill="none"
                    stroke="rgba(102,210,255,0.3)"
                    strokeWidth={line.width * 1.2}
                />
                {/* Main line */}
                <path
                    d={`M 50 32.5 Q ${targetX} ${controlY}, ${targetX} 0`}
                    fill="none"
                    stroke="rgba(102,210,255,0.9)"
                    strokeWidth={line.width * 0.4}
                />
                {/* Bright core */}
                <path
                    d={`M 50 32.5 Q ${targetX} ${controlY}, ${targetX} 0`}
                    fill="none"
                    stroke="rgba(200,240,255,1)"
                    strokeWidth={line.width * 0.2}
                />
                </g>
            );
            })}

            {/* Lines going DOWN from BOTTOM PORT */}
            {[
            { x: -16, y: 82, opacity: 0.8, width: 0.7 },
            { x: -6, y: 88, opacity: 0.6, width: 0.5 },
            { x: 4, y: 80, opacity: 0.9, width: 0.85 },
            { x: 12, y: 85, opacity: 1, width: 0.9 },
            { x: 18, y: 78, opacity: 0.65, width: 0.6 },
            { x: -10, y: 86, opacity: 0.55, width: 0.45 },
            ].map((line, i) => {
            const targetX = 50 + line.x;
            const controlY = line.y;
            
            return (
                <g key={`bottom-${i}`} opacity={line.opacity}>
                {/* Outer glow layer */}
                <path
                    d={`M 50 67.5 Q ${targetX} ${controlY}, ${targetX} 100`}
                    fill="none"
                    stroke="rgba(102,210,255,0.3)"
                    strokeWidth={line.width * 1.2}
                />
                {/* Main line */}
                <path
                    d={`M 50 67.5 Q ${targetX} ${controlY}, ${targetX} 100`}
                    fill="none"
                    stroke="rgba(102,210,255,0.9)"
                    strokeWidth={line.width * 0.4}
                />
                {/* Bright core */}
                <path
                    d={`M 50 67.5 Q ${targetX} ${controlY}, ${targetX} 100`}
                    fill="none"
                    stroke="rgba(200,240,255,1)"
                    strokeWidth={line.width * 0.2}
                />
                </g>
            );
            })}
        </svg>
        )}

      {/* Back arrow button - only shows when expanded */}
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          style={{
            position: "fixed",
            top: 30,
            left: 30,
            zIndex: 50,
            background: "rgba(6, 38, 58, 0.7)",
            border: "1px solid rgba(102,210,255,0.3)",
            borderRadius: 8,
            padding: "12px 16px",
            color: "var(--accent)",
            fontSize: 20,
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,150,255,0.4), 0 0 40px rgba(0,150,255,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 30px rgba(0,150,255,0.6), 0 0 60px rgba(0,150,255,0.3)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,150,255,0.4), 0 0 40px rgba(0,150,255,0.2)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ← BACK
        </button>
      )}

      {/* Clicking outside closes the panel */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 35,
            background: "transparent",
          }}
        />
      )}

      {/* Main panel container with border cutouts */}
      <div
        style={{
          position: expanded ? "fixed" : "absolute",
          top: expanded ? 0 : "50%",
          left: expanded ? 0 : "50%",
          transform: expanded ? "none" : "translate(-50%, -50%)",
          width: expanded ? "100vw" : "45vw",
          height: expanded ? "100vh" : "35vh",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* The actual panel with border - has gaps for ports */}
        <div
          role="button"
          aria-expanded={expanded}
          onClick={() => !expanded && setExpanded(true)}
          className="panel rounded-lg cursor-pointer"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: expanded ? "rgba(4, 8, 18, 0.85)" : "linear-gradient(180deg,#06263a 0%, #081e33 100%)",
            boxShadow: expanded ? `0 30px 80px var(--glow)` : `0 18px 48px var(--glow)`,
            transition: "all 0.7s cubic-bezier(.2,.9,.2,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
        {/* Port connectors - rectangular pieces that stick out */}
        {!expanded && (
        <>
            {/* Simple border around the main node */}
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
            
            {/* TOP PORT - rectangular connector (WIDER) */}
            <div style={{
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120, // MUCH WIDER - was 40
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
            }}>
            {/* Inner highlight for depth */}
            <div style={{
                position: "absolute",
                top: 3,
                left: 8,
                right: 8,
                height: 3,
                background: "rgba(102,210,255,0.4)",
                borderRadius: 1,
            }} />
            </div>
            
            {/* BOTTOM PORT - rectangular connector (WIDER) */}
            <div style={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120, // MUCH WIDER - was 40
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
            }}>
            {/* Inner highlight for depth */}
            <div style={{
                position: "absolute",
                bottom: 3,
                left: 8,
                right: 8,
                height: 3,
                background: "rgba(102,210,255,0.4)",
                borderRadius: 1,
            }} />
            </div>
        </>
        )}


          {/* Display full name - ONLY when not expanded */}
          {!expanded && (
            <div
              style={{
                pointerEvents: "none",
                padding: 16,
                textAlign: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                  textShadow: "0 4px 12px rgba(0,150,255,0.08)",
                }}
              >
                {label}
              </div>
            </div>
          )}

          {/* When expanded, show inner nodes */}
          {expanded && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ position: "absolute", inset: 0, overflow: "hidden" }}
            >
              {/* SVG layer for connection lines between inner nodes */}
              <svg
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                {connections.map((conn, i) => (
                  <line
                    key={i}
                    x1={`${conn.from.left}%`}
                    y1={`${conn.from.top}%`}
                    x2={`${conn.to.left}%`}
                    y2={`${conn.to.top}%`}
                    stroke="rgba(102,210,255,0.15)"
                    strokeWidth="1.5"
                    style={{
                      filter: "drop-shadow(0 0 3px rgba(102,210,255,0.2))",
                    }}
                  />
                ))}
              </svg>

              {/* Subtle grid background */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `radial-gradient(circle at 10% 10%, rgba(102,210,255,0.02), transparent 2px),
                                    radial-gradient(circle at 90% 90%, rgba(102,210,255,0.01), transparent 2px)`,
                  pointerEvents: "none",
                }}
              />

              {/* Inner nodes - randomly positioned */}
              {childrenNodes.map((child, i) => {
                const pos = randomPositions[i];
                return (
                  <button
                    key={i}
                    className="inner-node"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`${child.label}\n\n(Replace this with your journal content)`);
                    }}
                    style={{
                      position: "absolute",
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      transform: "translate(-50%,-50%)",
                      background: "#021018",
                      border: "1px solid rgba(102,210,255,0.14)",
                      color: "var(--accent)",
                      padding: "8px 12px",
                      borderRadius: 8,
                      minWidth: 110,
                      fontSize: 11,
                      fontWeight: 800,
                      boxShadow: "0 10px 30px rgba(0,150,255,0.06)",
                      opacity: 0,
                      animationDelay: `${i * 60}ms`,
                      cursor: "pointer",
                      zIndex: 2,
                    }}
                  >
                    {child.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}