"use client";

import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import { useState } from "react";
import { achievements } from "@/app/data/resume";
import { Trophy, Medal, Star, Award, Zap, X } from "lucide-react";

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

// ── Modal overlay ──────────────────────────────────────────────────────────────
function AchievementModal({
  i,
  onClose,
}: {
  i: number;
  onClose: () => void;
}) {
  const achievement = achievements[i];
  const [hueA, hueB] = cardHues[i] ?? [200, 220];
  const IconComponent = iconMap[achievement.icon];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        backgroundColor: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.45 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 500,
          background: "#161b27",
          border: `1px solid ${hue(hueA)}40`,
          borderRadius: 24,
          padding: "2.5rem",
          position: "relative",
          boxShadow: `0 0 0 1px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.6), 0 0 40px ${hue(hueA)}18`,
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "3px",
            background: `linear-gradient(to right, ${hue(hueA)}, ${hue(hueB)})`,
            borderRadius: "24px 24px 0 0",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#7a8599",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color = "#e4e8f0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLButtonElement).style.color = "#7a8599";
          }}
        >
          <X size={14} />
        </button>

        {/* Icon badge */}
        <div
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "1.2rem",
            background: `linear-gradient(135deg, ${hue(hueA)}22, ${hue(hueB)}22)`,
            border: `1px solid ${hue(hueA)}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <IconComponent size={30} color={hue(hueA)} />
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
            color: "#e4e8f0",
            fontSize: "1.375rem",
            letterSpacing: "0.05em",
            lineHeight: 1.25,
            marginBottom: "0.75rem",
            textTransform: "uppercase",
            whiteSpace: "pre-line",
          }}
        >
          {achievement.title}
        </div>

        {/* Event */}
        <div
          style={{
            fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
            fontSize: "0.95rem",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: hue(hueA),
            marginBottom: "0.3rem",
          }}
        >
          {achievement.event}
        </div>

        {/* Venue */}
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.7rem",
            color: "#4a5a6c",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "1.5rem",
          }}
        >
          {achievement.venue}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(to right, ${hue(hueA)}30, transparent)`,
            marginBottom: "1.5rem",
          }}
        />

        {/* Full description */}
        <p
          style={{
            fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
            fontSize: "0.9375rem",
            color: "#a0aec0",
            lineHeight: "1.65",
            letterSpacing: "0.01em",
            margin: 0,
          }}
        >
          {achievement.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ── Single achievement card ────────────────────────────────────────────────────
function AchievementCard({
  i,
  onOpen,
}: {
  i: number;
  onOpen: (i: number) => void;
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
      <motion.div
        variants={variants}
        style={{ ...cardStyle, cursor: "pointer" }}
        onClick={() => onOpen(i)}
        whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      >
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

        {/* Description — truncated on card */}
        <p
          style={{
            fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
            fontSize: "0.8125rem",
            color: "#6b7a8d",
            lineHeight: "1.55",
            letterSpacing: "0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            margin: 0,
          }}
        >
          {achievement.description}
        </p>

        {/* Click hint */}
        <div
          style={{
            marginTop: "1rem",
            fontSize: "0.65rem",
            fontFamily: "var(--font-jetbrains-mono)",
            color: hue(hueA),
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Click to expand →
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function AchievementsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          <AchievementCard key={i} i={i} onOpen={setOpenIndex} />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openIndex !== null && (
          <AchievementModal i={openIndex} onClose={() => setOpenIndex(null)} />
        )}
      </AnimatePresence>
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
