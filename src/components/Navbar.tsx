// Navbar.tsx
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const scrollProgress = document.getElementById("scroll-progress");
      if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
        scrollProgress.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        id="scroll-progress" 
        className="fixed top-0 left-0 w-full h-[3px] bg-indigo-500 origin-left z-[100] transition-transform duration-75"
        style={{ transform: "scaleX(0)" }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#0d0f1a]/80 backdrop-blur-lg border-b border-indigo-500/10 shadow-lg shadow-indigo-500/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300 shadow-lg shadow-indigo-500/10">
                <img src={logo} alt="Lexanova" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl tracking-tighter text-white uppercase leading-none">
                  Lexanova
                </span>
                <span className="text-[10px] text-indigo-400 font-bold tracking-[0.2em] uppercase leading-none mt-1">
                  Ahmatstia
                </span>
              </div>
            </a>

            {/* Local Time Widget (Digital Move) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 tabular-nums">
                Lcl Time: {time.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href="https://wa.me/6282371663414"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-indigo !py-2 !px-5 !text-xs"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0d111d] border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-5 gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-lg font-medium text-slate-300 hover:text-indigo-400 p-2"
                  >
                    {item.name}
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </a>
                ))}
                <a
                  href="https://wa.me/6282371663414"
                  className="btn-indigo w-full mt-2"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
