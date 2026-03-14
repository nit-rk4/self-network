import { useState, useCallback, useRef } from "react";
import { FiArrowLeft, FiHelpCircle } from "react-icons/fi";
import InnerNetworkTemplate from "./InnerNetworkTemplate";
import SelfRootNode from "./SelfRootNode";
import FriendsRootNode from "./FriendsRootNode";
import FamilyRootNode from "./FamilyRootNode";
import SignificantOtherRootNode from "./SignificantOtherRootNode";
import AbyssDoor from "./AbyssDoor";
import IdentityOverlay from "../overlays/IdentityOverlay";
import StrengthOverlay from "../overlays/StrengthOverlay";
import ShadowOverlay from "../overlays/ShadowOverlay";
import GrowthOverlay from "../overlays/GrowthOverlay";
import ForgivenessOverlay from "../overlays/ForgivenessOverlay";
import AbyssEntryOverlay from "../overlays/AbyssEntryOverlay";
import GuideScreen from "../overlays/GuideScreen";
import NodeOverlay from "../overlays/NodeOverlay";
import AbyssScreen from "../screens/AbyssScreen";

const relationshipRoots = [
  {
    key: "friends",
    label: "Friends",
    component: FriendsRootNode,
    innerNodes: [
      { label: "LOYALTY", color: "120,210,255" },
      { label: "MEMORIES", color: "180,210,255" },
      { label: "SUPPORT", color: "120,230,170" },
      { label: "CONFLICT", color: "220,140,180" },
      { label: "GROWTH", color: "150,210,130" },
    ],
  },
  {
    key: "family",
    label: "Family",
    component: FamilyRootNode,
    innerNodes: [
      { label: "HOME", color: "130,210,255" },
      { label: "SACRIFICE", color: "255,195,120" },
      { label: "GUIDANCE", color: "170,200,255" },
      { label: "PRESSURE", color: "220,160,210" },
      { label: "GRATITUDE", color: "130,220,160" },
    ],
  },
  {
    key: "significantOther",
    label: "Significant Other",
    component: SignificantOtherRootNode,
    innerNodes: [
      { label: "TRUST", color: "130,215,255" },
      { label: "COMMUNICATION", color: "180,220,255" },
      { label: "CARE", color: "255,170,210" },
      { label: "BOUNDARIES", color: "170,190,255" },
      { label: "FUTURE", color: "150,230,180" },
    ],
  },
];

export default function RootNode({ label, childrenNodes = [], outerBgGif, innerBgGif }) {
  const [expanded, setExpanded] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [hoverSide, setHoverSide] = useState(null);
  const [abyssCompleted, setAbyssCompleted] = useState(false);
  const [outerView, setOuterView] = useState("self");
  const [activeRootKey, setActiveRootKey] = useState("self");
  const [showPostAbyssPopup, setShowPostAbyssPopup] = useState(false);
  const [innerExitPulse, setInnerExitPulse] = useState(false);

  const [activeNode, setActiveNode] = useState(null);
  const [shadowRevealed, setShadowRevealed] = useState(false);

  // Abyss tracking
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [showAbyssEntry, setShowAbyssEntry] = useState(false);
  const [abyssTransitioning, setAbyssTransitioning] = useState(false);
  const [showAbyss, setShowAbyss] = useState(false);
  const lastEdgeSwitchRef = useRef(0);

  const rootConfigs = {
    self: {
      key: "self",
      label,
      innerNodes: childrenNodes,
      showGuide: true,
      allowAbyss: true,
    },
    friends: {
      ...relationshipRoots[0],
      showGuide: false,
      allowAbyss: false,
    },
    family: {
      ...relationshipRoots[1],
      showGuide: false,
      allowAbyss: false,
    },
    significantOther: {
      ...relationshipRoots[2],
      showGuide: false,
      allowAbyss: false,
    },
  };

  const currentRoot = rootConfigs[activeRootKey] ?? rootConfigs.self;
  const isSelfRoot = activeRootKey === "self";

  const allNodeLabels = childrenNodes.map((n) => n.label);
  const allVisited = allNodeLabels.length > 0 && allNodeLabels.every((l) => visitedNodes.has(l));
  const showOuterPrompt = abyssCompleted && !expanded && !showAbyss && !showAbyssEntry && !abyssTransitioning;

  const handleEdgeHover = useCallback((side) => {
    if (!showOuterPrompt) return;
    const now = Date.now();
    if (now - lastEdgeSwitchRef.current < 800) return;

    lastEdgeSwitchRef.current = now;
    setHoverSide(side);
    setOuterView((prev) => {
      const next = prev === "self" ? "relationships" : "self";
      if (next === "self") {
        setActiveRootKey("self");
      }
      return next;
    });
    setTimeout(() => setHoverSide(null), 250);
  }, [showOuterPrompt]);

  const handleNodeClick = (node) => {
    if (isSelfRoot) {
      setVisitedNodes((prev) => new Set(prev).add(node.label));
    }

    if (isSelfRoot && node.label === "SHADOWS") {
      setShadowRevealed((prev) => !prev);
      if (shadowRevealed) return; // closing — don't open overlay
    }
    setActiveNode(node.label);
  };

  const handleOpenRoot = useCallback((rootKey) => {
    setActiveRootKey(rootKey);
    setActiveNode(null);
    setExpanded(true);
  }, []);

  const closeOverlay = () => setActiveNode(null);

  const handleAbyssEnter = useCallback(() => {
    setShowAbyssEntry(false);
    setAbyssTransitioning(true);
    // After expansion animation completes, show the actual Abyss
    setTimeout(() => {
      setShowAbyss(true);
      setAbyssTransitioning(false);
    }, 1200);
  }, []);

  const handleAbyssBack = useCallback(() => {
    setShowAbyss(false);
    if (abyssCompleted) {
      setShowPostAbyssPopup(true);
    }
  }, [abyssCompleted]);

  return (
    <>
      {/* Outer network GIF - fades out when expanded */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${outerBgGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: expanded ? 0 : 0.08,
          transition: "opacity 1s ease-in-out",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      {/* Inner network GIF - fades in when expanded */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${innerBgGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: expanded ? 0.3 : 0,
          transition: expanded ? "opacity 1s ease-in" : "opacity 0.2s ease-out",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      {/* Lines going to/from the main node - ONLY when NOT expanded and in self view */}
      {!expanded && outerView === "self" && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 39,
          }}
        >
          {/* Lines going UP from TOP PORT */}
          {[
            { x: -18, opacity: 0.7, width: 0.6 },
            { x: -8, opacity: 0.9, width: 0.8 },
            { x: 2, opacity: 0.6, width: 0.5 },
            { x: 10, opacity: 1, width: 0.9 },
            { x: 20, opacity: 0.75, width: 0.7 },
            { x: -12, opacity: 0.5, width: 0.4 },
          ].map((line, i) => {
            const targetX = 50 + line.x;
            const controlX = targetX; 
            const controlY = -15; 
            
            return (
              <g key={`top-${i}`} opacity={line.opacity}>
                {/* Outer glow layer */}
                <path
                  d={`M 50 32.5 Q ${controlX} ${controlY}, ${targetX} 0`}
                  fill="none"
                  stroke="rgba(102,210,255,0.3)"
                  strokeWidth={line.width * 1.2}
                />
                {/* Main line */}
                <path
                  d={`M 50 32.5 Q ${controlX} ${controlY}, ${targetX} 0`}
                  fill="none"
                  stroke="rgba(102,210,255,0.9)"
                  strokeWidth={line.width * 0.4}
                />
                {/* Bright core */}
                <path
                  d={`M 50 32.5 Q ${controlX} ${controlY}, ${targetX} 0`}
                  fill="none"
                  stroke="rgba(200,240,255,1)"
                  strokeWidth={line.width * 0.2}
                />
              </g>
            );
          })}

          {/* Lines going DOWN from BOTTOM PORT */}
          {[
            { x: -16, opacity: 0.8, width: 0.7 },
            { x: -6, opacity: 0.6, width: 0.5 },
            { x: 4, opacity: 0.9, width: 0.85 },
            { x: 12, opacity: 1, width: 0.9 },
            { x: 18, opacity: 0.65, width: 0.6 },
            { x: -10, opacity: 0.55, width: 0.45 },
          ].map((line, i) => {
            const targetX = 50 + line.x;
            const controlX = targetX; // Keep it straight horizontally
            const controlY = 115; // BEYOND 100 - goes BELOW screen to create outward bulge!
            
            return (
              <g key={`bottom-${i}`} opacity={line.opacity}>
                {/* Outer glow layer */}
                <path
                  d={`M 50 67.5 Q ${controlX} ${controlY}, ${targetX} 100`}
                  fill="none"
                  stroke="rgba(102,210,255,0.3)"
                  strokeWidth={line.width * 1.2}
                />
                {/* Main line */}
                <path
                  d={`M 50 67.5 Q ${controlX} ${controlY}, ${targetX} 100`}
                  fill="none"
                  stroke="rgba(102,210,255,0.9)"
                  strokeWidth={line.width * 0.4}
                />
                {/* Bright core */}
                <path
                  d={`M 50 67.5 Q ${controlX} ${controlY}, ${targetX} 100`}
                  fill="none"
                  stroke="rgba(200,240,255,1)"
                  strokeWidth={line.width * 0.2}
                />
              </g>
            );
          })}
        </svg>
      )}

      {showOuterPrompt && (
        <>
          <div
            onMouseEnter={() => handleEdgeHover("left")}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "22vw",
              height: "100vh",
              zIndex: 41,
              background: "transparent",
            }}
          />
          <div
            onMouseEnter={() => handleEdgeHover("right")}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "22vw",
              height: "100vh",
              zIndex: 41,
              background: "transparent",
            }}
          />

          <div
            style={{
              position: "fixed",
              left: "clamp(14px, calc(10px + 1vw), 42px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 42,
              color: "rgba(102,210,255,0.72)",
              fontSize: "clamp(18px, calc(12px + 0.9vw), 40px)",
              letterSpacing: "0.08em",
              opacity: hoverSide === "right" ? 0.28 : 1,
              transition: "opacity 0.25s ease",
              pointerEvents: "none",
            }}
            className="outer-direction-cue"
          >
            ←
          </div>

          <div
            style={{
              position: "fixed",
              right: "clamp(14px, calc(10px + 1vw), 42px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 42,
              color: "rgba(102,210,255,0.72)",
              fontSize: "clamp(18px, calc(12px + 0.9vw), 40px)",
              letterSpacing: "0.08em",
              opacity: hoverSide === "left" ? 0.28 : 1,
              transition: "opacity 0.25s ease",
              pointerEvents: "none",
            }}
            className="outer-direction-cue"
          >
            →
          </div>

          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: "clamp(14px, calc(8px + 0.8vw), 34px)",
              transform: "translateX(-50%)",
              zIndex: 42,
              textAlign: "center",
              color: "rgba(102,210,255,0.5)",
              fontSize: "clamp(10px, calc(6px + 0.4vw), 18px)",
              letterSpacing: "0.08em",
              pointerEvents: "none",
              fontStyle: "italic",
            }}
          >
            {outerView === "self"
              ? "hover left or right to explore relationships"
              : "hover left or right to return to self"}
          </div>
        </>
      )}

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 42,
          pointerEvents: outerView === "relationships" ? "auto" : "none",
          opacity: outerView === "relationships" ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
          }}
        >
          {[18, 50, 82].map((x, i) => (
            <g key={`relationship-lines-${i}`}>
              <line x1={x} y1={0} x2={x} y2={34} stroke="rgba(102,210,255,0.3)" strokeWidth={0.6} />
              <line x1={x} y1={0} x2={x} y2={34} stroke="rgba(102,210,255,0.9)" strokeWidth={0.22} />
              <line x1={x} y1={0} x2={x} y2={34} stroke="rgba(200,240,255,1)" strokeWidth={0.12} />

              <line x1={x} y1={66} x2={x} y2={100} stroke="rgba(102,210,255,0.3)" strokeWidth={0.6} />
              <line x1={x} y1={66} x2={x} y2={100} stroke="rgba(102,210,255,0.9)" strokeWidth={0.22} />
              <line x1={x} y1={66} x2={x} y2={100} stroke="rgba(200,240,255,1)" strokeWidth={0.12} />
            </g>
          ))}
        </svg>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) perspective(1300px) rotateY(${hoverSide === "left" ? "-12deg" : hoverSide === "right" ? "12deg" : "0deg"})`,
            display: "flex",
            gap: "clamp(18px, calc(12px + 1.1vw), 44px)",
            alignItems: "center",
          }}
        >
          {relationshipRoots.map((rootNode) => {
            const RootComponent = rootNode.component;
            return (
              <div
                key={rootNode.key}
                style={{
                  width: "min(28vw, 360px)",
                  minWidth: "clamp(180px, calc(130px + 5vw), 260px)",
                  height: "min(28vh, 300px)",
                  minHeight: "clamp(120px, calc(90px + 3.2vw), 180px)",
                }}
              >
                <RootComponent onClick={() => handleOpenRoot(rootNode.key)} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Back arrow button - only shows when expanded */}
      {expanded && (
        <>
          <button
            onClick={() => {
              setExpanded(false);
              setActiveNode(null);
            }}
            className={innerExitPulse && isSelfRoot ? "inner-exit-pulse" : ""}
            style={{
              position: "fixed",
              top: "clamp(14px, calc(10px + 1vw), 42px)",
              left: "clamp(14px, calc(10px + 1vw), 42px)",
              zIndex: 50,
              background: "rgba(6, 38, 58, 0.7)",
              border: "1px solid rgba(102,210,255,0.3)",
              borderRadius: "50%",
              padding: "clamp(6px, calc(4px + 0.42vw), 16px)",
              color: "var(--accent)",
              fontSize: "clamp(20px, calc(14px + 1vw), 48px)",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(102,210,255,0.4), 0 0 40px rgba(0,150,255,0.2)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(36px, calc(24px + 1.65vw), 68px)",
              height: "clamp(36px, calc(24px + 1.65vw), 68px)",
            }}
            aria-label="Back"
          >
            <FiArrowLeft />
          </button>
          
          {currentRoot.showGuide && (
          <button
            onClick={() => setShowGuide(true)}
            style={{
              position: "fixed",
              top: "clamp(14px, calc(10px + 1vw), 42px)",
              left: "clamp(60px, calc(40px + 3.3vw), 130px)",
              zIndex: 50,
              background: "rgba(6, 38, 58, 0.7)",
              border: "1px solid rgba(102,210,255,0.3)",
              borderRadius: "50%",
              padding: "clamp(6px, calc(4px + 0.42vw), 16px)",
              color: "var(--accent)",
              fontSize: "clamp(20px, calc(14px + 1vw), 48px)",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(102,210,255,0.4), 0 0 40px rgba(0,150,255,0.2)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(36px, calc(24px + 1.65vw), 68px)",
              height: "clamp(36px, calc(24px + 1.65vw), 68px)",
            }}
            aria-label="Guide"
          >
            <FiHelpCircle />
          </button>
          )}
        </>
      )}

      {/* Clicking outside closes the panel */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 35,
            background: "transparent",
          }}
        />
      )}

      {/* Main panel container with border cutouts */}
      {(expanded || outerView === "self") && (
      <div
        style={{
          position: "fixed",
          top: expanded ? 0 : "calc(50% - min(17.5vh, 25vw))",
          left: expanded ? 0 : "calc(50% - min(40vw, 45vh))",
          width: expanded ? "100vw" : "min(80vw, 90vh)",
          height: expanded ? "100vh" : "min(35vh, 50vw)",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.7s cubic-bezier(.2,.9,.2,1)",
        }}
      >
        {!expanded && (
          <SelfRootNode label={label} onClick={() => handleOpenRoot("self")} />
        )}

        {expanded && (
          <div
            className="panel rounded-lg"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: "rgba(4, 8, 18, 0.85)",
              boxShadow: `0 30px 80px var(--glow)`,
              transition: "all 0.7s cubic-bezier(.2,.9,.2,1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <InnerNetworkTemplate
              nodes={currentRoot.innerNodes}
              onNodeClick={handleNodeClick}
              shadowRevealed={shadowRevealed}
              showInsecurityWords={isSelfRoot}
            />
          </div>
        )}
      </div>
      )}

      {/* Node overlays */}
      {isSelfRoot && activeNode === "IDENTITY" && <IdentityOverlay onClose={closeOverlay} />}
      {isSelfRoot && activeNode === "STRENGTHS" && <StrengthOverlay onClose={closeOverlay} />}
      {isSelfRoot && activeNode === "SHADOWS" && <ShadowOverlay onClose={closeOverlay} />}
      {isSelfRoot && activeNode === "GROWTH" && <GrowthOverlay onClose={closeOverlay} />}
      {isSelfRoot && activeNode === "FORGIVENESS" && <ForgivenessOverlay onClose={closeOverlay} />}
      {!isSelfRoot && activeNode && (
        <NodeOverlay title={activeNode} onClose={closeOverlay}>
          <p
            style={{
              fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
              lineHeight: 1.8,
              color: "rgba(102,210,255,0.75)",
              margin: 0,
              textAlign: "center",
            }}
          >
            This node belongs to {currentRoot.label}. You can now plug in your custom narrative and visuals here.
          </p>
        </NodeOverlay>
      )}

      {/* Guide overlay */}
      {isSelfRoot && showGuide && <GuideScreen onClose={() => setShowGuide(false)} />}

      {showPostAbyssPopup && (
        <div className="overlay-backdrop" onClick={() => {
          setShowPostAbyssPopup(false);
          setInnerExitPulse(true);
        }}>
          <div
            className="overlay-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(640px, 92vw)",
              borderColor: "rgba(180,140,240,0.28)",
              boxShadow: "0 0 50px rgba(140,100,200,0.18), 0 20px 60px rgba(0,0,0,0.5)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
                lineHeight: 1.9,
                color: "rgba(214,196,247,0.88)",
                fontStyle: "italic",
              }}
            >
              Knowing oneself is only the beginning.
              <br />
              No life exists alone.
              <br />
              Beyond the self are the people who shape it.
            </p>

            <button
              onClick={() => {
                setShowPostAbyssPopup(false);
                setInnerExitPulse(true);
              }}
              style={{
                marginTop: "clamp(16px, calc(10px + 1vw), 38px)",
                padding: "clamp(8px, calc(5px + 0.42vw), 18px) clamp(16px, calc(10px + 0.8vw), 32px)",
                background: "rgba(140,100,200,0.12)",
                border: "1px solid rgba(180,140,240,0.35)",
                borderRadius: 8,
                color: "rgba(210,185,250,0.92)",
                cursor: "pointer",
                fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
                letterSpacing: "0.04em",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Abyss door - appears when all nodes visited */}
      {isSelfRoot && expanded && allVisited && !showAbyss && !abyssTransitioning && !showAbyssEntry && (
        <AbyssDoor onClick={() => setShowAbyssEntry(true)} />
      )}

      {/* Abyss entry overlay */}
      {isSelfRoot && showAbyssEntry && (
        <AbyssEntryOverlay
          onClose={() => setShowAbyssEntry(false)}
          onEnter={handleAbyssEnter}
        />
      )}

      {/* Abyss expansion transition */}
      {isSelfRoot && abyssTransitioning && (
        <div
          className="abyss-expand-transition"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 65,
            background: "radial-gradient(ellipse at 50% 40%, #0c0814 0%, #060410 40%, #020108 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Abyss screen */}
      {isSelfRoot && showAbyss && (
        <AbyssScreen
          onBack={handleAbyssBack}
          onComplete={() => setAbyssCompleted(true)}
        />
      )}
    </>
  );
}
