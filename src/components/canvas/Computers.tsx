import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/Loader";

type Quality = "high" | "medium" | "low";

function detectQuality(isMobile: boolean): Quality {
  if (typeof window === "undefined") return isMobile ? "medium" : "high";
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection?.saveData;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || saveData || (isMobile && (cores <= 4 || mem <= 2))) return "low";
  if (isMobile) return "medium";
  return "high";
}

const Computers: React.FC<{ isMobile: boolean; quality: Quality }> = ({
  isMobile,
  quality,
}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const group = useRef<THREE.Group>(null);
  const intro = useRef(0);
  const screenLight = useRef<THREE.PointLight>(null);
  const { invalidate } = useThree();
  const lite = quality !== "high";

  useEffect(() => {
    computer.scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = quality === "high";
      mesh.receiveShadow = quality === "high";
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat) {
        if ("envMapIntensity" in mat) {
          mat.envMapIntensity = lite ? 0.35 : 1.05;
        }
        // Cheaper materials on phones
        if (lite && "metalness" in mat) {
          mat.metalness = Math.min(mat.metalness ?? 0, 0.2);
          mat.roughness = Math.max(mat.roughness ?? 0.5, 0.55);
        }
        mat.needsUpdate = true;
      }
    });
  }, [computer, quality, lite]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Cap delta so tab-restore doesn't jump
    const d = Math.min(delta, 0.05);
    intro.current = Math.min(1, intro.current + d * (lite ? 0.9 : 0.65));
    const t = intro.current;
    const ease = 1 - Math.pow(1 - t, 3);

    const restY = isMobile ? -2.45 : -3.45;
    const startY = isMobile ? -5.2 : -7.2;
    const restScale = isMobile ? 0.62 : 0.78;

    if (t < 1) {
      group.current.position.y = THREE.MathUtils.lerp(startY, restY, ease);
      group.current.rotation.y = THREE.MathUtils.lerp(-1.35, -0.32, ease);
      group.current.rotation.x = THREE.MathUtils.lerp(0.25, -0.01, ease);
      group.current.scale.setScalar(THREE.MathUtils.lerp(0.35, restScale, ease));
      if (lite) invalidate();
      return;
    }

    const time = state.clock.elapsedTime;
    // Gentler idle on mobile — less GPU work feeling
    const amp = lite ? 0.04 : 0.1;
    const yaw = lite ? 0.06 : 0.16;
    group.current.position.y = restY + Math.sin(time * (lite ? 0.55 : 0.85)) * amp;
    group.current.rotation.y = -0.32 + Math.sin(time * (lite ? 0.18 : 0.28)) * yaw;
    if (!lite) {
      group.current.rotation.z = -0.08 + Math.sin(time * 0.45) * 0.025;
      group.current.rotation.x = -0.01 + Math.sin(time * 0.35) * 0.015;
    }

    if (screenLight.current && !lite) {
      screenLight.current.intensity = 0.85 + Math.sin(time * 2.1) * 0.35;
    }

    if (lite) invalidate();
  });

  return (
    <>
      <hemisphereLight intensity={lite ? 0.45 : 0.28} groundColor="#050816" color="#1e293b" />
      <ambientLight intensity={lite ? 0.55 : 0.32} />

      <spotLight
        position={[-18, 42, 12]}
        angle={0.28}
        penumbra={0.85}
        intensity={lite ? 0.85 : 1.55}
        color="#ffffff"
        castShadow={quality === "high"}
        shadow-mapSize={512}
      />

      {/* One accent light on mobile instead of three */}
      {lite ? (
        <pointLight position={[2, 2, 2]} intensity={0.7} color="#67e8f9" distance={16} />
      ) : (
        <>
          <spotLight
            position={[14, 18, 8]}
            angle={0.45}
            penumbra={1}
            intensity={0.7}
            color="#22d3ee"
          />
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
          <pointLight
            position={[-3.5, 0.8, -1.5]}
            intensity={0.55}
            color="#c4b5fd"
            distance={12}
          />
        </>
      )}

      <group
        ref={group}
        dispose={null}
        position={[0, isMobile ? -5.2 : -7.2, isMobile ? -1.35 : -1.45]}
        rotation={[-0.01, -1.35, -0.1]}
        scale={0.35}
      >
        <primitive object={computer.scene} />
      </group>

      {quality === "high" && (
        <ContactShadows
          position={[0, -4.35, 0]}
          opacity={0.55}
          scale={22}
          blur={2.8}
          far={7}
          color="#0b1020"
        />
      )}

      {/* HDR Environment is heavy — desktop only */}
      {quality === "high" && <Environment preset="city" />}
    </>
  );
};

const MobileTicker: React.FC<{ active: boolean; fps?: number }> = ({
  active,
  fps = 28,
}) => {
  const { invalidate } = useThree();
  useEffect(() => {
    if (!active) return;
    let id = 0;
    let last = 0;
    const frame = (t: number) => {
      id = requestAnimationFrame(frame);
      if (t - last >= 1000 / fps) {
        last = t;
        invalidate();
      }
    };
    id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [active, fps, invalidate]);
  return null;
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const quality = useMemo(() => detectQuality(isMobile), [isMobile]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    // Defer WebGL mount a tick so first paint (text) stays snappy
    const t = window.setTimeout(() => setReady(true), isMobile ? 120 : 0);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
  }, []);

  if (!ready) {
    return (
      <div
        className={
          isMobile
            ? "absolute bottom-0 left-0 right-0 flex h-[48vh] items-center justify-center"
            : "flex h-full w-full items-center justify-center"
        }
        aria-hidden
      >
        <div className="canvas-loader" />
      </div>
    );
  }

  const lite = quality !== "high";

  return (
    <Canvas
      frameloop={lite ? "demand" : "always"}
      shadows={quality === "high"}
      dpr={quality === "low" ? 1 : quality === "medium" ? [1, 1.15] : [1, 1.75]}
      camera={{
        position: isMobile ? [12.5, 2.2, 5.6] : [18, 2.8, 5.2],
        fov: isMobile ? 34 : 24,
      }}
      gl={{
        preserveDrawingBuffer: false,
        antialias: quality === "high",
        powerPreference: lite ? "low-power" : "high-performance",
        alpha: true,
        stencil: false,
        depth: true,
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
        {lite && <MobileTicker active fps={quality === "low" ? 22 : 28} />}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={!isMobile}
          autoRotate={isMobile && quality !== "low"}
          autoRotateSpeed={0.35}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} quality={quality} />
      </Suspense>
      {!lite && <Preload all />}
    </Canvas>
  );
};

export default ComputersCanvas;
