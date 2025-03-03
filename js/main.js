// PRODUCTOS
//productos es un array ,se define como cte xq solo tendra la ropa q carguemos con sus datos.
//Defino array de productos
const productos = [
    // Abrigos
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 1000,
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 1000,
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 1000,
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 1000,
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigos/05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos",
        },
        precio: 1000,
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "Camiseta 01",
        imagen: "./img/camisetas/01.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas",
        },
        precio: 1000,
    },
    {
        id: "camiseta-02",
        titulo: "Camiseta 02",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas",
        },
        precio: 1000,
    },
    {
        id: "camiseta-03",
        titulo: "Camiseta 03",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas",
        },
        precio: 1000,
    },
    {
        id: "camiseta-04",
        titulo: "Camiseta 04",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas",
        },
        precio: 1000,
    },
    {
        id: "camiseta-05",
        titulo: "Camiseta 05",
        imagen: "./img/camisetas/05.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas",
        },
        precio: 1000,
    },
    {
        id: "camiseta-06",
        titulo: "Camiseta 06",
        imagen: "./img/camisetas/06.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas",
        },
        precio: 1000,
    },
    {
        id: "camiseta-07",
        titulo: "Camiseta 07",
        imagen: "./img/camisetas/07.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas",
        },
        precio: 1000,
    },
    {
        id: "camiseta-08",
        titulo: "Camiseta 08",
        imagen: "./img/camisetas/08.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas",
        },
        precio: 1000,
    },
    // Pantalones
    {
        id: "pantalon-01",
        titulo: "Pantalón 01",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 1000,
    },
    {
        id: "pantalon-02",
        titulo: "Pantalón 02",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 1000,
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón 03",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 1000,
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón 04",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 1000,
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón 05",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones",
        },
        precio: 1000,
    },
];

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

cargarProductos(productos);

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
const productosEnCarritoLS = JSON.parse(localStorage.getItem("productosEnCarrito"));//traigo array de productos del L.Storage

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS; //paso a productosEnCarrito lo del L.Storage
    actualizarNumCarrito();
} else {
    productosEnCarrito = [];
}

/* Funcion-evento al hacer click en Agregar:
para agregar producto al carrito,esdecir a un array del carrito */
function agregarACarrito(e){
    
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

