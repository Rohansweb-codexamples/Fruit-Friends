const fruitStyles = {
  apple: { color: "#ef4444", shape: "50%" },
  banana: { color: "#facc15", shape: "45% 55% 45% 55% / 60% 40% 60% 40%" },
  orange: { color: "#fb923c", shape: "50%" },
  strawberry: { color: "#f43f5e", shape: "45% 45% 50% 50% / 40% 40% 60% 60%" },
  grapes: { color: "#8b5cf6", shape: "44%" },
};

const state = {
  selected: "apple",
  growth: 0,
  happiness: 0,
  adopted: false,
};

const fruitSelect = document.getElementById("fruitSelect");
const adoptBtn = document.getElementById("adoptBtn");
const petBtn = document.getElementById("petBtn");
const feedBtn = document.getElementById("feedBtn");
const playBtn = document.getElementById("playBtn");
const statusEl = document.getElementById("status");
const growthValue = document.getElementById("growthValue");
const happinessValue = document.getElementById("happinessValue");
const fruitContainer = document.getElementById("fruitContainer");
const fruitEl = document.getElementById("fruit");

function renderFruit() {
  const style = fruitStyles[state.selected];
  fruitEl.style.background = style.color;
  fruitEl.style.borderRadius = style.shape;
  fruitEl.style.transform = `scale(${1 + state.growth / 100})`;
}

function updateStats() {
  growthValue.textContent = state.growth;
  happinessValue.textContent = state.happiness;
}

function setStatus(text) {
  statusEl.textContent = text;
}

function animatePet() {
  fruitEl.animate(
    [
      { transform: `scale(${1 + state.growth / 100}) rotate(0deg)` },
      { transform: `scale(${1 + state.growth / 100}) rotate(-6deg)` },
      { transform: `scale(${1 + state.growth / 100}) rotate(6deg)` },
      { transform: `scale(${1 + state.growth / 100}) rotate(0deg)` },
    ],
    { duration: 350, easing: "ease-out" },
  );
}

function clampState() {
  state.growth = Math.min(state.growth, 100);
  state.happiness = Math.min(state.happiness, 100);
}

function unlockActions() {
  petBtn.disabled = false;
  feedBtn.disabled = false;
  playBtn.disabled = false;
}

adoptBtn.addEventListener("click", () => {
  state.selected = fruitSelect.value;
  state.growth = 10;
  state.happiness = 10;
  state.adopted = true;

  fruitContainer.classList.remove("hidden");
  unlockActions();
  renderFruit();
  updateStats();
  setStatus(`You adopted a ${state.selected}! Your fruit friend looks excited!`);
});

petBtn.addEventListener("click", () => {
  if (!state.adopted) return;
  state.happiness += 8;
  state.growth += 4;
  clampState();
  updateStats();
  animatePet();
  setStatus(`You pet your ${state.selected}. It beams with joy!`);
});

feedBtn.addEventListener("click", () => {
  if (!state.adopted) return;
  state.growth += 12;
  state.happiness += 4;
  clampState();
  renderFruit();
  updateStats();
  setStatus(`Yum! Your ${state.selected} had a healthy snack and grew bigger.`);
});

playBtn.addEventListener("click", () => {
  if (!state.adopted) return;
  state.happiness += 10;
  state.growth += 6;
  clampState();
  renderFruit();
  updateStats();
  setStatus(`Playtime was a hit! Your ${state.selected} is happier and stronger.`);
});

fruitSelect.addEventListener("change", (event) => {
  state.selected = event.target.value;
  if (state.adopted) {
    renderFruit();
    setStatus(`You switched to ${state.selected}. Keep caring to help it thrive.`);
  }
});
