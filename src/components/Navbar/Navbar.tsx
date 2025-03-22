import styles from "./Navbar.module.css";
import { Logo, SearchBar, NavLinks, AuthButtons } from "./NavbarComponents";

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <Logo />
        <section>
          <SearchBar />
          <NavLinks />
        </section>
        <section>
          <AuthButtons />
        </section>
      </nav>
    </>
  );
};

export default Navbar;
