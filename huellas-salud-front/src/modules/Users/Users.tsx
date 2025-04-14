import styles from "./users.module.css";

const Users = () => {
  return (
    <main className={styles.usersSection}>
      <div className={styles.title}>
        <h2>Panel de administración - Usarios</h2>
      </div>
      <button className={styles.addBtn} >
        Agregar Usuario <i className="fa-solid fa-cart-plus"></i>
      </button>
    </main>
  );
}

export default Users;