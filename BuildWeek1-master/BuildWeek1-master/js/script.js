
// IMG SLIDER
var swiper = new Swiper(".slide-content", {
    // slidesPerView: 3,
    spaceBetween: 10,
    //   slidesPerGroup: 3, lascio per study purposes
    centerSlide: 'true',
    fade: 'true',
    gragCursor: 'ture',
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true, 
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        },

    },
});

//NAVBAR FAKE STICKY
function plsStick(elemento){
    let getSticky = document.querySelector(elemento);
    let headerHeight = document.querySelector('#head-container').clientHeight;
    let navHeight = document.querySelector('#nav-area').clientHeight;
    let correctHeight = headerHeight - navHeight;

    if(document.body.scrollTop > correctHeight && 
        !getSticky.classList.contains('sticked')){
        getSticky.classList.add('sticked');
    }else if(document.body.scrollTop < correctHeight - 1){
        getSticky.classList.remove('sticked');
    }
}

// FADE IN ANIMATION
window.addEventListener('scroll',() =>{
    let contenuto = document.querySelectorAll('.fade');
    contenuto.forEach(function (pls) {
        let posizioneContenuto = pls.getBoundingClientRect().top;
        let posizioneSchermo = window.innerHeight;
        if ((posizioneContenuto < posizioneSchermo/0.9)) {
            pls.classList.add('active');
        };
        console.log(posizioneContenuto)
        console.log(posizioneSchermo)
    });
    
});

console.log('¸¸♬·¯·♩¸¸♪·¯·♫¸¸Never Gonna Give You Up¸¸♬·¯·♩¸¸♪·¯·♫¸¸')
console.log('¸¸♬·¯·♩¸¸♪·¯·♫¸¸Never gonna let you down¸¸♬·¯·♩¸¸♪·¯·♫¸¸')
console.log('·♩¸¸♪·¯·♫¸¸Never gonna run around and desert you¸¸♬·¯·♩¸¸♪·')



let bordo = document.querySelectorAll("li a")
bordo.forEach(function(li){
    
    li.addEventListener("click", function(e){
        e.stopPropagation();
        bordo.forEach(function(el){
            el.classList.remove("bordo")
        })
        e.target.classList.add("bordo");
    })
})


/*
let animato = document.querySelectorAll('li');
let newbordo = document.querySelectorAll(".new-bordo")

for(let i = 0; i < animato.length; i++) {
    bordo[i].classList.remove("left")
    animato[i].addEventListener('mouseover', function(e) {
        bordo[i].classList.add("left")
    })
    animato[i].addEventListener('mouseout', function(e) {
        bordo[i].classList.remove("left")
    })
    animato[i].addEventListener('click', function(e) {
        newbordo[i].classList.add("left")
    })
}



bordo[0].classList.remove("left")
window.addEventListener('scroll', function() {
    let home = document.querySelector("header").getBoundingClientRect()
    let cuoco = document.querySelector("#sect-cuoco").getBoundingClientRect()
    let blog = document.querySelector("#sect-blog").getBoundingClientRect()
    let menu = document.querySelector("#sect-menu").getBoundingClientRect()
    let subscribe = document.querySelector("#sect-subscribe").getBoundingClientRect()
    let contact = document.querySelector("#contact-us").getBoundingClientRect()

    if ((home.y <= 100) && (Math.abs(home.y) <= (home.height -10))) {
        bordo[0].classList.remove("left")
        bordo[1].classList.add("left")
    } else if((cuoco.y <= 100) && (Math.abs(cuoco.y) <= (cuoco.height -10))) {
        bordo[0].classList.add("left")
        bordo[1].classList.remove("left")
        bordo[2].classList.add("left")
    } else if ((blog.y <= 100) && (Math.abs(blog.y) <= (blog.height -10))) {
        bordo[1].classList.add("left")
        bordo[2].classList.remove("left")
        bordo[3].classList.add("left")
    } else if ((menu.y <= 100) && (Math.abs(menu.y) <= (menu.height -10))) {
        bordo[2].classList.add("left")
        bordo[3].classList.remove("left")
        bordo[4].classList.add("left")
    } else if ((subscribe.y <= 100) && (Math.abs(subscribe.y) <= (subscribe.height -10))) {
        bordo[3].classList.add("left")
        bordo[4].classList.remove("left")
        bordo[5].classList.add("left")
    } else if ((contact.y <= 100) && (Math.abs(contact.y) <= (contact.height -10))) {
        bordo[4].classList.add("left")
        bordo[5].classList.remove("left")
    }
    
    console.log(cuoco.y)
    console.log(cuoco.height)
    console.log(contact)
    console.log(contact.y <= 1, Math.abs(contact.y) <= (contact.height -1))
})
*/