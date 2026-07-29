import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import avatar from "../assets/mug-avatar.png";
import chatcontrolPreview from "../assets/projects/chatcontrol-preview.png";
import halfSwordPreview from "../assets/projects/half-sword-preview.png";

type Project = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
  accent: "ember" | "gold";
};

const ease = [0.16, 1, 0.3, 1] as const;
const github = "https://github.com/muddpunch";

const projects: Project[] = [
  {
    index: "01",
    title: "Anti Chat Control",
    description:
      "A privacy-first message encryption tool built as a direct response to invasive online surveillance.",
    tags: ["JavaScript", "Cryptography", "Privacy"],
    href: `${github}/chatcontrol-encrypter-decrypter`,
    image: chatcontrolPreview,
    accent: "ember",
  },
  {
    index: "02",
    title: "Half-Sword Enhancer",
    description:
      "A lightweight Windows utility that automates mod installation, backups, and game discovery.",
    tags: ["C#", ".NET", "Windows"],
    href: `${github}/Half-Sword-Enhancer`,
    image: halfSwordPreview,
    accent: "gold",
  },
];

const stack = [
  { name: "TypeScript", code: "TS" },
  { name: "React", code: "RX" },
  { name: "Golang", code: "GO" },
  { name: "Python", code: "PY" },
  { name: "C Sharp", code: "C#" },
  { name: "Networking", code: "NW" },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

function App() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="site-shell">
      <Background />
      {!reducedMotion && <CursorGlow />}
      <Header />

      <main>
        <section className="hero section-pad" id="top" aria-labelledby="hero-title">
          <motion.div
            className="hero-copy"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="eyebrow" variants={reveal}>
              <span className="status-dot" />
              Available for interesting projects
            </motion.div>
            <motion.h1 id="hero-title" variants={reveal}>
              I build useful things
              <span> for the web and beyond.</span>
            </motion.h1>
            <motion.p className="hero-intro" variants={reveal}>
              Backend-minded developer from Poland, turning curiosity into
              practical software, secure tools, and sharp digital experiences.
            </motion.p>
            <motion.div className="hero-actions" variants={reveal}>
              <MagneticLink className="button button-primary" href="#work">
                Explore my work
                <ArrowIcon />
              </MagneticLink>
              <MagneticLink
                className="button button-quiet"
                href={github}
                external
              >
                GitHub
                <ExternalIcon />
              </MagneticLink>
            </motion.div>
          </motion.div>

          <motion.aside
            className="profile-card"
            initial={{ opacity: 0, x: 36, rotate: 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            aria-label="About mudd"
          >
            <div className="profile-visual">
              <img src={avatar} alt="mudd holding a large mug" />
              <span className="profile-label">Based in Poland</span>
            </div>
            <div className="profile-info">
              <div>
                <p className="profile-name">mudd</p>
                <p className="profile-handle">@23m.ev</p>
              </div>
              <span className="profile-role">Backend / Security / Web</span>
            </div>
          </motion.aside>

          <motion.a
            className="scroll-cue"
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span>Scroll to discover</span>
            <i />
          </motion.a>
        </section>

        <section className="about section-pad" id="about" aria-labelledby="about-title">
          <SectionLabel index="01" text="About" />
          <motion.div
            className="about-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2 id="about-title" variants={reveal}>
              Code is the medium.
              <br />
              <em>Solving is the point.</em>
            </motion.h2>
            <motion.div className="about-copy" variants={reveal}>
              <p>
                I’m a developer and networking student from a small Polish
                village. I enjoy understanding how systems work, where they
                break, and how to make them more useful.
              </p>
              <p>
                My work moves between backend development, security testing,
                automation, and frontend experiments. Most projects start with
                a real problem—or simply an irresistible question.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section className="work section-pad" id="work" aria-labelledby="work-title">
          <SectionLabel index="02" text="Selected work" />
          <motion.div
            className="work-heading"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2 id="work-title" variants={reveal}>
              Projects with a reason to exist.
            </motion.h2>
            <motion.a
              variants={reveal}
              href={github}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              All repositories <ExternalIcon />
            </motion.a>
          </motion.div>

          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))}
          </div>
        </section>

        <section className="stack-section section-pad" id="stack" aria-labelledby="stack-title">
          <SectionLabel index="03" text="Toolkit" />
          <motion.div
            className="stack-layout"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={reveal}>
              <h2 id="stack-title">
                Tools change.
                <br />
                <em>Fundamentals stay.</em>
              </h2>
              <p>
                A practical stack chosen per problem—not by trend.
              </p>
            </motion.div>
            <motion.ul className="stack-grid" variants={stagger}>
              {stack.map((item, index) => (
                <motion.li key={item.name} variants={reveal}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.name}</strong>
                  <i>{item.code}</i>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </section>

        <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
          <motion.div
            className="contact-inner"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.p className="contact-kicker" variants={reveal}>
              Have something worth building?
            </motion.p>
            <motion.h2 id="contact-title" variants={reveal}>
              Let’s make it <em>real.</em>
            </motion.h2>
            <motion.div variants={reveal}>
              <MagneticLink
                className="contact-link"
                href="https://discord.com/app"
                external
              >
                Find me on Discord — @23m.ev
                <ArrowIcon />
              </MagneticLink>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} mudd</span>
        <span>Built with intent, caffeine, and curiosity.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="mudd — home">
        m<span>u</span>dd
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <nav className={open ? "is-open" : ""} aria-label="Main navigation">
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#work" onClick={() => setOpen(false)}>Work</a>
        <a href="#stack" onClick={() => setOpen(false)}>Stack</a>
        <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>
          Let’s talk
        </a>
      </nav>
    </header>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className={`project-card project-${project.accent}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease }}
    >
      <a href={project.href} target="_blank" rel="noreferrer">
        <div className="project-image">
          <img src={project.image} alt={`${project.title} interface preview`} loading="lazy" />
          <div className="project-open" aria-hidden="true">
            View project <ExternalIcon />
          </div>
        </div>
        <div className="project-details">
          <span className="project-index">{project.index}</span>
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul aria-label="Technologies">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
          <ArrowIcon />
        </div>
      </a>
    </motion.article>
  );
}

function SectionLabel({ index, text }: { index: string; text: string }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <p>{text}</p>
      <i />
    </div>
  );
}

function MagneticLink({
  children,
  className,
  href,
  external = false,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
  external?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 22 });
  const springY = useSpring(y, { stiffness: 300, damping: 22 });

  return (
    <motion.a
      className={className}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

function Background() {
  return (
    <div className="background" aria-hidden="true">
      <div className="background-grid" />
      <div className="background-orb" />
      <div className="noise" />
    </div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { stiffness: 110, damping: 25 });
  const springY = useSpring(y, { stiffness: 110, damping: 25 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div className="cursor-glow" style={{ x: springX, y: springY }} aria-hidden="true" />;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 16 16 8M9 8h7v7" />
    </svg>
  );
}

export default App;
