



export class Utente {
    constructor(id, username, firstName, lastName, gender, email, tel) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
        this.tel = tel;

        this.mostraUtente()
    }

    mostraUtente() {
        this.clonatore()
        this.cambiaHeader()
        this.cambiaButton()
        this.cambiaCollapse()
        this.generaBody()
    }

    clonatore() {
        let userContainer = document.querySelector("#myUsers")
        let originale = document.querySelector(".accordion-item")
        let clone = originale.cloneNode(true)
        clone.id = "utente-" + this.username
        userContainer.append(clone)
    }

    cambiaHeader() {
        let titleClone = document.querySelector("#utente-" + this.username + " .accordion-header")
        titleClone.id = this.username + "-header"
    }

    cambiaButton() {
        let button = document.querySelector("#utente-" + this.username + " .accordion-header button")
        button.textContent = `${this.firstName} ${this.lastName}`
        button.setAttribute("data-bs-target", "#collapse-" + this.username)
    }

    cambiaCollapse() {
        let collapse = document.querySelector("#utente-" + this.username + " #utente-userID")
        collapse.id = "collapse-" + this.username
        collapse.setAttribute("data-labelledby", "utente-" + this.username)
    }
    
    generaBody() {
        let body = document.querySelector("#collapse-" + this.username + " .accordion-body")
        for (let prop in this) {
            if (prop != "id") {
                let p = document.createElement("p")
                let span = document.createElement("span")
                span.textContent = prop + ": "
                span.className = "text-primary"
                p.textContent = this[prop]
                p.prepend(span)
                body.append(p)

            }
        }
        let bottoneUpdate = document.createElement("a")
        bottoneUpdate.textContent = "Update"
        bottoneUpdate.className = "btn btn-warning"
        bottoneUpdate.href = "modifica.html?id=" + this.id
        console.log(this.id)
        let bottoneDelete = document.createElement("a")
        bottoneDelete.textContent = "Delete"
        bottoneDelete.className = "btn btn-danger ms-2"

        let accDelete = document.querySelector("#utente-" + this.username)
        bottoneDelete.addEventListener("click", () => {
            eliminaUtente(this.id, accDelete)
        })

        body.append(bottoneUpdate, bottoneDelete)

    }

}



