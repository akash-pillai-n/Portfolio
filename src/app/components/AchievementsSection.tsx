"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { achievements } from "@/app/data/resume";
import { Trophy, Medal, Star, Award, Zap } from "lucide-react";

// ── Icon map ───────────────────────────────────────────────────────────────────
const iconMap = { trophy: Trophy, medal: Medal, star: Star, award: Award, zap: Zap };

// ── Hue pairs (blue spectrum) per card ─────────────────────────────────────────
const cardHues: [number, number][] = [
  [190, 212], // bright cyan-blue
  [214, 232], // vivid blue
  [200, 222], // electric blue
  [183, 202], // cyan-teal
  [226, 248], // blue-indigo
];

// ── Alternating rotations for stacked-deck feel ────────────────────────────────
const cardRotations = [-10, 8, -12, 7, -9];

// ── Per-card spring variant factory ───────────────────────────────────────────
function makeVariants(rotation: number): Variants {
  return {
    offscreen: { y: 300 },
    onscreen: {
      y: 50,
      rotate: rotation,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 },
    },
  };
}

const hue = (h: number) => `hsl(${h}, 100%, 58%)`;

// ── Single achievement card ────────────────────────────────────────────────────
function AchievementCard({
  i,
}: {
  i: number;
}) {
  const achievement = achievements[i];
  const [hueA, hueB] = cardHues[i] ?? [200, 220];
  const rotation = cardRotations[i] ?? -10;
  const splashBg = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
  const variants = makeVariants(rotation);
  const IconComponent = iconMap[achievement.icon];

  return (
    <motion.div
      style={cardContainerStyle}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.4 }}
    >
      {/* Splash — the coloured wave shape behind the card */}
      <div style={{ ...splashStyle, background: splashBg }} />

      {/* The card itself */}
      <motion.div variants={variants} style={cardStyle}>
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(to right, ${hue(hueA)}, ${hue(hueB)})`,
            borderRadius: "20px 20px 0 0",
          }}
        />

        {/* Icon badge */}
        <div
          style={{
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "1rem",
            background: `linear-gradient(135deg, ${hue(hueA)}22, ${hue(hueB)}22)`,
            border: `1px solid ${hue(hueA)}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
            flexShrink: 0,
          }}
        >
          <IconComponent size={26} color={hue(hueA)} />
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
            color: "#e4e8f0",
            fontSize: "1.125rem",
            letterSpacing: "0.04em",
            lineHeight: 1.3,
            marginBottom: "0.75rem",
            whiteSpace: "pre-line",
            textTransform: "uppercase",
          }}
        >
          {achievement.title}
        </div>

        {/* Event name */}
        <div
          style={{
            fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
            fontSize: "0.875rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: hue(hueA),
            marginBottom: "0.25rem",
          }}
        >
          {achievement.event}
        </div>

        {/* Venue */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.625rem",
            color: "#3a4a5c",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "1rem",
          }}
        >
          {achievement.venue}
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
            fontSize: "0.8125rem",
            color: "#6b7a8d",
            lineHeight: "1.55",
            letterSpacing: "0.01em",
          }}
        >
          {achievement.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function AchievementsSection() {
  return (
    <section id="achievements" className="section-block">
      <div className="section-inner">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="section-heading-row"
        >
          <span
            style={{
              color: "#00b4ff",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
              flexShrink: 0,
            }}
          >
            05 /
          </span>
          <h2
            style={{
              fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
              color: "#e4e8f0",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Achievements
          </h2>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, rgba(0,180,255,0.35), transparent)",
            }}
          />
        </motion.div>
      </div>

      {/* Card stack — centred, narrower container */}
      <div style={stackContainerStyle}>
        {achievements.map((_, i) => (
          <AchievementCard key={i} i={i} />
        ))}
      </div>
    </section>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const stackContainerStyle: React.CSSProperties = {
  margin: "0 auto",
  maxWidth: 480,
  paddingBottom: 140,
  width: "100%",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
};

const cardContainerStyle: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
};

const splashStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
  opacity: 0.35,
};

const cardStyle: React.CSSProperties = {
  width: 300,
  minHeight: 380,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: "2rem",
  borderRadius: 20,
  background: "#161b27",
  border: "1px solid rgba(37,45,61,0.9)",
  boxShadow:
    "0 0 1px rgba(0,0,0,0.4), 0 0 4px rgba(0,0,0,0.3), 0 0 16px rgba(0,0,0,0.2), 0 0 40px rgba(0,0,0,0.1)",
  transformOrigin: "10% 60%",
  position: "relative",
  overflow: "hidden",
};
