import styles from './login.module.css';
import logoLogin from "../../assets/Huellas&Salud_3.png";
import { useState } from 'react';
import { Divider, ForgotPasswordSection, GoogleLoginButton, LoginForm, SocialMediaIcons } from './LoginComponents';

const Login = () => {

  const [viewPass, setViewPass] = useState(false);
  const [isValidData, setIsValidData] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <main className={styles.containerLogin}>
      <section className={styles.sectionRegister} />
      <section>
        <picture>
          <img className={styles.logoLogin} src={logoLogin} alt="Huellas & Salud" />
        </picture>
        <h2>Inicio de Sesión</h2>
        <LoginForm
          viewPass={viewPass}
          setViewPass={setViewPass}
          isValidData={isValidData}
          changeIconEye={true}
          setChangeIconEye={() => {}}
          errorMsg="---"
          loading={loading}
        />
        <Divider />
        <GoogleLoginButton loading={loading} />
        <ForgotPasswordSection loading={loading} />
        <SocialMediaIcons />
      </section>
    </main>
  )
}

export default Login;