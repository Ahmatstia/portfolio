// Home.tsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="bg-[#0d0f1a] text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}
