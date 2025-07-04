import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreateUserModalProps, MediaFile, User, UserData } from "../../../services/typesHS";
import axiosInstance from "../../../context/axiosInstance";
import axios from "axios";

export const useUserRegister = ({ setModalCreate, setUsersData }: CreateUserModalProps) => {

    const fileInput = useRef<HTMLInputElement>(null);

    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<string | undefined>();
    const [fileName, setFileName] = useState<string>("Cargar imagen de perfil");

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

        const payload = { data: formattedUser };

        toast.info(`Creando registro del usuario ${formattedUser.lastName.toUpperCase()}... ⏳`, { autoClose: 1200 });

        const file = fileInput.current?.files?.[0];
        const { data: createdUser } = await axiosInstance.post<UserData>("user/register", payload);

        if (file && createdUser?.data?.documentNumber) {

            const formData = new FormData();
            formData.append("file", file);

            try {
                const { data: mediaFile } = await axiosInstance.post<MediaFile>(
                    `/avatar-user/USER/${createdUser.data.documentNumber}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                createdUser.data.mediaFile = mediaFile;
            } catch (err) {
                console.error("Error subiendo imagen de perfil:", err);
                toast.error("Usuario creado, pero falló el envío de imagen");
            }
        }

        setUsersData && setUsersData(prev => [...(prev ?? []), createdUser]);
        return createdUser;
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
        console.error("Error en registro: ", error);
        toast.error(`${errorMessage} ❌`);
    }

    const onSubmit = async (user: User) => {

        setLoading(true);

        try {
            await createUser(user);
            toast.success("¡Usuario registrado con éxito! 🎉");
            setErrorMsg("");
            reset();
            setModalCreate && setModalCreate(false);
        } catch (error) { handleError(error); }
        finally { setLoading(false); }
    };

    const handleChangeImg = (event: ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if (!file) return;

        const maxSize = 4 * 1024 * 1024;
        const validTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!validTypes.includes(file.type)) {
            toast.info('Sólo se permiten imágenes en formato JPG, PNG o WEBP');
            return;
        }

        if (file.size > maxSize) {
            toast.error('La imagen no debe pesar más de 4 MB');
            return;
        }

        setPreviewImg(URL.createObjectURL(file));
        setFileName(file.name);
    }

    return {
        errorMsg,
        handleCreateUserSubmit: onSubmit,
        loading,
        register,
        errors,
        handleSubmit,
        fileName,
        fileInput,
        previewImg,
        handleChangeImg
    };
}
