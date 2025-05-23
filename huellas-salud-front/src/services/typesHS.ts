export interface ListItemNavProps extends NavLinkProps {
    path: string;
    name: string;
    icon: string;
    style?: boolean;
};

export interface PasswordFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    errorMsg: string;
    viewPass: boolean;
    validData: boolean;
    showEyePass: boolean;
    hasError: boolean;
    setViewPass: (updater: (prevState: boolean) => boolean) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hasError: boolean;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    supplier: string;
    description: string;
    expiration: Date | null;
    status: 'activo' | 'inactivo' | 'agotado';
    image: string;
    unitMeasure: 'kg' | 'g' | 'l' | 'ml' | 'unidad';
    barcode: number;
}

export interface User {
    id: string;
    name: string;
    documentType: 'CC' | 'CE' | 'TI' | 'NIT' | 'PASAPORTE';
    documentNumber: string;
    address: string;
    email: string;
    phone: string;
    role: 'admin' | 'veterinario' | 'cliente';
    status: 'activo' | 'inactivo' | 'pendiente';
}

export interface Pet {
    id: string;
    name: string;
    type: 'perro' | 'gato' | 'ave' | 'roedor' | 'reptil' | 'otro';
    breed: string;
    owner: User;
    age: number;
    weight: number;
    styrofoam: boolean;
    description: string;
    status: 'activo' | 'inactivo' | 'pendiente';
    vaccines: string[];
    surgeries: string[];
    treatments: string[];
}

export interface CategoryCard {
    name: string;
    img: string;
}

export interface CategoryGroup {
    name: string;
    options: string[];
}

export interface NavLinkProps {
    setOptionHover?: (option: string) => void;
    setShowSubMenu?: (show: boolean) => void;
}

export interface SubMenuProps {
    option: string;
    setShowSubMenu: (show: boolean) => void;
}

export interface LoginRequest {
    data: {
        emailOrDoc: string;
        password: string;
    };
}

export interface FormState {
    inputEmailOrDoc: string;
    inputPassword: string;
}

export interface InputErrors {
    emailOrDoc: boolean;
    password: boolean;
}