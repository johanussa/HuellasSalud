import { CategoryOption, ListCategoriesObj } from "../../services/typesHS";
import prdPopular from "../../assets/Comida_Gato.webp";

export const listDogCategories: ListCategoriesObj[] = [
    { name: "Comida", img: "fa-solid fa-bowl-food" },
    { name: "Salud", img: "fa-solid fa-suitcase-medical" },
    { name: "Hogar Perros", img: "fa-solid fa-house-chimney" },
    { name: "Cuidado e Higiene", img: "fa-solid fa-scissors" },
    { name: "Accesorios", img: "fa-solid fa-bone" },
    { name: "Limpieza", img: "fa-solid fa-spray-can-sparkles" },
    { name: "Juguetes", img: "fa-solid fa-baseball" },
];

export const listCatCategories: ListCategoriesObj[] = [
    { name: "Comida", img: "fa-solid fa-bowl-food" },
    { name: "Salud", img: "fa-solid fa-suitcase-medical" },
    { name: "Gimnasios", img: "fa-solid fa-dumbbell" },
    { name: "Arena y Areneras", img: "fa-hourglass-half" },
    { name: "Accesorios", img: "fa-solid fa-bone" },
    { name: "Cuidado e Higiene", img: "fa-solid fa-spray-can-sparkles" },
    { name: "Juguetes", img: "fa-solid fa-baseball" },
];

export const dogCategoryOptions: CategoryOption[] = [
    {
        name: "Comida",
        options: [
            "Concentrados",
            "Alimento humedo",
            "Alimento medicado",
            "Snacks y galletas",
            "Huesos"
        ],
    },
    {
        name: "Salud",
        options: [
            "Medicamentos",
            "Suplementos",
            "Vitaminas",
            "Antipulgas y garrapatas",
            "Desparasitantes",
        ],
    },
    {
        name: "Hogar Perros",
        options: [
            "Camas y mantas",
            "Colchonetas",
            "Casas y Guacales",
            "Comederos y Bebederos",
            "Cercas y divisores",
        ],
    },
    {
        name: "Cuidado e Higiene",
        options: [
            "Shampoos y Jabones",
            "Pañitos y Tapetes",
            "Cuidado de piel",
            "Colonias",
            "Cepillos y Peines",
        ],
    },
    {
        name: "Accesorios",
        options: [
            "Correas y Placas",
            "Arneses y Pecheras",
            "Collares",
            "Bozales",
            "Protectores",
        ],
    },
    {
        name: "Limpieza",
        options: [
            "Desinfectantes",
            "Ambientadores",
            "Shampoo y Jabones",
            "Bolsas y Residuos",
            "Cuidado oral",
        ],
    },
    {
        name: "Juguetes",
        options: [
            "Pelotas",
            "Huesos",
            "Con cuerda",
            "Mordedores",
            "Frisbees",
        ],
    },
    {
        name: "Farmacia",
        options: [
            "Desparasitantes",
            "Suplementos y Vitaminas",
            "Analgésicos",
            "Antibióticos",
            "Digestivos",
        ],
    }
];

export const popularDogBreeds: ListCategoriesObj[] = [
    { name: "Royal Canin", img: prdPopular },
    { name: "Purina", img: prdPopular },
    { name: "Pedigree", img: prdPopular },
    { name: "Whiskas", img: prdPopular },
    { name: "Hills", img: prdPopular },
    { name: "Proplan", img: prdPopular },
    { name: "Nutra Nuggets", img: prdPopular },
    { name: "Taste of the Wild", img: prdPopular }
];