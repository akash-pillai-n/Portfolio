"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "@/app/data/resume";
import { MapPin, Calendar } from "lucide-react";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="section-block">
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
            02 /
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
            Experience
          </h2>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, rgba(0,180,255,0.35), transparent)",
            }}
          />
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical progress line — desktop only */}
          <div
            className="timeline-line"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(37,45,61,0.8)",
            }}
          >
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(to bottom, #00b4ff, #2979ff)",
                transformOrigin: "top",
                scaleY: lineScaleY,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3rem, 5vw, 5rem)" }}>
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={item.company} style={{ position: "relative" }}>
                  {/* Timeline dot — desktop */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", damping: 15, delay: 0.1 }}
                    className="timeline-dot"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "3rem",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        width: "0.875rem",
                        height: "0.875rem",
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        boxShadow: `0 0 12px ${item.color}88`,
                        animation: item.current ? "pulseRing 2s ease-in-out infinite" : "none",
                      }}
                    />
                  </motion.div>

                  {/* Card */}
                  <div
                    className={`timeline-card ${isLeft ? "timeline-card-left" : "timeline-card-right"}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -36 : 36, y: 8 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      whileHover={{ y: -4 }}
                      className="glass rounded-2xl relative overflow-hidden"
                      style={{ padding: "clamp(1.5rem, 4vw, 2rem)" }}
                    >
                      {/* Top accent */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: `linear-gradient(to right, ${item.color}, transparent)`,
                          borderRadius: "1rem 1rem 0 0",
                        }}
                      />

                      {/* Current badge */}
                      {item.current && (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.375rem",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "9999px",
                            background: `${item.color}14`,
                            border: `1px solid ${item.color}38`,
                            color: item.color,
                            fontFamily: "var(--font-jetbrains-mono)",
                            fontSize: "0.6875rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <span
                            style={{
                              width: "0.375rem",
                              height: "0.375rem",
                              borderRadius: "50%",
                              backgroundColor: "currentColor",
                              animation: "pulseRing 2s ease-in-out infinite",
                            }}
                          />
                          Current
                        </div>
                      )}

                      <h3
                        style={{
                          fontFamily: "var(--font-space-grotesk)",
                          color: "#e4e8f0",
                          fontSize: "1.125rem",
                          fontWeight: 700,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.company}
                      </h3>
                      <div
                        style={{
                          fontFamily: "var(--font-space-grotesk)",
                          color: item.color,
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          marginBottom: "1rem",
                        }}
                      >
                        {item.role}
                      </div>

                      {/* Meta */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "1rem",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {[
                          { Icon: MapPin, text: item.location },
                          { Icon: Calendar, text: item.period },
                        ].map(({ Icon, text }) => (
                          <div
                            key={text}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.375rem",
                            }}
                          >
                            <Icon size={11} color="#3a4a5c" />
                            <span
                              style={{
                                fontFamily: "var(--font-jetbrains-mono)",
                                fontSize: "0.6875rem",
                                color: "#3a4a5c",
                              }}
                            >
                              {text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bullets */}
                      <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {item.bullets.map((bullet, bi) => (
                          <motion.li
                            key={bi}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 + bi * 0.08, duration: 0.4 }}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.75rem",
                              fontFamily: "var(--font-inter)",
                              fontSize: "0.875rem",
                              color: "#6b7a8d",
                              lineHeight: "1.65",
                            }}
                          >
                            <span
                              style={{
                                width: "0.375rem",
                                height: "0.375rem",
                                borderRadius: "50%",
                                backgroundColor: item.color,
                                marginTop: "0.5rem",
                                flexShrink: 0,
                              }}
                            />
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
