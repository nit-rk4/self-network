import { useMemo, useRef, useEffect, useCallback, forwardRef } from "react";
import BlinkingWords from "../effects/BlinkingWords";

const InnerNode = forwardRef(({ label, delay, onClick, color = "102,210,255", isShadow, shadowRevealed }, ref) => {
  const shadowClass = isShadow
    ? shadowRevealed ? "shadow-node shadow-revealed" : "shadow-node"
    : "";

  return (
    <button
      ref={ref}
      className={`inner-node pixel-text ${shadowClass}`}
      onClick={onClick}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: "translate(-50%,-50%)",
        background: "#0a1520",
        border: `1px solid rgba(${color},${isShadow && !shadowRevealed ? 0.08 : 0.25})`,
        color: `rgb(${color})`,
        padding: "clamp(10px, calc(6px + 0.7vw), 30px) clamp(14px, calc(8px + 1vw), 46px)",
        borderRadius: 10,
        minWidth: "clamp(120px, calc(80px + 7vw), 280px)",
        fontSize: "clamp(9px, calc(5px + 0.42vw), 22px)",
        fontWeight: 800,
        boxShadow: `0 0 18px rgba(${color},0.1), 0 10px 30px rgba(${color},0.06)`,
        opacity: 0,
        cursor: "pointer",
        zIndex: 2,
        "--delay": `${delay}ms`,
        willChange: "left, top",
        transition: "border-color 0.6s ease, opacity 0.6s ease",
      }}
    >
      {label}
    </button>
  );
});
InnerNode.displayName = "InnerNode";

export default function InnerNodes({ nodes, onNodeClick, shadowRevealed }) {
  const nodeRefs = useRef([]);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const simRef = useRef(null);
  const rafRef = useRef(null);

  const initData = useMemo(() => {
    const margin = 12;
    const minDistance = 18;
    const positions = [];

    nodes.forEach(() => {
      let attempts = 0;
      let pos;
      do {
        pos = {
          x: margin + Math.random() * (100 - 2 * margin),
          y: margin + Math.random() * (100 - 2 * margin),
        };
        attempts++;
      } while (
        positions.some(
          (p) => Math.hypot(pos.x - p.x, pos.y - p.y) < minDistance
        ) &&
        attempts < 50
      );
      positions.push(pos);
    });

    const particles = positions.map((p) => {
      const speed = 0.012 + Math.random() * 0.018; // % per frame
      const angle = Math.random() * Math.PI * 2;
      return {
        x: p.x,
        y: p.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });

    const connPairs = [];
    particles.forEach((_, i) => {
      const count = 2 + Math.floor(Math.random() * 2);
      for (let c = 0; c < count; c++) {
        const j = Math.floor(Math.random() * particles.length);
        if (j !== i) connPairs.push([i, j]);
      }
    });

    return { particles, connPairs };
  }, [nodes.length]);

  const animate = useCallback(() => {
    const { particles, connPairs } = simRef.current;
    const margin = 5;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < margin) { p.x = margin; p.vx *= -1; }
      if (p.x > 100 - margin) { p.x = 100 - margin; p.vx *= -1; }
      if (p.y < margin) { p.y = margin; p.vy *= -1; }
      if (p.y > 100 - margin) { p.y = 100 - margin; p.vy *= -1; }
    }

    particles.forEach((p, i) => {
      const el = nodeRefs.current[i];
      if (el) {
        el.style.left = `${p.x}%`;
        el.style.top = `${p.y}%`;
      }
    });

    const svg = svgRef.current;
    if (svg) {
      const lines = svg.querySelectorAll("line");
      connPairs.forEach(([from, to], idx) => {
        const line = lines[idx];
        if (!line) return;
        const container = containerRef.current;
        if (!container) return;
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        line.setAttribute("x1", (particles[from].x / 100) * w);
        line.setAttribute("y1", (particles[from].y / 100) * h);
        line.setAttribute("x2", (particles[to].x / 100) * w);
        line.setAttribute("y2", (particles[to].y / 100) * h);
      });
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    simRef.current = initData;

    // Set initial positions
    initData.particles.forEach((p, i) => {
      const el = nodeRefs.current[i];
      if (el) {
        el.style.left = `${p.x}%`;
        el.style.top = `${p.y}%`;
      }
    });

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [initData, animate]);

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Blinking words background */}
      <BlinkingWords />

      {/* SVG layer for connection lines */}
      <svg
        ref={svgRef}
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
        {initData.connPairs.map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={0}
            x2={0}
            y2={0}
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
          color={node.color}
          isShadow={node.label === "SHADOWS"}
          shadowRevealed={shadowRevealed}
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
