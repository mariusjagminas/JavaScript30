const player = document.querySelector(".player");
const video = player.querySelector(".video");
const panel = player.querySelector(".panel");
const progressBar = player.querySelector(".progress-bar");
const progressBarFill = player.querySelector(".progress-bar__fill");
const playBtn = player.querySelector(".play-button");
const rangeSliders = player.querySelectorAll('input[type="range"]');
const skipBtns = player.querySelectorAll("button[data-skip]");
const fullScreenBtn = player.querySelector(".full-screen");

//--- Event listeners ----//

// Controls panel //
player.addEventListener("mousemove", showControlsOnFullScr);

// Progress Bar //
let isMouseDown = false;
progressBar.addEventListener("click", moveProgressBar);
progressBar.addEventListener(
  "mousemove",
  e => isMouseDown && moveProgressBar(e)
);
progressBar.addEventListener("mousedown", () => (isMouseDown = true));
window.addEventListener("mouseup", () => (isMouseDown = false));
video.addEventListener("timeupdate", updateProgresBarLenght);

// Play button and players screen
video.addEventListener("click", playPauseVideo);
playBtn.addEventListener("click", playPauseVideo);
video.addEventListener("pause", togglePlayBtn);
video.addEventListener("play", togglePlayBtn);

// Sliders//
rangeSliders.forEach(slider =>
  slider.addEventListener("mousemove", handleRangeUpdate)
);

// Skip buttons //
skipBtns.forEach(btn => btn.addEventListener("click", skip));

// Fullscreen button  //
fullScreenBtn.addEventListener("click", toggleFullScreen);

// Fullscreen window
document.addEventListener("fullscreenchange", handleFullScreenChange);

//------ Functions --------//

function showControlsOnFullScr() {
  if (!panel.classList.contains("show-panel") && isFullScreen) {
    panel.classList.add("show-panel");
    setTimeout(() => {
      panel.classList.remove("show-panel");
    }, 2000);
  }
}

function updateProgresBarLenght() {
  const progressBarLenght = (this.currentTime / this.duration) * 100;
  progressBarFill.style.width = `${progressBarLenght}%`;
}

function moveProgressBar(e) {
  const positionOnX = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = positionOnX;
}

let isFullScreen = false;

function playPauseVideo() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function togglePlayBtn() {
  playBtn.firstChild.classList = this.paused ? "fas fa-play" : "fas fa-pause";
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}

function toggleFullScreen() {
  isFullScreen ? closeFullscreen() : openFullscreen(player);
}

function handleFullScreenChange() {
  isFullScreen = document.fullscreenElement ? true : false;
  toggleFullScreenButton();
  togglePlayerClass();
}

function toggleFullScreenButton() {
  fullScreenBtn.firstChild.classList = isFullScreen
    ? "fas fa-compress"
    : "fas fa-expand";
}

function togglePlayerClass() {
  player.classList = isFullScreen ? "player" : "player player__hover";
}

// Cross browser support for Fullscreen API for most browsers
// Not working properly on IE and Edge

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}
