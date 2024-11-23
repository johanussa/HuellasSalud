import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className={styles.containerNavbar}>
      <ul className={styles.containerList}>
        <li>
          <NavLink
            to={"/"}
            style={{ textDecoration: "none" }}
          >
            🦮 Huellas & Salud
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.disabled
            }
          >
            🏠 Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/productos"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.disabled
            }
          >
            🔖 Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/servicios"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.disabled
            }
          >
            ⛽ Servicios
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/contacto"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.disabled
            }
          >
            📲 Contacto
          </NavLink>
        </li>
        <li>🛒</li>
      </ul>
    </nav>
  );
};

export default Navbar;
