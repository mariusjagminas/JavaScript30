const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score__number");
const startPanel = document.querySelector(".start-panel");
const startBtn = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");
const hiScoreAndTimer = document.querySelector(".hi-score");
const slapAudio = document.querySelector(".slap");
const hitAudio = document.querySelector(".hit");
const body = document.querySelector("body");
const hammer = document.querySelector(".hammer");
const hammerImg = document.querySelector(".hammer__img");

let randomMole;
let moleBefore;
let score;
let timeLeft;

startBtn.addEventListener("click", hideStartPanel);
body.addEventListener("mousemove", moveHammer);

function hideStartPanel() {
  startPanel.style.transform = "translateY(-400%)";
  body.style.cursor =`none`;
  setTimeout(startGame, 400);
}

function startGame() {
  hammer.classList.add("is-visible");
  document.addEventListener("click", handleClick);
  timeLeft = 10;
  score = 0;
  scoreBoard.textContent = "0";
  timer();
  playGame(moles);
}

function timer() {
  if (timeLeft <= 0) return;
  timeLeft--;
  hiScoreAndTimer.textContent = `Time: ${timeLeft}`;
  setTimeout(timer, 1000);
}

function endGame() {
  document.removeEventListener("click", handleClick);
  gameOver.textContent = "Game over";
  startPanel.style.transform = "translateY(0)";
  hammer.classList.remove("is-visible");
  body.style.cursor =`pointer`; //  maybe to change later to another pointer
  setHighestScore();
  showHighestScore();
}

function playGame(items) {
  if (timeLeft <= 0) {
    endGame();
    return;
  }
  const showUpDelay = getRandomNumber(100, 400);
  randomMole = getRandomMole(items);
  setTimeout(showHideMole.bind(null, randomMole), showUpDelay);
}

function getRandomMole(item) {
  const moleNumber = getRandomNumber(0, item.length - 1);
  if (moleNumber === moleBefore) return getRandomMole(item);
  moleBefore = moleNumber;
  return item[moleNumber];
}

function showHideMole(item) {
  const showUpTime = getRandomNumber(200, 2000);
  item.classList.add("is-up");
  setTimeout(() => {
    item.classList.remove("is-up");
    playGame(moles);
  }, showUpTime);
}

function handleClick(e) {
  animateHammer();
  // Calculating AABB
  const moleCoords = randomMole.getBoundingClientRect();
  const hammerCoords = hammer.getBoundingClientRect();
  console.log(moleCoords);
  console.log(hammerCoords);
  // End of calculating AABB
}
function moveHammer(e) {
  hammer.style.cssText = `transform: translate(${e.clientX -
    20}px,${e.clientY - 20}px)`;
}

function animateHammer() {
  hammerImg.style.cssText = `transform: rotateZ(-180deg)`;
  setTimeout(() => {
    hammerImg.style.cssText = `transform: rotateZ(-120deg)`;
  }, 200);
  slapAudio.currentTime = 0;
  slapAudio.play();
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function addScore(e) {
  console.log(e);
  hitAudio.currentTime = 0;
  hitAudio.play();
  score += 1;
  scoreBoard.innerText = score;
  mole.classList.remove("is-up");
}

function getHighestScore() {
  const x = localStorage.getItem("whack-a-mole-score");
  return Number(x);
}

function setHighestScore() {
  const hiScore = getHighestScore();
  if (hiScore < score) localStorage.setItem("whack-a-mole-score", score);
}

function showHighestScore() {
  const showScore = getHighestScore();
  hiScoreAndTimer.textContent = `Highest Score: ${
    showScore > 0 ? showScore : "0"
  }`;
}

showHighestScore();