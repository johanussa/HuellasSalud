import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import logoLogin from "../../assets/Huellas&Salud_3.png";
import logoGoogle from "../../assets/logoGoogleG.png";
import { SocialMediaIcons } from "../../components/Login/LoginComponents";
import { serviceLogin } from "./serviceLogin";
import ButtonComponent from "../../components/Button/Button";

const Login = () => {

  const { handleSubmit, handleInputChange, handleViewPassword, formState, 
    showEyePass, validData, errorMsg, viewPass, loading } = serviceLogin();

  return (
    <>
      <main className={styles.containerLogin}>
        <section className={styles.sectionRegister} />
        <section>
          <picture>
            <img className={styles.logoLogin} src={logoLogin} alt="Huellas & Salud" />
          </picture>

          <h2>Inicio de Sesión</h2>

          <form className={styles.formLogin} onSubmit={handleSubmit}>
            <aside className={styles.inputContainer}>
              <label htmlFor="inputEmailOrDoc" className={styles.loginLabel}>Correo o número de documento</label>
              <input
                id="inputEmailOrDoc"
                className={styles.loginInput}
                type="text"
                required
                value={formState.inputEmailOrDoc}
                onChange={handleInputChange}
              />
            </aside>
            <aside className={styles.inputContainer}>
              <label htmlFor="inputPassword" className={styles.loginLabel}>Contraseña</label>
              <input
                id="inputPassword"
                className={`${styles.loginInput} ${styles.inputPass}`}
                type={viewPass ? "text" : "password"}
                required
                value={formState.inputPassword}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleViewPassword}
                className={`${styles.iconEye} ${!showEyePass && styles.eyeDesable}`}
                aria-label="Mostrar/Ocultar contraseña">
                <i className={`fa-regular fa-eye${viewPass ? "" : "-slash"}`} />
              </button>
              <p className={validData ? styles.withoutError : styles.messageError}>{errorMsg}</p>
            </aside>
            <ButtonComponent type="submit" loading={loading} contain={loading ? "CARGANDO..." : "INGRESAR"}/>
          </form>

          <section className={styles.sectionOr}>
            <span className={styles.rowLine}></span>
            <span className={styles.rowOr}>o</span>
            <span className={styles.rowLine}></span>
          </section>

          <section className={styles.loginGoogle}>
            <button disabled={loading}>
              <img src={logoGoogle} alt="Google" />
              <span>Continuar con Google</span>
            </button>
          </section>

          <section className={styles.forgetPass}>
            <a className={styles.linkForget}>¿Olvidaste tu contraseña?</a>
            <aside>
              <Link to={loading ? "" : "/registro"} >
                <ButtonComponent contain={"CREAR CUENTA"}/>
              </Link>
            </aside>
          </section>

          <SocialMediaIcons />
        </section>
      </main>
    </>
  );
};

export default Login;
