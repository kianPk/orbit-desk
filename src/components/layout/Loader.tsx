import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  const pct = Math.min(100, Math.round(progress));

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="canvas-loader" />
        <p
          style={{
            fontSize: 13,
            color: "#e2e8f0",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Loading desk
        </p>
        <div
          style={{
            width: 120,
            height: 4,
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg,#22d3ee,#a78bfa)",
              transition: "width 0.2s ease",
            }}
          />
        </div>
        <span style={{ color: "#94a3b8", fontSize: 12, fontVariantNumeric: "tabular-nums" }}>
          {pct}%
        </span>
      </div>
    </Html>
  );
};

export default Loader;
