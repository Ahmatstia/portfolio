// Hero.tsx
import { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo.jpeg";
import { motion, useInView, animate } from "framer-motion";
import { Briefcase, ChevronDown, CheckCircle, Users, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const TYPING_TEXTS = [
  "Membangun Code yang Menghasilkan.",
  "Menerjemahkan Ide ke Produk Digital.",
  "Solusi SaaS & Mobile Tanpa Ribet.",
];

// Static particles generation outside to keep the component pure
const HERO_PARTICLES = [...Array(6)].map(() => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  blur: `${Math.random() * 2}px`
}));

// --- ANIMATED COUNTER COMPONENT ---
function Counter({ value, suffix = "" }: { value: string, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(0, numericValue, {
        duration: 2,
        onUpdate(value) {
          node.textContent = Math.round(value).toString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [inView, numericValue, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

// --- STAT ITEM ---
function StatItem({ icon, value, label, delay }: { icon: React.ReactNode, value: string, label: string, delay: number }) {
  const suffix = value.replace(/[0-9]/g, "");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center sm:items-start gap-1"
    >
      <div className="flex items-center gap-2.5">
        <div className="text-indigo-400/80">{icon}</div>
        <span className="font-heading font-bold text-2xl text-white tracking-tight">
          <Counter value={value} suffix={suffix} />
        </span>
      </div>
      <div className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-semibold ml-0.5">
        {label}
      </div>
    </motion.div>
  );
}

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
    { icon: <Briefcase className="w-4 h-4" />, value: "10+", label: "Projects Selesai" },
    { icon: <Users className="w-4 h-4"    />, value: "100%", label: "Satisfaction" },
    { icon: <Star className="w-4 h-4"     />, value: "3+", label: "Thn Pengalaman" },
    { icon: <CheckCircle className="w-4 h-4" />, value: "24h", label: "Response" },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden pt-20">
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0">
        <div className="flex flex-col md:flex-row font-black leading-none text-white/[0.025] uppercase tracking-tighter text-[15vh] md:text-[25vw]" 
             style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}>
          {"LEXANOVA".split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px] animate-aurora mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[100px] animate-aurora" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-indigo-500/15 blur-[140px] animate-pulse" />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        {HERO_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/50 rounded-full animate-float-particle"
            style={{ top: p.top, left: p.left, animationDelay: p.delay, filter: `blur(${p.blur})` }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1.5px, transparent 1.5px),
                            linear-gradient(90deg, rgba(139,92,246,0.3) 1.5px, transparent 1.5px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* --- CONTENT AREA --- */}
      <div className="max-w-5xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 section-badge mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Freelance Developer — Open for Projects</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8"
        >
          <h1 className="font-heading font-extrabold text-4xl sm:text-7xl md:text-8xl leading-tight text-white mb-2">
            <span className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-200 bg-clip-text text-transparent">
              {displayed}
            </span>
            <span className="text-indigo-300 animate-blink">|</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 text-base sm:text-xl leading-relaxed mb-14 max-w-3xl mx-auto flex items-center justify-center gap-3"
        >
          <img src={logo} alt="Lexanova" className="w-9 h-9 rounded-full border border-indigo-500/20" />
          <span>
            Saya <span className="text-white font-medium">Ahmatstia</span>, spesialis{" "}
            <span className="text-indigo-300 font-semibold">Laravel · Next.js · Flutter · React Native</span>
            {" "}— Membangun solusi digital premium di bawah bendera <span className="text-indigo-300 font-bold">Lexanova</span>.
          </span>
        </motion.p>

        <div className="flex flex-col items-center gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-indigo px-10 py-4 text-lg"
              id="hero-cta-projects"
            >
              <ChevronDown className="w-5 h-5" />
              Lihat Project Saya
            </button>
            <a
              href="https://wa.me/6282371663414?text=Halo%20Ahmat%2C%20saya%20tertarik%20dengan%20jasa%20development%20kamu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-10 py-4 text-lg"
              id="hero-cta-wa"
            >
              <FaWhatsapp className="w-5 h-5 text-green-400" />
              Chat via WhatsApp
            </a>
          </motion.div>

          {/* Minimal Stats Row */}
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 border-t border-white/5 pt-10 w-full max-w-4xl">
            {stats.map((stat, i) => (
              <StatItem key={i} {...stat} delay={0.6 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
