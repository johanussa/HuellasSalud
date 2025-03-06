import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

const MIN_LENGTH: number = 9;

interface FormState {
    inputEmailOrDoc: string;
    inputPassword: string;
}

export const serviceLogin = () => {

    const [validData, setValidData] = useState(true);
    const [showEyePass, setShowEyePass] = useState(false);
    const [errorMsg, setErrorMsg] = useState("---");
    const [formState, setFormState] = useState<FormState>({ inputEmailOrDoc: "", inputPassword: "" });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [id]: value }));
        if (id === "inputPassword") setShowEyePass(value.trim().length > 0);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { inputPassword, inputEmailOrDoc } = formState;

        if (inputPassword.length < MIN_LENGTH) {
            setValidData(false);
            return setErrorMsg("La contraseña debe tener mínimo 8 caracteres");
        }
        if (inputEmailOrDoc.length < MIN_LENGTH) {
            setValidData(false);
            return setErrorMsg("El correo o el documento deben tener tener mínimo 8 caracteres");
        }
        setValidData(true);
        setErrorMsg("---");

        try {
            const response = await axios.post('http://localhost:8089/user/login', formState, {
                headers: { "Content-type": "application/json" }
            });

            console.log("Response: " + response);

        } catch (error) {

            setValidData(false);
            setErrorMsg("Error al iniciar sesión. Verifica tus datos e intenta nuevamente.");
            console.error("Error en la petición:", error);
        }
    };

    return {
        handleSubmit,
        handleInputChange,
        formState,
        showEyePass,
        validData,
        errorMsg,
    };
};
