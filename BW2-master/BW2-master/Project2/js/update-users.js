const apiUtenti = "http://localhost:3000/users"
let parametri = new URLSearchParams(location.search)
console.log(parametri)
let userId = parametri.get("id")
console.log(userId)

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


//fetch per prelevare dati utente esistente
fetch(apiUtenti + "/" + userId)
    .then(response => response.json())
    .then(utente => {
        let nome = document.querySelector("#nome")
        let cognome = document.querySelector("#cognome")
        let username = document.querySelector("#username")
        let gender = document.querySelector("#gender")
        let email = document.querySelector("#email")
        let telefono = document.querySelector("#telefono")
        let password = document.querySelector("#password")
        let conferma = document.querySelector("#conferma-password")

        nome.value = utente.firstName
        cognome.value = utente.lastName
        username.value = utente.username
        gender.value = utente.gender
        email.value = utente.email
        telefono.value = utente.tel
        password.value = utente.password
        conferma.value = utente.password
    })

let button = document.querySelector("#salva-modifiche")

button.addEventListener("click", function (e) {
    e.preventDefault()
    let conferma = document.querySelector("#conferma-password")
    if (password.value == conferma.value) {
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
        method: "PUT",
        body: JSON.stringify(utente),
        headers: {
            "content-type": "application/json"
        }
    }
    
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            fetch(apiUtenti + "/" + userId, option)
                .then(res => res.json())
                .then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your work has been saved',
                        text: `user ${res.firstName} ${res.lastName} has been updated`,
                        showConfirmButton: false,
                        timer: 2000
                      }).then(() => {
                        location.href = "shops&users.html"
                      })
                    
                })
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', 'you can keep updating', 'info')
        } else {
            location.href = "shops&users.html"
        }
    })
    if (password.value != conferma.value){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          return false
    }
}else{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords arent matching!',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    }).then( () => {
        password.value = '';
        conferma.value = '';
    })
}
})

import {checkLogStatus} from '../export/functions.js'
window.onload = checkLogStatus()