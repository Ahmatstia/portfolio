// About.tsx
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Zap, Target, Heart } from "lucide-react";

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const values = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Berorientasi Hasil",
      desc: "Setiap baris kode yang saya tulis punya tujuan: menyelesaikan masalah bisnis kamu secara nyata.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Cepat & Tepat",
      desc: "Deadline adalah prioritas. Saya terbiasa bekerja dalam ritme cepat tanpa mengorbankan kualitas.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Komunikasi Terbuka",
      desc: "Saya update progress secara rutin dan selalu terbuka untuk diskusi agar hasilnya sesuai ekspektasi.",
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
          className="text-center mb-12"
        >
          <span className="section-badge mb-4 block w-fit mx-auto">About Me</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Developer yang{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              Berfokus pada Solusi
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Saya <span className="text-white font-medium">Ahmatstia</span>, founder di balik{" "}
            <span className="text-indigo-300 font-bold">Lexanova</span>. Sebagai Mahasiswa Teknik Informatika,
            saya berfokus pada pengembangan aplikasi web dan mobile dengan standar kualitas tinggi.
            Misi saya adalah membangun sistem yang{" "}
            <span className="text-white font-medium">benar-benar berguna</span> dan menghasilkan value nyata bagi bisnis kamu.
          </p>
        </motion.div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-4">
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
      </div>
    </section>
  );
}
