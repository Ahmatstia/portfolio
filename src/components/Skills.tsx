// Skills.tsx
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  SiLaravel, SiNextdotjs, SiReact, SiFlutter,
  SiMysql, SiPostgresql, SiTypescript, SiTailwindcss,
  SiGit, SiNodedotjs, SiFirebase, SiDocker,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const skillGroups: { label: string; skills: Skill[] }[] = [
  {
    label: "Backend",
    skills: [
      { name: "Laravel",    icon: <SiLaravel />,    color: "#FF2D20" },
      { name: "Node.js",    icon: <SiNodedotjs />,  color: "#339933" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    ],
  },
  {
    label: "Frontend & Mobile",
    skills: [
      { name: "Next.js",      icon: <SiNextdotjs />,    color: "#ffffff" },
      { name: "React.js",     icon: <SiReact />,        color: "#61DAFB" },
      { name: "React Native", icon: <SiReact />,        color: "#61DAFB" },
      { name: "Flutter",      icon: <SiFlutter />,      color: "#54C5F8" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />,  color: "#38BDF8" },
    ],
  },
  {
    label: "Database & DevOps",
    skills: [
      { name: "MySQL",      icon: <SiMysql />,      color: "#4479A1" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "Firebase",   icon: <SiFirebase />,   color: "#FFCA28" },
      { name: "Docker",     icon: <SiDocker />,     color: "#2496ED" },
      { name: "Git",        icon: <SiGit />,        color: "#F05032" },
    ],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="section-container">
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-badge mb-4 block w-fit mx-auto">Tech Stack</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
            Tools yang Saya{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              Kuasai
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Tech stack yang saya gunakan sehari-hari untuk membangun produk yang cepat, stabil, dan scalable.
          </p>
        </motion.div>

        {/* Skill Groups */}
        <div className="space-y-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.12 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-500/20" />
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest font-body">
                  {group.label}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-500/20" />
              </div>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: gi * 0.1 + si * 0.05 }}
                    className="glass-card rounded-xl px-4 py-3 flex items-center gap-2.5 cursor-default group"
                  >
                    <span
                      className="text-xl transition-transform duration-200 group-hover:scale-110"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </span>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
