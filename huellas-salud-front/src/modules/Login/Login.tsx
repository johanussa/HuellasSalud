import styles from './login.module.css';
import logoLogin from "../../assets/Huellas&Salud_3.png";
import { Divider, ForgotPasswordSection, GoogleLoginButton, LoginForm, SocialMediaIcons } from './LoginComponents';

const Login = () => {
  return (
    <main className={styles.containerLogin}>
      <section className={styles.sectionRegister} />
      <section>
        <picture>
          <img className={styles.logoLogin} src={logoLogin} alt="Huellas & Salud" />
        </picture>
        <h2>Inicio de Sesión</h2>
        <LoginForm
          changeIconEye={true}
          setChangeIconEye={() => { }}
          errorMsg="ㅤ"
        />
        <Divider />
        <GoogleLoginButton loading={false} />
        <ForgotPasswordSection loading={false} />
        <SocialMediaIcons />
      </section>
    </main>
  )
}

export default Login;