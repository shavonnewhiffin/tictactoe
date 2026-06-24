const title = document.querySelector(".board__title");
const allSquares = document.querySelectorAll(".board__square");
const celebration = document.querySelector(".celebration");
const dialogueContainer = document.querySelector('.dialogue__container')
const restart = document.querySelector('.restart')

// UI Document Selectors
const speechBubble = document.getElementById("speech-bubble");
const nextBtn = document.getElementById("next-btn");
const gameBoard = document.querySelector(".board__wrapper");

nextBtn.addEventListener("click", advanceTutorial);

// Tutorial Dialogue Script Array
const tutorialLines = [
  "Hi! I'm Bodhi, your Tic-Tac-Toe coach.",
  "Before we play, let me explain how to win.",
  "Your goal is to get 3 of me or my sister Sadie in a straight row.",
  "This can be horizontal, vertical, or diagonal.",
  "I'll go first. The board is locked until we finish chatting!",
];

let currentLineIndex = 0;

let currentPlayer = "Bodhi";
let gameOver = false;
let board = new Array(9);

// 1. Advance Dialogue Lines
function advanceTutorial() {
  currentLineIndex++;

  if (currentLineIndex < tutorialLines.length) {
    speechBubble.textContent = tutorialLines[currentLineIndex];

    // Change button text on the last statement
    if (currentLineIndex === tutorialLines.length - 1) {
      nextBtn.textContent = "Start Game";
      nextBtn.style.backgroundColor = "#E0799A";
    }
  } else {
    // Tutorial Finished
    gameBoard.classList.add("active"); // Unlock board layout via CSS class
    dialogueContainer.style.display = "none";
  }
}

function skipTutorial() {
  gameBoard.classList.add("active"); // Unlock board layout via CSS class
  dialogueContainer.style.display = "none";
}

//  Event listener for square clicks
allSquares.forEach((square, i) => {
  square.addEventListener("click", () => {
    // Block clicks if already full or game is over
    if (square.innerHTML || gameOver) {
      return;
    }

    // Set the selected square to current player's value, remember it, and display their symbol there
    board[i] = currentPlayer;
    square.innerHTML = `<img src="assets/${
      currentPlayer === "Bodhi" ? "Bo.png" : "Sad.png"
    }">`;
    if (currentPlayer === "Bodhi") {
      square.classList.add("board__square--bodhi");
    } else {
      square.classList.add("board__square--sadie");
    }

    // Every click, check for a win
    if (checkWin()) {
      title.innerHTML = `${currentPlayer} wins!`;
      title.classList.add("celebration__text");
      celebrateWin(currentPlayer);
      return (gameOver = true);
    }

    if (checkDraw()) {
      title.innerHTML = `It's a tie!`;
      restart.classList.add("celebration__text");
      return (gameOver = true);
    }

    switchPlayers();
    title.innerHTML = `${currentPlayer}'s turn`;
  });
});

function restartGame() {
  // Reset the game
  gameOver = false;
  // Reset the title font
  title.classList.remove("celebration__text");
  restart.classList.remove("celebration__text");
  title.innerHTML = `${currentPlayer}'s turn`;
  // Reset each square
  allSquares.forEach((square) => {
    square.innerHTML = "";
    square.classList.remove("board__square--bodhi", "board__square--sadie");
  });
  // Reset the board
  board = new Array(9);
  // Clear any falling celebration icons
  celebration.innerHTML = "";
}

// Spawn falling icons of the winning player that animate down from the top of the screen
function celebrateWin(player) {
  const imageSrc = `assets/${player === "Bodhi" ? "Bo.png" : "Sad.png"}`;
  const iconCount = 30;

  for (let i = 0; i < iconCount; i++) {
    const icon = document.createElement("img");
    icon.src = imageSrc;
    icon.className = "celebration__icon";

    const size = 50 + Math.random() * 50;
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.width = `${size}px`;
    icon.style.height = `${size}px`;
    icon.style.animationDuration = `${2 + Math.random() * 2}s`;
    icon.style.animationDelay = `${Math.random() * 1.5}s`;

    icon.addEventListener("animationend", () => icon.remove());
    celebration.appendChild(icon);
  }
}

// Loop through the board. If any squares in the board are empty its not a tie yet.
function checkDraw() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === undefined) {
      return false;
    }
  }
  return true;
}

function checkWin() {
  const winningIndicies = [
    // Horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Loop through winning combinations. Pull the 3 indicies from reach subarray and the symbol stored at those indicies. If 3 symbols are the same, its a win. If symbols are not the same+
  //
  //
  //
  //
  //
  //
  //
  // , keep game going.
  for (let i = 0; i < winningIndicies.length; i++) {
    const matchingIndicies = winningIndicies[i];
    let symbol1 = board[matchingIndicies[0]];
    let symbol2 = board[matchingIndicies[1]];
    let symbol3 = board[matchingIndicies[2]];

    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    if (symbol1 === symbol2 && symbol2 === symbol3) {
      console.log("Winner at", matchingIndicies);
      return true;
    }
  }
}

function switchPlayers() {
  currentPlayer = currentPlayer === "Bodhi" ? "Sadie" : "Bodhi";
}

speechBubble.textContent = tutorialLines[0];
