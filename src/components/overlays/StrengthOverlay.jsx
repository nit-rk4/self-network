import { useState } from "react";
import NodeOverlay from "./NodeOverlay";

const STRENGTH_COLOR = "255,200,60";

const pillars = [
  { word: "Kindness", detail: "I genuinely care about others and always try to be kind in every interaction." },
  { word: "Empathy", detail: "I feel what others feel and try to understand them deeply." },
  { word: "Curiosity", detail: "I love learning new things and exploring ideas that challenge my thinking." },
  { word: "Loyalty", detail: "I stand by the people I care about through thick and thin." },
  { word: "Forgiveness", detail: "I don't like holding grudges and try to forgive quickly." },
  { word: "Piano", detail: "I can read sheet music and express my emotions through music." },
  { word: "Singing", detail: "I can distinguish tunes and harmonize with others, often as an alto." },
  { word: "Gaming", detail: "I enjoy gaming and tackling challenges, even casually." },
  { word: "Studying", detail: "I perform well on exams and can retain knowledge effectively." },
];

const COLLAPSED_H = 55;
const EXPANDED_H = 280;
const SHAFT_WIDTH = "65%";

function Pillar({ word, detail }) {
  const [expanded, setExpanded] = useState(false);
  const h = expanded ? EXPANDED_H : COLLAPSED_H;

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        cursor: "pointer",
        minWidth: 0,
        position: "relative",
      }}
    >
      {/* Capital (top piece) */}
      <div
        style={{
          width: "90%",
          height: 10,
          background: `linear-gradient(180deg, rgba(${STRENGTH_COLOR},${expanded ? 0.35 : 0.14}) 0%, rgba(${STRENGTH_COLOR},${expanded ? 0.2 : 0.08}) 100%)`,
          borderRadius: "4px 4px 0 0",
          border: `1px solid rgba(${STRENGTH_COLOR},${expanded ? 0.4 : 0.15})`,
          borderBottom: "none",
          transition: "all 0.5s cubic-bezier(.25,.85,.25,1)",
          boxShadow: expanded ? `0 -4px 16px rgba(${STRENGTH_COLOR},0.12)` : "none",
        }}
      />
      {/* Thin ledge under capital */}
      <div
        style={{
          width: "95%",
          height: 4,
          background: `rgba(${STRENGTH_COLOR},${expanded ? 0.3 : 0.12})`,
          border: `1px solid rgba(${STRENGTH_COLOR},${expanded ? 0.35 : 0.13})`,
          borderBottom: "none",
          transition: "all 0.5s cubic-bezier(.25,.85,.25,1)",
        }}
      />

      {/* Shaft */}
      <div
        style={{
          width: SHAFT_WIDTH,
          height: h,
          overflow: "hidden",
          background: `linear-gradient(90deg, rgba(${STRENGTH_COLOR},${expanded ? 0.07 : 0.04}) 0%, rgba(${STRENGTH_COLOR},${expanded ? 0.12 : 0.06}) 40%, rgba(${STRENGTH_COLOR},${expanded ? 0.12 : 0.06}) 60%, rgba(${STRENGTH_COLOR},${expanded ? 0.07 : 0.04}) 100%)`,
          borderLeft: `1px solid rgba(${STRENGTH_COLOR},${expanded ? 0.3 : 0.12})`,
          borderRight: `1px solid rgba(${STRENGTH_COLOR},${expanded ? 0.3 : 0.12})`,
          transition: "height 0.5s cubic-bezier(.25,.85,.25,1), background 0.4s ease, border-color 0.4s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Vertical lines on shaft */}
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              top: 6,
              bottom: 6,
              left: `${pct}%`,
              width: 1,
              background: `rgba(${STRENGTH_COLOR},${expanded ? 0.08 : 0.04})`,
              transition: "background 0.4s ease",
            }}
          />
        ))}
        {/* Detail text inside shaft */}
        <div
          style={{
            padding: "14px 10px",
            textAlign: "center",
            opacity: expanded ? 1 : 0,
            transition: "opacity 0.4s ease 0.15s",
          }}
        >
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.7,
              color: `rgba(${STRENGTH_COLOR},0.7)`,
              margin: 0,
            }}
          >
            {detail}
          </p>
        </div>
      </div>

      {/* Thin ledge above base */}
      <div
        style={{
          width: "95%",
          height: 4,
          background: `rgba(${STRENGTH_COLOR},${expanded ? 0.3 : 0.12})`,
          border: `1px solid rgba(${STRENGTH_COLOR},${expanded ? 0.35 : 0.13})`,
          borderTop: "none",
          transition: "all 0.5s cubic-bezier(.25,.85,.25,1)",
        }}
      />

      {/* Base (pedestal) */}
      <div
        style={{
          width: "100%",
          padding: "12px 4px",
          background: `linear-gradient(180deg, rgba(${STRENGTH_COLOR},${expanded ? 0.2 : 0.08}) 0%, rgba(${STRENGTH_COLOR},${expanded ? 0.12 : 0.04}) 100%)`,
          borderRadius: "0 0 4px 4px",
          border: `1px solid rgba(${STRENGTH_COLOR},${expanded ? 0.4 : 0.15})`,
          borderTop: "none",
          textAlign: "center",
          transition: "all 0.5s cubic-bezier(.25,.85,.25,1)",
          boxShadow: expanded
            ? `0 4px 18px rgba(${STRENGTH_COLOR},0.15)`
            : `0 2px 8px rgba(${STRENGTH_COLOR},0.05)`,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: `rgb(${STRENGTH_COLOR})`,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {word}
        </span>
      </div>
    </div>
  );
}

export default function StrengthOverlay({ onClose }) {
  return (
    <NodeOverlay title="STRENGTHS" onClose={onClose} color={STRENGTH_COLOR}>
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: `rgba(${STRENGTH_COLOR},0.45)`,
          marginBottom: 16,
          fontStyle: "italic",
        }}
      >
        The pillars I stand on. Click to reveal.
      </p>
      {[pillars.slice(0, 5), pillars.slice(5)].map((row, ri) => (
        <div
          key={ri}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-end",
            padding: "0 16px",
            marginBottom: ri === 0 ? 18 : 0,
          }}
        >
          {row.map((p, i) => (
            <Pillar key={i} word={p.word} detail={p.detail} />
          ))}
        </div>
      ))}
    </NodeOverlay>
  );
}
