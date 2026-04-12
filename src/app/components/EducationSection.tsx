"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { education } from "@/app/data/resume";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

function EducationCard({
  item,
  index,
}: {
  item: (typeof education)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  return (
    <div
      ref={ref}
      style={{
        minHeight: "320px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem 0",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -5, boxShadow: `0 20px 50px ${item.color}14` }}
        className="glass rounded-3xl relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "680px",
          padding: "clamp(1.75rem, 4vw, 2.5rem)",
          border: `1px solid ${item.color}1a`,
          transition: "box-shadow 0.3s",
        }}
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
            borderRadius: "1.5rem 1.5rem 0 0",
          }}
        />

        <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(1.25rem, 4vw, 2.5rem)" }}>
          {/* Progress ring */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div style={{ position: "relative", width: 76, height: 76 }}>
              <svg width="76" height="76" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                <circle
                  cx="50" cy="50" r="36"
                  fill="none"
                  stroke={`${item.color}1a`}
                  strokeWidth="6"
                  pathLength="1"
                />
                <motion.circle
                  cx="50" cy="50" r="36"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="6"
                  pathLength="1"
                  strokeLinecap="round"
                  style={{
                    pathLength: scrollYProgress,
                    filter: `drop-shadow(0 0 5px ${item.color})`,
                  }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraduationCap size={20} color={item.color} />
              </div>
            </div>
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.625rem",
                color: item.color,
                opacity: 0.65,
                textAlign: "center",
              }}
            >
              {index === 0 ? "MS" : "B.Tech"}
            </span>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.6875rem",
                color: item.color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              {item.degree.split(" in ")[0]}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "#e4e8f0",
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                fontWeight: 700,
                marginBottom: "0.375rem",
                lineHeight: 1.25,
              }}
            >
              {item.institution}
            </h3>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "#7a8599",
                fontSize: "0.9rem",
                marginBottom: "1rem",
                lineHeight: 1.4,
              }}
            >
              {item.degree.includes(" in ") ? item.degree.split(" in ")[1] : item.degree}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              {[
                { Icon: MapPin, text: item.location },
                { Icon: Calendar, text: item.period },
              ].map(({ Icon, text }) => (
                <div
                  key={text}
                  style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
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

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                color: "#4a5568",
                lineHeight: "1.65",
              }}
            >
              {item.highlight}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="section-block">
      <div
        style={{
          maxWidth: "52rem",
          margin: "0 auto",
          padding: `0 clamp(1.5rem, 5vw, 4rem)`,
        }}
      >
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
            04 /
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
            Education
          </h2>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, rgba(0,180,255,0.35), transparent)",
            }}
          />
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {education.map((item, index) => (
            <EducationCard key={item.institution} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
