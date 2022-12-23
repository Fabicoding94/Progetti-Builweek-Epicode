//ricordarsi di usare id user e id shop per id su html 
//ricordarsi di puntare agli accordion originali giusti
//id e password da non mostrare su accordion
//COMMENTARE

import { modificaUtente } from "./functions.js"
import { modificaShop } from "./functions.js"

//shoop creation class
export class Shop{
    constructor(id, shopName, address, mail, tel, products, shopOwner) {
        this.id = id
        this.shopName = shopName
        this.address = address
        this.mail = mail
        this.tel = tel
        this.products = products
        this.shopOwner = shopOwner
        
        this.showShop()
    }
    //fa partire tutti i metodi per creare la lista di shop
    showShop() {
        this.generateHtml()
        this.changeTitle()
        this.changeButton()
        this.changeCollapse()
        this.generaBody()
    }
    //crea l'html clonando i contenitori impostati su display-none
    generateHtml() {
        let target = document.querySelector("#myShops")
        let targetChild = document.querySelector("#myShops .accordion-item")
        let clone = targetChild.cloneNode(true)
        clone.id = "shop-" + this.id
        target.append(clone)
        clone.classList.add("bg-dark")
    }

    changeTitle() {
        let header = document.querySelector("#shop-" + this.id + " h2")
        header.id = this.id + "-header"
    }

    changeButton() {
        let button = document.querySelector("#shop-" + this.id + " .accordion-header button")
        button.textContent = this.shopName
        button.setAttribute("data-bs-target", "#collapse-" + this.id)
    }

    changeCollapse() {
        let collapse = document.querySelector("#shop-" + this.id + " #shop-shopID")
        collapse.id = "collapse-" + this.id
        collapse.setAttribute("data-labelledby", "utente-" + this.id)
    }

    generaBody() {
        let body = document.querySelector("#collapse-" + this.id + " .accordion-body")

        for (let prop in this) {
            if (prop != "id" && prop != "mail" && prop != "tel") {
                
                let p = document.createElement("p")
                let span = document.createElement("span")
                span.textContent = prop + ": "
                p.classList.add("text-light")
                span.className = "text-primary"
                p.textContent = this[prop]
                p.prepend(span)
                body.append(p)

            }else if(prop == "mail"){

                let a = document.createElement("a")
                let span = document.createElement("span")
                span.textContent = prop + ": "
                a.classList.add("text-light", "d-block", "mb-3")
                span.className = "text-primary"
                a.textContent = this[prop]
                a.href = 'mailto:'+this.mail
                a.prepend(span)
                body.append(a)

            }else if(prop == "tel"){

                let a = document.createElement("a")
                let span = document.createElement("span")
                span.textContent = prop + ": "
                a.classList.add("text-light", "d-block", "mb-3")
                span.className = "text-primary"
                a.textContent = this[prop]
                a.href = 'tel:'+this.mail
                a.prepend(span)
                body.append(a)

            }
        }
        let bottoneUpdate = document.createElement("a")
        let bottoneDelete = document.createElement("a")

        bottoneUpdate.textContent = "Update"
        bottoneUpdate.className = "btn btn-warning"

        bottoneDelete.textContent = "Delete"
        bottoneDelete.className = "btn btn-danger ms-2"

        let accDelete = document.querySelector("#shop-" + this.id)
        let api = "http://localhost:3000/shops"

        //steps to get from logged user the shop Owner string for the logic check in eliminaShop
        let loggedAccount = sessionStorage.getItem('user logged in') ? JSON.parse(sessionStorage.getItem('user logged in')) : null;

        if(loggedAccount){
            var loggedOwner = `${loggedAccount.firstName} ${loggedAccount.lastName} (${loggedAccount.username} #${loggedAccount.id})`
        }

        bottoneDelete.addEventListener("click", () => {
            eliminaShop(loggedOwner, accDelete, api, this.shopOwner)
        })

        bottoneUpdate.addEventListener("click", () => {
            modificaShop(this.id, this.shopOwner, loggedOwner)
        })

        body.append(bottoneUpdate, bottoneDelete)

    }
}   

//user creation class
export class Utente {
    constructor(id, username, firstName, lastName, gender, email, tel, password){
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.tel = tel;
        this.password = password;

        this.originaUtente()
    }

    //Il metodo "originaUtente" contiene tutte le indicazioni, raggruppate anch'esse in metodi, per costruire la struttura dell'accordion del singolo utente e assegnare i contenuti.

    originaUtente(){
        this.clonatore()
        this.attributeHeader()
        this.attributeButton()
        this.attributeCollapse()
        this.generaBody()
    }



//Il metodo "clonatore" cloniamo il contenuto interno dell'accordion (quello in d-none, o mondo delle idee), attribuiamo un id univoco e lo appendiamo all'interno del contenitore esterno, che è visibile.
    clonatore() {
        let extContainer = document.querySelector("#oneUser")
        let intContainer = document.querySelector("#oneUser .accordion-item")
        let clone = intContainer.cloneNode(true)
        clone.id = "utente-" + this.id
        extContainer.append(clone)
    }

    attributeHeader() {

        let headerClone = document.querySelector("#utente-" + this.id + " .accordion-header")
        headerClone.id = this.id + "-header" 
    }

    attributeButton() {

        let button = document.querySelector("#utente-" + this.id + " .accordion-header button")
        button.textContent = `${this.firstName} ${this.lastName}`
        button.setAttribute("data-bs-target", "#collapse-user-" + this.id)
    }

    attributeCollapse() {
        let collapse = document.querySelector("#utente-" + this.id + " #utente-IDuser")
        collapse.id = "collapse-user-" + this.id
        collapse.setAttribute("data-labelledby", "utente-" + this.id)
    }

    generaBody() {
        let bodyAccordion = document.querySelector("#collapse-user-" + this.id + " .accordion-body")
        for (let prop in this) {
            if (prop != "id" && prop != "password" && prop != "email" && prop != "tel") {
                let p = document.createElement("p")
                let span = document.createElement("span")
                span.textContent = prop + ": "
                span.className = "text-primary"
                p.textContent = this[prop]
                p.prepend(span)
                bodyAccordion.append(p)

            }else if(prop == "email"){

                let a = document.createElement("a")
                let span = document.createElement("span")
                span.textContent = prop + ": "
                a.classList.add("text-black","d-block", "mb-3")
                span.className = "text-primary"
                a.textContent = this[prop]
                a.href = 'mailto:'+this.email
                a.prepend(span)
                bodyAccordion.append(a)

            }else if(prop == "tel"){

                let a = document.createElement("a")
                let span = document.createElement("span")
                span.textContent = prop + ": "
                a.classList.add("text-black","d-block", "mb-3")
                span.className = "text-primary"
                a.textContent = this[prop]
                a.href = 'tel:'+this.email
                a.prepend(span)
                bodyAccordion.append(a)

            }
            
        }
        let bottoneUpdate = document.createElement("a")
        bottoneUpdate.textContent = "Update"
        bottoneUpdate.className = "btn btn-warning"

        let bottoneDelete = document.createElement("a")
        bottoneDelete.textContent = "Delete"
        bottoneDelete.className = "btn btn-danger ms-2"

        let accDelete = document.querySelector("#utente-" + this.id)

        let apiUsers = "http://localhost:3000/users"
        let loggedID = sessionStorage.getItem('user logged in') ? JSON.parse(sessionStorage.getItem('user logged in')).id : null;

        bottoneDelete.addEventListener("click", () => {
            eliminaUtente(this.id, accDelete, apiUsers, loggedID)
        })
        bottoneUpdate.addEventListener("click", () => {
            modificaUtente(this.id, loggedID)
        })

        bodyAccordion.append(bottoneUpdate, bottoneDelete)

    }

}



