// Services.tsx
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Globe, Smartphone, LayoutDashboard, Server, Wrench, RefreshCw } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const services = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Web Platforms",
    desc: "Custom dashboard, SaaS, atau portal perusahaan dengan Next.js yang SEO-ready dan lightning fast.",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Solutions",
    desc: "Satu codebase untuk iOS & Android menggunakan Flutter atau React Native tanpa kompromi performa.",
    tags: ["Flutter", "React Native", "Firebase"],
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Backend Arsitektur",
    desc: "Database solid dan API aman menggunakan Laravel untuk skala pengguna besar dan traffic tinggi.",
    tags: ["Laravel", "PostgreSQL", "Redis"],
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Audit & Optimasi",
    desc: "Analisis performa, audit keamanan, dan optimasi database untuk aplikasi yang lemot.",
    tags: ["Audit", "MySQL", "Scalability"],
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Deep Debugging",
    desc: "Menyelesaikan bug kompleks yang menghambat bisnis Anda secara cepat dan tuntas.",
    tags: ["Debugging", "Bug Fix", "Refactor"],
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "SLA & Maintenance",
    desc: "Dukungan teknis berkala dan update fitur untuk memastikan aplikasi tetap berjalan optimal.",
    tags: ["Support", "Update", "Security"],
  },
];

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" className="section-container">
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-badge mb-4 block w-fit mx-auto uppercase tracking-widest font-bold text-[10px]">
            Expertise
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">
            Apa yang Bisa{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              Saya Kerjakan
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Dari ideasi sampai deployment, saya siap bantu mewujudkan produk digital Anda.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 group"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/25 transition-colors">
                {svc.icon}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-white text-base mb-1">{svc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {svc.tags.map((tag, ti) => (
                  <span key={ti} className="tech-badge !text-[11px]">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-8 text-center border-indigo-500/20"
          style={{ borderColor: "rgba(63,81,181,0.25)" }}
        >
          <h3 className="font-heading font-bold text-white text-xl md:text-2xl mb-2">
            Ada Project di Benak Anda?
          </h3>
          <p className="text-slate-400 text-sm md:text-base mb-6 max-w-md mx-auto">
            Ceritakan kebutuhanmu dan kita diskusikan solusi terbaik bersama. Gratis konsultasi awal!
          </p>
          <a
            href="https://wa.me/6282371663414?text=Halo%20Ahmat%2C%20saya%20ingin%20diskusi%20project%20bersama%20Lexanova"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-indigo inline-flex"
            id="services-cta-wa"
          >
            <FaWhatsapp className="w-5 h-5 text-green-300" />
            Diskusi Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
