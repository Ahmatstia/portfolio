// Hero.tsx — Mobile-First · Film-Intro LEXANOVA LOOP
import { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo.jpeg";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { Variants } from "framer-motion";

const TYPING_TEXTS = [
  "Membangun Code yang Menghasilkan.",
  "Menerjemahkan Ide ke Produk Digital.",
  "Solusi SaaS & Mobile Tanpa Ribet.",
];

const LEXANOVA_LETTERS = "LEXANOVA".split("");
const TECH_PILLS = [
  "Laravel",
  "Next.js",
  "Flutter",
  "React Native",
  "TypeScript",
];

const PARTICLES = [...Array(14)].map((_, i) => ({
  top: `${(i * 71) % 100}%`,
  left: `${(i * 53 + 17) % 100}%`,
  delay: (i * 0.7) % 5,
  duration: 8 + (i % 5),
  size: i % 3 === 0 ? "2px" : "1.5px",
  color:
    i % 3 === 0
      ? "rgba(99,102,241,0.7)"
      : i % 3 === 1
        ? "rgba(139,92,246,0.5)"
        : "rgba(56,189,248,0.4)",
}));

// Shared watermark letter style
const lexStyle: React.CSSProperties = {
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: "-0.02em",
  WebkitTextStroke: "1px rgba(99,102,241,0.13)",
  background:
    "linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(99,102,241,0.18) 40%,rgba(255,255,255,0.06) 65%,rgba(99,102,241,0.04) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text" as React.CSSProperties["backgroundClip"],
};

// Film-intro JUMP keyframes (including fade-out at end for looping)
const filmJumpLoop: Variants = {
  // hold state: settled & visible
  visible: (i: number) => ({
    opacity: [0, 1, 1, 1, 1, 0],
    y: [110, -16, 5, -7, 0, -24],
    scale: [0.42, 1.11, 0.97, 1.03, 1, 0.9],
    rotateX: [-40, 0, 0, 0, 0, 0],
    filter: [
      "blur(10px)",
      "blur(0px)",
      "blur(0px)",
      "blur(0px)",
      "blur(0px)",
      "blur(6px)",
    ],
    transition: {
      delay: i * 0.11,
      // total duration per letter = 1.15s anim + hold
      duration: 3.2,
      ease: [0.22, 1, 0.36, 1],
      times: [0, 0.3, 0.45, 0.58, 0.78, 1],
      repeat: Infinity,
      // gap before repeat
      repeatDelay: 2.0,
    },
  }),
};

// ── LOOPING LETTER ──
// Each letter animates independently with its own stagger delay, loops forever.
function LexLetter({
  letter,
  index,
  fontSize,
}: {
  letter: string;
  index: number;
  fontSize: string;
}) {
  return (
    <motion.span
      custom={index}
      variants={filmJumpLoop}
      initial={{
        opacity: 0,
        y: 110,
        scale: 0.42,
        rotateX: -40,
        filter: "blur(10px)",
      }}
      animate="visible"
      style={{ ...lexStyle, fontSize, display: "block" }}
    >
      {letter}
    </motion.span>
  );
}

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const [shimmerCycle, setShimmerCycle] = useState(0);
  const currentLine = TYPING_TEXTS[lineIndex] ?? "";

  // Timing controls (typewriter loop).
  // These also drive shimmer duration so both stay aligned.
  const typingCharMs = 5;
  const eraseCharMs = 55;
  const pauseAfterTypeMs = 1200;
  const pauseBeforeEraseMs = 750;

  // Align shimmer sweep duration to the typewriter loop timing for the current line.
  // Sweep shimmer only while the text is visible (typing + pause),
  // then fade it out right before the erasing phase starts.
  const typeMs = currentLine.length * typingCharMs;
  const shimmerVisibleDurationSec =
    (typeMs + pauseAfterTypeMs + pauseBeforeEraseMs) / 1000;

  const typeTimerRef = useRef<number | null>(null);
  useEffect(() => {
    const line = TYPING_TEXTS[lineIndex] ?? "";

    // Clear any pending timer to avoid "leftover ticks" on later cycles.
    if (typeTimerRef.current) {
      window.clearTimeout(typeTimerRef.current);
      typeTimerRef.current = null;
    }

    if (phase === "typing") {
      if (charIndex < line.length) {
        typeTimerRef.current = window.setTimeout(() => {
          setDisplayed(line.substring(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, typingCharMs);
      } else {
        typeTimerRef.current = window.setTimeout(
          () => setPhase("pause"),
          pauseAfterTypeMs,
        );
      }
    } else if (phase === "pause") {
      typeTimerRef.current = window.setTimeout(
        () => setPhase("erasing"),
        pauseBeforeEraseMs,
      );
    } else if (phase === "erasing") {
      if (charIndex > 0) {
        typeTimerRef.current = window.setTimeout(() => {
          setDisplayed(line.substring(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, eraseCharMs);
      } else {
        // Move to the next line with a micro-delay so React doesn't warn
        // about setState inside effect bodies.
        typeTimerRef.current = window.setTimeout(() => {
          setLineIndex((p) => (p + 1) % TYPING_TEXTS.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => {
      if (typeTimerRef.current) {
        window.clearTimeout(typeTimerRef.current);
        typeTimerRef.current = null;
      }
    };
  }, [phase, charIndex, lineIndex]);

  // Start shimmer precisely when typing begins for a new line.
  // This prevents mismatch caused by the small delay before `setPhase("typing")`.
  useEffect(() => {
    if (phase === "typing" && charIndex === 0) {
      // Defer state update to avoid "setState during effect" linting
      // and to keep animations aligned with the next paint.
      const t = window.setTimeout(() => {
        setShimmerCycle((s) => s + 1);
      }, 0);
      return () => window.clearTimeout(t);
    }
  }, [phase, charIndex, lineIndex]);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-5 relative overflow-hidden pt-20"
      style={{ perspective: "800px" }}
    >
      {/* ══ LEXANOVA DESKTOP — horizontal center (md+) ══ */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="relative flex items-center">
          {/* Horizontal shimmer sweep */}
          <motion.div
            key={`lex-shimmer-desktop-${shimmerCycle}`}
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-130%", opacity: 1 }}
            animate={{ x: "230%", opacity: 0 }}
            transition={{
              duration: shimmerVisibleDurationSec,
              ease: "linear",
            }}
            style={{
              width: "55%",
              background:
                "linear-gradient(105deg,transparent 30%,rgba(99,102,241,0.22) 50%,rgba(167,139,250,0.15) 55%,transparent 70%)",
            }}
          />
          {LEXANOVA_LETTERS.map((l, i) => (
            <LexLetter
              key={i}
              letter={l}
              index={i}
              fontSize="clamp(60px,14vw,200px)"
            />
          ))}
        </div>
      </div>

      {/* ══ LEXANOVA MOBILE — vertical CENTER (<md) ══ */}
      <div
        className="absolute flex md:hidden flex-col items-center pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
        style={{
          // Centered absolutely on mobile
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "90vh",
        }}
      >
        {/* Vertical shimmer sweep */}
        <motion.div
          key={`lex-shimmer-mobile-${shimmerCycle}`}
          className="absolute left-0 right-0 pointer-events-none"
          initial={{ y: "-130%", opacity: 1 }}
          animate={{ y: "230%", opacity: 0 }}
          style={{
            height: "65%",
            background:
              "linear-gradient(180deg,transparent 30%,rgba(99,102,241,0.22) 50%,rgba(167,139,250,0.15) 55%,transparent 70%)",
          }}
          transition={{
            duration: shimmerVisibleDurationSec,
            ease: "linear",
          }}
        />
        {LEXANOVA_LETTERS.map((l, i) => (
          <LexLetter
            key={i}
            letter={l}
            index={i}
            fontSize="clamp(52px,12vw,78px)"
          />
        ))}
      </div>

      {/* ══ BACKGROUND ATMOSPHERE ══ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 15, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
          style={{
            top: "-20%",
            left: "-10%",
            width: "65%",
            height: "70%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(79,70,229,0.30) 0%,rgba(99,102,241,0.10) 45%,transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, -10, 0], scale: [1, 1.04, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -6,
          }}
          className="absolute"
          style={{
            bottom: "-20%",
            right: "-10%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(139,92,246,0.22) 0%,rgba(99,102,241,0.08) 45%,transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: -3,
          }}
          className="absolute"
          style={{
            top: "20%",
            right: "6%",
            width: "30%",
            height: "32%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(56,189,248,0.10) 0%,transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.5) 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
            }}
            animate={{
              y: [0, -22, 0],
              opacity: [0.35, 0.9, 0.35],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════
          CONTENT
          — left aligned mobile
          — centered md+
      ══════════════════════════════════ */}
      <div className="max-w-5xl w-full relative z-10 text-left md:text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 mb-7"
          style={{
            padding: "8px 16px",
            borderRadius: "99px",
            border: "1px solid rgba(99,102,241,0.28)",
            background:
              "linear-gradient(135deg,rgba(99,102,241,0.13),rgba(99,102,241,0.05))",
            backdropFilter: "blur(14px)",
            boxShadow: "0 0 22px rgba(99,102,241,0.08)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-slate-300 text-xs font-semibold">
            Freelance Developer
          </span>
          <span
            className="w-px h-3"
            style={{ background: "rgba(99,102,241,0.35)" }}
          />
          <span
            className="text-xs font-bold"
            style={{
              background: "linear-gradient(90deg,#a5b4fc,#818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text" as React.CSSProperties["backgroundClip"],
            }}
          >
            Open for Projects
          </span>
        </motion.div>

        {/* Typewriter headline */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h1
            className="font-black leading-[0.92] tracking-tighter"
            style={{ fontSize: "clamp(2rem,8vw,5rem)" }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg,#e0e7ff 0%,#c7d2fe 22%,#a5b4fc 55%,#818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text" as React.CSSProperties["backgroundClip"],
              }}
            >
              {displayed}
            </span>
            <span
              className="animate-blink"
              style={{ color: "#818cf8", fontWeight: 200 }}
            >
              |
            </span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 md:mx-auto"
            style={{
              height: "1px",
              width: "110px",
              background:
                "linear-gradient(90deg,transparent,rgba(129,140,248,0.7),rgba(167,139,250,0.5),transparent)",
              transformOrigin: "left",
            }}
          />
        </motion.div>

        {/* Avatar + desc */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start gap-3 mb-5 md:justify-center md:items-center"
        >
          <div className="relative flex-shrink-0">
            <img
              src={logo}
              alt="Lexanova"
              className="w-11 h-11 rounded-full object-cover"
              style={{
                border: "2px solid rgba(99,102,241,0.45)",
                boxShadow:
                  "0 0 18px rgba(99,102,241,0.35),0 0 40px rgba(99,102,241,0.14)",
              }}
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{ background: "#10b981", borderColor: "#04040f" }}
            />
          </div>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg md:text-center">
            Saya <span className="text-white font-semibold">Ahmatstia</span>,
            spesialis{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#a5b4fc,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text" as React.CSSProperties["backgroundClip"],
                fontWeight: 700,
              }}
            >
              Laravel · Next.js · Flutter · React Native
            </span>{" "}
            — Membangun solusi digital premium di bawah bendera{" "}
            <span className="text-indigo-300 font-bold">Lexanova</span>.
          </p>
        </motion.div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2 mb-10 md:justify-center"
        >
          {TECH_PILLS.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.52 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="px-3 py-1.5 text-xs font-bold text-indigo-300 rounded-full uppercase cursor-default"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
                letterSpacing: "0.14em",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 mb-16 md:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            id="hero-cta-projects"
            className="group relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white text-sm overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#4f46e5 0%,#6366f1 55%,#7c3aed 100%)",
              boxShadow:
                "0 0 36px rgba(99,102,241,0.45),0 4px 24px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            Lihat Project Saya
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,255,255,0.12),transparent 60%)",
              }}
            />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/6282371663414?text=Halo%20Ahmat%2C%20saya%20tertarik%20dengan%20jasa%20development%20kamu"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-wa"
            className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-200 text-sm"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(14px)",
              transition: "background 0.3s,border-color 0.3s,box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(99,102,241,0.12)";
              el.style.borderColor = "rgba(99,102,241,0.45)";
              el.style.boxShadow = "0 0 24px rgba(99,102,241,0.18)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.boxShadow = "none";
            }}
          >
            <FaWhatsapp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            Chat via WhatsApp
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[9px] font-bold uppercase tracking-[0.35em]"
          style={{ color: "rgba(100,116,139,0.65)" }}
        >
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,rgba(99,102,241,0.6),transparent)",
            }}
            animate={{ y: ["-100%", "210%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(99,102,241,0.12)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
