import { Shop } from '../export/class.js'

export function getShops() {
    fetch("http://localhost:3000/shops")
    .then(risposta => risposta.json())
    .then(shops => {
        for(let shop of shops) {
            shop = new Shop(shop.id, shop.shopName, shop.address, shop.mail, shop.tel, shop.products, shop.shopOwner)
        }
    })
}


import { Utente } from '../export/class.js' 

export function getUsers() {
    fetch("http://localhost:3000/users")
    .then(risposta => risposta.json())
    .then(utenti => {
        for(let user of utenti) {
            user = new Utente(user.id, user.username, user.firstName, user.lastName, user.gender, user.email, user.tel)
        }
    })
}



//login functions
export function checkLogStatus() {
    let showLoggedUsername = document.querySelector('#logged-user')
    let loginBtn = document.querySelector('#login-btn')
    let logoutBtn = document.querySelector('#logout-btn')

    let userLogged = sessionStorage.getItem('user logged in') ? JSON.parse(sessionStorage.getItem('user logged in')) : {};
    //show the logged user username + switch button between login and logout
    if(userLogged.username) {
        showLoggedUsername.textContent = userLogged.username;
        loginBtn.classList.add('d-none');
        logoutBtn.classList.remove('d-none');
    }else{
        showLoggedUsername.textContent = 'guest'
    }

    //logout btn 
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logOut();
    })
}

//dont neet to actually import this, since checkLogStatus uses it I just neet to import checkLogStatus
export function logOut(){ 
    Swal.fire({
        title: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out!'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: `You logged out!`,
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
            }).then(() => {
                sessionStorage.removeItem('user logged in')
                window.location.reload();
            })
        }
      })
}

export function modificaUtente(id, loggedID){
    if(id == loggedID){
        window.location.href = "modifica-users.html?id=" + id;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Sorry but you cant!',
            text: 'You can Update only your profile',
            showConfirmButton: true
        })
    }
}

export function modificaShop(id, shopOwner, loggedOwner){
    if(shopOwner == loggedOwner){
        window.location.href = "modifica-shops.html?id=" + id;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Sorry but you cant!',
            text: 'You can Update only your Shops',
            showConfirmButton: true
        })
    }
}

//-----SEARCH FUNCTIONS

//setting the search parameters, syntax[1, 2, 3, 4]
/*
    1 = radiobutton for the event listener
    2 = ID prefix for users or shops [string]
    3 = obj array (where to search)
    4 = key of my obj EX "tel" to search by phone number [string]
*/
export function setSearch(radio, filtro, array, searchParam){
    let ricerca = document.querySelector("#ricerca")
    radio.addEventListener("click", () => {
        cleanResultContainer()
        cleanFields()
        ricerca.addEventListener("input", () => {
            search(filtro, array, searchParam)
        })
    })
}

//clean the result container when user switch search filter
function cleanResultContainer() {
    let resultContainer = document.querySelector(".search-items-box")
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild)
    }
}

//more cleaning for UX
function cleanFields() {
    ricerca.value = '';
}

//modular search function working with both users and shop, can be upgraded to X search filter
function search(filtro, array, ricercaParam) {

    let itemsBox = document.querySelector(".search-items-box")
    cleanResultContainer()
    let userTrovati = array.filter((r) => r[ricercaParam].toUpperCase().search(ricerca.value.toUpperCase()) != -1 && ricerca.value)

    for (let user of userTrovati) {
        let div = document.createElement("div")
        let accFind = `${filtro}${user.id}`
        let accFindClone = document.querySelector(accFind).cloneNode(true)
        itemsBox.append(div)
        modificaClone(accFindClone, div)
    }

}

//Modify the accordion so the searched results interaction don't interfere with their "original" conterparts
function modificaClone(clone, li) {
    let test = clone.id.split('')
    let test1 = test[test.length-1]
    clone.id = clone.id + "-searched"
    li.append(clone)

    let headerClone = document.querySelector(`#${clone.id} h2`)
    headerClone.id = headerClone.id + "-searched"

    let button = document.querySelector(`#${clone.id} h2 button`)
    button.setAttribute("data-bs-target", "#collapse-" + clone.id)

    let divCollapse = document.querySelector(`#${clone.id} .accordion-collapse`)
    divCollapse.id = "collapse-" + clone.id

    let loggedID = sessionStorage.getItem('user logged in') ? JSON.parse(sessionStorage.getItem('user logged in')).id : null;

    let updateBtnClone = document.querySelector(`#${clone.id} .btn-warning`)
    let deleteBtnClone = document.querySelector(`#${clone.id} .btn-danger`)
    deleteBtnClone.className = 'd-none'
    updateBtnClone.textContent = 'Go to'
    updateBtnClone.addEventListener('click', () => {

        // I'm sorry.
        if(clone.id.includes('utente')){

            updateBtnClone.href = '#utente-' + test1

            let colpevole = document.querySelector('#utente-' + test1 + ' .accordion-button');
            colpevole.classList.remove('collapsed')
            colpevole.setAttribute('aria-expanded', 'true')

            let omertoso = document.querySelector('#collapse-user-' + test1)
            omertoso.classList.add('show')

        }else{
            updateBtnClone.href = '#shop-' + test1

            let colpevole = document.querySelector('#shop-' + test1 + ' .accordion-button');
            colpevole.classList.remove('collapsed')
            colpevole.setAttribute('aria-expanded', 'true')

            let omertoso = document.querySelector('#collapse-' + test1)
            omertoso.classList.add('show')
        }
    })


    return clone

}