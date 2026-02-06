import { useMemo, useRef, useEffect, useState } from "react";
import InnerNode from "./InnerNode";

export default function InnerNodes({ nodes, onNodeClick }) {
  const nodeRefs = useRef([]);
  const [nodePositions, setNodePositions] = useState([]);
  const [connections, setConnections] = useState([]);

  // Generate random non-overlapping positions
  const positions = useMemo(() => {
    const pos = [];
    const minDistance = 18;
    const margin = 12;
    
    const checkOverlap = (newPos, existingPositions) => {
      for (let p of existingPositions) {
        const distance = Math.sqrt(
          Math.pow(newPos.left - p.left, 2) + 
          Math.pow(newPos.top - p.top, 2)
        );
        if (distance < minDistance) return true;
      }
      return false;
    };
    
    nodes.forEach(() => {
      let attempts = 0;
      let newPos;
      
      do {
        newPos = {
          left: margin + Math.random() * (100 - 2 * margin),
          top: margin + Math.random() * (100 - 2 * margin),
        };
        attempts++;
      } while (checkOverlap(newPos, pos) && attempts < 50);
      
      pos.push(newPos);
    });
    
    return pos;
  }, [nodes.length]);

  // Calculate actual pixel positions after nodes render
  useEffect(() => {
    const calculatePositions = () => {
      const containerRef = nodeRefs.current[0]?.parentElement;
      if (!containerRef) return;
      
      const containerRect = containerRef.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      
      const newPositions = positions.map(pos => ({
        x: (pos.left / 100) * containerWidth,
        y: (pos.top / 100) * containerHeight,
      }));
      
      setNodePositions(newPositions);
    };

    // Wait for animation to start, then calculate
    setTimeout(calculatePositions, 100);
  }, [positions]);

  // Generate connections after positions are calculated
  useEffect(() => {
    if (nodePositions.length === 0) return;
    
    const lines = [];
    nodePositions.forEach((pos, i) => {
      const numConnections = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * nodePositions.length);
        if (targetIndex !== i) {
          lines.push({
            from: nodePositions[i],
            to: nodePositions[targetIndex],
          });
        }
      }
    });
    
    setConnections(lines);
  }, [nodePositions]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* SVG layer for connection lines */}
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
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="rgba(102,210,255,0.15)"
            strokeWidth="2"
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

      {/* Inner nodes */}
      {nodes.map((node, i) => (
        <InnerNode
          key={i}
          ref={(el) => (nodeRefs.current[i] = el)}
          label={node.label}
          position={positions[i]}
          delay={i * 60}
          onClick={(e) => {
            e.stopPropagation();
            onNodeClick(node);
          }}
        />
      ))}
    </div>
  );
}