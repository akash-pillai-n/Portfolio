"use client";

import { motion } from "motion/react";
import { skills } from "@/app/data/resume";

const skillCategories = [
  { label: "Languages", items: skills.languages, color: "#00b4ff" },
  { label: "Technologies & Tools", items: skills.technologies, color: "#2979ff" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 15 },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="section-block">
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
            01 /
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "#e4e8f0",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            About Me
          </h2>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, rgba(0,180,255,0.35), transparent)",
            }}
          />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))",
            gap: "clamp(2.5rem, 6vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "1.0625rem",
                  lineHeight: "1.75",
                  color: "#b0b8c8",
                }}
              >
                I&apos;m a{" "}
                <span style={{ color: "#00b4ff", fontWeight: 600 }}>
                  Master&apos;s student in Data Science
                </span>{" "}
                at Texas A&amp;M University, with a background in Computer Science
                Engineering. I build intelligent systems at the intersection of
                machine learning, AI agents, and software engineering.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.9375rem",
                  lineHeight: "1.75",
                  color: "#6b7a8d",
                }}
              >
                Currently working at the{" "}
                <span style={{ color: "#e4e8f0" }}>TAMU Institute of Data Science</span>
                , developing predictive models for disaster impact estimation and computer
                vision pipelines for disease detection. Previously built production-grade
                systems at <span style={{ color: "#e4e8f0" }}>Xebia</span> using Docker,
                Kubernetes, and Azure DevOps.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.9375rem",
                  lineHeight: "1.75",
                  color: "#6b7a8d",
                }}
              >
                Outside of work, I&apos;m a 3x hackathon winner who loves pushing the
                boundaries of what&apos;s possible with LLMs, AI agents, and multimodal
                systems. Mentored at MIT&apos;s HackMIT and won challenges at TAMU
                Datathon and TAMUHack.
              </p>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  paddingTop: "1.75rem",
                  marginTop: "0.5rem",
                  borderTop: "1px solid rgba(37,45,61,0.9)",
                }}
              >
                {[
                  { value: "3+", label: "Years Exp" },
                  { value: "5x",  label: "Hackathon Awards" },
                  { value: "6+", label: "AI Projects" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div
                      className="gradient-text"
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "0.65rem",
                        color: "#3a4a5c",
                        marginTop: "0.25rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: skill tags */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}
          >
            {skillCategories.map((category) => (
              <div key={category.label}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      width: "0.5rem",
                      height: "0.5rem",
                      borderRadius: "50%",
                      backgroundColor: category.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: category.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {category.label}
                  </span>
                </div>
                <motion.ul
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", listStyle: "none" }}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {category.items.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={tagVariants}
                      whileHover={{
                        scale: 1.07,
                        borderColor: `${category.color}88`,
                        color: "#e4e8f0",
                        boxShadow: `0 0 10px ${category.color}28`,
                      }}
                      style={{
                        padding: "0.375rem 0.875rem",
                        borderRadius: "9999px",
                        border: "1px solid rgba(37,45,61,1)",
                        color: "#7a8599",
                        background: "rgba(22,27,39,0.8)",
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "0.75rem",
                        cursor: "default",
                        transition: "all 0.2s",
                      }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
