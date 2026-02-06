import { useState, useEffect } from "react";
import NodeOverlay from "./NodeOverlay";
import LetterOverlay from "./LetterOverlay";

const FORGIVE_COLOR = "255,140,180";

/* ── Letter content for each envelope ───────────────── */

const letters = {
  forgive: {
    title: "To whom I should forgive",
    body: `Write your letter here...

This is where you share your thoughts about forgiveness toward someone.`,
  },
  forgiveME: {
    title: "To whom I wish would forgive me",
    body: `Write your letter here...

This is where you express what you wish you could say to someone whose forgiveness you seek.`,
  },
  self: {
    title: "For me",
    body: `Write your letter here...

A letter to yourself — the hardest and most important kind of forgiveness.`,
  },
};

const envelopes = [
  { id: "forgive",   label: "To whom I\nshould forgive" },
  { id: "forgiveME", label: "To whom I wish\nwould forgive me" },
  { id: "self",      label: "For me" },
];

/* ── SVG Envelope component ─────────────────────────── */

function Envelope({ x, y, width, height, label, color, isHovered, onClick, onHover, onLeave, delay }) {
  const flapH = height * 0.38;
  const bodyTop = y + flapH * 0.15;

  return (
    <g
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}
    >
      {/* Shadow */}
      <rect
        x={x + 3}
        y={bodyTop + 4}
        width={width}
        height={height - flapH * 0.15}
        rx={4}
        fill="rgba(0,0,0,0.25)"
        style={{ filter: "blur(6px)" }}
      />

      {/* Envelope body */}
      <rect
        x={x}
        y={bodyTop}
        width={width}
        height={height - flapH * 0.15}
        rx={4}
        fill="#0d1c2a"
        stroke={`rgba(${color},${isHovered ? 0.5 : 0.2})`}
        strokeWidth={1.2}
        style={{
          transition: "stroke 0.3s ease",
          filter: `drop-shadow(0 0 ${isHovered ? 14 : 6}px rgba(${color},${isHovered ? 0.2 : 0.08}))`,
        }}
      />

      {/* Inner V-lines (the envelope fold lines) */}
      <line
        x1={x}
        y1={bodyTop}
        x2={x + width / 2}
        y2={bodyTop + (height - flapH * 0.15) * 0.55}
        stroke={`rgba(${color},0.1)`}
        strokeWidth={0.8}
      />
      <line
        x1={x + width}
        y1={bodyTop}
        x2={x + width / 2}
        y2={bodyTop + (height - flapH * 0.15) * 0.55}
        stroke={`rgba(${color},0.1)`}
        strokeWidth={0.8}
      />

      {/* Flap (triangle) — rotates open on hover */}
      <g
        style={{
          transformOrigin: `${x + width / 2}px ${bodyTop}px`,
          transform: isHovered ? "rotateX(160deg)" : "rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(.3,.9,.3,1)",
        }}
      >
        <path
          d={`M ${x} ${bodyTop} L ${x + width / 2} ${y} L ${x + width} ${bodyTop} Z`}
          fill={isHovered ? "#162a3a" : "#0f2030"}
          stroke={`rgba(${color},${isHovered ? 0.45 : 0.18})`}
          strokeWidth={1}
          strokeLinejoin="round"
          style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }}
        />
      </g>

      {/* Seal circle */}
      <circle
        cx={x + width / 2}
        cy={bodyTop + (height - flapH * 0.15) * 0.42}
        r={12}
        fill={`rgba(${color},${isHovered ? 0.2 : 0.08})`}
        stroke={`rgba(${color},${isHovered ? 0.5 : 0.2})`}
        strokeWidth={1}
        style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }}
      />
      <text
        x={x + width / 2}
        y={bodyTop + (height - flapH * 0.15) * 0.42}
        textAnchor="middle"
        dominantBaseline="central"
        fill={`rgba(${color},${isHovered ? 0.7 : 0.35})`}
        fontSize={11}
        style={{ pointerEvents: "none", transition: "fill 0.3s ease" }}
      >
        ♥
      </text>

      {/* Address label */}
      <text
        x={x + width / 2}
        y={bodyTop + (height - flapH * 0.15) * 0.72}
        textAnchor="middle"
        dominantBaseline="central"
        fill={`rgba(${color},0.8)`}
        fontSize={12}
        fontWeight={600}
        fontStyle="italic"
        fontFamily="'Georgia', 'Times New Roman', serif"
        style={{ pointerEvents: "none" }}
      >
        {label.split("\n").map((line, i, arr) => (
          <tspan
            key={i}
            x={x + width / 2}
            dy={i === 0 ? `${-(arr.length - 1) * 0.5}em` : "1.25em"}
          >
            {line}
          </tspan>
        ))}
      </text>

      {/* Bottom decorative lines (address lines) */}
      {[0.84, 0.9].map((pct, i) => (
        <line
          key={`addr-${i}`}
          x1={x + width * 0.25}
          y1={bodyTop + (height - flapH * 0.15) * pct}
          x2={x + width * 0.75}
          y2={bodyTop + (height - flapH * 0.15) * pct}
          stroke={`rgba(${color},0.08)`}
          strokeWidth={0.8}
        />
      ))}
    </g>
  );
}

/* ── Main overlay ───────────────────────────────────── */

export default function ForgivenessOverlay({ onClose }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [openLetter, setOpenLetter] = useState(null); // letter id or null

  const svgW = 780;
  const svgH = 320;
  const envW = 190;
  const envH = 200;
  const gap = 40;
  const totalW = envelopes.length * envW + (envelopes.length - 1) * gap;
  const startX = (svgW - totalW) / 2;

  return (
    <>
      <NodeOverlay title="FORGIVENESS" onClose={onClose} color={FORGIVE_COLOR}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "clamp(12px, calc(7px + 0.48vw), 24px)",
              color: `rgba(${FORGIVE_COLOR},0.5)`,
              marginBottom: "clamp(12px, calc(8px + 0.8vw), 36px)",
              fontStyle: "italic",
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            Some words are better kept in letters.
          </p>

          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "50vh",
              display: "block",
              margin: "0 auto",
            }}
          >
            {envelopes.map((env, i) => {
              const ex = startX + i * (envW + gap);
              const ey = 30;
              return (
                <Envelope
                  key={env.id}
                  x={ex}
                  y={ey}
                  width={envW}
                  height={envH}
                  label={env.label}
                  color={FORGIVE_COLOR}
                  isHovered={hoveredId === env.id}
                  onClick={() => setOpenLetter(env.id)}
                  onHover={() => setHoveredId(env.id)}
                  onLeave={() => setHoveredId(null)}
                  delay={i * 0.1}
                />
              );
            })}
          </svg>

          <p
            style={{
              textAlign: "center",
              fontSize: "clamp(9px, calc(5px + 0.4vw), 18px)",
              color: `rgba(${FORGIVE_COLOR},0.3)`,
              marginTop: "clamp(8px, calc(5px + 0.48vw), 20px)",
              fontStyle: "italic",
            }}
          >
            click an envelope to read
          </p>
        </div>
      </NodeOverlay>

      {/* Letter overlays — rendered on top of everything */}
      {openLetter && (
        <LetterOverlay
          title={letters[openLetter].title}
          onClose={() => setOpenLetter(null)}
        >
          {letters[openLetter].body}
        </LetterOverlay>
      )}
    </>
  );
}
