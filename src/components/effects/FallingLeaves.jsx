import { useMemo } from "react";

/**
 * FallingLeaves — renders falling leaf SVGs across the family inner network.
 * One special gold leaf (bigger, gold-colored) triggers the embarrassing story on click.
 */

const LEAF_COLORS = [
  "rgba(60,140,50,0.5)",
  "rgba(80,160,60,0.45)",
  "rgba(45,120,40,0.4)",
  "rgba(100,170,60,0.35)",
  "rgba(70,130,55,0.45)",
  "rgba(50,110,45,0.4)",
  "rgba(90,155,50,0.35)",
  "rgba(110,160,70,0.3)",
  "rgba(130,100,40,0.4)",  // autumn
  "rgba(160,120,50,0.35)", // autumn
];

function LeafSVG({ color, size = 16 }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Leaf body */}
      <path
        d="M 12 2 Q 22 10, 22 20 Q 22 28, 12 32 Q 2 28, 2 20 Q 2 10, 12 2 Z"
        fill={color}
        stroke={color}
        strokeWidth={0.5}
        opacity={0.9}
      />
      {/* Leaf vein */}
      <path
        d="M 12 4 L 12 30"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={0.8}
        strokeLinecap="round"
      />
      {/* Side veins */}
      <path
        d="M 12 10 L 6 14 M 12 15 L 7 20 M 12 20 L 8 24
           M 12 10 L 18 14 M 12 15 L 17 20 M 12 20 L 16 24"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoldLeafSVG({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gold leaf body */}
      <path
        d="M 12 1 Q 23 10, 23 20 Q 23 29, 12 33 Q 1 29, 1 20 Q 1 10, 12 1 Z"
        fill="rgba(218,165,32,0.85)"
        stroke="rgba(255,215,0,0.6)"
        strokeWidth={1}
      />
      {/* Gold leaf shine */}
      <path
        d="M 12 3 Q 18 8, 19 16 Q 18 12, 12 8 Z"
        fill="rgba(255,235,150,0.3)"
      />
      {/* Leaf vein */}
      <path
        d="M 12 3 L 12 31"
        stroke="rgba(180,130,20,0.5)"
        strokeWidth={1}
        strokeLinecap="round"
      />
      {/* Side veins */}
      <path
        d="M 12 9 L 5 14 M 12 14 L 6 20 M 12 19 L 7 24
           M 12 9 L 19 14 M 12 14 L 18 20 M 12 19 L 17 24"
        stroke="rgba(180,130,20,0.35)"
        strokeWidth={0.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FallingLeaves({ onGoldLeafClick }) {
  const leaves = useMemo(() => {
    const result = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        isGold: false,
        left: 2 + Math.random() * 96,
        size: 10 + Math.random() * 10,
        duration: 10 + Math.random() * 8,
        delay: Math.random() * 14,
        startAngle: Math.random() * 360,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      });
    }

    // Add the special gold leaf
    result.push({
      id: count,
      isGold: true,
      left: 30 + Math.random() * 40, // keep it more center for visibility
      size: 22,
      duration: 16,
      delay: 3 + Math.random() * 4,
      startAngle: Math.random() * 360,
      color: "rgba(218,165,32,0.85)",
    });

    return result;
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        overflow: "hidden",
      }}
    >
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className={leaf.isGold ? "gold-leaf" : "falling-leaf"}
          onClick={
            leaf.isGold
              ? (e) => {
                  e.stopPropagation();
                  onGoldLeafClick?.();
                }
              : undefined
          }
          style={{
            position: "absolute",
            left: `${leaf.left}%`,
            top: 0,
            "--leaf-start": `${leaf.startAngle}deg`,
            "--leaf-duration": `${leaf.duration}s`,
            "--leaf-delay": `${leaf.delay}s`,
            pointerEvents: leaf.isGold ? "auto" : "none",
            zIndex: leaf.isGold ? 10 : 3,
          }}
        >
          {leaf.isGold ? (
            <GoldLeafSVG size={leaf.size} />
          ) : (
            <LeafSVG color={leaf.color} size={leaf.size} />
          )}
        </div>
      ))}
    </div>
  );
}
