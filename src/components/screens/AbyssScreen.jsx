import { useState, useEffect, useRef, useCallback } from "react";
import { FiArrowLeft } from "react-icons/fi";

/* ─── Section definitions: which stanzas belong to which section ─── */
const SECTIONS = [
  { id: 1, name: "surface", stanzaStart: 0, stanzaEnd: 1 },       // stanzas 0-1
  { id: 2, name: "pressure", stanzaStart: 2, stanzaEnd: 6 },      // stanzas 2-6
  { id: 3, name: "impostor", stanzaStart: 7, stanzaEnd: 10 },     // stanzas 7-10
  { id: 4, name: "reflection", stanzaStart: 11, stanzaEnd: 14 },  // stanzas 11-14
  { id: 5, name: "acceptance", stanzaStart: 15, stanzaEnd: 16 },  // stanzas 15-16
];

/* ─── 17 stanzas × 3 lines each ─── */
const stanzas = [
  // ── Section 1: Surface ──
  ["sometimes she finds herself asking,", "does she partake in being? in becoming?", "or is she just she?"],
  ["piano notes and keystrokes meet in the dark,", "a quiet room where applause arrives sometimes;", "the melody is almost hers."],
  // ── Section 2: Pressure ──
  ["on paper she is tidy:", "honors stitched into margins,", "a believer who studies late."],
  ["the seams at her throat hum", "with a small, relentless voice;", "the stage feels larger now."],
  ["she watches other days fold", "into neat origami, calendars creased to triumph,", "while hers drifts slow and soft."],
  ["leaves of chance slide past her window,", "glittering, impossible to catch by habit;", "her bubble keeps its warm dust."],
  ["sometimes the code tastes like glass\u2014", "bright suggestions reflected back,", "ideas half-sung, half-owned."],
  // ── Section 3: Impostor ──
  ["shadows press at the edges,", "whispering she cheated, that she owes more than she has;", "the knot of doubt tightens at night."],
  ["fear sits like a polite, heavy thing,", "a hand folded around her chest when she sleeps,", "the thought of disappointing the ones who believe."],
  ["dreams shrink like constellations under city light;", "titles once bright dim to embers, uncertain\u2014", "still, one small ember keeps patient watch."],
  ["she envies the ease of others, jealous and gentle,", "wishing to move like them without meaning to resent;", "the ache smells faintly of loneliness."],
  // ── Section 4: Reflection ──
  ["stepping out feels like leaving warm ground,", "risk smells like cold air and new streets;", "she learns to count breaths before she moves."],
  ["in the hollow between applause and breath she listens,", "names the patterns: pressure, avoidance, tired habits;", "recognition is the first act of undoing."],
  ["the Abyss is not annihilation but a ledger\u2014", "a long, soft catalog of what she hides even from herself;", "she scrolls deeper until the noise thins."],
  ["there, in the hush, she meets the one who trembles,", "the jealous, the scared, the proud and the tired\u2014", "she sees without accusing."],
  // ── Section 5: Acceptance ──
  ["acceptance arrives as small recognition:", "this is me, complicated and real, not finished but seen;", "she breathes into the dark and it answers with space."],
  ["she rises less certain, more whole, learning the weight of each step;", "not victory, not a curtain call, but windows opened slowly\u2014", "she is present. she is enough."],
];

export default function AbyssScreen({ onBack }) {
  const [entered, setEntered] = useState(false);
  const [revealedLines, setRevealedLines] = useState(0);
  const [visibleSection, setVisibleSection] = useState(1);
  const scrollRef = useRef(null);
  const lineRefs = useRef([]);
  const stanzaRefs = useRef([]);

  /* Track which section is currently in the viewport via scroll position */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const viewportMid = container.scrollTop + container.clientHeight / 2;

      // Walk stanza refs to find the one closest to viewport middle
      let closestStanza = 0;
      let closestDist = Infinity;
      stanzaRefs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.offsetTop;
        const mid = top + el.offsetHeight / 2;
        const dist = Math.abs(mid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closestStanza = i;
        }
      });

      const section = SECTIONS.find(
        (s) => closestStanza >= s.stanzaStart && closestStanza <= s.stanzaEnd
      ) || SECTIONS[0];
      setVisibleSection(section.id);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [entered]);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* Observe each line element — reveal when it enters the viewport */
  const observerRef = useRef(null);

  useEffect(() => {
    if (!entered) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.lineIdx);
            setRevealedLines((prev) => Math.max(prev, idx + 1));
          }
        });
      },
      {
        root: scrollRef.current,
        rootMargin: "0px 0px -20% 0px", // reveal a bit before centered
        threshold: 0.1,
      }
    );

    lineRefs.current.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [entered]);

  /* Assign ref to each line */
  const setLineRef = useCallback((el, globalIdx) => {
    lineRefs.current[globalIdx] = el;
  }, []);

  /* Flatten for global index tracking */
  let globalIdx = 0;

  return (
    <div
      className="abyss-screen"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        background: {
          1: "radial-gradient(ellipse at 50% 40%, #0c0814 0%, #060410 40%, #020108 100%)",
          2: "radial-gradient(ellipse at 50% 40%, #080610 0%, #04030a 40%, #010107 100%)",
          3: "radial-gradient(ellipse at 50% 40%, #050408 0%, #020206 40%, #010104 100%)",
          4: "radial-gradient(ellipse at 50% 40%, #060510 0%, #030308 40%, #010106 100%)",
          5: "radial-gradient(ellipse at 50% 40%, #0a0812 0%, #060510 40%, #030208 100%)",
        }[visibleSection] || "radial-gradient(ellipse at 50% 40%, #0c0814 0%, #060410 40%, #020108 100%)",
        opacity: entered ? 1 : 0,
        transition: "opacity 1s ease, background 1.5s ease",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 60%, rgba(140,100,200,0.03) 0%, transparent 50%), " +
            "radial-gradient(circle at 70% 30%, rgba(100,60,180,0.02) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Section 1 effect: floating musical notes ── */}
      <div
        className="abyss-notes-layer"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 1 && revealedLines > 0 ? 0.6 : 0,
          transition: "opacity 1.5s ease",
        }}
      >
          {["♪", "♫", "♩", "♬", "♪", "♫", "♩", "♬", "♪", "♫", "♪", "♫"].map((note, i) => (
            <span
              key={i}
              className="abyss-floating-note"
              style={{
                position: "absolute",
                left: `${5 + (i * 8.2) % 88}%`,
                bottom: `-${30 + (i * 11) % 40}px`,
                fontSize: `${20 + (i % 4) * 6}px`,
                color: `rgba(200,170,255,${0.25 + (i % 3) * 0.1})`,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${10 + (i % 5) * 2}s`,
                filter: `drop-shadow(0 0 4px rgba(180,140,240,0.3))`,
              }}
            >
              {note}
            </span>
          ))}
      </div>

      {/* ── Section 1 effect: soft center glow ── */}
      <div
        className="abyss-surface-glow"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(180,160,220,0.06) 0%, transparent 55%)",
          opacity: visibleSection === 1 && revealedLines > 0 ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      />

      {/* ── Section 2 effect: pressure particles slipping away ── */}
      <div
        className="abyss-pressure-layer"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 2 ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      >
        {/* Falling/slipping particles — things out of reach */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="abyss-slip-particle"
            style={{
              position: "absolute",
              left: `${3 + (i * 7.3) % 90}%`,
              top: `-${10 + (i * 13) % 30}px`,
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              borderRadius: "50%",
              background: `rgba(180,140,240,${0.15 + (i % 4) * 0.05})`,
              boxShadow: `0 0 ${4 + (i % 3) * 2}px rgba(140,100,200,0.2)`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${6 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ── Section 2 effect: subtle screen tremor ── */}
      <div
        className={visibleSection === 2 ? "abyss-pressure-tremor" : ""}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          border: visibleSection === 2
            ? "1px solid rgba(140,100,200,0.04)"
            : "1px solid transparent",
          transition: "border-color 1.5s ease",
        }}
      />

      {/* ── Section 2 effect: floating difficulty word bubbles ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 2 ? 1 : 0,
          transition: "opacity 1.5s ease",
          overflow: "hidden",
        }}
      >
        {[
          "Pressure", "Expectations", "Keeping up academically",
          "Maintaining grades", "Balancing college & adult life",
          "Organizing time", "Staying consistent",
          "Improving myself", "Personal growth",
          "Being a good leader", "Stepping out of comfort zone",
          "Taking risks", "Seizing opportunities",
          "Being more extroverted", "Confidence",
          // duplicates for density
          "Pressure", "Expectations", "Keeping up",
          "Maintaining grades", "Organizing time",
          "Taking risks", "Comfort zone", "Confidence",
          "Being a good leader", "Staying consistent",
        ].map((word, i) => (
          <span
            key={i}
            className="abyss-difficulty-bubble"
            style={{
              position: "absolute",
              left: `${2 + ((i * 13.7) % 88)}%`,
              top: `${3 + ((i * 17.3) % 86)}%`,
              fontSize: `${11 + (i % 4) * 2}px`,
              color: `rgba(180,140,240,${0.08 + (i % 5) * 0.03})`,
              padding: "clamp(4px, calc(3px + 0.2vw), 10px) clamp(8px, calc(5px + 0.48vw), 22px)",
              border: `1px solid rgba(140,100,200,${0.06 + (i % 4) * 0.02})`,
              borderRadius: 20,
              background: `rgba(140,100,200,${0.02 + (i % 3) * 0.01})`,
              whiteSpace: "nowrap",
              animationDelay: `${(i * 1.7) % 12}s`,
              animationDuration: `${8 + (i % 6) * 3}s`,
              letterSpacing: "0.03em",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* ── Section 3 effect: deepening dark vignette ── */}
      <div
        className="abyss-impostor-vignette"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 72,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.7) 100%)",
          opacity: visibleSection === 3 ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      />

      {/* ── Section 3 effect: floating shadow blobs ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 3 ? 1 : 0,
          transition: "opacity 2s ease",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`shadow-blob-${i}`}
            className="abyss-shadow-blob"
            style={{
              position: "absolute",
              left: `${5 + (i * 11.3) % 80}%`,
              top: `${8 + (i * 14.7) % 75}%`,
              width: `${60 + (i % 4) * 30}px`,
              height: `${40 + (i % 3) * 25}px`,
              borderRadius: "50%",
              background: `rgba(20,10,35,${0.3 + (i % 3) * 0.15})`,
              filter: `blur(${18 + (i % 4) * 8}px)`,
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${8 + (i % 5) * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ── Section 3 effect: smoky impostor words ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 3 ? 1 : 0,
          transition: "opacity 2s ease",
          overflow: "hidden",
        }}
      >
        {[
          "inadequacy", "self-doubt", "impostor syndrome", "jealousy",
          "intimidation", "envy", "fear", "fear of failure",
          "anxiety", "pressure", "shame", "guilt",
          "disappointment", "insecurity", "loneliness", "uncertainty",
          "comparison", "fragility",
          // duplicates for density
          "inadequacy", "self-doubt", "fear", "shame",
          "impostor syndrome", "loneliness", "envy", "guilt",
          "anxiety", "insecurity", "comparison", "fragility",
          "jealousy", "pressure", "fear of failure", "uncertainty",
          "intimidation", "disappointment",
        ].map((word, i) => (
          <span
            key={`smoke-${i}`}
            className="abyss-smoke-word"
            style={{
              position: "absolute",
              left: `${2 + ((i * 9.7) % 88)}%`,
              top: `${4 + ((i * 13.3) % 86)}%`,
              fontSize: `${11 + (i % 5) * 2}px`,
              color: `rgba(100,65,140,${0.10 + (i % 4) * 0.03})`,
              fontWeight: 300,
              fontStyle: "italic",
              whiteSpace: "nowrap",
              letterSpacing: "0.08em",
              transform: `rotate(${-3 + (i % 7) * 1}deg)`,
              animationDelay: `${(i * 1.9) % 16}s`,
              animationDuration: `${12 + (i % 7) * 2}s`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* ── Section 3 effect: glowing ember ── */}
      <div
        className="abyss-ember-container"
        style={{
          position: "fixed",
          bottom: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 72,
          pointerEvents: "none",
          opacity: visibleSection === 3 ? 1 : 0,
          transition: "opacity 2.5s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer warm halo */}
        <div
          className="abyss-ember-halo"
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,160,60,0.08) 0%, rgba(255,120,40,0.03) 40%, transparent 70%)",
          }}
        />
        {/* Inner ember core */}
        <div
          className="abyss-ember-core"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,180,80,0.9) 0%, rgba(255,120,40,0.5) 60%, transparent 100%)",
            boxShadow:
              "0 0 8px rgba(255,160,60,0.6), 0 0 20px rgba(255,120,40,0.3), 0 0 40px rgba(255,100,30,0.15)",
          }}
        />
      </div>

      {/* ── Section 4 effect: rising light particles (hope sparks) ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 4 ? 1 : 0,
          transition: "opacity 2s ease",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={`hope-${i}`}
            className="abyss-hope-particle"
            style={{
              position: "absolute",
              left: `${4 + (i * 5.8) % 88}%`,
              bottom: `-${8 + (i * 9) % 20}px`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              borderRadius: "50%",
              background: `rgba(200,180,240,${0.2 + (i % 4) * 0.1})`,
              boxShadow: `0 0 ${4 + (i % 3) * 3}px rgba(180,160,230,${0.15 + (i % 3) * 0.08})`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + (i % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ── Section 4 effect: gentle breathing center glow ── */}
      <div
        className="abyss-reflection-glow"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(180,170,220,0.05) 0%, rgba(160,140,210,0.02) 35%, transparent 60%)",
          opacity: visibleSection === 4 ? 1 : 0,
          transition: "opacity 2.5s ease",
        }}
      />

      {/* ── Section 4 effect: firefly-like gentle sparks ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 4 ? 1 : 0,
          transition: "opacity 2s ease",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`firefly-${i}`}
            className="abyss-firefly"
            style={{
              position: "absolute",
              left: `${10 + (i * 12.5) % 75}%`,
              top: `${15 + (i * 11.3) % 65}%`,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(220,200,255,0.6)",
              boxShadow: "0 0 6px rgba(200,180,240,0.4), 0 0 14px rgba(180,160,220,0.2)",
              animationDelay: `${i * 1.6}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ── Section 4 effect: soft reflection words (gentle, no borders, faint) ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 4 ? 1 : 0,
          transition: "opacity 2.5s ease",
          overflow: "hidden",
        }}
      >
        {[
          "breathe", "recognize", "undoing", "patterns",
          "listen", "stillness", "awareness", "gentle",
          "without accusing", "the hush", "she sees",
          "count breaths", "recognition", "letting go",
          "breathe", "stillness", "awareness", "gentle",
          "listen", "undoing", "she sees", "the hush",
        ].map((word, i) => (
          <span
            key={`reflect-${i}`}
            className="abyss-reflection-word"
            style={{
              position: "absolute",
              left: `${3 + ((i * 10.3) % 86)}%`,
              top: `${6 + ((i * 14.1) % 82)}%`,
              fontSize: `${10 + (i % 4) * 2}px`,
              color: `rgba(180,170,220,${0.06 + (i % 3) * 0.02})`,
              fontWeight: 300,
              whiteSpace: "nowrap",
              letterSpacing: "0.1em",
              animationDelay: `${(i * 2.3) % 18}s`,
              animationDuration: `${14 + (i % 5) * 3}s`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* ── Section 5 effect: drifting light petals ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 5 ? 1 : 0,
          transition: "opacity 3s ease",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={`petal-${i}`}
            className="abyss-petal"
            style={{
              position: "absolute",
              left: `${3 + (i * 7.2) % 88}%`,
              top: `-${20 + (i * 13) % 30}px`,
              width: `${6 + (i % 3) * 3}px`,
              height: `${8 + (i % 4) * 3}px`,
              borderRadius: "50% 50% 50% 0",
              background: `rgba(220,200,245,${0.08 + (i % 4) * 0.04})`,
              boxShadow: `0 0 ${6 + (i % 3) * 4}px rgba(200,180,240,${0.06 + (i % 3) * 0.03})`,
              transform: `rotate(${(i * 37) % 360}deg)`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${12 + (i % 5) * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ── Section 5 effect: warm breathing glow behind text ── */}
      <div
        className="abyss-acceptance-glow"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(210,195,240,0.07) 0%, rgba(190,170,230,0.03) 30%, transparent 55%)",
          opacity: visibleSection === 5 ? 1 : 0,
          transition: "opacity 3s ease",
        }}
      />

      {/* ── Section 5 effect: floating light motes (more profound than S4) ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 71,
          pointerEvents: "none",
          opacity: visibleSection === 5 ? 1 : 0,
          transition: "opacity 3s ease",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={`mote-${i}`}
            className="abyss-light-mote"
            style={{
              position: "absolute",
              left: `${2 + (i * 4.3) % 92}%`,
              bottom: `-${6 + (i * 7) % 16}px`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              borderRadius: "50%",
              background: `rgba(220,210,250,${0.25 + (i % 5) * 0.08})`,
              boxShadow: `0 0 ${5 + (i % 4) * 3}px rgba(210,200,245,${0.2 + (i % 3) * 0.1})`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${7 + (i % 6) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ── Section 5 effect: soft vignette lift (reverse of S3 darkening) ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 72,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(200,190,240,0.04) 0%, transparent 45%, rgba(10,6,18,0.2) 100%)",
          opacity: visibleSection === 5 ? 1 : 0,
          transition: "opacity 3s ease",
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "fixed",
          top: "clamp(14px, calc(10px + 1vw), 42px)",
          left: "clamp(14px, calc(10px + 1vw), 42px)",
          zIndex: 80,
          background: "rgba(20,10,30,0.7)",
          border: "1px solid rgba(140,100,200,0.25)",
          borderRadius: "50%",
          padding: "clamp(6px, calc(4px + 0.42vw), 16px)",
          color: "rgba(180,140,240,0.7)",
          fontSize: "clamp(20px, calc(14px + 1vw), 48px)",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(140,100,200,0.2)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "clamp(36px, calc(24px + 1.65vw), 68px)",
          height: "clamp(36px, calc(24px + 1.65vw), 68px)",
        }}
        aria-label="Leave the Abyss"
      >
        <FiArrowLeft />
      </button>

      {/* Scrollable poem container */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "auto",
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}
      >
        {/* Top spacer — start with emptiness, poem begins after a full viewport */}
        <div style={{ height: "100vh" }} />

        {/* Stanzas */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 0,
          }}
        >
          {stanzas.map((lines, stanzaIdx) => {
            // Determine which section this stanza belongs to
            const section = SECTIONS.find(
              (s) => stanzaIdx >= s.stanzaStart && stanzaIdx <= s.stanzaEnd
            ) || SECTIONS[0];
            const isAcceptanceSection = section.id === 5;

            const stanzaLines = lines.map((line, lineInStanza) => {
              const idx = globalIdx++;
              const revealed = idx < revealedLines;
              const isSurface = section.id === 1;
              const isPressure = section.id === 2;
              const isImpostor = section.id === 3;
              const isReflection = section.id === 4;
              const isAcceptance = section.id === 5;
              // Pressure lines that should tremble
              const pressureTremble = isPressure && revealed && (
                line.includes("relentless") ||
                line.includes("larger now") ||
                line.includes("impossible") ||
                line.includes("glass")
              );
              // Impostor lines that pulse with anxiety
              const impostorPulse = isImpostor && revealed && (
                line.includes("cheated") ||
                line.includes("doubt") ||
                line.includes("disappointing") ||
                line.includes("jealous") ||
                line.includes("loneliness")
              );
              // The ember line gets a warm glow
              const isEmberLine = isImpostor && revealed &&
                line.includes("ember keeps patient watch");
              // Reflection lines with a quiet clarity glow
              const reflectionGlow = isReflection && revealed && (
                line.includes("first act of undoing") ||
                line.includes("noise thins") ||
                line.includes("sees without accusing")
              );
              // Acceptance: the final line glows warmly
              const isFinale = isAcceptance && revealed &&
                line.includes("she is present. she is enough.");

              return (
                <p
                  key={idx}
                  ref={(el) => setLineRef(el, idx)}
                  data-line-idx={idx}
                  className={
                    pressureTremble
                      ? "abyss-tremble"
                      : impostorPulse
                        ? "abyss-anxious-pulse"
                        : isEmberLine
                          ? "abyss-ember-line"
                          : reflectionGlow
                            ? "abyss-clarity-line"
                            : isFinale
                              ? "abyss-finale-line"
                              : ""
                  }
                  style={{
                    fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                    color: isSurface
                      ? "rgba(200,175,240,0.82)"
                      : isPressure
                        ? "rgba(180,150,220,0.78)"
                        : isImpostor
                          ? "rgba(155,125,195,0.72)"
                          : isReflection
                            ? "rgba(175,165,210,0.78)"
                            : isAcceptance
                              ? "rgba(210,200,240,0.85)"
                              : "rgba(180,140,240,0.75)",
                    lineHeight: 1.8,
                    marginBottom: "60vh",
                    textAlign: "center",
                    maxWidth: "min(560px, 90vw)",
                    padding: "0 clamp(16px, calc(10px + 1vw), 42px)",
                    letterSpacing: "0.02em",
                    fontStyle: "italic",
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.8s ease, transform 0.8s ease"
                      + (isAcceptanceSection ? ", text-shadow 1.5s ease" : ""),
                    textShadow: isSurface && revealed
                      ? "0 0 18px rgba(180,160,240,0.25), 0 0 40px rgba(140,100,220,0.1)"
                      : isPressure && revealed
                        ? "0 0 12px rgba(140,100,200,0.15)"
                        : isEmberLine
                          ? "0 0 14px rgba(255,160,60,0.35), 0 0 30px rgba(255,120,40,0.15)"
                          : isImpostor && revealed
                            ? "0 0 10px rgba(100,60,150,0.12)"
                            : reflectionGlow
                              ? "0 0 16px rgba(200,190,240,0.3), 0 0 35px rgba(180,170,230,0.12)"
                              : isReflection && revealed
                                ? "0 0 12px rgba(170,160,220,0.15)"
                                : isFinale
                                  ? "0 0 20px rgba(220,210,250,0.4), 0 0 50px rgba(200,190,240,0.18)"
                                  : isAcceptance && revealed
                                    ? "0 0 14px rgba(200,190,240,0.2), 0 0 30px rgba(180,170,230,0.08)"
                                    : "none",
                  }}
                >
                  {line || "\u00A0"}
                </p>
              );
            });

            return (
              <div
                key={stanzaIdx}
                ref={(el) => (stanzaRefs.current[stanzaIdx] = el)}
                style={{
                  marginBottom: "100vh", // huge breathing room between stanzas
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {stanzaLines}
              </div>
            );
          })}

          {/* ── End of Abyss closing ── */}
          <div
            className="abyss-ending"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "20vh",
              paddingBottom: "10vh",
              opacity: visibleSection === 5 ? 1 : 0,
              transition: "opacity 3s ease 1s",
            }}
          >
            {/* Thin fading line */}
            <div
              style={{
                width: 1,
                height: 60,
                background:
                  "linear-gradient(180deg, rgba(200,190,240,0.2) 0%, rgba(200,190,240,0.06) 100%)",
                marginBottom: 32,
              }}
            />
            <p
              className="abyss-ending-text"
              style={{
                fontSize: "clamp(9px, calc(5px + 0.42vw), 16px)",
                color: "rgba(200,190,240,0.3)",
                letterSpacing: "0.15em",
                textAlign: "center",
                fontStyle: "italic",
                margin: 0,
                maxWidth: "min(400px, 80vw)",
                lineHeight: 2,
              }}
            >
              she is present. she is enough.
            </p>
            <p
              style={{
                fontSize: "clamp(7px, calc(4px + 0.32vw), 12px)",
                color: "rgba(180,170,220,0.18)",
                letterSpacing: "0.2em",
                textTransform: "lowercase",
                marginTop: 24,
                textAlign: "center",
              }}
            >
              — end of the abyss —
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint at the bottom */}
      {entered && revealedLines === 0 && (
        <div
          className="abyss-scroll-hint"
          style={{
            position: "fixed",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 75,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
              color: "rgba(140,100,200,0.35)",
              letterSpacing: "0.1em",
              margin: 0,
            }}
          >
            scroll to descend
          </p>
          <div
            style={{
              marginTop: 8,
              width: 1,
              height: 24,
              background: "linear-gradient(180deg, rgba(140,100,200,0.3) 0%, transparent 100%)",
              margin: "8px auto 0",
            }}
          />
        </div>
      )}
    </div>
  );
}
