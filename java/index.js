

const shopContent = document.getElementById ("contenedorProductos");
const verCarrito = document.getElementById ("verCarrito");
const paginaCarrito = document.getElementById ("paginaCarrito");
const cantidadCarrito = document.getElementById ("cantidadCarrito");
    
let carrito = JSON.parse(localStorage.getItem("carrito")) ||  [];
    
function mostrarMensajeProductoAgregado() {
    const mensajeProductoAgregado = document.getElementById("mensajeProductoAgregado");
    mensajeProductoAgregado.textContent = "Producto agregado al carrito";
    mensajeProductoAgregado.style.display = "block";
  
    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      mensajeProductoAgregado.style.display = "none";
    }, 2000);
  }


      function cargarProductos() {
        const contenedorProductos = document.getElementById("contenedorProductos");
      
        // Limpiar el contenedor antes de mostrar los productos
        contenedorProductos.innerHTML = "";

      productos.forEach((contenido) => {
        let content = document.createElement("div");
        content.innerHTML = `
          <img src="${contenido.imagen}">
          <div class="informacion">
            <h3>${contenido.nombre}</h3>
            <p>${contenido.precio} $</p>
          </div>
        `;
        contenedorProductos.append(content);
  
        let comprar = document.createElement("button");
        comprar.innerText = "Agregar al carrito";
        content.append(comprar);
        comprar.className = "comprar";
  
        comprar.addEventListener("click", () => {
          const repeat = carrito.some((repeatProductos) => repeatProductos.id === contenido.id);
  
          if (repeat) {
            carrito.map((prod) => {
              if (prod.id === contenido.id) {
                prod.cantidad++;
              }
            });
          } else {
            carrito.push({
              id: contenido.id,
              img: contenido.imagen,
              nombre: contenido.nombre,
              precio: contenido.precio,
              cantidad: contenido.cantidad,
            });
          }
          carritoDisplay();
          guardarLocal();
  
          // Mostrar el mensaje "Producto agregado al carrito"
          mostrarMensajeProductoAgregado();
        });
      });

    }

    

     // Función para cargar los productos utilizando fetch
function solicitarPrendas() {
    fetch(URL)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => { productos.push(...data);
       
        cargarProductos();
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error.message);
      });
  }
  
  // Llamar a la función para cargar los productos
  solicitarPrendas();
  
  
    




    //set item
    const guardarLocal = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


//mobile 

document.addEventListener("DOMContentLoaded", function() {
  const btnMenu = document.querySelector(".btn-menu");
  const btnMenuClose = document.querySelector(".btn-menu-close");
  const sidebar = document.querySelector(".sidebar");

  btnMenu.addEventListener("click", function() {
      sidebar.classList.add("sidebar-mobile");
  });

  btnMenuClose.addEventListener("click", function() {
      sidebar.classList.remove("sidebar-mobile");
  });
});