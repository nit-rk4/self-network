import { useState } from "react";
import NodeOverlay from "./NodeOverlay";

const likesData = [
  { word: "Kind", detail: "I genuinely care about others and always try to be kind in every interaction." },
  { word: "Empathic", detail: "I feel what others feel and try to understand them deeply." },
  { word: "Curious", detail: "I love learning new things and exploring ideas that challenge my thinking." },
  { word: "Loyal", detail: "I stand by the people I care about through thick and thin." },
  { word: "Forgiving", detail: "I don't like holding grudges and and try to forgive quickly" },
];

const talentsData = [
  { word: "Piano", detail: "I can read sheet music and express my emotions through music." },
  { word: "Singing", detail: "I can distinguish tunes and harmonize with others, often as an alto." },
  { word: "Gaming", detail: "I enjoy gaming and tackling challenges, even casually." },
  { word: "Exam Skills", detail: "I perform well on exams and can retain knowledge effectively." }
];

const STRENGTH_COLOR = "255,200,60";

function GlowCard({ word, detail }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      style={{
        background: `rgba(${STRENGTH_COLOR},0.04)`,
        border: `1px solid rgba(${STRENGTH_COLOR},0.15)`,
        borderRadius: 10,
        padding: "14px 18px",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        boxShadow: expanded
          ? `0 0 20px rgba(${STRENGTH_COLOR},0.15), inset 0 0 12px rgba(${STRENGTH_COLOR},0.05)`
          : `0 0 8px rgba(${STRENGTH_COLOR},0.06)`,
        borderColor: expanded ? `rgba(${STRENGTH_COLOR},0.35)` : `rgba(${STRENGTH_COLOR},0.15)`,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: `rgb(${STRENGTH_COLOR})`,
          letterSpacing: "0.03em",
        }}
      >
        {word}
      </div>
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: `rgba(${STRENGTH_COLOR},0.7)`,
          maxHeight: expanded ? 80 : 0,
          opacity: expanded ? 1 : 0,
          marginTop: expanded ? 8 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease, margin-top 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        }}
      >
        {detail}
      </div>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
      <h3
        className="pixel-text"
        style={{
          fontSize: 9,
          color: `rgb(${STRENGTH_COLOR})`,
          margin: 0,
          marginBottom: 8,
          opacity: 0.8,
          letterSpacing: "0.06em",
          textAlign: "center",
        }}
      >
        {title}
      </h3>
      {items.map((item, i) => (
        <GlowCard key={i} word={item.word} detail={item.detail} />
      ))}
    </div>
  );
}

export default function StrengthOverlay({ onClose }) {
  return (
    <NodeOverlay title="STRENGTHS" onClose={onClose} color={STRENGTH_COLOR}>
      <div
        style={{
          display: "flex",
          gap: 32,
          height: "100%",
          minHeight: 0,
        }}
      >
        {/* Divider between sections */}
        <Section title="WHAT I LIKE ABOUT MYSELF" items={likesData} />
        <div
          style={{
            width: 1,
            background: `linear-gradient(180deg, transparent, rgba(${STRENGTH_COLOR},0.2), transparent)`,
            flexShrink: 0,
          }}
        />
        <Section title="MY SPECIAL TALENTS" items={talentsData} />
      </div>
    </NodeOverlay>
  );
}
