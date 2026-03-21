import { useMemo } from "react";
import FallingLeaves from "../effects/FallingLeaves";

/**
 * FamilyTreeNetwork — renders a visual tree with nodes positioned along it.
 * Roots at bottom (decorative), trunk in middle (Mama & Papa + hollow), canopy at top (sisters + Me).
 */

const TREE_COLORS = {
  trunk: "rgba(101,67,33,0.85)",
  trunkLight: "rgba(139,90,43,0.7)",
  roots: "rgba(80,50,25,0.75)",
  canopy: "rgba(34,120,50,0.55)",
  canopyLight: "rgba(60,160,70,0.35)",
  hollow: "rgba(30,18,8,0.95)",
  hollowBorder: "rgba(80,50,25,0.6)",
};

function TreeNode({ label, color, x, y, onClick, delay = 0, isMe = false }) {
  return (
    <button
      className={`family-tree-node pixel-text ${isMe ? "" : ""}`}
      onClick={isMe ? undefined : onClick}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%,-50%)",
        background: isMe
          ? "rgba(20,30,20,0.7)"
          : "#0a1520",
        border: `1px solid rgba(${color},${isMe ? 0.35 : 0.3})`,
        color: isMe
          ? `rgba(${color},0.6)`
          : `rgb(${color})`,
        padding: "clamp(8px, calc(5px + 0.55vw), 22px) clamp(10px, calc(7px + 0.8vw), 36px)",
        borderRadius: 10,
        minWidth: "clamp(90px, calc(60px + 5.5vw), 220px)",
        fontSize: "clamp(7px, calc(4px + 0.38vw), 16px)",
        fontWeight: 800,
        boxShadow: isMe
          ? `0 0 18px rgba(${color},0.08), inset 0 0 12px rgba(${color},0.05)`
          : `0 0 18px rgba(${color},0.12), 0 10px 30px rgba(${color},0.06)`,
        cursor: isMe ? "default" : "pointer",
        zIndex: 5,
        "--delay": `${delay}ms`,
        letterSpacing: "0.06em",
        textAlign: "center",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        pointerEvents: isMe ? "none" : "auto",
      }}
      aria-label={isMe ? "You" : label}
      disabled={isMe}
    >
      {label}
      {isMe && (
        <span
          style={{
            display: "block",
            fontSize: "clamp(5px, calc(3px + 0.25vw), 10px)",
            color: `rgba(${color},0.35)`,
            marginTop: 4,
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          ( you )
        </span>
      )}
    </button>
  );
}

export default function FamilyTreeNetwork({
  nodes,
  onNodeClick,
  onGoldLeafClick,
  allVisited = false,
  onHollowClick,
}) {
  // Node positions on the tree
  // Canopy row (top): Ate Mariel, Ate DJ, Ate Dianne, Me — left to right
  // Trunk row (middle): Mama (left), Papa (right)
  // Roots (bottom): Grandparents
  const nodePositions = useMemo(() => {
    const map = {};
    // Canopy nodes (top section) — spread across ~18% to 82% horizontally
    const canopyNodes = ["ATE MARIEL", "ATE DJ", "ATE DIANNE", "ME"];
    const canopyY = 20;
    canopyNodes.forEach((label, i) => {
      map[label] = {
        x: 18 + i * 21.5,
        y: canopyY + (i % 2 === 0 ? 0 : 4), // slight vertical stagger
      };
    });

    // Trunk nodes (mid section)
    map["MAMA"] = { x: 38, y: 55 };
    map["PAPA"] = { x: 62, y: 55 };

    // Root node (bottom section)
    map["GRANDPARENTS"] = { x: 50, y: 82 };

    return map;
  }, []);

  // All nodes including the non-clickable "ME"
  const allNodes = useMemo(() => {
    const existing = [...nodes];
    // Add "ME" if not already present
    if (!existing.find((n) => n.label === "ME")) {
      existing.push({ label: "ME", color: "160,200,160" });
    }
    return existing;
  }, [nodes]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* SVG Tree illustration */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <defs>
          {/* Gradient for trunk */}
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(80,50,25,0.7)" />
            <stop offset="30%" stopColor="rgba(110,72,38,0.8)" />
            <stop offset="70%" stopColor="rgba(101,67,33,0.85)" />
            <stop offset="100%" stopColor="rgba(75,46,22,0.7)" />
          </linearGradient>

          {/* Gradient for canopy */}
          <radialGradient id="canopyGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="rgba(50,140,60,0.4)" />
            <stop offset="50%" stopColor="rgba(34,110,45,0.3)" />
            <stop offset="100%" stopColor="rgba(20,80,30,0.1)" />
          </radialGradient>

          {/* Filter for soft glow */}
          <filter id="treeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>

        {/* === ROOTS (bottom) === */}
        {/* Main root tendrils spreading out */}
        {[
          "M 500 750 Q 420 820, 280 880 Q 220 910, 150 930",
          "M 500 750 Q 460 830, 380 890 Q 340 920, 250 960",
          "M 500 750 Q 480 840, 450 910 Q 430 950, 400 990",
          "M 500 750 Q 520 840, 550 910 Q 570 950, 600 990",
          "M 500 750 Q 540 830, 620 890 Q 660 920, 750 960",
          "M 500 750 Q 580 820, 720 880 Q 780 910, 850 930",
        ].map((d, i) => (
          <g key={`root-${i}`}>
            <path
              d={d}
              fill="none"
              stroke={TREE_COLORS.roots}
              strokeWidth={18 - i * 1.5}
              strokeLinecap="round"
              opacity={0.6 + Math.random() * 0.2}
            />
            <path
              d={d}
              fill="none"
              stroke="rgba(60,38,18,0.3)"
              strokeWidth={24 - i * 2}
              strokeLinecap="round"
              filter="url(#treeGlow)"
            />
          </g>
        ))}

        {/* Small root hairs */}
        {[
          "M 280 880 Q 250 895, 200 905",
          "M 380 890 Q 350 910, 300 930",
          "M 620 890 Q 650 910, 700 930",
          "M 720 880 Q 750 895, 800 905",
          "M 150 930 Q 120 940, 80 945",
          "M 850 930 Q 880 940, 920 945",
        ].map((d, i) => (
          <path
            key={`rootlet-${i}`}
            d={d}
            fill="none"
            stroke={TREE_COLORS.roots}
            strokeWidth={6}
            strokeLinecap="round"
            opacity={0.4}
          />
        ))}

        {/* === TRUNK (middle) === */}
        {/* Main trunk body */}
        <path
          d="M 460 750 Q 455 650, 458 550 Q 460 480, 465 400 Q 468 350, 470 300
             L 530 300 Q 532 350, 535 400 Q 538 480, 540 550 Q 543 650, 540 750 Z"
          fill="url(#trunkGrad)"
          stroke="rgba(70,44,20,0.4)"
          strokeWidth={2}
        />

        {/* Trunk bark texture lines */}
        {[
          "M 475 400 Q 478 450, 476 520",
          "M 490 350 Q 492 430, 489 530",
          "M 510 350 Q 512 440, 508 540",
          "M 525 400 Q 523 470, 524 520",
          "M 485 550 Q 487 620, 484 700",
          "M 515 560 Q 513 630, 516 710",
        ].map((d, i) => (
          <path
            key={`bark-${i}`}
            d={d}
            fill="none"
            stroke="rgba(50,30,15,0.3)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        ))}

        {/* === TREE HOLLOW (on trunk) === */}
        <g
          onClick={allVisited ? (e) => { e.stopPropagation(); onHollowClick?.(); } : undefined}
          style={{
            cursor: allVisited ? "pointer" : "default",
            pointerEvents: allVisited ? "auto" : "none",
          }}
        >
          <ellipse
            cx={500}
            cy={530}
            rx={28}
            ry={38}
            fill={allVisited ? "rgba(40,30,8,0.95)" : TREE_COLORS.hollow}
            stroke={allVisited ? "rgba(218,165,32,0.7)" : TREE_COLORS.hollowBorder}
            strokeWidth={allVisited ? 4 : 3}
            className={allVisited ? "tree-hollow-glow" : ""}
            style={allVisited ? {
              filter: "drop-shadow(0 0 15px rgba(218,165,32,0.5)) drop-shadow(0 0 40px rgba(255,200,60,0.2))",
            } : {}}
          />
          {/* Hollow inner shadow */}
          <ellipse
            cx={500}
            cy={533}
            rx={20}
            ry={28}
            fill={allVisited ? "rgba(218,165,32,0.15)" : "rgba(10,6,2,0.8)"}
          />
          {/* Hollow subtle rim glow */}
          <ellipse
            cx={500}
            cy={530}
            rx={28}
            ry={38}
            fill="none"
            stroke={allVisited ? "rgba(255,215,0,0.4)" : "rgba(139,90,43,0.25)"}
            strokeWidth={allVisited ? 2 : 1}
          />
          {/* Gold light rays when all visited */}
          {allVisited && [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 500 + Math.cos(rad) * 32;
            const y1 = 530 + Math.sin(rad) * 42;
            const x2 = 500 + Math.cos(rad) * 55;
            const y2 = 530 + Math.sin(rad) * 70;
            return (
              <line
                key={`ray-${angle}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,215,0,0.2)"
                strokeWidth={2}
                strokeLinecap="round"
                className="tree-hollow-glow"
              />
            );
          })}
        </g>

        {/* === BRANCHES spreading from trunk top === */}
        {[
          "M 470 310 Q 400 280, 290 250 Q 230 235, 160 230",
          "M 475 300 Q 420 270, 350 260 Q 310 255, 260 260",
          "M 525 300 Q 580 270, 650 260 Q 690 255, 740 260",
          "M 530 310 Q 600 280, 710 250 Q 770 235, 840 230",
          "M 500 290 Q 500 260, 500 240",
        ].map((d, i) => (
          <g key={`branch-${i}`}>
            <path
              d={d}
              fill="none"
              stroke={TREE_COLORS.trunk}
              strokeWidth={10 - i * 1.2}
              strokeLinecap="round"
              opacity={0.65}
            />
          </g>
        ))}

        {/* === CANOPY (top) === */}
        {/* Large canopy cloud shapes */}
        {[
          { cx: 500, cy: 200, rx: 320, ry: 160 },
          { cx: 380, cy: 180, rx: 200, ry: 130 },
          { cx: 620, cy: 180, rx: 200, ry: 130 },
          { cx: 300, cy: 220, rx: 150, ry: 110 },
          { cx: 700, cy: 220, rx: 150, ry: 110 },
          { cx: 500, cy: 150, rx: 250, ry: 100 },
        ].map((c, i) => (
          <ellipse
            key={`canopy-${i}`}
            cx={c.cx}
            cy={c.cy}
            rx={c.rx}
            ry={c.ry}
            fill={i < 2 ? TREE_COLORS.canopy : TREE_COLORS.canopyLight}
            opacity={0.3 + (i < 3 ? 0.2 : 0)}
          />
        ))}

        {/* Canopy glow overlay */}
        <ellipse
          cx={500}
          cy={190}
          rx={350}
          ry={180}
          fill="url(#canopyGrad)"
          filter="url(#treeGlow)"
        />
      </svg>

      {/* Falling leaves effect */}
      <FallingLeaves onGoldLeafClick={onGoldLeafClick} />

      {/* Family member nodes positioned on the tree */}
      {allNodes.map((node, i) => {
        const pos = nodePositions[node.label];
        if (!pos) return null;

        return (
          <TreeNode
            key={node.label}
            label={node.label}
            color={node.color}
            x={pos.x}
            y={pos.y}
            delay={i * 120}
            isMe={node.label === "ME"}
            onClick={(e) => {
              e.stopPropagation();
              onNodeClick(node);
            }}
          />
        );
      })}
    </div>
  );
}
