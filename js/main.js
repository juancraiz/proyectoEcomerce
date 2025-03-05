//Defino array de productos
let productos = []

//carga los productos del json
    fetch("./js/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            cargarProductos(productos);
        });

//llamo al id del html,para meter todos los productos q tenemos
const contenedorProductos = document.querySelector("#contenedorProductos");

//llamo al id del html, para meter todos los botones de categorias
const botonesCategorias = document.querySelectorAll(".botonCategoria");

//defino variable para cambiar titulo pcipal
const tituloPrincipal = document.getElementById("tituloPcipal");

//defino variable de botonAgregar y lo geteamos de aqui mismo(class="productoAgregar")
let botonesAgregar = document.querySelectorAll(".productoAgregar");//getElementById

//defino variable para el numero de carrito
const numCarrito = document.querySelector("#numCarrito");

function cargarProductos(productosElegidos) {
    
    //limpio el contenido anterior de productos
    contenedorProductos.innerHTML = "";

    //recorremos el array de productos
    productosElegidos.forEach((producto) => {
        
        const div = document.createElement("div"); //creo una etiqueta Contenedor div por cada producto

        div.classList.add("producto"); //creo la clase producto de tipo lista para el div

        div.innerHTML = `
            <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class='productoDetalles'>
                <h3 class='productoTitulo'>${producto.titulo}</h3>
                <p class='productoPrecio'> $ ${producto.precio} </p>
                <button class='productoAgregar' id='${producto.id}'>Agregar</button> 
            </div>`;

        //agrego el div al contenedor de Productos
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

//cargarProductos(productos); --> ya no es necesario llamarlo aqui xq lo cargamos con el fetch

/* Funcion para filtrar productos por categoria:
1.Cuando demos click en botonCategoria , el active deberia cambiar y seleccionar en blanco
sobre la Pagina de la categoria que estamos viendo la ropa
*/
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        
        //limpio los active de los botones q fueron previamente seleccionados
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        
        e.currentTarget.classList.add("active");//usar currentTarget pa q todo lo q hay dentro del boton se seleccione
        
        if (e.currentTarget.id != "todos"){

        //cambio el titulo principal segun la categoria seleccionada
        tituloPrincipal.innerText = productos.find(producto => 
            producto.categoria.id === e.currentTarget.id).categoria.nombre;

        /*Cambio los productos segun la categoria seleccionada
        rrecorremos el array de productos y filtramos comparando el id de la categoria del producto
        (del array) con el id del boton (para ello usamos e.currentTarget.id) */
        const productosElegidos = productos.filter(producto => 
            producto.categoria.id === e.currentTarget.id);

        //cargo los nuevos productos
        cargarProductos(productosElegidos);
        }
        else{ //si no hay ninguna categoria seleccionada, cargo todos los productos
            
            tituloPrincipal.innerText="Todos los productos"
            cargarProductos(productos);
        }
    })
});

/* Funcion actualizar los botones de agregar producto cada vez q actualizemos
una nueva categoria */
function actualizarBotonesAgregar(){    
    
    botonesAgregar = document.querySelectorAll(".productoAgregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click",agregarACarrito);
    })
};



// geteamos/traemos el array del L.Storage por si nos salimos del index.html y queremos acceder nuevamente a index.html
let productosEnCarrito;
let productosEnCarritoLS = JSON.parse(localStorage.getItem("productosEnCarrito"));//traigo array de productos del L.Storage

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS; //paso a productosEnCarrito lo del L.Storage
    actualizarNumCarrito();
} else {
    productosEnCarrito = [];
}

/* Funcion-evento al hacer click en Agregar:
para agregar producto al carrito,esdecir a un array del carrito */
function agregarACarrito(e){
    
    notificacionDeAgregar();

    const idBoton = e.currentTarget.id; //obtenemos el id del producto del html
    const productoAgregado = productos.find(producto => producto.id === idBoton); //buscamos el producto en el array de productos

    if (productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); //extraigo el indice del producto del arrayProductos
        productosEnCarrito[index].cantidad ++; //incremento la cantidad de ese producto(en la pos index) en el carrito

    } else {
    productoAgregado.cantidad = 1; //agrego una propiedad "cantidad" al objeto producto y lo incializo con 1
    
    productosEnCarrito.push(productoAgregado); //agregamos el producto al carrito
    }
    actualizarNumCarrito();

    //Guardo/seteo los productos del carrito en el localStorage
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
}

//Actualizamos numero de cantidad total en carrito
function actualizarNumCarrito(){
    let numeroCarrito = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);//sumamos el total de cantidades
    numCarrito.innerText = numeroCarrito; //asigno resultado al elemento numCarrito del html para q se muestre en el Front
    
};

function notificacionDeAgregar(){

    Toastify({
        text: "Producto Agregado",
        duration: 700,
        offset: {
            x: 50, //en px, move horizontal (eje x) 
            y: 15 //en px, move vertical axis (eje y)
        },
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right,#2c7255,rgb(111, 148, 46))",
            color: "#fff",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: "0.75rem", /* tamaño de letra */
        },
        onClick: function(){} // Callback after click
}).showToast();

}
