import { useMemo } from "react";

const SHADOW_COLOR = "160,100,220";

const insecurityWords = [
  "not enough", "too quiet", "awkward", "boring", "overthinking",
  "not smart enough", "too slow", "untalented", "invisible", "forgettable",
  "too sensitive", "not pretty enough", "weird", "left out", "burden",
  "not good enough", "unlovable", "failure", "disappointing",
  "procrastinator", "lazy", "indecisive", "flawed", "not interesting",
  "impatient", "self-doubting", "clingy", "clumsy", "unfocused"
];

export default function InsecurityWords({ visible }) {
  const wordPositions = useMemo(() => {
    const minWords = 50;
    const positions = [];
    const duplications = Math.ceil(minWords / insecurityWords.length);

    for (let d = 0; d < duplications; d++) {
      insecurityWords.forEach((word, idx) => {
        const x = Math.random() * 90 + 5;
        const y = Math.random() * 90 + 5;
        const fontSize = 11 + Math.random() * 10;
        const delay = Math.random() * 1.5;

        positions.push({
          word,
          x,
          y,
          fontSize,
          delay,
          key: `insec-${word}-${d}-${idx}`,
        });
      });
    }

    return positions;
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {wordPositions.map((wp) => (
        <div
          key={wp.key}
          style={{
            position: "absolute",
            left: `${wp.x}%`,
            top: `${wp.y}%`,
            fontSize: `${wp.fontSize}px`,
            color: `rgba(${SHADOW_COLOR}, 0.18)`,
            fontWeight: 600,
            whiteSpace: "nowrap",
            userSelect: "none",
            animation: `insecurityAppear 0.8s ease ${wp.delay}s both`,
          }}
        >
          {wp.word}
        </div>
      ))}
    </div>
  );
}
