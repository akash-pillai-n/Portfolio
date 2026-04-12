"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface KatanaModelProps {
  sayaOffset: React.MutableRefObject<number>;
  bladeGleam: React.MutableRefObject<number>;
  rotY:       React.MutableRefObject<number>;
  rotZ:       React.MutableRefObject<number>;
}

export default function KatanaModel({ sayaOffset, bladeGleam, rotY, rotZ }: KatanaModelProps) {
  // outerGroupRef receives the scroll-driven Y + Z spin
  const outerGroupRef = useRef<THREE.Group>(null);
  const sayaGroupRef  = useRef<THREE.Group>(null);
  const bladeMatRef   = useRef<THREE.MeshStandardMaterial>(null);
  const gleamRef      = useRef<THREE.PointLight>(null);

  // ── Curved blade geometry ────────────────────────────────────────────────────
  // Built from a CatmullRomCurve3 spine so the sori (katana backward bend) is
  // geometrically smooth with correct vertex normals — no post-processing hacks.
  const bladeGeo = useMemo(() => {
    const N = 64;

    // Spine control points (local Y = blade axis, X = sori bend)
    const spine = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0.000, -2.85,  0),  // tip
        new THREE.Vector3(0.035, -2.15,  0),
        new THREE.Vector3(0.085, -1.00,  0),
        new THREE.Vector3(0.125,  0.35,  0),  // max sori (~40% from base)
        new THREE.Vector3(0.095,  1.70,  0),
        new THREE.Vector3(0.025,  2.75,  0),  // base (meets guard)
      ],
      false,
      "catmullrom",
      0.5
    );

    const positions: number[] = [];
    const uvs:       number[] = [];
    const indices:   number[] = [];

    for (let i = 0; i <= N; i++) {
      const t   = i / N;                           // 0 = tip, 1 = base
      const pt  = spine.getPoint(t);
      const tan = spine.getTangent(t).normalize();

      // Width-direction: 90° CCW from tangent in the XY plane
      const perpX = -tan.y;
      const perpY =  tan.x;

      // Width tapers with a gentle exponent (wider at base, near-zero at tip)
      const halfW = (0.003 + 0.069 * Math.pow(t, 0.65));
      // Thickness tapers (thicker at base = spine side)
      const halfT = (0.006 + 0.010 * t);

      // Spine side: slightly inset from the centre line
      const sX = pt.x - perpX * 0.009;
      const sY = pt.y - perpY * 0.009;
      // Cutting-edge side: offset by full halfW
      const eX = pt.x + perpX * halfW;
      const eY = pt.y + perpY * halfW;

      // 4 vertices per cross-section ring
      // 0: spine-front   1: spine-back
      // 2: edge-front    3: edge-back  (cutting edge is razor-thin)
      positions.push(
        sX, sY,  halfT,
        sX, sY, -halfT,
        eX, eY,  halfT * 0.06,
        eX, eY, -halfT * 0.06,
      );
      uvs.push(0, t,  0, t,  1, t,  1, t);
    }

    for (let i = 0; i < N; i++) {
      const b  = i * 4;
      const nb = b + 4;
      // flat side faces
      indices.push(b, nb, b + 2,   b + 2, nb, nb + 2);       // front
      indices.push(b + 1, b + 3, nb + 1,  b + 3, nb + 3, nb + 1); // back
      // spine back edge (mune)
      indices.push(b, b + 1, nb,  b + 1, nb + 1, nb);
      // cutting edge (ha) — razor-thin bevel
      indices.push(b + 2, nb + 2, b + 3,  b + 3, nb + 2, nb + 3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("uv",       new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();   // accurate normals → smooth metallic reflections
    return geo;
  }, []);

  // ── Saya (scabbard) ──────────────────────────────────────────────────────────
  const sayaGeo   = useMemo(() => new THREE.CylinderGeometry(0.10, 0.125, 5.6, 14),  []);
  const tsubaGeo  = useMemo(() => new THREE.CylinderGeometry(0.26, 0.26, 0.045, 8),   []);
  const tsukaGeo  = useMemo(() => new THREE.CylinderGeometry(0.078, 0.095, 1.35, 12), []);
  const kashiraGeo = useMemo(() => new THREE.SphereGeometry(0.105, 12, 8),            []);

  useFrame(() => {
    // Scroll-driven rotation — updated every frame from the GSAP ticker refs
    if (outerGroupRef.current) {
      outerGroupRef.current.rotation.y = rotY.current;
      outerGroupRef.current.rotation.z = rotZ.current;
    }
    // Saya slides along local Y (→ world X after -90° Z rotation)
    if (sayaGroupRef.current) {
      sayaGroupRef.current.position.y = sayaOffset.current;
    }
    // Blade gleam on unsheath
    if (bladeMatRef.current && gleamRef.current) {
      const g = bladeGleam.current;
      bladeMatRef.current.emissiveIntensity = g * 0.65;
      gleamRef.current.intensity = g * 5;
    }
  });

  // ── Scene graph ──────────────────────────────────────────────────────────────
  //
  //  outerGroup  — rotated by GSAP (Y + Z scroll spin), centred at world origin
  //    └─ innerGroup  [rot -90°Z, scale 2, pos -1.19 X]  — orientation + size
  //         ├─ blade  (fixed, revealed as saya slides off)
  //         ├─ sayaGroup  (animated: local Y = saya slide)
  //         └─ handleGroup  (fixed)
  //
  // Position -1.19 in inner group centres the model's mid-point at the
  // outerGroup origin so Y/Z spinning feels like spinning-in-place.
  return (
    <group ref={outerGroupRef}>
      <group
        rotation={[0, 0, -Math.PI / 2]}
        scale={2.0}
        position={[-1.19, 0, 0]}
      >
        {/* Gleam point light (blooms on unsheath) */}
        <pointLight
          ref={gleamRef}
          color="#d8eeff"
          intensity={0}
          distance={7}
          position={[0, 0, 0.5]}
        />

        {/* ── BLADE (fixed) ── */}
        <group position={[-0.03, 0, 0]}>
          <mesh geometry={bladeGeo}>
            <meshStandardMaterial
              ref={bladeMatRef}
              color="#e8f2ff"
              roughness={0.03}
              metalness={0.99}
              emissive="#88bbff"
              emissiveIntensity={0}
              envMapIntensity={4}
            />
          </mesh>
        </group>

        {/* ── SAYA (scabbard — animated) ── */}
        <group ref={sayaGroupRef}>
          <mesh geometry={sayaGeo}>
            <meshStandardMaterial
              color="#f0ece2"
              roughness={0.40}
              metalness={0.08}
              envMapIntensity={1.2}
            />
          </mesh>
          {/* Gold sageo bands */}
          {[-1.6, -0.8, 0.0, 0.8, 1.6].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <torusGeometry args={[0.13, 0.015, 8, 20]} />
              <meshStandardMaterial color="#d4af37" roughness={0.18} metalness={0.92} />
            </mesh>
          ))}
          {/* Kojiri (tip cap) */}
          <mesh position={[0, -2.88, 0]}>
            <sphereGeometry args={[0.12, 10, 8]} />
            <meshStandardMaterial color="#d4af37" roughness={0.18} metalness={0.92} />
          </mesh>
        </group>

        {/* ── HANDLE (fixed) ── */}
        <group position={[0, 3.35, 0]}>
          {/* Tsuba */}
          <mesh geometry={tsubaGeo} position={[0, -0.72, 0]}>
            <meshStandardMaterial color="#d4af37" roughness={0.22} metalness={0.88} />
          </mesh>
          {/* Fuchi collar */}
          <mesh position={[0, -0.46, 0]}>
            <cylinderGeometry args={[0.098, 0.098, 0.09, 14]} />
            <meshStandardMaterial color="#b8962a" roughness={0.28} metalness={0.82} />
          </mesh>
          {/* Tsuka (grip) */}
          <mesh geometry={tsukaGeo}>
            <meshStandardMaterial color="#1e1a2e" roughness={0.88} metalness={0.04} />
          </mesh>
          {/* Ito wrap (cream cord) */}
          {Array.from({ length: 16 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, -0.60 + i * 0.09, 0]}
              rotation={[Math.PI / 2, 0, (i % 2) * 0.5]}
            >
              <torusGeometry args={[0.10, 0.011, 6, 16]} />
              <meshStandardMaterial color="#e8e0c2" roughness={0.65} metalness={0} />
            </mesh>
          ))}
          {/* Kashira (pommel) */}
          <mesh geometry={kashiraGeo} position={[0, 0.76, 0]}>
            <meshStandardMaterial color="#d4af37" roughness={0.18} metalness={0.92} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
