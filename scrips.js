const question = document.getElementById("question");
const gif = document.getElementById("gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const loveMessage = document.getElementById("love-message");
const noMessage = document.getElementById("no-message");

let noAttempts = 0;
let answered = false;
let ignoreNextClick = false;

// YES: change the message + GIF and reveal the funny paragraph.
yesBtn.addEventListener("click", () => {
  if (answered) return;
  answered = true;

  question.textContent = "I knew it 😍";
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

  loveMessage.classList.remove("hidden");
  noMessage.classList.add("hidden");
  noBtn.style.display = "none";
});

function moveNoButton() {
  if (answered) return;

  noAttempts++;

  // Keep the button on-screen at all times.
  const padding = 12;
  const rect = noBtn.getBoundingClientRect();
  const buttonWidth = rect.width || 130;
  const buttonHeight = rect.height || 50;
  const maxX = Math.max(padding, window.innerWidth - buttonWidth - padding);
  const maxY = Math.max(padding, window.innerHeight - buttonHeight - padding);

  const randomX = Math.floor(padding + Math.random() * Math.max(1, maxX - padding));
  const randomY = Math.floor(padding + Math.random() * Math.max(1, maxY - padding));

  // fixed + high z-index prevents it from being hidden behind the card.
  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.zIndex = "99999";
  noBtn.style.margin = "0";

  if (noAttempts >= 5) {
    noMessage.textContent = "Okayyy, give up already 😭💗 I know you like me anyway! I know you love me, so stop trying to press No 😌💕";
    noMessage.classList.remove("hidden");
  }
}

// Mobile: the button runs away as soon as the finger touches it.
noBtn.addEventListener("pointerdown", (e) => {
  if (answered) return;
  e.preventDefault();
  e.stopPropagation();
  ignoreNextClick = true;
  moveNoButton();
});

// Prevent the synthetic click generated after a touch from moving it twice.
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (ignoreNextClick) {
    ignoreNextClick = false;
    return;
  }
  moveNoButton();
});

// Desktop: moving the cursor toward No makes it escape.
noBtn.addEventListener("mouseenter", () => {
  if (!('ontouchstart' in window)) moveNoButton();
});

// Keep it inside the viewport after rotation/resizing.
window.addEventListener("resize", () => {
  if (noBtn.style.position === "fixed" && !answered) moveNoButton();
});
