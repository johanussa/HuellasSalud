import styles from "./navbar.module.css";
import imgHS1 from "../../assets/Huellas&Salud_4.png";
import { Link, NavLink } from "react-router-dom";
import { ListItemNavProps } from "../../services/typesHS";

export const Logo = () => (
    <picture className={styles.logoContain}>
        <img src={imgHS1} alt="Huellas&Salud" />
        <span>Huellas & Salud 🐾</span>
    </picture>
);

export const SearchBar = () => (
    <aside className={styles.asideInput}>
        <input type="search" placeholder="¿Qué necesita tu mascota?" />
        <button>Buscar</button>
    </aside>
);

export const NavLinks = () => (
    <ul className={styles.containerUl}>
        <ListItemNav path="/inicio" name="Inicio" icon="fa-solid fa-house-chimney" />
        <ListItemNav path="/productos" name="Productos" icon="fa-solid fa-boxes-stacked" />
        <ListItemNav path="/servicios" name="Servicios" icon="fa-solid fa-house-laptop" />
        <ListItemNav path="/usuarios" name="Usuarios" icon="fa-solid fa-users" />
        <ListItemNav path="/mascotas" name="Mascotas" icon="fa-solid fa-paw" />
        <ListItemNav path="/historial" name="Historial" icon="fa-solid fa-notes-medical" />
        <ListItemNav path="/contacto" name="Contacto" icon="fa-solid fa-mobile-screen-button" />
    </ul>
);

const ListItemNav = ({ path, style, icon, name }: ListItemNavProps) => (
    <li className={styles.liNav}>
        <NavLink
            to={path}
            className={({ isActive }) => (isActive ? styles.active : styles.disabled)}
            style={style ? { textDecoration: "none" } : {}}
        >
            <i className={icon} />
            {name}
        </NavLink>
    </li>
);

export const BtnsLogRegister = () => (
    <aside className={styles.asideButtons}>
        <Link to={"/login"}>
            <button type="button">Iniciar sesión</button>
        </Link>
        <Link to={"/registro"}>
            <button type="button">Crear cuenta</button>
        </Link>
    </aside>
);