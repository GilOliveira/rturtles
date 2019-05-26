let userLibrary;
let currentLogin;

function main() {
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
        $('#openProfile').prop('class','w3-bar-item w3-button');
        $('#openProfileMobile').prop('class','w3-bar-item w3-button');
    }
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
        localStorage.setItem(userName, password);
        localStorage.setItem(userName + '_names', familyElements);

        localStorage.setItem(userName + '_birthdates', familyBirthdates);
        localStorage.setItem(userName + '_score', [0,0,0,0].toString());
        localStorage.setItem(userName + '_gameswon', [0,0,0,0].toString());
        localStorage.setItem(userName + '_timeTaken', [0,0,0,0].toString());
        localStorage.setItem(userName + "_playerGames", "0");




        startUserSession(userName);
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
        startUserSession(username);
    }
    else {
        alert('Wrong username/password. Please try again.')
    }
}

function startUserSession(username){
    sessionStorage.clear();
    sessionStorage.setItem('activeUser', username);
    $('#openLogin').prop('class','w3-button w3-bar-item w3-hide');
    $('#openLoginMobile').prop('class','w3-button w3-bar-item w3-hide');
    $('#logoutButton').prop('class','w3-button w3-bar-item');
    $('#logoutButtonMobile').prop('class','w3-button w3-bar-item');

    let currentPlayers = localStorage.getItem(username + '_names');
    let currentBirthdays = localStorage.getItem(username + '_birthdates');


    let currentScores = localStorage.getItem(username + '_score');
    let currentWins = localStorage.getItem(username + '_gameswon');
    let currentPlays = localStorage.getItem(username + "_playerGames");
    let currentTime = localStorage.getItem(username + '_timeTaken');

    sessionStorage.setItem('playerNames', currentPlayers);
    sessionStorage.setItem('playerBirthdays', currentBirthdays);
    sessionStorage.setItem('playerScores', currentScores);
    sessionStorage.setItem('playerWins', currentWins);
    sessionStorage.setItem('playerGames', currentPlays);
    sessionStorage.setItem('playerTime', currentTime);


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
    $('#openProfile').prop('class','w3-bar-item w3-button w3-hide');
    $('#openProfileMobile').prop('class','w3-bar-item w3-button w3-hide');
}

// Window loading function
$(document).ready(main);
