let boxes = Array.from(document.getElementsByClassName("gameBoard__box"));
let playervsplayerBtn = document.getElementById("playervsplayer");
let playervsaiBtn = document.getElementById("playervsai");
let restartBtn = document.getElementById("restart-button");
let result = document.getElementById("result");


const X_PLAYER = "X";
const O_PLAYER = "O";
let currentPlayer = X_PLAYER;
let isPlayerVsPlayer = true;

let hiddenBoard = Array(9).fill(null);

// 0 1 2
// 3 4 5
// 6 7 8

const winnerCombinations = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [6,4,2]
]

function initializeGame(){
    playervsplayerBtn.addEventListener("click", startPvP);
    playervsaiBtn.addEventListener("click", startPvAi);
}

function startGame()
{
    
    if(!isPlayerVsPlayer)
    {
     boxes.forEach(box => box.removeEventListener("click", playerVsPlayer));
     boxes.forEach(box => box.addEventListener("click", playerVSai));
    }
    else
   {
   boxes.forEach(box => box.removeEventListener("click", playerVSai));
   boxes.forEach(box => box.addEventListener("click", playerVsPlayer));
   }

}

function addRestartBtn(){
    if(hiddenBoard.length != null)
    {
        restartBtn.style.opacity = "1";
        restartBtn.style.marginLeft = "0";
    }
}
function startPvP(e){
    playervsplayerBtn.classList.add("active");
    playervsaiBtn.classList.remove("active");
    restartBtn.addEventListener("click", restartGame);
    isPlayerVsPlayer = true;
    clearBoard(); 
    startGame();    
}

function playerVsPlayer(e)
{
    addRestartBtn();
    let boxID = e.target.id;

    if(hiddenBoard[boxID] != null)
    {
        return
    }
    
    hiddenBoard[boxID] = currentPlayer;
    e.target.innerText = currentPlayer;

    checkEndGame();

    currentPlayer = currentPlayer == X_PLAYER ? O_PLAYER : X_PLAYER;
}

function startPvAi(){
    playervsaiBtn.classList.add("active");
    playervsplayerBtn.classList.remove("active");
    restartBtn.addEventListener("click", restartGame);
    isPlayerVsPlayer = false;
    clearBoard();
    startGame();
}

function playerVSai(e){
    addRestartBtn();

    let boxID = e.target.id;
    currentPlayer = X_PLAYER;
    if(hiddenBoard[boxID] != null)
    {
        return
    }
    
    hiddenBoard[boxID] = currentPlayer;
    e.target.innerText = currentPlayer;
    
    checkEndGame();
    if(!checkForWin() && !checkforTie()) 
    {
        aiMove();
        checkForWin(O_PLAYER);
    }
}

function aiMove(){
    currentPlayer = O_PLAYER;
    while(true){
        let randomNumber = Math.floor(Math.random() * 8);
        if(hiddenBoard[randomNumber] == null){
            hiddenBoard[randomNumber] = O_PLAYER;
            boxes[randomNumber].innerText = O_PLAYER;
            break;
        }
    } 
}


function checkforTie(){
    let isitTie = true;
    for(var i = 0; i < hiddenBoard.length; i++ ){
        if(hiddenBoard[i] == null){
            isitTie = false;
        }
    }
    return isitTie;
}

function checkForWin(){
    for(let winArray of winnerCombinations){
        let [x,y,z] = winArray;
        let winner = hiddenBoard[x] == currentPlayer && hiddenBoard[y] == currentPlayer && hiddenBoard[z] == currentPlayer;
        if(winner){
            endGame(winArray);
            return true;
        }
    }
    return false;
}

function checkEndGame(){
    if(checkForWin()){
        return;
       }
        
    if(checkforTie())
    {
        tieEndGame();
    }
}

function endGame(winArray){
    result.innerText = currentPlayer + " player WINS!";
    winArray.map(box => boxes[box].classList.add("winner-boxes"));
    boxes.forEach(box => box.removeEventListener("click", playerVsPlayer));
    boxes.forEach(box => box.removeEventListener("click", playerVSai));
}

function tieEndGame(){
    if(!checkForWin())
    {
    result.innerText = "It is a tie!";
    }
}

function restartGame(){
    clearBoard();
    if(isPlayerVsPlayer)
    {
        startPvP();
    }
    else if(!isPlayerVsPlayer){
        startPvAi();
    }
}

function clearBoard(){
    hiddenBoard.fill(null);
    boxes.forEach( box => {
        box.innerText = "";
    })
    
    result.innerText = "";
    currentPlayer = X_PLAYER;
    boxes.forEach(box => box.classList.remove("winner-boxes"));
    initializeGame();
}

initializeGame();