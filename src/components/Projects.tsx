// Projects.tsx
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ExternalLink, Github, Lock, Play } from "lucide-react";

interface Project {
  category: string;
  title: string;
  tagline: string;
  problem: string;
  features: string[];
  techs: string[];
  youtubeId?: string;
  githubUrl?: string;
  demoUrl?: string;
  status: "completed" | "in-progress";
}

const projects: Project[] = [
  {
    category: "SaaS",
    title: "POS System — Kasir Digital",
    tagline: "Sistem kasir modern untuk usaha ritel & F&B",
    problem:
      "Kasir manual lambat, stok sering tidak tercatat, dan laporan harian memakan waktu berjam-jam.",
    features: [
      "Transaksi real-time dengan stock auto-update",
      "Multi-role (Admin, Kasir, Manajer)",
      "Laporan harian & ekspor PDF/Excel",
      "Mode offline — tetap berjalan tanpa internet",
    ],
    techs: ["Laravel", "React", "MySQL", "Inertia.js"],
    youtubeId: "",
    githubUrl: "#",
    demoUrl: "#",
    status: "completed",
  },
  {
    category: "E-Commerce",
    title: "Flower Shop E-Commerce",
    tagline: "Toko online bunga dengan manajemen inventaris terintegrasi",
    problem:
      "Pemilik toko kesulitan mengelola order online, stok, dan pengiriman dari berbagai platform sekaligus.",
    features: [
      "Admin dashboard manajemen produk & order",
      "Payment gateway (Midtrans)",
      "Order tracking real-time untuk pelanggan",
      "Notifikasi WhatsApp otomatis",
    ],
    techs: ["Laravel", "React", "MySQL", "Tailwind", "Midtrans"],
    youtubeId: "",
    githubUrl: "https://github.com/yourusername/flower-shop",
    demoUrl: "https://demo-flower-shop.vercel.app",
    status: "completed",
  },
  {
    category: "Mobile App",
    title: "Finance Tracker App",
    tagline: "Aplikasi keuangan personal yang intuitif & insightful",
    problem:
      "Banyak orang tidak tahu ke mana uang mereka pergi setiap bulan karena tidak ada pencatatan yang mudah.",
    features: [
      "Kategorisasi pemasukan & pengeluaran",
      "Budget planner bulanan",
      "Grafik & laporan visual",
      "Backup & sinkronisasi cloud",
    ],
    techs: ["React Native", "Expo", "Firebase", "Redux"],
    youtubeId: "",
    githubUrl: "https://github.com/yourusername/finance-tracker",
    demoUrl: "#",
    status: "completed",
  },
  {
    category: "SaaS",
    title: "Task Management Platform",
    tagline: "Kolaborasi tim yang lebih efektif dan terstruktur",
    problem:
      "Tim kesulitan tracking progress pekerjaan, sering terjadi miscommunication dan deadline terlewat.",
    features: [
      "Real-time collaboration dengan Socket.io",
      "Assign task, due date, dan prioritas",
      "File attachment & komentar per task",
      "Progress tracking & dashboard tim",
    ],
    techs: ["Next.js", "Node.js", "Socket.io", "MongoDB"],
    youtubeId: "",
    githubUrl: "#",
    demoUrl: "#",
    status: "in-progress",
  },
];

function VideoPlaceholder({ youtubeId, title }: { youtubeId: string; title: string }) {
  if (youtubeId) {
    return (
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="video-wrapper flex items-center justify-center" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(63,81,181,0.12) 0%, rgba(26,31,53,0.6) 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem",
        }}
      >
        <div className="w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center animate-pulse-glow">
          <Play className="w-6 h-6 text-indigo-300 ml-0.5" />
        </div>
        <span className="text-xs text-slate-500 font-medium">Video Demo Coming Soon</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Video Area */}
      <VideoPlaceholder youtubeId={project.youtubeId ?? ""} title={project.title} />

      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="section-badge text-xs mb-2 inline-block">{project.category}</span>
            <h3 className="font-heading font-bold text-white text-lg leading-snug">{project.title}</h3>
            <p className="text-slate-500 text-sm mt-0.5">{project.tagline}</p>
          </div>
          <span
            className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border ${
              project.status === "completed"
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
          >
            {project.status === "completed" ? "✓ Selesai" : "🔄 In Progress"}
          </span>
        </div>

        {/* Problem */}
        <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
            💡 Masalah yang Diselesaikan
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">{project.problem}</p>
        </div>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            ✅ Fitur Utama
          </p>
          <ul className="space-y-1.5">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techs.map((tech, i) => (
              <span key={i} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-indigo-500/10">
          {project.githubUrl && project.githubUrl !== "#" ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200 border border-slate-700/40 hover:border-slate-600"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/30 text-slate-600 text-sm font-medium cursor-not-allowed border border-slate-800/40"
            >
              <Lock className="w-4 h-4" />
              Private
            </button>
          )}
          {project.demoUrl && project.demoUrl !== "#" ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-indigo-500/30"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/20 text-indigo-400/50 text-sm font-medium cursor-not-allowed border border-indigo-500/10"
            >
              <ExternalLink className="w-4 h-4" />
              Soon
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="projects" className="section-container">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-badge mb-4 block w-fit mx-auto">My Work</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Project yang Pernah{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              Saya Bangun
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Setiap project di bawah ini punya video demo yang menunjukkan cara kerjanya secara langsung.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            <Github className="w-5 h-5" />
            Lihat Semua di GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
