

function game(users,boardsize) {
//    Users is a array of users to play

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
