import styles from "./navbar.module.css";
import { BtnsLogRegister, Logo, NavLinks, SearchBar } from "./NavbarComponents";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <aside>
        <SearchBar />
        <NavLinks />
      </aside>
      <BtnsLogRegister />
    </nav>
  );
}

export default Navbar;