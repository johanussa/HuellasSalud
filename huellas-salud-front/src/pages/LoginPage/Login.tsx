import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import logoLogin from "../../assets/Huellas&Salud_3.png";
import logoGoogle from "../../assets/logoGoogleG.png";

const Login = () => {
  return (
    <>
      <main className={styles.containerLogin}>
        <section className={styles.sectionRegister} />
        <section>
          <picture>
            <img
              className={styles.logoLogin}
              src={logoLogin}
              alt="Huellas & Salud"
            />
          </picture>
          <h2>Inicio de Sesión</h2>
          <form className={styles.formLogin}>
            <label htmlFor="login-input-user" className={styles.loginLabel}>
              Correo electrónico
            </label>
            <input
              id="login-input-user"
              className={styles.loginInput}
              type="text"
            />
            <label htmlFor="login-input-password" className={styles.loginLabel}>
              Contraseña
            </label>
            <input
              id="login-input-password"
              className={styles.loginInput}
              type="password"
            />
            <button className={styles.loginSubmit} disabled>
              Ingresar
            </button>
          </form>

          <section className={styles.sectionOr}>
            <span className={styles.rowLine}></span>
            <span className={styles.rowOr}>o</span>
            <span className={styles.rowLine}></span>
          </section>

          <section className={styles.loginGoogle}>
            <button>
              <img src={logoGoogle} alt="Google" />
              <span>Continuar con Google</span>
            </button>
          </section>

          <section className={styles.forgetPass}>
            <a className={styles.linkForget}>¿Olvidaste tu contraseña?</a>
            <aside>
              <Link to={"/registro"}>
                <button className={styles.buttonCreate}>Crear cuenta</button>
              </Link>
            </aside>
          </section>

          <section className={styles.socialMedia}>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-whatsapp"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
          </section>
        </section>
      </main>
    </>
  );
};

export default Login;
