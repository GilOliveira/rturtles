"use strict";

function main() {

  let botaoHamburguer = document.getElementById("hamburger");
  let closeRegisterButton = document.getElementById("closeRegister");
  let registerModal = document.getElementById("registerModal");
  let loginModal = document.getElementById("loginModal");
  let loginButton = document.getElementById('openLogin');
  let registerButton = document.getElementById("openRegister");
  let closeLoginButton = document.getElementById("closeLogin");
  let mobileLoginButton = document.getElementById("openLoginMobile");
  let mobileRegisterButton = document.getElementById("openRegisterMobile");
  // let loginBeepButton = document.getElementById('loginBeep');
  // let loginDotButton = document.getElementById('loginDot');
  // let loginPangleButton = document.getElementById('loginPangle');
  // let loginPiButton = document.getElementById('loginPi');

  botaoHamburguer.addEventListener("click", openMenu);
  closeRegisterButton.addEventListener("click", closeRegister);
  loginButton.addEventListener("click", openLogin);
  registerButton.addEventListener("click", openRegister);
  closeLoginButton.addEventListener("click", closeLogin);
  mobileLoginButton.addEventListener("click", openLogin);
  mobileRegisterButton.addEventListener("click", openRegister);


  function openLogin() {
    loginModal.style.display = 'block';
  }

  function closeLogin() {
    loginModal.style.display = 'none';
  }


  function openRegister() {
    registerModal.style.display = 'block';
  }

  function closeRegister() {
    registerModal.style.display = 'none';
  }

  function openMenu() {
    if (document.getElementById("menuLateral").style.display == "block") {
      document.getElementById("menuLateral").style.display = "none";
    }
    else {
      document.getElementById("menuLateral").style.display = "block";
    }
  }




}

window.onload = main;

let player1;
let player2;
let player3;
let player4;
let allplayers;
// let births = [player1.birth, player2.birth, player3.birth, player4.birth]; tem de ser pelo sessionstorage
let board = (generateBoard(8));
let currentPlayer ;
let currentPlayerIndex;
let rowIndexCopy;
let columnIndexCopy;
let directionCopy;
let boardCopy;
let playerswon = 0;
let timeInSeconds = 0;

// Assume que a lista já está ordenada consoante a vez de jogar.
let playersStillPlaying = [true, true, true, true];




function events(){
  let playStoneWallsButton = document.getElementById("playIceWalls");
  let playIceWallsButton = document.getElementById("playStoneWalls");
  let playCratesButton = document.getElementById("playCrates");
  let rotateLeftButton = document.getElementById("rotateLeft");
  let rotateRightButton = document.getElementById("rotateRight");
  let forwardButton = document.getElementById("forward");
  let laserButton = document.getElementById("laser");
  let bugButton = document.getElementById("bug");
  let endTurnButton = document.getElementById("endTurn");

  playStoneWallsButton.addEventListener("click", playStoneWalls);
  playIceWallsButton.addEventListener("click", playIceWalls);
  playCratesButton.addEventListener("click", playCrates);
  rotateLeftButton.addEventListener("click", function(){ rotateLeft(currentPlayer);});
  rotateRightButton.addEventListener("click", function(){ rotateRight(currentPlayer);});
  forwardButton.addEventListener("click", function(){ forward(currentPlayer);});
  laserButton.addEventListener("click", function(){ laser(currentPlayer);});
  bugButton.addEventListener("click", bug);
  endTurnButton.addEventListener("click", updateTurn);

  $('#closePlayModal').click(closePlayModal);
  $('#openPlayLogin').click(openLoginPlay);
  $('#openPlayRegister').click(openRegisterPlay);
  $('#goHome').click(goHome);
  $("#nologbtn").click(playnologin);

  flowModalPlay();

}

function playStoneWalls(){
  $("#scoretable").css("display","block");
  closePlayModeModal();
  appendPlayersToBoard(board, player1, player2, player3, player4);
  appendJewelsToBoard(board);
  appendStoneWallsToBoard(board);
  displayBoard();
  updateBoard();
  console.log(board);
  document.getElementById("rotateLeft").style.display="inline";
  document.getElementById("rotateRight").style.display="inline";
  document.getElementById("forward").style.display="inline";
  document.getElementById("bug").style.display="inline";
  document.getElementById("endTurn").style.display="inline";
  $('#currentPlayerContainer').prop('class', 'w3-container');
  updateCurrentPlayerDisplay();
}

function playIceWalls(){
  $("#scoretable").css("display","block");
  closePlayModeModal();
  appendPlayersToBoard(board, player1, player2, player3, player4);
  appendJewelsToBoard(board);
  appendIceWallsToBoard(board);
  displayBoard();
  updateBoard();
  console.log(board);
  document.getElementById("rotateLeft").style.display="inline";
  document.getElementById("rotateRight").style.display="inline";
  document.getElementById("forward").style.display="inline";
  document.getElementById("laser").style.display="inline";
  document.getElementById("bug").style.display="inline";
  document.getElementById("endTurn").style.display="inline";
  $('#currentPlayerContainer').prop('class', 'w3-container');
  updateCurrentPlayerDisplay();
}

function playCrates(){
  $("#scoretable").css("display","block");
  closePlayModeModal();
  appendPlayersToBoard(board, player1, player2, player3, player4);
  appendJewelsToBoard(board);
  appendCratesToBoard(board);
  displayBoard();
  updateBoard();
  console.log(board);
  document.getElementById("rotateLeft").style.display="inline";
  document.getElementById("rotateRight").style.display="inline";
  document.getElementById("forward").style.display="inline";
  document.getElementById("bug").style.display="inline";
  document.getElementById("endTurn").style.display="inline";
  $('#currentPlayerContainer').prop('class', 'w3-container');
  updateCurrentPlayerDisplay();
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
      else if(board[i][j] === "crate"){
        $("#" + i + "-" + j).html("<img width='50px' height='50px' src='images/game/tiles/crate.png'>");
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

function appendCratesToBoard(board){
  let numCrates = Math.floor(Math.random() * 8) + 2;

  while(numCrates > 0){
    let rowIndex = Math.floor(Math.random() * board.length);
    let columnIndex = Math.floor(Math.random() * board.length);

    if(board[rowIndex][columnIndex] === ""){
      board[rowIndex][columnIndex] = "crate";
    }

    numCrates--;
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
  $("#bugaudio").get(0).play();
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
  $("#rotateaudio").get(0).play();
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
  $("#rotateaudio").get(0).play();
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
    else if(board[newRow][newColumn] === "crate"){
      if((newRow - 1) < 0){
        alert("Unable to move crate outside of board!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
      else if(board[newRow - 1][newColumn] === ""){
        alert("Moving Crate!")
        currentPlayer.rowIndex = newRow;
        currentPlayer.columnIndex = newColumn;
        board[currentRow][currentColumn] = "";
        board[newRow][newColumn] = currentPlayer;
        board[newRow - 1][newColumn] = "crate";
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
      else{
        alert("Unable to move crate!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
      console.log(newRow - 1);
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
      $("#borataudio").get(0).play();
      playersStillPlaying[currentPlayerIndex] = false;
      scorepointstable();



      console.log(playersStillPlaying);

      if(!(playersStillPlaying.includes(true))){
        alert("CONGRATULATIONS! YOU ENDED THE GAME!");
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
      $("#forwardaudio").get(0).play();
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
    else if(board[newRow][newColumn] === "crate"){
      if((newRow + 1) > 7){
        alert("Unable to move crate outside of board!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
      else if(board[newRow + 1][newColumn] === ""){
        alert("Moving Crate!")
        currentPlayer.rowIndex = newRow;
        currentPlayer.columnIndex = newColumn;
        board[currentRow][currentColumn] = "";
        board[newRow][newColumn] = currentPlayer;
        board[newRow + 1][newColumn] = "crate";
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
      else if((newRow + 1) > 7){
        alert("Unable to move crate outside of board!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
      else{
        alert("Unable to move crate!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
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
      $("#borataudio").get(0).play();
      playersStillPlaying[currentPlayerIndex] = false;
      scorepointstable();


      console.log(playersStillPlaying);


      if(!(playersStillPlaying.includes(true))){
        alert("CONGRATULATIONS! YOU ENDED THE GAME!");
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
      $("#forwardaudio").get(0).play();
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
    else if(board[newRow][newColumn] === "crate"){
      if((newColumn + 1) > 7){
        alert("Unable to move crate outside of board!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
      else if(board[newRow][newColumn + 1] === ""){
        alert("Moving Crate!")
        currentPlayer.rowIndex = newRow;
        currentPlayer.columnIndex = newColumn;
        board[currentRow][currentColumn] = "";
        board[newRow][newColumn] = currentPlayer;
        board[newRow][newColumn + 1] = "crate";
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
      else{
        alert("Unable to move crate!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
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
      $("#borataudio").get(0).play();
      playersStillPlaying[currentPlayerIndex] = false;
      scorepointstable();



      console.log(playersStillPlaying);

      if(!(playersStillPlaying.includes(true))){
        alert("CONGRATULATIONS! YOU ENDED THE GAME!");
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
      $("#forwardaudio").get(0).play();
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
    else if(board[newRow][newColumn] === "crate"){
      if((newColumn - 1) < 0){
        alert("Unable to move crate outside of board!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
      else if(board[newRow][newColumn - 1] === ""){
        alert("Moving Crate!")
        currentPlayer.rowIndex = newRow;
        currentPlayer.columnIndex = newColumn;
        board[currentRow][currentColumn] = "";
        board[newRow][newColumn] = currentPlayer;
        board[newRow][newColumn - 1] = "crate";
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
      else{
        alert("Unable to move crate!");
        rotateLeftButton.disabled = true;
        rotateRightButton.disabled = true;
        forwardButton.disabled = true;
        laserButton.disabled = true;
        bugButton.disabled = false;
        endTurnButton.disabled = false;
      }
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
      $("#borataudio").get(0).play();
      playersStillPlaying[currentPlayerIndex] = false;
      scorepointstable();

      console.log(playersStillPlaying);

      if(!(playersStillPlaying.includes(true))){
        alert("CONGRATULATIONS! YOU ENDED THE GAME!");
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
      $("#forwardaudio").get(0).play();
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
  $("#laseraudio").get(0).play();

  if(currentDirection === "up"){
    newRow = currentRow - 1;
    newColumn = currentColumn;

    if(board[newRow][newColumn] === "iceWall"){
      $("#laseraudio").get(0).play();
      alert("Melting Ice Wall!");
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
      $("#laseraudio").get(0).play();
      alert("Melting Ice Wall!");
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
      $("#laseraudio").get(0).play();
      alert("Melting Ice Wall!");
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
      $("#laseraudio").get(0).play();
      alert("Melting Ice Wall!");
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

function pad(value){
  return value > 9 ? value : "0" + value;
}

setInterval(function(){
    document.getElementById("seconds").innerHTML=pad(++timeInSeconds % 60);
    document.getElementById("minutes").innerHTML=pad(parseInt(timeInSeconds / 60, 10));
}, 1000);

function flowModalPlay() {
  console.log(sessionStorage);

  if (sessionStorage.length != 0) {
    let activeUser = sessionStorage.getItem("activeUser");
    if (activeUser !== null) {
      sessionStorage.setItem("tempUser", activeUser);
    }

    $("#playModal").css("display", "none");
    $("#playModeModal").css("display", "block");
    getLogedPlayer();

  } else if (sessionStorage.length == 0) {
    $("#playModal").css('display', 'block');
  }

}

function closePlayModal() {
  playModal.style.display = "none";
}

function openLogin() {
  loginModal.style.display = 'block';
}

function closeLogin() {
  loginModal.style.display = 'none';
}


function openRegister() {
  registerModal.style.display = 'block';
}

function closeRegister() {
  registerModal.style.display = 'none';
}

function openRegisterPlay() {
  openRegister();
  closePlayModal();
}

function openLoginPlay() {
  openLogin();
  closePlayModal();
}

function closePlayModeModal() {
  $("#playModeModal").css("display","none");
}

function goHome() {
  window.open('index.html');
}

function getLogedPlayer() {
  let tempUser = sessionStorage.getItem('tempUser');

  let playersnames = sessionStorage.getItem('playerNames');
  let playersbirth = sessionStorage.getItem('playerBirthdays');
  console.log(playersnames,playersbirth);


  playersnames = playersnames.split(",");
  playersbirth = playersbirth.split(",");

  player1 = new Player(playersnames[0], playersbirth[0], "down", 0, 0);
  player2 = new Player(playersnames[1], playersbirth[1], "left", 0, 7);
  player3 = new Player(playersnames[2], playersbirth[2], "right", 7, 0);
  player4 = new Player(playersnames[3], playersbirth[3], "up", 7, 7);

  allplayers =  [player1,player2,player3,player4];

  getfirstPlayer();
  createscoretable();



}

function nologsub() {

  sessionStorage.setItem("tempUser","nolog");

  let u1Name = $('#u1name').val();
  let u2Name = $("#u2name").val();
  let u3Name = $("#u3name").val();
  let u4Name = $("#u4name").val();
  console.log(u4Name);

  let currentPlayers = [u1Name, u2Name, u3Name, u4Name].toString();

  sessionStorage.setItem("playerNames",currentPlayers);
  let bday = [0,0,0,0].toString();

  sessionStorage.setItem("playerBirthdays",bday);
  sessionStorage.setItem("playerGames","0");
  sessionStorage.setItem("playerScores",[0,0,0,0].toString());
  sessionStorage.setItem("playerWins",[0,0,0,0].toString());
  sessionStorage.setItem("playerTime",[0,0,0,0].toString());
  console.log(sessionStorage.getItem("playerTime"))


}


function scorepointstable() {
  playerswon++;
  let placed;
  let time;

  let currentGames = sessionStorage.getItem('playerGames');
  let newGames = parseInt(currentGames);
  newGames += 1;
  sessionStorage.setItem('playerGames',newGames.toString());


  let currentScore = sessionStorage.getItem('playerScores');
  let scoresArray = currentScore.split(",");
  let newScore = parseInt(scoresArray[currentPlayerIndex]);

  let currentTime = sessionStorage.getItem('playerTime');
  let timeArray = currentTime.split(",");
  let newTime = parseInt(timeArray[currentPlayerIndex]);

  let currentWins =sessionStorage.getItem('playerWins');
  let winsArray = currentWins.split(",");
  let newWins = parseInt(winsArray[currentPlayerIndex]);


  if (playerswon == 1) {
    console.log(newWins);
    newScore += 10;
    newWins += 1;
    placed = "1º";

    scoresArray[currentPlayerIndex] = newScore;
    sessionStorage.setItem("playerScores",scoresArray);
    console.log(scoresArray,winsArray,scoresArray);

    winsArray[currentPlayerIndex] = newWins;
    sessionStorage.setItem("playerWins", winsArray);

  } else if (playerswon == 2) {
    newScore += 5;
    placed = "2º";

    scoresArray[currentPlayerIndex] = newScore;
    sessionStorage.setItem("playerScores",scoresArray);


  } else if (playerswon == 3) {
    newScore  += 3;
    placed = "3º";
    scoresArray[currentPlayerIndex] = newScore;
    sessionStorage.setItem("playerScores",scoresArray);

  } else if (playerswon == 4) {
    currentScore += 1;
    placed = "4º";
    scoresArray[currentPlayerIndex] = newScore;
    sessionStorage.setItem("playerScores",scoresArray);

    playerswon = 0
  }

  let scoretable = $("#scoretable tr");

  let playerscore = scoretable.eq(currentPlayerIndex + 1);

  let playerobj = allplayers[currentPlayerIndex];

  playerscore.html("<td> " +
      playerobj.name + "</td><td>" +
      newScore + "</td><td>" +
      newTime + "</td><td>" +
      newWins + "</td><td>" +
      placed + "</td>");}


function createscoretable() {
  let players = [player1.name,player2.name,player3.name,player4.name];

  let table = $('#scoretable table:last-child');
  table.append("<tr>");
  table.append("<th> Username </th>");
  table.append("<th>Score</th>");
  table.append("<th>Tame taken</th>");
  table.append("<th>Games won</th>");
  table.append("<th>Placed</th>");
  table.append("</tr>");


  for (let i=0; i < players.length; i++) {
    let strtoappend = "<tr><td>" + players[i] + "</td> <td>0</td> <td>0</td></tr>";
    table.append(strtoappend)

  }
  function showEach(idx) {
    console.log(idx + ": " +
        $(this).text());
  }
  $("#scoretable tr").each(showEach);

}

function getfirstPlayer() {
  currentPlayer = player1;
  currentPlayerIndex = 0;
  rowIndexCopy = currentPlayer.rowIndex;
  columnIndexCopy = currentPlayer.columnIndex;
  directionCopy = currentPlayer.direction;
}

function playnologin() {
  nologsub();
  closePlayModal();
}

function updateCurrentPlayerDisplay() {
  switch (currentPlayer) {
    case player1:
      $('#currentPlayerLabel').text(player1.name);
      $('#currentPlayerImage').prop('src', 'images/game/characters/beep.png');
      break;
    case player2:
      $('#currentPlayerLabel').text(player2.name);
      $('#currentPlayerImage').prop('src', 'images/game/characters/dot.png');
      break;
    case player3:
      $('#currentPlayerLabel').text(player3.name);
      $('#currentPlayerImage').prop('src', 'images/game/characters/pangle.png');
      break;
    case player4:
      $('#currentPlayerLabel').text(player4.name);
      $('#currentPlayerImage').prop('src', 'images/game/characters/pi.png');
      break;
  }
}

// Window loading function

document.addEventListener("DOMContentLoaded", function(event) {events()});
