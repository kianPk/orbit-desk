import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { random } from "maath";
import * as THREE from "three";

const StarField = ({
  count,
  radius,
  color,
  size,
  speed,
}: {
  count: number;
  radius: number;
  color: string;
  size: number;
  speed: number;
}) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(
    () => random.inSphere(new Float32Array(count), { radius }) as Float32Array,
    [count, radius]
  );

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= (delta / 10) * speed;
    ref.current.rotation.y -= (delta / 15) * speed;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Stars = ({ mobile }: { mobile: boolean }) => {
  if (mobile) {
    return (
      <StarField count={1200} radius={1.2} color="#22d3ee" size={0.002} speed={0.7} />
    );
  }
  return (
    <>
      <StarField count={3200} radius={1.25} color="#22d3ee" size={0.0018} speed={1} />
      <StarField count={1800} radius={1.45} color="#c4b5fd" size={0.0024} speed={0.55} />
      <StarField count={700} radius={1.05} color="#f0abfc" size={0.0032} speed={1.4} />
    </>
  );
};

const StarsCanvas = () => {
  const [mobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="absolute inset-0 z-[-1] h-auto w-full">
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={mobile ? 1 : [1, 1.5]}
          frameloop="always"
          gl={{ antialias: false, powerPreference: "low-power", stencil: false }}
        >
          <Suspense fallback={null}>
            <Stars mobile={mobile} />
          </Suspense>
          {!mobile && <Preload all />}
        </Canvas>
      )}
    </div>
  );
};

export default StarsCanvas;
