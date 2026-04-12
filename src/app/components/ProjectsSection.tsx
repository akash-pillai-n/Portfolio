"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { projects } from "@/app/data/resume";
import { ExternalLink } from "lucide-react";

const ITEM_WIDTH = 380;
const GAP = 24;

// Blue-tinted dark gradients for each project card
const projectGradients: Record<string, string> = {
  "#00b4ff": "linear-gradient(135deg, #0a1525 0%, #0d2040 50%, #00b4ff14 100%)",
  "#2979ff": "linear-gradient(135deg, #080f22 0%, #0e1f52 50%, #2979ff14 100%)",
  "#1a56db": "linear-gradient(135deg, #080f22 0%, #0c1a48 50%, #1a56db14 100%)",
  "#00e5ff": "linear-gradient(135deg, #071520 0%, #0b2535 50%, #00e5ff14 100%)",
  "#5c6bc0": "linear-gradient(135deg, #0b0e20 0%, #181d40 50%, #5c6bc014 100%)",
  "#0077cc": "linear-gradient(135deg, #080f1c 0%, #0b1c38 50%, #0077cc14 100%)",
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalDistance = (projects.length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <section id="projects" style={{ background: "rgba(0,0,0,0.25)", padding: 0 }}>
      {/* Intro header */}
      <div
        style={{
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: `0 clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)`,
          maxWidth: "72rem",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <span
            style={{
              color: "#00b4ff",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.75rem",
              flexShrink: 0,
            }}
          >
            03 /
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "#e4e8f0",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Projects
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.75rem",
            color: "#2d3748",
            marginTop: "0.75rem",
            letterSpacing: "0.06em",
          }}
        >
          scroll to explore
        </motion.p>
      </div>

      {/* Horizontal scroll */}
      <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: `${ITEM_WIDTH}px`,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            overflow: "visible",
          }}
        >
          <motion.div
            style={{
              x,
              display: "flex",
              gap: `${GAP}px`,
              willChange: "transform",
            }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ y: -8, scale: 1.01 }}
                style={{
                  flexShrink: 0,
                  width: `${ITEM_WIDTH}px`,
                  height: "520px",
                  borderRadius: "20px",
                  position: "relative",
                  overflow: "hidden",
                  background: projectGradients[project.color] ?? "#111",
                  border: `1px solid ${project.color}20`,
                  cursor: "pointer",
                  transition: "border-color 0.3s",
                }}
              >
                {/* Subtle grid pattern */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Glow orb */}
                <div
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${project.color}22, transparent 70%)`,
                    filter: "blur(24px)",
                  }}
                />

                {/* Bottom fade */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to bottom, transparent 40%, ${project.color}10 100%)`,
                  }}
                />

                {/* Card content */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    padding: "clamp(1.5rem, 4vw, 2rem)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Top row: number + link icon */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "0.6875rem",
                        color: project.color,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                      }}
                    >
                      0{project.id}
                    </span>
                    <motion.div
                      animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink size={15} color={project.color} />
                    </motion.div>
                  </div>

                  {/* Middle: name + description */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        color: "#e4e8f0",
                        fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: "0.625rem",
                      }}
                    >
                      {project.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        color: project.color,
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        marginBottom: "1rem",
                      }}
                    >
                      {project.description}
                    </div>

                    {/* Long description — shown on hover */}
                    <motion.p
                      animate={{
                        opacity: hoveredId === project.id ? 1 : 0,
                        y: hoveredId === project.id ? 0 : 8,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.8125rem",
                        color: "#6b7a8d",
                        lineHeight: "1.65",
                        marginBottom: "1rem",
                      }}
                    >
                      {project.longDescription}
                    </motion.p>
                  </div>

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: "0.625rem",
                          padding: "0.25rem 0.625rem",
                          borderRadius: "9999px",
                          border: `1px solid ${project.color}38`,
                          color: project.color,
                          background: `${project.color}0c`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: "0.625rem",
                          padding: "0.25rem 0.625rem",
                          borderRadius: "9999px",
                          border: "1px solid rgba(37,45,61,0.9)",
                          color: "#3a4a5c",
                        }}
                      >
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Outro spacer */}
      <div style={{ height: "20vh" }} />
    </section>
  );
}
