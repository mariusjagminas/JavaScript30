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
const arrow = document.querySelector(".arrow");

let currentMole;
let moleBefore;
let score;
let timeLeft;

startBtn.addEventListener("click", hideStartPanel);
body.addEventListener("mousemove", moveHammer);

function hideStartPanel() {
  startPanel.style.transform = "translateY(-400%)";
  body.style.cursor =`none`;
  arrow.style.display = 'none';
  setTimeout(startGame, 400);
}

function startGame() {
  hammer.classList.add("is-visible");
  document.addEventListener("click", handleClick);
  timeLeft = 10;
  score = 0;
  scoreBoard.textContent = "0";
  timer();
  playGame();
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
  arrow.style.display = 'initial';
  setHighestScore();
  showHighestScore();
}

function playGame() {
  if (timeLeft <= 0) {
    endGame();
    return;
  }
  const showUpDelay = getRandomNumber(100, 400);
  currentMole = getRandomMole();
  setTimeout(showHideMole, showUpDelay);
}

function getRandomMole() {
  const moleNumber = getRandomNumber(0, moles.length - 1);
  if (moleNumber === moleBefore) return getRandomMole();
  moleBefore = moleNumber;
  return moles[moleNumber];
}

function showHideMole() {
  const showUpTime = getRandomNumber(200, 2000);
  currentMole.classList.add("is-up");
  setTimeout(() => {
    currentMole.classList.remove("is-up");
    playGame(moles);
  }, showUpTime);
}

function handleClick() {
  animateHammer();
  if(isTouching(currentMole,hammer)) handleMoleHit();
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

// Hammer and Mole collision test
function isTouching(element1,element2){
  const {top: topA, bottom: bottomA, left: leftA, right: rightA} = element1.getBoundingClientRect();
  const {top: topB, bottom: bottomB, left: leftB, right: rightB} = element2.getBoundingClientRect();
  if(topA > bottomB || bottomA < topB || rightA < leftB || leftA > rightB)  return false;
  return true
}

function handleMoleHit() {
  hitAudio.currentTime = 0;
  hitAudio.play();
  score++ ;
  scoreBoard.innerText = score;
  currentMole.classList.remove("is-up");
  body.style.background='red';
  setTimeout(()=>{body.style.background='rgb(27, 206, 27)'},100)
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