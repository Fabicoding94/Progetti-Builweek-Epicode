window.onload = checkLogStatus();

const apiUtenti = "http://localhost:3000/users"

let loginBtn = document.querySelector('#btn-login')

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkLogin();
})



//click on login, check if user exists and if input matches
function checkLogin() {
    let inputUser = document.querySelector('#login-username')
    let inputPwrd = document.querySelector('#login-password')

    fetch(apiUtenti)
        .then(res => res.json())
        .then(users => {
            let findedUser = users.find(u => u.username == inputUser.value || u.email == inputUser.value)
            if(findedUser){

                if(findedUser.password == inputPwrd.value){
                    //user is found and password matches
                    Swal.fire({
                        icon: 'success',
                        title: `Your're logged in!`,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2500
                    }).then(() => {
                        sessionStorage.setItem('user logged in', JSON.stringify(findedUser));
                        checkLogStatus();
                        location.href = '../pages/index.html';
                    })
                }else{
                    //user matches bit pw is incorrect
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Incorrect password, try again!',
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true
                    }).then(inputPwrd.value = '')
    
                }
            }else{
                //no user match or empty input fields
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Something's wrong, make sure to fill the fields with the correct data`,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                }).then(() => {
                    inputUser.value = '';
                    inputPwrd.value = '';
                })
            }
        })
}


import {checkLogStatus} from '../export/functions.js'

