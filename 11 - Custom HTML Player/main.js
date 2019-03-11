const player = document.querySelector(".player");
const video = player.querySelector(".video");
const panel = player.querySelector(".panel");
const progressBar = player.querySelector(".progress-bar");
const progressBarFill = player.querySelector(".progress-bar__fill");
const playBtn = player.querySelector(".play-button");
const rangeSliders = player.querySelectorAll('input[type="range"]');
const skipBtns = player.querySelectorAll("button[data-skip]");
const fullScreenBtn = player.querySelector(".full-screen");

//--- Event listeners----//

// Progress Bar //
let isMouseDown = false;
progressBar.addEventListener('click', moveProgressBar);
progressBar.addEventListener('mousemove', (e) => isMouseDown && moveProgressBar(e));
progressBar.addEventListener('mousedown',()=> isMouseDown = true );
window.addEventListener('mouseup', ()=> isMouseDown = false);
video.addEventListener('timeupdate', updateProgresBarLenght );

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

// Full screen button and window // 
fullScreenBtn.addEventListener("click", toggleFullScreen);
document.addEventListener("fullscreenchange", handleFullScreenChange);
 

//------ Functions --------// 

function updateProgresBarLenght(){
  const progressBarLenght = (this.currentTime / this.duration) * 100;
  progressBarFill.style.width =`${progressBarLenght}%`;
}

function moveProgressBar(e){
  const positionOnX = (e.offsetX/progressBar.offsetWidth) * video.duration;
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
  isFullScreen ? document.exitFullscreen() : player.requestFullscreen();
}

function handleFullScreenChange() {
  isFullScreen = document.fullscreenElement ? true : false;
  fullScreenBtn.firstChild.classList = isFullScreen
    ? "fas fa-compress"
    : "fas fa-expand";
}
