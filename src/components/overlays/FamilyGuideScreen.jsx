import { FiX } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

export default function FamilyGuideScreen({
  onClose,
  hollowUnlocked = false,
  goldenLeafDiscovered = false,
}) {
  const hollowText = hollowUnlocked
    ? "Questions #5-#6: What do you like and admire about your family, and what do you wish your family understood about you?"
    : "Questions #5-#6 are hidden in the trunk's silence. Visit every family node first, then return to the hollow.";

  const leafText = goldenLeafDiscovered
    ? "Question #7: Write a story about the most embarrassing thing your family has ever done."
    : "Question #7 drifts through the branches. Watch for a strange leaf that doesn't look like the others.";

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "min(680px, 90vw)", maxHeight: "80vh" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "clamp(14px, calc(10px + 1vw), 42px)",
          }}
        >
          <h2
            className="pixel-text"
            style={{
              fontSize: "clamp(10px, calc(6px + 0.48vw), 22px)",
              color: "rgba(255,205,145,0.88)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            FAMILY GUIDE
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,180,100,0.08)",
              border: "1px solid rgba(255,180,100,0.25)",
              borderRadius: "50%",
              width: "clamp(28px, calc(18px + 1.1vw), 48px)",
              height: "clamp(28px, calc(18px + 1.1vw), 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,205,145,0.9)",
              fontSize: "clamp(14px, calc(9px + 0.6vw), 30px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            aria-label="Close family guide"
          >
            <FiX />
          </button>
        </div>

        <p
          style={{
            fontSize: "clamp(12px, calc(7px + 0.48vw), 24px)",
            color: "rgba(255,220,180,0.68)",
            marginBottom: "clamp(14px, calc(10px + 1vw), 42px)",
            lineHeight: 1.6,
          }}
        >
          Each node opens a reflection prompt. Some parts of this tree reveal
          themselves only after you have walked through every branch.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, calc(6px + 0.7vw), 28px)",
          }}
        >
          <GuideRow
            title="MAMA + PAPA"
            questions="Questions #1-#3"
            desc="Make a list of things you love and appreciate about your mother and father. Make a list of things you and your mother/father disagree about or dislike. Reflect on physical and character traits you inherited from them."
          />

          <GuideRow
            title="ATE MARIEL + ATE DJ + ATE DIANNE"
            questions="Question #4"
            desc="Talk about your siblings: what you like best about them, what you dislike, and whether you get along."
          />

          <GuideRow
            title="TREE HOLLOW"
            questions="Questions #5-#6"
            desc={hollowText}
            locked={!hollowUnlocked}
          />

          <GuideRow
            title="GOLDEN LEAF"
            questions="Question #7"
            desc={leafText}
            locked={!goldenLeafDiscovered}
          />

          <GuideRow
            title="GRANDPARENTS"
            questions="Question #8"
            desc="If you could tell your grandparents anything, what would it be? Write it down."
          />
        </div>

        <div
          style={{
            marginTop: "clamp(14px, calc(10px + 1vw), 42px)",
            padding:
              "clamp(10px, calc(6px + 0.7vw), 28px) clamp(12px, calc(8px + 0.8vw), 34px)",
            background: "rgba(255,180,100,0.04)",
            border: "1px dashed rgba(255,180,100,0.25)",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <p
            className="pixel-text"
            style={{
              fontSize: "clamp(8px, calc(5px + 0.35vw), 16px)",
              color: "rgba(255,200,130,0.45)",
              margin: 0,
              marginBottom: 6,
              letterSpacing: "0.12em",
            }}
          >
            ROOTS REMEMBER
          </p>
          <p
            style={{
              fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
              color: "rgba(255,220,180,0.6)",
              margin: 0,
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            If something seems locked, keep exploring. The tree does not open
            all at once.
          </p>
        </div>
      </div>
    </div>
  );
}

function GuideRow({ title, questions, desc, locked = false }) {
  return (
    <div
      style={{
        padding: "clamp(10px, calc(6px + 0.55vw), 24px) clamp(12px, calc(8px + 0.7vw), 30px)",
        background: locked ? "rgba(255,180,100,0.02)" : "rgba(255,180,100,0.04)",
        border: `1px solid ${locked ? "rgba(255,180,100,0.12)" : "rgba(255,180,100,0.2)"}`,
        borderRadius: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
          gap: 12,
        }}
      >
        <span
          className="pixel-text"
          style={{
            fontSize: "clamp(8px, calc(5px + 0.35vw), 16px)",
            color: "rgba(255,205,145,0.9)",
          }}
        >
          {title}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {locked && (
            <FiLock
              style={{
                color: "rgba(255,190,110,0.5)",
                fontSize: "clamp(10px, calc(7px + 0.32vw), 18px)",
                flexShrink: 0,
              }}
              aria-hidden
            />
          )}
          <span
            style={{
              fontSize: "clamp(9px, calc(5px + 0.4vw), 18px)",
              color: "rgba(255,210,160,0.55)",
              flexShrink: 0,
            }}
          >
            {questions}
          </span>
        </div>
      </div>

      <p
        style={{
          fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
          color: locked ? "rgba(255,210,160,0.52)" : "rgba(255,230,200,0.8)",
          margin: 0,
          lineHeight: 1.6,
          fontStyle: locked ? "italic" : "normal",
        }}
      >
        {desc}
      </p>
    </div>
  );
}
