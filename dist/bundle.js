/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MemoryGameBoard.js":
/*!********************************!*\
  !*** ./src/MemoryGameBoard.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class MemoryGameBoard {

    constructor(size, imagesArray, numberOfCards = null){
        if (size % 2 !== 0) throw new Error('size must be even');
        this._board = (Array(size).fill(0)) ;
        this._imagesArr = imagesArray ;
        
        this._flipped = null ;
        this._moves = 0 ;
        this._matches = 0 ;
        this._time = 0;
        this._stopTimer = null;
        this._score =0;
        this._numberOfCards = numberOfCards ? numberOfCards: this._imagesArr.length;
    }
       
    buildBoard(){
        for (let id = 0; id < this._board.length; id += 2){
            let imageId = id / 2 % this._numberOfCards ;
            let image = this._imagesArr[imageId];
            this._board[id] = {image, id: imageId, matched : false} ;
            this._board[id + 1] = {image, id: imageId, matched : false} ;
        }
        this.shuffles();            
    }       
         
    doesItMatched(card){
        if (card.matched || card === this._flipped) return;
        let result = 'unmatched'; 
        if (!this._flipped){
            result = null ;
            this._flipped = card ;
            result = 'firstCard';
        } 
        else if (this._flipped.id !== card.id) this._flipped = null;
        else{
            result = 'matched' ;
            card.matched = true ;
            this._flipped.matched = true ;

            this._flipped = null;         
            this._matches++;
            this._score += 10 ;
            if(this.winGame()) this.win(); 
        }
        this._moves++;
        return result;      
    }  

    winGame(){
        return this._board.length / 2 === this._matches ;
    }

    get score(){
        return this._score ;
    }  

    get matches (){
        return this._matches;
    }

    get board(){
        return this._board; 
    }

    get moves(){
        return this._moves;
    }

    set time(number){
        return this._time = number;
    }

    get numberOfCards(){
        return this._numberOfCards;
    }

    shuffles(){
        for (let i = 0; i < this._board.length; i++){
            let j = Math.floor(Math.random() * (i + 1)); 
            [this._board[i], this._board[j]]  = [this._board[j], this._board[i]];           
        }
    }
}







module.exports = MemoryGameBoard;

/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

const URL = 'http://localhost:3000/images';
const SIZE = 4;
const IMAGES_URL_ARRAY = [];


module.exports = {
    URL,
    SIZE,
    IMAGES_URL_ARRAY,
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {URL, SIZE, IMAGES_URL_ARRAY} = __webpack_require__(/*! ./const */ "./src/const.js") ;
const MemoryGameBoard = __webpack_require__(/*! ./MemoryGameBoard */ "./src/MemoryGameBoard.js") ;
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
    








/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01lbW9yeUdhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLHlCQUF5QjtBQUNqRDtBQUNBO0FBQ0EsK0JBQStCLG9DQUFvQztBQUNuRSxtQ0FBbUMsb0NBQW9DO0FBQ3ZFO0FBQ0Esd0I7QUFDQSxLOztBQUVBO0FBQ0E7QUFDQSxpQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUM7QUFDQTtBQUNBO0FBQ0EsMEM7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQSxLOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLHdCQUF3QjtBQUMvQyx3RDtBQUNBLGlGO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBLGlDOzs7Ozs7Ozs7OztBQzNGQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNUQSxPQUFPLDRCQUE0QixHQUFHLG1CQUFPLENBQUMsK0JBQVM7QUFDdkQsd0JBQXdCLG1CQUFPLENBQUMsbURBQW1CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDO0FBQ0EsZ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsSztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRCw2QkFBNkIsa0JBQWtCO0FBQy9DLDZCQUE2QixrQkFBa0I7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0JBQWtCO0FBQy9DLDZCQUE2QixrQkFBa0I7QUFDL0MsNkJBQTZCLGtCQUFrQjtBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsS0FBSztBQUM1Qyw2Q0FBNkMsT0FBTztBQUNwRCxnREFBZ0QsUUFBUTtBQUN4RCxnQ0FBZ0MsS0FBSyxHQUFHLE9BQU8sR0FBRyxRQUFRO0FBQzFEO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjbGFzcyBNZW1vcnlHYW1lQm9hcmQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemUsIGltYWdlc0FycmF5LCBudW1iZXJPZkNhcmRzID0gbnVsbCl7XHJcbiAgICAgICAgaWYgKHNpemUgJSAyICE9PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ3NpemUgbXVzdCBiZSBldmVuJyk7XHJcbiAgICAgICAgdGhpcy5fYm9hcmQgPSAoQXJyYXkoc2l6ZSkuZmlsbCgwKSkgO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlc0FyciA9IGltYWdlc0FycmF5IDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9mbGlwcGVkID0gbnVsbCA7XHJcbiAgICAgICAgdGhpcy5fbW92ZXMgPSAwIDtcclxuICAgICAgICB0aGlzLl9tYXRjaGVzID0gMCA7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc3RvcFRpbWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zY29yZSA9MDtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZkNhcmRzID0gbnVtYmVyT2ZDYXJkcyA/IG51bWJlck9mQ2FyZHM6IHRoaXMuX2ltYWdlc0Fyci5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICAgICBcclxuICAgIGJ1aWxkQm9hcmQoKXtcclxuICAgICAgICBmb3IgKGxldCBpZCA9IDA7IGlkIDwgdGhpcy5fYm9hcmQubGVuZ3RoOyBpZCArPSAyKXtcclxuICAgICAgICAgICAgbGV0IGltYWdlSWQgPSBpZCAvIDIgJSB0aGlzLl9udW1iZXJPZkNhcmRzIDtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gdGhpcy5faW1hZ2VzQXJyW2ltYWdlSWRdO1xyXG4gICAgICAgICAgICB0aGlzLl9ib2FyZFtpZF0gPSB7aW1hZ2UsIGlkOiBpbWFnZUlkLCBtYXRjaGVkIDogZmFsc2V9IDtcclxuICAgICAgICAgICAgdGhpcy5fYm9hcmRbaWQgKyAxXSA9IHtpbWFnZSwgaWQ6IGltYWdlSWQsIG1hdGNoZWQgOiBmYWxzZX0gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNodWZmbGVzKCk7ICAgICAgICAgICAgXHJcbiAgICB9ICAgICAgIFxyXG4gICAgICAgICBcclxuICAgIGRvZXNJdE1hdGNoZWQoY2FyZCl7XHJcbiAgICAgICAgaWYgKGNhcmQubWF0Y2hlZCB8fCBjYXJkID09PSB0aGlzLl9mbGlwcGVkKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9ICd1bm1hdGNoZWQnOyBcclxuICAgICAgICBpZiAoIXRoaXMuX2ZsaXBwZWQpe1xyXG4gICAgICAgICAgICByZXN1bHQgPSBudWxsIDtcclxuICAgICAgICAgICAgdGhpcy5fZmxpcHBlZCA9IGNhcmQgO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAnZmlyc3RDYXJkJztcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2ZsaXBwZWQuaWQgIT09IGNhcmQuaWQpIHRoaXMuX2ZsaXBwZWQgPSBudWxsO1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICdtYXRjaGVkJyA7XHJcbiAgICAgICAgICAgIGNhcmQubWF0Y2hlZCA9IHRydWUgO1xyXG4gICAgICAgICAgICB0aGlzLl9mbGlwcGVkLm1hdGNoZWQgPSB0cnVlIDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ZsaXBwZWQgPSBudWxsOyAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9tYXRjaGVzKys7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njb3JlICs9IDEwIDtcclxuICAgICAgICAgICAgaWYodGhpcy53aW5HYW1lKCkpIHRoaXMud2luKCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tb3ZlcysrO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7ICAgICAgXHJcbiAgICB9ICBcclxuXHJcbiAgICB3aW5HYW1lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvYXJkLmxlbmd0aCAvIDIgPT09IHRoaXMuX21hdGNoZXMgO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY29yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZSA7XHJcbiAgICB9ICBcclxuXHJcbiAgICBnZXQgbWF0Y2hlcyAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYm9hcmQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm9hcmQ7IFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtb3Zlcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb3ZlcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdGltZShudW1iZXIpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lID0gbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBudW1iZXJPZkNhcmRzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mQ2FyZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2h1ZmZsZXMoKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2JvYXJkLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTsgXHJcbiAgICAgICAgICAgIFt0aGlzLl9ib2FyZFtpXSwgdGhpcy5fYm9hcmRbal1dICA9IFt0aGlzLl9ib2FyZFtqXSwgdGhpcy5fYm9hcmRbaV1dOyAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbW9yeUdhbWVCb2FyZDsiLCJjb25zdCBVUkwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2ltYWdlcyc7XHJcbmNvbnN0IFNJWkUgPSA0O1xyXG5jb25zdCBJTUFHRVNfVVJMX0FSUkFZID0gW107XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBVUkwsXHJcbiAgICBTSVpFLFxyXG4gICAgSU1BR0VTX1VSTF9BUlJBWSxcclxufTsiLCJjb25zdCB7VVJMLCBTSVpFLCBJTUFHRVNfVVJMX0FSUkFZfSA9IHJlcXVpcmUoJy4vY29uc3QnKSA7XHJcbmNvbnN0IE1lbW9yeUdhbWVCb2FyZCA9IHJlcXVpcmUoJy4vTWVtb3J5R2FtZUJvYXJkJykgO1xyXG5jb25zdCBib2FyZEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKSA7XHJcbmNvbnN0IG1vdmVzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb3ZlcycpIDtcclxuY29uc3QgbWF0Y2hlc0VsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWF0Y2hlcycpIDtcclxuY29uc3QgYnRuTmV3R2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZXdHYW1lJykgO1xyXG5jb25zdCBoaWdoU2NvcmVzRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWdoU2NvcmVzJykgO1xyXG5jb25zdCBzY29yZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKSA7XHJcbmNvbnN0IG1vZGFsV2luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsV2luJyk7XHJcbmNvbnN0IG1vZGFsU2NvcmVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsU2NvcmUnKSA7XHJcbmNvbnN0IHRpbWVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWUnKSA7XHJcbmNvbnN0IGJ0bk5leHRMZXZlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5OZXh0TGV2ZWwnKSA7XHJcblxyXG5sZXQgcHJldmlvdXNDYXJkRWxlbWVudCA9IG51bGwgO1xyXG5sZXQgbWVtb3J5R2FtZTtcclxubGV0IGhpZ2hTY29yZUFycmF5IDtcclxubGV0IHRpbWVDb3VudGVyID0gMCA7XHJcbmxldCB0aW1lVG9TdG9wID0gbnVsbCA7XHJcblxyXG5cclxuXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcclxuICAgIGZldGNoKFVSTClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oKGltYWdlc0pzb24pID0+e1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXNKc29uKXtcclxuICAgICAgICAgICAgICAgIElNQUdFU19VUkxfQVJSQVkucHVzaChpbWFnZS5pbWFnZVVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVtb3J5R2FtZSA9IG5ld0JvYXJkKFNJWkUgLCBJTUFHRVNfVVJMX0FSUkFZLCBib2FyZEVsZW0pO1xyXG5cclxuICAgICAgICAgICAgYnRuTmV4dExldmVsLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFdpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9sZEJvYXJkTGVuZ3RoID0gbWVtb3J5R2FtZS5ib2FyZC5sZW5ndGggKyA0O1xyXG4gICAgICAgICAgICAgICAgbWVtb3J5R2FtZSA9IG5ld0JvYXJkKG9sZEJvYXJkTGVuZ3RoICwgSU1BR0VTX1VSTF9BUlJBWSwgYm9hcmRFbGVtKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGJ0bk5ld0dhbWUub25jbGljayA9ICgpID0+IHsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbW9kYWxXaW4uc3R5bGUuZGlzcGxheSA9ICdub25lJzsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBvbGRCb2FyZExlbmd0aCA9IG1lbW9yeUdhbWUuYm9hcmQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgbWVtb3J5R2FtZSA9IG5ld0JvYXJkKG9sZEJvYXJkTGVuZ3RoLCBJTUFHRVNfVVJMX0FSUkFZLCBib2FyZEVsZW0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbmV3Qm9hcmQoc2l6ZSwgaW1hZ2VBcnJheSwgYm9hcmRFbGVtLCBudW1iZXJPZkNhcmRzKXtcclxuICAgIGVuZFRpbWVyKCk7XHJcbiAgICBsZXQgYm9hcmQgPSBuZXcgTWVtb3J5R2FtZUJvYXJkKHNpemUsIGltYWdlQXJyYXksIG51bWJlck9mQ2FyZHMpO1xyXG4gICAgYm9hcmQuYnVpbGRCb2FyZCgpO1xyXG4gICAgYm9hcmQud2luID0gd2luO1xyXG4gICAgcmVuZGVyQm9hcmQoYm9hcmRFbGVtLCBib2FyZCk7XHJcbiAgICB1cGRhdGVEYXNoYm9hcmQoYm9hcmQpO1xyXG4gICAgc3RhclRUaW1lcigpO1xyXG4gICAgcmV0dXJuIGJvYXJkOyAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckJvYXJkKGJvYXJkQ29udGFpbmVyRWxlbSwgbWVtb3J5R2FtZSl7XHJcbiAgICBib2FyZENvbnRhaW5lckVsZW0uaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgZm9yIChsZXQgY2FyZCBvZiBtZW1vcnlHYW1lLmJvYXJkKXtcclxuXHJcbiAgICAgICAgbGV0IGNhcmRXcmFwcGVyRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNhcmRXcmFwcGVyRWxlbS5jbGFzc05hbWUgPSAnY2FyZFdyYXBwZXInO1xyXG5cclxuICAgICAgICBsZXQgY2FyZEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBjYXJkRWxlbS5zcmMgPSBjYXJkLmltYWdlO1xyXG4gICAgICAgIGNhcmRFbGVtLmNsYXNzTmFtZSA9ICdjYXJkJztcclxuICAgICAgICBjYXJkRWxlbS5vbmNsaWNrID0gY2FyZEZsaXBwZXIuYmluZChudWxsLCBtZW1vcnlHYW1lLCBjYXJkLCBjYXJkRWxlbSk7XHJcblxyXG4gICAgICAgIGNhcmRXcmFwcGVyRWxlbS5hcHBlbmRDaGlsZChjYXJkRWxlbSk7XHJcbiAgICAgICAgYm9hcmRDb250YWluZXJFbGVtLmFwcGVuZENoaWxkKGNhcmRXcmFwcGVyRWxlbSk7XHJcbiAgICB9IFxyXG59XHJcblxyXG5mdW5jdGlvbiBjYXJkRmxpcHBlcihtZW1vcnlHYW1lLCBjYXJkLCBjYXJkRWxlbSl7XHJcbiAgICBsZXQgbWF0Y2hlZCA9IG1lbW9yeUdhbWUuZG9lc0l0TWF0Y2hlZChjYXJkKTtcclxuXHJcbiAgICBzd2l0Y2gobWF0Y2hlZCl7XHJcblxyXG4gICAgY2FzZSAnZmlyc3RDYXJkJyA6XHJcbiAgICAgICAgY2FyZEVsZW0uY2xhc3NMaXN0LnRvZ2dsZSgnZmxpcENhcmQnKSA7XHJcbiAgICAgICAgcHJldmlvdXNDYXJkRWxlbWVudCA9IGNhcmRFbGVtIDtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlICdtYXRjaGVkJyA6XHJcbiAgICAgICAgY2FyZEVsZW0uY2xhc3NOYW1lID0gJ21hdGNoZWQnIDtcclxuICAgICAgICBwcmV2aW91c0NhcmRFbGVtZW50LmNsYXNzTmFtZSA9ICdtYXRjaGVkJztcclxuICAgICAgICBwcmV2aW91c0NhcmRFbGVtZW50ID0gbnVsbCA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgXHJcbiAgICBjYXNlICd1bm1hdGNoZWQnIDpcclxuICAgICAgICBjYXJkRWxlbS5jbGFzc0xpc3QudG9nZ2xlKCdmbGlwQ2FyZCcpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmV2aW91c0NhcmRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2ZsaXBDYXJkJyk7XHJcbiAgICAgICAgICAgIGNhcmRFbGVtLmNsYXNzTGlzdC50b2dnbGUoJ2ZsaXBDYXJkJyk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH0gXHJcbiAgICB1cGRhdGVEYXNoYm9hcmQobWVtb3J5R2FtZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZURhc2hib2FyZChtZW1vcnlHYW1lKXtcclxuICAgIG1vdmVzRWxlbS5pbm5lckhUTUwgPSBtZW1vcnlHYW1lLm1vdmVzO1xyXG4gICAgbWF0Y2hlc0VsZW0uaW5uZXJIVE1MID0gbWVtb3J5R2FtZS5tYXRjaGVzO1xyXG4gICAgc2NvcmVFbGVtLmlubmVySFRNTCA9IG1lbW9yeUdhbWUuc2NvcmU7XHJcbiAgICB1cGRhdGVTY29yZShtZW1vcnlHYW1lLnNjb3JlKTtcclxuICAgIGhpZ2hTY29yZXNFbGVtLmlubmVySFRNTCA9IFxyXG4gICAgYDx0cj48dGQ+Zmlyc3QgcGxhY2UgLSAgJHtoaWdoU2NvcmVBcnJheVsyXX08L3RkPlxyXG4gICAgPHRyPjx0ZD5maXJzdCBwbGFjZSAtICAke2hpZ2hTY29yZUFycmF5WzFdfTwvdGQ+XHJcbiAgICA8dHI+PHRkPmZpcnN0IHBsYWNlIC0gICR7aGlnaFNjb3JlQXJyYXlbMF19PC90ZD5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aW4oKSB7XHJcbiAgICBlbmRUaW1lcigpO1xyXG4gICAgdXBkYXRlU2NvcmUobWVtb3J5R2FtZS5zY29yZSk7XHJcbiAgICBtb2RhbFNjb3JlRWxlbS5pbm5lckhUTUwgPSAnMzInO1xyXG4gICAgbW9kYWxXaW4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBoaWdoU2NvcmVzRWxlbS5pbm5lckhUTUwgPSBcclxuICAgIGA8dWw+XHJcbiAgICAgICAgPGxpPmZpcnN0IHBsYWNlIC0gICR7aGlnaFNjb3JlQXJyYXlbMl19PC9saT5cclxuICAgICAgICA8bGk+c2Vjb25kIHBsYWNlIC0gJHtoaWdoU2NvcmVBcnJheVsxXX08L2xpPlxyXG4gICAgICAgIDxsaT50aGlyZCBwbGFjZSAtICAke2hpZ2hTY29yZUFycmF5WzBdfTwvbGk+IFxyXG4gICAgPC91bD5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTY29yZShzY29yZSl7XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlnaFNjb3JlcycpKXtcclxuICAgICAgICBoaWdoU2NvcmVBcnJheSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZ2hTY29yZXMnKSk7IFxyXG4gICAgfVxyXG4gICAgZWxzZSBoaWdoU2NvcmVBcnJheSA9IFswLCAwLCAwXTtcclxuICAgIGlmIChoaWdoU2NvcmVBcnJheVswXSA8IHNjb3JlICYmICFoaWdoU2NvcmVBcnJheS5pbmNsdWRlcyhzY29yZSkpIGhpZ2hTY29yZUFycmF5WzBdID0gc2NvcmU7XHJcbiAgICBoaWdoU2NvcmVBcnJheS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlnaFNjb3JlcycsSlNPTi5zdHJpbmdpZnkoaGlnaFNjb3JlQXJyYXkpKTtcclxuICAgIHJldHVybiA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJUVGltZXIoKXtcclxuICAgIHRpbWVUb1N0b3AgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhvdXIgPSBNYXRoLmZsb29yKHRpbWVDb3VudGVyIC8gMzYwMCk7IFxyXG4gICAgICAgIGhvdXIgPiAxMCA/IGhvdXIgIDogaG91ciArICcwJyA7XHJcbiAgICAgICAgbGV0IG1pbnV0ZSA9IE1hdGguZmxvb3IodGltZUNvdW50ZXIgLyA2MCApICUgNjAgO1xyXG4gICAgICAgIGxldCBzZWNvbmRzID0gTWF0aC5mbG9vcih0aW1lQ291bnRlciAlIDYwICkgIDtcclxuXHJcbiAgICAgICAgaG91ciA9IGhvdXIgPiAxMCA/IGhvdXIgIDogYDAke2hvdXJ9YDtcclxuICAgICAgICBtaW51dGUgPSBtaW51dGUgPiAxMCA/IG1pbnV0ZSAgOiBgMCR7bWludXRlfWA7XHJcbiAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgPiAxMCA/IHNlY29uZHMgIDogYDAke3NlY29uZHN9YDtcclxuICAgICAgICB0aW1lRWxlbS5pbm5lckhUTUwgPSBgJHtob3VyfToke21pbnV0ZX06JHtzZWNvbmRzfWA7XHJcbiAgICAgICAgdGltZUNvdW50ZXIrKyA7XHJcbiAgICB9LCAxMDAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZW5kVGltZXIoKXtcclxuICAgIHRpbWVDb3VudGVyID0gMCA7XHJcbiAgICB0aW1lRWxlbS5pbm5lckhUTUwgPSAnMDA6MDA6MDAnO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lVG9TdG9wKTsgIFxyXG59XHJcbiAgICBcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==