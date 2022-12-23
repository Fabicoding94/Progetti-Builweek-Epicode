let option = {
    method: "DELETE",
    headers: {
        "content-type": "application/json"
    }
}

const apiUtenti = "http://localhost:3000/users"

function eliminaUtente(id, elemento) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            fetch(apiUtenti + "/" + id, option)
                .then(response => response.json())
                .then(response => {
                    elemento.remove()
                })

        }
    })
}



/*
fetch(apiUtenti + "/" + id, option)
.then(response => response.json())
.then(response => {
    elemento.remove()
})

*/