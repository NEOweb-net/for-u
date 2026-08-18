const question = document.getElementById("question");
const gif = document.getElementById("gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const loveMessage = document.getElementById("love-message");
const noMessage = document.getElementById("no-message");

let noAttempts = 0;
let answered = false;

// YES: change the message + GIF and reveal the funny paragraph.
yesBtn.addEventListener("click", () => {
  if (answered) return;
  answered = true;

  question.innerHTML = "I knew it 😍";
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

  loveMessage.classList.remove("hidden");
  noMessage.classList.add("hidden");

  // Once YES is chosen, the No button is no longer needed.
  noBtn.style.display = "none";
});

function moveNoButton() {
  if (answered) return;

  noAttempts++;

  noBtn.style.position = "fixed";

  const padding = 16;
  const rect = noBtn.getBoundingClientRect();
  const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
  const maxY = Math.max(padding, window.innerHeight - rect.height - padding);

  const randomX = Math.floor(padding + Math.random() * Math.max(1, maxX - padding));
  const randomY = Math.floor(padding + Math.random() * Math.max(1, maxY - padding));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // After the 5th attempt, show the surrender message.
  if (noAttempts >= 5) {
    noMessage.textContent = "Okayyy, give up already 😭💗 I know you like me anyway! You can't fool me 😌💕";
    noMessage.classList.remove("hidden");
  }
}

// On phones/tablets: every attempted press makes the No button run away.
noBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Extra protection for desktop users who try to hover over it.
noBtn.addEventListener("mouseenter", () => {
  moveNoButton();
});

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});
