import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import avatar from "../assets/mug-avatar.png";
import chatcontrolPreview from "../assets/projects/chatcontrol-preview.png";
import halfSwordPreview from "../assets/projects/half-sword-preview.png";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
};

const github = "https://github.com/muddpunch";
const ease = [0.16, 1, 0.3, 1] as const;

const projects: Project[] = [
  {
    id: "01",
    title: "Anti Chat Control",
    description:
      "A privacy-first encryption tool created as a direct response to invasive online surveillance.",
    tags: ["JavaScript", "Cryptography", "Privacy"],
    href: `${github}/chatcontrol-encrypter-decrypter`,
    image: chatcontrolPreview,
  },
  {
    id: "02",
    title: "Half-Sword Enhancer",
    description:
      "A lightweight Windows utility for automatic mod installation, backups, and game discovery.",
    tags: ["C#", ".NET", "Windows"],
    href: `${github}/Half-Sword-Enhancer`,
    image: halfSwordPreview,
  },
];

const stack = ["TypeScript", "React", "Golang", "Python", "C#", "Networking"];

const rise = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const sequence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

function App() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="app">
      <Atmosphere />
      {!reducedMotion && <CursorAura />}
      <Navigation />

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-blueprint" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <motion.div className="hero-meta" variants={sequence} initial="hidden" animate="visible">
            <motion.span variants={rise}>Independent developer</motion.span>
            <motion.span variants={rise}>Poland / 2026</motion.span>
            <motion.span className="availability" variants={rise}>
              <i /> Available for projects
            </motion.span>
          </motion.div>

          <motion.div className="hero-title" variants={sequence} initial="hidden" animate="visible">
            <motion.span variants={rise}>I build</motion.span>
            <motion.span className="title-cobalt" variants={rise}>things that</motion.span>
            <motion.span variants={rise}>have a purpose.</motion.span>
          </motion.div>

          <motion.div
            className="identity-card"
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.75, delay: 0.34, ease }}
          >
            <div className="identity-photo">
              <img src={avatar} alt="mudd holding a large mug" />
            </div>
            <div className="identity-caption">
              <strong>mudd</strong>
              <span>@23m.ev</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-bottom"
            variants={sequence}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={rise}>
              Backend-minded developer building secure tools, useful software,
              and sharp web experiences.
            </motion.p>
            <motion.div className="hero-actions" variants={rise}>
              <a className="action action-primary" href="#work">
                See selected work <Arrow />
              </a>
              <a className="action action-ghost" href={github} target="_blank" rel="noreferrer">
                GitHub <External />
              </a>
            </motion.div>
          </motion.div>
        </section>

        <Ticker />

        <section className="about page-section" id="about" aria-labelledby="about-title">
          <SectionHeading number="01" label="About / profile" />
          <motion.div
            className="about-layout"
            variants={sequence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div className="about-statement" variants={rise}>
              <p>Not a code factory.</p>
              <h2 id="about-title">
                I like finding out <em>how things work</em> — and where they break.
              </h2>
            </motion.div>

            <motion.div className="about-copy panel" variants={rise}>
              <span className="panel-index">A / 01</span>
              <p>
                I am a developer and networking student from a small village in
                Poland. Programming started as a hobby and turned into my way of
                solving real problems.
              </p>
              <p>
                My work moves between backend development, security testing,
                automation, and interface design.
              </p>
            </motion.div>

            <motion.div className="focus-panel panel" variants={rise}>
              <span className="panel-index">CURRENT FOCUS</span>
              <div className="terminal-row">
                <i />
                <span>building_web_experiences</span>
              </div>
              <div className="focus-list">
                <span>01 / Utility</span>
                <span>02 / Security</span>
                <span>03 / Clarity</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="work page-section" id="work" aria-labelledby="work-title">
          <SectionHeading number="02" label="Selected work" />
          <motion.div
            className="work-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sequence}
          >
            <motion.h2 id="work-title" variants={rise}>Built from curiosity.</motion.h2>
            <motion.p variants={rise}>
              Personal tools and experiments designed around a clear problem.
            </motion.p>
          </motion.div>

          <div className="projects">
            {projects.map((project, index) => (
              <ProjectCard project={project} reverse={index % 2 === 1} key={project.title} />
            ))}
          </div>

          <a className="all-projects" href={github} target="_blank" rel="noreferrer">
            <span>Explore all repositories</span>
            <External />
          </a>
        </section>

        <section className="toolkit page-section" id="toolkit" aria-labelledby="toolkit-title">
          <SectionHeading number="03" label="Toolkit / capabilities" />
          <div className="toolkit-head">
            <motion.h2
              id="toolkit-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
            >
              Different tools.
              <br />
              <span>One way of thinking.</span>
            </motion.h2>
          </div>
          <motion.ul
            className="tool-list"
            variants={sequence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stack.map((tool, index) => (
              <motion.li variants={rise} key={tool}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{tool}</strong>
                <i>+</i>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <section className="contact page-section" id="contact" aria-labelledby="contact-title">
          <motion.div
            className="contact-card"
            variants={sequence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.span className="contact-code" variants={rise}>04 / CONTACT</motion.span>
            <motion.p variants={rise}>Have a useful idea?</motion.p>
            <motion.h2 id="contact-title" variants={rise}>Let us build it.</motion.h2>
            <motion.a href="https://discord.com/app" target="_blank" rel="noreferrer" variants={rise}>
              Find me on Discord <span>@23m.ev</span> <Arrow />
            </motion.a>
            <div className="contact-orbit" aria-hidden="true"><i /></div>
          </motion.div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} mudd</span>
        <span>Built in Poland</span>
        <a href="#top">Back to top <Arrow /></a>
      </footer>
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="side-rail" aria-label="Primary navigation">
        <a className="rail-logo" href="#top" aria-label="mudd home">M/</a>
        <nav>
          <a href="#about"><span>01</span>About</a>
          <a href="#work"><span>02</span>Work</a>
          <a href="#toolkit"><span>03</span>Toolkit</a>
          <a href="#contact"><span>04</span>Contact</a>
        </nav>
        <a className="rail-github" href={github} target="_blank" rel="noreferrer" aria-label="GitHub">
          GH
        </a>
      </aside>

      <header className="mobile-header">
        <a className="rail-logo" href="#top">M/</a>
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={open ? "open" : ""}>
          {[
            ["About", "#about"],
            ["Work", "#work"],
            ["Toolkit", "#toolkit"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a href={href} onClick={() => setOpen(false)} key={label}>{label}</a>
          ))}
        </nav>
      </header>
    </>
  );
}

function ProjectCard({ project, reverse }: { project: Project; reverse: boolean }) {
  return (
    <motion.article
      className={`project ${reverse ? "project-reverse" : ""}`}
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, ease }}
    >
      <a href={project.href} target="_blank" rel="noreferrer">
        <div className="project-visual">
          <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
          <span className="project-view">Open project <External /></span>
        </div>
        <div className="project-info">
          <div className="project-topline">
            <span>PROJECT / {project.id}</span>
            <Arrow />
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ul aria-label="Technologies used">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
      </a>
    </motion.article>
  );
}

function SectionHeading({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-heading">
      <span>{number}</span>
      <p>{label}</p>
      <i />
    </div>
  );
}

function Ticker() {
  const text = "BACKEND / SECURITY / WEB / NETWORKING /";
  return (
    <div className="ticker" aria-label="Backend, security, web, networking">
      <div>
        <span>{text}</span><span>{text}</span><span>{text}</span><span>{text}</span>
      </div>
    </div>
  );
}

function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="grid" />
      <div className="blue-glow" />
      <div className="grain" />
    </div>
  );
}

function CursorAura() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const smoothX = useSpring(x, { stiffness: 95, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 95, damping: 24 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 210);
      y.set(event.clientY - 210);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div className="cursor-aura" style={{ x: smoothX, y: smoothY }} aria-hidden="true" />;
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function External() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 16 16 8M9 8h7v7" />
    </svg>
  );
}

export default App;
