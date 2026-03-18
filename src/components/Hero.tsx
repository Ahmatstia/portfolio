// Hero.tsx
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.jpeg";
import { motion } from "framer-motion";
import { Briefcase, ChevronDown, CheckCircle, Users, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const TYPING_TEXTS = [
  "Membangun Code yang Menghasilkan.",
  "Menerjemahkan Ide ke Produk Digital.",
  "Solusi SaaS & Mobile Tanpa Ribet.",
];

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");

  useEffect(() => {
    const currentLine = TYPING_TEXTS[lineIndex];
    if (phase === "typing") {
      if (charIndex < currentLine.length) {
        const t = setTimeout(() => {
          setDisplayed(currentLine.substring(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pause"), 1800);
        return () => clearTimeout(t);
      }
    }
    if (phase === "pause") {
      const t = setTimeout(() => setPhase("erasing"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "erasing") {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(currentLine.substring(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 28);
        return () => clearTimeout(t);
      } else {
        const nextLine = (lineIndex + 1) % TYPING_TEXTS.length;
        setTimeout(() => {
          setLineIndex(nextLine);
          setPhase("typing");
        }, 10);
      }
    }
  }, [phase, charIndex, lineIndex]);

  const stats = [
    { icon: <Briefcase className="w-5 h-5" />, value: "10+", label: "Projects Selesai" },
    { icon: <Users className="w-5 h-5"    />, value: "100%", label: "Client Satisfaction" },
    { icon: <Star className="w-5 h-5"     />, value: "3+", label: "Tahun Pengalaman" },
    { icon: <CheckCircle className="w-5 h-5" />, value: "24h", label: "Response Time" },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(63,81,181,0.18)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_80%,rgba(63,81,181,0.08)_0%,transparent_55%)] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/3 right-0 w-[380px] h-[380px] rounded-full bg-indigo-500/5 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-indigo-700/5 blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 section-badge mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Freelance Developer — Open for Projects</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6"
        >
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight text-white mb-2">
            <span className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 bg-clip-text text-transparent">
              {displayed}
            </span>
            <span className="text-indigo-300 animate-blink">|</span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto flex items-center justify-center gap-3"
        >
          <img src={logo} alt="Lexanova" className="w-8 h-8 rounded-full border border-indigo-500/20" />
          <span>
            Saya <span className="text-white font-medium">Ahmatstia</span>, spesialis{" "}
            <span className="text-indigo-300 font-semibold">Laravel · Next.js · Flutter · React Native</span>
            {" "}— Membangun solusi digital premium di bawah bendera <span className="text-indigo-300 font-bold">Lexanova</span>.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-indigo w-full sm:w-auto"
            id="hero-cta-projects"
          >
            <ChevronDown className="w-5 h-5" />
            Lihat Project Saya
          </button>
          <a
            href="https://wa.me/6282371663414?text=Halo%20Tedi%2C%20saya%20tertarik%20dengan%20jasa%20development%20kamu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto"
            id="hero-cta-wa"
          >
            <FaWhatsapp className="w-5 h-5 text-green-400" />
            Chat via WhatsApp
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-4 flex flex-col items-center gap-1 text-center"
            >
              <div className="text-indigo-400 mb-1">{stat.icon}</div>
              <div className="font-heading font-bold text-2xl text-white">{stat.value}</div>
              <div className="text-slate-500 text-xs leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 text-xs"
      >
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
