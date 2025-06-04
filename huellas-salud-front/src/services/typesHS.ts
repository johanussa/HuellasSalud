import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

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
    image?: string;
    name: string;
    lastName: string;
    documentType: 'CC' | 'CE' | 'TI' | 'NIT' | 'PASAPORTE';
    documentNumber: string;
    address: string;
    email: string;
    password: string;
    confirmPassword?: string;
    cellPhone: string;
    role: 'ADMIN' | 'VETERINARIO' | 'CLIENTE';
    active?: boolean;
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

export interface Meta {
    creationDate: string;
    ipAddress: string;
    source: string;
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

export interface GetUserData {
    data: User;
    meta: Meta;
}

export interface LoginFormProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export interface InputFieldUserRegister {
    label: string;
    type?: HTMLInputTypeAttribute;
    idInput: keyof User;
    required?: boolean;
    inputFull?: boolean;
    register: UseFormRegister<User>;
    errors: FieldErrors<User>;
}

export interface UserFiltersProps {
    searchTerm: string;
    roleFilter: string;
    statusFilter: string;
    onSearchChange: (value: string) => void;
    onRoleFilterChange: (value: string) => void;
    onStatusFilterChange: (value: string) => void;
}

export interface UserTableProps {
    users: GetUserData[] | undefined;
    setUsersData: React.Dispatch<React.SetStateAction<GetUserData[] | undefined>>;
}