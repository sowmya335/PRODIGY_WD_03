// Game Variables
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning Patterns
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle Cell Click
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        
        if (!boardState[index] && gameActive) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.style.color = currentPlayer === "X" ? "#ff4b5c" : "#4bff50";

            if (checkWinner()) {
                statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
                gameActive = false;
            } else if (!boardState.includes("")) {
                statusText.textContent = "It's a Draw! 😐";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.textContent = `Player ${currentPlayer}'s Turn`;
            }
        }
    });
});

// Check Winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

// Restart Game
restartBtn.addEventListener("click", () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = "");
});
