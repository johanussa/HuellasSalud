export const productos = [{
    image: "../../assets/Huellas&Salud_1.png",
    name: "Dog chow",
    price: 22500,
    category: "Comida",
    brand: "Dog chow"
},
{
    image: "../../assets/Huellas&Salud_1.png",
    name: "Lazo",
    price: 1200,
    category: "Para pasear",
    brand: "Animal factor"
}];

export const carrito = [{
    image: "../../assets/Huellas&Salud_1.png",
    name: "Dog chow",
    price: 22500,
    amount: 2
},
{
    image: "../../assets/Huellas&Salud_1.png",
    name: "Lazo para perro",
    price: 1200,
    amount: 1
}];

export const categorias = [{
    nombre: "Comida"
},
{
    nombre: "Cuidado e higiene"
}];

export const marcas = [{
    nombre: "Bravecto"
},
{
    nombre: "Chunky"
}]

export const productosAdmin = [
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
    }
]