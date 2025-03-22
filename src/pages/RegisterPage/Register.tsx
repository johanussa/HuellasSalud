import ButtonComponent from "../../components/Button/Button";
import styles from "./Register.module.css";
import logoHS from '../../assets/Huellas&Salud_4.png';
import { ChangeEvent, FormEvent, useState } from "react";
import { DocumentType, FormRegister } from '../../services/types';

const Register = () => {

  const [form, setForm] = useState<FormRegister>({
    name: "",
    lastName: "",
    documentType: DocumentType.CEDULA_DE_CIUDADANIA,
    documentNumber: 123,
    email: "",
    phone: "",
    address: "",
    password: ""
  });

  const handlerChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setForm((prevState) => ({ ...prevState, [id]: value }));
    console.log(value);
  }

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
          <form className={styles.formRegister} >
            <InputField nombre="Nombre" idInput="nombre" required onChange={handlerChange}/>
            <InputField nombre="Apellido" idInput="apellido" required onChange={handlerChange}/>

            <section className={`${styles.inputField}`}>
              <label htmlFor="tipoDoc">Tipo de documento</label>
              <select defaultValue={'CEDULA_DE_CIUDADANIA'} id="tipoDoc" className={styles.form_input} required onChange={handlerChange}>
                <option value="CEDULA_DE_CIUDADANIA">Cédula de ciudadania</option>
                <option value="CEDULA_DE_EXTRANJERIA">Cédula de extranjeria</option>
                <option value="PERMISO_ESPECIAL_DE_PERMANENCIA">Permiso especial de permanencia</option>
                <option value="PERMISO_DE_PROTECCION_TEMPORAL">Permiso protección temporal</option>
                <option value="PASAPORTE">Pasaporte</option>
                <option value="TARJETA_DE_IDENTIDAD">Tarjeta de identidad</option>
              </select>
            </section>

            <InputField nombre="Número de documento" idInput="numDoc" required onChange={handlerChange}/>
            <InputField nombre="Email" type="email" idInput="email" required onChange={handlerChange}/>
            <InputField nombre="Teléfono" type="number" idInput="telefono" required onChange={handlerChange}/>
            <InputField nombre="Dirección de residencia" idInput="direccion" inputFull onChange={handlerChange}/>
            <InputField nombre="Contraseña" type="password" idInput="password" required onChange={handlerChange}/>
            <InputField nombre="Confirmar contraseña" type="password" idInput="confirmPass" required onChange={handlerChange}/>
            <p className={styles.inputFull}>⚠️ Mensaje de error</p>
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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputField = (props: PropsInputField) => {

  const { nombre, type = "text", idInput, required = false, inputFull = false, onChange } = props;

  return (
    <section className={`${styles.inputField} ${inputFull && styles.inputFull}`}>
      <label htmlFor={idInput}>{nombre}</label>
      <input id={idInput} type={type} required={required} onChange={onChange}/>
    </section >
  )
};

export default Register;
