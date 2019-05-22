
// event handlers moving
// $("endplay").on("click",endplay());
// $("bug").on("click",restartplay());


function endplay() {
    return endturnbutton = true
}

function restartplay() {
//    board inicial antes de clicar em cartas

}

function endGame() {
    for (var user in ordusers) {
        if (user.end() == false) {
            return false
        }
    }
    return true
}


function game(users,boardsize) {

//    Users is a array of users to play

    let ordusers = order(users);
    let indplayer = 0;
    let currentplayer = ordusers[0];
    let endturnbutton = false;

    while (endGame() == false) {


        while (endturnbutton == false) {
            //     pode fazer as suas jogadas
        }
        // depois da jogada update board

        if (indplayer == ordusers.length) {
            indplayer = 0;
            currentplayer = ordusers[0]
        } else {
            indplayer += 1;
            currentplayer = ordusers[1]
        }
    }
}


function insertion_sort(lst) {
    for (let i = 1; i < lst.length; i++) {
        let tmp = lst[i];
        k = i;
        while (k > 0 && tmp < lst[k-1]) {
            lst[k] = lst[k - 1];
            k -= 1;
        }
        lst[k] = temp
        }
    return lst
    }

function order(users) {

    var usersdic = {};
    for (let i=0; i< users.length; i++); {
        var bday = users[i].birth.replace("-","").replace("-","");
        usersdic[parseInt(bday)] = users[i];
    }
    var lst = [];
    for (var key in usersdic) {
        lst.push(usersdic[key])
    }
    var ordered = insertion_sort(lst);
    // this is the final list of ordered users
    var orderesuser = [];
    for (let i= 0; i < ordered.length; i++) {
        orderesuser.push(usersdic[i])
    }
    return orderesuser

}
// $(document).ready;

