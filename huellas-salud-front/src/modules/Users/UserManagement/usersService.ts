import { toast } from "react-toastify";
import { GetUserData, User } from "../../../services/typesHS";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import axiosInstance from "../../../context/axiosInstance";

export const useUserService = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const api = {
        getUsers: async () => {
            const { data } = await axiosInstance.get<GetUserData[]>("/user/list-users");
            return data;
        },
        updateUserStatus: async (user: User) => {
            user.active = !user.active;
            const dataUpdate = { data: { ...user, role: null } }
            await axiosInstance.put(`/user/update`, dataUpdate);
        },
        deleteUser: async (user: User) => {
            await axiosInstance.delete(`/user/delete`, {
                params: {
                    documentNumber: user.documentNumber,
                    emailUser: user.email
                }
            });
        }
    }

    const handleGetUsers = async () => {
        setLoading(true);
        toast.info("Cargando usuarios... ⌛", { autoClose: 1000 });
        try {
            const users: GetUserData[] = await api.getUsers();
            toast.success("¡Usuarios cargados con éxito! 🎉");
            return users;
        } catch (error) {
            handleError(error, "Error al consultar los usuarios");
        } finally { setLoading(false); }
    }

    const handleUpdateUser = async (user: User) => {
        setLoading(true);
        toast.info("Actualizando usuario... ⌛", { autoClose: 1000 });
        try {
            const updatedUser = await api.updateUserStatus(user);
            toast.success("¡Usuario actualizado con éxito! 🎉");
            return updatedUser;
        } catch (error) {
            handleError(error, "Error al actualizar el usuario");
        } finally { setLoading(false); }
    }

    const handleDeleteUser = async (user: User) => {
        setLoading(true);
        toast.info("Eliminando usuario... ⌛", { autoClose: 1000 });
        try {
            await api.deleteUser(user);
            toast.success("¡Usuario eliminado con éxito! 🎉");
            return user.documentNumber;
        } catch (error) {
            handleError(error, "Error al eliminar el usuario");
        } finally { setLoading(false); }
    }

    const confirmUpdate = async (user: User) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: `¿Deseas ${user.active ? 'desactivar' : 'activar'} al usuario ${user.name} ${user.lastName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${user.active ? 'Desactivar' : 'Activar'} usuario`,
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) handleUpdateUser(user);
    }

    const confirmDelete = async (user: User): Promise<string | undefined> => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: `¿Deseas eliminar al usuario ${user.name} ${user.lastName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Si, eliminar usuario`,
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) return handleDeleteUser(user);
    }

    return { handleGetUsers, loading, confirmUpdate, confirmDelete };
}

const handleError = (error: unknown, message: string) => {
    let errorMessage = message;

    if (axios.isAxiosError(error)) {

        const { response, message } = error;

        if (response?.data?.title) {
            const detail = response.data.detail ? `. ${response.data.detail}` : "";
            errorMessage = `${response.data.title}${detail}`;
        } else if (response?.status === 401) {
            errorMessage = "No tienes permisos para realizar esta acción";
        } else {
            errorMessage = message || "Error en la comunicación con el servidor";
        }
    } else if (error instanceof Error) errorMessage = error.message;

    toast.error(`${errorMessage} ❌`);
}