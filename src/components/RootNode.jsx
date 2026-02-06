import { useState } from "react";
import { FiArrowLeft, FiHelpCircle } from "react-icons/fi";
import InnerNodes from "./InnerNodes";
import IdentityOverlay from "./IdentityOverlay";
import StrengthOverlay from "./StrengthOverlay";
import ShadowOverlay from "./ShadowOverlay";
import InsecurityWords from "./InsecurityWords";
import GuideScreen from "./GuideScreen";

export default function RootNode({ label, childrenNodes = [], outerBgGif, innerBgGif }) {
  const [expanded, setExpanded] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const [activeNode, setActiveNode] = useState(null);
  const [shadowRevealed, setShadowRevealed] = useState(false);

  const handleNodeClick = (node) => {
    if (node.label === "SHADOWS") {
      setShadowRevealed((prev) => !prev);
      if (shadowRevealed) return; // closing — don't open overlay
    }
    setActiveNode(node.label);
  };

  const closeOverlay = () => setActiveNode(null);

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
          transition: "opacity 1s ease-in-out",
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
          opacity: expanded ? 0.3 : 0,
          transition: expanded ? "opacity 1s ease-in" : "opacity 0.2s ease-out",
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
            { x: -18, opacity: 0.7, width: 0.6 },
            { x: -8, opacity: 0.9, width: 0.8 },
            { x: 2, opacity: 0.6, width: 0.5 },
            { x: 10, opacity: 1, width: 0.9 },
            { x: 20, opacity: 0.75, width: 0.7 },
            { x: -12, opacity: 0.5, width: 0.4 },
          ].map((line, i) => {
            const targetX = 50 + line.x;
            const controlX = targetX; 
            const controlY = -15; 
            
            return (
              <g key={`top-${i}`} opacity={line.opacity}>
                {/* Outer glow layer */}
                <path
                  d={`M 50 32.5 Q ${controlX} ${controlY}, ${targetX} 0`}
                  fill="none"
                  stroke="rgba(102,210,255,0.3)"
                  strokeWidth={line.width * 1.2}
                />
                {/* Main line */}
                <path
                  d={`M 50 32.5 Q ${controlX} ${controlY}, ${targetX} 0`}
                  fill="none"
                  stroke="rgba(102,210,255,0.9)"
                  strokeWidth={line.width * 0.4}
                />
                {/* Bright core */}
                <path
                  d={`M 50 32.5 Q ${controlX} ${controlY}, ${targetX} 0`}
                  fill="none"
                  stroke="rgba(200,240,255,1)"
                  strokeWidth={line.width * 0.2}
                />
              </g>
            );
          })}

          {/* Lines going DOWN from BOTTOM PORT */}
          {[
            { x: -16, opacity: 0.8, width: 0.7 },
            { x: -6, opacity: 0.6, width: 0.5 },
            { x: 4, opacity: 0.9, width: 0.85 },
            { x: 12, opacity: 1, width: 0.9 },
            { x: 18, opacity: 0.65, width: 0.6 },
            { x: -10, opacity: 0.55, width: 0.45 },
          ].map((line, i) => {
            const targetX = 50 + line.x;
            const controlX = targetX; // Keep it straight horizontally
            const controlY = 115; // BEYOND 100 - goes BELOW screen to create outward bulge!
            
            return (
              <g key={`bottom-${i}`} opacity={line.opacity}>
                {/* Outer glow layer */}
                <path
                  d={`M 50 67.5 Q ${controlX} ${controlY}, ${targetX} 100`}
                  fill="none"
                  stroke="rgba(102,210,255,0.3)"
                  strokeWidth={line.width * 1.2}
                />
                {/* Main line */}
                <path
                  d={`M 50 67.5 Q ${controlX} ${controlY}, ${targetX} 100`}
                  fill="none"
                  stroke="rgba(102,210,255,0.9)"
                  strokeWidth={line.width * 0.4}
                />
                {/* Bright core */}
                <path
                  d={`M 50 67.5 Q ${controlX} ${controlY}, ${targetX} 100`}
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
        <>
          <button
            onClick={() => setExpanded(false)}
            style={{
              position: "fixed",
              top: 30,
              left: 30,
              zIndex: 50,
              background: "rgba(6, 38, 58, 0.7)",
              border: "1px solid rgba(102,210,255,0.3)",
              borderRadius: "50%",
              padding: 10,
              color: "var(--accent)",
              fontSize: 28,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(102,210,255,0.4), 0 0 40px rgba(0,150,255,0.2)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
            }}
            aria-label="Back"
          >
            <FiArrowLeft />
          </button>
          
          <button
            onClick={() => setShowGuide(true)}
            style={{
              position: "fixed",
              top: 30,
              left: 90,
              zIndex: 50,
              background: "rgba(6, 38, 58, 0.7)",
              border: "1px solid rgba(102,210,255,0.3)",
              borderRadius: "50%",
              padding: 10,
              color: "var(--accent)",
              fontSize: 28,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(102,210,255,0.4), 0 0 40px rgba(0,150,255,0.2)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
            }}
            aria-label="Guide"
          >
            <FiHelpCircle />
          </button>
        </>
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
          position: "fixed",
          top: expanded ? 0 : "calc(50% - 17.5vh)",
          left: expanded ? 0 : "calc(50% - 22.5vw)",
          width: expanded ? "100vw" : "45vw",
          height: expanded ? "100vh" : "35vh",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.7s cubic-bezier(.2,.9,.2,1)",
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
                width: 120,
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
                width: 120,
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
                  fontSize: 34,
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                  textShadow: "0 4px 12px rgba(0,150,255,0.08)",
                  marginBottom: 8,
                }}
                className="pixel-text"
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: "rgba(102,210,255,0.85)",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  textShadow: "0 2px 8px rgba(0,150,255,0.10)",
                  opacity: 0.92,
                  userSelect: "none",
                }}
              >
                &lt; click to view their inner self &gt;
              </div>
            </div>
          )}

          {/* When expanded, show inner nodes using the new component */}
          {expanded && (
            <>
              <InsecurityWords visible={shadowRevealed} />
              <InnerNodes nodes={childrenNodes} onNodeClick={handleNodeClick} shadowRevealed={shadowRevealed} />
            </>
          )}
        </div>
      </div>

      {/* Node overlays */}
      {activeNode === "IDENTITY" && <IdentityOverlay onClose={closeOverlay} />}
      {activeNode === "STRENGTHS" && <StrengthOverlay onClose={closeOverlay} />}
      {activeNode === "SHADOWS" && <ShadowOverlay onClose={closeOverlay} />}

      {/* Guide overlay */}
      {showGuide && <GuideScreen onClose={() => setShowGuide(false)} />}
    </>
  );
}