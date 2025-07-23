import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../context/axiosInstance";
import axios from "axios";

export const usePassRecService = () => {

    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [inputEmail, setInputEmail] = useState<string>("");
    const [validData, setValidData] = useState<boolean>(true);

    const navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setInputEmail(event.target.value);

    const validateEmail = (): boolean => {

        let isValid = true;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(inputEmail)) {
            setErrorMsg("El correo electrónico ingresado es inválido");
            toast.warn("Los datos de correo electrónico son incorrectos");
            isValid = false;
        }
        setValidData(isValid);

        return isValid;
    };

    const performPassRecovery = async () => {

        toast.info("Enviando datos... ⏳", { autoClose: 1000 });

        await axiosInstance.get(`/password-recovery/${inputEmail}`);

        toast.success(`¡Recuperación exitosa! 🎉. Se ha enviado un correo a ${inputEmail}`, { autoClose: 2000 });

        navigate("/", { replace: true });
    };

    const handlePassRecoveryError = (error: unknown) => {

        setValidData(false);
        setErrorMsg("Error en servicio de recuperación de contraseña");

        let errorMessage = "Error al enviar correo de recuperación de contraseña";

        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.title
                ? `${error.response.data.title}. ${error.response.data.detail || ''}`
                : error.message || 'Error en la comunicación con el servidor';
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Error en la petición:", error);
        toast.error(`${errorMessage} ❌`);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setLoading(true);

        if (!validateEmail()) {
            setLoading(false);
            return;
        }

        try { await performPassRecovery(); }
        catch (error) { handlePassRecoveryError(error); }
        finally { setLoading(false); }
    };

    return {
        errorMsg,
        loading,
        inputEmail,
        validData,
        handleInputChange,
        handleSubmit
    };
}