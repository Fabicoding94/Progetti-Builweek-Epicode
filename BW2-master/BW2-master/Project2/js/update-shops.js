const apiUtenti = "http://localhost:3000/shops"
let parametri = new URLSearchParams(location.search)
console.log(parametri)
let userId = parametri.get("id")
console.log(userId)

//fetch per prelevare dati utente esistente
fetch(apiUtenti + "/" + userId)
    .then(response => response.json())
    .then(shops => {
        let shop = document.querySelector("#shopName")
        let address = document.querySelector("#address")
        let email = document.querySelector("#mail")
        let telefono = document.querySelector("#tel")
        let prodotti = document.querySelector("#products")

        shop.value = shops.shopName
        address.value = shops.address
        email.value = shops.mail
        telefono.value = shops.tel
        prodotti.value = shops.products
    })

let button = document.querySelector("#salva-modificheshops")

button.addEventListener("click", function (e) {
    e.preventDefault()
    let shop = document.querySelector("#shopName")
    let address = document.querySelector("#address")
    let email = document.querySelector("#mail")
    let telefono = document.querySelector("#tel")
    let prodotti = document.querySelector("#products")
    let shops = {
        shopName: shop.value,
        address: address.value,
        mail: email.value,
        tel: telefono.value,
        products: prodotti.value
    }

    let option = {
        method: "PUT",
        body: JSON.stringify(shops),
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
                        text: `Shop ${res.shopName} has been updated`,
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

import {checkLogStatus} from '../export/functions.js'
window.onload = checkLogStatus()