import { forwardRef } from "react";

const InnerNode = forwardRef(({ label, position, delay, onClick }, ref) => {
  return (
    <button
      ref={ref}
      className="inner-node"
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${position.left}%`,
        top: `${position.top}%`,
        transform: "translate(-50%,-50%)",
        background: "#021018",
        border: "1px solid rgba(102,210,255,0.14)",
        color: "var(--accent)",
        padding: "12px 18px",
        borderRadius: 8,
        minWidth: 140,
        fontSize: 12,
        fontWeight: 800,
        boxShadow: "0 10px 30px rgba(0,150,255,0.06)",
        opacity: 0,
        animationDelay: `${delay}ms`,
        cursor: "pointer",
        zIndex: 2,
      }}
    >
      {label}
    </button>
  );
});

InnerNode.displayName = "InnerNode";

export default InnerNode;