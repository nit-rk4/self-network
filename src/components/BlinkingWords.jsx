import { useMemo } from "react";

export default function BlinkingWords({ 
    words = [
        "daughter", "friend", "sister", "Baptist", "Christian", 
        "student", "pianist", "scholar", "gamer", "believer", "individual", "dreamer",
        "reader", "movie watcher", "music lover", "dog person", "movie lover",
        "cousin", "niece", "aunt", "granddaughter", "grandmother",
        "ambivert", "optimist", "complex", "programmer", "art lover", "coffee enthusiast", "night owl"
    ] }) {
  const wordPositions = useMemo(() => {
    const minWords = 60;
    const positions = [];
    
    const duplications = Math.ceil(minWords / words.length);
    
    for (let d = 0; d < duplications; d++) {
      words.forEach((word, idx) => {
        const x = Math.random() * 95 + 2.5;
        const y = Math.random() * 95 + 2.5;
        
        const animationDelay = Math.random() * 5;
        const animationDuration = 2 + Math.random() * 3;
        
        // Random size variation
        const fontSize = 12 + Math.random() * 8; 
        
        positions.push({
          word,
          x,
          y,
          animationDelay,
          animationDuration,
          fontSize,
          key: `${word}-${d}-${idx}`,
        });
      });
    }
    
    return positions;
  }, [words]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {wordPositions.map((wp) => (
        <div
          key={wp.key}
          className="blinking-word"
          style={{
            position: "absolute",
            left: `${wp.x}%`,
            top: `${wp.y}%`,
            fontSize: `${wp.fontSize}px`,
            color: "rgba(102, 210, 255, 0.05)",
            fontWeight: 600,
            whiteSpace: "nowrap",
            userSelect: "none",
            animation: `blink ${wp.animationDuration}s ease-in-out ${wp.animationDelay}s infinite`,
          }}
        >
          {wp.word}
        </div>
      ))}
    </div>
  );
}
