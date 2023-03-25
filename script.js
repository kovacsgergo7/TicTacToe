let boxes = Array.from(document.getElementsByClassName("gameBoard__box"));
let restartBtn = document.getElementById("restartBtn");
let playervsplayerBtn = document.getElementById("playervsplayer");
let playervscomputerBtn = document.getElementById("playervsai");
let result = document.getElementById("result");

const X_PLAYER = "X";
const O_PLAYER = "O";
let currentPlayer = X_PLAYER;

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

function startGame(){
    boxes.forEach(box => box.addEventListener("click", playerVSai));
    restartBtn.addEventListener("click", restartGame);
}

function playerVSai(e){
    let boxID = e.target.id;
    currentPlayer = X_PLAYER;
    if(hiddenBoard[boxID] != null)
    {
        return
    }
    
    hiddenBoard[boxID] = currentPlayer;
    e.target.innerText = currentPlayer;
    
    //check for win

   checkForWin();
    
    // todo: check tie
    let isItTie = checkforTie();
    if(isItTie)
    {
        result.innerText = "omg it is tie!";
    }
    else 
    {
        aiMove();
        checkForWin(O_PLAYER);
    }

}

function aiMove(){
    currentPlayer = O_PLAYER;
    while(true){
        let randomNumber = Math.floor(Math.random() * 8);
        console.log(randomNumber);
        if(hiddenBoard[randomNumber] == null){
            hiddenBoard[randomNumber] = O_PLAYER;
            boxes[randomNumber].innerText = O_PLAYER;
            break;
        }
    } 
}

function playerVSplayer(e){
    let boxID = e.target.id;

    if(hiddenBoard[boxID] != null)
    {
        return
    }
    
    hiddenBoard[boxID] = currentPlayer;
    e.target.innerText = currentPlayer;
    
    //check for win

   checkForWin();
    
    // todo: check tie

    if(checkforTie())
    {
        tieEndGame();
    }

    currentPlayer = currentPlayer == X_PLAYER ? O_PLAYER : X_PLAYER;
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
        }
    }
    return false;
}

function endGame(winArray){
    result.innerText = currentPlayer + " player WINS!";
    winArray.map(box => boxes[box].classList.add("winner-boxes"));
    boxes.forEach(box => box.removeEventListener("click", playerVSai));
}

function tieEndGame(){
    result.innerText = "omg it is tie!";
}


function restartGame(){
    hiddenBoard.fill(null);
    boxes.forEach( box => {
        box.innerText = "";
    })
    
    result.innerText = "";
    currentPlayer = X_PLAYER;
    boxes.forEach(box => box.classList.remove("winner-boxes"));
    startGame();
}
startGame();
