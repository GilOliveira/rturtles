function tabuleiro(n){
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

console.log(tabuleiro(3));


let t = tabuleiro(3);


t[0][1] = "J";
console.log(t);


function User(name,birth,direction,id) {

    this.name = name;
    this.birth = birth;
    this.direction = direction;
    this.id = id

    function addTurtle(imagefile) {
        this.image = imagefile;
    }

    /* -90 ou 90  */
    this.rotate = function (degrees) {
        this.direction = direction + degrees;
    }
}


let nu = new User("Sofia","14-03-1998",0,1);
nu.rotate(90);
console.log(nu);

t[0][2] = nu.id;

console.log(nu.toString());
console.log(t);