import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.jpeg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "About",    href: "#about"    },
    { label: "Skills",   href: "#skills"   },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
  ];

  const handleNav = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0f1a]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-indigo-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-md shadow-indigo-500/20">
            <img 
              src={logo} 
              alt="Lexanova Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-heading font-800 text-xl text-white tracking-tight">
            Lexanova
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNav(item.href)}
                className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-indigo-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav("#contact")}
              className="btn-indigo !py-2.5 !px-5 !text-sm"
            >
              Hire Me
            </button>
          </li>
        </ul>

        {/* Mobile Burger */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#111827]/98 backdrop-blur-md border-t border-indigo-500/10 px-5 py-6 animate-fade-in">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-indigo-500/10 rounded-lg transition-all duration-200 font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => handleNav("#contact")}
                className="btn-indigo w-full"
              >
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
