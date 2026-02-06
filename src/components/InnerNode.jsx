import { useMemo } from "react";

export default function InnerNodes({ nodes, onNodeClick }) {
  // Generate random non-overlapping positions
  const nodePositions = useMemo(() => {
    const positions = [];
    const minDistance = 18; // minimum distance between nodes (in percentage)
    const margin = 12; // margin from edges
    
    const checkOverlap = (newPos, existingPositions) => {
      for (let pos of existingPositions) {
        const distance = Math.sqrt(
          Math.pow(newPos.left - pos.left, 2) + 
          Math.pow(newPos.top - pos.top, 2)
        );
        if (distance < minDistance) return true;
      }
      return false;
    };
    
    nodes.forEach(() => {
      let attempts = 0;
      let newPos;
      
      // Try to find a non-overlapping position
      do {
        newPos = {
          left: margin + Math.random() * (100 - 2 * margin),
          top: margin + Math.random() * (100 - 2 * margin),
        };
        attempts++;
      } while (checkOverlap(newPos, positions) && attempts < 50);
      
      positions.push(newPos);
    });
    
    return positions;
  }, [nodes.length]);

  // Generate connections between nodes
  const connections = useMemo(() => {
    const lines = [];
    const numNodes = nodePositions.length;
    
    nodePositions.forEach((pos, i) => {
      const numConnections = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * numNodes);
        if (targetIndex !== i) {
          lines.push({
            from: pos,
            to: nodePositions[targetIndex],
          });
        }
      }
    });
    
    return lines;
  }, [nodePositions]);

  return (
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

      {/* Inner nodes - randomly positioned without overlap */}
      {nodes.map((node, i) => {
        const pos = nodePositions[i];
        return (
          <button
            key={i}
            className="inner-node"
            onClick={(e) => {
              e.stopPropagation();
              onNodeClick(node);
            }}
            style={{
              position: "absolute",
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              transform: "translate(-50%,-50%)", // Centers the node on its position
              background: "#021018",
              border: "1px solid rgba(102,210,255,0.14)",
              color: "var(--accent)",
              padding: "12px 18px", // BIGGER padding
              borderRadius: 8,
              minWidth: 140, // BIGGER width
              fontSize: 12, // BIGGER font
              fontWeight: 800,
              boxShadow: "0 10px 30px rgba(0,150,255,0.06)",
              opacity: 0,
              animationDelay: `${i * 60}ms`,
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            {node.label}
          </button>
        );
      })}
    </div>
  );
}