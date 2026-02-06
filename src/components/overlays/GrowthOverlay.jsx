import { useMemo, useState, useEffect } from "react";
import NodeOverlay from "./NodeOverlay";

const GROWTH_COLOR = "100,220,140";

const improveItems = [
  "Patience",
  "Time management",
  "Self-discipline",
  "Assertiveness",
  "Public speaking",
  "Consistency",
];

const gratefulItems = [
  "My family",
  "My friends",
  "God",
  "Small joys",
];

/* ── SVG leaf shape ─────────────────────────────────── */

function Leaf({ x, y, size = 8, angle = 0, color, opacity = 0.25 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <path
        d={`M 0 0 Q ${size} ${-size * 0.6}, ${size * 1.6} 0 Q ${size} ${size * 0.6}, 0 0`}
        fill={`rgba(${color},${opacity})`}
        stroke={`rgba(${color},${opacity + 0.1})`}
        strokeWidth={0.5}
      />
    </g>
  );
}

/* ── Floating particles (pollen / light) ────────────── */

function FloatingParticles({ count = 25, color }) {
  const dots = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      cx: 10 + Math.random() * 80,
      cy: 5 + Math.random() * 85,
      r: 0.8 + Math.random() * 1.2,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      key: i,
    })), [count]);

  return (
    <>
      {dots.map((d) => (
        <circle
          key={d.key}
          cx={`${d.cx}%`}
          cy={`${d.cy}%`}
          r={d.r}
          fill={`rgba(${color},0.12)`}
          style={{
            animation: `growthFloat ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

/* ── Decorative leaves along the trunk & branches ───── */

function DecoLeaves({ color }) {
  const leaves = useMemo(() => [
    // Along trunk
    { x: 404, y: 520, angle: 30, size: 7 },
    { x: 396, y: 470, angle: -40, size: 6 },
    { x: 405, y: 430, angle: 25, size: 8 },
    { x: 393, y: 390, angle: -30, size: 6 },
    // Along left branch
    { x: 355, y: 310, angle: -50, size: 7 },
    { x: 300, y: 270, angle: -60, size: 6 },
    { x: 245, y: 235, angle: -40, size: 8 },
    // Along right branch
    { x: 445, y: 310, angle: 40, size: 7 },
    { x: 500, y: 275, angle: 55, size: 6 },
    { x: 555, y: 240, angle: 50, size: 8 },
  ], []);

  return (
    <>
      {leaves.map((l, i) => (
        <Leaf key={i} {...l} color={color} opacity={0.18} />
      ))}
    </>
  );
}

/* ── Bud node at end of a sub-branch ────────────────── */

function Bud({ x, y, text, color, visible, delay = 0 }) {
  const pillW = Math.max(text.length * 8 + 32, 85);
  const pillH = 30;
  const budR = 6;

  return (
    <g>
      {/* Closed bud (always visible, small circle) */}
      <circle
        cx={x}
        cy={y}
        r={budR}
        fill={visible ? `rgba(${color},0.15)` : `rgba(${color},0.25)`}
        stroke={`rgba(${color},${visible ? 0.5 : 0.35})`}
        strokeWidth={1.2}
        style={{
          transition: `r 0.4s ease ${delay}s, fill 0.3s ease ${delay}s`,
          filter: `drop-shadow(0 0 4px rgba(${color},0.2))`,
        }}
      />

      {/* Bloomed state — pill with text */}
      <g
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.3)",
          transformOrigin: `${x}px ${y}px`,
          transition: `opacity 0.4s ease ${delay}s, transform 0.45s cubic-bezier(.2,.9,.3,1) ${delay}s`,
        }}
      >
        <rect
          x={x - pillW / 2}
          y={y - pillH / 2}
          width={pillW}
          height={pillH}
          rx={pillH / 2}
          ry={pillH / 2}
          fill="#0b1f2e"
          stroke={`rgba(${color},0.3)`}
          strokeWidth={1}
          style={{ filter: `drop-shadow(0 0 10px rgba(${color},0.15))` }}
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fill={`rgba(${color},0.9)`}
          fontSize={11.5}
          fontWeight={600}
          style={{ pointerEvents: "none" }}
        >
          {text}
        </text>
      </g>
    </g>
  );
}

/* ── A branch with sub-branches and buds ────────────── */

function Branch({ label, items, branchPath, budPositions, color, hovered, onHover, onLeave, labelPos, subBranchStart }) {
  return (
    <g>
      {/* Main branch curve */}
      <path
        d={branchPath}
        fill="none"
        stroke={`rgba(${color},${hovered ? 0.5 : 0.28})`}
        strokeWidth={hovered ? 3.5 : 3}
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 6px rgba(${color},${hovered ? 0.25 : 0.1}))`,
          transition: "stroke 0.3s ease, stroke-width 0.3s ease",
        }}
      />

      {/* Sub-branches from branch to each bud */}
      {budPositions.map((bud, i) => (
        <line
          key={`sub-${i}`}
          x1={bud.branchX}
          y1={bud.branchY}
          x2={hovered ? bud.x : bud.branchX}
          y2={hovered ? bud.y : bud.branchY}
          stroke={`rgba(${color},${hovered ? 0.25 : 0.12})`}
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{
            transition: `x2 0.45s ease ${i * 0.05}s, y2 0.45s ease ${i * 0.05}s, stroke 0.3s ease`,
          }}
        />
      ))}

      {/* Buds */}
      {budPositions.map((bud, i) => (
        <Bud
          key={i}
          x={bud.x}
          y={bud.y}
          text={items[i]}
          color={color}
          visible={hovered}
          delay={i * 0.05}
        />
      ))}

      {/* Branch label (section title) */}
      <g
        style={{ cursor: "pointer" }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Solid background behind label */}
        <circle
          cx={labelPos.x}
          cy={labelPos.y}
          r={52}
          fill="#0b1f2e"
          stroke={`rgba(${color},${hovered ? 0.6 : 0.3})`}
          strokeWidth={hovered ? 2 : 1.5}
          style={{
            filter: `drop-shadow(0 0 ${hovered ? 20 : 8}px rgba(${color},${hovered ? 0.3 : 0.12}))`,
            transition: "stroke 0.3s ease, filter 0.3s ease, stroke-width 0.3s ease",
          }}
        />
        <text
          x={labelPos.x}
          y={labelPos.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill={`rgb(${color})`}
          fontSize={8}
          fontWeight={800}
          fontFamily="'Press Start 2P', monospace"
          letterSpacing="0.03em"
          style={{ pointerEvents: "none" }}
        >
          {label.split("\n").map((line, i, arr) => (
            <tspan key={i} x={labelPos.x} dy={i === 0 ? `${-(arr.length - 1) * 0.6}em` : "1.3em"}>
              {line}
            </tspan>
          ))}
        </text>
        {/* Hover hint */}
        <text
          x={labelPos.x}
          y={labelPos.y + 62}
          textAnchor="middle"
          fill={`rgba(${color},0.25)`}
          fontSize={9}
          fontStyle="italic"
          style={{
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        >
          hover to bloom
        </text>
      </g>
    </g>
  );
}

/* ── Main overlay ───────────────────────────────────── */

export default function GrowthOverlay({ onClose }) {
  const [activeHub, setActiveHub] = useState(null);

  useEffect(() => {
    const id = "growth-plant-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes growthFloat {
        0%, 100% { opacity: 0.1; transform: translateY(0); }
        50%      { opacity: 0.4; transform: translateY(-3px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  const svgW = 800;
  const svgH = 620;

  // Trunk: bottom center up to fork
  const trunkBase = { x: 400, y: 590 };
  const forkPt = { x: 400, y: 340 };

  // Left branch (improve): curves to upper-left
  const leftLabel = { x: 220, y: 200 };
  const leftBranchPath = `M ${forkPt.x} ${forkPt.y} C 380 280, 300 230, ${leftLabel.x} ${leftLabel.y}`;

  // Right branch (grateful): curves to upper-right
  const rightLabel = { x: 580, y: 200 };
  const rightBranchPath = `M ${forkPt.x} ${forkPt.y} C 420 280, 500 230, ${rightLabel.x} ${rightLabel.y}`;

  // Bud positions for left branch (improve) — spread around left label
  const leftBuds = useMemo(() => {
    const cx = leftLabel.x, cy = leftLabel.y;
    const angles = [-110, -160, -210, -50, -10, 30]; // degrees, spread around upper-left
    return improveItems.map((_, i) => {
      const a = (angles[i] * Math.PI) / 180;
      const dist = 110 + (i % 2) * 20;
      // Point on branch curve to anchor sub-branch (approximate)
      const t = 0.6 + i * 0.06;
      return {
        x: cx + Math.cos(a) * dist,
        y: cy + Math.sin(a) * dist,
        branchX: cx + Math.cos(a) * 52,
        branchY: cy + Math.sin(a) * 52,
      };
    });
  }, []);

  // Bud positions for right branch (grateful) — spread around right label
  const rightBuds = useMemo(() => {
    const cx = rightLabel.x, cy = rightLabel.y;
    const angles = [-70, -20, 30, -130]; // degrees
    return gratefulItems.map((_, i) => {
      const a = (angles[i] * Math.PI) / 180;
      const dist = 110 + (i % 2) * 15;
      return {
        x: cx + Math.cos(a) * dist,
        y: cy + Math.sin(a) * dist,
        branchX: cx + Math.cos(a) * 52,
        branchY: cy + Math.sin(a) * 52,
      };
    });
  }, []);

  return (
    <NodeOverlay title="GROWTH" onClose={onClose} color={GROWTH_COLOR}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: `rgba(${GROWTH_COLOR},0.45)`,
            marginBottom: 8,
            fontStyle: "italic",
          }}
        >
          A living map of where I've been and where I'm growing.
        </p>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "60vh",
            display: "block",
            margin: "0 auto",
          }}
        >
          {/* Atmospheric particles */}
          <FloatingParticles count={30} color={GROWTH_COLOR} />

          {/* ── Roots ── */}
          {[
            `M ${trunkBase.x} ${trunkBase.y} Q 370 610, 340 620`,
            `M ${trunkBase.x} ${trunkBase.y} Q 420 608, 450 618`,
            `M ${trunkBase.x} ${trunkBase.y} Q 385 612, 360 615`,
            `M ${trunkBase.x} ${trunkBase.y} Q 415 614, 440 612`,
          ].map((d, i) => (
            <path
              key={`root-${i}`}
              d={d}
              fill="none"
              stroke={`rgba(${GROWTH_COLOR},0.15)`}
              strokeWidth={2 - i * 0.3}
              strokeLinecap="round"
            />
          ))}

          {/* ── Main trunk ── */}
          <path
            d={`M ${trunkBase.x} ${trunkBase.y} C 398 500, 402 420, ${forkPt.x} ${forkPt.y}`}
            fill="none"
            stroke={`rgba(${GROWTH_COLOR},0.35)`}
            strokeWidth={5}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px rgba(${GROWTH_COLOR},0.12))` }}
          />
          {/* Trunk inner glow */}
          <path
            d={`M ${trunkBase.x} ${trunkBase.y} C 398 500, 402 420, ${forkPt.x} ${forkPt.y}`}
            fill="none"
            stroke={`rgba(${GROWTH_COLOR},0.12)`}
            strokeWidth={8}
            strokeLinecap="round"
          />

          {/* ── Decorative leaves ── */}
          <DecoLeaves color={GROWTH_COLOR} />

          {/* ── Left branch (improve) ── */}
          <Branch
            label={"THINGS I CAN\nIMPROVE ON"}
            items={improveItems}
            branchPath={leftBranchPath}
            budPositions={leftBuds}
            color={GROWTH_COLOR}
            hovered={activeHub === "left"}
            onHover={() => setActiveHub("left")}
            onLeave={() => setActiveHub(null)}
            labelPos={leftLabel}
          />

          {/* ── Right branch (grateful) ── */}
          <Branch
            label={"THINGS I'M\nGRATEFUL FOR"}
            items={gratefulItems}
            branchPath={rightBranchPath}
            budPositions={rightBuds}
            color={GROWTH_COLOR}
            hovered={activeHub === "right"}
            onHover={() => setActiveHub("right")}
            onLeave={() => setActiveHub(null)}
            labelPos={rightLabel}
          />

          {/* ── Fork node (small glow at junction) ── */}
          <circle
            cx={forkPt.x}
            cy={forkPt.y}
            r={5}
            fill={`rgba(${GROWTH_COLOR},0.3)`}
            style={{ filter: `drop-shadow(0 0 8px rgba(${GROWTH_COLOR},0.25))` }}
          />
        </svg>
      </div>
    </NodeOverlay>
  );
}
