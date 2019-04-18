"use strict";

function main() {
    function openMenu() {
        if (document.getElementById("menuLateral").style.display == "block") {
            document.getElementById("menuLateral").style.display = "none";
        }
        else {
            document.getElementById("menuLateral").style.display = "block";
        }
    }
    console.log('Estou aqui');
    document.getElementById("hamburger").onclick = openMenu;
}

window.onload = main;