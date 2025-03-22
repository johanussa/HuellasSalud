export interface FormRegister {
    name: string;
    lastName: string;
    documentType: DocumentType;
    documentNumber: number;
    email: string;
    phone: string;
    address: string;
    password: string;
}

export interface FormLogin {
    inputEmailOrDoc: string;
    inputPassword: string;
}

export enum DocumentType {
    CEDULA_DE_CIUDADANIA,
    CEDULA_DE_EXTRANJERIA,
    PERMISO_ESPECIAL_DE_PERMANENCIA,
    PERMISO_DE_PROTECCION_TEMPORAL,
    PASAPORTE,
    TARJETA_DE_IDENTIDAD
}