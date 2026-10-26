import { Suspense, useMemo, useRef } from "react";
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

const Stars = () => {
  return (
    <>
      <StarField count={4200} radius={1.25} color="#22d3ee" size={0.0018} speed={1} />
      <StarField count={2400} radius={1.45} color="#c4b5fd" size={0.0024} speed={0.55} />
      <StarField count={900} radius={1.05} color="#f0abfc" size={0.0032} speed={1.4} />
    </>
  );
};

const StarsCanvas = () => {
  return (
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
