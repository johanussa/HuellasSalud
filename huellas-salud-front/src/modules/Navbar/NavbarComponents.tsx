import styles from "./navbar.module.css";
import imgHS1 from "../../assets/HS_LOGO_WHITE.jpg";
import imgHS2 from "../../assets/simba.webp";
import { Link, NavLink } from "react-router-dom";
import { ListItemNavProps, NavLinkProps, SubMenuProps } from "../../services/typesHS";
import { MENU_DATA } from "./navbarData";
import { useMemo } from "react";

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

export const NavLinks = ({ setOptionHover, setShowSubMenu }: NavLinkProps) => (
    <ul className={styles.containerUl}>
        <ListItemNav
            path="/mascotas/perros"
            name="Perros"
            icon="fa-solid fa-dog"
            setOptionHover={setOptionHover}
            setShowSubMenu={setShowSubMenu}
        />
        <ListItemNav
            path="/mascotas/gatos"
            name="Gatos"
            icon="fa-solid fa-cat"
            setOptionHover={setOptionHover}
            setShowSubMenu={setShowSubMenu}
        />
        <ListItemNav
            path="/mascotas/otras-mascotas"
            name="Otras Mascotas"
            icon="fa-solid fa-horse-head"
            setOptionHover={setOptionHover}
            setShowSubMenu={setShowSubMenu}
        />
        <ListItemNav path="/productos" name="Productos" icon="fa-solid fa-boxes-stacked" />
        <ListItemNav path="/servicios" name="Servicios" icon="fa-solid fa-house-laptop" />
        <ListItemNav path="/usuarios" name="Usuarios" icon="fa-solid fa-users" />
        <ListItemNav path="/mascotas" name="Mascotas" icon="fa-solid fa-paw" />
        <ListItemNav path="/historial" name="Historial" icon="fa-solid fa-notes-medical" />
        <ListItemNav path="/contacto" name="Contacto" icon="fa-solid fa-mobile-screen-button" />
    </ul>
);

const ListItemNav = ({ path, style, icon, name, setOptionHover, setShowSubMenu }: ListItemNavProps) => {

    const handleMouseEnter = () => {
        setOptionHover?.(name);
        setShowSubMenu?.(true);
    };

    const handleMouseLeave = () => setShowSubMenu?.(false);
    const getClassName = ({ isActive }: { isActive: boolean }) => isActive ? styles.active : styles.disabled;
    const linkStyle = style ? { textDecoration: "none" } : undefined;

    return (
        <li className={styles.liNav}>
            <NavLink
                to={path}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={getClassName}
                style={linkStyle}
            >
                <i className={icon} />
                {name}
            </NavLink>
        </li>
    )
};

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

export const SubMenu = ({ option, setShowSubMenu }: SubMenuProps) => {

    const data = useMemo(() => MENU_DATA[option as keyof typeof MENU_DATA], [option]);

    const handleMouse = (show: boolean) => setShowSubMenu?.(show);

    return (
        <section className={styles.optionMenu}
            onMouseEnter={() => handleMouse(true)}
            onMouseLeave={() => handleMouse(false)}
        >
            <aside className={styles.optionCategory}>
                <ul>
                    {data.categories.map((category) => (
                        <li key={category.name}><i className={category.img} /> {category.name}</li>
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
                {data.options.map((optCat) => (
                    <section key={optCat.name}>
                        {option === "Otras Mascotas" && (<img src={imgHS2} alt={optCat.name} />)}
                        <h3>{optCat.name}</h3>
                        <ul>
                            {optCat.options.map((option) => (<li key={option}>{option}</li>))}
                        </ul>
                    </section>
                ))}
            </aside>
            <aside className={styles.optionBrands}>
                <ul>
                    <b>Marcas populares</b>
                    {data.popular.map((brand) => (
                        <li key={brand.name}>
                            <picture><img src={brand.img} alt={brand.name} /></picture>
                        </li>
                    ))}
                </ul>
            </aside>
        </section>
    )
};