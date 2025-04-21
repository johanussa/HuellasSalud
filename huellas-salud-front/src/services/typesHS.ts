export interface ListItemNavProps {
    path: string;
    name: string;
    icon: string;
    style?: boolean;
};

export interface LoginFormProps {
    errorMsg: string;
    viewPass: boolean;
    isValidData: boolean;
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