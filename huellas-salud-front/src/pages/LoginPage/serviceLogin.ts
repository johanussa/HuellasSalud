import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const MIN_LENGTH: number = 9;

interface FormState {
    inputEmailOrDoc: string;
    inputPassword: string;
}

export const serviceLogin = () => {

    const [loading, setLoading] = useState(false);
    const [viewPass, setViewPass] = useState(false);
    const [validData, setValidData] = useState(true);
    const [showEyePass, setShowEyePass] = useState(false);
    const [errorMsg, setErrorMsg] = useState("---");
    const [formState, setFormState] = useState<FormState>({ inputEmailOrDoc: "", inputPassword: "" });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [id]: value }));
        if (id === "inputPassword") setShowEyePass(value.trim().length > 0);
    };

    const handleViewPassword = () => setViewPass(!viewPass);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        const { inputPassword, inputEmailOrDoc } = formState;

        if (inputPassword.length < MIN_LENGTH) {
            setValidData(false);
            setLoading(false);
            toast.warn("La contraseña ingresada es incorrecta");
            return setErrorMsg("La contraseña debe tener mínimo 8 caracteres");
        }
        if (inputEmailOrDoc.length < MIN_LENGTH) {
            setValidData(false);
            setLoading(false);
            toast.warn("Los datos de correo o número de documento son incorrectos");
            return setErrorMsg("El correo o el documento deben tener tener mínimo 8 caracteres");
        }
        setValidData(true);
        setErrorMsg("---");

        try {
            toast.info("Enviando datos... ⏳");

            const response = await axios.post('http://localhost:8089/user/login', formState, {
                headers: { "Content-type": "application/json" }
            });

            console.log("Response: " + response);
            toast.success(`¡Inicio de sesión exitoso! 🎉. Bienvenido Fulanito`); // Cambiar por nombre de usuario
        } catch (error) {

            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : "Error desconocido";

            setValidData(false);
            setErrorMsg("Error en los datos suministrados");

            console.error("Error en la petición:", error);
            toast.error(`Error al iniciar sesión ❌. ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSubmit,
        handleInputChange,
        handleViewPassword,
        formState,
        showEyePass,
        validData,
        errorMsg,
        viewPass,
        loading
    };
};
