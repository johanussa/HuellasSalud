import styles from './login.module.css';
import logoGoogle from "../../assets/logoGoogleG.png";
import { Link } from 'react-router-dom';
import ButtonComponent from '../../components/Button/Button';
import { InputFieldProps, LoginFormProps } from '../../services/typesHS';
import { serviceLogin } from '../../services/serviceLogin';

export const LoginForm = ({ errorMsg, changeIconEye, setChangeIconEye }: LoginFormProps) => {

    const { handleSubmit, handleInputChange, viewPass, handleViewPassword } = serviceLogin();

    return (
        <form className={styles.formLogin} onSubmit={handleSubmit}>
            <InputField handleInputChange={handleInputChange} />
            <PasswordField
                viewPass={viewPass}
                setViewPass={handleViewPassword}
                changeIconEye={changeIconEye}
                errorMsg={errorMsg}
                setChangeIconEye={setChangeIconEye}
                handleInputChange={handleInputChange}
            />
            <ButtonComponent type="submit" contain={"INGRESAR"} />
        </form>
    );
}

const InputField = ({ handleInputChange }: InputFieldProps) => {
    return (
        <aside className={styles.inputContainer}>
            <label htmlFor="inputEmailOrDoc" className={styles.loginLabel}>
                Correo o número de documento
            </label>
            <input
                id="inputEmailOrDoc"
                onChange={handleInputChange}
                className={styles.loginInput}
                type="text"
                required
            />
        </aside>
    );
}

const PasswordField = ({ viewPass, setViewPass, changeIconEye, errorMsg, handleInputChange }: LoginFormProps) => {
    const isValidData = true;
    return (
        <aside className={styles.inputContainer}>
            <label htmlFor="inputPassword" className={styles.loginLabel}>Contraseña</label>
            <input
                id="inputPassword"
                className={`${styles.loginInput} ${styles.inputPass}`}
                type={viewPass ? "text" : "password"}
                onChange={handleInputChange}
                required
            />
            <button
                type="button"
                onClick={() => setViewPass?.(prev => !prev)}
                className={`${styles.iconEye} ${!changeIconEye && styles.eyeDesable}`}
                aria-label="Mostrar/Ocultar contraseña"
            >
                <i className={`fa-regular fa-eye${viewPass ? "" : "-slash"}`} />
            </button>
            <p className={isValidData ? styles.withoutError : styles.messageError}>{errorMsg}</p>
        </aside>
    );
}

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
    <section className={styles.socialMedia} >
        {
            ["instagram", "whatsapp", "facebook", "twitter"].map((platform) => (
                <i key={platform} className={`fa-brands fa-${platform}`} title={platform} > </i>
            ))
        }
    </section>
);