"use strict";
let currentPlayer;
let board;
let userLibrary;
let currentLogin;
let beepUser;
let DotUser;
let pangleUser;
let piUser;

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

function updateBoard(){
    for (let i=0; i < board.length; i++){
        for (let j=0; j < board.length; j++){
            if (board[i][j] == 'j1') {
                $('#'+i+'-'+j).prop('class', '');
            }
        }
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

function User(name, password, score, birth,direction, id, end = false) {
    this.name = name;
    this.password = password;
    this.birth = birth;
    this.direction = direction;
    this.score = score;
    this.id = id;
    this.deck = new Deck();
    this.pos = [];
    this.end = end;

    function addTurtle(imagefile) {
        this.image = imagefile;
    }

    // -90 ou 90
    function rotate(degrees) {
        if (degrees == 90) {
            setDeck(this.deck.upright())
        }
        if (degrees == -90) {
            setDeck(this.deck.upleft())
        }

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

// let aa = new Deck;
// console.log(aa);
// console.log(aa.upfwd());
// console.log(aa);

//USER MANAGEMENT:

function saveUser(user) {
    let currentUsers = localStorage.getItem('userNames');
    currentUsers += (',' + user.name);
    localStorage.setItem('userNames', currentUsers);

    let currentPasswords = localStorage.getItem('userPasswords');
    currentPasswords += (',' + user.password);
    localStorage.setItem('userPasswords', currentPasswords);

    let currentBirthdays = localStorage.getItem('userBirthdays');
    currentBirthdays += (',' + user.birth);
    localStorage.setItem('userBirthdays', currentBirthdays);
}

function getLocalStorageUsers(){
    /*
    This function updates the userLibrary variable with the localStorage users.
     */
    let usernames = localStorage.getItem('userNames').split(',');
    let passwords = localStorage.getItem('userPasswords').split(',');
    let birthdays = localStorage.getItem('userBirthdays').split(',');
    let scores = localStorage.getItem('userScores').split(',');
    userLibrary = [];
    for (let i = 0; i < usernames.length; i++){
        let currentUser = new User(usernames[i], passwords[i], scores[i], birthdays[i], 0, 0, false);
        userLibrary.push(currentUser);
    }
}

function setLocalStorageUsers(){
    //  This function updates the localStorage with the users in the userLibrary variable.
    let usernames = [];
    let passwords = [];
    let birthdays = [];
    let scores = [];
    for (let i = 0; i < userLibrary.length; i++) {
        usernames.push(userLibrary[i].name);
        passwords.push(userLibrary[i].password);
        birthdays.push(userLibrary[i].birth);
        scores.push(userLibrary[i].score);
    }
    localStorage.setItem('userNames', usernames.toString());
    localStorage.setItem('userPasswords', passwords.toString());
    localStorage.setItem('userBirthdays', birthdays.toString());
    localStorage.setItem('userScores', scores.toString());
}

function uniqueUsername(userName) {
    // Checks if userName is unique and returns true if it is, false otherwise
    let unique = true;
    for (let key in localStorage) {
        if (key === userName) {
            unique = false;
        }
    }
    return unique
}

function register() {
    let userName = $('#userName').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    let player1Name = $('#player1Name').val();
    let player2Name = $('#player2Name').val();
    let player3Name = $('#player3Name').val();
    let player4Name = $('#player4Name').val();
    let player1Birth = $('#player1Birth').val();
    let player2Birth = $('#player2Birth').val();
    let player3Birth = $('#player3Birth').val();
    let player4Birth = $('#player4Birth').val();

    let familyElements = [player1Name, player2Name, player3Name, player4Name].toString();
    let familyBirthdates = [player1Birth, player2Birth, player3Birth, player4Birth].toString();

    if ((password === confirmPassword) && (uniqueUsername(userName))) {
        localStorage.setItem(userName,password);
        localStorage.setItem(userName + '_names', familyElements);
        localStorage.setItem(userName + '_birthdates', familyBirthdates);
    }
    else if (password !== confirmPassword) {
        alert("Oops! The passwords you've entered do not match, please try again");
    }
    else {
        alert("Oops! That username already exists! Please try a different one.")
    }
}

function login(){
    let username = $('#loginUser').val();
    let password = $('#loginPassword').val();

    if (localStorage.getItem(username) === password) {
        sessionStorage.setItem('activeUser', username);
        $('#openLogin').prop('class','w3-button w3-bar-item w3-hide');
        $('#openLoginMobile').prop('class','w3-button w3-bar-item w3-hide');
        $('#logoutButton').prop('class','w3-button w3-bar-item');
        $('#logoutButtonMobile').prop('class','w3-button w3-bar-item');

        let currentPlayers = localStorage.getItem(username + '_names');
        let currentBirthdays = localStorage.getItem(username + '_birthdates');

        sessionStorage.setItem('playerNames', currentPlayers);
        sessionStorage.setItem('playerBirthdays', currentBirthdays);

    }
    else {
        alert('Wrong username/password. Please try again.')
    }
}

function logout(){
    sessionStorage.clear();
    $('.welcomeMessage').text("You're not logged in.");
    $('#openLogin').prop('class','w3-button w3-bar-item');
    $('#openLoginMobile').prop('class','w3-button w3-bar-item');
    $('#openRegister').prop('class','w3-button w3-bar-item');
    $('#openRegisterMobile').prop('class','w3-button w3-bar-item');
    $('#logoutButton').prop('class','w3-button w3-bar-item w3-hide');
    $('#logoutButtonMobile').prop('class','w3-button w3-bar-item w3-hide');
}

// EVENT HANDLERS:
function main () {
    $('#logoutButton').click(logout);
    $('#logoutButtonMobile').click(logout);
    $('#registerButton').click(register);
    $('#loginButton').click(login);
    let activeUser = sessionStorage.getItem('activeUser');
    if (activeUser !== null) {
        $('.welcomeMessage').text('Hi, ' + activeUser + '!');
        $('#openLogin').prop('class','w3-button w3-bar-item w3-hide');
        $('#openLoginMobile').prop('class','w3-button w3-bar-item w3-hide');
        $('#openRegister').prop('class','w3-button w3-bar-item w3-hide');
        $('#openRegisterMobile').prop('class','w3-button w3-bar-item w3-hide');
        $('#logoutButton').prop('class','w3-button w3-bar-item');
        $('#logoutButtonMobile').prop('class','w3-button w3-bar-item');
    }
}
