const title = document.querySelector('.board__title')
const allSquares = document.querySelectorAll('.board__square')

let currentPlayer ="X";
let gameOver = false;
let board = new Array(9)


//  Event listener for square clicks
allSquares.forEach((square, i) => {
    square.addEventListener(("click"), () => {
        // Block clicks if already full or game is over
        if (square.innerHTML || gameOver) {
            return;
        }

        // Set the selected square to current player's value, remember it, and display their symbol there
        board[i] = currentPlayer;
        square.innerHTML = currentPlayer;

        // Every click, check for a win
        if (checkWin()) {
            title.innerHTML = `${currentPlayer} wins!`;
            return gameOver = true;
        }

        if(checkDraw()){
        title.innerHTML = `It's a tie!`;
        return gameOver = true;
        }
        
        switchPlayers();
        title.innerHTML = `${currentPlayer}'s turn`;
    });
});

function restartGame() {
    // Reset the game
    gameOver = false;
    // Reset the title font
    title.innerHTML = `${currentPlayer}'s turn`;
    // Reset each square
    allSquares.forEach(square => {
        square.innerHTML = "";
    })
    // Reset the board
    board = new Array(9)
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
        [2, 4, 6]
    ]

    // Loop through winning combinations. Pull the 3 indicies from reach subarray and the symbol stored at those indicies. If 3 symbols are the same, its a win. If symbols are not the same, keep game going.
    for (let i = 0; i < winningIndicies.length; i++){
        const matchingIndicies = winningIndicies[i];
        let symbol1 = board[matchingIndicies[0]]
        let symbol2 = board[matchingIndicies[1]]
        let symbol3 = board[matchingIndicies[2]]

        if(!symbol1 || !symbol2 || !symbol3) {
            continue;
        }

        if (symbol1 === symbol2 && symbol2 === symbol3) {
            console.log("Winner at", matchingIndicies);
            return true;
        }
    }
}

function switchPlayers() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

