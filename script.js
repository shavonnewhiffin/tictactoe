const title = document.querySelector('.board__title')
const allSquares = document.querySelectorAll('.board__square')

let currentPlayer ="X";
let gameOver = false;
let board = new Array(9)


// Square Event listener
allSquares.forEach((square, i) => {
    square.addEventListener(("click"), () => {
        if (square.innerHTML || gameOver) {
            return;
        }

        square.innerHTML = currentPlayer;
        // Set element at the clicked index to the current player's symbol
        board[i] = currentPlayer;

        console.log(board);

        if (checkWin()){
            console.log("this runs")
            title.innerHTML = `${currentPlayer} wins!`
            gameOver = true;
            return
        }

        if(checkDraw()){
        title.innerHTML = `It's a tie!`
        gameOver = true;
        return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        title.innerHTML = `${currentPlayer}'s turn`;
    })
}) 

function checkDraw() {
    for (let i = 0; i <board.length; i++) {
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

    for (let i = 0; i <winningIndicies.length; i++){
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

