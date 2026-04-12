"use client";

import { Transition } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { personalInfo } from "@/app/data/resume";
import Ripple from "@/app/components/ui/Ripple";
import {
  ChevronDown,
  Brain,
  Activity,
  Layers,
  Cloud,
  Database,
  GitBranch,
} from "lucide-react";

// Skill blocks with Lucide icons
const skillBlocks = [
  { color: "#00b4ff", label: "AI / LLMs",  Icon: Brain      },
  { color: "#2979ff", label: "MLOps",       Icon: Activity   },
  { color: "#1a56db", label: "Full-Stack",  Icon: Layers     },
  { color: "#00e5ff", label: "Cloud",       Icon: Cloud      },
  { color: "#5c6bc0", label: "Data Sci",    Icon: Database   },
  { color: "#0077cc", label: "DevOps",      Icon: GitBranch  },
];

const spring: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function HeroSection() {
  const [blockOrder, setBlockOrder] = useState(skillBlocks);

  useEffect(() => {
    const id = setInterval(() => {
      setBlockOrder((prev) => shuffle(prev));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const handleScrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,100,220,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className="section-inner relative w-full flex flex-col lg:flex-row items-center justify-between"
        style={{ position: "relative", zIndex: 10, gap: "clamp(3rem, 6vw, 5rem)" }}
      >
        {/* Left: text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.75rem",
              padding: "0.375rem 1rem",
              borderRadius: "9999px",
              border: "1px solid rgba(0,180,255,0.25)",
              background: "rgba(0,180,255,0.06)",
              color: "#00b4ff",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
            }}
          >
            <span
              style={{
                width: "0.5rem",
                height: "0.5rem",
                borderRadius: "50%",
                backgroundColor: "#00b4ff",
                animation: "pulseRing 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            Unsheathing the cutting edge of AI
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "0.04em",
              color: "#e4e8f0",
              marginBottom: "0.15rem",
              textTransform: "uppercase",
            }}
          >
            Akash
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="gradient-text"
            style={{
              fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "0.04em",
              marginBottom: "1.75rem",
              display: "block",
              textTransform: "uppercase",
            }}
          >
            Pillai
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7a8599",
              marginBottom: "1rem",
            }}
          >
            {personalInfo.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
              fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
              color: "#4a5568",
              lineHeight: "1.6",
              maxWidth: "32rem",
              marginBottom: "2.5rem",
              letterSpacing: "0.02em",
            }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
            className="lg:justify-start"
          >
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(0,180,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <Ripple color="rgba(255,255,255,0.35)" />
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
              <Ripple color="rgba(0,180,255,0.25)" />
            </motion.a>
          </motion.div>

          {/* Stat pills — replaces small "MS @ Texas A&M" line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "2rem",
              justifyContent: "center",
            }}
            className="lg:justify-start"
          >
            {[
              { value: "Texas A&M", label: "MS Data Science Student" },
              { value: "TAMIDS",    label: "Student Asst · ODS Lab" },
              { value: "3×",        label: "Hackathon Winner" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(0,180,255,0.18)",
                  background: "rgba(0,180,255,0.05)",
                  textAlign: "center",
                  minWidth: "5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.04em",
                    color: "#00b4ff",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.6rem",
                    color: "#3a4a5c",
                    marginTop: "0.2rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: animated reordering blocks with Lucide icons */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0 }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              width: "clamp(220px, 30vw, 280px)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {blockOrder.map((block) => {
              const { Icon } = block;
              return (
                <motion.li
                  key={block.color}
                  layout
                  transition={spring}
                  whileHover={{ scale: 1.07, zIndex: 10 }}
                  style={{
                    width: "clamp(96px, 11vw, 116px)",
                    height: "clamp(96px, 11vw, 116px)",
                    borderRadius: "14px",
                    background: `linear-gradient(135deg, ${block.color}20, ${block.color}0c)`,
                    border: `1px solid ${block.color}38`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    cursor: "default",
                    boxShadow: `0 4px 20px ${block.color}14`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: `linear-gradient(to right, ${block.color}, transparent)`,
                      borderRadius: "14px 14px 0 0",
                    }}
                  />
                  {/* Lucide icon */}
                  <Icon
                    size={28}
                    color={block.color}
                    style={{ position: "relative", zIndex: 1 }}
                  />
                  {/* Label */}
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontFamily: "var(--font-jetbrains-mono)",
                      color: "rgba(228,232,240,0.5)",
                      letterSpacing: "0.06em",
                      position: "relative",
                      zIndex: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    {block.label}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute flex flex-col items-center gap-2 cursor-pointer"
        style={{
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll down"
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.65rem",
            color: "#2d3748",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} color="#00b4ff" />
        </motion.div>
      </motion.button>
    </section>
  );
}
