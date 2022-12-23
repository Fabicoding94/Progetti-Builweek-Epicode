
const apiUtenti = "http://localhost:3000/users"

let button = document.querySelector("#salva-user")

button.addEventListener("click", function(e) {
    e.preventDefault()
    let nome = document.querySelector("#nome")
    let cognome = document.querySelector("#cognome")
    let username = document.querySelector("#username")
    let gender = document.querySelector("#gender")
    let email = document.querySelector("#email")
    let telefono = document.querySelector("#telefono")

    let utente = {
        username: username.value,
        firstName: nome.value,
        lastName: cognome.value,
        gender: gender.value,
        email: email.value,
        tel: telefono.value
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

        fetch(apiUtenti, option)
        .then(res => res.json())
        .then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Your new user has been created',
                text: `user ${res.firstName} ${res.lastName} ID #${res.id} has created`,
                showConfirmButton: true
              }).then(() => {
                location.href = "index.html"
              })
        })
    }

})

