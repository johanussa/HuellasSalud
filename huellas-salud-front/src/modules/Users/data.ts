import { User } from "../../services/typesHS";

export const userFieldsTable = [
    "#",
    "Nombre",
    "Tipo Doc.",
    "N° Doc.",
    "Rol",
    "Teléfono",
    "Dirección",
    "Correo",
    "Estado",
    "Acciones"
];

export const users: User[] = [
    {
        id: 1,
        name: "Dr. Juan Pérez",
        documentType: "CC.",
        documentNumber: 12345678,
        role: "Veterinario",
        phone: 912345678,
        address: "Calle 123 #45-67",
        email: "juanp@vet.com",
        status: "Activo"
    },
    {
        id: 2,
        name: "Dra. Ana Maria",
        documentType: "CC.",
        documentNumber: 23456879,
        role: "Veterinario",
        phone: 3214567890,
        address: "Calle 321 #76-18",
        email: "anaMaria@vet.com",
        status: "Inactivo"
    }
];

export const fieldsFormUser = [
    {
        label: "Nombre",
        type: "text",
        id: "nombre",
        placeholder: "Nombre usuario"
    },
    {
        label: "Apellido",
        type: "text",
        id: "apellido",
        placeholder: "Apellido usuario"
    },
    {
        label: "Tipo documento",
        type: "text",
        id: "tipoDocumento",
        placeholder: "Tipo de documento"
    },
    {
        label: "Número documento",
        type: "number",
        id: "categoria",
        placeholder: "Número de documento"
    },
    {
        label: "Correo",
        type: "email",
        id: "Correo",
        placeholder: "Correo usuario"
    },
    {
        label: "Teléfono",
        type: "text",
        id: "Telefono",
        placeholder: "Teléfono usuario",
    },
    {
        label: "Dirección",
        type: "text",
        id: "direccion",
        placeholder: "Dirección usuario"
    },
    {
        label: "Contraseña",
        type: "textarea",
        id: "password",
        placeholder: "Contraseña usuario"
    }
];