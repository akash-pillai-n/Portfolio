"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleProps {
  color?: string;
  duration?: number;
}

/**
 * Drop this as a child inside any button / anchor to get a click-ripple effect.
 * The component attaches to its parent and handles all positioning automatically.
 *
 * Usage:
 *   <button className="btn btn-primary">
 *     Click me
 *     <Ripple />
 *   </button>
 */
export default function Ripple({ color = "#00b4ff", duration = 650 }: RippleProps) {
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const hostRef = useRef<HTMLSpanElement>(null);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  useEffect(() => {
    const parent = hostRef.current?.parentElement as HTMLElement | null;
    if (!parent) return;

    // Make sure the parent is relatively positioned so the host-span fills it
    const prevPosition = parent.style.position;
    if (!prevPosition || prevPosition === "static") {
      parent.style.position = "relative";
    }

    const onMouseDown = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2.4;
      const id   = Date.now();

      setRipples((prev) => [...prev, { id, x, y, size }]);
      setTimeout(() => removeRipple(id), duration + 150);
    };

    parent.addEventListener("mousedown", onMouseDown);
    return () => {
      parent.removeEventListener("mousedown", onMouseDown);
      if (!prevPosition || prevPosition === "static") {
        parent.style.position = prevPosition;
      }
    };
  }, [duration, removeRipple]);

  return (
    <span
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        borderRadius: "inherit",
        overflow: "hidden",
      }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: "absolute",
            left:  r.x - r.size / 2,
            top:   r.y - r.size / 2,
            width:  r.size,
            height: r.size,
            borderRadius: "50%",
            backgroundColor: color,
            opacity: 0,
            transform: "scale(0)",
            animation: `btn-ripple ${duration}ms ease-out forwards`,
            pointerEvents: "none",
          }}
        />
      ))}
    </span>
  );
}
