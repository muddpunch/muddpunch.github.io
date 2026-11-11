const out = document.getElementById("out");
const form = document.getElementById("form");
const input = document.getElementById("cmd");
const pathEl = document.getElementById("path");
const statsEl = document.getElementById("stats");
const music = document.getElementById("music");
const start = Date.now();
const history = [];
let pos = 0;
let count = 0;

const link = (text, href) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

const links = [
  ["GitHub", "https://github.com/muddpunch"],
  ["Dunia Toolkit", "https://github.com/muddpunch/FarCry-Toolkit"],
  ["OGFN Assembly Backend", "https://github.com/muddpunch/backend-Assembly"],
  ["Offsets of Games Finder", "https://github.com/muddpunch/offsets-of-games-finder"],
];

const projects = [
  {
    name: "Dunia Toolkit",
    text: "Open-source toolkit for Far Cry 5 PC modding and research.",
    points: [
      "FAT v10 archive parsing",
      "DAT archive extraction and rebuilding",
      "archive browsing and searching",
      "XBT texture preview with mipmaps",
      "asset extraction and replacement",
      "XBG model inspection and FBX export",
      "backup and rollback",
    ],
    tech: "C#, .NET 9",
    url: "https://github.com/muddpunch/FarCry-Toolkit",
  },
  {
    name: "Sable Engine",
    text: "Personal game engine for learning engine architecture and modern graphics.",
    points: ["C++20", "Vulkan 1.3", "Windows-first", "custom rendering architecture", "low-level graphics programming"],
    tech: "C++, Vulkan",
  },
  {
    name: "OGFN Assembly Backend",
    text: "Experimental Fortnite v8.51 backend written in x86-64 Assembly (NASM). Work in progress.",
    points: [
      "custom HTTP server and request parser",
      "routing and response generation",
      "health and status endpoints",
      "catalog, version and CloudStorage",
    ],
    tech: "x86-64 Assembly, NASM",
    url: "https://github.com/muddpunch/backend-Assembly",
  },
  {
    name: "Offsets of Games Finder",
    text: "Tool for game memory research and offset discovery.",
    points: ["memory structures", "game internals", "process analysis", "offset research"],
    tech: "C#",
    url: "https://github.com/muddpunch/offsets-of-games-finder",
  },
];

const skills = {
  Languages: ["Python", "Go", "Rust", "JavaScript", "C#", "C++", "x86-64 Assembly (NASM)"],
  "Reverse engineering": ["IDA Pro and Ghidra", "binary analysis", "memory structures", "game internals", "proprietary file formats"],
  "Game technology": ["Dunia Engine", "game modding", "asset formats", "game launchers", "custom game infrastructure"],
  "Software engineering": ["backend", "desktop apps", "APIs", "automation", "system-level programming"],
  "Graphics and systems": ["Vulkan", "rendering pipelines", "Windows internals", "Linux", "PC hardware"],
  Tools: ["IDA Pro", "Ghidra", "Git / GitHub", "VS Code", "Visual Studio", "Tauri 2", ".NET", "NASM", "Vulkan"],
};

const seasons = ["spring", "summer", "autumn", "winter"];
document.documentElement.dataset.theme = seasons[Math.floor(((new Date().getMonth() + 10) % 12) / 3)];

const greeting = () => {
  const h = new Date().getHours();
  return h < 5 ? "Good night." : h < 12 ? "Good morning." : h < 18 ? "Good afternoon." : "Good evening.";
};

const commands = {
  about: ["who is mudd", () => `
    <p class="h">Matthew "mudd"</p>
    <p class="block">IT technical school student and independent software developer from Poland.</p>
    <p class="block">I like to understand how software works on the inside: reverse engineering, low-level programming, game technology and cybersecurity.</p>
    <p class="block">Most of my time goes into game internals, file formats, memory structures, game engines and binary analysis. I learn by building my own tools instead of just using existing ones.</p>
    <p class="block">I mostly write <span class="y">Python, Go, Rust</span> and <span class="y">JavaScript</span>, and also work with <span class="y">C#, C++</span> and <span class="y">x86-64 Assembly</span>.</p>
    <p class="block m">Outside code: PC hardware, operating systems, Linux, Windows customization and gaming.</p>`],
  projects: ["featured work", () => `<p class="h">Projects</p>` + projects.map((p) => `
    <div class="block">
      <p class="p">${p.url ? link(p.name, p.url) : p.name}</p>
      <p>${p.text}</p>
      ${list(p.points)}
      <p class="m">tech: ${p.tech}</p>
    </div>`).join("")],
  skills: ["languages, interests and tools", () => `<p class="h">Skills</p>` + Object.entries(skills).map(([k, v]) => `
    <div class="block"><p class="p">${k}</p><p class="m">${v.join(" · ")}</p></div>`).join("")],
  contact: ["how to reach me", () => `
    <p class="h">Contact</p>
    <p>GitHub: ${link("github.com/muddpunch", "https://github.com/muddpunch")}</p>
    <p>Discord: <span class="y">parsedcode</span></p>`],
  links: ["quick links", () => `<p class="h">Quick Links</p>` + links.map(([n, u], i) => `<p><span class="m">${i + 1}.</span> ${link(n, u)}</p>`).join("")],
  whoami: ["identity check", () => `
    <p class="y">mudd</p>
    <p class="m">Software Developer · Reverse Engineer · Game Internals</p>
    <p class="m">Session: visitor@mudd</p>`],
  back: ["return to root", () => ""],
  theme: ["spring / summer / autumn / winter / off", (arg) => {
    if (arg === "off") {
      delete document.documentElement.dataset.theme;
      return `<p class="m">theme: off</p>`;
    }
    if (!seasons.includes(arg)) return `<p class="err">theme: pick one</p><p class="m">usage: <span class="y">/theme ${seasons.join(" | ")} | off</span></p>`;
    document.documentElement.dataset.theme = arg;
    return `<p class="m">theme: ${arg}</p>`;
  }],
  music: ["play / pause music", () => {
    if (music.paused) {
      music.play().catch(() => {});
      return `<p class="m">now playing: Lil Tecca - NUMBER 2</p>`;
    }
    music.pause();
    return `<p class="m">music paused</p>`;
  }],
  history: ["command history", () => list(history.map((h) => h.replace(/</g, "&lt;")))],
  clear: ["clear terminal (Ctrl+L)", () => {
    out.innerHTML = "";
    return "";
  }],
  welcome: ["replay welcome message", () => welcome()],
  secret: ["???", () => `<p class="p">you found it. now go read some assembly. >.&lt;</p>`],
  help: ["show this list", () => `<p class="h">Available commands:</p>` + Object.entries(commands)
    .map(([k, [d]]) => `<p><span class="y">/${k}</span> <span class="m">- ${d}</span></p>`).join("")],
};

function welcome() {
  return document.getElementById("banner").innerHTML + `
    <p class="p">Software Developer &amp; Reverse Engineer</p>
    <p class="m">${greeting()}</p>
    <p class="y">Type '/help' to get started.</p>
    <p class="m">Tab to autocomplete · ↑↓ to browse history</p>`;
}

function distance(a, b) {
  let row = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    for (let j = 1; j <= b.length; j++) {
      next[j] = Math.min(row[j] + 1, next[j - 1] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    row = next;
  }
  return row[b.length];
}

function print(html) {
  if (!html) return;
  const div = document.createElement("div");
  div.innerHTML = html;
  out.append(div);
}

function run(raw) {
  const line = raw.trim();
  if (!line) return;
  const echo = document.createElement("p");
  echo.className = "echo";
  echo.textContent = line;
  out.append(echo);
  history.push(line);
  pos = history.length;
  count++;
  const [name, arg] = line.replace(/^\//, "").toLowerCase().split(/\s+/);
  const cmd = commands[name];
  if (!cmd) {
    const err = document.createElement("p");
    err.className = "err";
    const guess = Object.keys(commands).map((k) => [distance(name, k), k]).sort((a, b) => a[0] - b[0])[0];
    err.textContent = guess[0] <= 2 ? `command not found: ${line}. did you mean "/${guess[1]}"?` : `command not found: ${line}. try /help`;
    out.append(err);
  } else {
    pathEl.textContent = name === "back" || name === "clear" ? "~" : `~/${name}`;
    print(cmd[1](arg));
  }
  out.scrollTop = out.scrollHeight;
}

function tick() {
  const s = Math.floor((Date.now() - start) / 1000);
  const time = s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
  statsEl.textContent = `uptime: ${time} · cmds: ${count}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  run(input.value);
  input.value = "";
  tick();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && pos > 0) {
    e.preventDefault();
    input.value = history[--pos];
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    pos = Math.min(pos + 1, history.length);
    input.value = history[pos] ?? "";
  } else if (e.key === "Tab") {
    e.preventDefault();
    const typed = input.value.trim().replace(/^\//, "").toLowerCase();
    const found = Object.keys(commands).filter((k) => k.startsWith(typed));
    if (found.length === 1) input.value = `/${found[0]}`;
    else if (found.length > 1) print(`<p class="m">${found.map((k) => `/${k}`).join("  ")}</p>`);
    out.scrollTop = out.scrollHeight;
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    out.innerHTML = "";
  }
});

document.querySelector(".term").addEventListener("click", (e) => {
  if (!e.target.closest("a") && !getSelection().toString()) input.focus();
});

print(welcome());
setInterval(tick, 1000);
input.focus();
