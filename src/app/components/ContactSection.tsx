"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { personalInfo } from "@/app/data/resume";
import { Mail, Phone, Send, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Ripple from "@/app/components/ui/Ripple";

type FormState  = { name: string; email: string; message: string };
type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const [form,    setForm]    = useState<FormState>({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status,  setStatus]  = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "rgba(22,27,39,0.8)",
    border: `1px solid ${focused === field ? "#00b4ff" : "rgba(37,45,61,0.9)"}`,
    borderRadius: "10px",
    padding: "0.875rem 1rem",
    color: "#e4e8f0",
    fontFamily: "var(--font-inter)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
    boxShadow: focused === field ? "0 0 0 3px rgba(0,180,255,0.1)" : "none",
    resize: "none" as const,
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-jetbrains-mono)",
    fontSize: "0.6875rem",
    color: "#3a4a5c",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: "0.5rem",
  };

  return (
    <section
      id="contact"
      className="section-block"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,100,200,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "52rem",
          margin: "0 auto",
          padding: `0 clamp(1.5rem, 5vw, 4rem)`,
          position: "relative",
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
            06 /
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
            Let&apos;s Connect
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
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
            gap: "clamp(2.5rem, 6vw, 4rem)",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                color: "#6b7a8d",
                lineHeight: "1.75",
                marginBottom: "2.25rem",
              }}
            >
              I&apos;m actively looking for full-time opportunities in AI/ML, data
              science, and software engineering. Whether it&apos;s a role, a
              collaboration, or just a great conversation about AI — my inbox is
              always open.
            </p>

            {/* Contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
              {[
                { icon: Mail,  label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: personalInfo.phone, href: `tel:${personalInfo.phone}` },
              ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "#7a8599",
                    textDecoration: "none",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.8125rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00b4ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#7a8599")}
                >
                  <span
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "0.625rem",
                      background: "rgba(0,180,255,0.06)",
                      border: "1px solid rgba(0,180,255,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={13} color="#00b4ff" />
                  </span>
                  {label}
                </motion.a>
              ))}
            </div>

            {/* Social buttons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: Github,   href: personalInfo.github,   label: "GitHub" },
                { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(0,180,255,0.16)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1.125rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(37,45,61,0.9)",
                    background: "rgba(22,27,39,0.7)",
                    color: "#7a8599",
                    textDecoration: "none",
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "0.8125rem",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#e4e8f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#7a8599")}
                >
                  <Icon size={13} />
                  {label}
                  <ArrowUpRight size={11} />
                  <Ripple color="rgba(0,180,255,0.2)" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl text-center"
                  style={{
                    padding: "clamp(2.5rem, 6vw, 3.5rem) 2rem",
                    border: "1px solid rgba(0,180,255,0.18)",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "50%",
                      background: "rgba(0,180,255,0.1)",
                      border: "1px solid rgba(0,180,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.25rem",
                    }}
                  >
                    <Send size={16} color="#00b4ff" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: "#e4e8f0",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message sent!
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", color: "#4a5568", fontSize: "0.875rem" }}>
                    I&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : status === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl text-center"
                  style={{
                    padding: "clamp(2.5rem, 6vw, 3.5rem) 2rem",
                    border: "1px solid rgba(220,50,50,0.25)",
                  }}
                >
                  <h3 style={{ fontFamily: "var(--font-space-grotesk)", color: "#e4e8f0", fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                    Something went wrong
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", color: "#4a5568", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    Please email me directly at{" "}
                    <a href="mailto:akash.pillai.0810@gmail.com" style={{ color: "#00b4ff" }}>
                      akash.pillai.0810@gmail.com
                    </a>
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn btn-outline"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    Try again
                    <Ripple color="rgba(0,180,255,0.2)" />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-2xl"
                  style={{
                    padding: "clamp(1.5rem, 4vw, 2rem)",
                    border: "1px solid rgba(37,45,61,0.9)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input
                      id="name" type="text" required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("name")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input
                      id="email" type="email" required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("email")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message" required rows={5}
                      placeholder="Tell me about the opportunity..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("message")}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(0,180,255,0.32)" }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      padding: "0.875rem 2rem",
                      borderRadius: "0.75rem",
                      cursor: status === "sending" ? "wait" : "pointer",
                      opacity: status === "sending" ? 0.7 : 1,
                      border: "none",
                    }}
                  >

                    {status === "sending" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          style={{
                            display: "block",
                            width: "1rem",
                            height: "1rem",
                            border: "2px solid white",
                            borderTopColor: "transparent",
                            borderRadius: "50%",
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                    <Ripple color="rgba(255,255,255,0.25)" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginTop: "5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(37,45,61,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.6875rem",
              color: "#2d3748",
            }}
          >
            &copy; 2026 Akash Pillai. Built with Next.js + motion.dev + R3F.
          </span>
          <span
            className="gradient-text"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.6875rem",
            }}
          >
            Always building
          </span>
        </motion.div>
      </div>
    </section>
  );
}
