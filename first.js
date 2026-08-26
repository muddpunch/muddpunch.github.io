const player = document.querySelector("[data-music-player]");

if (player) {
  const audio = player.querySelector("audio");
  const title = player.querySelector(".music-title");
  const current = player.querySelector(".music-current");
  const duration = player.querySelector(".music-duration");
  const seek = player.querySelector(".music-seek");
  const toggle = player.querySelector('[data-action="toggle"]');
  const stop = player.querySelector('[data-action="stop"]');
  const mute = player.querySelector('[data-action="mute"]');

  const file = decodeURIComponent(audio.getAttribute("src").split("/").pop());
  title.textContent = file.replace(/\.mp3$/i, "");

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  };

  const getDuration = () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) return audio.duration;
    return audio.seekable.length ? audio.seekable.end(audio.seekable.length - 1) : 0;
  };

  const syncProgress = () => {
    const value = audio.currentTime || 0;
    const max = getDuration();
    seek.max = max;
    seek.disabled = max === 0;
    seek.value = value;
    seek.style.setProperty("--music-progress", `${max ? (value / max) * 100 : 0}%`);
    seek.setAttribute("aria-valuetext", `${formatTime(value)} of ${formatTime(max)}`);
    current.textContent = formatTime(value);
    duration.textContent = formatTime(max);
  };

  const syncPlayback = () => {
    const playing = !audio.paused && !audio.ended;
    player.dataset.playing = String(playing);
    toggle.setAttribute("aria-label", playing ? "Pause" : "Play");
  };

  audio.addEventListener("loadedmetadata", syncProgress);
  audio.addEventListener("durationchange", syncProgress);
  audio.addEventListener("canplay", syncProgress);
  audio.addEventListener("timeupdate", syncProgress);
  audio.addEventListener("play", syncPlayback);
  audio.addEventListener("pause", syncPlayback);
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    syncPlayback();
    syncProgress();
  });
  audio.addEventListener("volumechange", () => {
    mute.setAttribute("aria-pressed", String(audio.muted));
    mute.setAttribute("aria-label", audio.muted ? "Unmute" : "Mute");
  });

  toggle.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        syncPlayback();
      }
    } else {
      audio.pause();
    }
  });

  stop.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    syncProgress();
  });

  mute.addEventListener("click", () => {
    audio.muted = !audio.muted;
  });

  seek.addEventListener("input", () => {
    audio.currentTime = Number(seek.value);
    syncProgress();
  });

  syncPlayback();
}
