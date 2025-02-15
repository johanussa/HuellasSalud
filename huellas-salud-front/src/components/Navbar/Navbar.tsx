import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

type PropsCompLI = {
  path: string;
  name: string;
  style?: boolean;
};

const Navbar = () => {
  return (
    <nav className={styles.containerNavbar}>
      <ul className={styles.containerList}>
        <ComponentLI path="/" name="🦮 Huellas & Salud" style={true} />
        <li className={styles.containerNav}>
          <aside className={styles.asideInput}>
            <input type="search" name="" id="" placeholder="¿ Que necesita tu mascoa ?"/>
            <button>Buscar</button>
          </aside>
          <aside className={styles.asideRouts}>
            <ComponentLI path="/" name="🏠 Inicio" />
            <ComponentLI path="/login" name="🔖 Productos" />
            <ComponentLI path="/servicios" name="⛽ Servicios" />
            <ComponentLI path="/contacto" name="📲 Contacto" />
          </aside>
        </li>
        <li className={styles.containerBtns}>
          <aside className={styles.asideButtons}>
            <button type="button">Inicia Sesión</button>
            <button type="button">Crear Cuenta</button>
          </aside>
          <aside className={styles.icons}>🛒</aside>
        </li>
      </ul>
    </nav>
  );
};

const ComponentLI = (props: PropsCompLI) => {
  return (
    <li className={styles.liNav}>
      <NavLink
        to={props.path}
        className={({ isActive }) =>
          isActive ? styles.active : styles.disabled
        }
        style={props.style ? { textDecoration: "none" } : {}}
      >
        {props.name}
      </NavLink>
    </li>
  );
};

export default Navbar;
