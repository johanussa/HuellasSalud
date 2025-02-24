import styles from "./Login.module.css";
import logoLogin from "../../assets/Huellas&Salud_3.png";

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
          <form className={styles.form_login}>
            <h2>Inicio de Sesión</h2>
            <label htmlFor="login-input-user" className={styles.login__label}>
              Username
            </label>
            <input
              id="login-input-user"
              className={styles.login__input}
              type="text"
            />
            <label
              htmlFor="login-input-password"
              className={styles.login__label}
            >
              Password
            </label>
            <input
              id="login-input-password"
              className={styles.login__input}
              type="password"
            />
            <button className={styles.login__submit} disabled>
              Sign in
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
