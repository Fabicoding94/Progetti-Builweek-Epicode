import {setSearch} from '../export/functions.js'

searchPRO()

async function searchPRO() {
    //let shops = await fetch("http://localhost:3000/shops").then(res => res.json())
    //let users = await fetch("http://localhost:3000/users").then(res => res.json())
    let [shops, users] = await Promise.all([
        fetch("http://localhost:3000/shops").then(res => res.json()),
        fetch("http://localhost:3000/users").then(res => res.json())
    ])

    let radioUser = document.querySelector("#radioUser")
    setSearch(radioUser, '#utente-', users, 'firstName')
    
    let radioShop = document.querySelector("#radioShop")
    setSearch(radioShop, '#shop-', shops, 'shopName')

    let radioShopOwner = document.querySelector("#radioShopOwner")
    setSearch(radioShopOwner, '#shop-', shops, 'shopOwner')
}











