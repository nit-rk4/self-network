export default function FamilyCompleteOverlay({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "min(700px, 92vw)",
          padding:
            "clamp(30px, calc(20px + 3vw), 90px) clamp(24px, calc(16px + 2.2vw), 80px)",
          animation: "overlaySlideIn 0.35s ease forwards",
        }}
      >
        {/* SVG Tree Hollow — gold pulsing */}
        <div
          className="tree-hollow-glow"
          style={{
            position: "relative",
            width: "clamp(200px, calc(140px + 12vw), 420px)",
            height: "clamp(260px, calc(180px + 14vw), 520px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "clamp(16px, calc(10px + 1.5vw), 40px)",
          }}
        >
          {/* Tree trunk background */}
          <svg
            viewBox="0 0 300 400"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <linearGradient id="complTrunkGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(70,44,20,0.6)" />
                <stop offset="30%" stopColor="rgba(100,65,32,0.75)" />
                <stop offset="70%" stopColor="rgba(90,58,28,0.8)" />
                <stop offset="100%" stopColor="rgba(65,40,18,0.6)" />
              </linearGradient>
              <radialGradient id="hollowGoldGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,215,0,0.15)" />
                <stop offset="40%" stopColor="rgba(218,165,32,0.25)" />
                <stop offset="100%" stopColor="rgba(180,130,20,0.08)" />
              </radialGradient>
            </defs>

            {/* Trunk shape */}
            <path
              d="M 100 0 Q 95 80, 98 160 Q 100 240, 95 320 Q 92 360, 85 400
                 L 215 400 Q 208 360, 205 320 Q 200 240, 202 160 Q 205 80, 200 0 Z"
              fill="url(#complTrunkGrad)"
              stroke="rgba(80,50,25,0.3)"
              strokeWidth={1.5}
            />

            {/* Bark texture */}
            {[
              "M 115 30 Q 118 100, 116 180",
              "M 140 20 Q 142 110, 139 200",
              "M 165 20 Q 163 100, 166 190",
              "M 185 30 Q 183 100, 184 180",
              "M 120 220 Q 122 290, 119 370",
              "M 155 240 Q 153 310, 156 380",
              "M 180 220 Q 182 290, 179 370",
            ].map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="rgba(50,30,15,0.25)"
                strokeWidth={1.2}
                strokeLinecap="round"
              />
            ))}

            {/* Gold hollow outline */}
            <ellipse
              cx={150}
              cy={200}
              rx={52}
              ry={68}
              fill="url(#hollowGoldGrad)"
              stroke="rgba(218,165,32,0.6)"
              strokeWidth={2.5}
            />

            {/* Deep hollow center */}
            <ellipse
              cx={150}
              cy={203}
              rx={40}
              ry={55}
              fill="rgba(15,8,2,0.9)"
            />

            {/* Gold inner rim */}
            <ellipse
              cx={150}
              cy={200}
              rx={44}
              ry={60}
              fill="none"
              stroke="rgba(255,215,0,0.3)"
              strokeWidth={1}
            />

            {/* Gold light rays from hollow */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 150 + Math.cos(rad) * 48;
              const y1 = 200 + Math.sin(rad) * 64;
              const x2 = 150 + Math.cos(rad) * 70;
              const y2 = 200 + Math.sin(rad) * 90;
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,215,0,0.15)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Text inside the hollow */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              padding: "clamp(20px, calc(14px + 2vw), 60px)",
              maxWidth: "clamp(160px, calc(100px + 8vw), 320px)",
            }}
          >
            <p
              style={{
                margin: "0 0 clamp(10px, calc(7px + 0.8vw), 24px)",
                fontSize: "clamp(10px, calc(6px + 0.45vw), 20px)",
                lineHeight: 1.9,
                color: "rgba(255,220,150,0.92)",
                textShadow: "0 0 12px rgba(218,165,32,0.3)",
              }}
            >
              I admire my family for how we hold together, even when tempers
              flare or disagreements arise. We're stable, we support each
              other, and even in small moments, there's care and understanding
              that keeps us connected.
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "clamp(10px, calc(6px + 0.45vw), 20px)",
                lineHeight: 1.9,
                color: "rgba(255,220,150,0.92)",
                textShadow: "0 0 12px rgba(218,165,32,0.3)",
              }}
            >
              Yet I wish they could see me more fully—not just the youngest
              sibling or the one who must follow rules. I wish they could
              understand my perspective, the thoughts behind my choices, and
              the ways I'm learning to grow. I hope they know I'm trying to
              find my own voice while still being part of this family.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            padding:
              "clamp(8px, calc(5px + 0.42vw), 18px) clamp(16px, calc(10px + 0.8vw), 32px)",
            background: "rgba(218,165,32,0.12)",
            border: "1px solid rgba(255,215,0,0.35)",
            borderRadius: 8,
            color: "rgba(255,220,150,0.92)",
            cursor: "pointer",
            fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
            letterSpacing: "0.04em",
            transition: "all 0.3s ease",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
