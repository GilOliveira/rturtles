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
    let openProfileButton = document.getElementById("openProfile");
    let openProfileMobile = document.getElementById("openProfileMobile");

    botaoHamburguer.addEventListener("click", openMenu);
    closeRegisterButton.addEventListener("click", closeRegister);
    loginButton.addEventListener("click", openLogin);
    registerButton.addEventListener("click", openRegister);
    closeLoginButton.addEventListener("click", closeLogin);
    mobileLoginButton.addEventListener("click", openLogin);
    mobileRegisterButton.addEventListener("click", openRegister);
    openProfileButton.addEventListener("click", openProfile);
    openProfileMobile.addEventListener("click", openProfile);


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

    function openProfile(){
        window.open("Profile.html", "_self");
    }
}

window.onload = main;
