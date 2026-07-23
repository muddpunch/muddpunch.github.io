import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import avatar from "../assets/mug-avatar.png";
import htmlIcon from "../assets/tech/html.png";
import cssIcon from "../assets/tech/css.png";
import jsIcon from "../assets/tech/javascript.png";
import goIcon from "../assets/tech/golang.png";
import csharpIcon from "../assets/tech/csharp.png";
import pythonIcon from "../assets/tech/python.png";
import chatcontrolPreview from "../assets/projects/chatcontrol-preview.png";
import halfSwordPreview from "../assets/projects/half-sword-preview.png";

type Project = {
  title: string;
  desc: string;
  tone: "oxide" | "signal" | "green";
  href: string;
  preview: string;
};

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
    tone: "oxide",
    href: "https://github.com/muddpunch/chatcontrol-encrypter-decrypter",
    preview: chatcontrolPreview,
  },
  {
    title: "HalfSword Enhancer",
    desc: "Just a normal injector for modifying Half Sword game. Used for fun!",
    tone: "signal",
    href: "https://github.com/muddpunch/Half-Sword-Enhancer",
    preview: halfSwordPreview,
  },
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
      <AmbientBackground />
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
        <motion.span className="discord-scroll-label" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.85, ease }}>|</motion.span>
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

        <section id="work" className="section" aria-labelledby="work-title">
          <motion.div className="section-head" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <a className="projects-heading" href="https://github.com/muddpunch" target="_blank" rel="noopener noreferrer">
              <h2 id="work-title">My favourite projects!</h2>
              <span>View all on GitHub ↗</span>
            </a>
          </motion.div>
          <motion.div className="project-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
          </motion.div>
        </section>

        <motion.section id="preview" className="section split preview-section" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} aria-labelledby="preview-title">
          <motion.div variants={fadeUp}>
            <h1 id="preview-title">Projects Preview</h1>
            <p className="preview-lead">A closer look at the tools, interfaces, and experiments behind the code.</p>
          </motion.div>
          <motion.div className="preview-grid" variants={stagger}>
            {projects.map((project) => (
              <motion.a className="preview-card" href={project.href} target="_blank" rel="noopener noreferrer" variants={fadeUp} key={project.title}>
                <img src={project.preview} alt={`${project.title} project preview`} loading="lazy" />
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

      </main>

      <footer className="footer">
        <span>mudd (The photos are ai generated)</span>
        <span>Personal portfolio, 2026</span>
      </footer>
    </>
  );
}

function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <span className="ambient-blob ambient-blob-one" />
      <span className="ambient-blob ambient-blob-two" />
      <span className="ambient-blob ambient-blob-three" />
    </div>
  );
}

function CursorLight() {
  const mx = useMotionValue(-240);
  const my = useMotionValue(-240);

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
      <motion.div className="cursor-light-dot" style={{ x: mx, y: my }} />
    </motion.div>
  );
}
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a className={`project ${project.tone}`} href={project.href} target="_blank" rel="noopener noreferrer" variants={fadeUp} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <div className="project-meta">
        <span>Open repository ↗</span>
      </div>
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
      </div>
    </motion.a>
  );
}

export default App;
