import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import imgHS1 from "../../assets/Huellas&Salud_4.png";

type PropsCompLI = {
    path: string;
    name: string;
    icon: string;
    style?: boolean;
  };

export const ComponentLI = (props: PropsCompLI) => (
  <li className={styles.liNav}>
    <NavLink
      to={props.path}
      className={({ isActive }) => (isActive ? styles.active : styles.disabled)}
      style={props.style ? { textDecoration: "none" } : {}}
    >
      <i className={props.icon}></i>
      {props.name}
    </NavLink>
  </li>
);

export const Logo = () => (
  <picture>
    <img src={imgHS1} alt="Huellas&Salud" className={styles.logoImg} />
    <span className={styles.spanLogoNav}>Huellas & Salud 🐾</span>
  </picture>
);

export const SearchBar = () => (
  <aside className={styles.asideInput}>
    <input type="search" placeholder="¿ Qué necesita tu mascota?" />
    <button>Buscar</button>
  </aside>
);

export const NavLinks = () => (
  <ul className={styles.containerUl}>
    <ComponentLI path="/" name="Inicio" icon="fa-solid fa-house-chimney" />
    <ComponentLI path="/productos" name="Productos" icon="fa-solid fa-boxes-stacked" />
    <ComponentLI path="/servicios" name="Servicios" icon="fa-solid fa-house-laptop" />
    <ComponentLI path="/usuarios" name="Usuarios" icon="fa-solid fa-users" />
    <ComponentLI path="/mascotas" name="Mascotas" icon="fa-solid fa-paw" />
    <ComponentLI path="/ventas" name="Ventas" icon="fa-solid fa-money-bill-trend-up" />
    <ComponentLI path="/contacto" name="Contacto" icon="fa-solid fa-mobile-screen-button" />
  </ul>
);

export const AuthButtons = () => (
  <aside className={styles.asideButtons}>
    <button type="button">
      <Link to={"/login"}>Iniciar Sesión</Link>
    </button>
    <button type="button">
      <Link to={"/registro"}>Crear Cuenta</Link>
    </button>
  </aside>
);
