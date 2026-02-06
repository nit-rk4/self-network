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
        gap: 32,
        padding: 32,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <h1
          className="pixel-text"
          style={{
            fontSize: 16,
            color: "var(--accent)",
            marginBottom: 16,
            letterSpacing: "0.06em",
          }}
        >
          WELCOME
        </h1>
        <p
          style={{
            fontSize: 15,
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
          maxWidth: 320,
        }}
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            width: "100%",
            padding: "14px 18px",
            background: "rgba(102,210,255,0.05)",
            border: error
              ? "1px solid rgba(255,80,80,0.6)"
              : "1px solid rgba(102,210,255,0.2)",
            borderRadius: 10,
            color: "var(--accent)",
            fontSize: 14,
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
              fontSize: 12,
              color: "rgba(255,80,80,0.8)",
            }}
          >
            Incorrect password. Try again.
          </span>
        )}
        <button
          type="submit"
          style={{
            padding: "12px 32px",
            background: "rgba(102,210,255,0.08)",
            border: "1px solid rgba(102,210,255,0.3)",
            borderRadius: 8,
            color: "var(--accent)",
            fontSize: 13,
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
