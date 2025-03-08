import styles from "./Register.module.css";

const Register = () => {
  return (
    <>
      <main className={styles.containerRegister}>
        <form className={styles.formRegister}>
          <DataRegister nombre="Nombres" type="text" />
          <DataRegister nombre="Apellidos" type="text" />
          <DataRegister nombre="Email" type="email" />
          <DataRegister nombre="Dirección" type="text" />
          <DataRegister nombre="Teléfono" type="text" />
          <DataRegister nombre="Contraseña" type="password" />
          <DataRegister nombre="Confirmar contraseña" type="password" />
        </form>
      </main>
    </>
  );
};

interface PropsDataRegister {
  nombre: string;
  type: string;
}

const DataRegister = (data: PropsDataRegister) => (
  <section className={styles.dataRegister}>
    <label htmlFor="">{data.nombre}</label>
    <input type={data.type} />
  </section>
);

export default Register;
