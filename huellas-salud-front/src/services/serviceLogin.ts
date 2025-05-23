import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FormState, InputErrors, LoginRequest } from "./typesHS";
import { toast } from "react-toastify";
import axios from "axios";

const MIN_CREDENTIAL_LENGTH: number = 8;
const DEFAULT_ERROR_MSG: string = "ㅤ";

export const useLoginService = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [viewPass, setViewPass] = useState<boolean>(false);
    const [validData, setValidData] = useState<boolean>(true);
    const [showEyePass, setShowEyePass] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>(DEFAULT_ERROR_MSG);
    const [formState, setFormState] = useState<FormState>({ inputEmailOrDoc: "", inputPassword: "" });
    const [inputErrors, setInputErrors] = useState<InputErrors>({ emailOrDoc: false, password: false });

    const emailOrDocRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { id, value } = event.target;

        setFormState((prevState) => ({ ...prevState, [id]: value }));

        if (id === "inputPassword") {
            setShowEyePass(value.trim().length > 0);
            setInputErrors((prev) => ({ ...prev, password: false }));
        } else if (id === "inputEmailOrDoc") {
            setInputErrors((prev) => ({ ...prev, emailOrDoc: false }));
        }
    };

    const handleViewPassword = () => setViewPass(prev => !prev);

    const validateCredentials = (): boolean => {

        const newErrors: InputErrors = { emailOrDoc: false, password: false };
        const { inputPassword, inputEmailOrDoc } = formState;
        let isValid = true;

        if (inputEmailOrDoc.length < MIN_CREDENTIAL_LENGTH) {
            setErrorMsg("El correo o documento deben tener mínimo 8 caracteres");
            toast.warn("Los datos de correo o número de documento son incorrectos");
            newErrors.emailOrDoc = true;
            isValid = false;
            setTimeout(() => emailOrDocRef.current?.focus(), 0);
        } else if (inputPassword.length < MIN_CREDENTIAL_LENGTH) {
            setErrorMsg("La contraseña debe tener mínimo 8 caracteres");
            toast.warn("La contraseña ingresada es incorrecta");
            newErrors.password = true;
            isValid = false;
            setTimeout(() => passwordRef.current?.focus(), 0);
        }

        if (isValid) setErrorMsg(DEFAULT_ERROR_MSG);

        setValidData(isValid);
        setInputErrors(newErrors);
        return isValid;
    }

    const performLogin = async () => {
        try {
            toast.info("Enviando datos... ⏳");

            const loginBody: LoginRequest = {
                data: {
                    emailOrDoc: formState.inputEmailOrDoc,
                    password: formState.inputPassword
                }
            }

            const response = await axios.post('http://localhost:8089/internal/user/login', loginBody, {
                headers: { "Content-type": "application/json" }
            });

            console.log("Response: " + response.data?.data);
            toast.success(`¡Inicio de sesión exitoso! 🎉. Bienvenido Fulanito`); // Cambiar por nombre de usuario

        } catch (error) {
            setValidData(false);
            setErrorMsg("Error en los datos suministrados");

            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.title
                    ? `${error.response.data.title}. ${error.response.data.detail || ''}`
                    : error.message || 'Error en la comunicación con el servidor';

                console.error("Error en la petición:", error.response?.data || error);
                toast.error(`${errorMessage} ❌`);
                return;
            }

            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al iniciar sesión';

            console.error("Error inesperado:", error);
            toast.error(`${errorMessage} ❌`);
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!validateCredentials()) {
            setLoading(false);
            return;
        }

        try {
            await performLogin();
        } catch (error) {
            console.error("Error en la petición: ", error);
        } finally { setLoading(false); }
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
        loading,
        inputErrors,
        emailOrDocRef,
        passwordRef
    };
};
