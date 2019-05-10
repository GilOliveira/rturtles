let currentPlayer;

function board(n){
    let outList = [];
    let tempList;
    for (let i = 0; i<n; i++){
        tempList = [];
        for (let j = 0; j<n; j++){
            tempList.push("");
        }
        outList.push(tempList);
    }
    return outList;
}

function fillBoard(board, t1, t2, t3, t4){
    // placing players in the board
    board[0][0] = t1;
    board[0][board.length-1] = t2;
    board[board.length-1][0] = t3;
    board[board.length-1][board.length-1] = t4;

    // placing jewels in the board
    board[parseInt((board.length-1)/2)][parseInt((board.length-1)/2)] = 'j1';
    board[parseInt((board.length-1)/2)][parseInt((board.length-1)/2+1)] = 'j2';
    board[parseInt((board.length-1)/2+1)][parseInt((board.length-1)/2)] = 'j3';
    board[parseInt((board.length-1)/2+1)][parseInt((board.length-1)/2+1)] = 'j4';
}

function determineWalls(board) {
    boardSize = Math.pow(board.length,2);
    return parseInt(boardSize*0.15);
}

function User(name,birth,direction,id) {

    this.name = name;
    this.birth = birth;
    this.direction = direction;
    this.id = id;

    function addTurtle(imagefile) {
        this.image = imagefile;
    }

    // -90 ou 90
    this.rotate = function (degrees) {
        this.direction = direction + degrees;
    }
}

let b = board(8);
let t1 = new User('turtle1', '1990-10-20', 0, 1);
let t2 = new User('turtle2', '1990-10-20', 0, 2);
let t3 = new User('turtle3', '1990-10-20', 0, 3);
let t4 = new User('turtle4', '1990-10-20', 0, 4);
fillBoard(b, t1, t2, t3, t4);
console.log(b);
