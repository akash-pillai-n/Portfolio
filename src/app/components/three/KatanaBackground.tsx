"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
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
  isMobile,
}: {
  sayaOffset: React.MutableRefObject<number>;
  bladeGleam: React.MutableRefObject<number>;
  rotY: React.MutableRefObject<number>;
  rotZ: React.MutableRefObject<number>;
  isMobile: boolean;
}) {
  const { camera } = useThree();

  useEffect(() => {
    if (isMobile) {
      // Portrait screens: centre the katana horizontally, pull back further
      camera.position.set(0, 0.2, 11);
      camera.lookAt(0, 0, 0);
    } else {
      // Desktop: shift left so katana sits right-of-centre in the visual weight
      camera.position.set(-1.8, 0.5, 9);
      camera.lookAt(-1.8, 0, 0);
    }
  }, [camera, isMobile]);

  return (
    <>
      <ambientLight intensity={2.2} color="#ddeeff" />
      <directionalLight position={[4, 7, 5]}   intensity={3.2} color="#ffffff" />
      <directionalLight position={[-3, -4, 3]}  intensity={1.5} color="#ffe8c0" />
      <directionalLight position={[0, 0, -7]}   intensity={1.0} color="#99ccff" />

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
  const rotYRef = useRef<number>(0.22);
  const rotZRef = useRef<number>(0.18);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted,  setMounted]  = useState(false);

  const animObj = useRef({
    sayaY: 0,
    gleam: 0,
    rotY:  0.22,
    rotZ:  0.18,
  });

  // Detect mobile after mount (avoids SSR/hydration mismatch)
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start:   "top top",
          end:     "bottom bottom",
          scrub:   isMobile ? 1.5 : 2.5,
        },
      });

      tl.to(
        animObj.current,
        {
          rotY: 0.22 + Math.PI * 2,
          rotZ: 0.18 + Math.PI * 0.55,
          duration: 10,
          ease: "none",
        },
        0
      );

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
  }, [mounted, isMobile]);

  // Don't render until we know screen size (prevents flicker)
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100vw",
        height:        "100vh",
        pointerEvents: "none",
        zIndex:        0,
        // Slightly lower opacity on mobile so text stays readable over the katana
        opacity: isMobile ? 0.5 : 0.82,
      }}
    >
      <Canvas
        frameloop="always"
        gl={{ antialias: !isMobile, alpha: true }}
        camera={{ fov: isMobile ? 62 : 54, near: 0.1, far: 200 }}
        style={{ background: "transparent" }}
        dpr={isMobile ? [0.75, 1] : [1, 1.5]}
      >
        <KatanaScene
          sayaOffset={sayaOffsetRef}
          bladeGleam={bladeGleamRef}
          rotY={rotYRef}
          rotZ={rotZRef}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
}
