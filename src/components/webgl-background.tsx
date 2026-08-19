import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme";

function StarField({ count, dark, still }: { count: number; dark: boolean; still: boolean }) {
  const ref = useRef<THREE.Points>(null);

  // Pointer tracked from the window rather than through R3F's own event
  // system: the canvas lives inside a `pointer-events-none` layer, so it never
  // receives pointer events itself and `state.pointer` would stay at origin.
  // Written into a ref, so pointer movement never triggers a React render.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (still) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still]);

  // Random points distributed through a sphere.
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useFrame((_state, delta) => {
    if (!ref.current || still) return;

    // Constant slow drift.
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;

    // Lean toward the pointer.
    const targetX = (pointer.current.x * Math.PI) / 4;
    const targetY = (pointer.current.y * Math.PI) / 4;
    ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
    ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={dark ? "#a794f5" : "#4c35b0"}
          size={0.014}
          sizeAttenuation
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </Points>
    </group>
  );
}

/**
 * Pointer-reactive star field behind the hero — and the hero only, so the page
 * carries exactly one WebGL context.
 *
 * Lazy-loaded by the hero so three.js stays off the critical path. DPR is
 * capped at 1.5 — uncapped, this renders 4x the fragments on a retina display
 * for no visible gain. Rotation stops entirely under reduced-motion; the
 * field still renders, it just holds still.
 */
export function WebGLBackground() {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const dark = theme === "dark";

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-[-1] pointer-events-none ${
        dark ? "opacity-55 mix-blend-screen" : "opacity-45 mix-blend-multiply"
      }`}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 1.5]}>
        <StarField count={1400} dark={dark} still={!!reduce} />
      </Canvas>
    </div>
  );
}
