"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/app/data/resume";
import Ripple from "@/app/components/ui/Ripple";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Scroll spy — highlight nav link whose section is most visible in viewport
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1)); // strip "#"

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveLink(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px", // trigger when section is in the middle band
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveLink(href);

    if (menuOpen) {
      // Close the menu first, then scroll after the animation finishes (300ms)
      setMenuOpen(false);
      setTimeout(() => {
        const target = document.querySelector(href) as HTMLElement | null;
        if (target) {
          const offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }, 320);
    } else {
      const target = document.querySelector(href) as HTMLElement | null;
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(15,17,23,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(37,45,61,0.8)" : "none",
        transition: "background-color 0.3s, backdrop-filter 0.3s, border-bottom 0.3s",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className="section-inner flex items-center justify-between"
        style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Akash Pillai"
            style={{ height: "2.25rem", width: "auto", display: "block" }}
          />
        </motion.a>

        {/* Desktop nav */}
        <ul
          className="hidden md:flex items-center"
          style={{ gap: "0.25rem", listStyle: "none" }}
        >
          {navLinks.map((link, i) => {
            const isActive = activeLink === link.href;
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                style={{ position: "relative" }}
              >
                {/* Sliding pill background */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "0.5rem",
                      background: "rgba(0,180,255,0.1)",
                      border: "1px solid rgba(0,180,255,0.25)",
                    }}
                  />
                )}
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    position: "relative",
                    display: "block",
                    padding: "0.375rem 0.875rem",
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "0.875rem",
                    color: isActive ? "#00b4ff" : "#7a8599",
                    textDecoration: "none",
                    borderRadius: "0.5rem",
                    transition: "color 0.2s",
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#e4e8f0";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#7a8599";
                  }}
                >
                  {link.label}
                </a>
              </motion.li>
            );
          })}
        </ul>

        {/* Social icon links + CTA */}
        <div className="hidden md:flex items-center" style={{ gap: "0.75rem" }}>
          {[
            { icon: Github,   href: personalInfo.github,   label: "GitHub" },
            { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.1, color: "#00b4ff" }}
              whileTap={{ scale: 0.93 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "0.5rem",
                color: "#7a8599",
                border: "1px solid rgba(37,45,61,0.7)",
                background: "rgba(22,27,39,0.5)",
                textDecoration: "none",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00b4ff";
                e.currentTarget.style.borderColor = "rgba(0,180,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#7a8599";
                e.currentTarget.style.borderColor = "rgba(37,45,61,0.7)";
              }}
            >
              <Icon size={14} />
            </motion.a>
          ))}

          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="btn btn-outline"
            style={{ padding: "0.5rem 1.5rem", fontSize: "0.8125rem" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Hire Me
            <Ripple color="rgba(0,180,255,0.25)" />
          </motion.a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[
            { animate: { rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 } },
            { animate: { opacity: menuOpen ? 0 : 1 } },
            { animate: { rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 } },
          ].map((item, i) => (
            <motion.span
              key={i}
              className="block w-6 h-0.5"
              style={{ backgroundColor: "#e4e8f0" }}
              animate={item.animate}
              transition={{ duration: 0.2 }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ backgroundColor: "rgba(15,17,23,0.97)", backdropFilter: "blur(16px)" }}
      >
        <ul
          className="flex flex-col"
          style={{ padding: "1rem clamp(1.5rem, 5vw, 4rem) 1.5rem", gap: "1.25rem", listStyle: "none" }}
        >
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "1rem",
                    color: isActive ? "#00b4ff" : "#7a8599",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00b4ff")}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#7a8599";
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.header>
  );
}
