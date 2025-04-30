export interface ListItemNavProps {
    path: string;
    name: string;
    icon: string;
    style?: boolean;
    setOptionHover?: (option: string) => void;
    setShowSubMenu?: (show: boolean) => void;
};

export interface LoginFormProps {
    errorMsg: string;
    viewPass: boolean;
    changeIconEye: boolean;
    loading?: boolean;
    setViewPass: (updater: (prevState: boolean) => boolean) => void;
    setChangeIconEye: (updater: (prevState: boolean) => boolean) => void;
}

export interface Product {
    nombre: string;
    precio: number;
    unidades: number;
    categoria: string;
    proveedor: string;
    descripcion: string;
    caducidad: string;
    estado: string;
    id: number;
    imagen: string;
    unidadMedida: string;
    codigoBarras: number;
}

export interface User {
    id: number;
    name: string;
    documentType: string;
    documentNumber: number;
    address: string;
    email: string;
    phone: number;
    role: string;
    status: string;
}

export interface Pet {
    id: number;
    name: string;
    type: string;
    breed: string;
    age: number;
    weight: number;
    styrofoam: boolean;
    description: string;
    status: string;
    vaccines: string;
    surgeries: string;
    treatments: string;
}

export interface ListCategoriesObj {
    name: string;
    img: string;
}

export interface CategoryOption {
    name: string;
    options: string[];
}

export interface NavLinkProps {
    setOptionHover?: (option: string) => void;
    setShowSubMenu?: (show: boolean) => void;
}