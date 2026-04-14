"use client";

import { useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Renderer, Transform, Vec3, Color, Polyline } = require("ogl");

const RIBBON_COLORS = ["#00b4ff"];

const VERTEX = /* glsl */ `
  precision highp float;

  attribute vec3 position;
  attribute vec3 next;
  attribute vec3 prev;
  attribute vec2 uv;
  attribute float side;

  uniform vec2  uResolution;
  uniform float uDPR;
  uniform float uThickness;
  uniform float uTime;
  uniform float uEnableShaderEffect;
  uniform float uEffectAmplitude;

  varying vec2 vUV;

  vec4 getPosition() {
    vec4 current = vec4(position, 1.0);
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 nextScreen = next.xy * aspect;
    vec2 prevScreen = prev.xy * aspect;
    vec2 tangent = normalize(nextScreen - prevScreen);
    vec2 normal  = vec2(-tangent.y, tangent.x);
    normal /= aspect;
    normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
    float dist = length(nextScreen - prevScreen);
    normal *= smoothstep(0.0, 0.02, dist);
    float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
    float pixelWidth = current.w * pixelWidthRatio;
    normal *= pixelWidth * uThickness;
    current.xy -= normal * side;
    if (uEnableShaderEffect > 0.5) {
      current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
    }
    return current;
  }

  void main() {
    vUV = uv;
    gl_Position = getPosition();
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  uniform vec3  uColor;
  uniform float uOpacity;
  uniform float uEnableFade;
  varying vec2  vUV;
  void main() {
    float fade = 1.0;
    if (uEnableFade > 0.5) {
      fade = 1.0 - smoothstep(0.0, 1.0, vUV.y);
    }
    gl_FragColor = vec4(uColor, uOpacity * fade);
  }
`;

export default function CursorRipple() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No cursor on touch devices — skip entirely
    if (window.matchMedia("(hover: none)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new Renderer({
      dpr:   Math.min(window.devicePixelRatio || 1, 2),
      alpha: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    Object.assign(gl.canvas.style, {
      position: "absolute",
      top: "0", left: "0",
      width: "100%", height: "100%",
    });
    container.appendChild(gl.canvas);

    const scene = new Transform();

    // ── Build one ribbon per colour ─────────────────────────────────────────
    const BASE_SPRING    = 0.03;
    const BASE_FRICTION  = 0.9;
    const BASE_THICKNESS = 22;
    const POINT_COUNT    = 50;
    const MAX_AGE        = 500;
    const SPEED          = 0.5;
    const OFFSET_FACTOR  = 0.04;

    interface Line {
      spring:        number;
      friction:      number;
      mouseVelocity: InstanceType<typeof Vec3>;
      mouseOffset:   InstanceType<typeof Vec3>;
      points:        InstanceType<typeof Vec3>[];
      polyline:      InstanceType<typeof Polyline>;
    }

    const lines: Line[] = [];
    const center = (RIBBON_COLORS.length - 1) / 2;

    RIBBON_COLORS.forEach((color, index) => {
      const spring    = BASE_SPRING    + (Math.random() - 0.5) * 0.01;
      const friction  = BASE_FRICTION  + (Math.random() - 0.5) * 0.02;
      const thickness = BASE_THICKNESS + (Math.random() - 0.5) * 4;

      const mouseOffset = new Vec3(
        (index - center) * OFFSET_FACTOR + (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.05,
        0,
      );

      const points: InstanceType<typeof Vec3>[] = Array.from(
        { length: POINT_COUNT },
        () => new Vec3(),
      );

      const polyline = new Polyline(gl, {
        points,
        vertex:   VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uColor:              { value: new Color(color) },
          uThickness:          { value: thickness },
          uOpacity:            { value: 0.9 },
          uTime:               { value: 0.0 },
          uEnableShaderEffect: { value: 0.0 },   // off — keep it clean
          uEffectAmplitude:    { value: 2.0 },
          uEnableFade:         { value: 1.0 },   // fade toward tail
        },
      });

      polyline.mesh.setParent(scene);
      lines.push({ spring, friction, mouseVelocity: new Vec3(), mouseOffset, points, polyline });
    });

    // ── Resize ──────────────────────────────────────────────────────────────
    function resize() {
      renderer.setSize(container!.clientWidth, container!.clientHeight);
      lines.forEach((l) => l.polyline.resize());
    }
    window.addEventListener("resize", resize);
    resize();

    // ── Mouse tracking ──────────────────────────────────────────────────────
    const mouse = new Vec3(-2, -2, 0); // start well off-screen

    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouse.set(
        ((e.clientX - rect.left) / container!.clientWidth)  *  2 - 1,
        ((e.clientY - rect.top)  / container!.clientHeight) * -2 + 1,
        0,
      );
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Animation loop ──────────────────────────────────────────────────────
    const tmp = new Vec3();
    let frameId: number;
    let lastTime = performance.now();

    function update() {
      frameId = requestAnimationFrame(update);
      const now = performance.now();
      const dt  = now - lastTime;
      lastTime  = now;

      lines.forEach((line) => {
        // Spring the head toward the cursor
        tmp
          .copy(mouse)
          .add(line.mouseOffset)
          .sub(line.points[0])
          .multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);

        // Lerp each subsequent point toward the one ahead
        for (let i = 1; i < line.points.length; i++) {
          const segDelay = MAX_AGE / (line.points.length - 1);
          const alpha    = Math.min(1, (dt * SPEED) / segDelay);
          line.points[i].lerp(line.points[i - 1], alpha);
        }

        if (line.polyline.mesh.program.uniforms.uTime) {
          line.polyline.mesh.program.uniforms.uTime.value = now * 0.001;
        }
        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
    }
    update();

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
      if (gl.canvas.parentNode === container!) {
        container!.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        pointerEvents: "none",
        zIndex:        100000,
      }}
    />
  );
}
