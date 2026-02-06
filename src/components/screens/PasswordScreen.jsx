import { useState } from "react";

export default function PasswordScreen({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "UTS_ged0019") {
      setFadeOut(true);
      setTimeout(onSuccess, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div
      className={`screen-container ${fadeOut ? "fade-out" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(16px, calc(12px + 1.3vw), 52px)",
        padding: "clamp(16px, calc(12px + 1.3vw), 52px)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "min(480px, 90vw)" }}>
        <h1
          className="pixel-text"
          style={{
            fontSize: "clamp(13px, calc(8px + 0.55vw), 28px)",
            color: "var(--accent)",
            marginBottom: "clamp(10px, calc(6px + 0.7vw), 28px)",
            letterSpacing: "0.06em",
          }}
        >
          WELCOME
        </h1>
        <p
          style={{
            fontSize: "clamp(12px, calc(7px + 0.55vw), 26px)",
            lineHeight: 1.7,
            color: "rgba(102,210,255,0.7)",
            margin: 0,
          }}
        >
          This is a private space. Enter the password to continue.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          width: "100%",
          maxWidth: "min(320px, 85vw)",
        }}
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            width: "100%",
            padding: "clamp(10px, calc(6px + 0.55vw), 24px) clamp(12px, calc(8px + 0.7vw), 30px)",
            background: "rgba(102,210,255,0.05)",
            border: error
              ? "1px solid rgba(255,80,80,0.6)"
              : "1px solid rgba(102,210,255,0.2)",
            borderRadius: 10,
            color: "var(--accent)",
            fontSize: "clamp(12px, calc(7px + 0.48vw), 24px)",
            outline: "none",
            textAlign: "center",
            letterSpacing: "0.12em",
            transition: "border-color 0.3s ease",
          }}
          autoFocus
        />
        {error && (
          <span
            style={{
              fontSize: "clamp(10px, calc(6px + 0.42vw), 20px)",
              color: "rgba(255,80,80,0.8)",
            }}
          >
            Incorrect password. Try again.
          </span>
        )}
        <button
          type="submit"
          style={{
            padding: "clamp(10px, calc(6px + 0.42vw), 20px) clamp(20px, calc(12px + 1.3vw), 52px)",
            background: "rgba(102,210,255,0.08)",
            border: "1px solid rgba(102,210,255,0.3)",
            borderRadius: 8,
            color: "var(--accent)",
            fontSize: "clamp(11px, calc(7px + 0.42vw), 22px)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            letterSpacing: "0.05em",
          }}
        >
          ENTER
        </button>
      </form>
    </div>
  );
}
