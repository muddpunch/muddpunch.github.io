import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import avatar from "../assets/mug-avatar.png";
import htmlIcon from "../assets/tech/html.png";
import cssIcon from "../assets/tech/css.png";
import jsIcon from "../assets/tech/javascript.png";
import goIcon from "../assets/tech/golang.png";
import csharpIcon from "../assets/tech/csharp.png";
import pythonIcon from "../assets/tech/python.png";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  tone: "oxide" | "signal" | "green";
};

type TextCard = [string, string];

const ease = [0.22, 1, 0.36, 1] as const;

const tech = [
  ["HTML", htmlIcon],
  ["CSS", cssIcon],
  ["JavaScript", jsIcon],
  ["Golang", goIcon],
  ["C sharp", csharpIcon],
  ["Python", pythonIcon],
] as const;

const projects: Project[] = [
  {
    title: "Chat control encrypter/decrypter",
    desc: "Made because of European Union, big sis is always watching.",
    tags: ["Tool", "Freedom", "Python"],
    tone: "oxide",
  },
  {
    title: "HalfSword Enhancer",
    desc: "Just a normal injector for modifying Half Sword game. Used for fun!",
    tags: ["Injector", "Half Sword", "C#"],
    tone: "signal",
  },
];

const skills: TextCard[] = [
  ["Frontend", "Semantic HTML, modern CSS, JavaScript, React-style UI thinking, responsive layouts."],
  ["Backend flow", "APIs, project structure, naming, practical refactors, service-level thinking."],
  ["Debugging", "Reading logs, tracing weird states, mapping broken data, testing assumptions quickly."],
  ["Tooling", "Small utilities, automation-minded workflows, desktop-adjacent experiments."],
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

function App() {
  return (
    <>
      <CursorLight />
      <section id="top" className="discord-landing" aria-label="Discord profile preview">
        <motion.article className="discord-card" initial={{ opacity: 0, y: 42, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.75, ease }}>
          <div className="discord-banner" />
          <motion.div className="discord-body" variants={stagger} initial="hidden" animate="show">
            <motion.img className="discord-avatar" src={avatar} alt="mudd profile avatar" variants={fadeUp} />
            <motion.div className="discord-name-row" variants={fadeUp}>
              <h1>mudd</h1>
              <div className="tech-logos" aria-label="Tech stack">
                {tech.map(([label, src]) => (
                  <img src={src} alt={label} key={label} />
                ))}
              </div>
            </motion.div>
            <motion.p className="discord-handle" variants={fadeUp}>@23m.ev</motion.p>
            <motion.p className="discord-note" variants={fadeUp}>
              A guy from a little village in poland. Backend developer with some little frontend knowledge. I study networking and proggramming is my little hobby. I test websites for security risks. I sometimes build tools for my personal use or for someone. If you want to get to know me more feel free to send me a private message on discord!
            </motion.p>
          </motion.div>
        </motion.article>
        <motion.span className="discord-scroll-label" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.85, ease }}>scroll</motion.span>
      </section>

      <main id="main">
        <motion.section className="hero" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} aria-labelledby="hero-title">
          <div className="hero-copy">
            <motion.h1 id="hero-title" variants={fadeUp}>I build things that have a purpose.</motion.h1>
            <motion.p className="hero-lead" variants={fadeUp}>Code. Fail. Learn. Repeat.</motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="btn primary" href="https://github.com/muddpunch" target="_blank" rel="noopener noreferrer">Github</a>
              <a className="btn ghost" href="#work">Projects</a>
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="stats" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} aria-label="Quick facts">
          {[ ["3+", "years learning by building real things"], ["20+", "websites, tools, backends"], ["Windows?", "trash"] ].map(([value, label]) => (
            <motion.article variants={fadeUp} key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </motion.article>
          ))}
        </motion.section>

        <section id="work" className="section" aria-labelledby="work-title">
          <motion.div className="section-head" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <h2 id="work-title">My favourite projects!</h2>
          </motion.div>
          <motion.div className="project-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
          </motion.div>
        </section>

        <motion.section id="about" className="section split" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} aria-labelledby="about-title">
          <motion.div variants={fadeUp}>
            <h1 id="about-title">I like simple systems that survive real usage.</h1>
          </motion.div>
          <motion.div className="about-copy" variants={fadeUp}>
            <p>
              My work is not one narrow lane. I build pages, backend flows, desktop-style utilities, and game-adjacent tooling. I like messy problems where logs, APIs, UI states, and user experience all have to line up before something feels finished.
            </p>
            <div className="skills">
              {skills.map(([title, desc]) => <InfoCard title={title} desc={desc} className="skill" key={title} />)}
            </div>
          </motion.div>
        </motion.section>

      </main>

      <footer className="footer">
        <span>mudd</span>
        <span>Personal portfolio, 2026</span>
      </footer>
    </>
  );
}

function CursorLight() {
  const mx = useMotionValue(-240);
  const my = useMotionValue(-240);
  const x = useSpring(mx, { stiffness: 420, damping: 34, mass: 0.22 });
  const y = useSpring(my, { stiffness: 420, damping: 34, mass: 0.22 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      mx.set(event.clientX - 90);
      my.set(event.clientY - 90);
    };

    const leave = () => {
      mx.set(-240);
      my.set(-240);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [mx, my]);

  return (
    <motion.div className="cursor-light" aria-hidden="true">
      <motion.div className="cursor-light-dot" style={{ x, y }} />
    </motion.div>
  );
}
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article className={`project ${project.tone}`} variants={fadeUp} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <h3>{project.title}</h3>
      <p>{project.desc}</p>
      <div className="tags">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </motion.article>
  );
}

function InfoCard({ title, desc, className }: { title: string; desc: string; className: string }) {
  return (
    <motion.article className={className} variants={fadeUp}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </motion.article>
  );
}

export default App;
