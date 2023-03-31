//Naming variables
const gameBoard = document.querySelector("#gameboard");
const [...boxes] = document.querySelectorAll(".box");
const restartBtn = document.querySelector("#restartbtn");
const playerText = document.querySelector("#playertext");
const player1 = "X";
const player2 = "O";
let currentPlayer = player1;
let tiles = Array(9).fill(null);
const winningcombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Start Game
function startGame() {
  boxes.forEach((box) => {
    box.addEventListener("click", function (e) {
      let id = e.target.id;
      if (!tiles[id]) {
        tiles[id] = currentPlayer;
        e.target.textContent = currentPlayer;
      }
      //Winning game
      if (playerHasWon() != false) {
        playerText.textContent = `${currentPlayer} has won`;
        playerHasWon().map((el) => {
          boxes[el].classList.add("winning-block");
        });
      }

      currentPlayer = currentPlayer == player1 ? player2 : player1;
    });
  });
}
//Checking if player has won
function playerHasWon() {
  for (const combo of winningcombo) {
    let [a, b, c] = combo;
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return [a, b, c];
    }
  }
  return false;
}

//Restarting the game
restartBtn.addEventListener("click", function () {
  tiles.fill(null);
  boxes.forEach((box) => {
    box.textContent = "";
    currentPlayer = player1;
    playerText.textContent = "tic tac toe";
    boxes.forEach((box) => {
      box.classList.remove("winning-block");
    });
  });
});

startGame();
