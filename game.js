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

function events(){
  let playStoneWallsButton = document.getElementById("playStoneWalls");
  let playIceWallsButton = document.getElementById("playIceWalls")
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let laserButton = document.getElementById("laser");
  let bugButton = document.getElementById("bug");
  let endTurnButton = document.getElementById("endTurn");

  playStoneWallsButton.addEventListener("click", playStoneWalls);
  playIceWallsButton.addEventListener("click", playIceWalls);
  rotateLeftButton.addEventListener("click", function(){ rotateLeft(currentPlayer);});
  rotateRightButton.addEventListener("click", function(){ rotateRight(currentPlayer);});
  forwardButton.addEventListener("click", function(){ forward(currentPlayer);});
  laserButton.addEventListener("click", function(){ laser(currentPlayer);});
  bugButton.addEventListener("click", bug);
  endTurnButton.addEventListener("click", updateTurn);
}

function playStoneWalls(){
  appendPlayersToBoard(board, player1, player2, player3, player4);
  appendJewelsToBoard(board);
  appendStoneWallsToBoard(board);
  displayBoard();
  updateBoard();
  console.log(board);
  document.getElementById("playStoneWalls").style.display="none";
  document.getElementById("playIceWalls").style.display="none";
  document.getElementById("rotateLeft").style.display="inline";
  document.getElementById("rotateRight").style.display="inline";
  document.getElementById("forward").style.display="inline";
  document.getElementById("bug").style.display="inline";
  document.getElementById("endTurn").style.display="inline";
}

function playIceWalls(){
  appendPlayersToBoard(board, player1, player2, player3, player4);
  appendJewelsToBoard(board);
  appendIceWallsToBoard(board);
  displayBoard();
  updateBoard();
  console.log(board);
  document.getElementById("playStoneWalls").style.display="none";
  document.getElementById("playIceWalls").style.display="none";
  document.getElementById("rotateLeft").style.display="inline";
  document.getElementById("rotateRight").style.display="inline";
  document.getElementById("forward").style.display="inline";
  document.getElementById("laser").style.display="inline";
  document.getElementById("bug").style.display="inline";
  document.getElementById("endTurn").style.display="inline";
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

function updateBoard(){
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board.length; j++){
      if(board[i][j] === "stoneWall"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/tiles/stone-wall.png'>");
      }
      else if(board[i][j] === "iceWall"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/tiles/ice-wall.png'>");
      }
      else if(board[i][j] === "water"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/tiles/water.png'>");
      }
      else if(board[i][j] === "jewel1"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/jewels/jewel1.png'>");
      }
      else if(board[i][j] === "jewel2"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/jewels/jewel2.png'>");
      }
      else if(board[i][j] === "jewel3"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/jewels/jewel3.png'>");
      }
      else if(board[i][j] === "jewel4"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/jewels/jewel4.png'>");
      }
      else if(board[i][j] === player1 && player1.direction === "up"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/beep-up.png'>");
      }
      else if(board[i][j] === player1 && player1.direction === "down"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/beep-down.png'>");
      }
      else if(board[i][j] === player1 && player1.direction === "right"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/beep-right.png'>");
      }
      else if(board[i][j] === player1 && player1.direction === "left"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/beep-left.png'>");
      }
      else if(board[i][j] === player2 && player2.direction === "up"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/dot-up.png'>");
      }
      else if(board[i][j] === player2 && player2.direction === "down"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/dot-down.png'>");
      }
      else if(board[i][j] === player2 && player2.direction === "right"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/dot-right.png'>");
      }
      else if(board[i][j] === player2 && player2.direction === "left"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/dot-left.png'>");
      }
      else if(board[i][j] === player3 && player3.direction === "up"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/pangle-up.png'>");
      }
      else if(board[i][j] === player3 && player3.direction === "down"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/pangle-down.png'>");
      }
      else if(board[i][j] === player3 && player3.direction === "right"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/pangle-right.png'>");
      }
      else if(board[i][j] === player3 && player3.direction === "left"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/pangle-left.png'>");
      }
      else if(board[i][j] === player4 && player4.direction === "up"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/pi-up.png'>");
      }
      else if(board[i][j] === player4 && player4.direction === "down"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/pi-down.png'>");
      }
      else if(board[i][j] === player4 && player4.direction === "right"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/pi-right.png'>");
      }
      else if(board[i][j] === player4 && player4.direction === "left"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/characters/pi-left.png'>");
      }
    }
  }
}

function eraseBoard(){
  for (let i = 0; i < board.length; i++){
    for (let j = 0; j < board.length; j++){
      $('#' + i + '-' + j).html("");
    }
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

function appendIceWallsToBoard(board){
  let numIceWalls = Math.floor(Math.random() * 8) + 2;

  while(numIceWalls > 0){
    let rowIndex = Math.floor(Math.random() * board.length);
    let columnIndex = Math.floor(Math.random() * board.length);

    if(board[rowIndex][columnIndex] === ""){
      board[rowIndex][columnIndex] = "iceWall";
    }

    numIceWalls--;
  }
}

function updateTurn(){
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let laserButton = document.getElementById("laser");
  let bugButton = document.getElementById("bug");
  let endTurnButton = document.getElementById("endTurn");

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
  rotateLeftButton.disabled = false;
  rotateRightButton.disabled = false;
  forwardButton.disabled = false;
  laserButton.disabled = false;
  bugButton.disabled = true;
  endTurnButton.disabled = true;
}

function bug(){
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let laserButton = document.getElementById("laser");
  let bugButton = document.getElementById("bug");
  let endTurnButton = document.getElementById("endTurn");

  board = copy(boardCopy);
  currentPlayer.rowIndex = rowIndexCopy;
  currentPlayer.columnIndex = columnIndexCopy;
  currentPlayer.direction = directionCopy;
  console.log(board);
  eraseBoard();
  updateBoard();
  rotateLeftButton.disabled = false;
  rotateRightButton.disabled = false;
  forwardButton.disabled = false;
  laserButton.disabled = false;
  bugButton.disabled = true;
  endTurnButton.disabled = true;
}

function rotateLeft(currentPlayer){
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let laserButton = document.getElementById("laser");
  let bugButton = document.getElementById("bug");
  let endTurnButton = document.getElementById("endTurn");

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
  eraseBoard();
  updateBoard();
  rotateLeftButton.disabled = true;
  rotateRightButton.disabled = true;
  forwardButton.disabled = true;
  laserButton.disabled = true;
  bugButton.disabled = false;
  endTurnButton.disabled = false;
}

function rotateRight(currentPlayer){
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let laserButton = document.getElementById("laser");
  let bugButton = document.getElementById("bug");
  let endTurnButton = document.getElementById("endTurn");

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
  eraseBoard();
  updateBoard();
  rotateLeftButton.disabled = true;
  rotateRightButton.disabled = true;
  forwardButton.disabled = true;
  laserButton.disabled = true;
  bugButton.disabled = false;
  endTurnButton.disabled = false;
}

function forward(currentPlayer){
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let laserButton = document.getElementById("laser");
  let bugButton = document.getElementById("bug");
  let endTurnButton = document.getElementById("endTurn");

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
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "stoneWall"){
      alert("Oops! Seems like your turtle bumped against a Stone Wall!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "iceWall"){
      alert("Oops! Seems like your turtle bumped against a Ice Wall!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === player1 || board[newRow][newColumn] === player2
            || board[newRow][newColumn] === player3 || board[newRow][newColumn] === player4){
              alert("Oops! Seems like another turtle is already there!");
              console.log(board);
              rotateLeftButton.disabled = true;
              rotateRightButton.disabled = true;
              forwardButton.disabled = true;
              laserButton.disabled = true;
              bugButton.disabled = false;
              endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "jewel1" || board[newRow][newColumn] === "jewel2"
            || board[newRow][newColumn] === "jewel3" || board[newRow][newColumn] === "jewel4"){
              currentPlayer.rowIndex = newRow;
              currentPlayer.columnIndex = newColumn;
              board[currentRow][currentColumn] = "";
              board[newRow][newColumn] = currentPlayer;
              eraseBoard();
              updateBoard();
              playersStillPlaying[currentPlayerIndex] = false;
              console.log(playersStillPlaying);

              if(!(playersStillPlaying.includes(true))){
                alert("CONGRATULATIONS! YOU ENDED THE GAME!")
                rotateLeftButton.disabled = true;
                rotateRightButton.disabled = true;
                forwardButton.disabled = true;
                laserButton.disabled = true;
                bugButton.disabled = true;
                endTurnButton.disabled = true;
              }
              else{
                alert("CONGRATULATIONS! YOU WON!");
                updateTurn();
                console.log(board);
              }
    }
    else{
      currentPlayer.rowIndex = newRow;
      currentPlayer.columnIndex = newColumn;
      board[currentRow][currentColumn] = "";
      board[newRow][newColumn] = currentPlayer;
      console.log(board);
      eraseBoard();
      updateBoard();
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
  }
  else if(currentDirection === "down"){
    newRow = currentRow + 1;
    newColumn = currentColumn;

    if(newRow < 0 || newRow > 7 || newColumn < 0 || newColumn > 7){
      alert("Oops! Seems like your turtle is trying to run away!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "stoneWall"){
      alert("Oops! Seems like your turtle bumped against a Stone Wall!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "iceWall"){
      alert("Oops! Seems like your turtle bumped against a Ice Wall!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === player1 || board[newRow][newColumn] === player2
            || board[newRow][newColumn] === player3 || board[newRow][newColumn] === player4){
              alert("Oops! Seems like another turtle is already there!");
              console.log(board);
              rotateLeftButton.disabled = true;
              rotateRightButton.disabled = true;
              forwardButton.disabled = true;
              laserButton.disabled = true;
              bugButton.disabled = false;
              endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "jewel1" || board[newRow][newColumn] === "jewel2"
            || board[newRow][newColumn] === "jewel3" || board[newRow][newColumn] === "jewel4"){
              currentPlayer.rowIndex = newRow;
              currentPlayer.columnIndex = newColumn;
              board[currentRow][currentColumn] = "";
              board[newRow][newColumn] = currentPlayer;
              eraseBoard();
              updateBoard();
              playersStillPlaying[currentPlayerIndex] = false;
              console.log(playersStillPlaying);

              if(!(playersStillPlaying.includes(true))){
                alert("CONGRATULATIONS! YOU ENDED THE GAME!")
                rotateLeftButton.disabled = true;
                rotateRightButton.disabled = true;
                forwardButton.disabled = true;
                laserButton.disabled = true;
                bugButton.disabled = true;
                endTurnButton.disabled = true;
              }
              else{
                alert("CONGRATULATIONS! YOU WON!");
                updateTurn();
                console.log(board);
              }
    }
    else{
      currentPlayer.rowIndex = newRow;
      currentPlayer.columnIndex = newColumn;
      board[currentRow][currentColumn] = "";
      board[newRow][newColumn] = currentPlayer;
      console.log(board);
      eraseBoard();
      updateBoard();
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
  }
  else if(currentDirection === "right"){
    newRow = currentRow;
    newColumn = currentColumn + 1;

    if(newRow < 0 || newRow > 7 || newColumn < 0 || newColumn > 7){
      alert("Oops! Seems like your turtle is trying to run away!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "stoneWall"){
      alert("Oops! Seems like your turtle bumped against a Stone Wall!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "iceWall"){
      alert("Oops! Seems like your turtle bumped against a Ice Wall!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === player1 || board[newRow][newColumn] === player2
            || board[newRow][newColumn] === player3 || board[newRow][newColumn] === player4){
              alert("Oops! Seems like another turtle is already there!");
              console.log(board);
              rotateLeftButton.disabled = true;
              rotateRightButton.disabled = true;
              forwardButton.disabled = true;
              laserButton.disabled = true;
              bugButton.disabled = false;
              endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "jewel1" || board[newRow][newColumn] === "jewel2"
            || board[newRow][newColumn] === "jewel3" || board[newRow][newColumn] === "jewel4"){
              currentPlayer.rowIndex = newRow;
              currentPlayer.columnIndex = newColumn;
              board[currentRow][currentColumn] = "";
              board[newRow][newColumn] = currentPlayer;
              eraseBoard();
              updateBoard();
              playersStillPlaying[currentPlayerIndex] = false;
              console.log(playersStillPlaying);

              if(!(playersStillPlaying.includes(true))){
                alert("CONGRATULATIONS! YOU ENDED THE GAME!")
                rotateLeftButton.disabled = true;
                rotateRightButton.disabled = true;
                forwardButton.disabled = true;
                laserButton.disabled = true;
                bugButton.disabled = true;
                endTurnButton.disabled = true;
              }
              else{
                alert("CONGRATULATIONS! YOU WON!");
                updateTurn();
                console.log(board);
              }
    }
    else{
      currentPlayer.rowIndex = newRow;
      currentPlayer.columnIndex = newColumn;
      board[currentRow][currentColumn] = "";
      board[newRow][newColumn] = currentPlayer;
      console.log(board);
      eraseBoard();
      updateBoard();
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
  }
  else{
    newRow = currentRow;
    newColumn = currentColumn - 1;

    if(newRow < 0 || newRow > 7 || newColumn < 0 || newColumn > 7){
      alert("Oops! Seems like your turtle is trying to run away!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "stoneWall"){
      alert("Oops! Seems like your turtle bumped against a Stone Wall!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "iceWall"){
      alert("Oops! Seems like your turtle bumped against a Ice Wall!");
      console.log(board);
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === player1 || board[newRow][newColumn] === player2
            || board[newRow][newColumn] === player3 || board[newRow][newColumn] === player4){
              alert("Oops! Seems like another turtle is already there!");
              console.log(board);
              rotateLeftButton.disabled = true;
              rotateRightButton.disabled = true;
              forwardButton.disabled = true;
              laserButton.disabled = true;
              bugButton.disabled = false;
              endTurnButton.disabled = false;
    }
    else if(board[newRow][newColumn] === "jewel1" || board[newRow][newColumn] === "jewel2"
            || board[newRow][newColumn] === "jewel3" || board[newRow][newColumn] === "jewel4"){
              currentPlayer.rowIndex = newRow;
              currentPlayer.columnIndex = newColumn;
              board[currentRow][currentColumn] = "";
              board[newRow][newColumn] = currentPlayer;
              eraseBoard();
              updateBoard();
              playersStillPlaying[currentPlayerIndex] = false;
              console.log(playersStillPlaying);

              if(!(playersStillPlaying.includes(true))){
                alert("CONGRATULATIONS! YOU ENDED THE GAME!")
                rotateLeftButton.disabled = true;
                rotateRightButton.disabled = true;
                forwardButton.disabled = true;
                laserButton.disabled = true;
                bugButton.disabled = true;
                endTurnButton.disabled = true;
              }
              else{
                alert("CONGRATULATIONS! YOU WON!");
                updateTurn();
                console.log(board);
              }
    }
    else{
      currentPlayer.rowIndex = newRow;
      currentPlayer.columnIndex = newColumn;
      board[currentRow][currentColumn] = "";
      board[newRow][newColumn] = currentPlayer;
      console.log(board);
      eraseBoard();
      updateBoard();
      rotateLeftButton.disabled = true;
      rotateRightButton.disabled = true;
      forwardButton.disabled = true;
      laserButton.disabled = true;
      bugButton.disabled = false;
      endTurnButton.disabled = false;
    }
  }
}

function laser(currentPlayer){
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let laserButton = document.getElementById("laser");
  let bugButton = document.getElementById("bug");
  let endTurnButton = document.getElementById("endTurn");

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

    if(board[newRow][newColumn] === "iceWall"){
      alert("Detected Ice Wall!")
      board[newRow][newColumn] = "water";
    }
    else{
      alert("Oops! Seems like there is no Ice Wall in front of your turtle!")
    }
  }
  else if(currentDirection === "down"){
    newRow = currentRow + 1;
    newColumn = currentColumn;

    if(board[newRow][newColumn] === "iceWall"){
      alert("Detected Ice Wall!")
      board[newRow][newColumn] = "water";
    }
    else{
      alert("Oops! Seems like there is no Ice Wall in front of your turtle!")
    }
  }
  else if(currentDirection === "right"){
    newRow = currentRow;
    newColumn = currentColumn + 1;

    if(board[newRow][newColumn] === "iceWall"){
      alert("Detected Ice Wall!")
      board[newRow][newColumn] = "water";
    }
    else{
      alert("Oops! Seems like there is no Ice Wall in front of your turtle!")
    }
  }
  else{
    newRow = currentRow;
    newColumn = currentColumn - 1;

    if(board[newRow][newColumn] === "iceWall"){
      alert("Detected Ice Wall!")
      board[newRow][newColumn] = "water";
    }
    else{
      alert("Oops! Seems like there is no Ice Wall in front of your turtle!")
    }
  }
  console.log(board);
  eraseBoard();
  updateBoard();
  rotateLeftButton.disabled = true;
  rotateRightButton.disabled = true;
  forwardButton.disabled = true;
  laserButton.disabled = true;
  bugButton.disabled = false;
  endTurnButton.disabled = false;
}

// Window loading function

document.addEventListener("DOMContentLoaded", function(event) {events()});