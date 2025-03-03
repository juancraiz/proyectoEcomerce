const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito'));//traemos productos de carrito del localStorage

const contenedorCarritoVacio = document.getElementById('carritoVacio') //idem q un querySelector (pero no al querySelectorAll)
const contenedorCarritoProductos = document.getElementById('carritoProductos')
const contenedorCarritoAcciones = document.getElementById('carritoAcciones')
const contenedorCarritoComprado = document.getElementById('carritoComprado')

//Si hay productos en carrito
if (productosEnCarrito){

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