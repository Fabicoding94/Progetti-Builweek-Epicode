

import { Utente } from "../constructor/class.js";

window.onload = getUsers()


function getUsers() {
    fetch("http://localhost:3000/users")
    .then(risposta => risposta.json())
    .then(utenti => {
        for(let user of utenti) {
            user = new Utente(user.id, user.username, user.firstName, user.lastName, user.gender, user.email, user.tel)
        }
    })
}