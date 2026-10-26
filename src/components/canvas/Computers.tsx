import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/Loader";

const Computers: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const group = useRef<THREE.Group>(null);
  const intro = useRef(0);
  const screenLight = useRef<THREE.PointLight>(null);

  useEffect(() => {
    computer.scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = !isMobile;
      mesh.receiveShadow = !isMobile;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && "envMapIntensity" in mat) {
        mat.envMapIntensity = 1.05;
        mat.needsUpdate = true;
      }
    });
  }, [computer, isMobile]);

  useFrame((state, delta) => {
    if (!group.current) return;

    intro.current = Math.min(1, intro.current + delta * 0.65);
    const t = intro.current;
    const ease = 1 - Math.pow(1 - t, 3);

    const restY = isMobile ? -2.45 : -3.45;
    const startY = isMobile ? -5.2 : -7.2;

    if (t < 1) {
      group.current.position.y = THREE.MathUtils.lerp(startY, restY, ease);
      group.current.rotation.y = THREE.MathUtils.lerp(-1.35, -0.32, ease);
      group.current.rotation.x = THREE.MathUtils.lerp(0.25, -0.01, ease);
      group.current.scale.setScalar(
        THREE.MathUtils.lerp(0.35, isMobile ? 0.62 : 0.78, ease)
      );
      return;
    }

    const time = state.clock.elapsedTime;
    group.current.position.y = restY + Math.sin(time * 0.85) * (isMobile ? 0.06 : 0.1);
    group.current.rotation.y = -0.32 + Math.sin(time * 0.28) * (isMobile ? 0.1 : 0.16);
    group.current.rotation.z = -0.08 + Math.sin(time * 0.45) * 0.025;
    group.current.rotation.x = -0.01 + Math.sin(time * 0.35) * 0.015;

    if (screenLight.current) {
      screenLight.current.intensity = 0.85 + Math.sin(time * 2.1) * 0.35;
    }
  });

  return (
    <>
      <hemisphereLight intensity={0.28} groundColor="#050816" color="#1e293b" />
      <ambientLight intensity={0.32} />

      {/* Key light */}
      <spotLight
        position={[-18, 42, 12]}
        angle={0.28}
        penumbra={0.85}
        intensity={isMobile ? 1.05 : 1.55}
        color="#ffffff"
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? 512 : 1024}
      />

      {/* Cyan rim — brand accent */}
      <spotLight
        position={[14, 18, 8]}
        angle={0.45}
        penumbra={1}
        intensity={0.7}
        color="#22d3ee"
      />

      {/* Violet fill from behind */}
      <spotLight
        position={[0, 12, -18]}
        angle={0.55}
        penumbra={1}
        intensity={0.45}
        color="#8b5cf6"
      />

      <pointLight
        ref={screenLight}
        position={[1.2, 1.4, 1.8]}
        intensity={1.1}
        color="#67e8f9"
        distance={14}
      />
      <pointLight position={[-3.5, 0.8, -1.5]} intensity={0.55} color="#c4b5fd" distance={12} />

      <group
        ref={group}
        dispose={null}
        position={[0, isMobile ? -5.2 : -7.2, isMobile ? -1.35 : -1.45]}
        rotation={[-0.01, -1.35, -0.1]}
        scale={0.35}
      >
        <primitive object={computer.scene} />
      </group>

      {!isMobile && (
        <ContactShadows
          position={[0, -4.35, 0]}
          opacity={0.55}
          scale={22}
          blur={2.8}
          far={7}
          color="#0b1020"
        />
      )}

      <Environment preset="city" />
    </>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.35] : [1, 1.75]}
      camera={{
        position: isMobile ? [12.5, 2.2, 5.6] : [18, 2.8, 5.2],
        fov: isMobile ? 34 : 24,
      }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: !isMobile,
        powerPreference: isMobile ? "low-power" : "high-performance",
        alpha: true,
      }}
      style={{
        touchAction: "pan-y",
        pointerEvents: isMobile ? "none" : "auto",
      }}
      className={
        isMobile
          ? "!absolute !bottom-0 !left-0 !right-0 !h-[48vh] !w-full"
          : undefined
      }
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={!isMobile}
          autoRotate={isMobile}
          autoRotateSpeed={0.55}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
