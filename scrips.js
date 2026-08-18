const question = document.getElementById("question");
const gif = document.getElementById("gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const loveMessage = document.getElementById("love-message");
const noMessage = document.getElementById("no-message");
const waBtn = document.getElementById("wa-btn");

let noAttempts = 0;
let answered = false;
let ignoreNextClick = false;

// YES: change the message + GIF, then hide BOTH buttons.
yesBtn.addEventListener("click", () => {
  if (answered) return;
  answered = true;

  question.textContent = "I knew it 😍";
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

  loveMessage.classList.remove("hidden");
  noMessage.classList.add("hidden");

  // Buttons disappear only AFTER YES is pressed.
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  // WhatsApp button appears only after YES.
  // Ganti nomor di bawah dengan nomor WhatsApp kamu.
  const waNumber = "6285150836288";
  const waText = encodeURIComponent("Hi baby, I finally said YES 🥹❤️");
  waBtn.href = `https://wa.me/${waNumber}?text=${waText}`;
  waBtn.classList.remove("hidden");
});

function moveNoButton() {
  if (answered) return;

  noAttempts++;

  const wrapper = document.getElementById("wrapper");

  if (!wrapper) return;

  const wrapperRect = wrapper.getBoundingClientRect();
  const buttonRect = noBtn.getBoundingClientRect();

  const padding = 15;

  const minX = wrapperRect.left + padding;
  const minY = wrapperRect.top + padding;

  const maxX = wrapperRect.right - buttonRect.width - padding;
  const maxY = wrapperRect.bottom - buttonRect.height - padding;

  const randomX =
    minX + Math.random() * Math.max(0, maxX - minX);

  const randomY =
    minY + Math.random() * Math.max(0, maxY - minY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.right = "auto";
  noBtn.style.bottom = "auto";
  noBtn.style.margin = "0";
  noBtn.style.zIndex = "99999";

  noBtn.style.transition =
    "left 0.25s ease, top 0.25s ease";
}

  // Every multiple of 5 gets a new tease. The No button NEVER disappears here.
  const noMessages = [
    "already?! 😭 Kamu masih berusaha? Just give up, I know you like me anyway! 💗",
    "BABEE?? 😭💀 Udah nyerah aja kamuu🫣.",
    "😭 Serius masih mau kabur dari kenyataan? You like me, admit it! 😌💕",
    "HAHAHA 😭 Kamu lucu banget kalau denial. Just press YES already! ❤️",
    "😭💗 Aku kasih tahu ya... Kamu ga bisa bohongin diri kamuu😛.",
    "OKEEE 😭 Kamu benar-benar gigih. But I know you love me anyway. 🫵💕"
  ];

  if (noAttempts % 5 === 0) {
    const messageIndex = Math.min(
      Math.floor(noAttempts / 5) - 1,
      noMessages.length - 1
    );
    noMessage.textContent = noMessages[messageIndex];
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
