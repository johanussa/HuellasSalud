import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { BtnsLogRegister, Logo, NavLinks, SearchBar } from "./NavbarComponents";
import prdPopular from "../../assets/Comida_Gato.webp";

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <Logo />
        <aside>
          <SearchBar />
          <NavLinks />
        </aside>
        <BtnsLogRegister />
      </nav>
      <section className={styles.optionMenu}>
        <aside className={styles.optionCategory}>
          <ul>
            <li>
              <i className="fa-solid fa-bowl-food" />
              Comida
            </li>
            <li>
              <i className="fa-solid fa-suitcase-medical" />
              Salud
            </li>
            <li>
              <i className="fa-solid fa-house-chimney" />
              Hogar Perros
            </li>
            <li>
              <i className="fa-solid fa-scissors" />
              Cuidado e Higiene
            </li>
            <li>
              <i className="fa-solid fa-bone" />
              Accesorios
            </li>
            <li>
              <i className="fa-solid fa-spray-can-sparkles" />
              Limpieza
            </li>
            <li>
              <i className="fa-solid fa-baseball" />
              Juguetes
            </li>
            <li>
              <Link to={"/productos"}>
                <i className="fa-solid fa-angle-right" />
                Ver todos
              </Link>
            </li>
          </ul>
        </aside>
        <aside className={styles.optionMain}>
          <section>
            <h3>Juguetes</h3>
            <ul>
              <li>
                Pelotas
              </li>
              <li>
                Huellos
              </li>
              <li>
                Con cuerda
              </li>
              <li>
                Ratones
              </li>
              <li>
                Peluches
              </li>
              <li>
                Mordedores
              </li>
            </ul>
          </section>
          <section>
            <h3>Comida</h3>
            <ul>
              <li>
                Concentrados
              </li>
              <li>
                Alimento medicado
              </li>
              <li>
                Alimento humedo
              </li>
              <li>
                Natural
              </li>
              <li>
                Snacks y galletas
              </li>
              <li>
                Huesos
              </li>
            </ul>
          </section>
          <section>
            <h3>Comida</h3>
            <ul>
              <li>
                Concentrados
              </li>
              <li>
                Alimento medicado
              </li>
              <li>
                Alimento humedo
              </li>
              <li>
                Natural
              </li>
              <li>
                Snacks y galletas
              </li>
              <li>
                Huesos
              </li>
            </ul>
          </section>
          <section>
            <h3>Comida</h3>
            <ul>
              <li>
                Concentrados
              </li>
              <li>
                Alimento medicado
              </li>
              <li>
                Alimento humedo
              </li>
              <li>
                Natural
              </li>
              <li>
                Snacks y galletas
              </li>
              <li>
                Huesos
              </li>
            </ul>
          </section>
          <section>
            <h3>Juguetes</h3>
            <ul>
              <li>
                Pelotas
              </li>
              <li>
                Huellos
              </li>
              <li>
                Con cuerda
              </li>
              <li>
                Ratones
              </li>
              <li>
                Peluches
              </li>
              <li>
                Mordedores
              </li>
            </ul>
          </section>
          <section>
            <h3>Comida</h3>
            <ul>
              <li>
                Concentrados
              </li>
              <li>
                Alimento medicado
              </li>
              <li>
                Alimento humedo
              </li>
              <li>
                Natural
              </li>
              <li>
                Snacks y galletas
              </li>
              <li>
                Huesos
              </li>
            </ul>
          </section>
          <section>
            <h3>Comida</h3>
            <ul>
              <li>
                Concentrados
              </li>
              <li>
                Alimento medicado
              </li>
              <li>
                Alimento humedo
              </li>
              <li>
                Natural
              </li>
              <li>
                Snacks y galletas
              </li>
              <li>
                Huesos
              </li>
            </ul>
          </section>
          <section>
            <h3>Comida</h3>
            <ul>
              <li>
                Concentrados
              </li>
              <li>
                Alimento medicado
              </li>
              <li>
                Alimento humedo
              </li>
              <li>
                Natural
              </li>
              <li>
                Snacks y galletas
              </li>
              <li>
                Huesos
              </li>
            </ul>
          </section>
        </aside>
        <aside className={styles.optionBrands}>
          <ul>
            <b>Marcas populares</b>
            <li>
              <picture><img src={prdPopular} alt="" /></picture>
            </li>
            <li>
              <picture><img src={prdPopular} alt="" /></picture>
            </li>
            <li>
              <picture><img src={prdPopular} alt="" /></picture>
            </li>
            <li>
              <picture><img src={prdPopular} alt="" /></picture>
            </li>
            <li>
              <picture><img src={prdPopular} alt="" /></picture>
            </li>
            <li>
              <picture><img src={prdPopular} alt="" /></picture>
            </li>
            <li>
              <picture><img src={prdPopular} alt="" /></picture>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}

export default Navbar;