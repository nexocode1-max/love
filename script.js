const text = "I want to tell you that...";
let index = 0;

let celebrationStarted = false;

let cycleCount = 0;
const maxCycles = 2; // 🔥 change this if you want more cycles

/* ---------------- TYPING EFFECT ---------------- */

function typeEffect() {
  if (index < text.length) {
    const char = text.charAt(index);
    document.getElementById("typing").innerHTML += char;

    let speed = Math.random() * 80 + 40;
    if (char === ".") speed = 300;

    index++;
    setTimeout(typeEffect, speed);
  } else {
     startMusicWithAnimation(); // 🔥 HERE
  setTimeout(startSequence, 1000);

  }
}

/* ---------------- MAIN SEQUENCE ---------------- */

function startSequence() {
  runStep();
}

function runStep() {
  if (cycleCount === 0) {
    // first batch → then heart
    showFiveTexts(() => {
      playHeartOnce(() => {
        cycleCount++;
        runStep();
      });
    });

  } else if (cycleCount === 1) {
    // second batch → STOP
    showFiveTexts(() => {
      cycleCount++;
    });
  }
}
/* ---------------- SHOW 5 TEXTS ---------------- */

function showFiveTexts(callback) {
  let count = 0;

  function addText() {
    if (count < 5) {
      const div = document.createElement("div");
      div.classList.add("loveText");
      div.innerText = "I LOVE YOU ❤️";

      const container = document.getElementById("loveContainer");
container.appendChild(div);

      // start celebration only once
      if (!celebrationStarted) {
        startCelebration();
        celebrationStarted = true;
      }

      count++;
      setTimeout(addText, 700);
    } else {
      callback();
    }
  }

  addText();
}

/* ---------------- HEART ANIMATION ---------------- */

function playHeartOnce(callback) {
  const container = document.getElementById("loveContainer");

  const heartWrapper = document.createElement("div");
  heartWrapper.classList.add("heartWrapper");

  heartWrapper.innerHTML = `
    <svg viewBox="0 0 100 100" class="heart">
      <path d="M50 90 
               L20 60 
               A15 15 0 1 1 50 30 
               A15 15 0 1 1 80 60 
               Z"/>
    </svg>
  `;

  container.appendChild(heartWrapper);

  const path = heartWrapper.querySelector("path");

  // 🔥 ensure animation triggers
  path.classList.remove("animate-heart");
  void path.offsetWidth;
  path.classList.add("animate-heart");

  // 🔥 GUARANTEED callback (no fail)
  setTimeout(() => {
    if (typeof callback === "function") {
      callback();
    }
  }, 2200); // slightly more than CSS animation
}

/* ---------------- FLOATING HEARTS ---------------- */

function startCelebration() {
  const container = document.getElementById("celebration");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart-float");
    heart.innerText = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 10) + "px";
    heart.style.animationDuration = (Math.random() * 2 + 3) + "s";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }, 150);
}
function playMusic() {
  const music = document.getElementById("bgMusic");
  music.play();
}

window.addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  music.muted = false;
  music.play();
}, { once: true });

function startMusicWithAnimation() {
  const music = document.getElementById("bgMusic");

  music.play();

  let volume = 0;
  music.volume = 0;
  music.muted = false; // try unmuting

  const fade = setInterval(() => {
    if (volume < 0.5) {
      volume += 0.05;
      music.volume = volume;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

/* ---------------- START ---------------- */

window.onload = typeEffect;