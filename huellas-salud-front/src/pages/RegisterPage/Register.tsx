import ButtonComponent from "../../components/Button/Button";
import styles from "./Register.module.css";
import logoHS from '../../assets/Huellas&Salud_4.png';

const Register = () => {
  return (
    <>
      <main className={styles.containerRegister}>
        <section className={styles.containerForm}>
          <aside className={styles.header}>
            <img src={logoHS} alt="Huellas&Salud" />
            <p className={styles.tittleRegister}>
              ¡Únete a la familia de Huellas y Salud! <i className="fa-solid fa-paw"></i>
            </p>
          </aside>
          <form className={styles.formRegister}>
            <InputField nombre="Nombre" idInput="nombre" required />
            <InputField nombre="Apellido" idInput="apellido" required />

            <section className={`${styles.inputField}`}>
              <label htmlFor="tipoDoc">Tipo de documento</label>
              <select defaultValue={'CEDULA_DE_CIUDADANIA'} id="tipoDoc" className={styles.form_input} required>
                <option value="CEDULA_DE_CIUDADANIA">Cédula de ciudadania</option>
                <option value="CEDULA_DE_EXTRANJERIA">Cédula de extranjeria</option>
                <option value="PERMISO_ESPECIAL_DE_PERMANENCIA">Permiso especial de permanencia</option>
                <option value="PERMISO_DE_PROTECCION_TEMPORAL">Permiso protección temporal</option>
                <option value="PASAPORTE">Pasaporte</option>
                <option value="TARJETA_DE_IDENTIDAD">Tarjeta de identidad</option>
              </select>
            </section>

            <InputField nombre="Número de documento" idInput="numDoc" required />
            <InputField nombre="Email" type="email" idInput="email" required />
            <InputField nombre="Teléfono" type="number" idInput="telefono" required />
            <InputField nombre="Dirección de residencia" idInput="direccion" inputFull />
            <InputField nombre="Contraseña" type="password" idInput="password" required />
            <InputField nombre="Confirmar contraseña" type="password" idInput="confirmPass" required />
            <p className={styles.inputFull}>⚠️ Mensaje de error de validación ⚠️</p>
            <aside className={`${styles.containerButtons} ${styles.inputFull}`}>
              <ButtonComponent contain={"Cancelar"} />
              <ButtonComponent type="reset" contain={"Limpiar"} />
              <ButtonComponent type="submit" contain={"Confirmar"} />
            </aside>
          </form>
        </section>
        <section className={styles.containerImg}>
        </section>

      </main>
    </>
  );
};

interface PropsInputField {
  nombre: string;
  type?: string;
  idInput: string;
  required?: boolean;
  inputFull?: boolean;
}

const InputField = (props: PropsInputField) => {
  const { nombre, type = "text", idInput, required = false, inputFull = false } = props;

  return (
    <section className={`${styles.inputField} ${inputFull && styles.inputFull}`}>
      <label htmlFor={idInput}>{nombre}</label>
      <input id={idInput} type={type} required={required} />
    </section >
  )
};

export default Register;
