const apiUtenti = "http://localhost:3000/users"

let button = document.querySelector("#salva-user")

let pswrdBtn = document.querySelector('.password-visibility')

pswrdBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    let pswrd = document.querySelector('#password')
    let pswrdConf = document.querySelector('#conferma-password')
    console.log(pswrd.type);
    if(pswrd.type == "password"){
        pswrd.type = 'text'
        pswrdConf.type = 'text'
        pswrdBtn.innerHTML = '<i class="bi bi-eye"></i>'
    }else{
        pswrd.type = 'password'
        pswrdConf.type = 'password'
        pswrdBtn.innerHTML = '<i class="bi bi-eye-slash"></i>'
    }
})

button.addEventListener("click", function(e) {
    e.preventDefault()
    let nome = document.querySelector("#nome")
    let cognome = document.querySelector("#cognome")
    let username = document.querySelector("#username")
    let gender = document.querySelector("#gender")
    let email = document.querySelector("#email")
    let telefono = document.querySelector("#telefono")
    let password = document.querySelector("#password")
    let conferma = document.querySelector("#conferma-password")

    let utente = {
        username: username.value,
        firstName: nome.value,
        lastName: cognome.value,
        gender: gender.value,
        email: email.value,
        tel: telefono.value,
        password: password.value
    }
    
    let option = {
        method: "POST",
        body: JSON.stringify(utente),
        headers: {
            "content-type": "application/json"
        }
    }
    if (username.value == "" || nome.value == "" || cognome.value == "" || gender.value == "" || email.value == "" || telefono.value == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'you must fill all input fields',
        })
    } else {
        if (password.value != conferma.value){
            console.log(password, conferma);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords must be the same!'
            }).then(() => {
                password = '';
                conferma = '';
            })
            return false
        }else{
            fetch(apiUtenti, option)
            .then(res => res.json())
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your new user has been created',
                    text: `user ${res.firstName} ${res.lastName} ID #${res.id} has been created`,
                    showConfirmButton: true
                }).then(() => {
                    location.href = "shops&users.html"
                    sessionStorage.setItem('user logged in', JSON.stringify(res));
                    checkLogStatus();
                })
            })
        }
    }

})

import {checkLogStatus} from '../export/functions.js'
window.onload = checkLogStatus()