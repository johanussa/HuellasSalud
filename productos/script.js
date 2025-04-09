const contenedor = document.getElementById("articulos");
const categoria = document.getElementById("listaCategoria");
const marca = document.getElementById("listaMarca");

const productos = [
    {
        imagen: "./imagenes/dogchow.jpg.png",
        nombre: "Dog chow",
        precio: 22500,
        categoria: "Comida",
        marca: "Dog chow"
    },
    {
        imagen: "./imagenes/lazo.png",
        nombre: "Lazo para perro",
        precio: 1200,
        categoria: "Para pasear",
        marca: "Animal factor"
    },
    {
        imagen: "./imagenes/nexGard.png",
        nombre: "Antipulgas",
        precio: 55000,
        categoria: "Salud",
        marca: "NextGard"
    },
    {
        imagen: "./imagenes/raton.png",
        nombre: "Raton de juguete para gatos",
        precio: 16000,
        categoria: "Juguetes",
        marca: "Sin Marca"
    },
    {
        imagen: "./imagenes/shampoo.png",
        nombre: "Shampoo petys",
        precio: 33000,
        categoria: "Cuidado e higiene",
        marca: "Petys"
    },
    {
        imagen: "./imagenes/arena.png",
        nombre: "Arena para gatos",
        precio: 24500,
        categoria: "Arena, areneras y accesorios",
        marca: "Mirringo"
    },
    {
        imagen: "./imagenes/catchow.png",
        nombre: "Cat chow",
        precio: 12000,
        categoria: "Comida",
        marca: "Cat chow"
    },
    {
        imagen: "./imagenes/collar.png",
        nombre: "Collar para perro",
        precio: 8000,
        categoria: "Para pasear",
        marca: "Animal Factor"
    }
];

const categorias = [
    {
        nombre: "Comida"
    },
    {
        nombre: "Cuidado e higiene"
    },
    {
        nombre: "Limpieza y orina"
    },
    {
        nombre: "Salud"
    },
    {
        nombre: "Hogar perros"
    },
    {
        nombre: "Para pasear"
    },
    {
        nombre: "Juguetes"
    }

];

const marcas = [
    {
        nombre: "Bravecto"
    },
    {
        nombre: "Chunky"
    },
    {
        nombre: "Diamond"
    },
    {
        nombre: "Dog chow"
    }
];

function filtrarProductos() {
    const categoriasSeleccionadas = [...document.querySelectorAll("#listaCategoria input:checked")].map(el => el.value);
    const marcasSeleccionadas = [...document.querySelectorAll("#listaMarca input:checked")].map(el => el.value);

    const productosFiltrados = productos.filter(({ categoria, marca }) => 
        (!categoriasSeleccionadas.length || categoriasSeleccionadas.includes(categoria)) &&
        (!marcasSeleccionadas.length || marcasSeleccionadas.includes(marca))
    );

    document.getElementById("articulos").innerHTML = productosFiltrados.map(({ imagen, nombre, precio }) => {
        const formatoCOP = new Intl.NumberFormat("es-CO", { 
            style: "currency", 
            currency: "COP", 
            minimumFractionDigits: 0 
        }).format(precio);
    
        return `
            <div class="datos">
                <img src="${imagen}" alt="${nombre}">
                <div class="nombreProducto"><h1>${nombre}</h1></div>
                <h1 class="precio">Precio ${formatoCOP}</h1>
                <h1>Cantidad <input min="1" type="number" id="cantidad-${nombre}" value="1"></h1>
                <div><button class="boton" onclick="agregarCarrito('${nombre}', '${precio}', '${imagen}', 'cantidad-${nombre}')">Agregar al carrito</button></div>
            </div>
        `;
    }).join("");
}



document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#listaCategoria input, #listaMarca input").forEach(el => 
        el.addEventListener("change", filtrarProductos)
    );

    filtrarProductos(); // Mostrar todos los productos al inicio
});

categorias.map(({ nombre }) => {
    categoria.innerHTML += `
        <label><input type="checkbox" value="${nombre}"> ${nombre}</label>`;
}) ;

marcas.map(({ nombre }) => {
    marca.innerHTML += `
        <label><input type="checkbox" value="${nombre}"> ${nombre}</label>`;
});


function cambiarFiltro(id) {
    let content = document.getElementById(id);
    content.style.display = (content.style.display === "block") ? "none" : "block";
}

function filtrarLista(listId, searchText) {
    let list = document.getElementById(listId);
    let items = list.getElementsByTagName("label");

    for (let item of items) {
        let text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchText.toLowerCase()) ? "block" : "none";
    }
}



let carrito = [];
function agregarCarrito(nombre, precio, imagen, cantidadId) {
    let cantidadInput = document.getElementById(cantidadId);
    let cantidad = parseInt(cantidadInput.value) || 1; // Asegura que sea un número válido

    // Buscar si el producto ya está en el carrito
    let productoEnCarrito = carrito.find(item => item.nombre === nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad; // Sumar la nueva cantidad a la existente
    } else {
        carrito.push({ nombre, precio, imagen, cantidad }); // Agregar nuevo producto con la cantidad seleccionada
    }

    actualizarIconoCarrito();
    renderizarCarrito();
}


function renderizarCarrito() {
    const contenedorCarrito = document.getElementById("carrito");
    
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>🛒 El carrito está vacío</p>";
        return;
    }

    contenedorCarrito.innerHTML = carrito.map(({ nombre, precio, imagen, cantidad }) => {
        const formatoCOP = new Intl.NumberFormat("es-CO", { 
            style: "currency", 
            currency: "COP", 
            minimumFractionDigits: 0 
        }).format(precio);

        return `
            <div class="carrito-item">
                <img src="${imagen}" alt="${nombre}">
                <p>${nombre}<br> ${formatoCOP} x <input class="cantCarrito" type="number" min="1" value="${cantidad}" onchange="actualizarCantidad('${nombre}', this.value)"></p>
                <button class="botonProducto" onclick="eliminarDelCarrito('${nombre}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
    }).join("");

    actualizarTotal();
}

function actualizarCantidad(nombre, nuevaCantidad) {
    let productoEnCarrito = carrito.find(item => item.nombre === nombre);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad = parseInt(nuevaCantidad) || 1; // Asegura que sea un número válido
    }
    renderizarCarrito(); // Vuelve a dibujar el carrito con la cantidad actualizada
}


function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    renderizarCarrito();
    actualizarIconoCarrito();
    actualizarTotal();
}

function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + (parseFloat(item.precio) * item.cantidad), 0);

    // Formatear a pesos colombianos
    const formatoCOP = new Intl.NumberFormat("es-CO", { 
        style: "currency", 
        currency: "COP",
        minimumFractionDigits: 0 // Evita los decimales si no son necesarios
    });

    document.getElementById("total").innerText = `Total: ${formatoCOP.format(total)}`;
    document.querySelector(".monto").innerText = `Total: ${formatoCOP.format(total)}`;

    let botonComprar = document.getElementById("botonComprar");
    const contenedorCarrito = document.getElementById("comprar"); // Cambiado a "carrito"

    console.log("Total actual:", total);

    if (total > 0) {
        if (!botonComprar) {
            botonComprar = document.createElement("button");
            botonComprar.id = "botonComprar";
            botonComprar.innerText = "Comprar";
            botonComprar.classList.add("boton-comprar");
            botonComprar.addEventListener("click", modalPago);

            // Agregar el botón al contenedor del carrito
            contenedorCarrito.appendChild(botonComprar);
        }
    } else {
        if (botonComprar) {
            botonComprar.remove();
        }
    }
}

function actualizarIconoCarrito() {
    let cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0); // Sumar todas las cantidades
    let cantidadDiv = document.getElementById("cantidad");

    cantidadDiv.innerHTML = ""; // Limpiar contenido anterior

    if (cantidadTotal > 0) {
        cantidadDiv.style.display = "block"; // Asegurar que el número sea visible
        cantidadDiv.textContent = cantidadTotal; // Agregar el número directamente
    } else {
        cantidadDiv.style.display = "none"; // Ocultar cuando está vacío
    }
}

function abrirCarrito() {
    const iconoCarrito = document.getElementById("iconoCarrito");
    const seccionCarrito = document.querySelector(".seccionCarrito");

    // Alternar visibilidad
    iconoCarrito.style.display = "none"; // Ocultar icono
    seccionCarrito.style.display = "block"; // Mostrar carrito
}

function cerrarCarrito() {
    const iconoCarrito = document.getElementById("iconoCarrito");
    const seccionCarrito = document.querySelector(".seccionCarrito");

    // Alternar visibilidad
    iconoCarrito.style.display = "flex"; // Mostrar icono
    seccionCarrito.style.display = "none"; // Ocultar carrito
}

function modalPago() {
    document.getElementById("modalPago").style.display = "flex";
  }

  function cerrarModal() {
    document.getElementById("modalPago").style.display = "none";
  }

  document.getElementById("formPago").addEventListener("submit", function(event) {
    event.preventDefault();
    let tarjeta = document.getElementById("tarjetaComprador").value;
    let nombre = document.getElementById("nombreComprador").value;
    let fecha = document.getElementById("fechaVencimiento").value;
    let cvv = document.getElementById("codigoSeguridad").value;
    
    if (tarjeta.length < 16 || nombre.trim() === "" || fecha.length < 5 || cvv.length < 3) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }
    
    alert("Pago realizado con éxito");
    document.getElementById("tarjetaComprador").value = "";
    document.getElementById("nombreComprador").value = "";
    document.getElementById("fechaVencimiento").value = "";
    document.getElementById("codigoSeguridad").value = "";
    cerrarModal();
  });






