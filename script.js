let gameBoard = document.getElementById("gameBoard");
let boxes = Array.from(document.getElementsByClassName("gameBoard__box"));
let restartBtn = document.getElementById("restartBtn");
let result = document.getElementById("result");

let X_PLAYER = "X";
let O_PLAYER = "O";
let currentPlayer = X_PLAYER;

let hiddenBoard = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", clickonBox))
}

function clickonBox(e){
    const boxID = e.target.id;
    e.target.innerText = currentPlayer;
}

function playerWins(){

}

restartBtn.addEventListener("click", restartGame);

function restartGame(){
    hiddenBoard.fill(null);
    boxes.forEach( box => {
        box.innerText = "";
    })
}

startGame();