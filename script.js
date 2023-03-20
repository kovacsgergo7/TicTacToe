let gameBoard = document.getElementById("gameBoard");
let boxes = Array.from(document.getElementsByClassName("gameBoard__box"));
let restartBtn = document.getElementById("restartBtn");
let result = document.getElementById("result");

let X_PLAYER = "X";
let O_PLAYER = "O";
let currentPlayer = X_PLAYER;