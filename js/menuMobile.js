/* En este modulo ocultaremos y mostraremos el menu segun el click en el menu Hambu */
const openMenu = document.querySelector('#openMenu');
const closeMenu = document.querySelector('#closeMenu');
const aside = document.querySelector('aside');

//Evento de boton de apertura
openMenu.addEventListener("click", () => {
    
    //le añadimos la class asideVisible para q muestre el menu si hacemos click
    aside.classList.add('asideVisible');

});

//Evento de boton de cierre
closeMenu.addEventListener("click", () => {

    //le añadimos la class asideVisible para q muestre el menu si hacemos click
    aside.classList.remove('asideVisible');

});

//si hacemos click en una de las cateogiras le quitammos el asideVisible
//me toma la variable del modulo main botonesCategorias
botonesCategorias.forEach(boton => boton.addEventListener('click',() => {
    
    aside.classList.remove('asideVisible');
}));