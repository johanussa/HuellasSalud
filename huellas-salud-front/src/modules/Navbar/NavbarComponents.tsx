import styles from "./navbar.module.css";
import imgHS1 from "../../assets/HS_LOGO_WHITE.jpg";
import { Link, NavLink } from "react-router-dom";
import { CategoryOption, ListCategoriesObj, ListItemNavProps, NavLinkProps } from "../../services/typesHS";
import { popularDogBreeds, dogCategoryOptions, listDogCategories, catCategoryOptions, listCatCategories, popularCatBreeds, listOtherCategories, otherCategoryOptions, popularOtherBreeds } from "./navbarData";

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

export const SubMenu = ({ option }: { option: string }) => {

    // REFACTOR 

    let categories: ListCategoriesObj[] = [];
    let categoryOptions: CategoryOption[] = [];
    let popularBreeds: ListCategoriesObj[] = [];

    switch (option) {
        case "Perros":
            categories = listDogCategories;
            categoryOptions = dogCategoryOptions;
            popularBreeds = popularDogBreeds;
            break;
        case "Gatos":
            categories = listCatCategories;
            categoryOptions = catCategoryOptions;
            popularBreeds = popularCatBreeds;
            break;
        case "Otras Mascotas":
            categories = listOtherCategories;
            categoryOptions = otherCategoryOptions;
            popularBreeds = popularOtherBreeds;
            break;
        default: return;
    }

    return (
        <section className={styles.optionMenu}>
            <aside className={styles.optionCategory}>
                <ul>
                    {categories.map((category) => (
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
                {categoryOptions.map((category) => (
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
                    {popularBreeds.map((brand) => (
                        <li key={brand.name}>
                            <picture><img src={brand.img} alt={brand.name} /></picture>
                        </li>
                    ))}
                </ul>
            </aside>
        </section>
    )
};