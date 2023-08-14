const mensajeCarritoVacio = document.createElement("div");
mensajeCarritoVacio.id = "carritoVacio";
mensajeCarritoVacio.className = "carrito-vacio";
mensajeCarritoVacio.innerText = "Tu carrito está vacío";



const pintarCarrito = () => {
    paginaCarrito.innerHTML = "";
    paginaCarrito.style.display = "flex";

    const paginaBoton = document.createElement("h1");
    paginaBoton.innerText = "cerrar";
    paginaBoton.className = "pagina-boton";

    paginaCarrito.append(paginaBoton);

    paginaBoton.addEventListener("click", () => {
        paginaCarrito.style.display = "none";
    });

    const paginaHeader = document.createElement("div");
    paginaHeader.className = "pagina-header";
    paginaHeader.innerHTML = `<h1 class="pagina-header-titulo">${carrito.length > 0 ? "Tus productos" : "Tu carrito está vacío"}</h1>`;
    paginaCarrito.append(paginaHeader);

    if (carrito.length === 0) {
        // Si el carrito está vacío, muestra el mensaje de "carrito vacío"
        paginaHeader.innerHTML = ""; // Borra el contenido del título si el carrito está vacío
        paginaCarrito.append(mensajeCarritoVacio);
    } else {
        // Si hay productos en el carrito, oculta el mensaje de "carrito vacío" y muestra la lista de productos
        mensajeCarritoVacio.style.display = "none";
  
    carrito.forEach((contenido) => {
        let carritoContent = document.createElement ("div")
        carritoContent.className = "carrito-content"
        carritoContent.innerHTML = `
        <img src= "${contenido.img}">
        <h3> ${contenido.nombre}</h3>
        <p> ${contenido.precio} $</p>
        <p> Cantidad: ${contenido.cantidad}</p>
        <p> Total: ${contenido.cantidad * contenido.precio}</p>
        <span class="eliminar-producto">Eliminar<span>
        `;

        paginaCarrito.append(carritoContent);


        let eliminar = carritoContent.querySelector(".eliminar-producto");
        eliminar.addEventListener("click", ()=>{
            eliminarProducto(contenido.id);
        });

} );
  }  ;


    const total = carrito.reduce((acc, el)=> acc + el.precio * el.cantidad,0) ;
    const totalCompra = document.createElement ("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `total a pagar: ${total} $`;
    paginaCarrito.append(totalCompra);

 // Agregar botón "Comprar" mostrar mensaje de agradecimiento
 const botonComprar = document.createElement("button");
 botonComprar.innerText = "Comprar";
 botonComprar.className = "boton-comprar";
 paginaCarrito.append(botonComprar);

 botonComprar.addEventListener("click", () => {
   if (carrito.length > 0) {
     // Si hay productos en el carrito, muestra el mensaje agradecimiento
     const mensajeCompra = document.createElement("div");
     mensajeCompra.className = "mensaje-compra";
     mensajeCompra.innerText = "¡Gracias por su compra!";
     paginaCarrito.append(mensajeCompra);

     // Vaciar el carrito después de la compra
     carrito = [];
     carritoDisplay();
     guardarLocal();

     // Ocultar el mensaje de agradecimiento después de 3.2 segundos
     setTimeout(() => {
       mensajeCompra.style.display = "none";
       pintarCarrito();
       mostrarMensajeCarritoVacio();
     }, 3200);
   }
 });
}
 
    
//});





const eliminarProducto = (id) => {
   const foundId = carrito.find ((element) => element.id === id);
   carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
   });
  
  
  
   carritoDisplay();
   guardarLocal();
   pintarCarrito();
   mostrarMensajeCarritoVacio();
}

verCarrito.addEventListener("click", pintarCarrito);

const carritoDisplay = () => {
    cantidadCarrito.style.display =  "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoDisplay();


const mostrarMensajeCarritoVacio = () => {
    if (carrito.length === 0) {
      mensajeCarritoVacio.style.display = "block";
    } else {
      mensajeCarritoVacio.style.display = "none";
    }
  };