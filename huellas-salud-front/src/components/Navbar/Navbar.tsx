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
        <aside>
          <ComponentLI path="/" name="🏠 Inicio" />
          <ComponentLI path="/login" name="🔖 Productos" />
          <ComponentLI path="/servicios" name="⛽ Servicios" />
          <ComponentLI path="/contacto" name="📲 Contacto" />
        </aside>
        <li>🛒</li>
      </ul>
    </nav>
  );
};

const ComponentLI = (props: PropsCompLI) => {
  return (
    <li>
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
