// --- 1. Control del Reproductor de YouTube ---
let player;
let isApiReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtubePlayer', {
    videoId: '8L_hFFOJdok',
    playerVars: {
      autoplay: 0,
      rel: 0,
      playsinline: 1
    },
    events: {
      onReady: () => { isApiReady = true; },
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  // YT.PlayerState.ENDED = 0
  if (event.data === YT.PlayerState.ENDED) {
    minimizeVideo();
  }
}

function minimizeVideo() {
  const container = document.getElementById('videoContainer');
  if (container) {
    container.classList.remove('maximized');
  }
}

// --- 2. Audio FX ---
const cowabungaAudio = new Audio('cowabunga.mp3');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playCowabunga() {
  cowabungaAudio.currentTime = 0;
  cowabungaAudio.play().catch(() => {});
}

function playTone(type) {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'flip') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  } else if (type === 'mismatch') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

// --- 3. Personajes y GIFs Locales ---
const allScenes = [
  { id: 'leo', gif: 'leo.gif' },
  { id: 'don', gif: 'don.gif' },
  { id: 'raph', gif: 'raph.gif' },
  { id: 'mike', gif: 'mike.gif' },
  { id: 'splinter', gif: 'splinter.gif' },
  { id: 'shredder', gif: 'shredder.gif' },
  { id: 'all', gif: 'all.gif' },
  { id: 'leather', gif: 'leather.gif' },
  { id: 'april', gif: 'april.gif' }
];

// --- 4. Variables de Estado y DOM ---
const board = document.getElementById('gameBoard');
const turnDisplay = document.getElementById('turnDisplay');
const statsDisplay = document.getElementById('statsDisplay');
const modeModal = document.getElementById('modeModal');
const winModal = document.getElementById('winModal');
const failOverlay = document.getElementById('failOverlay');
const winMessage = document.getElementById('winMessage');
const videoContainer = document.getElementById('videoContainer');

let totalPlayers = 1;
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
let moves = 0;
let matchedPairs = 0;
let targetPairs = 5;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// --- 5. Flujo de Partida ---
function showModeModal() {
  closeWinModal();
  failOverlay.style.display = 'none';
  modeModal.style.display = 'flex';
}

function closeWinModal() {
  minimizeVideo();
  if (player && typeof player.stopVideo === 'function') {
    player.stopVideo();
  }
  winModal.style.display = 'none';
  showModeModal();
}

function startGame(playersCount) {
  totalPlayers = playersCount;
  currentPlayer = 1;
  scores = { 1: 0, 2: 0 };
  moves = 0;
  matchedPairs = 0;
  modeModal.style.display = 'none';
  winModal.style.display = 'none';
  failOverlay.style.display = 'none';

  // 1 Jugador = 5 pares (10 cartas), 2 Jugadores = 9 pares (18 cartas)
  targetPairs = (totalPlayers === 1) ? 5 : 9;
  board.style.gridTemplateColumns = (totalPlayers === 1) ? 'repeat(5, 105px)' : 'repeat(6, 105px)';

  updateHUD();
  buildBoard();
}

function updateHUD() {
  if (totalPlayers === 1) {
    turnDisplay.textContent = 'Modo Solitario';
    statsDisplay.innerHTML = `
      <span>Intentos: <strong>${moves}</strong></span>
      <span>Pares: <strong>${matchedPairs}</strong>/${targetPairs}</span>
    `;
  } else {
    turnDisplay.textContent = `Turno: Jugador ${currentPlayer} 🍕`;
    statsDisplay.innerHTML = `
      <span>Jugador 1: <strong>${scores[1]}</strong> pares</span>
      <span>Jugador 2: <strong>${scores[2]}</strong> pares</span>
    `;
  }
}

function buildBoard() {
  const selectedScenes = allScenes.slice(0, targetPairs);
  const cards = [...selectedScenes, ...selectedScenes].sort(() => Math.random() - 0.5);

  board.innerHTML = '';
  resetBoard();

  cards.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="card-face card-front">🐢</div>
      <div class="card-face card-back">
        <img src="${item.gif}" alt="${item.id}">
      </div>
    `;

    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

// --- 6. Mecánica de Turnos y Coincidencias ---
function flipCard() {
  if (lockBoard || this === firstCard) return;

  playTone('flip');
  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  updateHUD();
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.id === secondCard.dataset.id;
  isMatch ? handleMatch() : handleMismatch();
}

function handleMatch() {
  playCowabunga();

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchedPairs++;

  if (totalPlayers === 2) {
    scores[currentPlayer]++;
  }

  updateHUD();

  if (matchedPairs === targetPairs) {
    setTimeout(handleVictory, 600);
  }

  resetBoard();
}

function handleMismatch() {
  lockBoard = true;

  // Espera 1 segundo antes de mostrar el lost.gif
  setTimeout(() => {
    playTone('mismatch');
    failOverlay.style.display = 'flex';

    // Muestra lost.gif durante 1.2 segundos y luego voltea
    setTimeout(() => {
      failOverlay.style.display = 'none';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();

      if (totalPlayers === 2) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateHUD();
      }
    }, 1200);
  }, 1000);
}

function handleVictory() {
  if (totalPlayers === 1) {
    winMessage.textContent = `¡Completaste el tablero en ${moves} intentos!`;
  } else {
    if (scores[1] > scores[2]) {
      winMessage.textContent = `¡Jugador 1 gana con ${scores[1]} pares! 🏆`;
    } else if (scores[2] > scores[1]) {
      winMessage.textContent = `¡Jugador 2 gana con ${scores[2]} pares! 🏆`;
    } else {
      winMessage.textContent = `¡Empate! Ambos consiguieron ${scores[1]} pares. 🍕`;
    }
  }

  winModal.style.display = 'flex';

  // Maximizar contenedor a pantalla completa
  videoContainer.classList.add('maximized');

  // Reproducir video automáticamente
  if (isApiReady && player) {
    player.seekTo(0);
    player.playVideo();
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
