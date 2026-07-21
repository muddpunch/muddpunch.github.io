const profile = {
  name: "mudd",
  role: "Builder / Frontend Developer",
  intro: "Code. Fail. Learn. Repeat.",
  location: "Poland / remote",
  availability: "Open to small builds and freelance work",
  stats: {
    experience: "3+",
    projects: "20+",
    focus: "Windows?",
  },
};

const projects = [
  {
    title: "17.30 Backend",
    desc: "Backend with good matchmaker, arena support and a lot of other things.",
    tags: ["Backend", "Fortnite", "Golang"],
    tone: "oxide",
    image: {
      src: "https://i.ytimg.com/vi/0GxSgk4uWeU/hqdefault.jpg",
      alt: "do pieca",
    },
  },
  {
    title: "HalfSword Enhancer",
    desc: "Just a normal injector for modifying Half Sword game. Used for fun!",
    tags: ["Injector", "Half Sword", "C#"],
    tone: "signal",
    image: {
      src: "data:image/jpeg;base64,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",
      alt: "do pieca",
    },
  },
  {
    title: "Vista Sim Racing Team Website",
    desc: "A mix of black and white, with a focus on the branding.",
    tags: ["CSS", "TypeScript", "Node.js"],
    tone: "green",
    image: {
      src: "https://preview.redd.it/i-need-sponsors-for-our-livery-in-h1gp-v0-vjv9uimuup3h1.png?width=1080&crop=smart&auto=webp&s=3f10992db0cb6b81f68a4981e3bc0f01322135a7",
      alt: "do pieca",
    },
  },
];

const skills = [
  ["Frontend", "Semantic HTML, modern CSS, JavaScript, React-style UI thinking, responsive layouts."],
  ["Backend flow", "APIs, project structure, naming, practical refactors, service-level thinking."],
  ["Debugging", "Reading logs, tracing weird states, mapping broken data, testing assumptions quickly."],
  ["Tooling", "Small utilities, automation-minded workflows, desktop-adjacent experiments."],
];

const signals = [
  ["Hands-on", "I learn fastest by building, running, breaking, inspecting, and tightening the thing in front of me."],
  ["Not template-first", "I care when something looks too generic. The visual direction has to feel owned, not generated."],
  ["Systems-aware", "Frontend matters, but so do data shapes, backend naming, logs, runtime behavior, and deployment details."],
  ["Iterative", "I make a working version, look at what feels wrong, and keep correcting until it matches the intent."],
  ["Game-adjacent curiosity", "I have spent time around game logs, cosmetic/loadout data, and tooling problems that require patient inspection."],
  ["Practical taste", "Dark UI, visible structure, grid patterns, sharp contrast, and interface decisions that do a job."],
];

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = value;
  });
};

const text = (node, value) => {
  node.textContent = value;
  return node;
};

setText('[data-profile="name"]', profile.name);
setText('[data-profile="role"]', profile.role);
setText('[data-profile="intro"]', profile.intro);
setText('[data-profile="location"]', profile.location);
setText('[data-profile="availability"]', profile.availability);

Object.entries(profile.stats).forEach(([key, value]) => setText(`[data-stat="${key}"]`, value));

const projectRoot = document.querySelector("[data-projects]");

projects.forEach((project, index) => {
  const card = document.createElement("article");
  const media = document.createElement("div");
  const meta = document.createElement("span");
  const title = document.createElement("h3");
  const desc = document.createElement("p");
  const tags = document.createElement("div");

  card.className = `project ${project.tone}`;
  media.className = "project-media";
  meta.className = "project-meta";
  tags.className = "tags";

  if (project.image.src) {
    const img = document.createElement("img");
    img.src = project.image.src;
    img.alt = project.image.alt || `${project.title} preview`;
    img.loading = "lazy";
    img.decoding = "async";
    media.append(img);
  }

  project.tags.forEach((tag) => tags.append(text(document.createElement("span"), tag)));
  card.append(
    media,
    text(meta, `0${index + 1}`),
    text(title, project.title),
    text(desc, project.desc),
    tags,
  );
  projectRoot.append(card);
});

const skillRoot = document.querySelector("[data-skills]");

skills.forEach(([titleText, descText]) => {
  const card = document.createElement("article");
  const title = document.createElement("h3");
  const desc = document.createElement("p");

  card.className = "skill";
  card.append(text(title, titleText), text(desc, descText));
  skillRoot.append(card);
});

const signalRoot = document.querySelector("[data-signals]");

signals.forEach(([titleText, descText], index) => {
  const card = document.createElement("article");
  const number = document.createElement("span");
  const title = document.createElement("h3");
  const desc = document.createElement("p");

  card.className = "signal-card";
  number.className = "signal-number";
  card.append(text(number, `S${index + 1}`), text(title, titleText), text(desc, descText));
  signalRoot.append(card);
});

