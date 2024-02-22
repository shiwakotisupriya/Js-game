// Store game status here to allow us to use easily later


const displayStatus= document.querySelector('.gameStatus');

let active= true;  //use active to pause the game if game ends

let  currentTrun= "X"; // inorder to know whose trun

let gameCondition=["", "", "", "", "", "", "", "", ""];


const toWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winner=() => `Player ${currentTrun} is Winner!!`;

const draw=() =>`It's Draw!!`;

const currentlyPlaying = () => `It's trun of ${currentTrun}`;



statusDisplay.innerHTML=currentlyPlaying();


function playedCell(clicked, indexClicked){
    gameCondition[indexClicked]= currentTrun;
    clicked.innerHTML= currentTrun;
}


function changePlayer(){

    currentTrun=currentTrun=="X"? "O":"X";
    displayStatus.innerHTML = currentlyPlaying();

}

function validateResult(){
    let winningRound=false;


    for(let e=0; e<=9;e++){
        const conditions=toWin[e];
        let qx = gameCondition[conditions[0]];
        let wx = gameCondition[conditions[1]];
        let pk = gameCondition[conditions[2]];

        if(qx===''|| wx===''|| pk===''){
            continue;
        }
        if(qx=== wx && wx=== pk ){
            winningRound= true;
            break
        }
    }

    if (winningRound){
        displayStatus.innerHTML = winner();
        active= false;
        return;
    }

    let itsDraw=!gameCondition.includes("");
    if(itsDraw){
        displayStatus.innerHTML=draw();
        active=false;
        return;
    }
    changePlayer();
}


function clickCell(clickedEvent){

    const clicked= clickedEvent.target;

    const indexClicked= parseInt(clicked.getAttribute('data-cell-index'));

    if(gameCondition[indexClicked] !== ""|| !active){
        return;
    }

    playedCell(clicked, indexClicked);

    validateResult();

}


function playAgain(){
    active=true;
    currentTrun="X";
    gameCondition=["", "", "", "", "", "", "", "", ""];
    displayStatus.innerHTML=currentlyPlaying();
    document.querySelectorAll('.cl').forEach(cl=>cl.innerHTML="");


}

document.querySelectorAll('.cl').forEach(cl=> cl.addEventListener('click',clickCell));
document.querySelector('.play').addEventListener('click', playAgain);

    


