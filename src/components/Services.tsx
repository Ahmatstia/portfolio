// Services.tsx
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Globe, Smartphone, LayoutDashboard, Server, Wrench, RefreshCw } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const services = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Website & Web App",
    desc: "Landing page, company profile, web app, hingga platform SaaS. Dibangun dengan Next.js atau Laravel.",
    tags: ["Next.js", "Laravel", "React"],
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Aplikasi Mobile",
    desc: "Aplikasi Android & iOS yang smooth dan intuitif menggunakan Flutter atau React Native.",
    tags: ["Flutter", "React Native", "Expo"],
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Sistem Informasi & Dashboard",
    desc: "Dashboard admin, sistem manajemen bisnis, laporan data real-time untuk keperluan internal.",
    tags: ["Laravel", "Inertia.js", "Chart.js"],
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "REST API & Backend",
    desc: "API backend yang terstruktur, aman, dan mudah diintegrasikan ke front-end atau aplikasi mobile.",
    tags: ["Laravel", "Node.js", "MySQL"],
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Perbaikan Bug",
    desc: "Ada bug yang bikin frustasi? Saya bantu diagnosa dan perbaiki secara cepat dan tuntas.",
    tags: ["Debugging", "Audit", "Fix"],
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Maintenance & Update",
    desc: "Perawatan berkala, update fitur, dan optimasi performa aplikasi yang sudah berjalan.",
    tags: ["Maintenance", "Optimization"],
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
          <span className="section-badge mb-4 block w-fit mx-auto">Services</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Apa yang Bisa{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              Saya Kerjakan
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Dari ideasi sampai deployment, saya siap bantu mewujudkan produk digital kamu.
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
            Ada Project di Benak Kamu?
          </h3>
          <p className="text-slate-400 text-sm md:text-base mb-6 max-w-md mx-auto">
            Ceritakan kebutuhanmu dan kita diskusikan solusi terbaik bersama. Gratis konsultasi awal!
          </p>
          <a
            href="https://wa.me/6282371663414?text=Halo%20Tedi%2C%20saya%20ingin%20diskusi%20project%20bersama%20kamu"
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
