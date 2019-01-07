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