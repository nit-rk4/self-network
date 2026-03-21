import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import friend1Photo from "../../assets/friend1.jpg";
import friend2Photo from "../../assets/friend2.jpg";
import friend3Photo from "../../assets/friend3.jpg";
import friend4Photo from "../../assets/friend4.png";
import friend5Photo from "../../assets/friend5.jpg";
import friend6Photo from "../../assets/friend6.jpg";
import friend7Photo from "../../assets/friend7.jpg";

/**
 * FRIENDS DATA — placeholder friends. Replace with your actual friends!
 * Add photos to src/assets/ and import them here.
 */
const FRIENDS_DATA = [
  {
    name: "Jacky",
    photo: friend1Photo,
    howWeMet: "We met during freshman year in one of our shared classes. It started when we invited her to hang out with us",
    whatILike: "She's super nice and quirky to hang out with. She's also really caring.",
  },
  {
    name: "Arki",
    photo: friend2Photo,
    howWeMet: "We met during freshman year through a common friend",
    whatILike: "He is a very funny guy and knows how to bring a mood up.",
  },
  {
    name: "Albert",
    photo: friend3Photo,
    howWeMet: "We met during 2nd semester when I was the class representative, he joined my circle of friends afterwards",
    whatILike: "He's super easy to be with. Fun to talk with and chill.",
  },
  {
    name: "Jude",
    photo: friend4Photo,
    howWeMet: "We met during 2nd year as classmates, didn't get close with him until we got close via common friends in our group",
    whatILike: "He has a unique sense of humor that we all are ",
  },
  {
    name: "Ina",
    photo: friend5Photo,
    howWeMet: "We were introduced by a mutual friend in 3rd sem and we merged our friend groups.",
    whatILike: "She is super easy to be with and fun. She's also very caring.",
  },
  {
    name: "Genro",
    photo: friend6Photo,
    howWeMet: "We met each other through a mutual friend, he was part of merging our friend group.",
    whatILike: "He's fun and can naturally bring about a conversation.",
  },
  {
    name: "Chorong",
    photo: friend7Photo,
    howWeMet: "We met each other through a mutual friend, she was part of merging our friend group.",
    whatILike: "She's funny and quirky, likes to tease a lot but overall a very caring person.",
  },
];

const VINE_COLORS = {
  vine: "rgba(62,110,56,0.85)",
  vineLight: "rgba(90,145,75,0.7)",
  vineDark: "rgba(40,72,35,0.9)",
  leaf: "rgba(85,160,70,0.92)",
  leafLight: "rgba(120,195,95,0.88)",
  leafDark: "rgba(55,115,45,0.95)",
  accent: "rgba(160,210,140,0.9)",
};

/* ── Single leaf button on the vine ── */
function FriendLeaf({ friend, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(friend);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="friends-vine-leaf"
      style={{
        position: "relative",
        flex: "0 0 auto",
        width: "clamp(110px, calc(70px + 5.5vw), 200px)",
        height: "clamp(140px, calc(85px + 7vw), 260px)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 0,
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.3s ease",
        "--sway-delay": `${index * 0.4}s`,
        zIndex: 4,
      }}
      aria-label={friend.name}
    >
      {/* Stem connecting leaf to vine */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "clamp(3px, calc(2px + 0.15vw), 6px)",
          height: "clamp(18px, calc(12px + 1.2vw), 36px)",
          transform: "translateX(-50%)",
          background: `linear-gradient(180deg, ${VINE_COLORS.vineDark}, ${VINE_COLORS.vine})`,
          borderRadius: 999,
        }}
      />

      {/* Leaf body — SVG pointed leaf shape */}
      <svg
        viewBox="0 0 120 160"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          top: "clamp(14px, calc(9px + 0.9vw), 28px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "88%",
          height: "82%",
          pointerEvents: "none",
          filter: hovered
            ? "drop-shadow(0 0 12px rgba(120,200,90,0.35))"
            : "drop-shadow(0 0 6px rgba(80,160,60,0.15))",
          transition: "filter 0.3s ease",
        }}
      >
        <defs>
          <linearGradient id={`leafFill-${index}`} x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="rgba(95,175,72,0.94)" />
            <stop offset="40%" stopColor="rgba(68,140,55,0.92)" />
            <stop offset="100%" stopColor="rgba(45,105,38,0.9)" />
          </linearGradient>
        </defs>
        {/* Leaf shape */}
        <path
          d="M60 5 C80 5 110 30 115 60 C118 82 112 110 100 130 C90 145 75 155 60 158 C45 155 30 145 20 130 C8 110 2 82 5 60 C10 30 40 5 60 5 Z"
          fill={`url(#leafFill-${index})`}
          stroke="rgba(50,100,40,0.4)"
          strokeWidth="1"
        />
        {/* Center vein */}
        <path
          d="M60 12 Q61 80 60 152"
          fill="none"
          stroke="rgba(40,85,32,0.3)"
          strokeWidth="1.2"
        />
        {/* Side veins */}
        <path d="M60 40 Q40 48 25 55" fill="none" stroke="rgba(40,85,32,0.18)" strokeWidth="0.8" />
        <path d="M60 40 Q80 48 95 55" fill="none" stroke="rgba(40,85,32,0.18)" strokeWidth="0.8" />
        <path d="M60 70 Q38 80 18 90" fill="none" stroke="rgba(40,85,32,0.18)" strokeWidth="0.8" />
        <path d="M60 70 Q82 80 102 90" fill="none" stroke="rgba(40,85,32,0.18)" strokeWidth="0.8" />
        <path d="M60 100 Q42 112 28 120" fill="none" stroke="rgba(40,85,32,0.15)" strokeWidth="0.8" />
        <path d="M60 100 Q78 112 92 120" fill="none" stroke="rgba(40,85,32,0.15)" strokeWidth="0.8" />
      </svg>

      {/* Friend name label inside leaf */}
      <span
        className="pixel-text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(6px, calc(4px + 0.32vw), 12px)",
          color: "rgba(240,255,235,0.92)",
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          textAlign: "center",
          width: "70%",
          letterSpacing: "0.04em",
          lineHeight: 1.3,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {friend.name}
      </span>
    </button>
  );
}

/* ── Static leaf on the bottom vine ── */
function StaticLeaf({ label, shape, onClick, x }) {
  const [hovered, setHovered] = useState(false);
  const isPaper = shape === "paper";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: "50%",
        transform: `translate(-50%, -10%) ${hovered ? "scale(1.1)" : "scale(1)"}`,
        width: "clamp(100px, calc(65px + 5vw), 180px)",
        height: "clamp(130px, calc(80px + 6.5vw), 230px)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        zIndex: 4,
      }}
      aria-label={label}
    >
      {/* Stem */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "clamp(3px, calc(2px + 0.15vw), 5px)",
          height: "clamp(14px, calc(9px + 1vw), 28px)",
          transform: "translateX(-50%)",
          background: `linear-gradient(180deg, ${VINE_COLORS.vineDark}, ${VINE_COLORS.vine})`,
          borderRadius: 999,
        }}
      />

      <svg
        viewBox="0 0 120 160"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          top: "clamp(10px, calc(7px + 0.7vw), 22px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "88%",
          height: "82%",
          pointerEvents: "none",
          filter: hovered
            ? `drop-shadow(0 0 12px ${isPaper ? "rgba(210,190,140,0.4)" : "rgba(190,160,120,0.4)"})`
            : `drop-shadow(0 0 6px ${isPaper ? "rgba(200,180,130,0.15)" : "rgba(180,150,110,0.15)"})`,
          transition: "filter 0.3s ease",
        }}
      >
        {isPaper ? (
          <>
            {/* Paper / scroll shape */}
            <rect x="10" y="8" width="100" height="144" rx="6" ry="6"
              fill="rgba(225,215,190,0.92)"
              stroke="rgba(180,160,120,0.5)"
              strokeWidth="1.2"
            />
            {/* Lines on paper */}
            {[35, 55, 75, 95, 115].map((ly) => (
              <line key={ly} x1="24" y1={ly} x2="96" y2={ly}
                stroke="rgba(160,140,100,0.25)" strokeWidth="0.8"
              />
            ))}
            {/* Curl at bottom-right */}
            <path d="M110 132 Q115 140 108 148 Q102 152 95 152 L110 152 L110 132 Z"
              fill="rgba(200,188,160,0.85)"
              stroke="rgba(170,150,110,0.4)" strokeWidth="0.8"
            />
          </>
        ) : (
          <>
            {/* Letter / envelope shape */}
            <rect x="8" y="20" width="104" height="120" rx="5" ry="5"
              fill="rgba(235,220,195,0.92)"
              stroke="rgba(180,155,110,0.5)"
              strokeWidth="1.2"
            />
            {/* Envelope flap */}
            <path d="M8 20 L60 70 L112 20"
              fill="none"
              stroke="rgba(170,145,105,0.5)"
              strokeWidth="1.2"
            />
            {/* Envelope flap fill */}
            <path d="M8 20 L60 70 L112 20 Z"
              fill="rgba(215,200,170,0.6)"
            />
            {/* Heart seal */}
            <text x="60" y="108" textAnchor="middle" fontSize="20" fill="rgba(180,100,100,0.5)">♥</text>
          </>
        )}
      </svg>

      {/* Label */}
      <span
        className="pixel-text"
        style={{
          position: "absolute",
          bottom: "clamp(8px, calc(5px + 0.5vw), 18px)",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(5px, calc(3.5px + 0.26vw), 10px)",
          color: "rgba(210,230,200,0.8)",
          textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          textAlign: "center",
          width: "90%",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ══════════════ Main FriendsVineNetwork Component ══════════════ */
export default function FriendsVineNetwork({ onFriendClick, onPaperLeafClick, onLetterLeafClick }) {
  const scrollRef = useRef(null);
  const scrollAnimRef = useRef(null);
  const [scrollDir, setScrollDir] = useState(0); // -1 left, 0 stop, 1 right

  // Build the repeated friends array for infinite loop
  const repeatedFriends = useMemo(() => {
    if (FRIENDS_DATA.length === 0) return [];
    // Repeat friends enough to fill the screen nicely — at least 7 copies
    const copies = Math.max(7, Math.ceil(20 / FRIENDS_DATA.length));
    const arr = [];
    for (let i = 0; i < copies; i++) {
      FRIENDS_DATA.forEach((f, j) => arr.push({ ...f, _key: `${i}-${j}` }));
    }
    return arr;
  }, []);

  // Infinite scroll reset: when we scroll too far, jump back to center
  const resetScrollIfNeeded = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / Math.max(7, Math.ceil(20 / FRIENDS_DATA.length));
    const midPoint = singleSetWidth * Math.floor(Math.max(7, Math.ceil(20 / FRIENDS_DATA.length)) / 2);

    if (el.scrollLeft < singleSetWidth * 1) {
      el.scrollLeft += singleSetWidth * 2;
    } else if (el.scrollLeft > singleSetWidth * (Math.max(7, Math.ceil(20 / FRIENDS_DATA.length)) - 2)) {
      el.scrollLeft -= singleSetWidth * 2;
    }
  }, []);

  // Smooth scroll animation loop
  useEffect(() => {
    const SPEED = 2.2; // px per frame
    let running = true;

    const tick = () => {
      if (!running) return;
      const el = scrollRef.current;
      if (el && scrollDir !== 0) {
        el.scrollLeft += scrollDir * SPEED;
        resetScrollIfNeeded();
      }
      scrollAnimRef.current = requestAnimationFrame(tick);
    };
    scrollAnimRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);
    };
  }, [scrollDir, resetScrollIfNeeded]);

  // Center scroll on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / Math.max(7, Math.ceil(20 / FRIENDS_DATA.length));
    el.scrollLeft = singleSetWidth * Math.floor(Math.max(7, Math.ceil(20 / FRIENDS_DATA.length)) / 2);
  }, []);

  // Handle mouse position for scroll direction
  const handleMouseMove = useCallback((e) => {
    const el = scrollRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;

    if (relX < 0.18) {
      setScrollDir(-1);
    } else if (relX > 0.82) {
      setScrollDir(1);
    } else {
      setScrollDir(0);
    }
  }, []);

  const handleMouseLeave = useCallback(() => setScrollDir(0), []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background atmosphere */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 30%, rgba(35,65,30,0.25), transparent 55%), radial-gradient(ellipse at 50% 75%, rgba(28,55,25,0.18), transparent 50%)",
          zIndex: 0,
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="friends-vine-particle"
          style={{
            position: "absolute",
            left: `${8 + Math.random() * 84}%`,
            top: `${5 + Math.random() * 90}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            borderRadius: "50%",
            background: `rgba(${130 + Math.random() * 60},${200 + Math.random() * 40},${100 + Math.random() * 50},${0.15 + Math.random() * 0.2})`,
            animationDelay: `${i * 1.2}s`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ══ TOP VINE — SVG illustration ══ */}
      <svg
        viewBox="0 0 2000 200"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          top: "28%",
          width: "100%",
          height: "clamp(30px, calc(18px + 2.5vw), 60px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <defs>
          <linearGradient id="vineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(50,95,42,0.8)" />
            <stop offset="20%" stopColor="rgba(62,110,50,0.85)" />
            <stop offset="50%" stopColor="rgba(70,125,58,0.9)" />
            <stop offset="80%" stopColor="rgba(62,110,50,0.85)" />
            <stop offset="100%" stopColor="rgba(50,95,42,0.8)" />
          </linearGradient>
          <filter id="vineGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {/* Glow behind vine */}
        <path
          d="M -20 100 Q 200 70, 400 100 Q 600 130, 800 100 Q 1000 70, 1200 100 Q 1400 130, 1600 100 Q 1800 70, 2020 100"
          fill="none"
          stroke="rgba(80,150,65,0.2)"
          strokeWidth="28"
          filter="url(#vineGlow)"
        />

        {/* Main vine */}
        <path
          d="M -20 100 Q 200 70, 400 100 Q 600 130, 800 100 Q 1000 70, 1200 100 Q 1400 130, 1600 100 Q 1800 70, 2020 100"
          fill="none"
          stroke="url(#vineGrad)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Thinner highlight vine */}
        <path
          d="M -20 98 Q 200 68, 400 98 Q 600 128, 800 98 Q 1000 68, 1200 98 Q 1400 128, 1600 98 Q 1800 68, 2020 98"
          fill="none"
          stroke="rgba(100,170,80,0.35)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Small decorative tendrils */}
        {[150, 450, 750, 1050, 1350, 1650, 1900].map((tx, i) => (
          <path
            key={`tendril-${i}`}
            d={`M ${tx} ${90 + (i % 2 ? 15 : -10)} Q ${tx + (i % 2 ? 20 : -20)} ${90 + (i % 2 ? 35 : -30)}, ${tx + (i % 2 ? 35 : -35)} ${90 + (i % 2 ? 25 : -20)}`}
            fill="none"
            stroke="rgba(70,130,55,0.5)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}

        {/* Tiny decorative leaves on vine */}
        {[80, 320, 550, 880, 1150, 1500, 1750].map((lx, i) => (
          <ellipse
            key={`dec-leaf-${i}`}
            cx={lx}
            cy={95 + (i % 2 ? -25 : 25)}
            rx="12"
            ry="7"
            fill="rgba(90,160,72,0.6)"
            transform={`rotate(${i % 2 ? -35 : 35} ${lx} ${95 + (i % 2 ? -25 : 25)})`}
          />
        ))}
      </svg>

      {/* ══ SCROLLABLE FRIEND LEAVES on top vine ══ */}
      <div
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "absolute",
          left: 0,
          top: "12%",
          width: "100%",
          height: "42%",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          zIndex: 3,
          paddingBottom: "clamp(8px, calc(5px + 0.5vw), 18px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "clamp(16px, calc(10px + 1.4vw), 40px)",
            paddingInline: "clamp(20px, calc(12px + 2vw), 60px)",
            alignItems: "flex-end",
          }}
        >
          {repeatedFriends.map((friend, i) => (
            <FriendLeaf
              key={friend._key}
              friend={friend}
              index={i}
              onClick={onFriendClick}
            />
          ))}
        </div>
      </div>

      {/* Scroll hints */}
      <div
        style={{
          position: "absolute",
          left: "clamp(10px, calc(6px + 0.6vw), 24px)",
          top: "28%",
          transform: "translateY(-50%)",
          fontSize: "clamp(16px, calc(10px + 0.8vw), 32px)",
          color: "rgba(140,200,120,0.5)",
          pointerEvents: "none",
          zIndex: 5,
          opacity: scrollDir === -1 ? 0.9 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      >
        ←
      </div>
      <div
        style={{
          position: "absolute",
          right: "clamp(10px, calc(6px + 0.6vw), 24px)",
          top: "28%",
          transform: "translateY(-50%)",
          fontSize: "clamp(16px, calc(10px + 0.8vw), 32px)",
          color: "rgba(140,200,120,0.5)",
          pointerEvents: "none",
          zIndex: 5,
          opacity: scrollDir === 1 ? 0.9 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      >
        →
      </div>

      {/* ══ BOTTOM VINE — SVG illustration ══ */}
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: "15%",
          width: "70%",
          top: "66%",
          height: "clamp(24px, calc(14px + 2vw), 48px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <path
          d="M 0 50 Q 200 30, 400 50 Q 600 70, 800 50 Q 900 40, 1000 50"
          fill="none"
          stroke="rgba(60,105,48,0.8)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 0 48 Q 200 28, 400 48 Q 600 68, 800 48 Q 900 38, 1000 48"
          fill="none"
          stroke="rgba(90,155,72,0.3)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Tendrils */}
        <path d="M 250 42 Q 230 25, 240 15" fill="none" stroke="rgba(70,130,55,0.45)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 700 55 Q 720 72, 710 82" fill="none" stroke="rgba(70,130,55,0.45)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* ══ BOTTOM STATIC LEAVES ══ */}
      <div
        style={{
          position: "absolute",
          left: "15%",
          width: "70%",
          top: "60%",
          height: "34%",
          zIndex: 3,
        }}
      >
        <StaticLeaf
          label="Friendship Lists"
          shape="paper"
          onClick={onPaperLeafClick}
          x={35}
        />
        <StaticLeaf
          label="Letter to Best Friend"
          shape="letter"
          onClick={onLetterLeafClick}
          x={65}
        />
      </div>

      {/* Bottom hint text */}
      <p
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(12px, calc(8px + 0.8vw), 28px)",
          transform: "translateX(-50%)",
          margin: 0,
          width: "min(88vw, 600px)",
          textAlign: "center",
          color: "rgba(160,210,140,0.55)",
          fontSize: "clamp(9px, calc(5px + 0.35vw), 16px)",
          letterSpacing: "0.04em",
          lineHeight: 1.5,
          fontStyle: "italic",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        hover left or right to scroll through the vine · click a leaf to read
      </p>
    </div>
  );
}
