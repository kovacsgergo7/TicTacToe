let gameBoard = document.getElementById("gameBoard");
let boxes = Array.from(document.getElementsByClassName("gameBoard__box"));
let restartBtn = document.getElementById("restartBtn");
let result = document.getElementById("result");

let X_PLAYER = "X";
let O_PLAYER = "O";
let currentPlayer = X_PLAYER;
let moves = 0;

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

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", clickonBox));
}

function clickonBox(e){
    const boxID = e.target.id;

    if(hiddenBoard[boxID] == null){
        hiddenBoard[boxID] = currentPlayer;
        e.target.innerText = currentPlayer;
        moves++;

       
        if(playerWins() != false){
            let winnerBlocks = playerWins();
            
            //winnerBlocks.map(box => boxes[box].style.backgroundColor = "red")
            winnerBlocks.map(box => boxes[box].classList.add("winner-boxes"));

            result.innerText = currentPlayer + " player WINS!";
            boxes.forEach(box => box.removeEventListener("click", clickonBox));
        }
        else if(moves == 9){
            result.innerText = "It is a TIE!"
        }
        
    }


    currentPlayer = currentPlayer == X_PLAYER ? O_PLAYER : X_PLAYER;
    
}

function playerWins(){
    for(let winArray of winnerCombinations){
        let [x,y,z] = winArray;
        // 
        let winner = hiddenBoard[x] && (hiddenBoard[x] == hiddenBoard[y] && hiddenBoard[x]) == hiddenBoard[z];
        if(winner){
            return[x,y,z];
        }
    }
    return false;
}

restartBtn.addEventListener("click", restartGame);

function restartGame(){
    hiddenBoard.fill(null);
    boxes.forEach( box => {
        box.innerText = "";
    })
    
    moves = 0;
    result.innerText = "";
    currentPlayer = X_PLAYER;
    boxes.forEach(box => box.classList.remove("winner-boxes"));
    boxes.forEach(box => box.addEventListener("click", clickonBox));
}

startGame();