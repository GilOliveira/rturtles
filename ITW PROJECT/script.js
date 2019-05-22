"use strict";


let player1 = new Player("player1", "9years", "down", 0, 0);
let player2 = new Player("player2", "6years", "left", 0, 7);
let player3 = new Player("player3", "11years", "right", 7, 0);
let player4 = new Player("player4", "5years", "up", 7, 7);
let births = [player1.birth, player2.birth, player3.birth, player4.birth];
let board = (generateBoard(8));
let currentPlayer = player1;
let currentPlayerIndex = 0;
let boardCopy;
let rowIndexCopy = currentPlayer.rowIndex;
let columnIndexCopy = currentPlayer.columnIndex;
let directionCopy = currentPlayer.direction;
// Assume que a lista já está ordenada consoante a vez de jogar.
let playersStillPlaying = [true, true, true, true];
// let playersStillPlayingRepresentation = ["player1", "player2", "player3", "player4"];

function play(){
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let bugButton = document.getElementById("bug");

  appendPlayersToBoard(board, player1, player2, player3, player4);
  appendJewelsToBoard(board);
  appendStoneWallsToBoard(board);
  displayBoard();
  console.log(board);

  rotateLeftButton.addEventListener("click", function(){ rotateLeft(currentPlayer);});
  rotateLeftButton.addEventListener("click", updateTurn);
  rotateRightButton.addEventListener("click", function(){ rotateRight(currentPlayer);});
  rotateRightButton.addEventListener("click", updateTurn);
  forwardButton.addEventListener("click", function(){ forward(currentPlayer);});
  forwardButton.addEventListener("click", updateTurn);
  bugButton.addEventListener("click", bug);
}

// Função que faz deepcopy de um array.
function copy(o){
  var output, v, key;
  output = Array.isArray(o) ? [] : o;

  for (key in o) {
    v = o[key];
    output[key] = (typeof v === "object") ? copy(v) : v;
  }

   return output;
}

function displayBoard(){
    let boardTable = $('#board');
    for (let row = 0; row < board.length; row++) {
        boardTable.append('<tr id="' + row + '">');
        for (let column = 0; column < board.length; column++) {
            $('#boardContainer table:last-child').append('<td class="grass" id="' +
                row.toString() + "-" + column.toString() + '"></td>');
        }
        boardTable.append('</tr>');
    }
}

function Player(name, birth, direction, rowIndex, columnIndex){
  this.name = name;
  this.birth = birth;
  this.direction = direction;
  this.rowIndex = rowIndex;
  this.columnIndex = columnIndex;
}

function generateBoard(n){
  let board = [];
  let tempRow;

  for(let i = 0; i < n; i++){
      tempRow = [];

      for(let j = 0; j < n; j++){
          tempRow.push("");
      }

      board.push(tempRow);
  }

  return board;
}

function appendPlayersToBoard(board, player1, player2, player3, player4){
  board[0][0] = player1;
  board[0][7] = player2;
  board[7][0] = player3;
  board[7][7] = player4;
}

function appendJewelsToBoard(board){
  board[parseInt((board.length - 1) / 2)][parseInt((board.length - 1) / 2)] = 'jewel1';
  board[parseInt((board.length - 1) / 2)][parseInt((board.length - 1) / 2 + 1)] = 'jewel2';
  board[parseInt((board.length - 1) / 2 + 1)][parseInt((board.length - 1) / 2)] = 'jewel3';
  board[parseInt((board.length - 1) / 2 + 1)][parseInt((board.length - 1) / 2 + 1)] = 'jewel4';
}

function appendStoneWallsToBoard(board){
  let numStoneWalls = Math.floor(Math.random() * 8) + 2;

  while(numStoneWalls > 0){
    let rowIndex = Math.floor(Math.random() * board.length);
    let columnIndex = Math.floor(Math.random() * board.length);

    if(board[rowIndex][columnIndex] === ""){
      board[rowIndex][columnIndex] = "stoneWall";
    }

    numStoneWalls--;
  }
}

function updateTurn(){
  // document.getElementById("bug").style.display = "inline";

  if(currentPlayer === player1){
    if(playersStillPlaying[1] === true){
      currentPlayer = player2;
      currentPlayerIndex = 1;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[2] === true){
      currentPlayer = player3;
      currentPlayerIndex = 2;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[3] === true){
      currentPlayer = player4;
      currentPlayerIndex = 3;
      console.log(currentPlayerIndex);
    }
  }
  else if(currentPlayer === player2){
    if(playersStillPlaying[2] === true){
      currentPlayer = player3;
      currentPlayerIndex = 2;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[3] === true){
      currentPlayer = player4;
      currentPlayerIndex = 3;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[0] === true){
      currentPlayer = player1;
      currentPlayerIndex = 0;
      console.log(currentPlayerIndex);
    }
  }
  else if(currentPlayer === player3){
    if(playersStillPlaying[3] === true){
      currentPlayer = player4;
      currentPlayerIndex = 3;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[0] === true){
      currentPlayer = player1;
      currentPlayerIndex = 0;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[1] === true){
      currentPlayer = player2;
      currentPlayerIndex = 1;
      console.log(currentPlayerIndex);
    }
  }
  else{
    if(playersStillPlaying[0] === true){
      currentPlayer = player1;
      currentPlayerIndex = 0;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[1] === true){
      currentPlayer = player2;
      currentPlayerIndex = 1;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[2] === true){
      currentPlayer = player3;
      currentPlayerIndex = 2;
      console.log(currentPlayerIndex);
    }
  }
}

function bug(){
  if(currentPlayer === player2){
    if(playersStillPlaying[0] === true){
      currentPlayer = player1;
      currentPlayerIndex = 0;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[3] === true){
      currentPlayer = player4;
      currentPlayerIndex = 3;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[2] === true){
      currentPlayer = player3;
      currentPlayerIndex = 2;
      console.log(currentPlayerIndex);
    }
  }
  else if(currentPlayer === player3){
    if(playersStillPlaying[1] === true){
      currentPlayer = player2;
      currentPlayerIndex = 1;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[0] === true){
      currentPlayer = player1;
      currentPlayerIndex = 0;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[3] === true){
      currentPlayer = player4;
      currentPlayerIndex = 3;
      console.log(currentPlayerIndex);
    }
  }
  else if(currentPlayer === player4){
    if(playersStillPlaying[2] === true){
      currentPlayer = player3;
      currentPlayerIndex = 2;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[1] === true){
      currentPlayer = player2;
      currentPlayerIndex = 1;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[0] === true){
      currentPlayer = player1;
      currentPlayerIndex = 0;
      console.log(currentPlayerIndex);
    }
  }
  else{
    if(playersStillPlaying[3] === true){
      currentPlayer = player4;
      currentPlayerIndex = 3;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[2] === true){
      currentPlayer = player3;
      currentPlayerIndex = 2;
      console.log(currentPlayerIndex);
    }
    else if(playersStillPlaying[1] === true){
      currentPlayer = player2;
      currentPlayerIndex = 1;
      console.log(currentPlayerIndex);
    }
  }

  board = copy(boardCopy);
  currentPlayer.rowIndex = rowIndexCopy;
  currentPlayer.columnIndex = columnIndexCopy;
  currentPlayer.direction = directionCopy;
  console.log(board);
}

function rotateLeft(currentPlayer){
  let currentDirection = currentPlayer.direction;
  let currentRow = currentPlayer.rowIndex;
  let currentColumn = currentPlayer.columnIndex;
  let newDirection;
  boardCopy = copy(board);
  rowIndexCopy = currentRow;
  columnIndexCopy = currentColumn;
  directionCopy = currentDirection;

  // Trocar para switch.
  if(currentDirection === "up"){
    newDirection = "left";
  }
  else if(currentDirection === "right"){
    newDirection = "up";
  }
  else if(currentDirection === "down"){
    newDirection = "right";
  }
  else{
    newDirection = "down";
  }

  currentPlayer.direction = newDirection;
  console.log(board);
}

function rotateRight(currentPlayer){
  let currentDirection = currentPlayer.direction;
  let currentRow = currentPlayer.rowIndex;
  let currentColumn = currentPlayer.columnIndex;
  let newDirection;
  boardCopy = copy(board);
  rowIndexCopy = currentRow;
  columnIndexCopy = currentColumn;
  directionCopy = currentDirection;

  // Trocar para switch.
  if(currentDirection === "up"){
    newDirection = "right";
  }
  else if(currentDirection === "right"){
    newDirection = "down";
  }
  else if(currentDirection === "down"){
    newDirection = "left";
  }
  else{
    newDirection = "up";
  }

  currentPlayer.direction = newDirection;
  console.log(board);
}

function forward(currentPlayer){
  let currentDirection = currentPlayer.direction;
  let currentRow = currentPlayer.rowIndex;
  let currentColumn = currentPlayer.columnIndex;
  let newRow;
  let newColumn;
  boardCopy = copy(board);
  rowIndexCopy = currentRow;
  columnIndexCopy = currentColumn;
  directionCopy = currentDirection;

  if(currentDirection === "up"){
    newRow = currentRow - 1;
    newColumn = currentColumn;

    if(newRow < 0 || newRow > 7 || newColumn < 0 || newColumn > 7){
      alert("Oops! Seems like your turtle is trying to run away!");
      console.log(board);
    }
    else if(board[newRow][newColumn] === "stoneWall"){
      alert("Oops! Seems like your turtle bumped against a Stone Wall!");
      console.log(board);
    }
    else if(board[newRow][newColumn] === player1 || board[newRow][newColumn] === player2
            || board[newRow][newColumn] === player3 || board[newRow][newColumn] === player4){
              alert("Oops! Seems like another turtle is already there!");
              console.log(board);
    }
    else if(board[newRow][newColumn] === "jewel1" || board[newRow][newColumn] === "jewel2"
            || board[newRow][newColumn] === "jewel3" || board[newRow][newColumn] === "jewel4"){
              playersStillPlaying[currentPlayerIndex] = false;
              console.log(playersStillPlaying);
              alert("CONGRATULATIONS! YOU WON!");
              console.log(board);
    }
    else{

      currentPlayer.rowIndex = newRow;
      currentPlayer.columnIndex = newColumn;
      board[currentRow][currentColumn] = "";
      board[newRow][newColumn] = currentPlayer;
      console.log(board);
    }
  }
  else if(currentDirection === "down"){
    newRow = currentRow + 1;
    newColumn = currentColumn;

    if(newRow < 0 || newRow > 7 || newColumn < 0 || newColumn > 7){
      alert("Oops! Seems like your turtle is trying to run away!");
      console.log(board);
    }
    else if(board[newRow][newColumn] === "stoneWall"){
      alert("Oops! Seems like your turtle bumped against a Stone Wall!");
      console.log(board);
    }
    else if(board[newRow][newColumn] === player1 || board[newRow][newColumn] === player2
            || board[newRow][newColumn] === player3 || board[newRow][newColumn] === player4){
              alert("Oops! Seems like another turtle is already there!");
              console.log(board);
    }
    else if(board[newRow][newColumn] === "jewel1" || board[newRow][newColumn] === "jewel2"
            || board[newRow][newColumn] === "jewel3" || board[newRow][newColumn] === "jewel4"){
              playersStillPlaying[currentPlayerIndex] = false;
              console.log(playersStillPlaying);
              alert("CONGRATULATIONS! YOU WON!");
              console.log(board);
    }
    else{

      currentPlayer.rowIndex = newRow;
      currentPlayer.columnIndex = newColumn;
      board[currentRow][currentColumn] = "";
      board[newRow][newColumn] = currentPlayer;
      console.log(board);
    }
  }
  else if(currentDirection === "right"){
    newRow = currentRow;
    newColumn = currentColumn + 1;

    if(newRow < 0 || newRow > 7 || newColumn < 0 || newColumn > 7){
      alert("Oops! Seems like your turtle is trying to run away!");
      console.log(board);
    }
    else if(board[newRow][newColumn] === "stoneWall"){
      alert("Oops! Seems like your turtle bumped against a Stone Wall!");
      console.log(board);
    }
    else if(board[newRow][newColumn] === player1 || board[newRow][newColumn] === player2
            || board[newRow][newColumn] === player3 || board[newRow][newColumn] === player4){
              alert("Oops! Seems like another turtle is already there!");
              console.log(board);
    }
    else if(board[newRow][newColumn] === "jewel1" || board[newRow][newColumn] === "jewel2"
            || board[newRow][newColumn] === "jewel3" || board[newRow][newColumn] === "jewel4"){
              playersStillPlaying[currentPlayerIndex] = false;
              console.log(playersStillPlaying);
              alert("CONGRATULATIONS! YOU WON!");
              console.log(board);
    }
    else{

      currentPlayer.rowIndex = newRow;
      currentPlayer.columnIndex = newColumn;
      board[currentRow][currentColumn] = "";
      board[newRow][newColumn] = currentPlayer;
      console.log(board);
    }
  }
  else{
    newRow = currentRow;
    newColumn = currentColumn - 1;

    if(newRow < 0 || newRow > 7 || newColumn < 0 || newColumn > 7){
      alert("Oops! Seems like your turtle is trying to run away!");
      console.log(board);
    }
    else if(board[newRow][newColumn] === "stoneWall"){
      alert("Oops! Seems like your turtle bumped against a Stone Wall!");
      console.log(board);
    }
    else if(board[newRow][newColumn] === player1 || board[newRow][newColumn] === player2
            || board[newRow][newColumn] === player3 || board[newRow][newColumn] === player4){
              alert("Oops! Seems like another turtle is already there!");
              console.log(board);
    }
    else if(board[newRow][newColumn] === "jewel1" || board[newRow][newColumn] === "jewel2"
            || board[newRow][newColumn] === "jewel3" || board[newRow][newColumn] === "jewel4"){
              playersStillPlaying[currentPlayerIndex] = false;
              console.log(playersStillPlaying);
              alert("CONGRATULATIONS! YOU WON!");
              console.log(board);
    }
    else{

      currentPlayer.rowIndex = newRow;
      currentPlayer.columnIndex = newColumn;
      board[currentRow][currentColumn] = "";
      board[newRow][newColumn] = currentPlayer;
      console.log(board);
    }
  }
}

document.addEventListener("DOMContentLoaded", function(event) {play()});


// Just blank space
