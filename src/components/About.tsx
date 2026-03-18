// About.tsx
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Zap, Target, Heart } from "lucide-react";

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const values = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Business-First",
      desc: "Teknologi cuma alat. Fokus saya adalah bagaimana aplikasi ini bisa menghasilkan ROI buat kamu.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Built to Scale",
      desc: "Saya memastikan aplikasi kamu cepat, scalable, dan tidak boros sumber daya server.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Proactive Communication",
      desc: "Gak ada istilah 'ghosting'. Update progress rutin dan diskusi terbuka adalah standar kerja saya.",
    },
  ];

  return (
    <section id="about" className="section-container">
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 block w-fit mx-auto uppercase tracking-widest font-bold text-[10px]">
            The Person Behind Code
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-6">
            Kenapa Kerja Sama{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              Dengan Saya?
            </span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Halo, saya <span className="text-white font-medium italic underline decoration-indigo-500">Ahmatstia</span>. 
              Saya memulai perjalanan ini dari rasa penasaran bagaimana raksasa teknologi membangun sistem mereka. 
              Hari ini, saya menggunakan pengalaman itu untuk membangun <span className="text-indigo-300 font-bold uppercase tracking-wider">Lexanova</span>.
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Banyak developer yang bisa coding, tapi sedikit yang mengerti **value bisnis**. 
              Saya di sini untuk menjembatani itu — memastikan setiap baris kode yang saya tulis punya dampak langsung pada pertumbuhan bisnis Anda.
            </p>
          </div>
        </motion.div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-20">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                {v.icon}
              </div>
              <h3 className="font-heading font-semibold text-white text-base">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* --- TECH ARSENAL --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/5 pt-16"
        >
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3">
              <h3 className="font-heading font-bold text-2xl text-white mb-4 italic">Tech Arsenal</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Tech stack yang saya pilih bukan cuma karena tren, tapi karena keunggulannya dalam performa, scalability, dan kecepatan development.
              </p>
            </div>
            
            <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-indigo-300 text-[10px] uppercase tracking-widest font-bold mb-4">Web Core</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> Next.js (React)</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> Laravel (PHP)</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h4 className="text-indigo-300 text-[10px] uppercase tracking-widest font-bold mb-4">Mobile Hub</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> Flutter</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> React Native</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> Firebase</li>
                </ul>
              </div>
              <div>
                <h4 className="text-indigo-300 text-[10px] uppercase tracking-widest font-bold mb-4">Infrastructure</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> MySQL / PostgreSQL</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> REST API / GraphQL</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 bg-indigo-500 rounded-full" /> Vercel / VPS</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
