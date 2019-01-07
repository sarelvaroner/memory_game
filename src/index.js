const {URL, SIZE, IMAGES_URL_ARRAY} = require('./const') ;
const MemoryGameBoard = require('./MemoryGameBoard') ;
const boardElem = document.getElementById('board') ;
const movesElem = document.getElementById('moves') ;
const matchesElem = document.getElementById('matches') ;
const btnNewGame = document.getElementById('btnNewGame') ;
const highScoresElem = document.getElementById('highScores') ;
const scoreElem = document.getElementById('score') ;
const modalWin = document.getElementById('modalWin');
const modalScoreElem = document.getElementById('modalScore') ;
const timeElem = document.getElementById('time') ;
const btnNextLevel = document.getElementById('btnNextLevel') ;

let previousCardElement = null ;
let memoryGame;
let highScoreArray ;
let timeCounter = 0 ;
let timeToStop = null ;




window.onload = function(){
    fetch(URL)
        .then(response => response.json())
        .then((imagesJson) =>{
            for (let image of imagesJson){
                IMAGES_URL_ARRAY.push(image.imageUrl);
            }
            memoryGame = newBoard(SIZE , IMAGES_URL_ARRAY, boardElem);

            btnNextLevel.onclick = () => {
                modalWin.style.display = 'none';
                let oldBoardLength = memoryGame.board.length + 4;
                memoryGame = newBoard(oldBoardLength , IMAGES_URL_ARRAY, boardElem);
            };

            btnNewGame.onclick = () => {              
                modalWin.style.display = 'none';            
                let oldBoardLength = memoryGame.board.length;
                memoryGame = newBoard(oldBoardLength, IMAGES_URL_ARRAY, boardElem);
            };
        });
};

function newBoard(size, imageArray, boardElem, numberOfCards){
    endTimer();
    let board = new MemoryGameBoard(size, imageArray, numberOfCards);
    board.buildBoard();
    board.win = win;
    renderBoard(boardElem, board);
    updateDashboard(board);
    starTTimer();
    return board;  
}

function renderBoard(boardContainerElem, memoryGame){
    boardContainerElem.innerHTML = '';

    for (let card of memoryGame.board){

        let cardWrapperElem = document.createElement('div');
        cardWrapperElem.className = 'cardWrapper';

        let cardElem = document.createElement('img');
        cardElem.src = card.image;
        cardElem.className = 'card';
        cardElem.onclick = cardFlipper.bind(null, memoryGame, card, cardElem);

        cardWrapperElem.appendChild(cardElem);
        boardContainerElem.appendChild(cardWrapperElem);
    } 
}

function cardFlipper(memoryGame, card, cardElem){
    let matched = memoryGame.doesItMatched(card);

    switch(matched){

    case 'firstCard' :
        cardElem.classList.toggle('flipCard') ;
        previousCardElement = cardElem ;
        break;

    case 'matched' :
        cardElem.className = 'matched' ;
        previousCardElement.className = 'matched';
        previousCardElement = null ;
        break;
        
    case 'unmatched' :
        cardElem.classList.toggle('flipCard');
        setTimeout(() => {
            previousCardElement.classList.toggle('flipCard');
            cardElem.classList.toggle('flipCard');
        }, 500);
    } 
    updateDashboard(memoryGame);
}

function updateDashboard(memoryGame){
    movesElem.innerHTML = memoryGame.moves;
    matchesElem.innerHTML = memoryGame.matches;
    scoreElem.innerHTML = memoryGame.score;
    updateScore(memoryGame.score);
    highScoresElem.innerHTML = 
    `<tr><td>first place -  ${highScoreArray[2]}</td>
    <tr><td>first place -  ${highScoreArray[1]}</td>
    <tr><td>first place -  ${highScoreArray[0]}</td>`;
}

function win() {
    endTimer();
    updateScore(memoryGame.score);
    modalScoreElem.innerHTML = '32';
    modalWin.style.display = 'block';
    highScoresElem.innerHTML = 
    `<ul>
        <li>first place -  ${highScoreArray[2]}</li>
        <li>second place - ${highScoreArray[1]}</li>
        <li>third place -  ${highScoreArray[0]}</li> 
    </ul>`;
}

function updateScore(score){
    if(localStorage.getItem('highScores')){
        highScoreArray = JSON.parse(localStorage.getItem('highScores')); 
    }
    else highScoreArray = [0, 0, 0];
    if (highScoreArray[0] < score && !highScoreArray.includes(score)) highScoreArray[0] = score;
    highScoreArray.sort((a, b) => a - b);
    localStorage.setItem('highScores',JSON.stringify(highScoreArray));
    return ;
}

function starTTimer(){
    timeToStop = setInterval(() => {
        let hour = Math.floor(timeCounter / 3600); 
        hour > 10 ? hour  : hour + '0' ;
        let minute = Math.floor(timeCounter / 60 ) % 60 ;
        let seconds = Math.floor(timeCounter % 60 )  ;

        hour = hour > 10 ? hour  : `0${hour}`;
        minute = minute > 10 ? minute  : `0${minute}`;
        seconds = seconds > 10 ? seconds  : `0${seconds}`;
        timeElem.innerHTML = `${hour}:${minute}:${seconds}`;
        timeCounter++ ;
    }, 1000);
}

function endTimer(){
    timeCounter = 0 ;
    timeElem.innerHTML = '00:00:00';
    clearInterval(timeToStop);  
}
    






