import styles from "./navbar.module.css";
import imgHS1 from "../../assets/HS_LOGO_WHITE.jpg";
import { Link, NavLink } from "react-router-dom";
import { ListItemNavProps } from "../../services/typesHS";
import { popularDogBreeds, dogCategoryOptions, listDogCategories } from "./navbarData";

export const Logo = () => (
    <picture className={styles.logoContain}>
        <Link to={"/inicio"}>
            <img src={imgHS1} alt="Huellas&Salud" />
        </Link>
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
        <ListItemNav path="/mascotas/perros" name="Perros" icon="fa-solid fa-dog" />
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

export const SubMenu = () => (
    <section className={styles.optionMenu}>
        <aside className={styles.optionCategory}>
            <ul>
                {listDogCategories.map((category) => (
                    <li><i className={category.img} /> {category.name}</li>
                ))}
                <li>
                    <Link to={"/productos"}>
                        <i className="fa-solid fa-angle-right" />
                        Ver todos
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className={styles.optionMain}>
            {dogCategoryOptions.map((category) => (
                <section key={category.name}>
                    <h3>{category.name}</h3>
                    <ul>
                        {category.options.map((option) => (<li key={option}>{option}</li>))}
                    </ul>
                </section>
            ))}
        </aside>
        <aside className={styles.optionBrands}>
            <ul>
                <b>Marcas populares</b>
                {popularDogBreeds.map((brand) => (
                    <li key={brand.name}>
                        <picture><img src={brand.img} alt={brand.name} /></picture>
                    </li>
                ))}
            </ul>
        </aside>
    </section>
);