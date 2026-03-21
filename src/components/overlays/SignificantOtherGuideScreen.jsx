import { FiX } from "react-icons/fi";

const questionItems = [
  {
    title: "CURRENT STATUS",
    questions: "Question #1",
    desc: "Describe your girlfriend/boyfriend. If you don't have one, write how you feel about it.",
    status: "Answered in Current Status.",
    answered: true,
  },
  {
    title: "RELATIONSHIP IDEALS",
    questions: "Questions #2, #3, #5",
    desc: "Write all your feelings about love and relationships. Make a list of the qualities you want in a boyfriend/girlfriend. In your relationship: what makes you jealous? angry? happy?",
    status: "Answered in Relationship Ideals.",
    answered: true,
  },
  {
    title: "UNANSWERED FOR NOW",
    questions: "Questions #4 and #6",
    desc: "Write about the nicest thing (as well as the meanest thing) your boyfriend/girlfriend has ever done for you and the nicest thing (and meanest thing) you have ever done for him/her. What hurts your feelings? What makes you love him/her the most?",
    status: "Unanswered for now because I have no experience yet.",
    answered: false,
  },
];

export default function SignificantOtherGuideScreen({ onClose }) {
  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "min(700px, 90vw)", maxHeight: "80vh" }}
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
              color: "rgba(180,236,196,0.9)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            SIGNIFICANT OTHER GUIDE
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(135,200,150,0.08)",
              border: "1px solid rgba(135,200,150,0.28)",
              borderRadius: "50%",
              width: "clamp(28px, calc(18px + 1.1vw), 48px)",
              height: "clamp(28px, calc(18px + 1.1vw), 48px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(180,236,196,0.94)",
              fontSize: "clamp(14px, calc(9px + 0.6vw), 30px)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            aria-label="Close significant other guide"
          >
            <FiX />
          </button>
        </div>

        <p
          style={{
            fontSize: "clamp(12px, calc(7px + 0.48vw), 24px)",
            color: "rgba(205,239,214,0.72)",
            marginBottom: "clamp(14px, calc(10px + 1vw), 42px)",
            lineHeight: 1.6,
          }}
        >
          This guide maps each relationship prompt to where it is currently answered.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, calc(6px + 0.7vw), 28px)",
          }}
        >
          {questionItems.map((item) => (
            <div
              key={item.title}
              style={{
                padding: "clamp(10px, calc(6px + 0.55vw), 24px) clamp(12px, calc(8px + 0.7vw), 30px)",
                background: item.answered
                  ? "rgba(135,200,150,0.06)"
                  : "rgba(135,200,150,0.02)",
                border: `1px solid ${
                  item.answered
                    ? "rgba(135,200,150,0.24)"
                    : "rgba(135,200,150,0.12)"
                }`,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  gap: 12,
                }}
              >
                <span
                  className="pixel-text"
                  style={{
                    fontSize: "clamp(8px, calc(5px + 0.35vw), 16px)",
                    color: "rgba(180,236,196,0.92)",
                  }}
                >
                  {item.title}
                </span>

                <span
                  style={{
                    fontSize: "clamp(9px, calc(5px + 0.4vw), 18px)",
                    color: "rgba(200,234,208,0.62)",
                    flexShrink: 0,
                  }}
                >
                  {item.questions}
                </span>
              </div>

              <p
                style={{
                  fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
                  color: "rgba(226,247,232,0.84)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>

              <p
                style={{
                  fontSize: "clamp(10px, calc(6px + 0.38vw), 18px)",
                  color: item.answered
                    ? "rgba(176,236,190,0.78)"
                    : "rgba(214,228,218,0.58)",
                  margin: "clamp(8px, calc(5px + 0.45vw), 14px) 0 0",
                  lineHeight: 1.55,
                  fontStyle: item.answered ? "normal" : "italic",
                }}
              >
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}