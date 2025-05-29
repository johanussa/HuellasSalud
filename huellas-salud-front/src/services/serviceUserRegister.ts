import axios from "axios";
import { User } from "./typesHS";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const PATH_BASE = 'http://localhost:8089/internal/user';

export const useUserRegister = () => {

    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<User>({ defaultValues: { role: "CLIENTE" } });

    const formatPhoneNumber = (phoneNumber: string): string => {
        const digits = phoneNumber.replace(/\D/g, '');

        if (digits.length === 7) return `60-1-${digits}`;
        if (digits.length === 10) return `57-3-${digits.substring(1)}`;
        return `57-3-${digits.substring(1).padEnd(9, '0')}`;
    }

    const createUser = async (userData: User) => {

        const formattedUser = {
            ...userData,
            cellPhone: formatPhoneNumber(userData.cellPhone)
        }

        const payload = { data: formattedUser }

        toast.info(`Creando registro del usuario ${formattedUser.lastName.toUpperCase()}... ⏳`, { autoClose: 1200 });

        const { data } = await axios.post<User>(`${PATH_BASE}/register`, payload, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        });

        return data;
    };

    const handleError = (error: unknown) => {

        setErrorMsg("Error en servicio de creación de usuario");

        let errorMessage = "Error desconocido al crear usuario nuevo";

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.title
                ? `${error.response.data.title}. ${error.response.data.detail || ''}`
                : error.message || 'Error en la comunicación con el servidor';
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Error en registro:", error);
        toast.error(`${errorMessage} ❌`);
    }

    const onSubmit = async (user: User) => {

        setLoading(true);

        try {
            await createUser(user);
            toast.success("¡Usuario registrado con éxito! 🎉");
            setErrorMsg("");
            reset();
        } catch (error) { handleError(error); }
        finally { setLoading(false); }
    };

    return { errorMsg, handleCreateUserSubmit: onSubmit, loading, register, errors, handleSubmit };
}
