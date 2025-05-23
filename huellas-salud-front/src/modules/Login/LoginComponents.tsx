import styles from "./login.module.css";
import logoGoogle from "../../assets/logoGoogleG.png";
import { Link } from "react-router-dom";
import ButtonComponent from "../../components/Button/Button";
import { InputFieldProps, PasswordFieldProps } from "../../services/typesHS";
import { useLoginService } from "../../services/serviceLogin";
import { forwardRef } from "react";

export const LoginForm = () => {

    const {
        handleSubmit,
        handleInputChange,
        viewPass,
        handleViewPassword,
        showEyePass,
        validData,
        errorMsg,
        inputErrors,
        emailOrDocRef,
        passwordRef,
        loading,
    } = useLoginService();

    return (
        <form className={styles.formLogin} onSubmit={handleSubmit}>
            <InputField
                handleInputChange={handleInputChange}
                hasError={inputErrors.emailOrDoc}
                ref={emailOrDocRef}
            />
            <PasswordField
                viewPass={viewPass}
                setViewPass={handleViewPassword}
                showEyePass={showEyePass}
                errorMsg={errorMsg}
                handleInputChange={handleInputChange}
                validData={validData}
                hasError={inputErrors.password}
                ref={passwordRef}
            />
            <ButtonComponent type="submit" contain={"INGRESAR"} loading={loading} />
        </form>
    );
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ handleInputChange, hasError }, ref) => {
        return (
            <aside className={`${styles.inputContainer} ${hasError ? styles.hasError : ""}`} >
                <label htmlFor="inputEmailOrDoc" className={styles.loginLabel}>
                    Correo o número de documento
                </label>
                <input
                    id="inputEmailOrDoc"
                    onChange={handleInputChange}
                    className={`${styles.loginInput} ${hasError ? styles.errorInput : ""}`}
                    type="text"
                    required
                    ref={ref}
                />
            </aside>
        );
    }
);

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
    (
        {
            viewPass,
            setViewPass,
            showEyePass,
            errorMsg,
            handleInputChange,
            validData,
            hasError,
        },
        ref
    ) => {
        return (
            <aside
                className={`${styles.inputContainer} ${hasError ? styles.hasError : ""
                    }`}
            >
                <label htmlFor="inputPassword" className={styles.loginLabel}>
                    Contraseña
                </label>
                <input
                    id="inputPassword"
                    onChange={handleInputChange}
                    className={`${styles.loginInput} ${styles.inputPass} ${hasError ? styles.errorInput : ""
                        }`}
                    type={viewPass ? "text" : "password"}
                    required
                    ref={ref}
                />
                <button
                    type="button"
                    onClick={() => setViewPass?.((prev) => !prev)}
                    className={`${styles.iconEye} ${!showEyePass && styles.eyeDesable}`}
                    aria-label="Mostrar/Ocultar contraseña"
                >
                    <i className={`fa-regular fa-eye${viewPass ? "" : "-slash"}`} />
                </button>
                <p className={validData ? styles.withoutError : ""}>{errorMsg}</p>
            </aside>
        );
    }
);

export const Divider = () => (
    <section className={styles.sectionOr}>
        <span className={styles.rowLine}></span>
        <span>o</span>
        <span className={styles.rowLine}></span>
    </section>
);

export const GoogleLoginButton = ({ loading }: { loading: boolean }) => (
    <section className={styles.loginGoogle}>
        <button disabled={loading}>
            <img src={logoGoogle} alt="Google" />
            <span>Continuar con Google</span>
        </button>
    </section>
);

export const ForgotPasswordSection = ({ loading }: { loading: boolean }) => (
    <section className={styles.forgetPass}>
        <a className={styles.linkForget}>¿Olvidaste tu contraseña?</a>
        <aside>
            <Link to={loading ? "" : "/registro"}>
                <ButtonComponent contain="CREAR CUENTA" />
            </Link>
        </aside>
    </section>
);

export const SocialMediaIcons = () => (
    <section className={styles.socialMedia}>
        {["instagram", "whatsapp", "facebook", "twitter"].map((platform) => (
            <i key={platform} className={`fa-brands fa-${platform}`} title={platform}>
                {" "}
            </i>
        ))}
    </section>
);
