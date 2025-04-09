const contenedor = document.getElementById("productos");

const productos = [
    {
        id: 1,
        imagen: "../productos/imagenes/dogchow.png",
        nombre: "Dog chow",
        precio: 22500,
        unidades: 18,
        proveedor: "Dog chow",
        descripcion: "Alimento premium para perros con proteínas de alta calidad, fibras naturales y prebióticos para una digestión saludable",
        unidadMedida: "Libras",
        caducidad: "2026-02-26",
        codigoBarras: 7501000123456,
        estado: true,
        categoria: "Comida"
    },
    {
        id: 2,
        imagen: "../productos/imagenes/lazo.png",
        nombre: "Lazo para perro",
        precio: 1200,
        unidades: 5,
        proveedor: "Animal Factor",
        descripcion: "Lazo resistente y ajustable para pasear a tu perro con comodidad y seguridad. Fabricado con materiales duraderos y un diseño ergonómico.",
        unidadMedida: "Unidad",
        caducidad: "No aplica",
        codigoBarras: 7501000234567,
        estado: true,
        categoria: "Para pasear"
    },
    {
        id: 3,
        imagen: "../productos/imagenes/nexGard.png",
        nombre: "Antipulgas NexGard",
        precio: 55000,
        unidades: 4,
        proveedor: "Laboratorio Boehringer Ingelheim",
        descripcion: "Tableta masticable saborizada para la eliminación de pulgas y garrapatas en perros. Protección efectiva durante 30 días.",
        unidadMedida: "Unidad",
        caducidad: "12/02/2026",
        codigoBarras: 7501000345678,
        estado: true,
        categoria: "Salud"
    },
    {
        id: 4,
        imagen: "../productos/imagenes/raton.png",
        nombre: "Raton de juguete para gatos",
        precio: 16000,
        unidades: 9,
        proveedor: "Mascotas Felices S.A.",
        descripcion: "Divertido ratón de juguete diseñado para estimular el instinto cazador de tu gato. Fabricado con materiales seguros y duraderos.",
        unidadMedida: "Unidad",
        caducidad: "No aplica",
        codigoBarras: 7501000456789,
        estado: true,
        categoria: "Juguetes"
    },
    {
        id: 5,
        imagen: "../productos/imagenes/shampoo.png",
        nombre: "Shampoo petys",
        precio: 33000,
        unidades: 12,
        proveedor: "Petys Colombia S.A.",
        descripcion: "Shampoo hipoalergénico con ingredientes naturales, ideal para la limpieza y el cuidado del pelaje de tu mascota. Deja un aroma fresco y agradable.",
        unidadMedida: "ml",
        caducidad: "10/2026",
        codigoBarras: 7501000567890,
        estado: true,
        categoria: "Cuidado e higiene"
    },
    {
        id: 6,
        imagen: "../productos/imagenes/arena.png",
        nombre: "Arena para gatos",
        precio: 24500,
        unidades: 8,
        proveedor: "Mirringo",
        descripcion: "Arena absorbente y aglomerante para gatos, con control de olores y libre de polvo. Ideal para mantener la higiene de tu mascota.",
        unidadMedida: "Libras",
        caducidad: "No aplica",
        codigoBarras: 7501000678901,
        estado: true,
        categoria: "Arena, areneras y accesorios"
    },
    {
        id: 7,
        imagen: "../productos/imagenes/catchow.png",
        nombre: "Cat chow",
        precio: 12000,
        unidades: 20,
        proveedor: "Cat chow",
        descripcion: "Alimento balanceado para gatos con proteínas de alta calidad, vitaminas y minerales esenciales para una nutrición completa. Favorece un pelaje saludable y un sistema inmunológico fuerte.",
        unidadMedida: "Libras",
        caducidad: "06/2026",
        codigoBarras: 7501000789012,
        estado: true,
        categoria: "Comida"
    },
    {
        id: 8,
        imagen: "../productos/imagenes/collar.png",
        nombre: "Collar para perro",
        precio: 8000,
        unidades: 5,
        proveedor: "Animal Factor",
        descripcion: "Collar ajustable para perros, fabricado con materiales resistentes y cómodos. Ideal para paseos seguros y con estilo.",
        unidadMedida: "Unidad",
        caducidad: "No aplica",
        codigoBarras: 8401001122334,
        estado: true,
        categoria: "Para pasear"
    }
];

const campos = [
    { 
        label: "Nombre", 
        type: "text", 
        id: "nombre", 
        placeholder: "Nombre producto" 
    },
    { 
        label: "Precio", 
        type: "number", 
        id: "precio", 
        placeholder: "Precio" 
    },
    { 
        label: "Unidades", 
        type: "number", 
        id: "unidades", 
        placeholder: "Unidades disponibles" 
    },
    { 
        label: "Categoría", 
        type: "text", 
        id: "categoria", 
        placeholder: "Categoría" 
    },
    { 
        label: "Proveedor", 
        type: "text", 
        id: "proveedor", 
        placeholder: "Proveedor" 
    },
    { 
        label: "Caducidad", 
        type: "date", 
        id: "caducidad", 
        placeholder: "Caducidad" 
    },
    { 
        label: "Estado", 
        type: "text", 
        id: "estado", 
        placeholder: "Estado" 
    },
    { 
        label: "Descripción", 
        type: "textarea", 
        id: "descripcion", 
        placeholder: "Descripción del producto" 
    }
];

function renderizarProductos(){
    contenedor.innerHTML = "";
    productos.forEach(({ id, imagen, nombre, precio, unidades, categoria }) => {
        const formatoCOP = new Intl.NumberFormat("es-CO", { 
            style: "currency", 
            currency: "COP", 
            minimumFractionDigits: 0 
        }).format(precio);

        contenedor.innerHTML += `
            <tr>
                <td><img src="${imagen}"></td>
                <td>${nombre}</td>
                <td>${formatoCOP}</td>
                <td>${unidades}</td>
                <td>${categoria}</td>
                <td>
                    <i id="editar" onclick="editarProducto(${id})" class="fa-solid fa-pencil"></i>
                    <i id="eliminar" onclick="eliminarProducto(${id})" class="fa-solid fa-trash"></i>
                </td>
            </tr>`;
    });
}

function editarProducto(id){
    const producto = productos.find(p => p.id === id);
    if (producto){
        document.querySelector(".modalEditar").style.display = "flex"
        document.querySelector(".editarProducto").style.display = "grid"
        document.querySelector(".eliminarProducto").style.display = "none";

        document.getElementById("imagenProd").src = producto.imagen
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("unidades").value = producto.unidades;
        document.getElementById("categoria").value = producto.categoria;
        document.getElementById("proveedor").value = producto.proveedor;
        document.getElementById("caducidad").value = producto.caducidad;
        document.getElementById("estado").value = producto.estado;
        document.getElementById("descripcion").value = producto.descripcion;
    }
}

let idProductoAEliminar = null;

function eliminarProducto(id) {
    idProductoAEliminar = id;
    const producto = productos.find(p => p.id === id);

    document.querySelector(".modalEditar").style.display = "flex";
    document.querySelector(".eliminarProducto").style.display = "flex";
    document.querySelector(".editarProducto").style.display = "none";
    
    if (producto) {
        document.getElementById("mensajeEliminar").innerText = `¿Seguro que quieres eliminar el producto "${producto.nombre}"?`;
    }
}

function confirmarEliminacion() {
    if (idProductoAEliminar !== null) {
        const posicion = productos.findIndex(p => p.id === idProductoAEliminar);
        if (posicion !== -1) {
            productos.splice(posicion, 1);
            console.log("Producto eliminado con ID:", idProductoAEliminar);
            renderizarProductos();
        }
    }
    cerrarModalEliminar();
}

function cerrarModalEliminar() {
    document.querySelector(".modalEditar").style.display = "none";
    idProductoAEliminar = null;
}

document.getElementById("btnConfirmarEliminar").addEventListener("click", confirmarEliminacion);

document.addEventListener("DOMContentLoaded", function() {
    renderizarProductos();
    cargarCamposEditar();
    cargarCamposAgregar();
});

function cargarCamposEditar() {
    const contenedor = document.querySelector(".informacion");
    contenedor.innerHTML = ""; // Limpiar antes de agregar

    campos.forEach(campo => {
        const div = document.createElement("div");
        div.classList.add("datos");

        const label = document.createElement("label");
        label.setAttribute("for", campo.id);
        label.textContent = campo.label;

        let input;
        if (campo.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.setAttribute("type", campo.type);
        }
        
        input.setAttribute("id", campo.id);
        input.setAttribute("placeholder", campo.placeholder);

        div.appendChild(label);
        div.appendChild(input);
        contenedor.appendChild(div);
    });
}

function cargarCamposAgregar() {
    const contenedor = document.querySelector(".informacionAgregar");
    contenedor.innerHTML = ""; // Limpiar antes de agregar

    campos.forEach(campo => {
        const div = document.createElement("div");
        div.classList.add("datos");

        const label = document.createElement("label");
        label.setAttribute("for", campo.id);
        label.textContent = campo.label;

        let input;
        if (campo.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.setAttribute("type", campo.type);
        }
        
        input.setAttribute("id", campo.id);
        input.setAttribute("placeholder", campo.placeholder);

        div.appendChild(label);
        div.appendChild(input);
        contenedor.appendChild(div);
    });
}

function cerrarModal() {
    document.querySelector(".modalEditar").style.display = "none";
    document.querySelector(".editarProducto").style.display = "none";
    document.querySelector(".agregarProducto").style.display = "none";
}

function agregarProducto(){
    document.querySelector(".modalEditar").style.display = "flex";
    document.querySelector(".agregarProducto").style.display = "grid";
    cargarCamposAgregar();
}



