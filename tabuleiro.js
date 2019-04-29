/*
O código que se segue é tão lindo e eficiente que pode ferir
a suscetibilidade que quem está a fazer SI :P
 */

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
