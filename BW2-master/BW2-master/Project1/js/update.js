
const apiUtenti = "http://localhost:3000/users"
let parametri = new URLSearchParams(location.search)
console.log(parametri)
let userId = parametri.get("id")
console.log(userId)

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


        nome.value = utente.firstName
        cognome.value = utente.lastName
        username.value = utente.username
        gender.value = utente.gender
        email.value = utente.email
        telefono.value = utente.tel


    })

let button = document.querySelector("#salva-modifiche")

button.addEventListener("click", function (e) {
    e.preventDefault()
    let utente = {
        username: username.value,
        firstName: nome.value,
        lastName: cognome.value,
        gender: gender.value,
        email: email.value,
        tel: telefono.value
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
                        location.href = "index.html"
                      })
                    
                })
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', 'you can keep updating', 'info')
        } else {
            location.href = "index.html"
        }
    })


})

/*
fetch(apiUtenti + "/" + userId, option)
.then(res => res.json())
.then(res => {
    console.log("utente sendato")
})
*/