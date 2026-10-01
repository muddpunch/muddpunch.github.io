const ghLink = document.querySelector("[data-github-link]");
const dcLink = document.querySelector(".discord-link");
const dcPreview = document.querySelector(".discord-preview");
const grid = document.querySelector(".contribution-grid");
const monthRow = document.querySelector(".months");
const stats = document.querySelector(".github-stats");
const chartImg = document.querySelector(".github-fallback");
const live = document.querySelector(".github-live");
const video = document.querySelector(".backdrop video");
const soundBtn = document.querySelector(".sound-toggle");


video.volume = 0.65;

function syncSoundBtn() {
  const on = !video.muted && !video.paused;
  soundBtn.textContent = on ? "sound on" : "sound off";
  soundBtn.setAttribute("aria-label", on ? "Mute background sound" : "Enable background sound");
  soundBtn.setAttribute("aria-pressed", String(on));
}

video.play().catch(() => {
  video.muted = true;
  video.play().catch(() => {});
});

soundBtn.addEventListener("click", () => {
  if (!video.muted) {
    video.muted = true;
    return;
  }
  video.muted = false;
  video.play().catch(() => {
    video.muted = true;
  });
});

["play", "pause", "volumechange"].forEach(e => video.addEventListener(e, syncSoundBtn));
syncSoundBtn();


const user = new URL(ghLink.href).pathname.split("/").filter(Boolean)[0];
const dcId = new URL(dcLink.href).pathname.split("/").filter(Boolean).pop();

chartImg.src = "https://ghchart.rshah.org/d51cf0/" + encodeURIComponent(user);
chartImg.addEventListener("error", () => {
  if (!live.hidden) return;
  chartImg.hidden = true;
  live.hidden = false;
  grid.classList.add("is-error");
  grid.textContent = "can't load github activity";
});

if (/^\d{17,20}$/.test(dcId)) {
  dcPreview.src = "https://dsc-readme.tsuni.dev/api/user/" + dcId + "?layout=compact&width=400";
}

const handle = document.querySelector(".handle");
if (handle) handle.textContent = "@" + user;
document.querySelector("#github-title").textContent = user + "'s GitHub contributions";

async function loadContribs() {
  try {
    if (!/^[a-z\d-]+$/i.test(user)) throw new Error("bad username");

    const res = await fetch("https://github-contributions-api.jogruber.de/v4/" + user + "?y=last");
    if (!res.ok) throw new Error("api error");

    const json = await res.json();
    const days = json.contributions.slice(-196);
    if (!days.length) throw new Error("no data");

    grid.replaceChildren();
    monthRow.replaceChildren();

    days.forEach((d, i) => {
      const cell = document.createElement("span");
      cell.className = "level-" + d.level;
      cell.title = d.date + ": " + d.count + " contributions";
      grid.append(cell);

      if (i % 7 !== 0) return;
      const date = new Date(d.date + "T00:00:00");
      const prev = i ? new Date(days[i - 7].date + "T00:00:00") : null;
      if (prev && prev.getMonth() === date.getMonth()) return;

      const label = document.createElement("span");
      label.textContent = date.toLocaleString("en", { month: "short" });
      label.style.gridColumn = i / 7 + 1;
      monthRow.append(label);
    });

    let total = 0, active = 0, run = 0, best = 0;
    for (const d of days) {
      total += d.count;
      if (d.count) {
        active++;
        run++;
        if (run > best) best = run;
      } else {
        run = 0;
      }
    }

    stats.textContent = total + " contributions, " + active + " active days, best streak " + best;
    grid.setAttribute("aria-label", total + " contributions in the last 28 weeks");
    chartImg.hidden = true;
    live.hidden = false;
  } catch {
    stats.textContent = "GitHub activity";
  }
}

loadContribs();
