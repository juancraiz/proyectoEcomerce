const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito'));//traemos productos de carrito del localStorage

const contenedorCarritoVacio = document.getElementById('carritoVacio') //idem q un querySelector (pero no al querySelectorAll)
const contenedorCarritoProductos = document.getElementById('carritoProductos')
const contenedorCarritoAcciones = document.getElementById('carritoAcciones')
const contenedorCarritoComprado = document.getElementById('carritoComprado')

let botonesEliminar = document.querySelectorAll('.carritoProductoEliminar') //ponemos let xq al pcipio no se trae ningun valor.Xq no esta el html creado
let botonesVaciar = document.querySelector('.carritoAccionesVaciar')
const contenedorTotal = document.getElementById("total")  
let botonComprar = document.getElementById("carritoAccionesComprar")

//funcion para cargar productos al carrito
function cargarProductosCarrito(){
    //Si hay productos en carrito no es nulo y es mayor a 0 su tamaño
    if (productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add('disabled'); //el disabled oculta la etiqueta html de carrito vacio
        contenedorCarritoProductos.classList.remove('disabled'); //aqui se remueve el disabled, para mostrar el carritoProductos del html
        contenedorCarritoAcciones.classList.remove('disabled'); 
        contenedorCarritoComprado.classList.add('disabled'); 

        contenedorCarritoProductos.innerHTML = "";//limpiamos el contenido anterior

        productosEnCarrito.forEach(function (producto) {

            const div = document.createElement('div');
            div.classList.add('carritoProducto');
            div.innerHTML = ` 
                    
                    <img class="carritoProductoImagen" src=".${producto.imagen}" alt="${producto.titulo}">
                    <div class="carritoProductoTitulo">
                        <small>Titulo</small>
                        <h3 class="carritoProductoDato carritoProductoRopa">${producto.titulo}</h3>
                    </div>
                    <div class="carritoProductoCantidad">
                        <small>Cantidad</small>
                        <h3 class="carritoProductoDato">${producto.cantidad}</h3>
                    </div>
                    <div class="carritoProductoPrecio">
                        <small>Total</small>
                        <h3 class="carritoProductoDato">$${producto.precio}</h3>
                    </div>
                    <div class="carritoProductoSubtotal">
                        <small>Subtotal</small>
                        <h3 class="carritoProductoDato"> $${producto.precio * producto.cantidad} </h3>
                    </div>
                    <button class="carritoProductoEliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>

            `;
            contenedorCarritoProductos.appendChild(div);
        });
                //Si carrito ta vacio
    } else {                                    
        contenedorCarritoVacio.classList.remove('disabled'); //aqui se remueve el disabled, para mostrar el carrito vacio del html
        contenedorCarritoProductos.classList.add('disabled'); //el disabled oculta la etiqueta html de carritoProductos del html
        contenedorCarritoAcciones.classList.add('disabled'); 
        contenedorCarritoComprado.classList.add('disabled');
    } 

    actualizarBotonesEliminar(); //actualizamos data
    actualizarTotal(); 
}

cargarProductosCarrito();

/* Funcion actualizar los botones de agregar producto cada vez q actualizemos
una nueva categoria */
function actualizarBotonesAgregar(){    
    
    botonesAgregar = document.querySelectorAll(".productoAgregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click",agregarACarrito);
    })
};

/* Funcion actualizar los botones de eliminar producto de carrito */
function actualizarBotonesEliminar(){    
    
    botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click",eliminarDeCarrito);
    })
};

/* Funcion-evento al hacer click en Eliminar:*/
function eliminarDeCarrito(e){
    
    const idBoton = e.currentTarget.id; //obtenemos el id del producto del html
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); //extraigo el indice del producto del arrayProductos
    
    productosEnCarrito.splice(index, 1); //elimino el producto del array en dicho indice
    cargarProductosCarrito();

    //Guardo/seteo los productos del carrito en el localStorage
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
}


//FUNCION vaciar carrito
botonesVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    
    productosEnCarrito.length = 0; //vaciamos el array de productos en carrito
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));//Guardo productos del carrito en LS
    cargarProductosCarrito();
}

//FUNCION actualizar total 
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((tot,producto) =>  tot + (producto.precio * producto.cantidad),0)
    total.innerHTML = `$${totalCalculado}`;
}

//FUNCION PARA COMPRAR 
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){

    enviarCompraPorWsp();

    productosEnCarrito.length = 0;//vaciamos
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add('disabled'); 
    contenedorCarritoProductos.classList.add('disabled'); 
    contenedorCarritoAcciones.classList.add('disabled'); 
    contenedorCarritoComprado.classList.remove('disabled'); //que aparezca q fue comprado

}

function enviarCompraPorWsp(){
    // Creo mensaje con la lista de productos
    let mensaje = "¡Hola! Estoy interesado en comprar los siguientes productos: \n";

    productosEnCarrito.forEach(producto => {
        mensaje += `Nombre: ${producto.titulo} - Cantidad: ${producto.cantidad} \n`;
    });

    mensaje += `Total: $${calcularTotal()}`

    let numeroWsp = "543445415643"

    let urlWhatsApp = `https://wa.me/${numeroWsp}?text=${encodeURIComponent(mensaje)}`; // URL de Wsp con el mensaje predefinido

    window.open(urlWhatsApp, "_blank");  // Redirijo al usuario a wsp
}

function calcularTotal(){
   const totalCalcu = productosEnCarrito.reduce((tot,producto) =>  tot + (producto.precio * producto.cantidad),0) ;
    return totalCalcu;
}



/*   <div class="carritoProducto">
        <img class="carritoProductoImagen" src="../img/abrigos/01.jpg" alt="">
        <div class="carritoProductoTitulo">
            <small>Titulo</small><!-- para poner el titulo en pequeño -->
            <h3 class="carritoProductoDato carritoProductoRopa">Abrigo 01</h3>
        </div>
        <div class="carritoProductoCantidad">
            <small>Cantidad</small>
            <h3 class="carritoProductoDato">1</h3>
        </div>
        <div class="carritoProductoPrecio">
            <small>Precio</small>
            <h3 class="carritoProductoDato">$1000</h3>
        </div>
        <div class="carritoProductoSubtotal">
            <small>Subtotal</small>
            <h3 class="carritoProductoDato">$1000</h3>
        </div>
        <button class="carritoProductoEliminar"><i class="bi bi-trash-fill"></i></button>
    </div> 
                     */