function main(){
    let names = sessionStorage.getItem('playerNames').split(",");
    let birthdays = sessionStorage.getItem('playerBirthdays').split(',');
    let scores = sessionStorage.getItem('playerScores').split(',');
    $('#user1name').text(names[0]);
    $('#user2name').text(names[1]);
    $('#user3name').text(names[2]);
    $('#user4name').text(names[3]);
    $('#user1Birthday').text(birthdays[0]);
    $('#user2Birthday').text(birthdays[1]);
    $('#user3Birthday').text(birthdays[2]);
    $('#user4Birthday').text(birthdays[3]);
    $('#user1Score').text(scores[0]);
    $('#user2Score').text(scores[1]);
    $('#user3Score').text(scores[2]);
    $('#user4Score').text(scores[3]);
}

$(document).ready(main);