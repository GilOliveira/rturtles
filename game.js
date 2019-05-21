"use strict";
let currentPlayer;
let board;

function createBoard(n){
    board = [];
    let outList = [];
    let tempList;
    for (let i = 0; i<n; i++) {
        tempList = [];
        for (let j = 0; j < n; j++) {
            tempList.push("");
        }
        outList.push(tempList);
    }
    board = outList;
}


function displayBoard(){
    let boardTable = $('#board');
    for (let row = 0; row < board.length; row++) {
        boardTable.append('<tr id="' + row + '">');
        for (let column = 0; column < board.length; column++) {
            $('#boardContainer table:last-child').append('<td class="boardCell" id="' +
                row.toString() + "-" + column.toString() + '"></td>');
        }
        boardTable.append('</tr>');
    }
}

function fillBoard(board, t1, t2 = false, t3 = false, t4 = false){
    board[0][0] = t1;     // placing players in the board
    board[parseInt((board.length-1)/2)][parseInt((board.length-1)/2)] = 'j1';
    if (t2 == !false) {
        board[0][board.length-1] = t2;
        board[parseInt((board.length-1)/2)][parseInt((board.length-1)/2+1)] = 'j2';
    }
    if (t3 == !false) {
        board[board.length-1][0] = t3;
        board[parseInt((board.length-1)/2+1)][parseInt((board.length-1)/2)] = 'j3';

    }
    if (t4 == !false) {
        board[board.length-1][board.length-1] = t4;
        board[parseInt((board.length-1)/2+1)][parseInt((board.length-1)/2+1)] = 'j4';
    }
}

function determineWalls(board) {
    let boardSize = Math.pow(board.length,2);
    return parseInt(boardSize*0.15);
}

function Deck() {
    this.fwd = 18;
    this.left = 8;
    this.right = 8;

    function upfwd() {
        this.fwd -= 1
    }
    function upleft() {
        this.left -= 1
    }
    function upright() {
        this.right -= 1
    }
}

function User(name,birth,direction, id, end = false) {
    this.name = name;
    this.birth = birth;
    this.direction = direction;
    this.id = id;
    this.deck = new Deck();
    this.pos = [];
    this.end = end;

    function addTurtle(imagefile) {
        this.image = imagefile;
    }

    // -90 ou 90
    this.rotate = function (degrees) {
        direction = this.direction + parseInt(degrees);
        if (direction === 360) {
            this.direction = 0;
        }
        if (direction == -90) {
            this.direction = 270;
        }
        else {
            this.direction = direction;
        }
    };
    function setDeck(deck) {
        this.deck = deck;
    }
    function setInitialPos(pos) {
        this.pos = pos
    }
    function movefoward() {
        setDeck(this.deck.fwd());
        if (self.direction == 0) {
            this.pos = [this.pos[0],this.pos[1]+1]
        }
        else if (self.direction == 90) {
            this.pos = [this.pos[0]+1,this.pos[1]]
        }
        else if (self.direction == 180) {
            this.pos = [this.pos[0],this.pos[1]-1]
        }
        else if (self.direction == 270) {
            this.pos = [this.pos[0]-1,this.pos[1]]
        }

    }
    function setEnd() {
        this.end = true;
    }

}

$(document).ready(main);

// FOR DEBUGGING:
function main() {
    createBoard(8);
    displayBoard();
}



// let aa = new Deck;
// console.log(aa);
// console.log(aa.upfwd());
// console.log(aa);

