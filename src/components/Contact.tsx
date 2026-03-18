// Contact.tsx
import logo from "../assets/images/logo.jpeg";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Mail, Clock, MapPin } from "lucide-react";
import { FaWhatsapp, FaGithub, FaLinkedin, FaTiktok, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const socials = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/Ahmatstia",
      color: "hover:text-white",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ahmat-setiadi-877b04262/",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      label: "Instagram",
      href: "https://www.instagram.com/lexanova.official/",
      color: "hover:text-pink-400",
    },
    {
      icon: <FaTiktok className="w-5 h-5" />,
      label: "TikTok",
      href: "https://www.tiktok.com/@lexanova_",
      color: "hover:text-cyan-400",
    },
  ];

  return (
    <section id="contact" className="section-container">
      <div ref={ref} className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="section-badge mb-4 block w-fit mx-auto">Contact</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Siap Mulai{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              Project Bareng?
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Ceritakan kebutuhanmu — saya akan respon dalam{" "}
            <span className="text-white font-medium">kurang dari 24 jam</span>.
          </p>
        </motion.div>

        {/* Info chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm text-indigo-300">
            <Clock className="w-4 h-4" /> Respon &lt; 24 Jam
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm text-indigo-300">
            <MapPin className="w-4 h-4" /> Remote / On-site (Indonesia)
          </div>
        </motion.div>

        {/* Primary CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4 mb-8"
        >
          {/* WhatsApp — Primary */}
          <a
            href="https://wa.me/6282371663414?text=Halo%20Ahmat%2C%20saya%20tertarik%20bekerja%20sama%20dengan%20Lexanova.%20Boleh%20kita%20diskusi%3F"
            target="_blank"
            rel="noopener noreferrer"
            id="contact-wa"
            className="group flex items-center gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/15 hover:border-green-500/35 transition-all duration-300 text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-200 shrink-0">
              <FaWhatsapp className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-semibold text-white text-base">Chat via WhatsApp</div>
              <div className="text-slate-400 text-sm">+62 823-7166-3414 · Ahmatstia</div>
            </div>
            <div className="ml-auto text-slate-600 group-hover:text-green-400 transition-colors">→</div>
          </a>

          <a
            href="mailto:ahmatstay07@gmail.com?subject=Project%20Collaboration&body=Halo%20Ahmat%2C%20saya%20ingin%20mendiskusikan%20project%20bersama%20Lexanova."
            id="contact-email"
            className="group flex items-center gap-4 p-5 rounded-2xl glass-card text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-200 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-semibold text-white text-base">Kirim Email</div>
              <div className="text-slate-400 text-sm">ahmatstay07@gmail.com</div>
            </div>
            <div className="ml-auto text-slate-600 group-hover:text-indigo-400 transition-colors">→</div>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="text-slate-500 text-sm">Atau temukan saya di:</span>
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-slate-500 ${s.color} transition-colors duration-200`}
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-indigo-500/10 text-center text-slate-600 text-sm flex flex-col items-center gap-3">
        <img src={logo} alt="Lexanova" className="w-8 h-8 rounded-full opacity-60 grayscale hover:grayscale-0 transition-all" />
        <p>
          Built with ❤️ by{" "}
          <span className="text-indigo-400 font-medium">Lexanova</span> · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
