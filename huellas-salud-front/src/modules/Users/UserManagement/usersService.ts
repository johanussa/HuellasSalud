import { toast } from "react-toastify";
import { GetUserData } from "../../../services/typesHS";
import axios from "axios";
import { useState } from "react";

const PATH_BASE = 'http://localhost:8089/internal/user';

export const useGetUsers = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = async () => {

        const { data } = await axios.get<GetUserData[]>(`${PATH_BASE}/list-users`, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        });

        return data;
    }

    const handleError = (error: unknown) => {

        let errorMessage = "Error desconocido al consultar los usuarios";

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.title
                ? `${error.response.data.title}. ${error.response.data.detail || ''}`
                : error.message || 'Error en la comunicación con el servidor';
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error("Error en la consulta: ", error);
        toast.error(`${errorMessage} ❌`);
    }

    const handleGetUsers = async () => {

        setLoading(true);
        toast.info("Cargando usuarios... ⌛", { autoClose: 1200 });

        try {
            const users: GetUserData[] = await getUsers();
            toast.success("¡Usuarios cargados con éxito! 🎉");
            return users;
        } catch (error) { handleError(error); }
        finally { setLoading(false); }
    }

    return { handleGetUsers, loading };
}