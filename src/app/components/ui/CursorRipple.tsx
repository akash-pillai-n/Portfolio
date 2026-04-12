"use client";

import { useEffect, useRef } from "react";

/**
 * Smooth cursor glow — a soft light-blue radial aura that follows the mouse
 * with a gentle lerp so it trails slightly behind for a fluid feel.
 * Rendered as a fixed overlay; pointer-events: none so it never blocks clicks.
 */
export default function CursorRipple() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target  = { x: -300, y: -300 };
    const current = { x: -300, y: -300 };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Outer glow trails more lazily; inner follows tighter
      current.x = lerp(current.x, target.x, 0.10); // eslint-disable-line
      current.y = lerp(current.y, target.y, 0.10); // eslint-disable-line

      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        const ix = lerp(current.x, target.x, 0.35);
        const iy = lerp(current.y, target.y, 0.35);
        innerRef.current.style.transform =
          `translate(${ix}px, ${iy}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100000,
        overflow: "hidden",
      }}
    >
      {/* Outer soft bloom */}
      <div
        ref={outerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,180,255,0.10) 0%, rgba(0,180,255,0.04) 45%, transparent 70%)",
          filter: "blur(18px)",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
      {/* Inner tighter glow */}
      <div
        ref={innerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.22) 0%, rgba(0,180,255,0.08) 55%, transparent 75%)",
          filter: "blur(6px)",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
