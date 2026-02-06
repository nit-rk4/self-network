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

/* ── radial layout helper ───────────────────────────── */

function layoutRadial(items, cx, cy, rx, ry) {
  return items.map((text, i) => {
    const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    return {
      text,
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
    };
  });
}

/* ── Mini-network sub-graph ─────────────────────────── */

function MiniNetwork({ title, items, cx, cy, rx, ry, color, hovered, onHover, onLeave }) {
  const nodes = useMemo(() => layoutRadial(items, cx, cy, rx, ry), [items, cx, cy, rx, ry]);

  return (
    <g>
      {/* Lines from hub to each satellite — only visible on hover */}
      {nodes.map((n, i) => (
        <line
          key={`line-${i}`}
          x1={cx}
          y1={cy}
          x2={hovered ? n.x : cx}
          y2={hovered ? n.y : cy}
          stroke={`rgba(${color},0.25)`}
          strokeWidth={1.5}
          style={{
            filter: `drop-shadow(0 0 4px rgba(${color},0.15))`,
            transition: "x2 0.5s ease, y2 0.5s ease, opacity 0.4s ease",
            transitionDelay: `${i * 0.04}s`,
            opacity: hovered ? 1 : 0,
          }}
        />
      ))}

      {/* Satellite nodes — only visible on hover */}
      {nodes.map((n, i) => {
        const pillW = Math.max(n.text.length * 8.5 + 28, 90);
        const pillH = 34;
        return (
          <g
            key={`node-${i}`}
            style={{
              transform: hovered
                ? `translate(0, 0)`
                : `translate(${cx - n.x}px, ${cy - n.y}px)`,
              opacity: hovered ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(.2,.9,.3,1) ${i * 0.04}s, opacity 0.4s ease ${i * 0.04}s`,
            }}
          >
            <rect
              x={n.x - pillW / 2}
              y={n.y - pillH / 2}
              width={pillW}
              height={pillH}
              rx={pillH / 2}
              ry={pillH / 2}
              fill="#0a1e30"
              stroke={`rgba(${color},0.22)`}
              strokeWidth={1}
              style={{ filter: `drop-shadow(0 0 8px rgba(${color},0.12))` }}
            />
            <text
              x={n.x}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={`rgba(${color},0.85)`}
              fontSize={12}
              fontWeight={600}
              style={{ pointerEvents: "none" }}
            >
              {n.text}
            </text>
          </g>
        );
      })}

      {/* Hub node — solid fill, always visible, on top */}
      <circle
        cx={cx}
        cy={cy}
        r={58}
        fill="#0a1e30"
        stroke={`rgba(${color},${hovered ? 0.7 : 0.35})`}
        strokeWidth={hovered ? 2 : 1.5}
        style={{
          filter: `drop-shadow(0 0 ${hovered ? 24 : 12}px rgba(${color},${hovered ? 0.35 : 0.15}))`,
          cursor: "pointer",
          transition: "stroke 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease",
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      />
      {/* Hub label */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill={`rgb(${color})`}
        fontSize={9}
        fontWeight={800}
        fontFamily="'Press Start 2P', monospace"
        letterSpacing="0.04em"
        style={{ pointerEvents: "none" }}
      >
        {title.split("\n").map((line, i, arr) => (
          <tspan key={i} x={cx} dy={i === 0 ? `${-(arr.length - 1) * 0.6}em` : "1.3em"}>
            {line}
          </tspan>
        ))}
      </text>

      {/* Hint text under hub — only when NOT hovered */}
      <text
        x={cx}
        y={cy + 72}
        textAnchor="middle"
        fill={`rgba(${color},0.3)`}
        fontSize={10}
        fontStyle="italic"
        style={{
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        hover to explore
      </text>
    </g>
  );
}

/* ── Floating particle dots for atmosphere ──────────── */

function FloatingDots({ count = 30, color }) {
  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: 1 + Math.random() * 1.5,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      key: i,
    }));
  }, [count]);

  return (
    <>
      {dots.map((d) => (
        <circle
          key={d.key}
          cx={`${d.cx}%`}
          cy={`${d.cy}%`}
          r={d.r}
          fill={`rgba(${color},0.15)`}
          style={{
            animation: `growthDotPulse ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

/* ── Main overlay ───────────────────────────────────── */

export default function GrowthOverlay({ onClose }) {
  const [activeHub, setActiveHub] = useState(null); // "left" | "right" | null

  /* pulse animation keyframes (injected once) */
  useEffect(() => {
    const id = "growth-dot-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes growthDotPulse {
        0%, 100% { opacity: 0.15; }
        50%      { opacity: 0.5;  }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  /*
    Stacked vertically so the two clusters never overlap.
    Top cluster at (450, 180), bottom at (450, 460).
  */
  const svgW = 900;
  const svgH = 640;
  const topCx = 450, topCy = 180;
  const botCx = 450, botCy = 460;
  const radiusX = 200, radiusY = 130;

  return (
    <NodeOverlay title="GROWTH" onClose={onClose} color={GROWTH_COLOR}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* Subtle prompt */}
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: `rgba(${GROWTH_COLOR},0.5)`,
            marginBottom: 12,
            fontStyle: "italic",
          }}
        >
          A map of where I've been and where I'm headed.
        </p>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "58vh",
            display: "block",
            margin: "0 auto",
          }}
        >
          {/* Atmospheric dots */}
          <FloatingDots count={35} color={GROWTH_COLOR} />

          {/* Dashed line connecting the two hubs */}
          <line
            x1={topCx}
            y1={topCy + 58}
            x2={botCx}
            y2={botCy - 58}
            stroke={`rgba(${GROWTH_COLOR},0.12)`}
            strokeWidth={1}
            strokeDasharray="6 4"
          />

          {/* Top cluster – Things I can improve on */}
          <MiniNetwork
            title={"THINGS I CAN\nIMPROVE ON"}
            items={improveItems}
            cx={topCx}
            cy={topCy}
            rx={radiusX}
            ry={radiusY}
            color={GROWTH_COLOR}
            hovered={activeHub === "top"}
            onHover={() => setActiveHub("top")}
            onLeave={() => setActiveHub(null)}
          />

          {/* Bottom cluster – Things I'm grateful for */}
          <MiniNetwork
            title={"THINGS I'M\nGRATEFUL FOR"}
            items={gratefulItems}
            cx={botCx}
            cy={botCy}
            rx={radiusX}
            ry={radiusY}
            color={GROWTH_COLOR}
            hovered={activeHub === "bot"}
            onHover={() => setActiveHub("bot")}
            onLeave={() => setActiveHub(null)}
          />
        </svg>
      </div>
    </NodeOverlay>
  );
}
