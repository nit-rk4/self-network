import { useState, useEffect, useRef, useCallback } from "react";
import { FiArrowLeft } from "react-icons/fi";

/* ─── Section definitions: which stanzas belong to which section ─── */
const SECTIONS = [
  { id: 1, name: "surface", stanzaStart: 0, stanzaEnd: 1 },   // stanzas 0-1
  { id: 2, name: "pressure", stanzaStart: 2, stanzaEnd: 6 },  // stanzas 2-6
  { id: 3, name: "section3", stanzaStart: 7, stanzaEnd: 11 }, // placeholder
  { id: 4, name: "section4", stanzaStart: 12, stanzaEnd: 16 }, // placeholder
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
  // ── Section 3 ──
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  // ── Section 4 ──
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
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
          4: "radial-gradient(ellipse at 50% 40%, #030204 0%, #010102 40%, #000002 100%)",
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
            paddingBottom: "60vh",
          }}
        >
          {stanzas.map((lines, stanzaIdx) => {
            // Determine which section this stanza belongs to
            const section = SECTIONS.find(
              (s) => stanzaIdx >= s.stanzaStart && stanzaIdx <= s.stanzaEnd
            ) || SECTIONS[0];

            const stanzaLines = lines.map((line, lineInStanza) => {
              const idx = globalIdx++;
              const revealed = idx < revealedLines;
              const isSurface = section.id === 1;
              const isPressure = section.id === 2;
              // Pressure lines that should tremble
              const pressureTremble = isPressure && revealed && (
                line.includes("relentless") ||
                line.includes("larger now") ||
                line.includes("impossible") ||
                line.includes("glass")
              );

              return (
                <p
                  key={idx}
                  ref={(el) => setLineRef(el, idx)}
                  data-line-idx={idx}
                  className={pressureTremble ? "abyss-tremble" : ""}
                  style={{
                    fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                    color: isSurface
                      ? "rgba(200,175,240,0.82)"
                      : isPressure
                        ? "rgba(180,150,220,0.78)"
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
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                    textShadow: isSurface && revealed
                      ? "0 0 18px rgba(180,160,240,0.25), 0 0 40px rgba(140,100,220,0.1)"
                      : isPressure && revealed
                        ? "0 0 12px rgba(140,100,200,0.15)"
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
