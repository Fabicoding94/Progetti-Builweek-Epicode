let option = {
    method: "DELETE",
    headers: {
        "content-type": "application/json"
    }
}



function eliminaUtente(id, elemento, api, loggedID) {
    if (id == loggedID) {
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
                fetch(api + "/" + id, option)
                    .then(response => response.json())
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {

                            elemento.remove()
                            sessionStorage.removeItem('user logged in')
                            window.location.reload();
                        })

                    })

            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Sorry but you cant!',
            text: 'You can Update or Delete only your profile',
            showConfirmButton: true
        })
    }

}

function eliminaShop(shopOwnerId, elemento, api, loggedID) {
    if(shopOwnerId == loggedID){
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
                fetch(api + "/" + id, option)
                    .then(response => response.json())
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
    
                            elemento.remove()
                            sessionStorage.removeItem('user logged in')
                            window.location.reload();
                        })
    
                    })
    
            }
        })

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Sorry but you cant!',
            text: 'You can Delete only your Shops',
            showConfirmButton: true
        })
    }
}



