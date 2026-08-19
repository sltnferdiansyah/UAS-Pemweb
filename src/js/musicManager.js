import { Howler, Howl } from "howler";

const tracks = [
  {
    title: "A cup of cat coffee",
    src: "/sound/a-cup-with-a-cat.mp3",
  },
  {
    title: "No Copyright Music",
    src: "/sound/nocopyright.mp3",
  },
];

let activeTrackIndex = 0;
let activeTrack = null;
let isMuted = false;
let isListenerBound = false;
const volume = 0.05;

function getActiveTrackMeta() {
  return tracks[activeTrackIndex];
}

function syncSoundButtons() {
  const track = getActiveTrackMeta();

  document.querySelectorAll(".sound-btn").forEach((button) => {
    const label = button.querySelector(".sound-label");
    if (label) {
      label.textContent = track.title;
    }

    const action = isMuted ? "Unmute" : "Mute";
    button.title = `${action} ${track.title}`;
    button.setAttribute("aria-label", `${action} ${track.title}`);
    button.dataset.muted = String(isMuted);
  });
}

function setMuted(nextMuted) {
  isMuted = Boolean(nextMuted);
  Howler.mute(isMuted);
  syncSoundButtons();
}

function toggleMuted() {
  setMuted(!isMuted);
}

function destroyActiveTrack() {
  if (!activeTrack) {
    return;
  }

  activeTrack.stop();
  activeTrack.unload();
  activeTrack = null;
}

function createTrack(index) {
  const trackMeta = tracks[index];

  return new Howl({
    src: [trackMeta.src],
    loop: false,
    volume,
    html5: true,
    preload: true,
    onend: advanceTrack,
  });
}

function playTrack(index) {
  const nextIndex = ((index % tracks.length) + tracks.length) % tracks.length;

  activeTrackIndex = nextIndex;
  destroyActiveTrack();
  activeTrack = createTrack(nextIndex);
  Howler.mute(isMuted);
  syncSoundButtons();
  activeTrack.play();
}

function advanceTrack() {
  playTrack(activeTrackIndex + 1);
}

function ensureTrack() {
  if (!activeTrack) {
    activeTrack = createTrack(activeTrackIndex);
  }

  return activeTrack;
}

function playGlobalMusic() {
  const track = ensureTrack();

  if (!track.playing()) {
    Howler.mute(isMuted);
    syncSoundButtons();
    track.play();
  } else {
    Howler.mute(isMuted);
    syncSoundButtons();
  }
}

function setupMusicControls() {
  if (isListenerBound) {
    return;
  }

  isListenerBound = true;

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (!target.closest(".sound-btn")) {
      return;
    }

    event.preventDefault();
    toggleMuted();
  });

  syncSoundButtons();
}

export { playGlobalMusic, setupMusicControls, syncSoundButtons };
