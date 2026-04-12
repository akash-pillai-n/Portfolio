"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import KatanaModel from "./KatanaModel";

gsap.registerPlugin(ScrollTrigger);

// ── Inner scene ────────────────────────────────────────────────────────────────
function KatanaScene({
  sayaOffset,
  bladeGleam,
  rotY,
  rotZ,
}: {
  sayaOffset: React.MutableRefObject<number>;
  bladeGleam: React.MutableRefObject<number>;
  rotY: React.MutableRefObject<number>;
  rotZ: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();

  useEffect(() => {
    // Centred on the outerGroup origin (world 0,0,0)
    // Shift camera left so katana appears right-of-centre in the viewport,
    // centred within the hero section's visual weight
    camera.position.set(-1.8, 0.5, 9);
    camera.lookAt(-1.8, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Very bright ambient so the light-coloured model reads against dark sections */}
      <ambientLight intensity={2.2} color="#ddeeff" />
      {/* Key light — upper front, warm white */}
      <directionalLight position={[4, 7, 5]}  intensity={3.2} color="#ffffff" />
      {/* Fill light — below, adds warmth to gold fittings */}
      <directionalLight position={[-3, -4, 3]} intensity={1.5} color="#ffe8c0" />
      {/* Rim light — behind the blade to create an edge glow on metal */}
      <directionalLight position={[0, 0, -7]}  intensity={1.0} color="#99ccff" />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <KatanaModel
          sayaOffset={sayaOffset}
          bladeGleam={bladeGleam}
          rotY={rotY}
          rotZ={rotZ}
        />
      </Suspense>
    </>
  );
}

// ── Canvas wrapper ─────────────────────────────────────────────────────────────
export default function KatanaBackground() {
  const sayaOffsetRef = useRef<number>(0);
  const bladeGleamRef = useRef<number>(0);
  // Initialised to the "slightly angled" starting pose
  const rotYRef = useRef<number>(0.22);
  const rotZRef = useRef<number>(0.18);

  const animObj = useRef({
    sayaY:  0,
    gleam:  0,
    rotY:   0.22,   // slight Y angle at rest
    rotZ:   0.18,   // slight Z tilt at rest
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return; // skip on mobile — too heavy

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start:   "top top",
          end:     "bottom bottom",
          scrub:   2.5,   // smooth lag between scroll position and animation
        },
      });

      // ── Rotation ────────────────────────────────────────────────────────────
      // Runs over the ENTIRE page with linear easing = constant, predictable spin
      // Y: full 360° rotation (like a compass needle swing)
      // Z: 90° tilt, giving a tumbling 3-D feel
      tl.to(
        animObj.current,
        {
          rotY: 0.22 + Math.PI * 2,          // one full Y rotation
          rotZ: 0.18 + Math.PI * 0.55,       // ~100° Z tilt
          duration: 10,
          ease: "none",                       // linear → constant spin rate
        },
        0
      );

      // ── Unsheath ─────────────────────────────────────────────────────────────
      // Saya slides off over the FIRST 70 % of scroll (0 → 7 on the 0-10 scale)
      tl.to(
        animObj.current,
        {
          sayaY: -7.5,
          gleam: 0.88,
          duration: 7,
          ease: "power1.inOut",
        },
        0
      );

      // ── Subtle partial re-sheath ─────────────────────────────────────────────
      // Last 30 % — the saya drifts back slightly, keeping visual interest
      tl.to(
        animObj.current,
        {
          sayaY: -6.2,
          gleam: 0.65,
          duration: 3,
          ease: "power2.in",
        },
        7
      );

      // ── Sync every GSAP tick → R3F useFrame picks up the values ─────────────
      // Keep a named reference so we can remove it on cleanup (not tracked by ctx)
      const syncTicker = () => {
        sayaOffsetRef.current = animObj.current.sayaY;
        bladeGleamRef.current = animObj.current.gleam;
        rotYRef.current       = animObj.current.rotY;
        rotZRef.current       = animObj.current.rotZ;
      };
      gsap.ticker.add(syncTicker);

      return () => {
        gsap.ticker.remove(syncTicker);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset:    0,
        width:    "100vw",
        height:   "100vh",
        pointerEvents: "none",
        zIndex:  0,
        opacity: 0.82,
        display: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "block",
      }}
    >
      <Canvas
        frameloop="always"
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 54, near: 0.1, far: 200 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <KatanaScene
          sayaOffset={sayaOffsetRef}
          bladeGleam={bladeGleamRef}
          rotY={rotYRef}
          rotZ={rotZRef}
        />
      </Canvas>
    </div>
  );
}
