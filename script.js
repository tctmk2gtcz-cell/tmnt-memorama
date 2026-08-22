// --- 1. Sistema de Audio Sintetizado ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  switch (type) {
    case 'flip':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
      break;

    case 'match':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;

    case 'mismatch':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      break;

    case 'win':
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);

        const start = now + (i * 0.12);
        o.frequency.setValueAtTime(freq, start);
        g.gain.setValueAtTime(0.25, start);
        g.gain.exponentialRampToValueAtTime(0.01, start + 0.35);
        o.start(start);
        o.stop(start + 0.35);
      });
      break;
  }
}

// --- 2. Datos de las Escenas/Personajes ---
const scenes = [
  { id: 'leo', name: 'Leonardo', icon: '⚔️' },
  { id: 'don', name: 'Donatello', icon: '🟣' },
  { id: 'raph', name: 'Raphael', icon: '🔴' },
  { id: 'mike', name: 'Michelangelo', icon: '🍕' },
  { id: 'splinter', name: 'Splinter', icon: '🥋' },
  { id: 'shredder', name: 'Shredder', icon: '🦹' }
];

// --- 3. Variables de Control de Estado ---
const board = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const restartBtn = document.getElementById('restartBtn');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matchedPairs = 0;

// --- 4. Inicialización y Barajado ---
function initGame() {
  const cards = [...scenes, ...scenes].sort(() => Math.random() - 0.5);

  board.innerHTML = '';
  moves = 0;
  matchedPairs = 0;
  movesDisplay.textContent = moves;
  matchesDisplay.textContent = matchedPairs;
  resetBoard();

  cards.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="card-face card-front">🐢</div>
      <div class="card-face card-back">
        <span class="icon">${item.icon}</span>
        <span>${item.name}</span>
      </div>
    `;

    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

// --- 5. Manejo del Giro de Cartas ---
function flipCard() {
  if (lockBoard || this === firstCard) return;

  playSound('flip');
  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  movesDisplay.textContent = moves;
  checkMatch();
}

// --- 6. Validación de Coincidencias ---
function checkMatch() {
  const isMatch = firstCard.dataset.id === secondCard.dataset.id;
  isMatch ? handleMatch() : handleMismatch();
}

function handleMatch() {
  playSound('match');
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchedPairs++;
  matchesDisplay.textContent = matchedPairs;

  if (matchedPairs === scenes.length) {
    setTimeout(() => {
      playSound('win');
      alert(`¡Cowabunga! Completaste el tablero en ${moves} intentos.`);
    }, 400);
  }

  resetBoard();
}

function handleMismatch() {
  lockBoard = true;
  playSound('mismatch');

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 900);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

restartBtn.addEventListener('click', initGame);
initGame();